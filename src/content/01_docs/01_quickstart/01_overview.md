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

Most content is likely to be [markdown](--ROOT--docs/content/markdown/)(`.md`) files, but some HTML, XML, TXT, and other text files can be used. Any content file can have [front matter](--ROOT--docs/content/front-matter/) values that define meta data such as titles, descriptions, dates, authors, tags, etc.

Media and other static files are contained in `src/media/`. These are [copied directly](--ROOT--docs/configuration/pass-through-files/) to the `build/` directory without modification.


### Content directories

Publican presumes directories of `src/content/` contain specific *types* of content, e.g.

* `src/content/docs/` for documentation
* `src/content/post/` for blogs
* `src/content/about/` for person/organization information

You can have sub-directories of any core parent directory, e.g. `src/content/docs/overview/`, `src/content/docs/overview/install/`, etc.

Publican automatically generates paginated index pages for all core parent directories, e.g. the files (slug) at:

* `docs/index.html` shows the first page of posts in `docs/`
* `docs/1/index.html` shows the second page of posts in `docs/`
* `docs/2/index.html` shows the third page of posts, and so on

Publican can be [configured](--ROOT--docs/configuration/options/#directory-index-pages) to order and present directory index pages in any way.


### Content tags

Content front matter can specify [tags](--ROOT--docs/content/front-matter/#tags) -- key words associated with content, e.g.

```md
tags: HTML, CSS, JavaScript
```

Publican automatically generates paginated index pages for all tags, e.g. the files (slug) at:

* `/tag/html/index.html` shows the first page of posts with the `HTML` tag
* `/tag/html/1/index.html` shows the second page of posts with the `HTML` tag
* `/tag/html/2/index.html` shows the third page of posts, and so on.

Publican can be [configured](--ROOT--docs/configuration/options/#tag-index-pages) to order and present tag index pages in any way.


## Publican templates

Publican [templates](--ROOT--docs/templates/files/) are contained in `src/template/`. Content is slotted into templates during the build to create HTML pages and other text-based content (feeds, sitemaps, etc).

Publican uses [jsTACS](https://www.npmjs.com/package/jstacs) as its templating engine. It parses standard JavaScript `${ expression }`{language=js} template literals. For example, `<h1>${ data.title }</h1>`{language=js} slots a title into a template heading.

`!{ expression }` values are not evaluated at build time but are converted to `${ expressions }` at the end of the build so they are present in rendered files. You can use these as partially-built templates in Express.js or other frameworks at runtime.


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
