/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';
import * as OnesyUtils from '@onesy/utils';

import { evaluate } from '../utils/js/test/utils';

import * as OnesyStyle from '../src';
import { TValue } from '../src';

group('OnesyStyleRule', () => {

  group('OnesyStyleRule', () => {

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

        const onesyStyle = new window.OnesyStyle.OnesyStyle({ optimize: true });

        const onesyStyleSheetManager = new window.OnesyStyle.OnesyStyleSheetManager(undefined, 'regular', false, 'upper', undefined, onesyStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const onesyStyleSheet = new window.OnesyStyle.OnesyStyleSheet(a, 'static', 'regular', false, 'upper', undefined, onesyStyleSheetManager, onesyStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

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

        // Add
        onesyStyleRule.makeSelector();

        return [
          typeof onesyStyleRule.id === 'string',
          onesyStyleRule.className,
          onesyStyleRule.hash,
          onesyStyleRule.index,
          onesyStyleRule.level,
          onesyStyleRule.isVariable,
          onesyStyleRule.mode,
          onesyStyleRule.options,
          onesyStyleRule.property,
          onesyStyleRule.value,
          onesyStyleRule.values,
          onesyStyleRule.static,
          onesyStyleRule.status,
          onesyStyleRule.selector,
          onesyStyleRule.version,
          onesyStyleRule.value_version,
          onesyStyleRule.ref.className,
          onesyStyleRule.ref.main.sheet.id === onesyStyleRule.onesyStyleSheet.id,
          onesyStyleRule.ref.main.rule.id !== onesyStyleRule.id,
          onesyStyleRule.rules.length
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

      const onesyStyle = new OnesyStyle.OnesyStyle({ optimize: true });

      const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { style: { attributes: { method: 'style' } }, rule: { prefix: false }, mode: 'regular', pure: false, priority: 'upper', onesyStyle });

      const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', priority: 'upper', style: { attributes: { method: 'style' } }, rule: { prefix: false }, onesyStyle, onesyStyleSheetManager });

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

      // Add
      onesyStyleRule.updateValues();

      onesyStyleRule.makeSelector();

      const valueNode = [
        typeof onesyStyleRule.id === 'string',
        onesyStyleRule.className,
        onesyStyleRule.hash,
        onesyStyleRule.index,
        onesyStyleRule.level,
        onesyStyleRule.isVariable,
        onesyStyleRule.mode,
        onesyStyleRule.options,
        onesyStyleRule.property,
        onesyStyleRule.value,
        onesyStyleRule.values,
        onesyStyleRule.static,
        onesyStyleRule.status,
        onesyStyleRule.selector,
        onesyStyleRule.version,
        onesyStyleRule.value_version,
        onesyStyleRule.ref.className,
        onesyStyleRule.ref.main.sheet.id === onesyStyleRule.onesyStyleSheet.id,
        onesyStyleRule.ref.main.rule.id !== onesyStyleRule.id,
        onesyStyleRule.rules.length
      ];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        true,
        "a-0",
        "0x82efd6feeaf4e560d160c696e918f2e71c8006b9008efd509d90449c5d3d9b92",
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
          "css": ".a-0 {\n  width: 100;\n  max-width: 100;\n  background: #faa;\n  margin: 0 14px 4px 40px;\n  margin-left: 41;\n  float: left;\n  padding-left: 41;\n  padding: 40;\n  position: sticky;\n  transition: all .4s ease;\n  mask-origin: inherit;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-position: 40% 74%;\n}"
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

  group('onesyStyleRule', () => {

    to('onesyStyleRule', async () => {
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

        const onesyStyle = new window.OnesyStyle.OnesyStyle({ optimize: true });

        const onesyStyleSheetManager = new window.OnesyStyle.OnesyStyleSheetManager(undefined, 'regular', false, 'upper', undefined, onesyStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const onesyStyleSheet = new window.OnesyStyle.OnesyStyleSheet(a, 'static', 'regular', false, 'upper', undefined, onesyStyleSheetManager, onesyStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

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

        const onesyStyleRule = new window.OnesyStyle.OnesyStyleRule(
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

        // Add
        onesyStyleRule.updateValues();

        onesyStyleRule.makeSelector();

        return [
          typeof onesyStyleRule.id === 'string',
          onesyStyleRule.className,
          onesyStyleRule.hash,
          onesyStyleRule.index,
          onesyStyleRule.level,
          onesyStyleRule.isVariable,
          onesyStyleRule.mode,
          onesyStyleRule.options,
          onesyStyleRule.property,
          onesyStyleRule.value,
          onesyStyleRule.values,
          onesyStyleRule.static,
          onesyStyleRule.status,
          onesyStyleRule.selector,
          onesyStyleRule.version,
          onesyStyleRule.value_version,
          onesyStyleRule.ref.className,
          onesyStyleRule.ref.main.sheet.id === onesyStyleRule.onesyStyleSheet.id,
          onesyStyleRule.ref.main.rule.id !== onesyStyleRule.id,
          onesyStyleRule.rules.length
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

      const onesyStyle = new OnesyStyle.OnesyStyle({ optimize: true });

      const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { style: { attributes: { method: 'style' } }, rule: { prefix: false }, mode: 'regular', pure: false, priority: 'upper', onesyStyle });

      const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', priority: 'upper', style: { attributes: { method: 'style' } }, rule: { prefix: false }, onesyStyle, onesyStyleSheetManager });

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

      const onesyStyleRule = new OnesyStyle.OnesyStyleRule(
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

      // Add
      onesyStyleRule.updateValues();

      onesyStyleRule.makeSelector();

      const valueNode = [
        typeof onesyStyleRule.id === 'string',
        onesyStyleRule.className,
        onesyStyleRule.hash,
        onesyStyleRule.index,
        onesyStyleRule.level,
        onesyStyleRule.isVariable,
        onesyStyleRule.mode,
        onesyStyleRule.options,
        onesyStyleRule.property,
        onesyStyleRule.value,
        onesyStyleRule.values,
        onesyStyleRule.static,
        onesyStyleRule.status,
        onesyStyleRule.selector,
        onesyStyleRule.version,
        onesyStyleRule.value_version,
        onesyStyleRule.ref.className,
        onesyStyleRule.ref.main.sheet.id === onesyStyleRule.onesyStyleSheet.id,
        onesyStyleRule.ref.main.rule.id !== onesyStyleRule.id,
        onesyStyleRule.rules.length
      ];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        true,
        "a-0",
        "0x82efd6feeaf4e560d160c696e918f2e71c8006b9008efd509d90449c5d3d9b92",
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
          "css": ".a-0 {\n  width: 100;\n  max-width: 100;\n  background: #faa;\n  margin: 0 14px 4px 40px;\n  margin-left: 41;\n  float: left;\n  padding-left: 41;\n  padding: 40;\n  position: sticky;\n  transition: all .4s ease;\n  mask-origin: inherit;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-position: 40% 74%;\n}"
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

          const onesyStyle = new window.OnesyStyle.OnesyStyle(window.document.body);

          onesyStyle.plugins.add = [
            window.OnesyStyle.unit,
            window.OnesyStyle.sort,
            window.OnesyStyle.prefix,
            window.OnesyStyle.rtl,
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

          const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } } });

          const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } } });

          const onesyStyleRule = onesyStyleSheet.rules[0].value;

          return [window.OnesyUtils.equalDeep({ css: onesyStyleRule.values.css }, onesyStyleRule.response), onesyStyleRule.response];
        });

        const values = [...valueBrowsers];

        assert(values).eql([
          [
            true,
            {
              "css": ".a-0 {\n  background: #faa;\n  float: right;\n  margin: 0 14px 4px 40px;\n  margin-right: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-right: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}"
            }
          ],
          [
            true,
            {
              "css": ".a-0 {\n  background: #faa;\n  float: right;\n  margin: 0 14px 4px 40px;\n  margin-right: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-right: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}"
            }
          ],
          [
            true,
            {
              "css": ".a-0 {\n  background: #faa;\n  float: right;\n  margin: 0 14px 4px 40px;\n  margin-right: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-right: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}"
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

        const onesyStyle = new OnesyStyle.OnesyStyle();

        onesyStyle.plugins.add = [
          OnesyStyle.unit,
          OnesyStyle.sort,
          OnesyStyle.prefix,
          OnesyStyle.rtl,
        ];

        const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } } });

        const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } } });

        const onesyStyleRule = onesyStyleSheet.rules[0].value;

        const valueNode = [OnesyUtils.equalDeep({ css: onesyStyleRule.values.css }, onesyStyleRule.response), onesyStyleRule.response];

        assert(valueNode).eql([
          true,
          {
            "css": ".a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}"
          }
        ]);
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

          const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } } });

          const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } } });

          const onesyStyleRule = onesyStyleSheet.rules[0].value;

          return [window.OnesyUtils.equalDeep(onesyStyleRule.values.css, onesyStyleRule.css), onesyStyleRule.css];
        });

        const values = [...valueBrowsers];

        assert(values).eql([
          [
            true,
            ".a-0 {\n  background: #faa;\n  float: right;\n  margin: 0 14px 4px 40px;\n  margin-right: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-right: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}"
          ],
          [
            true,
            ".a-0 {\n  background: #faa;\n  float: right;\n  margin: 0 14px 4px 40px;\n  margin-right: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-right: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}"
          ],
          [
            true,
            ".a-0 {\n  background: #faa;\n  float: right;\n  margin: 0 14px 4px 40px;\n  margin-right: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-right: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}"
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

        const onesyStyle = new OnesyStyle.OnesyStyle();

        onesyStyle.plugins.add = [
          OnesyStyle.unit,
          OnesyStyle.sort,
          OnesyStyle.prefix,
          OnesyStyle.rtl,
        ];

        const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } } });

        const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } } });

        const onesyStyleRule = onesyStyleSheet.rules[0].value;

        const valueNode = [OnesyUtils.equalDeep(onesyStyleRule.values.css, onesyStyleRule.css), onesyStyleRule.css];

        assert(valueNode).eql([
          true,
          ".a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}",
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

        const onesyStyle = new window.OnesyStyle.OnesyStyle();

        onesyStyle.plugins.add = [
          window.OnesyStyle.unit,
          window.OnesyStyle.sort,
          window.OnesyStyle.prefix,
          window.OnesyStyle.rtl,
        ];

        const onesyStyleSheetManager = new window.OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } } });

        const onesyStyleSheet = new window.OnesyStyle.OnesyStyleSheet(a, 'static', 'regular', false, 'upper', undefined, onesyStyleSheetManager, onesyStyle, { style: { attributes: { method: 'style' } } });

        onesyStyleSheetManager.add();

        let css = '';

        Array.from(window.document.styleSheets).forEach((sheet: any) => {
          Array.from(sheet.cssRules).forEach((rule: any) => css += rule.cssText);
        });

        const response = [
          onesyStyleSheetManager.css,
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

        const onesyStyleRule = new window.OnesyStyle.OnesyStyleRule(
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

        onesyStyleRule.add();

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
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n.a1-1 .a19 > a:active {\n  color: orange;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\n  color: yellow;\n}\n\n.a1-1 .a19 {\n  color: white;\n}\n\n.a1-1 {\n  color: yellow;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a:active { color: orange; float: left; margin-left: 40px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a19 { color: white; }.a1-1 { color: yellow; }"
        ],
        [
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n.a1-1 .a19 > a:active {\n  color: orange;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\n  color: yellow;\n}\n\n.a1-1 .a19 {\n  color: white;\n}\n\n.a1-1 {\n  color: yellow;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a:active { color: orange; float: left; margin-left: 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a19 { color: white; }.a1-1 { color: yellow; }"
        ],
        [
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n",
          ".a-0 { background-color: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n.a1-1 .a19 > a:active {\n  color: orange;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\n  color: yellow;\n}\n\n.a1-1 .a19 {\n  color: white;\n}\n\n.a1-1 {\n  color: yellow;\n}\n\n",
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

      const onesyStyle = new OnesyStyle.OnesyStyle();

      onesyStyle.plugins.add = [
        OnesyStyle.unit,
        OnesyStyle.sort,
        OnesyStyle.prefix,
        OnesyStyle.rtl,
      ];

      const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } } });

      const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } } });

      onesyStyleSheetManager.add();

      const response = [
        onesyStyleSheetManager.css,
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

      const onesyStyleRule = new OnesyStyle.OnesyStyleRule(
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

      onesyStyleRule.add();

      response.push(
        onesyStyleSheetManager.css
      );

      const valueNode = response;

      assert(valueNode).eql([
        "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n",
        "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n.a1-1 .a19 > a:active {\n  color: orange;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\n  color: yellow;\n}\n\n.a1-1 .a19 {\n  color: white;\n}\n\n.a1-1 {\n  color: yellow;\n}\n\n"
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

        const onesyStyle = new window.OnesyStyle.OnesyStyle();

        onesyStyle.plugins.add = [
          window.OnesyStyle.unit,
          window.OnesyStyle.sort,
          window.OnesyStyle.prefix,
          window.OnesyStyle.rtl,
        ];

        const onesyStyleSheetManager = new window.OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } } });

        const onesyStyleSheet = new window.OnesyStyle.OnesyStyleSheet(a, 'static', 'regular', false, 'upper', undefined, onesyStyleSheetManager, onesyStyle, { style: { attributes: { method: 'style' } } });

        onesyStyleSheetManager.add();

        let css = '';

        Array.from(window.document.styleSheets).forEach((sheet: any) => {
          Array.from(sheet.cssRules).forEach((rule: any) => css += rule.cssText);
        });

        const response = [
          onesyStyleSheetManager.css,
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

        const onesyStyleRule = new window.OnesyStyle.OnesyStyleRule(
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

        onesyStyleRule.add();

        css = '';

        Array.from(window.document.styleSheets).forEach((sheet: any) => {
          Array.from(sheet.cssRules).forEach((rule: any) => css += rule.cssText);
        });

        response.push(
          onesyStyleSheetManager.css,
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
        onesyStyleRule.addProperty('& .a14', a14);

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
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n.a1-1 .a19 > a:active {\n  color: orange;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\n  color: yellow;\n}\n\n.a1-1 .a19 {\n  color: white;\n}\n\n.a1-1 {\n  color: yellow;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a:active { color: orange; float: left; margin-left: 40px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a19 { color: white; }.a1-1 { color: yellow; }",
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n.a1-1 .a19 > a:active {\n  color: orange;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\n  color: yellow;\n}\n\n.a1-1 .a19 {\n  color: white;\n}\n\n.a1-1 {\n  color: yellow;\n}\n\n.a1-1 .a14 > a:active {\n  color: yellow;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n.a1-1 .a14 > a {\n  color: yellow;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a:active { color: orange; float: left; margin-left: 40px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a19 { color: white; }.a1-1 { color: yellow; }.a1-1 .a14 > a:active { color: yellow; float: left; margin-left: 40px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a14 > a { color: yellow; }"
        ],
        [
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n.a1-1 .a19 > a:active {\n  color: orange;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\n  color: yellow;\n}\n\n.a1-1 .a19 {\n  color: white;\n}\n\n.a1-1 {\n  color: yellow;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a:active { color: orange; float: left; margin-left: 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a19 { color: white; }.a1-1 { color: yellow; }",
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n.a1-1 .a19 > a:active {\n  color: orange;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\n  color: yellow;\n}\n\n.a1-1 .a19 {\n  color: white;\n}\n\n.a1-1 {\n  color: yellow;\n}\n\n.a1-1 .a14 > a:active {\n  color: yellow;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n.a1-1 .a14 > a {\n  color: yellow;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a:active { color: orange; float: left; margin-left: 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a19 { color: white; }.a1-1 { color: yellow; }.a1-1 .a14 > a:active { color: yellow; float: left; margin-left: 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a14 > a { color: yellow; }"
        ],
        [
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n",
          ".a-0 { background-color: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n.a1-1 .a19 > a:active {\n  color: orange;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\n  color: yellow;\n}\n\n.a1-1 .a19 {\n  color: white;\n}\n\n.a1-1 {\n  color: yellow;\n}\n\n",
          ".a-0 { background-color: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a:active { color: orange; float: left; margin-left: 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a19 { color: white; }.a1-1 { color: yellow; }",
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n.a1-1 .a19 > a:active {\n  color: orange;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\n  color: yellow;\n}\n\n.a1-1 .a19 {\n  color: white;\n}\n\n.a1-1 {\n  color: yellow;\n}\n\n.a1-1 .a14 > a:active {\n  color: yellow;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n.a1-1 .a14 > a {\n  color: yellow;\n}\n\n",
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

      const onesyStyle = new OnesyStyle.OnesyStyle();

      onesyStyle.plugins.add = [
        OnesyStyle.unit,
        OnesyStyle.sort,
        OnesyStyle.prefix,
        OnesyStyle.rtl,
      ];

      const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } } });

      const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } } });

      onesyStyleSheetManager.add();

      const response = [
        onesyStyleSheetManager.css,
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

      const onesyStyleRule = new OnesyStyle.OnesyStyleRule(
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

      onesyStyleRule.add();

      response.push(
        onesyStyleSheetManager.css
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
      onesyStyleRule.addProperty('& .a14', a14);

      response.push(
        onesyStyleSheetManager.css
      );

      const valueNode = response;

      assert(valueNode).eql([
        "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n",
        "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n.a1-1 .a19 > a:active {\n  color: orange;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\n  color: yellow;\n}\n\n.a1-1 .a19 {\n  color: white;\n}\n\n.a1-1 {\n  color: yellow;\n}\n\n",
        "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n.a1-1 .a19 > a:active {\n  color: orange;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\n  color: yellow;\n}\n\n.a1-1 .a19 {\n  color: white;\n}\n\n.a1-1 {\n  color: yellow;\n}\n\n.a1-1 .a14 > a:active {\n  color: yellow;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n.a1-1 .a14 > a {\n  color: yellow;\n}\n\n"
      ]);
    });

    to('updateProps', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const a = {
          a7: {
            background: props => props.a === 1 ? 'yellow' : 'orange',
          }
        };

        const onesyStyle = new window.OnesyStyle.OnesyStyle();

        const onesyStyleSheetManager = new window.OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } } });

        onesyStyleSheetManager.add();

        const onesyStyleSheet = onesyStyleSheetManager.sheets.dynamic[0];

        const onesyStyleRule = onesyStyleSheet.rules[0].value;

        let css = '';

        Array.from(window.document.styleSheets).forEach((sheet: any) => {
          Array.from(sheet.cssRules).forEach((rule: any) => css += rule.cssText);
        });

        const response = [
          onesyStyleSheetManager.css,
          css
        ];

        onesyStyleSheet.props = { a: 1 };

        onesyStyleRule.updateProps();

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

      assert(values[0]).eql([
        "\n\n.a7-0 {\n  background: orange;\n}\n\n",
        ".a7-0 { background: orange; }",
        "\n\n.a7-0 {\n  background: yellow;\n}\n\n",
        ".a7-0 { background: yellow; }"
      ]);

      assert(values[1]).eql([
        "\n\n.a7-0 {\n  background: orange;\n}\n\n",
        ".a7-0 { background: orange none repeat scroll 0% 0%; }",
        "\n\n.a7-0 {\n  background: yellow;\n}\n\n",
        ".a7-0 { background: yellow none repeat scroll 0% 0%; }"
      ]);

      assert(values[2]).eql([
        "\n\n.a7-0 {\n  background: orange;\n}\n\n",
        ".a7-0 { background-color: orange; }",
        "\n\n.a7-0 {\n  background: yellow;\n}\n\n",
        ".a7-0 { background-color: yellow; }"
      ]);

      const a = {
        a7: {
          background: props => props.a === 1 ? 'yellow' : 'orange',
        }
      };

      const onesyStyle = new OnesyStyle.OnesyStyle();

      const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(a, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } } });

      onesyStyleSheetManager.add();

      const onesyStyleSheet = onesyStyleSheetManager.sheets.dynamic[0];

      const onesyStyleRule = onesyStyleSheet.rules[0].value;

      const response = [
        onesyStyleSheetManager.css
      ];

      onesyStyleSheet.props = { a: 1 };

      onesyStyleRule.updateProps();

      response.push(
        onesyStyleSheetManager.css
      );

      const valueNode = response;

      assert(valueNode).eql([
        "\n\n.a7-0 {\n  background: orange;\n}\n\n",
        "\n\n.a7-0 {\n  background: yellow;\n}\n\n"
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

        const onesyStyle = new window.OnesyStyle.OnesyStyle();

        onesyStyle.plugins.add = [
          window.OnesyStyle.unit,
          window.OnesyStyle.sort,
          window.OnesyStyle.prefix,
          window.OnesyStyle.rtl,
        ];

        const onesyStyleSheetManager = new window.OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } } });

        const onesyStyleSheet = new window.OnesyStyle.OnesyStyleSheet(a, 'static', 'regular', false, 'upper', undefined, onesyStyleSheetManager, onesyStyle, { style: { attributes: { method: 'style' } } });

        onesyStyleSheetManager.add();

        const onesyStyleRule = onesyStyleSheet.rules[0].value;

        let css = '';

        Array.from(window.document.styleSheets).forEach((sheet: any) => {
          Array.from(sheet.cssRules).forEach((rule: any) => css += rule.cssText);
        });

        const response = [
          onesyStyleSheetManager.css,
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

        onesyStyleRule.update(a1);

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
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
          "\n\n.a-0 {\n  color: yellow;\n}\n\n.a-0 .a19 > a:active {\n  color: orange;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n}\n\n.a-0 .a19 > a {\n  color: yellow;\n}\n\n.a-0 .a19 {\n  color: white;\n}\n\n",
          ".a-0 { color: yellow; }.a-0 .a19 > a:active { color: orange; float: left; margin-left: 40px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a-0 .a19 > a { color: yellow; }.a-0 .a19 { color: white; }"
        ],
        [
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
          "\n\n.a-0 {\n  color: yellow;\n}\n\n.a-0 .a19 > a:active {\n  color: orange;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n}\n\n.a-0 .a19 > a {\n  color: yellow;\n}\n\n.a-0 .a19 {\n  color: white;\n}\n\n",
          ".a-0 { color: yellow; }.a-0 .a19 > a:active { color: orange; float: left; margin-left: 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a-0 .a19 > a { color: yellow; }.a-0 .a19 { color: white; }"
        ],
        [
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n",
          ".a-0 { background-color: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
          "\n\n.a-0 {\n  color: yellow;\n}\n\n.a-0 .a19 > a:active {\n  color: orange;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n}\n\n.a-0 .a19 > a {\n  color: yellow;\n}\n\n.a-0 .a19 {\n  color: white;\n}\n\n",
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

      const onesyStyle = new OnesyStyle.OnesyStyle();

      onesyStyle.plugins.add = [
        OnesyStyle.unit,
        OnesyStyle.sort,
        OnesyStyle.prefix,
        OnesyStyle.rtl,
      ];

      const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } } });

      const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } } });

      onesyStyleSheetManager.add();

      const onesyStyleRule = onesyStyleSheet.rules[0].value;

      const response = [
        onesyStyleSheetManager.css
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

      onesyStyleRule.update(a1);

      response.push(
        onesyStyleSheetManager.css
      );

      const valueNode = response;

      assert(valueNode).eql([
        "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n",
        "\n\n.a-0 {\n  color: yellow;\n}\n\n.a-0 .a19 > a:active {\n  color: orange;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n}\n\n.a-0 .a19 > a {\n  color: yellow;\n}\n\n.a-0 .a19 {\n  color: white;\n}\n\n"
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

        const onesyStyle = new window.OnesyStyle.OnesyStyle();

        onesyStyle.plugins.add = [
          window.OnesyStyle.unit,
          window.OnesyStyle.sort,
          window.OnesyStyle.prefix,
          window.OnesyStyle.rtl,
        ];

        const onesyStyleSheetManager = new window.OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } } });

        const onesyStyleSheet = new window.OnesyStyle.OnesyStyleSheet(a, 'static', 'regular', false, 'upper', undefined, onesyStyleSheetManager, onesyStyle, { style: { attributes: { method: 'style' } } });

        onesyStyleSheetManager.add();

        let css = '';

        Array.from(window.document.styleSheets).forEach((sheet: any) => {
          Array.from(sheet.cssRules).forEach((rule: any) => css += rule.cssText);
        });

        const response = [
          onesyStyleSheetManager.css,
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

        const onesyStyleRule = new window.OnesyStyle.OnesyStyleRule(
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

        onesyStyleRule.add();

        css = '';

        Array.from(window.document.styleSheets).forEach((sheet: any) => {
          Array.from(sheet.cssRules).forEach((rule: any) => css += rule.cssText);
        });

        response.push(
          onesyStyleSheetManager.css,
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
        onesyStyleRule.addProperty('& .a14', a14);

        css = '';

        Array.from(window.document.styleSheets).forEach((sheet: any) => {
          Array.from(sheet.cssRules).forEach((rule: any) => css += rule.cssText);
        });

        response.push(
          onesyStyleSheetManager.css,
          css
        );

        // remove
        onesyStyleRule.remove();

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
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n.a1-1 .a19 > a:active {\n  color: orange;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\n  color: yellow;\n}\n\n.a1-1 .a19 {\n  color: white;\n}\n\n.a1-1 {\n  color: yellow;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a:active { color: orange; float: left; margin-left: 40px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a19 { color: white; }.a1-1 { color: yellow; }",
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n.a1-1 .a19 > a:active {\n  color: orange;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\n  color: yellow;\n}\n\n.a1-1 .a19 {\n  color: white;\n}\n\n.a1-1 {\n  color: yellow;\n}\n\n.a1-1 .a14 > a:active {\n  color: yellow;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n.a1-1 .a14 > a {\n  color: yellow;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a:active { color: orange; float: left; margin-left: 40px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a19 { color: white; }.a1-1 { color: yellow; }.a1-1 .a14 > a:active { color: yellow; float: left; margin-left: 40px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a14 > a { color: yellow; }",
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }"
        ],
        [
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n.a1-1 .a19 > a:active {\n  color: orange;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\n  color: yellow;\n}\n\n.a1-1 .a19 {\n  color: white;\n}\n\n.a1-1 {\n  color: yellow;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a:active { color: orange; float: left; margin-left: 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a19 { color: white; }.a1-1 { color: yellow; }",
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n.a1-1 .a19 > a:active {\n  color: orange;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\n  color: yellow;\n}\n\n.a1-1 .a19 {\n  color: white;\n}\n\n.a1-1 {\n  color: yellow;\n}\n\n.a1-1 .a14 > a:active {\n  color: yellow;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n.a1-1 .a14 > a {\n  color: yellow;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a:active { color: orange; float: left; margin-left: 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a19 { color: white; }.a1-1 { color: yellow; }.a1-1 .a14 > a:active { color: yellow; float: left; margin-left: 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-position: 40% 74%; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a14 > a { color: yellow; }",
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n",
          ".a-0 { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }"
        ],
        [
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n",
          ".a-0 { background-color: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n.a1-1 .a19 > a:active {\n  color: orange;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\n  color: yellow;\n}\n\n.a1-1 .a19 {\n  color: white;\n}\n\n.a1-1 {\n  color: yellow;\n}\n\n",
          ".a-0 { background-color: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a:active { color: orange; float: left; margin-left: 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a19 { color: white; }.a1-1 { color: yellow; }",
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n.a1-1 .a19 > a:active {\n  color: orange;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\n  color: yellow;\n}\n\n.a1-1 .a19 {\n  color: white;\n}\n\n.a1-1 {\n  color: yellow;\n}\n\n.a1-1 .a14 > a:active {\n  color: yellow;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n.a1-1 .a14 > a {\n  color: yellow;\n}\n\n",
          ".a-0 { background-color: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a19 > a:active { color: orange; float: left; margin-left: 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; }.a1-1 .a19 > a { color: yellow; }.a1-1 .a19 { color: white; }.a1-1 { color: yellow; }.a1-1 .a14 > a:active { color: yellow; float: left; margin-left: 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }.a1-1 .a14 > a { color: yellow; }",
          "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n",
          ".a-0 { background-color: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }"
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

      const onesyStyle = new OnesyStyle.OnesyStyle();

      onesyStyle.plugins.add = [
        OnesyStyle.unit,
        OnesyStyle.sort,
        OnesyStyle.prefix,
        OnesyStyle.rtl,
      ];

      const onesyStyleSheetManager = new OnesyStyle.OnesyStyleSheetManager(undefined, { mode: 'regular', pure: false, priority: 'upper', onesyStyle, style: { attributes: { method: 'style' } } });

      const onesyStyleSheet = new OnesyStyle.OnesyStyleSheet(a, { version: 'static', mode: 'regular', pure: false, priority: 'upper', onesyStyle, onesyStyleSheetManager, style: { attributes: { method: 'style' } } });

      onesyStyleSheetManager.add();

      const response = [
        onesyStyleSheetManager.css,
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

      const onesyStyleRule = new OnesyStyle.OnesyStyleRule(
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

      onesyStyleRule.add();

      response.push(
        onesyStyleSheetManager.css
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
      onesyStyleRule.addProperty('& .a14', a14);

      response.push(
        onesyStyleSheetManager.css
      );

      // remove
      onesyStyleRule.remove();

      response.push(
        onesyStyleSheetManager.css
      );

      const valueNode = response;

      assert(valueNode).eql([
        "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n",
        "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n.a1-1 .a19 > a:active {\n  color: orange;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\n  color: yellow;\n}\n\n.a1-1 .a19 {\n  color: white;\n}\n\n.a1-1 {\n  color: yellow;\n}\n\n",
        "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n.a1-1 .a19 > a:active {\n  color: orange;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n}\n\n.a1-1 .a19 > a {\n  color: yellow;\n}\n\n.a1-1 .a19 {\n  color: white;\n}\n\n.a1-1 {\n  color: yellow;\n}\n\n.a1-1 .a14 > a:active {\n  color: yellow;\n  float: left;\n  margin-left: 40px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: margin-box;\n  mask-position: 40% 74%;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n.a1-1 .a14 > a {\n  color: yellow;\n}\n\n",
        "\n\n.a-0 {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\n"
      ]);
    });

  });

});
