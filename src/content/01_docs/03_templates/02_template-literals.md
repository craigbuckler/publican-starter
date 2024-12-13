---
title: Template literals
menu: Template literals
description: How to use template literals
date: 2024-12-13
priority: 0.9
tags: content, front matter, template literals
---




## Template literals in markdown

You can use template literals in markdown. Simple expressions will normally work, e.g.

```js
## ${ data.title }
```

but more complex expressions can break the markdown parser:

```js
This will cause Publican to fail:

${ data.all.map(i => i.title) }
```

and expressions inside code blocks will not execute.

You can work around these issues in several ways.

1. Use double-bracket <code>$&#123;&#123; expressions &#125;&#125;</code>. This denotes a *real* expression irrespective of where it resides in the markdown *(they are stripped from the content before HTML conversion)*.<p>

1. Use HTML snippets in your markdown file, e.g.

    ```md
    A markdown paragraph.

    <p>This ${ "HTML block" } is skipped by the markdown parser.</p>
    ```

1. Simplify expressions using [custom jsTACS functions](--ROOT--docs/configuration/custom-options/#custom-jstacs-functions).

1. Only use complex expressions in HTML files -- either content or templates. These are not processed by the markdown parser.
