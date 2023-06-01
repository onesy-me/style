/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate } from '../utils/js/test/utils';

import * as AmauiStyle from '../src';

const unitsDefault = {
  'animation': 's',
  'animation-delay': 's',
  'animation-duration': 's',
  'ascent-override': '%',

  'background': '%',
  'background-position': '%',
  'background-size': '%',
  'background-position-x': '%',
  'background-position-y': '%',
  'border': 'px',
  'border-top': 'px',
  'border-right': 'px',
  'border-bottom': 'px',
  'border-left': 'px',
  'border-radius': 'px',
  'border-top-left-radius': 'px',
  'border-top-right-radius': 'px',
  'border-bottom-left-radius': 'px',
  'border-bottom-right-radius': 'px',
  'border-width': 'px',
  'border-top-width': 'px',
  'border-right-width': 'px',
  'border-bottom-width': 'px',
  'border-left-width': 'px',
  'border-image': '%',
  'border-image-outset': 'px',
  'border-image-slice': '%',
  'border-image-width': 'px',
  'border-spacing': 'px',
  'block-size': 'px',
  'border-block': 'px',
  'border-block-end': 'px',
  'border-block-end-width': 'px',
  'border-block-start': 'px',
  'border-block-start-width': 'px',
  'border-block-width': 'px',
  'border-end-end-radius': 'px',
  'border-end-start-radius': 'px',
  'border-inline': 'px',
  'border-inline-end': 'px',
  'border-inline-end-width': 'px',
  'border-inline-start': 'px',
  'border-inline-start-width': 'px',
  'border-inline-width': 'px',
  'border-style': 'px',
  'border-start-end-radius': 'px',
  'border-start-start-radius': 'px',
  'box-shadow': 'px',
  'bottom': '%',

  'columns': 'px',
  'column-width': 'px',
  'column-gap': 'px',
  'column-rule': 'px',
  'column-rule-width': 'px',
  'contain-intrinsic-block-size': 'px',
  'contain-intrinsic-height': 'px',
  'contain-intrinsic-inline-size': 'px',
  'contain-intrinsic-size': 'px',
  'contain-intrinsic-width': 'px',
  'cx': '%',
  'cy': '%',

  'descent-override': '%',

  'flex': '%',
  'flex-basis': '%',
  'font': 'px',
  'font-size': 'px',
  'font-synthesis': 'px',
  'font-synthesis-weight': 'px',

  'gap': 'px',
  'grid': 'px',
  'grid-auto-columns': 'px',
  'grid-auto-rows': 'px',
  'grid-column-gap': 'px',
  'grid-gap': 'px',
  'grid-row-gap': 'px',
  'grid-template': 'px',
  'grid-template-rows': 'px',
  'grid-template-columns': 'px',

  'height': 'px',

  'inline-size': 'px',
  'inset': 'px',
  'inset-block': 'px',
  'inset-block-end': 'px',
  'inset-block-start': 'px',
  'inset-inline': 'px',
  'inset-inline-end': 'px',
  'inset-inline-start': 'px',

  'left': '%',
  'letter-spacing': 'px',
  'line-gap-override': '%',

  'margin': 'px',
  'margin-top': 'px',
  'margin-right': 'px',
  'margin-bottom': 'px',
  'margin-left': 'px',
  'margin-block': 'px',
  'margin-block-end': 'px',
  'margin-block-start': 'px',
  'margin-inline': 'px',
  'margin-inline-end': 'px',
  'margin-inline-start': 'px',
  'mask': 'px',
  'mask-position': '%',
  'mask-size': '%',
  'max-block-size': 'px',
  'max-inline-size': 'px',
  'min-block-size': 'px',
  'min-inline-size': 'px',
  'max-height': 'px',
  'max-width': 'px',
  'min-height': 'px',
  'min-width': 'px',

  'object-position': '%',
  'outline': 'px',
  'outline-offset': 'px',
  'outline-width': 'px',
  'offset': 'px',
  'offset-anchor': '%',
  'offset-distance': '%',
  'offset-position': '%',
  'offset-rotate': 'deg',

  'padding': 'px',
  'padding-top': 'px',
  'padding-right': 'px',
  'padding-bottom': 'px',
  'padding-left': 'px',
  'padding-block': 'px',
  'padding-block-end': 'px',
  'padding-block-start': 'px',
  'padding-inline': 'px',
  'padding-inline-end': 'px',
  'padding-inline-start': 'px',
  'perspective': 'px',

  'right': '%',
  'row-gap': 'px',

  'scroll-margin': 'px',
  'scroll-margin-block': 'px',
  'scroll-margin-block-end': 'px',
  'scroll-margin-block-start': 'px',
  'scroll-margin-bottom': 'px',
  'scroll-margin-inline': 'px',
  'scroll-margin-inline-end': 'px',
  'scroll-margin-inline-start': 'px',
  'scroll-margin-left': 'px',
  'scroll-margin-right': 'px',
  'scroll-margin-top': 'px',
  'scroll-padding': 'px',
  'scroll-padding-block': 'px',
  'scroll-padding-block-end': 'px',
  'scroll-padding-block-start': 'px',
  'scroll-padding-bottom': 'px',
  'scroll-padding-inline': 'px',
  'scroll-padding-inline-end': 'px',
  'scroll-padding-inline-start': 'px',
  'scroll-padding-left': 'px',
  'scroll-padding-right': 'px',
  'scroll-padding-top': 'px',
  'shape-margin': 'px',
  'size': 'in',
  'size-adjust': '%',

  'text-decoration': 'px',
  'text-decoration-thickness': 'px',
  'text-indent': 'px',
  'text-size-adjust': '%',
  'text-shadow': 'px',
  'text-underline-offset': 'px',
  'top': '%',
  'transform-origin': '%',
  'transition': 's',
  'transition-delay': 's',
  'transition-duration': 's',

  'width': 'px',
  'word-spacing': 'px',

  'zoom': '%',
};

