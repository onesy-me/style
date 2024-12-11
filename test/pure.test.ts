/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate } from '../utils/js/test/utils';

import * as OnesyStyle from '../src';
import { TValue } from '../src';

group('@onesy/style/pure', () => {

  group('browser', () => {

    to('pure', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const onesyStyle = new window.OnesyStyle.OnesyStyle(window.document.body);

        // Plugins
        onesyStyle.plugins.add = [
          window.OnesyStyle.unit,
          window.OnesyStyle.sort,
          window.OnesyStyle.prefix,
          window.OnesyStyle.makeClassName,
          window.OnesyStyle.rtl,
        ];

        const a = {
          a: {
            // unit
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

          meta: {
            width: 100
          },

          main: {
            // Function
            background: props => props.a === 1 ? 'yellow' : 'orange',
          },
        };

        const pure = window.OnesyStyle.pure(a, { onesy_style: { value: onesyStyle } });

        // Add
        pure.add();

        let valueCSS = ``;

        Array.from(document.styleSheets).forEach(styleSheet => {
          Array.from(styleSheet.cssRules).forEach(cssRule => valueCSS += `\n${cssRule.cssText}`);
        });

        return [
          window.document.styleSheets.length,
          Object.keys(pure),
          pure.onesy_style_sheet_manager.status === 'active',
          valueCSS,
          onesyStyle.css,
        ];
      });

      const values = [...valueBrowsers];

      assert(values).eql([
        [
          2,
          [
            "ids",
            "onesy_style_sheet_manager",
            "sheets",
            "add",
            "props",
            "update",
            "remove",
            "addRule"
          ],
          true,
          "\na { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }\nmeta { width: 100px; }\nmain { background: orange; }",
          "\n\na {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\nmeta {\n  width: 100px;\n}\n\nmain {\n  background: orange;\n}\n\n"
        ],
        [
          2,
          [
            "ids",
            "onesy_style_sheet_manager",
            "sheets",
            "add",
            "props",
            "update",
            "remove",
            "addRule"
          ],
          true,
          "\na { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }\nmeta { width: 100px; }\nmain { background: orange none repeat scroll 0% 0%; }",
          "\n\na {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\nmeta {\n  width: 100px;\n}\n\nmain {\n  background: orange;\n}\n\n"
        ],
        [
          2,
          [
            "ids",
            "onesy_style_sheet_manager",
            "sheets",
            "add",
            "props",
            "update",
            "remove",
            "addRule"
          ],
          true,
          "\na { background-color: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }\nmeta { width: 100px; }\nmain { background-color: orange; }",
          "\n\na {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\nmeta {\n  width: 100px;\n}\n\nmain {\n  background: orange;\n}\n\n"
        ]
      ]);
    });

  });

  group('node', () => {

    to('pure', async () => {
      const onesyStyle = new OnesyStyle.OnesyStyle();

      // Plugins
      onesyStyle.plugins.add = [
        OnesyStyle.unit,
        OnesyStyle.sort,
        OnesyStyle.prefix,
        OnesyStyle.makeClassName,
        OnesyStyle.rtl,
      ];

      const a: TValue = {
        a: {
          // unit
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

        meta: {
          width: 100
        },

        main: {
          // Function
          background: props => props.a === 1 ? 'yellow' : 'orange',
        },
      };

      const pure = OnesyStyle.pure(a, { onesy_style: { value: onesyStyle } });

      // Add
      pure.add();

      const value = [
        Object.keys(pure),
        pure.onesy_style_sheet_manager.status === 'inited',
        onesyStyle.css,
      ];

      assert(value).eql([
        [
          "ids",
          "onesy_style_sheet_manager",
          "sheets",
          "add",
          "props",
          "update",
          "remove",
          "addRule"
        ],
        true,
        "\n\na {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\nmeta {\n  width: 100px;\n}\n\nmain {\n  background: orange;\n}\n\n"
      ]);
    });

  });

});
