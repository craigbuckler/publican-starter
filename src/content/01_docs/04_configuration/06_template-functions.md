---
title: Custom jsTACS global properties and functions
menu: Template functions
description: How to use Custom configuration options
date: 2025-01-07
priority: 0.9
tags: configuration, jsTACS, global, functions
---

You can append custom data and functions to the [global `tacs` object](--ROOT--docs/templates/global-properties/) that can be used in any template expression. These can provide advanced functionality that would be difficult to create in an expression or cause [issues in markdown content](--ROOT--docs/templates/template-literals/#template-literals-in-markdown).


## Accessing the global object

Publican exports all jsTACS objects: `tacsConfig`, `tacs`, `templateMap`, `templateGet`, `templateParse`, and `templateEngine`. Of these, `tacs` is most useful because it contains a [global object with properties](--ROOT--docs/templates/global-properties) available to all pages at build time.

You can import `tacs` into the `publican.config.js` configuration file or any other module:

```js
import { tacs } from 'publican';
```

You can then append your own global [properties](#defining-global-properties) and [functions](#defining-global-functions), but you should normally avoid changing the [Publican reserved values](--ROOT--docs/templates/global-properties/) `.root`, `.all`, `.dir`, `.tag`, `.tagList`, and `.nav`.


## Defining global properties


## Defining global functions
