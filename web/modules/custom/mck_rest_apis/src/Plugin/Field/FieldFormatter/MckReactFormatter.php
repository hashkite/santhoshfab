<?php

declare(strict_types = 1);

namespace Drupal\mck_rest_apis\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Form\FormStateInterface;

/**
 * Plugin implementation of the 'Interactive' formatter.
 *
 * @FieldFormatter(
 *   id = "mck_react",
 *   label = @Translation("Mck React"),
 *   field_types = {
 *     "entity_reference",
 *     "entity_reference_revisions",
 *     "link",
 *     "datetime",
 *     "daterange",
 *     "timestamp",
 *     "created",
 *     "changed",
 *     "string",
 *     "string_long",
 *     "email",
 *     "file",
 *     "color_field_type",
 *     "text",
 *     "text_long",
 *     "text_with_summary",
 *     "viewfield",
 *     "webform",
 *     "list_string",
 *     "boolean",
 *     "yearonly",
 *     "float",
 *     "decimal",
 *     "integer",
 *   }
 * )
 */
class MckReactFormatter extends FormatterBase {

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings(): array {
    $settings = [];

    // Fall back to field settings by default.
    $settings['format'] = 'default';
    $settings['view_mode'] = 'teaser';
    $settings['storage'] = 'paragraph';
    $settings['convert'] = FALSE;

    return $settings;
  }

  /**
   * Gets the available format options.
   *
   * @return array|string
   *   A list of output formats. Each entry is keyed by the machine name of the
   *   format. The value is an array, of which the first item is the result for
   *   boolean TRUE, the second is for boolean FALSE. The value can be also an
   *   array, but this is just the case for the custom format.
   */
  protected function getOutputFormats() {
    return [
      'default' => $this->t('Default'),
      'multiple' => $this->t('Multiple values'),
      'link' => $this->t('Link'),
      'media' => $this->t('Media'),
      'file' => $this->t('File and Image'),
      'bool' => $this->t('Bool'),
      'color' => $this->t('Color'),
      'view' => $this->t('View'),
      'taxonomy' => $this->t('Taxonomy'),
      'timestamp' => $this->t('Timestamp'),
      'reference' => $this->t('Reference'),
      'webform' => $this->t('Webform'),
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state): array {
    $form = parent::settingsForm($form, $form_state);

    $form['format'] = [
      '#type' => 'select',
      '#title' => $this->t('Output format'),
      '#default_value' => $this->getSetting('format'),
      '#options' => $this->getOutputFormats(),
      '#attributes' => ['id' => 'mck-rest-apis-mck-react-format'],
    ];

    $target_id = $this->fieldDefinition->getFieldStorageDefinition()->getSetting('target_type');
    if ($target_id === 'config_pages_type') {
      $target_id = 'config_pages';
    }

    $nodeEntity = \Drupal::service('entity_display.repository');
    $view_modes = $nodeEntity->getViewModes($target_id);

    $options = ['default' => $this->t('Default')];
    foreach ($view_modes as $id => $view_mode) {
      $options[$id] = $view_mode['label'];
    }

    $form['view_mode'] = [
      '#type' => 'select',
      '#title' => $this->t('View mode'),
      '#default_value' => $this->getSetting('view_mode'),
      '#options' => $options,
      '#states' => [
        'visible' => [
          'select#mck-rest-apis-mck-react-format' => ['value' => 'reference'],
        ],
      ],
    ];

    $form['convert'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Convert to webp.'),
      '#default_value' => $this->getSetting('convert'),
      '#states' => [
        'visible' => [
          'select#mck-rest-apis-mck-react-format' => ['value' => 'media'],
        ],
      ],
    ];

    $form['storage'] = [
      '#type' => 'hidden',
      '#title' => $this->t('Storage'),
      '#value' => $target_id,
      '#default_value' => $target_id,
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary(): array {
    $setting = $this->getSetting('format');
    $formats = $this->getOutputFormats();
    $summary[] = $formats[$setting];

    return $summary;
  }


  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode): array {
    return [];
  }

}
