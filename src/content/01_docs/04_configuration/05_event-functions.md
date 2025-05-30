---
title: Custom event hook functions
menu: Event functions
description: How to create custom functions to add, alter, or remove data when specific build events occur.
date: 2025-01-07
priority: 0.9
tags: configuration, events, hooks, functions, plugins
---

Functions can be defined in your [configuration](--ROOT--docs/configuration/file) or plugin files that are called when specific events occur at build time. The functions can inspect, add, alter, or remove data.

::: aside
## Publican plugins

Publican has no specific plugin options or methods, but function hooks provide a way to create reusable modules that can be used across projects.
::: /aside


## Synchronous functions only

Only synchronous functions can be used in hooks. Do not add functions that are `async` or return a `Promise` since they are not likely to resolve before the build completes.

If necessary, you can call asynchronous code to fetch data before calling `await publican.build()` and use it in hook functions.


## Processing order

Hooks are implemented as a JavaScript [Set](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set) so any number of functions can be associated with a single event using [`.add()`{language=js}](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set/add). Similarly, [`.delete()`{language=js}](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set/delete) and [`.clear()`{language=js}](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set/clear) can be used to remove one or all functions respectively.

Functions are normally processed in the order they are defined, but this cannot be guaranteed. Ensure your code does not depend on a specific execution order.


## `processContent`

A function hook called after a [content file](--ROOT--docs/content/files) (or [virtual file](--ROOT--docs/content/files#virtual-content-files)) is loaded and parsed.

Function parameters:

1. `data` (object): the content file's parsed [post properties](--ROOT--docs/templates/content-properties#core-post-properties).
1. `filename` (string): the filename relative to the [content directory](--ROOT--docs/content/files#content-file-location).

The function can examine and change any `data` property because it's passed by reference. Return values are ignored.

```js
// example processContent hook
// output filename and append the word "POST: " to every title
publican.config.processContent.add(
  (data, filename) => {
    console.log(`processing ${ filename }`);
    data.title = 'POST: ' + data.title;
  }
);
```


## `processTemplate`

A function hook called after a [template file](--ROOT--docs/templates/files) (or [virtual file](--ROOT--docs/templates/files#virtual-template-files)) is loaded.

Function parameters:

1. `template` (string): the template content.
1. `filename` (string): the filename relative to the [template directory](--ROOT--docs/templates/files#template-file-location)

The function can examine, change, and return the `template` string to update it (in memory).

```js
// example processTemplate hook
// prepends the template filename as an HTML comment
publican.config.processTemplate.add(
  (template, filename) => `\n<!-- ${ filename } -->\n${ template }`
);
```


## `processRenderStart`

A function hook called once before page rendering starts.

Function parameters:

1. `tacs` (object): the [global `tacs` object](--ROOT--docs/templates/global-properties).

The function can examine and modify any `tacs` property because it's passed by reference. Return values are ignored.

```js
// example processRenderStart hook
// creates a new global tacs.tagScore Map
// which stores the number of posts for each tag reference
publican.config.processRenderStart.add(
  tacs => {
    tacs.tagScore = new Map();
    tacs.tagList.forEach(t => tacs.tagScore.set(t.ref, t.count));
  }
);
```


## `processPreRender`

A function hook called for each page just before it's rendered.

Function parameters:

1. `data` (object): the [post `data` object](--ROOT--docs/templates/content-properties#core-post-properties).
1. `tacs` (object): the [global `tacs` object](--ROOT--docs/templates/global-properties).

The function can examine and modify either object because they are passed by reference. Return values are ignored.

```js
// example processPreRender hook
// set a new data.renderTime property on HTML content
publican.config.processPreRender.add(
  data => {
    if (data.isHTML) data.renderTime = new Date();
  }
);
```


## `processPostRender`

A function hook called for each page when it's been fully rendered prior to minification and saving to a build file.

Function parameters:

1. `output` (string): the rendered content.
1. `data` (object): the [post `data` object](--ROOT--docs/templates/content-properties#core-post-properties).
1. `tacs` (object): the [global `tacs` object](--ROOT--docs/templates/global-properties).

The function can examine, change, and return the `output` string to update it.

```js
// example processPreRender hook
// add meta tags to HTML content
publican.config.processPostRender.add(
  (output, data) => {
    if (data.isHTML) {
      output = output.replace(
        '</head>',
        '<meta name="generator" content="Publican" />\n' +
        `<meta name="generated" content="${ data.renderTime }" />\n` +
        '</head>'
      );
    }
    return output;
  }
);
```
