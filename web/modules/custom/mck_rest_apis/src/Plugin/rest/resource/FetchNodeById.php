<?php

/**
 * The following custom rest api will be used to return values of a node
 */

namespace Drupal\mck_rest_apis\Plugin\rest\resource;

use Drupal\Core\Cache\CacheableJsonResponse;
use Drupal\Core\Entity\EntityRepositoryInterface;
use Drupal\Core\Render\RenderContext;
use Drupal\Core\Routing\AccessAwareRouterInterface;
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
 *   id = "fetch_node_popup",
 *   label = @Translation("Node by uuid and view mode"),
 *   serialization_class = "",
 *   uri_paths = {
 *     "canonical" = "/fetch/node/{uuid}/{view_mode}"
 *   }
 * )
 */
class FetchNodeById extends ResourceBase {

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
   * The entity repository.
   *
   * @var \Drupal\Core\Entity\EntityRepositoryInterface
   */
  protected EntityRepositoryInterface $entityRepository;

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
   * @param EntityRepositoryInterface $entityRepository
   *   The entity repository.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, array $serializer_formats, LoggerInterface $logger, MckRestManagerInterface $mckRestManager, AccountProxyInterface $user, EntityRepositoryInterface $entityRepository) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $serializer_formats, $logger);
    $this->mckRestManager = $mckRestManager;
    $this->user = $user;
    $this->entityRepository = $entityRepository;
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
      $container->get('entity.repository'),
    );
  }

  /**
   * Returns node output by url query parameter.
   *
   * @param string $uuid
   *   Node uuid.
   * @param string $view_mode
   *   Node view mode.
   * @param Request $request
   *   Request object.
   *
   * @return ModifiedResourceResponse|CacheableJsonResponse
   *   Node output.
   */
  public function get(string $uuid, string $view_mode, Request $request) {
    $node = $this->entityRepository->loadEntityByUuid('node', $uuid);
    if (!$node) {
      $node = $this->entityRepository->loadEntityByUuid('paragraph', $uuid);
      if (!$node) {

        return new ModifiedResourceResponse($node['message'], Response::HTTP_NOT_FOUND);
      }
    }

    $access = $node->access('view', $this->user);
    if (!$access) {

      return new ModifiedResourceResponse((string) $this->t('You do not have an access to this page.'), Response::HTTP_FORBIDDEN);
    }

    $context = new RenderContext();
    /* @var \Drupal\Core\Cache\CacheableDependencyInterface $result */
    $result = \Drupal::service('renderer')->executeInRenderContext($context, function() use ($node, $view_mode) {
      if (method_exists($node, 'getTitle')) {
        $title = $node->getTitle();
        $url = $node->toUrl()->toString();
      }
      elseif ($node->hasField('field_title')) {
        $title = $node->get('field_title')->value;
      }

      $data = [
        'title' => $title ?? '',
        'node_type' => $node->bundle(),
        'node_id' => $node->id(),
        'url' => $url ?? '',
        'is_admin' => $this->user->hasPermission('administer site configuration'),
        'is_logged_in' => $this->user->isAuthenticated(),
      ];

      $display_id = $node->getEntityTypeId() . '.' . $node->bundle() . '.' . $view_mode;
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

}
