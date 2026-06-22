<?php

namespace Drupal\mck_rest_apis;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityRepositoryInterface;
use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\File\FileUrlGeneratorInterface;
use Drupal\Core\Form\FormBuilderInterface;
use Drupal\Core\Form\FormState;
use Drupal\Core\Menu\MenuActiveTrailInterface;
use Drupal\Core\Menu\MenuLinkTreeInterface;
use Drupal\Core\Menu\MenuTreeParameters;
use Drupal\Core\Render\Markup;
use Drupal\Core\Render\RendererInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\Core\Url;
use Drupal\file\Entity\File;
use Drupal\image\Entity\ImageStyle;
use Drupal\node\NodeInterface;
use Drupal\path_alias\AliasManagerInterface;
use Drupal\user\UserInterface;
use Drupal\views\Form\ViewsExposedForm;
use Drupal\views\Views;
use enshrined\svgSanitize\Sanitizer;

/**
 * Class MckRestManager
 *
 * @package Drupal\mck_rest_apis
 */
class MckRestManager implements MckRestManagerInterface {
  use StringTranslationTrait;

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected EntityTypeManagerInterface $entityTypeManager;

  /**
   * The media storage.
   *
   * @var \Drupal\Core\Entity\EntityStorageInterface
   */
  protected EntityStorageInterface $mediaStorage;

  /**
   * The paragraph storage.
   *
   * @var \Drupal\Core\Entity\EntityStorageInterface
   */
  protected EntityStorageInterface $paragraphStorage;

  /**
   * The taxonomy term storage.
   *
   * @var \Drupal\Core\Entity\EntityStorageInterface
   */
  protected EntityStorageInterface $taxonomyStorage;

  /**
   * The entity view display storage.
   *
   * @var \Drupal\Core\Entity\EntityStorageInterface
   */
  protected EntityStorageInterface $entityViewDisplayStorage;

  /**
   * The file storage.
   *
   * @var \Drupal\Core\Entity\EntityStorageInterface
   */
  protected EntityStorageInterface $fileStorage;

  /**
   * The file storage.
   *
   * @var \Drupal\Core\Entity\EntityStorageInterface
   */
  protected EntityStorageInterface $nodeStorage;

  /**
   * Form builder.
   *
   * @var \Drupal\Core\Form\FormBuilderInterface
   */
  protected FormBuilderInterface $formBuilder;

  /**
   * The file URL generator.
   *
   * @var \Drupal\Core\File\FileUrlGeneratorInterface
   */
  protected $fileUrlGenerator;

  /**
   * The menu link tree service.
   *
   * @var \Drupal\Core\Menu\MenuLinkTreeInterface
   */
  protected $menuTree;

  /**
   * The active menu trail service.
   *
   * @var \Drupal\Core\Menu\MenuActiveTrailInterface
   */
  protected $menuActiveTrail;

  /**
   * The entity repository.
   *
   * @var \Drupal\Core\Entity\EntityRepositoryInterface
   */
  protected EntityRepositoryInterface $entityRepository;

  /**
   * The alias manager.
   *
   * @var AliasManagerInterface
   */
  protected AliasManagerInterface $aliasManager;

  /**
   * The current user.
   *
   * @var \Drupal\user\UserInterface
   */
  protected UserInterface $currentUserEntity;

  /**
   * Is user Authenticated.
   *
   * @var bool
   */
  protected bool $isAuthenticated;

  /**
   * Drupal\Core\Render\RendererInterface definition.
   *
   * @var \Drupal\Core\Render\RendererInterface
   */
  protected $renderer;

