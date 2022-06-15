/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';
import * as AmauiUtils from '@amaui/utils';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers } from '../utils/js/test/utils';

import * as AmauiStyle from '../src';
import { methods, makeName, TValue, TValueObject } from '../src';
import { counter } from '../src/amaui-style-rule';

group('@amaui/style/amaui-style-sheet', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => await closeBrowsers(browsers));

  preEveryTo(async () => {
    // Counter
    counter.className = 0;
    counter.keyframesName = 0;

    methods.makeName = makeName();

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

  to('amauiStyleSheet', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const amauiStyle = new window.AmauiStyle.AmauiStyle();

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

      const amauiStyleSheetManager = new window.AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const amauiStyleSheet = new window.AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      return [
        typeof amauiStyleSheet.id === 'string',
        amauiStyleSheet.variant === 'static',
        amauiStyleSheet.mode === 'regular',
        amauiStyleSheet.status === 'inited',
        amauiStyleSheet.priority === 'upper',
        window.AmauiUtils.equalDeep(amauiStyleSheet.names.classNames, { a: 'a-0' }),
        window.AmauiUtils.equalDeep(amauiStyleSheet.names.classes, { a: 'a-0' }),
        window.AmauiUtils.equalDeep(amauiStyleSheet.options, {
          "style": {
            "attributes": {
              "method": "style"
            }
          },
          "rule": {
            "sort": true,
            "prefix": false,
            "rtl": true
          }
        }),
        !amauiStyleSheet.amauiTheme,
        !!amauiStyleSheet.amauiStyleSheetManager,
        !!amauiStyleSheet.amauiStyle,
        !amauiStyleSheet.pure,
        amauiStyleSheet.rules.length === 1,
        window.AmauiUtils.equalDeep({ css: amauiStyleSheet.values.css, json: amauiStyleSheet.values.json }, {
          "css": "\n.a-0 {\nwidth: 100;\nmax-width: 100;\nbackground: #faa;\nmargin: 0 14px 4px 40px;\nmargin-left: 41;\nfloat: left;\npadding-left: 41;\npadding: 40;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\n}\n",
          "json": {
            ".a-0": {
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
        })
      ];
    }, { browsers });

    const amauiStyle = new AmauiStyle.AmauiStyle();

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

    const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const valueNode = [
      typeof amauiStyleSheet.id === 'string',
      amauiStyleSheet.variant === 'static',
      amauiStyleSheet.mode === 'regular',
      amauiStyleSheet.status === 'inited',
      amauiStyleSheet.priority === 'upper',
      AmauiUtils.equalDeep(amauiStyleSheet.names.classNames, { a: 'a-0' }),
      AmauiUtils.equalDeep(amauiStyleSheet.names.classes, { a: 'a-0' }),
      AmauiUtils.equalDeep(amauiStyleSheet.options, {
        "style": {
          "attributes": {
            "method": "style"
          }
        },
        "rule": {
          "sort": true,
          "prefix": false,
          "rtl": true
        }
      }),
      !amauiStyleSheet.amauiTheme,
      !!amauiStyleSheet.amauiStyleSheetManager,
      !!amauiStyleSheet.amauiStyle,
      !amauiStyleSheet.pure,
      amauiStyleSheet.rules.length === 1,
      AmauiUtils.equalDeep({ css: amauiStyleSheet.values.css, json: amauiStyleSheet.values.json }, {
        "css": "\n.a-0 {\nwidth: 100;\nmax-width: 100;\nbackground: #faa;\nmargin: 0 14px 4px 40px;\nmargin-left: 41;\nfloat: left;\npadding-left: 41;\npadding: 40;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\n}\n",
        "json": {
          ".a-0": {
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
      })
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql(new Array(14).fill(true)));
  });

  group('mode', () => {

    to('regular', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const amauiStyle = new window.AmauiStyle.AmauiStyle();

        const a: TValueObject = {
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

        const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const response = [];

        amauiStyleSheet.add();

        response.push(
          amauiStyleSheet.css,
        );

        return response;
      }, { browsers });

      const amauiStyle = new AmauiStyle.AmauiStyle();

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

      const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      amauiStyleSheet.add();

      const valueNode = [
        amauiStyleSheet.css,
      ];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        '\n.a-0 {\nwidth: 100;\nmax-width: 100;\nbackground: #faa;\nmargin: 0 14px 4px 40px;\nmargin-left: 41;\nfloat: left;\npadding-left: 41;\npadding: 40;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\n}\n',
      ]));
    });

    to('atomic', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const amauiStyle = new window.AmauiStyle.AmauiStyle();

        const a: TValueObject = {
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

        const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'atomic', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'atomic', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const response = [];

        amauiStyleSheet.add();

        response.push(
          amauiStyleSheet.css,
        );

        return response;
      }, { browsers });

      const amauiStyle = new AmauiStyle.AmauiStyle();

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

      const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'atomic', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'atomic', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      amauiStyleSheet.add();

      const valueNode = [
        amauiStyleSheet.css,
      ];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        '\n.aa-0 {\nwidth: 100;\n}\n\n.ab-1 {\nmax-width: 100;\n}\n\n.ac-2 {\nbackground: #faa;\n}\n\n.ad-3 {\nmargin: 0 14px 4px 40px;\n}\n\n.ae-4 {\nmargin-left: 41;\n}\n\n.af-5 {\nfloat: left;\n}\n\n.ag-6 {\npadding-left: 41;\n}\n\n.ah-7 {\npadding: 40;\n}\n\n.ai-8 {\nposition: sticky;\n}\n\n.aj-9 {\ntransition: all .4s ease;\n}\n\n.ak-10 {\nmask-origin: inherit;\n}\n\n.al-11 {\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n}\n\n.am-12 {\nmask-position: 40% 74%;\n}\n',
      ]));
    });

  });

  to('names', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const amauiStyle = new window.AmauiStyle.AmauiStyle();

      const a: TValueObject = {
        '@keyframes a': {
          '0%': {
            color: 'white',
          },
          '40%': {
            color: 'yellow',
          },
        },

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

        a4: {
          color: 'yellow',
        },
      };

      const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      return [
        amauiStyleSheet.names.classNames,
        amauiStyleSheet.names.classes,
        amauiStyleSheet.names.keyframes,
        amauiStyleSheet.names.styles('a', 'a4'),
      ];
    }, { browsers });

    const amauiStyle = new AmauiStyle.AmauiStyle();

    const a: TValue = {
      '@keyframes a': {
        '0%': {
          color: 'white',
        },
        '40%': {
          color: 'yellow',
        },
      },

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

      a4: {
        color: 'yellow',
      },
    };

    const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const valueNode = [
      amauiStyleSheet.names.classNames,
      amauiStyleSheet.names.classes,
      amauiStyleSheet.names.keyframes,
      amauiStyleSheet.names.styles('a', 'a4'),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      {
        "a": "a-0",
        "a4": "a4-1"
      },
      {
        "a": "a-0",
        "a4": "a4-1"
      },
      {
        "a": "a-0"
      },
      "a-0 a4-1"
    ]));
  });

  to('props', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const amauiStyle = new window.AmauiStyle.AmauiStyle();

      const a = {
        a7: {
          // Function
          background: props => props.a === 1 ? 'yellow' : 'orange',
        },
      };

      const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'dynamic', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      amauiStyleSheet.add();

      const response = [
        amauiStyleSheet.rules[0].value.rules[0].value.values.value,
      ];

      amauiStyleSheet.props = { a: 1 };

      response.push(
        amauiStyleSheet.rules[0].value.rules[0].value.values.value,
        window.AmauiUtils.equalDeep(amauiStyleSheet.props, { a: 1 })
      );

      return response;
    }, { browsers });

    const amauiStyle = new AmauiStyle.AmauiStyle();

    const a: TValue = {
      a7: {
        // Function
        background: props => props.a === 1 ? 'yellow' : 'orange',
      },
    };

    const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'dynamic', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    amauiStyleSheet.add();

    const response = [
      amauiStyleSheet.rules[0].value.rules[0].value.values.value,
    ];

    amauiStyleSheet.props = { a: 1 };

    response.push(
      amauiStyleSheet.rules[0].value.rules[0].value.values.value,
      AmauiUtils.equalDeep(amauiStyleSheet.props, { a: 1 })
    );

    const valueNode = response;

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'orange',
      'yellow',
      true,
    ]));
  });

  to('values', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const amauiStyle = new window.AmauiStyle.AmauiStyle();

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

      const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      return [AmauiUtils.equalDeep(amauiStyleSheet.values, amauiStyleSheet.response), amauiStyleSheet.values];
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

    const valueNode = [AmauiUtils.equalDeep(amauiStyleSheet.values, amauiStyleSheet.response), amauiStyleSheet.values];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      true,
      {
        "css": "\n.a-0 {\nwidth: 100;\nmax-width: 100;\nbackground: #faa;\nmargin: 0 14px 4px 40px;\nmargin-left: 41;\nfloat: left;\npadding-left: 41;\npadding: 40;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\n}\n",
        "json": {
          ".a-0": {
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
      }
    ]));
  });

  group('response', () => {

    to('response', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const amauiStyle = new window.AmauiStyle.AmauiStyle();

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

        const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        return [AmauiUtils.equalDeep(amauiStyleSheet.values, amauiStyleSheet.response), amauiStyleSheet.response];
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

      const valueNode = [AmauiUtils.equalDeep(amauiStyleSheet.values, amauiStyleSheet.response), amauiStyleSheet.response];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        true,
        {
          "css": "\n.a-0 {\nwidth: 100;\nmax-width: 100;\nbackground: #faa;\nmargin: 0 14px 4px 40px;\nmargin-left: 41;\nfloat: left;\npadding-left: 41;\npadding: 40;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\n}\n",
          "json": {
            ".a-0": {
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
        }
      ]));
    });

    to('css', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const amauiStyle = new window.AmauiStyle.AmauiStyle();

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

        const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        return [AmauiUtils.equalDeep(amauiStyleSheet.values.css, amauiStyleSheet.css), amauiStyleSheet.css];
      }, { browsers });

      const amauiStyle = new AmauiStyle.AmauiStyle();

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

      const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const valueNode = [AmauiUtils.equalDeep(amauiStyleSheet.values.css, amauiStyleSheet.css), amauiStyleSheet.css];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        true,
        "\n.a-0 {\nwidth: 100;\nmax-width: 100;\nbackground: #faa;\nmargin: 0 14px 4px 40px;\nmargin-left: 41;\nfloat: left;\npadding-left: 41;\npadding: 40;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\n}\n"
      ]));
    });

    to('json', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const amauiStyle = new window.AmauiStyle.AmauiStyle();

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

        const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        return [AmauiUtils.equalDeep(amauiStyleSheet.values.json, amauiStyleSheet.json), amauiStyleSheet.json];
      }, { browsers });

      const amauiStyle = new AmauiStyle.AmauiStyle();

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

      const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const valueNode = [AmauiUtils.equalDeep(amauiStyleSheet.values.json, amauiStyleSheet.json), amauiStyleSheet.json];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        true,
        {
          ".a-0": {
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
      ]));
    });

  });

  to('add', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const amauiStyle = new window.AmauiStyle.AmauiStyle();

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

      const amauiStyleSheetManager = new window.AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const amauiStyleSheet = new window.AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const response = [];

      const styleSheetsLength = window.document.styleSheets.length;

      amauiStyleSheet.add();

      response.push(
        amauiStyleSheet.status === 'active',
        amauiStyleSheet.element instanceof HTMLElement,
        amauiStyleSheet.sheet instanceof CSSStyleSheet,
        window.document.styleSheets.length === styleSheetsLength + 1
      );

      return response;
    }, { browsers });

    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql(new Array(4).fill(true)));

    const amauiStyle = new AmauiStyle.AmauiStyle();

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

    const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    amauiStyleSheet.add();

    const valueNode = [
      amauiStyleSheet.status === 'inited',
    ];

    assert(valueNode).eql(new Array(1).fill(true));
  });

  to('update', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const amauiStyle = new window.AmauiStyle.AmauiStyle();

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

      const amauiStyleSheetManager = new window.AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const amauiStyleSheet = new window.AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const response = [];

      amauiStyleSheet.add();

      response.push(
        amauiStyleSheet.status === 'active',
        amauiStyleSheet.css,
      );

      amauiStyleSheet.update({
        a: {
          color: 'yellow',

          width: '114px',
        },
      });

      response.push(
        amauiStyleSheet.css,
      );

      return response;
    }, { browsers });

    const amauiStyle = new AmauiStyle.AmauiStyle();

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

    const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const response = [];

    amauiStyleSheet.add();

    response.push(
      amauiStyleSheet.status === 'inited',
      amauiStyleSheet.css,
    );

    amauiStyleSheet.update({
      a: {
        color: 'yellow',

        width: '114px',
      },
    });

    response.push(
      amauiStyleSheet.css,
    );

    const valueNode = response;

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      true,
      '\n.a-0 {\nwidth: 100;\nmax-width: 100;\nbackground: #faa;\nmargin: 0 14px 4px 40px;\nmargin-left: 41;\nfloat: left;\npadding-left: 41;\npadding: 40;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\n}\n',
      '\n.a-0 {\ncolor: yellow;\nwidth: 114px;\n}\n',
    ]));
  });

  to('addRule', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const amauiStyle = new window.AmauiStyle.AmauiStyle();

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

      const amauiStyleSheetManager = new window.AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const amauiStyleSheet = new window.AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const response = [];

      amauiStyleSheet.add();

      response.push(
        amauiStyleSheet.status === 'active',
        amauiStyleSheet.rules.length,
        amauiStyleSheet.css,
      );

      amauiStyleSheet.addRule({
        color: 'yellow',

        width: '114px',
      }, 'a14');

      // Pure
      amauiStyleSheet.addRule({
        '@pure': true,

        color: 'yellow',

        width: '114px',
      }, 'meta');

      amauiStyleSheet.addRule({
        '@p': true,

        color: 'yellow',

        width: '114px',
      }, 'main');

      response.push(
        amauiStyleSheet.rules.length,
        amauiStyleSheet.css,
      );

      return response;
    }, { browsers });

    const amauiStyle = new AmauiStyle.AmauiStyle();

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

    const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const response = [];

    amauiStyleSheet.add();

    response.push(
      amauiStyleSheet.status === 'inited',
      amauiStyleSheet.rules.length,
      amauiStyleSheet.css,
    );

    amauiStyleSheet.addRule({
      color: 'yellow',

      width: '114px',
    }, 'a14');

    // Pure
    amauiStyleSheet.addRule({
      '@pure': true,

      color: 'yellow',

      width: '114px',
    }, 'meta');

    amauiStyleSheet.addRule({
      '@p': true,

      color: 'yellow',

      width: '114px',
    }, 'main');

    response.push(
      amauiStyleSheet.rules.length,
      amauiStyleSheet.css,
    );

    const valueNode = response;

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      true,
      1,
      "\n.a-0 {\nwidth: 100;\nmax-width: 100;\nbackground: #faa;\nmargin: 0 14px 4px 40px;\nmargin-left: 41;\nfloat: left;\npadding-left: 41;\npadding: 40;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\n}\n",
      4,
      "\n.a-0 {\nwidth: 100;\nmax-width: 100;\nbackground: #faa;\nmargin: 0 14px 4px 40px;\nmargin-left: 41;\nfloat: left;\npadding-left: 41;\npadding: 40;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\n}\n\n.a14-1 {\ncolor: yellow;\nwidth: 114px;\n}\n\nmeta {\ncolor: yellow;\nwidth: 114px;\n}\n\nmain {\ncolor: yellow;\nwidth: 114px;\n}\n"
    ]));
  });

  to('remove', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const amauiStyle = new window.AmauiStyle.AmauiStyle();

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

      const amauiStyleSheetManager = new window.AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const amauiStyleSheet = new window.AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const response = [];

      const styleSheetsLength = window.document.styleSheets.length;

      amauiStyleSheet.add();

      response.push(
        amauiStyleSheet.status === 'active',
        window.document.styleSheets.length === styleSheetsLength + 1
      );

      amauiStyleSheet.remove();

      response.push(
        amauiStyleSheet.status === 'idle',
        window.document.styleSheets.length === styleSheetsLength,
        amauiStyleSheet.element === undefined,
        amauiStyleSheet.sheet === undefined
      );

      return response;
    }, { browsers });

    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql(new Array(6).fill(true)));

    const amauiStyle = new AmauiStyle.AmauiStyle();

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

    const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    amauiStyleSheet.add();

    const response = [
      amauiStyleSheet.status === 'inited',
    ];

    amauiStyleSheet.remove();

    response.push(
      amauiStyleSheet.status === 'idle'
    );

    const valueNode = response;

    assert(valueNode).eql(new Array(2).fill(true));
  });

});
