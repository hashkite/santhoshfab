<?php

/**
 * The following custom rest api will be used to return values of a node
 */

namespace Drupal\mck_rest_apis\Plugin\rest\resource;

use Drupal\Component\Plugin\PluginManagerInterface;
use Drupal\Core\Cache\CacheableJsonResponse;
use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\Cache\CacheableResponseInterface;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\FieldableEntityInterface;
use Drupal\Core\Render\BubbleableMetadata;
use Drupal\Core\Render\RenderContext;
use Drupal\Core\Routing\AccessAwareRouterInterface;
use Drupal\Core\Routing\RouteMatch;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\Core\Url;
use Drupal\mck_rest_apis\MckRestManagerInterface;
use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ModifiedResourceResponse;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Represents entities as resources.*
 *
 * @see \Drupal\rest\Plugin\Deriver\EntityDeriver
 *
 * @RestResource(
 *   id = "fetch_node_info",
 *   label = @Translation("Node Details"),
 *   serialization_class = "",
 *   uri_paths = {
 *     "canonical" = "/fetch/node"
 *   }
 * )
 */
class FetchNode extends ResourceBase
{

  /**
   * The msk rest manager.
   *
   * @var MckRestManagerInterface
   */
  protected MckRestManagerInterface $mckRestManager;

  /**
   * User proxy, for checking permissions.
   *
   * @var AccountProxyInterface
   */
  protected AccountProxyInterface $user;

  /**
   * The link relation type manager used to create HTTP header links.
   *
   * @var \Drupal\Component\Plugin\PluginManagerInterface
   */
  protected $linkRelationTypeManager;

  /**
   * Constructs a Drupal\rest\Plugin\ResourceBase object.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param array $serializer_formats
   *   The available serialization formats.
   * @param LoggerInterface $logger
   *   A logger instance.
   * @param MckRestManagerInterface $mckRestManager
   *   The msk rest manager.
   * @param AccountProxyInterface $user
   *   User proxy, for checking permissions.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, array $serializer_formats, LoggerInterface $logger, MckRestManagerInterface $mckRestManager, AccountProxyInterface $user, PluginManagerInterface $link_relation_type_manager)
  {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $serializer_formats, $logger);
    $this->mckRestManager = $mckRestManager;
    $this->user = $user;
    $this->linkRelationTypeManager = $link_relation_type_manager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition)
  {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->getParameter('serializer.formats'),
      $container->get('logger.factory')->get('custom_rest'),
      $container->get('mck_rest_apis.mck_rest_manager'),
      $container->get('current_user'),
      $container->get('plugin.manager.link_relation_type')
    );
  }

  /**
   * Returns node output by url query parameter.
   *
   * @param Request $request
   *   Request object.
   *
   * @return ModifiedResourceResponse|CacheableJsonResponse
   *   Node output.
   */
  public function get(Request $request)
  {
    $url = $request->query->get('url');
    if (!$url) {

      return new ModifiedResourceResponse('Provide required query param url.', Response::HTTP_CONFLICT);
    }

    $node = $this->mckRestManager->getNodeByAlias($url);
    if (is_array($node)) {

      return new ModifiedResourceResponse($node['message'], Response::HTTP_NOT_FOUND);
    }

    $access = $node->access('view', $this->user);
    if (!$access) {

      return new ModifiedResourceResponse((string) $this->t('You do not have an access to this page.'), Response::HTTP_FORBIDDEN);
    }

    $front_page = \Drupal::configFactory()->get('system.site')->get('page.front');
    $front_page = \Drupal::service('path_alias.manager')->getAliasByPath($front_page);
    $is_front = $front_page === $url;
    $data = [
      'title' => $node->getTitle(),
      'node_type' => $node->bundle(),
      'node_id' => $node->id(),
      'uuid' => $node->uuid(),
      'is_admin' => $this->user->hasPermission('administer site configuration'),
      'is_logged_in' => $this->user->isAuthenticated(),
      'is_front' => $is_front,
    ];


    $display_id = 'node.' . $node->bundle() . '.default';

    $context = new RenderContext();
    /* @var \Drupal\Core\Cache\CacheableDependencyInterface $result */
    $result = \Drupal::service('renderer')->executeInRenderContext($context, function () use ($display_id, $node, $data, $is_front) {
      if (!$is_front) {
        $data['breadcrumbs'] = $this->buildNodeBreadcrumbs($node);
      }

      $user_image = $this->mckRestManager->getUserPicture();
      $data['user_image'] = $user_image['image'] ?? [];
      $this->mckRestManager->getValues($display_id, $node, $data);

      return $data;
    });

    $response = new CacheableJsonResponse($result);
    if (!$context->isEmpty()) {
      $metadata = $context->pop();
      $response->addCacheableDependency($metadata);
    }

    $response->addCacheableDependency($node);
    $response->addCacheableDependency($request->attributes->get(AccessAwareRouterInterface::ACCESS_RESULT));
    $requested_url = Url::fromUserInput($request->getRequestUri());
    $response->addCacheableDependency($requested_url);

    return $response;
  }

  /**
   * Adds link headers to a response.
   *
   * @param \Drupal\Core\Entity\EntityInterface $entity
   *   The entity.
   * @param \Symfony\Component\HttpFoundation\Response $response
   *   The response.
   *
   * @see https://tools.ietf.org/html/rfc5988#section-5
   */
  protected function addLinkHeaders(EntityInterface $entity, Response $response)
  {
    foreach ($entity->uriRelationships() as $relation_name) {
      if ($this->linkRelationTypeManager->hasDefinition($relation_name)) {
        /** @var \Drupal\Core\Http\LinkRelationTypeInterface $link_relation_type */
        $link_relation_type = $this->linkRelationTypeManager->createInstance($relation_name);

        $generator_url = $entity->toUrl($relation_name)
          ->setAbsolute(TRUE)
          ->toString(TRUE);
        if ($response instanceof CacheableResponseInterface) {
          $response->addCacheableDependency($generator_url);
        }
        $uri = $generator_url->getGeneratedUrl();

        $relationship = $link_relation_type->isRegistered()
          ? $link_relation_type->getRegisteredName()
          : $link_relation_type->getExtensionUri();

        $link_header = '<' . $uri . '>; rel="' . $relationship . '"';
        $response->headers->set('Link', $link_header, FALSE);
      }
    }
  }

  /**
   * Builds node breadcrumbs.
   *
   * @param EntityInterface $entity
   *   Entity object.
   *
   * @return array
   *   Node breadcrumbs array.
   */
  function buildNodeBreadcrumbs(EntityInterface $entity): array
  {
    $routeName = $entity->toUrl()->getRouteName();
    $routeParameters = $entity->toUrl()->getRouteParameters();
    $route = \Drupal::service('router.route_provider')->getRouteByName($routeName);
    $routeMatch = new RouteMatch($routeName, $route, $routeParameters, $routeParameters);
    $breadcrumbs = \Drupal::service('breadcrumb')->build($routeMatch)->toRenderable();
    $links = [];
    if (isset($breadcrumbs['#links'])) {
      /*      $page_title = $entity->getTitle();
            $link = reset($breadcrumbs['#links']);
            $url = $link->getUrl()->toString();
            $links[] = ['link' => $url, 'text' => (string) t('Homepage')];
            $links[] = ['text' => $page_title];*/

      foreach ($breadcrumbs['#links'] as $link) {
        $links[] = ['link' => $link->getUrl()->toString(), 'text' => (string) $link->getText()];
      }
    }

    return $links;
  }

}
