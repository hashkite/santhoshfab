<?php

/**
 * The following custom rest api will be used to return values of a node
 */

namespace Drupal\mck_rest_apis\Plugin\rest\resource;

use Drupal\Core\Cache\CacheableJsonResponse;
use Drupal\Core\Entity\EntityRepositoryInterface;
use Drupal\Core\Render\RenderContext;
use Drupal\Core\Routing\AccessAwareRouterInterface;
use Drupal\Core\Url;
use Drupal\mck_rest_apis\MckRestManagerInterface;
use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ModifiedResourceResponse;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Represents entities as resources.*
 *
 * @see \Drupal\rest\Plugin\Deriver\EntityDeriver
 *
 * @RestResource(
 *   id = "search_by_view",
 *   label = @Translation("Search By View"),
 *   serialization_class = "",
 *   uri_paths = {
 *     "canonical" = "/search/{view_id}/{display_id}/{uuid}"
 *   }
 * )
 */
class SearchByView extends ResourceBase {

  /**
   * The msk rest manager.
   *
   * @var MckRestManagerInterface
   */
  protected MckRestManagerInterface $mckRestManager;

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
   * @param EntityRepositoryInterface $entityRepository
   *   The entity repository.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, array $serializer_formats, LoggerInterface $logger, MckRestManagerInterface $mckRestManager, EntityRepositoryInterface $entityRepository) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $serializer_formats, $logger);
    $this->mckRestManager = $mckRestManager;
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
      $container->get('entity.repository'),
    );
  }

  /**
   * Returns value view by ids and arguments.
   *
   * @param string $view_id
   *   View id.
   * @param string $display_id
   *   View display id.
   * @param string $uuid
   *   Uuid of the paragraph.
   * @param Request $request
   *   Request object.
   *
   * @return CacheableJsonResponse
   *   Node output.
   */
  public function get(string $view_id, string $display_id, string $uuid, Request $request): CacheableJsonResponse {

    $context = new RenderContext();
    /* @var \Drupal\Core\Cache\CacheableDependencyInterface $result */
    $result = \Drupal::service('renderer')->executeInRenderContext($context, function() use ($view_id, $display_id, $uuid) {
      $paragraph = $this->entityRepository->loadEntityByUuid('paragraph', $uuid);
      $arguments = [$paragraph->get('field_view')->arguments];
      return $this->mckRestManager->getViewValues($view_id, $display_id, $paragraph, $arguments);
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
