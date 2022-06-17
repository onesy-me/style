/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';
import * as AmauiUtils from '@amaui/utils';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers } from '../utils/js/test/utils';

import * as AmauiStyle from '../src';
import { TValue } from '../src';
import { counter } from '../src/amaui-style-rule';

group('@amaui/style/amaui-style-rule', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => await closeBrowsers(browsers));

  preEveryTo(async () => {
    // Counter
    counter.className = 0;
    counter.keyframesName = 0;

    await evaluate((window: any) => {
      // Body
      window.document.body.dir = 'ltr';

      window.document.body.innerHTML = `
      <main id='a'>
        <section id='a1'>
          <div id='a14'>
            a
          </div>
        </section>
      </main>
    `;

      new window.AmauiStyle.AmauiStyle(window.document.getElementById('a14'));
      new window.AmauiStyle.AmauiStyle(window.document.getElementById('a1'));
      new window.AmauiStyle.AmauiStyle(window.document.getElementById('a'));
      new window.AmauiStyle.AmauiStyle(window.document.body);

      Array.from(document.styleSheets).forEach(sheet => {
        sheet.ownerNode.remove();
      });
    }, { browsers });
  });

  postEveryTo(async () => await evaluate((window: any) => {
    // Style sheets
    const styleSheets: any = Array.from(window.document.styleSheets);

    styleSheets.forEach(sheet => sheet.ownerNode.remove());

    // Body
    window.document.body.innerHTML = '';
    window.document.body.dir = 'ltr';
    // Html
    window.document.documentElement.html.dir = 'ltr';
  }, { browsers }));

  group('AmauiStyleRule', () => {

    to('make', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const a = {
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

        const amauiStyle = new window.AmauiStyle.AmauiStyle();

        const amauiStyleSheetManager = new window.AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const amauiStyleSheet = new window.AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const a1 = {
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
        };

        const amauiStyleRule = window.AmauiStyle.AmauiStyleRule.make(
          a1,
          'a1',
          'regular',
          'property',
          false,
          1,
          amauiStyleSheet,
          [amauiStyleSheet],
          amauiStyleSheet,
          amauiStyle
        );

        return [
          typeof amauiStyleRule.id === 'string',
          amauiStyleRule.className,
          amauiStyleRule.hash,
          amauiStyleRule.index,
          amauiStyleRule.level,
          amauiStyleRule.isVariable,
          amauiStyleRule.mode,
          amauiStyleRule.options,
          amauiStyleRule.property,
          amauiStyleRule.value,
          amauiStyleRule.values,
          amauiStyleRule.static,
          amauiStyleRule.status,
          amauiStyleRule.selector,
          amauiStyleRule.variant,
          amauiStyleRule.value_variant,
          amauiStyleRule.ref.className,
          amauiStyleRule.ref.main.sheet.id === amauiStyleRule.amauiStyleSheet.id,
          amauiStyleRule.ref.main.rule.id !== amauiStyleRule.id,
          amauiStyleRule.rules.length
        ];
      }, { browsers });

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

      const amauiStyle = new AmauiStyle.AmauiStyle();

      const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const a1 = {
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
      };

      const amauiStyleRule = AmauiStyle.AmauiStyleRule.make(
        a1,
        'a1',
        'regular',
        'property',
        false,
        1,
        amauiStyleSheet,
        [amauiStyleSheet],
        amauiStyleSheet,
        amauiStyle
      );

      const valueNode = [
        typeof amauiStyleRule.id === 'string',
        amauiStyleRule.className,
        amauiStyleRule.hash,
        amauiStyleRule.index,
        amauiStyleRule.level,
        amauiStyleRule.isVariable,
        amauiStyleRule.mode,
        amauiStyleRule.options,
        amauiStyleRule.property,
        amauiStyleRule.value,
        amauiStyleRule.values,
        amauiStyleRule.static,
        amauiStyleRule.status,
        amauiStyleRule.selector,
        amauiStyleRule.variant,
        amauiStyleRule.value_variant,
        amauiStyleRule.ref.className,
        amauiStyleRule.ref.main.sheet.id === amauiStyleRule.amauiStyleSheet.id,
        amauiStyleRule.ref.main.rule.id !== amauiStyleRule.id,
        amauiStyleRule.rules.length
      ];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        true,
        "a-0",
        "0x688707eb356456f6b99a448b8e68b07d2cd0c15d338cf852b9f8af13b7d495d6",
        1,
        0,
        true,
        "regular",
        {
          "sort": true,
          "prefix": true,
          "rtl": true
        },
        "a1",
        {
          "width": 100,
          "max-width": 100,
          "background": "#faa",
          "margin": "0 14px 4px 40px",
          "marginLeft": 41,
          "float": "left",
          "paddingLeft": 41,
          "padding": 40,
          "position": "sticky",
          "transition": "all .4s ease",
          "maskOrigin": "inherit",
          "maskImage": "linear-gradient(rgba(0, 0, 0, 1.0), transparent)",
          "maskPosition": "40% 74%",
          "animation": "$a .4s ease"
        },
        {
          "value": {
            "width": 100,
            "max-width": 100,
            "background": "#faa",
            "margin": "0 14px 4px 40px",
            "marginLeft": 41,
            "float": "left",
            "paddingLeft": 41,
            "padding": 40,
            "position": "sticky",
            "transition": "all .4s ease",
            "maskOrigin": "inherit",
            "maskImage": "linear-gradient(rgba(0, 0, 0, 1.0), transparent)",
            "maskPosition": "40% 74%",
            "animation": "$a .4s ease"
          },
          "css": "a1 {\nwidth: 100;\nmax-width: 100;\nbackground: #faa;\nmargin: 0 14px 4px 40px;\nmargin-left: 41;\nfloat: left;\npadding-left: 41;\npadding: 40;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\nanimation: $a .4s ease;\n}",
          "json": {
            "a1": {
              "animation": "$a .4s ease",
              "mask-position": "40% 74%",
              "mask-image": "linear-gradient(rgba(0, 0, 0, 1.0), transparent)",
              "mask-origin": "inherit",
              "transition": "all .4s ease",
              "position": "sticky",
              "padding": 40,
              "padding-left": 41,
              "float": "left",
              "margin-left": 41,
              "margin": "0 14px 4px 40px",
              "background": "#faa",
              "max-width": 100,
              "width": 100
            }
          }
        },
        true,
        "inited",
        ".a-0",
        "property",
        "value",
        "a-0",
        true,
        true,
        14
      ]));
    });

  });

  group('amauiStyleRule', () => {

    to('amauiStyleRule', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const a = {
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

        const amauiStyle = new window.AmauiStyle.AmauiStyle();

        const amauiStyleSheetManager = new window.AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const amauiStyleSheet = new window.AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const a1 = {
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
        };

        const amauiStyleRule = new window.AmauiStyle.AmauiStyleRule(
          a1,
          'a1',
          'regular',
          'property',
          false,
          1,
          amauiStyleSheet,
          [amauiStyleSheet],
          amauiStyleSheet,
          amauiStyle
        );

        return [
          typeof amauiStyleRule.id === 'string',
          amauiStyleRule.className,
          amauiStyleRule.hash,
          amauiStyleRule.index,
          amauiStyleRule.level,
          amauiStyleRule.isVariable,
          amauiStyleRule.mode,
          amauiStyleRule.options,
          amauiStyleRule.property,
          amauiStyleRule.value,
          amauiStyleRule.values,
          amauiStyleRule.static,
          amauiStyleRule.status,
          amauiStyleRule.selector,
          amauiStyleRule.variant,
          amauiStyleRule.value_variant,
          amauiStyleRule.ref.className,
          amauiStyleRule.ref.main.sheet.id === amauiStyleRule.amauiStyleSheet.id,
          amauiStyleRule.ref.main.rule.id !== amauiStyleRule.id,
          amauiStyleRule.rules.length
        ];
      }, { browsers });

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

      const amauiStyle = new AmauiStyle.AmauiStyle();

      const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const a1 = {
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
      };

      const amauiStyleRule = new AmauiStyle.AmauiStyleRule(
        a1,
        'a1',
        'regular',
        'property',
        false,
        1,
        amauiStyleSheet,
        [amauiStyleSheet],
        amauiStyleSheet,
        amauiStyle
      );

      const valueNode = [
        typeof amauiStyleRule.id === 'string',
        amauiStyleRule.className,
        amauiStyleRule.hash,
        amauiStyleRule.index,
        amauiStyleRule.level,
        amauiStyleRule.isVariable,
        amauiStyleRule.mode,
        amauiStyleRule.options,
        amauiStyleRule.property,
        amauiStyleRule.value,
        amauiStyleRule.values,
        amauiStyleRule.static,
        amauiStyleRule.status,
        amauiStyleRule.selector,
        amauiStyleRule.variant,
        amauiStyleRule.value_variant,
        amauiStyleRule.ref.className,
        amauiStyleRule.ref.main.sheet.id === amauiStyleRule.amauiStyleSheet.id,
        amauiStyleRule.ref.main.rule.id !== amauiStyleRule.id,
        amauiStyleRule.rules.length
      ];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        true,
        "a-0",
        "0x688707eb356456f6b99a448b8e68b07d2cd0c15d338cf852b9f8af13b7d495d6",
        1,
        0,
        true,
        "regular",
        {
          "sort": true,
          "prefix": true,
          "rtl": true
        },
        "a1",
        {
          "width": 100,
          "max-width": 100,
          "background": "#faa",
          "margin": "0 14px 4px 40px",
          "marginLeft": 41,
          "float": "left",
          "paddingLeft": 41,
          "padding": 40,
          "position": "sticky",
          "transition": "all .4s ease",
          "maskOrigin": "inherit",
          "maskImage": "linear-gradient(rgba(0, 0, 0, 1.0), transparent)",
          "maskPosition": "40% 74%",
          "animation": "$a .4s ease"
        },
        {
          "value": {
            "width": 100,
            "max-width": 100,
            "background": "#faa",
            "margin": "0 14px 4px 40px",
            "marginLeft": 41,
            "float": "left",
            "paddingLeft": 41,
            "padding": 40,
            "position": "sticky",
            "transition": "all .4s ease",
            "maskOrigin": "inherit",
            "maskImage": "linear-gradient(rgba(0, 0, 0, 1.0), transparent)",
            "maskPosition": "40% 74%",
            "animation": "$a .4s ease"
          },
          "css": "a1 {\nwidth: 100;\nmax-width: 100;\nbackground: #faa;\nmargin: 0 14px 4px 40px;\nmargin-left: 41;\nfloat: left;\npadding-left: 41;\npadding: 40;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\nanimation: $a .4s ease;\n}",
          "json": {
            "a1": {
              "animation": "$a .4s ease",
              "mask-position": "40% 74%",
              "mask-image": "linear-gradient(rgba(0, 0, 0, 1.0), transparent)",
              "mask-origin": "inherit",
              "transition": "all .4s ease",
              "position": "sticky",
              "padding": 40,
              "padding-left": 41,
              "float": "left",
              "margin-left": 41,
              "margin": "0 14px 4px 40px",
              "background": "#faa",
              "max-width": 100,
              "width": 100
            }
          }
        },
        true,
        "inited",
        ".a-0",
        "property",
        "value",
        "a-0",
        true,
        true,
        14
      ]));
    });

    group('response', () => {

      to('response', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          window.document.body.dir = 'rtl';

          const amauiStyle = new window.AmauiStyle.AmauiStyle(window.document.body);

          amauiStyle.plugins.add = [
            window.AmauiStyle.unit,
            window.AmauiStyle.sort,
            window.AmauiStyle.prefix,
            window.AmauiStyle.rtl,
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

          const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } } });

          const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } } });

          const amauiStyleRule = amauiStyleSheet.rules[0].value;

          return [window.AmauiUtils.equalDeep({ css: amauiStyleRule.values.css, json: amauiStyleRule.values.json }, amauiStyleRule.response), amauiStyleRule.response];
        }, { browsers });

        const values = [...valueBrowsers];

        assert(values).eql([
          [
            true,
            {
              "css": ".a-0 {\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}",
              "json": {
                ".a-0": {
                  "width": "100px",
                  "transition": "all .4s ease",
                  "position": "sticky",
                  "padding-right": "41px",
                  "padding": "40px",
                  "max-width": "100px",
                  "mask-position": "40% 74%",
                  "mask-origin": "inherit",
                  "mask-image": "linear-gradient(rgba(0, 0, 0, 1.0), transparent)",
                  "margin-right": "41px",
                  "margin": "0 14px 4px 40px",
                  "float": "right",
                  "background": "#faa"
                }
              }
            }
          ],
          [
            true,
            {
              "css": ".a-0 {\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}",
              "json": {
                ".a-0": {
                  "width": "100px",
                  "transition": "all .4s ease",
                  "position": "sticky",
                  "padding-right": "41px",
                  "padding": "40px",
                  "max-width": "100px",
                  "mask-position": "40% 74%",
                  "mask-origin": "inherit",
                  "mask-image": "linear-gradient(rgba(0, 0, 0, 1.0), transparent)",
                  "margin-right": "41px",
                  "margin": "0 14px 4px 40px",
                  "float": "right",
                  "background": "#faa"
                }
              }
            }
          ],
          [
            true,
            {
              "css": ".a-0 {\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}",
              "json": {
                ".a-0": {
                  "width": "100px",
                  "transition": "all .4s ease",
                  "position": "sticky",
                  "padding-right": "41px",
                  "padding": "40px",
                  "max-width": "100px",
                  "mask-position": "40% 74%",
                  "mask-origin": "inherit",
                  "mask-image": "linear-gradient(rgba(0, 0, 0, 1.0), transparent)",
                  "margin-right": "41px",
                  "margin": "0 14px 4px 40px",
                  "float": "right",
                  "background": "#faa"
                }
              }
            }
          ]
        ]);

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

        const amauiStyle = new AmauiStyle.AmauiStyle();

        amauiStyle.plugins.add = [
          AmauiStyle.unit,
          AmauiStyle.sort,
          AmauiStyle.prefix,
          AmauiStyle.rtl,
        ];

        const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } } });

        const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } } });

        const amauiStyleRule = amauiStyleSheet.rules[0].value;

        const valueNode = [AmauiUtils.equalDeep({ css: amauiStyleRule.values.css, json: amauiStyleRule.values.json }, amauiStyleRule.response), amauiStyleRule.response];

        assert(valueNode).eql([
          true,
          {
            "css": ".a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}",
            "json": {
              ".a-0": {
                "width": "100px",
                "transition": "all .4s ease",
                "position": "sticky",
                "padding-left": "41px",
                "padding": "40px",
                "max-width": "100px",
                "mask-position": "40% 74%",
                "mask-origin": "inherit",
                "mask-image": "linear-gradient(rgba(0, 0, 0, 1.0), transparent)",
                "margin-left": "41px",
                "margin": "0 14px 4px 40px",
                "float": "left",
                "background": "#faa"
              }
            }
          }
        ]);
      });

      to('css', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          window.document.body.dir = 'rtl';

          const amauiStyle = new window.AmauiStyle.AmauiStyle(window.document.body);

          amauiStyle.plugins.add = [
            window.AmauiStyle.unit,
            window.AmauiStyle.sort,
            window.AmauiStyle.prefix,
            window.AmauiStyle.rtl,
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

          const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } } });

          const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } } });

          const amauiStyleRule = amauiStyleSheet.rules[0].value;

          return [window.AmauiUtils.equalDeep(amauiStyleRule.values.css, amauiStyleRule.css), amauiStyleRule.css];
        }, { browsers });

        const values = [...valueBrowsers];

        assert(values).eql([
          [
            true,
            ".a-0 {\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}"
          ],
          [
            true,
            ".a-0 {\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}"
          ],
          [
            true,
            ".a-0 {\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}"
          ]
        ]);

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

        const amauiStyle = new AmauiStyle.AmauiStyle();

        amauiStyle.plugins.add = [
          AmauiStyle.unit,
          AmauiStyle.sort,
          AmauiStyle.prefix,
          AmauiStyle.rtl,
        ];

        const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } } });

        const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } } });

        const amauiStyleRule = amauiStyleSheet.rules[0].value;

        const valueNode = [AmauiUtils.equalDeep(amauiStyleRule.values.css, amauiStyleRule.css), amauiStyleRule.css];

        assert(valueNode).eql([
          true,
          ".a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}",
        ]);
      });

      to('json', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          window.document.body.dir = 'rtl';

          const amauiStyle = new window.AmauiStyle.AmauiStyle(window.document.body);

          amauiStyle.plugins.add = [
            window.AmauiStyle.unit,
            window.AmauiStyle.sort,
            window.AmauiStyle.prefix,
            window.AmauiStyle.rtl,
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

          const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } } });

          const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } } });

          const amauiStyleRule = amauiStyleSheet.rules[0].value;

          return [window.AmauiUtils.equalDeep(amauiStyleRule.values.json, amauiStyleRule.json), amauiStyleRule.json];
        }, { browsers });

        const values = [...valueBrowsers];

        assert(values[0]).eql([
          true,
          {
            ".a-0": {
              "width": "100px",
              "transition": "all .4s ease",
              "position": "sticky",
              "padding-right": "41px",
              "padding": "40px",
              "max-width": "100px",
              "mask-position": "40% 74%",
              "mask-origin": "inherit",
              "mask-image": "linear-gradient(rgba(0, 0, 0, 1.0), transparent)",
              "margin-right": "41px",
              "margin": "0 14px 4px 40px",
              "float": "right",
              "background": "#faa",
              "-webkit-mask-position": "40% 74%",
              "-webkit-mask-origin": "inherit",
              "-webkit-mask-image": "linear-gradient(rgba(0, 0, 0, 1.0), transparent)"
            }
          }
        ]);

        assert(values[1]).eql([
          true, {
            ".a-0": {
              "width": "100px",
              "transition": "all .4s ease",
              "position": "sticky",
              "padding-right": "41px",
              "padding": "40px",
              "max-width": "100px",
              "mask-position": "40% 74%",
              "mask-origin": "inherit",
              "mask-image": "linear-gradient(rgba(0, 0, 0, 1.0), transparent)",
              "margin-right": "41px",
              "margin": "0 14px 4px 40px",
              "float": "right",
              "background": "#faa"
            }
          }
        ]);

        assert(values[2]).eql([
          true,
          {
            ".a-0": {
              "width": "100px",
              "transition": "all .4s ease",
              "position": "sticky",
              "padding-right": "41px",
              "padding": "40px",
              "max-width": "100px",
              "mask-position": "40% 74%",
              "mask-origin": "inherit",
              "mask-image": "linear-gradient(rgba(0, 0, 0, 1.0), transparent)",
              "margin-right": "41px",
              "margin": "0 14px 4px 40px",
              "float": "right",
              "background": "#faa"
            }
          }
        ]);

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

        const amauiStyle = new AmauiStyle.AmauiStyle();

        amauiStyle.plugins.add = [
          AmauiStyle.unit,
          AmauiStyle.sort,
          AmauiStyle.prefix,
          AmauiStyle.rtl,
        ];

        const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } } });

        const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } } });

        const amauiStyleRule = amauiStyleSheet.rules[0].value;

        const valueNode = [AmauiUtils.equalDeep(amauiStyleRule.values.json, amauiStyleRule.json), amauiStyleRule.json];

        assert(valueNode).eql([
          true,
          {
            ".a-0": {
              "width": "100px",
              "transition": "all .4s ease",
              "position": "sticky",
              "padding-left": "41px",
              "padding": "40px",
              "max-width": "100px",
              "mask-position": "40% 74%",
              "mask-origin": "inherit",
              "mask-image": "linear-gradient(rgba(0, 0, 0, 1.0), transparent)",
              "margin-left": "41px",
              "margin": "0 14px 4px 40px",
              "float": "left",
              "background": "#faa"
            }
          }
        ]);
      });

    });

    to('add', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const a = {
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

        const amauiStyle = new window.AmauiStyle.AmauiStyle();

        amauiStyle.plugins.add = [
          window.AmauiStyle.unit,
          window.AmauiStyle.sort,
          window.AmauiStyle.prefix,
          window.AmauiStyle.rtl,
        ];

        const amauiStyleSheetManager = new window.AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } } });

        const amauiStyleSheet = new window.AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, { style: { attributes: { method: 'style' } } });

        amauiStyleSheetManager.add();

        let css = '';

        Array.from(window.document.styleSheets).forEach((sheet: any) => {
          Array.from(sheet.cssRules).forEach((rule: any) => css += rule.cssText);
        });

        const response = [
          amauiStyleSheetManager.css,
          css
        ];

        const a1 = {
          color: 'yellow',

          '& .a19': {
            color: 'white',

            '& > a': {
              color: 'yellow',

              '&:active': {
                color: 'orange',

                // rtl
                marginLeft: 40,
                float: 'left',

                // sort
                padding: 40,
                paddingLeft: 41,

                // prefixes
                position: 'sticky',
                transition: 'all .4s ease',
                maskOrigin: 'margin-box',
                maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
                maskPosition: '40% 74%',
              }
            }
          },
        };

        const amauiStyleRule = new window.AmauiStyle.AmauiStyleRule(
          a1,
          'a1',
          'regular',
          'property',
          false,
          1,
          amauiStyleSheet,
          [amauiStyleSheet],
          amauiStyleSheet,
          amauiStyle
        );

        amauiStyleRule.add();

        css = '';

        Array.from(window.document.styleSheets).forEach((sheet: any) => {
          Array.from(sheet.cssRules).forEach((rule: any) => css += rule.cssText);
        });

        response.push(
          amauiStyleSheetManager.css,
          css
        );

        return response;
      }, { browsers });

      const values = [...valueBrowsers];

      assert(values).eql([
        [
          "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
          "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n.a1-1 .a19 > a:active {\ncolor: orange;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\ncolor: yellow;\n}\n\n.a1-1 .a19 {\ncolor: white;\n}\n\n.a1-1 {\ncolor: yellow;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a:active { color: orange; float: left; margin-left: 40px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a19 { color: white; }.a1-1 { color: yellow; }"
        ],
        [
          "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
          "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n.a1-1 .a19 > a:active {\ncolor: orange;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\ncolor: yellow;\n}\n\n.a1-1 .a19 {\ncolor: white;\n}\n\n.a1-1 {\ncolor: yellow;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a:active { color: orange; float: left; margin-left: 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a19 { color: white; }.a1-1 { color: yellow; }"
        ],
        [
          "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n",
          ".a-0 { background-color: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
          "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n.a1-1 .a19 > a:active {\ncolor: orange;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\ncolor: yellow;\n}\n\n.a1-1 .a19 {\ncolor: white;\n}\n\n.a1-1 {\ncolor: yellow;\n}\n\n",
          ".a-0 { background-color: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a:active { color: orange; float: left; margin-left: 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a19 { color: white; }.a1-1 { color: yellow; }"
        ]
      ]);

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

      const amauiStyle = new AmauiStyle.AmauiStyle();

      amauiStyle.plugins.add = [
        AmauiStyle.unit,
        AmauiStyle.sort,
        AmauiStyle.prefix,
        AmauiStyle.rtl,
      ];

      const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } } });

      const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } } });

      amauiStyleSheetManager.add();

      const response = [
        amauiStyleSheetManager.css,
      ];

      const a1 = {
        color: 'yellow',

        '& .a19': {
          color: 'white',

          '& > a': {
            color: 'yellow',

            '&:active': {
              color: 'orange',

              // rtl
              marginLeft: 40,
              float: 'left',

              // sort
              padding: 40,
              paddingLeft: 41,

              // prefixes
              position: 'sticky',
              transition: 'all .4s ease',
              maskOrigin: 'margin-box',
              maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
              maskPosition: '40% 74%',
            }
          }
        },
      };

      const amauiStyleRule = new AmauiStyle.AmauiStyleRule(
        a1,
        'a1',
        'regular',
        'property',
        false,
        1,
        amauiStyleSheet,
        [amauiStyleSheet],
        amauiStyleSheet,
        amauiStyle
      );

      amauiStyleRule.add();

      response.push(
        amauiStyleSheetManager.css
      );

      const valueNode = response;

      assert(valueNode).eql([
        "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n",
        "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n.a1-1 .a19 > a:active {\ncolor: orange;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\ncolor: yellow;\n}\n\n.a1-1 .a19 {\ncolor: white;\n}\n\n.a1-1 {\ncolor: yellow;\n}\n\n"
      ]);
    });

    to('addProperty', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const a = {
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

        const amauiStyle = new window.AmauiStyle.AmauiStyle();

        amauiStyle.plugins.add = [
          window.AmauiStyle.unit,
          window.AmauiStyle.sort,
          window.AmauiStyle.prefix,
          window.AmauiStyle.rtl,
        ];

        const amauiStyleSheetManager = new window.AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } } });

        const amauiStyleSheet = new window.AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, { style: { attributes: { method: 'style' } } });

        amauiStyleSheetManager.add();

        let css = '';

        Array.from(window.document.styleSheets).forEach((sheet: any) => {
          Array.from(sheet.cssRules).forEach((rule: any) => css += rule.cssText);
        });

        const response = [
          amauiStyleSheetManager.css,
          css
        ];

        const a1 = {
          color: 'yellow',

          '& .a19': {
            color: 'white',

            '& > a': {
              color: 'yellow',

              '&:active': {
                color: 'orange',

                // rtl
                marginLeft: 40,
                float: 'left',

                // sort
                padding: 40,
                paddingLeft: 41,

                // prefixes
                position: 'sticky',
                transition: 'all .4s ease',
                maskOrigin: 'margin-box',
                maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
                maskPosition: '40% 74%',
              }
            }
          },
        };

        const amauiStyleRule = new window.AmauiStyle.AmauiStyleRule(
          a1,
          'a1',
          'regular',
          'property',
          false,
          1,
          amauiStyleSheet,
          [amauiStyleSheet],
          amauiStyleSheet,
          amauiStyle
        );

        amauiStyleRule.add();

        css = '';

        Array.from(window.document.styleSheets).forEach((sheet: any) => {
          Array.from(sheet.cssRules).forEach((rule: any) => css += rule.cssText);
        });

        response.push(
          amauiStyleSheetManager.css,
          css
        );

        const a14 = {
          '& > a': {
            color: 'yellow',

            '&:active': {
              color: 'yellow',

              width: 100,

              // rtl
              marginLeft: 40,
              float: 'left',

              // sort
              padding: 40,
              paddingLeft: 41,

              // prefixes
              position: 'sticky',
              transition: 'all .4s ease',
              maskOrigin: 'margin-box',
              maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
              maskPosition: '40% 74%',
            }
          }
        };

        // Add property
        amauiStyleRule.addProperty('& .a14', a14);

        css = '';

        Array.from(window.document.styleSheets).forEach((sheet: any) => {
          Array.from(sheet.cssRules).forEach((rule: any) => css += rule.cssText);
        });

        response.push(
          amauiStyleSheetManager.css,
          css
        );

        return response;
      }, { browsers });

      const values = [...valueBrowsers];

      assert(values).eql([
        [
          "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
          "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n.a1-1 .a19 > a:active {\ncolor: orange;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\ncolor: yellow;\n}\n\n.a1-1 .a19 {\ncolor: white;\n}\n\n.a1-1 {\ncolor: yellow;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a:active { color: orange; float: left; margin-left: 40px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a19 { color: white; }.a1-1 { color: yellow; }",
          "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n.a1-1 .a19 > a:active {\ncolor: orange;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\ncolor: yellow;\n}\n\n.a1-1 .a19 {\ncolor: white;\n}\n\n.a1-1 {\ncolor: yellow;\n}\n\n.a1-1 .a14 > a:active {\ncolor: yellow;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n.a1-1 .a14 > a {\ncolor: yellow;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a:active { color: orange; float: left; margin-left: 40px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a19 { color: white; }.a1-1 { color: yellow; }.a1-1 .a14 > a:active { color: yellow; float: left; margin-left: 40px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a14 > a { color: yellow; }"
        ],
        [
          "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
          "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n.a1-1 .a19 > a:active {\ncolor: orange;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\ncolor: yellow;\n}\n\n.a1-1 .a19 {\ncolor: white;\n}\n\n.a1-1 {\ncolor: yellow;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a:active { color: orange; float: left; margin-left: 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a19 { color: white; }.a1-1 { color: yellow; }",
          "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n.a1-1 .a19 > a:active {\ncolor: orange;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\ncolor: yellow;\n}\n\n.a1-1 .a19 {\ncolor: white;\n}\n\n.a1-1 {\ncolor: yellow;\n}\n\n.a1-1 .a14 > a:active {\ncolor: yellow;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n.a1-1 .a14 > a {\ncolor: yellow;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a:active { color: orange; float: left; margin-left: 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a19 { color: white; }.a1-1 { color: yellow; }.a1-1 .a14 > a:active { color: yellow; float: left; margin-left: 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a14 > a { color: yellow; }"
        ],
        [
          "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n",
          ".a-0 { background-color: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
          "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n.a1-1 .a19 > a:active {\ncolor: orange;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\ncolor: yellow;\n}\n\n.a1-1 .a19 {\ncolor: white;\n}\n\n.a1-1 {\ncolor: yellow;\n}\n\n",
          ".a-0 { background-color: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a:active { color: orange; float: left; margin-left: 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a19 { color: white; }.a1-1 { color: yellow; }",
          "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n.a1-1 .a19 > a:active {\ncolor: orange;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\ncolor: yellow;\n}\n\n.a1-1 .a19 {\ncolor: white;\n}\n\n.a1-1 {\ncolor: yellow;\n}\n\n.a1-1 .a14 > a:active {\ncolor: yellow;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n.a1-1 .a14 > a {\ncolor: yellow;\n}\n\n",
          ".a-0 { background-color: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a:active { color: orange; float: left; margin-left: 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a19 { color: white; }.a1-1 { color: yellow; }.a1-1 .a14 > a:active { color: yellow; float: left; margin-left: 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a14 > a { color: yellow; }"
        ]
      ]);

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

      const amauiStyle = new AmauiStyle.AmauiStyle();

      amauiStyle.plugins.add = [
        AmauiStyle.unit,
        AmauiStyle.sort,
        AmauiStyle.prefix,
        AmauiStyle.rtl,
      ];

      const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } } });

      const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } } });

      amauiStyleSheetManager.add();

      const response = [
        amauiStyleSheetManager.css,
      ];

      const a1 = {
        color: 'yellow',

        '& .a19': {
          color: 'white',

          '& > a': {
            color: 'yellow',

            '&:active': {
              color: 'orange',

              // rtl
              marginLeft: 40,
              float: 'left',

              // sort
              padding: 40,
              paddingLeft: 41,

              // prefixes
              position: 'sticky',
              transition: 'all .4s ease',
              maskOrigin: 'margin-box',
              maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
              maskPosition: '40% 74%',
            }
          }
        },
      };

      const amauiStyleRule = new AmauiStyle.AmauiStyleRule(
        a1,
        'a1',
        'regular',
        'property',
        false,
        1,
        amauiStyleSheet,
        [amauiStyleSheet],
        amauiStyleSheet,
        amauiStyle
      );

      amauiStyleRule.add();

      response.push(
        amauiStyleSheetManager.css
      );

      const a14 = {
        '& > a': {
          color: 'yellow',

          '&:active': {
            color: 'yellow',

            width: 100,

            // rtl
            marginLeft: 40,
            float: 'left',

            // sort
            padding: 40,
            paddingLeft: 41,

            // prefixes
            position: 'sticky',
            transition: 'all .4s ease',
            maskOrigin: 'margin-box',
            maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
            maskPosition: '40% 74%',
          }
        }
      };

      // Add property
      amauiStyleRule.addProperty('& .a14', a14);

      response.push(
        amauiStyleSheetManager.css
      );

      const valueNode = response;

      assert(valueNode).eql([
        "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n",
        "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n.a1-1 .a19 > a:active {\ncolor: orange;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\ncolor: yellow;\n}\n\n.a1-1 .a19 {\ncolor: white;\n}\n\n.a1-1 {\ncolor: yellow;\n}\n\n",
        "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n.a1-1 .a19 > a:active {\ncolor: orange;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\ncolor: yellow;\n}\n\n.a1-1 .a19 {\ncolor: white;\n}\n\n.a1-1 {\ncolor: yellow;\n}\n\n.a1-1 .a14 > a:active {\ncolor: yellow;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n.a1-1 .a14 > a {\ncolor: yellow;\n}\n\n"
      ]);
    });

    to('updateProps', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const a = {
          a7: {
            background: props => props.a === 1 ? 'yellow' : 'orange',
          }
        };

        const amauiStyle = new window.AmauiStyle.AmauiStyle();

        const amauiStyleSheetManager = new window.AmauiStyle.AmauiStyleSheetManager(a, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } } });

        amauiStyleSheetManager.add();

        const amauiStyleSheet = amauiStyleSheetManager.sheets.dynamic[0];

        const amauiStyleRule = amauiStyleSheet.rules[0].value;

        let css = '';

        Array.from(window.document.styleSheets).forEach((sheet: any) => {
          Array.from(sheet.cssRules).forEach((rule: any) => css += rule.cssText);
        });

        const response = [
          amauiStyleSheetManager.css,
          css
        ];

        amauiStyleSheet.props = { a: 1 };

        amauiStyleRule.updateProps();

        css = '';

        Array.from(window.document.styleSheets).forEach((sheet: any) => {
          Array.from(sheet.cssRules).forEach((rule: any) => css += rule.cssText);
        });

        response.push(
          amauiStyleSheetManager.css,
          css
        );

        return response;
      }, { browsers });

      const values = [...valueBrowsers];

      assert(values[0]).eql([
        "\n\n.a7-0 {\nbackground: orange;\n}\n\n",
        ".a7-0 { background: orange; }",
        "\n\n.a7-0 {\nbackground: yellow;\n}\n\n",
        ".a7-0 { background: yellow; }"
      ]);

      assert(values[1]).eql([
        "\n\n.a7-0 {\nbackground: orange;\n}\n\n",
        ".a7-0 { background: orange none repeat scroll 0% 0%; }",
        "\n\n.a7-0 {\nbackground: yellow;\n}\n\n",
        ".a7-0 { background: yellow none repeat scroll 0% 0%; }"
      ]);

      assert(values[2]).eql([
        "\n\n.a7-0 {\nbackground: orange;\n}\n\n",
        ".a7-0 { background-color: orange; }",
        "\n\n.a7-0 {\nbackground: yellow;\n}\n\n",
        ".a7-0 { background-color: yellow; }"
      ]);

      const a = {
        a7: {
          background: props => props.a === 1 ? 'yellow' : 'orange',
        }
      };

      const amauiStyle = new AmauiStyle.AmauiStyle();

      const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(a, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } } });

      amauiStyleSheetManager.add();

      const amauiStyleSheet = amauiStyleSheetManager.sheets.dynamic[0];

      const amauiStyleRule = amauiStyleSheet.rules[0].value;

      const response = [
        amauiStyleSheetManager.css
      ];

      amauiStyleSheet.props = { a: 1 };

      amauiStyleRule.updateProps();

      response.push(
        amauiStyleSheetManager.css
      );

      const valueNode = response;

      assert(valueNode).eql([
        "\n\n.a7-0 {\nbackground: orange;\n}\n\n",
        "\n\n.a7-0 {\nbackground: yellow;\n}\n\n"
      ]);
    });

    to('update', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const a = {
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

        const amauiStyle = new window.AmauiStyle.AmauiStyle();

        amauiStyle.plugins.add = [
          window.AmauiStyle.unit,
          window.AmauiStyle.sort,
          window.AmauiStyle.prefix,
          window.AmauiStyle.rtl,
        ];

        const amauiStyleSheetManager = new window.AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } } });

        const amauiStyleSheet = new window.AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, { style: { attributes: { method: 'style' } } });

        amauiStyleSheetManager.add();

        const amauiStyleRule = amauiStyleSheet.rules[0].value;

        let css = '';

        Array.from(window.document.styleSheets).forEach((sheet: any) => {
          Array.from(sheet.cssRules).forEach((rule: any) => css += rule.cssText);
        });

        const response = [
          amauiStyleSheetManager.css,
          css
        ];

        const a1 = {
          color: 'yellow',

          '& .a19': {
            color: 'white',

            '& > a': {
              color: 'yellow',

              '&:active': {
                color: 'orange',

                // rtl
                marginLeft: 40,
                float: 'left',

                // sort
                padding: 40,
                paddingLeft: 41,

                // prefixes
                position: 'sticky',
                transition: 'all .4s ease',
                maskOrigin: 'margin-box',
                maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
                maskPosition: '40% 74%',
              }
            }
          },
        };

        amauiStyleRule.update(a1);

        css = '';

        Array.from(window.document.styleSheets).forEach((sheet: any) => {
          Array.from(sheet.cssRules).forEach((rule: any) => css += rule.cssText);
        });

        response.push(
          amauiStyleSheetManager.css,
          css
        );

        return response;
      }, { browsers });

      const values = [...valueBrowsers];

      assert(values).eql([
        [
          "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
          "\n\n.a-0 {\ncolor: yellow;\n}\n\n.a-0 .a19 > a:active {\ncolor: orange;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\n}\n\n.a-0 .a19 > a {\ncolor: yellow;\n}\n\n.a-0 .a19 {\ncolor: white;\n}\n\n",
          ".a-0 { color: yellow; }.a-0 .a19 > a:active { color: orange; float: left; margin-left: 40px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a-0 .a19 > a { color: yellow; }.a-0 .a19 { color: white; }"
        ],
        [
          "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
          "\n\n.a-0 {\ncolor: yellow;\n}\n\n.a-0 .a19 > a:active {\ncolor: orange;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\n}\n\n.a-0 .a19 > a {\ncolor: yellow;\n}\n\n.a-0 .a19 {\ncolor: white;\n}\n\n",
          ".a-0 { color: yellow; }.a-0 .a19 > a:active { color: orange; float: left; margin-left: 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a-0 .a19 > a { color: yellow; }.a-0 .a19 { color: white; }"
        ],
        [
          "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n",
          ".a-0 { background-color: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
          "\n\n.a-0 {\ncolor: yellow;\n}\n\n.a-0 .a19 > a:active {\ncolor: orange;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\n}\n\n.a-0 .a19 > a {\ncolor: yellow;\n}\n\n.a-0 .a19 {\ncolor: white;\n}\n\n",
          ".a-0 { color: yellow; }.a-0 .a19 > a:active { color: orange; float: left; margin-left: 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a-0 .a19 > a { color: yellow; }.a-0 .a19 { color: white; }"
        ]
      ]);

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

      const amauiStyle = new AmauiStyle.AmauiStyle();

      amauiStyle.plugins.add = [
        AmauiStyle.unit,
        AmauiStyle.sort,
        AmauiStyle.prefix,
        AmauiStyle.rtl,
      ];

      const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } } });

      const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, { style: { attributes: { method: 'style' } } });

      amauiStyleSheetManager.add();

      const amauiStyleRule = amauiStyleSheet.rules[0].value;

      const response = [
        amauiStyleSheetManager.css
      ];

      const a1 = {
        color: 'yellow',

        '& .a19': {
          color: 'white',

          '& > a': {
            color: 'yellow',

            '&:active': {
              color: 'orange',

              // rtl
              marginLeft: 40,
              float: 'left',

              // sort
              padding: 40,
              paddingLeft: 41,

              // prefixes
              position: 'sticky',
              transition: 'all .4s ease',
              maskOrigin: 'margin-box',
              maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
              maskPosition: '40% 74%',
            }
          }
        },
      };

      amauiStyleRule.update(a1);

      response.push(
        amauiStyleSheetManager.css
      );

      const valueNode = response;

      assert(valueNode).eql([
        "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n",
        "\n\n.a-0 {\ncolor: yellow;\n}\n\n.a-0 .a19 > a:active {\ncolor: orange;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\n}\n\n.a-0 .a19 > a {\ncolor: yellow;\n}\n\n.a-0 .a19 {\ncolor: white;\n}\n\n"
      ]);
    });

    to('remove', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const a = {
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

        const amauiStyle = new window.AmauiStyle.AmauiStyle();

        amauiStyle.plugins.add = [
          window.AmauiStyle.unit,
          window.AmauiStyle.sort,
          window.AmauiStyle.prefix,
          window.AmauiStyle.rtl,
        ];

        const amauiStyleSheetManager = new window.AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } } });

        const amauiStyleSheet = new window.AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, { style: { attributes: { method: 'style' } } });

        amauiStyleSheetManager.add();

        let css = '';

        Array.from(window.document.styleSheets).forEach((sheet: any) => {
          Array.from(sheet.cssRules).forEach((rule: any) => css += rule.cssText);
        });

        const response = [
          amauiStyleSheetManager.css,
          css
        ];

        const a1 = {
          color: 'yellow',

          '& .a19': {
            color: 'white',

            '& > a': {
              color: 'yellow',

              '&:active': {
                color: 'orange',

                // rtl
                marginLeft: 40,
                float: 'left',

                // sort
                padding: 40,
                paddingLeft: 41,

                // prefixes
                position: 'sticky',
                transition: 'all .4s ease',
                maskOrigin: 'margin-box',
                maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
                maskPosition: '40% 74%',
              }
            }
          },
        };

        const amauiStyleRule = new window.AmauiStyle.AmauiStyleRule(
          a1,
          'a1',
          'regular',
          'property',
          false,
          1,
          amauiStyleSheet,
          [amauiStyleSheet],
          amauiStyleSheet,
          amauiStyle
        );

        amauiStyleRule.add();

        css = '';

        Array.from(window.document.styleSheets).forEach((sheet: any) => {
          Array.from(sheet.cssRules).forEach((rule: any) => css += rule.cssText);
        });

        response.push(
          amauiStyleSheetManager.css,
          css
        );

        const a14 = {
          '& > a': {
            color: 'yellow',

            '&:active': {
              color: 'yellow',

              width: 100,

              // rtl
              marginLeft: 40,
              float: 'left',

              // sort
              padding: 40,
              paddingLeft: 41,

              // prefixes
              position: 'sticky',
              transition: 'all .4s ease',
              maskOrigin: 'margin-box',
              maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
              maskPosition: '40% 74%',
            }
          }
        };

        // Add property
        amauiStyleRule.addProperty('& .a14', a14);

        css = '';

        Array.from(window.document.styleSheets).forEach((sheet: any) => {
          Array.from(sheet.cssRules).forEach((rule: any) => css += rule.cssText);
        });

        response.push(
          amauiStyleSheetManager.css,
          css
        );

        // remove
        amauiStyleRule.remove();

        css = '';

        Array.from(window.document.styleSheets).forEach((sheet: any) => {
          Array.from(sheet.cssRules).forEach((rule: any) => css += rule.cssText);
        });

        response.push(
          amauiStyleSheetManager.css,
          css
        );

        return response;
      }, { browsers });

      const values = [...valueBrowsers];

      assert(values).eql([
        [
          "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
          "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n.a1-1 .a19 > a:active {\ncolor: orange;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\ncolor: yellow;\n}\n\n.a1-1 .a19 {\ncolor: white;\n}\n\n.a1-1 {\ncolor: yellow;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a:active { color: orange; float: left; margin-left: 40px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a19 { color: white; }.a1-1 { color: yellow; }",
          "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n.a1-1 .a19 > a:active {\ncolor: orange;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\ncolor: yellow;\n}\n\n.a1-1 .a19 {\ncolor: white;\n}\n\n.a1-1 {\ncolor: yellow;\n}\n\n.a1-1 .a14 > a:active {\ncolor: yellow;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n.a1-1 .a14 > a {\ncolor: yellow;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a:active { color: orange; float: left; margin-left: 40px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a19 { color: white; }.a1-1 { color: yellow; }.a1-1 .a14 > a:active { color: yellow; float: left; margin-left: 40px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a14 > a { color: yellow; }",
          "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a14 > a { color: yellow; }"
        ],
        [
          "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
          "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n.a1-1 .a19 > a:active {\ncolor: orange;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\ncolor: yellow;\n}\n\n.a1-1 .a19 {\ncolor: white;\n}\n\n.a1-1 {\ncolor: yellow;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a:active { color: orange; float: left; margin-left: 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a19 { color: white; }.a1-1 { color: yellow; }",
          "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n.a1-1 .a19 > a:active {\ncolor: orange;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\ncolor: yellow;\n}\n\n.a1-1 .a19 {\ncolor: white;\n}\n\n.a1-1 {\ncolor: yellow;\n}\n\n.a1-1 .a14 > a:active {\ncolor: yellow;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n.a1-1 .a14 > a {\ncolor: yellow;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a:active { color: orange; float: left; margin-left: 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a19 { color: white; }.a1-1 { color: yellow; }.a1-1 .a14 > a:active { color: yellow; float: left; margin-left: 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a14 > a { color: yellow; }",
          "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a14 > a { color: yellow; }"
        ],
        [
          "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n",
          ".a-0 { background-color: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
          "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n.a1-1 .a19 > a:active {\ncolor: orange;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\ncolor: yellow;\n}\n\n.a1-1 .a19 {\ncolor: white;\n}\n\n.a1-1 {\ncolor: yellow;\n}\n\n",
          ".a-0 { background-color: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a:active { color: orange; float: left; margin-left: 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a19 { color: white; }.a1-1 { color: yellow; }",
          "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n.a1-1 .a19 > a:active {\ncolor: orange;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\ncolor: yellow;\n}\n\n.a1-1 .a19 {\ncolor: white;\n}\n\n.a1-1 {\ncolor: yellow;\n}\n\n.a1-1 .a14 > a:active {\ncolor: yellow;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n.a1-1 .a14 > a {\ncolor: yellow;\n}\n\n",
          ".a-0 { background-color: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a:active { color: orange; float: left; margin-left: 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a19 { color: white; }.a1-1 { color: yellow; }.a1-1 .a14 > a:active { color: yellow; float: left; margin-left: 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a14 > a { color: yellow; }",
          "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n",
          ".a-0 { background-color: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a14 > a { color: yellow; }"
        ]
      ]);

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

      const amauiStyle = new AmauiStyle.AmauiStyle();

      amauiStyle.plugins.add = [
        AmauiStyle.unit,
        AmauiStyle.sort,
        AmauiStyle.prefix,
        AmauiStyle.rtl,
      ];

      const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } } });

      const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } } });

      amauiStyleSheetManager.add();

      const response = [
        amauiStyleSheetManager.css,
      ];

      const a1 = {
        color: 'yellow',

        '& .a19': {
          color: 'white',

          '& > a': {
            color: 'yellow',

            '&:active': {
              color: 'orange',

              // rtl
              marginLeft: 40,
              float: 'left',

              // sort
              padding: 40,
              paddingLeft: 41,

              // prefixes
              position: 'sticky',
              transition: 'all .4s ease',
              maskOrigin: 'margin-box',
              maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
              maskPosition: '40% 74%',
            }
          }
        },
      };

      const amauiStyleRule = new AmauiStyle.AmauiStyleRule(
        a1,
        'a1',
        'regular',
        'property',
        false,
        1,
        amauiStyleSheet,
        [amauiStyleSheet],
        amauiStyleSheet,
        amauiStyle
      );

      amauiStyleRule.add();

      response.push(
        amauiStyleSheetManager.css
      );

      const a14 = {
        '& > a': {
          color: 'yellow',

          '&:active': {
            color: 'yellow',

            width: 100,

            // rtl
            marginLeft: 40,
            float: 'left',

            // sort
            padding: 40,
            paddingLeft: 41,

            // prefixes
            position: 'sticky',
            transition: 'all .4s ease',
            maskOrigin: 'margin-box',
            maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
            maskPosition: '40% 74%',
          }
        }
      };

      // Add property
      amauiStyleRule.addProperty('& .a14', a14);

      response.push(
        amauiStyleSheetManager.css
      );

      // remove
      amauiStyleRule.remove();

      response.push(
        amauiStyleSheetManager.css
      );

      const valueNode = response;

      assert(valueNode).eql([
        "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n",
        "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n.a1-1 .a19 > a:active {\ncolor: orange;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\ncolor: yellow;\n}\n\n.a1-1 .a19 {\ncolor: white;\n}\n\n.a1-1 {\ncolor: yellow;\n}\n\n",
        "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n.a1-1 .a19 > a:active {\ncolor: orange;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\ncolor: yellow;\n}\n\n.a1-1 .a19 {\ncolor: white;\n}\n\n.a1-1 {\ncolor: yellow;\n}\n\n.a1-1 .a14 > a:active {\ncolor: yellow;\nfloat: left;\nmargin-left: 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: margin-box;\nmask-position: 40% 74%;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n.a1-1 .a14 > a {\ncolor: yellow;\n}\n\n",
        "\n\n.a-0 {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n"
      ]);
    });

  });

});
