/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate } from '../utils/js/test/utils';

import * as OnesyStyle from '../src';

group('@onesy/style/sort', () => {

  group('onesyStyle', () => {

    to('add', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const onesyStyle = new window.OnesyStyle.OnesyStyle();

        onesyStyle.plugins.add = window.OnesyStyle.sort;

        return onesyStyle.subscriptions.rules.sort.length === 1;
      });

      const onesyStyle = new OnesyStyle.OnesyStyle();

      onesyStyle.plugins.add = OnesyStyle.sort;

      const valueNode = onesyStyle.subscriptions.rules.sort.length === 1;

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eq(true));
    });

    to('remove', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const onesyStyle = new window.OnesyStyle.OnesyStyle();

        onesyStyle.plugins.add = window.OnesyStyle.sort;

        return (
          onesyStyle.subscriptions.rules.sort.length === 1 &&
          (onesyStyle.plugins.remove = window.OnesyStyle.sort) &&
          onesyStyle.subscriptions.rules.sort.length === 0
        );
      });

      const onesyStyle = new OnesyStyle.OnesyStyle();

      onesyStyle.plugins.add = OnesyStyle.sort;

      const valueNode = (
        onesyStyle.subscriptions.rules.sort.length === 1 &&
        (onesyStyle.plugins.remove = OnesyStyle.sort) &&
        (onesyStyle.subscriptions.rules.sort.length as number) === 0
      );

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eq(true));
    });

  });

  group('methods', () => {

    group('method', () => {

      to('response', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          return window.OnesyStyle.sort(undefined).methods.method([
            { value: 14, property: 'padding-left' },
            { value: 14, property: 'padding' },
            { value: 14, property: 'padding-right' },
          ]);
        });

        const valueNode = OnesyStyle.sort(undefined).methods.method([
          { value: 14, property: 'padding-left' },
          { value: 14, property: 'padding' },
          { value: 14, property: 'padding-right' },
        ]);

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => {
          assert(value).all.prop([
            'value',
            'value.0.value',
            'value.0.property',
            'arguments.values'
          ] as any);
        });
      });

      to('value', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          return window.OnesyStyle.sort(undefined).methods.method([
            { value: 14, property: 'padding-left' },
            { value: 14, property: 'padding' },
            { value: 14, property: 'padding-right' },
          ]).value.map(item => item.property);
        });

        const valueNode = OnesyStyle.sort(undefined).methods.method([
          { value: 14, property: 'padding-left' },
          { value: 14, property: 'padding' },
          { value: 14, property: 'padding-right' },
        ]).value.map(item => item.property);

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          'padding',
          'padding-left',
          'padding-right'
        ]));
      });

    });

  });

  group('options', () => {

    group('priority', () => {

      to('original', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          return window.OnesyStyle.sort(undefined, { priority: 'original' }).methods.method([
            { value: 14, property: 'padding-left' },
            { value: 14, property: 'padding' },
            { value: 14, property: 'padding-right' },
          ]).value.map(item => item.property);
        });

        const valueNode = OnesyStyle.sort(undefined, { priority: 'original' }).methods.method([
          { value: 14, property: 'padding-left' },
          { value: 14, property: 'padding' },
          { value: 14, property: 'padding-right' },
        ]).value.map(item => item.property);

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          'padding-left',
          'padding',
          'padding-right'
        ]));
      });

      to('individual', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          return window.OnesyStyle.sort(undefined, { priority: 'individual' }).methods.method([
            { value: 14, property: 'padding-left' },
            { value: 14, property: 'padding' },
            { value: 14, property: 'padding-right' },
          ]).value.map(item => item.property);
        });

        const valueNode = OnesyStyle.sort(undefined, { priority: 'individual' }).methods.method([
          { value: 14, property: 'padding-left' },
          { value: 14, property: 'padding' },
          { value: 14, property: 'padding-right' },
        ]).value.map(item => item.property);

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          'padding',
          'padding-left',
          'padding-right'
        ]));
      });

      to('shorthand', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          return window.OnesyStyle.sort(undefined, { priority: 'shorthand' }).methods.method([
            { value: 14, property: 'padding-left' },
            { value: 14, property: 'padding' },
            { value: 14, property: 'padding-right' },
          ]).value.map(item => item.property);
        });

        const valueNode = OnesyStyle.sort(undefined, { priority: 'shorthand' }).methods.method([
          { value: 14, property: 'padding-left' },
          { value: 14, property: 'padding' },
          { value: 14, property: 'padding-right' },
        ]).value.map(item => item.property);

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          'padding-right',
          'padding-left',
          'padding'
        ]));
      });

    });

  });

});
