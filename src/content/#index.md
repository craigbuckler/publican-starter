---
title: Publican starter template
menu: false
description: ${ `${ data.title }. This is a starter site template using Publican, a Node.js static site generator.` }
template: simple.html
priority: 1.0
---

This is a [starter site template](https://github.com/craigbuckler/publican-starter) using:

* [Publican](https://www.npmjs.com/package/publican), a Node.js HTML-first [static site generator](--ROOT--post/what-are-static-site-generators/).
* [esbuild](https://esbuild.github.io/), a build system for CSS, JavaScript, and other assets (optional) with an optional development server and live reload.

The repository provides files you can adapt for your own static site projects.


## Code block

Some inline `${ expression }`{language=js} JavaScript code.

Code block with syntax highlighting&hellip;

[[ `src/js/dev/css-reload.js`{language=bash} ]]

```js
if (__ISDEV__) {

  // esbuild server-sent event
  new EventSource('/esbuild').addEventListener('change', e => {

    const { added, removed, updated } = JSON.parse(e.data);

    // reload when CSS files are added or removed
    if (added.length || removed.length) {
      location.reload();
      return;
    }

    // replace updated CSS files
    Array.from(document.getElementsByTagName('link')).forEach(link => {

      const url = new URL(link.href), path = url.pathname;

      if (updated.includes(path) && url.host === location.host) {

        const css = link.cloneNode();
        css.onload = () => link.remove();
        css.href = `${ path }?${ +new Date() }`;
        link.after(css);

      }

    });

  });

}
```
