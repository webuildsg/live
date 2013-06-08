<html <?php language_attributes(); ?>>
<head>
<title>We Build SG LIVE</title>
<meta name="description" content="a list of free open events and open source libraries for the curious folks who love to make things!">
<meta name="keywords" content="Singapore, SG, open community, open source, software, hardware, programming, design, maker movement, free events, free tech events, podcast, audio, live, show">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<meta property="og:image" content="http://webuild.sg/public/logo.png">
<meta property="og:url" content="http://live.webuild.sg">
<meta property="og:site_name" content="live.webuild.sg">
<meta property="og:title" content="We Build SG LIVE">
<meta property="og:description" content="A live conversation with geeks in town every 2nd saturday morning of the month!">
<meta property="og:type" content="website">

<link rel="shortcut icon" href="http://webuild.sg/favicon.ico">
<link rel="stylesheet" type="text/css" href="<?php bloginfo( 'stylesheet_url' ); ?>" />

<link rel="apple-touch-icon" href="http://webuild.sg/public/apple-touch-icon.png">
<link rel="apple-touch-icon" sizes="72x72" href="http://webuild.sg/public/apple-touch-icon-72x72-precomposed.png">
<link rel="apple-touch-icon" sizes="114x114" href="http://webuild.sg/public/apple-touch-icon-114x114-precomposed.png">
<link rel="apple-touch-icon" sizes="144x144" href="http://webuild.sg/public/apple-touch-icon-144x144-precomposed.png">

<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div class="wrapper">
	<header>
		<div class="container">
			<h1><?php bloginfo( 'name' ); ?></h1>
			<h2><?php bloginfo( 'description' ); ?></h2>
			<div class="splash"><a href="/category/podcast/feed">SG LIVE <span class="rss">&#xe271;</span></a></div>
		</div>

	</header>

	<div class="main container">

		<!-- <div class="live">
			<h3>Catch We Build SG LIVE</h3>
			<p class="countdown"></p>
			<p id="livetime"></p>
		</div> -->

		<div class="live">
			<h3>We Build SG is airing now</h3>
			<!-- <p class="livetag">join us in the live chat and conversation!</p> -->
			<p class="countdown"></p>
			<audio class="liveaudio" controls src="http://listen.webuild.sg:8000/live"></audio>
			<iframe class="livechat" src="http://webchat.freenode.net?channels=webuildsg&uio=MT1mYWxzZSY5PXRydWUmMTE9NTEfe"></iframe>
		</div>
