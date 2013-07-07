<?php get_header(); ?>
<?php get_sidebar(); ?>

<section>

	<h3>this episode</h3>

	<ul class="open-list first">
	    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
	    <li>
	      <div class="post-thumbnail">
	        <?php the_post_thumbnail(); ?>
	      </div>
	      <div class="post-content">
	        <a href="<?php the_permalink(); ?>"><p><?php the_title(); ?><span>on <?php the_time('j M y, D') ?></span> </p></a>
	        <div class="post"><?php the_content(); ?></div>
	      </div>
	    </li>
	    <?php endwhile; else: ?>
	    <li>
	      <div class="post">Coming your way really soon ;)</div>
	    </li>
	    <?php endif; ?>
	  </ul>

</section>

<?php get_footer(); ?>
