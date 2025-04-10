---
title: Core configuration options
menu: Configuration options
description: A list of Publican's core configuration file options
date: 2024-12-20
priority: 0.9
tags: configuration
---

The following options can be set in `publican.config.js` configuration files to control how the site is generated. The examples below presume you have defined a Publican object named `publican` at the top of the file:

{{ `publican.config.js` excerpt }}
```js
const publican = new Publican();
```

However, the object can be named anything. You could also define two or more `Publican` objects for more complex builds creating multiple sub-sites off the same domain.


## Directories

The default Publican directories are:

* `./src/content/` for content files
* `./src/template/` for template files
* `./build/` for the built site

You can change these as required:

{{ `publican.config.js` excerpt }}
```js
// change directories
publican.config.dir.content = './content/';
publican.config.dir.template = './templates/';
publican.config.dir.build = './mysite/';
```

Avoid setting the `content` directory as a sub-directory of `template` or vice versa.


## Ignored content files

Publican `config.ignoreContentFile` is a file ignore regex (`/^_.*$/`{language=js}) which omits any content file starting with an underscore `_`. You can remove this restriction:

{{ `publican.config.js` excerpt }}
```js
// do not ignore any file
publican.config.ignoreContentFile = null;
```

or add your own, e.g.

{{ `publican.config.js` excerpt }}
```js
// ignore files starting with a .
publican.config.ignoreContentFile = `/^\..*$/`;
```


## Slug string replacement

The starter site template orders most files by their filename rather than priority or date in menus and pagination. Directories and files have an initial number followed by an underscore, e.g.

```bash
docs/

  01_quickstart/
    01_overview.md
    02_install.md
    03_usage.md

  02_content/
    01_files.md
    02_markdown.md
    03_front-matter.md
```

The initial `NN_` is removed from the slug using a regular expression defined in the `config.slugReplace` [Map object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map):

{{ `publican.config.js` excerpt }}
```js
// slug replacement strings - removes NN_ from slug
publican.config.slugReplace.set(/\d{2,}_/g, '');
```

You can add further search string/regex and replacement values, e.g. rename all `html` files to `.htm`:

{{ `publican.config.js` excerpt }}
```js
// rename .html files to .htm
publican.config.slugReplace.set('.html', '.htm');
```


## Front matter delimiter

By default, Publican identifies front matter between `---` delimiters, but you can change it to any other value, e.g.

{{ `publican.config.js` excerpt }}
```js
// locate front matter using this delimiter
publican.config.frontmatterDelimit = '~~~';
```


## Root server path

By default, Publican assumes the build directory is the root path of your website. The page rendered to `build/index.html` is therefore the home page of the site.

{{ `publican.config.js` excerpt }}
```js
// root path
publican.config.root = '/';
```

However, you may want to build files to a sub-directory of your site, e.g. `/blog/`. Each post's [`data.link`](--ROOT--docs/templates/content-properties/#datalink) would then be incorrect.

The site's root path can be set by changing the `config.root` value:

{{ `publican.config.js` excerpt }}
```js
// root path
publican.config.root = '/blog/';
```

Links to the home page would then become `/blog/` rather than `/`.

You could set this option for the live production site but retain `/` in development:

```js
const isDev = (process.env.NODE_ENV === 'development');
publican.config.root = isDev ? '/' : '/blog/';
```

All links, navigation, and pagination properties use the `root` as appropriate. If you want to link to a page in your content, you can use:

```html
<p><a href="${ tacs.root }post/article-one/">link to Article one</a></p>
```

The `${ tacs.root }`{language=js} value **cannot** be used in markdown because it confuses the parser:

```md
<!-- this will fail in markdown -->
[link to Article one](${ tacs.root }post/article-one/)
```

The Starter template sets a <code>&ndash;&ndash;ROOT&ndash;&ndash;</code> [string replacement](--ROOT--docs/configuration/string-replacement/) value to the root which can be used in links, e.g. <code>(&ndash;&ndash;ROOT&ndash;&ndash;post/article-one/)</code>.