  /**
   * MckRestManager Constructor.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entityTypeManager
   *   The entity type manager.
   * @param \Drupal\Core\Form\FormBuilderInterface $form_builder
   *   FormBuilder.
   * @param \Drupal\Core\File\FileUrlGeneratorInterface $file_url_generator
   *   The file URL generator.
   * @param \Drupal\Core\Menu\MenuLinkTreeInterface $menu_tree
   *   The menu tree service.
   * @param \Drupal\Core\Menu\MenuActiveTrailInterface $menu_active_trail
   *   The active menu trail service.
   * @param EntityRepositoryInterface $entityRepository
   *   The entity repository.
   * @param AliasManagerInterface $alias_manager
   *   The alias manager.
   * @param \Drupal\Core\Session\AccountInterface $current_user
   *   The current user.
   */
  public function __construct(EntityTypeManagerInterface $entityTypeManager, FormBuilderInterface $form_builder, FileUrlGeneratorInterface $file_url_generator, MenuLinkTreeInterface $menu_tree, MenuActiveTrailInterface $menu_active_trail, EntityRepositoryInterface $entityRepository, AliasManagerInterface $alias_manager, AccountInterface $current_user, RendererInterface $renderer) {
    $this->entityTypeManager = $entityTypeManager;
    $this->mediaStorage = $entityTypeManager->getStorage('media');
    $this->paragraphStorage = $entityTypeManager->getStorage('paragraph');
    $this->taxonomyStorage = $entityTypeManager->getStorage('taxonomy_term');
    $this->entityViewDisplayStorage = $entityTypeManager->getStorage('entity_view_display');
    $this->fileStorage = $this->entityTypeManager->getStorage('file');
    $this->nodeStorage = $this->entityTypeManager->getStorage('node');
    $this->currentUserEntity = $this->entityTypeManager->getStorage('user')->load($current_user->id());
    $this->isAuthenticated = $current_user->isAuthenticated();
    $this->formBuilder = $form_builder;
    $this->fileUrlGenerator = $file_url_generator;
    $this->menuTree = $menu_tree;
    $this->menuActiveTrail = $menu_active_trail;
    $this->entityRepository = $entityRepository;
    $this->aliasManager = $alias_manager;
    $this->renderer = $renderer;
  }

  /**
   * {@inheritdoc}
   */
  public function getValues(string $display_id, EntityInterface $entity, array &$values) {
    $view_display = $this->entityViewDisplayStorage->load($display_id);
    if (!$view_display) {
      return;
    }

    $config = $view_display->toArray();
    if (isset($config['content']['extra_field_popup'])) {
      $view_mode = $config['content']['extra_field_popup']['settings']['view_mode'];
      $values['popup_url'] = '/fetch/node/' . $entity->uuid() . '/' . $view_mode;
    }
    if (isset($config['content']['extra_field_related_nodes'])) {
      $view_mode = $config['content']['extra_field_related_nodes']['settings']['view_mode'];
      //$this->getValues($entity, 'node.', $format, $item['label'], $mode, $storage);
      $nodes = $this->nodeStorage->loadByProperties([
        'field_service' => $entity->id(),
        'type' => 'sub_service',
      ]);
      $values['related_nodes'] = [];
      foreach ($nodes as $node) {
        $related_di = 'node.' . $node->bundle() . '.' . $view_mode;
        $related_view_display = $this->entityViewDisplayStorage->load($related_di);
        if (!$related_view_display) {
          return;
        }

        $values['related_nodes'][$node->getTitle()] = $this->getParagraphValues($node, $view_mode);
      }

    }
    if (isset($config['content']['extra_field_created'])) {
      $label = $config['content']['extra_field_created']['settings']['label'] ?? '';
      $values['created'] = [
        'label' => $label,
        'value' => $entity->getCreatedTime(),
      ];
    }
    if ($this->isAuthenticated && isset($config['content']['extra_field_favorite'])) {
      $favorite = $this->currentUserEntity->get('field_favorite')->getValue();
      $favorite = array_column($favorite, 'target_id');
      $url = '/add-to-favorite/add/' . $entity->uuid();
      if (in_array($entity->id(), $favorite)) {
        $url = '/add-to-favorite/remove/' . $entity->uuid();
      }
      $values['add_to_favorite'] = [
        'url' => $url,
        'favorite' => in_array($entity->id(), $favorite),
      ];
    }
    if (!empty($config['content'])) {
      foreach ($config['content'] as $key => $item) {
        if (!is_array($item)) {
          continue;
        }

        if (isset($item['type']) && $item['type'] === 'mck_react') {
          $format = $item['settings']['format'];
          $mode = $item['settings']['view_mode'] ?? 'teaser';
          $storage = $item['settings']['storage'] ?? 'paragraph';
          $convert = $item['settings']['convert'] ?? FALSE;
          $values += $this->getValue($entity, $key, $format, $item['label'], $mode, $storage, $convert);
        }
      }
    }
  }

