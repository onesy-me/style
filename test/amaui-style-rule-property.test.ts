/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';
import * as AmauiUtils from '@amaui/utils';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers } from '../utils/js/test/utils';

import * as AmauiStyle from '../src';
import { TValue } from '../src';
import { counter } from '../src/amaui-style-rule';

group('@amaui/style/amaui-style-rule-property', () => {
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

  group('AmauiStyleRuleProperty', () => {

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

        const amauiStyle = new window.AmauiStyle.AmauiStyle(window.document.body);

        amauiStyle.plugins.add = [
          window.AmauiStyle.unit,
          window.AmauiStyle.sort,
          window.AmauiStyle.prefix,
          window.AmauiStyle.rtl,
        ];

        const amauiStyleSheetManager = new window.AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const amauiStyleSheet = new window.AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

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

        const amauiStyleRuleProperty = window.AmauiStyle.AmauiStyleRuleProperty.make(
          100,
          'width',
          'value',
          false,
          amauiStyleRule,
          [...amauiStyleRule.parents, amauiStyleRule],
          amauiStyleRule,
          amauiStyleSheet,
          amauiStyle
        );

        return [
          typeof amauiStyleRuleProperty.id === 'string',
          amauiStyleRuleProperty.level,
          amauiStyleRuleProperty.values,
          amauiStyleRuleProperty.options
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

      amauiStyle.plugins.add = [
        AmauiStyle.unit,
        AmauiStyle.sort,
        AmauiStyle.prefix,
        AmauiStyle.rtl,
      ];

      const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

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

      const amauiStyleRuleProperty = AmauiStyle.AmauiStyleRuleProperty.make(
        100,
        'width',
        'value',
        false,
        amauiStyleRule,
        [...amauiStyleRule.parents, amauiStyleRule],
        amauiStyleRule,
        amauiStyleSheet,
        amauiStyle
      );

      const valueNode = [
        typeof amauiStyleRuleProperty.id === 'string',
        amauiStyleRuleProperty.level,
        amauiStyleRuleProperty.values,
        amauiStyleRuleProperty.options
      ];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        true,
        1,
        {
          "property": "width",
          "value": "100px",
          "css": "width: 100px;",
          "json": {
            "width": "100px"
          }
        },
        {}
      ]));
    });

  });

  group('amauiStyleRuleProperty', () => {

    to('amauiStyleRuleProperty', async () => {
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

        const amauiStyle = new window.AmauiStyle.AmauiStyle(window.document.body);

        amauiStyle.plugins.add = [
          window.AmauiStyle.unit,
          window.AmauiStyle.sort,
          window.AmauiStyle.prefix,
          window.AmauiStyle.rtl,
        ];

        const amauiStyleSheetManager = new window.AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

        const amauiStyleSheet = new window.AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

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

        const amauiStyleRuleProperty = new window.AmauiStyle.AmauiStyleRuleProperty(
          100,
          'width',
          'value',
          false,
          amauiStyleRule,
          [...amauiStyleRule.parents, amauiStyleRule],
          amauiStyleRule,
          amauiStyleSheet,
          amauiStyle
        );

        return [
          typeof amauiStyleRuleProperty.id === 'string',
          amauiStyleRuleProperty.level,
          amauiStyleRuleProperty.values,
          amauiStyleRuleProperty.options
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

      amauiStyle.plugins.add = [
        AmauiStyle.unit,
        AmauiStyle.sort,
        AmauiStyle.prefix,
        AmauiStyle.rtl,
      ];

      const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

      const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } }, rule: { prefix: false } });

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

      const amauiStyleRuleProperty = new AmauiStyle.AmauiStyleRuleProperty(
        100,
        'width',
        'value',
        false,
        amauiStyleRule,
        [...amauiStyleRule.parents, amauiStyleRule],
        amauiStyleRule,
        amauiStyleSheet,
        amauiStyle
      );

      const valueNode = [
        typeof amauiStyleRuleProperty.id === 'string',
        amauiStyleRuleProperty.level,
        amauiStyleRuleProperty.values,
        amauiStyleRuleProperty.options
      ];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        true,
        1,
        {
          "property": "width",
          "value": "100px",
          "css": "width: 100px;",
          "json": {
            "width": "100px"
          }
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

        const amauiStyle = new window.AmauiStyle.AmauiStyle(window.document.body);

        amauiStyle.plugins.add = [
          window.AmauiStyle.unit,
          window.AmauiStyle.sort,
          window.AmauiStyle.prefix,
          window.AmauiStyle.rtl,
        ];

        const amauiStyleSheetManager = new window.AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, {}, { style: { attributes: { method: 'style' } } });

        const amauiStyleSheet = new window.AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, { style: { attributes: { method: 'style' } } });

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

        // maskOrigin
        new window.AmauiStyle.AmauiStyleRuleProperty(
          'inherit',
          'maskOrigin',
          'value',
          false,
          amauiStyleRule,
          [...amauiStyleRule.parents, amauiStyleRule],
          amauiStyleRule,
          amauiStyleSheet,
          amauiStyle
        );

        // marginLeft
        new window.AmauiStyle.AmauiStyleRuleProperty(
          41,
          'marginLeft',
          'value',
          false,
          amauiStyleRule,
          [...amauiStyleRule.parents, amauiStyleRule],
          amauiStyleRule,
          amauiStyleSheet,
          amauiStyle
        );

        return [
          amauiStyleRule.css
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

      amauiStyle.plugins.add = [
        AmauiStyle.unit,
        AmauiStyle.sort,
        AmauiStyle.prefix,
        AmauiStyle.rtl,
      ];

      const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } } });

      const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } } });

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

      // maskOrigin
      new AmauiStyle.AmauiStyleRuleProperty(
        'inherit',
        'maskOrigin',
        'value',
        false,
        amauiStyleRule,
        [...amauiStyleRule.parents, amauiStyleRule],
        amauiStyleRule,
        amauiStyleSheet,
        amauiStyle
      );

      // marginLeft
      new AmauiStyle.AmauiStyleRuleProperty(
        41,
        'marginLeft',
        'value',
        false,
        amauiStyleRule,
        [...amauiStyleRule.parents, amauiStyleRule],
        amauiStyleRule,
        amauiStyleSheet,
        amauiStyle
      );

      const valueNode = [
        amauiStyleRule.css
      ];

      const values = [valueNode, ...valueBrowsers];

      assert(values[0]).eql([
        ".a1-1 {\n-moz-transition: all .4s ease;\n-o-transition: all .4s ease;\n-webkit-mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n-webkit-mask-origin: inherit;\n-webkit-mask-position: 40% 74%;\n-webkit-transition: all .4s ease;\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: -webkit-sticky;\nposition: sticky;\ntransition: all .4s ease;\n-webkit-mask-origin: inherit;\nmask-origin: inherit;\nmargin-right: 41px;\n}"
      ]);

      assert(values[1]).eql([
        ".a1-1 {\n-webkit-mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n-webkit-mask-position: 40% 74%;\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: sticky;\ntransition: all .4s ease;\n-webkit-mask-origin: inherit;\nmask-origin: inherit;\nmargin-right: 41px;\n}"
      ]);

      assert(values[2]).eql([
        ".a1-1 {\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmargin-right: 41px;\n}"
      ]);

      assert(values[3]).eql([
        ".a1-1 {\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: sticky;\ntransition: all .4s ease;\nmask-origin: inherit;\nmargin-right: 41px;\n}"
      ]);
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

          const amauiStyleRuleProperty = new window.AmauiStyle.AmauiStyleRuleProperty(
            100,
            'width',
            'value',
            false,
            amauiStyleRule,
            [...amauiStyleRule.parents, amauiStyleRule],
            amauiStyleRule,
            amauiStyleSheet,
            amauiStyle
          );

          return [window.AmauiUtils.equalDeep({ css: amauiStyleRuleProperty.values.css, json: amauiStyleRuleProperty.values.json }, amauiStyleRuleProperty.response), amauiStyleRuleProperty.response];
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

        amauiStyle.plugins.add = [
          AmauiStyle.unit,
          AmauiStyle.sort,
          AmauiStyle.prefix,
          AmauiStyle.rtl,
        ];

        const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } } });

        const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } } });

        const amauiStyleRule = amauiStyleSheet.rules[0].value;

        const amauiStyleRuleProperty = new AmauiStyle.AmauiStyleRuleProperty(
          100,
          'width',
          'value',
          false,
          amauiStyleRule,
          [...amauiStyleRule.parents, amauiStyleRule],
          amauiStyleRule,
          amauiStyleSheet,
          amauiStyle
        );

        const valueNode = [AmauiUtils.equalDeep({ css: amauiStyleRuleProperty.values.css, json: amauiStyleRuleProperty.values.json }, amauiStyleRuleProperty.response), amauiStyleRuleProperty.response];

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          true,
          {
            "css": "width: 100px;",
            "json": {
              "width": "100px",
            }
          }
        ]));
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

          const amauiStyleRuleProperty = new window.AmauiStyle.AmauiStyleRuleProperty(
            100,
            'width',
            'value',
            false,
            amauiStyleRule,
            [...amauiStyleRule.parents, amauiStyleRule],
            amauiStyleRule,
            amauiStyleSheet,
            amauiStyle
          );

          return [window.AmauiUtils.equalDeep(amauiStyleRuleProperty.values.css, amauiStyleRuleProperty.css), amauiStyleRuleProperty.css];
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

        amauiStyle.plugins.add = [
          AmauiStyle.unit,
          AmauiStyle.sort,
          AmauiStyle.prefix,
          AmauiStyle.rtl,
        ];

        const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } } });

        const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } } });

        const amauiStyleRule = amauiStyleSheet.rules[0].value;

        const amauiStyleRuleProperty = new AmauiStyle.AmauiStyleRuleProperty(
          100,
          'width',
          'value',
          false,
          amauiStyleRule,
          [...amauiStyleRule.parents, amauiStyleRule],
          amauiStyleRule,
          amauiStyleSheet,
          amauiStyle
        );

        const valueNode = [AmauiUtils.equalDeep(amauiStyleRuleProperty.values.css, amauiStyleRuleProperty.css), amauiStyleRuleProperty.css];

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          true,
          "width: 100px;"
        ]));
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

          const amauiStyleRuleProperty = new window.AmauiStyle.AmauiStyleRuleProperty(
            100,
            'width',
            'value',
            false,
            amauiStyleRule,
            [...amauiStyleRule.parents, amauiStyleRule],
            amauiStyleRule,
            amauiStyleSheet,
            amauiStyle
          );

          return [window.AmauiUtils.equalDeep(amauiStyleRuleProperty.values.json, amauiStyleRuleProperty.json), amauiStyleRuleProperty.json];
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

        amauiStyle.plugins.add = [
          AmauiStyle.unit,
          AmauiStyle.sort,
          AmauiStyle.prefix,
          AmauiStyle.rtl,
        ];

        const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(undefined, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } } });

        const amauiStyleSheet = new AmauiStyle.AmauiStyleSheet(a, 'static', 'regular', false, 'upper', undefined, amauiStyleSheetManager, amauiStyle, {}, { style: { attributes: { method: 'style' } } });

        const amauiStyleRule = amauiStyleSheet.rules[0].value;

        const amauiStyleRuleProperty = new AmauiStyle.AmauiStyleRuleProperty(
          100,
          'width',
          'value',
          false,
          amauiStyleRule,
          [...amauiStyleRule.parents, amauiStyleRule],
          amauiStyleRule,
          amauiStyleSheet,
          amauiStyle
        );

        const valueNode = [AmauiUtils.equalDeep(amauiStyleRuleProperty.values.json, amauiStyleRuleProperty.json), amauiStyleRuleProperty.json];

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          true,
          {
            "width": "100px",
          }
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

        const amauiStyle = new window.AmauiStyle.AmauiStyle();

        amauiStyle.plugins.add = [
          window.AmauiStyle.unit,
          window.AmauiStyle.sort,
          window.AmauiStyle.prefix,
          window.AmauiStyle.rtl,
        ];

        const amauiStyleSheetManager = new window.AmauiStyle.AmauiStyleSheetManager(a, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } } });

        amauiStyleSheetManager.add();

        const amauiStyleSheet = amauiStyleSheetManager.sheets.dynamic[0];

        const amauiStyleRuleProperty = amauiStyleSheet.rules[0].value.rules[0].value;

        const amauiStyleRuleProperty1 = amauiStyleSheet.rules[0].value.rules[1].value;

        let css = '';

        Array.from(window.document.styleSheets).forEach((sheet: any) => {
          Array.from(sheet.cssRules).forEach((rule: any) => css += rule.cssText);
        });

        const response = [
          amauiStyleSheetManager.css,
          css
        ];

        amauiStyleSheet.props = { a: 1 };

        // Update props
        amauiStyleRuleProperty.update();

        // Update value
        amauiStyleRuleProperty1.update(1114);

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
        "\n\n.a-0 {\n-webkit-mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n-webkit-mask-origin: inherit;\n-webkit-mask-position: 40% 74%;\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n\n\n.a7-1 {\nbackground: orange;\nwidth: 11px;\n}\n\n",
        ".a7-1 { background: orange; width: 11px; }.a-0 { -webkit-mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-origin: inherit; -webkit-mask-position: 40% 74%; background: rgb(255, 170, 170); float: right; margin: 0px 41px 4px 40px; max-width: 100px; padding: 40px 41px 40px 40px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
        "\n\n.a-0 {\n-webkit-mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n-webkit-mask-origin: inherit;\n-webkit-mask-position: 40% 74%;\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n\n\n.a7-1 {\nbackground: yellow;\nwidth: 1114px;\n}\n\n",
        ".a7-1 { background: yellow; width: 1114px; }.a-0 { -webkit-mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-origin: inherit; -webkit-mask-position: 40% 74%; background: rgb(255, 170, 170); float: right; margin: 0px 41px 4px 40px; max-width: 100px; padding: 40px 41px 40px 40px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }"
      ]);

      assert(values[1]).eql([
        "\n\n.a-0 {\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n\n\n.a7-1 {\nbackground: orange;\nwidth: 11px;\n}\n\n",
        ".a7-1 { background: orange none repeat scroll 0% 0%; width: 11px; }.a-0 { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: right; margin: 0px 41px 4px 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 41px 40px 40px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
        "\n\n.a-0 {\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n\n\n.a7-1 {\nbackground: yellow;\nwidth: 1114px;\n}\n\n",
        ".a7-1 { background: yellow none repeat scroll 0% 0%; width: 1114px; }.a-0 { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: right; margin: 0px 41px 4px 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 41px 40px 40px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }"
      ]);

      assert(values[2]).eql([
        "\n\n.a-0 {\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n\n\n.a7-1 {\nbackground: orange;\nwidth: 11px;\n}\n\n",
        ".a7-1 { background-color: orange; width: 11px; }.a-0 { background-color: rgb(255, 170, 170); float: right; margin: 0px 41px 4px 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 41px 40px 40px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
        "\n\n.a-0 {\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n\n\n.a7-1 {\nbackground: yellow;\nwidth: 1114px;\n}\n\n",
        ".a7-1 { background-color: yellow; width: 1114px; }.a-0 { background-color: rgb(255, 170, 170); float: right; margin: 0px 41px 4px 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 41px 40px 40px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }"
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

      const amauiStyle = new AmauiStyle.AmauiStyle();

      amauiStyle.plugins.add = [
        AmauiStyle.unit,
        AmauiStyle.sort,
        AmauiStyle.prefix,
        AmauiStyle.rtl,
      ];

      const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(a, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } } });

      amauiStyleSheetManager.add();

      const amauiStyleSheet = amauiStyleSheetManager.sheets.dynamic[0];

      const amauiStyleRuleProperty = amauiStyleSheet.rules[0].value.rules[0].value;

      const amauiStyleRuleProperty1 = amauiStyleSheet.rules[0].value.rules[1].value;

      const response = [
        amauiStyleSheetManager.css
      ];

      amauiStyleSheet.props = { a: 1 };

      // Update props
      amauiStyleRuleProperty.update();

      // Update value
      amauiStyleRuleProperty1.update(1114);

      response.push(
        amauiStyleSheetManager.css
      );

      const valueNode = response;

      assert(valueNode).eql([
        "\n\n.a-0 {\n-moz-transition: all .4s ease;\n-o-transition: all .4s ease;\n-webkit-mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n-webkit-mask-origin: inherit;\n-webkit-mask-position: 40% 74%;\n-webkit-transition: all .4s ease;\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: -webkit-sticky;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n\n\n.a7-1 {\nbackground: orange;\nwidth: 11px;\n}\n\n",
        "\n\n.a-0 {\n-moz-transition: all .4s ease;\n-o-transition: all .4s ease;\n-webkit-mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n-webkit-mask-origin: inherit;\n-webkit-mask-position: 40% 74%;\n-webkit-transition: all .4s ease;\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: -webkit-sticky;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n\n\n.a7-1 {\nbackground: yellow;\nwidth: 1114px;\n}\n\n"
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

        const amauiStyle = new window.AmauiStyle.AmauiStyle();

        amauiStyle.plugins.add = [
          window.AmauiStyle.unit,
          window.AmauiStyle.sort,
          window.AmauiStyle.prefix,
          window.AmauiStyle.rtl,
        ];

        const amauiStyleSheetManager = new window.AmauiStyle.AmauiStyleSheetManager(a, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } } });

        amauiStyleSheetManager.add();

        const amauiStyleSheet = amauiStyleSheetManager.sheets.dynamic[0];

        const amauiStyleRuleProperty = amauiStyleSheet.rules[0].value.rules[0].value;

        const amauiStyleRuleProperty1 = amauiStyleSheet.rules[0].value.rules[1].value;

        let css = '';

        Array.from(window.document.styleSheets).forEach((sheet: any) => {
          Array.from(sheet.cssRules).forEach((rule: any) => css += rule.cssText);
        });

        const response = [
          amauiStyleSheetManager.css,
          css
        ];

        amauiStyleSheet.props = { a: 1 };

        // Update props
        amauiStyleRuleProperty.update();

        // Update value
        amauiStyleRuleProperty1.update(1114);

        css = '';

        Array.from(window.document.styleSheets).forEach((sheet: any) => {
          Array.from(sheet.cssRules).forEach((rule: any) => css += rule.cssText);
        });

        response.push(
          amauiStyleSheetManager.css,
          css
        );

        // Remove value
        amauiStyleRuleProperty1.remove();

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
        "\n\n.a-0 {\n-webkit-mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n-webkit-mask-origin: inherit;\n-webkit-mask-position: 40% 74%;\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n\n\n.a7-1 {\nbackground: orange;\nwidth: 11px;\n}\n\n",
        ".a7-1 { background: orange; width: 11px; }.a-0 { -webkit-mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-origin: inherit; -webkit-mask-position: 40% 74%; background: rgb(255, 170, 170); float: right; margin: 0px 41px 4px 40px; max-width: 100px; padding: 40px 41px 40px 40px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
        "\n\n.a-0 {\n-webkit-mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n-webkit-mask-origin: inherit;\n-webkit-mask-position: 40% 74%;\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n\n\n.a7-1 {\nbackground: yellow;\nwidth: 1114px;\n}\n\n",
        ".a7-1 { background: yellow; width: 1114px; }.a-0 { -webkit-mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-origin: inherit; -webkit-mask-position: 40% 74%; background: rgb(255, 170, 170); float: right; margin: 0px 41px 4px 40px; max-width: 100px; padding: 40px 41px 40px 40px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
        "\n\n.a-0 {\n-webkit-mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n-webkit-mask-origin: inherit;\n-webkit-mask-position: 40% 74%;\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n\n\n.a7-1 {\nbackground: yellow;\n}\n\n",
        ".a7-1 { background: yellow; }.a-0 { -webkit-mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-origin: inherit; -webkit-mask-position: 40% 74%; background: rgb(255, 170, 170); float: right; margin: 0px 41px 4px 40px; max-width: 100px; padding: 40px 41px 40px 40px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }"
      ]);

      assert(values[1]).eql([
        "\n\n.a-0 {\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n\n\n.a7-1 {\nbackground: orange;\nwidth: 11px;\n}\n\n",
        ".a7-1 { background: orange none repeat scroll 0% 0%; width: 11px; }.a-0 { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: right; margin: 0px 41px 4px 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 41px 40px 40px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
        "\n\n.a-0 {\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n\n\n.a7-1 {\nbackground: yellow;\nwidth: 1114px;\n}\n\n",
        ".a7-1 { background: yellow none repeat scroll 0% 0%; width: 1114px; }.a-0 { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: right; margin: 0px 41px 4px 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 41px 40px 40px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
        "\n\n.a-0 {\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n\n\n.a7-1 {\nbackground: yellow;\n}\n\n",
        ".a7-1 { background: yellow none repeat scroll 0% 0%; }.a-0 { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: right; margin: 0px 41px 4px 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 41px 40px 40px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }"
      ]);

      assert(values[2]).eql([
        "\n\n.a-0 {\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n\n\n.a7-1 {\nbackground: orange;\nwidth: 11px;\n}\n\n",
        ".a7-1 { background-color: orange; width: 11px; }.a-0 { background-color: rgb(255, 170, 170); float: right; margin: 0px 41px 4px 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 41px 40px 40px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
        "\n\n.a-0 {\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n\n\n.a7-1 {\nbackground: yellow;\nwidth: 1114px;\n}\n\n",
        ".a7-1 { background-color: yellow; width: 1114px; }.a-0 { background-color: rgb(255, 170, 170); float: right; margin: 0px 41px 4px 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 41px 40px 40px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
        "\n\n.a-0 {\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n\n\n.a7-1 {\nbackground: yellow;\n}\n\n",
        ".a7-1 { background-color: yellow; }.a-0 { background-color: rgb(255, 170, 170); float: right; margin: 0px 41px 4px 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 41px 40px 40px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }"
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

      const amauiStyle = new AmauiStyle.AmauiStyle();

      amauiStyle.plugins.add = [
        AmauiStyle.unit,
        AmauiStyle.sort,
        AmauiStyle.prefix,
        AmauiStyle.rtl,
      ];

      const amauiStyleSheetManager = new AmauiStyle.AmauiStyleSheetManager(a, 'regular', false, 'upper', undefined, amauiStyle, { style: { attributes: { method: 'style' } } });

      amauiStyleSheetManager.add();

      const amauiStyleSheet = amauiStyleSheetManager.sheets.dynamic[0];

      const amauiStyleRuleProperty = amauiStyleSheet.rules[0].value.rules[0].value;

      const amauiStyleRuleProperty1 = amauiStyleSheet.rules[0].value.rules[1].value;

      const response = [
        amauiStyleSheetManager.css
      ];

      amauiStyleSheet.props = { a: 1 };

      // Update props
      amauiStyleRuleProperty.update();

      // Update value
      amauiStyleRuleProperty1.update(1114);

      response.push(
        amauiStyleSheetManager.css
      );

      // Remove value
      amauiStyleRuleProperty1.remove();

      response.push(
        amauiStyleSheetManager.css
      );

      const valueNode = response;

      assert(valueNode).eql([
        "\n\n.a-0 {\n-moz-transition: all .4s ease;\n-o-transition: all .4s ease;\n-webkit-mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n-webkit-mask-origin: inherit;\n-webkit-mask-position: 40% 74%;\n-webkit-transition: all .4s ease;\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: -webkit-sticky;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n\n\n.a7-1 {\nbackground: orange;\nwidth: 11px;\n}\n\n",
        "\n\n.a-0 {\n-moz-transition: all .4s ease;\n-o-transition: all .4s ease;\n-webkit-mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n-webkit-mask-origin: inherit;\n-webkit-mask-position: 40% 74%;\n-webkit-transition: all .4s ease;\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: -webkit-sticky;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n\n\n.a7-1 {\nbackground: yellow;\nwidth: 1114px;\n}\n\n",
        "\n\n.a-0 {\n-moz-transition: all .4s ease;\n-o-transition: all .4s ease;\n-webkit-mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n-webkit-mask-origin: inherit;\n-webkit-mask-position: 40% 74%;\n-webkit-transition: all .4s ease;\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: -webkit-sticky;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n\n\n.a7-1 {\nbackground: yellow;\n}\n\n"
      ]);
    });

  });

});
