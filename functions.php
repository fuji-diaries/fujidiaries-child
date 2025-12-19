<?php
/**
 * Fuji Diaries Child functions
 */

add_action('wp_enqueue_scripts', function () {
  // 親テーマのstyleはブロックテーマでも基本読み込まれるけど、保険で子テーマのstyle.cssを確実に読む
  wp_enqueue_style(
    'fujidiaries-child-style',
    get_stylesheet_uri(),
    array(),
    filemtime(get_stylesheet_directory() . '/style.css')
  );

  // フロントページだけ動画JSを読む（必要なときだけ）
  if (is_front_page()) {
    wp_enqueue_script(
      'fd-hero-video',
      get_stylesheet_directory_uri() . '/assets/js/hero-video.js',
      array(),
      filemtime(get_stylesheet_directory() . '/assets/js/hero-video.js'),
      true
    );
  }
});
