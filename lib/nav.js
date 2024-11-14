// navigation functions
import { tacs } from 'publican';

// nested main menu navigation
export function menu( currentPage ) {

  return '<ul>' + recurseNav( tacs.nav ) + '</ul>';

  function recurseNav(nav) {

    return nav.map(n => {

      // format title
      const data = n.data;

      if (data.menu === false) return '';

      let ret = data.menu || data.title;
      if (!data.link) {
        ret = ret.slice(0, 1).toUpperCase() + ret.slice(1).toLowerCase();
      }
      else {
        if (currentPage === data.link) ret = `<strong>${ ret }</strong>`;
        else ret = `<a href="${ data.link }">${ ret }</a>`;
      }

      // get children
      const children = recurseNav( n.children ).trim();

      if (children) {
        ret = `\n<details name="menu">\n<summary>${ ret }</summary>\n<ul>\n${ children }</ul>\n</details>\n`;
      }

      return `<li>${ ret }</li>\n`;

    }).join('\n');

  }

}


// breadcrumb navigation
export function breadcrumb( currentPage ) {

  const crumb = [];
  recurseNav( tacs.nav );

  const ret = crumb
    .map(n => `<li>${ n.link ? `<a href="${ n.link }">` : ''}${ n.menu || n.title }${ n.link ? '</a>' : ''}</li>`)
    .join('\n');

  return ret ? `<nav class="breadcrumb">\n<ol>\n${ ret }</ol>\n</nav>` : '';

  function recurseNav(nav) {

    let found;

    nav.forEach(n => {

      found = found || currentPage === n.data.link;

      if (!found) {
        found = recurseNav(n.children);
        if (found) crumb.unshift(n.data);
      }

    });

    return found;

  }

};


// site tag list
export function tagList(classPrefix = 'taglist', classMin = 1, classMax = 5) {

  if (!tacs?.tagList?.length) return;

  const
    minCount = tacs.tagList.at(-1).count,
    maxCount = tacs.tagList.at(0).count,
    rangeCount = maxCount - minCount;

  let ret = tacs.tagList.map(i => {

    const classNum = Math.round(((i.count - minCount) / rangeCount) * (classMax - classMin)) + classMin;
    return `<li class="${ classPrefix + classNum }"><a href="${ i.link }">${ i.tag } <sup>(${ i.count })</sup></a></li>`;

  }).join('\n');

  if (ret) ret = `<nav class="${ classPrefix }"><ul>\n${ ret }\n</ul></nav>`;

  return ret;

};
