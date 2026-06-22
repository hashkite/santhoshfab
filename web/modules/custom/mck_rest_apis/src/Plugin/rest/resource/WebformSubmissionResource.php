<?php

namespace Drupal\mck_rest_apis\Plugin\rest\resource;

use Drupal\Component\Serialization\Json;
use Drupal\webform\WebformSubmissionForm;
use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ModifiedResourceResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Creates a resource for retrieving webform submission data.
 *
 * @RestResource(
 *   id = "webform_rest_submission",
 *   label = @Translation("Webform Submission"),
 *   uri_paths = {
 *     "canonical" = "/webform_rest/{webform_id}/submission/{uuid}"
 *   }
 * )
 */
class WebformSubmissionResource extends ResourceBase {

  /**
   * The entity type manager object.
   *
   * @var \Drupal\Core\Entity\EntityTypeManager
   */
  protected $entityTypeManager;

  /**
   * The request object.
   *
   * @var \Symfony\Component\HttpFoundation\RequestStack
   */
  protected $request;

  /**
   * The pdf manager.
   *
   * @var \Drupal\mck_rest_apis\PdfManagerInterface
   */
  protected $pdfManager;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    $instance = parent::create($container, $configuration, $plugin_id, $plugin_definition);
    $instance->entityTypeManager = $container->get('entity_type.manager');
    $instance->request = $container->get('request_stack');
    $instance->pdfManager = $container->get('mck_rest_apis.pdf_manager');
    return $instance;
  }

  /**
   * Retrieve submission data.
   *
   * @param string $webform_id
   *   Webform ID.
   * @param string $uuid
   *   Webform Submission UUID.
   *
   * @return \Drupal\rest\ModifiedResourceResponse
   *   HTTP response object containing webform submission.
   */
  public function get(string $webform_id, string $uuid): ModifiedResourceResponse {
    if (empty($webform_id) || empty($uuid)) {
      $errors = [
        'error' => [
          'message' => $this->t('Both webform ID and submission UUID are required.'),
        ],
      ];
      return new ModifiedResourceResponse($errors, Response::HTTP_BAD_REQUEST);
    }

    // Load the webform submission.
    $webform_submission = $this->entityTypeManager->getStorage('webform_submission')->loadByProperties(['uuid' => $uuid]);
    if (empty($webform_submission)) {
      $errors = [
        'error' => [
          'message' => $this->t('Invalid submission UUID.'),
        ],
      ];
      return new ModifiedResourceResponse($errors, Response::HTTP_BAD_REQUEST);
    }
    $webform_submission = reset($webform_submission);

    // Check for a submission.
    if (!empty($webform_submission)) {
      $submission_webform_id = $webform_submission->get('webform_id')->getString();

      // Check webform_id.
      if ($submission_webform_id == $webform_id) {

        // Grab submission data.
        $data = $webform_submission->getData();

        $response = [
          'entity' => $webform_submission,
          'data' => $data,
        ];

        // Return the submission.
        return new ModifiedResourceResponse($response);
      }
    }

    throw new NotFoundHttpException(t("Can't load webform submission."));

  }

  /**
   * Update submission data.
   *
   * @param string $webform_id
   *   Webform ID.
   * @param string $uuid
   *   Webform Submission UUID.
   *
   * @return \Drupal\rest\ModifiedResourceResponse
   *   HTTP response object containing webform submission.
   */
  public function patch(string $webform_id, string $uuid) {
    if (empty($webform_id) || empty($uuid)) {
      $errors = [
        'error' => [
          'message' => $this->t('Both webform ID and submission UUID are required.'),
        ],
      ];
      return new ModifiedResourceResponse($errors, Response::HTTP_BAD_REQUEST);
    }

    $webform_data = $this->request->getCurrentRequest()->getContent();
    if (empty($webform_data)) {
      $errors = [
        'error' => [
          'message' => $this->t('No data has been submitted.'),
        ],
      ];
      return new ModifiedResourceResponse($errors, Response::HTTP_BAD_REQUEST);
    }

    $webform_data = Json::decode($webform_data);

    // Load the webform submission.
    $webform_submission = $this->entityTypeManager->getStorage('webform_submission')->loadByProperties(['uuid' => $uuid]);
    if (empty($webform_submission)) {
      $errors = [
        'error' => [
          'message' => $this->t('Invalid submission UUID.'),
        ],
      ];
      return new ModifiedResourceResponse($errors, Response::HTTP_BAD_REQUEST);
    }
    $webform_submission = reset($webform_submission);

    // Check for a submission.
    if (!empty($webform_submission)) {
      $submission_webform_id = $webform_submission->get('webform_id')->getString();

      // Check webform_id.
      if ($submission_webform_id == $webform_id) {
        if (isset($webform_data['in_draft'])) {
          $webform_submission->set('in_draft', $webform_data['in_draft']);

          if (!$webform_data['in_draft']) {
            $elements = $webform_submission->getWebform()->getElementsDecoded();
            $doc_id = $this->pdfManager->generate($webform_data, $elements, $uuid);
            $webform_data['pdf'] = $doc_id;
          }
          unset($webform_data['in_draft']);
        }

        foreach ($webform_data as $field => $value) {
          $webform_submission->setElementData($field, $value);
        }


        $errors = WebformSubmissionForm::validateWebformSubmission($webform_submission);

        // Check there are no validation errors.
        if (!empty($errors)) {
          $errors = ['error' => $errors];
          return new ModifiedResourceResponse($errors, Response::HTTP_BAD_REQUEST);
        }
        else {
          // Return submission UUID.
          $webform_submission = WebformSubmissionForm::submitWebformSubmission($webform_submission);
        }

        // Return submission UUID.
        return new ModifiedResourceResponse(['sid' => $webform_submission->uuid()]);
      }
    }

    throw new NotFoundHttpException(t("Can't load webform submission."));
  }

}
