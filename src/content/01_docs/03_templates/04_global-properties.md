---
title: Global properties
menu: Global properties
description: The global jsTACS properties provided on all pages by Publican.
date: 2024-12-17
priority: 0.9
tags: content, front matter, templates, template literals
---

This section describes the properties available in the `tacs`{language=js} global object available to all pages for [template literals](--ROOT--docs/templates/template-literals/) in templates, [content](--ROOT--docs/content/files/), and [front matter](--ROOT--docs/content/front-matter/). These properties are typically used to create menus, navigation, feeds, etc.


## Core global properties

The following properties are provided for page content by Publican irrespective of front matter definitions. Summary:

|`tacs` property|description||
|---|---|---:|
|`.root`|web server directory|[*more*](#tacsroot)|
|`.all`|Map of posts indexed by slug|[*more*](#tacsall)|
|`.dir`|Map of posts in root directories|[*more*](#tacsdir)|
|`.tag`|Map of posts with tags|[*more*](#tacstag)|
|`.tagList`|array of tag objects|[*more*](#tacstaglist)|
|`.nav`|nested array of navigation objects|[*more*](#tacsnav)|


### `tacs.root`{language=js}

The web server root location. By default, Publican assumes files in the [build directory](--ROOT--docs/configuration/options/#directories) are published to the server root, so `${ tacs.root }`{language=js} returns `/`.

The [root server path](--ROOT--docs/configuration/options/#root-server-path) can be changed in the [configuration file](--ROOT--docs/configuration/file/).


### `tacs.all`{language=js}

A [Map object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map) of all published posts indexed by slug. For example, fetch the root home page:

```js
// fetch the home page title
${ tacs.all.get('index.html')?.title }
```

The object is typically used for sitemaps and feeds where a list of all posts is required. The Starter template defines an XML sitemap which:

1. Converts `tacs.all` to an array using [`toArray()`](--ROOT--docs/templates/template-literals/#toarray-expressions).
1. Filters out all posts where [`data.index`](--ROOT--docs/templates/content-properties/#dataindex) is `false`.
1. Uses [`.map()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/map) to create a new array of strings output to the file.

{{ `src/content/sitemap.xml` }}
```xml
---
index: false
---
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ ( toArray(tacs.all) ).filter(p => p.index !== false).map(p => `
<url>
  <loc>${ tacs.config.domain }${ p.link }</loc>
  ${ p.date ? `<lastmod>${ tacs.fn.format.dateUTC( p.date ) }</lastmod>` : '' }
  <changefreq>${ p.index || 'monthly' }</changefreq>
  <priority>${ p.priority }</priority>
</url>
`)
}
</urlset>
```

The Starter template uses similar functionality in `src/content/sitemap.txt`.


### `tacs.dir`{language=js}

A [Map object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map) of all published posts indexed by a root directory. Each item returns an ordered array of posts. For example, list all posts in the `about` directory:

```js
${ tacs.dir.get('about').map(p => `<p>${ p.title }</p>`) }
```

Publican can automatically generate directory index pages, so you should only require `tacs.dir` in situations where you require specific lists. The Starter template generates an RSS feed of the ten most recent posts in the `post` directory:

{{ `src/content/feed.xml` excerpt }}
```xml
${ tacs.dir.get('post')
    .filter(p => p.index !== false)
    .sort((a,b) => b.date-a.date)
    .slice(0,10)
    .map(p => `
      <item>
      <title>${ p.title }</title>
      <link>${ tacs.config.domain }${ p.link }</link>
      </item>
    `)
}
```

### `tacs.tag`{language=js}

A [Map object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map) of all published posts indexed by normalized tag (lower case, spaces replaced with `-`, etc.) Each item returns an ordered array of posts. For example, list all posts with an `html` tag:

```js
${ tacs.tag.get('html').map(p => `<p>${ p.title }</p>`) }
```

Publican can automatically generate tag index pages, so you should only require `tacs.tag` in situations where you require specific lists.


### `tacs.tagList`{language=js}

An array of tag objects ordered by highest to lowest usage. Each object has the following properties:

* `tag`: the tag name, e.g. `Front Matter`
* `ref`: a normalized reference name, e.g. `front-matter`
* `link`: the link to the tag index page, e.g. `/tag/front-matter/`
* `slug`: the tag index page build file location, e.g. `tag/front-matter/index.html`
* `count`: the number of times the tag is used

Example:

```json
[
  {
    tag: 'HTML',
    ref: 'html',
    link: '/tag/html/',
    slug: 'tag/html/index.html',
    count: 5
  },
  {
    tag: 'Front Matter',
    ref: 'front-matter',
    link: '/tag/front-matter/',
    slug: 'tag/front-matter/index.html',
    count: 3
  }
]
```

You should only require `tacs.tagList` on a root tag page that lists all tags. The Starter template creates one in `src/content/tag.html` by calling `${ tacs.fn.nav.tagList() }`{language=js}. This runs the `tagList()` function in `lib/nav.js` to create a navigation block.


### `tacs.nav`{language=js}

A nested array of post objects ordered for navigation menus, breadcrumb trails, etc. Each element in the array has [post `data`](--ROOT--docs/templates/content-properties/) as well as a `.children` property with an array child pages. Each child page has it's own `data` with `children`.

The Starter template provides example functions in `lib/nav.js` to recurse `tacs.nav` and output HTML strings.

* `menuMain( currentPage, omit )`{language=js} generates the nested main menu used in the header. `omit` is an array of root directories where child pages are not listed.

* `menuDir( currentPage, rootDir )`{language=js} generates a nested menu for a specific root folder as shown in the [Docs](--ROOT--docs/) section.

* `breadcrumb( currentPage )`{language=js} generates a breadcrumb trail of parent links to the current page.


## Custom global properties

`tacs` global properties can be added, modified, or removed in the [Publican configuration file](--ROOT--docs/configuration/file/). The Starter template adds the following values:

{{ `publican.config.js` excerpt }}
```js
import * as fnNav from './lib/nav.js';
import * as fnFormat from './lib/format.js';

// jsTACs rendering defaults
tacs.config = tacs.config || {};
tacs.config.isDev = isDev;
tacs.config.language = process.env.SITE_LANGUAGE;
tacs.config.domain = process.env.SITE_DOMAIN;
tacs.config.title = process.env.SITE_TITLE;
tacs.config.description = process.env.SITE_DESCRIPTION;
tacs.config.author = process.env.SITE_AUTHOR;
tacs.config.wordCountShow = parseInt(process.env.SITE_WORDCOUNTSHOW) || 0;
tacs.config.themeColor = process.env.SITE_THEMECOLOR || '#000';
tacs.config.buildDate = new Date();

// jsTACS functions
tacs.fn = tacs.fn || {};
tacs.fn.nav = fnNav;
tacs.fn.format = fnFormat;
```

The `process.env` values are set in `.env.dev` and `.env.prod` (see [Usage](--ROOT--docs/quickstart/usage/)).