  /**
   * {@inheritdoc}
   */
  public function getValue(EntityInterface $paragraph, string $field_name, ?string $type = 'default', ?string $label = 'hidden', ?string $mode = 'teaser', ?string $storage = 'paragraph', $convert_media = FALSE): array {
    if (!$paragraph->hasField($field_name) || $paragraph->get($field_name)->isEmpty()) {
      return [];
    }
    $values = [];
    $property_name = str_replace('field_', '', $field_name);
    switch ($type) {
      case 'default':
        if ($paragraph->get($field_name)->value) {
          $values[$property_name]['value'] = htmlspecialchars_decode($paragraph->get($field_name)->value);
        }

        if (empty($values[$property_name]['value']) && $paragraph->get($field_name)->target_id) {
          $values[$property_name]['value'] = $paragraph->get($field_name)->target_id;
        }

        break;
      case 'multiple':
        $item_values = $paragraph->get($field_name)->getValue();
        $data = [];
        if (!empty($item_values)) {
          foreach ($item_values as $item_value) {
            $data[] = htmlspecialchars_decode($item_value['value']);
          }
        }
        $values[$property_name]['items'] = $data;

        break;
      case 'bool':
        $values[$property_name] = (bool) $paragraph->get($field_name)->value;
        break;
      case 'color':
        $values[$property_name]['value'] = $paragraph->get($field_name)->color;
        break;
      case 'link':

        $url_values = $paragraph->get($field_name)->getValue();
        if (!empty($url_values)) {
          foreach ($url_values as $url_value) {
            if (isset($url_value['uri'])) {
              $tmp = [
                'url' => Url::fromUri($url_value['uri'])->toString(),
                'title' => $url_value['title'],
                'external' => Url::fromUri($url_value['uri'])->isExternal(),
              ];
              if (isset($url_value['options']['attributes']['target'])) {
                $tmp['target'] = $url_value['options']['attributes']['target'];
              }
              if (isset($url_value['options']['attributes']['class'])) {
                $tmp['l_classes'] = implode(' ', $url_value['options']['attributes']['class']);
              }
              $values[$property_name]['items'][] = $tmp;
            }
          }
        }

        break;
      case 'media':
        $tmp = [];
        $medias = $paragraph->get($field_name)->getValue();
        foreach ($medias as $media) {
          $media = $this->mediaStorage->load($media['target_id']);
          $fid = $media?->getSource()?->getSourceFieldValue($media);
          if ($fid) {
            $tmp['items'][] = $this->getFileContent($fid, $media, NULL, $convert_media);
          }
        }

        $values[$property_name] = $tmp;
        break;
      case 'file':
        $tmp = [];
        $files = $paragraph->get($field_name)->getValue();
        if (!empty($files)) {
          foreach ($files as $file) {
            $tmp['items'][] = $this->getFileContent($file['target_id'], NULL, 'document');
          }
        }

        $values[$property_name] = $tmp;
        break;
      case 'view':

        $target_id = $paragraph->get($field_name)->target_id;
        $display_id = $paragraph->get($field_name)->display_id;
        $arguments = [$paragraph->get($field_name)->arguments];
        $values[$property_name] = $this->getViewValues($target_id, $display_id, $paragraph, $arguments);
        break;
      case 'taxonomy':
        $terms = $paragraph->get($field_name)->getValue();

        $tmp = [];
        foreach ($terms as $term) {
          $term = $this->taxonomyStorage->load($term['target_id']);
          if ($term) {
            $tmp['items'][] = $term->getName();
          }
        }
        $values[$property_name] = $tmp;
        break;

      case 'timestamp':
        $value = $paragraph->get($field_name)->value;
        $data = strtotime($value);
        if ($end_value = $paragraph->get($field_name)->end_value) {
          $data = [
            'value' => strtotime($value),
            'end_value' => strtotime($end_value),
          ];
        }

        $values[$property_name] = $data;
        break;

      case 'reference':
        $nodes = $paragraph->get($field_name)->getValue();
        $loaded_storage = $this->{sprintf('%sStorage', $storage)} ?? NULL;
        if (!$loaded_storage) {
          $loaded_storage = $this->entityTypeManager->getStorage($storage);
        }

        foreach ($nodes as $node) {
          $target_id = $node['target_id'];
          if (!$target_id) {
            continue;
          }

          $loaded = $loaded_storage->load($target_id);
          if (!$loaded) {
            continue;
          }

          $values[$property_name]['items'][] = $this->getParagraphValues($loaded, $mode);
        }

        break;

      case 'webform':
        $webform_id = $paragraph->get($field_name)->target_id;
        $webform_storage = $this->entityTypeManager->getStorage('webform');
        $webform = $webform_storage->load($webform_id);
        $form_output = [];

        if ($webform) {

          // Grab the form in its entirety.
          $form = $webform->getSubmissionForm();
          $weight = 0;
          foreach ($form['elements'] as $id => $item) {
            if (is_array($item) && isset($item['#type'])) {
              if ($item['#type'] === 'hidden') {
                continue;
              }

              $this->getFieldsSettings($form_output, $item, $id, $weight, $webform);
              $weight++;
            }
          }
        }

        $values[$property_name] = [
          'fields' => $form_output,
          'webform_id' => $webform_id,
        ];

        break;
    }

    if ($label !== 'hidden') {
      $field_label = $paragraph->get($field_name)->getFieldDefinition()->getLabel();
      if (!is_array($values[$property_name])) {
        $current_value = $values[$property_name];
        $values[$property_name] = [];
        $values[$property_name]['value'] = $current_value;
      }

      $values[$property_name]['label'] = $field_label;
    }

    return $values;
  }

