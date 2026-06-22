<?php

namespace Drupal\mck_rest_apis\Form;

use Drupal\Core\Locale\CountryManager;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\State\StateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class SetPrefixForm.
 *
 * @package Drupal\mck_rest_apis\Form
 */
class SetPrefixForm extends FormBase {

  /**
   * The state service.
   *
   * @var \Drupal\Core\State\StateInterface
   */
  protected $state;

  /**
   * Constructs SetPrefixForm.
   *
   * @param \Drupal\Core\State\StateInterface $state
   *   The state service.
   */
  public function __construct(StateInterface $state) {
    $this->state = $state;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container): SetPrefixForm {
    return new static($container->get('state'));
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId(): string {
    return 'mck_rest_apis_prefix_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state): array {
    $form['prefix'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Set prefix'),
      '#description' => $this->t('Set prefix for React api.'),
      '#multiple' => TRUE,
      '#size' => 25,
      '#default_value' => $this->state->get('mck_rest_apis_prefix_config') ?? [],
    ];

    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Save'),
    ];

    return $form;

  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state): void {
    $prefix = $form_state->getValue('prefix');
    $this->state->set('mck_rest_apis_prefix_config', $prefix);
  }

}
