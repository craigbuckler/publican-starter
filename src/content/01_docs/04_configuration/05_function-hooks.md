---
title: Function hooks
menu: Function hooks
description: How to create custom functions to add, alter, or remove data at build time.
date: 2025-01-02
priority: 0.9
tags: configuration, function hooks, plugins
---

Functions can be defined in your [configuration file](--ROOT--docs/configuration/file/) or plugins than can be called when specific events occur to add, alter, or remove data at build time.

{aside}
## Publican plugins

Publican has no specific plugin options or methods, but function hooks provide a way to create reusable modules that can be used across projects.
{/aside}


## Import global data

The Publican module exports:

1. the primary `Publican` class used to build static sites (required), and
1. the jsTACS values `tacsConfig`, `tacs`, `templateMap`, and `templateParse`. Of these, only the `tacs` object is generally useful because it contains [global properties](--ROOT--docs/templates/global-properties/) available to all templates.

Configurations using function hooks will normally import both `Publican` and `tacs` so both are available:

{{ `publican.config.js` excerpt }}
```js
// import Publican
import { Publican, tacs } from 'publican';

// create Publican object
const publican = new Publican();
```

If you are creating functions in modules outside `publican.config.js`, you may want to import the global `tacs` object:

{{ `lib/hooks.js` example }}
```js
import { tacs } from 'publican';

// show unique number of tags created
export function renderstartTagListCount() {
  console.log(`${ tacs.tagList.length } tags have been created`);
}
```

This can then be used in the configuration:

{{ `publican.config.js` excerpt }}
```js
// import Publican
import { Publican, tacs } from 'publican';
import * as hooks from './lib/hooks.js';

// create Publican object
const publican = new Publican();

// processRenderStart hook
publican.config.processRenderStart.add( hooks.renderstartTagListCount );
```


## Processing order

Hooks are implemented as a JavaScript [Set](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set) so any number of functions can be associated with a single event using [`.add()`{language=js}](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set/add). Similarly, [`.delete()`{language=js}](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set/delete) and [`.clear()`{language=js}](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set/clear) can be used to remove one or all functions respectively.

Functions are normally processed in the order they are defined, but this cannot be guaranteed. Ensure your code does not depend on a specific execution order.


## `processContent`

A function hook called when a [content file](--ROOT--docs/content/files/) (or [virtual file](--ROOT--docs/content/files/#virtual-content-files)) is initially loaded.

Function parameters:

1. `filename` (string): the filename relative to the [content directory](--ROOT--docs/content/files/#content-file-location)
1. `data` (object): the content file's parsed [post properties](--ROOT--docs/templates/content-properties/#core-post-properties)

The function can examine and change any `data` property because it's passed by reference. Return values are ignored.

```js
// example processContent hook
// output filename and append the word "POST: " to every title
publican.config.processContent.add(
  (filename, data) => {
    console.log(`processing ${ filename }`);
    data.title = 'POST: ' + data.title;
  }
);
```


## `processTemplate`

A function hook called when a [template file](--ROOT--docs/templates/files/) (or [virtual file](--ROOT--docs/templates/files/#virtual-template-files)) is initially loaded.

Function parameters:

1. `filename` (string): the filename relative to the [template directory](--ROOT--docs/templates/files/#template-file-location)
1. `template` (string): the template content

The function can examine, change, and return the `template` string to update it (in memory).

```js
// example processTemplate hook
// replace all instances of `__COPYRIGHT__` with a `©` symbol
publican.config.processTemplate.add(
  (filename, template) => template.replaceAll('__COPYRIGHT__', '&copy;')
);
```

Note that [string replacement](--ROOT--docs/configuration/string-replacement/) is an easier option unless you have complex requirements.


## `processRenderStart`

A function hook called once before rendering starts. It is not passed anything, but could access and modify [global `tacs` properties](--ROOT--docs/templates/global-properties/). Return values are ignored.

The following example creates a new global `tacs.tagScore` [Map](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map) which holds the number of posts for each tag reference:

```js
publican.config.processRenderStart.add(
  () => {
    tacs.tagScore = new Map();
    tacs.tagList.forEach(t => tacs.tagScore.set(t.ref, t.count));
  }
);
```


## `processPreRender`

A function hook called for each page just before it's rendered. It is passed the [post `data` object](--ROOT--docs/templates/content-properties/#core-post-properties) and can manipulate any property because it's passed by reference. The [global `tacs` properties](--ROOT--docs/templates/global-properties/) are also available. Return values are ignored.

```js
// set a renderTime property on HTML content
publican.config.processPreRender.add(
  (data) => {
    if (data.isHTML) data.renderTime = new Date();
  }
);
```


## `processPostRender`

A function hook called for each page when it's been fully rendered prior to minification and saving to a build file.

Function parameters:

1. `data` (object): the content file's parsed [post properties](--ROOT--docs/templates/content-properties/#core-post-properties)
1. `output` (string): the rendered content.

The function can examine, change, and return an `output` string to update it.

```js
// add a generator meta tag to HTML content
publican.config.processPostRender.add(
  (data, output) => {
    if (data.isHTML) {
      output = output.replace(
        '</head>',
        '<meta name="generator" content="Publican" />\n</head>'
      );
    }
    return output;
  }
);
```


## `processRenderComplete`

A function hook called once when all output has been rendered and at least one file has changed. The function is passed an array of objects with the following properties:

1. `slug` (string): the output file name relative to the build directory
1. `content` (string): the final rendered content.

The array and any property can be changed because it's passed by reference. Return values are ignored.

```js
// add the slug as a comment to the end of HTML files
publican.config.processRenderComplete.add(
  (write) => {
    console.log(`Writing ${ write.length } files`);
    write.forEach(w => {
      if (w.slug.endsWith('.html')) w.content += `<!-- ${ w.slug } -->`;
    });
  }
);
```
