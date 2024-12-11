/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';
import * as OnesyUtils from '@onesy/utils';

import { evaluate } from '../utils/js/test/utils';

import * as OnesyStyle from '../src';
import { TValue } from '../src';

group('@onesy/style/onesy-style-rule-property', () => {

  group('OnesyStyleRuleProperty', () => {

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

        const onesyStyle = new window.OnesyStyle.OnesyStyle(window.document.body);

        onesyStyle.plugins.add = [
          window.OnesyStyle.unit,
          window.OnesyStyle.sort,
          window.OnesyStyle.prefix,
          window.OnesyStyle.rtl,
        ];

        const onesyStyleSheetManager = new window.OnesyStyle.OnesyStyleSheetManager(undefined, 'regular', false, 'upper', undefined, onesyStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const onesyStyleSheet = new window.OnesyStyle.OnesyStyleSheet(a, 'static', 'regular', false, 'upper', undefined, onesyStyleSheetManager, onesyStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const a1 = {
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

        const onesyStyleRule = window.OnesyStyle.OnesyStyleRule.make(
          a1,
          'a1',
          'regular',
          'property',
          false,
          1,
          onesyStyleSheet,
          [onesyStyleSheet],
          onesyStyleSheet,
          onesyStyle
        );

        const onesyStyleRuleProperty = window.OnesyStyle.OnesyStyleRuleProperty.make(
          100,
          'width',
          {
            value_version: 'value',
            pure: false,
            owner: onesyStyleRule,
            parents: [...onesyStyleRule.parents, onesyStyleRule],
            onesyStyleRule,
            onesyStyleSheet,
            onesyStyle
          }
        );

        return [
          typeof onesyStyleRuleProperty.id === 'string',
          onesyStyleRuleProperty.level,
          onesyStyleRuleProperty.values,
          onesyStyleRuleProperty.options
        ];
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

      onesyStyle.plugins.add = [
        OnesyStyle.unit,
        OnesyStyle.sort,
        OnesyStyle.prefix,
        OnesyStyle.rtl,
      ];

      const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } } });

      const a1 = {
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

      const onesyStyleRule = OnesyStyle.OnesyStyleRule.make(
        a1,
        'a1',
        {
          mode: 'regular',
          version: 'property',
          pure: false,
          index: 1,
          owner: onesyStyleSheet,
          parents: [onesyStyleSheet],
          onesyStyleSheet,
          onesyStyle
        }
      );

      const onesyStyleRuleProperty = OnesyStyle.OnesyStyleRuleProperty.make(
        100,
        'width',
        {
          value_version: 'value',
          pure: false,
          owner: onesyStyleRule,
          parents: [...onesyStyleRule.parents, onesyStyleRule],
          onesyStyleRule,
          onesyStyleSheet,
          onesyStyle
        }
      );

      const valueNode = [
        typeof onesyStyleRuleProperty.id === 'string',
        onesyStyleRuleProperty.level,
        onesyStyleRuleProperty.values,
        onesyStyleRuleProperty.options
      ];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        true,
        1,
        {
          "property": "width",
          "value": "100px",
          "css": "width: 100px;"
        },
        {}
      ]));
    });

  });

  group('onesyStyleRuleProperty', () => {

    to('onesyStyleRuleProperty', async () => {
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

        const onesyStyle = new window.OnesyStyle.OnesyStyle(window.document.body);

        onesyStyle.plugins.add = [
          window.OnesyStyle.unit,
          window.OnesyStyle.sort,
          window.OnesyStyle.prefix,
          window.OnesyStyle.rtl,
        ];

        const onesyStyleSheetManager = new window.OnesyStyle.OnesyStyleSheetManager(undefined, 'regular', false, 'upper', undefined, onesyStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const onesyStyleSheet = new window.OnesyStyle.OnesyStyleSheet(a, 'static', 'regular', false, 'upper', undefined, onesyStyleSheetManager, onesyStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const a1 = {
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

        const onesyStyleRule = window.OnesyStyle.OnesyStyleRule.make(
          a1,
          'a1',
          'regular',
          'property',
          false,
          1,
          onesyStyleSheet,
          [onesyStyleSheet],
          onesyStyleSheet,
          onesyStyle
        );

        const onesyStyleRuleProperty = new window.OnesyStyle.OnesyStyleRuleProperty(
          100,
          'width',
          {
            value_version: 'value',
            pure: false,
            owner: onesyStyleRule,
            parents: [...onesyStyleRule.parents, onesyStyleRule],
            onesyStyleRule,
            onesyStyleSheet,
            onesyStyle
          }
        );

        return [
          typeof onesyStyleRuleProperty.id === 'string',
          onesyStyleRuleProperty.level,
          onesyStyleRuleProperty.values,
          onesyStyleRuleProperty.options
        ];
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

      onesyStyle.plugins.add = [
        OnesyStyle.unit,
        OnesyStyle.sort,
        OnesyStyle.prefix,
        OnesyStyle.rtl,
      ];

      const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } } });

      const a1 = {
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

      const onesyStyleRule = OnesyStyle.OnesyStyleRule.make(
        a1,
        'a1',
        {
          mode: 'regular',
          version: 'property',
          pure: false,
          index: 1,
          owner: onesyStyleSheet,
          parents: [onesyStyleSheet],
          onesyStyleSheet,
          onesyStyle
        }
      );

      const onesyStyleRuleProperty = new OnesyStyle.OnesyStyleRuleProperty(
        100,
        'width',
        {
          value_version: 'value',
          pure: false,
          owner: onesyStyleRule,
          parents: [...onesyStyleRule.parents, onesyStyleRule],
          onesyStyleRule,
          onesyStyleSheet,
          onesyStyle
        }
      );

      const valueNode = [
        typeof onesyStyleRuleProperty.id === 'string',
        onesyStyleRuleProperty.level,
        onesyStyleRuleProperty.values,
        onesyStyleRuleProperty.options
      ];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        true,
        1,
        {
          "property": "width",
          "value": "100px",
          "css": "width: 100px;"
        },
        {}
      ]));
    });

    to('plugins: prefix, rtl', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        window.document.body.dir = 'rtl';

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

        const onesyStyle = new window.OnesyStyle.OnesyStyle(window.document.body);

        onesyStyle.plugins.add = [
          window.OnesyStyle.unit,
          window.OnesyStyle.sort,
          window.OnesyStyle.prefix,
          window.OnesyStyle.rtl,
        ];

        const onesyStyleSheetManager = new window.OnesyStyle.OnesyStyleSheetManager(undefined, 'regular', false, 'upper', undefined, onesyStyle, {}, { style: { attributes: { method: 'style' } } });

        const onesyStyleSheet = new window.OnesyStyle.OnesyStyleSheet(a, 'static', 'regular', false, 'upper', undefined, onesyStyleSheetManager, onesyStyle, { style: { attributes: { method: 'style' } } });

        const a1 = {
          'max-width': 100,

          // Simple
          background: '#faa',

          margin: '0 14px 4px 40px',

          // rtl
          float: 'left',

          // sort
          paddingLeft: 41,
          padding: 40,

          // prefixes
          position: 'sticky',
          transition: 'all .4s ease',
          maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
          maskPosition: '40% 74%',

          // animation
          animation: '$a .4s ease',
        };

        const onesyStyleRule = window.OnesyStyle.OnesyStyleRule.make(
          a1,
          'a1',
          'regular',
          'property',
          false,
          1,
          onesyStyleSheet,
          [onesyStyleSheet],
          onesyStyleSheet,
          onesyStyle
        );

        // maskOrigin
        new window.OnesyStyle.OnesyStyleRuleProperty(
          'inherit',
          'maskOrigin',
          {
            value_version: 'value',
            pure: false,
            owner: onesyStyleRule,
            parents: [...onesyStyleRule.parents, onesyStyleRule],
            onesyStyleRule,
            onesyStyleSheet,
            onesyStyle
          }
        );

        // marginLeft
        new window.OnesyStyle.OnesyStyleRuleProperty(
          41,
          'marginLeft',
          {
            value_version: 'value',
            pure: false,
            owner: onesyStyleRule,
            parents: [...onesyStyleRule.parents, onesyStyleRule],
            onesyStyleRule,
            onesyStyleSheet,
            onesyStyle
          }
        );

        // Add
        onesyStyleRule.add();

        return [
          onesyStyleRule.css
        ];
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

      onesyStyle.plugins.add = [
        OnesyStyle.unit,
        OnesyStyle.sort,
        OnesyStyle.prefix,
        OnesyStyle.rtl,
      ];

      const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } } });

      const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const a1 = {
        'max-width': 100,

        // Simple
        background: '#faa',

        margin: '0 14px 4px 40px',

        // rtl
        float: 'left',

        // sort
        paddingLeft: 41,
        padding: 40,

        // prefixes
        position: 'sticky',
        transition: 'all .4s ease',
        maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
        maskPosition: '40% 74%',

        // animation
        animation: '$a .4s ease',
      };

      const onesyStyleRule = OnesyStyle.OnesyStyleRule.make(
        a1,
        'a1',
        {
          mode: 'regular',
          version: 'property',
          pure: false,
          index: 1,
          owner: onesyStyleSheet,
          parents: [onesyStyleSheet],
          onesyStyleSheet,
          onesyStyle
        }
      );

      // maskOrigin
      new OnesyStyle.OnesyStyleRuleProperty(
        'inherit',
        'maskOrigin',
        {
          value_version: 'value',
          pure: false,
          owner: onesyStyleRule,
          parents: [...onesyStyleRule.parents, onesyStyleRule],
          onesyStyleRule,
          onesyStyleSheet,
          onesyStyle
        }
      );

      // marginLeft
      new OnesyStyle.OnesyStyleRuleProperty(
        41,
        'marginLeft',
        {
          value_version: 'value',
          pure: false,
          owner: onesyStyleRule,
          parents: [...onesyStyleRule.parents, onesyStyleRule],
          onesyStyleRule,
          onesyStyleSheet,
          onesyStyle
        }
      );

      // Add
      onesyStyleRule.add();

      const valueNode = [
        onesyStyleRule.css
      ];

      const values = [...valueBrowsers];

      assert(values).eql([
        [
          ".a1-1 {\n  background: #faa;\n  float: right;\n  margin: 0 14px 4px 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-right: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  mask-origin: inherit;\n  margin-right: 41px;\n}"
        ],
        [
          ".a1-1 {\n  background: #faa;\n  float: right;\n  margin: 0 14px 4px 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-right: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  mask-origin: inherit;\n  margin-right: 41px;\n}"
        ],
        [
          ".a1-1 {\n  background: #faa;\n  float: right;\n  margin: 0 14px 4px 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-right: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  mask-origin: inherit;\n  margin-right: 41px;\n}"
        ]
      ]);

      assert(valueNode).eql([
        ".a1-1 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  mask-origin: inherit;\n  margin-left: 41px;\n}"
      ]);
    });

    group('response', () => {

      to('response', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          window.document.body.dir = 'rtl';

          const onesyStyle = new window.OnesyStyle.OnesyStyle(window.document.body);

          onesyStyle.plugins.add = [
            window.OnesyStyle.unit,
            window.OnesyStyle.sort,
            window.OnesyStyle.prefix,
            window.OnesyStyle.rtl,
          ];

          const a: TValue = {
            a: {
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

          const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } } });

          const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

          const onesyStyleRule = onesyStyleSheet.rules[0].value;

          const onesyStyleRuleProperty = new window.OnesyStyle.OnesyStyleRuleProperty(
            100,
            'width',
            'value',
            false,
            onesyStyleRule,
            [...onesyStyleRule.parents, onesyStyleRule],
            onesyStyleRule,
            onesyStyleSheet,
            onesyStyle
          );

          return [window.OnesyUtils.equalDeep({ css: onesyStyleRuleProperty.values.css }, onesyStyleRuleProperty.response), onesyStyleRuleProperty.response];
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

        onesyStyle.plugins.add = [
          OnesyStyle.unit,
          OnesyStyle.sort,
          OnesyStyle.prefix,
          OnesyStyle.rtl,
        ];

        const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } } });

        const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const onesyStyleRule = onesyStyleSheet.rules[0].value;

        const onesyStyleRuleProperty = new OnesyStyle.OnesyStyleRuleProperty(
          100,
          'width',
          {
            value_version: 'value',
            pure: false,
            owner: onesyStyleRule,
            parents: [...onesyStyleRule.parents, onesyStyleRule],
            onesyStyleRule,
            onesyStyleSheet,
            onesyStyle
          }
        );

        const valueNode = [OnesyUtils.equalDeep({ css: onesyStyleRuleProperty.values.css }, onesyStyleRuleProperty.response), onesyStyleRuleProperty.response];

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          true,
          {
            "css": "width: 100px;"
          }
        ]));
      });

      to('css', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          window.document.body.dir = 'rtl';

          const onesyStyle = new window.OnesyStyle.OnesyStyle(window.document.body);

          onesyStyle.plugins.add = [
            window.OnesyStyle.unit,
            window.OnesyStyle.sort,
            window.OnesyStyle.prefix,
            window.OnesyStyle.rtl,
          ];

          const a: TValue = {
            a: {
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

          const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } } });

          const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

          const onesyStyleRule = onesyStyleSheet.rules[0].value;

          const onesyStyleRuleProperty = new window.OnesyStyle.OnesyStyleRuleProperty(
            100,
            'width',
            'value',
            false,
            onesyStyleRule,
            [...onesyStyleRule.parents, onesyStyleRule],
            onesyStyleRule,
            onesyStyleSheet,
            onesyStyle
          );

          return [window.OnesyUtils.equalDeep(onesyStyleRuleProperty.values.css, onesyStyleRuleProperty.css), onesyStyleRuleProperty.css];
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

        onesyStyle.plugins.add = [
          OnesyStyle.unit,
          OnesyStyle.sort,
          OnesyStyle.prefix,
          OnesyStyle.rtl,
        ];

        const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } } });

        const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const onesyStyleRule = onesyStyleSheet.rules[0].value;

        const onesyStyleRuleProperty = new OnesyStyle.OnesyStyleRuleProperty(
          100,
          'width',
          {
            value_version: 'value',
            pure: false,
            owner: onesyStyleRule,
            parents: [...onesyStyleRule.parents, onesyStyleRule],
            onesyStyleRule,
            onesyStyleSheet,
            onesyStyle
          }
        );

        const valueNode = [OnesyUtils.equalDeep(onesyStyleRuleProperty.values.css, onesyStyleRuleProperty.css), onesyStyleRuleProperty.css];

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          true,
          "width: 100px;"
        ]));
      });

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

          a7: {
            background: props => props.a === 1 ? 'yellow' : 'orange',
            width: props => props === 1 ? 114 : 11,
          }
        };

        const onesyStyle = new window.OnesyStyle.OnesyStyle();

        onesyStyle.plugins.add = [
          window.OnesyStyle.unit,
          window.OnesyStyle.sort,
          window.OnesyStyle.prefix,
          window.OnesyStyle.rtl,
        ];

        const onesyStyleSheetManager = new window.OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } } });

        onesyStyleSheetManager.add();

        const onesyStyleSheet = onesyStyleSheetManager.sheets.dynamic[0];

        const onesyStyleRuleProperty = onesyStyleSheet.rules[0].value.rules[0].value;

        const onesyStyleRuleProperty1 = onesyStyleSheet.rules[0].value.rules[1].value;

        let css = '';

        Array.from(window.document.styleSheets).forEach((sheet: any) => {
          Array.from(sheet.cssRules).forEach((rule: any) => css += rule.cssText);
        });

        const response = [
          onesyStyleSheetManager.css,
          css
        ];

        onesyStyleSheet.props = { a: 1 };

        // Update props
        onesyStyleRuleProperty.update();

        // Update value
        onesyStyleRuleProperty1.update(1114);

        css = '';

        Array.from(window.document.styleSheets).forEach((sheet: any) => {
          Array.from(sheet.cssRules).forEach((rule: any) => css += rule.cssText);
        });

        response.push(
          onesyStyleSheetManager.css,
          css
        );

        return response;
      });

      const values = [...valueBrowsers];

      assert(values).eql([
        [
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n\n\n.a7-1 {\n  background: orange;\n  width: 11px;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a7-1 { background: orange; width: 11px; }",
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n\n\n.a7-1 {\n  background: yellow;\n  width: 11px;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a7-1 { background: yellow; width: 1114px; }"
        ],
        [
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n\n\n.a7-1 {\n  background: orange;\n  width: 11px;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a7-1 { background: orange none repeat scroll 0% 0%; width: 11px; }",
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n\n\n.a7-1 {\n  background: yellow;\n  width: 11px;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a7-1 { background: yellow none repeat scroll 0% 0%; width: 1114px; }"
        ],
        [
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n\n\n.a7-1 {\n  background: orange;\n  width: 11px;\n}\n\n",
          ".a-0 { background-color: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a7-1 { background-color: orange; width: 11px; }",
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n\n\n.a7-1 {\n  background: yellow;\n  width: 11px;\n}\n\n",
          ".a-0 { background-color: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a7-1 { background-color: yellow; width: 1114px; }"
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

        a7: {
          background: props => props.a === 1 ? 'yellow' : 'orange',
          width: props => props === 1 ? 114 : 11,
        }
      };

      const onesyStyle = new OnesyStyle.OnesyStyle();

      onesyStyle.plugins.add = [
        OnesyStyle.unit,
        OnesyStyle.sort,
        OnesyStyle.prefix,
        OnesyStyle.rtl,
      ];

      const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } } });

      onesyStyleSheetManager.add();

      const onesyStyleSheet = onesyStyleSheetManager.sheets.dynamic[0];

      const onesyStyleRuleProperty = onesyStyleSheet.rules[0].value.rules[0].value;

      const onesyStyleRuleProperty1 = onesyStyleSheet.rules[0].value.rules[1].value;

      const response = [
        onesyStyleSheetManager.css
      ];

      onesyStyleSheet.props = { a: 1 };

      // Update props
      onesyStyleRuleProperty.update();

      // Update value
      onesyStyleRuleProperty1.update(1114);

      response.push(
        onesyStyleSheetManager.css
      );

      const valueNode = response;

      assert(valueNode).eql([
        "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n\n\n.a7-1 {\n  background: orange;\n  width: 11px;\n}\n\n",
        "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n\n\n.a7-1 {\n  background: yellow;\n  width: 11px;\n}\n\n"
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

          a7: {
            background: props => props.a === 1 ? 'yellow' : 'orange',
            width: props => props === 1 ? 114 : 11,
          }
        };

        const onesyStyle = new window.OnesyStyle.OnesyStyle();

        onesyStyle.plugins.add = [
          window.OnesyStyle.unit,
          window.OnesyStyle.sort,
          window.OnesyStyle.prefix,
          window.OnesyStyle.rtl,
        ];

        const onesyStyleSheetManager = new window.OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } } });

        onesyStyleSheetManager.add();

        const onesyStyleSheet = onesyStyleSheetManager.sheets.dynamic[0];

        const onesyStyleRuleProperty = onesyStyleSheet.rules[0].value.rules[0].value;

        const onesyStyleRuleProperty1 = onesyStyleSheet.rules[0].value.rules[1].value;

        let css = '';

        Array.from(window.document.styleSheets).forEach((sheet: any) => {
          Array.from(sheet.cssRules).forEach((rule: any) => css += rule.cssText);
        });

        const response = [
          onesyStyleSheetManager.css,
          css
        ];

        onesyStyleSheet.props = { a: 1 };

        // Update props
        onesyStyleRuleProperty.update();

        // Update value
        onesyStyleRuleProperty1.update(1114);

        // Update rule values
        onesyStyleRuleProperty.owner.updateValues();

        css = '';

        Array.from(window.document.styleSheets).forEach((sheet: any) => {
          Array.from(sheet.cssRules).forEach((rule: any) => css += rule.cssText);
        });

        response.push(
          onesyStyleSheetManager.css,
          css
        );

        // Remove value
        onesyStyleRuleProperty1.remove();

        // Update rule values
        onesyStyleRuleProperty.owner.updateValues();

        css = '';

        Array.from(window.document.styleSheets).forEach((sheet: any) => {
          Array.from(sheet.cssRules).forEach((rule: any) => css += rule.cssText);
        });

        response.push(
          onesyStyleSheetManager.css,
          css
        );

        return response;
      });

      const values = [...valueBrowsers];

      assert(values).eql([
        [
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n\n\n.a7-1 {\n  background: orange;\n  width: 11px;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a7-1 { background: orange; width: 11px; }",
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n\n\n.a7-1 {\n  background: yellow;\n  width: 1114px;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a7-1 { background: yellow; width: 1114px; }",
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n\n\n.a7-1 {\n  background: yellow;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a7-1 { background: yellow; }"
        ],
        [
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n\n\n.a7-1 {\n  background: orange;\n  width: 11px;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a7-1 { background: orange none repeat scroll 0% 0%; width: 11px; }",
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n\n\n.a7-1 {\n  background: yellow;\n  width: 1114px;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a7-1 { background: yellow none repeat scroll 0% 0%; width: 1114px; }",
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n\n\n.a7-1 {\n  background: yellow;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a7-1 { background: yellow none repeat scroll 0% 0%; }"
        ],
        [
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n\n\n.a7-1 {\n  background: orange;\n  width: 11px;\n}\n\n",
          ".a-0 { background-color: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a7-1 { background-color: orange; width: 11px; }",
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n\n\n.a7-1 {\n  background: yellow;\n  width: 1114px;\n}\n\n",
          ".a-0 { background-color: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a7-1 { background-color: yellow; width: 1114px; }",
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n\n\n.a7-1 {\n  background: yellow;\n}\n\n",
          ".a-0 { background-color: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a7-1 { background-color: yellow; }"
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

        a7: {
          background: props => props.a === 1 ? 'yellow' : 'orange',
          width: props => props === 1 ? 114 : 11,
        }
      };

      const onesyStyle = new OnesyStyle.OnesyStyle();

      onesyStyle.plugins.add = [
        OnesyStyle.unit,
        OnesyStyle.sort,
        OnesyStyle.prefix,
        OnesyStyle.rtl,
      ];

      const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } } });

      onesyStyleSheetManager.add();

      const onesyStyleSheet = onesyStyleSheetManager.sheets.dynamic[0];

      const onesyStyleRuleProperty = onesyStyleSheet.rules[0].value.rules[0].value;

      const onesyStyleRuleProperty1 = onesyStyleSheet.rules[0].value.rules[1].value;

      const response = [
        onesyStyleSheetManager.css
      ];

      onesyStyleSheet.props = { a: 1 };

      // Update props
      onesyStyleRuleProperty.update();

      // Update value
      onesyStyleRuleProperty1.update(1114);

      // Update rule values
      onesyStyleRuleProperty.owner.updateValues();

      response.push(
        onesyStyleSheetManager.css
      );

      // Remove value
      onesyStyleRuleProperty1.remove();

      // Update rule values
      onesyStyleRuleProperty.owner.updateValues();

      response.push(
        onesyStyleSheetManager.css
      );

      const valueNode = response;

      assert(valueNode).eql([
        "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n\n\n.a7-1 {\n  background: orange;\n  width: 11px;\n}\n\n",
        "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n\n\n.a7-1 {\n  background: yellow;\n  width: 1114px;\n}\n\n",
        "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n\n\n.a7-1 {\n  background: yellow;\n}\n\n"
      ]);
    });

  });

});
