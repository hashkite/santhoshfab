<?php

namespace Drupal\mck_rest_apis\Plugin\ExtraField\Display;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\extra_field_plus\Plugin\ExtraFieldPlusDisplayBase;

/**
 * Example Extra field Display.
 *
 * @ExtraFieldDisplay(
 *   id = "related_nodes",
 *   label = @Translation("Related Nodes"),
 *   bundles = {
 *     "taxonomy_term.*",
 *   },
 *   visible = false
 * )
 */
class RelatedNodes extends ExtraFieldPlusDisplayBase {

  /**
   * {@inheritdoc}
   */
  public function view(ContentEntityInterface $entity): array {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  protected static function extraFieldSettingsForm(): array {
    $form = parent::extraFieldSettingsForm();

    $target_id = 'node';
    $nodeEntity = \Drupal::service('entity_display.repository');
    $view_modes = $nodeEntity->getViewModes($target_id);

    $options = ['default' => t('Default')];
    foreach ($view_modes as $id => $view_mode) {
      $options[$id] = $view_mode['label'];
    }
    $form['label'] = [
      '#type' => 'textfield',
      '#title' => t('Link label'),
    ];
    $form['view_mode'] = [
      '#type' => 'select',
      '#title' => t('View mode'),
      //'#default_value' => $this->getSetting('view_mode'),
      '#options' => $options,
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  protected static function defaultExtraFieldSettings(): array {
    $values = parent::defaultExtraFieldSettings();

    $values += [
      'view_mode' => 'teaser',
    ];

    return $values;
  }

  /**
   * {@inheritdoc}
   */
  protected static function settingsSummary(string $field_id, string $entity_type_id, string $bundle, string $view_mode = 'default'): array {
    return [
      t('View mode: @view_mode', [
        '@view_mode' => self::getExtraFieldSetting($field_id, 'view_mode', $entity_type_id, $bundle, $view_mode),
      ]),
    ];
  }

}
