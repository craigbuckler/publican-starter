---
title: Usage
menu: Usage
description: How to use the Publican starter template on your own system.
date: 2024-12-10
priority: 0.9
tags: build
---

The starter project can be started in development or production mode according to the value of the `NODE_ENV` environment variable.


## Development build

Start a development build and live server with:

{{ `terminal` }}
```bash
npm start
```

Load the development site in a browser at https://localhost:8222/

The site content, CSS, and JavaScript files are updated when any are changed. Note:

* CSS changes live reload -- *you do not need to hit refresh*.
* HTML and JavaScript changes require a manual refresh.
* Changes to `publican.config.js` or static files only occur when the process is stopped and restarted.


## Production build

Create a production build with:

{{ `terminal` }}
```bash
npm build
```

This contains optimized and minified files which can be deployed to a live server.


## Environment variables

The starter template uses environment variables to configure values in the Publican `publican.config.js` [configuration file](--ROOT--docs/configuration/file/). You can change these or optionally use a similar set-up in your own projects.

Development values are defined in `.env.dev`:

{{ .env.dev (example) }}
```bash
# build mode
NODE_ENV=development

# development server port
SERVE_PORT=8222

# CSS and JS browser target
BROWSER_TARGET="chrome125,firefox125,safari17"

# build directory
BUILD_DIR=./build/
BUILD_ROOT=/
```

The file is passed to Publican in the npm development mode `"start"`{language=json} script:

{{ package.json (excerpt) }}
```json
"start": "node --env-file=.env.dev ./publican.config.js"
```

Production values are defined in `.env.prod` which override `.env.dev` where necessary:

{{ .env.prod (example) }}
```bash
# Overrides .env.dev defaults

# build mode
NODE_ENV=production
```

This is passed to Publican in the npm production mode `"build"`{language=json} script:

{{ package.json (excerpt) }}
```json
"build": "node --env-file=.env.dev --env-file=.env.prod ./publican.config.js",
```
