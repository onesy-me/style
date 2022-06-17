/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers } from '../utils/js/test/utils';

import * as AmauiStyle from '../src';

group('@amaui/style/inline', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => await closeBrowsers(browsers));

  group('browser', () => {

    to('inline', async () => {
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

        const a: any = {
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

          // Function
          backgroundColor: props => props.a === 1 ? 'yellow' : 'orange',
        };

        const inline = window.AmauiStyle.inline(a, { amaui_style: { value: amauiStyle } });

        return inline;
      }, { browsers });

      const values = [...valueBrowsers];

      assert(values).eql([
        "background: #faa; float: left; margin: 0 14px 4px 40px; margin-left: 41px; mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px; padding-left: 41px; position: sticky; transition: all .4s ease; width: 100px;",
        "background: #faa; float: left; margin: 0 14px 4px 40px; margin-left: 41px; mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px; padding-left: 41px; position: sticky; transition: all .4s ease; width: 100px;",
        "background: #faa; float: left; margin: 0 14px 4px 40px; margin-left: 41px; mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px; padding-left: 41px; position: sticky; transition: all .4s ease; width: 100px;"
      ]);
    });

  });

  group('node', () => {

    to('inline', async () => {
      const amauiStyle = new AmauiStyle.AmauiStyle();

      // Plugins
      amauiStyle.plugins.add = [
        AmauiStyle.unit,
        AmauiStyle.sort,
        AmauiStyle.prefix,
        AmauiStyle.makeClassName,
        AmauiStyle.rtl,
      ];

      const a: any = {
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

        // Function
        backgroundColor: props => props.a === 1 ? 'yellow' : 'orange',
      };

      const inline = AmauiStyle.inline(a, { amaui_style: { value: amauiStyle } });

      const value = inline;

      assert(value).eq('background: #faa; float: left; margin: 0 14px 4px 40px; margin-left: 41px; mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px; padding-left: 41px; position: sticky; transition: all .4s ease; width: 100px;');
    });

  });

});