  /**
   * {@inheritdoc}
   */
  public function getViewValues(string $target_id, string $display_id, $paragraph = NULL, $arguments = []): array {
    $view = Views::getView($target_id);
    $output = $pager_data = $group = $sorted_group = [];
    if (is_object($view)) {
      if (empty($arguments[0])) {
        $arguments = [];
      }
      if ($paragraph && method_exists($paragraph, 'getParentEntity') && $parent = $paragraph->getParentEntity()) {
        if ($parent->hasField('field_service')) {
          $arguments[] = $parent->id();
        }
      }

      if (!$arguments) {
        $arguments = [];
      }
      if (!is_array($arguments)) {
        $arguments = [$arguments];
      }
      if ($arguments) {
        $view->setArguments($arguments);
      }
      $view->setDisplay($display_id);
      $view->preExecute();
      $view->execute();
      $content = $view->buildRenderable($display_id, $arguments);
      if (isset($view->attachment_before[0])) {
        $attachment_before = $view->attachment_before[0]['#view'];
        $attachment_before = $attachment_before->render();
        if (!empty($attachment_before['#rows'])) {
          foreach ($attachment_before['#rows'] as $row) {
            if (!empty($row['#rows'])) {
              foreach ($row['#rows'] as $sub_row) {
                if (!empty($sub_row['rows'])) {
                  foreach ($sub_row['rows'] as $grand_sub_row) {
                    $rendered_item = [
                      'title' => $grand_sub_row->_entity->getTitle(),
                      'id' => $grand_sub_row->_entity->uuid(),
                    ];
                    $group[(string) $row['#title']][(string) $sub_row['group']][] = $rendered_item;
                  }
                }
              }
            }
          }

          ksort($group);
          $sorted_group = [];
          foreach ($group as $month => $new_group) {
            $month_name = date('F', mktime(0, 0, 0, $month, 10));
            $sorted_group[$month_name] = $new_group;
          }
        }
      }
      if (!empty($content['#view']->result)) {
        $view_mode = $view->rowPlugin->options['view_mode'] ?? 'teaser';
        $style = $view->getStyle()->getPluginId();
        if ($style === 'html_list') {
          $html_list = $view->render();
          if (!empty($html_list['#rows'])) {
            foreach ($html_list['#rows'] as $row) {
              $parent_name = (string) $row['#title'] ?? '';
              if ($parent_name) {
                $properties = [
                  'vid' => 'core_lop_topics',
                  'name' => $parent_name,
                ];
                $parent_term = $this->taxonomyStorage->loadByProperties($properties);
                if ($parent_term) {
                  $parent_term = reset($parent_term);
                  $term_output = $this->getParagraphValues($parent_term, 'token');
                  if (isset($term_output['image'])) {
                    $output[(string) $row['#title']]['image'] = $term_output['image'];
                  }
                }
              }
              if (!empty($row['#rows'])) {
                foreach ($row['#rows'] as $sub_row) {
                  if (!empty($sub_row['rows'])) {
                    foreach ($sub_row['rows'] as $grand_row) {
                      $output[(string) $row['#title']]['items'][( string) $sub_row['group']]['items'][] = $this->getParagraphValues($grand_row->_entity, $view_mode);
                    }
                  }
                  else {
                    $output[(string) $row['#title']]['items'][] = $this->getParagraphValues($sub_row['#node'], $view_mode);
                  }
                }
              }
            }
          }
        }
        else {
          $results = $content['#view']->result;
          foreach ($results as $result) {
            $output[] = $this->getParagraphValues($result->_entity, $view_mode);
          }
          $labels = [];
          if ($result->_entity instanceof ContentEntityInterface) {
            foreach ($result->_entity->getFields() as $name => $field) {
              $labels[str_replace('field_', '', $name)] = (string) $field->getFieldDefinition()->getLabel();
            }
          }
        }

      }
      $pager = $view->getPager();
      if ($view->getPager()->getPluginId() !== 'none') {
        $pager_data['total_items'] = $pager->getTotalItems();
        $pager_data['current_page'] = $pager->getCurrentPage();
        $pager_data['items_per_page'] = $pager->options['items_per_page'];
        $pager_data['total_pages'] = (int) ceil($pager_data['total_items'] / $pager_data['items_per_page']) - 1;
      }
    }

    $form_state = new FormState();
    $form_state->setFormState([
      'view' => $view,
      'display' => $view->display_handler->display,
      'exposed_form_plugin' => $view->display_handler->getPlugin('exposed_form'),
      'method' => 'get',
      'rerender' => TRUE,
      'no_redirect' => TRUE,
      'always_process' => TRUE, // This is important for handle the form status.
    ]);

    $form = $this->formBuilder->buildForm(ViewsExposedForm::class, $form_state);
    $form_output = [];
    foreach ($form as $field) {
      if (!is_array($field) || !isset($field['#type'])) {
        continue;
      }
      $tmp = [];
      if (isset($field['#options'])) {
        unset($field['#options']['All'], $field['#options']['']);
        $tmp['options'] = [];
        if (!empty($field['#options'])) {
          foreach ($field['#options'] as $key => $option) {
            $term = $this->taxonomyStorage->load($key);
            $tmp_option = [
              'key' => $key,
              'value' => $option,
            ];
            if (
              $term &&
              $term->hasField('field_image') &&
              !$term->get('field_image')->isEmpty()
            ) {
              $mid = $term->get('field_image')->target_id;
              $media = $this->mediaStorage->load($mid);
              $fid = $media?->getSource()?->getSourceFieldValue($media);
              if ($fid) {
                $tmp_option['image'] = $this->getFileContent($fid, $media);
              }
            }

            $tmp['options'][] = $tmp_option;
          }
        }
      }

      if ($field['#type'] === 'textfield') {
        $tmp['label'] = $field['#title'];
      }

      if (isset($field['#name']) && !empty($form['#info']['filter-' . $field['#name']]) && !empty($tmp)) {
        $filter = $form['#info']['filter-' . $field['#name']];
        $tmp['label'] = $filter['label'];
        if (!empty($filter['description'])) {
          $tmp['description'] = $filter['description'];
        }
      }

      if (!empty($tmp)) {
        if (!empty($field['#default_value'])) {
          $tmp['default_value'] = $field['#default_value'];
        }
        if (!empty($field['#type'])) {
          $tmp['type'] = $field['#type'];
        }
        if (!empty($field['#name'])) {
          $tmp['name'] = $field['#name'];
        }
        $form_output[] = $tmp;
      }
    }

    if (isset($view->header['result'])) {
      $header = $view->header['result']->render();
      $header = reset($header);
    }

    return [
      'view' => [
        'target_id' => $target_id,
        'display_id' => $display_id,
      ],
      'form' => $form_output ?? [],
      'header' => $header ?? [],
      'labels' => $labels ?? [],
      'rows' => $output,
      'attachment_before' => $sorted_group,
      'pager' => $pager_data,
    ];
  }

