/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';
import AmauiSubscription from '@amaui/subscription';

import { evaluate } from '../utils/js/test/utils';

import * as AmauiStyle from '../src';
import { TValue } from '../src';

group('Use cases', () => {

  to('amauiStyle sub values', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const amauiStyle = new window.AmauiStyle.AmauiStyle(window.document.body);

      // Plugins
      amauiStyle.plugins.add = [
        window.AmauiStyle.unit,
        window.AmauiStyle.sort,
        window.AmauiStyle.prefix,
        window.AmauiStyle.makeClassName,
        window.AmauiStyle.rtl,
      ];

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
          background: {
            color: '#faa'
          },

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
          width: 100,

          // Function
          background: props => props.a === 1 ? 'yellow' : 'orange',
        },
      };

      const values = [];

      // Add amauiStyle subs
      Object.keys(amauiStyle.subscriptions).forEach(prop => {
        Object.keys(amauiStyle.subscriptions[prop]).forEach(prop_ => amauiStyle.subscriptions[prop][prop_].subscribe(() => values.push(`${prop}-${prop_}`)));
      });

      const style = window.AmauiStyle.style(a, { amaui_style: { value: amauiStyle } });

      // Add
      const response = style.add();

      // Update props
      style.props = { ids: response.ids.dynamic, props: { a: 1 } };

      // Update
      style.update({
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
          background: {
            color: '#faa'
          },

          margin: '0 14px 4px 40px',

          // rtl
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
      });

      style.remove(response.ids.dynamic);

      return [
        values
      ];
    });

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
        background: {
          color: '#faa',
        },

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
        width: 100,

        // Function
        background: props => props.a === 1 ? 'yellow' : 'orange',
      },
    };

    const amauiStyleValues = [];

    // Add amauiStyle subs
    Object.keys(amauiStyle.subscriptions).forEach(prop => {
      Object.keys(amauiStyle.subscriptions[prop]).forEach(prop_ => amauiStyle.subscriptions[prop][prop_].subscribe(() => amauiStyleValues.push(`${prop}-${prop_}`)));
    });

    const style = AmauiStyle.style(a, { amaui_style: { value: amauiStyle } });

    // Add
    const response = style.add();

    // Update props
    style.props = { ids: response.ids.dynamic, props: { a: 1 } };

    // Update
    style.update({
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
        background: {
          color: '#faa'
        },

        margin: '0 14px 4px 40px',

        // rtl
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
    });

    style.remove(response.ids.dynamic);

    const valueNode = [
      amauiStyleValues
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => {
      Object.keys(amauiStyle.subscriptions).forEach(prop => {
        Object.keys(amauiStyle.subscriptions[prop]).forEach(prop_ => assert(value.indexOf(`${prop}-${prop_}`) > -1));
      });
    });
  });

  to('Readding, not yet removed static amauiStyleSheet, that is left for a ref value', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const amauiStyle = new window.AmauiStyle.AmauiStyle(window.document.body);

      // Plugins
      amauiStyle.plugins.add = [
        window.AmauiStyle.unit,
        window.AmauiStyle.sort,
        window.AmauiStyle.prefix,
        window.AmauiStyle.makeClassName,
        window.AmauiStyle.rtl,
      ];

      const a = {
        a: {
          width: 100,

          'max-width': 100,

          // Simple
          background: {
            color: '#faa'
          },

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
          width: 100,

          'max-width': 100,
        },
      };

      const style = window.AmauiStyle.style(a, { amaui_style: { value: amauiStyle } });

      const style1 = window.AmauiStyle.style({ a: a.a }, { amaui_style: { value: amauiStyle } });

      // Add
      style.add();

      style1.add();

      let css = '';

      Array.from(window.document.styleSheets).forEach((sheet: any) => {
        Array.from(sheet.cssRules).forEach((rule: any) => {
          css += rule.cssText;
        });
      });

      const response = [
        amauiStyle.sheets.length,
        style.sheets.static[0].rules.length,
        css
      ];

      style.remove();

      css = '';

      Array.from(window.document.styleSheets).forEach((sheet: any) => {
        Array.from(sheet.cssRules).forEach((rule: any) => {
          css += rule.cssText;
        });
      });

      response.push(
        style.sheets.static[0].rules.length,
        css
      );

      // Readd
      style.add();

      css = '';

      Array.from(window.document.styleSheets).forEach((sheet: any) => {
        Array.from(sheet.cssRules).forEach((rule: any) => {
          css += rule.cssText;
        });
      });

      response.push(
        style.sheets.static[0].rules.length,
        css
      );

      return response;
    });

    const amauiStyle = new AmauiStyle.AmauiStyle();

    // Plugins
    amauiStyle.plugins.add = [
      AmauiStyle.unit,
      AmauiStyle.sort,
      AmauiStyle.prefix,
      AmauiStyle.makeClassName,
      AmauiStyle.rtl,
    ];

    const a = {
      a: {
        width: 100,

        'max-width': 100,

        // Simple
        background: {
          color: '#faa'
        },

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
        width: 100,

        'max-width': 100,
      },
    };

    const style = AmauiStyle.style(a, { amaui_style: { value: amauiStyle } });

    const style1 = AmauiStyle.style({ a: a.a }, { amaui_style: { value: amauiStyle } });

    // Add
    style.add();

    style1.add();

    const response = [
      amauiStyle.sheets.length,
      style.sheets.static[0].rules.length
    ];

    style.remove();

    response.push(
      style.sheets.static[0]?.rules.length
    );

    // Readd
    style.add();

    response.push(
      style.sheets.static[0]?.rules.length
    );

    const valueNode = response;

    const values = [...valueBrowsers];

    assert(valueNode).eql([
      2,
      2,
      1,
      2
    ]);

    assert(values[0]).eql([
      2,
      2,
      ".aa { float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.ab { width: 100px; max-width: 100px; }",
      1,
      ".aa { float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
      2,
      ".aa { width: 100px; max-width: 100px; margin: 0px 14px 4px 41px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; animation: 0.4s ease 0s 1 normal none running undefined; }.ac { width: 100px; max-width: 100px; }"
    ]);

    assert(values[1]).eql([
      2,
      2,
      ".aa { float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.ab { width: 100px; max-width: 100px; }",
      1,
      ".aa { float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
      2,
      ".aa { width: 100px; max-width: 100px; margin: 0px 14px 4px 41px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-origin: inherit; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; animation: 0.4s ease 0s 1 normal none running undefined; }.ac { width: 100px; max-width: 100px; }"
    ]);

    assert(values[2]).eql([
      2,
      2,
      ".aa { float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.ab { width: 100px; max-width: 100px; }",
      1,
      ".aa { float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
      2,
      ".aa { width: 100px; max-width: 100px; margin: 0px 14px 4px 41px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-origin: inherit; mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; animation: 0.4s ease 0s 1 normal none running undefined; }.ac { width: 100px; max-width: 100px; }"
    ]);
  });

  to('xss injection attack', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const amauiStyle = new window.AmauiStyle.AmauiStyle(window.document.body);

      // Plugins
      amauiStyle.plugins.add = [
        window.AmauiStyle.unit,
        window.AmauiStyle.sort,
        window.AmauiStyle.prefix,
        window.AmauiStyle.makeClassName,
        window.AmauiStyle.rtl,
      ];

      const a = {
        a: {
          width: 100,

          'max-width': 100,

          // Injection attack
          color: window.location.href,

          // Simple
          background: {
            color: '#faa'
          },

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
          width: 100,

          'max-width': 100,
        },
      };

      const style = window.AmauiStyle.style(a, { amaui_style: { value: amauiStyle } });

      // Add
      style.add();

      let css = '';

      Array.from(window.document.styleSheets).forEach((sheet: any) => {
        Array.from(sheet.cssRules).forEach((rule: any) => {
          css += rule.cssText;
        });
      });

      const response = [
        css
      ];
      return response;
    });

    const values = [...valueBrowsers];

    assert(values[0]).eql([
      ".aa { float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.ab { width: 100px; max-width: 100px; }",
    ]);

    assert(values[1]).eql([
      ".aa { float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.ab { width: 100px; max-width: 100px; }",
    ]);

    assert(values[2]).eql([
      ".aa { float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.ab { width: 100px; max-width: 100px; }",
    ]);
  });

  to('Pseudo classes and elements', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const amauiStyle = new window.AmauiStyle.AmauiStyle(window.document.body);

      // Plugins
      amauiStyle.plugins.add = [
        window.AmauiStyle.unit,
        window.AmauiStyle.sort,
        window.AmauiStyle.prefix,
        window.AmauiStyle.makeClassName,
        window.AmauiStyle.rtl,
      ];

      const a = {
        a: {
          width: 100,

          'max-width': 100,

          // Simple
          background: {
            color: '#faa'
          },

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

          '&:active': {
            color: 'yellow',
          },

          '&::before': {
            content: "'a'",
            width: 100,
            background: 'yellow'
          }
        },

        a1: {
          width: 100,

          'max-width': 100,
        },
      };

      const style = window.AmauiStyle.style(a, { amaui_style: { value: amauiStyle } });

      // Add
      style.add();

      let css = '';

      Array.from(window.document.styleSheets).forEach((sheet: any) => {
        Array.from(sheet.cssRules).forEach((rule: any) => {
          css += rule.cssText;
        });
      });

      const response = [
        css
      ];

      return response;
    });

    const amauiStyle = new AmauiStyle.AmauiStyle();

    // Plugins
    amauiStyle.plugins.add = [
      AmauiStyle.unit,
      AmauiStyle.sort,
      AmauiStyle.prefix,
      AmauiStyle.makeClassName,
      AmauiStyle.rtl,
    ];

    const a = {
      a: {
        width: 100,

        'max-width': 100,

        // Simple
        background: {
          color: '#faa'
        },

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

        '&:active': {
          color: 'yellow',
        },

        '&::before': {
          content: "'a'",
          width: 100,
          background: 'yellow'
        }
      },

      a1: {
        width: 100,

        'max-width': 100,
      },
    };

    const style = AmauiStyle.style(a, { amaui_style: { value: amauiStyle } });

    // Add
    style.add();

    const response = [
      style.amaui_style_sheet_manager.css
    ];

    const valueNode = response;

    const values = [valueNode, ...valueBrowsers];

    assert(values).eql([
      [
        "\n\n.a-0 {\nwidth: 100px;\nmax-width: 100px;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nfloat: left;\npadding-left: 41px;\npadding: 40px;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\n}\n\n.a1-0 {\nwidth: 100px;\nmax-width: 100px;\n}\n\n.a-0:active {\ncolor: yellow;\n}\n\n.a-0::before {\ncontent: 'a';\nwidth: 100px;\nbackground: yellow;\n}\n\n"
      ],
      [
        ".aa:active { color: yellow; }.aa::before { content: \"a\"; width: 100px; background: yellow; }.aa { width: 100px; max-width: 100px; margin: 0px 14px 4px 41px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; }.ab { width: 100px; max-width: 100px; }"
      ],
      [
        ".aa:active { color: yellow; }.aa::before { content: \"a\"; width: 100px; background: yellow none repeat scroll 0% 0%; }.aa { width: 100px; max-width: 100px; margin: 0px 14px 4px 41px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-origin: inherit; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; }.ab { width: 100px; max-width: 100px; }"
      ],
      [
        ".aa:active { color: yellow; }.aa::before { content: \"a\"; width: 100px; background-color: yellow; }.aa { width: 100px; max-width: 100px; margin: 0px 14px 4px 41px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-origin: inherit; mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; }.ab { width: 100px; max-width: 100px; }"
      ]
    ]);
  });

  to('all values', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const amauiStyle = new window.AmauiStyle.AmauiStyle(window.document.body);

      // Plugins
      amauiStyle.plugins.add = [
        window.AmauiStyle.unit,
        window.AmauiStyle.sort,
        window.AmauiStyle.prefix,
        window.AmauiStyle.makeClassName,
        window.AmauiStyle.valueObject,
        window.AmauiStyle.rtl,
      ];

      const subs = {
        background: new window.AmauiSubscription('beige'),
        media: new window.AmauiSubscription('yellow'),
        var: new window.AmauiSubscription({
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
        }),
      };

      const a = theme => ({
        '@keyframes a': {
          '0%': {
            color: 'white',
          },
          '40%': {
            color: 'yellow',
          },
        },

        body: {
          '@pure': true,
          margin: 40,

          '& $a': {
            color: 'yellow'
          }
        },

        main: {
          '@p': true,
          margin: 40,
        },

        area: {
          '@pure': true,

          color: subs.background,

          '& $a': {
            color: 'yellow'
          }
        },

        '@pure': {
          a: {
            margin: 4,
          },

          meta: {
            margin: props => props.a === 1 ? 114 : 1114,
          },
        },

        a: {
          width: 100,

          'max-width': 100,

          // Simple
          background: theme.palette.color.primary.main,

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

        // options at rule level
        a1: {
          '@options': {
            prefix: false,
            sort: false,
            rtl: false,
          },

          // Keyframes nested
          '@keyframes a1': {
            '0%': {
              color: 'lightgreen',
            },
            '40%': {
              color: 'orange',
            },
          },

          width: '100%',

          maxWidth: 100,

          margin: [0, 14, 4, 40],

          // Array of arrays
          background: ['#faa', 'url("a.jpg")', 'no-repeat', 'right', 'top'],

          animationName: '$a1',
          animationDuration: 1.4,

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
        },

        // with classNames
        a2: {
          '@classNames': ['ad', 'ad', 'ad1', 'ad4', true && 'a', false && 'b', 0, 14, '114', { 'c': false, d: true, e: { u: true } }],

          margin: [0, 14, '4em'],

          // Array of arrays
          background: [
            ['url("a.jpg")', 'no-repeat', 'right', 'top'],
            ['url("ad.jpg")', 'no-repeat', 'right', 'top'],
            ['url("ad.jpg")', 'no-repeat', 'right', 'top']
          ],

          // animation with non-existing keyframes
          animation: '$a14 .4s ease',
        },

        a3: {
          // Array of objects
          background: [
            { image: 'url("a.jpg")', repeat: 'no-repeat', position: 'center right' },
            { image: 'url("a.jpg")', repeat: 'repeat-y', position: 'center center' },
            { image: 'url("ad.jpg")', repeat: 'repeat-y', position: 'center' },
          ],

          // animationName with non-existing keyframes
          animationName: '$a114',
        },

        a4: {
          // Object
          background: {
            value: '#faa',
            // In order of specificity they will actually be used at
            fallbacks: [
              '#faa',
              ['#fff', 'url("a.jpg")', 'no-repeat', 'right', 'top'],
              [
                ['url("a.jpg")', 'no-repeat', 'right', 'top'],
                ['url("a.jpg")', 'no-repeat', 'right', 'top'],
                ['url("ad.jpg")', 'no-repeat', 'right', 'top']
              ]
            ]
          }
        },

        a5: {
          // Object
          background: {
            // Multi variant value
            value: [
              ['url("a.jpg")', 'no-repeat', 'right', 'top'],
              ['url("a1.jpg")', 'no-repeat', 'right', 'top'],
              ['url("ad.jpg")', 'no-repeat', 'right', 'top']
            ],
            // In order of specificity they will actually be used at
            fallbacks: [
              '#faa',
              ['#fff', 'url("a.jpg")', 'no-repeat', 'right', 'top'],
              [
                ['url("a.jpg")', 'no-repeat', 'right', 'top'],
                ['url("a.jpg")', 'no-repeat', 'right', 'top'],
                ['url("ad.jpg")', 'no-repeat', 'right', 'top']
              ]
            ]
          }
        },

        a6: {
          // Object with expanded props
          background: {
            color: 'orange',
            image: 'url("a.jpg")',
            repeat: 'repeat-y',
            position: 'center center',
          },
        },

        a7: {
          // Function
          background: props => props.a === 1 ? 'yellow' : 'orange',
        },

        a8: {
          // AmauiSubscription
          background: subs.background,
        },

        // Additionaly nested
        a9: {
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

        },

        // Reference class name
        // and empty rules and options nested
        a10: {

          '& $a1': {

            '& > a': {

              '&:active': {
                '@options': {
                  prefix: false,
                  sort: false,
                  rtl: false,
                },

                color: 'orange',

                // rtl
                marginLeft: 40,
                float: 'left',

                // sort
                paddingLeft: 41,
                padding: 40,

                // prefixes
                position: 'sticky',
                transition: 'all .4s ease',
                maskOrigin: 'margin-box',
                maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
                maskPosition: '40% 74%',
              }

            }

          },

          // Multiple refs
          '& $a1 $a4$a7': {
            color: 'yellow'
          },

        },

        // Reference of non-existing refs
        // + reuse of a10 as it has the same hash
        a11: {

          '& $ad $a114': {
            color: 'white',
          },

        },

        // Reference multiple
        a12: {

          '& $a4& &': {
            color: 'white',
          },

        },

        // Empty rules
        // Ought not to be added as it's not dynamic, and it has empty rules
        a13: {

        },

        aa: `
      width: 100;
      maxWidth: 100%;
      background: orange;

      marginLeft: 41;
      float: left;
      paddingRight: 41;
      padding: 40px;
   `,

        ad: props => props.a === 1 ? {
          width: 100,

          'max-width': 100,

          // Simple
          background: '#faa',

          margin: '0 14px 4px 40px',

          // rtl
          marginLeft: 41,
          float: 'left',

          // sort
          paddingRight: 41,
          padding: 40,

          // prefixes
          position: 'sticky',
          transition: 'all .4s ease',
          maskOrigin: 'inherit',
          maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
          maskPosition: '40% 74%',

          // animation
          animation: '$a .4s ease',
        } : {
          width: 100,

          'max-width': 100,

          // Simple
          background: 'orange',

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

          '& $a1': {
            color: 'yellow'
          }
        },

        ad1: subs.var,

        // @Media

        // Empty
        '@media only screen and (min-width: 1401px)': {

        },

        '@media only screen and (min-width: 1404px)': {
          $a: {
            color: 'beige',
          },

          $var: {
            color: 'yellow',
          },
        },

        '@media only screen and (max-width: 1414px)': {
          // element
          body: {
            margin: 40,
            background: 'beige',

            '& $a': {
              color: 'yellow'
            }
          },

          main: {
            margin: 40,
          },

          area: {
            color: subs.background,

            '& $a': {
              color: 'yellow'
            }
          },

          a: {
            margin: 4,
          },

          meta: {
            margin: props => props.a === 1 ? 114 : 1114,
          },

          $a: {
            width: 100,

            'max-width': 100,

            // Simple
            background: theme.palette.color.primary.main,

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

          // options at rule level
          $a1: {
            '@options': {
              prefix: false,
              sort: false,
              rtl: false,
            },

            // Keyframes nested
            '@keyframes a1': {
              '0%': {
                color: 'lightgreen',
              },
              '40%': {
                color: 'orange',
              },
            },

            width: '100%',

            maxWidth: 100,

            margin: [0, 14, 4, 40],

            // Array of arrays
            background: ['#faa', 'url("a.jpg")', 'no-repeat', 'right', 'top'],

            animationName: '$a1',
            animationDuration: 1.4,

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
          },

          $a7: {
            // Function
            background: props => props.a === 1 ? 'azure' : 'aliceblue',
          },

          $a8: {
            // AmauiSubscription
            background: subs.media,
          },

          // Additionaly nested
          $a9: {
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
                  paddingLeft: 41,
                  padding: 40,

                  // prefixes
                  position: 'sticky',
                  transition: 'all .4s ease',
                  maskOrigin: 'inherit',
                  maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
                  maskPosition: '40% 74%',
                }

              }

            },

          },

          // Reference class name
          // and empty rules and with options nested
          $a10: {

            '& $a1': {

              '& > a': {

                '&:active': {
                  '@options': {
                    prefix: false,
                    sort: false,
                    rtl: false,
                  },

                  color: 'orange',

                  // rtl
                  marginLeft: 40,
                  float: 'left',

                  // sort
                  paddingLeft: 41,
                  padding: 40,

                  // prefixes
                  position: 'sticky',
                  transition: 'all .4s ease',
                  maskOrigin: 'margin-box',
                  maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
                  maskPosition: '40% 74%',
                }

              }

            },

            // Multiple refs
            '& $a1 $a4$a7': {
              color: 'yellow'
            },

          },

          // Reference of non-existing refs
          // + reuse of a10 as it has the same hash
          $a11: {

            '& $ad $a114': {
              color: 'white',
            },

          },

          // Reference multiple
          $a12: {

            '& $a4& &': {
              color: 'white',
            },

          },

          // Empty rules
          // Ought not to be added as it's not dynamic, and it has empty rules
          $a13: {

          },

          $ad: props => props.a === 1 ? {
            width: 100,

            'max-width': 100,

            // Simple
            background: '#faa',

            margin: '0 14px 4px 40px',

            // rtl
            marginLeft: 41,
            float: 'left',

            // sort
            paddingRight: 41,
            padding: 40,

            // prefixes
            position: 'sticky',
            transition: 'all .4s ease',
            maskOrigin: 'inherit',
            maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
            maskPosition: '40% 74%',

            // animation
            animation: '$a .4s ease',
          } : {
            width: 100,

            'max-width': 100,

            // Simple
            background: 'orange',

            margin: '0 14px 4px 40px',

            // rtl
            marginLeft: 41,
            float: 'left',

            // sort
            paddingLeft: 41,
            padding: 40,

            // prefixes
            transition: 'all .4s ease',
            maskComposite: 'inherit',

            // animation
            animation: '$a .4s ease',
          },

          $ad1: subs.var,

          // @media nested
          '@media print': {
            // element
            body: {
              background: 'beige',
            },

            $a: {
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

            // options at rule level
            $a1: {
              '@options': {
                prefix: false,
                sort: false,
                rtl: false,
              },

              // Keyframes nested
              '@keyframes a1': {
                '0%': {
                  color: 'lightgreen',
                },
                '40%': {
                  color: 'orange',
                },
              },

              width: '100%',

              maxWidth: 100,

              margin: [0, 14, 4, 40],

              // Array of arrays
              background: ['#faa', 'url("a.jpg")', 'no-repeat', 'right', 'top'],

              animationName: '$a1',
              animationDuration: 1.4,

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
            },

            $a7: {
              // Function
              background: props => props.a === 1 ? 'azure' : 'aliceblue',
            },

            $a8: {
              // AmauiSubscription
              background: subs.media,
            },

            // Additionaly nested
            $a9: {
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
                    paddingLeft: 41,
                    padding: 40,

                    // prefixes
                    position: 'sticky',
                    transition: 'all .4s ease',
                    maskOrigin: 'inherit',
                    maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
                    maskPosition: '40% 74%',
                  }

                }

              },

            },

            // Reference class name
            // and empty rules and with options nested
            $a10: {

              '& $a1': {

                '& > a': {

                  '&:active': {
                    '@options': {
                      prefix: false,
                      sort: false,
                      rtl: false,
                    },

                    color: 'orange',

                    // rtl
                    marginLeft: 40,
                    float: 'left',

                    // sort
                    paddingLeft: 41,
                    padding: 40,

                    // prefixes
                    position: 'sticky',
                    transition: 'all .4s ease',
                    maskOrigin: 'margin-box',
                    maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
                    maskPosition: '40% 74%',
                  }

                }

              },

              // Multiple refs
              '& $a1 $a4$a7': {
                color: 'yellow'
              },

            },

            // Reference of non-existing refs
            // + reuse of a10 as it has the same hash
            $a11: {

              '& $ad $a114': {
                color: 'white',
              },

            },

            // Reference multiple
            $a12: {

              '& $a4& &': {
                color: 'white',
              },

            },

            // Empty rules
            // Ought not to be added as it's not dynamic, and it has empty rules
            $a13: {

            },

            $ad: props => props.a === 1 ? {
              width: 100,

              'max-width': 100,

              // Simple
              background: '#faa',

              margin: '0 14px 4px 40px',

              // rtl
              marginLeft: 41,
              float: 'left',

              // sort
              paddingRight: 41,
              padding: 40,

              // prefixes
              position: 'sticky',
              transition: 'all .4s ease',
              maskOrigin: 'inherit',
              maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
              maskPosition: '40% 74%',

              // animation
              animation: '$a .4s ease',
            } : {
              width: 100,

              'max-width': 100,

              // Simple
              background: 'orange',

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
              maskComposite: 'inherit',

              // animation
              animation: '$a .4s ease',
            },

            $ad1: subs.var,
          },

        },

        a40: {
          color: 'beige',
          padding: 41,

          '@media only screen and (min-width: 1404px)': {
            '&': {
              color: 'orange',
            },
          }
        }

      });

      const amauiTheme = new window.AmauiStyle.AmauiTheme({}, window.document.body);

      const style = window.AmauiStyle.style(a, { amaui_style: { value: amauiStyle }, amaui_theme: { value: amauiTheme } });

      // Add
      style.add();

      let css = '';

      Array.from(window.document.styleSheets).forEach((sheet: any) => {
        Array.from(sheet.cssRules).forEach((rule: any) => {
          css += `\n\n${rule.cssText}`;
        });
      });

      const response = [
        css
      ];

      return response;
    });

    const amauiStyle = new AmauiStyle.AmauiStyle();

    // Plugins
    amauiStyle.plugins.add = [
      AmauiStyle.unit,
      AmauiStyle.sort,
      AmauiStyle.prefix,
      AmauiStyle.makeClassName,
      AmauiStyle.valueObject,
      AmauiStyle.rtl,
    ];

    const subs = {
      background: new AmauiSubscription('beige'),
      media: new AmauiSubscription('yellow'),
      var: new AmauiSubscription({
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
      }),
    };

    const a = theme => ({
      '@keyframes a': {
        '0%': {
          color: 'white',
        },
        '40%': {
          color: 'yellow',
        },
      },

      body: {
        '@pure': true,
        margin: 40,

        '& $a': {
          color: 'yellow'
        }
      },

      main: {
        '@p': true,
        margin: 40,
      },

      area: {
        '@pure': true,

        color: subs.background,

        '& $a': {
          color: 'yellow'
        }
      },

      '@pure': {
        a: {
          margin: 4,
        },

        meta: {
          margin: props => props.a === 1 ? 114 : 1114,
        },
      },

      a: {
        width: 100,

        'max-width': 100,

        // Simple
        background: theme.palette.color.primary.main,

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

      // options at rule level
      a1: {
        '@options': {
          prefix: false,
          sort: false,
          rtl: false,
        },

        // Keyframes nested
        '@keyframes a1': {
          '0%': {
            color: 'lightgreen',
          },
          '40%': {
            color: 'orange',
          },
        },

        width: '100%',

        maxWidth: 100,

        margin: [0, 14, 4, 40],

        // Array of arrays
        background: ['#faa', 'url("a.jpg")', 'no-repeat', 'right', 'top'],

        animationName: '$a1',
        animationDuration: 1.4,

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
      },

      // with classNames
      a2: {
        '@classNames': ['ad', 'ad', 'ad1', 'ad4', true && 'a', false && 'b', 0, 14, '114', { 'c': false, d: true, e: { u: true } }],

        margin: [0, 14, '4em'],

        // Array of arrays
        background: [
          ['url("a.jpg")', 'no-repeat', 'right', 'top'],
          ['url("ad.jpg")', 'no-repeat', 'right', 'top'],
          ['url("ad.jpg")', 'no-repeat', 'right', 'top']
        ],

        // animation with non-existing keyframes
        animation: '$a14 .4s ease',
      },

      a3: {
        // Array of objects
        background: [
          { image: 'url("a.jpg")', repeat: 'no-repeat', position: 'center right' },
          { image: 'url("a.jpg")', repeat: 'repeat-y', position: 'center center' },
          { image: 'url("ad.jpg")', repeat: 'repeat-y', position: 'center' },
        ],

        // animationName with non-existing keyframes
        animationName: '$a114',
      },

      a4: {
        // Object
        background: {
          value: '#faa',
          // In order of specificity they will actually be used at
          fallbacks: [
            '#faa',
            ['#fff', 'url("a.jpg")', 'no-repeat', 'right', 'top'],
            [
              ['url("a.jpg")', 'no-repeat', 'right', 'top'],
              ['url("a.jpg")', 'no-repeat', 'right', 'top'],
              ['url("ad.jpg")', 'no-repeat', 'right', 'top']
            ]
          ]
        }
      },

      a5: {
        // Object
        background: {
          // Multi variant value
          value: [
            ['url("a.jpg")', 'no-repeat', 'right', 'top'],
            ['url("a1.jpg")', 'no-repeat', 'right', 'top'],
            ['url("ad.jpg")', 'no-repeat', 'right', 'top']
          ],
          // In order of specificity they will actually be used at
          fallbacks: [
            '#faa',
            ['#fff', 'url("a.jpg")', 'no-repeat', 'right', 'top'],
            [
              ['url("a.jpg")', 'no-repeat', 'right', 'top'],
              ['url("a.jpg")', 'no-repeat', 'right', 'top'],
              ['url("ad.jpg")', 'no-repeat', 'right', 'top']
            ]
          ]
        }
      },

      a6: {
        // Object with expanded props
        background: {
          color: 'orange',
          image: 'url("a.jpg")',
          repeat: 'repeat-y',
          position: 'center center',
        },
      },

      a7: {
        // Function
        background: props => props.a === 1 ? 'yellow' : 'orange',
      },

      a8: {
        // AmauiSubscription
        background: subs.background,
      },

      // Additionaly nested
      a9: {
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

      },

      // Reference class name
      // and empty rules and options nested
      a10: {

        '& $a1': {

          '& > a': {

            '&:active': {
              '@options': {
                prefix: false,
                sort: false,
                rtl: false,
              },

              color: 'orange',

              // rtl
              marginLeft: 40,
              float: 'left',

              // sort
              paddingLeft: 41,
              padding: 40,

              // prefixes
              position: 'sticky',
              transition: 'all .4s ease',
              maskOrigin: 'margin-box',
              maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
              maskPosition: '40% 74%',
            }

          }

        },

        // Multiple refs
        '& $a1 $a4$a7': {
          color: 'yellow'
        },

      },

      // Reference of non-existing refs
      // + reuse of a10 as it has the same hash
      a11: {

        '& $ad $a114': {
          color: 'white',
        },

      },

      // Reference multiple
      a12: {

        '& $a4& &': {
          color: 'white',
        },

      },

      // Empty rules
      // Ought not to be added as it's not dynamic, and it has empty rules
      a13: {

      },

      aa: `
      width: 100;
      maxWidth: 100%;
      background: orange;

      marginLeft: 41;
      float: left;
      paddingRight: 41;
      padding: 40px;
   `,

      ad: props => props.a === 1 ? {
        width: 100,

        'max-width': 100,

        // Simple
        background: '#faa',

        margin: '0 14px 4px 40px',

        // rtl
        marginLeft: 41,
        float: 'left',

        // sort
        paddingRight: 41,
        padding: 40,

        // prefixes
        position: 'sticky',
        transition: 'all .4s ease',
        maskOrigin: 'inherit',
        maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
        maskPosition: '40% 74%',

        // animation
        animation: '$a .4s ease',
      } : {
        width: 100,

        'max-width': 100,

        // Simple
        background: 'orange',

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

        '& $a1': {
          color: 'yellow'
        }
      },

      ad1: subs.var,

      // @Media

      // Empty
      '@media only screen and (min-width: 1401px)': {

      },

      '@media only screen and (min-width: 1404px)': {
        $a: {
          color: 'beige',
        },

        $var: {
          color: 'yellow',
        },
      },

      '@media only screen and (max-width: 1414px)': {
        // element
        body: {
          margin: 40,
          background: 'beige',

          '& $a': {
            color: 'yellow'
          }
        },

        main: {
          margin: 40,
        },

        area: {
          color: subs.background,

          '& $a': {
            color: 'yellow'
          }
        },

        a: {
          margin: 4,
        },

        meta: {
          margin: props => props.a === 1 ? 114 : 1114,
        },

        $a: {
          width: 100,

          'max-width': 100,

          // Simple
          background: theme.palette.color.primary.main,

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

        // options at rule level
        $a1: {
          '@options': {
            prefix: false,
            sort: false,
            rtl: false,
          },

          // Keyframes nested
          '@keyframes a1': {
            '0%': {
              color: 'lightgreen',
            },
            '40%': {
              color: 'orange',
            },
          },

          width: '100%',

          maxWidth: 100,

          margin: [0, 14, 4, 40],

          // Array of arrays
          background: ['#faa', 'url("a.jpg")', 'no-repeat', 'right', 'top'],

          animationName: '$a1',
          animationDuration: 1.4,

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
        },

        $a7: {
          // Function
          background: props => props.a === 1 ? 'azure' : 'aliceblue',
        },

        $a8: {
          // AmauiSubscription
          background: subs.media,
        },

        // Additionaly nested
        $a9: {
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
                paddingLeft: 41,
                padding: 40,

                // prefixes
                position: 'sticky',
                transition: 'all .4s ease',
                maskOrigin: 'inherit',
                maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
                maskPosition: '40% 74%',
              }

            }

          },

        },

        // Reference class name
        // and empty rules and with options nested
        $a10: {

          '& $a1': {

            '& > a': {

              '&:active': {
                '@options': {
                  prefix: false,
                  sort: false,
                  rtl: false,
                },

                color: 'orange',

                // rtl
                marginLeft: 40,
                float: 'left',

                // sort
                paddingLeft: 41,
                padding: 40,

                // prefixes
                position: 'sticky',
                transition: 'all .4s ease',
                maskOrigin: 'margin-box',
                maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
                maskPosition: '40% 74%',
              }

            }

          },

          // Multiple refs
          '& $a1 $a4$a7': {
            color: 'yellow'
          },

        },

        // Reference of non-existing refs
        // + reuse of a10 as it has the same hash
        $a11: {

          '& $ad $a114': {
            color: 'white',
          },

        },

        // Reference multiple
        $a12: {

          '& $a4& &': {
            color: 'white',
          },

        },

        // Empty rules
        // Ought not to be added as it's not dynamic, and it has empty rules
        $a13: {

        },

        $ad: props => props.a === 1 ? {
          width: 100,

          'max-width': 100,

          // Simple
          background: '#faa',

          margin: '0 14px 4px 40px',

          // rtl
          marginLeft: 41,
          float: 'left',

          // sort
          paddingRight: 41,
          padding: 40,

          // prefixes
          position: 'sticky',
          transition: 'all .4s ease',
          maskOrigin: 'inherit',
          maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
          maskPosition: '40% 74%',

          // animation
          animation: '$a .4s ease',
        } : {
          width: 100,

          'max-width': 100,

          // Simple
          background: 'orange',

          margin: '0 14px 4px 40px',

          // rtl
          marginLeft: 41,
          float: 'left',

          // sort
          paddingLeft: 41,
          padding: 40,

          // prefixes
          transition: 'all .4s ease',
          maskComposite: 'inherit',

          // animation
          animation: '$a .4s ease',
        },

        $ad1: subs.var,

        // @media nested
        '@media print': {
          // element
          body: {
            background: 'beige',
          },

          $a: {
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

          // options at rule level
          $a1: {
            '@options': {
              prefix: false,
              sort: false,
              rtl: false,
            },

            // Keyframes nested
            '@keyframes a1': {
              '0%': {
                color: 'lightgreen',
              },
              '40%': {
                color: 'orange',
              },
            },

            width: '100%',

            maxWidth: 100,

            margin: [0, 14, 4, 40],

            // Array of arrays
            background: ['#faa', 'url("a.jpg")', 'no-repeat', 'right', 'top'],

            animationName: '$a1',
            animationDuration: 1.4,

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
          },

          $a7: {
            // Function
            background: props => props.a === 1 ? 'azure' : 'aliceblue',
          },

          $a8: {
            // AmauiSubscription
            background: subs.media,
          },

          // Additionaly nested
          $a9: {
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
                  paddingLeft: 41,
                  padding: 40,

                  // prefixes
                  position: 'sticky',
                  transition: 'all .4s ease',
                  maskOrigin: 'inherit',
                  maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
                  maskPosition: '40% 74%',
                }

              }

            },

          },

          // Reference class name
          // and empty rules and with options nested
          $a10: {

            '& $a1': {

              '& > a': {

                '&:active': {
                  '@options': {
                    prefix: false,
                    sort: false,
                    rtl: false,
                  },

                  color: 'orange',

                  // rtl
                  marginLeft: 40,
                  float: 'left',

                  // sort
                  paddingLeft: 41,
                  padding: 40,

                  // prefixes
                  position: 'sticky',
                  transition: 'all .4s ease',
                  maskOrigin: 'margin-box',
                  maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
                  maskPosition: '40% 74%',
                }

              }

            },

            // Multiple refs
            '& $a1 $a4$a7': {
              color: 'yellow'
            },

          },

          // Reference of non-existing refs
          // + reuse of a10 as it has the same hash
          $a11: {

            '& $ad $a114': {
              color: 'white',
            },

          },

          // Reference multiple
          $a12: {

            '& $a4& &': {
              color: 'white',
            },

          },

          // Empty rules
          // Ought not to be added as it's not dynamic, and it has empty rules
          $a13: {

          },

          $ad: props => props.a === 1 ? {
            width: 100,

            'max-width': 100,

            // Simple
            background: '#faa',

            margin: '0 14px 4px 40px',

            // rtl
            marginLeft: 41,
            float: 'left',

            // sort
            paddingRight: 41,
            padding: 40,

            // prefixes
            position: 'sticky',
            transition: 'all .4s ease',
            maskOrigin: 'inherit',
            maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
            maskPosition: '40% 74%',

            // animation
            animation: '$a .4s ease',
          } : {
            width: 100,

            'max-width': 100,

            // Simple
            background: 'orange',

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
            maskComposite: 'inherit',

            // animation
            animation: '$a .4s ease',
          },

          $ad1: subs.var,
        },

      },

      a40: {
        color: 'beige',
        padding: 41,

        '@media only screen and (min-width: 1404px)': {
          '&': {
            color: 'orange',
          },
        }
      }

    });

    const amauiTheme = new AmauiStyle.AmauiTheme({});

    const style = AmauiStyle.style(a, { amaui_style: { value: amauiStyle }, amaui_theme: { value: amauiTheme } });

    // Add
    style.add();

    const response = [
      style.amaui_style_sheet_manager.css
    ];

    const valueNode = response;

    const values = [valueNode, ...valueBrowsers];

    assert(values).eql([
      [
        "\n\nmain {\nmargin: 40px;\n}\n\nbody {\nmargin: 40px;\n}\n\na {\nmargin: 4px;\n}\n\n@keyframes a-0 {\n0% {\ncolor: white;\n}\n40% {\ncolor: yellow;\n}\n}\n\n.a-0 {\nwidth: 100px;\nmax-width: 100px;\nbackground: #FFEB3B;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nfloat: left;\npadding-left: 41px;\npadding: 40px;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\nanimation: a-0 .4s ease;\n}\n\n.a1-0 {\nwidth: 100%;\nmax-width: 100px;\nmargin: 0px 14px 4px 40px;\nbackground: #faa url(\"a.jpg\") no-repeat right top;\nanimation-name: a1-1;\nanimation-duration: 1.4s;\nmargin-left: 41px;\nfloat: left;\npadding-left: 41px;\npadding: 40px;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\n}\n\n.a2-0 {\nmargin: 0px 14px 4em;\nbackground: url(\"a.jpg\") no-repeat right top, url(\"ad.jpg\") no-repeat right top, url(\"ad.jpg\") no-repeat right top;\n}\n\n.a3-0 {\nbackground: url(\"a.jpg\") no-repeat center right, url(\"a.jpg\") repeat-y center center, url(\"ad.jpg\") repeat-y center;\n}\n\n.a4-0 {\nbackground: #faa;\nbackground: #fff url(\"a.jpg\") no-repeat right top;\nbackground: url(\"a.jpg\") no-repeat right top, url(\"a.jpg\") no-repeat right top, url(\"ad.jpg\") no-repeat right top;\nbackground: #faa;\n}\n\n.a6-0 {\nbackground: orange url(\"a.jpg\") repeat-y center center;\n}\n\n.a9-0 {\ncolor: yellow;\n}\n\n.aa-0 {\nwidth: 100px;\nmax-width: 100%;\nbackground: orange;\nmargin-left: 41px;\nfloat: left;\npadding-right: 41px;\npadding: 40px;\n}\n\n@media only screen and (min-width: 1404px) {\n.a-0 {\ncolor: beige;\n}\n.var-0 {\ncolor: yellow;\n}\n}\n\n.a40-0 {\ncolor: beige;\npadding: 41px;\n}\n\n@keyframes a1-1 {\n0% {\ncolor: lightgreen;\n}\n40% {\ncolor: orange;\n}\n}\n\n.a9-0 .a19 {\ncolor: white;\n}\n\n.a10-0 .a1-0 .a4-0.a7-0 {\ncolor: yellow;\n}\n\n.a10-0 .ad-0 .a114-0 {\ncolor: white;\n}\n\n.a10-0 .a4-0.a10-0 .a10-0 {\ncolor: white;\n}\n\n@media only screen and (min-width: 1404px) {\n.a40-0 {\ncolor: orange;\n}\n}\n\nbody .a-0 {\ncolor: yellow;\n}\n\n.a9-0 .a19 > a {\ncolor: yellow;\n}\n\n.a9-0 .a19 > a:active {\ncolor: orange;\nmargin-left: 40px;\nfloat: left;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: margin-box;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\n}\n\n.a10-0 .a1-0 > a:active {\ncolor: orange;\nmargin-left: 40px;\nfloat: left;\npadding-left: 41px;\npadding: 40px;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: margin-box;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\n}\n\n\n\narea {\ncolor: beige;\n}\n\nmeta {\nmargin: 1114px;\n}\n\n.a7-0 {\nbackground: orange;\n}\n\n.a8-0 {\nbackground: beige;\n}\n\n.ad-0 {\nwidth: 100px;\nmax-width: 100px;\nbackground: orange;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nfloat: left;\npadding-left: 41px;\npadding: 40px;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\nanimation: a-0 .4s ease;\n}\n\n.ad1-0 {\nwidth: 100px;\nmax-width: 100px;\nbackground: #faa;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nfloat: left;\npadding-left: 41px;\npadding: 40px;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\nanimation: a-0 .4s ease;\n}\n\n@media only screen and (max-width: 1414px) {\nbody {\nmargin: 40px;\nbackground: beige;\n}\nmain {\nmargin: 40px;\n}\narea {\ncolor: beige;\n}\na {\nmargin: 4px;\n}\nmeta {\nmargin: 1114px;\n}\n.a-0 {\nwidth: 100px;\nmax-width: 100px;\nbackground: #FFEB3B;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nfloat: left;\npadding-left: 41px;\npadding: 40px;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\nanimation: a-0 .4s ease;\n}\n.a1-0 {\nwidth: 100%;\nmax-width: 100px;\nmargin: 0px 14px 4px 40px;\nbackground: #faa url(\"a.jpg\") no-repeat right top;\nanimation-name: a1-1;\nanimation-duration: 1.4s;\nmargin-left: 41px;\nfloat: left;\npadding-left: 41px;\npadding: 40px;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\n}\n.a7-0 {\nbackground: aliceblue;\n}\n.a8-1 {\nbackground: yellow;\n}\n.a9-0 {\ncolor: yellow;\n}\n.ad-0 {\nwidth: 100px;\nmax-width: 100px;\nbackground: orange;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nfloat: left;\npadding-left: 41px;\npadding: 40px;\ntransition: all .4s ease;\nmask-composite: inherit;\nanimation: a-0 .4s ease;\n}\n.ad1-1 {\nwidth: 100px;\nmax-width: 100px;\nbackground: #faa;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nfloat: left;\npadding-left: 41px;\npadding: 40px;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\nanimation: a-0 .4s ease;\n}\n@media print {\nbody {\nbackground: beige;\n}\n.a-0 {\nwidth: 100px;\nmax-width: 100px;\nbackground: #faa;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nfloat: left;\npadding-left: 41px;\npadding: 40px;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\nanimation: a-0 .4s ease;\n}\n.a1-0 {\nwidth: 100%;\nmax-width: 100px;\nmargin: 0px 14px 4px 40px;\nbackground: #faa url(\"a.jpg\") no-repeat right top;\nanimation-name: a1-1;\nanimation-duration: 1.4s;\nmargin-left: 41px;\nfloat: left;\npadding-left: 41px;\npadding: 40px;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\n}\n.a7-0 {\nbackground: aliceblue;\n}\n.a8-1 {\nbackground: yellow;\n}\n.a9-0 {\ncolor: yellow;\n}\n.ad-0 {\nwidth: 100px;\nmax-width: 100px;\nbackground: orange;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nfloat: left;\npadding-left: 41px;\npadding: 40px;\nposition: sticky;\ntransition: all .4s ease;\nmask-composite: inherit;\nanimation: a-0 .4s ease;\n}\n.ad1-1 {\nwidth: 100px;\nmax-width: 100px;\nbackground: #faa;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nfloat: left;\npadding-left: 41px;\npadding: 40px;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\nanimation: a-0 .4s ease;\n}\n.a9-0 .a19 {\ncolor: white;\n}\n.a10-0 .a1-0 .a4-0.a7-0 {\ncolor: yellow;\n}\n.a10-0 .ad-0 .a114-0 {\ncolor: white;\n}\n.a10-0 .a4-0.a10-0 .a10-0 {\ncolor: white;\n}\n.a9-0 .a19 > a {\ncolor: yellow;\n}\n.a9-0 .a19 > a:active {\ncolor: orange;\nmargin-left: 40px;\nfloat: left;\npadding-left: 41px;\npadding: 40px;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\n}\n.a10-0 .a1-0 > a:active {\ncolor: orange;\nmargin-left: 40px;\nfloat: left;\npadding-left: 41px;\npadding: 40px;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: margin-box;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\n}\n}\nbody .a-0 {\ncolor: yellow;\n}\narea .a-0 {\ncolor: yellow;\n}\n.a9-0 .a19 {\ncolor: white;\n}\n.a10-0 .a1-0 .a4-0.a7-0 {\ncolor: yellow;\n}\n.a10-0 .ad-0 .a114-0 {\ncolor: white;\n}\n.a10-0 .a4-0.a10-0 .a10-0 {\ncolor: white;\n}\n.a9-0 .a19 > a {\ncolor: yellow;\n}\n.a9-0 .a19 > a:active {\ncolor: orange;\nmargin-left: 40px;\nfloat: left;\npadding-left: 41px;\npadding: 40px;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\n}\n.a10-0 .a1-0 > a:active {\ncolor: orange;\nmargin-left: 40px;\nfloat: left;\npadding-left: 41px;\npadding: 40px;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: margin-box;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\n}\n}\n\n.ad-0 .a1-0 {\ncolor: yellow;\n}\n\narea .a-0 {\ncolor: yellow;\n}\n\n@keyframes a1 {\n0% {\ncolor: lightgreen;\n}\n40% {\ncolor: orange;\n}\n}\n\n@keyframes a1 {\n0% {\ncolor: lightgreen;\n}\n40% {\ncolor: orange;\n}\n}\n\n"
      ],
      [
        "\n\nmain { margin: 40px; }\n\nbody .aa { color: yellow; }\n\nbody { margin: 40px; }\n\na { margin: 4px; }\n\n@keyframes a-0 { \n  0% { color: white; }\n  40% { color: yellow; }\n}\n\n.aa { width: 100px; max-width: 100px; background: rgb(255, 235, 59); margin: 0px 14px 4px 41px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; animation: 0.4s ease 0s 1 normal none running a-0; }\n\n@keyframes a1-1 { \n  0% { color: lightgreen; }\n  40% { color: orange; }\n}\n\n.ab { width: 100%; max-width: 100px; margin: 0px 14px 4px 41px; background: url(\"a.jpg\") right top no-repeat rgb(255, 170, 170); animation-name: a1-1; animation-duration: 1.4s; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; }\n\n.ac { margin: 0px 14px 4em; background: url(\"a.jpg\") right top no-repeat, url(\"ad.jpg\") right top no-repeat, url(\"ad.jpg\") right top no-repeat; }\n\n.ad { background: url(\"a.jpg\") right center no-repeat, url(\"a.jpg\") center center repeat-y, url(\"ad.jpg\") center center repeat-y; }\n\n.ae { background: rgb(255, 170, 170); }\n\n.af { background: url(\"a.jpg\") center center repeat-y orange; }\n\n.ag .a19 > a:active { color: orange; margin-left: 40px; float: left; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }\n\n.ag .a19 > a { color: yellow; }\n\n.ag .a19 { color: white; }\n\n.ag { color: yellow; }\n\n.ai .ab > a:active { color: orange; margin-left: 40px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; }\n\n.ai .ab .ae.ah { color: yellow; }\n\n.al { width: 100px; max-width: 100%; background: orange; margin-left: 41px; float: left; padding: 40px; }\n\n@media only screen and (min-width: 1404px) {\n  .aa { color: beige; }\n  .am { color: yellow; }\n}\n\n@media only screen and (min-width: 1404px) {\n  .an { color: orange; }\n}\n\n.an { color: beige; padding: 41px; }\n\n.ai .aj .ak { color: white; }\n\n.ai .ae.ai .ai { color: white; }\n\narea .aa { color: yellow; }\n\narea { color: beige; }\n\nmeta { margin: 1114px; }\n\n.ah { background: orange; }\n\n.ao { background: beige; }\n\n.aj .ab { color: yellow; }\n\n.aj { width: 100px; max-width: 100px; background: orange; margin: 0px 14px 4px 41px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; animation: 0.4s ease 0s 1 normal none running a-0; }\n\n.ap { width: 100px; max-width: 100px; background: rgb(255, 170, 170); margin: 0px 14px 4px 41px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; animation: 0.4s ease 0s 1 normal none running a-0; }\n\n@keyframes a1 { \n  0% { color: lightgreen; }\n  40% { color: orange; }\n}\n\n@keyframes a1 { \n  0% { color: lightgreen; }\n  40% { color: orange; }\n}\n\n@media only screen and (max-width: 1414px) {\n  body { margin: 40px; background: beige; }\n  main { margin: 40px; }\n  area { color: beige; }\n  a { margin: 4px; }\n  meta { margin: 1114px; }\n  .aa { width: 100px; max-width: 100px; background: rgb(255, 235, 59); margin: 0px 14px 4px 41px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; animation: 0.4s ease 0s 1 normal none running a-0; }\n  .ab { width: 100%; max-width: 100px; margin: 0px 14px 4px 41px; background: url(\"a.jpg\") right top no-repeat rgb(255, 170, 170); animation-name: a1-1; animation-duration: 1.4s; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; }\n  .ah { background: aliceblue; }\n  .aq { background: yellow; }\n  .ag { color: yellow; }\n  .aj { width: 100px; max-width: 100px; background: orange; margin: 0px 14px 4px 41px; float: left; padding: 40px; transition: all 0.4s ease 0s; animation: 0.4s ease 0s 1 normal none running a-0; }\n  .ar { width: 100px; max-width: 100px; background: rgb(255, 170, 170); margin: 0px 14px 4px 41px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; animation: 0.4s ease 0s 1 normal none running a-0; }\n  @media print {\n  body { background: beige; }\n  .aa { width: 100px; max-width: 100px; background: rgb(255, 170, 170); margin: 0px 14px 4px 41px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; animation: 0.4s ease 0s 1 normal none running a-0; }\n  .ab { width: 100%; max-width: 100px; margin: 0px 14px 4px 41px; background: url(\"a.jpg\") right top no-repeat rgb(255, 170, 170); animation-name: a1-1; animation-duration: 1.4s; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; }\n  .ah { background: aliceblue; }\n  .aq { background: yellow; }\n  .ag { color: yellow; }\n  .aj { width: 100px; max-width: 100px; background: orange; margin: 0px 14px 4px 41px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; animation: 0.4s ease 0s 1 normal none running a-0; }\n  .ar { width: 100px; max-width: 100px; background: rgb(255, 170, 170); margin: 0px 14px 4px 41px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; animation: 0.4s ease 0s 1 normal none running a-0; }\n  .ag .a19 { color: white; }\n  .ai .ab .ae.ah { color: yellow; }\n  .ai .aj .ak { color: white; }\n  .ai .ae.ai .ai { color: white; }\n  .ag .a19 > a { color: yellow; }\n  .ag .a19 > a:active { color: orange; margin-left: 40px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; }\n  .ai .ab > a:active { color: orange; margin-left: 40px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; }\n}\n  body .aa { color: yellow; }\n  area .aa { color: yellow; }\n  .ag .a19 { color: white; }\n  .ai .ab .ae.ah { color: yellow; }\n  .ai .aj .ak { color: white; }\n  .ai .ae.ai .ai { color: white; }\n  .ag .a19 > a { color: yellow; }\n  .ag .a19 > a:active { color: orange; margin-left: 40px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; }\n  .ai .ab > a:active { color: orange; margin-left: 40px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; }\n}"
      ],
      [
        "\n\nmain { margin: 40px; }\n\nbody .aa { color: yellow; }\n\nbody { margin: 40px; }\n\na { margin: 4px; }\n\n@keyframes a-0 {\n0% { color: white; }\n40% { color: yellow; }\n}\n\n@media only screen and (min-width: 1404px) {\n  .aa { color: beige; }\n  .ab { color: yellow; }\n}\n\n.aa { width: 100px; max-width: 100px; background: rgb(255, 235, 59) none repeat scroll 0% 0%; margin: 0px 14px 4px 41px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-origin: inherit; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; animation: 0.4s ease 0s 1 normal none running a-0; }\n\n@keyframes a1-1 {\n0% { color: lightgreen; }\n40% { color: orange; }\n}\n\n.ac { width: 100%; max-width: 100px; margin: 0px 14px 4px 41px; background: rgb(255, 170, 170) url(\"a.jpg\") no-repeat scroll right top; animation-name: a1-1; animation-duration: 1.4s; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-origin: inherit; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; }\n\n.ad { margin: 0px 14px 4em; background: url(\"a.jpg\") no-repeat scroll right top, url(\"ad.jpg\") no-repeat scroll right top, rgba(0, 0, 0, 0) url(\"ad.jpg\") no-repeat scroll right top; }\n\n.ae { background: url(\"a.jpg\") no-repeat scroll right center, url(\"a.jpg\") repeat-y scroll center center, rgba(0, 0, 0, 0) url(\"ad.jpg\") repeat-y scroll center center; }\n\n.af { background: rgb(255, 170, 170) none repeat scroll 0% 0%; }\n\n.ag { background: orange url(\"a.jpg\") repeat-y scroll center center; }\n\n.ah .a19 > a:active { color: orange; margin-left: 40px; float: left; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; }\n\n.ah .a19 > a { color: yellow; }\n\n.ah .a19 { color: white; }\n\n.ah { color: yellow; }\n\n.aj .ac > a:active { color: orange; margin-left: 40px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; }\n\n.aj .ac .af.ai { color: yellow; }\n\n.am { width: 100px; max-width: 100%; background: orange none repeat scroll 0% 0%; margin-left: 41px; float: left; padding: 40px; }\n\n@media only screen and (min-width: 1404px) {\n  .an { color: orange; }\n}\n\n.an { color: beige; padding: 41px; }\n\n.aj .ak .al { color: white; }\n\n.aj .af.aj .aj { color: white; }\n\narea .aa { color: yellow; }\n\narea { color: beige; }\n\nmeta { margin: 1114px; }\n\n@keyframes a1 {\n0% { color: lightgreen; }\n40% { color: orange; }\n}\n\n@keyframes a1 {\n0% { color: lightgreen; }\n40% { color: orange; }\n}\n\n@media only screen and (max-width: 1414px) {\n  body { margin: 40px; background: beige none repeat scroll 0% 0%; }\n  main { margin: 40px; }\n  area { color: beige; }\n  a { margin: 4px; }\n  meta { margin: 1114px; }\n  .aa { width: 100px; max-width: 100px; background: rgb(255, 235, 59) none repeat scroll 0% 0%; margin: 0px 14px 4px 41px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-origin: inherit; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; animation: 0.4s ease 0s 1 normal none running a-0; }\n  .ac { width: 100%; max-width: 100px; margin: 0px 14px 4px 41px; background: rgb(255, 170, 170) url(\"a.jpg\") no-repeat scroll right top; animation-name: a1-1; animation-duration: 1.4s; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-origin: inherit; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; }\n  .ai { background: aliceblue none repeat scroll 0% 0%; }\n  .ao { background: yellow none repeat scroll 0% 0%; }\n  .ah { color: yellow; }\n  .ak { width: 100px; max-width: 100px; background: orange none repeat scroll 0% 0%; margin: 0px 14px 4px 41px; float: left; padding: 40px; transition: all 0.4s ease 0s; mask-composite: inherit; animation: 0.4s ease 0s 1 normal none running a-0; }\n  .ap { width: 100px; max-width: 100px; background: rgb(255, 170, 170) none repeat scroll 0% 0%; margin: 0px 14px 4px 41px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-origin: inherit; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; animation: 0.4s ease 0s 1 normal none running a-0; }\n  @media print {\n  body { background: beige none repeat scroll 0% 0%; }\n  .aa { width: 100px; max-width: 100px; background: rgb(255, 170, 170) none repeat scroll 0% 0%; margin: 0px 14px 4px 41px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-origin: inherit; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; animation: 0.4s ease 0s 1 normal none running a-0; }\n  .ac { width: 100%; max-width: 100px; margin: 0px 14px 4px 41px; background: rgb(255, 170, 170) url(\"a.jpg\") no-repeat scroll right top; animation-name: a1-1; animation-duration: 1.4s; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-origin: inherit; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; }\n  .ai { background: aliceblue none repeat scroll 0% 0%; }\n  .ao { background: yellow none repeat scroll 0% 0%; }\n  .ah { color: yellow; }\n  .ak { width: 100px; max-width: 100px; background: orange none repeat scroll 0% 0%; margin: 0px 14px 4px 41px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-composite: inherit; animation: 0.4s ease 0s 1 normal none running a-0; }\n  .ap { width: 100px; max-width: 100px; background: rgb(255, 170, 170) none repeat scroll 0% 0%; margin: 0px 14px 4px 41px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-origin: inherit; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; animation: 0.4s ease 0s 1 normal none running a-0; }\n  .ah .a19 { color: white; }\n  .aj .ac .af.ai { color: yellow; }\n  .aj .ak .al { color: white; }\n  .aj .af.aj .aj { color: white; }\n  .ah .a19 > a { color: yellow; }\n  .ah .a19 > a:active { color: orange; margin-left: 40px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-origin: inherit; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; }\n  .aj .ac > a:active { color: orange; margin-left: 40px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; }\n}\n  body .aa { color: yellow; }\n  area .aa { color: yellow; }\n  .ah .a19 { color: white; }\n  .aj .ac .af.ai { color: yellow; }\n  .aj .ak .al { color: white; }\n  .aj .af.aj .aj { color: white; }\n  .ah .a19 > a { color: yellow; }\n  .ah .a19 > a:active { color: orange; margin-left: 40px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-origin: inherit; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; }\n  .aj .ac > a:active { color: orange; margin-left: 40px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; }\n}\n\n.ai { background: orange none repeat scroll 0% 0%; }\n\n.aq { background: beige none repeat scroll 0% 0%; }\n\n.ak .ac { color: yellow; }\n\n.ak { width: 100px; max-width: 100px; background: orange none repeat scroll 0% 0%; margin: 0px 14px 4px 41px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-origin: inherit; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; animation: 0.4s ease 0s 1 normal none running a-0; }\n\n.ar { width: 100px; max-width: 100px; background: rgb(255, 170, 170) none repeat scroll 0% 0%; margin: 0px 14px 4px 41px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-origin: inherit; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; animation: 0.4s ease 0s 1 normal none running a-0; }"
      ],
      [
        "\n\nmain { margin: 40px; }\n\nbody .aa { color: yellow; }\n\nbody { margin: 40px; }\n\na { margin: 4px; }\n\n@-webkit-keyframes a-0 { \n  0% { color: white; }\n  40% { color: yellow; }\n}\n\n.aa { width: 100px; max-width: 100px; background-color: rgb(255, 235, 59); margin: 0px 14px 4px 41px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-origin: inherit; mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; animation: 0.4s ease 0s 1 normal none running a-0; }\n\n@-webkit-keyframes a1-1 { \n  0% { color: lightgreen; }\n  40% { color: orange; }\n  0% { color: lightgreen; }\n  40% { color: orange; }\n  0% { color: lightgreen; }\n  40% { color: orange; }\n}\n\n.ab { width: 100%; max-width: 100px; margin: 0px 14px 4px 41px; background-image: url(\"a.jpg\"); background-color: rgb(255, 170, 170); animation-name: a1-1; animation-duration: 1.4s; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-origin: inherit; mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; background-position: right top; background-repeat: no-repeat no-repeat; }\n\n.ac { margin: 0px 14px 4em; background-image: url(\"a.jpg\"), url(\"ad.jpg\"), url(\"ad.jpg\"); background-size: initial, initial, initial; background-attachment: initial, initial, initial; background-origin: initial, initial, initial; background-clip: initial, initial, initial; background-position: right top, right top, right top; background-repeat: no-repeat, no-repeat, no-repeat; }\n\n.ad { background-image: url(\"a.jpg\"), url(\"a.jpg\"), url(\"ad.jpg\"); background-size: initial, initial, initial; background-attachment: initial, initial, initial; background-origin: initial, initial, initial; background-clip: initial, initial, initial; background-position: right center, center center, center center; background-repeat: no-repeat, repeat-y, repeat-y; }\n\n.ae { background-color: rgb(255, 170, 170); }\n\n.af { background-image: url(\"a.jpg\"); background-color: orange; background-position: center center; background-repeat: no-repeat repeat; }\n\n.ag .a19 > a:active { color: orange; margin-left: 40px; float: left; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; }\n\n.ag .a19 > a { color: yellow; }\n\n.ag .a19 { color: white; }\n\n.ag { color: yellow; }\n\n.ai .ab > a:active { color: orange; margin-left: 40px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; }\n\n.ai .ab .ae.ah { color: yellow; }\n\n.al { width: 100px; max-width: 100%; background-color: orange; margin-left: 41px; float: left; padding: 40px; }\n\n@media only screen and (min-width: 1404px) {\n  .aa { color: beige; }\n  .am { color: yellow; }\n}\n\n@media only screen and (min-width: 1404px) {\n  .an { color: orange; }\n}\n\n.an { color: beige; padding: 41px; }\n\n.ai .aj .ak { color: white; }\n\n.ai .ae.ai .ai { color: white; }\n\narea .aa { color: yellow; }\n\narea { color: beige; }\n\nmeta { margin: 1114px; }\n\n.ah { background-color: orange; }\n\n.ao { background-color: beige; }\n\n.aj .ab { color: yellow; }\n\n.aj { width: 100px; max-width: 100px; background-color: orange; margin: 0px 14px 4px 41px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-origin: inherit; mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; animation: 0.4s ease 0s 1 normal none running a-0; }\n\n.ap { width: 100px; max-width: 100px; background-color: rgb(255, 170, 170); margin: 0px 14px 4px 41px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-origin: inherit; mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; animation: 0.4s ease 0s 1 normal none running a-0; }\n\n@-webkit-keyframes a1 { \n  0% { color: lightgreen; }\n  40% { color: orange; }\n  0% { color: lightgreen; }\n  40% { color: orange; }\n  0% { color: lightgreen; }\n  40% { color: orange; }\n  0% { color: lightgreen; }\n  40% { color: orange; }\n  0% { color: lightgreen; }\n  40% { color: orange; }\n}\n\n@-webkit-keyframes a1 { \n  0% { color: lightgreen; }\n  40% { color: orange; }\n  0% { color: lightgreen; }\n  40% { color: orange; }\n  0% { color: lightgreen; }\n  40% { color: orange; }\n  0% { color: lightgreen; }\n  40% { color: orange; }\n  0% { color: lightgreen; }\n  40% { color: orange; }\n  0% { color: lightgreen; }\n  40% { color: orange; }\n  0% { color: lightgreen; }\n  40% { color: orange; }\n  0% { color: lightgreen; }\n  40% { color: orange; }\n  0% { color: lightgreen; }\n  40% { color: orange; }\n}\n\n@media only screen and (max-width: 1414px) {\n  body { margin: 40px; background-color: beige; }\n  main { margin: 40px; }\n  area { color: beige; }\n  a { margin: 4px; }\n  meta { margin: 1114px; }\n  .aa { width: 100px; max-width: 100px; background-color: rgb(255, 235, 59); margin: 0px 14px 4px 41px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-origin: inherit; mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; animation: 0.4s ease 0s 1 normal none running a-0; }\n  .ab { width: 100%; max-width: 100px; margin: 0px 14px 4px 41px; background-image: url(\"a.jpg\"); background-color: rgb(255, 170, 170); animation-name: a1-1; animation-duration: 1.4s; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-origin: inherit; mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; background-position: right top; background-repeat: no-repeat no-repeat; }\n  .ah { background-color: aliceblue; }\n  .aq { background-color: yellow; }\n  .ag { color: yellow; }\n  .aj { width: 100px; max-width: 100px; background-color: orange; margin: 0px 14px 4px 41px; float: left; padding: 40px; transition: all 0.4s ease 0s; mask-composite: inherit; animation: 0.4s ease 0s 1 normal none running a-0; }\n  .ar { width: 100px; max-width: 100px; background-color: rgb(255, 170, 170); margin: 0px 14px 4px 41px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-origin: inherit; mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; animation: 0.4s ease 0s 1 normal none running a-0; }\n  @media print {\n  body { background-color: beige; }\n  .aa { width: 100px; max-width: 100px; background-color: rgb(255, 170, 170); margin: 0px 14px 4px 41px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-origin: inherit; mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; animation: 0.4s ease 0s 1 normal none running a-0; }\n  .ab { width: 100%; max-width: 100px; margin: 0px 14px 4px 41px; background-image: url(\"a.jpg\"); background-color: rgb(255, 170, 170); animation-name: a1-1; animation-duration: 1.4s; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-origin: inherit; mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; background-position: right top; background-repeat: no-repeat no-repeat; }\n  .ah { background-color: aliceblue; }\n  .aq { background-color: yellow; }\n  .ag { color: yellow; }\n  .aj { width: 100px; max-width: 100px; background-color: orange; margin: 0px 14px 4px 41px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-composite: inherit; animation: 0.4s ease 0s 1 normal none running a-0; }\n  .ar { width: 100px; max-width: 100px; background-color: rgb(255, 170, 170); margin: 0px 14px 4px 41px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-origin: inherit; mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; animation: 0.4s ease 0s 1 normal none running a-0; }\n  .ag .a19 { color: white; }\n  .ai .ab .ae.ah { color: yellow; }\n  .ai .aj .ak { color: white; }\n  .ai .ae.ai .ai { color: white; }\n  .ag .a19 > a { color: yellow; }\n  .ag .a19 > a:active { color: orange; margin-left: 40px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-origin: inherit; mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; }\n  .ai .ab > a:active { color: orange; margin-left: 40px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; }\n}\n  body .aa { color: yellow; }\n  area .aa { color: yellow; }\n  .ag .a19 { color: white; }\n  .ai .ab .ae.ah { color: yellow; }\n  .ai .aj .ak { color: white; }\n  .ai .ae.ai .ai { color: white; }\n  .ag .a19 > a { color: yellow; }\n  .ag .a19 > a:active { color: orange; margin-left: 40px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-origin: inherit; mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; }\n  .ai .ab > a:active { color: orange; margin-left: 40px; float: left; padding: 40px; position: sticky; transition: all 0.4s ease 0s; mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; }\n}"
      ]
    ]);
  });

});
