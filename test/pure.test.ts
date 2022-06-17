/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers } from '../utils/js/test/utils';

import * as AmauiStyle from '../src';
import { TValue } from '../src';

group('@amaui/style/pure', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => await closeBrowsers(browsers));

  group('browser', () => {

    to('pure', async () => {
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

        const pure = window.AmauiStyle.pure(a, { amaui_style: { value: amauiStyle } });

        // Add
        pure.add();

        let valueCSS = ``;

        Array.from(document.styleSheets).forEach(styleSheet => {
          Array.from(styleSheet.cssRules).forEach(cssRule => valueCSS += `\n${cssRule.cssText}`);
        });

        return [
          window.document.styleSheets.length,
          Object.keys(pure),
          pure.amaui_style_sheet_manager.status === 'active',
          valueCSS,
          amauiStyle.css,
        ];
      }, { browsers });

      const values = [...valueBrowsers];

      assert(values).eql([
        [
          2,
          [
            "ids",
            "amaui_style_sheet_manager",
            "sheets",
            "add",
            "props",
            "update",
            "remove",
            "addRule"
          ],
          true,
          "\na { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }\nmeta { width: 100px; }\nmain { background: orange; }",
          "\n\na {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\nmeta {\nwidth: 100px;\n}\n\n\n\nmain {\nbackground: orange;\n}\n\n"
        ],
        [
          2,
          [
            "ids",
            "amaui_style_sheet_manager",
            "sheets",
            "add",
            "props",
            "update",
            "remove",
            "addRule"
          ],
          true,
          "\na { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }\nmeta { width: 100px; }\nmain { background: orange none repeat scroll 0% 0%; }",
          "\n\na {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\nmeta {\nwidth: 100px;\n}\n\n\n\nmain {\nbackground: orange;\n}\n\n"
        ],
        [
          2,
          [
            "ids",
            "amaui_style_sheet_manager",
            "sheets",
            "add",
            "props",
            "update",
            "remove",
            "addRule"
          ],
          true,
          "\na { background-color: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }\nmeta { width: 100px; }\nmain { background-color: orange; }",
          "\n\na {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\nmeta {\nwidth: 100px;\n}\n\n\n\nmain {\nbackground: orange;\n}\n\n"
        ]
      ]);
    });

  });

  group('node', () => {

    to('pure', async () => {
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

      const pure = AmauiStyle.pure(a, { amaui_style: { value: amauiStyle } });

      // Add
      pure.add();

      const value = [
        Object.keys(pure),
        pure.amaui_style_sheet_manager.status === 'inited',
        amauiStyle.css,
      ];

      assert(value).eql([
        [
          "ids",
          "amaui_style_sheet_manager",
          "sheets",
          "add",
          "props",
          "update",
          "remove",
          "addRule"
        ],
        true,
        "\n\na {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\nmeta {\nwidth: 100px;\n}\n\n\n\nmain {\nbackground: orange;\n}\n\n"
      ]);
    });

  });

});
