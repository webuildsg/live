<li>
	<div class="post-thumbnail">
	  <?php the_post_thumbnail(); ?>
	</div>
	<div class="post-content">
	  <a href="<?php the_permalink(); ?>"><p><?php the_title(); ?><span>on <?php the_time('j M y, D') ?></span> </p></a>
	  <div class="post"><?php the_content(); ?></div>
	</div>
</li>





