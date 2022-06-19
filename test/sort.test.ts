/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate } from '../utils/js/test/utils';

import * as AmauiStyle from '../src';

group('@amaui/style/sort', () => {

  group('amauiStyle', () => {

    to('add', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const amauiStyle = new window.AmauiStyle.AmauiStyle();

        amauiStyle.plugins.add = window.AmauiStyle.sort;

        return amauiStyle.subscriptions.rules.sort.length === 1;
      });

      const amauiStyle = new AmauiStyle.AmauiStyle();

      amauiStyle.plugins.add = AmauiStyle.sort;

      const valueNode = amauiStyle.subscriptions.rules.sort.length === 1;

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eq(true));
    });

    to('remove', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const amauiStyle = new window.AmauiStyle.AmauiStyle();

        amauiStyle.plugins.add = window.AmauiStyle.sort;

        return (
          amauiStyle.subscriptions.rules.sort.length === 1 &&
          (amauiStyle.plugins.remove = window.AmauiStyle.sort) &&
          amauiStyle.subscriptions.rules.sort.length === 0
        );
      });

      const amauiStyle = new AmauiStyle.AmauiStyle();

      amauiStyle.plugins.add = AmauiStyle.sort;

      const valueNode = (
        amauiStyle.subscriptions.rules.sort.length === 1 &&
        (amauiStyle.plugins.remove = AmauiStyle.sort) &&
        (amauiStyle.subscriptions.rules.sort.length as number) === 0
      );

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eq(true));
    });

  });

  group('methods', () => {

    group('method', () => {

      to('response', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          return window.AmauiStyle.sort(undefined).methods.method([
            { value: 14, property: 'padding-left' },
            { value: 14, property: 'padding' },
            { value: 14, property: 'padding-right' },
          ]);
        });

        const valueNode = AmauiStyle.sort(undefined).methods.method([
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
          return window.AmauiStyle.sort(undefined).methods.method([
            { value: 14, property: 'padding-left' },
            { value: 14, property: 'padding' },
            { value: 14, property: 'padding-right' },
          ]).value.map(item => item.property);
        });

        const valueNode = AmauiStyle.sort(undefined).methods.method([
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
          return window.AmauiStyle.sort(undefined, { priority: 'original' }).methods.method([
            { value: 14, property: 'padding-left' },
            { value: 14, property: 'padding' },
            { value: 14, property: 'padding-right' },
          ]).value.map(item => item.property);
        });

        const valueNode = AmauiStyle.sort(undefined, { priority: 'original' }).methods.method([
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
          return window.AmauiStyle.sort(undefined, { priority: 'individual' }).methods.method([
            { value: 14, property: 'padding-left' },
            { value: 14, property: 'padding' },
            { value: 14, property: 'padding-right' },
          ]).value.map(item => item.property);
        });

        const valueNode = AmauiStyle.sort(undefined, { priority: 'individual' }).methods.method([
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
          return window.AmauiStyle.sort(undefined, { priority: 'shorthand' }).methods.method([
            { value: 14, property: 'padding-left' },
            { value: 14, property: 'padding' },
            { value: 14, property: 'padding-right' },
          ]).value.map(item => item.property);
        });

        const valueNode = AmauiStyle.sort(undefined, { priority: 'shorthand' }).methods.method([
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
