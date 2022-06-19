/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate } from '../utils/js/test/utils';

import * as AmauiStyle from '../src';

group('@amaui/style/inline', () => {

  to('inline', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.document.body.dir = 'rtl';

      const amauiStyle = new window.AmauiStyle.AmauiStyle(window.document.body, undefined, undefined, { rule: { prefix: true } });

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

      const inline = window.AmauiStyle.inline(a, { a: 1 }, { amaui_style: { value: amauiStyle } });

      return inline;
    });

    const values = [...valueBrowsers];

    assert(values).eql([
      "-webkit-mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent); -webkit-mask-origin: inherit; -webkit-mask-position: 40% 74%;  background: #faa; background-color: yellow; float: right; margin: 0 14px 4px 40px; margin-right: 41px; mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px; padding-right: 41px; position: sticky; transition: all .4s ease; width: 100px;",
      "background: #faa; background-color: yellow; float: right; margin: 0 14px 4px 40px; margin-right: 41px; mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px; padding-right: 41px; position: sticky; transition: all .4s ease; width: 100px;",
      "background: #faa; background-color: yellow; float: right; margin: 0 14px 4px 40px; margin-right: 41px; mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px; padding-right: 41px; position: sticky; transition: all .4s ease; width: 100px;"
    ]);

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

    const inline = AmauiStyle.inline(a, { a: 1 }, { amaui_style: { value: amauiStyle } });

    const valueNode = inline;

    assert(valueNode).eq('background: #faa; background-color: yellow; float: left; margin: 0 14px 4px 40px; margin-left: 41px; mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px; padding-left: 41px; position: sticky; transition: all .4s ease; width: 100px;');
  });

  group('options', () => {

    group('response', () => {

      to('css', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          return window.AmauiStyle.inline({ color: 'yellow', backgroundColor: 'orange' }, {}, { response: 'css' });
        });

        const valueNode = AmauiStyle.inline({ color: 'yellow', backgroundColor: 'orange' }, {}, { response: 'css' });

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eq('color: yellow; background-color: orange;'));
      });

      to('json', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          return window.AmauiStyle.inline({ color: 'yellow', backgroundColor: 'orange' }, {}, { response: 'json' });
        });

        const valueNode = AmauiStyle.inline({ color: 'yellow', backgroundColor: 'orange' }, {}, { response: 'json' });

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql({ color: 'yellow', backgroundColor: 'orange' }));
      });

    });

    group('response_json_property_variant', () => {

      to('cammel', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          return window.AmauiStyle.inline({ color: 'yellow', backgroundColor: 'orange' }, {}, { response: 'json', response_json_property_variant: 'cammel' });
        });

        const valueNode = AmauiStyle.inline({ color: 'yellow', backgroundColor: 'orange' }, {}, { response: 'json', response_json_property_variant: 'cammel' });

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql({ color: 'yellow', backgroundColor: 'orange' }));
      });

      to('kebab', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          return window.AmauiStyle.inline({ color: 'yellow', backgroundColor: 'orange' }, {}, { response: 'json', response_json_property_variant: 'kebab' });
        });

        const valueNode = AmauiStyle.inline({ color: 'yellow', backgroundColor: 'orange' }, {}, { response: 'json', response_json_property_variant: 'kebab' });

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql({ color: 'yellow', 'background-color': 'orange' }));
      });

    });

  });

});
