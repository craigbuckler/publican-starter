---
title: What are Static Site Generators (SSGs)
menu: false
pinned: 1
description: An overview of what Static Site Generators do, how they work, and how they benefit developers and users.
author: Craig Buckler
tags: SSG, HTML, overview
priority: 1.0
date: 2024-12-01
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

SSGs have [benefits for users and developers](--ROOT--post/ssg-good-parts/), but you may encounter [downsides](--ROOT--post/ssg-bad-parts/).
