---
title: Publican starter template overview
menu: Overview
description: An overview of the Publican starter template.
date: 2024-12-10
priority: 0.9
tags: SSG, overview
---

This project demonstrates Publican, a Node.js [static site generator](--ROOT--post/what-are-static-site-generators/). You can use it for code examples or as the basis of your own static site which can be hosted anywhere.

A [configuration file](--ROOT--docs/configuration/file/) in the project root named `publican.config.js` [is executed to build](--ROOT--docs/quickstart/usage/) a static site to the `build/` directory using [content](--ROOT--docs/content/files/), [templates](--ROOT--docs/templates/files/), and [media](--ROOT--docs/configuration/pass-through-files/) contained in `src/`.


## Publican content

Publican [content](--ROOT--docs/content/files/) is contained in `src/content/`.

It is primarily [markdown](--ROOT--docs/content/markdown/)(`.md`) files, but some HTML, XML, TXT, and other text files are available. Any content file can have [front matter](--ROOT--docs/content/front-matter/) values that define meta data such as titles, descriptions, dates, authors, tags, etc.

HTML [templates](--ROOT--docs/templates/files/) are contained in `src/template/`. Content is slotted into these files during the build to create HTML pages.

Media and other static files are contained in `src/media/`. These are [copied directly](--ROOT--docs/configuration/pass-through-files/) to the `build/` directory without modification.


## Publican templates

Publican [templates](--ROOT--docs/templates/files/) are contained in `src/content/`.

Publican uses [jsTACS](https://www.npmjs.com/package/jstacs) as its templating engine. It parses standard JavaScript `${ expression }`{language=js} template literals, e.g. `<h1>${ data.title }</h1>`{language=js} slots a title into a template heading.

`!{ expression }` values are not evaluated and converted to `${ expression }` at the end of the build so they are present in the rendered files. You can create partially built templates and use them in Express.js or other frameworks at runtime.


## Publican configuration

Publican is [configured](--ROOT--docs/configuration/file/) and launched by the `publican.config.js` file. In this project:

* The `.env.dev` file defines environment variables for **development** builds when testing locally. The site contains draft posts, source maps, and debugging options.

* The `.env.dev` and `.env.prod` (which can override `.env.dev` values) defines environment variables for **production** builds that can be deployed to a live server. The site contains minified live posts and assets.

* [Additional functions](--ROOT--docs/configuration/custom-options/) used during render are defined in the `lib/` directory. These are generally used to format values and create navigation menus, breadcrumbs, etc.


## esbuild bundling

[esbuild](https://esbuild.github.io/) is used by this project to bundle CSS, bundle JavaScript, and run a development web server with live CSS reloading.

* CSS files are contained in `src/css/`. `main.css` is the entry file which loads others. The bundled file is built to `build/css/main.css`.

* JavaScript files are contained in `src/js/`. `main.js` is the entry file which loads others. The bundled file is built to `build/js/main.js`.

esbuild is [configured](http://localhost:8222/docs/esbuild/configuration/) and launched by the same `publican.config.js` file. It also uses environment variables defined in `.env.dev` and `.env.prod`, such as `BROWSER_TARGET` to sets minimum browser targets.

Development builds are not minified, retain `console` and `debugger` statements, and provide source maps.

Note that CSS and JavaScript are used as progressive enhancements and the starter site will work without them. esbuild is optional and not necessary for Publican projects. You can use any build system or development server, such as [Browsersync](https://browsersync.io/) or [small-static-server](https://www.npmjs.com/package/small-static-server).
