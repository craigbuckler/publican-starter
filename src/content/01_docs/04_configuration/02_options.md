---
title: Core configuration options
menu: Configuration options
description: How to use Core configuration options
priority: 0.9
tags: options
---


## Directories

The default Publican directories are:

* `./src/content/` for content files
* `./src/template/` for template files
* `./build/` for the built site

You can change these as required:

{{ `publican.config.js` }}
```js
// change directories
publican.config.dir.content = './content/';
publican.config.dir.template = './templates/';
publican.config.dir.build = './mysite/';
```

Avoid setting the `content` directory as a sub-directory of `template` or vice versa.


## Ignored content files

Publican `config.ignoreContentFile` is a file ignore regex (`/^_.*$/`{language=js}) which omits any content file starting with an underscore `_`. You can remove this restriction:

{{ `publican.config.js` }}
```js
// do not ignore any file
publican.config.ignoreContentFile = null;
```

or add your own, e.g.

{{ `publican.config.js` }}
```js
// ignore files starting with a .
publican.config.ignoreContentFile = `/^\..*$/`;
```


## Slug string replacement

The starter site template orders files by filename rather than priority or date in menus and pagination. Directories and files have an initial number followed by an underscore, e.g.

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
```

The initial `NN_` is removed from the slug using a regular expression defined in the `config.slugReplace` [Set object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set):

{{ `publican.config.js` }}
```js
// slug replacement strings - removes NN_ from slug
publican.config.slugReplace.set(/\d{2,}_/g, '');
```

You can add further search string/regex and replacement values, e.g. rename all `html` files as `.htm`:

{{ `publican.config.js` }}
```js
// rename .html files to .htm
publican.config.slugReplace.set('.html', '.htm');
```
