// Publican configuration
import { Publican, tacs } from 'publican';
import * as fnNav from './lib/nav.js';
import * as fnFormat from './lib/format.js';
import esbuild from 'esbuild';

const
  publican = new Publican(),
  isDev = (process.env.NODE_ENV === 'development');

// exports for other modules
export { publican, tacs };

console.log(`Building ${ isDev ? 'development' : 'production' } site`);

// Publican defaults
publican.config.dir.content = process.env.CONTENT_DIR;
publican.config.dir.template = process.env.TEMPLATE_DIR;
publican.config.dir.build = process.env.BUILD_DIR;
publican.config.root = process.env.BUILD_ROOT;

// default HTML templates
publican.config.defaultHTMLTemplate = process.env.TEMPLATE_DEFAULT;
publican.config.dirPages.template = process.env.TEMPLATE_LIST;
publican.config.tagPages.template = process.env.TEMPLATE_TAG;

// pass-through files
publican.config.passThrough.add({ from: './src/media/favicons', to: './' });

// post-render hook: add generator <meta>
publican.config.processPostRender.add(
  ( data, output ) => output.replace('</head>', '<meta name="generator" content="Publican" />\n</head>')
);

// jsTACs rendering defaults
tacs.config = tacs.config || {};
tacs.config.isDev = isDev;
tacs.config.language = process.env.SITE_LANGUAGE;
tacs.config.domain = process.env.SITE_DOMAIN;
tacs.config.title = process.env.SITE_TITLE;
tacs.config.description = process.env.SITE_DESCRIPTION;
tacs.config.author = process.env.SITE_AUTHOR;
tacs.config.wordCountShow = parseInt(process.env.SITE_WORDCOUNTSHOW) || 0;
tacs.config.themeColor = process.env.SITE_THEMECOLOR || '#000';
tacs.config.buildDate = new Date();

// jsTACS functions
tacs.fn = tacs.fn || {};
tacs.fn.nav = fnNav;
tacs.fn.format = fnFormat;

// utils
publican.config.minify = !isDev;  // minify in production mode
publican.config.watch = isDev;    // watch in development mode
publican.config.logLevel = 2;     // output verbosity

// clear build directory
await publican.clean();

// build site
await publican.build();


// ________________________________________________________
// esbuild configuration for CSS, JavaScript, and local server

const
  target = (process.env.BROWSER_TARGET || '').split(','),
  logLevel = isDev ? 'info' : 'error',
  minify = !isDev,
  sourcemap = isDev && 'linked';

// bundle CSS
const buildCSS = await esbuild.context({

  entryPoints: [ process.env.CSS_DIR ],
  bundle: true,
  target,
  external: ['/media/*'],
  loader: {
    '.woff2': 'file',
    '.png': 'file',
    '.jpg': 'file',
    '.svg': 'dataurl'
  },
  logLevel,
  minify,
  sourcemap,
  outdir: `${ process.env.BUILD_DIR }css/`

});

// bundle JS
const buildJS = await esbuild.context({

  entryPoints: [ process.env.JS_DIR ],
  format: 'esm',
  bundle: true,
  target,
  external: [],
  define: {
    __ISDEV__: JSON.stringify(isDev)
  },
  drop: isDev ? [] : ['debugger', 'console'],
  logLevel,
  minify,
  sourcemap,
  outdir: `${ process.env.BUILD_DIR }js/`

});

if (publican.config.watch) {

  // watch for file changes
  await buildCSS.watch();
  await buildJS.watch();

  // development server
  await buildCSS.serve({
    servedir: process.env.BUILD_DIR,
    port: parseInt(process.env.SERVE_PORT) || 8000
  });

}
else {

  // single build
  await buildCSS.rebuild();
  buildCSS.dispose();

  await buildJS.rebuild();
  buildJS.dispose();

}
