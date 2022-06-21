/* tslint:disable: no-shadowed-variable */
import path from 'path';
import fs from 'fs-extra';

import { assert } from '@amaui/test';
import AmauiNode from '@amaui/node';

import * as AmauiStyle from '../src';
import css from '../src/css';
import { TValue } from '../src';

group('@amaui/style/css', () => {
  const clear = async () => {
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
  };

  preAll(clear);

  preEveryGroupTo(async () => {
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

    await Promise.all(files.slice(0, 2).map(file => AmauiNode.file.add(path.resolve(file.path), `<!DOCTYPE html>
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

    await Promise.all(files.slice(2, 3).map(file => AmauiNode.file.add(path.resolve(file.path), `<!DOCTYPE html>
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

    await Promise.all(files.slice(3, 4).map(file => AmauiNode.file.add(path.resolve(file.path), `<!DOCTYPE html>
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

  to('css', async () => {
    const amauiStyle = new AmauiStyle.AmauiStyle();

    // Plugins
    amauiStyle.plugins.add = [
      AmauiStyle.unit,
      AmauiStyle.sort,
      AmauiStyle.prefix,
      AmauiStyle.makeClassName,
      AmauiStyle.rtl,
    ];

    const a: TValue = {
      a: {
        width: 100,

        'max-width': 100,

        // Simple
        background: '#faa',

        margin: '0 14px 4px 40px',

        // rtl
        marginLeft: 41,
        float: 'left',

        // sort
        paddingLeft: 41,
        padding: 40,

        // prefixes
        position: 'sticky',
        transition: 'all .4s ease',
        maskOrigin: 'inherit',
        maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
        maskPosition: '40% 74%',

        // animation
        animation: '$a .4s ease',
      },
    };

    const style = css(a, {
      amaui_style: { value: amauiStyle },
      css: {
        file: {
          name: 'style',
          hash: false
        },
        folders: [
          { url: './test/folders/css' },
          { url: './test/folders/css1' },
        ],
      },
      log: false
    });

    await style.make();

    const files = {
      css: await AmauiNode.file.get(path.resolve('./test/folders/css/style.css'), false),
      css1: await AmauiNode.file.get(path.resolve('./test/folders/css1/style.css'), false),
    };

    assert(files.css).eq(files.css1);

    assert(files.css1).eq(`.a-0{ background:#faa;  float:left;  margin:0 14px 4px 40px;  margin-left:41px;  mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  mask-origin:inherit;  mask-position:40% 74%;  max-width:100px;  padding:40px;  padding-left:41px;  position:sticky;  transition:all .4s ease;  width:100px}`);
  });

  group('options', () => {

    group('mode', () => {

      to('regular', async () => {
        const amauiStyle = new AmauiStyle.AmauiStyle();

        // Plugins
        amauiStyle.plugins.add = [
          AmauiStyle.unit,
          AmauiStyle.sort,
          AmauiStyle.prefix,
          AmauiStyle.makeClassName,
          AmauiStyle.rtl,
        ];

        const a: TValue = {
          a: {
            width: 100,

            'max-width': 100,

            // Simple
            background: '#faa',

            margin: '0 14px 4px 40px',

            // rtl
            marginLeft: 41,
            float: 'left',

            // sort
            paddingLeft: 41,
            padding: 40,

            // prefixes
            position: 'sticky',
            transition: 'all .4s ease',
            maskOrigin: 'inherit',
            maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
            maskPosition: '40% 74%',

            // animation
            animation: '$a .4s ease',
          },
        };

        const style = css(a, {
          amaui_style: { value: amauiStyle },
          mode: 'regular',
          css: {
            file: {
              name: 'style',
              hash: false
            },
            folders: [
              { url: './test/folders/css' },
              { url: './test/folders/css1' },
            ],
          },
          log: false
        });

        await style.make();

        const files = {
          css: await AmauiNode.file.get(path.resolve('./test/folders/css/style.css'), false),
        };

        assert(files.css).eq(`.a-0{ background:#faa;  float:left;  margin:0 14px 4px 40px;  margin-left:41px;  mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  mask-origin:inherit;  mask-position:40% 74%;  max-width:100px;  padding:40px;  padding-left:41px;  position:sticky;  transition:all .4s ease;  width:100px}`);
      });

      to('atomic', async () => {
        const amauiStyle = new AmauiStyle.AmauiStyle();

        // Plugins
        amauiStyle.plugins.add = [
          AmauiStyle.unit,
          AmauiStyle.sort,
          AmauiStyle.prefix,
          AmauiStyle.makeClassName,
          AmauiStyle.rtl,
        ];

        const a: TValue = {
          a: {
            width: 100,

            'max-width': 100,

            // Simple
            background: '#faa',

            margin: '0 14px 4px 40px',

            // rtl
            marginLeft: 41,
            float: 'left',

            // sort
            paddingLeft: 41,
            padding: 40,

            // prefixes
            position: 'sticky',
            transition: 'all .4s ease',
            maskOrigin: 'inherit',
            maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
            maskPosition: '40% 74%',

            // animation
            animation: '$a .4s ease',
          },
        };

        const style = css(a, {
          amaui_style: { value: amauiStyle },
          mode: 'atomic',
          css: {
            file: {
              name: 'style',
              hash: false
            },
            folders: [
              { url: './test/folders/css' },
              { url: './test/folders/css1' },
            ],
          },
          log: false
        });

        await style.make();

        const files = {
          css: await AmauiNode.file.get(path.resolve('./test/folders/css/style.css'), false),
        };

        assert(files.css).eq(`.aa-1{ width:100px}.ab-2{ max-width:100px}.ac-3{ background:#faa}.ad-4{ margin:0 14px 4px 40px}.ae-5{ margin-left:41px}.af-6{ float:left}.ag-7{ padding-left:41px}.ah-8{ padding:40px}.ai-9{ position:sticky}.aj-10{ transition:all .4s ease}.ak-11{ mask-origin:inherit}.al-12{ mask-image:linear-gradient(rgba(0,0,0,1.0),transparent)}.am-13{ mask-position:40% 74%}`);
      });

    });

    to('pure', async () => {
      const amauiStyle = new AmauiStyle.AmauiStyle();

      // Plugins
      amauiStyle.plugins.add = [
        AmauiStyle.unit,
        AmauiStyle.sort,
        AmauiStyle.prefix,
        AmauiStyle.makeClassName,
        AmauiStyle.rtl,
      ];

      const a: TValue = {
        a: {
          width: 100,

          'max-width': 100,

          // Simple
          background: '#faa',

          margin: '0 14px 4px 40px',

          // rtl
          marginLeft: 41,
          float: 'left',

          // sort
          paddingLeft: 41,
          padding: 40,

          // prefixes
          position: 'sticky',
          transition: 'all .4s ease',
          maskOrigin: 'inherit',
          maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
          maskPosition: '40% 74%',

          // animation
          animation: '$a .4s ease',
        },
      };

      const style = css(a, {
        amaui_style: { value: amauiStyle },
        pure: true,
        css: {
          file: {
            name: 'style',
            hash: false
          },
          folders: [
            { url: './test/folders/css' },
          ],
        },
        log: false
      });

      await style.make();

      const files = {
        css: await AmauiNode.file.get(path.resolve('./test/folders/css/style.css'), false),
      };

      assert(files.css).eq(`a{ background:#faa;  float:left;  margin:0 14px 4px 40px;  margin-left:41px;  mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  mask-origin:inherit;  mask-position:40% 74%;  max-width:100px;  padding:40px;  padding-left:41px;  position:sticky;  transition:all .4s ease;  width:100px}`);
    });

    to('reset', async () => {
      const amauiStyle = new AmauiStyle.AmauiStyle();

      // Plugins
      amauiStyle.plugins.add = [
        AmauiStyle.unit,
        AmauiStyle.sort,
        AmauiStyle.prefix,
        AmauiStyle.makeClassName,
        AmauiStyle.rtl,
      ];

      const a: TValue = {
        a: {
          width: 100,

          'max-width': 100,

          // Simple
          background: '#faa',

          margin: '0 14px 4px 40px',

          // rtl
          marginLeft: 41,
          float: 'left',

          // sort
          paddingLeft: 41,
          padding: 40,

          // prefixes
          position: 'sticky',
          transition: 'all .4s ease',
          maskOrigin: 'inherit',
          maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
          maskPosition: '40% 74%',

          // animation
          animation: '$a .4s ease',
        },
      };

      const style = css(a, {
        amaui_style: { value: amauiStyle },
        reset: true,
        css: {
          file: {
            name: 'style',
            hash: false
          },
          folders: [
            { url: './test/folders/css' },
          ],
        },
        log: false
      });

      await style.make();

      const files = {
        css: await AmauiNode.file.get(path.resolve('./test/folders/css/style.css'), false),
      };

      assert(files.css).eq(`a{ background:#faa;  background-color:transparent;  cursor:pointer;  float:left;  margin:0 14px 4px 40px;  margin-left:41px;  mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  mask-origin:inherit;  mask-position:40% 74%;  max-width:100px;  padding:40px;  padding-left:41px;  position:sticky;  text-decoration:none;  transition:all .4s ease;  width:100px}*{ background:transparent;  border:0px;  box-sizing:border-box;  font-size:100%;  margin:0px;  outline:none;  padding:0px;  touch-action:manipulation}body{ background-color:#fff;  font-family:Roboto,Helvetica,"Helvetica Neue",-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol",sans-serif;  font-size:14px;  font-style:normal;  font-weight:normal;  overflow-x:hidden;  position:relative}img,embed,object,video{ height:auto;  max-width:100%}form{ width:100%}span{ word-wrap:break-word}hr{ background:#ddd;  box-sizing:content-box;  height:1px;  margin:24px 0;  overflow:visible;  width:100%}pre,code,kbd,samp{ font-family:Roboto Mono,monospace}:focus{ outline:none}html{ -webkit-text-size-adjust:100%}main{ display:block}h1{ font-size:2em;  margin:0.67em 0}pre{ font-family:monospace,monospace;  font-size:1em}abbr[title]{ border-bottom:none;  text-decoration:underline dotted;  text-decoration:underline}b,strong{ font-weight:bolder}code,kbd,samp{ font-family:monospace,monospace;  font-size:1em}small{ font-size:80%}sub,sup{ font-size:75%;  position:relative;  vertical-align:baseline}sub{ bottom:-0.25em}sup{ top:-0.5em}img{ border-style:none}button,input,optgroup,select,textarea{ font-family:inherit;  font-size:100%;  margin:0px}button,input{ overflow:visible}button,select{ text-transform:none}button,[type="button"],[type="reset"],[type="submit"]{ -webkit-appearance:button}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner{ border-style:none;  padding:0px}button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring{ outline:1px dotted ButtonText}fieldset{ padding:0.35em 0.75em 0.625em}legend{ box-sizing:border-box;  color:inherit;  display:table;  max-width:100%;  padding:0px;  white-space:normal}progress{ vertical-align:baseline}textarea{ overflow:auto}[type="checkbox"],[type="radio"]{ box-sizing:border-box;  padding:0px}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{ height:auto}[type="search"]{ -webkit-appearance:textfield;  outline-offset:-2px}[type="search"]::-webkit-search-decoration{ -webkit-appearance:none}::-webkit-file-upload-button{ -webkit-appearance:button;  font:inherit}details{ display:block}summary{ display:list-item}template{ display:none}[hidden]{ display:none}*[contenteditable]{ user-select:text}code span{ white-space:pre-wrap}`);
    });

    group('resetProps', () => {

      to('override', async () => {
        const amauiStyle = new AmauiStyle.AmauiStyle();

        // Plugins
        amauiStyle.plugins.add = [
          AmauiStyle.unit,
          AmauiStyle.sort,
          AmauiStyle.prefix,
          AmauiStyle.makeClassName,
          AmauiStyle.rtl,
        ];

        const a: TValue = {
          a: {
            width: 100,

            'max-width': 100,

            // Simple
            background: '#faa',

            margin: '0 14px 4px 40px',

            // rtl
            marginLeft: 41,
            float: 'left',

            // sort
            paddingLeft: 41,
            padding: 40,

            // prefixes
            position: 'sticky',
            transition: 'all .4s ease',
            maskOrigin: 'inherit',
            maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
            maskPosition: '40% 74%',

            // animation
            animation: '$a .4s ease',
          },
        };

        const style = css(a, {
          amaui_style: { value: amauiStyle },
          reset: true,
          resetProps: {
            override: true,
          },
          css: {
            file: {
              name: 'style',
              hash: false
            },
            folders: [
              { url: './test/folders/css' },
            ],
          },
          log: false
        });

        await style.make();

        const files = {
          css: await AmauiNode.file.get(path.resolve('./test/folders/css/style.css'), false),
        };

        assert(files.css).eq(`*{ background:transparent;  border:0px;  box-sizing:border-box;  font-size:100%;  margin:0px;  outline:none;  padding:0px;  touch-action:manipulation}body{ background-color:#fff;  font-family:Roboto,Helvetica,"Helvetica Neue",-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol",sans-serif;  font-size:14px;  font-style:normal;  font-weight:normal;  overflow-x:hidden;  position:relative}img,embed,object,video{ height:auto;  max-width:100%}a{ background:#faa;  float:left;  margin:0 14px 4px 40px;  margin-left:41px;  mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  mask-origin:inherit;  mask-position:40% 74%;  max-width:100px;  padding:40px;  padding-left:41px;  position:sticky;  transition:all .4s ease;  width:100px}form{ width:100%}span{ word-wrap:break-word}hr{ background:#ddd;  box-sizing:content-box;  height:1px;  margin:24px 0;  overflow:visible;  width:100%}pre,code,kbd,samp{ font-family:Roboto Mono,monospace}:focus{ outline:none}html{ -webkit-text-size-adjust:100%}main{ display:block}h1{ font-size:2em;  margin:0.67em 0}pre{ font-family:monospace,monospace;  font-size:1em}abbr[title]{ border-bottom:none;  text-decoration:underline dotted;  text-decoration:underline}b,strong{ font-weight:bolder}code,kbd,samp{ font-family:monospace,monospace;  font-size:1em}small{ font-size:80%}sub,sup{ font-size:75%;  position:relative;  vertical-align:baseline}sub{ bottom:-0.25em}sup{ top:-0.5em}img{ border-style:none}button,input,optgroup,select,textarea{ font-family:inherit;  font-size:100%;  margin:0px}button,input{ overflow:visible}button,select{ text-transform:none}button,[type="button"],[type="reset"],[type="submit"]{ -webkit-appearance:button}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner{ border-style:none;  padding:0px}button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring{ outline:1px dotted ButtonText}fieldset{ padding:0.35em 0.75em 0.625em}legend{ box-sizing:border-box;  color:inherit;  display:table;  max-width:100%;  padding:0px;  white-space:normal}progress{ vertical-align:baseline}textarea{ overflow:auto}[type="checkbox"],[type="radio"]{ box-sizing:border-box;  padding:0px}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{ height:auto}[type="search"]{ -webkit-appearance:textfield;  outline-offset:-2px}[type="search"]::-webkit-search-decoration{ -webkit-appearance:none}::-webkit-file-upload-button{ -webkit-appearance:button;  font:inherit}details{ display:block}summary{ display:list-item}template{ display:none}[hidden]{ display:none}*[contenteditable]{ user-select:text}code span{ white-space:pre-wrap}`);
      });

    });

    group('css', () => {

      group('file', () => {

        to('name', async () => {
          const amauiStyle = new AmauiStyle.AmauiStyle();

          // Plugins
          amauiStyle.plugins.add = [
            AmauiStyle.unit,
            AmauiStyle.sort,
            AmauiStyle.prefix,
            AmauiStyle.makeClassName,
            AmauiStyle.rtl,
          ];

          const a: TValue = {
            a: {
              width: 100,

              'max-width': 100,

              // Simple
              background: '#faa',

              margin: '0 14px 4px 40px',

              // rtl
              marginLeft: 41,
              float: 'left',

              // sort
              paddingLeft: 41,
              padding: 40,

              // prefixes
              position: 'sticky',
              transition: 'all .4s ease',
              maskOrigin: 'inherit',
              maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
              maskPosition: '40% 74%',

              // animation
              animation: '$a .4s ease',
            },
          };

          const style = css(a, {
            amaui_style: { value: amauiStyle },
            css: {
              file: {
                name: 'a',
                hash: false
              },
              folders: [
                { url: './test/folders/css' },
                { url: './test/folders/css1' },
              ],
            },
            log: false
          });

          await style.make();

          const files = {
            css: await AmauiNode.file.get(path.resolve('./test/folders/css/a.css'), false),
          };

          assert(files.css).eq(`.a-0{ background:#faa;  float:left;  margin:0 14px 4px 40px;  margin-left:41px;  mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  mask-origin:inherit;  mask-position:40% 74%;  max-width:100px;  padding:40px;  padding-left:41px;  position:sticky;  transition:all .4s ease;  width:100px}`);
        });

        to('hash', async () => {
          const amauiStyle = new AmauiStyle.AmauiStyle();

          // Plugins
          amauiStyle.plugins.add = [
            AmauiStyle.unit,
            AmauiStyle.sort,
            AmauiStyle.prefix,
            AmauiStyle.makeClassName,
            AmauiStyle.rtl,
          ];

          const a: TValue = {
            a: {
              width: 100,

              'max-width': 100,

              // Simple
              background: '#faa',

              margin: '0 14px 4px 40px',

              // rtl
              marginLeft: 41,
              float: 'left',

              // sort
              paddingLeft: 41,
              padding: 40,

              // prefixes
              position: 'sticky',
              transition: 'all .4s ease',
              maskOrigin: 'inherit',
              maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
              maskPosition: '40% 74%',

              // animation
              animation: '$a .4s ease',
            },
          };

          const style = css(a, {
            amaui_style: { value: amauiStyle },
            css: {
              file: {
                name: 'style',
                hash: true
              },
              folders: [
                { url: './test/folders/css' },
                { url: './test/folders/css1' },
              ],
            },
            log: false
          });

          await style.make();

          const files = {
            css: await AmauiNode.file.get(path.resolve('./test/folders/css/style.a2a1e199ecef63186aabd6fef54cb34c01c9597aff210207fa79bb9f4561dc62.css'), false),
          };

          assert(files.css).eq(`.a-0{ background:#faa;  float:left;  margin:0 14px 4px 40px;  margin-left:41px;  mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  mask-origin:inherit;  mask-position:40% 74%;  max-width:100px;  padding:40px;  padding-left:41px;  position:sticky;  transition:all .4s ease;  width:100px}`);
        });

      });

      to('folders', async () => {
        const amauiStyle = new AmauiStyle.AmauiStyle();

        // Plugins
        amauiStyle.plugins.add = [
          AmauiStyle.unit,
          AmauiStyle.sort,
          AmauiStyle.prefix,
          AmauiStyle.makeClassName,
          AmauiStyle.rtl,
        ];

        const a: TValue = {
          a: {
            width: 100,

            'max-width': 100,

            // Simple
            background: '#faa',

            margin: '0 14px 4px 40px',

            // rtl
            marginLeft: 41,
            float: 'left',

            // sort
            paddingLeft: 41,
            padding: 40,

            // prefixes
            position: 'sticky',
            transition: 'all .4s ease',
            maskOrigin: 'inherit',
            maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
            maskPosition: '40% 74%',

            // animation
            animation: '$a .4s ease',
          },
        };

        const style = css(a, {
          amaui_style: { value: amauiStyle },
          css: {
            file: {
              name: 'style',
              hash: false
            },
            folders: [
              { url: './test/folders/css' },
              { url: './test/folders/css1' },
            ],
          },
          log: false
        });

        await style.make();

        const files = {
          css: await AmauiNode.file.get(path.resolve('./test/folders/css/style.css'), false),
          css1: await AmauiNode.file.get(path.resolve('./test/folders/css1/style.css'), false),
        };

        assert(files.css).eq(files.css1);

        assert(files.css1).eq(`.a-0{ background:#faa;  float:left;  margin:0 14px 4px 40px;  margin-left:41px;  mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  mask-origin:inherit;  mask-position:40% 74%;  max-width:100px;  padding:40px;  padding-left:41px;  position:sticky;  transition:all .4s ease;  width:100px}`);
      });

      group('clear', () => {

        to('true', async () => {
          const amauiStyle = new AmauiStyle.AmauiStyle();

          // Plugins
          amauiStyle.plugins.add = [
            AmauiStyle.unit,
            AmauiStyle.sort,
            AmauiStyle.prefix,
            AmauiStyle.makeClassName,
            AmauiStyle.rtl,
          ];

          const a: TValue = {
            a: {
              width: 100,

              'max-width': 100,

              // Simple
              background: '#faa',

              margin: '0 14px 4px 40px',

              // rtl
              marginLeft: 41,
              float: 'left',

              // sort
              paddingLeft: 41,
              padding: 40,

              // prefixes
              position: 'sticky',
              transition: 'all .4s ease',
              maskOrigin: 'inherit',
              maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
              maskPosition: '40% 74%',

              // animation
              animation: '$a .4s ease',
            },
          };

          const style = css(a, {
            amaui_style: { value: amauiStyle },
            css: {
              file: {
                name: 'style',
                hash: false
              },
              folders: [
                { url: './test/folders/css' },
                {
                  url: './test/folders/css1',
                  clear: false
                },
              ],
              clear: true
            },
            log: false
          });

          await AmauiNode.file.add(path.resolve('./test/folders/css/a.js'), '');

          await AmauiNode.file.add(path.resolve('./test/folders/css1/a.js'), '');

          await style.make();

          const files = {
            css: await AmauiNode.file.get(path.resolve('./test/folders/css/style.css'), false),
          };

          assert(files.css).eq(`.a-0{ background:#faa;  float:left;  margin:0 14px 4px 40px;  margin-left:41px;  mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  mask-origin:inherit;  mask-position:40% 74%;  max-width:100px;  padding:40px;  padding-left:41px;  position:sticky;  transition:all .4s ease;  width:100px}`);

          const allFiles = {
            css: (await fs.readdir(path.resolve('./test/folders/css'))),
            css1: (await fs.readdir(path.resolve('./test/folders/css1'))),
          };

          assert(allFiles.css.length).eq(1);
          assert(allFiles.css1.length).eq(2);
        });

        to('false', async () => {
          const amauiStyle = new AmauiStyle.AmauiStyle();

          // Plugins
          amauiStyle.plugins.add = [
            AmauiStyle.unit,
            AmauiStyle.sort,
            AmauiStyle.prefix,
            AmauiStyle.makeClassName,
            AmauiStyle.rtl,
          ];

          const a: TValue = {
            a: {
              width: 100,

              'max-width': 100,

              // Simple
              background: '#faa',

              margin: '0 14px 4px 40px',

              // rtl
              marginLeft: 41,
              float: 'left',

              // sort
              paddingLeft: 41,
              padding: 40,

              // prefixes
              position: 'sticky',
              transition: 'all .4s ease',
              maskOrigin: 'inherit',
              maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
              maskPosition: '40% 74%',

              // animation
              animation: '$a .4s ease',
            },
          };

          const style = css(a, {
            amaui_style: { value: amauiStyle },
            css: {
              file: {
                name: 'style',
                hash: false
              },
              folders: [
                { url: './test/folders/css' },
                { url: './test/folders/css1' },
              ],
              clear: false
            },
            log: false
          });

          await AmauiNode.file.add(path.resolve('./test/folders/css/a.js'), '');

          await style.make();

          const files = {
            css: await AmauiNode.file.get(path.resolve('./test/folders/css/style.css'), false),
          };

          assert(files.css).eq(`.a-0{ background:#faa;  float:left;  margin:0 14px 4px 40px;  margin-left:41px;  mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  mask-origin:inherit;  mask-position:40% 74%;  max-width:100px;  padding:40px;  padding-left:41px;  position:sticky;  transition:all .4s ease;  width:100px}`);

          const allFiles = (await fs.readdir(path.resolve('./test/folders/css')));

          assert(allFiles.length).eq(2);
        });

      });

      group('minify', () => {

        to('true', async () => {
          const amauiStyle = new AmauiStyle.AmauiStyle();

          // Plugins
          amauiStyle.plugins.add = [
            AmauiStyle.unit,
            AmauiStyle.sort,
            AmauiStyle.prefix,
            AmauiStyle.makeClassName,
            AmauiStyle.rtl,
          ];

          const a: TValue = {
            a: {
              width: 100,

              'max-width': 100,

              // Simple
              background: '#faa',

              margin: '0 14px 4px 40px',

              // rtl
              marginLeft: 41,
              float: 'left',

              // sort
              paddingLeft: 41,
              padding: 40,

              // prefixes
              position: 'sticky',
              transition: 'all .4s ease',
              maskOrigin: 'inherit',
              maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
              maskPosition: '40% 74%',

              // animation
              animation: '$a .4s ease',
            },
          };

          const style = css(a, {
            amaui_style: { value: amauiStyle },
            css: {
              file: {
                name: 'style',
                hash: false
              },
              folders: [
                { url: './test/folders/css' },
                { url: './test/folders/css1' },
              ],
              minify: true
            },
            log: false
          });

          await style.make();

          const files = {
            css: await AmauiNode.file.get(path.resolve('./test/folders/css/style.css'), false),
          };

          assert(files.css).eq(`.a-0{ background:#faa;  float:left;  margin:0 14px 4px 40px;  margin-left:41px;  mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  mask-origin:inherit;  mask-position:40% 74%;  max-width:100px;  padding:40px;  padding-left:41px;  position:sticky;  transition:all .4s ease;  width:100px}`);
        });

        to('false', async () => {
          const amauiStyle = new AmauiStyle.AmauiStyle();

          // Plugins
          amauiStyle.plugins.add = [
            AmauiStyle.unit,
            AmauiStyle.sort,
            AmauiStyle.prefix,
            AmauiStyle.makeClassName,
            AmauiStyle.rtl,
          ];

          const a: TValue = {
            a: {
              width: 100,

              'max-width': 100,

              // Simple
              background: '#faa',

              margin: '0 14px 4px 40px',

              // rtl
              marginLeft: 41,
              float: 'left',

              // sort
              paddingLeft: 41,
              padding: 40,

              // prefixes
              position: 'sticky',
              transition: 'all .4s ease',
              maskOrigin: 'inherit',
              maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
              maskPosition: '40% 74%',

              // animation
              animation: '$a .4s ease',
            },
          };

          const style = css(a, {
            amaui_style: { value: amauiStyle },
            css: {
              file: {
                name: 'style',
                hash: false
              },
              folders: [
                { url: './test/folders/css' },
                { url: './test/folders/css1' },
              ],
              minify: false
            },
            log: false
          });

          await style.make();

          const files = {
            css: await AmauiNode.file.get(path.resolve('./test/folders/css/style.css'), false),
          };

          assert(files.css).eq(`

.a-0 {
  background: #faa;
  float: left;
  margin: 0 14px 4px 40px;
  margin-left: 41px;
  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);
  mask-origin: inherit;
  mask-position: 40% 74%;
  max-width: 100px;
  padding: 40px;
  padding-left: 41px;
  position: sticky;
  transition: all .4s ease;
  width: 100px;
}

`);
        });

      });

    });

    group('html', () => {

      to('files', async () => {
        const amauiStyle = new AmauiStyle.AmauiStyle();

        // Plugins
        amauiStyle.plugins.add = [
          AmauiStyle.unit,
          AmauiStyle.sort,
          AmauiStyle.prefix,
          AmauiStyle.makeClassName,
          AmauiStyle.rtl,
        ];

        const a: TValue = {
          a: {
            width: 100,

            'max-width': 100,

            // Simple
            background: '#faa',

            margin: '0 14px 4px 40px',

            // rtl
            marginLeft: 41,
            float: 'left',

            // sort
            paddingLeft: 41,
            padding: 40,

            // prefixes
            position: 'sticky',
            transition: 'all .4s ease',
            maskOrigin: 'inherit',
            maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
            maskPosition: '40% 74%',

            // animation
            animation: '$a .4s ease',
          },
        };

        const style = css(a, {
          amaui_style: { value: amauiStyle },
          css: {
            file: {
              name: 'style'
            },
            folders: [
              { url: './test/folders/css' },
            ]
          },
          html: {
            files: [
              { url: './test/folders/html/index.html' },
              { url: './test/folders/html/about.html' },
              { url: './test/folders/html/a.html' }
            ]
          },
          log: false
        });

        await style.make();

        const files = {
          css: await AmauiNode.file.get(path.resolve('./test/folders/css/style.a2a1e199ecef63186aabd6fef54cb34c01c9597aff210207fa79bb9f4561dc62.css'), false),
          index: await AmauiNode.file.get(path.resolve('./test/folders/html/index.html'), false),
          about: await AmauiNode.file.get(path.resolve('./test/folders/html/about.html'), false),
        };

        assert(files.css).eq(`.a-0{ background:#faa;  float:left;  margin:0 14px 4px 40px;  margin-left:41px;  mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  mask-origin:inherit;  mask-position:40% 74%;  max-width:100px;  padding:40px;  padding-left:41px;  position:sticky;  transition:all .4s ease;  width:100px}`);

        assert(files.index).eq(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel='stylesheet' href='../css/style.a2a1e199ecef63186aabd6fef54cb34c01c9597aff210207fa79bb9f4561dc62.css' data-amaui='true' />
  </head>

  <body>

  </body>

</html>`);

        assert(files.about).eq(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel='stylesheet' href='../css/style.a2a1e199ecef63186aabd6fef54cb34c01c9597aff210207fa79bb9f4561dc62.css' data-amaui='true' />
  </head>

  <body>

  </body>

</html>`);
      });

      to('insert', async () => {
        const amauiStyle = new AmauiStyle.AmauiStyle();

        // Plugins
        amauiStyle.plugins.add = [
          AmauiStyle.unit,
          AmauiStyle.sort,
          AmauiStyle.prefix,
          AmauiStyle.makeClassName,
          AmauiStyle.rtl,
        ];

        const a: TValue = {
          a: {
            width: 100,

            'max-width': 100,

            // Simple
            background: '#faa',

            margin: '0 14px 4px 40px',

            // rtl
            marginLeft: 41,
            float: 'left',

            // sort
            paddingLeft: 41,
            padding: 40,

            // prefixes
            position: 'sticky',
            transition: 'all .4s ease',
            maskOrigin: 'inherit',
            maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
            maskPosition: '40% 74%',

            // animation
            animation: '$a .4s ease',
          },
        };

        const style = css(a, {
          amaui_style: { value: amauiStyle },
          css: {
            file: {
              name: 'style'
            },
            folders: [
              { url: './test/folders/css' },
            ]
          },
          html: {
            files: [
              { url: './test/folders/html/ad.html' },
              {
                url: './test/folders/html/ad1.html',
                insert: {
                  comment: '<!-- a1 insert here -->'
                }
              }
            ],
            insert: {
              comment: '<!-- a insert here -->'
            },
          },
          log: false
        });

        await style.make();

        const files = {
          css: await AmauiNode.file.get(path.resolve('./test/folders/css/style.a2a1e199ecef63186aabd6fef54cb34c01c9597aff210207fa79bb9f4561dc62.css'), false),
          ad: await AmauiNode.file.get(path.resolve('./test/folders/html/ad.html'), false),
          ad1: await AmauiNode.file.get(path.resolve('./test/folders/html/ad1.html'), false),
        };

        assert(files.css).eq(`.a-0{ background:#faa;  float:left;  margin:0 14px 4px 40px;  margin-left:41px;  mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  mask-origin:inherit;  mask-position:40% 74%;  max-width:100px;  padding:40px;  padding-left:41px;  position:sticky;  transition:all .4s ease;  width:100px}`);

        assert(files.ad).eq(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <!-- a insert here -->
    <link rel='stylesheet' href='../css/style.a2a1e199ecef63186aabd6fef54cb34c01c9597aff210207fa79bb9f4561dc62.css' data-amaui='true' />
  </head>

  <body>

  </body>

</html>`);

        assert(files.ad1).eq(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <!-- a1 insert here -->
    <link rel='stylesheet' href='../css/style.a2a1e199ecef63186aabd6fef54cb34c01c9597aff210207fa79bb9f4561dc62.css' data-amaui='true' />
  </head>

  <body>

  </body>

</html>`);
      });

      group('add', () => {

        to('true', async () => {
          const amauiStyle = new AmauiStyle.AmauiStyle();

          // Plugins
          amauiStyle.plugins.add = [
            AmauiStyle.unit,
            AmauiStyle.sort,
            AmauiStyle.prefix,
            AmauiStyle.makeClassName,
            AmauiStyle.rtl,
          ];

          const a: TValue = {
            a: {
              width: 100,

              'max-width': 100,

              // Simple
              background: '#faa',

              margin: '0 14px 4px 40px',

              // rtl
              marginLeft: 41,
              float: 'left',

              // sort
              paddingLeft: 41,
              padding: 40,

              // prefixes
              position: 'sticky',
              transition: 'all .4s ease',
              maskOrigin: 'inherit',
              maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
              maskPosition: '40% 74%',

              // animation
              animation: '$a .4s ease',
            },
          };

          const style = css(a, {
            amaui_style: { value: amauiStyle },
            css: {
              file: {
                name: 'style'
              },
              folders: [
                { url: './test/folders/css' },
              ]
            },
            html: {
              files: [
                { url: './test/folders/html/about.html' },
              ],
              add: true
            },
            log: false
          });

          await style.make();

          const files = {
            css: await AmauiNode.file.get(path.resolve('./test/folders/css/style.a2a1e199ecef63186aabd6fef54cb34c01c9597aff210207fa79bb9f4561dc62.css'), false),
            about: await AmauiNode.file.get(path.resolve('./test/folders/html/about.html'), false),
          };

          assert(files.css).eq(`.a-0{ background:#faa;  float:left;  margin:0 14px 4px 40px;  margin-left:41px;  mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  mask-origin:inherit;  mask-position:40% 74%;  max-width:100px;  padding:40px;  padding-left:41px;  position:sticky;  transition:all .4s ease;  width:100px}`);

          assert(files.about).eq(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel='stylesheet' href='../css/style.a2a1e199ecef63186aabd6fef54cb34c01c9597aff210207fa79bb9f4561dc62.css' data-amaui='true' />
  </head>

  <body>

  </body>

</html>`);
        });

        to('false', async () => {
          const amauiStyle = new AmauiStyle.AmauiStyle();

          // Plugins
          amauiStyle.plugins.add = [
            AmauiStyle.unit,
            AmauiStyle.sort,
            AmauiStyle.prefix,
            AmauiStyle.makeClassName,
            AmauiStyle.rtl,
          ];

          const a: TValue = {
            a: {
              width: 100,

              'max-width': 100,

              // Simple
              background: '#faa',

              margin: '0 14px 4px 40px',

              // rtl
              marginLeft: 41,
              float: 'left',

              // sort
              paddingLeft: 41,
              padding: 40,

              // prefixes
              position: 'sticky',
              transition: 'all .4s ease',
              maskOrigin: 'inherit',
              maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
              maskPosition: '40% 74%',

              // animation
              animation: '$a .4s ease',
            },
          };

          const style = css(a, {
            amaui_style: { value: amauiStyle },
            css: {
              file: {
                name: 'style'
              },
              folders: [
                { url: './test/folders/css' },
              ]
            },
            html: {
              files: [
                { url: './test/folders/html/about.html' },
              ],
              add: false
            },
            log: false
          });

          await style.make();

          const files = {
            css: await AmauiNode.file.get(path.resolve('./test/folders/css/style.a2a1e199ecef63186aabd6fef54cb34c01c9597aff210207fa79bb9f4561dc62.css'), false),
            about: await AmauiNode.file.get(path.resolve('./test/folders/html/about.html'), false),
          };

          assert(files.css).eq(`.a-0{ background:#faa;  float:left;  margin:0 14px 4px 40px;  margin-left:41px;  mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  mask-origin:inherit;  mask-position:40% 74%;  max-width:100px;  padding:40px;  padding-left:41px;  position:sticky;  transition:all .4s ease;  width:100px}`);

          assert(files.about).eq(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>

  <body>

  </body>

</html>`);
        });

      });

      to('addNames', async () => {
        const amauiStyle = new AmauiStyle.AmauiStyle();

        // Plugins
        amauiStyle.plugins.add = [
          AmauiStyle.unit,
          AmauiStyle.sort,
          AmauiStyle.prefix,
          AmauiStyle.makeClassName,
          AmauiStyle.rtl,
        ];

        const a: TValue = {
          a: {
            width: 100,

            'max-width': 100,

            // Simple
            background: '#faa',

            margin: '0 14px 4px 40px',

            // rtl
            marginLeft: 41,
            float: 'left',

            // sort
            paddingLeft: 41,
            padding: 40,

            // prefixes
            position: 'sticky',
            transition: 'all .4s ease',
            maskOrigin: 'inherit',
            maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
            maskPosition: '40% 74%',

            // animation
            animation: '$a .4s ease',
          },
        };

        const style = css(a, {
          amaui_style: { value: amauiStyle },
          css: {
            file: {
              name: 'style'
            },
            folders: [
              { url: './test/folders/css' },
            ]
          },
          html: {
            files: [
              { url: './test/folders/html/index.html' },
              { url: './test/folders/html/about.html' },
              { url: './test/folders/html/a.html' }
            ],
            addNames: true
          },
          log: false
        });

        await style.make();

        const files = {
          css: await AmauiNode.file.get(path.resolve('./test/folders/css/style.a2a1e199ecef63186aabd6fef54cb34c01c9597aff210207fa79bb9f4561dc62.css'), false),
          about: await AmauiNode.file.get(path.resolve('./test/folders/html/about.html'), false),
        };

        assert(files.css).eq(`.a-0{ background:#faa;  float:left;  margin:0 14px 4px 40px;  margin-left:41px;  mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  mask-origin:inherit;  mask-position:40% 74%;  max-width:100px;  padding:40px;  padding-left:41px;  position:sticky;  transition:all .4s ease;  width:100px}`);

        assert((files.about as string).replace(/ /g, '')).eq(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel='stylesheet' href='../css/style.a2a1e199ecef63186aabd6fef54cb34c01c9597aff210207fa79bb9f4561dc62.css' data-amaui='true' />
    <script>
      if (!window.amauiStyleNames) window.amauiStyleNames = {};

      window.amauiStyleNames['a2a1e199ecef63186aabd6fef54cb34c01c9597aff210207fa79bb9f4561dc62'] = {
      "classNames": {
            "a": "a-0"
      },
      "classes": {
            "a": "a-0"
      },
      "keyframes": {}
};
    </script>
  </head>

  <body>

  </body>

</html>`.replace(/ /g, ''));
      });

    });

    group('rule', () => {

      to('true', async () => {
        const amauiStyle = new AmauiStyle.AmauiStyle();

        // Plugins
        amauiStyle.plugins.add = [
          AmauiStyle.unit,
          AmauiStyle.sort,
          AmauiStyle.prefix,
          AmauiStyle.makeClassName,
          AmauiStyle.rtl,
        ];

        const a: TValue = {
          a: {
            width: 100,

            'max-width': 100,

            // Simple
            background: '#faa',

            margin: '0 14px 4px 40px',

            // rtl
            marginLeft: 41,
            float: 'left',

            // sort
            paddingLeft: 41,
            padding: 40,

            // prefixes
            position: 'sticky',
            transition: 'all .4s ease',
            maskOrigin: 'inherit',
            maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
            maskPosition: '40% 74%',

            // animation
            animation: '$a .4s ease',
          },
        };

        const style = css(a, {
          amaui_style: { value: amauiStyle },
          css: {
            file: {
              name: 'style',
              hash: false
            },
            folders: [
              { url: './test/folders/css' },
              { url: './test/folders/css1' },
            ],
          },
          rule: {
            rtl: true,
            prefix: true,
            sort: true
          },
          log: false
        });

        await style.make();

        const files = {
          css: await AmauiNode.file.get(path.resolve('./test/folders/css/style.css'), false),
        };

        assert(files.css).eq(`.a-0{ background:#faa;  float:left;  margin:0 14px 4px 40px;  margin-left:41px;  mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  mask-origin:inherit;  mask-position:40% 74%;  max-width:100px;  padding:40px;  padding-left:41px;  position:sticky;  transition:all .4s ease;  width:100px}`);
      });

      to('false', async () => {
        const amauiStyle = new AmauiStyle.AmauiStyle();

        // Plugins
        amauiStyle.plugins.add = [
          AmauiStyle.unit,
          AmauiStyle.sort,
          AmauiStyle.prefix,
          AmauiStyle.makeClassName,
          AmauiStyle.rtl,
        ];

        const a: TValue = {
          a: {
            width: 100,

            'max-width': 100,

            // Simple
            background: '#faa',

            margin: '0 14px 4px 40px',

            // rtl
            marginLeft: 41,
            float: 'left',

            // sort
            paddingLeft: 41,
            padding: 40,

            // prefixes
            position: 'sticky',
            transition: 'all .4s ease',
            maskOrigin: 'inherit',
            maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
            maskPosition: '40% 74%',

            // animation
            animation: '$a .4s ease',
          },
        };

        const style = css(a, {
          amaui_style: { value: amauiStyle },
          css: {
            file: {
              name: 'style',
              hash: false
            },
            folders: [
              { url: './test/folders/css' },
              { url: './test/folders/css1' },
            ],
          },
          rule: {
            rtl: false,
            prefix: false,
            sort: false
          },
          log: false
        });

        await style.make();

        const files = {
          css: await AmauiNode.file.get(path.resolve('./test/folders/css/style.css'), false),
        };

        assert(files.css).eq(`.a-0{ background:#faa;  float:left;  margin:0 14px 4px 40px;  margin-left:41px;  mask-image:linear-gradient(rgba(0,0,0,1.0),transparent);  mask-origin:inherit;  mask-position:40% 74%;  max-width:100px;  padding:40px;  padding-left:41px;  position:sticky;  transition:all .4s ease;  width:100px}`);
      });

    });

  });

});
