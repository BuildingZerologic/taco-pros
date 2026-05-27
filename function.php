<?php
/**
 * Twenty Seventeen functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since Twenty Seventeen 1.0
 */

/**
 * Twenty Seventeen only works in WordPress 4.7 or later.
 */
if ( version_compare( $GLOBALS['wp_version'], '4.7-alpha', '<' ) ) {
	require get_template_directory() . '/inc/back-compat.php';
	return;
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function twentyseventeen_setup() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed at WordPress.org. See: https://translate.wordpress.org/projects/wp-themes/twentyseventeen
	 * If you're building a theme based on Twenty Seventeen, use a find and replace
	 * to change 'twentyseventeen' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( 'twentyseventeen' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enables custom line height for blocks
	 */
	add_theme_support( 'custom-line-height' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	add_image_size( 'twentyseventeen-featured-image', 2000, 1200, true );

	add_image_size( 'twentyseventeen-thumbnail-avatar', 100, 100, true );

	// Set the default content width.
	$GLOBALS['content_width'] = 525;

	// This theme uses wp_nav_menu() in two locations.
	register_nav_menus(
		array(
			'top'    => __( 'Top Menu', 'twentyseventeen' ),
			'social' => __( 'Social Links Menu', 'twentyseventeen' ),
		)
	);

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support(
		'html5',
		array(
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'script',
			'style',
			'navigation-widgets',
		)
	);

	/*
	 * Enable support for Post Formats.
	 *
	 * See: https://wordpress.org/support/article/post-formats/
	 */
	add_theme_support(
		'post-formats',
		array(
			'aside',
			'image',
			'video',
			'quote',
			'link',
			'gallery',
			'audio',
		)
	);

	// Add theme support for Custom Logo.
	add_theme_support(
		'custom-logo',
		array(
			'width'      => 250,
			'height'     => 250,
			'flex-width' => true,
		)
	);

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	/*
	 * This theme styles the visual editor to resemble the theme style,
	 * specifically font, colors, and column width.
	  */
	add_editor_style( array( 'assets/css/editor-style.css', twentyseventeen_fonts_url(),'1.0.0', 'all' ) );

	// Load regular editor styles into the new block-based editor.
	add_theme_support( 'editor-styles' );

	// Load default block styles.
	add_theme_support( 'wp-block-styles' );

	// Add support for responsive embeds.
	add_theme_support( 'responsive-embeds' );

	// Define and register starter content to showcase the theme on new sites.
	$starter_content = array(
		'widgets'     => array(
			// Place three core-defined widgets in the sidebar area.
			'sidebar-1' => array(
				'text_business_info',
				'search',
				'text_about',
			),

			// Add the core-defined business info widget to the footer 1 area.
			'sidebar-2' => array(
				'text_business_info',
			),

			// Put two core-defined widgets in the footer 2 area.
			'sidebar-3' => array(
				'text_about',
				'search',
			),
		),

		// Specify the core-defined pages to create and add custom thumbnails to some of them.
		'posts'       => array(
			'home',
			'about'            => array(
				'thumbnail' => '{{image-sandwich}}',
			),
			'contact'          => array(
				'thumbnail' => '{{image-espresso}}',
			),
			'blog'             => array(
				'thumbnail' => '{{image-coffee}}',
			),
			'homepage-section' => array(
				'thumbnail' => '{{image-espresso}}',
			),
		),

		// Create the custom image attachments used as post thumbnails for pages.
		'attachments' => array(
			'image-espresso' => array(
				'post_title' => _x( 'Espresso', 'Theme starter content', 'twentyseventeen' ),
				'file'       => 'assets/images/espresso.jpg', // URL relative to the template directory.
			),
			'image-sandwich' => array(
				'post_title' => _x( 'Sandwich', 'Theme starter content', 'twentyseventeen' ),
				'file'       => 'assets/images/sandwich.jpg',
			),
			'image-coffee'   => array(
				'post_title' => _x( 'Coffee', 'Theme starter content', 'twentyseventeen' ),
				'file'       => 'assets/images/coffee.jpg',
			),
		),

		// Default to a static front page and assign the front and posts pages.
		'options'     => array(
			'show_on_front'  => 'page',
			'page_on_front'  => '{{home}}',
			'page_for_posts' => '{{blog}}',
		),

		// Set the front page section theme mods to the IDs of the core-registered pages.
		'theme_mods'  => array(
			'panel_1' => '{{homepage-section}}',
			'panel_2' => '{{about}}',
			'panel_3' => '{{blog}}',
			'panel_4' => '{{contact}}',
		),

		// Set up nav menus for each of the two areas registered in the theme.
		'nav_menus'   => array(
			// Assign a menu to the "top" location.
			'top'    => array(
				'name'  => __( 'Top Menu', 'twentyseventeen' ),
				'items' => array(
					'link_home', // Note that the core "home" page is actually a link in case a static front page is not used.
					'page_about',
					'page_blog',
					'page_contact',
				),
			),

			// Assign a menu to the "social" location.
			'social' => array(
				'name'  => __( 'Social Links Menu', 'twentyseventeen' ),
				'items' => array(
					'link_yelp',
					'link_facebook',
					'link_twitter',
					'link_instagram',
					'link_email',
				),
			),
		),
	);

	/**
	 * Filters Twenty Seventeen array of starter content.
	 *
	 * @since Twenty Seventeen 1.1
	 *
	 * @param array $starter_content Array of starter content.
	 */
	$starter_content = apply_filters( 'twentyseventeen_starter_content', $starter_content );

	add_theme_support( 'starter-content', $starter_content );
}
add_action( 'after_setup_theme', 'twentyseventeen_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function twentyseventeen_content_width() {

	$content_width = $GLOBALS['content_width'];

	// Get layout.
	$page_layout = get_theme_mod( 'page_layout' );

	// Check if layout is one column.
	if ( 'one-column' === $page_layout ) {
		if ( twentyseventeen_is_frontpage() ) {
			$content_width = 644;
		} elseif ( is_page() ) {
			$content_width = 740;
		}
	}

	// Check if is single post and there is no sidebar.
	if ( is_single() && ! is_active_sidebar( 'sidebar-1' ) ) {
		$content_width = 740;
	}

	/**
	 * Filters Twenty Seventeen content width of the theme.
	 *
	 * @since Twenty Seventeen 1.0
	 *
	 * @param int $content_width Content width in pixels.
	 */
	$GLOBALS['content_width'] = apply_filters( 'twentyseventeen_content_width', $content_width );
}
add_action( 'template_redirect', 'twentyseventeen_content_width', 0 );

/**
 * Register custom fonts.
 */
function twentyseventeen_fonts_url() {
	$fonts_url = '';

	/*
	 * translators: If there are characters in your language that are not supported
	 * by Libre Franklin, translate this to 'off'. Do not translate into your own language.
	 */
	$libre_franklin = _x( 'on', 'Libre Franklin font: on or off', 'twentyseventeen' );

	if ( 'off' !== $libre_franklin ) {
		$font_families = array();

		$font_families[] = 'Libre Franklin:300,300i,400,400i,600,600i,800,800i';

		$query_args = array(
			'family'  => urlencode( implode( '|', $font_families ) ),
			'subset'  => urlencode( 'latin,latin-ext' ),
			'display' => urlencode( 'fallback' ),
		);

		$fonts_url = add_query_arg( $query_args, 'https://fonts.googleapis.com/css' );
	}

	return esc_url_raw( $fonts_url );
}

/**
 * Add preconnect for Google Fonts.
 *
 * @since Twenty Seventeen 1.0
 *
 * @param array  $urls          URLs to print for resource hints.
 * @param string $relation_type The relation type the URLs are printed.
 * @return array URLs to print for resource hints.
 */
function twentyseventeen_resource_hints( $urls, $relation_type ) {
	if ( wp_style_is( 'twentyseventeen-fonts', 'queue' ) && 'preconnect' === $relation_type ) {
		$urls[] = array(
			'href' => 'https://fonts.gstatic.com',
			'crossorigin',
		);
	}

	return $urls;
}
add_filter( 'wp_resource_hints', 'twentyseventeen_resource_hints', 10, 2 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function twentyseventeen_widgets_init() {
	register_sidebar(
		array(
			'name'          => __( 'Blog Sidebar', 'twentyseventeen' ),
			'id'            => 'sidebar-1',
			'description'   => __( 'Add widgets here to appear in your sidebar on blog posts and archive pages.', 'twentyseventeen' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);

	register_sidebar(
		array(
			'name'          => __( 'Footer 1', 'twentyseventeen' ),
			'id'            => 'sidebar-2',
			'description'   => __( 'Add widgets here to appear in your footer.', 'twentyseventeen' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);

	register_sidebar(
		array(
			'name'          => __( 'Footer 2', 'twentyseventeen' ),
			'id'            => 'sidebar-3',
			'description'   => __( 'Add widgets here to appear in your footer.', 'twentyseventeen' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'twentyseventeen_widgets_init' );

/**
 * Replaces "[...]" (appended to automatically generated excerpts) with ... and
 * a 'Continue reading' link.
 *
 * @since Twenty Seventeen 1.0
 *
 * @param string $link Link to single post/page.
 * @return string 'Continue reading' link prepended with an ellipsis.
 */
function twentyseventeen_excerpt_more( $link ) {
	if ( is_admin() ) {
		return $link;
	}

	$link = sprintf(
		'<p class="link-more"><a href="%1$s" class="more-link">%2$s</a></p>',
		esc_url( get_permalink( get_the_ID() ) ),
		/* translators: %s: Post title. */
		sprintf( __( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'twentyseventeen' ), get_the_title( get_the_ID() ) )
	);
	return ' &hellip; ' . $link;
}
add_filter( 'excerpt_more', 'twentyseventeen_excerpt_more' );

/**
 * Handles JavaScript detection.
 *
 * Adds a `js` class to the root `<html>` element when JavaScript is detected.
 *
 * @since Twenty Seventeen 1.0
 */
function twentyseventeen_javascript_detection() {
	echo "<script>(function(html){html.className = html.className.replace(/\bno-js\b/,'js')})(document.documentElement);</script>\n";
}
add_action( 'wp_head', 'twentyseventeen_javascript_detection', 0 );

/**
 * Add a pingback url auto-discovery header for singularly identifiable articles.
 */
function twentyseventeen_pingback_header() {
	if ( is_singular() && pings_open() ) {
		printf( '<link rel="pingback" href="%s">' . "\n", esc_url( get_bloginfo( 'pingback_url' ) ) );
	}
}
add_action( 'wp_head', 'twentyseventeen_pingback_header' );

/**
 * Display custom color CSS.
 */
function twentyseventeen_colors_css_wrap() {
	if ( 'custom' !== get_theme_mod( 'colorscheme' ) && ! is_customize_preview() ) {
		return;
	}

	require_once get_parent_theme_file_path( '/inc/color-patterns.php' );
	$hue = absint( get_theme_mod( 'colorscheme_hue', 250 ) );

	$customize_preview_data_hue = '';
	if ( is_customize_preview() ) {
		$customize_preview_data_hue = 'data-hue="' . $hue . '"';
	}
	?>
	<style type="text/css" id="custom-theme-colors" <?php echo $customize_preview_data_hue; ?>>
		<?php echo twentyseventeen_custom_colors_css(); ?>
	</style>
	<?php
}
add_action( 'wp_head', 'twentyseventeen_colors_css_wrap' );

/**
 * Enqueues scripts and styles.
 */
function twentyseventeen_scripts() {
	// Add custom fonts, used in the main stylesheet.
	wp_enqueue_style( 'twentyseventeen-fonts', twentyseventeen_fonts_url(), array(), null );

	// Theme stylesheet.
	wp_enqueue_style( 'twentyseventeen-style', get_stylesheet_uri(), array(), '20201208' );

	// Theme block stylesheet.
	wp_enqueue_style( 'twentyseventeen-block-style', get_theme_file_uri( '/assets/css/blocks.css' ), array( 'twentyseventeen-style' ), '20190105' );

	// Load the dark colorscheme.
	if ( 'dark' === get_theme_mod( 'colorscheme', 'light' ) || is_customize_preview() ) {
		wp_enqueue_style( 'twentyseventeen-colors-dark', get_theme_file_uri( '/assets/css/colors-dark.css' ), array( 'twentyseventeen-style' ), '20190408' );
	}

	// Load the Internet Explorer 9 specific stylesheet, to fix display issues in the Customizer.
	if ( is_customize_preview() ) {
		wp_enqueue_style( 'twentyseventeen-ie9', get_theme_file_uri( '/assets/css/ie9.css' ), array( 'twentyseventeen-style' ), '20161202' );
		wp_style_add_data( 'twentyseventeen-ie9', 'conditional', 'IE 9' );
	}

	// Load the Internet Explorer 8 specific stylesheet.
	wp_enqueue_style( 'twentyseventeen-ie8', get_theme_file_uri( '/assets/css/ie8.css' ), array( 'twentyseventeen-style' ), '20161202' );
	wp_style_add_data( 'twentyseventeen-ie8', 'conditional', 'lt IE 9' );

	// Load the html5 shiv.
	wp_enqueue_script( 'html5', get_theme_file_uri( '/assets/js/html5.js' ), array(), '20161020' );
	wp_script_add_data( 'html5', 'conditional', 'lt IE 9' );

	wp_enqueue_script( 'twentyseventeen-skip-link-focus-fix', get_theme_file_uri( '/assets/js/skip-link-focus-fix.js' ), array(), '20161114', true );

	$twentyseventeen_l10n = array(
		'quote' => twentyseventeen_get_svg( array( 'icon' => 'quote-right' ) ),
	);

	if ( has_nav_menu( 'top' ) ) {
		wp_enqueue_script( 'twentyseventeen-navigation', get_theme_file_uri( '/assets/js/navigation.js' ), array( 'jquery' ), '20161203', true );
		$twentyseventeen_l10n['expand']   = __( 'Expand child menu', 'twentyseventeen' );
		$twentyseventeen_l10n['collapse'] = __( 'Collapse child menu', 'twentyseventeen' );
		$twentyseventeen_l10n['icon']     = twentyseventeen_get_svg(
			array(
				'icon'     => 'angle-down',
				'fallback' => true,
			)
		);
	}

	wp_enqueue_script( 'twentyseventeen-global', get_theme_file_uri( '/assets/js/global.js' ), array( 'jquery' ), '20190121', true );

	wp_enqueue_script( 'custom js', get_theme_file_uri( '/assets/js/custom.js' ), array( 'jquery' ), '20190121', true );

	wp_enqueue_script( 'jquery-scrollto', get_theme_file_uri( '/assets/js/jquery.scrollTo.js' ), array( 'jquery' ), '2.1.2', true );

	wp_localize_script( 'twentyseventeen-skip-link-focus-fix', 'twentyseventeenScreenReaderText', $twentyseventeen_l10n );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'twentyseventeen_scripts' );

/**
 * Enqueues styles for the block-based editor.
 *
 * @since Twenty Seventeen 1.8
 */
function twentyseventeen_block_editor_styles() {
	// Block styles.
	wp_enqueue_style( 'twentyseventeen-block-editor-style', get_theme_file_uri( '/assets/css/editor-blocks.css' ), array(), '20201208' );
	
	// Add custom fonts.
	wp_enqueue_style( 'twentyseventeen-fonts', twentyseventeen_fonts_url(), array(), null );
}
add_action( 'enqueue_block_editor_assets', 'twentyseventeen_block_editor_styles' );

// function enqueue_custom_scripts_styles() {
//     // Enqueue the Animate.css stylesheet
//     wp_enqueue_style('animate-css', 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css', array(), '4.1.1');

//     // Enqueue the WOW.js script
//     wp_enqueue_script('wow-js', 'https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js', array('jquery'), '1.1.2', true);

//     // Enqueue the latest jQuery script
//     wp_enqueue_script('jquery-cdn', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js', array(), '3.7.1', true);
// }
// add_action('wp_enqueue_scripts', 'enqueue_custom_scripts_styles');


function enqueue_select2_scripts() {
    // Enqueue Select2 CSS
    wp_enqueue_style('select2-css', 'https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/css/select2.min.css');

    // Enqueue Select2 JS
    wp_enqueue_script('select2-js', 'https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/js/select2.min.js', array('jquery'), null, true);

    
}
add_action('wp_enqueue_scripts', 'enqueue_select2_scripts');

/**
 * Add custom image sizes attribute to enhance responsive image functionality
 * for content images.
 *
 * @since Twenty Seventeen 1.0
 *
 * @param string $sizes A source size value for use in a 'sizes' attribute.
 * @param array  $size  Image size. Accepts an array of width and height
 *                      values in pixels (in that order).
 * @return string A source size value for use in a content image 'sizes' attribute.
 */
function twentyseventeen_content_image_sizes_attr( $sizes, $size ) {
	$width = $size[0];

	if ( 740 <= $width ) {
		$sizes = '(max-width: 706px) 89vw, (max-width: 767px) 82vw, 740px';
	}

	if ( is_active_sidebar( 'sidebar-1' ) || is_archive() || is_search() || is_home() || is_page() ) {
		if ( ! ( is_page() && 'one-column' === get_theme_mod( 'page_options' ) ) && 767 <= $width ) {
			$sizes = '(max-width: 767px) 89vw, (max-width: 1000px) 54vw, (max-width: 1071px) 543px, 580px';
		}
	}

	return $sizes;
}
add_filter( 'wp_calculate_image_sizes', 'twentyseventeen_content_image_sizes_attr', 10, 2 );

/**
 * Filters the `sizes` value in the header image markup.
 *
 * @since Twenty Seventeen 1.0
 *
 * @param string $html   The HTML image tag markup being filtered.
 * @param object $header The custom header object returned by 'get_custom_header()'.
 * @param array  $attr   Array of the attributes for the image tag.
 * @return string The filtered header image HTML.
 */
function twentyseventeen_header_image_tag( $html, $header, $attr ) {
	if ( isset( $attr['sizes'] ) ) {
		$html = str_replace( $attr['sizes'], '100vw', $html );
	}
	return $html;
}
add_filter( 'get_header_image_tag', 'twentyseventeen_header_image_tag', 10, 3 );

/**
 * Add custom image sizes attribute to enhance responsive image functionality
 * for post thumbnails.
 *
 * @since Twenty Seventeen 1.0
 *
 * @param array $attr       Attributes for the image markup.
 * @param int   $attachment Image attachment ID.
 * @param array $size       Registered image size or flat array of height and width dimensions.
 * @return array The filtered attributes for the image markup.
 */
function twentyseventeen_post_thumbnail_sizes_attr( $attr, $attachment, $size ) {
	if ( is_archive() || is_search() || is_home() ) {
		$attr['sizes'] = '(max-width: 767px) 89vw, (max-width: 1000px) 54vw, (max-width: 1071px) 543px, 580px';
	} else {
		$attr['sizes'] = '100vw';
	}

	return $attr;
}
add_filter( 'wp_get_attachment_image_attributes', 'twentyseventeen_post_thumbnail_sizes_attr', 10, 3 );

/**
 * Use front-page.php when Front page displays is set to a static page.
 *
 * @since Twenty Seventeen 1.0
 *
 * @param string $template front-page.php.
 * @return string The template to be used: blank if is_home() is true (defaults to index.php),
 *                otherwise $template.
 */
function twentyseventeen_front_page_template( $template ) {
	return is_home() ? '' : $template;
}
add_filter( 'frontpage_template', 'twentyseventeen_front_page_template' );

/**
 * Modifies tag cloud widget arguments to display all tags in the same font size
 * and use list format for better accessibility.
 *
 * @since Twenty Seventeen 1.4
 *
 * @param array $args Arguments for tag cloud widget.
 * @return array The filtered arguments for tag cloud widget.
 */
function twentyseventeen_widget_tag_cloud_args( $args ) {
	$args['largest']  = 1;
	$args['smallest'] = 1;
	$args['unit']     = 'em';
	$args['format']   = 'list';

	return $args;
}
add_filter( 'widget_tag_cloud_args', 'twentyseventeen_widget_tag_cloud_args' );

/**
 * Gets unique ID.
 *
 * This is a PHP implementation of Underscore's uniqueId method. A static variable
 * contains an integer that is incremented with each call. This number is returned
 * with the optional prefix. As such the returned value is not universally unique,
 * but it is unique across the life of the PHP process.
 *
 * @since Twenty Seventeen 2.0
 *
 * @see wp_unique_id() Themes requiring WordPress 5.0.3 and greater should use this instead.
 *
 * @param string $prefix Prefix for the returned ID.
 * @return string Unique ID.
 */
function twentyseventeen_unique_id( $prefix = '' ) {
	static $id_counter = 0;
	if ( function_exists( 'wp_unique_id' ) ) {
		return wp_unique_id( $prefix );
	}
	return $prefix . (string) ++$id_counter;
}

/**
 * Implement the Custom Header feature.
 */
require get_parent_theme_file_path( '/inc/custom-header.php' );

/**
 * Custom template tags for this theme.
 */
require get_parent_theme_file_path( '/inc/template-tags.php' );

/**
 * Additional features to allow styling of the templates.
 */
require get_parent_theme_file_path( '/inc/template-functions.php' );

/**
 * Customizer additions.
 */
require get_parent_theme_file_path( '/inc/customizer.php' );

/**
 * SVG icons functions and filters.
 */
require get_parent_theme_file_path( '/inc/icon-functions.php' );

/**
 * Block Patterns.
 */
require get_template_directory() . '/inc/block-patterns.php';

// add_filter('comment_form_default_fields', 'unset_url_field');
// function unset_url_field($fields){
//     if(isset($fields['url']))
//        unset($fields['url']);
//        return $fields;
// }

/* Post Comment Box */
function ea_comment_textarea_placeholder( $args ) {
	$args['comment_field']        = str_replace( 'textarea', 'textarea placeholder="Leave a comment..."', $args['comment_field'] );
	return $args;
}
add_filter( 'comment_form_defaults', 'ea_comment_textarea_placeholder' );

// function be_comment_form_fields( $fields ) {
// 	foreach( $fields as &$field ) {
// 		$field = str_replace( 'id="author"', 'id="author" placeholder="John Doe*"', $field );
// 		$field = str_replace( 'id="email"', 'id="email" placeholder="john@example.com*"', $field );
// 		$field = str_replace( 'id="url"', 'id="url" placeholder="https://www.example.com"', $field );
// 	}
// 	return $fields;
// }
// add_filter( 'comment_form_default_fields', 'be_comment_form_fields' );

function enqueue_slick_carousel() {
    // Enqueue Slick Carousel CSS
    wp_enqueue_style('slick-carousel-css', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.css', array(), '1.9.0');

    // Enqueue Slick Carousel Theme CSS
    wp_enqueue_style('slick-carousel-theme-css', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.css', array('slick-carousel-css'), '1.9.0');

    // Enqueue Slick Carousel JS
    wp_enqueue_script('slick-carousel-js', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', array('jquery'), '1.9.0', true);
    
}
add_action('wp_enqueue_scripts', 'enqueue_slick_carousel');

function ttf_engine_font_correct_filetypes( $data, $file, $filename, $mimes, $real_mime ) {
	if ( ! empty( $data['ext'] ) && ! empty( $data['type'] ) ) {
	return $data;
	}
	$wp_file_type = wp_check_filetype( $filename, $mimes );
	// Check for the file type you want to enable, e.g. 'ttf'.
	if ( 'ttf' === $wp_file_type['ext'] ) {
	$data['ext'] = 'ttf';
	$data['type'] = 'font/ttf';
	}
	return $data;
	}
	add_filter( 'wp_check_filetype_and_ext', 'ttf_engine_font_correct_filetypes', 10, 5 );
	function allow_custom_mime_types( $mimes ) {
		// New allowed mime types.
		$mimes['ttf'] = 'font/ttf';     
		return $mimes;
	}
	add_filter( 'upload_mimes', 'allow_custom_mime_types' );
	function add_custom_upload_mimes($existing_mimes) {
		// Allow .woff and .woff2 files
		$existing_mimes['woff'] = 'application/font-woff';
		$existing_mimes['woff2'] = 'application/font-woff2';
		
		return $existing_mimes;
	}
	add_filter('upload_mimes', 'add_custom_upload_mimes');
	function create_testimonial_post_type() {
		// Set up the labels for the custom post type
		$labels = array(
			'name'                  => _x('Testimonials', 'Post Type General Name', 'textdomain'),
			'singular_name'         => _x('Testimonial', 'Post Type Singular Name', 'textdomain'),
			'menu_name'             => __('Testimonials', 'textdomain'),
			'name_admin_bar'        => __('Testimonial', 'textdomain'),
			'archives'              => __('Testimonial Archives', 'textdomain'),
			'attributes'            => __('Testimonial Attributes', 'textdomain'),
			'parent_item_colon'     => __('Parent Testimonial:', 'textdomain'),
			'all_items'             => __('All Testimonials', 'textdomain'),
			'add_new_item'          => __('Add New Testimonial', 'textdomain'),
			'add_new'               => __('Add New', 'textdomain'),
			'new_item'              => __('New Testimonial', 'textdomain'),
			'edit_item'             => __('Edit Testimonial', 'textdomain'),
			'update_item'           => __('Update Testimonial', 'textdomain'),
			'view_item'             => __('View Testimonial', 'textdomain'),
			'view_items'            => __('View Testimonials', 'textdomain'),
			'search_items'          => __('Search Testimonial', 'textdomain'),
			'not_found'             => __('Not found', 'textdomain'),
			'not_found_in_trash'    => __('Not found in Trash', 'textdomain'),
			'featured_image'        => __('Featured Image', 'textdomain'),
			'set_featured_image'    => __('Set featured image', 'textdomain'),
			'remove_featured_image' => __('Remove featured image', 'textdomain'),
			'use_featured_image'    => __('Use as featured image', 'textdomain'),
			'insert_into_item'      => __('Insert into testimonial', 'textdomain'),
			'uploaded_to_this_item' => __('Uploaded to this testimonial', 'textdomain'),
			'items_list'            => __('Testimonials list', 'textdomain'),
			'items_list_navigation' => __('Testimonials list navigation', 'textdomain'),
			'filter_items_list'     => __('Filter testimonials list', 'textdomain'),
		);
	
		// Set up the arguments for the custom post type
		$args = array(
			'label'                 => __('Testimonial', 'textdomain'),
			'description'           => __('Customer Testimonials', 'textdomain'),
			'labels'                => $labels,
			'supports'              => array('title', 'editor', 'thumbnail', 'excerpt'),
			'taxonomies'            => array(),
			'hierarchical'          => false,
			'public'                => true,
			'show_ui'               => true,
			'show_in_menu'          => true,
			'menu_position'         => 5,
			'menu_icon'             => 'dashicons-format-quote', // Dashicon for testimonial
			'show_in_admin_bar'     => true,
			'show_in_nav_menus'     => true,
			'can_export'            => true,
			'has_archive'           => true,
			'exclude_from_search'   => false,
			'publicly_queryable'    => true,
			'capability_type'       => 'post',
			'show_in_rest'          => true, // Enables Gutenberg editor support
		);
	
		// Register the custom post type
		register_post_type('testimonial', $args);
	}
	
	// Hook into the 'init' action to register the custom post type
	add_action('init', 'create_testimonial_post_type', 0);

	// Add custom meta boxes for testimonial
function add_testimonial_meta_boxes() {
    add_meta_box(
        'testimonial_meta_box',          // ID
        'Testimonial Details',           // Title
        'render_testimonial_meta_boxes', // Callback function
        'testimonial',                   // Post type
        'normal',                        // Context
        'default'                        // Priority
    );
}
add_action('add_meta_boxes', 'add_testimonial_meta_boxes');

// Render the custom meta boxes
function render_testimonial_meta_boxes($post) {
    $name = get_post_meta($post->ID, '_testimonial_name', true);
    $rating = get_post_meta($post->ID, '_testimonial_rating', true);
    ?>
    <p>
        <label for="testimonial_name">Name:</label>
        <input type="text" name="testimonial_name" id="testimonial_name" value="<?php echo esc_attr($name); ?>" />
    </p>
    <p>
        <label for="testimonial_rating">Rating (1-5):</label>
        <select name="testimonial_rating" id="testimonial_rating">
            <option value="">Select Rating</option>
            <?php for ($i = 1; $i <= 5; $i++) { ?>
                <option value="<?php echo $i; ?>" <?php selected($rating, $i); ?>><?php echo $i; ?> Star<?php echo $i > 1 ? 's' : ''; ?></option>
            <?php } ?>
        </select>
    </p>
    <?php
}

// Save the meta box data
function save_testimonial_meta_data($post_id) {
    if (isset($_POST['testimonial_name'])) {
        update_post_meta($post_id, '_testimonial_name', sanitize_text_field($_POST['testimonial_name']));
    }

    if (isset($_POST['testimonial_rating'])) {
        update_post_meta($post_id, '_testimonial_rating', sanitize_text_field($_POST['testimonial_rating']));
    }
}
add_action('save_post', 'save_testimonial_meta_data');
function display_all_testimonials() {
    // Query arguments to fetch 'testimonial' post type
    $args = array(
        'post_type'      => 'testimonial',
        'posts_per_page' => -1, // Fetch all testimonials
        'orderby'        => 'date',
        'order'          => 'DESC',
    );

    // Query the testimonials
    $testimonials_query = new WP_Query($args);

    // Check if there are testimonials
    if ($testimonials_query->have_posts()) {
        $output = '<div class="testimonials-list">';

        // Loop through the testimonials
        while ($testimonials_query->have_posts()) {
            $testimonials_query->the_post();

            // Get custom meta fields
            $rating = get_post_meta(get_the_ID(), '_testimonial_rating', true);

            // Get the featured image
            $featured_image = get_the_post_thumbnail(get_the_ID(), 'medium');

            // Build the output for each testimonial
            $output .= '<div class="testimonial-item">';

            // Display the featured image if it exists
            if (!empty($featured_image)) {
                $output .= '<div class="testimonial-image">' . $featured_image . '</div>';
            }
			$output .= '<div class="testimonial-item-inner">';
            $output .= '<h3 class="testimonial-title">' . get_the_title() . '</h3>';
			if (!empty($rating)) {
                $output .= '<div class="testimonial-rating">';
                for ($i = 1; $i <= 5; $i++) {
                    if ($i <= $rating) {
                        $output .= '<span class="star">&#9733;</span>'; // Filled star
                    } else {
                        $output .= '<span class="star">&#9734;</span>'; // Empty star
                    }
                }
                $output .= '</div>';
            }
            $output .= '<p class="testimonial-content">' . get_the_content() . '</p>';                                  
			$output .= '</div>';
            $output .= '</div>';
        }

        $output .= '</div>';
    } else {
        // If no testimonials found
        $output = '<p>No testimonials found.</p>';
    }

    // Reset post data
    wp_reset_postdata();

    return $output;
}
add_shortcode('show_testimonials', 'display_all_testimonials');

function add_custom_popup_html() {
    ?>
    <!-- Popup HTML Structure -->
    <div id="custom-popup" class="custom-popup-overlay" style="display: none;">
        <div class="custom-popup-content">
            <span class="custom-popup-close">&times;</span>
				<img src="https://eggholic.netizens.dev/wp-content/uploads/2024/09/fooyet_brawon.png">
			<p>Thank you for your interest in our franchise. If you are selected and your area is available for development, a member of our team will reach out to discuss the next steps.</p>
        </div>
    </div>

    <style>
    /* Popup Styles */
    .custom-popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    }

    .custom-popup-content {
        background: #fff;
		padding: 60px;
		text-align: center;
		max-width: 720px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		border-radius: 18px;
		width: 100%;
    }
	.custom-popup-content img {
		margin-bottom: 25px;
	}
	#custom-popup p {
		color: #133456;
		font-size: 18px;
		margin-bottom: 0;
		font-family: "Roboto", sans-serif;
	}
    .custom-popup-close {
		cursor: pointer;
		box-shadow: none;
		border: none;
		color: #FFF;
		font-size: 26px;
		line-height: 30px;
		position: absolute;
		right: 0;
		background-color: #133456;
		width: 30px;
		height: 30px;
		border-radius: 50px;
		top: 5px;
		right: 5px;
    }
    </style>
    <?php
}
add_action('wp_footer', 'add_custom_popup_html');

// Hook into the CF7 mail send process
add_action('wpcf7_before_send_mail', 'custom_email_routing_debug');

function custom_email_routing_debug($contact_form) {
    $form_id = $contact_form->id();

    if ($form_id == 2125) {
        $submitted_data = isset($_POST) ? $_POST : array();

        // Handle desired-city field (can be array or string)
        $raw_city = $submitted_data['desired-city'] ?? '';
        $selected_city = is_array($raw_city) ? sanitize_text_field($raw_city[0]) : sanitize_text_field($raw_city);

        // User's email (for debug/log or reply-to if needed)
        $user_email = isset($submitted_data['email-789']) ? sanitize_email($submitted_data['email-789']) : '';

        $email_map = array(
            'Eggholic HQ Office' => ['contact@eggholic.com'],
            // 'Suwanee, GA' => ['eggholicsuwanee@gmail.com'],
            'Shrewsbury, MA' => ['eggholicbnk@gmail.com'],
            'Indianapolis, IN' => ['eggholicindy@gmail.com'],
            'Sugar Land, TX' => ['info@eggholichtx.com'],
            'Mechanicsburg, PA' => ['mechanicsburg102@gmail.com'],
            'Catonsville, MD' => ['catonsville.eggholic@gmail.com'],
            'Edison, NJ' => ['eggholic.edison@gmail.com'],
            'Nashville, TN' => ['eggholic106@gmail.com'],
            'Queens, NY' => ['eggholicqueens@gmail.com'],
            'Chantilly, VA' => [
                'chantilly.eggholic@gmail.com',
                'eggholicchantilly@gmail.com',
                'ganesh_singh100@outlook.com'
            ],
            'Niles, IL' => ['niles.eggholic@gmail.com'],
            'Irving, TX' => ['eggholicirvingtx@gmail.com', 'eggholic7750@gmail.com'],
            'Louisville, KY' => ['eggholiclouisvilleky@gmail.com'],
            'Chicago, IL' => ['eggholicchicag@gmail.com'],
            'Schaumburg, IL' => ['eggholicschaumburg@gmail.com'],
            'Calgary, AB' => ['eggholic.calgary@gmail.com'],
            'Cambridge, ON' => ['eggholiccambridge@gmail.com', 'ankit250115@gmail.com'],
            'Scarborough, ON' => ['scarborough.eggholic@gmail.com'],
            'Waterloo, ON' => ['eggholicontario@gmail.com', 'ankit250115@gmail.com'],
            'Brampton, ON' => ['brampton.eggholic@gmail.com'],
            'Burlington, MA' => ['eggholicburlingtion@gmail.com'],
            'Marietta, GA' => ['eggholicmarietta@gmail.com'],
            'Jersey City, NJ' => ['cloverusallc@gmail.com'],
            'Washington, DC' => ['dc.egghollic@gmail.com'],
            'Naperville, IL' => ['0eggholic@gmail.com'],
            'Etobicoke, ON' => ['etobicokeeggholic@gmail.com'],
            'Saskatoon, SK' => ['saskatooneggholic@gmail.com'],
            'London, ON' => ['eggholiclondon@gmail.com'],
            'San Diego, CA' => ['eggholic.sandiego@gmail.com'],
            'San Francisco, CA' => ['eggholicbayarea@gmail.com'],
            'London, UK' => ['eggholicuk@gmail.com'],
            'Cincinnati, OH' => ['eggholiccincinnati@gmail.com'],
            'Birmingham, AL' => ['eggholicbirmingham@gmail.com'],
            'Pineville, NC' => ['harry.hp82@gmail.com'],
            
        );

        $recipients = [];

        if ($selected_city && isset($email_map[$selected_city])) {
            $recipients = $email_map[$selected_city];
        }

       

        // Set recipient to the mail settings
        $mail = $contact_form->prop('mail');
        $mail['recipient'] = implode(', ', array_unique($recipients));
        $contact_form->set_properties(['mail' => $mail]);

        // Debug payload
        $debug_info = [
            'form_id'        => $form_id,
            'user_email'     => $user_email,
            'selected_city'  => $selected_city,
            'recipients'     => $recipients,
            'all_post_data'  => $submitted_data,
        ];

        // Return this debug info to the frontend after submission
        add_filter('wpcf7_ajax_json_echo', function ($response) use ($debug_info) {
            $response['debug'] = $debug_info;
            return $response;
        });
    }
}



add_filter('wpcf7_form_tag_data_option', function($data, $options, $args) {
    if (in_array('desired_city_options', $options)) { // ✅ this must match the `data:desired_city_options`
        $data = array(
            'Eggholic HQ Office', 'Shrewsbury, MA', 'Indianapolis, IN',
            'Sugar Land, TX', 'Mechanicsburg, PA', 'Catonsville, MD', 'Edison, NJ',
            'Nashville, TN', 'Queens, NY', 'Chantilly, VA', 'Niles, IL', 'Irving, TX',
            'Louisville, KY', 'Chicago, IL', 'Schaumburg, IL', 'Burlington, MA',
            'Marietta, GA', 'Jersey City, NJ', 'Washington, DC', 'Naperville, IL',
            'San Diego, CA', 'San Francisco, CA', 'Cincinnati, OH', 'Birmingham, AL',
            'Pineville, NC', 'Calgary, AB', 'Cambridge, ON', 'Scarborough, ON',
            'Waterloo, ON', 'Brampton, ON', 'Etobicoke, ON', 'London, ON',
            'Saskatoon, SK', 'London, UK',
        );
    }
    return $data;
}, 10, 3);





function maps_custom_code_callback() {
    ob_start();
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Custom Map with Markers</title>
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css" rel="stylesheet" />
        <link href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css" rel="stylesheet" />
        <style>
			:root {
				--primary-color: #093455;
				--secondary-color: #e6eef9;
			}
            body { margin: 0; padding: 0; font-family: 'Century Gothic', sans-serif ; }
            #map { width: 70%; height: 100vh; }
            #sidebar { width: 30%; height: 100vh; background: #f4f4f4; padding: 15px; overflow-y: auto; }
			.map_div strong {
				font-weight: bold;
			}
			#sidebar h3 {
				font-family: 'Century Gothic', sans-serif;
    			font-size: 26px;
				font-weight: bold;
			}
            .tabs { 
				display: flex;
				position: relative;
				background-color: #fff;
				box-shadow: 0 0 1px 0 rgba(24, 94, 224, 0.15), 0 6px 12px 0 rgba(24, 94, 224, 0.15);
				padding: 0.45rem;
				border-radius: 99px;
			}
			.tabs * {
				z-index: 2;
			}
			input[type=radio] {
				display: none;
			}
            .tab {
                display: flex ;
				align-items: center;
				justify-content: center;
				height: 44px;
				width: 50%;
				font-size: 1.25rem;
				font-weight: 500 ;
				border-radius: 99px;
				cursor: pointer;
				transition: color 0.15s ease-in;
				margin-bottom: 0;
            }
			input[type=radio]:checked + label {
				color: var(--primary-color);
			}
			input[type=radio]:checked + label > .notification {
				background-color: var(--primary-color);
				color: #fff;
			}

			input[id=pickupTab]:checked ~ .glider {
				transform: translateX(0);
			}

			input[id=deliveryTab]:checked ~ .glider {
				transform: translateX(calc(100% - 13px))
			}

			.glider {
				position: absolute;
				display: flex;
				height: 44px;
				width: 50%;
				background-color: var(--secondary-color);
				z-index: 1;
				border-radius: 99px;
				transition: 0.25s ease-out;
			}

            .marker { background-color: #FF5733; color: white; padding: 5px; border-radius: 3px; }
            .marker {
                width: 30px; 
                height: 30px; 
                background-color: #FF5733; 
                border-radius: 50%; 
                border: 2px solid white;
                position: relative;
            }

            .marker:after {
                content: '';
                position: absolute;
                top: 100%;
                left: 50%;
                margin-left: -5px;
                border-width: 5px;
                border-style: solid;
                border-color: #FF5733 transparent transparent transparent;
            }

            #locationList, #comingSoonList {
                list-style-type: none;
                padding: 0;
				margin-left: 0;
				margin-right: 0;
				font-family: 'Century Gothic', sans-serif;
            }

            #locationList li, #comingSoonList li {
                margin-bottom: 10px;
            }

            .locationItem, .comingSoonItem {
                display: block;
                padding: 15px 15px 20px;
                background: #fff;
                border: 1px solid #ddd;
                border-radius: 20px;
                cursor: pointer;
            }

            .pickup_distance {
                color: #093455;
                font-weight: bold;
            }

            #totalDistance {
				margin-top: 10px;
				font-size: 45px;
				font-weight: bold;
				color: #093455;
				text-align: center;
				text-shadow: #bbb 0px 7px 2px;
            }
			
			#sidebar hr {
				background: #BBB;
			}

            .map_div {
                display: flex;
                padding: 0;
                margin: 0 ;
                width: 100%;
                max-width: 100%;
            }

            #pickupGeocoder, #deliveryGeocoder {
                margin-top: 20px;
            }

			#pickupGeocoder > div, #deliveryGeocoder > div {
                width: 100%;
				max-width: 100%;
				min-width: 100%;
				border-radius: 20px;
            }

            .location_data_div {
                display: flex;
                justify-content: space-between;
            }

			.location_data {
				display: grid;
				gap: 18px;
				width: 75%;
			}

            .nt_orders_btn a, .nt_searched_orders_btn a {
				background: #093455;
				color: #FFF;
				padding: 10px 15px;
				width: 50%;
				text-transform: capitalize;
				text-decoration: none;
				text-align: center;
				font-size: 16px;
				border-radius: 20px;
				font-weight: bold;
            }
			.nt_name {
				font-size: 20px;
			}
			.location_data.nt_pickup .nt_name,
			.location_data.nt_coming_soon .nt_name {
				color: #093455;
			}
			.nt_address, .nt_phone {
				font-size: 14px;
				font-family: 'Century Gothic 400' ;
			}
			.selected-list-item {
				background-color: #967bf71a;
    			border: 2px solid #093455;
			}
			.location_data .nt_orders_btn {
				padding: 10px 0 10px;
			}
			.nt_searched_orders_btn {
				padding: 30px 0 10px;
			}
			input::placeholder {
				color: #777 ;
			}
			#locationList li:first-child, #comingSoonList li:first-child {
				margin-top: 15px;
			}
			.location_data.nt_default {
				width: 100%;
			}
			.mapboxgl-popup-close-button {
				right: -25px;
				top: -15px;
				color: #000;
			}
			.location_data.nt_pickup .nt_orders_btn a:last-child,
			.locationItem .nt_searched_orders_btn a:last-child {
				color: #093455;
				background: #FECD08;
			}
			.nt_name_btn {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.nt_orders_btn.mobile_view {
				display: none;
			}
			@media screen and (max-width: 1050px) {
				.map_div {
					flex-direction: column-reverse;
				}
				#sidebar {
					width: 100%;
				}
				#map {
					height: 30vh;
					width: 100%;
				}
				.tabs {
					transform: scale(0.6);
				}
			}
			@media screen and (min-width: 1051px) and (max-width: 1170px) {
				.glider {
					width: 50%;
				}
			}

			@media screen and (min-width: 320px) {
    			#pickupGeocoder .mapboxgl-ctrl-geocoder--input,
    			#deliveryGeocoder .mapboxgl-ctrl-geocoder--input {
        			height: 36px ;
        			padding: 6px 35px ;
					border-radius: 20px;
    			}
				#pickupGeocoder .mapboxgl-ctrl-geocoder--icon-search,
				#deliveryGeocoder .mapboxgl-ctrl-geocoder--icon-search {
					top: 8px;
					left: 7px;
					width: 20px;
					height: 20px;
				}
			}
			@media screen and (min-width: 320px) and (max-width:1310px) {
				.nt_orders_btn a, .nt_searched_orders_btn a {
					width: 100%;
				}
				.nt_orders_btn, .nt_searched_orders_btn {
					padding: 0;
					display: grid;
					gap: 10px;
				}
				.location_data_distance {
					text-align: right;
				}
			}
			@media screen and (min-width:768px) and (max-width: 1050px) {
				.nt_orders_btn {
					padding: 10px 0 10px;
					display: block;
				}
				.nt_searched_orders_btn {
					padding: 30px 0 10px;
					display: block;
				}
			}
			@media screen and (min-width:320px) and (max-width: 767px) {
				#sidebar {
					padding: 10px;
				}
			}
			@media screen and (min-width: 1051px) and (max-width: 1413px) {
				#sidebar h3 {
					font-size: 22px;
				}
				.nt_name {
					font-size: 18px;
				}
			}
			@media screen and (min-width: 1051px) and (max-width: 1120px) {
				#totalDistance {
					font-size: 40px;
				}
			}
			@media screen and (max-width: 354px) {
				#totalDistance {
					font-size: 40px;
				}
			}
			@media screen and (max-width: 1199px) {
				.nt_orders_btn.mobile_view {
					display: block;
				}
				.nt_name_btn {
					display: block;
				}
				.nt_name_btn .nt_orders_btn {
					display: none;
				}
			}
        </style>
    </head>
    <body>

	<div class="map_div">
		<div id="sidebar">
			<h3><img src="https://www.emoji.family/api/emojis/1f5fa/blobmoji/svg" alt="World map emoji illustration" style="width: 1.2em; height: 1.2em; vertical-align: middle;" /> Find your nearest location	</h3>
			<div id="pickupGeocoder"></div>
			<ul id="locationList"></ul>
