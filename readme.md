# We Build SG LIVE

[![Join the chat at https://gitter.im/webuildsg/live](https://badges.gitter.im/webuildsg/live.svg)](https://gitter.im/webuildsg/live?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> Website for a live audio podcast episodes at [live.webuild.sg](https://live.webuild.sg)

[![Build Status](https://travis-ci.org/webuildsg/live.svg)](https://travis-ci.org/webuildsg/live) [![Dependency Status](https://gemnasium.com/webuildsg/live.svg)](https://gemnasium.com/webuildsg/live)

## Quick start

1. clone the project: `git clone git@github.com:webuildsg/live.git && cd live`
- install dependancies: `npm i && bundle install`
- start the website locally: `npm start`

## Development

1. build static pages: `jekyll build`
- start server: `jekyll serve --config _dev_config.yml --watch`
- add a git pre-commit hook to generate new `sitemap.xml` with new episodes. edit file `.git/hooks/pre-commit`

  ```sh
  #!/bin/sh

  rm sitemap.xml
  jekyll build
  mv _publish/sitemap.xml sitemap.xml
  ```
- command line watch for building css and javascript: `grunt`
- if there's error on `invalid byte sequence in US-ASCII
error: invalid byte sequence in US-ASCII`, run the following in the command line:

  ```sh
  LC_CTYPE="en_US.UTF-8"
  LANG="en_US.UTF-8"
  ```

- push to github pages: `git push origin gh-pages`

## Credits

1. [Social icon fonts](http://drinchev.github.io/monosocialiconsfont/)
1. [MomentJS](http://momentjs.com/) for all things timing, dates and seconds
1. [Prism](http://prismjs.com/index.html) for syntax highlighting
1. [8-bit Nanjas for music](http://freemusicarchive.org/music/8-Bit_Ninjas/Party_in_Space/kzz007_-_12_-_8-bit_ninjas_-_shiny_spaceship)
1. [Modernizr for HTML5 audio detection](http://modernizr.com/)

## License

[We Build SG LIVE](http://live.webuild.sg) is licensed under [Creative Commons CC0 3.0 Attribution 3.0 Unported](http://creativecommons.org/licenses/by/3.0).
