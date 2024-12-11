/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';
import * as OnesyUtils from '@onesy/utils';

import { evaluate } from '../utils/js/test/utils';

import * as OnesyStyle from '../src';
import { TValue } from '../src';

group('OnesyStyleSheetManager', () => {

  to('onesyStyleSheetManager', async () => {
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
        }
      };

      const onesyStyleSheetManager = new window.OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      return [
        typeof onesyStyleSheetManager.id === 'string',
        onesyStyleSheetManager.mode === 'regular',
        onesyStyleSheetManager.status === 'inited',
        onesyStyleSheetManager.priority === 'upper',
        window.OnesyUtils.equalDeep(onesyStyleSheetManager.names.classNames, { a: 'a-0' }),
        window.OnesyUtils.equalDeep(onesyStyleSheetManager.names.classes, { a: 'a-0' }),
        window.OnesyUtils.equalDeep(onesyStyleSheetManager.names.className, 'a-0'),
        window.OnesyUtils.equalDeep(onesyStyleSheetManager.names.class, 'a-0'),
        window.OnesyUtils.equalDeep(onesyStyleSheetManager.options, {
          "name": "style",
          "style": {
            "attributes": {
              "method": "style"
            }
          },
          "rule": {
            "sort": true,
            "prefix": false,
            "rtl": true
          },
          onesy_style_cache: true
        }),
        !!onesyStyleSheetManager.onesyStyle,
        !onesyStyleSheetManager.onesyTheme,
        onesyStyleSheetManager.properties.static.length === 1,
        onesyStyleSheetManager.properties.static[0].property === 'a',
        window.OnesyUtils.equalDeep(onesyStyleSheetManager.properties.static[0].value, {
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
        onesyStyleSheetManager.properties.dynamic.length === 1,
        onesyStyleSheetManager.properties.dynamic[0].property === 'a7',
        Object.keys(onesyStyleSheetManager.properties.dynamic[0].value).length === 1,
        window.OnesyUtils.is('function', onesyStyleSheetManager.properties.dynamic[0].value.background),
        !onesyStyleSheetManager.pure,
        onesyStyleSheetManager.sheets.static.length === 1,
        onesyStyleSheetManager.sheets.dynamic.length === 0,
        window.OnesyUtils.equalDeep(onesyStyleSheetManager.values, { "css": onesyStyleSheetManager.css })
      ];
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

    const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const valueNode = [
      typeof onesyStyleSheetManager.id === 'string',
      onesyStyleSheetManager.mode === 'regular',
      onesyStyleSheetManager.status === 'inited',
      onesyStyleSheetManager.priority === 'upper',
      OnesyUtils.equalDeep(onesyStyleSheetManager.names.classNames, { a: 'a-0' }),
      OnesyUtils.equalDeep(onesyStyleSheetManager.names.classes, { a: 'a-0' }),
      OnesyUtils.equalDeep(onesyStyleSheetManager.names.className, 'a-0'),
      OnesyUtils.equalDeep(onesyStyleSheetManager.names.class, 'a-0'),
      OnesyUtils.equalDeep(onesyStyleSheetManager.options, {
        "name": "style",
        "style": {
          "attributes": {
            "method": "style"
          }
        },
        "rule": {
          "sort": true,
          "prefix": false,
          "rtl": true
        },
        onesy_style_cache: true
      }),
      !!onesyStyleSheetManager.onesyStyle,
      !onesyStyleSheetManager.onesyTheme,
      onesyStyleSheetManager.properties.static.length === 1,
      onesyStyleSheetManager.properties.static[0].property === 'a',
      OnesyUtils.equalDeep(onesyStyleSheetManager.properties.static[0].value, {
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
      onesyStyleSheetManager.properties.dynamic.length === 1,
      onesyStyleSheetManager.properties.dynamic[0].property === 'a7',
      Object.keys(onesyStyleSheetManager.properties.dynamic[0].value).length === 1,
      OnesyUtils.is('function', onesyStyleSheetManager.properties.dynamic[0].value.background),
      !onesyStyleSheetManager.pure,
      onesyStyleSheetManager.sheets.static.length === 1,
      onesyStyleSheetManager.sheets.dynamic.length === 0,
      OnesyUtils.equalDeep(onesyStyleSheetManager.values, { "css": onesyStyleSheetManager.css })
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql(new Array(22).fill(true)));
  });

  group('onesy_style_cache', () => {

    to('true', async () => {
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
            color: 'yellow',

            // Function
            background: props => props.a === 1 ? 'yellow' : 'orange',
          },
        };

        const onesyStyleSheetManager = new window.OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false }, onesy_style_cache: true });

        onesyStyleSheetManager.add();

        return onesyStyle.css;
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
          color: 'yellow',

          // Function
          background: props => props.a === 1 ? 'yellow' : 'orange',
        },
      };

      const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false }, onesy_style_cache: true });

      onesyStyleSheetManager.add();

      const valueNode = onesyStyle.css;

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eq('\n\n.a-0 {\n  width: 100;\n  max-width: 100;\n  background: #faa;\n  margin: 0 14px 4px 40px;\n  margin-left: 41;\n  float: left;\n  padding-left: 41;\n  padding: 40;\n  position: sticky;\n  transition: all .4s ease;\n  mask-origin: inherit;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-position: 40% 74%;\n}\n\n.a7-1 {\n  color: yellow;\n  background: orange;\n}\n\n'));
    });

    to('false', async () => {
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
            color: 'yellow',

            // Function
            background: props => props.a === 1 ? 'yellow' : 'orange',
          },
        };

        const onesyStyleSheetManager = new window.OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false }, onesy_style_cache: false });

        onesyStyleSheetManager.add();

        return onesyStyle.css;
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
          color: 'yellow',

          // Function
          background: props => props.a === 1 ? 'yellow' : 'orange',
        },
      };

      const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false }, onesy_style_cache: false });

      onesyStyleSheetManager.add();

      const valueNode = onesyStyle.css;

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eq(''));
    });

  });

  group('mode', () => {

    to('regular', async () => {
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
            color: 'yellow',

            // Function
            background: props => props.a === 1 ? 'yellow' : 'orange',
          },
        };

        const onesyStyleSheetManager = new window.OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const response = [];

        onesyStyleSheetManager.add();

        response.push(
          onesyStyleSheetManager.sheets.static[0].css,
          onesyStyleSheetManager.sheets.dynamic[0].css,
        );

        return response;
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
          color: 'yellow',

          // Function
          background: props => props.a === 1 ? 'yellow' : 'orange',
        },
      };

      const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      onesyStyleSheetManager.add();

      const valueNode = [
        onesyStyleSheetManager.sheets.static[0].css,
        onesyStyleSheetManager.sheets.dynamic[0].css,
      ];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        '\n.a-0 {\n  width: 100;\n  max-width: 100;\n  background: #faa;\n  margin: 0 14px 4px 40px;\n  margin-left: 41;\n  float: left;\n  padding-left: 41;\n  padding: 40;\n  position: sticky;\n  transition: all .4s ease;\n  mask-origin: inherit;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-position: 40% 74%;\n}\n',
        '\n.a7-1 {\n  color: yellow;\n  background: orange;\n}\n'
      ]));
    });

    to('atomic', async () => {
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
            color: 'yellow',

            // Function
            background: props => props.a === 1 ? 'yellow' : 'orange',
          },
        };

        const onesyStyleSheetManager = new window.OnesyStyle.OnesyStyleSheetManager(a, 'atomic', false, 'upper', undefined, onesyStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const response = [];

        onesyStyleSheetManager.add();

        response.push(
          onesyStyleSheetManager.sheets.static[0].css,
          onesyStyleSheetManager.sheets.dynamic[0].css,
        );

        return response;
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
          color: 'yellow',

          // Function
          background: props => props.a === 1 ? 'yellow' : 'orange',
        },
      };

      const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(a, { mode: 'atomic', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      onesyStyleSheetManager.add();

      const valueNode = [
        onesyStyleSheetManager.sheets.static[0].css,
        onesyStyleSheetManager.sheets.dynamic[0].css,
      ];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        '\n.aa-1 {\n  width: 100;\n}\n\n.ab-2 {\n  max-width: 100;\n}\n\n.ac-3 {\n  background: #faa;\n}\n\n.ad-4 {\n  margin: 0 14px 4px 40px;\n}\n\n.ae-5 {\n  margin-left: 41;\n}\n\n.af-6 {\n  float: left;\n}\n\n.ag-7 {\n  padding-left: 41;\n}\n\n.ah-8 {\n  padding: 40;\n}\n\n.ai-9 {\n  position: sticky;\n}\n\n.aj-10 {\n  transition: all .4s ease;\n}\n\n.ak-11 {\n  mask-origin: inherit;\n}\n\n.al-12 {\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n}\n\n.am-13 {\n  mask-position: 40% 74%;\n}\n',
        '\n.a7-15 {\n}\n\n.ao-16 {\n  color: yellow;\n}\n\n.ap-17 {\n  background: orange;\n}\n'
      ]));
    });

  });

  to('names', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const onesyStyle = new window.OnesyStyle.OnesyStyle();

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

      const onesyStyleSheetManager = new window.OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      return [
        onesyStyleSheetManager.names.classNames,
        onesyStyleSheetManager.names.classes,
        onesyStyleSheetManager.names.keyframes,
        onesyStyleSheetManager.names.styles('a', 'a4'),
      ];
    });

    const onesyStyle = new OnesyStyle.OnesyStyle();

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

    const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const valueNode = [
      onesyStyleSheetManager.names.classNames,
      onesyStyleSheetManager.names.classes,
      onesyStyleSheetManager.names.keyframes,
      onesyStyleSheetManager.names.styles('a', 'a4'),
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

      const onesyStyleSheetManager = new window.OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      onesyStyleSheetManager.add();

      const ids = onesyStyleSheetManager.ids;

      return [
        ids.static.length === 1,
        ids.dynamic.length === 1,
      ];
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

    const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    onesyStyleSheetManager.add();

    const ids = onesyStyleSheetManager.ids;

    const valueNode = [
      ids.static.length === 1,
      ids.dynamic.length === 1,
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql(new Array(2).fill(true)));
  });

  to('props', async () => {
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

      const onesyStyleSheetManager = new window.OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      onesyStyleSheetManager.add();

      const ids = onesyStyleSheetManager.ids;

      const response = [
        onesyStyleSheetManager.sheets.dynamic[0].rules[0].value.rules[0].value.values.value,
      ];

      onesyStyleSheetManager.props = { ids: ids.dynamic, props: { a: 1 } };

      response.push(
        onesyStyleSheetManager.sheets.dynamic[0].rules[0].value.rules[0].value.values.value,
        window.OnesyUtils.equalDeep(onesyStyleSheetManager.sheets.dynamic[0].props, { a: 1 })
      );

      return response;
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

    const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    onesyStyleSheetManager.add();

    const ids = onesyStyleSheetManager.ids;

    const response = [
      onesyStyleSheetManager.sheets.dynamic[0].rules[0].value.rules[0].value.values.value,
    ];

    onesyStyleSheetManager.props = { ids: ids.dynamic, props: { a: 1 } };

    response.push(
      onesyStyleSheetManager.sheets.dynamic[0].rules[0].value.rules[0].value.values.value,
      OnesyUtils.equalDeep(onesyStyleSheetManager.sheets.dynamic[0].props, { a: 1 })
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
      const onesyStyle = new window.OnesyStyle.OnesyStyle();

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

      const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      return [OnesyUtils.equalDeep(onesyStyleSheetManager.values, onesyStyleSheetManager.response), onesyStyleSheetManager.values];
    });

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

    const onesyStyle = new OnesyStyle.OnesyStyle();

    const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const valueNode = [OnesyUtils.equalDeep(onesyStyleSheetManager.values, onesyStyleSheetManager.response), onesyStyleSheetManager.values];

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

        const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        return [OnesyUtils.equalDeep(onesyStyleSheetManager.values, onesyStyleSheetManager.response), onesyStyleSheetManager.response];
      });

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

      const onesyStyle = new OnesyStyle.OnesyStyle();

      const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const valueNode = [OnesyUtils.equalDeep(onesyStyleSheetManager.values, onesyStyleSheetManager.response), onesyStyleSheetManager.response];

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

        const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        return [OnesyUtils.equalDeep(onesyStyleSheetManager.css, onesyStyleSheetManager.values.css), onesyStyleSheetManager.css];
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

      const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const valueNode = [OnesyUtils.equalDeep(onesyStyleSheetManager.css, onesyStyleSheetManager.values.css), onesyStyleSheetManager.css];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        true,
        "\n\n.a-0 {\n  width: 100;\n  max-width: 100;\n  background: #faa;\n  margin: 0 14px 4px 40px;\n  margin-left: 41;\n  float: left;\n  padding-left: 41;\n  padding: 40;\n  position: sticky;\n  transition: all .4s ease;\n  mask-origin: inherit;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-position: 40% 74%;\n}\n\n"
      ]));
    });

  });

  to('add', async () => {
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

      const onesyStyleSheetManager = new window.OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const response = [];

      const styleSheetsLength = window.document.styleSheets.length;

      onesyStyleSheetManager.add();

      response.push(
        onesyStyleSheetManager.status === 'active',
        onesyStyleSheetManager.sheets.static.length === 1,
        onesyStyleSheetManager.sheets.dynamic.length === 1,
        onesyStyleSheetManager.sheets.static[0].status === 'active',
        onesyStyleSheetManager.sheets.dynamic[0].status === 'active',
        window.document.styleSheets.length === styleSheetsLength + 2
      );

      return response;
    });

    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql(new Array(6).fill(true)));

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

    const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    onesyStyleSheetManager.add();

    const valueNode = [
      onesyStyleSheetManager.sheets.static.length === 1,
      onesyStyleSheetManager.sheets.dynamic.length === 1,
      onesyStyleSheetManager.sheets.static[0].status === 'inited',
      onesyStyleSheetManager.sheets.dynamic[0].status === 'inited',
    ];

    assert(valueNode).eql(new Array(4).fill(true));
  });

  to('update', async () => {
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

      const onesyStyleSheetManager = new window.OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const response = [];

      onesyStyleSheetManager.add();

      response.push(
        onesyStyleSheetManager.status === 'active',
        onesyStyleSheetManager.sheets.static[0].css,
        onesyStyleSheetManager.sheets.dynamic[0].css,
      );

      const updateResponse = onesyStyleSheetManager.update({
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
        onesyStyleSheetManager.sheets.static[0].css,
        onesyStyleSheetManager.sheets.dynamic[0].css,
        updateResponse
      );

      return response;
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

    const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const response = [];

    onesyStyleSheetManager.add();

    response.push(
      // Only in browser is active
      onesyStyleSheetManager.status === 'inited',
      onesyStyleSheetManager.sheets.static[0].css,
      onesyStyleSheetManager.sheets.dynamic[0].css,
    );

    const updateResponse = onesyStyleSheetManager.update({
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
      onesyStyleSheetManager.sheets.static[0].css,
      onesyStyleSheetManager.sheets.dynamic[0].css,
      updateResponse
    );

    const valueNode = response;

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      true,
      "\n.a-0 {\n  width: 100;\n  max-width: 100;\n  background: #faa;\n  margin: 0 14px 4px 40px;\n  margin-left: 41;\n  float: left;\n  padding-left: 41;\n  padding: 40;\n  position: sticky;\n  transition: all .4s ease;\n  mask-origin: inherit;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-position: 40% 74%;\n}\n\n.a1-1 {\n  width: 1114px;\n}\n",
      "\n.a2-2 {\n  width: 1114px;\n}\n\n.a7-3 {\n  color: orange;\n  width: 114px;\n  background: orange;\n}\n",
      "\n.a-0 {\n  color: yellow;\n  width: 114px;\n}\n\n.a3-4 {\n  color: yellow;\n  width: 114px;\n}\n",
      "\n.a7-3 {\n  color: yellow;\n  background: orange;\n  max-width: 114px;\n}\n\n.a4-5 {\n  color: beige;\n  width: 1114px;\n}\n",
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

      const onesyStyleSheetManager = new window.OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const response = [];

      const styleSheetsLength = window.document.styleSheets.length;

      onesyStyleSheetManager.add();

      response.push(
        onesyStyleSheetManager.status === 'active',
        onesyStyleSheetManager.sheets.static.length === 1,
        onesyStyleSheetManager.sheets.dynamic.length === 1,
        onesyStyleSheetManager.sheets.static[0].status === 'active',
        onesyStyleSheetManager.sheets.dynamic[0].status === 'active',
        window.document.styleSheets.length === styleSheetsLength + 2
      );

      onesyStyleSheetManager.remove(onesyStyleSheetManager.ids.dynamic);

      response.push(
        onesyStyleSheetManager.status === 'idle',
        onesyStyleSheetManager.sheets.static.length === 0,
        onesyStyleSheetManager.sheets.dynamic.length === 0,
        window.document.styleSheets.length === styleSheetsLength
      );

      return response;
    });

    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql(new Array(10).fill(true)));

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

    const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    onesyStyleSheetManager.add();

    const response = [
      onesyStyleSheetManager.sheets.static.length === 1,
      onesyStyleSheetManager.sheets.dynamic.length === 1,
      onesyStyleSheetManager.sheets.static[0].status === 'inited',
      onesyStyleSheetManager.sheets.dynamic[0].status === 'inited',
    ];

    onesyStyleSheetManager.remove(onesyStyleSheetManager.ids.dynamic);

    response.push(
      onesyStyleSheetManager.status === 'idle',
      onesyStyleSheetManager.sheets.static.length === 0,
      onesyStyleSheetManager.sheets.dynamic.length === 0
    );

    const valueNode = response;

    assert(valueNode).eql(new Array(7).fill(true));
  });

});