  /**
   * @param $fid
   * @param $media
   * @param $type
   * @param bool|null $convert_media
   *   Convert media to webp.
   * @return array
   */
  public function getFileContent($fid, $media = NULL, $type = NULL, ?bool $convert_media = FALSE): array {
    /**
     * @var \Drupal\file\Entity\File $file
     */
    $file = $this->fileStorage->load($fid);
    $svg = $alt = $name = $webp = '';
    $width = $height = 0;
    if ($file) {
      $src = $this->fileUrlGenerator->generateAbsoluteString($file->getFileUri());
      $name = $file->getFilename();
      if ($media && $media->hasField('field_media_image')) {
        $width = $media->get('field_media_image')->width;
        $height = $media->get('field_media_image')->height;
        $alt = $media->get('field_media_image')->alt;
      }
      // Render as SVG tag.
      $svgRaw = $this->fileGetContents($file);
      if ($svgRaw) {
        $svgRaw = preg_replace(['/<\?xml.*\?>/i', '/<!DOCTYPE((.|\n|\r)*?)">/i'], '', $svgRaw);
        $svgRaw = trim($svgRaw);
        $svg = (string)Markup::create($svgRaw);
      }
      elseif ($convert_media) {
        $style = $this->entityTypeManager->getStorage('image_style')->load('convert_to_webp');
        $webp = $style->buildUrl($file->getFileUri());
      }
    }

    if ($media) {
      $name = $media->getName();
    }

    $item = [
      'src' => $src ?? '',
      'name' => $name,
    ];

    if ($media) {
      $item['type'] = $media->bundle();
    }
    if ($type) {
      $item['type'] = $type;
    }

    if ($svg) {
      $item['svg'] = $svg;
    }
    if ($alt) {
      $item['alt'] = $alt;
    }
    if ($width) {
      $item['width'] = $width;
    }
    if ($height) {
      $item['height'] = $height;
    }
    if ($webp) {
      $item['webp'] = $webp;
    }

    return $item;
  }

