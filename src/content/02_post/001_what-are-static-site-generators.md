---
title: What are Static Site Generators (SSGs)
menu: false
description: An overview of what Static Site Generators do, how they work, and how they benefit developers and users.
author: Craig Buckler
tags: SSG, HTML, overview
priority: 1.0
date: 2024-12-05
hero: images/question.jpg
heroWidth: 1200
heroHeight: 600
heroAlt: question mark
heroCaption: Image courtesy of <a href="https://unsplash.com/@emilymorter">Emily Morter</a>
---

A Static Site Generators (SSG) is a tool used to generate a static site: one that's primarily static files that can be hosted on any web server. The term *static* has nothing to do with the content or design -- you can still have new posts with animations and effects. It just means you're creating files when there's a change.


## Web development complexity

The first website you built probably contained a selection of pages created in HTML files, possibly served from the file system rather than a web server. Difficulties arose as your site became larger and more complex. For example:

* Adding a new page required you to update the navigation on all other pages.
* References to assets such as images, CSS, and JavaScript could be different as your folder structures changed.

Hand-coded sites are difficult to maintain. You may have considered options such as server-side includes or PHP, but most developers switch to a Content Management System (CMS).


## What is a Content Management System?

A CMS provides administrative control panels. WordPress is the most well known and used by almost half of all websites. CMS authors write content which is typically stored in a database. When a visitor requests a page URL, the CMS retrieves the appropriate content, renders it within a template, and returns HTML to the browser.

This *usually* occurs quickly, but there are downsides:

1. The server does considerable work: scaling and performance can be an issue.
1. There are multiple points of failure. A software update or database downtime breaks the site.
1. It can be difficult to secure the CMS. Unauthorized users could access and change your site.


## What is a Static Site Generator?

An SSG is a compromise between using a hand-coded static site and a full CMS, while retaining the benefits of both. It extracts content from any sources -- files, CMS APIs, databases, etc. -- then renders them in a template to create HTML files. This build process can occur anywhere but the resulting files are copied to a live web server.


### User benefits

Users won't know they're viewing a static site but they may notice:

1. Better performance. The site will load faster because it's pre-rendered and there's no rendering process.
1. Less downtime. A static site is less likely to fail because there are fewer dependencies.


### Site owner benefits

Site owners and developers also gain from SSGs.

1. Fewer constraints. You're not tied to a specific CMS and can implement whatever functionality you require.
1. Improved resilience. It's easier to back up files and, if you're using a CMS, it need not be accessible from the internet.
1. Better security. There is little software to *hack*. The worst someone could do is access your web server and change content -- but you could re-render it within minutes.
1. Lower costs. Static sites are cheaper to host and scale.


### The downsides

SSGs are developer tools -- they're not directly usable by content authors. They take more time to set-up than deploying a basic WordPress site.

Server-side functionality is more limited. Features such as user login, form submissions, search, and commenting require more consideration.

The SSG build process can also take a little time. This may be concerning for clients who expect pages to update instantly.

Fortunately, there are solutions to all these problems. There are also ways to use an SSG to generate static parts of your site -- articles, navigation, etc. -- while allowing **islands** of server-side or client-side runtime rendering.
