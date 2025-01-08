---
title: esbuild configuration
menu: Configuration
description: How esbuild is used in the Starter template to bundle CSS and JavaScript.
date: 2025-01-08
priority: 0.9
tags: esbuild, configuration, JavaScript, CSS
---

Publican primarily constructs HTML files and static assets. It can copy CSS and JavaScript files, but a dedicated bundler offers more sophisticated options such as source maps, tree-shaking, and platform-targeting.

The Starter template uses [esbuild](https://esbuild.github.io/) to:

* bundle CSS
* bundle JavaScript, and
* run a development web server with live CSS reloading.

esbuild is optional and not necessary for Publican projects. You can use any build system or development server, such as [Browsersync](https://browsersync.io/) or [small-static-server](https://www.npmjs.com/package/small-static-server).


## Bundled files

The Starter template uses esbuild to bundle:

* CSS files contained in `src/css/`. `main.css` is the entry file which loads others. The bundled file is built to `build/css/main.css`.

* JavaScript files contained in `src/js/`. `main.js` is the entry file which loads others. The bundled file is built to `build/js/main.js`.

During a development build, files are not minified, retain `console` and `debugger` statements, and provide linked source maps. esbuild can watch for changes and automatically rebundle.


## esbuild options

esbuild is configured using JavaScript so you can add instructions to the Publican [`publican.config.js` configuration file](--ROOT--docs/esbuild/configuration/). The Starter template uses environment variables defined in `.env.dev` and `.env.prod`:

* `BUILD_DIR` sets the build directory, as used by Publican (`./build/`)
* `CSS_DIR` sets the CSS entry file (`./src/css/main.css`)
* `JS_DIR` sets the JavaScript entry file (`./src/js/main.js`)
* `BROWSER_TARGET` to sets a list of minimum browser targets (`chrome125,firefox125,safari17`)

These are used to set defaults, e.g.

{{ `publican.config.js` excerpt }}
```js
const
  isDev = (process.env.NODE_ENV === 'development');

const
  target = (process.env.BROWSER_TARGET || '').split(','),
  logLevel = isDev ? 'info' : 'error',
  minify = !isDev,
  sourcemap = isDev && 'linked';
```


### CSS context

The CSS build context is defined as follows:

{{ `publican.config.js` excerpt }}
```js
// bundle CSS
const buildCSS = await esbuild.context({

  entryPoints: [ process.env.CSS_DIR ],
  bundle: true,
  target,
  external: ['/media/*'],
  loader: {
    '.woff2': 'file',
    '.png': 'file',
    '.jpg': 'file',
    '.svg': 'dataurl'
  },
  logLevel,
  minify,
  sourcemap,
  outdir: `${ process.env.BUILD_DIR }css/`

});
```


### JavaScript context

The JavaScript build context is defined as follows:

{{ `publican.config.js` excerpt }}
```js
// bundle JS
const buildJS = await esbuild.context({

  entryPoints: [ process.env.JS_DIR ],
  format: 'esm',
  bundle: true,
  target,
  external: [],
  define: {
    __ISDEV__: JSON.stringify(isDev)
  },
  drop: isDev ? [] : ['debugger', 'console'],
  logLevel,
  minify,
  sourcemap,
  outdir: `${ process.env.BUILD_DIR }js/`

});
```

The string `__ISDEV__` is replaced with `true` or `false`. This makes it possible to add JavaScript which only runs in development mode:

```js
if (__ISDEV__) {
  console.log('Site running in development mode');
}
```

The code in `src/js/dev/css-reload.js` uses this to enable CSS live reloading. The production build removes the code when it encounters `if (false) { ... }`.


### Watch mode

esbuild launches a development server, watches for file changes, and re-bundles when Publican's [watch mode](--ROOT--docs/configuration/options/#watch-mode) is enabled:

{{ `publican.config.js` excerpt }}
```js
if (publican.config.watch) {

  // watch for file changes
  await buildCSS.watch();
  await buildJS.watch();

  // development server
  await buildCSS.serve({
    servedir: process.env.BUILD_DIR,
    port: parseInt(process.env.SERVE_PORT) || 8000
  });

}
```


### Static build

esbuild bundles CSS and JavaScript once when watch mode is not enabled:

{{ `publican.config.js` excerpt }}
```js
else {

  // single build
  await buildCSS.rebuild();
  buildCSS.dispose();

  await buildJS.rebuild();
  buildJS.dispose();

}
```
