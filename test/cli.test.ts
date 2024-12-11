/* tslint:disable: no-shadowed-variable */
import path from 'path';
import { fork } from 'child_process';
import fs from 'fs-extra';

import { assert } from '@onesy/test';
import OnesyNode from '@onesy/node';
import { Try } from '@onesy/utils';

function clearRequireCache() {
  const items = [
    path.resolve('test/example/test/a.ts'),
    path.resolve('test/example/package.json'),
    path.resolve('onesy-test.options.js'),
  ];

  items.forEach(item => Try(() => delete require.cache[item]));
}

group('@onesy/style/cli', () => {
  const clear = async () => {
    clearRequireCache();

    const folders = [
      { path: './test/folders/css' },
      { path: './test/folders/css1' },
      { path: './test/folders/html' },
      { path: './test/folders' },
    ];

    for (const folder of folders) {
      try {
        await fs.emptyDir(path.resolve(folder.path));
        await fs.rmdir(path.resolve(folder.path));
      } catch (error) { }
    }

    const files = [
      { path: 'onesy-style.options.js' },
    ];

    for (const file of files) {
      try {
        await fs.remove(path.resolve(file.path));
      } catch (error) { }
    }
  };

  preAll(clear);

  preEveryGroupTo(async () => {
    await clear();

    const folders = [
      { path: './test/folders' },
      { path: './test/folders/css' },
      { path: './test/folders/css1' },
      { path: './test/folders/html' },
    ];

    for (const folder of folders) {
      try {
        await fs.mkdir(path.resolve(folder.path));
      } catch (error) { }
    }

    const files = [
      { path: './test/folders/html/index.html' },
      { path: './test/folders/html/about.html' },
      { path: './test/folders/html/ad.html' },
      { path: './test/folders/html/ad1.html' },
    ];

    await Promise.all(files.slice(0, 2).map(file => OnesyNode.file.add(path.resolve(file.path), `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>

  <body>

  </body>

</html>`)));

    await Promise.all(files.slice(2, 3).map(file => OnesyNode.file.add(path.resolve(file.path), `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <!-- a insert here -->
  </head>

  <body>

  </body>

</html>`)));

    await Promise.all(files.slice(3, 4).map(file => OnesyNode.file.add(path.resolve(file.path), `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <!-- a1 insert here -->
  </head>

  <body>

  </body>

</html>`)));
  });

  postEveryGroupTo(clear);

  to('cli', done => {
    const childProcess = fork(
      path.resolve('build/cli.js'),
      [
        path.resolve('test/example/test/**/a.ts'),
        `--imports=ts-node/register/transpile-only`,
        `--log=false`
      ]
    );

    childProcess.on('message', async () => {
      const files = {
        aa: await OnesyNode.file.get(path.resolve('./test/folders/css/aa.4ef63a4d8246658d6b6b62967e6fbc0f28ba075913154b2ac26131a58309ae33.css'), false),
        reset: await OnesyNode.file.get(path.resolve('./test/folders/css/reset.040274290038a84d1c41be44406a45ee0c3889e9ecb4d612246b62d1bd785ad6.css'), false),
        index: await OnesyNode.file.get(path.resolve('./test/folders/html/index.html'), false),
      };

      assert(files.aa).eq(`@keyframes a-0{ 0%{   color:white;  }  40%{   color:yellow;  }}.a-0{ width:100px;  max-width:100px;  background:#faa;  margin:0 14px 4px 40px;  margin-left:41px;  float:left;  padding-left:41px;  padding:40px;  position:-webkit-sticky;  position:sticky;  -webkit-transition:all .4s ease;  -o-transition:all .4s ease;  -moz-transition:all .4s ease;  transition:all .4s ease;  -webkit-mask-origin:inherit;  mask-origin:inherit;  -webkit-mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  -webkit-mask-position:40% 74%;  mask-position:40% 74%;  -webkit-animation:a-0 .4s ease;  -moz-animation:a-0 .4s ease;  animation:a-0 .4s ease}.a1-1{ width:100px;  max-width:100px;  background:#faa;  margin:0 14px 4px 40px;  margin-left:41px;  float:left;  padding-left:41px;  padding:40px;  -webkit-transition:all .4s ease;  -o-transition:all .4s ease;  -moz-transition:all .4s ease;  transition:all .4s ease;  -webkit-mask-origin:inherit;  mask-origin:inherit;  -webkit-mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  -webkit-mask-position:40% 74%;  mask-position:40% 74%;  -webkit-animation:a-0 .4s ease;  -moz-animation:a-0 .4s ease;  animation:a-0 .4s ease}.a2-2{ color:yellow}.a2-2 .a19{ color:white}.a3-3 .a1-1 .a2-2.a7-4{ color:yellow}.a2-2 .a19>a{ color:yellow}.a2-2 .a19>a:hover{ color:orange;  margin-left:40px;  float:left;  padding:40px;  padding-left:41px;  -webkit-transition:all .4s ease;  -o-transition:all .4s ease;  -moz-transition:all .4s ease;  transition:all .4s ease;  -webkit-mask-origin:margin-box;  mask-origin:margin-box;  -webkit-mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  -webkit-mask-position:40% 74%;  mask-position:40% 74%}.a3-3 .a1-1>a:hover{ color:orange;  margin-left:40px;  float:left;  padding-left:41px;  padding:40px;  transition:all .4s ease;  mask-origin:margin-box;  mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  mask-position:40% 74%}.a4-5{ background:orange}.a5-6{ background:beige}`);

      assert(files.reset).eq(`*{ margin:0px;  padding:0px;  border:0px;  outline:none;  font-size:100%;  background:transparent;  box-sizing:border-box;  touch-action:manipulation}body{ font-size:0.875rem;  font-family:Roboto,Helvetica,"Helvetica Neue",-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol",sans-serif;  font-weight:normal;  font-style:normal;  position:relative;  overflow-x:hidden;  background-color:#fff}img,embed,object,video{ max-width:100%;  height:auto}a{ text-decoration:none;  cursor:pointer;  background-color:transparent}form{ width:100%}span{ word-wrap:break-word}hr{ height:1px;  background:#ddd;  width:100%;  margin:24px 0;  box-sizing:content-box;  overflow:visible}pre,code,kbd,samp{ font-family:Roboto Mono,monospace}:focus{ outline:none}html{ line-height:1.15;  -webkit-text-size-adjust:100%}main{ display:block}h1{ font-size:2em;  margin:0.67em 0}pre{ font-family:monospace,monospace;  font-size:1em}abbr[title]{ border-bottom:none;  text-decoration:underline dotted;  text-decoration:underline}b,strong{ font-weight:bolder}code,kbd,samp{ font-family:monospace,monospace;  font-size:1em}small{ font-size:80%}sub,sup{ font-size:75%;  line-height:0;  position:relative;  vertical-align:baseline}sub{ bottom:-0.25em}sup{ top:-0.5em}img{ border-style:none}button,input,optgroup,select,textarea{ font-family:inherit;  font-size:100%;  line-height:1.15;  margin:0px}button,input{ overflow:visible}button,select{ text-transform:none}button,[type="button"],[type="reset"],[type="submit"]{ -webkit-appearance:button}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner{ border-style:none;  padding:0px}button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring{ outline:1px dotted ButtonText}fieldset{ padding:0.35em 0.75em 0.625em}legend{ box-sizing:border-box;  color:inherit;  display:table;  max-width:100%;  padding:0px;  white-space:normal}progress{ vertical-align:baseline}textarea{ overflow:auto}[type="checkbox"],[type="radio"]{ box-sizing:border-box;  padding:0px}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{ height:auto}[type="search"]{ -webkit-appearance:textfield;  outline-offset:-2px}[type="search"]::-webkit-search-decoration{ -webkit-appearance:none}::-webkit-file-upload-button{ -webkit-appearance:button;  font:inherit}details{ display:block}summary{ display:list-item}template{ display:none}[hidden]{ display:none}*[contenteditable]{ user-select:text}code span{ white-space:pre-wrap}`);

      assert((files.index as string).replace(/ /g, '')).eq(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel='stylesheet' href='../css/reset.040274290038a84d1c41be44406a45ee0c3889e9ecb4d612246b62d1bd785ad6.css' data-onesy='true' data-reset='true' />
    <link rel='stylesheet' href='../css/aa.4ef63a4d8246658d6b6b62967e6fbc0f28ba075913154b2ac26131a58309ae33.css' data-onesy='true' />
    <script>
      if (!window.onesyStyleNames) window.onesyStyleNames = {};

      window.onesyStyleNames['4ef63a4d8246658d6b6b62967e6fbc0f28ba075913154b2ac26131a58309ae33'] = {
      "classNames": {
            "a": "a-0",
            "a1": "a1-1",
            "a2": "a2-2",
            "a3": "a3-3",
            "a7": "a7-4",
            "a4": "a4-5",
            "a5": "a5-6"
      },
      "classes": {
            "a": "a-0",
            "a1": "a1-1",
            "a2": "a2-2",
            "a3": "a3-3",
            "a7": "a7-4",
            "a4": "a4-5",
            "a5": "a5-6"
      },
      "keyframes": {
            "a": "a-0"
      }
};
    </script>
  </head>

  <body>

  </body>

</html>`.replace(/ /g, ''));

      done();
    });
  });

  to('all the options ', done => {
    const childProcess = fork(
      path.resolve('build/cli.js'),
      [
        `--imports=ts-node/register/transpile-only`,
        `--files=test/example/test/**/a.ts`,
        `--package=a/package.json`,
        `--log=false`
      ]
    );

    childProcess.on('message', async () => {
      const files = {
        aa: await OnesyNode.file.get(path.resolve('./test/folders/css/aa.4ef63a4d8246658d6b6b62967e6fbc0f28ba075913154b2ac26131a58309ae33.css'), false),
        reset: await OnesyNode.file.get(path.resolve('./test/folders/css/reset.040274290038a84d1c41be44406a45ee0c3889e9ecb4d612246b62d1bd785ad6.css'), false),
        index: await OnesyNode.file.get(path.resolve('./test/folders/html/index.html'), false),
      };

      assert(files.aa).eq(`@keyframes a-0{ 0%{   color:white;  }  40%{   color:yellow;  }}.a-0{ width:100px;  max-width:100px;  background:#faa;  margin:0 14px 4px 40px;  margin-left:41px;  float:left;  padding-left:41px;  padding:40px;  position:-webkit-sticky;  position:sticky;  -webkit-transition:all .4s ease;  -o-transition:all .4s ease;  -moz-transition:all .4s ease;  transition:all .4s ease;  -webkit-mask-origin:inherit;  mask-origin:inherit;  -webkit-mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  -webkit-mask-position:40% 74%;  mask-position:40% 74%;  -webkit-animation:a-0 .4s ease;  -moz-animation:a-0 .4s ease;  animation:a-0 .4s ease}.a1-1{ width:100px;  max-width:100px;  background:#faa;  margin:0 14px 4px 40px;  margin-left:41px;  float:left;  padding-left:41px;  padding:40px;  -webkit-transition:all .4s ease;  -o-transition:all .4s ease;  -moz-transition:all .4s ease;  transition:all .4s ease;  -webkit-mask-origin:inherit;  mask-origin:inherit;  -webkit-mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  -webkit-mask-position:40% 74%;  mask-position:40% 74%;  -webkit-animation:a-0 .4s ease;  -moz-animation:a-0 .4s ease;  animation:a-0 .4s ease}.a2-2{ color:yellow}.a2-2 .a19{ color:white}.a3-3 .a1-1 .a2-2.a7-4{ color:yellow}.a2-2 .a19>a{ color:yellow}.a2-2 .a19>a:hover{ color:orange;  margin-left:40px;  float:left;  padding:40px;  padding-left:41px;  -webkit-transition:all .4s ease;  -o-transition:all .4s ease;  -moz-transition:all .4s ease;  transition:all .4s ease;  -webkit-mask-origin:margin-box;  mask-origin:margin-box;  -webkit-mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  -webkit-mask-position:40% 74%;  mask-position:40% 74%}.a3-3 .a1-1>a:hover{ color:orange;  margin-left:40px;  float:left;  padding-left:41px;  padding:40px;  transition:all .4s ease;  mask-origin:margin-box;  mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  mask-position:40% 74%}.a4-5{ background:orange}.a5-6{ background:beige}`);

      assert(files.reset).eq(`*{ margin:0px;  padding:0px;  border:0px;  outline:none;  font-size:100%;  background:transparent;  box-sizing:border-box;  touch-action:manipulation}body{ font-size:0.875rem;  font-family:Roboto,Helvetica,"Helvetica Neue",-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol",sans-serif;  font-weight:normal;  font-style:normal;  position:relative;  overflow-x:hidden;  background-color:#fff}img,embed,object,video{ max-width:100%;  height:auto}a{ text-decoration:none;  cursor:pointer;  background-color:transparent}form{ width:100%}span{ word-wrap:break-word}hr{ height:1px;  background:#ddd;  width:100%;  margin:24px 0;  box-sizing:content-box;  overflow:visible}pre,code,kbd,samp{ font-family:Roboto Mono,monospace}:focus{ outline:none}html{ line-height:1.15;  -webkit-text-size-adjust:100%}main{ display:block}h1{ font-size:2em;  margin:0.67em 0}pre{ font-family:monospace,monospace;  font-size:1em}abbr[title]{ border-bottom:none;  text-decoration:underline dotted;  text-decoration:underline}b,strong{ font-weight:bolder}code,kbd,samp{ font-family:monospace,monospace;  font-size:1em}small{ font-size:80%}sub,sup{ font-size:75%;  line-height:0;  position:relative;  vertical-align:baseline}sub{ bottom:-0.25em}sup{ top:-0.5em}img{ border-style:none}button,input,optgroup,select,textarea{ font-family:inherit;  font-size:100%;  line-height:1.15;  margin:0px}button,input{ overflow:visible}button,select{ text-transform:none}button,[type="button"],[type="reset"],[type="submit"]{ -webkit-appearance:button}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner{ border-style:none;  padding:0px}button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring{ outline:1px dotted ButtonText}fieldset{ padding:0.35em 0.75em 0.625em}legend{ box-sizing:border-box;  color:inherit;  display:table;  max-width:100%;  padding:0px;  white-space:normal}progress{ vertical-align:baseline}textarea{ overflow:auto}[type="checkbox"],[type="radio"]{ box-sizing:border-box;  padding:0px}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{ height:auto}[type="search"]{ -webkit-appearance:textfield;  outline-offset:-2px}[type="search"]::-webkit-search-decoration{ -webkit-appearance:none}::-webkit-file-upload-button{ -webkit-appearance:button;  font:inherit}details{ display:block}summary{ display:list-item}template{ display:none}[hidden]{ display:none}*[contenteditable]{ user-select:text}code span{ white-space:pre-wrap}`);

      assert((files.index as string).replace(/ /g, '')).eq(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel='stylesheet' href='../css/reset.040274290038a84d1c41be44406a45ee0c3889e9ecb4d612246b62d1bd785ad6.css' data-onesy='true' data-reset='true' />
    <link rel='stylesheet' href='../css/aa.4ef63a4d8246658d6b6b62967e6fbc0f28ba075913154b2ac26131a58309ae33.css' data-onesy='true' />
    <script>
      if (!window.onesyStyleNames) window.onesyStyleNames = {};

      window.onesyStyleNames['4ef63a4d8246658d6b6b62967e6fbc0f28ba075913154b2ac26131a58309ae33'] = {
      "classNames": {
            "a": "a-0",
            "a1": "a1-1",
            "a2": "a2-2",
            "a3": "a3-3",
            "a7": "a7-4",
            "a4": "a4-5",
            "a5": "a5-6"
      },
      "classes": {
            "a": "a-0",
            "a1": "a1-1",
            "a2": "a2-2",
            "a3": "a3-3",
            "a7": "a7-4",
            "a4": "a4-5",
            "a5": "a5-6"
      },
      "keyframes": {
            "a": "a-0"
      }
};
    </script>
  </head>

  <body>

  </body>

</html>`.replace(/ /g, ''));

      done();
    });
  });

  to('cli with onesy-style.options.js', async () => {
    const method = () => new Promise(async resolve => {
      // Create onesy-style.options.js
      await OnesyNode.file.add(
        path.join(process.cwd(), 'onesy-style.options.js'),
        `
        module.exports = {
          imports: [
            'ts-node/register/transpile-only'
          ],
          files: 'test/example/test/**/a.ts',
          log: false
        };
      `
      );

      const childProcess = fork(
        path.resolve('build/cli.js'),
        [
          `--package=a/package.json`
        ]
      );

      childProcess.on('message', async () => {
        const files = {
          aa: await OnesyNode.file.get(path.resolve('./test/folders/css/aa.4ef63a4d8246658d6b6b62967e6fbc0f28ba075913154b2ac26131a58309ae33.css'), false),
          reset: await OnesyNode.file.get(path.resolve('./test/folders/css/reset.040274290038a84d1c41be44406a45ee0c3889e9ecb4d612246b62d1bd785ad6.css'), false),
          index: await OnesyNode.file.get(path.resolve('./test/folders/html/index.html'), false),
        };

        assert(files.aa).eq(`@keyframes a-0{ 0%{   color:white;  }  40%{   color:yellow;  }}.a-0{ width:100px;  max-width:100px;  background:#faa;  margin:0 14px 4px 40px;  margin-left:41px;  float:left;  padding-left:41px;  padding:40px;  position:-webkit-sticky;  position:sticky;  -webkit-transition:all .4s ease;  -o-transition:all .4s ease;  -moz-transition:all .4s ease;  transition:all .4s ease;  -webkit-mask-origin:inherit;  mask-origin:inherit;  -webkit-mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  -webkit-mask-position:40% 74%;  mask-position:40% 74%;  -webkit-animation:a-0 .4s ease;  -moz-animation:a-0 .4s ease;  animation:a-0 .4s ease}.a1-1{ width:100px;  max-width:100px;  background:#faa;  margin:0 14px 4px 40px;  margin-left:41px;  float:left;  padding-left:41px;  padding:40px;  -webkit-transition:all .4s ease;  -o-transition:all .4s ease;  -moz-transition:all .4s ease;  transition:all .4s ease;  -webkit-mask-origin:inherit;  mask-origin:inherit;  -webkit-mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  -webkit-mask-position:40% 74%;  mask-position:40% 74%;  -webkit-animation:a-0 .4s ease;  -moz-animation:a-0 .4s ease;  animation:a-0 .4s ease}.a2-2{ color:yellow}.a2-2 .a19{ color:white}.a3-3 .a1-1 .a2-2.a7-4{ color:yellow}.a2-2 .a19>a{ color:yellow}.a2-2 .a19>a:hover{ color:orange;  margin-left:40px;  float:left;  padding:40px;  padding-left:41px;  -webkit-transition:all .4s ease;  -o-transition:all .4s ease;  -moz-transition:all .4s ease;  transition:all .4s ease;  -webkit-mask-origin:margin-box;  mask-origin:margin-box;  -webkit-mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  -webkit-mask-position:40% 74%;  mask-position:40% 74%}.a3-3 .a1-1>a:hover{ color:orange;  margin-left:40px;  float:left;  padding-left:41px;  padding:40px;  transition:all .4s ease;  mask-origin:margin-box;  mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  mask-position:40% 74%}.a4-5{ background:orange}.a5-6{ background:beige}`);

        assert(files.reset).eq(`*{ margin:0px;  padding:0px;  border:0px;  outline:none;  font-size:100%;  background:transparent;  box-sizing:border-box;  touch-action:manipulation}body{ font-size:0.875rem;  font-family:Roboto,Helvetica,"Helvetica Neue",-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol",sans-serif;  font-weight:normal;  font-style:normal;  position:relative;  overflow-x:hidden;  background-color:#fff}img,embed,object,video{ max-width:100%;  height:auto}a{ text-decoration:none;  cursor:pointer;  background-color:transparent}form{ width:100%}span{ word-wrap:break-word}hr{ height:1px;  background:#ddd;  width:100%;  margin:24px 0;  box-sizing:content-box;  overflow:visible}pre,code,kbd,samp{ font-family:Roboto Mono,monospace}:focus{ outline:none}html{ line-height:1.15;  -webkit-text-size-adjust:100%}main{ display:block}h1{ font-size:2em;  margin:0.67em 0}pre{ font-family:monospace,monospace;  font-size:1em}abbr[title]{ border-bottom:none;  text-decoration:underline dotted;  text-decoration:underline}b,strong{ font-weight:bolder}code,kbd,samp{ font-family:monospace,monospace;  font-size:1em}small{ font-size:80%}sub,sup{ font-size:75%;  line-height:0;  position:relative;  vertical-align:baseline}sub{ bottom:-0.25em}sup{ top:-0.5em}img{ border-style:none}button,input,optgroup,select,textarea{ font-family:inherit;  font-size:100%;  line-height:1.15;  margin:0px}button,input{ overflow:visible}button,select{ text-transform:none}button,[type="button"],[type="reset"],[type="submit"]{ -webkit-appearance:button}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner{ border-style:none;  padding:0px}button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring{ outline:1px dotted ButtonText}fieldset{ padding:0.35em 0.75em 0.625em}legend{ box-sizing:border-box;  color:inherit;  display:table;  max-width:100%;  padding:0px;  white-space:normal}progress{ vertical-align:baseline}textarea{ overflow:auto}[type="checkbox"],[type="radio"]{ box-sizing:border-box;  padding:0px}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{ height:auto}[type="search"]{ -webkit-appearance:textfield;  outline-offset:-2px}[type="search"]::-webkit-search-decoration{ -webkit-appearance:none}::-webkit-file-upload-button{ -webkit-appearance:button;  font:inherit}details{ display:block}summary{ display:list-item}template{ display:none}[hidden]{ display:none}*[contenteditable]{ user-select:text}code span{ white-space:pre-wrap}`);

        assert((files.index as string).replace(/ /g, '')).eq(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel='stylesheet' href='../css/reset.040274290038a84d1c41be44406a45ee0c3889e9ecb4d612246b62d1bd785ad6.css' data-onesy='true' data-reset='true' />
    <link rel='stylesheet' href='../css/aa.4ef63a4d8246658d6b6b62967e6fbc0f28ba075913154b2ac26131a58309ae33.css' data-onesy='true' />
    <script>
      if (!window.onesyStyleNames) window.onesyStyleNames = {};

      window.onesyStyleNames['4ef63a4d8246658d6b6b62967e6fbc0f28ba075913154b2ac26131a58309ae33'] = {
      "classNames": {
            "a": "a-0",
            "a1": "a1-1",
            "a2": "a2-2",
            "a3": "a3-3",
            "a7": "a7-4",
            "a4": "a4-5",
            "a5": "a5-6"
      },
      "classes": {
            "a": "a-0",
            "a1": "a1-1",
            "a2": "a2-2",
            "a3": "a3-3",
            "a7": "a7-4",
            "a4": "a4-5",
            "a5": "a5-6"
      },
      "keyframes": {
            "a": "a-0"
      }
};
    </script>
  </head>

  <body>

  </body>

</html>`.replace(/ /g, ''));

        // Remove example/package.json
        await OnesyNode.file.remove(path.join(process.cwd(), 'onesy-style.options.js'));

        resolve(true);
      });
    });

    await method();
  });

});
