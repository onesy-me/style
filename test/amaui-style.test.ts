/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';
import * as AmauiUtils from '@amaui/utils';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers } from '../utils/js/test/utils';

import * as AmauiStyle from '../src';
import { TValue } from '../src';
import { counter } from '../src/amaui-style-rule';

group('@amaui/style/amaui-style', () => {
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

  group('AmauiStyle', () => {

    to('all', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        return window.AmauiStyle.AmauiStyle.all(window.document.getElementById('a14')).map(item => item.element.id || item.element.tagName.toLowerCase());
      }, { browsers });

      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'a14',
        'a1',
        'a',
        'body'
      ]));
    });

    to('nearest', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const item = window.AmauiStyle.AmauiStyle.nearest(window.document.getElementById('a14'));

        return item.element.id || item.element.tagName.toLowerCase();
      }, { browsers });

      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eq('a14'));
    });

    to('furthest', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const item = window.AmauiStyle.AmauiStyle.furthest(window.document.getElementById('a14'));

        return item.element.id || item.element.tagName.toLowerCase();
      }, { browsers });

      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eq('body'));
    });

    to('first', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const item = window.AmauiStyle.AmauiStyle.first(window.document.getElementById('a14'));

        return item.element.id || item.element.tagName.toLowerCase();
      }, { browsers });

      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eq('a14'));
    });

    to('last', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const item = window.AmauiStyle.AmauiStyle.last(window.document.getElementById('a14'));

        return item.element.id || item.element.tagName.toLowerCase();
      }, { browsers });

      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eq('body'));
    });

    group('get', () => {

      to('0', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const item = window.AmauiStyle.AmauiStyle.get(window.document.getElementById('a14'), 0);

          return item.element.id || item.element.tagName.toLowerCase();
        }, { browsers });

        const values = [...valueBrowsers];

        values.forEach(value => assert(value).eq('a14'));
      });

      to('1', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const item = window.AmauiStyle.AmauiStyle.get(window.document.getElementById('a14'), 1);

          return item.element.id || item.element.tagName.toLowerCase();
        }, { browsers });

        const values = [...valueBrowsers];

        values.forEach(value => assert(value).eq('a1'));
      });

      to('-1', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const item = window.AmauiStyle.AmauiStyle.get(window.document.getElementById('a14'), -1);

          return item.element.id || item.element.tagName.toLowerCase();
        }, { browsers });

        const values = [...valueBrowsers];

        values.forEach(value => assert(value).eq('body'));
      });

    });

  });

  to('amauiStyle', async () => {
    // Browser
    const valueBrowsers = await evaluate((window: any) => {
      window.document.body.dir = 'rtl';

      const amauiStyle = new window.AmauiStyle.AmauiStyle(window.document.body, 'regular', undefined, { rule: { prefix: false } });

      return [
        typeof amauiStyle.id === 'string',
        amauiStyle.element.tagName.toLowerCase(),
        amauiStyle.mode,
        amauiStyle.options,
        amauiStyle.renderer instanceof window.AmauiStyle.AmauiStyleRenderer,
      ];
    }, { browsers });

    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql([
      true,
      'body',
      'regular',
      {
        rule: {
          sort: true,
          prefix: false,
          rtl: true
        }
      },
      true
    ]));

    // Node
    const amauiStyle = new AmauiStyle.AmauiStyle(undefined, 'regular', undefined, { rule: { prefix: false } });

    const valueNode = [
      typeof amauiStyle.id === 'string',
      amauiStyle.mode,
      amauiStyle.options,
      amauiStyle.renderer instanceof AmauiStyle.AmauiStyleRenderer,
    ];

    assert(valueNode).eql([
      true,
      'regular',
      {
        rule: {
          sort: true,
          prefix: false,
          rtl: true
        }
      },
      true
    ]);
  });

  to('direction', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.document.documentElement.dir = 'ltr';

      const amauiStyle = new window.AmauiStyle.AmauiStyle(window.document.documentElement, 'regular');

      const div = window.document.createElement('div');

      div.dir = 'rtl';

      window.document.body.append(div);

      const amauiStyle1 = new window.AmauiStyle.AmauiStyle(div, 'regular');

      return [
        amauiStyle.direction,
        amauiStyle.options.rule.rtl,
        amauiStyle1.direction,
        amauiStyle1.options.rule.rtl,
      ];
    }, { browsers });

    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'ltr',
      false,
      'rtl',
      true
    ]));
  });

  to('sheet_managers', async () => {
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

      window.AmauiStyle.style(a, { amaui_style: { value: amauiStyle } });

      return amauiStyle.sheet_managers.length;
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

    AmauiStyle.style(a, { amaui_style: { value: amauiStyle } });

    const valueNode = amauiStyle.sheet_managers.length;

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eq(1));
  });

  to('sheets', async () => {
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

      window.AmauiStyle.style(a, { amaui_style: { value: amauiStyle } });

      return amauiStyle.sheets.length;
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

    AmauiStyle.style(a, { amaui_style: { value: amauiStyle } });

    const valueNode = amauiStyle.sheets.length;

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eq(1));
  });

  to('values', async () => {
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

      window.AmauiStyle.style(a, { amaui_style: { value: amauiStyle } });

      return [AmauiUtils.equalDeep(amauiStyle.values, amauiStyle.response), amauiStyle.values];
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

    AmauiStyle.style(a, { amaui_style: { value: amauiStyle } });

    const valueNode = [AmauiUtils.equalDeep(amauiStyle.values, amauiStyle.response), amauiStyle.values];

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

        window.AmauiStyle.style(a, { amaui_style: { value: amauiStyle } });

        return [window.AmauiUtils.equalDeep(amauiStyle.values, amauiStyle.response), amauiStyle.response];
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

      AmauiStyle.style(a, { amaui_style: { value: amauiStyle } });

      const valueNode = [AmauiUtils.equalDeep(amauiStyle.values, amauiStyle.response), amauiStyle.response];

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

        window.AmauiStyle.style(a, { amaui_style: { value: amauiStyle } });

        return [AmauiUtils.equalDeep(amauiStyle.css, amauiStyle.values.css), amauiStyle.css];
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

      AmauiStyle.style(a, { amaui_style: { value: amauiStyle } });

      const valueNode = [AmauiUtils.equalDeep(amauiStyle.css, amauiStyle.values.css), amauiStyle.css];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        true,
        "\n\n.a-0 {\nwidth: 100;\nmax-width: 100;\nbackground: #faa;\nmargin: 0 14px 4px 40px;\nmargin-left: 41;\nfloat: left;\npadding-left: 41;\npadding: 40;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\n}\n\n"
      ]));
    });

    to('json', async () => {
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

        window.AmauiStyle.style(a, { amaui_style: { value: amauiStyle } });

        return [AmauiUtils.equalDeep(amauiStyle.values.json, amauiStyle.json), amauiStyle.json];
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

      AmauiStyle.style(a, { amaui_style: { value: amauiStyle } });

      const valueNode = [AmauiUtils.equalDeep(amauiStyle.values.json, amauiStyle.json), amauiStyle.json];

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

  group('plugins', () => {

    to('add', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const amauiStyle = new window.AmauiStyle.AmauiStyle();

        // Individual
        amauiStyle.plugins.add = window.AmauiStyle.unit;

        // Many at the same time
        amauiStyle.plugins.add = [
          window.AmauiStyle.sort,
          window.AmauiStyle.prefix,
          window.AmauiStyle.makeClassName,
          window.AmauiStyle.rtl,
        ];

        return [
          amauiStyle.subscriptions.rule.unit.length,
          amauiStyle.subscriptions.rules.sort.length,
          amauiStyle.subscriptions.rule.prefix.length,
          amauiStyle.subscriptions.className.name.length,
          amauiStyle.subscriptions.rule.rtl.length,
        ];
      }, { browsers });

      const amauiStyle = new AmauiStyle.AmauiStyle();

      // Individual
      amauiStyle.plugins.add = AmauiStyle.unit;

      // Many at the same time
      amauiStyle.plugins.add = [
        AmauiStyle.sort,
        AmauiStyle.prefix,
        AmauiStyle.makeClassName,
        AmauiStyle.rtl,
      ];

      const valueNode = [
        amauiStyle.subscriptions.rule.unit.length,
        amauiStyle.subscriptions.rules.sort.length,
        amauiStyle.subscriptions.rule.prefix.length,
        amauiStyle.subscriptions.className.name.length,
        amauiStyle.subscriptions.rule.rtl.length,
      ];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql(new Array(5).fill(1)));
    });

    to('remove', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const amauiStyle = new window.AmauiStyle.AmauiStyle();

        // Individual
        amauiStyle.plugins.add = window.AmauiStyle.unit;

        // Many at the same time
        amauiStyle.plugins.add = [
          window.AmauiStyle.sort,
          window.AmauiStyle.prefix,
          window.AmauiStyle.makeClassName,
          window.AmauiStyle.rtl,
        ];

        const response = [
          amauiStyle.subscriptions.rule.unit.length,
          amauiStyle.subscriptions.rules.sort.length,
          amauiStyle.subscriptions.rule.prefix.length,
          amauiStyle.subscriptions.className.name.length,
          amauiStyle.subscriptions.rule.rtl.length,
        ];

        // Individual
        amauiStyle.plugins.remove = window.AmauiStyle.unit;

        // Many at the same time
        amauiStyle.plugins.remove = [
          window.AmauiStyle.sort,
          window.AmauiStyle.prefix,
          window.AmauiStyle.makeClassName,
          window.AmauiStyle.rtl,
        ];

        response.push(
          amauiStyle.subscriptions.rule.unit.length,
          amauiStyle.subscriptions.rules.sort.length,
          amauiStyle.subscriptions.rule.prefix.length,
          amauiStyle.subscriptions.className.name.length,
          amauiStyle.subscriptions.rule.rtl.length,
        );

        return response;
      }, { browsers });

      const amauiStyle = new AmauiStyle.AmauiStyle();

      // Individual
      amauiStyle.plugins.add = AmauiStyle.unit;

      // Many at the same time
      amauiStyle.plugins.add = [
        AmauiStyle.sort,
        AmauiStyle.prefix,
        AmauiStyle.makeClassName,
        AmauiStyle.rtl,
      ];

      const response = [
        amauiStyle.subscriptions.rule.unit.length,
        amauiStyle.subscriptions.rules.sort.length,
        amauiStyle.subscriptions.rule.prefix.length,
        amauiStyle.subscriptions.className.name.length,
        amauiStyle.subscriptions.rule.rtl.length,
      ];

      // Individual
      amauiStyle.plugins.remove = AmauiStyle.unit;

      // Many at the same time
      amauiStyle.plugins.remove = [
        AmauiStyle.sort,
        AmauiStyle.prefix,
        AmauiStyle.makeClassName,
        AmauiStyle.rtl,
      ];

      response.push(
        amauiStyle.subscriptions.rule.unit.length,
        amauiStyle.subscriptions.rules.sort.length,
        amauiStyle.subscriptions.rule.prefix.length,
        amauiStyle.subscriptions.className.name.length,
        amauiStyle.subscriptions.rule.rtl.length,
      );

      const valueNode = response;

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        ...new Array(5).fill(1),
        ...new Array(5).fill(0)
      ]));
    });

  });

});
