/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';
import * as OnesyUtils from '@onesy/utils';

import { evaluate } from '../utils/js/test/utils';

import * as OnesyStyle from '../src';
import { TValue, TValueObject } from '../src';

group('OnesyStyleSheet', () => {

  to('onesyStyleSheet', async () => {
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
      };

      const onesyStyleSheetManager = new window.OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const onesyStyleSheet = new window.OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      return [
        typeof onesyStyleSheet.id === 'string',
        onesyStyleSheet.version === 'static',
        onesyStyleSheet.mode === 'regular',
        onesyStyleSheet.status === 'inited',
        onesyStyleSheet.priority === 'upper',
        window.OnesyUtils.equalDeep(onesyStyleSheet.names.classNames, { a: 'a-0' }),
        window.OnesyUtils.equalDeep(onesyStyleSheet.names.classes, { a: 'a-0' }),
        window.OnesyUtils.equalDeep(onesyStyleSheet.options, {
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
        !onesyStyleSheet.onesyTheme,
        !!onesyStyleSheet.onesyStyleSheetManager,
        !!onesyStyleSheet.onesyStyle,
        !onesyStyleSheet.pure,
        onesyStyleSheet.rules.length === 1,
        window.OnesyUtils.equalDeep({ css: onesyStyleSheet.css }, { "css": onesyStyleSheet.values.css })
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
    };

    const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const valueNode = [
      typeof onesyStyleSheet.id === 'string',
      onesyStyleSheet.version === 'static',
      onesyStyleSheet.mode === 'regular',
      onesyStyleSheet.status === 'inited',
      onesyStyleSheet.priority === 'upper',
      OnesyUtils.equalDeep(onesyStyleSheet.names.classNames, { a: 'a-0' }),
      OnesyUtils.equalDeep(onesyStyleSheet.names.classes, { a: 'a-0' }),
      OnesyUtils.equalDeep(onesyStyleSheet.options, {
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
      !onesyStyleSheet.onesyTheme,
      !!onesyStyleSheet.onesyStyleSheetManager,
      !!onesyStyleSheet.onesyStyle,
      !onesyStyleSheet.pure,
      onesyStyleSheet.rules.length === 1,
      OnesyUtils.equalDeep({ css: onesyStyleSheet.css }, { "css": onesyStyleSheet.values.css })
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql(new Array(14).fill(true)));
  });

  group('mode', () => {

    to('regular', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const onesyStyle = new window.OnesyStyle.OnesyStyle();

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

        const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const response = [];

        onesyStyleSheet.add();

        response.push(
          onesyStyleSheet.css,
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
      };

      const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      onesyStyleSheet.add();

      const valueNode = [
        onesyStyleSheet.css,
      ];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        '\n.a-0 {\n  width: 100;\n  max-width: 100;\n  background: #faa;\n  margin: 0 14px 4px 40px;\n  margin-left: 41;\n  float: left;\n  padding-left: 41;\n  padding: 40;\n  position: sticky;\n  transition: all .4s ease;\n  mask-origin: inherit;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-position: 40% 74%;\n}\n',
      ]));
    });

    to('atomic', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const onesyStyle = new window.OnesyStyle.OnesyStyle();

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

        const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'atomic', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'atomic', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const response = [];

        onesyStyleSheet.add();

        response.push(
          onesyStyleSheet.css,
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
      };

      const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'atomic', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'atomic', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      onesyStyleSheet.add();

      const valueNode = [
        onesyStyleSheet.css,
      ];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        '\n.aa-1 {\n  width: 100;\n}\n\n.ab-2 {\n  max-width: 100;\n}\n\n.ac-3 {\n  background: #faa;\n}\n\n.ad-4 {\n  margin: 0 14px 4px 40px;\n}\n\n.ae-5 {\n  margin-left: 41;\n}\n\n.af-6 {\n  float: left;\n}\n\n.ag-7 {\n  padding-left: 41;\n}\n\n.ah-8 {\n  padding: 40;\n}\n\n.ai-9 {\n  position: sticky;\n}\n\n.aj-10 {\n  transition: all .4s ease;\n}\n\n.ak-11 {\n  mask-origin: inherit;\n}\n\n.al-12 {\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n}\n\n.am-13 {\n  mask-position: 40% 74%;\n}\n',
      ]));
    });

  });

  to('names', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const onesyStyle = new window.OnesyStyle.OnesyStyle();

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

      const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      return [
        onesyStyleSheet.names.classNames,
        onesyStyleSheet.names.classes,
        onesyStyleSheet.names.keyframes,
        onesyStyleSheet.names.styles('a', 'a4'),
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
    };

    const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const valueNode = [
      onesyStyleSheet.names.classNames,
      onesyStyleSheet.names.classes,
      onesyStyleSheet.names.keyframes,
      onesyStyleSheet.names.styles('a', 'a4'),
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
      const onesyStyle = new window.OnesyStyle.OnesyStyle();

      const a = {
        a7: {
          // Function
          background: props => props.a === 1 ? 'yellow' : 'orange',
        },
      };

      const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'dynamic', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      onesyStyleSheet.add();

      const response = [
        onesyStyleSheet.rules[0].value.rules[0].value.values.value,
      ];

      onesyStyleSheet.props = { a: 1 };

      response.push(
        onesyStyleSheet.rules[0].value.rules[0].value.values.value,
        window.OnesyUtils.equalDeep(onesyStyleSheet.props, { a: 1 })
      );

      return response;
    });

    const onesyStyle = new OnesyStyle.OnesyStyle();

    const a: TValue = {
      a7: {
        // Function
        background: props => props.a === 1 ? 'yellow' : 'orange',
      },
    };

    const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'dynamic', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    onesyStyleSheet.add();

    const response = [
      onesyStyleSheet.rules[0].value.rules[0].value.values.value,
    ];

    onesyStyleSheet.props = { a: 1 };

    response.push(
      onesyStyleSheet.rules[0].value.rules[0].value.values.value,
      OnesyUtils.equalDeep(onesyStyleSheet.props, { a: 1 })
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
      };

      const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      return [OnesyUtils.equalDeep(onesyStyleSheet.values, onesyStyleSheet.response), onesyStyleSheet.values];
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
    };

    const onesyStyle = new OnesyStyle.OnesyStyle();

    const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const valueNode = [OnesyUtils.equalDeep(onesyStyleSheet.values, onesyStyleSheet.response), onesyStyleSheet.values];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      true,
      {
        "css": "\n.a-0 {\n  width: 100;\n  max-width: 100;\n  background: #faa;\n  margin: 0 14px 4px 40px;\n  margin-left: 41;\n  float: left;\n  padding-left: 41;\n  padding: 40;\n  position: sticky;\n  transition: all .4s ease;\n  mask-origin: inherit;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-position: 40% 74%;\n}\n"
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
        };

        const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        return [OnesyUtils.equalDeep(onesyStyleSheet.values, onesyStyleSheet.response), onesyStyleSheet.response];
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
      };

      const onesyStyle = new OnesyStyle.OnesyStyle();

      const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const valueNode = [OnesyUtils.equalDeep(onesyStyleSheet.values, onesyStyleSheet.response), onesyStyleSheet.response];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        true,
        {
          "css": "\n.a-0 {\n  width: 100;\n  max-width: 100;\n  background: #faa;\n  margin: 0 14px 4px 40px;\n  margin-left: 41;\n  float: left;\n  padding-left: 41;\n  padding: 40;\n  position: sticky;\n  transition: all .4s ease;\n  mask-origin: inherit;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-position: 40% 74%;\n}\n"
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
        };

        const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        return [OnesyUtils.equalDeep(onesyStyleSheet.css, onesyStyleSheet.values.css), onesyStyleSheet.css];
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
      };

      const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const valueNode = [OnesyUtils.equalDeep(onesyStyleSheet.css, onesyStyleSheet.values.css), onesyStyleSheet.css];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        true,
        "\n.a-0 {\n  width: 100;\n  max-width: 100;\n  background: #faa;\n  margin: 0 14px 4px 40px;\n  margin-left: 41;\n  float: left;\n  padding-left: 41;\n  padding: 40;\n  position: sticky;\n  transition: all .4s ease;\n  mask-origin: inherit;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-position: 40% 74%;\n}\n"
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
      };

      const onesyStyleSheetManager = new window.OnesyStyle.OnesyStyleSheetManager(undefined, 'regular', false, 'upper', undefined, onesyStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const onesyStyleSheet = new window.OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const response = [];

      const styleSheetsLength = window.document.styleSheets.length;

      onesyStyleSheet.add();

      response.push(
        onesyStyleSheet.status === 'active',
        onesyStyleSheet.element instanceof HTMLElement,
        onesyStyleSheet.sheet instanceof CSSStyleSheet,
        window.document.styleSheets.length === styleSheetsLength + 1
      );

      return response;
    });

    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql(new Array(4).fill(true)));

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
    };

    const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    onesyStyleSheet.add();

    const valueNode = [
      onesyStyleSheet.status === 'inited',
    ];

    assert(valueNode).eql(new Array(1).fill(true));
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
      };

      const onesyStyleSheetManager = new window.OnesyStyle.OnesyStyleSheetManager(undefined, 'regular', false, 'upper', undefined, onesyStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const onesyStyleSheet = new window.OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const response = [];

      onesyStyleSheet.add();

      response.push(
        onesyStyleSheet.status === 'active',
        onesyStyleSheet.css,
      );

      onesyStyleSheet.update({
        a: {
          color: 'yellow',

          width: '114px',
        },
      });

      response.push(
        onesyStyleSheet.css,
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
    };

    const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const response = [];

    onesyStyleSheet.add();

    response.push(
      onesyStyleSheet.status === 'inited',
      onesyStyleSheet.css,
    );

    onesyStyleSheet.update({
      a: {
        color: 'yellow',

        width: '114px',
      },
    });

    response.push(
      onesyStyleSheet.css,
    );

    const valueNode = response;

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      true,
      '\n.a-0 {\n  width: 100;\n  max-width: 100;\n  background: #faa;\n  margin: 0 14px 4px 40px;\n  margin-left: 41;\n  float: left;\n  padding-left: 41;\n  padding: 40;\n  position: sticky;\n  transition: all .4s ease;\n  mask-origin: inherit;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-position: 40% 74%;\n}\n',
      '\n.a-0 {\n  color: yellow;\n  width: 114px;\n}\n',
    ]));
  });

  to('addRule', async () => {
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
      };

      const onesyStyleSheetManager = new window.OnesyStyle.OnesyStyleSheetManager(undefined, 'regular', false, 'upper', undefined, onesyStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const onesyStyleSheet = new window.OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const response = [];

      onesyStyleSheet.add();

      response.push(
        onesyStyleSheet.status === 'active',
        onesyStyleSheet.rules.length,
        onesyStyleSheet.css,
      );

      onesyStyleSheet.addRule({
        color: 'yellow',

        width: '114px',
      }, 'a14');

      // Pure
      onesyStyleSheet.addRule({
        '@pure': true,

        color: 'yellow',

        width: '114px',
      }, 'meta');

      onesyStyleSheet.addRule({
        '@p': true,

        color: 'yellow',

        width: '114px',
      }, 'main');

      response.push(
        onesyStyleSheet.rules.length,
        onesyStyleSheet.css,
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
    };

    const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const response = [];

    onesyStyleSheet.add();

    response.push(
      onesyStyleSheet.status === 'inited',
      onesyStyleSheet.rules.length,
      onesyStyleSheet.css,
    );

    onesyStyleSheet.addRule({
      color: 'yellow',

      width: '114px',
    }, 'a14');

    // Pure
    onesyStyleSheet.addRule({
      '@pure': true,

      color: 'yellow',

      width: '114px',
    }, 'meta');

    onesyStyleSheet.addRule({
      '@p': true,

      color: 'yellow',

      width: '114px',
    }, 'main');

    response.push(
      onesyStyleSheet.rules.length,
      onesyStyleSheet.css,
    );

    const valueNode = response;

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      true,
      1,
      "\n.a-0 {\n  width: 100;\n  max-width: 100;\n  background: #faa;\n  margin: 0 14px 4px 40px;\n  margin-left: 41;\n  float: left;\n  padding-left: 41;\n  padding: 40;\n  position: sticky;\n  transition: all .4s ease;\n  mask-origin: inherit;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-position: 40% 74%;\n}\n",
      4,
      "\n.a-0 {\n  width: 100;\n  max-width: 100;\n  background: #faa;\n  margin: 0 14px 4px 40px;\n  margin-left: 41;\n  float: left;\n  padding-left: 41;\n  padding: 40;\n  position: sticky;\n  transition: all .4s ease;\n  mask-origin: inherit;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-position: 40% 74%;\n}\n\n.a14-1 {\n  color: yellow;\n  width: 114px;\n}\n\nmeta {\n  color: yellow;\n  width: 114px;\n}\n\nmain {\n  color: yellow;\n  width: 114px;\n}\n"
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
      };

      const onesyStyleSheetManager = new window.OnesyStyle.OnesyStyleSheetManager(undefined, 'regular', false, 'upper', undefined, onesyStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const onesyStyleSheet = new window.OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const response = [];

      const styleSheetsLength = window.document.styleSheets.length;

      onesyStyleSheet.add();

      response.push(
        onesyStyleSheet.status === 'active',
        window.document.styleSheets.length === styleSheetsLength + 1
      );

      onesyStyleSheet.remove();

      response.push(
        onesyStyleSheet.status === 'idle',
        window.document.styleSheets.length === styleSheetsLength,
        onesyStyleSheet.element === undefined,
        onesyStyleSheet.sheet === undefined
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
    };

    const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

    onesyStyleSheet.add();

    const response = [
      onesyStyleSheet.status === 'inited',
    ];

    onesyStyleSheet.remove();

    response.push(
      onesyStyleSheet.status === 'idle'
    );

    const valueNode = response;

    assert(valueNode).eql(new Array(2).fill(true));
  });

});
