/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers } from '../utils/js/test/utils';

import * as AmauiStyle from '../src';
import { TValue } from '../src';

group('@amaui/style/style', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => await closeBrowsers(browsers));

  group('browser', () => {

    to('style', async () => {
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

        const style = window.AmauiStyle.style(a, { amaui_style: { value: amauiStyle } });

        // Add
        style.add();

        let valueCSS = ``;

        Array.from(document.styleSheets).forEach(styleSheet => {
          Array.from(styleSheet.cssRules).forEach(cssRule => valueCSS += `\n${cssRule.cssText}`);
        });

        return [
          window.document.styleSheets.length,
          Object.keys(style),
          style.amaui_style_sheet_manager.status === 'active',
          valueCSS,
          amauiStyle.css,
        ];
      }, { browsers });

      const values = [...valueBrowsers];

      assert(values[0]).eql([
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
        "\n.ab { background: orange; }\n.aa { -webkit-mask-image: linear-gradient(rgb(0, 0, 0), transparent); -webkit-mask-origin: inherit; -webkit-mask-position: 40% 74%; background: rgb(255, 170, 170); float: right; margin: 0px 41px 4px 40px; max-width: 100px; padding: 40px 41px 40px 40px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
        "\n\n.aa {\n-webkit-mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n-webkit-mask-origin: inherit;\n-webkit-mask-position: 40% 74%;\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n\n\n.ab {\nbackground: orange;\n}\n\n"
      ]);

      assert(values[1]).eql([
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
        "\n.ab { background: orange none repeat scroll 0% 0%; }\n.aa { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: right; margin: 0px 41px 4px 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 41px 40px 40px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
        "\n\n.aa {\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n\n\n.ab {\nbackground: orange;\n}\n\n"
      ]);

      assert(values[2]).eql([
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
        "\n.ab { background-color: orange; }\n.aa { background-color: rgb(255, 170, 170); float: right; margin: 0px 41px 4px 40px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 41px 40px 40px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }",
        "\n\n.aa {\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n\n\n.ab {\nbackground: orange;\n}\n\n"
      ]);
    });

  });

  group('node', () => {

    to('style', async () => {
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

      const style = AmauiStyle.style(a, { amaui_style: { value: amauiStyle } });

      // Add
      style.add();

      const value = [
        Object.keys(style),
        style.amaui_style_sheet_manager.status === 'inited',
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
        "\n\n.a-0 {\n-moz-transition: all .4s ease;\n-o-transition: all .4s ease;\n-webkit-mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n-webkit-mask-origin: inherit;\n-webkit-mask-position: 40% 74%;\n-webkit-transition: all .4s ease;\nbackground: #faa;\nfloat: right;\nmargin: 0 14px 4px 40px;\nmargin-right: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-right: 41px;\nposition: -webkit-sticky;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\n\n\n.a7-0 {\nbackground: orange;\n}\n\n"
      ]);
    });

  });

});
