<?php

/**
 * The following custom rest api will be used to return values of a user
 */

namespace Drupal\mck_rest_apis\Plugin\rest\resource;

use Drupal\Core\Cache\CacheableJsonResponse;
use Drupal\Core\Entity\EntityInterface;
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
 *   id = "fetch_user_info",
 *   label = @Translation("User Details"),
 *   serialization_class = "",
 *   uri_paths = {
 *     "canonical" = "/fetch/user"
 *   }
 * )
 */
class FetchUser extends ResourceBase {

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
  public function __construct(array $configuration, $plugin_id, $plugin_definition, array $serializer_formats, LoggerInterface $logger, MckRestManagerInterface $mckRestManager, AccountProxyInterface $user) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $serializer_formats, $logger);
    $this->mckRestManager = $mckRestManager;
    $this->user = $user;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->getParameter('serializer.formats'),
      $container->get('logger.factory')->get('custom_rest'),
      $container->get('mck_rest_apis.mck_rest_manager'),
      $container->get('current_user'),
    );
  }

  /**
   * Returns user output by url query parameter.
   *
   * @param Request $request
   *   Request object.
   *
   * @return ModifiedResourceResponse|CacheableJsonResponse
   *   user output.
   */
  public function get(Request $request) {
    $url = $request->query->get('url');
    if (!$url) {

      return new ModifiedResourceResponse('Provide required query param url.', Response::HTTP_CONFLICT);
    }

    $user = $this->mckRestManager->getUserByAlias($url);
    if (is_array($user)) {

      return new ModifiedResourceResponse($user['message'], Response::HTTP_NOT_FOUND);
    }


    $context = new RenderContext();
    /* @var \Drupal\Core\Cache\CacheableDependencyInterface $result */
    $result = \Drupal::service('renderer')->executeInRenderContext($context, function() use ($user) {
      $data = [
        'title' => $user->getAccountName(),
        'user_id' => $user->id(),
        'is_admin' => $this->user->hasPermission('administer site configuration'),
        'breadcrumbs' =>  $this->buildNodeBreadcrumbs($user),
        'is_logged_in' => $this->user->isAuthenticated(),
      ];
      $user_image = $this->mckRestManager->getUserPicture();
      $data['user_image'] = $user_image['image'] ?? [];
      $display_id = 'user.user.default';
      $this->mckRestManager->getValues($display_id, $user, $data);
      return $data;
    });

    $response = new CacheableJsonResponse($result);
    if (!$context->isEmpty()) {
      $metadata = $context->pop();
      $response->addCacheableDependency($metadata);
    }

    $response->addCacheableDependency($user);
    $response->addCacheableDependency($request->attributes->get(AccessAwareRouterInterface::ACCESS_RESULT));
    $requested_url = Url::fromUserInput($request->getRequestUri());
    $response->addCacheableDependency($requested_url);

    return $response;
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
  function buildNodeBreadcrumbs(EntityInterface $entity): array {
    $routeName = $entity->toUrl()->getRouteName();
    $routeParameters = $entity->toUrl()->getRouteParameters();
    $route = \Drupal::service('router.route_provider')->getRouteByName($routeName);
    $routeMatch = new RouteMatch($routeName, $route, $routeParameters, $routeParameters);
    $breadcrumbs = \Drupal::service('breadcrumb')->build($routeMatch)->toRenderable();
    $links = [];
    if (isset($breadcrumbs['#links'])) {
      $page_title = t('Talent profile');
      $link = reset($breadcrumbs['#links']);
      $url = $link->getUrl()->toString();
      $links[] = ['link' => $url, 'text' => (string) t('Homepage')];
      $links[] = ['text' => $page_title];
    }

    return $links;
  }

}
