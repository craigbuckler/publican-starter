---
title: Custom string replacement
menu: String replacement
description: How to modify built files using custom string replacement.
date: 2024-12-24
priority: 0.9
tags: configuration, string replacement
---

You can search and replace strings in built files using the `.config.replace` [Map](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map). (Note that [pass-through files](--ROOT--docs/configuration/pass-through-files/) are ignored.)

```js
publican.config.replace.set(<search>, <replace>);
```

where:

* `<search>` is a search string or regular expression
* `<replace>` is the replacement string

The following example replaces all rendered file references of `−−ROOT−−` with the server's [root directory](--ROOT--docs/configuration/options/#root-server-path) (normally `/`):

```js
publican.config.replace.set('−−ROOT−−', publican.config.root);
```

This allows you to create links in markdown which automatically change when the root directory is changed, e.g.

```md
* [Home](−−ROOT−−)
* [About us](−−ROOT−−about/)
* [Contact us](−−ROOT−−about/contact/)
```

The following example uses a regular expression to convert `YYYY-MM-DD` dates to `DD-MM-YYYY` format:

```js
publican.config.replace.set(/(\d{4})-(\d{2})-(\d{2})/g, '$3-$2-$1');
```


## Replacement examples

The Starter template defines the following replacements:

```js
// replacement strings
publican.config.replace = new Map([
  [ '−−ROOT−−', publican.config.root ],
  [ '−−COPYRIGHT−−', `&copy;<time datetime="${ tacs.fn.format.dateYear() }">${ tacs.fn.format.dateYear() }</time>` ],
  [ ' style="text−align:right"', ' class="right"' ],
  [ ' style="text−align:center"', ' class="center"' ]
]);
```

This replaces:

* `−−ROOT−−` with the server's [root directory](--ROOT--docs/configuration/options/#root-server-path): `--ROOT--`
* `−−COPYRIGHT−−` with a copyright symbol and the current year: `--COPYRIGHT--`
* replaces the `style` attribute of right-aligned table cells with ` class="right"`, and
* replaces the `style` attribute of center-aligned table cells with ` class="center"`.

{aside}
## Replacement exceptions

This page uses a Unicode character that looks like a `-` minus to ensure explicit names like `−−ROOT−−` are not replaced by Publican!
{/aside}
