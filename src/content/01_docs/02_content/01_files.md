---
title: Publican content files
menu: Content files
description: How content is defined for a Publican static site.
date: 2024-12-10
priority: 0.9
tags: content, front matter
---

Publican content files define the main content of a page. They should not normally define content such as page headers, footers, and navigation blocks which typically reside in [templates](--ROOT--docs/templates/files/).

{aside}
## Content rules

Publican does not enforce content/template rules. You can combine files as you like.
{/aside}


## Example content

Content files can contain markdown, HTML, or any other text format.

{{ example `#index.md` }}
```md
---
title: My first Publican site
menu: Home
description: My home page.
author: Craig Buckler
date: 2025-01-02
priority: 1
tags: Publican, SSG
---

This is my new static site built using Publican.

It was written on ${ data.date } by ${ data.author }
and has ${ data.wordCount } words.

## An H2 title

This site is *under construction!*
```

The top lines between `---` [delimiters](--ROOT--docs/configuration/options/) is [front matter](--ROOT--docs/content/front-matter/) `name: value` pairs. These define meta data about the content that can be used in in [templates](--ROOT--docs/templates/files/), the content, or even within other front matter fields.

Front matter can be added to any file. For example, the text-based sitemap sets `index: false` so it's omitted from other sitemaps and feeds:

{{ `sitemap.txt` }}
```js
---
index: false
---
${ (toArray(tacs.all)).map(p => p.index !== false ? `${ tacs.config.domain }${ p.link }\n` : '').join('') }
```

The primary content follows the front matter. [Markdown](--ROOT--docs/content/markdown/) is converted to HTML during the build but all other file content is not changed (other than removing the front matter block).

Any file can use `${ expression }`{language=js} [template literals](--ROOT--docs/templates/template-literals/) to output page or global values.


## Content file location

Define your content files in `src/content/` unless you set an [alternative directory](--ROOT--docs/configuration/options/#directories).  This Starter site specifies it as an environment variable:

{{ `.env.dev` excerpt }}
```bash
# content files
CONTENT_DIR=./src/content/
```

which is passed to Publican:

{{ `publican.config.js` excerpt }}
```js
publican.config.dir.content = process.env.CONTENT_DIR;
```


## Directory structure

By default, every content file's location defines the URL structure (the slug). Examples:

|source file in `src/content`|creates slug in `build/`|
|-|-|
|\#index.md|index.html|
|\#index.html|index.html|
|feed.xml|feed.xml|
|post/my-post.md|post/my-post/index.html|
|post/my-post/\#index.md|post/my-post/index.html|
|post/my-post/new.md|post/my-post/new/index.html|

Default slug definition rules:

* The characters `#`, `!`, `$`, `^`, `~`, and space are removed.

* All letters are converted to lower case.

* `.md` and `.html` files are web page content so they will always have a file name of `index.html` in a specific directory.

Publican shows an error and aborts when slugs clash.


### Root directory indexes

Publican creates paginated lists of posts for every root directory. This site's [documentation index page](--ROOT--docs/) shows an example.


### Ignored content files

Filenames beginning with an underscore (`_`) are ignored ([the rule is configurable](--ROOT--docs/configuration/options/#ignored-content-files)). This can be useful if you are creating notes or content that should not appear in development or production builds.


### Custom slugs

A `slug` value can be set in [front matter](--ROOT--docs/content/front-matter/) which overrides the directory location.


### Slug string replacement

By default, Publican orders files by the [front matter](--ROOT--docs/content/front-matter/) `priority` value (highest to lowest) in menus and pagination.

The starter site template orders files by filename. Directories and files have an initial number followed by an underscore, e.g.

```
docs/

  01_quickstart/
    01_overview.md
    02_install.md
    03_usage.md

  02_content/
    01_files.md
    02_markdown.md
    03_front-matter.md

about/
  #index.md
  01_publican.md
  02_links.md
  03_licence.md
```

The benefits:

* It's easier to locate and re-order content in large directories.
* Pages can have the same priority -- there's no need to manually edit the order.

The initial `NN_` is removed from the slug using custom [slug string replacement](--ROOT--docs/configuration/options/#slug-string-replacement).


## Virtual content files

Content can be passed to Publican as a string in the [configuration file](--ROOT--docs/configuration/file/). This may be useful if you are retrieving data from a Content Management System rather than using the file system.

To add virtual content, call:

```js
publican.addContent( <filename>, <content> );
```

prior to running the build process with `await publican.build();`{language=js}.

The `filename` follows the [directory structure rules](#directory-structure) and determines the type of content. For example, to create a markdown page:

{{ `publican.config.js` }}
```js
publican.addContent(
  'article/virtual-post.md', `
---
title: Virtual post
---
This is a virtual post!
`);
```
