---
title: How to create your own Publican projects
menu: Own projects
description: How to create your own Publican project from scratch.
date: 2024-12-12
priority: 0.9
tags: install, build
---

Use the steps below to create your own Publican project from scratch rather than using the starter template.

## Initialize the project

Create a new project directory:

{{ `terminal` }}
```bash
mkdir mysite
cd mysite
```

Initialize the project with whatever values you require:

{{ `terminal` }}
```bash
npm init
```

Install Publican as a dependency:

{{ `terminal` }}
```bash
npm i publican
```

## Create content

Create markdown or other content files in a new `src/content/` directory. For example:

{{ `src/content/#index.md` }}
```md
---
title: My first Publican site
---

This is my new static site built using Publican!

*Under construction!*
```


## Create a template

Create HTML template files in a new `src/template/` directory. For example:


{{ `src/template/default.html` }}
```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>${ data.title }</title>
  </head>
  <body>
    ${ include('_partials/header.html') }
    <main>
      <h1>${ data.title }</h1>
      ${ data.content }
    </main>
  </body>
</html>
```

This template includes the following partial which you should also create:

{{ `src/template/_partials/header.html` }}
```html
<header>
  <nav><a href="${ tacs.root }">HOME</a></nav>
</header>
```


## Configure Publican

Create a basic Publican configuration script, such as:

{{ `publican.config.js` }}
```js
// import Publican and jsTACS
import { Publican, tacs } from 'publican';

// export for other modules
export { publican, tacs };

// create Publican object
const
  publican = new Publican(),
  isDev = (process.env.NODE_ENV === 'development');

console.log(`Building ${ isDev ? 'development' : 'production' } site`);

// configure
publican.config.minify = !isDev;  // minify in production mode
publican.config.watch = isDev;    // watch in development mode

// clear build directory
await publican.clean();

// build site
await publican.build();
```

Optionally, you can edit `package.json` to set the default file type to ECMAscript modules (`"type": "module",`{language=json}) and define scripts:

{{ `package.json` }}
```json
{
  "name": "mysite",
  "version": "1.0.0",
  "description": "My static site",
  "type": "module",
  "main": "publican.config.js",
  "scripts": {
    "build": "NODE_ENV=production node ./publican.config.js",
    "start": "NODE_ENV=development node ./publican.config.js"
  },
  "dependencies": {
    "publican": "^1.0.0"
  }
}
```


## Build a development site

Build the site to the `./build/` directory and watch for file changes:

{{ `terminal` }}
```bash
npm start
```

You can examine the resulting files, open them from the file system, or use a local development server such as [small-static-server](https://www.npmjs.com/package/small-static-server).

Press <kbd>Ctrl</kbd> | <kbd>Cmd</kbd> + <kbd>C</kbd> to stop Publican running.


## Build a production site

Build the final site to the `./build/` directory with code minification:

{{ `terminal` }}
```bash
npm run build
```

These files can be deployed to any web server.
