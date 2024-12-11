/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate } from '../utils/js/test/utils';

import * as OnesyStyle from '../src';

group('@onesy/style/prefix', () => {

  group('onesyStyle', () => {

    to('add', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const onesyStyle = new window.OnesyStyle.OnesyStyle();

        onesyStyle.plugins.add = window.OnesyStyle.prefix;

        return onesyStyle.subscriptions.rule.prefix.length === 1;
      });

      const onesyStyle = new OnesyStyle.OnesyStyle();

      onesyStyle.plugins.add = OnesyStyle.prefix;

      const valueNode = onesyStyle.subscriptions.rule.prefix.length === 1;

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eq(true));
    });

    to('remove', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const onesyStyle = new window.OnesyStyle.OnesyStyle();

        onesyStyle.plugins.add = window.OnesyStyle.prefix;

        return (
          onesyStyle.subscriptions.rule.prefix.length === 1 &&
          (onesyStyle.plugins.remove = window.OnesyStyle.prefix) &&
          onesyStyle.subscriptions.rule.prefix.length === 0
        );
      });

      const onesyStyle = new OnesyStyle.OnesyStyle();

      onesyStyle.plugins.add = OnesyStyle.prefix;

      const valueNode = (
        onesyStyle.subscriptions.rule.prefix.length === 1 &&
        (onesyStyle.plugins.remove = OnesyStyle.prefix) &&
        (onesyStyle.subscriptions.rule.prefix.length as number) === 0
      );

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eq(true));
    });

  });

  group('methods', () => {

    group('method', () => {

      to('response', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          return window.OnesyStyle.prefix(undefined).methods.method({ value: 'inherit', property: 'mask-image' });
        });

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
            return window.OnesyStyle.prefix(undefined).methods.method({ value: 'image-set(url(a.jpg) 1x)', property: 'background-image' });
          });

          const values = [...valueBrowsers];

          // Chrome with background-image image-set method
          assert(values[0].value[0]).eql({
            property: 'background-image',
            value: '-webkit-image-set(url(a.jpg) 1x)'
          });
        });

        to('property', async () => {
          const valueBrowsers = await evaluate((window: any) => {
            return window.OnesyStyle.prefix(undefined).methods.method({ value: 'inherit', property: 'mask-image' });
          });

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
          OnesyStyle.prefix(undefined, { ssr: { all: true } }).methods.method({ value: 'inherit', property: 'mask-image' }).value,
          OnesyStyle.prefix(undefined, { ssr: { all: true } }).methods.method({ value: 'image-set(url(a.jpg) 1x)', property: 'background-image' }).value,
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