  /**
   * {@inheritdoc}
   */
  public function getMenuItems(string $menu_name): array {
    $parameters = new MenuTreeParameters();
    $active_trail = $this->menuActiveTrail->getActiveTrailIds($menu_name);
    $parameters->setActiveTrail($active_trail);
    $parameters->setMinDepth(0);
    $tree = $this->menuTree->load($menu_name, $parameters);
    $manipulators = [
      ['callable' => 'menu.default_tree_manipulators:checkAccess'],
      ['callable' => 'menu.default_tree_manipulators:generateIndexAndSort'],
    ];
    $tree = $this->menuTree->transform($tree, $manipulators);
    if (empty($tree)) {

      return ['message' => (string) $this->t('Menu items for this menu name does not exist.')];
    }

    return $this->buildNestedMenu($this->menuTree->build($tree));
  }

  /**
   * {@inheritdoc}
   */
  public function getNodeByAlias(string $url) {
    $alias = $this->aliasManager->getPathByAlias($url);
    if (!$alias) {

      return ['message' => $this->t('Provide a correct url param.')];
    }
    $id = str_replace('/node/', '', $alias);
    /**
     * @var NodeInterface $node
     */
    $node = $this->entityTypeManager->getStorage('node')->load($id);
    if (!$node) {

      return ['message' => $this->t('Node with this id does not exist.')];
    }

    return $node;
  }

  /**
   * {@inheritdoc}
   */
  public function getUserByAlias(string $url) {
    $alias = $this->aliasManager->getPathByAlias($url);
    if (!$alias) {

      return ['message' => $this->t('Provide a correct url param.')];
    }
    $id = str_replace('/user/', '', $alias);
    /**
     * @var NodeInterface $node
     */
    $user = $this->entityTypeManager->getStorage('user')->load($id);
    if (!$user) {

      return ['message' => $this->t('USer with this id does not exist.')];
    }

    return $user;
  }

  /**
   * {@inheritdoc}
   */
  public function getUserPicture($uid = NULL): array {
    if ($uid) {
      $user = $this->entityTypeManager->getStorage('user')->load($uid);
    }
    else {
      $user = $this->currentUserEntity;
    }

    return $this->getValue($user, 'field_image', 'media', 'hidden', 'default', 'user', TRUE);
  }

