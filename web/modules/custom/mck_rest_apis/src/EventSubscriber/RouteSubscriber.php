<?php

namespace Drupal\mck_rest_apis\EventSubscriber;

use Drupal\Core\Routing\RouteSubscriberBase;
use Symfony\Component\Routing\RouteCollection;

/**
 * Listens to the dynamic route events.
 */
class RouteSubscriber extends RouteSubscriberBase {

  /**
   * {@inheritdoc}
   */
  protected function alterRoutes(RouteCollection $collection): void {
    if ($route = $collection->get('simplenews.newsletter_subscriptions_user')) {
      $route->setRequirement('_role', 'none');
    }
  }

}
