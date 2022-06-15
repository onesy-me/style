/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers } from '../utils/js/test/utils';

import * as AmauiStyle from '../src';

group('@amaui/style/classNames', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => await closeBrowsers(browsers));

  to('classNames', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      return window.AmauiStyle.classNames(['a', { a1: true, a2: { a4: true, a3: false } }, true && 'a5', false && 'a6', 'a7']);
    }, { browsers });

    const valueNode = AmauiStyle.classNames(['a', { a1: true, a2: { a4: true, a3: false } }, true && 'a5', false && 'a6', 'a7']);

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eq('a a1 a4 a5 a7'));
  });

  to('prefix', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      return window.AmauiStyle.classNames(['a', { a1: true, a2: { a4: true, a3: false } }, true && 'a5', false && 'a6', 'a7'], '.');
    }, { browsers });

    const valueNode = AmauiStyle.classNames(['a', { a1: true, a2: { a4: true, a3: false } }, true && 'a5', false && 'a6', 'a7'], '.');

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eq('.a .a1 .a4 .a5 .a7'));
  });

  to('array', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      return window.AmauiStyle.classNames(['a', { a1: true, a2: { a4: true, a3: false } }, true && 'a5', false && 'a6', 'a7'], '', true);
    }, { browsers });

    const valueNode = AmauiStyle.classNames(['a', { a1: true, a2: { a4: true, a3: false } }, true && 'a5', false && 'a6', 'a7'], '', true);

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql(['a', 'a1', 'a4', 'a5', 'a7']));
  });

});
