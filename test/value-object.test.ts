/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate } from '../utils/js/test/utils';

import * as AmauiStyle from '../src';

group('@amaui/style/valueObject', () => {

  group('amauiStyle', () => {

    to('add', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const amauiStyle = new window.AmauiStyle.AmauiStyle();

        amauiStyle.plugins.add = window.AmauiStyle.valueObject;

        return amauiStyle.subscriptions.rule.value.length === 1;
      });

      const amauiStyle = new AmauiStyle.AmauiStyle();

      amauiStyle.plugins.add = AmauiStyle.valueObject;

      const valueNode = amauiStyle.subscriptions.rule.value.length === 1;

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eq(true));
    });

    to('remove', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const amauiStyle = new window.AmauiStyle.AmauiStyle();

        amauiStyle.plugins.add = window.AmauiStyle.valueObject;

        return (
          amauiStyle.subscriptions.rule.value.length === 1 &&
          (amauiStyle.plugins.remove = window.AmauiStyle.valueObject) &&
          amauiStyle.subscriptions.rule.value.length === 0
        );
      });

      const amauiStyle = new AmauiStyle.AmauiStyle();

      amauiStyle.plugins.add = AmauiStyle.valueObject;

      const valueNode = (
        amauiStyle.subscriptions.rule.value.length === 1 &&
        (amauiStyle.plugins.remove = AmauiStyle.valueObject) &&
        (amauiStyle.subscriptions.rule.value.length as number) === 0
      );

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eq(true));
    });

  });

  group('methods', () => {

    group('method', () => {

      to('response', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          return window.AmauiStyle.valueObject(undefined).methods.method({ property: 'animation', value: { name: 'a' } });
        });

        const valueNode = AmauiStyle.valueObject(undefined).methods.method({ property: 'animation', value: { name: 'a' } });

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql({
          arguments: {
            value: {
              property: 'animation',
              value: {
                name: 'a'
              }
            }
          },
          value: [
            'a'
          ]
        }));
      });

      to('value', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const method = window.AmauiStyle.valueObject(undefined).methods.method;

          const amauiStyle = new window.AmauiStyle.AmauiStyle();

          amauiStyle.plugins.add = window.AmauiStyle.unit;

          const methodWithStyle = window.AmauiStyle.valueObject(amauiStyle).methods.method;

          return [
            // Animation
            method({
              property: 'animation',
              value: {
                name: 'a',
                duration: '1.14s',
                easingFunction: 'ease-in',
                delay: '1.4s',
                iterationCount: 1,
                direction: 'alternate',
                fillMode: 'forwards',
                playState: 'paused',
              }
            }).value[0],
            method({
              property: 'animation',
              value: {
                name: 'a',
                duration: 1.14,
                'easing-function': 'ease-in',
                delay: 1.4,
                'iteration-count': 1,
                direction: 'alternate',
                'fill-mode': 'forwards',
                'play-state': 'paused',
              }
            }).value[0],
            methodWithStyle({
              property: 'animation',
              value: {
                name: 'a',
                duration: 1.14,
                'easing-function': 'ease-in',
                delay: 1.4,
                'iteration-count': 1,
                direction: 'alternate',
                'fill-mode': 'forwards',
                'play-state': 'paused',
              }
            }).value[0],
            method({
              property: 'animation',
              value: {
                name: 'a',
                duration: '1.14s',
                'easing-function': 'ease-in'
              }
            }).value[0],

            // Background
            method({
              property: 'background',
              value: {
                color: 'yellow',
                image: 'url(a.jpg)',
                repeat: 'repeat-y',
                position: 'center',
              },
            }).value[0],
            methodWithStyle({
              property: 'background',
              value: {
                color: 'yellow',
                image: 'url(a.jpg)',
                repeat: 'repeat-y',
                position: [40, 40],
              },
            }).value[0],
            method({
              property: 'background',
              value: {
                color: 'yellow',
              },
            }).value[0],

            // Border and column-rule
            method({
              property: 'border',
              value: {
                width: '4px',
                style: 'dashed',
                color: 'yellow'
              },
            }).value[0],
            method({
              property: 'border',
              value: {
                width: 4,
                style: 'dashed',
                color: 'yellow'
              },
            }).value[0],
            methodWithStyle({
              property: 'border',
              value: {
                width: 4,
                style: 'dashed',
                color: 'yellow',
              },
            }).value[0],
            method({
              property: 'border-top',
              value: {
                width: '4px',
                style: 'dashed',
                color: 'yellow'
              },
            }).value[0],
            method({
              property: 'border-right',
              value: {
                width: '4px',
                style: 'dashed',
                color: 'yellow'
              },
            }).value[0],
            method({
              property: 'border-bottom',
              value: {
                width: '4px',
                style: 'dashed',
                color: 'yellow'
              },
            }).value[0],
            method({
              property: 'border-left',
              value: {
                width: '4px',
                style: 'dashed',
                color: 'yellow'
              },
            }).value[0],
            method({
              property: 'border-block',
              value: {
                width: '4px',
                style: 'dashed',
                color: 'yellow'
              },
            }).value[0],
            method({
              property: 'border-block-end',
              value: {
                width: '4px',
                style: 'dashed',
                color: 'yellow'
              },
            }).value[0],
            method({
              property: 'border-block-start',
              value: {
                width: '4px',
                style: 'dashed',
                color: 'yellow'
              },
            }).value[0],
            method({
              property: 'border-inline-end',
              value: {
                width: '4px',
                style: 'dashed',
                color: 'yellow'
              },
            }).value[0],
            method({
              property: 'border-inline-start',
              value: {
                width: '4px',
                style: 'dashed',
                color: 'yellow'
              },
            }).value[0],
            method({
              property: 'column-rule',
              value: {
                width: '4px',
                style: 'dashed',
                color: 'yellow'
              },
            }).value[0],
            method({
              property: 'border',
              value: {
                width: '4px',
              },
            }).value[0],

            // Outline
            method({
              property: 'outline',
              value: {
                width: '4px',
                style: 'dashed',
                color: 'yellow',
              },
            }).value[0],
            method({
              property: 'outline',
              value: {
                width: 4,
                style: 'dashed',
                color: 'yellow',
              },
            }).value[0],
            methodWithStyle({
              property: 'outline',
              value: {
                width: 4,
                style: 'dashed',
                color: 'yellow',
              },
            }).value[0],
            method({
              property: 'outline',
              value: {
                width: '4px',
              },
            }).value[0],

            // Border-color
            method({
              property: 'border-color',
              value: {
                top: 'yellow',
                right: 'lightgreen',
                bottom: 'orange',
                left: 'beige',
              },
            }).value[0],
            method({
              property: 'border-top-color',
              value: {
                top: 'yellow',
                right: 'lightgreen',
                bottom: 'orange',
                left: 'beige',
              },
            }).value[0],
            method({
              property: 'border-right-color',
              value: {
                top: 'yellow',
                right: 'lightgreen',
                bottom: 'orange',
                left: 'beige',
              },
            }).value[0],
            method({
              property: 'border-bottom-color',
              value: {
                top: 'yellow',
                right: 'lightgreen',
                bottom: 'orange',
                left: 'beige',
              },
            }).value[0],
            method({
              property: 'border-left-color',
              value: {
                top: 'yellow',
                right: 'lightgreen',
                bottom: 'orange',
                left: 'beige',
              },
            }).value[0],
            method({
              property: 'border-color',
              value: {
                top: 'yellow',
              },
            }).value[0],

            // Background-position
            method({
              property: 'background-position',
              value: {
                top: '4px',
                bottom: '14px',
              },
            }).value[0],
            methodWithStyle({
              property: 'background-position',
              value: {
                top: 4,
                bottom: 14,
              },
            }).value[0],
            method({
              property: 'background-position',
              value: {
                top: '4px',
              },
            }).value[0],

            // Font
            method({
              property: 'font',
              value: {
                style: 'italic',
                weight: 400,
                size: '14px',
                lineHeight: 1.4,
                family: 'Arial'
              },
            }).value[0],
            method({
              property: 'font',
              value: {
                style: 'italic',
                weight: 400,
                size: '14px',
                'line-height': 1.4,
                family: 'Arial'
              },
            }).value[0],
            methodWithStyle({
              property: 'font',
              value: {
                style: 'italic',
                weight: 400,
                size: 14,
                lineHeight: 1.4,
                family: 'Arial'
              },
            }).value[0],
            method({
              property: 'font',
              value: {
                size: 14,
                family: 'Arial'
              },
            }).value[0],

            // Margin, padding, border-width and border-image-outset
            method({
              property: 'margin',
              value: {
                top: '14px',
                right: '1.4px',
                bottom: '41px',
                left: '114px',
              },
            }).value[0],
            method({
              property: 'margin',
              value: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              },
            }).value[0],
            methodWithStyle({
              property: 'margin',
              value: {
                top: 14,
                right: 1.4,
                bottom: 41,
                left: 114,
              },
            }).value[0],
            method({
              property: 'padding',
              value: {
                top: '14px',
                right: '1.4px',
                bottom: '41px',
                left: '114px',
              },
            }).value[0],
            method({
              property: 'border-image-outset',
              value: {
                top: '14px',
                right: '1.4px',
                bottom: '41px',
                left: '114px',
              },
            }).value[0],
            method({
              property: 'border-width',
              value: {
                top: '14px',
                right: '1.4px',
                bottom: '41px',
                left: '114px',
              },
            }).value[0],
            method({
              property: 'border-image-outset',
              value: {
                top: '14px',
                right: '1.4px',
                bottom: '41px',
                left: '114px',
              },
            }).value[0],
            method({
              property: 'margin',
              value: {
                top: '14px',
                left: '114px',
              },
            }).value[0],

            // Scroll-margin and scroll-padding
            method({
              property: 'scroll-margin',
              value: {
                top: '14px',
                right: '1.4px',
                bottom: '41px',
                left: '114px',
              },
            }).value[0],
            method({
              property: 'scroll-margin',
              value: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              },
            }).value[0],
            methodWithStyle({
              property: 'scroll-margin',
              value: {
                top: 14,
                right: 1.4,
                bottom: 41,
                left: 114,
              },
            }).value[0],
            method({
              property: 'scroll-padding',
              value: {
                top: '14px',
                right: '1.4px',
                bottom: '41px',
                left: '114px',
              },
            }).value[0],
            method({
              property: 'scroll-margin',
              value: {
                top: '14px',
                left: '114px',
              },
            }).value[0],

            // Overflow and background-repeat
            method({
              property: 'overflow',
              value: {
                x: 'auto',
                y: 'auto'
              },
            }).value[0],
            methodWithStyle({
              property: 'background-repeat',
              value: {
                x: 'repeat',
                y: 'no-repeat'
              },
            }).value[0],
            method({
              property: 'overflow',
              value: {
                y: 'auto'
              },
            }).value[0],

            // Background size
            method({
              property: 'background-size',
              value: {
                width: '114px',
                height: '14px'
              },
            }).value[0],
            method({
              property: 'background-size',
              value: {
                width: 0,
                height: 0
              },
            }).value[0],
            methodWithStyle({
              property: 'background-size',
              value: {
                width: 114,
                height: 14
              },
            }).value[0],
            method({
              property: 'background-size',
              value: {
                width: '114px',
              },
            }).value[0],

            // Border radiuses
            method({
              property: 'border-bottom-left-radius',
              value: {
                horizontal: '40%',
                vertical: '40px'
              },
            }).value[0],
            method({
              property: 'border-bottom-left-radius',
              value: {
                horizontal: 0,
                vertical: 0
              },
            }).value[0],
            methodWithStyle({
              property: 'border-bottom-left-radius',
              value: {
                horizontal: 40,
                vertical: 40
              },
            }).value[0],
            method({
              property: 'border-bottom-right-radius',
              value: {
                horizontal: '40%',
                vertical: '40px'
              },
            }).value[0],
            method({
              property: 'border-top-left-radius',
              value: {
                horizontal: '40%',
                vertical: '40px'
              },
            }).value[0],
            method({
              property: 'border-top-right-radius',
              value: {
                horizontal: '40%',
                vertical: '40px'
              },
            }).value[0],
            method({
              property: 'border-end-end-radius',
              value: {
                horizontal: '40%',
                vertical: '40px'
              },
            }).value[0],
            method({
              property: 'border-end-start-radius',
              value: {
                horizontal: '40%',
                vertical: '40px'
              },
            }).value[0],
            method({
              property: 'border-start-end-radius',
              value: {
                horizontal: '40%',
                vertical: '40px'
              },
            }).value[0],
            method({
              property: 'border-start-start-radius',
              value: {
                horizontal: '40%',
                vertical: '40px'
              },
            }).value[0],
            method({
              property: 'border-bottom-left-radius',
              value: {
                vertical: '40%',
              },
            }).value[0],

            // Border image
            method({
              property: 'border-image',
              value: {
                source: 'url(a.jpg)',
                slice: '40%',
                width: '40px',
                outset: '14px',
                repeat: 'repeat'
              },
            }).value[0],
            methodWithStyle({
              property: 'border-image',
              value: {
                source: 'url(a.jpg)',
                slice: 40,
                width: 40,
                outset: 14,
                repeat: 'repeat'
              },
            }).value[0],
            method({
              property: 'border-image',
              value: {
                source: 'url(a.jpg)',
                width: '40px'
              },
            }).value[0],

            // Border radius
            method({
              property: 'border-radius',
              value: {
                topLeft: '14px',
                topRight: '40px',
                bottomLeft: '114px',
                bottomRight: '41px',
              },
            }).value[0],
            method({
              property: 'border-radius',
              value: {
                'top-left': '14px',
                'top-right': '40px',
                'bottom-left': '114px',
                'bottom-right': '41px',
              },
            }).value[0],
            methodWithStyle({
              property: 'border-radius',
              value: {
                topLeft: 14,
                topRight: 40,
                bottomLeft: 114,
                bottomRight: 41,
              },
            }).value[0],
            method({
              property: 'border-radius',
              value: {
                topLeft: '14px',
                bottomLeft: '41px',
              },
            }).value[0],

            // Border style
            method({
              property: 'border-style',
              value: {
                top: 'dashed',
                right: 'dotted',
                bottom: 'dashed',
                left: 'dotted',
              },
            }).value[0],
            method({
              property: 'border-style',
              value: {
                top: 'dashed',
                right: 'dotted',
              },
            }).value[0],

            // Columns
            method({
              property: 'columns',
              value: {
                width: '14px',
                count: 1.4
              },
            }).value[0],
            methodWithStyle({
              property: 'columns',
              value: {
                width: 14,
                count: 1.4
              },
            }).value[0],
            method({
              property: 'columns',
              value: {
                width: '14px'
              },
            }).value[0],

            // Flex
            method({
              property: 'flex',
              value: {
                grow: 14,
                shrink: 1.4,
                basis: '1414px',
              },
            }).value[0],
            methodWithStyle({
              property: 'flex',
              value: {
                grow: 14,
                shrink: 1.4,
                basis: 1414,
              },
            }).value[0],
            method({
              property: 'flex',
              value: {
                grow: 14,
              },
            }).value[0],

            // Flex flow
            method({
              property: 'flex-flow',
              value: {
                direction: 'row',
                wrap: 'wrap'
              },
            }).value[0],
            method({
              property: 'flex-flow',
              value: {
                wrap: 'wrap'
              },
            }).value[0],

            // Gap
            method({
              property: 'gap',
              value: {
                row: '14px',
                column: '140px',
              },
            }).value[0],
            methodWithStyle({
              property: 'gap',
              value: {
                row: 14,
                column: 140,
              },
            }).value[0],
            method({
              property: 'gap',
              value: {
                row: '14px',
              },
            }).value[0],

            // Grid
            method({
              property: 'grid',
              value: {
                autoRows: '14px',
                autoColumns: '141px',
                templateRows: '141px',
                templateColumns: '1440px',
                autoFlow: 'row',
              },
            }).value[0],
            method({
              property: 'grid',
              value: {
                'auto-rows': 14,
                'auto-columns': 141,
                'template-rows': 141,
                'template-columns': 1440,
                'auto-flow': 'row',
              },
            }).value[0],
            methodWithStyle({
              property: 'grid',
              value: {
                'auto-rows': 14,
                'auto-columns': 141,
                'template-rows': 141,
                'template-columns': 1440,
                'auto-flow': 'row',
              },
            }).value[0],
            method({
              property: 'grid',
              value: {
                'auto-rows': 14,
                'template-columns': 1440,
                'auto-flow': 'row',
              },
            }).value[0],

            // Grid area
            method({
              property: 'grid-area',
              value: {
                rowStart: 1,
                rowEnd: 2,
                columnStart: 3,
                columnEnd: 4
              },
            }).value[0],
            method({
              property: 'grid-area',
              value: {
                'row-start': 1,
                'row-end': 2,
                'column-start': 3,
                'column-end': 4
              },
            }).value[0],
            method({
              property: 'grid-area',
              value: {
                rowStart: 1,
                rowEnd: 2
              },
            }).value[0],

            // Grid row and column
            method({
              property: 'grid-column',
              value: {
                start: 1,
                end: 4
              },
            }).value[0],
            method({
              property: 'grid-column',
              value: {
                start: 1,
              },
            }).value[0],

            // Grid template
            method({
              property: 'grid-template',
              value: {
                areas: `a a a
b b b`,
                rows: '114px 1fr',
                columns: '1114px 1fr',
              },
            }).value[0],
            methodWithStyle({
              property: 'grid-template',
              value: {
                areas: `a a a
b b b`,
                rows: 114,
                columns: 1114,
              },
            }).value[0],
            method({
              property: 'grid-template',
              value: {
                areas: `a a a
b b b`,
              },
            }).value[0],

            // List style
            method({
              property: 'list-style',
              value: {
                type: 'lower',
                image: 'url(a.jpg)',
                position: 'inside'
              },
            }).value[0],
            method({
              property: 'list-style',
              value: {
                type: 'lower',
              },
            }).value[0],

            // Mask
            method({
              property: 'mask',
              value: {
                image: 'url(a.jpg)',
                mode: 'match',
                repeat: 'repeat',
                position: 'center',
                clip: 'border-box',
                origin: 'border-box',
                size: 'auto',
                composite: 'add'
              },
            }).value[0],
            method({
              property: 'mask',
              value: {
                mode: 'match',
              },
            }).value[0],

            // Offset
            method({
              property: 'offset',
              value: {
                anchor: '14px',
                distance: '114px',
                rotate: '414%',
                position: '40% 40%',
                path: 'url(a.svg)',
              },
            }).value[0],
            methodWithStyle({
              property: 'offset',
              value: {
                anchor: 14,
                distance: 114,
                rotate: 414,
                position: [41, 41],
                path: 'url(a.svg)',
              },
            }).value[0],
            method({
              property: 'offset',
              value: {
                anchor: '14px',
              },
            }).value[0],

            // Place items, place-self and place-content
            method({
              property: 'place-items',
              value: {
                align: 'flex-start',
                justify: 'center',
              },
            }).value[0],
            method({
              property: 'place-self',
              value: {
                align: 'flex-start',
                justify: 'center',
              },
            }).value[0],
            method({
              property: 'place-content',
              value: {
                align: 'flex-start',
                justify: 'center',
              },
            }).value[0],
            method({
              property: 'place-items',
              value: {
                align: 'flex-start',
              },
            }).value[0],

            // Text decoration
            method({
              property: 'text-decoration',
              value: {
                line: 'underline',
                style: 'dashed',
                color: 'yellow',
                thickness: '14px',
              },
            }).value[0],
            methodWithStyle({
              property: 'text-decoration',
              value: {
                line: 'underline',
                style: 'dashed',
                color: 'yellow',
                thickness: 14,
              },
            }).value[0],
            method({
              property: 'text-decoration',
              value: {
                line: 'underline',
              },
            }).value[0],

            // Text emphasis
            method({
              property: 'text-emphasis',
              value: {
                style: 'dashed',
                color: 'yellow',
              },
            }).value[0],
            method({
              property: 'text-emphasis',
              value: {
                color: 'yellow',
              },
            }).value[0],

            // Transition
            method({
              property: 'transition',
              value: {
                name: 'main',
                duration: '1.14s',
                easingFunction: 'ease-in',
                delay: '1.4s',
                iterationCount: 1,
                direction: 'alternate',
                fillMode: 'forwards',
                playState: 'paused',
              }
            }).value[0],
            method({
              property: 'transition',
              value: {
                name: 'main',
                duration: 1.14,
                'easing-function': 'ease-in',
                delay: 1.4,
              }
            }).value[0],
            methodWithStyle({
              property: 'transition',
              value: {
                name: 'main',
                duration: 1.14,
                'easing-function': 'ease-in',
                delay: 1.4,
                'iteration-count': 1,
                direction: 'alternate',
                'fill-mode': 'forwards',
                'play-state': 'paused',
              }
            }).value[0],
            method({
              property: 'transition',
              value: {
                name: 'main',
                duration: '1.14s',
                'easing-function': 'ease-in'
              }
            }).value[0],
          ];
        });

        const method = AmauiStyle.valueObject(undefined).methods.method;

        const amauiStyle = new AmauiStyle.AmauiStyle();

        amauiStyle.plugins.add = AmauiStyle.unit;

        const methodWithStyle = AmauiStyle.valueObject(amauiStyle).methods.method;

        const valueNode = [
          // Animation
          method({
            property: 'animation',
            value: {
              name: 'a',
              duration: '1.14s',
              easingFunction: 'ease-in',
              delay: '1.4s',
              iterationCount: 1,
              direction: 'alternate',
              fillMode: 'forwards',
              playState: 'paused',
            }
          }).value[0],
          method({
            property: 'animation',
            value: {
              name: 'a',
              duration: 1.14,
              'easing-function': 'ease-in',
              delay: 1.4,
              'iteration-count': 1,
              direction: 'alternate',
              'fill-mode': 'forwards',
              'play-state': 'paused',
            }
          }).value[0],
          methodWithStyle({
            property: 'animation',
            value: {
              name: 'a',
              duration: 1.14,
              'easing-function': 'ease-in',
              delay: 1.4,
              'iteration-count': 1,
              direction: 'alternate',
              'fill-mode': 'forwards',
              'play-state': 'paused',
            }
          }).value[0],
          method({
            property: 'animation',
            value: {
              name: 'a',
              duration: '1.14s',
              'easing-function': 'ease-in'
            }
          }).value[0],

          // Background
          method({
            property: 'background',
            value: {
              color: 'yellow',
              image: 'url(a.jpg)',
              repeat: 'repeat-y',
              position: 'center',
            },
          }).value[0],
          methodWithStyle({
            property: 'background',
            value: {
              color: 'yellow',
              image: 'url(a.jpg)',
              repeat: 'repeat-y',
              position: [40, 40],
            },
          }).value[0],
          method({
            property: 'background',
            value: {
              color: 'yellow',
            },
          }).value[0],

          // Border and column-rule
          method({
            property: 'border',
            value: {
              width: '4px',
              style: 'dashed',
              color: 'yellow'
            },
          }).value[0],
          method({
            property: 'border',
            value: {
              width: 4,
              style: 'dashed',
              color: 'yellow'
            },
          }).value[0],
          methodWithStyle({
            property: 'border',
            value: {
              width: 4,
              style: 'dashed',
              color: 'yellow',
            },
          }).value[0],
          method({
            property: 'border-top',
            value: {
              width: '4px',
              style: 'dashed',
              color: 'yellow'
            },
          }).value[0],
          method({
            property: 'border-right',
            value: {
              width: '4px',
              style: 'dashed',
              color: 'yellow'
            },
          }).value[0],
          method({
            property: 'border-bottom',
            value: {
              width: '4px',
              style: 'dashed',
              color: 'yellow'
            },
          }).value[0],
          method({
            property: 'border-left',
            value: {
              width: '4px',
              style: 'dashed',
              color: 'yellow'
            },
          }).value[0],
          method({
            property: 'border-block',
            value: {
              width: '4px',
              style: 'dashed',
              color: 'yellow'
            },
          }).value[0],
          method({
            property: 'border-block-end',
            value: {
              width: '4px',
              style: 'dashed',
              color: 'yellow'
            },
          }).value[0],
          method({
            property: 'border-block-start',
            value: {
              width: '4px',
              style: 'dashed',
              color: 'yellow'
            },
          }).value[0],
          method({
            property: 'border-inline-end',
            value: {
              width: '4px',
              style: 'dashed',
              color: 'yellow'
            },
          }).value[0],
          method({
            property: 'border-inline-start',
            value: {
              width: '4px',
              style: 'dashed',
              color: 'yellow'
            },
          }).value[0],
          method({
            property: 'column-rule',
            value: {
              width: '4px',
              style: 'dashed',
              color: 'yellow'
            },
          }).value[0],
          method({
            property: 'border',
            value: {
              width: '4px',
            },
          }).value[0],

          // Outline
          method({
            property: 'outline',
            value: {
              width: '4px',
              style: 'dashed',
              color: 'yellow',
            },
          }).value[0],
          method({
            property: 'outline',
            value: {
              width: 4,
              style: 'dashed',
              color: 'yellow',
            },
          }).value[0],
          methodWithStyle({
            property: 'outline',
            value: {
              width: 4,
              style: 'dashed',
              color: 'yellow',
            },
          }).value[0],
          method({
            property: 'outline',
            value: {
              width: '4px',
            },
          }).value[0],

          // Border-color
          method({
            property: 'border-color',
            value: {
              top: 'yellow',
              right: 'lightgreen',
              bottom: 'orange',
              left: 'beige',
            },
          }).value[0],
          method({
            property: 'border-top-color',
            value: {
              top: 'yellow',
              right: 'lightgreen',
              bottom: 'orange',
              left: 'beige',
            },
          }).value[0],
          method({
            property: 'border-right-color',
            value: {
              top: 'yellow',
              right: 'lightgreen',
              bottom: 'orange',
              left: 'beige',
            },
          }).value[0],
          method({
            property: 'border-bottom-color',
            value: {
              top: 'yellow',
              right: 'lightgreen',
              bottom: 'orange',
              left: 'beige',
            },
          }).value[0],
          method({
            property: 'border-left-color',
            value: {
              top: 'yellow',
              right: 'lightgreen',
              bottom: 'orange',
              left: 'beige',
            },
          }).value[0],
          method({
            property: 'border-color',
            value: {
              top: 'yellow',
            },
          }).value[0],

          // Background-position
          method({
            property: 'background-position',
            value: {
              top: '4px',
              bottom: '14px',
            },
          }).value[0],
          methodWithStyle({
            property: 'background-position',
            value: {
              top: 4,
              bottom: 14,
            },
          }).value[0],
          method({
            property: 'background-position',
            value: {
              top: '4px',
            },
          }).value[0],

          // Font
          method({
            property: 'font',
            value: {
              style: 'italic',
              weight: 400,
              size: '14px',
              lineHeight: 1.4,
              family: 'Arial'
            },
          }).value[0],
          method({
            property: 'font',
            value: {
              style: 'italic',
              weight: 400,
              size: '14px',
              'line-height': 1.4,
              family: 'Arial'
            },
          }).value[0],
          methodWithStyle({
            property: 'font',
            value: {
              style: 'italic',
              weight: 400,
              size: 14,
              lineHeight: 1.4,
              family: 'Arial'
            },
          }).value[0],
          method({
            property: 'font',
            value: {
              size: 14,
              family: 'Arial'
            },
          }).value[0],

          // Margin, padding, border-width and border-image-outset
          method({
            property: 'margin',
            value: {
              top: '14px',
              right: '1.4px',
              bottom: '41px',
              left: '114px',
            },
          }).value[0],
          method({
            property: 'margin',
            value: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          }).value[0],
          methodWithStyle({
            property: 'margin',
            value: {
              top: 14,
              right: 1.4,
              bottom: 41,
              left: 114,
            },
          }).value[0],
          method({
            property: 'padding',
            value: {
              top: '14px',
              right: '1.4px',
              bottom: '41px',
              left: '114px',
            },
          }).value[0],
          method({
            property: 'border-image-outset',
            value: {
              top: '14px',
              right: '1.4px',
              bottom: '41px',
              left: '114px',
            },
          }).value[0],
          method({
            property: 'border-width',
            value: {
              top: '14px',
              right: '1.4px',
              bottom: '41px',
              left: '114px',
            },
          }).value[0],
          method({
            property: 'border-image-outset',
            value: {
              top: '14px',
              right: '1.4px',
              bottom: '41px',
              left: '114px',
            },
          }).value[0],
          method({
            property: 'margin',
            value: {
              top: '14px',
              left: '114px',
            },
          }).value[0],

          // Scroll-margin and scroll-padding
          method({
            property: 'scroll-margin',
            value: {
              top: '14px',
              right: '1.4px',
              bottom: '41px',
              left: '114px',
            },
          }).value[0],
          method({
            property: 'scroll-margin',
            value: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          }).value[0],
          methodWithStyle({
            property: 'scroll-margin',
            value: {
              top: 14,
              right: 1.4,
              bottom: 41,
              left: 114,
            },
          }).value[0],
          method({
            property: 'scroll-padding',
            value: {
              top: '14px',
              right: '1.4px',
              bottom: '41px',
              left: '114px',
            },
          }).value[0],
          method({
            property: 'scroll-margin',
            value: {
              top: '14px',
              left: '114px',
            },
          }).value[0],

          // Overflow and background-repeat
          method({
            property: 'overflow',
            value: {
              x: 'auto',
              y: 'auto'
            },
          }).value[0],
          methodWithStyle({
            property: 'background-repeat',
            value: {
              x: 'repeat',
              y: 'no-repeat'
            },
          }).value[0],
          method({
            property: 'overflow',
            value: {
              y: 'auto'
            },
          }).value[0],

          // Background size
          method({
            property: 'background-size',
            value: {
              width: '114px',
              height: '14px'
            },
          }).value[0],
          method({
            property: 'background-size',
            value: {
              width: 0,
              height: 0
            },
          }).value[0],
          methodWithStyle({
            property: 'background-size',
            value: {
              width: 114,
              height: 14
            },
          }).value[0],
          method({
            property: 'background-size',
            value: {
              width: '114px',
            },
          }).value[0],

          // Border radiuses
          method({
            property: 'border-bottom-left-radius',
            value: {
              horizontal: '40%',
              vertical: '40px'
            },
          }).value[0],
          method({
            property: 'border-bottom-left-radius',
            value: {
              horizontal: 0,
              vertical: 0
            },
          }).value[0],
          methodWithStyle({
            property: 'border-bottom-left-radius',
            value: {
              horizontal: 40,
              vertical: 40
            },
          }).value[0],
          method({
            property: 'border-bottom-right-radius',
            value: {
              horizontal: '40%',
              vertical: '40px'
            },
          }).value[0],
          method({
            property: 'border-top-left-radius',
            value: {
              horizontal: '40%',
              vertical: '40px'
            },
          }).value[0],
          method({
            property: 'border-top-right-radius',
            value: {
              horizontal: '40%',
              vertical: '40px'
            },
          }).value[0],
          method({
            property: 'border-end-end-radius',
            value: {
              horizontal: '40%',
              vertical: '40px'
            },
          }).value[0],
          method({
            property: 'border-end-start-radius',
            value: {
              horizontal: '40%',
              vertical: '40px'
            },
          }).value[0],
          method({
            property: 'border-start-end-radius',
            value: {
              horizontal: '40%',
              vertical: '40px'
            },
          }).value[0],
          method({
            property: 'border-start-start-radius',
            value: {
              horizontal: '40%',
              vertical: '40px'
            },
          }).value[0],
          method({
            property: 'border-bottom-left-radius',
            value: {
              vertical: '40%',
            },
          }).value[0],

          // Border image
          method({
            property: 'border-image',
            value: {
              source: 'url(a.jpg)',
              slice: '40%',
              width: '40px',
              outset: '14px',
              repeat: 'repeat'
            },
          }).value[0],
          methodWithStyle({
            property: 'border-image',
            value: {
              source: 'url(a.jpg)',
              slice: 40,
              width: 40,
              outset: 14,
              repeat: 'repeat'
            },
          }).value[0],
          method({
            property: 'border-image',
            value: {
              source: 'url(a.jpg)',
              width: '40px'
            },
          }).value[0],

          // Border radius
          method({
            property: 'border-radius',
            value: {
              topLeft: '14px',
              topRight: '40px',
              bottomLeft: '114px',
              bottomRight: '41px',
            },
          }).value[0],
          method({
            property: 'border-radius',
            value: {
              'top-left': '14px',
              'top-right': '40px',
              'bottom-left': '114px',
              'bottom-right': '41px',
            },
          }).value[0],
          methodWithStyle({
            property: 'border-radius',
            value: {
              topLeft: 14,
              topRight: 40,
              bottomLeft: 114,
              bottomRight: 41,
            },
          }).value[0],
          method({
            property: 'border-radius',
            value: {
              topLeft: '14px',
              bottomLeft: '41px',
            },
          }).value[0],

          // Border style
          method({
            property: 'border-style',
            value: {
              top: 'dashed',
              right: 'dotted',
              bottom: 'dashed',
              left: 'dotted',
            },
          }).value[0],
          method({
            property: 'border-style',
            value: {
              top: 'dashed',
              right: 'dotted',
            },
          }).value[0],

          // Columns
          method({
            property: 'columns',
            value: {
              width: '14px',
              count: 1.4
            },
          }).value[0],
          methodWithStyle({
            property: 'columns',
            value: {
              width: 14,
              count: 1.4
            },
          }).value[0],
          method({
            property: 'columns',
            value: {
              width: '14px'
            },
          }).value[0],

          // Flex
          method({
            property: 'flex',
            value: {
              grow: 14,
              shrink: 1.4,
              basis: '1414px',
            },
          }).value[0],
          methodWithStyle({
            property: 'flex',
            value: {
              grow: 14,
              shrink: 1.4,
              basis: 1414,
            },
          }).value[0],
          method({
            property: 'flex',
            value: {
              grow: 14,
            },
          }).value[0],

          // Flex flow
          method({
            property: 'flex-flow',
            value: {
              direction: 'row',
              wrap: 'wrap'
            },
          }).value[0],
          method({
            property: 'flex-flow',
            value: {
              wrap: 'wrap'
            },
          }).value[0],

          // Gap
          method({
            property: 'gap',
            value: {
              row: '14px',
              column: '140px',
            },
          }).value[0],
          methodWithStyle({
            property: 'gap',
            value: {
              row: 14,
              column: 140,
            },
          }).value[0],
          method({
            property: 'gap',
            value: {
              row: '14px',
            },
          }).value[0],

          // Grid
          method({
            property: 'grid',
            value: {
              autoRows: '14px',
              autoColumns: '141px',
              templateRows: '141px',
              templateColumns: '1440px',
              autoFlow: 'row',
            },
          }).value[0],
          method({
            property: 'grid',
            value: {
              'auto-rows': 14,
              'auto-columns': 141,
              'template-rows': 141,
              'template-columns': 1440,
              'auto-flow': 'row',
            },
          }).value[0],
          methodWithStyle({
            property: 'grid',
            value: {
              'auto-rows': 14,
              'auto-columns': 141,
              'template-rows': 141,
              'template-columns': 1440,
              'auto-flow': 'row',
            },
          }).value[0],
          method({
            property: 'grid',
            value: {
              'auto-rows': 14,
              'template-columns': 1440,
              'auto-flow': 'row',
            },
          }).value[0],

          // Grid area
          method({
            property: 'grid-area',
            value: {
              rowStart: 1,
              rowEnd: 2,
              columnStart: 3,
              columnEnd: 4
            },
          }).value[0],
          method({
            property: 'grid-area',
            value: {
              'row-start': 1,
              'row-end': 2,
              'column-start': 3,
              'column-end': 4
            },
          }).value[0],
          method({
            property: 'grid-area',
            value: {
              rowStart: 1,
              rowEnd: 2
            },
          }).value[0],

          // Grid row and column
          method({
            property: 'grid-column',
            value: {
              start: 1,
              end: 4
            },
          }).value[0],
          method({
            property: 'grid-column',
            value: {
              start: 1,
            },
          }).value[0],

          // Grid template
          method({
            property: 'grid-template',
            value: {
              areas: `a a a
b b b`,
              rows: '114px 1fr',
              columns: '1114px 1fr',
            },
          }).value[0],
          methodWithStyle({
            property: 'grid-template',
            value: {
              areas: `a a a
b b b`,
              rows: 114,
              columns: 1114,
            },
          }).value[0],
          method({
            property: 'grid-template',
            value: {
              areas: `a a a
b b b`,
            },
          }).value[0],

          // List style
          method({
            property: 'list-style',
            value: {
              type: 'lower',
              image: 'url(a.jpg)',
              position: 'inside'
            },
          }).value[0],
          method({
            property: 'list-style',
            value: {
              type: 'lower',
            },
          }).value[0],

          // Mask
          method({
            property: 'mask',
            value: {
              image: 'url(a.jpg)',
              mode: 'match',
              repeat: 'repeat',
              position: 'center',
              clip: 'border-box',
              origin: 'border-box',
              size: 'auto',
              composite: 'add'
            },
          }).value[0],
          method({
            property: 'mask',
            value: {
              mode: 'match',
            },
          }).value[0],

          // Offset
          method({
            property: 'offset',
            value: {
              anchor: '14px',
              distance: '114px',
              rotate: '414%',
              position: '40% 40%',
              path: 'url(a.svg)',
            },
          }).value[0],
          methodWithStyle({
            property: 'offset',
            value: {
              anchor: 14,
              distance: 114,
              rotate: 414,
              position: [41, 41],
              path: 'url(a.svg)',
            },
          }).value[0],
          method({
            property: 'offset',
            value: {
              anchor: '14px',
            },
          }).value[0],

          // Place items, place-self and place-content
          method({
            property: 'place-items',
            value: {
              align: 'flex-start',
              justify: 'center',
            },
          }).value[0],
          method({
            property: 'place-self',
            value: {
              align: 'flex-start',
              justify: 'center',
            },
          }).value[0],
          method({
            property: 'place-content',
            value: {
              align: 'flex-start',
              justify: 'center',
            },
          }).value[0],
          method({
            property: 'place-items',
            value: {
              align: 'flex-start',
            },
          }).value[0],

          // Text decoration
          method({
            property: 'text-decoration',
            value: {
              line: 'underline',
              style: 'dashed',
              color: 'yellow',
              thickness: '14px',
            },
          }).value[0],
          methodWithStyle({
            property: 'text-decoration',
            value: {
              line: 'underline',
              style: 'dashed',
              color: 'yellow',
              thickness: 14,
            },
          }).value[0],
          method({
            property: 'text-decoration',
            value: {
              line: 'underline',
            },
          }).value[0],

          // Text emphasis
          method({
            property: 'text-emphasis',
            value: {
              style: 'dashed',
              color: 'yellow',
            },
          }).value[0],
          method({
            property: 'text-emphasis',
            value: {
              color: 'yellow',
            },
          }).value[0],

          // Transition
          method({
            property: 'transition',
            value: {
              name: 'main',
              duration: '1.14s',
              easingFunction: 'ease-in',
              delay: '1.4s',
              iterationCount: 1,
              direction: 'alternate',
              fillMode: 'forwards',
              playState: 'paused',
            }
          }).value[0],
          method({
            property: 'transition',
            value: {
              name: 'main',
              duration: 1.14,
              'easing-function': 'ease-in',
              delay: 1.4,
            }
          }).value[0],
          methodWithStyle({
            property: 'transition',
            value: {
              name: 'main',
              duration: 1.14,
              'easing-function': 'ease-in',
              delay: 1.4,
              'iteration-count': 1,
              direction: 'alternate',
              'fill-mode': 'forwards',
              'play-state': 'paused',
            }
          }).value[0],
          method({
            property: 'transition',
            value: {
              name: 'main',
              duration: '1.14s',
              'easing-function': 'ease-in'
            }
          }).value[0],
        ];

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          'a 1.14s ease-in 1.4s 1 alternate forwards paused',
          'a 1.14 ease-in 1.4 1 alternate forwards paused',
          'a 1.14s ease-in 1.4s 1 alternate forwards paused',
          'a 1.14s ease-in',

          'yellow url(a.jpg) repeat-y center',
          'yellow url(a.jpg) repeat-y 40% 40%',
          'yellow',

          '4px dashed yellow',
          '4 dashed yellow',
          '4px dashed yellow',
          '4px dashed yellow',
          '4px dashed yellow',
          '4px dashed yellow',
          '4px dashed yellow',
          '4px dashed yellow',
          '4px dashed yellow',
          '4px dashed yellow',
          '4px dashed yellow',
          '4px dashed yellow',
          '4px dashed yellow',
          '4px',

          'yellow dashed 4px',
          'yellow dashed 4',
          'yellow dashed 4px',
          '4px',

          'yellow lightgreen orange beige',
          'yellow lightgreen orange beige',
          'yellow lightgreen orange beige',
          'yellow lightgreen orange beige',
          'yellow lightgreen orange beige',
          'yellow transparent transparent transparent',

          '4px 14px',
          '4% 14%',
          '4px',

          'italic 400 14px/1.4 Arial',
          'italic 400 14px/1.4 Arial',
          'italic 400 14px/1.4 Arial',
          '14 Arial',

          '14px 1.4px 41px 114px',
          '0 0 0 0',
          '14px 1.4px 41px 114px',
          '14px 1.4px 41px 114px',
          '14px 1.4px 41px 114px',
          '14px 1.4px 41px 114px',
          '14px 1.4px 41px 114px',
          '14px 0 0 114px',

          '41px 114px 1.4px 14px',
          '0 0 0 0',
          '41px 114px 1.4px 14px',
          '41px 114px 1.4px 14px',
          '0 114px 0 14px',

          'auto auto',
          'repeat no-repeat',
          'auto',

          '114px 14px',
          '0 0',
          '114% 14%',
          '114px 0',

          '40% 40px',
          '0 0',
          '40px 40px',
          '40% 40px',
          '40% 40px',
          '40% 40px',
          '40% 40px',
          '40% 40px',
          '40% 40px',
          '40% 40px',
          '0 40%',

          'url(a.jpg) 40% / 40px 14px repeat',
          'url(a.jpg) 40 / 40px 14px repeat',
          'url(a.jpg) 40px',

          '14px 40px 41px 114px',
          '14px 40px 41px 114px',
          '14px 40px 41px 114px',
          '14px 0 0 41px',

          'dashed dotted dashed dotted',
          'dashed dotted transparent transparent',

          '14px 1.4',
          '14px 1.4',
          '14px',

          '14 1.4 1414px',
          '14 1.4 1414%',
          '14',

          'row wrap',
          'wrap',

          '14px 140px',
          '14px 140px',
          '14px',

          '141px / row 141px',
          '141 / row 141',
          '141px / row 141px',
          'row 14 / 1440',

          '1 / 3 / 2 / 4',
          '1 / 3 / 2 / 4',
          '1 / 0 / 2 / 0',

          '4 / 1',
          '0 / 1',

          'a a a\nb b b 114px 1fr / 1114px 1fr',
          'a a a\nb b b 114px / 1114px',
          'a a a\nb b b /',

          'lower url(a.jpg) inside',
          'lower',

          'url(a.jpg) match repeat center border-box border-box auto add',
          'match',

          'url(a.svg) 114px 414% / 40% 40% 14px',
          'url(a.svg) 114% 414deg / 41% 41% 14%',
          '/ 14px',

          'flex-start center',
          'flex-start center',
          'flex-start center',
          'flex-start',

          'underline dashed yellow 14px',
          'underline dashed yellow 14px',
          'underline',

          'dashed yellow',
          'yellow',

          'main 1.14s ease-in 1.4s',
          'main 1.14 ease-in 1.4',
          'main 1.14s ease-in 1.4s',
          'main 1.14s ease-in'
        ]));
      });

    });

  });

});
