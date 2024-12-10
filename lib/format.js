// formatting functions
import { tacs } from 'publican';

// default language
function lang() {
  return tacs?.config?.language || 'en-US';
}


// create a date
function cDate(d) {
  d = new Date(d);
  return d instanceof Date && !isNaN(d) ? d : new Date();
}


// friendly number format
export function number(num) {

  return new Intl.NumberFormat(lang(), {})
    .format( num );

}

// number rounding (to 1 under 1000, 10 under 10,000, 100 under 100,000 etc.)
export function numberRound(num) {

  const round = Math.pow(10, Math.max(0, String( parseInt(num) ).length - 3));
  return number( Math.ceil(num / round) * round );

}

// friendly date format
export function dateHuman(d) {

  return new Intl.DateTimeFormat(lang(), { dateStyle: 'long' })
    .format( cDate(d) );

}

// UTC date format, e.g. "Wed, 1 Jan 2025 07:00:00 GMT"
export function dateUTC( d ) {
  return cDate(d).toUTCString();
}

// ISO date format, e.g. "2025-01-01T07:00:00:000Z"
export function dateISO( d ) {
  return cDate(d).toISOString();
}

// date year, e.g. "2025"
export function dateYear( d ) {
  return cDate(d).getUTCFullYear();
}

// RSS feed
export function rss( str, domain ) {

  domain = domain || tacs?.config?.domain || '';

  const
    absRegEx = new RegExp(`(\\s(src|href)="*)${ tacs.root }`, 'gi'),
    replace = `$1${ domain }${ tacs.root}`;

  return str.trim()
    .replaceAll(/\s*tabindex="*.*?"*>/gi, '>')              // remove tabindexes
    .replaceAll(/\s*<a.*?class="*headlink"*>#<\/a>/gi, '')  // remove headlinks
    .replaceAll(absRegEx, replace);                         // use absolute URLs

}