  /**
   * Builds fields settings by link.
   *
   * @param array $pages
   *   Field settings array.
   * @param array $item
   *   Item array.
   * @param string $id
   *   Container id.
   * @param int $weight
   *   Weight of the element.
   */
  protected function getFieldsSettings(array &$form, array $item, string $id, int $weight, $webform): void {
    if ($item['#type'] === 'fieldset') {
      foreach ($item as $field_id => $field) {
        if (is_array($field) && isset($field['#type'])) {
          $form[$weight]['fields'][] = $this->getFieldSettings($field, $field_id, $webform);
          $form[$weight]['type'] = 'container';
        }
      }
      if (isset($item['#attributes']['class'])) {
        $form[$weight]['class'] = $item['#attributes']['class'][0];
      }

      if (isset($form[$weight]['fields'][0]['type'])) {
        $type = $form[$weight]['fields'][0]['type'];
        $form[$weight]['type'] = 'container_' . $type;
      }
      if (isset($item['#description']['#markup'])) {
        $form[$weight]['description'] = $item['#description']['#markup'];
      }
      if (isset($item['#help_title'])) {
        $form[$weight]['error_message'] = $item['#help_title'];
      }
    }
    else {
      $form[$weight] = $this->getFieldSettings($item, $id, $webform);
    }
  }

  /**
   * Returns field settings.
   *
   * @param $field
   *   Field array.
   * @param $field_id
   *   Field id.
   *
   * @return array
   */
  protected function getFieldSettings($field, $field_id, $webform): array {
    if ($field['#type']=== 'webform_multiple') {
      $field = $field['#element'];
      $field['#multiple'] = TRUE;
    }

    $settings = $webform->getElementDecoded($field['#webform_key']);
    $field_settings = [
      'title' => $field['#title'],
      'type' => $field['#type'],
      'name' => $field_id,
      'required' => $settings['#required'] ?? $field['#required'] ?? FALSE,
    ];

    if (isset($field['#placeholder'])) {
      $field_settings['placeholder'] = $field['#placeholder'];
    }
    if (isset($field['#empty_value'])) {
      $field_settings['empty_value'] = $field['#empty_value'];
    }
    if (isset($field['#attributes']['class'])) {
      $field_settings['class'] = $field['#attributes']['class'][0];
    }
    if (isset($field['#multiple'])) {
      $field_settings['multiple'] = $field['#multiple'];
    }
    if (isset($field['#states'])) {
      $field_settings['states'] = $this->getStatesFromField($field);
    }
    if (isset($field['#options'])) {
      unset($field['#options']['']);
      $field_settings['options'] = $field['#options'];
    }
    if (isset($field['#help_title'])) {
      $field_settings['error_message'] = $field['#help_title'];
    }
    if (isset($field['#description']['#markup'])) {
      $field_settings['description'] = $field['#description']['#markup'];
    }
    if (isset($settings['#submit__label'])) {
      $field_settings['title'] = $settings['#submit__label'];
    }
    if (isset($settings['#empty_option'])) {
      $field_settings['empty_option'] = $settings['#empty_option'];
    }

    return $field_settings;
  }

  /**
   * Returns field states.
   *
   * @param array $field
   *   Field array.
   *
   * @return array
   *   Field states.
   */
  protected function getStatesFromField(array $field): array {
    $states = [];
    if (isset($field['#states'])) {
      $state_type = array_key_first($field['#states']);
      if (isset($field['#states'][$state_type])) {
        $state = array_key_first($field['#states'][$state_type]);
        $state_condition = $field['#states'][$state_type][$state];
        preg_match('/name="(.+?)"/', $state, $matches);
        if (count($matches) > 1) {
          $states[$state_type][$matches[1]] = $state_condition;
        }
      }
    }

    return $states;
  }

