/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate } from '../utils/js/test/utils';

group('OnesyStyleRenderer', () => {

  to('make', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const onesyStyleRenderer = new window.OnesyStyle.OnesyStyleRenderer();

      const response = [
        window.document.styleSheets.length,
      ];

      const element = onesyStyleRenderer.make({ element: { type: 'text/css' }, data: { onesy: true } });

      response.push(element.tagName.toLowerCase(), element.type, element.onesy);

      return response;
    });

    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql([
      0,
      'style',
      'text/css',
      true
    ]));
  });

  group('add', () => {

    to('add', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const onesyStyleRenderer = new window.OnesyStyle.OnesyStyleRenderer();

        const response = [
          window.document.styleSheets.length,
        ];

        let element = onesyStyleRenderer.make({ element: { type: 'text/css' }, data: { onesy: true } });

        onesyStyleRenderer.add(element);

        element = window.document.styleSheets[0].ownerNode;

        response.push(element.tagName.toLowerCase(), element.type, element.onesy);

        return response;
      });

      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eql([
        0,
        'style',
        'text/css',
        true
      ]));
    });

    group('priority', () => {

      to('upper', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const onesyStyleRenderer = new window.OnesyStyle.OnesyStyleRenderer();

          const response = [
            window.document.styleSheets.length,
          ];

          let element = onesyStyleRenderer.make({ element: { type: 'text/css' }, data: { onesy: true } });

          onesyStyleRenderer.add(element);

          element = onesyStyleRenderer.make({ element: { type: 'text/css' }, data: { v: 1 } });

          onesyStyleRenderer.add(element, 'upper');

          element = window.document.styleSheets[1].ownerNode;

          response.push(element.v);

          response.push(window.document.styleSheets.length);

          return response;
        });

        const values = [...valueBrowsers];

        values.forEach(value => assert(value).eql([
          0,
          1,
          2
        ]));
      });

      to('lower', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const onesyStyleRenderer = new window.OnesyStyle.OnesyStyleRenderer();

          const response = [
            window.document.styleSheets.length,
          ];

          let element = onesyStyleRenderer.make({ element: { type: 'text/css' }, data: { onesy: true } });

          onesyStyleRenderer.add(element);

          element = onesyStyleRenderer.make({ element: { type: 'text/css' }, data: { v: 1 } });

          onesyStyleRenderer.add(element, 'lower');

          element = window.document.styleSheets[0].ownerNode;

          response.push(element.v);

          response.push(window.document.styleSheets.length);

          return response;
        });

        const values = [...valueBrowsers];

        values.forEach(value => assert(value).eql([
          0,
          1,
          2
        ]));
      });

    });

    group('attributes', () => {

      to('reset', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const onesyStyleRenderer = new window.OnesyStyle.OnesyStyleRenderer();

          const response = [
            window.document.styleSheets.length,
          ];

          let element = onesyStyleRenderer.make({ element: { type: 'text/css' }, data: { onesy: true } });

          onesyStyleRenderer.add(element);

          element = onesyStyleRenderer.make({ element: { type: 'text/css' }, data: { v: 1 } });

          onesyStyleRenderer.add(element, undefined, { data: { method: 'reset' } });

          element = window.document.styleSheets[0].ownerNode;

          response.push(element.v);

          response.push(window.document.styleSheets.length);

          return response;
        });

        const values = [...valueBrowsers];

        values.forEach(value => assert(value).eql([
          0,
          1,
          2
        ]));
      });

      to('pure', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const onesyStyleRenderer = new window.OnesyStyle.OnesyStyleRenderer();

          const response = [
            window.document.styleSheets.length,
          ];

          let element = onesyStyleRenderer.make({ element: { type: 'text/css' }, data: { onesy: true } });

          onesyStyleRenderer.add(element);

          // Reset
          element = onesyStyleRenderer.make({ element: { type: 'text/css' }, data: { v: 1, method: 'reset' } });

          onesyStyleRenderer.add(element, undefined, { data: { method: 'reset' } });

          // Pure 1
          element = onesyStyleRenderer.make({ element: { type: 'text/css' }, data: { v: 11, method: 'pure' } });

          onesyStyleRenderer.add(element, undefined, { data: { method: 'pure' } });

          // Pure 2
          element = onesyStyleRenderer.make({ element: { type: 'text/css' }, data: { v: 14, method: 'pure' } });

          onesyStyleRenderer.add(element, undefined, { data: { method: 'pure' } });

          response.push(
            window.document.styleSheets[0].ownerNode.v,
            window.document.styleSheets[1].ownerNode.v,
            window.document.styleSheets[2].ownerNode.v,
          );

          response.push(window.document.styleSheets.length);

          return response;
        });

        const values = [...valueBrowsers];

        values.forEach(value => assert(value).eql([
          0,
          1,
          11,
          14,
          4
        ]));
      });

    });

  });

  to('remove', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const onesyStyleRenderer = new window.OnesyStyle.OnesyStyleRenderer();

      const response = [
        window.document.styleSheets.length,
      ];

      let element = onesyStyleRenderer.make({ element: { type: 'text/css' }, data: { onesy: true } });

      onesyStyleRenderer.add(element);

      element = window.document.styleSheets[0].ownerNode;

      response.push(element.tagName.toLowerCase(), element.type, element.onesy);

      onesyStyleRenderer.remove(element);

      response.push(window.document.styleSheets.length);

      return response;
    });

    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql([
      0,
      'style',
      'text/css',
      true,
      0
    ]));
  });

});