group('@amaui/style/unit', () => {

  group('amauiStyle', () => {

    to('add', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const amauiStyle = new window.AmauiStyle.AmauiStyle();

        amauiStyle.plugins.add = window.AmauiStyle.unit;

        return amauiStyle.subscriptions.rule.unit.length === 1;
      });

      const amauiStyle = new AmauiStyle.AmauiStyle();

      amauiStyle.plugins.add = AmauiStyle.unit;

      const valueNode = amauiStyle.subscriptions.rule.unit.length === 1;

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eq(true));
    });

    to('remove', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const amauiStyle = new window.AmauiStyle.AmauiStyle();

        amauiStyle.plugins.add = window.AmauiStyle.unit;

        return (
          amauiStyle.subscriptions.rule.unit.length === 1 &&
          (amauiStyle.plugins.remove = window.AmauiStyle.unit) &&
          amauiStyle.subscriptions.rule.unit.length === 0
        );
      });

      const amauiStyle = new AmauiStyle.AmauiStyle();

      amauiStyle.plugins.add = AmauiStyle.unit;

      const valueNode = (
        amauiStyle.subscriptions.rule.unit.length === 1 &&
        (amauiStyle.plugins.remove = AmauiStyle.unit) &&
        (amauiStyle.subscriptions.rule.unit.length as number) === 0
      );

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eq(true));
    });

  });

  group('methods', () => {

    group('method', () => {

      to('response', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          return window.AmauiStyle.unit(undefined).methods.method({ property: 'width', value: 140 });
        });

        const valueNode = AmauiStyle.unit(undefined).methods.method({ property: 'width', value: 140 });

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql({
          value: { value: '140px', unit: 'px' },
          arguments: {
            value: {
              property: 'width',
              value: 140
            }
          }
        }));
      });

      to('value', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const method = window.AmauiStyle.unit(undefined).methods.method;

          const unitsDefault = {
            'animation': 's',
            'animation-delay': 's',
            'animation-duration': 's',
            'ascent-override': '%',

            'background': '%',
            'background-position': '%',
            'background-size': '%',
            'background-position-x': '%',
            'background-position-y': '%',
            'border': 'px',
            'border-top': 'px',
            'border-right': 'px',
            'border-bottom': 'px',
            'border-left': 'px',
            'border-radius': 'px',
            'border-top-left-radius': 'px',
            'border-top-right-radius': 'px',
            'border-bottom-left-radius': 'px',
            'border-bottom-right-radius': 'px',
            'border-width': 'px',
            'border-top-width': 'px',
            'border-right-width': 'px',
            'border-bottom-width': 'px',
            'border-left-width': 'px',
            'border-image': '%',
            'border-image-outset': 'px',
            'border-image-slice': '%',
            'border-image-width': 'px',
            'border-spacing': 'px',
            'block-size': 'px',
            'border-block': 'px',
            'border-block-end': 'px',
            'border-block-end-width': 'px',
            'border-block-start': 'px',
            'border-block-start-width': 'px',
            'border-block-width': 'px',
            'border-end-end-radius': 'px',
            'border-end-start-radius': 'px',
            'border-inline': 'px',
            'border-inline-end': 'px',
            'border-inline-end-width': 'px',
            'border-inline-start': 'px',
            'border-inline-start-width': 'px',
            'border-inline-width': 'px',
            'border-style': 'px',
            'border-start-end-radius': 'px',
            'border-start-start-radius': 'px',
            'box-shadow': 'px',
            'bottom': '%',

            'columns': 'px',
            'column-width': 'px',
            'column-gap': 'px',
            'column-rule': 'px',
            'column-rule-width': 'px',
            'contain-intrinsic-block-size': 'px',
            'contain-intrinsic-height': 'px',
            'contain-intrinsic-inline-size': 'px',
            'contain-intrinsic-size': 'px',
            'contain-intrinsic-width': 'px',
            'cx': '%',
            'cy': '%',

            'descent-override': '%',

            'flex': '%',
            'flex-basis': '%',
            'font': 'px',
            'font-size': 'px',
            'font-synthesis': 'px',
            'font-synthesis-weight': 'px',

            'gap': 'px',
            'grid': 'px',
            'grid-auto-columns': 'px',
            'grid-auto-rows': 'px',
            'grid-column-gap': 'px',
            'grid-gap': 'px',
            'grid-row-gap': 'px',
            'grid-template': 'px',
            'grid-template-rows': 'px',
            'grid-template-columns': 'px',

            'height': 'px',

            'inline-size': 'px',
            'inset': 'px',
            'inset-block': 'px',
            'inset-block-end': 'px',
            'inset-block-start': 'px',
            'inset-inline': 'px',
            'inset-inline-end': 'px',
            'inset-inline-start': 'px',

            'left': '%',
            'letter-spacing': 'px',
            'line-gap-override': '%',

            'margin': 'px',
            'margin-top': 'px',
            'margin-right': 'px',
            'margin-bottom': 'px',
            'margin-left': 'px',
            'margin-block': 'px',
            'margin-block-end': 'px',
            'margin-block-start': 'px',
            'margin-inline': 'px',
            'margin-inline-end': 'px',
            'margin-inline-start': 'px',
            'mask': 'px',
            'mask-position': '%',
            'mask-size': '%',
            'max-block-size': 'px',
            'max-inline-size': 'px',
            'min-block-size': 'px',
            'min-inline-size': 'px',
            'max-height': 'px',
            'max-width': 'px',
            'min-height': 'px',
            'min-width': 'px',

            'object-position': '%',
            'outline': 'px',
            'outline-offset': 'px',
            'outline-width': 'px',
            'offset': 'px',
            'offset-anchor': '%',
            'offset-distance': '%',
            'offset-position': '%',
            'offset-rotate': 'deg',

            'padding': 'px',
            'padding-top': 'px',
            'padding-right': 'px',
            'padding-bottom': 'px',
            'padding-left': 'px',
            'padding-block': 'px',
            'padding-block-end': 'px',
            'padding-block-start': 'px',
            'padding-inline': 'px',
            'padding-inline-end': 'px',
            'padding-inline-start': 'px',
            'perspective': 'px',

            'right': '%',
            'row-gap': 'px',

            'scroll-margin': 'px',
            'scroll-margin-block': 'px',
            'scroll-margin-block-end': 'px',
            'scroll-margin-block-start': 'px',
            'scroll-margin-bottom': 'px',
            'scroll-margin-inline': 'px',
            'scroll-margin-inline-end': 'px',
            'scroll-margin-inline-start': 'px',
            'scroll-margin-left': 'px',
            'scroll-margin-right': 'px',
            'scroll-margin-top': 'px',
            'scroll-padding': 'px',
            'scroll-padding-block': 'px',
            'scroll-padding-block-end': 'px',
            'scroll-padding-block-start': 'px',
            'scroll-padding-bottom': 'px',
            'scroll-padding-inline': 'px',
            'scroll-padding-inline-end': 'px',
            'scroll-padding-inline-start': 'px',
            'scroll-padding-left': 'px',
            'scroll-padding-right': 'px',
            'scroll-padding-top': 'px',
            'shape-margin': 'px',
            'size': 'in',
            'size-adjust': '%',

            'text-decoration': 'px',
            'text-decoration-thickness': 'px',
            'text-indent': 'px',
            'text-size-adjust': '%',
            'text-shadow': 'px',
            'text-underline-offset': 'px',
            'top': '%',
            'transform-origin': '%',
            'transition': 's',
            'transition-delay': 's',
            'transition-duration': 's',

            'width': 'px',
            'word-spacing': 'px',

            'zoom': '%'
          };

          return Object.keys(unitsDefault).map(item => method({ property: item, value: 140 }).value.unit === unitsDefault[item]);
        });

        const method = AmauiStyle.unit(undefined).methods.method;

        const valueNode = Object.keys(unitsDefault).map(item => method({ property: item, value: 140 }).value.unit === unitsDefault[item]);

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql(new Array(174).fill(true)));
      });

    });

  });

  group('options', () => {

    to('units', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const method = window.AmauiStyle.unit(undefined, {
          units: {
            width: value => ({ value: `${value / 2}px`, unit: `px` })
          }
        }).methods.method;

        return [
          method({ property: 'width', value: 141 }).value.value
        ];
      });

      const method = AmauiStyle.unit(undefined, {
        units: {
          width: value => ({ value: `${value / 2}px`, unit: `px` })
        }
      }).methods.method;

      const valueNode = [
        method({ property: 'width', value: 141 }).value.value
      ];

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        '70.5px'
      ]));
    });

  });

});
