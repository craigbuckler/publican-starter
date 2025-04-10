---
title: Template files
menu: Template files
description: How to use template files
date: 2024-12-13
priority: 0.9
tags: HTML, templates, directories
---

Publican templates define how [content](--ROOT--docs/content/files/) is slotted into HTML to create static pages. Templates typically define page headers, footers, and navigation blocks using [page content data](--ROOT--docs/templates/content-properties/) and [global site data](--ROOT--docs/templates/global-properties/) from Publican.

::: aside
## Template formats

Publican is designed to create static web pages so templates are defined as HTML files. However, you could configure the system to output other types of text file.
::: /aside


## Example template

HTML template files contain tags that insert Publican data using [template literals](--ROOT--docs/templates/template-literals/). For example:

{{ `default.html` }}
```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>${ data.title }</title>
  </head>
  <body>

    <header>
      <nav><a href="${ tacs.root }">HOME</a></nav>
    </header>

    <main>
      <h1>${ data.title }</h1>
      ${ data.content }
    </main>

  </body>
</html>
```


## Template file location

Define your content files in `src/template/` unless you set an [alternative directory](--ROOT--docs/configuration/options/#directories). This Starter site specifies it as an environment variable:

{{ `.env.dev` excerpt }}
```bash
# template files
TEMPLATE_DIR=./src/template/
```

which is passed to Publican:

{{ `publican.config.js` excerpt }}
```js
publican.config.dir.template = process.env.TEMPLATE_DIR;
```


## Default templates

Publican sets a default template file named `default.html` used by all pages. This Starter site sets:

* `default.html` as the default page template
* `list.html` as the template for directory index pages
* `tag.html` as the template for tag index pages

These are defined as environment variables in:

{{ `.env.dev` excerpt }}
```bash
# template files
TEMPLATE_DEFAULT=default.html
TEMPLATE_LIST=list.html
TEMPLATE_TAG=tag.html
```

and passed to Publican:

{{ `publican.config.js` excerpt }}
```js
// default HTML templates
publican.config.defaultHTMLTemplate = process.env.TEMPLATE_DEFAULT;
publican.config.dirPages.template = process.env.TEMPLATE_LIST;
publican.config.tagPages.template = process.env.TEMPLATE_TAG;
```

The root `#index.html` page and `tag.html` content pages set `template: simple.html` in their front matter.


## Virtual template files

Templates can be passed to Publican as a string in the [configuration file](--ROOT--docs/configuration/file/). This may be useful if you want to create custom templates or partials using conditions or other logic.

To add a virtual template, call:

```js
publican.addTemplate( <filename>, <content> );
```

prior to running the build process with `await publican.build();`{language=js}.

The `filename` is relative to the [template location](#template-file-location). For example:

{{ `publican.config.js` }}
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
