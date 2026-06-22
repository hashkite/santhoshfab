<?php

/**
 * The following custom rest api will be used to return values of a menu.
 */

namespace Drupal\mck_rest_apis\Plugin\rest\resource;

use Drupal\Core\Cache\CacheableJsonResponse;
use Drupal\Core\Entity\EntityRepositoryInterface;
use Drupal\Core\Menu\MenuActiveTrailInterface;
use Drupal\Core\Menu\MenuLinkTreeInterface;
use Drupal\Core\Render\RenderContext;
use Drupal\Core\Routing\AccessAwareRouterInterface;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\Core\Url;
use Drupal\mck_rest_apis\MckRestManagerInterface;
use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ModifiedResourceResponse;
use Drupal\system\Entity\Menu;
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
 *   id = "fetch_menu",
 *   label = @Translation("Menu by name"),
 *   serialization_class = "",
 *   uri_paths = {
 *     "canonical" = "/fetch/menu/{menu_name}"
 *   }
 * )
 */
class FetchMenu extends ResourceBase {

  /**
   * The msk rest manager.
   *
   * @var \Drupal\mck_rest_apis\MckRestManagerInterface
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
   * @param \Drupal\mck_rest_apis\MckRestManagerInterface $mckRestManager
   *   The msk rest manager.
   * @param AccountProxyInterface $user
   * *   User proxy, for checking permissions.
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
   * Returns menu output by name.
   *
   * @param string $menu_name
   *   Request object.
   * @param Request $request
   *   Request object.
   *
   * @return ModifiedResourceResponse|CacheableJsonResponse
   *   Menu output.
   */
  public function get(string $menu_name, Request $request) {
    $menu_entity = Menu::load($menu_name);
    $context = new RenderContext();
    /* @var \Drupal\Core\Cache\CacheableDependencyInterface $result */
    $result = \Drupal::service('renderer')->executeInRenderContext($context, function() use ($menu_name, $menu_entity) {
      $menu = $this->mckRestManager->getMenuItems($menu_name);
      if (isset($menu['message'])) {
        return $menu;
      }

      return [
        'label' => $menu_entity->label(),
        'is_logged_in' => $this->user->isAuthenticated(),
        'links' => $menu,
      ];
    });

    if (isset($result['message'])) {

      return new ModifiedResourceResponse($result['message'], Response::HTTP_NOT_FOUND);
    }

    $response = new CacheableJsonResponse($result);
    if (!$context->isEmpty()) {
      $metadata = $context->pop();
      $response->addCacheableDependency($metadata);
    }

    $response->addCacheableDependency($menu_entity);
    $response->addCacheableDependency($request->attributes->get(AccessAwareRouterInterface::ACCESS_RESULT));
    $requested_url = Url::fromUserInput($request->getRequestUri());
    $response->addCacheableDependency($requested_url);

    return $response;
  }

}
