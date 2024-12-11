/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';
import * as OnesyUtils from '@onesy/utils';

import { evaluate } from '../utils/js/test/utils';

import * as OnesyStyle from '../src';
import { TValue } from '../src';

group('OnesyStyle', () => {

  preEveryGroupTo(async () => {
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

      new window.OnesyStyle.OnesyStyle(window.document.getElementById('a14'));
      new window.OnesyStyle.OnesyStyle(window.document.getElementById('a1'));
      new window.OnesyStyle.OnesyStyle(window.document.getElementById('a'));
      new window.OnesyStyle.OnesyStyle(window.document.body);
    });
  });

  group('OnesyStyle', () => {

    to('all', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        return window.OnesyStyle.OnesyStyle.all(window.document.getElementById('a14')).map(item => item.element.id || item.element.tagName.toLowerCase());
      });

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
        const item = window.OnesyStyle.OnesyStyle.nearest(window.document.getElementById('a14'));

        return item.element.id || item.element.tagName.toLowerCase();
      });

      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eq('a14'));
    });

    to('furthest', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const item = window.OnesyStyle.OnesyStyle.furthest(window.document.getElementById('a14'));

        return item.element.id || item.element.tagName.toLowerCase();
      });

      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eq('body'));
    });

    to('first', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const item = window.OnesyStyle.OnesyStyle.first(window.document.getElementById('a14'));

        return item.element.id || item.element.tagName.toLowerCase();
      });

      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eq('a14'));
    });

    to('last', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const item = window.OnesyStyle.OnesyStyle.last(window.document.getElementById('a14'));

        return item.element.id || item.element.tagName.toLowerCase();
      });

      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eq('body'));
    });

    group('get', () => {

      to('0', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const item = window.OnesyStyle.OnesyStyle.get(window.document.getElementById('a14'), 0);

          return item.element.id || item.element.tagName.toLowerCase();
        });

        const values = [...valueBrowsers];

        values.forEach(value => assert(value).eq('a14'));
      });

      to('1', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const item = window.OnesyStyle.OnesyStyle.get(window.document.getElementById('a14'), 1);

          return item.element.id || item.element.tagName.toLowerCase();
        });

        const values = [...valueBrowsers];

        values.forEach(value => assert(value).eq('a1'));
      });

      to('-1', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const item = window.OnesyStyle.OnesyStyle.get(window.document.getElementById('a14'), -1);

          return item.element.id || item.element.tagName.toLowerCase();
        });

        const values = [...valueBrowsers];

        values.forEach(value => assert(value).eq('body'));
      });

    });

  });

  to('onesyStyle', async () => {
    // Browser
    const valueBrowsers = await evaluate((window: any) => {
      window.document.body.dir = 'rtl';

      const onesyStyle = new window.OnesyStyle.OnesyStyle(window.document.body, 'regular', undefined, { rule: { prefix: false } });

      return [
        typeof onesyStyle.id === 'string',
        onesyStyle.element.tagName.toLowerCase(),
        onesyStyle.mode,
        onesyStyle.options,
        onesyStyle.renderer instanceof window.OnesyStyle.OnesyStyleRenderer,
      ];
    });

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
        },
        optimize: false
      },
      true
    ]));

    // Node
    const onesyStyle = new OnesyStyle.OnesyStyle({ rule: { prefix: false }, mode: 'regular' });

    const valueNode = [
      typeof onesyStyle.id === 'string',
      onesyStyle.mode,
      onesyStyle.options,
      onesyStyle.renderer instanceof OnesyStyle.OnesyStyleRenderer,
    ];

    assert(valueNode).eql([
      true,
      'regular',
      {
        rule: {
          sort: true,
          prefix: false,
          rtl: false
        },
        optimize: false
      },
      true
    ]);
  });

  to('direction', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.document.documentElement.dir = 'ltr';

      const onesyStyle = new window.OnesyStyle.OnesyStyle(window.document.documentElement, 'regular');

      const div = window.document.createElement('div');

      div.dir = 'rtl';

      window.document.body.append(div);

      const onesyStyle1 = new window.OnesyStyle.OnesyStyle(div, 'regular');

      return [
        onesyStyle.direction,
        onesyStyle.options.rule.rtl,
        onesyStyle1.direction,
        onesyStyle1.options.rule.rtl,
      ];
    });

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
      const onesyStyle = new window.OnesyStyle.OnesyStyle();

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

      window.OnesyStyle.style(a, { onesy_style: { value: onesyStyle } });

      return onesyStyle.sheet_managers.length;
    });

    const onesyStyle = new OnesyStyle.OnesyStyle();

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

    OnesyStyle.style(a, { onesy_style: { value: onesyStyle } });

    const valueNode = onesyStyle.sheet_managers.length;

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eq(1));
  });

  to('sheets', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const onesyStyle = new window.OnesyStyle.OnesyStyle();

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

      window.OnesyStyle.style(a, { onesy_style: { value: onesyStyle } });

      return onesyStyle.sheets.length;
    });

    const onesyStyle = new OnesyStyle.OnesyStyle();

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

    OnesyStyle.style(a, { onesy_style: { value: onesyStyle } });

    const valueNode = onesyStyle.sheets.length;

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eq(1));
  });

  to('values', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const onesyStyle = new window.OnesyStyle.OnesyStyle();

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

      window.OnesyStyle.style(a, { onesy_style: { value: onesyStyle } });

      return [OnesyUtils.equalDeep(onesyStyle.values, onesyStyle.response), onesyStyle.values];
    });

    const onesyStyle = new OnesyStyle.OnesyStyle();

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

    OnesyStyle.style(a, { onesy_style: { value: onesyStyle } });

    const valueNode = [OnesyUtils.equalDeep(onesyStyle.values, onesyStyle.response), onesyStyle.values];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      true,
      {
        "css": "\n\n.a-0 {\n  width: 100;\n  max-width: 100;\n  background: #faa;\n  margin: 0 14px 4px 40px;\n  margin-left: 41;\n  float: left;\n  padding-left: 41;\n  padding: 40;\n  position: sticky;\n  transition: all .4s ease;\n  mask-origin: inherit;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-position: 40% 74%;\n}\n\n"
      }
    ]));
  });

  group('response', () => {

    to('response', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const onesyStyle = new window.OnesyStyle.OnesyStyle();

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

        window.OnesyStyle.style(a, { onesy_style: { value: onesyStyle } });

        return [window.OnesyUtils.equalDeep(onesyStyle.values, onesyStyle.response), onesyStyle.response];
      });

      const onesyStyle = new OnesyStyle.OnesyStyle();

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

      OnesyStyle.style(a, { onesy_style: { value: onesyStyle } });

      const valueNode = [OnesyUtils.equalDeep(onesyStyle.values, onesyStyle.response), onesyStyle.response];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        true,
        {
          "css": "\n\n.a-0 {\n  width: 100;\n  max-width: 100;\n  background: #faa;\n  margin: 0 14px 4px 40px;\n  margin-left: 41;\n  float: left;\n  padding-left: 41;\n  padding: 40;\n  position: sticky;\n  transition: all .4s ease;\n  mask-origin: inherit;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-position: 40% 74%;\n}\n\n"
        }
      ]));
    });

    to('css', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const onesyStyle = new window.OnesyStyle.OnesyStyle();

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

        window.OnesyStyle.style(a, { onesy_style: { value: onesyStyle } });

        return [OnesyUtils.equalDeep(onesyStyle.css, onesyStyle.values.css), onesyStyle.css];
      });

      const onesyStyle = new OnesyStyle.OnesyStyle();

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

      OnesyStyle.style(a, { onesy_style: { value: onesyStyle } });

      const valueNode = [OnesyUtils.equalDeep(onesyStyle.css, onesyStyle.values.css), onesyStyle.css];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        true,
        "\n\n.a-0 {\n  width: 100;\n  max-width: 100;\n  background: #faa;\n  margin: 0 14px 4px 40px;\n  margin-left: 41;\n  float: left;\n  padding-left: 41;\n  padding: 40;\n  position: sticky;\n  transition: all .4s ease;\n  mask-origin: inherit;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-position: 40% 74%;\n}\n\n"
      ]));
    });

  });

  group('plugins', () => {

    to('add', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const onesyStyle = new window.OnesyStyle.OnesyStyle();

        // Individual
        onesyStyle.plugins.add = window.OnesyStyle.unit;

        // Many at the same time
        onesyStyle.plugins.add = [
          window.OnesyStyle.sort,
          window.OnesyStyle.prefix,
          window.OnesyStyle.makeClassName,
          window.OnesyStyle.rtl,
        ];

        return [
          onesyStyle.subscriptions.rule.unit.length,
          onesyStyle.subscriptions.rules.sort.length,
          onesyStyle.subscriptions.rule.prefix.length,
          onesyStyle.subscriptions.className.name.length,
          onesyStyle.subscriptions.rule.rtl.length,
        ];
      });

      const onesyStyle = new OnesyStyle.OnesyStyle();

      // Individual
      onesyStyle.plugins.add = OnesyStyle.unit;

      // Many at the same time
      onesyStyle.plugins.add = [
        OnesyStyle.sort,
        OnesyStyle.prefix,
        OnesyStyle.makeClassName,
        OnesyStyle.rtl,
      ];

      const valueNode = [
        onesyStyle.subscriptions.rule.unit.length,
        onesyStyle.subscriptions.rules.sort.length,
        onesyStyle.subscriptions.rule.prefix.length,
        onesyStyle.subscriptions.className.name.length,
        onesyStyle.subscriptions.rule.rtl.length,
      ];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql(new Array(5).fill(1)));
    });

    to('remove', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const onesyStyle = new window.OnesyStyle.OnesyStyle();

        // Individual
        onesyStyle.plugins.add = window.OnesyStyle.unit;

        // Many at the same time
        onesyStyle.plugins.add = [
          window.OnesyStyle.sort,
          window.OnesyStyle.prefix,
          window.OnesyStyle.makeClassName,
          window.OnesyStyle.rtl,
        ];

        const response = [
          onesyStyle.subscriptions.rule.unit.length,
          onesyStyle.subscriptions.rules.sort.length,
          onesyStyle.subscriptions.rule.prefix.length,
          onesyStyle.subscriptions.className.name.length,
          onesyStyle.subscriptions.rule.rtl.length,
        ];

        // Individual
        onesyStyle.plugins.remove = window.OnesyStyle.unit;

        // Many at the same time
        onesyStyle.plugins.remove = [
          window.OnesyStyle.sort,
          window.OnesyStyle.prefix,
          window.OnesyStyle.makeClassName,
          window.OnesyStyle.rtl,
        ];

        response.push(
          onesyStyle.subscriptions.rule.unit.length,
          onesyStyle.subscriptions.rules.sort.length,
          onesyStyle.subscriptions.rule.prefix.length,
          onesyStyle.subscriptions.className.name.length,
          onesyStyle.subscriptions.rule.rtl.length,
        );

        return response;
      });

      const onesyStyle = new OnesyStyle.OnesyStyle();

      // Individual
      onesyStyle.plugins.add = OnesyStyle.unit;

      // Many at the same time
      onesyStyle.plugins.add = [
        OnesyStyle.sort,
        OnesyStyle.prefix,
        OnesyStyle.makeClassName,
        OnesyStyle.rtl,
      ];

      const response = [
        onesyStyle.subscriptions.rule.unit.length,
        onesyStyle.subscriptions.rules.sort.length,
        onesyStyle.subscriptions.rule.prefix.length,
        onesyStyle.subscriptions.className.name.length,
        onesyStyle.subscriptions.rule.rtl.length,
      ];

      // Individual
      onesyStyle.plugins.remove = OnesyStyle.unit;

      // Many at the same time
      onesyStyle.plugins.remove = [
        OnesyStyle.sort,
        OnesyStyle.prefix,
        OnesyStyle.makeClassName,
        OnesyStyle.rtl,
      ];

      response.push(
        onesyStyle.subscriptions.rule.unit.length,
        onesyStyle.subscriptions.rules.sort.length,
        onesyStyle.subscriptions.rule.prefix.length,
        onesyStyle.subscriptions.className.name.length,
        onesyStyle.subscriptions.rule.rtl.length,
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
