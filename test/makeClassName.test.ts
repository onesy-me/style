/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate } from '../utils/js/test/utils';

import * as AmauiStyle from '../src';

group('@amaui/style/makeClassName', () => {

  group('amauiStyle', () => {

    to('add', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const amauiStyle = new window.AmauiStyle.AmauiStyle();

        amauiStyle.plugins.add = window.AmauiStyle.makeClassName;

        return amauiStyle.subscriptions.className.name.length === 1;
      });

      const amauiStyle = new AmauiStyle.AmauiStyle();

      amauiStyle.plugins.add = AmauiStyle.makeClassName;

      const valueNode = amauiStyle.subscriptions.className.name.length === 1;

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eq(true));
    });

    to('remove', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const amauiStyle = new window.AmauiStyle.AmauiStyle();

        amauiStyle.plugins.add = window.AmauiStyle.makeClassName;

        return (
          amauiStyle.subscriptions.className.name.length === 1 &&
          (amauiStyle.plugins.remove = window.AmauiStyle.makeClassName) &&
          amauiStyle.subscriptions.className.name.length === 0
        );
      });

      const amauiStyle = new AmauiStyle.AmauiStyle();

      amauiStyle.plugins.add = AmauiStyle.makeClassName;

      const valueNode = (
        amauiStyle.subscriptions.className.name.length === 1 &&
        (amauiStyle.plugins.remove = AmauiStyle.makeClassName) &&
        (amauiStyle.subscriptions.className.name.length as number) === 0
      );

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eq(true));
    });

  });

  group('methods', () => {

    group('method', () => {

      to('response', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          return window.AmauiStyle.makeClassName(undefined, { production: true }).methods.method({ property: 'width', value: '14px' });
        });

        const valueNode = AmauiStyle.makeClassName(undefined, { production: true }).methods.method({ property: 'width', value: '14px' });

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql({
          value: 'aa',
          arguments: {
            value: {
              property: 'width',
              value: '14px'
            }
          }
        }));
      });

      to('value', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const method = window.AmauiStyle.makeClassName(undefined, { production: true }).methods.method;

          return method({ property: 'width', value: '14px' }).value;
        });

        const method = AmauiStyle.makeClassName(undefined, { production: true }).methods.method;

        const valueNode = method({ property: 'width', value: '14px' }).value;

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eq('aa'));
      });

    });

  });

  group('options', () => {

    group('production', () => {

      to('development', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const method = window.AmauiStyle.makeClassName(undefined, { production: false }).methods.method;

          return [
            method({ property: 'width', value: '14px' }).value,
            method({ property: 'width', value: '14px' }).value,
            method({ property: 'width', value: '114px' }).value
          ];
        });

        const method = AmauiStyle.makeClassName(undefined, { production: false }).methods.method;

        const valueNode = [
          method({ property: 'width', value: '14px' }).value,
          method({ property: 'width', value: '14px' }).value,
          method({ property: 'width', value: '114px' }).value
        ];

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          'width-0',
          'width-1',
          'width-2'
        ]));
      });

      to('prodution', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const method = window.AmauiStyle.makeClassName(undefined, { production: true }).methods.method;

          return [
            method({ property: 'width', value: '14px' }).value,
            method({ property: 'width', value: '14px' }).value,
            method({ property: 'width', value: '114px' }).value
          ];
        });

        const method = AmauiStyle.makeClassName(undefined, { production: true }).methods.method;

        const valueNode = [
          method({ property: 'width', value: '14px' }).value,
          method({ property: 'width', value: '14px' }).value,
          method({ property: 'width', value: '114px' }).value
        ];

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          'aa',
          'ab',
          'ac'
        ]));
      });

    });

    group('dom', () => {

      to('unique', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const methodDev = window.AmauiStyle.makeClassName(undefined, { production: false, dom: { unique: true } }).methods.method;
          const methodProd = window.AmauiStyle.makeClassName(undefined, { production: true, dom: { unique: true } }).methods.method;

          window.document.body.className = 'ab';
          window.document.head.className = 'width-0';

          const response = [
            methodProd({ property: 'width', value: '14px' }).value,
            methodDev({ property: 'width', value: '14px' }).value,
            methodProd({ property: 'width', value: '114px' }).value
          ];

          window.document.body.className = '';
          window.document.head.className = '';

          return response;
        });

        const values = [...valueBrowsers];

        values.forEach(value => assert(value).eql([
          'aa',
          'width-2',
          'ac'
        ]));
      });

    });

  });

});
