---
title: Template literals
menu: Template literals
description: How to use JavaScript template literals in content and templates.
date: 2024-12-13
priority: 0.9
tags: HTML, markdown, content, front matter, templates, template literals
---

Publican uses [jsTACS](https://www.npmjs.com/package/jstacs) -- *JavaScript Templating and Caching System for Node.js* -- as its templating engine. Unlike other engines, there's no special files or syntax: you just use JavaScript template literals such as:

```html
<h1>${ data.title }</h1>
```

Template literals can be used in templates, [content](--ROOT--docs/content/files/), and [front matter](--ROOT--docs/content/front-matter/).


## Basic syntax

All `${ expression }`{language=js} usually return a single string created content and global site data. For example:

```html
<!-- page title -->
<h1>${ data.title }</h1>

<!-- page tags -->
${ data?.tags?.map(t => `<p><a href="${ t.link }">${ t.tag }</a></p>`) }
```

Note that the JavaScript values:

* `null`, `undefined` and `NaN` are rendered as an empty string
* `true`, `false` and `0` are rendered as text
* [Arrays](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array), [Sets](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set), and [Maps](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map) have every value output. There's no need for `.join('')`{language=js} unless you want a specific character between each item.


### `toArray()` expressions

The `toArray()` function converts any value, object, Set, or Map to an array so you can apply methods such as `.map()` and `.filter()`, e.g.

```html
<!-- output any value -->
${ toArray( data.something ).map(m => `Value ${ m }`).join(', ') }
```


### `include()` expressions

Templates can include other template files with:

```html
${ include(<filename>) }
```

where `<filename>` is relative to the [template directory](--ROOT--docs/templates/files/#template-file-location) no matter where the template resides. For example:

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
      ${ data.content }
    </main>

  </body>
</html>
```

{{ `src/template/_partials/header.html` }}
```html
<header>
  ${ include('_partials/nav.html') }
  <h1>${ data.title }
</header>
```

{{ `src/template/_partials/nav.html` }}
```html
<nav><a href="${ tacs.root }">Home</a><nav>
```


### In-page navigation

The code `<nav-heading></nav-heading>` can be placed in any content or template file. Each page's nested content headings (`<h2>`{language=html} to `<h6>`{language=html}) are then rendered into the block:

{{ example in-page menu }}
```html
<nav-heading>
  <nav class="contents">
    <ol>
      <li>
        <a href="#heading-2a" class="head-h2">Heading 2a</a>
        <ol>
          <li><a href="#heading-3a" class="head-h3">Heading 3a</a></li>
          <li><a href="#heading-3b" class="head-h3">Heading 3b</a></li>
        </ol>
      </li>
      <li><a href="#heading-2b" class="head-h2">Heading 2b</a><li>
    </ol>
  </nav>
</nav-heading>
```

The **Contents** block at the top of this page shows an example.

The Starter template also provides web component code in `src/js/lib/nav-heading.js` which sets a title and a displayed/hidden state according to a media query.


### Template functions

When expressions require more complex logic, you can [bind functions to the global `tacs` object](--ROOT--docs/configuration/template-functions/#custom-jstacs-functions) in your [configuration file](--ROOT--docs/configuration/file/). For example:

{{ `publican.config.js` }}
```js
// jsTACS functions
tacs.fn = tacs.fn || {};
tacs.fn.hello = (name) => `Hello ${ name }!`;
```

Use this function in any content or template file:

```html
<!-- outputs "Hello World!" -->
<p>${ tacs.fn.hello( 'World' ) }</p>
```


## Template literals in markdown

You can use template literals in markdown. Simple expressions will normally work, e.g.

```js
## ${ data.title }
```

However, expressions inside code blocks will not execute and more complex expressions break the markdown parser when it attempts to translate to HTML.

```html
<!-- this will fail -->
${ data.all.map(i => i.title) }
```

You can work around these issues in several ways.

1. Use double-bracket <code>$&#123;&#123; expressions &#125;&#125;</code>. This denotes a *real* expression irrespective of where it resides in the markdown *(they are stripped from the content before HTML conversion)*.<p>

1. Use HTML snippets in your markdown file, e.g.

    ```md
    A markdown paragraph.

    <p>This ${ "HTML block" } is skipped by the markdown parser.</p>
    ```

1. Simplify expressions using [custom jsTACS functions](--ROOT--docs/configuration/template-functions/).

1. Only use complex expressions in HTML content or template files. These are not processed by the markdown parser.


### Semantic markdown blocks

The elements `<aside>`, `<section>`, and `<article>` cannot be expressed in markdown unless you create a block of HTML content. Unfortunately, this means child markdown is not converted to HTML. For example:

{{ markdown input }}
```md
<aside>
See also:

* [link one](#one)
* [link two](#two)
* [link three](#three)
<aside>
```

renders exactly as shown.

The Starter template provides a [`processContent` hook](--ROOT--docs/configuration/event-functions/#processcontent) which translates <code>$&#123;&#123; tag &#125;&#125;</code> &hellip; <code>$&#123;&#123; /tag &#125;&#125;</code>, where `tag` can be `aside`, `section`, or `article`. Using this instead of `<aside>` in the example above outputs:

{{ HTML output }}
```html
<aside>
<p>See also:</p>

<ul>
<li><a href="#one">link one</a></li>
<li><a href="#two">link two</a></li>
<li><a href="#three">link three</a></li>
<ul>
</aside>
```
