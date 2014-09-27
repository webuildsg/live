#We Build SG LIVE

This repository contains the website for a live audio podcast.

[![Build Status](https://travis-ci.org/webuildsg/live.png)](https://travis-ci.org/webuildsg/live) [![Dependency Status](https://gemnasium.com/webuildsg/live.svg)](https://gemnasium.com/webuildsg/live)

Related websites:

- [Main website](http://live.webuild.sg/)
- [Facebook](http://facebook.com/webuildsg)
- [Twitter](https://twitter.com/webuildsg)
- [Github](https://github.com/webuildsg/live)

##install

1. clone repository

    ```
    git@github.com:webuildsg/live.git
    ```
1. install packages

    ```
    npm install
    bundle install
    ```
1. add a git pre-commit hook to generate new `sitemap.xml` with new episodes. edit file `.git/hooks/pre-commit`

    ```
    #!/bin/sh

    rm sitemap.xml
    jekyll build
    mv _publish/sitemap.xml sitemap.xml
    ```

##development

1. build static pages

    ```
    jekyll build
    ```

1. start server

    ```
    jekyll serve --config _dev_config.yml --watch
    ```
1. if there's error on `invalid byte sequence in US-ASCII
error: invalid byte sequence in US-ASCII`, run the following in the command line:

    ```
    LC_CTYPE="en_US.UTF-8"
    LANG="en_US.UTF-8"
    ```

1. command line watch for css and javascript

    ```
    grunt
    ```
1. push to github pages

    ```
    git push origin gh-pages
    ```

##with docker

1. Install Docker
- Take note of $DOCKER_HOST IP address
- Edit `line 11` of file `_dev_config.yml` to replace `localhost` with `$DOCKER_HOST` IP address. E.g.

	```
	url: http://192.168.59.103:4000
	```

- Start docker E.g. for MAC OSX

	```
	boot2docker start
	export DOCKER_HOST=tcp://$(boot2docker ip 2>/dev/null):2375
	```

- Build the image and run it

	```
	docker build -t wblive .
	docker run -d -p 4000:4000 wblive
	```
- Open in browser with `$DOCKER_HOST` IP address E.g. `http://192.168.59.103:4000`


#Credits

1. [Social icon fonts](http://drinchev.github.io/monosocialiconsfont/)
1. [MomentJS](http://momentjs.com/) for all things timing, dates and seconds
1. [Prism](http://prismjs.com/index.html) for syntax highlighting
1. [8-bit Nanjas for music](http://freemusicarchive.org/music/8-Bit_Ninjas/Party_in_Space/kzz007_-_12_-_8-bit_ninjas_-_shiny_spaceship)
1. [Modernizr for HTML5 audio detection](http://modernizr.com/)

#License

[We Build SG LIVE](http://live.webuild.sg) is licensed under [Creative Commons CC0 3.0 Attribution 3.0 Unported](http://creativecommons.org/licenses/by/3.0).
