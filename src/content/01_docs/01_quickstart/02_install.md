---
title: Starter template installation
menu: Installation
description: How to download and use the Publican starter template on your own development system.
date: 2024-12-10
priority: 0.9
tags: install
---

This starter project and Publican itself can be used on Windows Powershell, Windows CMD, Windows WSL, Mac OS, Linux, or any system where [Node.js 20+](https://nodejs.org/) and npm are available.

This project's files are available at [github.com/craigbuckler/publican-starter](https://github.com/craigbuckler/publican-starter). You can clone, fork, or [download](https://github.com/craigbuckler/publican-starter/archive/refs/heads/main.zip) the project to a directory on your development machine.

This documentation presumes the project directory is `publican-starter`, your terminal is open, and you have navigated to the root:

```
cd publican-starter
```

Install dependencies with:

```
npm i
```

Publican and esbuild are declared as npm dependencies rather than development dependencies given the starter project is not required once the site has been generated. This can be changed in your project if necessary.

Alternatively, you can [create your own Publican project](--ROOT--docs/quickstart/own-project/).
