<?php

/**
 * The following custom rest api will be used to return values of a node
 */

namespace Drupal\mck_rest_apis\Plugin\rest\resource;

use Drupal\Core\Cache\CacheableJsonResponse;
use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
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
 *   id = "fetch_config_pages_info",
 *   label = @Translation("Config pages Details"),
 *   serialization_class = "",
 *   uri_paths = {
 *     "canonical" = "/fetch/config_pages/{config_page}"
 *   }
 * )
 */
class FetchConfigPages extends ResourceBase {

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected EntityTypeManagerInterface $entityTypeManager;

  /**
   * The msk rest manager.
   *
   * @var MckRestManagerInterface
   */
  protected MckRestManagerInterface $mckRestManager;

  /**
   * The entity view display storage.
   *
   * @var \Drupal\Core\Entity\EntityStorageInterface
   */
  protected EntityStorageInterface $entityViewDisplayStorage;

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
   * @param MckRestManagerInterface $mckRestManager
   *   The msk rest manager.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, array $serializer_formats, LoggerInterface $logger, EntityTypeManagerInterface $entityTypeManager, MckRestManagerInterface $mckRestManager) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $serializer_formats, $logger);
    $this->entityTypeManager = $entityTypeManager;
    $this->mckRestManager = $mckRestManager;
    $this->entityViewDisplayStorage = $entityTypeManager->getStorage('entity_view_display');
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
      $container->get('mck_rest_apis.mck_rest_manager'),
    );
  }

  /**
   * Returns node output by url query parameter.
   *
   * @param string $config_page
   *   Config page id.
   * @param Request $request
   *   Request object.
   *
   * @return ModifiedResourceResponse|CacheableJsonResponse
 *   Node output.
   */
  public function get(string $config_page, Request $request) {
    $config_page = $this->entityTypeManager->getStorage('config_pages')->load($config_page);
    if (is_array($config_page) || !$config_page) {

      return new ModifiedResourceResponse((string) $this->t("This config page doesn't exist."), Response::HTTP_CONFLICT);
    }

    $context = new RenderContext();
    /* @var \Drupal\Core\Cache\CacheableDependencyInterface $result */
    $result = \Drupal::service('renderer')->executeInRenderContext($context, function() use ($config_page) {

      $display_id = 'config_pages.' . $config_page->bundle() . '.default';
      $view_display = $this->entityViewDisplayStorage->load($display_id);
      $config = $view_display->toArray();
      $data = [];
      if (!empty($config['content'])) {
        foreach ($config['content'] as $key => $item) {
          if (!is_array($item)) {
            continue;
          }

          if (isset($item['type']) && $item['type'] === 'mck_react') {
            $format = $item['settings']['format'];
            $mode = $item['settings']['view_mode'] ?? 'teaser';
            $storage = $item['settings']['storage'] ?? 'paragraph';
            $data += $this->mckRestManager->getValue($config_page, $key, $format, $item['label'], $mode, $storage);
          }
        }
      }

      return $data;
    });

    $response = new CacheableJsonResponse($result);
    if (!$context->isEmpty()) {
      $metadata = $context->pop();
      $response->addCacheableDependency($metadata);
    }

    $response->addCacheableDependency($config_page);
    $response->addCacheableDependency($request->attributes->get(AccessAwareRouterInterface::ACCESS_RESULT));
    $requested_url = Url::fromUserInput($request->getRequestUri());
    $response->addCacheableDependency($requested_url);

    return $response;



    return (new ModifiedResourceResponse($data));
  }

}