  /**
   * Returns menu output by tree array.
   *
   * @param array $tree
   *   Menu tree.
   *
   * @return array
   *   Menu output.
   */
  protected function buildNestedMenu(array $tree): array {
    $menu = [];
    $front_page_url = Url::fromRoute('<front>')->toString();
    if (isset($tree['#items'])) {
      $tree = $tree['#items'];
    }

    foreach ($tree as $uuid => $item) {
      if (!isset($item['original_link']) || !$item['original_link']->isEnabled()) {
        continue;
      }

      $url = $item['original_link']->getUrlObject();
      $is_front = ($url->toString() === $front_page_url);
      $menu_item = [
        'path' => $url->toString(),
        'title' => $item['original_link']->getTitle(),
        'id' => mb_strtolower(str_replace([' ', '_'], '-', $uuid)),
        'external' => $url->isExternal(),
        'is_front' => $is_front,
      ];

      $uuid = $item['original_link']->getDerivativeId();
      if ($uuid) {
        $entity = $this->entityRepository->loadEntityByUuid('menu_link_content', $uuid);
        if ($entity) {
          $display_id = 'menu_link_content.main.default';
          $this->getValues($display_id, $entity, $menu_item);
        }
      }

      // Get link options and target attribute.
      $options = $item['original_link']->getOptions();
      $target = $options['attributes']['target'] ?? FALSE;
      $menu_item['target'] = $target;
      $menu_item['class'] = $options['attributes']['class'][0] ?? '';

      // Recursively build submenu.
      $submenu = $this->buildNestedMenu($item['below']);
      if (!empty($submenu)) {
        $menu_item['submenu'] = $submenu;
      }

      $menu[] = $menu_item;
    }

    return $menu;
  }

  /**
   * Returns values of the paragraph.
   *
   * @param \Drupal\Core\Entity\EntityInterface $paragraph
   *   Paragraph entity.
   * @param string|null $view_mode
   *   View mode.
   *
   * @return array
   *   Values array.
   */
  protected function getParagraphValues(EntityInterface $paragraph, ?string $view_mode = 'default'): array {
    $values = [
      'id' => $paragraph->uuid(),
      'internal_id' => $paragraph->id(),
      'type' => $paragraph->bundle(),
    ];

    if (method_exists($paragraph, 'getTitle')) {
      $values['title'] = $paragraph->getTitle();
    }
    elseif (method_exists($paragraph, 'getAccountName')) {
      $values['title'] = $paragraph->getAccountName();
    }
    elseif (method_exists($paragraph, 'getName')) {
      $values['title'] = $paragraph->getName();
    }

    if ($view_mode !== 'default') {
      $values['url'] = $paragraph->toUrl()->toString();
    }
    $display_id = $paragraph->getEntityTypeId() . '.' . $paragraph->bundle() . '.' . $view_mode;
    $this->getValues($display_id, $paragraph, $values);

    return $values;
  }

  /**
   * Provides content of the file.
   *
   * @param \Drupal\file\Entity\File $file
   *   File to handle.
   *
   * @return string
   *   File content.
   */
  protected function fileGetContents(File $file) {
    $fileUri = $file->getFileUri();

    if (file_exists($fileUri)) {
      // Make sure that SVG is safe.
      $rawSvg = file_get_contents($fileUri);
      if (class_exists('enshrined\svgSanitize\Sanitizer')) {
        $svgSanitizer = new Sanitizer();

        return $svgSanitizer->sanitize($rawSvg);
      }
    }

    return FALSE;
  }

  /**
   * Returns values of the paragraph.
   *
   * @param string|null $view_mode
   *   View mode.
   *
   * @return string
   *   Rendered medias in HTML.
   */
  protected function loadMediaFromHtml(?string $html = 'default'): string {
    if($html != strip_tags($html)) {
      $dom = new \DOMDocument();
      libxml_use_internal_errors(true);
      $dom->loadHTML($html);
      $tags = $dom->getElementsByTagName('drupal-media');
      $view_builder = $this->entityTypeManager->getViewBuilder('media');
      $count = 0;
      foreach ($tags as $tag) {
        $uuid = $tag->getAttribute('data-entity-uuid');
        $media = $this->mediaStorage->loadByProperties(['uuid' => $uuid]);
        if (empty($media)) {
          continue;
        }

        $media = reset($media);
        $output = $view_builder->view($media, 'default');
        $output = $this->renderer->render($output);
        $field_html = $dom->createDocumentFragment();
        $field_html->appendXML($output);
        $tag->appendChild($field_html);
        $count++;
      }

      if ($count) {
        $html = $dom->saveXML();
      }
    }

    return $html;
  }

}
