/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';
import * as AmauiUtils from '@amaui/utils';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers } from '../utils/js/test/utils';

import * as AmauiStyle from '../src';
import { TValue } from '../src';
import { counter } from '../src/amaui-style-rule';

group('@amaui/style/amaui-style-sheet-manager', () => {
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

  to('amauiStyleSheetManager', async () => {
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

        a7: {
          // Function
          background: props => props.a === 1 ? 'yellow' : 'orange',
        },
      };

      const amauiStyleSheetManager = new window.AmauiStyle.AmauiStyleSheetManager(a, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      return [
        typeof amauiStyleSheetManager.id === 'string',
        amauiStyleSheetManager.mode === 'regular',
        amauiStyleSheetManager.status === 'inited',
        amauiStyleSheetManager.priority === 'upper',
        window.AmauiUtils.equalDeep(amauiStyleSheetManager.names.classNames, { a: 'a-0' }),
        window.AmauiUtils.equalDeep(amauiStyleSheetManager.names.classes, { a: 'a-0' }),
        window.AmauiUtils.equalDeep(amauiStyleSheetManager.options, {
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
        !!amauiStyleSheetManager.amauiStyle,
        !amauiStyleSheetManager.amauiTheme,
        amauiStyleSheetManager.properties.static.length === 1,
        amauiStyleSheetManager.properties.static[0].property === 'a',
        window.AmauiUtils.equalDeep(amauiStyleSheetManager.properties.static[0].value, {
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
        }),
        amauiStyleSheetManager.properties.dynamic.length === 1,
        amauiStyleSheetManager.properties.dynamic[0].property === 'a7',
        Object.keys(amauiStyleSheetManager.properties.dynamic[0].value).length === 1,
        window.AmauiUtils.is('function', amauiStyleSheetManager.properties.dynamic[0].value.background),
        !amauiStyleSheetManager.pure,
        amauiStyleSheetManager.sheets.static.length === 1,
        amauiStyleSheetManager.sheets.dynamic.length === 0,
        window.AmauiUtils.equalDeep(amauiStyleSheetManager.values, {
          "css": "\n\n.a-0 {\nwidth: 100;\nmax-width: 100;\nbackground: #faa;\nmargin: 0 14px 4px 40px;\nmargin-left: 41;\nfloat: left;\npadding-left: 41;\npadding: 40;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\n}\n\n",
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

      a7: {
        // Function
        background: props => props.a === 1 ? 'yellow' : 'orange',
      },
    };

    const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(a, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const valueNode = [
      typeof amauiStyleSheetManager.id === 'string',
      amauiStyleSheetManager.mode === 'regular',
      amauiStyleSheetManager.status === 'inited',
      amauiStyleSheetManager.priority === 'upper',
      AmauiUtils.equalDeep(amauiStyleSheetManager.names.classNames, { a: 'a-0' }),
      AmauiUtils.equalDeep(amauiStyleSheetManager.names.classes, { a: 'a-0' }),
      AmauiUtils.equalDeep(amauiStyleSheetManager.options, {
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
      !!amauiStyleSheetManager.amauiStyle,
      !amauiStyleSheetManager.amauiTheme,
      amauiStyleSheetManager.properties.static.length === 1,
      amauiStyleSheetManager.properties.static[0].property === 'a',
      AmauiUtils.equalDeep(amauiStyleSheetManager.properties.static[0].value, {
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
      }),
      amauiStyleSheetManager.properties.dynamic.length === 1,
      amauiStyleSheetManager.properties.dynamic[0].property === 'a7',
      Object.keys(amauiStyleSheetManager.properties.dynamic[0].value).length === 1,
      AmauiUtils.is('function', amauiStyleSheetManager.properties.dynamic[0].value.background),
      !amauiStyleSheetManager.pure,
      amauiStyleSheetManager.sheets.static.length === 1,
      amauiStyleSheetManager.sheets.dynamic.length === 0,
      AmauiUtils.equalDeep(amauiStyleSheetManager.values, {
        "css": "\n\n.a-0 {\nwidth: 100;\nmax-width: 100;\nbackground: #faa;\nmargin: 0 14px 4px 40px;\nmargin-left: 41;\nfloat: left;\npadding-left: 41;\npadding: 40;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\n}\n\n",
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

    values.forEach(value => assert(value).eql(new Array(20).fill(true)));
  });

  group('mode', () => {

    to('regular', async () => {
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

          a7: {
            color: 'yellow',

            // Function
            background: props => props.a === 1 ? 'yellow' : 'orange',
          },
        };

        const amauiStyleSheetManager = new window.AmauiStyle.AmauiStyleSheetManager(a, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const response = [];

        amauiStyleSheetManager.add();

        response.push(
          amauiStyleSheetManager.sheets.static[0].css,
          amauiStyleSheetManager.sheets.dynamic[0].css,
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

        a7: {
          color: 'yellow',

          // Function
          background: props => props.a === 1 ? 'yellow' : 'orange',
        },
      };

      const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(a, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      amauiStyleSheetManager.add();

      const valueNode = [
        amauiStyleSheetManager.sheets.static[0].css,
        amauiStyleSheetManager.sheets.dynamic[0].css,
      ];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        '\n.a-0 {\nwidth: 100;\nmax-width: 100;\nbackground: #faa;\nmargin: 0 14px 4px 40px;\nmargin-left: 41;\nfloat: left;\npadding-left: 41;\npadding: 40;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\n}\n',
        '\n.a7-1 {\ncolor: yellow;\nbackground: orange;\n}\n'
      ]));
    });

    to('atomic', async () => {
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

          a7: {
            color: 'yellow',

            // Function
            background: props => props.a === 1 ? 'yellow' : 'orange',
          },
        };

        const amauiStyleSheetManager = new window.AmauiStyle.AmauiStyleSheetManager(a, 'atomic', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const response = [];

        amauiStyleSheetManager.add();

        response.push(
          amauiStyleSheetManager.sheets.static[0].css,
          amauiStyleSheetManager.sheets.dynamic[0].css,
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

        a7: {
          color: 'yellow',

          // Function
          background: props => props.a === 1 ? 'yellow' : 'orange',
        },
      };

      const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(a, 'atomic', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      amauiStyleSheetManager.add();

      const valueNode = [
        amauiStyleSheetManager.sheets.static[0].css,
        amauiStyleSheetManager.sheets.dynamic[0].css,
      ];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        '\n.aa-0 {\nwidth: 100;\n}\n\n.ab-1 {\nmax-width: 100;\n}\n\n.ac-2 {\nbackground: #faa;\n}\n\n.ad-3 {\nmargin: 0 14px 4px 40px;\n}\n\n.ae-4 {\nmargin-left: 41;\n}\n\n.af-5 {\nfloat: left;\n}\n\n.ag-6 {\npadding-left: 41;\n}\n\n.ah-7 {\npadding: 40;\n}\n\n.ai-8 {\nposition: sticky;\n}\n\n.aj-9 {\ntransition: all .4s ease;\n}\n\n.ak-10 {\nmask-origin: inherit;\n}\n\n.al-11 {\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n}\n\n.am-12 {\nmask-position: 40% 74%;\n}\n',
        '\n.a7-17 {\n}\n\n.ao-15 {\ncolor: yellow;\n}\n\n.ap-16 {\nbackground: orange;\n}\n'
      ]));
    });

  });

  to('names', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const amauiStyle = new window.AmauiStyle.AmauiStyle();

      const a = {
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

        a7: {
          // Function
          background: props => props.a === 1 ? 'yellow' : 'orange',
        },
      };

      const amauiStyleSheetManager = new window.AmauiStyle.AmauiStyleSheetManager(a, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      return [
        amauiStyleSheetManager.names.classNames,
        amauiStyleSheetManager.names.classes,
        amauiStyleSheetManager.names.keyframes,
        amauiStyleSheetManager.names.styles('a', 'a4'),
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

      a7: {
        // Function
        background: props => props.a === 1 ? 'yellow' : 'orange',
      },
    };

    const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(a, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const valueNode = [
      amauiStyleSheetManager.names.classNames,
      amauiStyleSheetManager.names.classes,
      amauiStyleSheetManager.names.keyframes,
      amauiStyleSheetManager.names.styles('a', 'a4'),
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

  to('ids', async () => {
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

        a7: {
          // Function
          background: props => props.a === 1 ? 'yellow' : 'orange',
        },
      };

      const amauiStyleSheetManager = new window.AmauiStyle.AmauiStyleSheetManager(a, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      amauiStyleSheetManager.add();

      const ids = amauiStyleSheetManager.ids;

      return [
        ids.static.length === 1,
        ids.dynamic.length === 1,
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

      a7: {
        // Function
        background: props => props.a === 1 ? 'yellow' : 'orange',
      },
    };

    const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(a, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    amauiStyleSheetManager.add();

    const ids = amauiStyleSheetManager.ids;

    const valueNode = [
      ids.static.length === 1,
      ids.dynamic.length === 1,
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql(new Array(2).fill(true)));
  });

  to('props', async () => {
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

        a7: {
          // Function
          background: props => props.a === 1 ? 'yellow' : 'orange',
        },
      };

      const amauiStyleSheetManager = new window.AmauiStyle.AmauiStyleSheetManager(a, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      amauiStyleSheetManager.add();

      const ids = amauiStyleSheetManager.ids;

      const response = [
        amauiStyleSheetManager.sheets.dynamic[0].rules[0].value.rules[0].value.values.value,
      ];

      amauiStyleSheetManager.props = { ids: ids.dynamic, props: { a: 1 } };

      response.push(
        amauiStyleSheetManager.sheets.dynamic[0].rules[0].value.rules[0].value.values.value,
        window.AmauiUtils.equalDeep(amauiStyleSheetManager.sheets.dynamic[0].props, { a: 1 })
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

      a7: {
        // Function
        background: props => props.a === 1 ? 'yellow' : 'orange',
      },
    };

    const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(a, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    amauiStyleSheetManager.add();

    const ids = amauiStyleSheetManager.ids;

    const response = [
      amauiStyleSheetManager.sheets.dynamic[0].rules[0].value.rules[0].value.values.value,
    ];

    amauiStyleSheetManager.props = { ids: ids.dynamic, props: { a: 1 } };

    response.push(
      amauiStyleSheetManager.sheets.dynamic[0].rules[0].value.rules[0].value.values.value,
      AmauiUtils.equalDeep(amauiStyleSheetManager.sheets.dynamic[0].props, { a: 1 })
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

        a7: {
          // Function
          background: props => props.a === 1 ? 'yellow' : 'orange',
        },
      };

      const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(a, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      return [AmauiUtils.equalDeep(amauiStyleSheetManager.values, amauiStyleSheetManager.response), amauiStyleSheetManager.values];
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

      a7: {
        // Function
        background: props => props.a === 1 ? 'yellow' : 'orange',
      },
    };

    const amauiStyle = new AmauiStyle.AmauiStyle();

    const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(a, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const valueNode = [AmauiUtils.equalDeep(amauiStyleSheetManager.values, amauiStyleSheetManager.response), amauiStyleSheetManager.values];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      true,
      {
        "css": "\n\n.a-0 {\nwidth: 100;\nmax-width: 100;\nbackground: #faa;\nmargin: 0 14px 4px 40px;\nmargin-left: 41;\nfloat: left;\npadding-left: 41;\npadding: 40;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\n}\n\n",
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

          a7: {
            // Function
            background: props => props.a === 1 ? 'yellow' : 'orange',
          },
        };

        const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(a, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        return [AmauiUtils.equalDeep(amauiStyleSheetManager.values, amauiStyleSheetManager.response), amauiStyleSheetManager.response];
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

        a7: {
          // Function
          background: props => props.a === 1 ? 'yellow' : 'orange',
        },
      };

      const amauiStyle = new AmauiStyle.AmauiStyle();

      const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(a, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const valueNode = [AmauiUtils.equalDeep(amauiStyleSheetManager.values, amauiStyleSheetManager.response), amauiStyleSheetManager.response];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        true,
        {
          "css": "\n\n.a-0 {\nwidth: 100;\nmax-width: 100;\nbackground: #faa;\nmargin: 0 14px 4px 40px;\nmargin-left: 41;\nfloat: left;\npadding-left: 41;\npadding: 40;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\n}\n\n",
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

          a7: {
            // Function
            background: props => props.a === 1 ? 'yellow' : 'orange',
          },
        };

        const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(a, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        return [AmauiUtils.equalDeep(amauiStyleSheetManager.values.css, amauiStyleSheetManager.css), amauiStyleSheetManager.css];
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

        a7: {
          // Function
          background: props => props.a === 1 ? 'yellow' : 'orange',
        },
      };

      const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(a, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const valueNode = [AmauiUtils.equalDeep(amauiStyleSheetManager.values.css, amauiStyleSheetManager.css), amauiStyleSheetManager.css];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        true,
        "\n\n.a-0 {\nwidth: 100;\nmax-width: 100;\nbackground: #faa;\nmargin: 0 14px 4px 40px;\nmargin-left: 41;\nfloat: left;\npadding-left: 41;\npadding: 40;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\n}\n\n"
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

          a7: {
            // Function
            background: props => props.a === 1 ? 'yellow' : 'orange',
          },
        };

        const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(a, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        return [AmauiUtils.equalDeep(amauiStyleSheetManager.values.json, amauiStyleSheetManager.json), amauiStyleSheetManager.json];
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

        a7: {
          // Function
          background: props => props.a === 1 ? 'yellow' : 'orange',
        },
      };

      const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(a, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const valueNode = [AmauiUtils.equalDeep(amauiStyleSheetManager.values.json, amauiStyleSheetManager.json), amauiStyleSheetManager.json];

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

        a7: {
          // Function
          background: props => props.a === 1 ? 'yellow' : 'orange',
        },
      };

      const amauiStyleSheetManager = new window.AmauiStyle.AmauiStyleSheetManager(a, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const response = [];

      const styleSheetsLength = window.document.styleSheets.length;

      amauiStyleSheetManager.add();

      response.push(
        amauiStyleSheetManager.status === 'active',
        amauiStyleSheetManager.sheets.static.length === 1,
        amauiStyleSheetManager.sheets.dynamic.length === 1,
        amauiStyleSheetManager.sheets.static[0].status === 'active',
        amauiStyleSheetManager.sheets.dynamic[0].status === 'active',
        window.document.styleSheets.length === styleSheetsLength + 2
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

      a7: {
        // Function
        background: props => props.a === 1 ? 'yellow' : 'orange',
      },
    };

    const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(a, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    amauiStyleSheetManager.add();

    const valueNode = [
      amauiStyleSheetManager.sheets.static.length === 1,
      amauiStyleSheetManager.sheets.dynamic.length === 1,
      amauiStyleSheetManager.sheets.static[0].status === 'inited',
      amauiStyleSheetManager.sheets.dynamic[0].status === 'inited',
    ];

    assert(valueNode).eql(new Array(4).fill(true));
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

        a1: {
          width: '1114px',
        },

        a2: {
          width: props => props.a === 1 ? '114px' : '1114px'
        },

        a7: {
          color: 'orange',
          width: '114px',

          // Function
          background: props => props.a === 1 ? 'yellow' : 'orange',
        },
      };

      const amauiStyleSheetManager = new window.AmauiStyle.AmauiStyleSheetManager(a, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const response = [];

      amauiStyleSheetManager.add();

      response.push(
        amauiStyleSheetManager.status === 'active',
        amauiStyleSheetManager.sheets.static[0].css,
        amauiStyleSheetManager.sheets.dynamic[0].css,
      );

      const updateResponse = amauiStyleSheetManager.update({
        a: {
          color: 'yellow',

          width: '114px',
        },

        a3: {
          color: 'yellow',

          width: '114px',
        },

        a4: {
          color: 'beige',

          width: props => props.a === 1 ? '114px' : '1114px'
        },

        a7: {
          color: 'yellow',

          // Function
          background: props => props.a === 1 ? 'yellow' : 'orange',

          'max-width': '114px',
        },
      });

      delete updateResponse.ids;
      delete updateResponse.styles;

      response.push(
        amauiStyleSheetManager.sheets.static[0].css,
        amauiStyleSheetManager.sheets.dynamic[0].css,
        updateResponse
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

      a1: {
        width: '1114px',
      },

      a2: {
        width: props => props.a === 1 ? '114px' : '1114px'
      },

      a7: {
        color: 'orange',
        width: '114px',

        // Function
        background: props => props.a === 1 ? 'yellow' : 'orange',
      },
    };

    const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(a, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const response = [];

    amauiStyleSheetManager.add();

    response.push(
      // Only in browser is active
      amauiStyleSheetManager.status === 'inited',
      amauiStyleSheetManager.sheets.static[0].css,
      amauiStyleSheetManager.sheets.dynamic[0].css,
    );

    const updateResponse = amauiStyleSheetManager.update({
      a: {
        color: 'yellow',

        width: '114px',
      },

      a3: {
        color: 'yellow',

        width: '114px',
      },

      a4: {
        color: 'beige',

        width: props => props.a === 1 ? '114px' : '1114px'
      },

      a7: {
        color: 'yellow',

        // Function
        background: props => props.a === 1 ? 'yellow' : 'orange',

        'max-width': '114px',
      },
    });

    delete updateResponse.ids;
    delete updateResponse.styles;

    response.push(
      amauiStyleSheetManager.sheets.static[0].css,
      amauiStyleSheetManager.sheets.dynamic[0].css,
      updateResponse
    );

    const valueNode = response;

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      true,
      "\n.a-0 {\nwidth: 100;\nmax-width: 100;\nbackground: #faa;\nmargin: 0 14px 4px 40px;\nmargin-left: 41;\nfloat: left;\npadding-left: 41;\npadding: 40;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\n}\n\n.a1-1 {\nwidth: 1114px;\n}\n",
      "\n.a2-2 {\nwidth: 1114px;\n}\n\n.a7-3 {\ncolor: orange;\nwidth: 114px;\nbackground: orange;\n}\n",
      "\n.a-0 {\ncolor: yellow;\nwidth: 114px;\n}\n\n.a3-4 {\ncolor: yellow;\nwidth: 114px;\n}\n",
      "\n.a7-3 {\ncolor: yellow;\nbackground: orange;\nmax-width: 114px;\n}\n\n.a4-5 {\ncolor: beige;\nwidth: 1114px;\n}\n",
      {
        "classNames": {
          "a": "a-0",
          "a3": "a3-4"
        },
        "classes": {
          "a": "a-0",
          "a3": "a3-4"
        },
        "keyframes": {}
      }
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

        a7: {
          // Function
          background: props => props.a === 1 ? 'yellow' : 'orange',
        },
      };

      const amauiStyleSheetManager = new window.AmauiStyle.AmauiStyleSheetManager(a, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const response = [];

      const styleSheetsLength = window.document.styleSheets.length;

      amauiStyleSheetManager.add();

      response.push(
        amauiStyleSheetManager.status === 'active',
        amauiStyleSheetManager.sheets.static.length === 1,
        amauiStyleSheetManager.sheets.dynamic.length === 1,
        amauiStyleSheetManager.sheets.static[0].status === 'active',
        amauiStyleSheetManager.sheets.dynamic[0].status === 'active',
        window.document.styleSheets.length === styleSheetsLength + 2
      );

      amauiStyleSheetManager.remove(amauiStyleSheetManager.ids.dynamic);

      response.push(
        amauiStyleSheetManager.status === 'idle',
        amauiStyleSheetManager.sheets.static.length === 0,
        amauiStyleSheetManager.sheets.dynamic.length === 0,
        window.document.styleSheets.length === styleSheetsLength
      );

      return response;
    }, { browsers });

    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql(new Array(10).fill(true)));

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

      a7: {
        // Function
        background: props => props.a === 1 ? 'yellow' : 'orange',
      },
    };

    const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(a, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    amauiStyleSheetManager.add();

    const response = [
      amauiStyleSheetManager.sheets.static.length === 1,
      amauiStyleSheetManager.sheets.dynamic.length === 1,
      amauiStyleSheetManager.sheets.static[0].status === 'inited',
      amauiStyleSheetManager.sheets.dynamic[0].status === 'inited',
    ];

    amauiStyleSheetManager.remove(amauiStyleSheetManager.ids.dynamic);

    response.push(
      amauiStyleSheetManager.status === 'idle',
      amauiStyleSheetManager.sheets.static.length === 0,
      amauiStyleSheetManager.sheets.dynamic.length === 0
    );

    const valueNode = response;

    assert(valueNode).eql(new Array(7).fill(true));
  });

});
