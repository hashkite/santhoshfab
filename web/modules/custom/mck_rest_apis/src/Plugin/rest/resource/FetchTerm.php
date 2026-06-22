<?php

/**
 * The following custom rest api will be used to return values of a user
 */

namespace Drupal\mck_rest_apis\Plugin\rest\resource;

use Drupal\Core\Cache\CacheableJsonResponse;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
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
 *   id = "fetch_terms_info",
 *   label = @Translation("Terms info"),
 *   serialization_class = "",
 *   uri_paths = {
 *     "canonical" = "/fetch/terms/{vid}"
 *   }
 * )
 */
class FetchTerm extends ResourceBase {

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
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected EntityTypeManagerInterface $entityTypeManager;

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
   * @param EntityTypeManagerInterface $entityTypeManager
   * The entity type manager.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, array $serializer_formats, LoggerInterface $logger, MckRestManagerInterface $mckRestManager, AccountProxyInterface $user, EntityTypeManagerInterface $entityTypeManager) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $serializer_formats, $logger);
    $this->mckRestManager = $mckRestManager;
    $this->user = $user;
    $this->entityTypeManager = $entityTypeManager;
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
      $container->get('entity_type.manager'),
    );
  }

  /**
   * Returns user output by url query parameter.
   *
   * @param string $vid
   * Node type.
   * @param Request $request
   *   Request object.
   *
   * @return ModifiedResourceResponse|CacheableJsonResponse
   *   user output.
   */
  public function get(string $vid, Request $request) {
    $storage = $this->entityTypeManager->getStorage('taxonomy_term');
    $terms = $storage->loadTree($vid);
    if (empty($terms)) {

      return new ModifiedResourceResponse('Terms for this vocabulary does not exist.', Response::HTTP_NOT_FOUND);
    }

    $context = new RenderContext();
    /* @var \Drupal\Core\Cache\CacheableDependencyInterface $result */
    $result = \Drupal::service('renderer')->executeInRenderContext($context, function () use ($terms, $storage, $vid) {

      $display_id = 'taxonomy_term.' . $vid . '.default';
      $output = [];
      foreach ($terms as $term) {
        $data = ['name' => $term->name];
        $term_object = $storage->load($term->tid);
        $this->mckRestManager->getValues($display_id, $term_object, $data);
        $output[] = $data;
      }

      return $output;
    });


    $response = new CacheableJsonResponse($result);
    if (!$context->isEmpty()) {
      $metadata = $context->pop();
      $response->addCacheableDependency($metadata);
    }

    //$response->addCacheableDependency($user);
    $response->addCacheableDependency($request->attributes->get(AccessAwareRouterInterface::ACCESS_RESULT));
    $requested_url = Url::fromUserInput($request->getRequestUri());
    $response->addCacheableDependency($requested_url);

    return $response;
  }

}
