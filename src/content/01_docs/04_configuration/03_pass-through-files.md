---
title: Pass through files
menu: Pass through files
description: How to copy files that need no processing to the build directory.
date: 2024-12-24
priority: 0.9
tags: configuration, pass through
---

It's sometimes necessary to copy files to the build directory that require no further processing by Publican, e.g. fonts, images, videos, etc. This can be implemented in your `publican.config.js` configuration file by adding an object to the `.config.passThrough` [Set](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set):

```js
publican.config.passThrough.add({ from: <src>, to: <dest> });
```

where:

* `<src>` is a source directory relative to the project root, and
* `<dest>` is a destination directory relative to the build directory

Note that all sub-directories of the source are copied to the destination.

The Starter template defines the following pass-though files:

{{ `publican.config.js` excerpt }}
```js
// copy ./src/media/favicons/* to ./build/*
publican.config.passThrough.add({ from: './src/media/favicons', to: './' });

// copy ./src/media/images/* to ./build/images/*
publican.config.passThrough.add({ from: './src/media/images', to: './images/' });
```


## Watch mode

Publican copies pass-though files on the first build and does not monitor them in [watch mode](--ROOT--docs/configuration/options/#watch-mode). You must stop and restart Publican to copy new or updated files.
