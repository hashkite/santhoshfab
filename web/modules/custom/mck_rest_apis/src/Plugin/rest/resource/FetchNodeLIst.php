<?php

/**
 * The following custom rest api will be used to return values of a node
 */

namespace Drupal\mck_rest_apis\Plugin\rest\resource;

use Drupal\Core\Cache\CacheableJsonResponse;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Render\RenderContext;
use Drupal\Core\Routing\AccessAwareRouterInterface;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\Core\Url;
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
 *   id = "fetch_node_list",
 *   label = @Translation("Node list by type"),
 *   serialization_class = "",
 *   uri_paths = {
 *     "canonical" = "/fetch/node-list/{type}"
 *   }
 * )
 */
class FetchNodeLIst extends ResourceBase {

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected EntityTypeManagerInterface $entityTypeManager;

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
   * @param EntityTypeManagerInterface $entityTypeManager
   *   The entity type manager.
   * @param AccountProxyInterface $user
   *   User proxy, for checking permissions.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, array $serializer_formats, LoggerInterface $logger, EntityTypeManagerInterface $entityTypeManager, AccountProxyInterface $user) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $serializer_formats, $logger);
    $this->entityTypeManager = $entityTypeManager;
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
      $container->get('entity_type.manager'),
      $container->get('current_user'),
    );
  }

  /**
   * Returns nodes list by type.
   *
   * @param string $type
   *   Node type.
   * @param Request $request
   *   Request object.
   *
   * @return ModifiedResourceResponse|CacheableJsonResponse
   *   Nodes list output.
   */
  public function get(string $type, Request $request) {
    $list = $this->entityTypeManager->getStorage('node')->loadByProperties(['type' => $type]);
    if (!$list) {

      return new ModifiedResourceResponse('Nodes with this type does not exist.', Response::HTTP_NOT_FOUND);
    }

    $context = new RenderContext();
    /* @var \Drupal\Core\Cache\CacheableDependencyInterface $result */
    $result = \Drupal::service('renderer')->executeInRenderContext($context, function() use ($list) {
      $data = [];
      foreach ($list as $node) {
        if (!$node->access('view', $this->user)) {
          continue;
        }

        $data[] = [
          'title' => $node->getTitle(),
          'url' => $node->toUrl()->toString(),
          'uuid' => $node->uuid(),
        ];
      }
      return $data;
    });

    $response = new CacheableJsonResponse($result);
    if (!$context->isEmpty()) {
      $metadata = $context->pop();
      $response->addCacheableDependency($metadata);
    }

    $response->addCacheableDependency($request->attributes->get(AccessAwareRouterInterface::ACCESS_RESULT));
    $requested_url = Url::fromUserInput($request->getRequestUri());
    $response->addCacheableDependency($requested_url);

    return $response;

  }

}
