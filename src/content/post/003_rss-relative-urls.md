---
title: RSS feeds and relative URLs
menu: false
description: Most static site generators use relative links in page content, but can these be used in RSS feeds?
author: Craig Buckler
tags: SSG, HTML, RSS
priority: 1.0
date: 2024-12-01
hero: images/newspapers.jpg
heroWidth: 1200
heroHeight: 600
heroAlt: newspapers
heroCaption: Image courtesy of <a href="https://unsplash.com/@timmossholder">Tim Mossholder</a>
---

[Publican](https://www.npmjs.com/package/publican), most other static site generators, and this [starter template](--ROOT--) use relative URLs for links and assets such as images. For example:

```html
<img src="/images/banner.jpg" alt="example">
<p><a href="/about/">About this site</a></p>
```

rather than absolute references:

```html
<img src="https://example.com/images/banner.jpg" alt="example">
<p><a href="https://example.com/about/">About this site</a></p>
```

Relative URLs make a rendered site portable. It should work anywhere irrespective of the domain, security certificates, server configuration, etc.


## URLs in sitemaps

Unfortunately, it's not possible to use relative URLs everywhere. Sitemap and `robots.txt` files require fully-qualified absolute URLs containing the domain name.

[[ example `robots.txt`{language=bash} ]]

```txt
User-agent: *
Sitemap: https://example.com/sitemap.xml
```

[[ example `sitemap.txt`{language=bash} ]]

```txt
https://example.com/
https://example.com/about/
```

[[ example `sitemap.xml`{language=bash} ]]

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
  <loc>https://example.com/</loc>
  <lastmod>Mon, 02 Dec 2024 11:30:00 GMT</lastmod>
  <changefreq>monthly</changefreq>
  <priority>1</priority>
</url>
<url>
  <loc>https://example.com/about/</loc>
  <lastmod>Mon, 02 Dec 2024 11:30:00 GMT</lastmod>
  <changefreq>monthly</changefreq>
  <priority>1</priority>
</url>
```

The files above can be generated with absolute URLs and viewed on a development site. They do not affect rendering and are only accessed by search engines reading content from your production site.


## URLs in RSS feeds

RSS specifications do not mention relative links. It's possible to set an `xml:base`{language=xml} attribute on the `<content>`{language=xml} element, but not all RSS readers will parse it:

```xml
<content type="html" xml:base="https://example.com">
  <p><a href="/post/">internal link</a></p>
</content>
```

In addition, the [W3C Feed Validation Service](https://validator.w3.org/feed/) can report that content *should not contain relative URL references*.

For this reason, a simple `rss()`{language=js} function is provided in `lib/format.js`{language=txt} to replace relative with absolute URL references using a regular expression.
