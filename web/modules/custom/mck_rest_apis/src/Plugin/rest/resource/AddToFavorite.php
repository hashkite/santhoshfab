<?php

/**
 * The following custom rest api will be used to return values of a node
 */

namespace Drupal\mck_rest_apis\Plugin\rest\resource;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\mck_rest_apis\MckRestManagerInterface;
use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ModifiedResourceResponse;
use Drupal\user\Entity\User;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Response;

/**
 * Represents entities as resources.*
 *
 * @see \Drupal\rest\Plugin\Deriver\EntityDeriver
 *
 * @RestResource(
 *   id = "add_to_favorite",
 *   label = @Translation("Add to favorite"),
 *   serialization_class = "",
 *   uri_paths = {
 *     "create" = "/add-to-favorite/{action}/{uuid}"
 *   }
 * )
 */
class AddToFavorite extends ResourceBase {

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
   *   The entity type manager.
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
   * Add or remove to/from favorite.
   *
   * @param string $action
   *   Action add/remove.
   * @param string $uuid
   *   Uuid of the entity.
   *
   * @return ModifiedResourceResponse
   *   Node output.
   */
  public function post(string $action, string $uuid): ModifiedResourceResponse {

    try {
      $favorite_id = $this->entityTypeManager->getStorage('node')->loadByProperties(['uuid' => $uuid]);
      if (!$favorite_id) {
        $errors = [
          'error' => [
            'message' => 'You have sent incorrect id.',
          ],
        ];

        return new ModifiedResourceResponse($errors, Response::HTTP_BAD_REQUEST);
      }

      $user_id = $this->user->id();
      $user = $this->entityTypeManager->getStorage('user')->load($user_id);
      $favorite = $user->get('field_favorite')->getValue();
      $favorite_id = reset($favorite_id);
      $favorite_id = $favorite_id->id();
      if ($action === 'add') {
        $existing = array_column($favorite, 'target_id');
        if (!in_array($favorite_id, $existing)) {
          $favorite += ['target_id' => $favorite_id];
          $user->set('field_favorite', $favorite);
        }
        $url = '/add-to-favorite/remove/' . $uuid;
        $favorite_bool = TRUE;
      }
      elseif ($action === 'remove') {
        foreach ($favorite as $key => $item) {
          if ($item['target_id'] === $favorite_id) {
            unset($favorite[$key]);
          }
        }
        $user->set('field_favorite', $favorite);
        $url = '/add-to-favorite/add/' . $uuid;
        $favorite_bool = FALSE;
      }
      else {
        $errors = [
          'error' => [
            'message' => 'Incorrect action. Possible actions are add|remove',
          ],
        ];

        return new ModifiedResourceResponse($errors, Response::HTTP_BAD_REQUEST);
      }

      $user->save();
    }
    catch (\Exception $exception) {
      $errors = [
        'error' => [
          'message' => $exception->getMessage(),
        ],
      ];

      return new ModifiedResourceResponse($errors, Response::HTTP_BAD_REQUEST);
    }

    $data = [
      'url' => $url,
      'favorite' => $favorite_bool,
    ];

    return (new ModifiedResourceResponse($data));
  }

}