## Indexing frequency

An `index` value can be set in front matter to values used by search engine sitemaps: `always`, `hourly`, `daily`, `weekly`, `monthly` (the default), `yearly`, and `never`. You can also set `false` to omit a page from a sitemap.

You can set `publican.config.indexFrequency`{language=js} to a default value which applies to every page where `index` is not explicitly set.


## Default template

The default HTML template is `default.html` in the [template directory](#directories). You can set `publican.config.defaultHTMLTemplate`{language=js} to any other filename.


## Markdown to HTML

Publican converts markdown to HTML using [markdown-it](https://www.npmjs.com/package/markdown-it) with the [markdown-it-prism](https://www.npmjs.com/package/markdown-it-prism) plugin to syntax highlight code blocks.

By default, `publican.config.markdownOptions`{language=js} defines an object with the child objects:

* `core` for [markdown-it configuration](https://markdown-it.github.io/markdown-it/#MarkdownIt.new), and
* `prism` for [markdown-it-prism options](https://www.npmjs.com/package/markdown-it-prism#options)

You can change the defaults from:

{{ `publican.config.js` excerpt }}
```js
 // markdown options
publican.config.markdownOptions = {
  core: {
    html: true,                 // permit HTML tags
    breaks: false,              // do not convert line breaks to <br>
    linkify: true,              // convert URLs to links
    typographer: true           // enable smart quotes
  },
  prism: {
    defaultLanguage: 'js',      // default syntax
    highlightInlineCode: true   // highlight inline code
  }
};
```


## In-page navigation

You can generate [in-page navigation](docs/templates/template-literals/#inpage-navigation):

* `<h2>`{language=html} and other sub-headings are made *linkable*, and
* the `<nav-heading></nav-heading>`{language=html} tag can be added to any content or template file to generate a menu of sub-headings.

The `publican.config.headingAnchor`{language=js} object controls these options. Setting it to `false` (or any falsy value) disables in-page navigation, or you can define your own defaults:

{{ `publican.config.js` excerpt }}
```js
// heading anchors
publican.config.headingAnchor = {
  linkContent: '#',       // text in heading link
  linkClass: 'headlink',  // heading link class for CSS
  navClass: 'contents',   // the class assigned to the parent <nav>
  tag: 'nav-heading'      // the tag name for sub-heading menus
};
```

::: aside
Ensure your heading are nested correctly. For example, following an `<h2>`{language=html}, you could have another `<h2>`{language=html} or an `<h3>`{language=html}, but not an `<h4>`{language=html}.
::: /aside


## Directory index pages

Publican presumes directories in the root `./src/content/` contain [specific types of content](--ROOT--docs/quickstart/overview/#content-directories) and generates paginated index pages. The `publican.config.dirPages`{language=js} controls how these are generated using the following defaults:

{{ `publican.config.js` excerpt }}
```js
// directory index pages
publican.config.dirPages = {
  size: 24,                   // number of items per paginated page
  sortBy: 'priority',         // sort by priority order
  sortOrder: -1,              // from highest to lowest
  template: 'default.html',   // using this template
  dir: {}                     // with no exceptions
};
```

The Starter template changes these options to order by filename (each starts `NN_`) from lowest to highest and only show six items per paginated page:

{{ `publican.config.js` excerpt }}
```js
publican.config.dirPages.size = 6;
publican.config.dirPages.sortBy = 'filename';
publican.config.dirPages.sortOrder = 1;
```

However, content in the `posts` directory is ordered chronologically, with the most recent first, so an exception is specified:

{{ `publican.config.js` excerpt }}
```js
publican.config.dirPages.dir.post = {
  sortBy: 'date',
  sortOrder: -1
};
```

Pages inside directories have the following properties:

* [`data.postnext`](--ROOT--docs/templates/content-properties/#datapostnext) -- the `data` object of the next post
* [`data.postback`](--ROOT--docs/templates/content-properties/#datapostback) -- the `data` object of the previous post

Any template used by a directory index can access a [`data.pagination`](--ROOT--docs/templates/content-properties/#datapaginatation) object to generate lists of pages.

Setting `publican.config.dirPages`{language=js} to `false` (or any falsy value) disables directory index pages.


## Tag index pages

Content front matter can specify [tags](--ROOT--docs/content/front-matter/#tags) to identify [specific types of content](--ROOT--docs/quickstart/overview/#content-tags). Publican generates paginated index pages for all tags. The `publican.config.tagPages`{language=js} controls how these are generated using the following defaults:

{{ `publican.config.js` excerpt }}
```js
// tag index pages
publican.config.tagPages = {
  root: 'tag',                // root tag directory
  size: 24,                   // number of items per paginated page
  sortBy: 'date',             // sort by date order
  sortOrder: -1,              // from most to least recent
  template: 'default.html',   // using this template
  menu: false,                // do not show tag on the menu
  index: 'monthly'            // index tag pages monthly
};
```

Any template used by a tag index can access a [`data.pagination`](--ROOT--docs/templates/content-properties/#datapaginatation) object to generate lists of pages.

Setting `publican.config.tagPages`{language=js} to `false` (or any falsy value) disables tag index pages.

Note that a root `tag/index.html` page is not automatically created. The Starter template provides one at `tag.html` which runs a function that outputs all the tags in provides in the [`tacs.tagList` object](#docs/templates/global-properties/#tacstaglist).


## HTML minification

Publican minifies HTML using [html-minifier](https://www.npmjs.com/package/html-minifier). By default, `publican.config.minify`{language=js} defines an object with the following [html-minifier options](https://www.npmjs.com/package/html-minifier#options-quick-reference) which you can change or add further options:

{{ `publican.config.js` excerpt }}
```js
// tag index pages
publican.config.minify = {
  enabled: false,                     // minification not enabled
  collapseBooleanAttributes: true,    // remove boolean attribute values
  collapseWhitespace: true,           // collapse white space
  decodeEntities: false,              // use Unicode characters when available
  minifyCSS: true,                    // minify inline CSS
  minifyJS: true,                     // minify inline JS
  preventAttributesEscaping: false,   // prevent attribute escaping
  removeAttributeQuotes: true,        // remove attribute quotes
  removeComments: true,               // remove comments
  removeEmptyAttributes: true,        // remove empty attributes
  removeRedundantAttributes: true,    // remove redundant attributes
  removeScriptTypeAttributes: true,   // remove type="text/javascript"
  removeStyleLinkTypeAttributes: true,// remove type="text/css"
  useShortDoctype: true               // use the short HTML5 doctype
};
```

The Starter template minifies in production mode only:

{{ `publican.config.js` }}
```js
// minify in production mode only
const isDev = (process.env.NODE_ENV === 'development');
publican.config.minify.enabled = !isDev;
```


## Watch mode

Setting `publican.config.watch`{language=js} to `true` (or any truthy value) watches for file changes and rebuilds the site. This is normally done in development mode only:

{{ `publican.config.js` excerpt }}
```js
// watch in development mode only
const isDev = (process.env.NODE_ENV === 'development');
publican.config.watch = isDev;
```

By default, Publican waits at least 300 milliseconds to ensure no further files are saved. This can be changed:

{{ `publican.config.js` excerpt }}
```js
// debounce watch for 1 second
publican.config.watchDebounce = 1000;
```

A shorter `watchDebounce` can negatively affect performance because multiple rebuilds are triggered for multiple file changes.

Press <kbd>Ctrl</kbd> | <kbd>Cmd</kbd> + <kbd>C</kbd> to stop Publican running.

::: aside
### Monitored files

Publican only monitors content and template files. Changing the [configuration file](--ROOT--docs/configuration/file/) or its imported modules will not trigger a rebuild -- you must manually stop and restart Publican.
::: /aside


## Logging verbosity

Set `publican.config.logLevel`{language=js} to an integer:

* `0`: errors only
* `1`: basic status messages
* `2`: status, warnings, and errors
