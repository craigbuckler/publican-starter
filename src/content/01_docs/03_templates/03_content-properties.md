---
title: Content properties
menu: Content properties
description: The content properties provided to each page rendered by Publican.
date: 2024-12-17
priority: 0.9
tags: content, front matter, templates, template literals
---

This section describes the content properties available in the `data`{language=js} object available to [template literals](--ROOT--docs/templates/template-literals/) in templates, [content](--ROOT--docs/content/files/), and [front matter](--ROOT--docs/content/front-matter/).


## Core post properties

The following properties are provided for page content by Publican irrespective of front matter definitions. Summary:

|`data` property|description||
|---|---|---:|
|`.title`|title|[*more*](#datatitle)|
|`.menu`|title for menus|[*more*](#datamenu)|
|`.content`|main content|[*more*](#datacontent)|
|`.contentRendered`|final rendered main content|[*more*](#datacontentrendered)|
|`.date`|date created|[*more*](#datadate)|
|`.publish`|publication date or `draft`|[*more*](#datapublish)|
|`.index`|`false` or indexing frequency|[*more*](#dataindex)|
|`.priority`|`0` (least) to `1` (most) important|[*more*](#datapriority)|
|`.tags`|array of tag data|[*more*](#datatags)|
|`.wordCount`|number of words in content|[*more*](#datawordcount)|
|`.postnext`|`data` of next post|[*more*](#datapostnext)|
|`.postback`|`data` of previous post|[*more*](#datapostback)|
|`.pagination`|object for directory and tag index pages|[*more*](#datapaginatation)|
|`.filename`|content filename|[*more*](#datafilename)|
|`.template`|template filename|[*more*](#datatemplate)|
|`.slug`|build filename|[*more*](#dataslug)|
|`.link`|full link to page|[*more*](#datalink)|
|`.directory`|name of root directory|[*more*](#datadirectory)|
|`.isMD`|content is markdown|[*more*](#dataismd)|
|`.isHTML`|built file is HTML|[*more*](#dataishtml)|
|`.isXML`|built file is XML|[*more*](#dataisxml)|
|`.debug`|enable debugging|[*more*](#datadebug)|


### `data.title`{language=js}

The page title for headings, `<title>` tags, feeds, etc.


### `data.menu`{language=js}

Where necessary, an abbreviated page title for menus and other navigation links.


### `data.content`{language=js}

The main page content. Markdown content is already translated to HTML.


### `data.contentRendered`{language=js}

Content such as RSS feeds needs to access the fully-rendered content of pages. Publican ensures this content is rendered last to ensure page content is available.


### `data.date`{language=js}

The `Date()`(https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date) of the post, or `null` if not defined.

In general, you will not want to output raw dates. The Starter template provides a number of date formatting functions in `lib/format.js` that are assigned to the `tacs.fn.format` object, e.g.

```html
<!-- example: December 5, 2025 -->
<p>This post was written on ${ tacs.fn.format.dateHuman( data.date ) }.<p>

<!-- example: 2025 -->
<p>&copy;${ tacs.fn.format.dateYear( data.date ) }</p>
```


### `data.publish`{language=js}

A Boolean value indicating whether the page is published according to the `publish` [front matter](--ROOT--docs/content/front-matter/) value. Any content set to `draft`, `false`, or a date beyond today is not published on a production build.

A development build will publish all posts.

The value is not normally useful since it will always be `true`!


### `data.index`{language=js}

Either `false` or a string denoting the (SEO) indexing frequency (`daily`, `weekly`, `monthly`, `yearly`).

The value is used to remove pages from navigation and menus. You could also check it when generating sitemaps.


### `data.priority`{language=js}

The post priority (SEO importance) from `0` to `1`. The default is `0.1`.

The value is most used for XML sitemaps and to order pages in Publican navigation.


### `data.tags`{language=js}

Publican can automatically generate paginated pages of links to posts with specific tags. The `data.tags` value is an array of objects with the following properties:

* `tag`: the tag name, e.g. `Front Matter`
* `ref`: a normalized reference name, e.g. `front-matter`
* `link`: the link to the tag index page, e.g. `/tag/front-matter/`
* `slug`: the tag index page build file location, e.g. `tag/front-matter/index.html`

Example:

```json
[
  {
    tag: 'HTML',
    ref: 'html',
    link: '/tag/html/',
    slug: 'tag/html/index.html'
  },
  {
    tag: 'Front Matter',
    ref: 'front-matter',
    link: '/tag/front-matter/',
    slug: 'tag/front-matter/index.html'
  }
]
```

Code to output the page's tags with links to their index pages:

```html
${ data?.tags?.map(t => `<p><a href="${ t.link }">${ t.tag }</a></p>`) }
```


### `data.wordCount`{language=js}

The number of words in the content as an integer.


### `data.postnext`{language=js}

The `data` object of the next post (according to the content order). Usage example:

```html
${ data?.postnext?.title && `<p class="next"><a href="${ data.postnext.link }">next post: ${ data.postnext.title }</a></p>` }
```


### `data.postback`{language=js}

The `data` object of the previous post (according to the content order). Usage example:

```html
${ data?.postback?.title && `<p class="next"><a href="${ data.postback.link }">previous post: ${ data.postback.title }</a></p>` }
```


### `data.paginatation`{language=js}

Generated root directory and tag index pages provide a `data.pagination` object with the following properties.

|name|description|
|-|-|
|`.page`|an array of page `data` objects available in the current page|
|`.pageTotal`|total number of pages|
|`.pageCurrent`|current page number (zero based)|
|`.pageCurrent1`|current page number (one based)|
|`.subpageFrom1`|post number from|
|`.subpageTo1`|post number to|
|`.hrefBack`|link to previous paginated page|
|`.hrefNext`|link to next paginated page|
|`.href`|array of links to all paginated pages|


### `data.filename`{language=js}

The name of content file relative to the [content directory](--ROOT--docs/configuration/options/#directories), e.g. `#index.md` or `about/contact-us.md`.

The value is rarely required, but may be practical if you want to modify content for a specific content file.


### `data.template`{language=js}

The root template being used.


### `data.slug`{language=js}

The rendered filename relative to the [build directory](--ROOT--docs/configuration/options/#directories), e.g. `index.html` or `about/contact-us/index.html`.

The value is rarely required, but may be practical if you want to modify content for a specific output file.


### `data.link`{language=js}

The full link to the page, including the [root path](--ROOT--docs/configuration/options/#root-server-path).

The value is rarely required for the current page, but is used in navigation and pagination objects.


### `data.directory`{language=js}

The root content path/directory, typically used for directory pagination.


### `data.isMD`{language=js}

A Boolean value which is `true` when the content is provided in [markdown format](--ROOT--docs/content/markdown/).

This value is used internally my Publican but may be useful if you want to modify markdown-generated content in some way.


### `data.isHTML`{language=js}

A Boolean value which is `true` when the rendered file is HTML

This may be useful if you need to modify HTML content.


### `data.isXML`{language=js}

A Boolean value which is `true` when the rendered file is XML

This may be useful if you need to modify XML content.


### `data.debug`{language=js}

A value passed by front matter which can be used to enable debugging output in functions or elsewhere.


## Custom page properties

Page `data` properties be added, modified, or removed from `data` objects using any of the following methods (which show how to set an author).

1. Set [front matter values](--ROOT--docs/content/front-matter/#custom-front-matter):

    {{ markdown }}
    ```md
    ---
    title: My Post
    date: 2025-01-01
    author: Craig Buckler
    ---
    ```

1. Run a [`processContent` function hook](--ROOT--docs/configuration/event-functions/#processcontent) when content is initially loaded:

    {{ `publican.config.js` example }}
    ```js
    publican.config.processContent.add(
      (filename, data) => data.author = 'Craig Buckler'
    );
    ```

1. Run a [`processPreRender` function hook](--ROOT--docs/configuration/event-functions/#processprerender) just before post rendering:

    {{ `publican.config.js` example }}
    ```js
    publican.config.processPreRender.add(
      (data) => data.author = 'Craig Buckler'
    );
    ```

1. Run a [`.processRenderStart` function hook](--ROOT--docs/configuration/event-functions/#processrenderstart) to process all post data before rendering:

    {{ `publican.config.js` example }}
    ```js
    publican.config.processRenderStart.add(
      () => tacs.all.forEach(post => post.author = 'Craig Buckler')
    );
    ```
