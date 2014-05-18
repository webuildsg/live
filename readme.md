#We Build SG LIVE

This repository contains the website for the live audio show.

[![Build Status](https://travis-ci.org/webuildsg/live.png)](https://travis-ci.org/webuildsg/live)


Related websites:

- [Main website](http://live.webuild.sg/)
- [Facebook](http://facebook.com/webuildsg)
- [Twitter](https://twitter.com/webuildsg)
- [Github](https://github.com/webuildsg/live)

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

#Credits

1. [Social icon fonts](http://drinchev.github.io/monosocialiconsfont/)
1. [MomentJS](http://momentjs.com/) for all things timing, dates and seconds
1. [Prism](http://prismjs.com/index.html) for syntax highlighting
1. [8-bit Nanjas for music](http://freemusicarchive.org/music/8-Bit_Ninjas/Party_in_Space/kzz007_-_12_-_8-bit_ninjas_-_shiny_spaceship)
1. [Modernizr for HTML5 audio detection](http://modernizr.com/)

#License

[We Build SG LIVE](http://live.webuild.sg) is licensed under [Creative Commons CC0 3.0 Attribution 3.0 Unported](http://creativecommons.org/licenses/by/3.0).
