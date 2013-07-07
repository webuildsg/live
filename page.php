<?php get_header(); ?>
<?php get_sidebar(); ?>

<section>

  <?php while ( have_posts() ) : the_post(); ?>

  	<?php get_template_part( 'content', 'page' ); ?>

  <?php endwhile; ?>
</section>

<?php get_footer(); ?>
