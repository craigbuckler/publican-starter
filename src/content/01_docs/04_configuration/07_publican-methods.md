---
title: Publican public methods
menu: Publican methods
description: The public methods available in Publican configurations.
date: 2025-01-08
priority: 0.9
tags: configuration, methods, content, templates
---

The Publican object provides the following public methods that can be used in the [`publican.config.js` configuration files](--ROOT--docs/configuration/file/).


## `.addContent()`

Pass a string to Publican as a [virtual content file](--ROOT--docs/content/files/#virtual-content-files) (one without a physical file on disk), e.g.

{{ `publican.config.js` excerpt }}
```js
publican.addContent(
  'article/virtual-post.md', `
---
title: Virtual post
---
This is a virtual post!
`);
```


## `.addTemplate()`

Pass a string to Publican as a [virtual template file](--ROOT--docs/templates/files/#virtual-template-files) (one without a physical file on disk), e.g.

{{ `publican.config.js` excerpt }}
```js
publican.addTemplate(
  'mytemplate.html',
`<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>${ data.title }</title>
  </head>
  <body>
    <main>
      <h1>${ data.title }</h1>
      ${ data.content }
    </main>
  </body>
</html>
`);
```


## `.clean()`

An asynchronous function that removes all files from the [build directory](--ROOT--docs/configuration/options/#directories). The `.clean()` method should be called prior to running [`.build()`](#build) and ensures old files will not be present.

{{ `publican.config.js` }}
```js
// import Publican
import { Publican } from 'publican';

// create Publican object
const publican = new Publican();

// clear build directory
await publican.clean();

// build site
await publican.build();
```

The `.clean()` method works cross-platform so you do not require Node.js directory handling modules or alternative `npm` scripts.


## `.build()`

The main asynchronous function to start a build at toward the end of the [configuration file](--ROOT--docs/configuration/file/).

{{ `publican.config.js` excerpt }}
```js
// build site
await publican.build();
```

When [watch mode](--ROOT--docs/configuration/options/#watch-mode) is enabled, Publican will monitor content and template files and automatically rebuild again.
