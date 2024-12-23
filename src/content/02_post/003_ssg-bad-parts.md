---
title: Static Site Generators: the bad parts
menu: false
description: In what situations do Static Site Generators (SSGs) make less sense?
author: Craig Buckler
tags: SSG, overview
priority: 1.0
date: 2024-12-03
hero: images/badparts.jpg
heroWidth: 1200
heroHeight: 600
heroAlt: rusty parts
heroCaption: Image courtesy of <a href="https://unsplash.com/@schaffler">Michael Schaffler</a>
---

Static Site Generators are a great option for many sites, but they are developer tools. SSGs are not directly usable by content authors. You can add a CMS, but a SSG takes more time to set-up than deploying a basic WordPress site.

In addition, authors may be frustrated by SSG constraints. A typical WordPress installation may allow them to modify layout, styles, and even functionality. SSGs only permit content a developer specifically implements. *(This is often a good thing!)*

Server-side functionality is also more limited on the deployed site. Features such as user login, form submissions, search, and user comments require more consideration.

Finally, the SSG build process can also take a little time -- especially on larger sites. This may be concerning for clients who expect pages to update instantly.

There are solutions to these problems and [significant SSG benefits](--ROOT--post/ssg-good-parts/). For example, you could to use an SSG to generate static parts of your site -- articles, navigation, etc. -- while allowing *islands* of server-side or client-side runtime rendering.
