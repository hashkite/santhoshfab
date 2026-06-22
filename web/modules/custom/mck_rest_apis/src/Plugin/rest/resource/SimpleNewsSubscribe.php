<?php

namespace Drupal\mck_rest_apis\Plugin\rest\resource;

use Drupal\Component\Serialization\Json;
use Drupal\simplenews\Entity\Newsletter;
use Drupal\simplenews\Entity\Subscriber;
use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ModifiedResourceResponse;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Response;

/**
 * Add subscriber to newsletter.
 *
 * @RestResource(
 *   id = "simple_news_subscribe",
 *   label = @Translation("Simple News Subscribe"),
 *   uri_paths = {
 *     "create" = "/simplenews/subscribe"
 *   }
 * )
 */
class SimpleNewsSubscribe extends ResourceBase {

  /**
   * The renderer service.
   *
   * @var \Drupal\Core\Render\RendererInterface
   */
  protected $renderer;

  /**
   * The request object.
   *
   * @var \Symfony\Component\HttpFoundation\RequestStack
   */
  protected $request;

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * Subscriber Storage.
   *
   * @var \Drupal\simplenews\Subscription\SubscriptionStorage
   */
  protected $subscriptionStorage;

  /**
   * The subscription manager.
   *
   * @var \Drupal\simplenews\Subscription\SubscriptionManagerInterface
   */
  protected $subscriptionManager;

  /**
   * The Mail manager.
   *
   * @var \Drupal\Core\Mail\MailManagerInterface
   */
  protected $mailManager;

  /**
   * The Mail manager.
   *
   * @var mixed
   */
  protected $mailValidator;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    $instance = parent::create($container, $configuration, $plugin_id, $plugin_definition);
    $instance->entityTypeManager = $container->get('entity_type.manager');
    $instance->request = $container->get('request_stack');
    $instance->renderer = $container->get('renderer');
    $instance->subscriptionStorage = $instance->entityTypeManager->getStorage('simplenews_subscriber');
    $instance->subscriptionManager = $container->get('simplenews.subscription_manager');
    $instance->mailManager = $container->get('plugin.manager.mail');
    $instance->mailValidator = $container->get('email.validator');
    return $instance;
  }

  /**
   * Responds to entity POST requests and saves the new entity.
   *
   * @return \Drupal\rest\ModifiedResourceResponse
   *   The HTTP response object.
   *
   * @throws \Symfony\Component\HttpKernel\Exception\HttpException
   *   Throws HttpException in case of error.
   */
  public function post() {
    $data = $this->request->getCurrentRequest()->getContent();
    if (empty($data)) {
      $errors = [
        'error' => [
          'message' => $this->t('No data has been submitted.'),
        ],
      ];

      return new ModifiedResourceResponse($errors, Response::HTTP_BAD_REQUEST);
    }
    $data = Json::decode($data);
    if (!$data['email'] || !$this->mailValidator->isValid($data['email'])) {
      $errors = [
        'error' => [
          'message' => $this->t('Invalid or missing E-Mail.'),
        ],
      ];

      return new ModifiedResourceResponse($errors, Response::HTTP_BAD_REQUEST);
    }

    if (!$data['newsletter_id']) {
      $errors = [
        'error' => [
          'message' => $this->t('You must provide the newsletter id to subscribe to.'),
        ],
      ];

      return new ModifiedResourceResponse($errors, Response::HTTP_BAD_REQUEST);
    }

    // Check if subscriber with mail is already created.
    $subscriber = $this->subscriptionStorage->loadByProperties(['mail' => $data['email']]);

    if (!count($subscriber)) {
      $subscriber = Subscriber::create(['mail' => $data['email']]);
      $subscriber->save();
    }

    if (is_array($data['newsletter_id'])) {
      foreach ($data['newsletter_id'] as $newsletter) {
        $this->subscriptionManager->subscribe($data['email'], $newsletter, TRUE);
        $newsletters[] = Newsletter::load($newsletter)->name;
      }
    }
    else {
      $this->subscriptionManager->subscribe($data['email'], $data['newsletter_id'], TRUE);
      $newsletters = [Newsletter::load($data['newsletter_id'])->name];
    }

    $message = $data['email'] . ' was subscribed to the newsletter(s) ' . implode(', ', $newsletters ?? []);

    return new ModifiedResourceResponse(['response' => $message]);
  }

}
