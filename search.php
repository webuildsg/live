<?php get_header(); ?>
<?php get_sidebar(); ?>

<section>

	<?php if ( have_posts() ) : ?>
		<h3><?php printf( __( 'search results for: %s', 'webuild' ), get_search_query() ); ?></h3>
		<ul class="open-list first">
			<?php while ( have_posts() ) : the_post(); ?>
				<?php get_template_part( 'content', 'search' ); ?>
			<?php endwhile; ?>
		</ul>

	<?php else : ?>
		<?php get_template_part( 'no-results', 'search' ); ?>
	<?php endif; ?>

</section>







<?php get_footer(); ?>
