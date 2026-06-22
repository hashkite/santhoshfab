<?php

namespace Drupal\mck_rest_apis\Plugin\ExtraField\Display;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\extra_field_plus\Plugin\ExtraFieldPlusDisplayBase;

/**
 * Example Extra field Display.
 *
 * @ExtraFieldDisplay(
 *   id = "favorite",
 *   label = @Translation("Add to favorite"),
 *   bundles = {
 *     "node.*"
 *   },
 *   visible = false
 * )
 */
class Favorite extends ExtraFieldPlusDisplayBase {

  /**
   * {@inheritdoc}
   */
  public function view(ContentEntityInterface $entity): array {
    return [];
  }

}
