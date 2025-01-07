---
title: Configuration file
menu: Configuration file
description: How to create and launch a Publican configuration file using options for development and production.
date: 2024-12-20
priority: 0.9
tags: configuration, .env, npm
---

To build a site, you must create a configuration file in the project root named `publican.config.js` (any name can be used). The simplest script creates a `Publican` object and executes its `.build()`{language=js} method to pull [content](--ROOT--docs/content/files/) into [templates](--ROOT--docs/template/files/) and create a site in the `build` directory:

{{ `publican.config.js` }}
```js
// import Publican
import { Publican } from 'publican';

// create Publican object
const publican = new Publican();

// build site
await publican.build();
```

However, most sites will require more [options](--ROOT--docs/configuration/options/) set before `.build()`{language=js} is called.

The script is executed from the project directory using:

```bash
node ./publican.config.js
```


## Development and production

By default, Publican builds a production site where draft and future-dated posts are not rendered. Setting the environment variable `NODE_ENV` to `development` builds a development site where all content is rendered.

You can set `NODE_ENV` on Linux and Mac OS:

```bash
NODE_ENV=development
```

in Windows Powershell:

```bash
$env:NODE_ENV="development"
```

or the Windows `cmd` prompt:

```bash
set NODE_ENV=development
```

You can also examine `NODE_ENV` in your `publican.config.js` configuration to control options such as minification and live watch mode:

{{ `publican.config.js` }}
```js
// import Publican
import { Publican } from 'publican';

// create Publican object
const publican = new Publican();
const isDev = (process.env.NODE_ENV === 'development');

console.log(`Building ${ isDev ? 'development' : 'production' } site`);

// do not minify in development mode
publican.config.minify.enabled = !isDev;

// file watch in development mode
publican.config.watch = isDev;

// build site
await publican.build();
```


## Using `.env` files

It's impractical to keep setting `NODE_ENV` and there may be other values you want to change. Optionally, you can create a `.env.dev` file in the project root which defines defaults:

{{ `.env.dev` example }}
```bash
# build mode
NODE_ENV=development

# content files
CONTENT_DIR=./src/content/

# template files
TEMPLATE_DIR=./src/template/

# build directory
BUILD_DIR=./build/
BUILD_ROOT=/
```

The values can then be imported into `publican.config.js` so the same configuration file can be used across multiple projects with slightly different set-ups:

{{ `publican.config.js` excerpt }}
```js
// Publican defaults
publican.config.dir.content = process.env.CONTENT_DIR;
publican.config.dir.template = process.env.TEMPLATE_DIR;
publican.config.dir.build = process.env.BUILD_DIR;
publican.config.root = process.env.BUILD_ROOT;
```

Node.js has built-in support for `.env` files. Run a development build with:

```bash
node --env-file=.env.dev ./publican.config.js
```

An `.env.prod` file could override development settings. In most cases, it will be a matter of changing `NODE_ENV`:

{{ `.prod.dev` example }}
```bash
# build mode
NODE_ENV=production
```

Then running a production build with:

```bash
node --env-file=.env.dev --env-file=.env.prod ./publican.config.js
```


## Using npm scripts

The `node` commands are a little long, so it's practical to add scripts to your project's `package.json` file:

{{ `package.json` }}
```json
{
  "name": "My Site",
  "version": "1.0.0",
  "description": "A site built with Publican",
  "type": "module",
  "main": "publican.config.js",
  "scripts": {
    "build": "node --env-file=.env.dev --env-file=.env.prod ./publican.config.js",
    "start": "node --env-file=.env.dev ./publican.config.js"
  },
  "dependencies": {
    "publican": "1.0.0"
  }
}
```

You can then build a development site with:

```bash
npm start
```

and a production site with:

```bash
npm run build
```
