/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers } from '../utils/js/test/utils';

import * as AmauiStyle from '../src';

group('@amaui/style/prefix', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => await closeBrowsers(browsers));

  group('amauiStyle', () => {

    to('add', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const amauiStyle = new window.AmauiStyle.AmauiStyle();

        amauiStyle.plugins.add = window.AmauiStyle.prefix;

        return amauiStyle.subscriptions.rule.prefix.length === 1;
      }, { browsers });

      const amauiStyle = new AmauiStyle.AmauiStyle();

      amauiStyle.plugins.add = AmauiStyle.prefix;

      const valueNode = amauiStyle.subscriptions.rule.prefix.length === 1;

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eq(true));
    });

    to('remove', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const amauiStyle = new window.AmauiStyle.AmauiStyle();

        amauiStyle.plugins.add = window.AmauiStyle.prefix;

        return (
          amauiStyle.subscriptions.rule.prefix.length === 1 &&
          (amauiStyle.plugins.remove = window.AmauiStyle.prefix) &&
          amauiStyle.subscriptions.rule.prefix.length === 0
        );
      }, { browsers });

      const amauiStyle = new AmauiStyle.AmauiStyle();

      amauiStyle.plugins.add = AmauiStyle.prefix;

      const valueNode = (
        amauiStyle.subscriptions.rule.prefix.length === 1 &&
        (amauiStyle.plugins.remove = AmauiStyle.prefix) &&
        (amauiStyle.subscriptions.rule.prefix.length as number) === 0
      );

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eq(true));
    });

  });

  group('methods', () => {

    group('method', () => {

      to('response', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          return window.AmauiStyle.prefix(undefined).methods.method({ value: 'inherit', property: 'mask-image' });
        }, { browsers });

        const values = [...valueBrowsers];

        // Chrome with mask
        assert(values[0]).eql({
          value: [
            {
              property: '-webkit-mask-image',
              value: 'inherit'
            }
          ],
          arguments: {
            value: {
              value: 'inherit',
              property: 'mask-image'
            }
          }
        });
      });

      group('value', () => {

        to('value', async () => {
          const valueBrowsers = await evaluate((window: any) => {
            return window.AmauiStyle.prefix(undefined).methods.method({ value: 'image-set(url(a.jpg) 1x)', property: 'background-image' });
          }, { browsers });

          const values = [...valueBrowsers];

          // Chrome with background-image image-set method
          assert(values[0].value[0]).eql({
            property: 'background-image',
            value: '-webkit-image-set(url(a.jpg) 1x)'
          });
        });

        to('property', async () => {
          const valueBrowsers = await evaluate((window: any) => {
            return window.AmauiStyle.prefix(undefined).methods.method({ value: 'inherit', property: 'mask-image' });
          }, { browsers });

          const values = [...valueBrowsers];

          // Chrome with mask
          assert(values[0].value[0]).eql({
            property: '-webkit-mask-image',
            value: 'inherit'
          });
        });

      });

    });

  });

  group('options', () => {

    group('ssr', () => {

      to('all', async () => {
        const valueNode = [
          AmauiStyle.prefix(undefined, { ssr: { all: true } }).methods.method({ value: 'inherit', property: 'mask-image' }).value,
          AmauiStyle.prefix(undefined, { ssr: { all: true } }).methods.method({ value: 'image-set(url(a.jpg) 1x)', property: 'background-image' }).value,
        ];

        const values = [...valueNode];

        assert(values).eql([
          [
            { property: '-webkit-mask-image', value: 'inherit' }
          ],
          [
            { property: 'background-image', value: '-webkit-image-set(url(a.jpg) 1x)' },
            { property: 'background-image', value: '-o-image-set(url(a.jpg) 1x)' },
            { property: 'background-image', value: '-ms-image-set(url(a.jpg) 1x)' },
            { property: 'background-image', value: '-moz-image-set(url(a.jpg) 1x)' }
          ]
        ]);
      });

    });

  });

});
