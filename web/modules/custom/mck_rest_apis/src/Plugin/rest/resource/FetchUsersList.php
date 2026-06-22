<?php

/**
 * The following custom rest api will be used to return values of a node
 */

namespace Drupal\mck_rest_apis\Plugin\rest\resource;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Cache\CacheableJsonResponse;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Render\RenderContext;
use Drupal\Core\Routing\AccessAwareRouterInterface;
use Drupal\Core\Routing\RouteMatch;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\Core\Url;
use Drupal\taxonomy\Entity\Term;
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
 *   id = "fetch_users_list",
 *   label = @Translation("Users list"),
 *   serialization_class = "",
 *   uri_paths = {
 *     "canonical" = "/fetch/users-list"
 *   }
 * )
 */

class FetchUsersList extends ResourceBase
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
   * @var \Drupal\Core\Session\AccountProxyInterface
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
  public function __construct(array $configuration, $plugin_id, $plugin_definition, array $serializer_formats, LoggerInterface $logger, MckRestManagerInterface $mckRestManager, AccountProxyInterface $user)
  {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $serializer_formats, $logger);
    $this->mckRestManager = $mckRestManager;
    $this->user = $user;
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
    );
  }

  /**
   * Returns the list of users.
   *
   * @return ModifiedResourceResponse
   *   The list of users.
   */
  public function get()
  {
    // Fetch the list of users.
    $users = \Drupal::entityTypeManager()->getStorage('user')->loadMultiple();

    // Format the user data as needed.
    $formatted_users = [];
    foreach ($users as $user) {
      // Format user data.
      $userId = $user->id();
      $userImg = $user->get('field_image')->entity;
      $countryRef = $user->get('field_country_ref')->target_id;
      $country = [];
      if ($countryRef) {
        $term = Term::load($countryRef);
        $termName = $term->getName();
        $termImg = $term->get('field_icon')->entity->get('field_media_image');
        $country = [
          'name' => $termName,
          'image' => $termImg,
        ];
      }

      if ($userId > 1 && $userImg) { // Not anonymous and not admin
        $formatted_users[] = [
          'id' => $user->id(),
          'name' => $user->getDisplayName(),
          'img' => $userImg->get('field_media_image'),
          'country' => $country,
        ];
      }
    }

    // Return the formatted user list.
    return new ModifiedResourceResponse($formatted_users);
  }

}
