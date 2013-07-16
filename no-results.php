<h3><?php _e( 'nothing found', 'webuild' ); ?></h3>

<?php if ( is_search() ) : ?>

	<?php _e( 'Oops didn\'t find anything :( Want to search with another keyword?', 'webuild' ); ?>
	<?php get_search_form(); ?>

<?php else : ?>

	<?php _e( 'It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'webuild' ); ?>
	<?php get_search_form(); ?>

<?php endif; ?>


