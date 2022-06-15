/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers } from '../utils/js/test/utils';

import * as AmauiStyle from '../src';

group('@amaui/style/rtl', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => await closeBrowsers(browsers));

  group('amauiStyle', () => {

    to('add', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const amauiStyle = new window.AmauiStyle.AmauiStyle();

        amauiStyle.plugins.add = window.AmauiStyle.rtl;

        return amauiStyle.subscriptions.rule.rtl.length === 1;
      }, { browsers });

      const amauiStyle = new AmauiStyle.AmauiStyle();

      amauiStyle.plugins.add = AmauiStyle.rtl;

      const valueNode = amauiStyle.subscriptions.rule.rtl.length === 1;

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eq(true));
    });

    to('remove', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const amauiStyle = new window.AmauiStyle.AmauiStyle();

        amauiStyle.plugins.add = window.AmauiStyle.rtl;

        return (
          amauiStyle.subscriptions.rule.rtl.length === 1 &&
          (amauiStyle.plugins.remove = window.AmauiStyle.rtl) &&
          amauiStyle.subscriptions.rule.rtl.length === 0
        );
      }, { browsers });

      const amauiStyle = new AmauiStyle.AmauiStyle();

      amauiStyle.plugins.add = AmauiStyle.rtl;

      const valueNode = (
        amauiStyle.subscriptions.rule.rtl.length === 1 &&
        (amauiStyle.plugins.remove = AmauiStyle.rtl) &&
        (amauiStyle.subscriptions.rule.rtl.length as number) === 0
      );

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eq(true));
    });

  });

  group('methods', () => {

    group('method', () => {

      to('response', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          return window.AmauiStyle.rtl(undefined).methods.method({ value: '14', property: 'padding-left' });
        }, { browsers });

        const valueNode = AmauiStyle.rtl(undefined).methods.method({ value: '14', property: 'padding-left' });

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

          return values_.map(item => window.AmauiStyle.rtl(undefined).methods.method(item).value);
        }, { browsers });

        const values_ = [
          { value: '14', property: 'padding' },
          { value: '14', property: 'padding-left' },
          { value: '14', property: 'padding-right' },
          { value: 'left', property: 'float' },
          { value: 'right', property: 'float' },
        ];

        const valueNode = values_.map(item => AmauiStyle.rtl(undefined).methods.method(item).value);

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
