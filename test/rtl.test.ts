/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate } from '../utils/js/test/utils';

import * as OnesyStyle from '../src';

group('@onesy/style/rtl', () => {

  group('onesyStyle', () => {

    to('add', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const onesyStyle = new window.OnesyStyle.OnesyStyle();

        onesyStyle.plugins.add = window.OnesyStyle.rtl;

        return onesyStyle.subscriptions.rule.rtl.length === 1;
      });

      const onesyStyle = new OnesyStyle.OnesyStyle();

      onesyStyle.plugins.add = OnesyStyle.rtl;

      const valueNode = onesyStyle.subscriptions.rule.rtl.length === 1;

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eq(true));
    });

    to('remove', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const onesyStyle = new window.OnesyStyle.OnesyStyle();

        onesyStyle.plugins.add = window.OnesyStyle.rtl;

        return (
          onesyStyle.subscriptions.rule.rtl.length === 1 &&
          (onesyStyle.plugins.remove = window.OnesyStyle.rtl) &&
          onesyStyle.subscriptions.rule.rtl.length === 0
        );
      });

      const onesyStyle = new OnesyStyle.OnesyStyle();

      onesyStyle.plugins.add = OnesyStyle.rtl;

      const valueNode = (
        onesyStyle.subscriptions.rule.rtl.length === 1 &&
        (onesyStyle.plugins.remove = OnesyStyle.rtl) &&
        (onesyStyle.subscriptions.rule.rtl.length as number) === 0
      );

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eq(true));
    });

  });

  group('methods', () => {

    group('method', () => {

      to('response', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          return window.OnesyStyle.rtl(undefined).methods.method({ value: '14', property: 'padding-left' });
        });

        const valueNode = OnesyStyle.rtl(undefined).methods.method({ value: '14', property: 'padding-left' });

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql({
          'value': {
            'value': '14',
            'property': 'padding-right'
          },
          'arguments': {
            'value': {
              'value': '14',
              'property': 'padding-left'
            }
          }
        }));
      });

      to('value', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const values_ = [
            { value: '14', property: 'padding' },
            { value: '14', property: 'padding-left' },
            { value: '14', property: 'padding-right' },
            { value: 'left', property: 'float' },
            { value: 'right', property: 'float' },
          ];

          return values_.map(item => window.OnesyStyle.rtl(undefined).methods.method(item).value);
        });

        const values_ = [
          { value: '14', property: 'padding' },
          { value: '14', property: 'padding-left' },
          { value: '14', property: 'padding-right' },
          { value: 'left', property: 'float' },
          { value: 'right', property: 'float' },
        ];

        const valueNode = values_.map(item => OnesyStyle.rtl(undefined).methods.method(item).value);

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          { value: '14', property: 'padding' },
          { value: '14', property: 'padding-right' },
          { value: '14', property: 'padding-left' },
          { value: 'right', property: 'float' },
          { value: 'left', property: 'float' }
        ]));
      });

    });

  });

});
