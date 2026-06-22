<?php

namespace Drupal\mck_rest_apis;

use Drupal\Core\Entity\EntityInterface;

/**
 * Interface MckRestManagerInterface.
 *
 * @package Drupal\mck_rest_apis
 */
interface MckRestManagerInterface {

  /**
   * Returns values of the entity by configs.
   *
   * @param string $display_id
   *   View mode.
   * @param \Drupal\Core\Entity\EntityInterface $entity
   *   Entity object.
   * @param array $values
   *   View mode.
   */
  public function getValues(string $display_id, EntityInterface $entity, array &$values);

  /**
   * Returns value of the paragraph by field and type.
   *
   * @param \Drupal\Core\Entity\EntityInterface $paragraph
   *   Paragraph entity.
   * @param string $field_name
   *   Field name.
   * @param string|null $type
   *   Type of the field.
   * @param string|null $label
   *   Type of the label.
   * @param string|null $mode
   *   View mode.
   * @param string|null $storage
   *   Storage id.
   * @param bool|null $convert_media
   *   Convert media to webp.
   *
   * @return array
   *   Values array.
   */
  public function getValue(EntityInterface $paragraph, string $field_name, ?string $type = 'default', ?string $label = 'hidden', ?string $mode = 'teaser', ?string $storage = 'paragraph', ?bool $convert_media = FALSE): array;

  /**
   * Returns value view by ids.
   *
   * @param string $target_id
   *   View id.
   * @param string $display_id
   *   View display id.
   * @param mixed $arguments
   *   View arguments.
   *
   * @return array
   *   Values array.
   */
  public function getViewValues(string $target_id, string $display_id, $paragraph = NULL, $arguments = []): array;

  /**
   * Returns menu output by name.
   *
   * @param string $menu_name
   *   Menu name.
   *
   * @return array
   *   Menu array.
   */
  public function getMenuItems(string $menu_name): array;

  /**
   * Returns menu output by name.
   *
   * @param string $url
   *   Node alias.
   *
   * @return mixed
   *   Node object or error message.
   */
  public function getNodeByAlias(string $url);

  /**
   * Returns node output by name.
   *
   * @param string $url
   *   Node alias.
   *
   * @return mixed
   *   Node object or error message.
   */
  public function getUserByAlias(string $url);

  /**
   * Returns user picture.
   *
   * @param int $uid
   *   Node alias.
   *
   * @return array
   *   User array or image.
   */
  public function getUserPicture(int $uid = 0): array;
}