<!-- 			<hr> -->
			<div id="totalDistance"></div> <!-- Total Distance Display -->
<!-- 			<ul id="comingSoonList"></ul> -->
		</div>

		<div id="map"></div>
	</div>

    <script src="https://api.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.js"></script>
    <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.min.js"></script>
    <script>
        // Replace with your Mapbox access token
        <?php
        $mapboxToken = getenv('MAPBOX_TOKEN');
        ?>


        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-0.37267105269031975, 51.608015710591395], // Default to Pinner, UK
            zoom: 12
        });
		
	

		// Add zoom controls to the map
		const nav = new mapboxgl.NavigationControl({
			visualizePitch: true // Optional: this shows a pitch control as well
		});

		// Add the zoom control to the map (positioned on the top left corner)
		map.addControl(nav, 'top-right');

		// Add geolocate control to the map
		const geolocate = new mapboxgl.GeolocateControl({
			positionOptions: {
				enableHighAccuracy: true // Enable high accuracy for location
			},
			trackUserLocation: true // Track user location as they move
		});

		// Add the geolocate control to the map (positioned on the top right corner)
		map.addControl(geolocate, 'top-right');

        // Add the pickup geocoders
        const pickupGeocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            placeholder: "Search locations (address, city, state, or zip)...",
            marker: false, // We will add custom markers
            flyTo: { zoom: 14 },
            limit: 5
        });

        // Add geocoders to their respective sections
        document.getElementById('pickupGeocoder').appendChild(pickupGeocoder.onAdd(map));

        let searchedLocation = null;

        let searchClearedPickup = false;

		let lastSearchedPickupLocation = null;

		// Reset the searchCleared flag when a new search starts
		pickupGeocoder.on('result', function(e) {
			lastSearchedPickupLocation = e.result.geometry.coordinates;
			searchClearedPickup = false;  // Reset pickup search cleared flag
			updateLocationList(lastSearchedPickupLocation);
		});
		
		// Disable zooming on small screens (e.g., mobile)
		if (window.innerWidth <= 768) { // You can adjust this breakpoint as needed
  			map.scrollZoom.disable();
  			map.boxZoom.disable();
  			map.dragRotate.disable();
  			map.dragPan.disable();
  			map.keyboard.disable();
  			map.doubleClickZoom.disable();
  			map.touchZoomRotate.disable();
		}


	
		const markersData = [
		  { lng: -117.12412674381511, lat: 32.89528148949633, name: "San Diego, CA", address: "9474 Black Mountain Rd H, San Diego, CA 92126", contact_no: "(858) 329-1007", pickup_link: "https://order.toasttab.com/online/eggholic-san-diego", country: "us" },
		  { lng: -0.37267105269031975, lat: 51.608015710591395, name: "Pinner, UK", address: "381 Uxbridge Road, Pinner HA5 4JN, United Kingdom", contact_no: "+44 2037-930179", pickup_link: "https://order.toasttab.com/online/eggholic-hatchend", country: "uk" },
		  { lng: -84.38356107428075, lat: 39.30789181614283, name: "Cincinnati, OH", address: "9774 Cincinnati Columbus Road, Cincinnati, OH 45241", contact_no: "513-779-3447", pickup_link: "https://order.toasttab.com/online/rangeen-cincinnati", country: "us" },
		  { lng: -106.63123685821897, lat: 52.115566767172425, name: "Saskatoon, SK", address: "1036 Louise Ave, Saskatoon SK S7H 2P6", contact_no: "306-974-3446", pickup_link: "https://order.toasttab.com/online/eggholic-saskatoon-1036-louise-avenue", country: "ca" },
		  { lng: -81.22552734110438, lat: 43.00327396954453, name: "London, ON", address: "931 Oxford Street East - Unit 2 London ON, N5Y3K1", contact_no: "548-866-0349", pickup_link: "https://order.toasttab.com/online/eggholic-london-unit-2-931-oxford-street-east", country: "ca" },
		  { lng: -88.20431404322038, lat: 41.761872380371685, name: "Naperville, IL", address: "618 Illinois RTE 59, Naperville, IL 60540", contact_no: "(331) 226-2953", pickup_link: "https://order.toasttab.com/online/eggholic-naperville", country: "us" },
		  { lng: -77.04457473729107, lat: 38.905446782482024, name: "Washington, DC", address: "1990 M St NW, Washington, DC 20036", contact_no: "202-891-7863", pickup_link: "https://order.toasttab.com/online/eggholic-dc", country: "us" },
		  { lng: -74.06368451635997, lat: 40.7353914927037, name: "Jersey City, NJ", address: "769 Newark Avenue, Jersey City, NJ 07306", contact_no: "201-721-5025", pickup_link: "https://order.toasttab.com/online/eggholic-jersey-city-new-tbd", country: "us" },
		  { lng: -84.50847588960332, lat: 33.94007359274813, name: "Marietta, GA", address: "490 Franklin Gateway, Marietta, GA 30067", contact_no: "+1 (770) 422-8000", pickup_link: "https://order.toasttab.com/online/eggholic-marietta-ga", country: "us" },
		  { lng: -71.1881033586229, lat: 42.48531774709752, name: "Burlington, MA", address: "10 Wall St, Burlington, MA 01803", contact_no: "781-359-4024", pickup_link: "https://order.toasttab.com/online/eggholic-burlington-new-10-wall-street", country: "us" },
		  { lng: -79.58402107946887, lat: 43.75066457126287, name: "Etobicoke, ON", address: "2687 Kipling Avenue #16, Etobicoke, ON M9V 5G6", contact_no: "416-741-4254", pickup_link: "https://order.toasttab.com/online/eggholic-etobicoke-2687-kipling-avenue", country: "ca" },
		//   { lng: -84.16251314541987, lat: 34.08662726942317, name: "Suwanee, GA", address: "3155 Peachtree Parkway, Suite 170, Suwanee, GA 30024", contact_no: "470-239-3255", pickup_link: "https://order.toasttab.com/online/eggholic-suwanee-3155-peachtree-parkway", country: "us" },
		  { lng: -113.97435032942666, lat: 51.15387581380418, name: "Calgary, AB", address: "4150 109 Ave NE, Calgary, AB T3N 1A6, Canada", contact_no: "(587) 625-0334", pickup_link: "https://order.toasttab.com/online/eggholic-calgary-4150-109-avenue-northeast", country: "ca" },
		  { lng: -71.73752817397386, lat: 42.27728923624665, name: "Shrewsbury, MA", address: "378 Maple Avenue, Shrewsbury, MA 01545", contact_no: "774-275-3165", pickup_link: "https://order.toasttab.com/online/eggholic-shrewsbury-new-378-maple-avenue", country: "us" },
		  { lng: -80.30359637022978, lat: 43.39912722028357, name: "Cambridge, ON", address: "1655 Bishop Street #103, Cambridge, ON N1R 8B5", contact_no: "(519)-621-1990", pickup_link: "https://order.toasttab.com/online/eggholic-cambridge-1655-bishop-street-north-ytmhz", country: "ca" },
		  { lng: -86.1814737028971, lat: 39.913339967842035, name: "Indianapolis, IN", address: "1224 W 86th Street, Indianapolis, IN 46260", contact_no: "+1 (317) 343-2995", pickup_link: "https://order.toasttab.com/online/eggholic-indianapolis-new-1224-west-86th-street", country: "us" },
		  { lng: -79.22762870460318, lat: 43.76009365230575, name: "Scarborough, ON", address: "3478 Lawrence Ave E, Scarborough, ON M1H 1A9", contact_no: "(416) 431-1999", pickup_link: "https://order.toasttab.com/online/eggholic-scarborough-3478-lawrence-ave-e", country: "ca" },
		  { lng: -95.64860441486162, lat: 29.611368448756195, name: "Sugar Land, TX", address: "232 Highway 6, Suite 100, Sugar Land, TX 77478", contact_no: "(281) 637-0032", pickup_link: "https://order.toasttab.com/online/eggholic-sugarland-new-232-highway-6", country: "us" },
		  { lng: -76.97910248754228, lat: 40.23681857763354, name: "Mechanicsburg, PA", address: "65 Gateway Dr Suite B-102, Mechanicsburg, PA 17050", contact_no: "(717) 458-5760", pickup_link: "https://order.toasttab.com/online/eggholic-mechanicsburg-new-tbd", country: "us" },
		  { lng: -76.76351874524775, lat: 39.28827547065003, name: "Catonsville, MD", address: "6600 Baltimore National Pike Suite B, Catonsville, MD 21228", contact_no: "(443) 860-9392", pickup_link: "https://order.toasttab.com/online/eggholic-catonsville-md-new-6600-baltimore-national-pike", country: "us" },
		  { lng: -80.52305968875245, lat: 43.47680837398487, name: "Waterloo, ON", address: "31 University Ave E, Waterloo, ON N2J 2V9", contact_no: "(519) 747-5295", pickup_link: "https://order.toasttab.com/online/eggholic-waterloo-31-university-avenue-east-vroqm", country: "ca" },
		  { lng: -74.3433659028732, lat: 40.57204450096187, name: "Edison, NJ", address: "1679 Oaktree Rd, Edison, NJ 08820", contact_no: "(848) 448-7799", pickup_link: "https://order.toasttab.com/online/eggholic-edison-nj-1679-oak-tree-road-unit-a", country: "us" },
		  { lng: -86.72847817049148, lat: 36.07975285131778, name: "Nashville, TN", address: "412 Harding place Suite 106, Nashville, TN 37211", contact_no: "(615) 739-6227", pickup_link: "https://order.toasttab.com/online/eggholic-nashville-tn", country: "us" },
		  { lng: -79.72958525564871, lat: 43.68151835572008, name: "Brampton, ON", address: "168 Kennedy Road South Unit 1, Brampton, ON L6W 3G6", contact_no: "(905) 874-3040", pickup_link: "https://order.toasttab.com/online/eggholic-brampton-ont-new-168-kennedy-rd-s-suite-a", country: "ca" },
		  { lng: -73.71184526794102, lat: 40.7369158417526, name: "Queens, NY", address: "256-01 Hillside Ave, Queens, NY 11004", contact_no: "(718) 413-5432", pickup_link: "https://order.toasttab.com/online/eggholic-queens-ny", country: "us" },
		  { lng: -77.42662382436674, lat: 38.89495461171043, name: "Chantilly, VA", address: "13951 Metrotech Drive, Chantilly, VA 20151", contact_no: "(703) 253-1646", pickup_link: "https://order.toasttab.com/online/eggholic-chantilly-va", country: "us" },
		  { lng: -87.83647120281825, lat: 42.05434816302508, name: "Niles, IL", address: "8425 W Golf Rd, Niles, IL 60714", contact_no: "(224) 534-7137", pickup_link: "https://order.toasttab.com/online/eggholic-niles-il-niles-il", country: "us" },
		  { lng: -96.95661288963424, lat: 32.912674328476875, name: "Irving, TX", address: "7750 N MacArthur Blvd, Suite #135, Irving, TX 75063", contact_no: "(972) 685-7999", pickup_link: "https://order.toasttab.com/online/eggholic-irving-tx", country: "us" },
		  { lng: -85.58503974713578, lat: 38.2163319546591, name: "Louisville, KY", address: "1947 S Hurstbourne Pkwy, Louisville, KY 40220", contact_no: "(502) 916-2024", pickup_link: "https://order.toasttab.com/online/eggholic-louisville-ky", country: "us" },
		  { lng: -87.64913732795883, lat: 41.89629769010032, name: "Chicago, IL", address: "833 W Chicago Ave FL 1, Chicago, IL 60642", contact_no: "(312) 940-3521", pickup_link: "https://order.toasttab.com/online/eggholic-chicago-il-chicago-il", country: "us" },
		  { lng: -88.10145394699735, lat: 42.049724142678805, name: "Schaumburg, IL", address: "829 W Higgins Rd, Schaumburg, IL 60195", contact_no: "(847) 565-4105", pickup_link: "https://order.toasttab.com/online/eggholic-schaumburg", country: "us" }
		];


        let currentMarkers = [];

        // Function to add both regular and coming soon markers
		function addMarkers() {
			clearMarkers(); // Clear any existing markers
			currentMarkers = []; // Initialize or reset currentMarkers array

			// Add regular markers from markersData
			markersData.forEach(markerData => {
				const color = '#093455'; // Regular marker color
				const marker = new mapboxgl.Marker({ color: color })
					.setLngLat([markerData.lng, markerData.lat])
					.addTo(map);

				if (window.innerWidth > 767) {
					// Define popup content for regular markers
					const popupContent = `
						<div style="font-size: 14px;">
							<strong>${markerData.name}</strong><br>
							${markerData.address}<br>
							<a href="${markerData.pickup_link}" target="_blank" style="color: ${color}; text-decoration: none; outline: none;">
								Order Here
							</a><br>
						</div>
					`;

					// Attach popup to the marker
					const popup = new mapboxgl.Popup({ offset: 25 }) // Adjust offset for better positioning
						.setHTML(popupContent);

					marker.setPopup(popup); // Associate popup with the marker
				}

				// Add click event to zoom to the marker's location
				marker.getElement().addEventListener('click', function () {
					map.flyTo({
						center: marker.getLngLat(),
						zoom: 14,
						essential: true
					});
				});

				currentMarkers.push(marker); // Add the regular marker to the currentMarkers array
			});

			
		}

        // Function to clear markers from the map
        function clearMarkers() {
            currentMarkers.forEach(marker => marker.remove());
            currentMarkers = [];
        }

        // Initial loading of pickup markers
        addMarkers();

        // Add variables to track search state
        let searchCleared = false;
        
		// Reset the searchCleared flag when a new location is searched
		pickupGeocoder.on('clear', function() {
			searchClearedPickup = true;
			updateLocationList();  // Clear the list when search is cleared
		});


        // Distance calculation function (Haversine formula)
        function getDistance(lat1, lon1, lat2, lon2) {
			const R = 6371e3; // meters
			const φ1 = lat1 * Math.PI / 180;
			const φ2 = lat2 * Math.PI / 180;
			const Δφ = (lat2 - lat1) * Math.PI / 180;
			const Δλ = (lon2 - lon1) * Math.PI / 180;

			const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
					Math.cos(φ1) * Math.cos(φ2) *
					Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

			return R * c;
		}

        // Function to update the location list and show distances
		function updateLocationList(searchedLocation = null) {
			const locationList = document.getElementById('locationList');
			/* const comingSoonList = document.getElementById('comingSoonList'); // Get the coming soon list element */
			locationList.innerHTML = '';  // Clear the list
			/* comingSoonList.innerHTML = '';  // Clear the list */

			let locations = markersData;  // Use the appropriate markers data
			/* let comingSoonLocations = comingsoonmarkersData; // Define an array for coming soon locations */

			// If search is not cleared and a location is provided, update the list
			if (!searchClearedPickup && searchedLocation) {
				const userLat = searchedLocation[1];
				const userLng = searchedLocation[0];
				let totalDistance = 0;

				// Set map center to the searched location
				map.flyTo({ center: [userLng, userLat], zoom: 14 });

				// Calculate distances and sort locations by distance
				locations = locations.map(markerData => {
					const distance = getDistance(userLat, userLng, markerData.lat, markerData.lng);
					return { ...markerData, distance };
				}).sort((a, b) => a.distance - b.distance); // Sort by distance

					// Filter to only show nearby locations (within 100 km)
		locations = locations.filter(markerData => markerData.distance <= 100000);

				
				// ✅ Fallback to UK if no nearby locations
		if (locations.length === 0) {
			locations = markersData.filter(marker => marker.country === 'uk');
			map.flyTo({ center: [-0.37267105269031975, 51.608015710591395], zoom: 12 }); // Center to UK
		}


				/* comingSoonLocations = comingSoonLocations.map(markerData => {
					const distance = getDistance(userLat, userLng, markerData.lat, markerData.lng);
					return { ...markerData, distance };
				}).sort((a, b) => a.distance - b.distance); // Sort by distance

				comingSoonLocations = comingSoonLocations.filter(markerData => {
					const distance = getDistance(userLat, userLng, markerData.lat, markerData.lng);
					return distance <= 100000; // 100 KM in meters
				}); */

				locations.forEach(markerData => {
					const distance = getDistance(userLat, userLng, markerData.lat, markerData.lng);
					const distanceInMiles = (distance / 1609.34).toFixed(2); // Convert meters to miles
					totalDistance += parseFloat(distanceInMiles);

					const li = document.createElement('li');
					li.classList.add('locationItem');
					li.innerHTML = `
						<div class="location_data_div">
							<div class="location_data nt_pickup">
								<span class="nt_name"><strong>${markerData.name}</strong></span>
								<span class="nt_address"><strong>Address: </strong>${markerData.address}</span>
								<span class="nt_phone"><strong>Phone No.: </strong>${markerData.contact_no}</span>
							</div>
							<div class="location_data_distance">
								<span class="pickup_distance">${distanceInMiles} miles</span>
							</div>
						</div>
						<div class="nt_searched_orders_btn">
							<a href="${markerData.pickup_link}" target="_blank">Order Here</a>
						</div>
					`;

					li.addEventListener('click', () => {
						// Scroll to the map section
						const mapSection = document.querySelector('.map_main_div'); // Replace 'map-section' with your actual map container's ID
						mapSection.scrollIntoView({ behavior: 'smooth' });
						
						map.flyTo({ center: [markerData.lng, markerData.lat], zoom: 14 });
					});

					locationList.appendChild(li);

				});

			} else {
				// Clear the list if no search or search was cleared

				locations.forEach(markerData => {
					const li = document.createElement('li');
					li.classList.add('locationItem');
					li.innerHTML = `
						<div class="location_data_div">
							<div class="location_data nt_pickup nt_default">
								<div class="nt_name_btn">
									<span class="nt_name"><strong>${markerData.name}</strong></span>
									<div class="nt_orders_btn">
										<a href="${markerData.pickup_link}" target="_blank">Order Here</a>
									</div>
								</div>
								<span class="nt_address"><strong>Address: </strong>${markerData.address}</span>
								<span class="nt_phone"><strong>Phone No.: </strong>${markerData.contact_no}</span>
								<div class="nt_orders_btn mobile_view">
									<a href="${markerData.pickup_link}" target="_blank">Order Here</a>
								</div>
							</div>
						</div>
					`;

					li.addEventListener('click', () => {
						// Scroll to the map section
						const mapSection = document.querySelector('.map_main_div'); // Replace 'map-section' with your actual map container's ID
						mapSection.scrollIntoView({ behavior: 'smooth' });
						
						map.flyTo({ center: [markerData.lng, markerData.lat], zoom: 14 });
					});

					locationList.appendChild(li);
				});
				
				
				
			}
		}

        // Trigger search when the page loads or when a button is clicked
		navigator.geolocation.getCurrentPosition((position) => {
			const userLng = position.coords.longitude;
			const userLat = position.coords.latitude;
			map.flyTo({ center: [userLng, userLat], zoom: 14 });
			updateLocationList([userLng, userLat]); // Call this function to search from the user's current location
		}, (error) => {
			console.error("Geolocation error: ", error);
			// Fallback to default location if geolocation fails
			updateLocationList(); // Call this function to load default locations
		});

		// Function to add a border to a list item and remove it from the previously selected one
		function addBorderToListItem(li) {
			// Remove the border from any previously selected item
			const previousSelected = document.querySelector('.selected-list-item');
			if (previousSelected) {
				previousSelected.classList.remove('selected-list-item');
			}

			// Add the border to the newly clicked item
			li.classList.add('selected-list-item');
		}

		// Add event listener to the location list
		document.getElementById('locationList').addEventListener('click', (event) => {
			if (event.target.parentNode.tagName === 'LI' || event.target.tagName === 'DIV' || event.target.tagName === 'SPAN') {
				addBorderToListItem(event.target.closest('li'));
			}
		});

		document.getElementById('comingSoonList').addEventListener('click', (event) => {
			if (event.target.parentNode.tagName === 'LI' || event.target.tagName === 'DIV' || event.target.tagName === 'SPAN') {
				addBorderToListItem(event.target.closest('li'));
			}
		});
		
		map.on('load', () => {
			geolocate.trigger();
		});

    </script>

    </body>
    </html>
    <?php 
    return ob_get_clean();
}

add_shortcode('maps_custom_code', 'maps_custom_code_callback');


add_action('wp_head', 'gtm_code_head_tag');

function gtm_code_head_tag() {
    ?>
  

	<script async src="https://www.googletagmanager.com/gtag/js?id=G-HQ8QG1R7CR"></script>
	<script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());

	  gtag('config', 'G-HQ8QG1R7CR');
	</script>

	<meta name="google-site-verification" content="O7pWEON1duRmrF6o6y4YrEkYzwHmEN9IYOL4wP7h5Vw" />
	<meta name="YahooSeeker" content="index, follow" />

	<!-- Meta Pixel Code -->
    <!-- <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1559974161390538');
        fbq('track', 'PageView');
    </script>
    <noscript>
        <img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=1559974161390538&ev=PageView&noscript=1"
        />
    </noscript> -->
    <!-- End Meta Pixel Code -->
    <?php
}


