/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';
import * as AmauiUtils from '@amaui/utils';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers } from '../utils/js/test/utils';

import * as AmauiStyle from '../src';
import { counter } from '../src/amaui-style-rule';

group('@amaui/style/amaui-theme', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => await closeBrowsers(browsers));

  preEveryTo(async () => {
    // Counter
    counter.className = 0;
    counter.keyframesName = 0;

    await evaluate((window: any) => {
      // Body
      window.document.body.dir = 'ltr';

      window.document.body.innerHTML = `
      <main id='a'>
        <section id='a1'>
          <div id='a14'>
            a
          </div>
        </section>
      </main>
    `;

      new window.AmauiStyle.AmauiTheme({}, window.document.getElementById('a14'));
      new window.AmauiStyle.AmauiTheme({}, window.document.getElementById('a1'));
      new window.AmauiStyle.AmauiTheme({}, window.document.getElementById('a'));
      new window.AmauiStyle.AmauiTheme({}, window.document.body);
    }, { browsers });
  });

  postEveryTo(async () => await evaluate((window: any) => {
    // Style sheets
    const styleSheets: any = Array.from(window.document.styleSheets);

    styleSheets.forEach(sheet => sheet.ownerNode.remove());

    // Body
    window.document.body.innerHTML = '';
    window.document.body.dir = 'ltr';
    // Html
    window.document.documentElement.html.dir = 'ltr';
  }, { browsers }));

  group('AmauiTheme', () => {

    to('amaui_theme', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const amaui_theme = window.AmauiStyle.AmauiTheme.amaui_theme;

        return amaui_theme instanceof window.AmauiStyle.AmauiTheme;
      }, { browsers });

      const amaui_theme = AmauiStyle.AmauiTheme.amaui_theme;

      const valueNode = amaui_theme instanceof AmauiStyle.AmauiTheme;

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eq(true));
    });

    group('make', () => {

      to('color', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const color = window.AmauiStyle.AmauiTheme.make.color('#ff0');

          return color;
        }, { browsers });

        const color = AmauiStyle.AmauiTheme.make.color('#ff0');

        const valueNode = color;

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql({
          "0": "rgb(0, 0, 0)",
          "1": "rgb(5, 5, 0)",
          "5": "rgb(26, 26, 0)",
          "10": "rgb(51, 51, 0)",
          "20": "rgb(102, 102, 0)",
          "30": "rgb(153, 153, 0)",
          "40": "rgb(204, 204, 0)",
          "50": "rgb(255, 255, 0)",
          "60": "rgb(255, 255, 51)",
          "70": "rgb(255, 255, 102)",
          "80": "rgb(255, 255, 153)",
          "90": "rgb(255, 255, 204)",
          "95": "rgb(255, 255, 229)",
          "99": "rgb(255, 255, 250)",
          "100": "rgb(255, 255, 255)",
          "main": "rgb(255, 255, 0)",
          "light": "rgb(255, 255, 102)",
          "dark": "rgb(153, 153, 0)"
        }));
      });

      to('shadow', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const shadow = window.AmauiStyle.AmauiTheme.make.shadow('#ff0', [.14, .11, .17]);

          return shadow;
        }, { browsers });

        const shadow = AmauiStyle.AmauiTheme.make.shadow('#ff0', [.14, .11, .17]);

        const valueNode = shadow;

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql({
          "0": "none",
          "1": "0px 1px 1px 0px rgba(255, 255, 0, 0.14), 0px 2px 1px -1px rgba(255, 255, 0, 0.11), 0px 1px 3px 0px rgba(255, 255, 0, 0.17)",
          "2": "0px 2px 2px 0px rgba(255, 255, 0, 0.14), 0px 3px 3px -2px rgba(255, 255, 0, 0.11), 0px 1px 8px 0px rgba(255, 255, 0, 0.17)",
          "3": "0px 3px 4px 0px rgba(255, 255, 0, 0.14), 0px 3px 3px -2px rgba(255, 255, 0, 0.11), 0px 1px 8px 0px rgba(255, 255, 0, 0.17)",
          "4": "0px 4px 5px 0px rgba(255, 255, 0, 0.14), 0px 1px 10px 0px rgba(255, 255, 0, 0.11), 0px 2px 4px -1px rgba(255, 255, 0, 0.17)",
          "6": "0px 6px 10px 0px rgba(255, 255, 0, 0.14), 0px 1px 18px 0px rgba(255, 255, 0, 0.11), 0px 3px 5px -1px rgba(255, 255, 0, 0.17)",
          "8": "0px 8px 10px 1px rgba(255, 255, 0, 0.14), 0px 3px 14px 2px rgba(255, 255, 0, 0.11), 0px 5px 5px -3px rgba(255, 255, 0, 0.17)",
          "9": "0px 9px 12px 1px rgba(255, 255, 0, 0.14), 0px 3px 16px 2px rgba(255, 255, 0, 0.11), 0px 5px 6px -3px rgba(255, 255, 0, 0.17)",
          "12": "0px 12px 17px 2px rgba(255, 255, 0, 0.14), 0px 5px 22px 4px rgba(255, 255, 0, 0.11), 0px 7px 7px -4px rgba(255, 255, 0, 0.17)",
          "16": "0px 16px 24px 2px rgba(255, 255, 0, 0.14), 0px 6px 30px 5px rgba(255, 255, 0, 0.11), 0px 8px 10px -5px rgba(255, 255, 0, 0.17)",
          "24": "0px 24px 37px 3px rgba(255, 255, 0, 0.14), 0px 9px 46px 8px rgba(255, 255, 0, 0.11), 0px 11px 15px -7px rgba(255, 255, 0, 0.17)"
        }));
      });

    });

    to('all', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        return window.AmauiStyle.AmauiTheme.all(window.document.getElementById('a14')).map(item => item.element.id || item.element.tagName.toLowerCase());
      }, { browsers });

      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'a14',
        'a1',
        'a',
        'body'
      ]));
    });

    to('nearest', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const item = window.AmauiStyle.AmauiTheme.nearest(window.document.getElementById('a14'));

        return item.element.id || item.element.tagName.toLowerCase();
      }, { browsers });

      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eq('a14'));
    });

    to('furthest', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const item = window.AmauiStyle.AmauiTheme.furthest(window.document.getElementById('a14'));

        return item.element.id || item.element.tagName.toLowerCase();
      }, { browsers });

      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eq('body'));
    });

    to('first', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const item = window.AmauiStyle.AmauiTheme.first(window.document.getElementById('a14'));

        return item.element.id || item.element.tagName.toLowerCase();
      }, { browsers });

      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eq('a14'));
    });

    to('last', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const item = window.AmauiStyle.AmauiTheme.last(window.document.getElementById('a14'));

        return item.element.id || item.element.tagName.toLowerCase();
      }, { browsers });

      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eq('body'));
    });

    group('get', () => {

      to('0', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const item = window.AmauiStyle.AmauiTheme.get(window.document.getElementById('a14'), 0);

          return item.element.id || item.element.tagName.toLowerCase();
        }, { browsers });

        const values = [...valueBrowsers];

        values.forEach(value => assert(value).eq('a14'));
      });

      to('1', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const item = window.AmauiStyle.AmauiTheme.get(window.document.getElementById('a14'), 1);

          return item.element.id || item.element.tagName.toLowerCase();
        }, { browsers });

        const values = [...valueBrowsers];

        values.forEach(value => assert(value).eq('a1'));
      });

      to('-1', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const item = window.AmauiStyle.AmauiTheme.get(window.document.getElementById('a14'), -1);

          return item.element.id || item.element.tagName.toLowerCase();
        }, { browsers });

        const values = [...valueBrowsers];

        values.forEach(value => assert(value).eq('body'));
      });

    });

  });

  group('amauiTheme', () => {

    to('amauiTheme', async () => {
      // Browser
      const valueBrowsers = await evaluate((window: any) => {
        window.document.body.dir = 'rtl';

        const amauiTheme = new window.AmauiStyle.AmauiTheme(undefined, window.document.body, { rule: { prefix: false } });

        const response = [
          typeof amauiTheme.id === 'string',
          amauiTheme.element instanceof HTMLElement,
          amauiTheme.element.tagName.toLowerCase(),
          amauiTheme.options,
          Object.keys(amauiTheme.methods),
          Object.keys(amauiTheme.methods['palette']),
          Object.keys(amauiTheme.methods['palette']).map(item => Object.keys(amauiTheme.methods['palette'][item]).every(item_ => window.AmauiUtils.is('function', amauiTheme.methods['palette'][item][item_]))),
          Object.keys(amauiTheme.methods).filter(item => item !== 'palette').map(item => Object.keys(amauiTheme.methods[item]).every(item_ => window.AmauiUtils.is('function', amauiTheme.methods[item][item_]))),
        ];

        delete amauiTheme.id;
        delete amauiTheme.element;
        delete amauiTheme.methods;
        delete amauiTheme.subscriptions;

        amauiTheme.breakpoints = { values: amauiTheme.breakpoints.values, unit: amauiTheme.breakpoints.unit };
        amauiTheme.space = { values: amauiTheme.space.values, unit: amauiTheme.space.unit };

        response.push({ ...amauiTheme });

        return response;
      }, { browsers });

      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eql([
        true,
        true,
        "body",
        {
          "rule": {
            "prefix": false,
            "sort": true,
            "rtl": true
          }
        },
        [
          "palette",
          "space",
          "breakpoints",
          "transitions"
        ],
        [
          "image",
          "color"
        ],
        [
          true,
          true
        ],
        [
          true,
          true,
          true
        ],
        {
          "direction": "rtl",
          "preference": {
            "background": {
              "default": "neutral"
            },
            "text": {
              "default": "neutral"
            },
            "visual_contrast": {
              "default": "regular"
            }
          },
          "mode": "regular",
          "palette": {
            "light": true,
            "accessibility": "regular",
            "visual_contrast": {
              "low": {
                "opacity": {
                  "primary": 0.77,
                  "secondary": 0.44,
                  "tertiary": 0.27,
                  "quaternary": 0.14,
                  "active": 0.44,
                  "disabled": 0.27,
                  "drag": 0.14,
                  "divider": 0.13,
                  "press": 0.1,
                  "focus": 0.07,
                  "selected": 0.05,
                  "hover": 0.03
                },
                "contrast_threshold": 2.4
              },
              "regular": {
                "opacity": {
                  "primary": 0.87,
                  "secondary": 0.54,
                  "tertiary": 0.37,
                  "quaternary": 0.24,
                  "active": 0.54,
                  "disabled": 0.37,
                  "drag": 0.16,
                  "divider": 0.14,
                  "press": 0.12,
                  "focus": 0.11,
                  "selected": 0.07,
                  "hover": 0.04
                },
                "contrast_threshold": 3
              },
              "high": {
                "opacity": {
                  "primary": 1,
                  "secondary": 0.74,
                  "tertiary": 0.57,
                  "quaternary": 0.44,
                  "active": 0.74,
                  "disabled": 0.57,
                  "drag": 0.27,
                  "divider": 0.24,
                  "press": 0.22,
                  "focus": 0.21,
                  "selected": 0.17,
                  "hover": 0.14
                },
                "contrast_threshold": 4
              },
              "default": {
                "opacity": {
                  "primary": 0.87,
                  "secondary": 0.54,
                  "tertiary": 0.37,
                  "quaternary": 0.24,
                  "active": 0.54,
                  "disabled": 0.37,
                  "drag": 0.16,
                  "divider": 0.14,
                  "press": 0.12,
                  "focus": 0.11,
                  "selected": 0.07,
                  "hover": 0.04
                },
                "contrast_threshold": 3
              }
            },
            "color": {
              "primary": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(5, 5, 0)",
                "5": "rgb(26, 23, 0)",
                "10": "rgb(51, 46, 0)",
                "20": "rgb(102, 92, 0)",
                "30": "rgb(153, 138, 0)",
                "40": "rgb(204, 184, 0)",
                "50": "rgb(255, 230, 0)",
                "60": "rgb(255, 235, 51)",
                "70": "rgb(255, 240, 102)",
                "80": "rgb(255, 245, 153)",
                "90": "rgb(255, 250, 204)",
                "95": "rgb(255, 252, 229)",
                "99": "rgb(255, 254, 250)",
                "100": "rgb(255, 255, 255)",
                "main": "#FFEB3B",
                "light": "#FFF176",
                "dark": "#FBC02D"
              },
              "secondary": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(3, 4, 1)",
                "5": "rgb(13, 19, 6)",
                "10": "rgb(26, 38, 13)",
                "20": "rgb(53, 77, 26)",
                "30": "rgb(79, 115, 38)",
                "40": "rgb(105, 153, 51)",
                "50": "rgb(132, 191, 64)",
                "60": "rgb(156, 204, 102)",
                "70": "rgb(181, 217, 140)",
                "80": "rgb(206, 230, 179)",
                "90": "rgb(230, 242, 217)",
                "95": "rgb(243, 249, 236)",
                "99": "rgb(253, 254, 251)",
                "100": "rgb(255, 255, 255)",
                "main": "#8BC34A",
                "light": "#AED581",
                "dark": "#689F38"
              },
              "tertiary": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(5, 4, 0)",
                "5": "rgb(26, 19, 0)",
                "10": "rgb(51, 38, 0)",
                "20": "rgb(102, 77, 0)",
                "30": "rgb(153, 115, 0)",
                "40": "rgb(204, 153, 0)",
                "50": "rgb(255, 191, 0)",
                "60": "rgb(255, 204, 51)",
                "70": "rgb(255, 217, 102)",
                "80": "rgb(255, 230, 153)",
                "90": "rgb(255, 242, 204)",
                "95": "rgb(255, 249, 229)",
                "99": "rgb(255, 254, 250)",
                "100": "rgb(255, 255, 255)",
                "main": "#FFC107",
                "light": "#FFD54F",
                "dark": "#FFA000"
              },
              "quaternary": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(0, 5, 5)",
                "5": "rgb(0, 23, 26)",
                "10": "rgb(0, 45, 51)",
                "20": "rgb(0, 90, 102)",
                "30": "rgb(0, 135, 153)",
                "40": "rgb(0, 180, 204)",
                "50": "rgb(0, 225, 255)",
                "60": "rgb(51, 231, 255)",
                "70": "rgb(102, 237, 255)",
                "80": "rgb(153, 243, 255)",
                "90": "rgb(204, 249, 255)",
                "95": "rgb(229, 252, 255)",
                "99": "rgb(250, 254, 255)",
                "100": "rgb(255, 255, 255)",
                "main": "#00BCD4",
                "light": "#4DD0E1",
                "dark": "#0097A7"
              },
              "info": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(0, 3, 5)",
                "5": "rgb(0, 17, 25)",
                "10": "rgb(1, 35, 50)",
                "20": "rgb(1, 69, 101)",
                "30": "rgb(2, 104, 151)",
                "40": "rgb(2, 139, 202)",
                "50": "rgb(3, 173, 252)",
                "60": "rgb(53, 190, 253)",
                "70": "rgb(104, 206, 253)",
                "80": "rgb(154, 222, 254)",
                "90": "rgb(205, 239, 254)",
                "95": "rgb(230, 247, 255)",
                "99": "rgb(250, 253, 255)",
                "100": "rgb(255, 255, 255)",
                "main": "#03A9F4",
                "light": "#4FC3F7",
                "dark": "#0288D1"
              },
              "success": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(2, 4, 2)",
                "5": "rgb(8, 18, 8)",
                "10": "rgb(16, 35, 16)",
                "20": "rgb(31, 71, 32)",
                "30": "rgb(47, 106, 49)",
                "40": "rgb(62, 142, 65)",
                "50": "rgb(78, 177, 81)",
                "60": "rgb(113, 193, 116)",
                "70": "rgb(149, 208, 151)",
                "80": "rgb(184, 224, 185)",
                "90": "rgb(220, 239, 220)",
                "95": "rgb(237, 247, 238)",
                "99": "rgb(251, 253, 252)",
                "100": "rgb(255, 255, 255)",
                "main": "#4CAF50",
                "light": "#81C784",
                "dark": "#388E3C"
              },
              "warning": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(5, 3, 0)",
                "5": "rgb(26, 15, 0)",
                "10": "rgb(51, 31, 0)",
                "20": "rgb(102, 61, 0)",
                "30": "rgb(153, 92, 0)",
                "40": "rgb(204, 122, 0)",
                "50": "rgb(255, 153, 0)",
                "60": "rgb(255, 173, 51)",
                "70": "rgb(255, 194, 102)",
                "80": "rgb(255, 214, 153)",
                "90": "rgb(255, 235, 204)",
                "95": "rgb(255, 245, 229)",
                "99": "rgb(255, 253, 250)",
                "100": "rgb(255, 255, 255)",
                "main": "#FF9800",
                "light": "#FFB74D",
                "dark": "#F57C00"
              },
              "error": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(5, 1, 0)",
                "5": "rgb(26, 6, 0)",
                "10": "rgb(51, 12, 0)",
                "20": "rgb(102, 24, 0)",
                "30": "rgb(153, 36, 0)",
                "40": "rgb(204, 48, 0)",
                "50": "rgb(255, 60, 0)",
                "60": "rgb(255, 99, 51)",
                "70": "rgb(255, 138, 102)",
                "80": "rgb(255, 177, 153)",
                "90": "rgb(255, 216, 204)",
                "95": "rgb(255, 235, 229)",
                "99": "rgb(255, 251, 250)",
                "100": "rgb(255, 255, 255)",
                "main": "#FF5722",
                "light": "#FF8A65",
                "dark": "#E64A19"
              },
              "neutral": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(3, 3, 3)",
                "5": "rgb(13, 13, 13)",
                "10": "rgb(26, 26, 26)",
                "20": "rgb(51, 51, 51)",
                "30": "rgb(77, 77, 77)",
                "40": "rgb(102, 102, 102)",
                "50": "rgb(128, 128, 128)",
                "60": "rgb(153, 153, 153)",
                "70": "rgb(179, 179, 179)",
                "80": "rgb(204, 204, 204)",
                "90": "rgb(230, 230, 230)",
                "95": "rgb(242, 242, 242)",
                "99": "rgb(252, 252, 252)",
                "100": "rgb(255, 255, 255)",
                "main": "#000000",
                "light": "rgb(26, 26, 26)",
                "dark": "rgb(26, 26, 26)"
              }
            },
            "text": {
              "primary": {
                "primary": "rgba(153, 138, 0, 0.87)",
                "secondary": "rgba(153, 138, 0, 0.54)",
                "tertiary": "rgba(153, 138, 0, 0.37)",
                "quaternary": "rgba(153, 138, 0, 0.24)"
              },
              "secondary": {
                "primary": "rgba(79, 115, 38, 0.87)",
                "secondary": "rgba(79, 115, 38, 0.54)",
                "tertiary": "rgba(79, 115, 38, 0.37)",
                "quaternary": "rgba(79, 115, 38, 0.24)"
              },
              "tertiary": {
                "primary": "rgba(153, 115, 0, 0.87)",
                "secondary": "rgba(153, 115, 0, 0.54)",
                "tertiary": "rgba(153, 115, 0, 0.37)",
                "quaternary": "rgba(153, 115, 0, 0.24)"
              },
              "quaternary": {
                "primary": "rgba(0, 135, 153, 0.87)",
                "secondary": "rgba(0, 135, 153, 0.54)",
                "tertiary": "rgba(0, 135, 153, 0.37)",
                "quaternary": "rgba(0, 135, 153, 0.24)"
              },
              "info": {
                "primary": "rgba(2, 104, 151, 0.87)",
                "secondary": "rgba(2, 104, 151, 0.54)",
                "tertiary": "rgba(2, 104, 151, 0.37)",
                "quaternary": "rgba(2, 104, 151, 0.24)"
              },
              "success": {
                "primary": "rgba(47, 106, 49, 0.87)",
                "secondary": "rgba(47, 106, 49, 0.54)",
                "tertiary": "rgba(47, 106, 49, 0.37)",
                "quaternary": "rgba(47, 106, 49, 0.24)"
              },
              "warning": {
                "primary": "rgba(153, 92, 0, 0.87)",
                "secondary": "rgba(153, 92, 0, 0.54)",
                "tertiary": "rgba(153, 92, 0, 0.37)",
                "quaternary": "rgba(153, 92, 0, 0.24)"
              },
              "error": {
                "primary": "rgba(153, 36, 0, 0.87)",
                "secondary": "rgba(153, 36, 0, 0.54)",
                "tertiary": "rgba(153, 36, 0, 0.37)",
                "quaternary": "rgba(153, 36, 0, 0.24)"
              },
              "neutral": {
                "primary": "rgba(0, 0, 0, 0.87)",
                "secondary": "rgba(0, 0, 0, 0.54)",
                "tertiary": "rgba(0, 0, 0, 0.37)",
                "quaternary": "rgba(0, 0, 0, 0.24)"
              },
              "default": {
                "primary": "rgba(0, 0, 0, 0.87)",
                "secondary": "rgba(0, 0, 0, 0.54)",
                "tertiary": "rgba(0, 0, 0, 0.37)",
                "quaternary": "rgba(0, 0, 0, 0.24)"
              },
              "divider": "rgba(0, 0, 0, 0.14)",
              "active": "rgba(0, 0, 0, 0.54)",
              "hover": "rgba(0, 0, 0, 0.04)",
              "selected": "rgba(0, 0, 0, 0.07)",
              "focus": "rgba(0, 0, 0, 0.11)",
              "disabled": "rgba(0, 0, 0, 0.37)"
            },
            "background": {
              "primary": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(255, 254, 250)",
                "tertiary": "rgb(255, 252, 229)",
                "quaternary": "rgb(255, 250, 204)"
              },
              "secondary": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(253, 254, 251)",
                "tertiary": "rgb(243, 249, 236)",
                "quaternary": "rgb(230, 242, 217)"
              },
              "tertiary": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(255, 254, 250)",
                "tertiary": "rgb(255, 249, 229)",
                "quaternary": "rgb(255, 242, 204)"
              },
              "quaternary": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(250, 254, 255)",
                "tertiary": "rgb(229, 252, 255)",
                "quaternary": "rgb(204, 249, 255)"
              },
              "info": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(250, 253, 255)",
                "tertiary": "rgb(230, 247, 255)",
                "quaternary": "rgb(205, 239, 254)"
              },
              "success": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(251, 253, 252)",
                "tertiary": "rgb(237, 247, 238)",
                "quaternary": "rgb(220, 239, 220)"
              },
              "warning": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(255, 253, 250)",
                "tertiary": "rgb(255, 245, 229)",
                "quaternary": "rgb(255, 235, 204)"
              },
              "error": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(255, 251, 250)",
                "tertiary": "rgb(255, 235, 229)",
                "quaternary": "rgb(255, 216, 204)"
              },
              "neutral": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(252, 252, 252)",
                "tertiary": "rgb(242, 242, 242)",
                "quaternary": "rgb(230, 230, 230)"
              },
              "default": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(252, 252, 252)",
                "tertiary": "rgb(242, 242, 242)",
                "quaternary": "rgb(230, 230, 230)"
              }
            }
          },
          "shape": {
            "radius": {
              "xs": 4,
              "sm": 8,
              "md": 12,
              "lg": 16,
              "xl": 28
            }
          },
          "breakpoints": {
            "values": {
              "xs": 0,
              "sm": 600,
              "md": 1240,
              "lg": 1440,
              "xl": 1920
            },
            "unit": "px"
          },
          "space": {
            "values": {
              "xs": 4,
              "sm": 8,
              "md": 16,
              "lg": 32,
              "xl": 64
            },
            "unit": 8
          },
          "shadows": {
            "values": {
              "primary": {
                "0": "none",
                "1": "0px 1px 1px 0px rgba(255, 235, 59, 0.14), 0px 2px 1px -1px rgba(255, 235, 59, 0.11), 0px 1px 3px 0px rgba(255, 235, 59, 0.17)",
                "2": "0px 2px 2px 0px rgba(255, 235, 59, 0.14), 0px 3px 3px -2px rgba(255, 235, 59, 0.11), 0px 1px 8px 0px rgba(255, 235, 59, 0.17)",
                "3": "0px 3px 4px 0px rgba(255, 235, 59, 0.14), 0px 3px 3px -2px rgba(255, 235, 59, 0.11), 0px 1px 8px 0px rgba(255, 235, 59, 0.17)",
                "4": "0px 4px 5px 0px rgba(255, 235, 59, 0.14), 0px 1px 10px 0px rgba(255, 235, 59, 0.11), 0px 2px 4px -1px rgba(255, 235, 59, 0.17)",
                "6": "0px 6px 10px 0px rgba(255, 235, 59, 0.14), 0px 1px 18px 0px rgba(255, 235, 59, 0.11), 0px 3px 5px -1px rgba(255, 235, 59, 0.17)",
                "8": "0px 8px 10px 1px rgba(255, 235, 59, 0.14), 0px 3px 14px 2px rgba(255, 235, 59, 0.11), 0px 5px 5px -3px rgba(255, 235, 59, 0.17)",
                "9": "0px 9px 12px 1px rgba(255, 235, 59, 0.14), 0px 3px 16px 2px rgba(255, 235, 59, 0.11), 0px 5px 6px -3px rgba(255, 235, 59, 0.17)",
                "12": "0px 12px 17px 2px rgba(255, 235, 59, 0.14), 0px 5px 22px 4px rgba(255, 235, 59, 0.11), 0px 7px 7px -4px rgba(255, 235, 59, 0.17)",
                "16": "0px 16px 24px 2px rgba(255, 235, 59, 0.14), 0px 6px 30px 5px rgba(255, 235, 59, 0.11), 0px 8px 10px -5px rgba(255, 235, 59, 0.17)",
                "24": "0px 24px 37px 3px rgba(255, 235, 59, 0.14), 0px 9px 46px 8px rgba(255, 235, 59, 0.11), 0px 11px 15px -7px rgba(255, 235, 59, 0.17)"
              },
              "secondary": {
                "0": "none",
                "1": "0px 1px 1px 0px rgba(139, 195, 74, 0.14), 0px 2px 1px -1px rgba(139, 195, 74, 0.11), 0px 1px 3px 0px rgba(139, 195, 74, 0.17)",
                "2": "0px 2px 2px 0px rgba(139, 195, 74, 0.14), 0px 3px 3px -2px rgba(139, 195, 74, 0.11), 0px 1px 8px 0px rgba(139, 195, 74, 0.17)",
                "3": "0px 3px 4px 0px rgba(139, 195, 74, 0.14), 0px 3px 3px -2px rgba(139, 195, 74, 0.11), 0px 1px 8px 0px rgba(139, 195, 74, 0.17)",
                "4": "0px 4px 5px 0px rgba(139, 195, 74, 0.14), 0px 1px 10px 0px rgba(139, 195, 74, 0.11), 0px 2px 4px -1px rgba(139, 195, 74, 0.17)",
                "6": "0px 6px 10px 0px rgba(139, 195, 74, 0.14), 0px 1px 18px 0px rgba(139, 195, 74, 0.11), 0px 3px 5px -1px rgba(139, 195, 74, 0.17)",
                "8": "0px 8px 10px 1px rgba(139, 195, 74, 0.14), 0px 3px 14px 2px rgba(139, 195, 74, 0.11), 0px 5px 5px -3px rgba(139, 195, 74, 0.17)",
                "9": "0px 9px 12px 1px rgba(139, 195, 74, 0.14), 0px 3px 16px 2px rgba(139, 195, 74, 0.11), 0px 5px 6px -3px rgba(139, 195, 74, 0.17)",
                "12": "0px 12px 17px 2px rgba(139, 195, 74, 0.14), 0px 5px 22px 4px rgba(139, 195, 74, 0.11), 0px 7px 7px -4px rgba(139, 195, 74, 0.17)",
                "16": "0px 16px 24px 2px rgba(139, 195, 74, 0.14), 0px 6px 30px 5px rgba(139, 195, 74, 0.11), 0px 8px 10px -5px rgba(139, 195, 74, 0.17)",
                "24": "0px 24px 37px 3px rgba(139, 195, 74, 0.14), 0px 9px 46px 8px rgba(139, 195, 74, 0.11), 0px 11px 15px -7px rgba(139, 195, 74, 0.17)"
              },
              "tertiary": {
                "0": "none",
                "1": "0px 1px 1px 0px rgba(255, 193, 7, 0.14), 0px 2px 1px -1px rgba(255, 193, 7, 0.11), 0px 1px 3px 0px rgba(255, 193, 7, 0.17)",
                "2": "0px 2px 2px 0px rgba(255, 193, 7, 0.14), 0px 3px 3px -2px rgba(255, 193, 7, 0.11), 0px 1px 8px 0px rgba(255, 193, 7, 0.17)",
                "3": "0px 3px 4px 0px rgba(255, 193, 7, 0.14), 0px 3px 3px -2px rgba(255, 193, 7, 0.11), 0px 1px 8px 0px rgba(255, 193, 7, 0.17)",
                "4": "0px 4px 5px 0px rgba(255, 193, 7, 0.14), 0px 1px 10px 0px rgba(255, 193, 7, 0.11), 0px 2px 4px -1px rgba(255, 193, 7, 0.17)",
                "6": "0px 6px 10px 0px rgba(255, 193, 7, 0.14), 0px 1px 18px 0px rgba(255, 193, 7, 0.11), 0px 3px 5px -1px rgba(255, 193, 7, 0.17)",
                "8": "0px 8px 10px 1px rgba(255, 193, 7, 0.14), 0px 3px 14px 2px rgba(255, 193, 7, 0.11), 0px 5px 5px -3px rgba(255, 193, 7, 0.17)",
                "9": "0px 9px 12px 1px rgba(255, 193, 7, 0.14), 0px 3px 16px 2px rgba(255, 193, 7, 0.11), 0px 5px 6px -3px rgba(255, 193, 7, 0.17)",
                "12": "0px 12px 17px 2px rgba(255, 193, 7, 0.14), 0px 5px 22px 4px rgba(255, 193, 7, 0.11), 0px 7px 7px -4px rgba(255, 193, 7, 0.17)",
                "16": "0px 16px 24px 2px rgba(255, 193, 7, 0.14), 0px 6px 30px 5px rgba(255, 193, 7, 0.11), 0px 8px 10px -5px rgba(255, 193, 7, 0.17)",
                "24": "0px 24px 37px 3px rgba(255, 193, 7, 0.14), 0px 9px 46px 8px rgba(255, 193, 7, 0.11), 0px 11px 15px -7px rgba(255, 193, 7, 0.17)"
              },
              "quaternary": {
                "0": "none",
                "1": "0px 1px 1px 0px rgba(0, 188, 212, 0.14), 0px 2px 1px -1px rgba(0, 188, 212, 0.11), 0px 1px 3px 0px rgba(0, 188, 212, 0.17)",
                "2": "0px 2px 2px 0px rgba(0, 188, 212, 0.14), 0px 3px 3px -2px rgba(0, 188, 212, 0.11), 0px 1px 8px 0px rgba(0, 188, 212, 0.17)",
                "3": "0px 3px 4px 0px rgba(0, 188, 212, 0.14), 0px 3px 3px -2px rgba(0, 188, 212, 0.11), 0px 1px 8px 0px rgba(0, 188, 212, 0.17)",
                "4": "0px 4px 5px 0px rgba(0, 188, 212, 0.14), 0px 1px 10px 0px rgba(0, 188, 212, 0.11), 0px 2px 4px -1px rgba(0, 188, 212, 0.17)",
                "6": "0px 6px 10px 0px rgba(0, 188, 212, 0.14), 0px 1px 18px 0px rgba(0, 188, 212, 0.11), 0px 3px 5px -1px rgba(0, 188, 212, 0.17)",
                "8": "0px 8px 10px 1px rgba(0, 188, 212, 0.14), 0px 3px 14px 2px rgba(0, 188, 212, 0.11), 0px 5px 5px -3px rgba(0, 188, 212, 0.17)",
                "9": "0px 9px 12px 1px rgba(0, 188, 212, 0.14), 0px 3px 16px 2px rgba(0, 188, 212, 0.11), 0px 5px 6px -3px rgba(0, 188, 212, 0.17)",
                "12": "0px 12px 17px 2px rgba(0, 188, 212, 0.14), 0px 5px 22px 4px rgba(0, 188, 212, 0.11), 0px 7px 7px -4px rgba(0, 188, 212, 0.17)",
                "16": "0px 16px 24px 2px rgba(0, 188, 212, 0.14), 0px 6px 30px 5px rgba(0, 188, 212, 0.11), 0px 8px 10px -5px rgba(0, 188, 212, 0.17)",
                "24": "0px 24px 37px 3px rgba(0, 188, 212, 0.14), 0px 9px 46px 8px rgba(0, 188, 212, 0.11), 0px 11px 15px -7px rgba(0, 188, 212, 0.17)"
              },
              "info": {
                "0": "none",
                "1": "0px 1px 1px 0px rgba(3, 169, 244, 0.14), 0px 2px 1px -1px rgba(3, 169, 244, 0.11), 0px 1px 3px 0px rgba(3, 169, 244, 0.17)",
                "2": "0px 2px 2px 0px rgba(3, 169, 244, 0.14), 0px 3px 3px -2px rgba(3, 169, 244, 0.11), 0px 1px 8px 0px rgba(3, 169, 244, 0.17)",
                "3": "0px 3px 4px 0px rgba(3, 169, 244, 0.14), 0px 3px 3px -2px rgba(3, 169, 244, 0.11), 0px 1px 8px 0px rgba(3, 169, 244, 0.17)",
                "4": "0px 4px 5px 0px rgba(3, 169, 244, 0.14), 0px 1px 10px 0px rgba(3, 169, 244, 0.11), 0px 2px 4px -1px rgba(3, 169, 244, 0.17)",
                "6": "0px 6px 10px 0px rgba(3, 169, 244, 0.14), 0px 1px 18px 0px rgba(3, 169, 244, 0.11), 0px 3px 5px -1px rgba(3, 169, 244, 0.17)",
                "8": "0px 8px 10px 1px rgba(3, 169, 244, 0.14), 0px 3px 14px 2px rgba(3, 169, 244, 0.11), 0px 5px 5px -3px rgba(3, 169, 244, 0.17)",
                "9": "0px 9px 12px 1px rgba(3, 169, 244, 0.14), 0px 3px 16px 2px rgba(3, 169, 244, 0.11), 0px 5px 6px -3px rgba(3, 169, 244, 0.17)",
                "12": "0px 12px 17px 2px rgba(3, 169, 244, 0.14), 0px 5px 22px 4px rgba(3, 169, 244, 0.11), 0px 7px 7px -4px rgba(3, 169, 244, 0.17)",
                "16": "0px 16px 24px 2px rgba(3, 169, 244, 0.14), 0px 6px 30px 5px rgba(3, 169, 244, 0.11), 0px 8px 10px -5px rgba(3, 169, 244, 0.17)",
                "24": "0px 24px 37px 3px rgba(3, 169, 244, 0.14), 0px 9px 46px 8px rgba(3, 169, 244, 0.11), 0px 11px 15px -7px rgba(3, 169, 244, 0.17)"
              },
              "success": {
                "0": "none",
                "1": "0px 1px 1px 0px rgba(76, 175, 80, 0.14), 0px 2px 1px -1px rgba(76, 175, 80, 0.11), 0px 1px 3px 0px rgba(76, 175, 80, 0.17)",
                "2": "0px 2px 2px 0px rgba(76, 175, 80, 0.14), 0px 3px 3px -2px rgba(76, 175, 80, 0.11), 0px 1px 8px 0px rgba(76, 175, 80, 0.17)",
                "3": "0px 3px 4px 0px rgba(76, 175, 80, 0.14), 0px 3px 3px -2px rgba(76, 175, 80, 0.11), 0px 1px 8px 0px rgba(76, 175, 80, 0.17)",
                "4": "0px 4px 5px 0px rgba(76, 175, 80, 0.14), 0px 1px 10px 0px rgba(76, 175, 80, 0.11), 0px 2px 4px -1px rgba(76, 175, 80, 0.17)",
                "6": "0px 6px 10px 0px rgba(76, 175, 80, 0.14), 0px 1px 18px 0px rgba(76, 175, 80, 0.11), 0px 3px 5px -1px rgba(76, 175, 80, 0.17)",
                "8": "0px 8px 10px 1px rgba(76, 175, 80, 0.14), 0px 3px 14px 2px rgba(76, 175, 80, 0.11), 0px 5px 5px -3px rgba(76, 175, 80, 0.17)",
                "9": "0px 9px 12px 1px rgba(76, 175, 80, 0.14), 0px 3px 16px 2px rgba(76, 175, 80, 0.11), 0px 5px 6px -3px rgba(76, 175, 80, 0.17)",
                "12": "0px 12px 17px 2px rgba(76, 175, 80, 0.14), 0px 5px 22px 4px rgba(76, 175, 80, 0.11), 0px 7px 7px -4px rgba(76, 175, 80, 0.17)",
                "16": "0px 16px 24px 2px rgba(76, 175, 80, 0.14), 0px 6px 30px 5px rgba(76, 175, 80, 0.11), 0px 8px 10px -5px rgba(76, 175, 80, 0.17)",
                "24": "0px 24px 37px 3px rgba(76, 175, 80, 0.14), 0px 9px 46px 8px rgba(76, 175, 80, 0.11), 0px 11px 15px -7px rgba(76, 175, 80, 0.17)"
              },
              "warning": {
                "0": "none",
                "1": "0px 1px 1px 0px rgba(255, 152, 0, 0.14), 0px 2px 1px -1px rgba(255, 152, 0, 0.11), 0px 1px 3px 0px rgba(255, 152, 0, 0.17)",
                "2": "0px 2px 2px 0px rgba(255, 152, 0, 0.14), 0px 3px 3px -2px rgba(255, 152, 0, 0.11), 0px 1px 8px 0px rgba(255, 152, 0, 0.17)",
                "3": "0px 3px 4px 0px rgba(255, 152, 0, 0.14), 0px 3px 3px -2px rgba(255, 152, 0, 0.11), 0px 1px 8px 0px rgba(255, 152, 0, 0.17)",
                "4": "0px 4px 5px 0px rgba(255, 152, 0, 0.14), 0px 1px 10px 0px rgba(255, 152, 0, 0.11), 0px 2px 4px -1px rgba(255, 152, 0, 0.17)",
                "6": "0px 6px 10px 0px rgba(255, 152, 0, 0.14), 0px 1px 18px 0px rgba(255, 152, 0, 0.11), 0px 3px 5px -1px rgba(255, 152, 0, 0.17)",
                "8": "0px 8px 10px 1px rgba(255, 152, 0, 0.14), 0px 3px 14px 2px rgba(255, 152, 0, 0.11), 0px 5px 5px -3px rgba(255, 152, 0, 0.17)",
                "9": "0px 9px 12px 1px rgba(255, 152, 0, 0.14), 0px 3px 16px 2px rgba(255, 152, 0, 0.11), 0px 5px 6px -3px rgba(255, 152, 0, 0.17)",
                "12": "0px 12px 17px 2px rgba(255, 152, 0, 0.14), 0px 5px 22px 4px rgba(255, 152, 0, 0.11), 0px 7px 7px -4px rgba(255, 152, 0, 0.17)",
                "16": "0px 16px 24px 2px rgba(255, 152, 0, 0.14), 0px 6px 30px 5px rgba(255, 152, 0, 0.11), 0px 8px 10px -5px rgba(255, 152, 0, 0.17)",
                "24": "0px 24px 37px 3px rgba(255, 152, 0, 0.14), 0px 9px 46px 8px rgba(255, 152, 0, 0.11), 0px 11px 15px -7px rgba(255, 152, 0, 0.17)"
              },
              "error": {
                "0": "none",
                "1": "0px 1px 1px 0px rgba(255, 87, 34, 0.14), 0px 2px 1px -1px rgba(255, 87, 34, 0.11), 0px 1px 3px 0px rgba(255, 87, 34, 0.17)",
                "2": "0px 2px 2px 0px rgba(255, 87, 34, 0.14), 0px 3px 3px -2px rgba(255, 87, 34, 0.11), 0px 1px 8px 0px rgba(255, 87, 34, 0.17)",
                "3": "0px 3px 4px 0px rgba(255, 87, 34, 0.14), 0px 3px 3px -2px rgba(255, 87, 34, 0.11), 0px 1px 8px 0px rgba(255, 87, 34, 0.17)",
                "4": "0px 4px 5px 0px rgba(255, 87, 34, 0.14), 0px 1px 10px 0px rgba(255, 87, 34, 0.11), 0px 2px 4px -1px rgba(255, 87, 34, 0.17)",
                "6": "0px 6px 10px 0px rgba(255, 87, 34, 0.14), 0px 1px 18px 0px rgba(255, 87, 34, 0.11), 0px 3px 5px -1px rgba(255, 87, 34, 0.17)",
                "8": "0px 8px 10px 1px rgba(255, 87, 34, 0.14), 0px 3px 14px 2px rgba(255, 87, 34, 0.11), 0px 5px 5px -3px rgba(255, 87, 34, 0.17)",
                "9": "0px 9px 12px 1px rgba(255, 87, 34, 0.14), 0px 3px 16px 2px rgba(255, 87, 34, 0.11), 0px 5px 6px -3px rgba(255, 87, 34, 0.17)",
                "12": "0px 12px 17px 2px rgba(255, 87, 34, 0.14), 0px 5px 22px 4px rgba(255, 87, 34, 0.11), 0px 7px 7px -4px rgba(255, 87, 34, 0.17)",
                "16": "0px 16px 24px 2px rgba(255, 87, 34, 0.14), 0px 6px 30px 5px rgba(255, 87, 34, 0.11), 0px 8px 10px -5px rgba(255, 87, 34, 0.17)",
                "24": "0px 24px 37px 3px rgba(255, 87, 34, 0.14), 0px 9px 46px 8px rgba(255, 87, 34, 0.11), 0px 11px 15px -7px rgba(255, 87, 34, 0.17)"
              },
              "neutral": {
                "0": "none",
                "1": "0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.11), 0px 1px 3px 0px rgba(0, 0, 0, 0.17)",
                "2": "0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 3px -2px rgba(0, 0, 0, 0.11), 0px 1px 8px 0px rgba(0, 0, 0, 0.17)",
                "3": "0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 3px 3px -2px rgba(0, 0, 0, 0.11), 0px 1px 8px 0px rgba(0, 0, 0, 0.17)",
                "4": "0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.11), 0px 2px 4px -1px rgba(0, 0, 0, 0.17)",
                "6": "0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.11), 0px 3px 5px -1px rgba(0, 0, 0, 0.17)",
                "8": "0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.11), 0px 5px 5px -3px rgba(0, 0, 0, 0.17)",
                "9": "0px 9px 12px 1px rgba(0, 0, 0, 0.14), 0px 3px 16px 2px rgba(0, 0, 0, 0.11), 0px 5px 6px -3px rgba(0, 0, 0, 0.17)",
                "12": "0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.11), 0px 7px 7px -4px rgba(0, 0, 0, 0.17)",
                "16": "0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.11), 0px 8px 10px -5px rgba(0, 0, 0, 0.17)",
                "24": "0px 24px 37px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.11), 0px 11px 15px -7px rgba(0, 0, 0, 0.17)"
              }
            },
            "opacities": [
              0.14,
              0.11,
              0.17
            ]
          },
          "typography": {
            "unit": "px",
            "font_size": {
              "html": 16
            },
            "font_family": {
              "primary": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
              "secondary": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
              "mono": "Roboto Mono, monospace"
            },
            "values": {
              "d1": {
                "fontSize": "3.5625rem",
                "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
                "fontWeight": 400,
                "lineHeight": 1.1228070175438596,
                "letterSpacing": "0em"
              },
              "d2": {
                "fontSize": "2.8125rem",
                "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
                "fontWeight": 400,
                "lineHeight": 1.1555555555555554,
                "letterSpacing": "0em"
              },
              "d3": {
                "fontSize": "2.1875rem",
                "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
                "fontWeight": 400,
                "lineHeight": 1.2571428571428571,
                "letterSpacing": "0em"
              },
              "h1": {
                "fontSize": "2rem",
                "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
                "fontWeight": 400,
                "lineHeight": 1.25,
                "letterSpacing": "0em"
              },
              "h2": {
                "fontSize": "1.6875rem",
                "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
                "fontWeight": 400,
                "lineHeight": 1.2962962962962963,
                "letterSpacing": "0em"
              },
              "h3": {
                "fontSize": "1.5rem",
                "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
                "fontWeight": 400,
                "lineHeight": 1.3333333333333333,
                "letterSpacing": "0em"
              },
              "t1": {
                "fontSize": "1.3125rem",
                "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
                "fontWeight": 400,
                "lineHeight": 3.0476190476190474,
                "letterSpacing": "0em"
              },
              "t2": {
                "fontSize": "1rem",
                "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
                "fontWeight": 500,
                "lineHeight": 1.5,
                "letterSpacing": ".15em"
              },
              "t3": {
                "fontSize": "0.875rem",
                "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
                "fontWeight": 500,
                "lineHeight": 1.4285714285714286,
                "letterSpacing": ".1em"
              },
              "l1": {
                "fontSize": "0.875rem",
                "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
                "fontWeight": 500,
                "lineHeight": 1.4285714285714286,
                "letterSpacing": ".1em"
              },
              "l2": {
                "fontSize": "0.75rem",
                "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
                "fontWeight": 500,
                "lineHeight": 1.25,
                "letterSpacing": ".5em"
              },
              "l3": {
                "fontSize": "0.6875rem",
                "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
                "fontWeight": 500,
                "lineHeight": 0.45454545454545453,
                "letterSpacing": ".5em"
              },
              "b1": {
                "fontSize": "1rem",
                "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
                "fontWeight": 400,
                "lineHeight": 1.5,
                "letterSpacing": ".5em"
              },
              "b2": {
                "fontSize": "0.875rem",
                "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
                "fontWeight": 400,
                "lineHeight": 1.4285714285714286,
                "letterSpacing": ".25em"
              },
              "b3": {
                "fontSize": "0.6875rem",
                "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
                "fontWeight": 400,
                "lineHeight": 1.3636363636363635,
                "letterSpacing": ".4em"
              }
            }
          },
          "transitions": {
            "timing_function": {
              "standard": "cubic-bezier(.4, 0, .2, 1)",
              "emphasized": "cubic-bezier(.4, 0, .6, 1) ",
              "decelerated": "cubic-bezier(0, 0, .2, 1)",
              "accelerated": "cubic-bezier(.4, 0, 1, 1)"
            },
            "duration": {
              "smallest": 100,
              "smaller": 200,
              "small": 250,
              "regular": 300,
              "enter": 250,
              "leave": 200,
              "complex": 500
            }
          },
          "z_index": {
            "tooltip": 1700,
            "modal": 1500,
            "menu_modal": 1400,
            "menu": 1300,
            "button_float": 1200,
            "app_bar": 1100,
            "main": 1000,
            "text": 0
          },
          "options": {
            "rule": {
              "prefix": false,
              "sort": true,
              "rtl": true
            }
          },
          "hash": "0xa84825a47165f38b9994e562e0ab198ef4f31a16d2fe03445c9c6afc32225c51"
        }
      ]));

      // Node
      const amauiTheme = new AmauiStyle.AmauiTheme(undefined, undefined, { rule: { prefix: false } });

      const response = [
        typeof amauiTheme.id === 'string',
        amauiTheme.options,
        Object.keys(amauiTheme.methods),
        Object.keys(amauiTheme.methods['palette']),
        Object.keys(amauiTheme.methods['palette']).map(item => Object.keys(amauiTheme.methods['palette'][item]).every(item_ => AmauiUtils.is('function', amauiTheme.methods['palette'][item][item_]))),
        Object.keys(amauiTheme.methods).filter(item => item !== 'palette').map(item => Object.keys(amauiTheme.methods[item]).every(item_ => AmauiUtils.is('function', amauiTheme.methods[item][item_]))),
      ];

      delete amauiTheme.id;
      delete amauiTheme.element;
      delete amauiTheme.methods;
      delete amauiTheme.subscriptions;

      amauiTheme.breakpoints = { values: amauiTheme.breakpoints.values, unit: amauiTheme.breakpoints.unit };
      amauiTheme.space = { values: amauiTheme.space.values, unit: amauiTheme.space.unit };

      response.push({ ...(amauiTheme as any) });

      const valueNode = response;

      assert(valueNode).eql([
        true,
        {
          "rule": {
            "prefix": false,
            "sort": true,
            "rtl": false
          }
        },
        [
          "palette",
          "space",
          "breakpoints",
          "transitions"
        ],
        [
          "image",
          "color"
        ],
        [
          true,
          true
        ],
        [
          true,
          true,
          true
        ],
        {
          "direction": "ltr",
          "preference": {
            "background": {
              "default": "neutral"
            },
            "text": {
              "default": "neutral"
            },
            "visual_contrast": {
              "default": "regular"
            }
          },
          "mode": "regular",
          "palette": {
            "light": true,
            "accessibility": "regular",
            "visual_contrast": {
              "low": {
                "opacity": {
                  "primary": 0.77,
                  "secondary": 0.44,
                  "tertiary": 0.27,
                  "quaternary": 0.14,
                  "active": 0.44,
                  "disabled": 0.27,
                  "drag": 0.14,
                  "divider": 0.13,
                  "press": 0.1,
                  "focus": 0.07,
                  "selected": 0.05,
                  "hover": 0.03
                },
                "contrast_threshold": 2.4
              },
              "regular": {
                "opacity": {
                  "primary": 0.87,
                  "secondary": 0.54,
                  "tertiary": 0.37,
                  "quaternary": 0.24,
                  "active": 0.54,
                  "disabled": 0.37,
                  "drag": 0.16,
                  "divider": 0.14,
                  "press": 0.12,
                  "focus": 0.11,
                  "selected": 0.07,
                  "hover": 0.04
                },
                "contrast_threshold": 3
              },
              "high": {
                "opacity": {
                  "primary": 1,
                  "secondary": 0.74,
                  "tertiary": 0.57,
                  "quaternary": 0.44,
                  "active": 0.74,
                  "disabled": 0.57,
                  "drag": 0.27,
                  "divider": 0.24,
                  "press": 0.22,
                  "focus": 0.21,
                  "selected": 0.17,
                  "hover": 0.14
                },
                "contrast_threshold": 4
              },
              "default": {
                "opacity": {
                  "primary": 0.87,
                  "secondary": 0.54,
                  "tertiary": 0.37,
                  "quaternary": 0.24,
                  "active": 0.54,
                  "disabled": 0.37,
                  "drag": 0.16,
                  "divider": 0.14,
                  "press": 0.12,
                  "focus": 0.11,
                  "selected": 0.07,
                  "hover": 0.04
                },
                "contrast_threshold": 3
              }
            },
            "color": {
              "primary": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(5, 5, 0)",
                "5": "rgb(26, 23, 0)",
                "10": "rgb(51, 46, 0)",
                "20": "rgb(102, 92, 0)",
                "30": "rgb(153, 138, 0)",
                "40": "rgb(204, 184, 0)",
                "50": "rgb(255, 230, 0)",
                "60": "rgb(255, 235, 51)",
                "70": "rgb(255, 240, 102)",
                "80": "rgb(255, 245, 153)",
                "90": "rgb(255, 250, 204)",
                "95": "rgb(255, 252, 229)",
                "99": "rgb(255, 254, 250)",
                "100": "rgb(255, 255, 255)",
                "main": "#FFEB3B",
                "light": "#FFF176",
                "dark": "#FBC02D"
              },
              "secondary": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(3, 4, 1)",
                "5": "rgb(13, 19, 6)",
                "10": "rgb(26, 38, 13)",
                "20": "rgb(53, 77, 26)",
                "30": "rgb(79, 115, 38)",
                "40": "rgb(105, 153, 51)",
                "50": "rgb(132, 191, 64)",
                "60": "rgb(156, 204, 102)",
                "70": "rgb(181, 217, 140)",
                "80": "rgb(206, 230, 179)",
                "90": "rgb(230, 242, 217)",
                "95": "rgb(243, 249, 236)",
                "99": "rgb(253, 254, 251)",
                "100": "rgb(255, 255, 255)",
                "main": "#8BC34A",
                "light": "#AED581",
                "dark": "#689F38"
              },
              "tertiary": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(5, 4, 0)",
                "5": "rgb(26, 19, 0)",
                "10": "rgb(51, 38, 0)",
                "20": "rgb(102, 77, 0)",
                "30": "rgb(153, 115, 0)",
                "40": "rgb(204, 153, 0)",
                "50": "rgb(255, 191, 0)",
                "60": "rgb(255, 204, 51)",
                "70": "rgb(255, 217, 102)",
                "80": "rgb(255, 230, 153)",
                "90": "rgb(255, 242, 204)",
                "95": "rgb(255, 249, 229)",
                "99": "rgb(255, 254, 250)",
                "100": "rgb(255, 255, 255)",
                "main": "#FFC107",
                "light": "#FFD54F",
                "dark": "#FFA000"
              },
              "quaternary": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(0, 5, 5)",
                "5": "rgb(0, 23, 26)",
                "10": "rgb(0, 45, 51)",
                "20": "rgb(0, 90, 102)",
                "30": "rgb(0, 135, 153)",
                "40": "rgb(0, 180, 204)",
                "50": "rgb(0, 225, 255)",
                "60": "rgb(51, 231, 255)",
                "70": "rgb(102, 237, 255)",
                "80": "rgb(153, 243, 255)",
                "90": "rgb(204, 249, 255)",
                "95": "rgb(229, 252, 255)",
                "99": "rgb(250, 254, 255)",
                "100": "rgb(255, 255, 255)",
                "main": "#00BCD4",
                "light": "#4DD0E1",
                "dark": "#0097A7"
              },
              "info": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(0, 3, 5)",
                "5": "rgb(0, 17, 25)",
                "10": "rgb(1, 35, 50)",
                "20": "rgb(1, 69, 101)",
                "30": "rgb(2, 104, 151)",
                "40": "rgb(2, 139, 202)",
                "50": "rgb(3, 173, 252)",
                "60": "rgb(53, 190, 253)",
                "70": "rgb(104, 206, 253)",
                "80": "rgb(154, 222, 254)",
                "90": "rgb(205, 239, 254)",
                "95": "rgb(230, 247, 255)",
                "99": "rgb(250, 253, 255)",
                "100": "rgb(255, 255, 255)",
                "main": "#03A9F4",
                "light": "#4FC3F7",
                "dark": "#0288D1"
              },
              "success": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(2, 4, 2)",
                "5": "rgb(8, 18, 8)",
                "10": "rgb(16, 35, 16)",
                "20": "rgb(31, 71, 32)",
                "30": "rgb(47, 106, 49)",
                "40": "rgb(62, 142, 65)",
                "50": "rgb(78, 177, 81)",
                "60": "rgb(113, 193, 116)",
                "70": "rgb(149, 208, 151)",
                "80": "rgb(184, 224, 185)",
                "90": "rgb(220, 239, 220)",
                "95": "rgb(237, 247, 238)",
                "99": "rgb(251, 253, 252)",
                "100": "rgb(255, 255, 255)",
                "main": "#4CAF50",
                "light": "#81C784",
                "dark": "#388E3C"
              },
              "warning": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(5, 3, 0)",
                "5": "rgb(26, 15, 0)",
                "10": "rgb(51, 31, 0)",
                "20": "rgb(102, 61, 0)",
                "30": "rgb(153, 92, 0)",
                "40": "rgb(204, 122, 0)",
                "50": "rgb(255, 153, 0)",
                "60": "rgb(255, 173, 51)",
                "70": "rgb(255, 194, 102)",
                "80": "rgb(255, 214, 153)",
                "90": "rgb(255, 235, 204)",
                "95": "rgb(255, 245, 229)",
                "99": "rgb(255, 253, 250)",
                "100": "rgb(255, 255, 255)",
                "main": "#FF9800",
                "light": "#FFB74D",
                "dark": "#F57C00"
              },
              "error": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(5, 1, 0)",
                "5": "rgb(26, 6, 0)",
                "10": "rgb(51, 12, 0)",
                "20": "rgb(102, 24, 0)",
                "30": "rgb(153, 36, 0)",
                "40": "rgb(204, 48, 0)",
                "50": "rgb(255, 60, 0)",
                "60": "rgb(255, 99, 51)",
                "70": "rgb(255, 138, 102)",
                "80": "rgb(255, 177, 153)",
                "90": "rgb(255, 216, 204)",
                "95": "rgb(255, 235, 229)",
                "99": "rgb(255, 251, 250)",
                "100": "rgb(255, 255, 255)",
                "main": "#FF5722",
                "light": "#FF8A65",
                "dark": "#E64A19"
              },
              "neutral": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(3, 3, 3)",
                "5": "rgb(13, 13, 13)",
                "10": "rgb(26, 26, 26)",
                "20": "rgb(51, 51, 51)",
                "30": "rgb(77, 77, 77)",
                "40": "rgb(102, 102, 102)",
                "50": "rgb(128, 128, 128)",
                "60": "rgb(153, 153, 153)",
                "70": "rgb(179, 179, 179)",
                "80": "rgb(204, 204, 204)",
                "90": "rgb(230, 230, 230)",
                "95": "rgb(242, 242, 242)",
                "99": "rgb(252, 252, 252)",
                "100": "rgb(255, 255, 255)",
                "main": "#000000",
                "light": "rgb(26, 26, 26)",
                "dark": "rgb(26, 26, 26)"
              }
            },
            "text": {
              "primary": {
                "primary": "rgba(153, 138, 0, 0.87)",
                "secondary": "rgba(153, 138, 0, 0.54)",
                "tertiary": "rgba(153, 138, 0, 0.37)",
                "quaternary": "rgba(153, 138, 0, 0.24)"
              },
              "secondary": {
                "primary": "rgba(79, 115, 38, 0.87)",
                "secondary": "rgba(79, 115, 38, 0.54)",
                "tertiary": "rgba(79, 115, 38, 0.37)",
                "quaternary": "rgba(79, 115, 38, 0.24)"
              },
              "tertiary": {
                "primary": "rgba(153, 115, 0, 0.87)",
                "secondary": "rgba(153, 115, 0, 0.54)",
                "tertiary": "rgba(153, 115, 0, 0.37)",
                "quaternary": "rgba(153, 115, 0, 0.24)"
              },
              "quaternary": {
                "primary": "rgba(0, 135, 153, 0.87)",
                "secondary": "rgba(0, 135, 153, 0.54)",
                "tertiary": "rgba(0, 135, 153, 0.37)",
                "quaternary": "rgba(0, 135, 153, 0.24)"
              },
              "info": {
                "primary": "rgba(2, 104, 151, 0.87)",
                "secondary": "rgba(2, 104, 151, 0.54)",
                "tertiary": "rgba(2, 104, 151, 0.37)",
                "quaternary": "rgba(2, 104, 151, 0.24)"
              },
              "success": {
                "primary": "rgba(47, 106, 49, 0.87)",
                "secondary": "rgba(47, 106, 49, 0.54)",
                "tertiary": "rgba(47, 106, 49, 0.37)",
                "quaternary": "rgba(47, 106, 49, 0.24)"
              },
              "warning": {
                "primary": "rgba(153, 92, 0, 0.87)",
                "secondary": "rgba(153, 92, 0, 0.54)",
                "tertiary": "rgba(153, 92, 0, 0.37)",
                "quaternary": "rgba(153, 92, 0, 0.24)"
              },
              "error": {
                "primary": "rgba(153, 36, 0, 0.87)",
                "secondary": "rgba(153, 36, 0, 0.54)",
                "tertiary": "rgba(153, 36, 0, 0.37)",
                "quaternary": "rgba(153, 36, 0, 0.24)"
              },
              "neutral": {
                "primary": "rgba(0, 0, 0, 0.87)",
                "secondary": "rgba(0, 0, 0, 0.54)",
                "tertiary": "rgba(0, 0, 0, 0.37)",
                "quaternary": "rgba(0, 0, 0, 0.24)"
              },
              "default": {
                "primary": "rgba(0, 0, 0, 0.87)",
                "secondary": "rgba(0, 0, 0, 0.54)",
                "tertiary": "rgba(0, 0, 0, 0.37)",
                "quaternary": "rgba(0, 0, 0, 0.24)"
              },
              "divider": "rgba(0, 0, 0, 0.14)",
              "active": "rgba(0, 0, 0, 0.54)",
              "hover": "rgba(0, 0, 0, 0.04)",
              "selected": "rgba(0, 0, 0, 0.07)",
              "focus": "rgba(0, 0, 0, 0.11)",
              "disabled": "rgba(0, 0, 0, 0.37)"
            },
            "background": {
              "primary": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(255, 254, 250)",
                "tertiary": "rgb(255, 252, 229)",
                "quaternary": "rgb(255, 250, 204)"
              },
              "secondary": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(253, 254, 251)",
                "tertiary": "rgb(243, 249, 236)",
                "quaternary": "rgb(230, 242, 217)"
              },
              "tertiary": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(255, 254, 250)",
                "tertiary": "rgb(255, 249, 229)",
                "quaternary": "rgb(255, 242, 204)"
              },
              "quaternary": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(250, 254, 255)",
                "tertiary": "rgb(229, 252, 255)",
                "quaternary": "rgb(204, 249, 255)"
              },
              "info": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(250, 253, 255)",
                "tertiary": "rgb(230, 247, 255)",
                "quaternary": "rgb(205, 239, 254)"
              },
              "success": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(251, 253, 252)",
                "tertiary": "rgb(237, 247, 238)",
                "quaternary": "rgb(220, 239, 220)"
              },
              "warning": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(255, 253, 250)",
                "tertiary": "rgb(255, 245, 229)",
                "quaternary": "rgb(255, 235, 204)"
              },
              "error": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(255, 251, 250)",
                "tertiary": "rgb(255, 235, 229)",
                "quaternary": "rgb(255, 216, 204)"
              },
              "neutral": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(252, 252, 252)",
                "tertiary": "rgb(242, 242, 242)",
                "quaternary": "rgb(230, 230, 230)"
              },
              "default": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(252, 252, 252)",
                "tertiary": "rgb(242, 242, 242)",
                "quaternary": "rgb(230, 230, 230)"
              }
            }
          },
          "shape": {
            "radius": {
              "xs": 4,
              "sm": 8,
              "md": 12,
              "lg": 16,
              "xl": 28
            }
          },
          "breakpoints": {
            "values": {
              "xs": 0,
              "sm": 600,
              "md": 1240,
              "lg": 1440,
              "xl": 1920
            },
            "unit": "px"
          },
          "space": {
            "values": {
              "xs": 4,
              "sm": 8,
              "md": 16,
              "lg": 32,
              "xl": 64
            },
            "unit": 8
          },
          "shadows": {
            "values": {
              "primary": {
                "0": "none",
                "1": "0px 1px 1px 0px rgba(255, 235, 59, 0.14), 0px 2px 1px -1px rgba(255, 235, 59, 0.11), 0px 1px 3px 0px rgba(255, 235, 59, 0.17)",
                "2": "0px 2px 2px 0px rgba(255, 235, 59, 0.14), 0px 3px 3px -2px rgba(255, 235, 59, 0.11), 0px 1px 8px 0px rgba(255, 235, 59, 0.17)",
                "3": "0px 3px 4px 0px rgba(255, 235, 59, 0.14), 0px 3px 3px -2px rgba(255, 235, 59, 0.11), 0px 1px 8px 0px rgba(255, 235, 59, 0.17)",
                "4": "0px 4px 5px 0px rgba(255, 235, 59, 0.14), 0px 1px 10px 0px rgba(255, 235, 59, 0.11), 0px 2px 4px -1px rgba(255, 235, 59, 0.17)",
                "6": "0px 6px 10px 0px rgba(255, 235, 59, 0.14), 0px 1px 18px 0px rgba(255, 235, 59, 0.11), 0px 3px 5px -1px rgba(255, 235, 59, 0.17)",
                "8": "0px 8px 10px 1px rgba(255, 235, 59, 0.14), 0px 3px 14px 2px rgba(255, 235, 59, 0.11), 0px 5px 5px -3px rgba(255, 235, 59, 0.17)",
                "9": "0px 9px 12px 1px rgba(255, 235, 59, 0.14), 0px 3px 16px 2px rgba(255, 235, 59, 0.11), 0px 5px 6px -3px rgba(255, 235, 59, 0.17)",
                "12": "0px 12px 17px 2px rgba(255, 235, 59, 0.14), 0px 5px 22px 4px rgba(255, 235, 59, 0.11), 0px 7px 7px -4px rgba(255, 235, 59, 0.17)",
                "16": "0px 16px 24px 2px rgba(255, 235, 59, 0.14), 0px 6px 30px 5px rgba(255, 235, 59, 0.11), 0px 8px 10px -5px rgba(255, 235, 59, 0.17)",
                "24": "0px 24px 37px 3px rgba(255, 235, 59, 0.14), 0px 9px 46px 8px rgba(255, 235, 59, 0.11), 0px 11px 15px -7px rgba(255, 235, 59, 0.17)"
              },
              "secondary": {
                "0": "none",
                "1": "0px 1px 1px 0px rgba(139, 195, 74, 0.14), 0px 2px 1px -1px rgba(139, 195, 74, 0.11), 0px 1px 3px 0px rgba(139, 195, 74, 0.17)",
                "2": "0px 2px 2px 0px rgba(139, 195, 74, 0.14), 0px 3px 3px -2px rgba(139, 195, 74, 0.11), 0px 1px 8px 0px rgba(139, 195, 74, 0.17)",
                "3": "0px 3px 4px 0px rgba(139, 195, 74, 0.14), 0px 3px 3px -2px rgba(139, 195, 74, 0.11), 0px 1px 8px 0px rgba(139, 195, 74, 0.17)",
                "4": "0px 4px 5px 0px rgba(139, 195, 74, 0.14), 0px 1px 10px 0px rgba(139, 195, 74, 0.11), 0px 2px 4px -1px rgba(139, 195, 74, 0.17)",
                "6": "0px 6px 10px 0px rgba(139, 195, 74, 0.14), 0px 1px 18px 0px rgba(139, 195, 74, 0.11), 0px 3px 5px -1px rgba(139, 195, 74, 0.17)",
                "8": "0px 8px 10px 1px rgba(139, 195, 74, 0.14), 0px 3px 14px 2px rgba(139, 195, 74, 0.11), 0px 5px 5px -3px rgba(139, 195, 74, 0.17)",
                "9": "0px 9px 12px 1px rgba(139, 195, 74, 0.14), 0px 3px 16px 2px rgba(139, 195, 74, 0.11), 0px 5px 6px -3px rgba(139, 195, 74, 0.17)",
                "12": "0px 12px 17px 2px rgba(139, 195, 74, 0.14), 0px 5px 22px 4px rgba(139, 195, 74, 0.11), 0px 7px 7px -4px rgba(139, 195, 74, 0.17)",
                "16": "0px 16px 24px 2px rgba(139, 195, 74, 0.14), 0px 6px 30px 5px rgba(139, 195, 74, 0.11), 0px 8px 10px -5px rgba(139, 195, 74, 0.17)",
                "24": "0px 24px 37px 3px rgba(139, 195, 74, 0.14), 0px 9px 46px 8px rgba(139, 195, 74, 0.11), 0px 11px 15px -7px rgba(139, 195, 74, 0.17)"
              },
              "tertiary": {
                "0": "none",
                "1": "0px 1px 1px 0px rgba(255, 193, 7, 0.14), 0px 2px 1px -1px rgba(255, 193, 7, 0.11), 0px 1px 3px 0px rgba(255, 193, 7, 0.17)",
                "2": "0px 2px 2px 0px rgba(255, 193, 7, 0.14), 0px 3px 3px -2px rgba(255, 193, 7, 0.11), 0px 1px 8px 0px rgba(255, 193, 7, 0.17)",
                "3": "0px 3px 4px 0px rgba(255, 193, 7, 0.14), 0px 3px 3px -2px rgba(255, 193, 7, 0.11), 0px 1px 8px 0px rgba(255, 193, 7, 0.17)",
                "4": "0px 4px 5px 0px rgba(255, 193, 7, 0.14), 0px 1px 10px 0px rgba(255, 193, 7, 0.11), 0px 2px 4px -1px rgba(255, 193, 7, 0.17)",
                "6": "0px 6px 10px 0px rgba(255, 193, 7, 0.14), 0px 1px 18px 0px rgba(255, 193, 7, 0.11), 0px 3px 5px -1px rgba(255, 193, 7, 0.17)",
                "8": "0px 8px 10px 1px rgba(255, 193, 7, 0.14), 0px 3px 14px 2px rgba(255, 193, 7, 0.11), 0px 5px 5px -3px rgba(255, 193, 7, 0.17)",
                "9": "0px 9px 12px 1px rgba(255, 193, 7, 0.14), 0px 3px 16px 2px rgba(255, 193, 7, 0.11), 0px 5px 6px -3px rgba(255, 193, 7, 0.17)",
                "12": "0px 12px 17px 2px rgba(255, 193, 7, 0.14), 0px 5px 22px 4px rgba(255, 193, 7, 0.11), 0px 7px 7px -4px rgba(255, 193, 7, 0.17)",
                "16": "0px 16px 24px 2px rgba(255, 193, 7, 0.14), 0px 6px 30px 5px rgba(255, 193, 7, 0.11), 0px 8px 10px -5px rgba(255, 193, 7, 0.17)",
                "24": "0px 24px 37px 3px rgba(255, 193, 7, 0.14), 0px 9px 46px 8px rgba(255, 193, 7, 0.11), 0px 11px 15px -7px rgba(255, 193, 7, 0.17)"
              },
              "quaternary": {
                "0": "none",
                "1": "0px 1px 1px 0px rgba(0, 188, 212, 0.14), 0px 2px 1px -1px rgba(0, 188, 212, 0.11), 0px 1px 3px 0px rgba(0, 188, 212, 0.17)",
                "2": "0px 2px 2px 0px rgba(0, 188, 212, 0.14), 0px 3px 3px -2px rgba(0, 188, 212, 0.11), 0px 1px 8px 0px rgba(0, 188, 212, 0.17)",
                "3": "0px 3px 4px 0px rgba(0, 188, 212, 0.14), 0px 3px 3px -2px rgba(0, 188, 212, 0.11), 0px 1px 8px 0px rgba(0, 188, 212, 0.17)",
                "4": "0px 4px 5px 0px rgba(0, 188, 212, 0.14), 0px 1px 10px 0px rgba(0, 188, 212, 0.11), 0px 2px 4px -1px rgba(0, 188, 212, 0.17)",
                "6": "0px 6px 10px 0px rgba(0, 188, 212, 0.14), 0px 1px 18px 0px rgba(0, 188, 212, 0.11), 0px 3px 5px -1px rgba(0, 188, 212, 0.17)",
                "8": "0px 8px 10px 1px rgba(0, 188, 212, 0.14), 0px 3px 14px 2px rgba(0, 188, 212, 0.11), 0px 5px 5px -3px rgba(0, 188, 212, 0.17)",
                "9": "0px 9px 12px 1px rgba(0, 188, 212, 0.14), 0px 3px 16px 2px rgba(0, 188, 212, 0.11), 0px 5px 6px -3px rgba(0, 188, 212, 0.17)",
                "12": "0px 12px 17px 2px rgba(0, 188, 212, 0.14), 0px 5px 22px 4px rgba(0, 188, 212, 0.11), 0px 7px 7px -4px rgba(0, 188, 212, 0.17)",
                "16": "0px 16px 24px 2px rgba(0, 188, 212, 0.14), 0px 6px 30px 5px rgba(0, 188, 212, 0.11), 0px 8px 10px -5px rgba(0, 188, 212, 0.17)",
                "24": "0px 24px 37px 3px rgba(0, 188, 212, 0.14), 0px 9px 46px 8px rgba(0, 188, 212, 0.11), 0px 11px 15px -7px rgba(0, 188, 212, 0.17)"
              },
              "info": {
                "0": "none",
                "1": "0px 1px 1px 0px rgba(3, 169, 244, 0.14), 0px 2px 1px -1px rgba(3, 169, 244, 0.11), 0px 1px 3px 0px rgba(3, 169, 244, 0.17)",
                "2": "0px 2px 2px 0px rgba(3, 169, 244, 0.14), 0px 3px 3px -2px rgba(3, 169, 244, 0.11), 0px 1px 8px 0px rgba(3, 169, 244, 0.17)",
                "3": "0px 3px 4px 0px rgba(3, 169, 244, 0.14), 0px 3px 3px -2px rgba(3, 169, 244, 0.11), 0px 1px 8px 0px rgba(3, 169, 244, 0.17)",
                "4": "0px 4px 5px 0px rgba(3, 169, 244, 0.14), 0px 1px 10px 0px rgba(3, 169, 244, 0.11), 0px 2px 4px -1px rgba(3, 169, 244, 0.17)",
                "6": "0px 6px 10px 0px rgba(3, 169, 244, 0.14), 0px 1px 18px 0px rgba(3, 169, 244, 0.11), 0px 3px 5px -1px rgba(3, 169, 244, 0.17)",
                "8": "0px 8px 10px 1px rgba(3, 169, 244, 0.14), 0px 3px 14px 2px rgba(3, 169, 244, 0.11), 0px 5px 5px -3px rgba(3, 169, 244, 0.17)",
                "9": "0px 9px 12px 1px rgba(3, 169, 244, 0.14), 0px 3px 16px 2px rgba(3, 169, 244, 0.11), 0px 5px 6px -3px rgba(3, 169, 244, 0.17)",
                "12": "0px 12px 17px 2px rgba(3, 169, 244, 0.14), 0px 5px 22px 4px rgba(3, 169, 244, 0.11), 0px 7px 7px -4px rgba(3, 169, 244, 0.17)",
                "16": "0px 16px 24px 2px rgba(3, 169, 244, 0.14), 0px 6px 30px 5px rgba(3, 169, 244, 0.11), 0px 8px 10px -5px rgba(3, 169, 244, 0.17)",
                "24": "0px 24px 37px 3px rgba(3, 169, 244, 0.14), 0px 9px 46px 8px rgba(3, 169, 244, 0.11), 0px 11px 15px -7px rgba(3, 169, 244, 0.17)"
              },
              "success": {
                "0": "none",
                "1": "0px 1px 1px 0px rgba(76, 175, 80, 0.14), 0px 2px 1px -1px rgba(76, 175, 80, 0.11), 0px 1px 3px 0px rgba(76, 175, 80, 0.17)",
                "2": "0px 2px 2px 0px rgba(76, 175, 80, 0.14), 0px 3px 3px -2px rgba(76, 175, 80, 0.11), 0px 1px 8px 0px rgba(76, 175, 80, 0.17)",
                "3": "0px 3px 4px 0px rgba(76, 175, 80, 0.14), 0px 3px 3px -2px rgba(76, 175, 80, 0.11), 0px 1px 8px 0px rgba(76, 175, 80, 0.17)",
                "4": "0px 4px 5px 0px rgba(76, 175, 80, 0.14), 0px 1px 10px 0px rgba(76, 175, 80, 0.11), 0px 2px 4px -1px rgba(76, 175, 80, 0.17)",
                "6": "0px 6px 10px 0px rgba(76, 175, 80, 0.14), 0px 1px 18px 0px rgba(76, 175, 80, 0.11), 0px 3px 5px -1px rgba(76, 175, 80, 0.17)",
                "8": "0px 8px 10px 1px rgba(76, 175, 80, 0.14), 0px 3px 14px 2px rgba(76, 175, 80, 0.11), 0px 5px 5px -3px rgba(76, 175, 80, 0.17)",
                "9": "0px 9px 12px 1px rgba(76, 175, 80, 0.14), 0px 3px 16px 2px rgba(76, 175, 80, 0.11), 0px 5px 6px -3px rgba(76, 175, 80, 0.17)",
                "12": "0px 12px 17px 2px rgba(76, 175, 80, 0.14), 0px 5px 22px 4px rgba(76, 175, 80, 0.11), 0px 7px 7px -4px rgba(76, 175, 80, 0.17)",
                "16": "0px 16px 24px 2px rgba(76, 175, 80, 0.14), 0px 6px 30px 5px rgba(76, 175, 80, 0.11), 0px 8px 10px -5px rgba(76, 175, 80, 0.17)",
                "24": "0px 24px 37px 3px rgba(76, 175, 80, 0.14), 0px 9px 46px 8px rgba(76, 175, 80, 0.11), 0px 11px 15px -7px rgba(76, 175, 80, 0.17)"
              },
              "warning": {
                "0": "none",
                "1": "0px 1px 1px 0px rgba(255, 152, 0, 0.14), 0px 2px 1px -1px rgba(255, 152, 0, 0.11), 0px 1px 3px 0px rgba(255, 152, 0, 0.17)",
                "2": "0px 2px 2px 0px rgba(255, 152, 0, 0.14), 0px 3px 3px -2px rgba(255, 152, 0, 0.11), 0px 1px 8px 0px rgba(255, 152, 0, 0.17)",
                "3": "0px 3px 4px 0px rgba(255, 152, 0, 0.14), 0px 3px 3px -2px rgba(255, 152, 0, 0.11), 0px 1px 8px 0px rgba(255, 152, 0, 0.17)",
                "4": "0px 4px 5px 0px rgba(255, 152, 0, 0.14), 0px 1px 10px 0px rgba(255, 152, 0, 0.11), 0px 2px 4px -1px rgba(255, 152, 0, 0.17)",
                "6": "0px 6px 10px 0px rgba(255, 152, 0, 0.14), 0px 1px 18px 0px rgba(255, 152, 0, 0.11), 0px 3px 5px -1px rgba(255, 152, 0, 0.17)",
                "8": "0px 8px 10px 1px rgba(255, 152, 0, 0.14), 0px 3px 14px 2px rgba(255, 152, 0, 0.11), 0px 5px 5px -3px rgba(255, 152, 0, 0.17)",
                "9": "0px 9px 12px 1px rgba(255, 152, 0, 0.14), 0px 3px 16px 2px rgba(255, 152, 0, 0.11), 0px 5px 6px -3px rgba(255, 152, 0, 0.17)",
                "12": "0px 12px 17px 2px rgba(255, 152, 0, 0.14), 0px 5px 22px 4px rgba(255, 152, 0, 0.11), 0px 7px 7px -4px rgba(255, 152, 0, 0.17)",
                "16": "0px 16px 24px 2px rgba(255, 152, 0, 0.14), 0px 6px 30px 5px rgba(255, 152, 0, 0.11), 0px 8px 10px -5px rgba(255, 152, 0, 0.17)",
                "24": "0px 24px 37px 3px rgba(255, 152, 0, 0.14), 0px 9px 46px 8px rgba(255, 152, 0, 0.11), 0px 11px 15px -7px rgba(255, 152, 0, 0.17)"
              },
              "error": {
                "0": "none",
                "1": "0px 1px 1px 0px rgba(255, 87, 34, 0.14), 0px 2px 1px -1px rgba(255, 87, 34, 0.11), 0px 1px 3px 0px rgba(255, 87, 34, 0.17)",
                "2": "0px 2px 2px 0px rgba(255, 87, 34, 0.14), 0px 3px 3px -2px rgba(255, 87, 34, 0.11), 0px 1px 8px 0px rgba(255, 87, 34, 0.17)",
                "3": "0px 3px 4px 0px rgba(255, 87, 34, 0.14), 0px 3px 3px -2px rgba(255, 87, 34, 0.11), 0px 1px 8px 0px rgba(255, 87, 34, 0.17)",
                "4": "0px 4px 5px 0px rgba(255, 87, 34, 0.14), 0px 1px 10px 0px rgba(255, 87, 34, 0.11), 0px 2px 4px -1px rgba(255, 87, 34, 0.17)",
                "6": "0px 6px 10px 0px rgba(255, 87, 34, 0.14), 0px 1px 18px 0px rgba(255, 87, 34, 0.11), 0px 3px 5px -1px rgba(255, 87, 34, 0.17)",
                "8": "0px 8px 10px 1px rgba(255, 87, 34, 0.14), 0px 3px 14px 2px rgba(255, 87, 34, 0.11), 0px 5px 5px -3px rgba(255, 87, 34, 0.17)",
                "9": "0px 9px 12px 1px rgba(255, 87, 34, 0.14), 0px 3px 16px 2px rgba(255, 87, 34, 0.11), 0px 5px 6px -3px rgba(255, 87, 34, 0.17)",
                "12": "0px 12px 17px 2px rgba(255, 87, 34, 0.14), 0px 5px 22px 4px rgba(255, 87, 34, 0.11), 0px 7px 7px -4px rgba(255, 87, 34, 0.17)",
                "16": "0px 16px 24px 2px rgba(255, 87, 34, 0.14), 0px 6px 30px 5px rgba(255, 87, 34, 0.11), 0px 8px 10px -5px rgba(255, 87, 34, 0.17)",
                "24": "0px 24px 37px 3px rgba(255, 87, 34, 0.14), 0px 9px 46px 8px rgba(255, 87, 34, 0.11), 0px 11px 15px -7px rgba(255, 87, 34, 0.17)"
              },
              "neutral": {
                "0": "none",
                "1": "0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.11), 0px 1px 3px 0px rgba(0, 0, 0, 0.17)",
                "2": "0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 3px -2px rgba(0, 0, 0, 0.11), 0px 1px 8px 0px rgba(0, 0, 0, 0.17)",
                "3": "0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 3px 3px -2px rgba(0, 0, 0, 0.11), 0px 1px 8px 0px rgba(0, 0, 0, 0.17)",
                "4": "0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.11), 0px 2px 4px -1px rgba(0, 0, 0, 0.17)",
                "6": "0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.11), 0px 3px 5px -1px rgba(0, 0, 0, 0.17)",
                "8": "0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.11), 0px 5px 5px -3px rgba(0, 0, 0, 0.17)",
                "9": "0px 9px 12px 1px rgba(0, 0, 0, 0.14), 0px 3px 16px 2px rgba(0, 0, 0, 0.11), 0px 5px 6px -3px rgba(0, 0, 0, 0.17)",
                "12": "0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.11), 0px 7px 7px -4px rgba(0, 0, 0, 0.17)",
                "16": "0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.11), 0px 8px 10px -5px rgba(0, 0, 0, 0.17)",
                "24": "0px 24px 37px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.11), 0px 11px 15px -7px rgba(0, 0, 0, 0.17)"
              }
            },
            "opacities": [
              0.14,
              0.11,
              0.17
            ]
          },
          "typography": {
            "unit": "px",
            "font_size": {
              "html": 16
            },
            "font_family": {
              "primary": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
              "secondary": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
              "mono": "Roboto Mono, monospace"
            },
            "values": {
              "d1": {
                "fontSize": "3.5625rem",
                "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
                "fontWeight": 400,
                "lineHeight": 1.1228070175438596,
                "letterSpacing": "0em"
              },
              "d2": {
                "fontSize": "2.8125rem",
                "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
                "fontWeight": 400,
                "lineHeight": 1.1555555555555554,
                "letterSpacing": "0em"
              },
              "d3": {
                "fontSize": "2.1875rem",
                "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
                "fontWeight": 400,
                "lineHeight": 1.2571428571428571,
                "letterSpacing": "0em"
              },
              "h1": {
                "fontSize": "2rem",
                "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
                "fontWeight": 400,
                "lineHeight": 1.25,
                "letterSpacing": "0em"
              },
              "h2": {
                "fontSize": "1.6875rem",
                "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
                "fontWeight": 400,
                "lineHeight": 1.2962962962962963,
                "letterSpacing": "0em"
              },
              "h3": {
                "fontSize": "1.5rem",
                "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
                "fontWeight": 400,
                "lineHeight": 1.3333333333333333,
                "letterSpacing": "0em"
              },
              "t1": {
                "fontSize": "1.3125rem",
                "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
                "fontWeight": 400,
                "lineHeight": 3.0476190476190474,
                "letterSpacing": "0em"
              },
              "t2": {
                "fontSize": "1rem",
                "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
                "fontWeight": 500,
                "lineHeight": 1.5,
                "letterSpacing": ".15em"
              },
              "t3": {
                "fontSize": "0.875rem",
                "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
                "fontWeight": 500,
                "lineHeight": 1.4285714285714286,
                "letterSpacing": ".1em"
              },
              "l1": {
                "fontSize": "0.875rem",
                "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
                "fontWeight": 500,
                "lineHeight": 1.4285714285714286,
                "letterSpacing": ".1em"
              },
              "l2": {
                "fontSize": "0.75rem",
                "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
                "fontWeight": 500,
                "lineHeight": 1.25,
                "letterSpacing": ".5em"
              },
              "l3": {
                "fontSize": "0.6875rem",
                "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
                "fontWeight": 500,
                "lineHeight": 0.45454545454545453,
                "letterSpacing": ".5em"
              },
              "b1": {
                "fontSize": "1rem",
                "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
                "fontWeight": 400,
                "lineHeight": 1.5,
                "letterSpacing": ".5em"
              },
              "b2": {
                "fontSize": "0.875rem",
                "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
                "fontWeight": 400,
                "lineHeight": 1.4285714285714286,
                "letterSpacing": ".25em"
              },
              "b3": {
                "fontSize": "0.6875rem",
                "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
                "fontWeight": 400,
                "lineHeight": 1.3636363636363635,
                "letterSpacing": ".4em"
              }
            }
          },
          "transitions": {
            "timing_function": {
              "standard": "cubic-bezier(.4, 0, .2, 1)",
              "emphasized": "cubic-bezier(.4, 0, .6, 1) ",
              "decelerated": "cubic-bezier(0, 0, .2, 1)",
              "accelerated": "cubic-bezier(.4, 0, 1, 1)"
            },
            "duration": {
              "smallest": 100,
              "smaller": 200,
              "small": 250,
              "regular": 300,
              "enter": 250,
              "leave": 200,
              "complex": 500
            }
          },
          "z_index": {
            "tooltip": 1700,
            "modal": 1500,
            "menu_modal": 1400,
            "menu": 1300,
            "button_float": 1200,
            "app_bar": 1100,
            "main": 1000,
            "text": 0
          },
          "options": {
            "rule": {
              "prefix": false,
              "sort": true,
              "rtl": false
            }
          },
          "hash": "0xa84825a47165f38b9994e562e0ab198ef4f31a16d2fe03445c9c6afc32225c51"
        }
      ]);
    });

    to('mode', async () => {
      // Browser
      const valueBrowsers = await evaluate((window: any) => {
        const amauiTheme = new window.AmauiStyle.AmauiTheme({
          mode: 'print'
        });

        return amauiTheme.mode;
      }, { browsers });

      // Node
      const amauiTheme = new AmauiStyle.AmauiTheme({
        mode: 'print'
      });

      const valueNode = amauiTheme.mode;

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eq('print'));
    });

    to('preference', async () => {
      // Browser
      const valueBrowsers = await evaluate((window: any) => {
        const amauiTheme = new window.AmauiStyle.AmauiTheme({
          preference: {
            text: {
              default: 'quaternary'
            },
            background: {
              default: 'primary'
            },
            visual_contrast: {
              default: 'low'
            }
          }
        });

        return amauiTheme.palette;
      }, { browsers });

      // Node
      const amauiTheme = new AmauiStyle.AmauiTheme({
        preference: {
          text: {
            default: 'quaternary'
          },
          background: {
            default: 'primary'
          },
          visual_contrast: {
            default: 'low'
          }
        }
      });

      const valueNode = amauiTheme.palette;

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql({
        "light": true,
        "accessibility": "regular",
        "visual_contrast": {
          "low": {
            "opacity": {
              "primary": 0.77,
              "secondary": 0.44,
              "tertiary": 0.27,
              "quaternary": 0.14,
              "active": 0.44,
              "disabled": 0.27,
              "drag": 0.14,
              "divider": 0.13,
              "press": 0.1,
              "focus": 0.07,
              "selected": 0.05,
              "hover": 0.03
            },
            "contrast_threshold": 2.4
          },
          "regular": {
            "opacity": {
              "primary": 0.87,
              "secondary": 0.54,
              "tertiary": 0.37,
              "quaternary": 0.24,
              "active": 0.54,
              "disabled": 0.37,
              "drag": 0.16,
              "divider": 0.14,
              "press": 0.12,
              "focus": 0.11,
              "selected": 0.07,
              "hover": 0.04
            },
            "contrast_threshold": 3
          },
          "high": {
            "opacity": {
              "primary": 1,
              "secondary": 0.74,
              "tertiary": 0.57,
              "quaternary": 0.44,
              "active": 0.74,
              "disabled": 0.57,
              "drag": 0.27,
              "divider": 0.24,
              "press": 0.22,
              "focus": 0.21,
              "selected": 0.17,
              "hover": 0.14
            },
            "contrast_threshold": 4
          },
          "default": {
            "opacity": {
              "primary": 0.77,
              "secondary": 0.44,
              "tertiary": 0.27,
              "quaternary": 0.14,
              "active": 0.44,
              "disabled": 0.27,
              "drag": 0.14,
              "divider": 0.13,
              "press": 0.1,
              "focus": 0.07,
              "selected": 0.05,
              "hover": 0.03
            },
            "contrast_threshold": 2.4
          }
        },
        "color": {
          "primary": {
            "0": "rgb(0, 0, 0)",
            "1": "rgb(5, 5, 0)",
            "5": "rgb(26, 23, 0)",
            "10": "rgb(51, 46, 0)",
            "20": "rgb(102, 92, 0)",
            "30": "rgb(153, 138, 0)",
            "40": "rgb(204, 184, 0)",
            "50": "rgb(255, 230, 0)",
            "60": "rgb(255, 235, 51)",
            "70": "rgb(255, 240, 102)",
            "80": "rgb(255, 245, 153)",
            "90": "rgb(255, 250, 204)",
            "95": "rgb(255, 252, 229)",
            "99": "rgb(255, 254, 250)",
            "100": "rgb(255, 255, 255)",
            "main": "#FFEB3B",
            "light": "#FFF176",
            "dark": "#FBC02D"
          },
          "secondary": {
            "0": "rgb(0, 0, 0)",
            "1": "rgb(3, 4, 1)",
            "5": "rgb(13, 19, 6)",
            "10": "rgb(26, 38, 13)",
            "20": "rgb(53, 77, 26)",
            "30": "rgb(79, 115, 38)",
            "40": "rgb(105, 153, 51)",
            "50": "rgb(132, 191, 64)",
            "60": "rgb(156, 204, 102)",
            "70": "rgb(181, 217, 140)",
            "80": "rgb(206, 230, 179)",
            "90": "rgb(230, 242, 217)",
            "95": "rgb(243, 249, 236)",
            "99": "rgb(253, 254, 251)",
            "100": "rgb(255, 255, 255)",
            "main": "#8BC34A",
            "light": "#AED581",
            "dark": "#689F38"
          },
          "tertiary": {
            "0": "rgb(0, 0, 0)",
            "1": "rgb(5, 4, 0)",
            "5": "rgb(26, 19, 0)",
            "10": "rgb(51, 38, 0)",
            "20": "rgb(102, 77, 0)",
            "30": "rgb(153, 115, 0)",
            "40": "rgb(204, 153, 0)",
            "50": "rgb(255, 191, 0)",
            "60": "rgb(255, 204, 51)",
            "70": "rgb(255, 217, 102)",
            "80": "rgb(255, 230, 153)",
            "90": "rgb(255, 242, 204)",
            "95": "rgb(255, 249, 229)",
            "99": "rgb(255, 254, 250)",
            "100": "rgb(255, 255, 255)",
            "main": "#FFC107",
            "light": "#FFD54F",
            "dark": "#FFA000"
          },
          "quaternary": {
            "0": "rgb(0, 0, 0)",
            "1": "rgb(0, 5, 5)",
            "5": "rgb(0, 23, 26)",
            "10": "rgb(0, 45, 51)",
            "20": "rgb(0, 90, 102)",
            "30": "rgb(0, 135, 153)",
            "40": "rgb(0, 180, 204)",
            "50": "rgb(0, 225, 255)",
            "60": "rgb(51, 231, 255)",
            "70": "rgb(102, 237, 255)",
            "80": "rgb(153, 243, 255)",
            "90": "rgb(204, 249, 255)",
            "95": "rgb(229, 252, 255)",
            "99": "rgb(250, 254, 255)",
            "100": "rgb(255, 255, 255)",
            "main": "#00BCD4",
            "light": "#4DD0E1",
            "dark": "#0097A7"
          },
          "info": {
            "0": "rgb(0, 0, 0)",
            "1": "rgb(0, 3, 5)",
            "5": "rgb(0, 17, 25)",
            "10": "rgb(1, 35, 50)",
            "20": "rgb(1, 69, 101)",
            "30": "rgb(2, 104, 151)",
            "40": "rgb(2, 139, 202)",
            "50": "rgb(3, 173, 252)",
            "60": "rgb(53, 190, 253)",
            "70": "rgb(104, 206, 253)",
            "80": "rgb(154, 222, 254)",
            "90": "rgb(205, 239, 254)",
            "95": "rgb(230, 247, 255)",
            "99": "rgb(250, 253, 255)",
            "100": "rgb(255, 255, 255)",
            "main": "#03A9F4",
            "light": "#4FC3F7",
            "dark": "#0288D1"
          },
          "success": {
            "0": "rgb(0, 0, 0)",
            "1": "rgb(2, 4, 2)",
            "5": "rgb(8, 18, 8)",
            "10": "rgb(16, 35, 16)",
            "20": "rgb(31, 71, 32)",
            "30": "rgb(47, 106, 49)",
            "40": "rgb(62, 142, 65)",
            "50": "rgb(78, 177, 81)",
            "60": "rgb(113, 193, 116)",
            "70": "rgb(149, 208, 151)",
            "80": "rgb(184, 224, 185)",
            "90": "rgb(220, 239, 220)",
            "95": "rgb(237, 247, 238)",
            "99": "rgb(251, 253, 252)",
            "100": "rgb(255, 255, 255)",
            "main": "#4CAF50",
            "light": "#81C784",
            "dark": "#388E3C"
          },
          "warning": {
            "0": "rgb(0, 0, 0)",
            "1": "rgb(5, 3, 0)",
            "5": "rgb(26, 15, 0)",
            "10": "rgb(51, 31, 0)",
            "20": "rgb(102, 61, 0)",
            "30": "rgb(153, 92, 0)",
            "40": "rgb(204, 122, 0)",
            "50": "rgb(255, 153, 0)",
            "60": "rgb(255, 173, 51)",
            "70": "rgb(255, 194, 102)",
            "80": "rgb(255, 214, 153)",
            "90": "rgb(255, 235, 204)",
            "95": "rgb(255, 245, 229)",
            "99": "rgb(255, 253, 250)",
            "100": "rgb(255, 255, 255)",
            "main": "#FF9800",
            "light": "#FFB74D",
            "dark": "#F57C00"
          },
          "error": {
            "0": "rgb(0, 0, 0)",
            "1": "rgb(5, 1, 0)",
            "5": "rgb(26, 6, 0)",
            "10": "rgb(51, 12, 0)",
            "20": "rgb(102, 24, 0)",
            "30": "rgb(153, 36, 0)",
            "40": "rgb(204, 48, 0)",
            "50": "rgb(255, 60, 0)",
            "60": "rgb(255, 99, 51)",
            "70": "rgb(255, 138, 102)",
            "80": "rgb(255, 177, 153)",
            "90": "rgb(255, 216, 204)",
            "95": "rgb(255, 235, 229)",
            "99": "rgb(255, 251, 250)",
            "100": "rgb(255, 255, 255)",
            "main": "#FF5722",
            "light": "#FF8A65",
            "dark": "#E64A19"
          },
          "neutral": {
            "0": "rgb(0, 0, 0)",
            "1": "rgb(3, 3, 3)",
            "5": "rgb(13, 13, 13)",
            "10": "rgb(26, 26, 26)",
            "20": "rgb(51, 51, 51)",
            "30": "rgb(77, 77, 77)",
            "40": "rgb(102, 102, 102)",
            "50": "rgb(128, 128, 128)",
            "60": "rgb(153, 153, 153)",
            "70": "rgb(179, 179, 179)",
            "80": "rgb(204, 204, 204)",
            "90": "rgb(230, 230, 230)",
            "95": "rgb(242, 242, 242)",
            "99": "rgb(252, 252, 252)",
            "100": "rgb(255, 255, 255)",
            "main": "#000000",
            "light": "rgb(26, 26, 26)",
            "dark": "rgb(26, 26, 26)"
          }
        },
        "text": {
          "primary": {
            "primary": "rgba(153, 138, 0, 0.77)",
            "secondary": "rgba(153, 138, 0, 0.44)",
            "tertiary": "rgba(153, 138, 0, 0.27)",
            "quaternary": "rgba(153, 138, 0, 0.14)"
          },
          "secondary": {
            "primary": "rgba(79, 115, 38, 0.77)",
            "secondary": "rgba(79, 115, 38, 0.44)",
            "tertiary": "rgba(79, 115, 38, 0.27)",
            "quaternary": "rgba(79, 115, 38, 0.14)"
          },
          "tertiary": {
            "primary": "rgba(153, 115, 0, 0.77)",
            "secondary": "rgba(153, 115, 0, 0.44)",
            "tertiary": "rgba(153, 115, 0, 0.27)",
            "quaternary": "rgba(153, 115, 0, 0.14)"
          },
          "quaternary": {
            "primary": "rgba(0, 135, 153, 0.77)",
            "secondary": "rgba(0, 135, 153, 0.44)",
            "tertiary": "rgba(0, 135, 153, 0.27)",
            "quaternary": "rgba(0, 135, 153, 0.14)"
          },
          "info": {
            "primary": "rgba(2, 104, 151, 0.77)",
            "secondary": "rgba(2, 104, 151, 0.44)",
            "tertiary": "rgba(2, 104, 151, 0.27)",
            "quaternary": "rgba(2, 104, 151, 0.14)"
          },
          "success": {
            "primary": "rgba(47, 106, 49, 0.77)",
            "secondary": "rgba(47, 106, 49, 0.44)",
            "tertiary": "rgba(47, 106, 49, 0.27)",
            "quaternary": "rgba(47, 106, 49, 0.14)"
          },
          "warning": {
            "primary": "rgba(153, 92, 0, 0.77)",
            "secondary": "rgba(153, 92, 0, 0.44)",
            "tertiary": "rgba(153, 92, 0, 0.27)",
            "quaternary": "rgba(153, 92, 0, 0.14)"
          },
          "error": {
            "primary": "rgba(153, 36, 0, 0.77)",
            "secondary": "rgba(153, 36, 0, 0.44)",
            "tertiary": "rgba(153, 36, 0, 0.27)",
            "quaternary": "rgba(153, 36, 0, 0.14)"
          },
          "neutral": {
            "primary": "rgba(0, 0, 0, 0.77)",
            "secondary": "rgba(0, 0, 0, 0.44)",
            "tertiary": "rgba(0, 0, 0, 0.27)",
            "quaternary": "rgba(0, 0, 0, 0.14)"
          },
          "default": {
            "primary": "rgba(0, 135, 153, 0.77)",
            "secondary": "rgba(0, 135, 153, 0.44)",
            "tertiary": "rgba(0, 135, 153, 0.27)",
            "quaternary": "rgba(0, 135, 153, 0.14)"
          },
          "divider": "rgba(0, 135, 153, 0.13)",
          "active": "rgba(0, 135, 153, 0.44)",
          "hover": "rgba(0, 135, 153, 0.03)",
          "selected": "rgba(0, 135, 153, 0.05)",
          "focus": "rgba(0, 135, 153, 0.07)",
          "disabled": "rgba(0, 135, 153, 0.27)"
        },
        "background": {
          "primary": {
            "primary": "rgb(255, 255, 255)",
            "secondary": "rgb(255, 254, 250)",
            "tertiary": "rgb(255, 252, 229)",
            "quaternary": "rgb(255, 250, 204)"
          },
          "secondary": {
            "primary": "rgb(255, 255, 255)",
            "secondary": "rgb(253, 254, 251)",
            "tertiary": "rgb(243, 249, 236)",
            "quaternary": "rgb(230, 242, 217)"
          },
          "tertiary": {
            "primary": "rgb(255, 255, 255)",
            "secondary": "rgb(255, 254, 250)",
            "tertiary": "rgb(255, 249, 229)",
            "quaternary": "rgb(255, 242, 204)"
          },
          "quaternary": {
            "primary": "rgb(255, 255, 255)",
            "secondary": "rgb(250, 254, 255)",
            "tertiary": "rgb(229, 252, 255)",
            "quaternary": "rgb(204, 249, 255)"
          },
          "info": {
            "primary": "rgb(255, 255, 255)",
            "secondary": "rgb(250, 253, 255)",
            "tertiary": "rgb(230, 247, 255)",
            "quaternary": "rgb(205, 239, 254)"
          },
          "success": {
            "primary": "rgb(255, 255, 255)",
            "secondary": "rgb(251, 253, 252)",
            "tertiary": "rgb(237, 247, 238)",
            "quaternary": "rgb(220, 239, 220)"
          },
          "warning": {
            "primary": "rgb(255, 255, 255)",
            "secondary": "rgb(255, 253, 250)",
            "tertiary": "rgb(255, 245, 229)",
            "quaternary": "rgb(255, 235, 204)"
          },
          "error": {
            "primary": "rgb(255, 255, 255)",
            "secondary": "rgb(255, 251, 250)",
            "tertiary": "rgb(255, 235, 229)",
            "quaternary": "rgb(255, 216, 204)"
          },
          "neutral": {
            "primary": "rgb(255, 255, 255)",
            "secondary": "rgb(252, 252, 252)",
            "tertiary": "rgb(242, 242, 242)",
            "quaternary": "rgb(230, 230, 230)"
          },
          "default": {
            "primary": "rgb(255, 255, 255)",
            "secondary": "rgb(255, 254, 250)",
            "tertiary": "rgb(255, 252, 229)",
            "quaternary": "rgb(255, 250, 204)"
          }
        }
      }));
    });

    group('pallete', () => {

      group('light', () => {

        to('light', async () => {
          // Browser
          const valueBrowsers = await evaluate((window: any) => {
            const amauiTheme = new window.AmauiStyle.AmauiTheme({
              palette: {
                light: true
              }
            });

            return amauiTheme.palette;
          }, { browsers });

          // Node
          const amauiTheme = new AmauiStyle.AmauiTheme({
            palette: {
              light: true
            }
          });

          const valueNode = amauiTheme.palette;

          const values = [valueNode, ...valueBrowsers];

          values.forEach(value => assert(value).eql({
            "light": true,
            "accessibility": "regular",
            "visual_contrast": {
              "low": {
                "opacity": {
                  "primary": 0.77,
                  "secondary": 0.44,
                  "tertiary": 0.27,
                  "quaternary": 0.14,
                  "active": 0.44,
                  "disabled": 0.27,
                  "drag": 0.14,
                  "divider": 0.13,
                  "press": 0.1,
                  "focus": 0.07,
                  "selected": 0.05,
                  "hover": 0.03
                },
                "contrast_threshold": 2.4
              },
              "regular": {
                "opacity": {
                  "primary": 0.87,
                  "secondary": 0.54,
                  "tertiary": 0.37,
                  "quaternary": 0.24,
                  "active": 0.54,
                  "disabled": 0.37,
                  "drag": 0.16,
                  "divider": 0.14,
                  "press": 0.12,
                  "focus": 0.11,
                  "selected": 0.07,
                  "hover": 0.04
                },
                "contrast_threshold": 3
              },
              "high": {
                "opacity": {
                  "primary": 1,
                  "secondary": 0.74,
                  "tertiary": 0.57,
                  "quaternary": 0.44,
                  "active": 0.74,
                  "disabled": 0.57,
                  "drag": 0.27,
                  "divider": 0.24,
                  "press": 0.22,
                  "focus": 0.21,
                  "selected": 0.17,
                  "hover": 0.14
                },
                "contrast_threshold": 4
              },
              "default": {
                "opacity": {
                  "primary": 0.87,
                  "secondary": 0.54,
                  "tertiary": 0.37,
                  "quaternary": 0.24,
                  "active": 0.54,
                  "disabled": 0.37,
                  "drag": 0.16,
                  "divider": 0.14,
                  "press": 0.12,
                  "focus": 0.11,
                  "selected": 0.07,
                  "hover": 0.04
                },
                "contrast_threshold": 3
              }
            },
            "color": {
              "primary": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(5, 5, 0)",
                "5": "rgb(26, 23, 0)",
                "10": "rgb(51, 46, 0)",
                "20": "rgb(102, 92, 0)",
                "30": "rgb(153, 138, 0)",
                "40": "rgb(204, 184, 0)",
                "50": "rgb(255, 230, 0)",
                "60": "rgb(255, 235, 51)",
                "70": "rgb(255, 240, 102)",
                "80": "rgb(255, 245, 153)",
                "90": "rgb(255, 250, 204)",
                "95": "rgb(255, 252, 229)",
                "99": "rgb(255, 254, 250)",
                "100": "rgb(255, 255, 255)",
                "main": "#FFEB3B",
                "light": "#FFF176",
                "dark": "#FBC02D"
              },
              "secondary": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(3, 4, 1)",
                "5": "rgb(13, 19, 6)",
                "10": "rgb(26, 38, 13)",
                "20": "rgb(53, 77, 26)",
                "30": "rgb(79, 115, 38)",
                "40": "rgb(105, 153, 51)",
                "50": "rgb(132, 191, 64)",
                "60": "rgb(156, 204, 102)",
                "70": "rgb(181, 217, 140)",
                "80": "rgb(206, 230, 179)",
                "90": "rgb(230, 242, 217)",
                "95": "rgb(243, 249, 236)",
                "99": "rgb(253, 254, 251)",
                "100": "rgb(255, 255, 255)",
                "main": "#8BC34A",
                "light": "#AED581",
                "dark": "#689F38"
              },
              "tertiary": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(5, 4, 0)",
                "5": "rgb(26, 19, 0)",
                "10": "rgb(51, 38, 0)",
                "20": "rgb(102, 77, 0)",
                "30": "rgb(153, 115, 0)",
                "40": "rgb(204, 153, 0)",
                "50": "rgb(255, 191, 0)",
                "60": "rgb(255, 204, 51)",
                "70": "rgb(255, 217, 102)",
                "80": "rgb(255, 230, 153)",
                "90": "rgb(255, 242, 204)",
                "95": "rgb(255, 249, 229)",
                "99": "rgb(255, 254, 250)",
                "100": "rgb(255, 255, 255)",
                "main": "#FFC107",
                "light": "#FFD54F",
                "dark": "#FFA000"
              },
              "quaternary": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(0, 5, 5)",
                "5": "rgb(0, 23, 26)",
                "10": "rgb(0, 45, 51)",
                "20": "rgb(0, 90, 102)",
                "30": "rgb(0, 135, 153)",
                "40": "rgb(0, 180, 204)",
                "50": "rgb(0, 225, 255)",
                "60": "rgb(51, 231, 255)",
                "70": "rgb(102, 237, 255)",
                "80": "rgb(153, 243, 255)",
                "90": "rgb(204, 249, 255)",
                "95": "rgb(229, 252, 255)",
                "99": "rgb(250, 254, 255)",
                "100": "rgb(255, 255, 255)",
                "main": "#00BCD4",
                "light": "#4DD0E1",
                "dark": "#0097A7"
              },
              "info": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(0, 3, 5)",
                "5": "rgb(0, 17, 25)",
                "10": "rgb(1, 35, 50)",
                "20": "rgb(1, 69, 101)",
                "30": "rgb(2, 104, 151)",
                "40": "rgb(2, 139, 202)",
                "50": "rgb(3, 173, 252)",
                "60": "rgb(53, 190, 253)",
                "70": "rgb(104, 206, 253)",
                "80": "rgb(154, 222, 254)",
                "90": "rgb(205, 239, 254)",
                "95": "rgb(230, 247, 255)",
                "99": "rgb(250, 253, 255)",
                "100": "rgb(255, 255, 255)",
                "main": "#03A9F4",
                "light": "#4FC3F7",
                "dark": "#0288D1"
              },
              "success": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(2, 4, 2)",
                "5": "rgb(8, 18, 8)",
                "10": "rgb(16, 35, 16)",
                "20": "rgb(31, 71, 32)",
                "30": "rgb(47, 106, 49)",
                "40": "rgb(62, 142, 65)",
                "50": "rgb(78, 177, 81)",
                "60": "rgb(113, 193, 116)",
                "70": "rgb(149, 208, 151)",
                "80": "rgb(184, 224, 185)",
                "90": "rgb(220, 239, 220)",
                "95": "rgb(237, 247, 238)",
                "99": "rgb(251, 253, 252)",
                "100": "rgb(255, 255, 255)",
                "main": "#4CAF50",
                "light": "#81C784",
                "dark": "#388E3C"
              },
              "warning": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(5, 3, 0)",
                "5": "rgb(26, 15, 0)",
                "10": "rgb(51, 31, 0)",
                "20": "rgb(102, 61, 0)",
                "30": "rgb(153, 92, 0)",
                "40": "rgb(204, 122, 0)",
                "50": "rgb(255, 153, 0)",
                "60": "rgb(255, 173, 51)",
                "70": "rgb(255, 194, 102)",
                "80": "rgb(255, 214, 153)",
                "90": "rgb(255, 235, 204)",
                "95": "rgb(255, 245, 229)",
                "99": "rgb(255, 253, 250)",
                "100": "rgb(255, 255, 255)",
                "main": "#FF9800",
                "light": "#FFB74D",
                "dark": "#F57C00"
              },
              "error": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(5, 1, 0)",
                "5": "rgb(26, 6, 0)",
                "10": "rgb(51, 12, 0)",
                "20": "rgb(102, 24, 0)",
                "30": "rgb(153, 36, 0)",
                "40": "rgb(204, 48, 0)",
                "50": "rgb(255, 60, 0)",
                "60": "rgb(255, 99, 51)",
                "70": "rgb(255, 138, 102)",
                "80": "rgb(255, 177, 153)",
                "90": "rgb(255, 216, 204)",
                "95": "rgb(255, 235, 229)",
                "99": "rgb(255, 251, 250)",
                "100": "rgb(255, 255, 255)",
                "main": "#FF5722",
                "light": "#FF8A65",
                "dark": "#E64A19"
              },
              "neutral": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(3, 3, 3)",
                "5": "rgb(13, 13, 13)",
                "10": "rgb(26, 26, 26)",
                "20": "rgb(51, 51, 51)",
                "30": "rgb(77, 77, 77)",
                "40": "rgb(102, 102, 102)",
                "50": "rgb(128, 128, 128)",
                "60": "rgb(153, 153, 153)",
                "70": "rgb(179, 179, 179)",
                "80": "rgb(204, 204, 204)",
                "90": "rgb(230, 230, 230)",
                "95": "rgb(242, 242, 242)",
                "99": "rgb(252, 252, 252)",
                "100": "rgb(255, 255, 255)",
                "main": "#000000",
                "light": "rgb(26, 26, 26)",
                "dark": "rgb(26, 26, 26)"
              }
            },
            "text": {
              "primary": {
                "primary": "rgba(153, 138, 0, 0.87)",
                "secondary": "rgba(153, 138, 0, 0.54)",
                "tertiary": "rgba(153, 138, 0, 0.37)",
                "quaternary": "rgba(153, 138, 0, 0.24)"
              },
              "secondary": {
                "primary": "rgba(79, 115, 38, 0.87)",
                "secondary": "rgba(79, 115, 38, 0.54)",
                "tertiary": "rgba(79, 115, 38, 0.37)",
                "quaternary": "rgba(79, 115, 38, 0.24)"
              },
              "tertiary": {
                "primary": "rgba(153, 115, 0, 0.87)",
                "secondary": "rgba(153, 115, 0, 0.54)",
                "tertiary": "rgba(153, 115, 0, 0.37)",
                "quaternary": "rgba(153, 115, 0, 0.24)"
              },
              "quaternary": {
                "primary": "rgba(0, 135, 153, 0.87)",
                "secondary": "rgba(0, 135, 153, 0.54)",
                "tertiary": "rgba(0, 135, 153, 0.37)",
                "quaternary": "rgba(0, 135, 153, 0.24)"
              },
              "info": {
                "primary": "rgba(2, 104, 151, 0.87)",
                "secondary": "rgba(2, 104, 151, 0.54)",
                "tertiary": "rgba(2, 104, 151, 0.37)",
                "quaternary": "rgba(2, 104, 151, 0.24)"
              },
              "success": {
                "primary": "rgba(47, 106, 49, 0.87)",
                "secondary": "rgba(47, 106, 49, 0.54)",
                "tertiary": "rgba(47, 106, 49, 0.37)",
                "quaternary": "rgba(47, 106, 49, 0.24)"
              },
              "warning": {
                "primary": "rgba(153, 92, 0, 0.87)",
                "secondary": "rgba(153, 92, 0, 0.54)",
                "tertiary": "rgba(153, 92, 0, 0.37)",
                "quaternary": "rgba(153, 92, 0, 0.24)"
              },
              "error": {
                "primary": "rgba(153, 36, 0, 0.87)",
                "secondary": "rgba(153, 36, 0, 0.54)",
                "tertiary": "rgba(153, 36, 0, 0.37)",
                "quaternary": "rgba(153, 36, 0, 0.24)"
              },
              "neutral": {
                "primary": "rgba(0, 0, 0, 0.87)",
                "secondary": "rgba(0, 0, 0, 0.54)",
                "tertiary": "rgba(0, 0, 0, 0.37)",
                "quaternary": "rgba(0, 0, 0, 0.24)"
              },
              "default": {
                "primary": "rgba(0, 0, 0, 0.87)",
                "secondary": "rgba(0, 0, 0, 0.54)",
                "tertiary": "rgba(0, 0, 0, 0.37)",
                "quaternary": "rgba(0, 0, 0, 0.24)"
              },
              "divider": "rgba(0, 0, 0, 0.14)",
              "active": "rgba(0, 0, 0, 0.54)",
              "hover": "rgba(0, 0, 0, 0.04)",
              "selected": "rgba(0, 0, 0, 0.07)",
              "focus": "rgba(0, 0, 0, 0.11)",
              "disabled": "rgba(0, 0, 0, 0.37)"
            },
            "background": {
              "primary": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(255, 254, 250)",
                "tertiary": "rgb(255, 252, 229)",
                "quaternary": "rgb(255, 250, 204)"
              },
              "secondary": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(253, 254, 251)",
                "tertiary": "rgb(243, 249, 236)",
                "quaternary": "rgb(230, 242, 217)"
              },
              "tertiary": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(255, 254, 250)",
                "tertiary": "rgb(255, 249, 229)",
                "quaternary": "rgb(255, 242, 204)"
              },
              "quaternary": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(250, 254, 255)",
                "tertiary": "rgb(229, 252, 255)",
                "quaternary": "rgb(204, 249, 255)"
              },
              "info": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(250, 253, 255)",
                "tertiary": "rgb(230, 247, 255)",
                "quaternary": "rgb(205, 239, 254)"
              },
              "success": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(251, 253, 252)",
                "tertiary": "rgb(237, 247, 238)",
                "quaternary": "rgb(220, 239, 220)"
              },
              "warning": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(255, 253, 250)",
                "tertiary": "rgb(255, 245, 229)",
                "quaternary": "rgb(255, 235, 204)"
              },
              "error": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(255, 251, 250)",
                "tertiary": "rgb(255, 235, 229)",
                "quaternary": "rgb(255, 216, 204)"
              },
              "neutral": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(252, 252, 252)",
                "tertiary": "rgb(242, 242, 242)",
                "quaternary": "rgb(230, 230, 230)"
              },
              "default": {
                "primary": "rgb(255, 255, 255)",
                "secondary": "rgb(252, 252, 252)",
                "tertiary": "rgb(242, 242, 242)",
                "quaternary": "rgb(230, 230, 230)"
              }
            }
          }));
        });

        to('dark', async () => {
          // Browser
          const valueBrowsers = await evaluate((window: any) => {
            const amauiTheme = new window.AmauiStyle.AmauiTheme({
              palette: {
                light: false
              }
            });

            return amauiTheme.palette;
          }, { browsers });

          // Node
          const amauiTheme = new AmauiStyle.AmauiTheme({
            palette: {
              light: false
            }
          });

          const valueNode = amauiTheme.palette;

          const values = [valueNode, ...valueBrowsers];

          values.forEach(value => assert(value).eql({
            "light": false,
            "accessibility": "regular",
            "visual_contrast": {
              "low": {
                "opacity": {
                  "primary": 0.77,
                  "secondary": 0.44,
                  "tertiary": 0.27,
                  "quaternary": 0.14,
                  "active": 0.44,
                  "disabled": 0.27,
                  "drag": 0.14,
                  "divider": 0.13,
                  "press": 0.1,
                  "focus": 0.07,
                  "selected": 0.05,
                  "hover": 0.03
                },
                "contrast_threshold": 2.4
              },
              "regular": {
                "opacity": {
                  "primary": 0.87,
                  "secondary": 0.54,
                  "tertiary": 0.37,
                  "quaternary": 0.24,
                  "active": 0.54,
                  "disabled": 0.37,
                  "drag": 0.16,
                  "divider": 0.14,
                  "press": 0.12,
                  "focus": 0.11,
                  "selected": 0.07,
                  "hover": 0.04
                },
                "contrast_threshold": 3
              },
              "high": {
                "opacity": {
                  "primary": 1,
                  "secondary": 0.74,
                  "tertiary": 0.57,
                  "quaternary": 0.44,
                  "active": 0.74,
                  "disabled": 0.57,
                  "drag": 0.27,
                  "divider": 0.24,
                  "press": 0.22,
                  "focus": 0.21,
                  "selected": 0.17,
                  "hover": 0.14
                },
                "contrast_threshold": 4
              },
              "default": {
                "opacity": {
                  "primary": 0.87,
                  "secondary": 0.54,
                  "tertiary": 0.37,
                  "quaternary": 0.24,
                  "active": 0.54,
                  "disabled": 0.37,
                  "drag": 0.16,
                  "divider": 0.14,
                  "press": 0.12,
                  "focus": 0.11,
                  "selected": 0.07,
                  "hover": 0.04
                },
                "contrast_threshold": 3
              }
            },
            "color": {
              "primary": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(5, 5, 0)",
                "5": "rgb(26, 23, 0)",
                "10": "rgb(51, 46, 0)",
                "20": "rgb(102, 92, 0)",
                "30": "rgb(153, 138, 0)",
                "40": "rgb(204, 184, 0)",
                "50": "rgb(255, 230, 0)",
                "60": "rgb(255, 235, 51)",
                "70": "rgb(255, 240, 102)",
                "80": "rgb(255, 245, 153)",
                "90": "rgb(255, 250, 204)",
                "95": "rgb(255, 252, 229)",
                "99": "rgb(255, 254, 250)",
                "100": "rgb(255, 255, 255)",
                "main": "#FFEB3B",
                "light": "#FFF176",
                "dark": "#FBC02D"
              },
              "secondary": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(3, 4, 1)",
                "5": "rgb(13, 19, 6)",
                "10": "rgb(26, 38, 13)",
                "20": "rgb(53, 77, 26)",
                "30": "rgb(79, 115, 38)",
                "40": "rgb(105, 153, 51)",
                "50": "rgb(132, 191, 64)",
                "60": "rgb(156, 204, 102)",
                "70": "rgb(181, 217, 140)",
                "80": "rgb(206, 230, 179)",
                "90": "rgb(230, 242, 217)",
                "95": "rgb(243, 249, 236)",
                "99": "rgb(253, 254, 251)",
                "100": "rgb(255, 255, 255)",
                "main": "#8BC34A",
                "light": "#AED581",
                "dark": "#689F38"
              },
              "tertiary": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(5, 4, 0)",
                "5": "rgb(26, 19, 0)",
                "10": "rgb(51, 38, 0)",
                "20": "rgb(102, 77, 0)",
                "30": "rgb(153, 115, 0)",
                "40": "rgb(204, 153, 0)",
                "50": "rgb(255, 191, 0)",
                "60": "rgb(255, 204, 51)",
                "70": "rgb(255, 217, 102)",
                "80": "rgb(255, 230, 153)",
                "90": "rgb(255, 242, 204)",
                "95": "rgb(255, 249, 229)",
                "99": "rgb(255, 254, 250)",
                "100": "rgb(255, 255, 255)",
                "main": "#FFC107",
                "light": "#FFD54F",
                "dark": "#FFA000"
              },
              "quaternary": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(0, 5, 5)",
                "5": "rgb(0, 23, 26)",
                "10": "rgb(0, 45, 51)",
                "20": "rgb(0, 90, 102)",
                "30": "rgb(0, 135, 153)",
                "40": "rgb(0, 180, 204)",
                "50": "rgb(0, 225, 255)",
                "60": "rgb(51, 231, 255)",
                "70": "rgb(102, 237, 255)",
                "80": "rgb(153, 243, 255)",
                "90": "rgb(204, 249, 255)",
                "95": "rgb(229, 252, 255)",
                "99": "rgb(250, 254, 255)",
                "100": "rgb(255, 255, 255)",
                "main": "#00BCD4",
                "light": "#4DD0E1",
                "dark": "#0097A7"
              },
              "info": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(0, 3, 5)",
                "5": "rgb(0, 17, 25)",
                "10": "rgb(1, 35, 50)",
                "20": "rgb(1, 69, 101)",
                "30": "rgb(2, 104, 151)",
                "40": "rgb(2, 139, 202)",
                "50": "rgb(3, 173, 252)",
                "60": "rgb(53, 190, 253)",
                "70": "rgb(104, 206, 253)",
                "80": "rgb(154, 222, 254)",
                "90": "rgb(205, 239, 254)",
                "95": "rgb(230, 247, 255)",
                "99": "rgb(250, 253, 255)",
                "100": "rgb(255, 255, 255)",
                "main": "#03A9F4",
                "light": "#4FC3F7",
                "dark": "#0288D1"
              },
              "success": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(2, 4, 2)",
                "5": "rgb(8, 18, 8)",
                "10": "rgb(16, 35, 16)",
                "20": "rgb(31, 71, 32)",
                "30": "rgb(47, 106, 49)",
                "40": "rgb(62, 142, 65)",
                "50": "rgb(78, 177, 81)",
                "60": "rgb(113, 193, 116)",
                "70": "rgb(149, 208, 151)",
                "80": "rgb(184, 224, 185)",
                "90": "rgb(220, 239, 220)",
                "95": "rgb(237, 247, 238)",
                "99": "rgb(251, 253, 252)",
                "100": "rgb(255, 255, 255)",
                "main": "#4CAF50",
                "light": "#81C784",
                "dark": "#388E3C"
              },
              "warning": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(5, 3, 0)",
                "5": "rgb(26, 15, 0)",
                "10": "rgb(51, 31, 0)",
                "20": "rgb(102, 61, 0)",
                "30": "rgb(153, 92, 0)",
                "40": "rgb(204, 122, 0)",
                "50": "rgb(255, 153, 0)",
                "60": "rgb(255, 173, 51)",
                "70": "rgb(255, 194, 102)",
                "80": "rgb(255, 214, 153)",
                "90": "rgb(255, 235, 204)",
                "95": "rgb(255, 245, 229)",
                "99": "rgb(255, 253, 250)",
                "100": "rgb(255, 255, 255)",
                "main": "#FF9800",
                "light": "#FFB74D",
                "dark": "#F57C00"
              },
              "error": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(5, 1, 0)",
                "5": "rgb(26, 6, 0)",
                "10": "rgb(51, 12, 0)",
                "20": "rgb(102, 24, 0)",
                "30": "rgb(153, 36, 0)",
                "40": "rgb(204, 48, 0)",
                "50": "rgb(255, 60, 0)",
                "60": "rgb(255, 99, 51)",
                "70": "rgb(255, 138, 102)",
                "80": "rgb(255, 177, 153)",
                "90": "rgb(255, 216, 204)",
                "95": "rgb(255, 235, 229)",
                "99": "rgb(255, 251, 250)",
                "100": "rgb(255, 255, 255)",
                "main": "#FF5722",
                "light": "#FF8A65",
                "dark": "#E64A19"
              },
              "neutral": {
                "0": "rgb(0, 0, 0)",
                "1": "rgb(3, 3, 3)",
                "5": "rgb(13, 13, 13)",
                "10": "rgb(26, 26, 26)",
                "20": "rgb(51, 51, 51)",
                "30": "rgb(77, 77, 77)",
                "40": "rgb(102, 102, 102)",
                "50": "rgb(128, 128, 128)",
                "60": "rgb(153, 153, 153)",
                "70": "rgb(179, 179, 179)",
                "80": "rgb(204, 204, 204)",
                "90": "rgb(230, 230, 230)",
                "95": "rgb(242, 242, 242)",
                "99": "rgb(252, 252, 252)",
                "100": "rgb(255, 255, 255)",
                "main": "#000000",
                "light": "rgb(26, 26, 26)",
                "dark": "rgb(26, 26, 26)"
              }
            },
            "text": {
              "primary": {
                "primary": "rgba(255, 240, 102, 0.87)",
                "secondary": "rgba(255, 240, 102, 0.54)",
                "tertiary": "rgba(255, 240, 102, 0.37)",
                "quaternary": "rgba(255, 240, 102, 0.24)"
              },
              "secondary": {
                "primary": "rgba(181, 217, 140, 0.87)",
                "secondary": "rgba(181, 217, 140, 0.54)",
                "tertiary": "rgba(181, 217, 140, 0.37)",
                "quaternary": "rgba(181, 217, 140, 0.24)"
              },
              "tertiary": {
                "primary": "rgba(255, 217, 102, 0.87)",
                "secondary": "rgba(255, 217, 102, 0.54)",
                "tertiary": "rgba(255, 217, 102, 0.37)",
                "quaternary": "rgba(255, 217, 102, 0.24)"
              },
              "quaternary": {
                "primary": "rgba(102, 237, 255, 0.87)",
                "secondary": "rgba(102, 237, 255, 0.54)",
                "tertiary": "rgba(102, 237, 255, 0.37)",
                "quaternary": "rgba(102, 237, 255, 0.24)"
              },
              "info": {
                "primary": "rgba(104, 206, 253, 0.87)",
                "secondary": "rgba(104, 206, 253, 0.54)",
                "tertiary": "rgba(104, 206, 253, 0.37)",
                "quaternary": "rgba(104, 206, 253, 0.24)"
              },
              "success": {
                "primary": "rgba(149, 208, 151, 0.87)",
                "secondary": "rgba(149, 208, 151, 0.54)",
                "tertiary": "rgba(149, 208, 151, 0.37)",
                "quaternary": "rgba(149, 208, 151, 0.24)"
              },
              "warning": {
                "primary": "rgba(255, 194, 102, 0.87)",
                "secondary": "rgba(255, 194, 102, 0.54)",
                "tertiary": "rgba(255, 194, 102, 0.37)",
                "quaternary": "rgba(255, 194, 102, 0.24)"
              },
              "error": {
                "primary": "rgba(255, 138, 102, 0.87)",
                "secondary": "rgba(255, 138, 102, 0.54)",
                "tertiary": "rgba(255, 138, 102, 0.37)",
                "quaternary": "rgba(255, 138, 102, 0.24)"
              },
              "neutral": {
                "primary": "rgba(255, 255, 255, 0.87)",
                "secondary": "rgba(255, 255, 255, 0.54)",
                "tertiary": "rgba(255, 255, 255, 0.37)",
                "quaternary": "rgba(255, 255, 255, 0.24)"
              },
              "default": {
                "primary": "rgba(255, 255, 255, 0.87)",
                "secondary": "rgba(255, 255, 255, 0.54)",
                "tertiary": "rgba(255, 255, 255, 0.37)",
                "quaternary": "rgba(255, 255, 255, 0.24)"
              },
              "divider": "rgba(255, 255, 255, 0.14)",
              "active": "rgba(255, 255, 255, 0.54)",
              "hover": "rgba(255, 255, 255, 0.04)",
              "selected": "rgba(255, 255, 255, 0.07)",
              "focus": "rgba(255, 255, 255, 0.11)",
              "disabled": "rgba(255, 255, 255, 0.37)"
            },
            "background": {
              "primary": {
                "primary": "rgb(0, 0, 0)",
                "secondary": "rgb(5, 5, 0)",
                "tertiary": "rgb(26, 23, 0)",
                "quaternary": "rgb(51, 46, 0)"
              },
              "secondary": {
                "primary": "rgb(0, 0, 0)",
                "secondary": "rgb(3, 4, 1)",
                "tertiary": "rgb(13, 19, 6)",
                "quaternary": "rgb(26, 38, 13)"
              },
              "tertiary": {
                "primary": "rgb(0, 0, 0)",
                "secondary": "rgb(5, 4, 0)",
                "tertiary": "rgb(26, 19, 0)",
                "quaternary": "rgb(51, 38, 0)"
              },
              "quaternary": {
                "primary": "rgb(0, 0, 0)",
                "secondary": "rgb(0, 5, 5)",
                "tertiary": "rgb(0, 23, 26)",
                "quaternary": "rgb(0, 45, 51)"
              },
              "info": {
                "primary": "rgb(0, 0, 0)",
                "secondary": "rgb(0, 3, 5)",
                "tertiary": "rgb(0, 17, 25)",
                "quaternary": "rgb(1, 35, 50)"
              },
              "success": {
                "primary": "rgb(0, 0, 0)",
                "secondary": "rgb(2, 4, 2)",
                "tertiary": "rgb(8, 18, 8)",
                "quaternary": "rgb(16, 35, 16)"
              },
              "warning": {
                "primary": "rgb(0, 0, 0)",
                "secondary": "rgb(5, 3, 0)",
                "tertiary": "rgb(26, 15, 0)",
                "quaternary": "rgb(51, 31, 0)"
              },
              "error": {
                "primary": "rgb(0, 0, 0)",
                "secondary": "rgb(5, 1, 0)",
                "tertiary": "rgb(26, 6, 0)",
                "quaternary": "rgb(51, 12, 0)"
              },
              "neutral": {
                "primary": "rgb(0, 0, 0)",
                "secondary": "rgb(3, 3, 3)",
                "tertiary": "rgb(13, 13, 13)",
                "quaternary": "rgb(26, 26, 26)"
              },
              "default": {
                "primary": "rgb(0, 0, 0)",
                "secondary": "rgb(3, 3, 3)",
                "tertiary": "rgb(13, 13, 13)",
                "quaternary": "rgb(26, 26, 26)"
              }
            }
          }));
        });

      });

      group('accessibility', () => {

        to('regular', async () => {
          // Browser
          const valueBrowsers = await evaluate((window: any) => {
            const amauiTheme = new window.AmauiStyle.AmauiTheme({
              palette: {
                color: {
                  primary: {
                    main: '#ff0'
                  }
                },
                accessibility: 'regular'
              }
            });

            return amauiTheme.palette.color;
          }, { browsers });

          // Node
          const amauiTheme = new AmauiStyle.AmauiTheme({
            palette: {
              color: {
                primary: {
                  main: '#ff0'
                }
              },
              accessibility: 'regular'
            }
          });

          const valueNode = amauiTheme.palette.color;

          const values = [valueNode, ...valueBrowsers];

          values.forEach(value => assert(value).eql({
            "primary": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(5, 5, 0)",
              "5": "rgb(26, 26, 0)",
              "10": "rgb(51, 51, 0)",
              "20": "rgb(102, 102, 0)",
              "30": "rgb(153, 153, 0)",
              "40": "rgb(204, 204, 0)",
              "50": "rgb(255, 255, 0)",
              "60": "rgb(255, 255, 51)",
              "70": "rgb(255, 255, 102)",
              "80": "rgb(255, 255, 153)",
              "90": "rgb(255, 255, 204)",
              "95": "rgb(255, 255, 229)",
              "99": "rgb(255, 255, 250)",
              "100": "rgb(255, 255, 255)",
              "main": "#ff0",
              "light": "rgb(255, 255, 102)",
              "dark": "rgb(153, 153, 0)"
            },
            "secondary": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(3, 4, 1)",
              "5": "rgb(13, 19, 6)",
              "10": "rgb(26, 38, 13)",
              "20": "rgb(53, 77, 26)",
              "30": "rgb(79, 115, 38)",
              "40": "rgb(105, 153, 51)",
              "50": "rgb(132, 191, 64)",
              "60": "rgb(156, 204, 102)",
              "70": "rgb(181, 217, 140)",
              "80": "rgb(206, 230, 179)",
              "90": "rgb(230, 242, 217)",
              "95": "rgb(243, 249, 236)",
              "99": "rgb(253, 254, 251)",
              "100": "rgb(255, 255, 255)",
              "main": "#8BC34A",
              "light": "#AED581",
              "dark": "#689F38"
            },
            "tertiary": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(5, 4, 0)",
              "5": "rgb(26, 19, 0)",
              "10": "rgb(51, 38, 0)",
              "20": "rgb(102, 77, 0)",
              "30": "rgb(153, 115, 0)",
              "40": "rgb(204, 153, 0)",
              "50": "rgb(255, 191, 0)",
              "60": "rgb(255, 204, 51)",
              "70": "rgb(255, 217, 102)",
              "80": "rgb(255, 230, 153)",
              "90": "rgb(255, 242, 204)",
              "95": "rgb(255, 249, 229)",
              "99": "rgb(255, 254, 250)",
              "100": "rgb(255, 255, 255)",
              "main": "#FFC107",
              "light": "#FFD54F",
              "dark": "#FFA000"
            },
            "quaternary": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(0, 5, 5)",
              "5": "rgb(0, 23, 26)",
              "10": "rgb(0, 45, 51)",
              "20": "rgb(0, 90, 102)",
              "30": "rgb(0, 135, 153)",
              "40": "rgb(0, 180, 204)",
              "50": "rgb(0, 225, 255)",
              "60": "rgb(51, 231, 255)",
              "70": "rgb(102, 237, 255)",
              "80": "rgb(153, 243, 255)",
              "90": "rgb(204, 249, 255)",
              "95": "rgb(229, 252, 255)",
              "99": "rgb(250, 254, 255)",
              "100": "rgb(255, 255, 255)",
              "main": "#00BCD4",
              "light": "#4DD0E1",
              "dark": "#0097A7"
            },
            "info": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(0, 3, 5)",
              "5": "rgb(0, 17, 25)",
              "10": "rgb(1, 35, 50)",
              "20": "rgb(1, 69, 101)",
              "30": "rgb(2, 104, 151)",
              "40": "rgb(2, 139, 202)",
              "50": "rgb(3, 173, 252)",
              "60": "rgb(53, 190, 253)",
              "70": "rgb(104, 206, 253)",
              "80": "rgb(154, 222, 254)",
              "90": "rgb(205, 239, 254)",
              "95": "rgb(230, 247, 255)",
              "99": "rgb(250, 253, 255)",
              "100": "rgb(255, 255, 255)",
              "main": "#03A9F4",
              "light": "#4FC3F7",
              "dark": "#0288D1"
            },
            "success": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(2, 4, 2)",
              "5": "rgb(8, 18, 8)",
              "10": "rgb(16, 35, 16)",
              "20": "rgb(31, 71, 32)",
              "30": "rgb(47, 106, 49)",
              "40": "rgb(62, 142, 65)",
              "50": "rgb(78, 177, 81)",
              "60": "rgb(113, 193, 116)",
              "70": "rgb(149, 208, 151)",
              "80": "rgb(184, 224, 185)",
              "90": "rgb(220, 239, 220)",
              "95": "rgb(237, 247, 238)",
              "99": "rgb(251, 253, 252)",
              "100": "rgb(255, 255, 255)",
              "main": "#4CAF50",
              "light": "#81C784",
              "dark": "#388E3C"
            },
            "warning": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(5, 3, 0)",
              "5": "rgb(26, 15, 0)",
              "10": "rgb(51, 31, 0)",
              "20": "rgb(102, 61, 0)",
              "30": "rgb(153, 92, 0)",
              "40": "rgb(204, 122, 0)",
              "50": "rgb(255, 153, 0)",
              "60": "rgb(255, 173, 51)",
              "70": "rgb(255, 194, 102)",
              "80": "rgb(255, 214, 153)",
              "90": "rgb(255, 235, 204)",
              "95": "rgb(255, 245, 229)",
              "99": "rgb(255, 253, 250)",
              "100": "rgb(255, 255, 255)",
              "main": "#FF9800",
              "light": "#FFB74D",
              "dark": "#F57C00"
            },
            "error": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(5, 1, 0)",
              "5": "rgb(26, 6, 0)",
              "10": "rgb(51, 12, 0)",
              "20": "rgb(102, 24, 0)",
              "30": "rgb(153, 36, 0)",
              "40": "rgb(204, 48, 0)",
              "50": "rgb(255, 60, 0)",
              "60": "rgb(255, 99, 51)",
              "70": "rgb(255, 138, 102)",
              "80": "rgb(255, 177, 153)",
              "90": "rgb(255, 216, 204)",
              "95": "rgb(255, 235, 229)",
              "99": "rgb(255, 251, 250)",
              "100": "rgb(255, 255, 255)",
              "main": "#FF5722",
              "light": "#FF8A65",
              "dark": "#E64A19"
            },
            "neutral": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(3, 3, 3)",
              "5": "rgb(13, 13, 13)",
              "10": "rgb(26, 26, 26)",
              "20": "rgb(51, 51, 51)",
              "30": "rgb(77, 77, 77)",
              "40": "rgb(102, 102, 102)",
              "50": "rgb(128, 128, 128)",
              "60": "rgb(153, 153, 153)",
              "70": "rgb(179, 179, 179)",
              "80": "rgb(204, 204, 204)",
              "90": "rgb(230, 230, 230)",
              "95": "rgb(242, 242, 242)",
              "99": "rgb(252, 252, 252)",
              "100": "rgb(255, 255, 255)",
              "main": "#000000",
              "light": "rgb(26, 26, 26)",
              "dark": "rgb(26, 26, 26)"
            }
          }));
        });

        to('colorblind', async () => {
          // Browser
          const valueBrowsers = await evaluate((window: any) => {
            const amauiTheme = new window.AmauiStyle.AmauiTheme({
              palette: {
                color: {
                  primary: {
                    main: '#ff0'
                  }
                },
                accessibility: 'colorblind'
              }
            });

            return amauiTheme.palette.color;
          }, { browsers });

          // Node
          const amauiTheme = new AmauiStyle.AmauiTheme({
            palette: {
              color: {
                primary: {
                  main: '#ff0'
                }
              },
              accessibility: 'colorblind'
            }
          });

          const valueNode = amauiTheme.palette.color;

          const values = [valueNode, ...valueBrowsers];

          values.forEach(value => assert(value).eql({
            "primary": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(0, 3, 5)",
              "5": "rgb(1, 14, 24)",
              "10": "rgb(3, 28, 48)",
              "20": "rgb(5, 56, 97)",
              "30": "rgb(8, 83, 145)",
              "40": "rgb(10, 111, 194)",
              "50": "rgb(13, 139, 242)",
              "60": "rgb(61, 162, 245)",
              "70": "rgb(110, 185, 247)",
              "80": "rgb(158, 209, 250)",
              "90": "rgb(207, 232, 252)",
              "95": "rgb(231, 243, 254)",
              "99": "rgb(250, 253, 255)",
              "100": "rgb(255, 255, 255)",
              "main": "#2196F3",
              "light": "#64B5F6",
              "dark": "#1976D2"
            },
            "secondary": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(5, 3, 0)",
              "5": "rgb(26, 15, 0)",
              "10": "rgb(51, 31, 0)",
              "20": "rgb(102, 61, 0)",
              "30": "rgb(153, 92, 0)",
              "40": "rgb(204, 122, 0)",
              "50": "rgb(255, 153, 0)",
              "60": "rgb(255, 173, 51)",
              "70": "rgb(255, 194, 102)",
              "80": "rgb(255, 214, 153)",
              "90": "rgb(255, 235, 204)",
              "95": "rgb(255, 245, 229)",
              "99": "rgb(255, 253, 250)",
              "100": "rgb(255, 255, 255)",
              "main": "#FF9800",
              "light": "#FFB74D",
              "dark": "#F57C00"
            },
            "tertiary": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(5, 5, 0)",
              "5": "rgb(26, 23, 0)",
              "10": "rgb(51, 46, 0)",
              "20": "rgb(102, 92, 0)",
              "30": "rgb(153, 138, 0)",
              "40": "rgb(204, 184, 0)",
              "50": "rgb(255, 230, 0)",
              "60": "rgb(255, 235, 51)",
              "70": "rgb(255, 240, 102)",
              "80": "rgb(255, 245, 153)",
              "90": "rgb(255, 250, 204)",
              "95": "rgb(255, 252, 229)",
              "99": "rgb(255, 254, 250)",
              "100": "rgb(255, 255, 255)",
              "main": "#FFEB3B",
              "light": "#FFF176",
              "dark": "#FBC02D"
            },
            "quaternary": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(3, 3, 3)",
              "5": "rgb(13, 13, 13)",
              "10": "rgb(26, 26, 26)",
              "20": "rgb(51, 51, 51)",
              "30": "rgb(77, 77, 77)",
              "40": "rgb(102, 102, 102)",
              "50": "rgb(128, 128, 128)",
              "60": "rgb(153, 153, 153)",
              "70": "rgb(179, 179, 179)",
              "80": "rgb(204, 204, 204)",
              "90": "rgb(230, 230, 230)",
              "95": "rgb(242, 242, 242)",
              "99": "rgb(252, 252, 252)",
              "100": "rgb(255, 255, 255)",
              "main": "#9E9E9E",
              "light": "#E0E0E0",
              "dark": "#616161"
            },
            "info": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(0, 3, 5)",
              "5": "rgb(0, 17, 25)",
              "10": "rgb(1, 35, 50)",
              "20": "rgb(1, 69, 101)",
              "30": "rgb(2, 104, 151)",
              "40": "rgb(2, 139, 202)",
              "50": "rgb(3, 173, 252)",
              "60": "rgb(53, 190, 253)",
              "70": "rgb(104, 206, 253)",
              "80": "rgb(154, 222, 254)",
              "90": "rgb(205, 239, 254)",
              "95": "rgb(230, 247, 255)",
              "99": "rgb(250, 253, 255)",
              "100": "rgb(255, 255, 255)",
              "main": "#03A9F4",
              "light": "#4FC3F7",
              "dark": "#0288D1"
            },
            "success": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(2, 4, 2)",
              "5": "rgb(8, 18, 8)",
              "10": "rgb(16, 35, 16)",
              "20": "rgb(31, 71, 32)",
              "30": "rgb(47, 106, 49)",
              "40": "rgb(62, 142, 65)",
              "50": "rgb(78, 177, 81)",
              "60": "rgb(113, 193, 116)",
              "70": "rgb(149, 208, 151)",
              "80": "rgb(184, 224, 185)",
              "90": "rgb(220, 239, 220)",
              "95": "rgb(237, 247, 238)",
              "99": "rgb(251, 253, 252)",
              "100": "rgb(255, 255, 255)",
              "main": "#4CAF50",
              "light": "#81C784",
              "dark": "#388E3C"
            },
            "warning": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(5, 3, 0)",
              "5": "rgb(26, 15, 0)",
              "10": "rgb(51, 31, 0)",
              "20": "rgb(102, 61, 0)",
              "30": "rgb(153, 92, 0)",
              "40": "rgb(204, 122, 0)",
              "50": "rgb(255, 153, 0)",
              "60": "rgb(255, 173, 51)",
              "70": "rgb(255, 194, 102)",
              "80": "rgb(255, 214, 153)",
              "90": "rgb(255, 235, 204)",
              "95": "rgb(255, 245, 229)",
              "99": "rgb(255, 253, 250)",
              "100": "rgb(255, 255, 255)",
              "main": "#FF9800",
              "light": "#FFB74D",
              "dark": "#F57C00"
            },
            "error": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(5, 1, 0)",
              "5": "rgb(26, 6, 0)",
              "10": "rgb(51, 12, 0)",
              "20": "rgb(102, 24, 0)",
              "30": "rgb(153, 36, 0)",
              "40": "rgb(204, 48, 0)",
              "50": "rgb(255, 60, 0)",
              "60": "rgb(255, 99, 51)",
              "70": "rgb(255, 138, 102)",
              "80": "rgb(255, 177, 153)",
              "90": "rgb(255, 216, 204)",
              "95": "rgb(255, 235, 229)",
              "99": "rgb(255, 251, 250)",
              "100": "rgb(255, 255, 255)",
              "main": "#FF5722",
              "light": "#FF8A65",
              "dark": "#E64A19"
            },
            "neutral": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(3, 3, 3)",
              "5": "rgb(13, 13, 13)",
              "10": "rgb(26, 26, 26)",
              "20": "rgb(51, 51, 51)",
              "30": "rgb(77, 77, 77)",
              "40": "rgb(102, 102, 102)",
              "50": "rgb(128, 128, 128)",
              "60": "rgb(153, 153, 153)",
              "70": "rgb(179, 179, 179)",
              "80": "rgb(204, 204, 204)",
              "90": "rgb(230, 230, 230)",
              "95": "rgb(242, 242, 242)",
              "99": "rgb(252, 252, 252)",
              "100": "rgb(255, 255, 255)",
              "main": "#000000",
              "light": "rgb(26, 26, 26)",
              "dark": "rgb(26, 26, 26)"
            }
          }));
        });

        to('tritanopia', async () => {
          // Browser
          const valueBrowsers = await evaluate((window: any) => {
            const amauiTheme = new window.AmauiStyle.AmauiTheme({
              palette: {
                color: {
                  primary: {
                    main: '#ff0'
                  }
                },
                accessibility: 'tritanopia'
              }
            });

            return amauiTheme.palette.color;
          }, { browsers });

          // Node
          const amauiTheme = new AmauiStyle.AmauiTheme({
            palette: {
              color: {
                primary: {
                  main: '#ff0'
                }
              },
              accessibility: 'tritanopia'
            }
          });

          const valueNode = amauiTheme.palette.color;

          const values = [valueNode, ...valueBrowsers];

          values.forEach(value => assert(value).eql({
            "primary": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(0, 3, 5)",
              "5": "rgb(1, 14, 24)",
              "10": "rgb(3, 28, 48)",
              "20": "rgb(5, 56, 97)",
              "30": "rgb(8, 83, 145)",
              "40": "rgb(10, 111, 194)",
              "50": "rgb(13, 139, 242)",
              "60": "rgb(61, 162, 245)",
              "70": "rgb(110, 185, 247)",
              "80": "rgb(158, 209, 250)",
              "90": "rgb(207, 232, 252)",
              "95": "rgb(231, 243, 254)",
              "99": "rgb(250, 253, 255)",
              "100": "rgb(255, 255, 255)",
              "main": "#2196F3",
              "light": "#64B5F6",
              "dark": "#1976D2"
            },
            "secondary": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(5, 1, 0)",
              "5": "rgb(24, 3, 1)",
              "10": "rgb(48, 6, 3)",
              "20": "rgb(97, 11, 5)",
              "30": "rgb(145, 17, 8)",
              "40": "rgb(194, 22, 10)",
              "50": "rgb(242, 28, 13)",
              "60": "rgb(245, 73, 61)",
              "70": "rgb(247, 119, 110)",
              "80": "rgb(250, 164, 158)",
              "90": "rgb(252, 210, 207)",
              "95": "rgb(254, 232, 231)",
              "99": "rgb(255, 250, 250)",
              "100": "rgb(255, 255, 255)",
              "main": "#F44336",
              "light": "#E57373",
              "dark": "#D32F2F"
            },
            "tertiary": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(0, 5, 5)",
              "5": "rgb(0, 23, 26)",
              "10": "rgb(0, 45, 51)",
              "20": "rgb(0, 90, 102)",
              "30": "rgb(0, 135, 153)",
              "40": "rgb(0, 180, 204)",
              "50": "rgb(0, 225, 255)",
              "60": "rgb(51, 231, 255)",
              "70": "rgb(102, 237, 255)",
              "80": "rgb(153, 243, 255)",
              "90": "rgb(204, 249, 255)",
              "95": "rgb(229, 252, 255)",
              "99": "rgb(250, 254, 255)",
              "100": "rgb(255, 255, 255)",
              "main": "#00BCD4",
              "light": "#4DD0E1",
              "dark": "#0097A7"
            },
            "quaternary": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(3, 3, 3)",
              "5": "rgb(13, 13, 13)",
              "10": "rgb(26, 26, 26)",
              "20": "rgb(51, 51, 51)",
              "30": "rgb(77, 77, 77)",
              "40": "rgb(102, 102, 102)",
              "50": "rgb(128, 128, 128)",
              "60": "rgb(153, 153, 153)",
              "70": "rgb(179, 179, 179)",
              "80": "rgb(204, 204, 204)",
              "90": "rgb(230, 230, 230)",
              "95": "rgb(242, 242, 242)",
              "99": "rgb(252, 252, 252)",
              "100": "rgb(255, 255, 255)",
              "main": "#9E9E9E",
              "light": "#E0E0E0",
              "dark": "#616161"
            },
            "info": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(0, 3, 5)",
              "5": "rgb(0, 17, 25)",
              "10": "rgb(1, 35, 50)",
              "20": "rgb(1, 69, 101)",
              "30": "rgb(2, 104, 151)",
              "40": "rgb(2, 139, 202)",
              "50": "rgb(3, 173, 252)",
              "60": "rgb(53, 190, 253)",
              "70": "rgb(104, 206, 253)",
              "80": "rgb(154, 222, 254)",
              "90": "rgb(205, 239, 254)",
              "95": "rgb(230, 247, 255)",
              "99": "rgb(250, 253, 255)",
              "100": "rgb(255, 255, 255)",
              "main": "#03A9F4",
              "light": "#4FC3F7",
              "dark": "#0288D1"
            },
            "success": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(2, 4, 2)",
              "5": "rgb(8, 18, 8)",
              "10": "rgb(16, 35, 16)",
              "20": "rgb(31, 71, 32)",
              "30": "rgb(47, 106, 49)",
              "40": "rgb(62, 142, 65)",
              "50": "rgb(78, 177, 81)",
              "60": "rgb(113, 193, 116)",
              "70": "rgb(149, 208, 151)",
              "80": "rgb(184, 224, 185)",
              "90": "rgb(220, 239, 220)",
              "95": "rgb(237, 247, 238)",
              "99": "rgb(251, 253, 252)",
              "100": "rgb(255, 255, 255)",
              "main": "#4CAF50",
              "light": "#81C784",
              "dark": "#388E3C"
            },
            "warning": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(5, 3, 0)",
              "5": "rgb(26, 15, 0)",
              "10": "rgb(51, 31, 0)",
              "20": "rgb(102, 61, 0)",
              "30": "rgb(153, 92, 0)",
              "40": "rgb(204, 122, 0)",
              "50": "rgb(255, 153, 0)",
              "60": "rgb(255, 173, 51)",
              "70": "rgb(255, 194, 102)",
              "80": "rgb(255, 214, 153)",
              "90": "rgb(255, 235, 204)",
              "95": "rgb(255, 245, 229)",
              "99": "rgb(255, 253, 250)",
              "100": "rgb(255, 255, 255)",
              "main": "#FF9800",
              "light": "#FFB74D",
              "dark": "#F57C00"
            },
            "error": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(5, 1, 0)",
              "5": "rgb(26, 6, 0)",
              "10": "rgb(51, 12, 0)",
              "20": "rgb(102, 24, 0)",
              "30": "rgb(153, 36, 0)",
              "40": "rgb(204, 48, 0)",
              "50": "rgb(255, 60, 0)",
              "60": "rgb(255, 99, 51)",
              "70": "rgb(255, 138, 102)",
              "80": "rgb(255, 177, 153)",
              "90": "rgb(255, 216, 204)",
              "95": "rgb(255, 235, 229)",
              "99": "rgb(255, 251, 250)",
              "100": "rgb(255, 255, 255)",
              "main": "#FF5722",
              "light": "#FF8A65",
              "dark": "#E64A19"
            },
            "neutral": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(3, 3, 3)",
              "5": "rgb(13, 13, 13)",
              "10": "rgb(26, 26, 26)",
              "20": "rgb(51, 51, 51)",
              "30": "rgb(77, 77, 77)",
              "40": "rgb(102, 102, 102)",
              "50": "rgb(128, 128, 128)",
              "60": "rgb(153, 153, 153)",
              "70": "rgb(179, 179, 179)",
              "80": "rgb(204, 204, 204)",
              "90": "rgb(230, 230, 230)",
              "95": "rgb(242, 242, 242)",
              "99": "rgb(252, 252, 252)",
              "100": "rgb(255, 255, 255)",
              "main": "#000000",
              "light": "rgb(26, 26, 26)",
              "dark": "rgb(26, 26, 26)"
            }
          }));
        });

      });

      to('visual_contrast', async () => {
        // Browser
        const valueBrowsers = await evaluate((window: any) => {
          const amauiTheme = new window.AmauiStyle.AmauiTheme({
            palette: {
              visual_contrast: {
                regular: {
                  opacity: {
                    primary: .44
                  },
                }
              }
            }
          });

          return amauiTheme.palette.text.default;
        }, { browsers });

        // Node
        const amauiTheme = new AmauiStyle.AmauiTheme({
          palette: {
            visual_contrast: {
              regular: {
                opacity: {
                  primary: .44
                }
              }
            }
          }
        });

        const valueNode = amauiTheme.palette.text.default;

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql({
          "primary": "rgba(0, 0, 0, 0.44)",
          "secondary": "rgba(0, 0, 0, 0.54)",
          "tertiary": "rgba(0, 0, 0, 0.37)",
          "quaternary": "rgba(0, 0, 0, 0.24)"
        }));
      });

      to('color', async () => {
        // Browser
        const valueBrowsers = await evaluate((window: any) => {
          const amauiTheme = new window.AmauiStyle.AmauiTheme({
            palette: {
              color: {
                a: {
                  main: '#f4f4da'
                }
              }
            }
          });

          return amauiTheme.palette.color;
        }, { browsers });

        // Node
        const amauiTheme = new AmauiStyle.AmauiTheme({
          palette: {
            color: {
              a: '#f4f4da'
            }
          }
        });

        const valueNode = amauiTheme.palette.color;

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql({
          "primary": {
            "0": "rgb(0, 0, 0)",
            "1": "rgb(5, 5, 0)",
            "5": "rgb(26, 23, 0)",
            "10": "rgb(51, 46, 0)",
            "20": "rgb(102, 92, 0)",
            "30": "rgb(153, 138, 0)",
            "40": "rgb(204, 184, 0)",
            "50": "rgb(255, 230, 0)",
            "60": "rgb(255, 235, 51)",
            "70": "rgb(255, 240, 102)",
            "80": "rgb(255, 245, 153)",
            "90": "rgb(255, 250, 204)",
            "95": "rgb(255, 252, 229)",
            "99": "rgb(255, 254, 250)",
            "100": "rgb(255, 255, 255)",
            "main": "#FFEB3B",
            "light": "#FFF176",
            "dark": "#FBC02D"
          },
          "secondary": {
            "0": "rgb(0, 0, 0)",
            "1": "rgb(3, 4, 1)",
            "5": "rgb(13, 19, 6)",
            "10": "rgb(26, 38, 13)",
            "20": "rgb(53, 77, 26)",
            "30": "rgb(79, 115, 38)",
            "40": "rgb(105, 153, 51)",
            "50": "rgb(132, 191, 64)",
            "60": "rgb(156, 204, 102)",
            "70": "rgb(181, 217, 140)",
            "80": "rgb(206, 230, 179)",
            "90": "rgb(230, 242, 217)",
            "95": "rgb(243, 249, 236)",
            "99": "rgb(253, 254, 251)",
            "100": "rgb(255, 255, 255)",
            "main": "#8BC34A",
            "light": "#AED581",
            "dark": "#689F38"
          },
          "tertiary": {
            "0": "rgb(0, 0, 0)",
            "1": "rgb(5, 4, 0)",
            "5": "rgb(26, 19, 0)",
            "10": "rgb(51, 38, 0)",
            "20": "rgb(102, 77, 0)",
            "30": "rgb(153, 115, 0)",
            "40": "rgb(204, 153, 0)",
            "50": "rgb(255, 191, 0)",
            "60": "rgb(255, 204, 51)",
            "70": "rgb(255, 217, 102)",
            "80": "rgb(255, 230, 153)",
            "90": "rgb(255, 242, 204)",
            "95": "rgb(255, 249, 229)",
            "99": "rgb(255, 254, 250)",
            "100": "rgb(255, 255, 255)",
            "main": "#FFC107",
            "light": "#FFD54F",
            "dark": "#FFA000"
          },
          "quaternary": {
            "0": "rgb(0, 0, 0)",
            "1": "rgb(0, 5, 5)",
            "5": "rgb(0, 23, 26)",
            "10": "rgb(0, 45, 51)",
            "20": "rgb(0, 90, 102)",
            "30": "rgb(0, 135, 153)",
            "40": "rgb(0, 180, 204)",
            "50": "rgb(0, 225, 255)",
            "60": "rgb(51, 231, 255)",
            "70": "rgb(102, 237, 255)",
            "80": "rgb(153, 243, 255)",
            "90": "rgb(204, 249, 255)",
            "95": "rgb(229, 252, 255)",
            "99": "rgb(250, 254, 255)",
            "100": "rgb(255, 255, 255)",
            "main": "#00BCD4",
            "light": "#4DD0E1",
            "dark": "#0097A7"
          },
          "info": {
            "0": "rgb(0, 0, 0)",
            "1": "rgb(0, 3, 5)",
            "5": "rgb(0, 17, 25)",
            "10": "rgb(1, 35, 50)",
            "20": "rgb(1, 69, 101)",
            "30": "rgb(2, 104, 151)",
            "40": "rgb(2, 139, 202)",
            "50": "rgb(3, 173, 252)",
            "60": "rgb(53, 190, 253)",
            "70": "rgb(104, 206, 253)",
            "80": "rgb(154, 222, 254)",
            "90": "rgb(205, 239, 254)",
            "95": "rgb(230, 247, 255)",
            "99": "rgb(250, 253, 255)",
            "100": "rgb(255, 255, 255)",
            "main": "#03A9F4",
            "light": "#4FC3F7",
            "dark": "#0288D1"
          },
          "success": {
            "0": "rgb(0, 0, 0)",
            "1": "rgb(2, 4, 2)",
            "5": "rgb(8, 18, 8)",
            "10": "rgb(16, 35, 16)",
            "20": "rgb(31, 71, 32)",
            "30": "rgb(47, 106, 49)",
            "40": "rgb(62, 142, 65)",
            "50": "rgb(78, 177, 81)",
            "60": "rgb(113, 193, 116)",
            "70": "rgb(149, 208, 151)",
            "80": "rgb(184, 224, 185)",
            "90": "rgb(220, 239, 220)",
            "95": "rgb(237, 247, 238)",
            "99": "rgb(251, 253, 252)",
            "100": "rgb(255, 255, 255)",
            "main": "#4CAF50",
            "light": "#81C784",
            "dark": "#388E3C"
          },
          "warning": {
            "0": "rgb(0, 0, 0)",
            "1": "rgb(5, 3, 0)",
            "5": "rgb(26, 15, 0)",
            "10": "rgb(51, 31, 0)",
            "20": "rgb(102, 61, 0)",
            "30": "rgb(153, 92, 0)",
            "40": "rgb(204, 122, 0)",
            "50": "rgb(255, 153, 0)",
            "60": "rgb(255, 173, 51)",
            "70": "rgb(255, 194, 102)",
            "80": "rgb(255, 214, 153)",
            "90": "rgb(255, 235, 204)",
            "95": "rgb(255, 245, 229)",
            "99": "rgb(255, 253, 250)",
            "100": "rgb(255, 255, 255)",
            "main": "#FF9800",
            "light": "#FFB74D",
            "dark": "#F57C00"
          },
          "error": {
            "0": "rgb(0, 0, 0)",
            "1": "rgb(5, 1, 0)",
            "5": "rgb(26, 6, 0)",
            "10": "rgb(51, 12, 0)",
            "20": "rgb(102, 24, 0)",
            "30": "rgb(153, 36, 0)",
            "40": "rgb(204, 48, 0)",
            "50": "rgb(255, 60, 0)",
            "60": "rgb(255, 99, 51)",
            "70": "rgb(255, 138, 102)",
            "80": "rgb(255, 177, 153)",
            "90": "rgb(255, 216, 204)",
            "95": "rgb(255, 235, 229)",
            "99": "rgb(255, 251, 250)",
            "100": "rgb(255, 255, 255)",
            "main": "#FF5722",
            "light": "#FF8A65",
            "dark": "#E64A19"
          },
          "neutral": {
            "0": "rgb(0, 0, 0)",
            "1": "rgb(3, 3, 3)",
            "5": "rgb(13, 13, 13)",
            "10": "rgb(26, 26, 26)",
            "20": "rgb(51, 51, 51)",
            "30": "rgb(77, 77, 77)",
            "40": "rgb(102, 102, 102)",
            "50": "rgb(128, 128, 128)",
            "60": "rgb(153, 153, 153)",
            "70": "rgb(179, 179, 179)",
            "80": "rgb(204, 204, 204)",
            "90": "rgb(230, 230, 230)",
            "95": "rgb(242, 242, 242)",
            "99": "rgb(252, 252, 252)",
            "100": "rgb(255, 255, 255)",
            "main": "#000000",
            "light": "rgb(26, 26, 26)",
            "dark": "rgb(26, 26, 26)"
          },
          "a": {
            "0": "rgb(0, 0, 0)",
            "1": "rgb(4, 4, 1)",
            "5": "rgb(20, 20, 6)",
            "10": "rgb(39, 39, 12)",
            "20": "rgb(79, 79, 23)",
            "30": "rgb(118, 118, 35)",
            "40": "rgb(157, 157, 47)",
            "50": "rgb(196, 196, 59)",
            "60": "rgb(208, 208, 98)",
            "70": "rgb(220, 220, 137)",
            "80": "rgb(232, 232, 176)",
            "90": "rgb(243, 243, 216)",
            "95": "rgb(249, 249, 235)",
            "99": "rgb(254, 254, 251)",
            "100": "rgb(255, 255, 255)",
            "main": "#f4f4da",
            "light": "rgb(243, 243, 216)",
            "dark": "rgb(220, 220, 137)"
          }
        }));
      });

      to('text', async () => {
        // Browser
        const valueBrowsers = await evaluate((window: any) => {
          const amauiTheme = new window.AmauiStyle.AmauiTheme({
            palette: {
              text: {
                a: 'yellow'
              }
            }
          });

          return amauiTheme.palette.text;
        }, { browsers });

        // Node
        const amauiTheme = new AmauiStyle.AmauiTheme({
          palette: {
            text: {
              a: 'yellow'
            }
          }
        });

        const valueNode = amauiTheme.palette.text;

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql({
          "a": "yellow",
          "primary": {
            "primary": "rgba(153, 138, 0, 0.87)",
            "secondary": "rgba(153, 138, 0, 0.54)",
            "tertiary": "rgba(153, 138, 0, 0.37)",
            "quaternary": "rgba(153, 138, 0, 0.24)"
          },
          "secondary": {
            "primary": "rgba(79, 115, 38, 0.87)",
            "secondary": "rgba(79, 115, 38, 0.54)",
            "tertiary": "rgba(79, 115, 38, 0.37)",
            "quaternary": "rgba(79, 115, 38, 0.24)"
          },
          "tertiary": {
            "primary": "rgba(153, 115, 0, 0.87)",
            "secondary": "rgba(153, 115, 0, 0.54)",
            "tertiary": "rgba(153, 115, 0, 0.37)",
            "quaternary": "rgba(153, 115, 0, 0.24)"
          },
          "quaternary": {
            "primary": "rgba(0, 135, 153, 0.87)",
            "secondary": "rgba(0, 135, 153, 0.54)",
            "tertiary": "rgba(0, 135, 153, 0.37)",
            "quaternary": "rgba(0, 135, 153, 0.24)"
          },
          "info": {
            "primary": "rgba(2, 104, 151, 0.87)",
            "secondary": "rgba(2, 104, 151, 0.54)",
            "tertiary": "rgba(2, 104, 151, 0.37)",
            "quaternary": "rgba(2, 104, 151, 0.24)"
          },
          "success": {
            "primary": "rgba(47, 106, 49, 0.87)",
            "secondary": "rgba(47, 106, 49, 0.54)",
            "tertiary": "rgba(47, 106, 49, 0.37)",
            "quaternary": "rgba(47, 106, 49, 0.24)"
          },
          "warning": {
            "primary": "rgba(153, 92, 0, 0.87)",
            "secondary": "rgba(153, 92, 0, 0.54)",
            "tertiary": "rgba(153, 92, 0, 0.37)",
            "quaternary": "rgba(153, 92, 0, 0.24)"
          },
          "error": {
            "primary": "rgba(153, 36, 0, 0.87)",
            "secondary": "rgba(153, 36, 0, 0.54)",
            "tertiary": "rgba(153, 36, 0, 0.37)",
            "quaternary": "rgba(153, 36, 0, 0.24)"
          },
          "neutral": {
            "primary": "rgba(0, 0, 0, 0.87)",
            "secondary": "rgba(0, 0, 0, 0.54)",
            "tertiary": "rgba(0, 0, 0, 0.37)",
            "quaternary": "rgba(0, 0, 0, 0.24)"
          },
          "default": {
            "primary": "rgba(0, 0, 0, 0.87)",
            "secondary": "rgba(0, 0, 0, 0.54)",
            "tertiary": "rgba(0, 0, 0, 0.37)",
            "quaternary": "rgba(0, 0, 0, 0.24)"
          },
          "divider": "rgba(0, 0, 0, 0.14)",
          "active": "rgba(0, 0, 0, 0.54)",
          "hover": "rgba(0, 0, 0, 0.04)",
          "selected": "rgba(0, 0, 0, 0.07)",
          "focus": "rgba(0, 0, 0, 0.11)",
          "disabled": "rgba(0, 0, 0, 0.37)"
        }));
      });

      to('background', async () => {
        // Browser
        const valueBrowsers = await evaluate((window: any) => {
          const amauiTheme = new window.AmauiStyle.AmauiTheme({
            palette: {
              background: {
                a: 'yellow'
              }
            }
          });

          return amauiTheme.palette.background;
        }, { browsers });

        // Node
        const amauiTheme = new AmauiStyle.AmauiTheme({
          palette: {
            background: {
              a: 'yellow'
            }
          }
        });

        const valueNode = amauiTheme.palette.background;

        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql({
          "a": "yellow",
          "primary": {
            "primary": "rgb(255, 255, 255)",
            "secondary": "rgb(255, 254, 250)",
            "tertiary": "rgb(255, 252, 229)",
            "quaternary": "rgb(255, 250, 204)"
          },
          "secondary": {
            "primary": "rgb(255, 255, 255)",
            "secondary": "rgb(253, 254, 251)",
            "tertiary": "rgb(243, 249, 236)",
            "quaternary": "rgb(230, 242, 217)"
          },
          "tertiary": {
            "primary": "rgb(255, 255, 255)",
            "secondary": "rgb(255, 254, 250)",
            "tertiary": "rgb(255, 249, 229)",
            "quaternary": "rgb(255, 242, 204)"
          },
          "quaternary": {
            "primary": "rgb(255, 255, 255)",
            "secondary": "rgb(250, 254, 255)",
            "tertiary": "rgb(229, 252, 255)",
            "quaternary": "rgb(204, 249, 255)"
          },
          "info": {
            "primary": "rgb(255, 255, 255)",
            "secondary": "rgb(250, 253, 255)",
            "tertiary": "rgb(230, 247, 255)",
            "quaternary": "rgb(205, 239, 254)"
          },
          "success": {
            "primary": "rgb(255, 255, 255)",
            "secondary": "rgb(251, 253, 252)",
            "tertiary": "rgb(237, 247, 238)",
            "quaternary": "rgb(220, 239, 220)"
          },
          "warning": {
            "primary": "rgb(255, 255, 255)",
            "secondary": "rgb(255, 253, 250)",
            "tertiary": "rgb(255, 245, 229)",
            "quaternary": "rgb(255, 235, 204)"
          },
          "error": {
            "primary": "rgb(255, 255, 255)",
            "secondary": "rgb(255, 251, 250)",
            "tertiary": "rgb(255, 235, 229)",
            "quaternary": "rgb(255, 216, 204)"
          },
          "neutral": {
            "primary": "rgb(255, 255, 255)",
            "secondary": "rgb(252, 252, 252)",
            "tertiary": "rgb(242, 242, 242)",
            "quaternary": "rgb(230, 230, 230)"
          },
          "default": {
            "primary": "rgb(255, 255, 255)",
            "secondary": "rgb(252, 252, 252)",
            "tertiary": "rgb(242, 242, 242)",
            "quaternary": "rgb(230, 230, 230)"
          }
        }));
      });

    });

    to('shape', async () => {
      // Browser
      const valueBrowsers = await evaluate((window: any) => {
        const amauiTheme = new window.AmauiStyle.AmauiTheme({
          shape: {
            radius: {
              a: 4
            }
          }
        });

        return amauiTheme.shape;
      }, { browsers });

      // Node
      const amauiTheme = new AmauiStyle.AmauiTheme({
        shape: {
          radius: {
            a: 4
          }
        }
      });

      const valueNode = amauiTheme.shape;

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql({
        "radius": {
          "a": 4,
          "xs": 4,
          "sm": 8,
          "md": 12,
          "lg": 16,
          "xl": 28
        }
      }));
    });

    to('breakpoints', async () => {
      // Browser
      const valueBrowsers = await evaluate((window: any) => {
        const amauiTheme = new window.AmauiStyle.AmauiTheme({
          breakpoints: {
            values: {
              a: 1114,
            },
            unit: 'em'
          }
        });

        return ({ values: amauiTheme.breakpoints.values, unit: amauiTheme.breakpoints.unit, keys: amauiTheme.breakpoints.keys });
      }, { browsers });

      // Node
      const amauiTheme = new AmauiStyle.AmauiTheme({
        breakpoints: {
          values: {
            a: 1114,
          },
          unit: 'em'
        }
      });

      const valueNode = ({ values: amauiTheme.breakpoints.values, unit: amauiTheme.breakpoints.unit, keys: amauiTheme.breakpoints.keys });

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql({
        "values": {
          "a": 1114,
          "xs": 0,
          "sm": 600,
          "md": 1240,
          "lg": 1440,
          "xl": 1920
        },
        "unit": "em",
        "keys": [
          "a",
          "xs",
          "sm",
          "md",
          "lg",
          "xl"
        ]
      }));
    });

    to('space', async () => {
      // Browser
      const valueBrowsers = await evaluate((window: any) => {
        const amauiTheme = new window.AmauiStyle.AmauiTheme({
          space: {
            values: {
              a: 1114,
            },
            unit: 7
          }
        });

        return ({ values: amauiTheme.space.values, unit: amauiTheme.space.unit, keys: amauiTheme.space.keys });
      }, { browsers });

      // Node
      const amauiTheme = new AmauiStyle.AmauiTheme({
        space: {
          values: {
            a: 1114,
          },
          unit: 7
        }
      });

      const valueNode = ({ values: amauiTheme.space.values, unit: amauiTheme.space.unit, keys: amauiTheme.space.keys });

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql({
        "values": {
          "a": 1114,
          "xs": 4,
          "sm": 7,
          "md": 14,
          "lg": 28,
          "xl": 56
        },
        "unit": 7,
        "keys": [
          "a",
          "xs",
          "sm",
          "md",
          "lg",
          "xl"
        ]
      }));
    });

    to('shadows', async () => {
      // Browser
      const valueBrowsers = await evaluate((window: any) => {
        const amauiTheme = new window.AmauiStyle.AmauiTheme({
          shadows: {
            values: {
              a: 4
            },
            opacities: [.14, .114, .1114],
          }
        });

        return amauiTheme.shadows;
      }, { browsers });

      // Node
      const amauiTheme = new AmauiStyle.AmauiTheme({
        shadows: {
          values: {
            a: 4
          },
          opacities: [.14, .114, .1114],
        }
      });

      const valueNode = amauiTheme.shadows;

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql({
        "values": {
          "a": 4,
          "primary": {
            "0": "none",
            "1": "0px 1px 1px 0px rgba(255, 235, 59, 0.14), 0px 2px 1px -1px rgba(255, 235, 59, 0.114), 0px 1px 3px 0px rgba(255, 235, 59, 0.1114)",
            "2": "0px 2px 2px 0px rgba(255, 235, 59, 0.14), 0px 3px 3px -2px rgba(255, 235, 59, 0.114), 0px 1px 8px 0px rgba(255, 235, 59, 0.1114)",
            "3": "0px 3px 4px 0px rgba(255, 235, 59, 0.14), 0px 3px 3px -2px rgba(255, 235, 59, 0.114), 0px 1px 8px 0px rgba(255, 235, 59, 0.1114)",
            "4": "0px 4px 5px 0px rgba(255, 235, 59, 0.14), 0px 1px 10px 0px rgba(255, 235, 59, 0.114), 0px 2px 4px -1px rgba(255, 235, 59, 0.1114)",
            "6": "0px 6px 10px 0px rgba(255, 235, 59, 0.14), 0px 1px 18px 0px rgba(255, 235, 59, 0.114), 0px 3px 5px -1px rgba(255, 235, 59, 0.1114)",
            "8": "0px 8px 10px 1px rgba(255, 235, 59, 0.14), 0px 3px 14px 2px rgba(255, 235, 59, 0.114), 0px 5px 5px -3px rgba(255, 235, 59, 0.1114)",
            "9": "0px 9px 12px 1px rgba(255, 235, 59, 0.14), 0px 3px 16px 2px rgba(255, 235, 59, 0.114), 0px 5px 6px -3px rgba(255, 235, 59, 0.1114)",
            "12": "0px 12px 17px 2px rgba(255, 235, 59, 0.14), 0px 5px 22px 4px rgba(255, 235, 59, 0.114), 0px 7px 7px -4px rgba(255, 235, 59, 0.1114)",
            "16": "0px 16px 24px 2px rgba(255, 235, 59, 0.14), 0px 6px 30px 5px rgba(255, 235, 59, 0.114), 0px 8px 10px -5px rgba(255, 235, 59, 0.1114)",
            "24": "0px 24px 37px 3px rgba(255, 235, 59, 0.14), 0px 9px 46px 8px rgba(255, 235, 59, 0.114), 0px 11px 15px -7px rgba(255, 235, 59, 0.1114)"
          },
          "secondary": {
            "0": "none",
            "1": "0px 1px 1px 0px rgba(139, 195, 74, 0.14), 0px 2px 1px -1px rgba(139, 195, 74, 0.114), 0px 1px 3px 0px rgba(139, 195, 74, 0.1114)",
            "2": "0px 2px 2px 0px rgba(139, 195, 74, 0.14), 0px 3px 3px -2px rgba(139, 195, 74, 0.114), 0px 1px 8px 0px rgba(139, 195, 74, 0.1114)",
            "3": "0px 3px 4px 0px rgba(139, 195, 74, 0.14), 0px 3px 3px -2px rgba(139, 195, 74, 0.114), 0px 1px 8px 0px rgba(139, 195, 74, 0.1114)",
            "4": "0px 4px 5px 0px rgba(139, 195, 74, 0.14), 0px 1px 10px 0px rgba(139, 195, 74, 0.114), 0px 2px 4px -1px rgba(139, 195, 74, 0.1114)",
            "6": "0px 6px 10px 0px rgba(139, 195, 74, 0.14), 0px 1px 18px 0px rgba(139, 195, 74, 0.114), 0px 3px 5px -1px rgba(139, 195, 74, 0.1114)",
            "8": "0px 8px 10px 1px rgba(139, 195, 74, 0.14), 0px 3px 14px 2px rgba(139, 195, 74, 0.114), 0px 5px 5px -3px rgba(139, 195, 74, 0.1114)",
            "9": "0px 9px 12px 1px rgba(139, 195, 74, 0.14), 0px 3px 16px 2px rgba(139, 195, 74, 0.114), 0px 5px 6px -3px rgba(139, 195, 74, 0.1114)",
            "12": "0px 12px 17px 2px rgba(139, 195, 74, 0.14), 0px 5px 22px 4px rgba(139, 195, 74, 0.114), 0px 7px 7px -4px rgba(139, 195, 74, 0.1114)",
            "16": "0px 16px 24px 2px rgba(139, 195, 74, 0.14), 0px 6px 30px 5px rgba(139, 195, 74, 0.114), 0px 8px 10px -5px rgba(139, 195, 74, 0.1114)",
            "24": "0px 24px 37px 3px rgba(139, 195, 74, 0.14), 0px 9px 46px 8px rgba(139, 195, 74, 0.114), 0px 11px 15px -7px rgba(139, 195, 74, 0.1114)"
          },
          "tertiary": {
            "0": "none",
            "1": "0px 1px 1px 0px rgba(255, 193, 7, 0.14), 0px 2px 1px -1px rgba(255, 193, 7, 0.114), 0px 1px 3px 0px rgba(255, 193, 7, 0.1114)",
            "2": "0px 2px 2px 0px rgba(255, 193, 7, 0.14), 0px 3px 3px -2px rgba(255, 193, 7, 0.114), 0px 1px 8px 0px rgba(255, 193, 7, 0.1114)",
            "3": "0px 3px 4px 0px rgba(255, 193, 7, 0.14), 0px 3px 3px -2px rgba(255, 193, 7, 0.114), 0px 1px 8px 0px rgba(255, 193, 7, 0.1114)",
            "4": "0px 4px 5px 0px rgba(255, 193, 7, 0.14), 0px 1px 10px 0px rgba(255, 193, 7, 0.114), 0px 2px 4px -1px rgba(255, 193, 7, 0.1114)",
            "6": "0px 6px 10px 0px rgba(255, 193, 7, 0.14), 0px 1px 18px 0px rgba(255, 193, 7, 0.114), 0px 3px 5px -1px rgba(255, 193, 7, 0.1114)",
            "8": "0px 8px 10px 1px rgba(255, 193, 7, 0.14), 0px 3px 14px 2px rgba(255, 193, 7, 0.114), 0px 5px 5px -3px rgba(255, 193, 7, 0.1114)",
            "9": "0px 9px 12px 1px rgba(255, 193, 7, 0.14), 0px 3px 16px 2px rgba(255, 193, 7, 0.114), 0px 5px 6px -3px rgba(255, 193, 7, 0.1114)",
            "12": "0px 12px 17px 2px rgba(255, 193, 7, 0.14), 0px 5px 22px 4px rgba(255, 193, 7, 0.114), 0px 7px 7px -4px rgba(255, 193, 7, 0.1114)",
            "16": "0px 16px 24px 2px rgba(255, 193, 7, 0.14), 0px 6px 30px 5px rgba(255, 193, 7, 0.114), 0px 8px 10px -5px rgba(255, 193, 7, 0.1114)",
            "24": "0px 24px 37px 3px rgba(255, 193, 7, 0.14), 0px 9px 46px 8px rgba(255, 193, 7, 0.114), 0px 11px 15px -7px rgba(255, 193, 7, 0.1114)"
          },
          "quaternary": {
            "0": "none",
            "1": "0px 1px 1px 0px rgba(0, 188, 212, 0.14), 0px 2px 1px -1px rgba(0, 188, 212, 0.114), 0px 1px 3px 0px rgba(0, 188, 212, 0.1114)",
            "2": "0px 2px 2px 0px rgba(0, 188, 212, 0.14), 0px 3px 3px -2px rgba(0, 188, 212, 0.114), 0px 1px 8px 0px rgba(0, 188, 212, 0.1114)",
            "3": "0px 3px 4px 0px rgba(0, 188, 212, 0.14), 0px 3px 3px -2px rgba(0, 188, 212, 0.114), 0px 1px 8px 0px rgba(0, 188, 212, 0.1114)",
            "4": "0px 4px 5px 0px rgba(0, 188, 212, 0.14), 0px 1px 10px 0px rgba(0, 188, 212, 0.114), 0px 2px 4px -1px rgba(0, 188, 212, 0.1114)",
            "6": "0px 6px 10px 0px rgba(0, 188, 212, 0.14), 0px 1px 18px 0px rgba(0, 188, 212, 0.114), 0px 3px 5px -1px rgba(0, 188, 212, 0.1114)",
            "8": "0px 8px 10px 1px rgba(0, 188, 212, 0.14), 0px 3px 14px 2px rgba(0, 188, 212, 0.114), 0px 5px 5px -3px rgba(0, 188, 212, 0.1114)",
            "9": "0px 9px 12px 1px rgba(0, 188, 212, 0.14), 0px 3px 16px 2px rgba(0, 188, 212, 0.114), 0px 5px 6px -3px rgba(0, 188, 212, 0.1114)",
            "12": "0px 12px 17px 2px rgba(0, 188, 212, 0.14), 0px 5px 22px 4px rgba(0, 188, 212, 0.114), 0px 7px 7px -4px rgba(0, 188, 212, 0.1114)",
            "16": "0px 16px 24px 2px rgba(0, 188, 212, 0.14), 0px 6px 30px 5px rgba(0, 188, 212, 0.114), 0px 8px 10px -5px rgba(0, 188, 212, 0.1114)",
            "24": "0px 24px 37px 3px rgba(0, 188, 212, 0.14), 0px 9px 46px 8px rgba(0, 188, 212, 0.114), 0px 11px 15px -7px rgba(0, 188, 212, 0.1114)"
          },
          "info": {
            "0": "none",
            "1": "0px 1px 1px 0px rgba(3, 169, 244, 0.14), 0px 2px 1px -1px rgba(3, 169, 244, 0.114), 0px 1px 3px 0px rgba(3, 169, 244, 0.1114)",
            "2": "0px 2px 2px 0px rgba(3, 169, 244, 0.14), 0px 3px 3px -2px rgba(3, 169, 244, 0.114), 0px 1px 8px 0px rgba(3, 169, 244, 0.1114)",
            "3": "0px 3px 4px 0px rgba(3, 169, 244, 0.14), 0px 3px 3px -2px rgba(3, 169, 244, 0.114), 0px 1px 8px 0px rgba(3, 169, 244, 0.1114)",
            "4": "0px 4px 5px 0px rgba(3, 169, 244, 0.14), 0px 1px 10px 0px rgba(3, 169, 244, 0.114), 0px 2px 4px -1px rgba(3, 169, 244, 0.1114)",
            "6": "0px 6px 10px 0px rgba(3, 169, 244, 0.14), 0px 1px 18px 0px rgba(3, 169, 244, 0.114), 0px 3px 5px -1px rgba(3, 169, 244, 0.1114)",
            "8": "0px 8px 10px 1px rgba(3, 169, 244, 0.14), 0px 3px 14px 2px rgba(3, 169, 244, 0.114), 0px 5px 5px -3px rgba(3, 169, 244, 0.1114)",
            "9": "0px 9px 12px 1px rgba(3, 169, 244, 0.14), 0px 3px 16px 2px rgba(3, 169, 244, 0.114), 0px 5px 6px -3px rgba(3, 169, 244, 0.1114)",
            "12": "0px 12px 17px 2px rgba(3, 169, 244, 0.14), 0px 5px 22px 4px rgba(3, 169, 244, 0.114), 0px 7px 7px -4px rgba(3, 169, 244, 0.1114)",
            "16": "0px 16px 24px 2px rgba(3, 169, 244, 0.14), 0px 6px 30px 5px rgba(3, 169, 244, 0.114), 0px 8px 10px -5px rgba(3, 169, 244, 0.1114)",
            "24": "0px 24px 37px 3px rgba(3, 169, 244, 0.14), 0px 9px 46px 8px rgba(3, 169, 244, 0.114), 0px 11px 15px -7px rgba(3, 169, 244, 0.1114)"
          },
          "success": {
            "0": "none",
            "1": "0px 1px 1px 0px rgba(76, 175, 80, 0.14), 0px 2px 1px -1px rgba(76, 175, 80, 0.114), 0px 1px 3px 0px rgba(76, 175, 80, 0.1114)",
            "2": "0px 2px 2px 0px rgba(76, 175, 80, 0.14), 0px 3px 3px -2px rgba(76, 175, 80, 0.114), 0px 1px 8px 0px rgba(76, 175, 80, 0.1114)",
            "3": "0px 3px 4px 0px rgba(76, 175, 80, 0.14), 0px 3px 3px -2px rgba(76, 175, 80, 0.114), 0px 1px 8px 0px rgba(76, 175, 80, 0.1114)",
            "4": "0px 4px 5px 0px rgba(76, 175, 80, 0.14), 0px 1px 10px 0px rgba(76, 175, 80, 0.114), 0px 2px 4px -1px rgba(76, 175, 80, 0.1114)",
            "6": "0px 6px 10px 0px rgba(76, 175, 80, 0.14), 0px 1px 18px 0px rgba(76, 175, 80, 0.114), 0px 3px 5px -1px rgba(76, 175, 80, 0.1114)",
            "8": "0px 8px 10px 1px rgba(76, 175, 80, 0.14), 0px 3px 14px 2px rgba(76, 175, 80, 0.114), 0px 5px 5px -3px rgba(76, 175, 80, 0.1114)",
            "9": "0px 9px 12px 1px rgba(76, 175, 80, 0.14), 0px 3px 16px 2px rgba(76, 175, 80, 0.114), 0px 5px 6px -3px rgba(76, 175, 80, 0.1114)",
            "12": "0px 12px 17px 2px rgba(76, 175, 80, 0.14), 0px 5px 22px 4px rgba(76, 175, 80, 0.114), 0px 7px 7px -4px rgba(76, 175, 80, 0.1114)",
            "16": "0px 16px 24px 2px rgba(76, 175, 80, 0.14), 0px 6px 30px 5px rgba(76, 175, 80, 0.114), 0px 8px 10px -5px rgba(76, 175, 80, 0.1114)",
            "24": "0px 24px 37px 3px rgba(76, 175, 80, 0.14), 0px 9px 46px 8px rgba(76, 175, 80, 0.114), 0px 11px 15px -7px rgba(76, 175, 80, 0.1114)"
          },
          "warning": {
            "0": "none",
            "1": "0px 1px 1px 0px rgba(255, 152, 0, 0.14), 0px 2px 1px -1px rgba(255, 152, 0, 0.114), 0px 1px 3px 0px rgba(255, 152, 0, 0.1114)",
            "2": "0px 2px 2px 0px rgba(255, 152, 0, 0.14), 0px 3px 3px -2px rgba(255, 152, 0, 0.114), 0px 1px 8px 0px rgba(255, 152, 0, 0.1114)",
            "3": "0px 3px 4px 0px rgba(255, 152, 0, 0.14), 0px 3px 3px -2px rgba(255, 152, 0, 0.114), 0px 1px 8px 0px rgba(255, 152, 0, 0.1114)",
            "4": "0px 4px 5px 0px rgba(255, 152, 0, 0.14), 0px 1px 10px 0px rgba(255, 152, 0, 0.114), 0px 2px 4px -1px rgba(255, 152, 0, 0.1114)",
            "6": "0px 6px 10px 0px rgba(255, 152, 0, 0.14), 0px 1px 18px 0px rgba(255, 152, 0, 0.114), 0px 3px 5px -1px rgba(255, 152, 0, 0.1114)",
            "8": "0px 8px 10px 1px rgba(255, 152, 0, 0.14), 0px 3px 14px 2px rgba(255, 152, 0, 0.114), 0px 5px 5px -3px rgba(255, 152, 0, 0.1114)",
            "9": "0px 9px 12px 1px rgba(255, 152, 0, 0.14), 0px 3px 16px 2px rgba(255, 152, 0, 0.114), 0px 5px 6px -3px rgba(255, 152, 0, 0.1114)",
            "12": "0px 12px 17px 2px rgba(255, 152, 0, 0.14), 0px 5px 22px 4px rgba(255, 152, 0, 0.114), 0px 7px 7px -4px rgba(255, 152, 0, 0.1114)",
            "16": "0px 16px 24px 2px rgba(255, 152, 0, 0.14), 0px 6px 30px 5px rgba(255, 152, 0, 0.114), 0px 8px 10px -5px rgba(255, 152, 0, 0.1114)",
            "24": "0px 24px 37px 3px rgba(255, 152, 0, 0.14), 0px 9px 46px 8px rgba(255, 152, 0, 0.114), 0px 11px 15px -7px rgba(255, 152, 0, 0.1114)"
          },
          "error": {
            "0": "none",
            "1": "0px 1px 1px 0px rgba(255, 87, 34, 0.14), 0px 2px 1px -1px rgba(255, 87, 34, 0.114), 0px 1px 3px 0px rgba(255, 87, 34, 0.1114)",
            "2": "0px 2px 2px 0px rgba(255, 87, 34, 0.14), 0px 3px 3px -2px rgba(255, 87, 34, 0.114), 0px 1px 8px 0px rgba(255, 87, 34, 0.1114)",
            "3": "0px 3px 4px 0px rgba(255, 87, 34, 0.14), 0px 3px 3px -2px rgba(255, 87, 34, 0.114), 0px 1px 8px 0px rgba(255, 87, 34, 0.1114)",
            "4": "0px 4px 5px 0px rgba(255, 87, 34, 0.14), 0px 1px 10px 0px rgba(255, 87, 34, 0.114), 0px 2px 4px -1px rgba(255, 87, 34, 0.1114)",
            "6": "0px 6px 10px 0px rgba(255, 87, 34, 0.14), 0px 1px 18px 0px rgba(255, 87, 34, 0.114), 0px 3px 5px -1px rgba(255, 87, 34, 0.1114)",
            "8": "0px 8px 10px 1px rgba(255, 87, 34, 0.14), 0px 3px 14px 2px rgba(255, 87, 34, 0.114), 0px 5px 5px -3px rgba(255, 87, 34, 0.1114)",
            "9": "0px 9px 12px 1px rgba(255, 87, 34, 0.14), 0px 3px 16px 2px rgba(255, 87, 34, 0.114), 0px 5px 6px -3px rgba(255, 87, 34, 0.1114)",
            "12": "0px 12px 17px 2px rgba(255, 87, 34, 0.14), 0px 5px 22px 4px rgba(255, 87, 34, 0.114), 0px 7px 7px -4px rgba(255, 87, 34, 0.1114)",
            "16": "0px 16px 24px 2px rgba(255, 87, 34, 0.14), 0px 6px 30px 5px rgba(255, 87, 34, 0.114), 0px 8px 10px -5px rgba(255, 87, 34, 0.1114)",
            "24": "0px 24px 37px 3px rgba(255, 87, 34, 0.14), 0px 9px 46px 8px rgba(255, 87, 34, 0.114), 0px 11px 15px -7px rgba(255, 87, 34, 0.1114)"
          },
          "neutral": {
            "0": "none",
            "1": "0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.114), 0px 1px 3px 0px rgba(0, 0, 0, 0.1114)",
            "2": "0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 3px -2px rgba(0, 0, 0, 0.114), 0px 1px 8px 0px rgba(0, 0, 0, 0.1114)",
            "3": "0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 3px 3px -2px rgba(0, 0, 0, 0.114), 0px 1px 8px 0px rgba(0, 0, 0, 0.1114)",
            "4": "0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.114), 0px 2px 4px -1px rgba(0, 0, 0, 0.1114)",
            "6": "0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.114), 0px 3px 5px -1px rgba(0, 0, 0, 0.1114)",
            "8": "0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.114), 0px 5px 5px -3px rgba(0, 0, 0, 0.1114)",
            "9": "0px 9px 12px 1px rgba(0, 0, 0, 0.14), 0px 3px 16px 2px rgba(0, 0, 0, 0.114), 0px 5px 6px -3px rgba(0, 0, 0, 0.1114)",
            "12": "0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.114), 0px 7px 7px -4px rgba(0, 0, 0, 0.1114)",
            "16": "0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.114), 0px 8px 10px -5px rgba(0, 0, 0, 0.1114)",
            "24": "0px 24px 37px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.114), 0px 11px 15px -7px rgba(0, 0, 0, 0.1114)"
          }
        },
        "opacities": [
          0.14,
          0.114,
          0.1114
        ]
      }));
    });

    to('typography', async () => {
      // Browser
      const valueBrowsers = await evaluate((window: any) => {
        const amauiTheme = new window.AmauiStyle.AmauiTheme({
          typography: {
            unit: 'em',

            font_size: {
              html: 14,
            },

            font_family: {
              primary: 'Arial',
            },

            values: {
              a: 4
            }
          }
        });

        return amauiTheme.typography;
      }, { browsers });

      // Node
      const amauiTheme = new AmauiStyle.AmauiTheme({
        typography: {
          unit: 'em',

          font_size: {
            html: 14,
          },

          font_family: {
            primary: 'Arial',
          },

          values: {
            a: 4
          }
        }
      });

      const valueNode = amauiTheme.typography;

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql({
        "unit": "em",
        "font_size": {
          "html": 14
        },
        "font_family": {
          "primary": "Arial",
          "secondary": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
          "mono": "Roboto Mono, monospace"
        },
        "values": {
          "a": 4,
          "d1": {
            "fontSize": "3.5625rem",
            "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
            "fontWeight": 400,
            "lineHeight": 1.1228070175438596,
            "letterSpacing": "0em"
          },
          "d2": {
            "fontSize": "2.8125rem",
            "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
            "fontWeight": 400,
            "lineHeight": 1.1555555555555554,
            "letterSpacing": "0em"
          },
          "d3": {
            "fontSize": "2.1875rem",
            "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
            "fontWeight": 400,
            "lineHeight": 1.2571428571428571,
            "letterSpacing": "0em"
          },
          "h1": {
            "fontSize": "2rem",
            "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
            "fontWeight": 400,
            "lineHeight": 1.25,
            "letterSpacing": "0em"
          },
          "h2": {
            "fontSize": "1.6875rem",
            "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
            "fontWeight": 400,
            "lineHeight": 1.2962962962962963,
            "letterSpacing": "0em"
          },
          "h3": {
            "fontSize": "1.5rem",
            "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
            "fontWeight": 400,
            "lineHeight": 1.3333333333333333,
            "letterSpacing": "0em"
          },
          "t1": {
            "fontSize": "1.3125rem",
            "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
            "fontWeight": 400,
            "lineHeight": 3.0476190476190474,
            "letterSpacing": "0em"
          },
          "t2": {
            "fontSize": "1rem",
            "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
            "fontWeight": 500,
            "lineHeight": 1.5,
            "letterSpacing": ".15em"
          },
          "t3": {
            "fontSize": "0.875rem",
            "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
            "fontWeight": 500,
            "lineHeight": 1.4285714285714286,
            "letterSpacing": ".1em"
          },
          "l1": {
            "fontSize": "0.875rem",
            "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
            "fontWeight": 500,
            "lineHeight": 1.4285714285714286,
            "letterSpacing": ".1em"
          },
          "l2": {
            "fontSize": "0.75rem",
            "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
            "fontWeight": 500,
            "lineHeight": 1.25,
            "letterSpacing": ".5em"
          },
          "l3": {
            "fontSize": "0.6875rem",
            "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
            "fontWeight": 500,
            "lineHeight": 0.45454545454545453,
            "letterSpacing": ".5em"
          },
          "b1": {
            "fontSize": "1rem",
            "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
            "fontWeight": 400,
            "lineHeight": 1.5,
            "letterSpacing": ".5em"
          },
          "b2": {
            "fontSize": "0.875rem",
            "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
            "fontWeight": 400,
            "lineHeight": 1.4285714285714286,
            "letterSpacing": ".25em"
          },
          "b3": {
            "fontSize": "0.6875rem",
            "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
            "fontWeight": 400,
            "lineHeight": 1.3636363636363635,
            "letterSpacing": ".4em"
          }
        }
      }));
    });

    to('transitions', async () => {
      // Browser
      const valueBrowsers = await evaluate((window: any) => {
        const amauiTheme = new window.AmauiStyle.AmauiTheme({
          transitions: {
            timing_function: {
              a: 'ease'
            },

            duration: {
              a: 114
            }
          }
        });

        return amauiTheme.transitions;
      }, { browsers });

      // Node
      const amauiTheme = new AmauiStyle.AmauiTheme({
        transitions: {
          timing_function: {
            a: 'ease'
          },

          duration: {
            a: 114
          }
        }
      });

      const valueNode = amauiTheme.transitions;

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql({
        "timing_function": {
          "a": "ease",
          "standard": "cubic-bezier(.4, 0, .2, 1)",
          "emphasized": "cubic-bezier(.4, 0, .6, 1) ",
          "decelerated": "cubic-bezier(0, 0, .2, 1)",
          "accelerated": "cubic-bezier(.4, 0, 1, 1)"
        },
        "duration": {
          "a": 114,
          "smallest": 100,
          "smaller": 200,
          "small": 250,
          "regular": 300,
          "enter": 250,
          "leave": 200,
          "complex": 500
        }
      }));
    });

    to('z_index', async () => {
      // Browser
      const valueBrowsers = await evaluate((window: any) => {
        const amauiTheme = new window.AmauiStyle.AmauiTheme({
          z_index: {
            a: 4
          }
        });

        return amauiTheme.z_index;
      }, { browsers });

      // Node
      const amauiTheme = new AmauiStyle.AmauiTheme({
        z_index: {
          a: 4
        }
      });

      const valueNode = amauiTheme.z_index;

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql({
        "a": 4,
        "tooltip": 1700,
        "modal": 1500,
        "menu_modal": 1400,
        "menu": 1300,
        "button_float": 1200,
        "app_bar": 1100,
        "main": 1000,
        "text": 0
      }));
    });

    group('methods', () => {

      group('palette', () => {

        to('image', async () => {
          // Browser
          const valueBrowsers = await evaluate(async (window: any) => {
            const amauiTheme = new window.AmauiStyle.AmauiTheme();

            return await amauiTheme.methods.palette.image(`/utils/images/image.jpg`);
          }, { browsers });

          // Info
          // Node atm not supported

          const values = [...valueBrowsers];

          assert(values[0]).eql([
            "rgb(203, 164, 43)",
            "rgb(187, 216, 239)",
            "rgb(84, 122, 138)",
            "rgb(118, 185, 233)"
          ]);

          assert(values[1]).eql([
            "rgb(207, 168, 49)",
            "rgb(187, 217, 242)",
            "rgb(82, 118, 130)",
            "rgb(116, 185, 233)"
          ]);

          assert(values[2]).eql([
            "rgb(203, 164, 44)",
            "rgb(186, 216, 239)",
            "rgb(84, 122, 136)",
            "rgb(118, 185, 233)"
          ]);
        });

        group('color', () => {

          to('value', async () => {
            // Browser
            const valueBrowsers = await evaluate(async (window: any) => {
              const amauiTheme = new window.AmauiStyle.AmauiTheme();

              const response = [
                amauiTheme.methods.palette.color.value('primary', 40, true)
              ];

              amauiTheme.update({ palette: { light: false } });

              response.push(amauiTheme.methods.palette.color.value('primary', 40, true));

              return response;
            }, { browsers });

            const amauiTheme = new AmauiStyle.AmauiTheme();

            const response = [
              amauiTheme.methods.palette.color.value('primary', 40, true)
            ];

            amauiTheme.update({ palette: { light: false } });

            response.push(amauiTheme.methods.palette.color.value('primary', 40, true));

            const valueNode = response;

            const values = [valueNode, ...valueBrowsers];

            values.forEach(value => assert(value).eql([
              "rgb(204, 184, 0)",
              "rgb(255, 235, 51)"
            ]));
          });

          to('text', async () => {
            // Browser
            const valueBrowsers = await evaluate(async (window: any) => {
              const amauiTheme = new window.AmauiStyle.AmauiTheme({
                preference: {
                  text: {
                    default: 'primary',
                  }
                }
              });

              const response = [
                amauiTheme.methods.palette.color.text(amauiTheme.palette.color.primary.main)
              ];

              amauiTheme.update({ preference: { visual_contrast: { default: 'low' } } });

              response.push(amauiTheme.methods.palette.color.text(amauiTheme.palette.color.primary.main));

              return response;
            }, { browsers });

            const amauiTheme = new AmauiStyle.AmauiTheme({
              preference: {
                text: {
                  default: 'primary',
                }
              }
            });

            const response = [
              amauiTheme.methods.palette.color.text(amauiTheme.palette.color.primary.main)
            ];

            amauiTheme.update({ preference: { visual_contrast: { default: 'low' } } });

            response.push(amauiTheme.methods.palette.color.text(amauiTheme.palette.color.primary.main));

            const valueNode = response;

            const values = [valueNode, ...valueBrowsers];

            values.forEach(value => assert(value).eql([
              "rgba(102, 92, 0, 0.87)",
              "rgba(153, 138, 0, 0.77)"
            ]));
          });

        });

      });

      group('space', () => {

        to('value', async () => {
          // Browser
          const valueBrowsers = await evaluate(async (window: any) => {
            const amauiTheme = new window.AmauiStyle.AmauiTheme();

            const response = [
              amauiTheme.methods.space.value(5)
            ];

            amauiTheme.update({ space: { unit: 14 } });

            response.push(amauiTheme.methods.space.value(1e1));

            return response;
          }, { browsers });

          const amauiTheme = new AmauiStyle.AmauiTheme();

          const response = [
            amauiTheme.methods.space.value(5)
          ];

          amauiTheme.update({ space: { unit: 14 } });

          response.push(amauiTheme.methods.space.value(1e1));

          const valueNode = response;

          const values = [valueNode, ...valueBrowsers];

          values.forEach(value => assert(value).eql([
            40,
            140
          ]));
        });

      });

      group('breakpoints', () => {

        to('up', async () => {
          // Browser
          const valueBrowsers = await evaluate(async (window: any) => {
            const amauiTheme = new window.AmauiStyle.AmauiTheme();

            return [
              amauiTheme.methods.breakpoints.up(amauiTheme.breakpoints.values.md)
            ];
          }, { browsers });

          const amauiTheme = new AmauiStyle.AmauiTheme();

          const valueNode = [
            amauiTheme.methods.breakpoints.up(amauiTheme.breakpoints.values.md)
          ];

          const values = [valueNode, ...valueBrowsers];

          values.forEach(value => assert(value).eql([
            '@media only screen and (min-width: 1240px)'
          ]));
        });

        to('down', async () => {
          // Browser
          const valueBrowsers = await evaluate(async (window: any) => {
            const amauiTheme = new window.AmauiStyle.AmauiTheme();

            return [
              amauiTheme.methods.breakpoints.down(amauiTheme.breakpoints.values.md)
            ];
          }, { browsers });

          const amauiTheme = new AmauiStyle.AmauiTheme();

          const valueNode = [
            amauiTheme.methods.breakpoints.down(amauiTheme.breakpoints.values.md)
          ];

          const values = [valueNode, ...valueBrowsers];

          values.forEach(value => assert(value).eql([
            '@media only screen and (max-width: 1240px)'
          ]));
        });

        to('between', async () => {
          // Browser
          const valueBrowsers = await evaluate(async (window: any) => {
            const amauiTheme = new window.AmauiStyle.AmauiTheme();

            return [
              amauiTheme.methods.breakpoints.between(amauiTheme.breakpoints.values.sm, amauiTheme.breakpoints.values.md)
            ];
          }, { browsers });

          const amauiTheme = new AmauiStyle.AmauiTheme();

          const valueNode = [
            amauiTheme.methods.breakpoints.between(amauiTheme.breakpoints.values.sm, amauiTheme.breakpoints.values.md)
          ];

          const values = [valueNode, ...valueBrowsers];

          values.forEach(value => assert(value).eql([
            '@media only screen and (min-width: 600px) and (max-width: 1240px)'
          ]));
        });

        to('only', async () => {
          // Browser
          const valueBrowsers = await evaluate(async (window: any) => {
            const amauiTheme = new window.AmauiStyle.AmauiTheme();

            return [
              amauiTheme.methods.breakpoints.only(amauiTheme.breakpoints.values.md)
            ];
          }, { browsers });

          const amauiTheme = new AmauiStyle.AmauiTheme();

          const valueNode = [
            amauiTheme.methods.breakpoints.only(amauiTheme.breakpoints.values.md)
          ];

          const values = [valueNode, ...valueBrowsers];

          values.forEach(value => assert(value).eql([
            '@media only screen and (min-width: 1240px) and (max-width: 1240px)'
          ]));
        });

        to('not', async () => {
          // Browser
          const valueBrowsers = await evaluate(async (window: any) => {
            const amauiTheme = new window.AmauiStyle.AmauiTheme();

            return [
              amauiTheme.methods.breakpoints.not('md')
            ];
          }, { browsers });

          const amauiTheme = new AmauiStyle.AmauiTheme();

          const valueNode = [
            amauiTheme.methods.breakpoints.not('md')
          ];

          const values = [valueNode, ...valueBrowsers];

          values.forEach(value => assert(value).eql([
            '@media only screen and (max-width: 1240px) and (min-width: 1440px)'
          ]));
        });

      });

      group('transitions', () => {

        to('make', async () => {
          // Browser
          const valueBrowsers = await evaluate(async (window: any) => {
            const amauiTheme = new window.AmauiStyle.AmauiTheme();

            return [
              amauiTheme.methods.transitions.make(['width', 'background'], { duration: 'regular', timing_function: 'standard', delay: 114 })
            ];
          }, { browsers });

          const amauiTheme = new AmauiStyle.AmauiTheme();

          const valueNode = [
            amauiTheme.methods.transitions.make(['width', 'background'], { duration: 'regular', timing_function: 'standard', delay: 114 })
          ];

          const values = [valueNode, ...valueBrowsers];

          values.forEach(value => assert(value).eql([
            "width 300ms cubic-bezier(.4, 0, .2, 1) 114ms, background 300ms cubic-bezier(.4, 0, .2, 1) 114ms"
          ]));
        });

      });

    });

  });

  to('image', async () => {
    // Browser
    const valueBrowsers = await evaluate(async (window: any) => {
      const amauiTheme = new window.AmauiStyle.AmauiTheme();

      await amauiTheme.image('/utils/images/image.jpg', { palette: { light: false, color: { primary: { main: '#90ee90' } } } });

      return amauiTheme.palette;
    }, { browsers });

    const values = [...valueBrowsers];

    assert(values[0]).eql({
      "light": false,
      "accessibility": "regular",
      "visual_contrast": {
        "low": {
          "opacity": {
            "primary": 0.77,
            "secondary": 0.44,
            "tertiary": 0.27,
            "quaternary": 0.14,
            "active": 0.44,
            "disabled": 0.27,
            "drag": 0.14,
            "divider": 0.13,
            "press": 0.1,
            "focus": 0.07,
            "selected": 0.05,
            "hover": 0.03
          },
          "contrast_threshold": 2.4
        },
        "regular": {
          "opacity": {
            "primary": 0.87,
            "secondary": 0.54,
            "tertiary": 0.37,
            "quaternary": 0.24,
            "active": 0.54,
            "disabled": 0.37,
            "drag": 0.16,
            "divider": 0.14,
            "press": 0.12,
            "focus": 0.11,
            "selected": 0.07,
            "hover": 0.04
          },
          "contrast_threshold": 3
        },
        "high": {
          "opacity": {
            "primary": 1,
            "secondary": 0.74,
            "tertiary": 0.57,
            "quaternary": 0.44,
            "active": 0.74,
            "disabled": 0.57,
            "drag": 0.27,
            "divider": 0.24,
            "press": 0.22,
            "focus": 0.21,
            "selected": 0.17,
            "hover": 0.14
          },
          "contrast_threshold": 4
        },
        "default": {
          "opacity": {
            "primary": 0.87,
            "secondary": 0.54,
            "tertiary": 0.37,
            "quaternary": 0.24,
            "active": 0.54,
            "disabled": 0.37,
            "drag": 0.16,
            "divider": 0.14,
            "press": 0.12,
            "focus": 0.11,
            "selected": 0.07,
            "hover": 0.04
          },
          "contrast_threshold": 3
        }
      },
      "color": {
        "primary": {
          "0": "rgb(0, 0, 0)",
          "1": "rgb(4, 3, 1)",
          "5": "rgb(21, 17, 4)",
          "10": "rgb(42, 34, 9)",
          "20": "rgb(84, 68, 18)",
          "30": "rgb(126, 101, 27)",
          "40": "rgb(168, 135, 36)",
          "50": "rgb(210, 169, 45)",
          "60": "rgb(219, 186, 87)",
          "70": "rgb(228, 203, 129)",
          "80": "rgb(237, 221, 171)",
          "90": "rgb(246, 238, 213)",
          "95": "rgb(251, 246, 234)",
          "99": "rgb(254, 253, 251)",
          "100": "rgb(255, 255, 255)",
          "main": "rgb(203, 164, 43)",
          "light": "rgb(228, 203, 129)",
          "dark": "rgb(126, 101, 27)"
        },
        "secondary": {
          "0": "rgb(0, 0, 0)",
          "1": "rgb(1, 3, 4)",
          "5": "rgb(5, 14, 21)",
          "10": "rgb(10, 27, 41)",
          "20": "rgb(19, 54, 83)",
          "30": "rgb(29, 81, 124)",
          "40": "rgb(39, 108, 165)",
          "50": "rgb(48, 135, 207)",
          "60": "rgb(90, 159, 216)",
          "70": "rgb(131, 183, 226)",
          "80": "rgb(172, 207, 236)",
          "90": "rgb(214, 231, 245)",
          "95": "rgb(234, 243, 250)",
          "99": "rgb(251, 253, 254)",
          "100": "rgb(255, 255, 255)",
          "main": "rgb(187, 216, 239)",
          "light": "rgb(214, 231, 245)",
          "dark": "rgb(90, 159, 216)"
        },
        "tertiary": {
          "0": "rgb(0, 0, 0)",
          "1": "rgb(2, 3, 3)",
          "5": "rgb(10, 14, 16)",
          "10": "rgb(19, 28, 32)",
          "20": "rgb(39, 56, 63)",
          "30": "rgb(58, 84, 95)",
          "40": "rgb(78, 112, 126)",
          "50": "rgb(97, 140, 158)",
          "60": "rgb(129, 163, 177)",
          "70": "rgb(160, 186, 197)",
          "80": "rgb(192, 209, 216)",
          "90": "rgb(223, 232, 236)",
          "95": "rgb(239, 243, 245)",
          "99": "rgb(252, 253, 253)",
          "100": "rgb(255, 255, 255)",
          "main": "rgb(84, 122, 138)",
          "light": "rgb(129, 163, 177)",
          "dark": "rgb(39, 56, 63)"
        },
        "quaternary": {
          "0": "rgb(0, 0, 0)",
          "1": "rgb(1, 3, 4)",
          "5": "rgb(4, 14, 22)",
          "10": "rgb(7, 29, 44)",
          "20": "rgb(14, 57, 88)",
          "30": "rgb(21, 86, 132)",
          "40": "rgb(29, 114, 175)",
          "50": "rgb(36, 143, 219)",
          "60": "rgb(80, 165, 226)",
          "70": "rgb(123, 188, 234)",
          "80": "rgb(167, 210, 241)",
          "90": "rgb(211, 233, 248)",
          "95": "rgb(233, 244, 251)",
          "99": "rgb(251, 253, 254)",
          "100": "rgb(255, 255, 255)",
          "main": "rgb(118, 185, 233)",
          "light": "rgb(211, 233, 248)",
          "dark": "rgb(36, 143, 219)"
        },
        "info": {
          "0": "rgb(0, 0, 0)",
          "1": "rgb(0, 3, 5)",
          "5": "rgb(0, 17, 25)",
          "10": "rgb(1, 35, 50)",
          "20": "rgb(1, 69, 101)",
          "30": "rgb(2, 104, 151)",
          "40": "rgb(2, 139, 202)",
          "50": "rgb(3, 173, 252)",
          "60": "rgb(53, 190, 253)",
          "70": "rgb(104, 206, 253)",
          "80": "rgb(154, 222, 254)",
          "90": "rgb(205, 239, 254)",
          "95": "rgb(230, 247, 255)",
          "99": "rgb(250, 253, 255)",
          "100": "rgb(255, 255, 255)",
          "main": "#03A9F4",
          "light": "#4FC3F7",
          "dark": "#0288D1"
        },
        "success": {
          "0": "rgb(0, 0, 0)",
          "1": "rgb(2, 4, 2)",
          "5": "rgb(8, 18, 8)",
          "10": "rgb(16, 35, 16)",
          "20": "rgb(31, 71, 32)",
          "30": "rgb(47, 106, 49)",
          "40": "rgb(62, 142, 65)",
          "50": "rgb(78, 177, 81)",
          "60": "rgb(113, 193, 116)",
          "70": "rgb(149, 208, 151)",
          "80": "rgb(184, 224, 185)",
          "90": "rgb(220, 239, 220)",
          "95": "rgb(237, 247, 238)",
          "99": "rgb(251, 253, 252)",
          "100": "rgb(255, 255, 255)",
          "main": "#4CAF50",
          "light": "#81C784",
          "dark": "#388E3C"
        },
        "warning": {
          "0": "rgb(0, 0, 0)",
          "1": "rgb(5, 3, 0)",
          "5": "rgb(26, 15, 0)",
          "10": "rgb(51, 31, 0)",
          "20": "rgb(102, 61, 0)",
          "30": "rgb(153, 92, 0)",
          "40": "rgb(204, 122, 0)",
          "50": "rgb(255, 153, 0)",
          "60": "rgb(255, 173, 51)",
          "70": "rgb(255, 194, 102)",
          "80": "rgb(255, 214, 153)",
          "90": "rgb(255, 235, 204)",
          "95": "rgb(255, 245, 229)",
          "99": "rgb(255, 253, 250)",
          "100": "rgb(255, 255, 255)",
          "main": "#FF9800",
          "light": "#FFB74D",
          "dark": "#F57C00"
        },
        "error": {
          "0": "rgb(0, 0, 0)",
          "1": "rgb(5, 1, 0)",
          "5": "rgb(26, 6, 0)",
          "10": "rgb(51, 12, 0)",
          "20": "rgb(102, 24, 0)",
          "30": "rgb(153, 36, 0)",
          "40": "rgb(204, 48, 0)",
          "50": "rgb(255, 60, 0)",
          "60": "rgb(255, 99, 51)",
          "70": "rgb(255, 138, 102)",
          "80": "rgb(255, 177, 153)",
          "90": "rgb(255, 216, 204)",
          "95": "rgb(255, 235, 229)",
          "99": "rgb(255, 251, 250)",
          "100": "rgb(255, 255, 255)",
          "main": "#FF5722",
          "light": "#FF8A65",
          "dark": "#E64A19"
        },
        "neutral": {
          "0": "rgb(0, 0, 0)",
          "1": "rgb(3, 3, 3)",
          "5": "rgb(13, 13, 13)",
          "10": "rgb(26, 26, 26)",
          "20": "rgb(51, 51, 51)",
          "30": "rgb(77, 77, 77)",
          "40": "rgb(102, 102, 102)",
          "50": "rgb(128, 128, 128)",
          "60": "rgb(153, 153, 153)",
          "70": "rgb(179, 179, 179)",
          "80": "rgb(204, 204, 204)",
          "90": "rgb(230, 230, 230)",
          "95": "rgb(242, 242, 242)",
          "99": "rgb(252, 252, 252)",
          "100": "rgb(255, 255, 255)",
          "main": "#000000",
          "light": "rgb(26, 26, 26)",
          "dark": "rgb(26, 26, 26)"
        }
      },
      "text": {
        "primary": {
          "primary": "rgba(228, 203, 129, 0.87)",
          "secondary": "rgba(228, 203, 129, 0.54)",
          "tertiary": "rgba(228, 203, 129, 0.37)",
          "quaternary": "rgba(228, 203, 129, 0.24)"
        },
        "secondary": {
          "primary": "rgba(131, 183, 226, 0.87)",
          "secondary": "rgba(131, 183, 226, 0.54)",
          "tertiary": "rgba(131, 183, 226, 0.37)",
          "quaternary": "rgba(131, 183, 226, 0.24)"
        },
        "tertiary": {
          "primary": "rgba(160, 186, 197, 0.87)",
          "secondary": "rgba(160, 186, 197, 0.54)",
          "tertiary": "rgba(160, 186, 197, 0.37)",
          "quaternary": "rgba(160, 186, 197, 0.24)"
        },
        "quaternary": {
          "primary": "rgba(123, 188, 234, 0.87)",
          "secondary": "rgba(123, 188, 234, 0.54)",
          "tertiary": "rgba(123, 188, 234, 0.37)",
          "quaternary": "rgba(123, 188, 234, 0.24)"
        },
        "info": {
          "primary": "rgba(104, 206, 253, 0.87)",
          "secondary": "rgba(104, 206, 253, 0.54)",
          "tertiary": "rgba(104, 206, 253, 0.37)",
          "quaternary": "rgba(104, 206, 253, 0.24)"
        },
        "success": {
          "primary": "rgba(149, 208, 151, 0.87)",
          "secondary": "rgba(149, 208, 151, 0.54)",
          "tertiary": "rgba(149, 208, 151, 0.37)",
          "quaternary": "rgba(149, 208, 151, 0.24)"
        },
        "warning": {
          "primary": "rgba(255, 194, 102, 0.87)",
          "secondary": "rgba(255, 194, 102, 0.54)",
          "tertiary": "rgba(255, 194, 102, 0.37)",
          "quaternary": "rgba(255, 194, 102, 0.24)"
        },
        "error": {
          "primary": "rgba(255, 138, 102, 0.87)",
          "secondary": "rgba(255, 138, 102, 0.54)",
          "tertiary": "rgba(255, 138, 102, 0.37)",
          "quaternary": "rgba(255, 138, 102, 0.24)"
        },
        "neutral": {
          "primary": "rgba(255, 255, 255, 0.87)",
          "secondary": "rgba(255, 255, 255, 0.54)",
          "tertiary": "rgba(255, 255, 255, 0.37)",
          "quaternary": "rgba(255, 255, 255, 0.24)"
        },
        "default": {
          "primary": "rgba(255, 255, 255, 0.87)",
          "secondary": "rgba(255, 255, 255, 0.54)",
          "tertiary": "rgba(255, 255, 255, 0.37)",
          "quaternary": "rgba(255, 255, 255, 0.24)"
        },
        "divider": "rgba(255, 255, 255, 0.14)",
        "active": "rgba(255, 255, 255, 0.54)",
        "hover": "rgba(255, 255, 255, 0.04)",
        "selected": "rgba(255, 255, 255, 0.07)",
        "focus": "rgba(255, 255, 255, 0.11)",
        "disabled": "rgba(255, 255, 255, 0.37)"
      },
      "background": {
        "primary": {
          "primary": "rgb(0, 0, 0)",
          "secondary": "rgb(4, 3, 1)",
          "tertiary": "rgb(21, 17, 4)",
          "quaternary": "rgb(42, 34, 9)"
        },
        "secondary": {
          "primary": "rgb(0, 0, 0)",
          "secondary": "rgb(1, 3, 4)",
          "tertiary": "rgb(5, 14, 21)",
          "quaternary": "rgb(10, 27, 41)"
        },
        "tertiary": {
          "primary": "rgb(0, 0, 0)",
          "secondary": "rgb(2, 3, 3)",
          "tertiary": "rgb(10, 14, 16)",
          "quaternary": "rgb(19, 28, 32)"
        },
        "quaternary": {
          "primary": "rgb(0, 0, 0)",
          "secondary": "rgb(1, 3, 4)",
          "tertiary": "rgb(4, 14, 22)",
          "quaternary": "rgb(7, 29, 44)"
        },
        "info": {
          "primary": "rgb(0, 0, 0)",
          "secondary": "rgb(0, 3, 5)",
          "tertiary": "rgb(0, 17, 25)",
          "quaternary": "rgb(1, 35, 50)"
        },
        "success": {
          "primary": "rgb(0, 0, 0)",
          "secondary": "rgb(2, 4, 2)",
          "tertiary": "rgb(8, 18, 8)",
          "quaternary": "rgb(16, 35, 16)"
        },
        "warning": {
          "primary": "rgb(0, 0, 0)",
          "secondary": "rgb(5, 3, 0)",
          "tertiary": "rgb(26, 15, 0)",
          "quaternary": "rgb(51, 31, 0)"
        },
        "error": {
          "primary": "rgb(0, 0, 0)",
          "secondary": "rgb(5, 1, 0)",
          "tertiary": "rgb(26, 6, 0)",
          "quaternary": "rgb(51, 12, 0)"
        },
        "neutral": {
          "primary": "rgb(0, 0, 0)",
          "secondary": "rgb(3, 3, 3)",
          "tertiary": "rgb(13, 13, 13)",
          "quaternary": "rgb(26, 26, 26)"
        },
        "default": {
          "primary": "rgb(0, 0, 0)",
          "secondary": "rgb(3, 3, 3)",
          "tertiary": "rgb(13, 13, 13)",
          "quaternary": "rgb(26, 26, 26)"
        }
      },
      "image": "/utils/images/image.jpg"
    });

    assert(values[1]).eql({
      "light": false,
      "accessibility": "regular",
      "visual_contrast": {
        "low": {
          "opacity": {
            "primary": 0.77,
            "secondary": 0.44,
            "tertiary": 0.27,
            "quaternary": 0.14,
            "active": 0.44,
            "disabled": 0.27,
            "drag": 0.14,
            "divider": 0.13,
            "press": 0.1,
            "focus": 0.07,
            "selected": 0.05,
            "hover": 0.03
          },
          "contrast_threshold": 2.4
        },
        "regular": {
          "opacity": {
            "primary": 0.87,
            "secondary": 0.54,
            "tertiary": 0.37,
            "quaternary": 0.24,
            "active": 0.54,
            "disabled": 0.37,
            "drag": 0.16,
            "divider": 0.14,
            "press": 0.12,
            "focus": 0.11,
            "selected": 0.07,
            "hover": 0.04
          },
          "contrast_threshold": 3
        },
        "high": {
          "opacity": {
            "primary": 1,
            "secondary": 0.74,
            "tertiary": 0.57,
            "quaternary": 0.44,
            "active": 0.74,
            "disabled": 0.57,
            "drag": 0.27,
            "divider": 0.24,
            "press": 0.22,
            "focus": 0.21,
            "selected": 0.17,
            "hover": 0.14
          },
          "contrast_threshold": 4
        },
        "default": {
          "opacity": {
            "primary": 0.87,
            "secondary": 0.54,
            "tertiary": 0.37,
            "quaternary": 0.24,
            "active": 0.54,
            "disabled": 0.37,
            "drag": 0.16,
            "divider": 0.14,
            "press": 0.12,
            "focus": 0.11,
            "selected": 0.07,
            "hover": 0.04
          },
          "contrast_threshold": 3
        }
      },
      "color": {
        "primary": {
          "0": "rgb(0, 0, 0)",
          "1": "rgb(4, 3, 1)",
          "5": "rgb(21, 17, 5)",
          "10": "rgb(41, 33, 10)",
          "20": "rgb(83, 67, 19)",
          "30": "rgb(124, 100, 29)",
          "40": "rgb(165, 134, 39)",
          "50": "rgb(207, 167, 48)",
          "60": "rgb(216, 185, 90)",
          "70": "rgb(226, 202, 131)",
          "80": "rgb(236, 220, 172)",
          "90": "rgb(245, 237, 214)",
          "95": "rgb(250, 246, 234)",
          "99": "rgb(254, 253, 251)",
          "100": "rgb(255, 255, 255)",
          "main": "rgb(207, 168, 49)",
          "light": "rgb(226, 202, 131)",
          "dark": "rgb(124, 100, 29)"
        },
        "secondary": {
          "0": "rgb(0, 0, 0)",
          "1": "rgb(1, 3, 4)",
          "5": "rgb(4, 14, 21)",
          "10": "rgb(8, 27, 43)",
          "20": "rgb(16, 54, 86)",
          "30": "rgb(24, 82, 129)",
          "40": "rgb(33, 109, 171)",
          "50": "rgb(41, 136, 214)",
          "60": "rgb(84, 160, 222)",
          "70": "rgb(126, 184, 231)",
          "80": "rgb(169, 207, 239)",
          "90": "rgb(212, 231, 247)",
          "95": "rgb(234, 243, 251)",
          "99": "rgb(251, 253, 254)",
          "100": "rgb(255, 255, 255)",
          "main": "rgb(187, 217, 242)",
          "light": "rgb(212, 231, 247)",
          "dark": "rgb(84, 160, 222)"
        },
        "tertiary": {
          "0": "rgb(0, 0, 0)",
          "1": "rgb(2, 3, 3)",
          "5": "rgb(10, 14, 16)",
          "10": "rgb(20, 28, 31)",
          "20": "rgb(39, 57, 63)",
          "30": "rgb(59, 85, 94)",
          "40": "rgb(79, 114, 125)",
          "50": "rgb(98, 142, 157)",
          "60": "rgb(130, 165, 176)",
          "70": "rgb(161, 187, 196)",
          "80": "rgb(192, 210, 216)",
          "90": "rgb(224, 232, 235)",
          "95": "rgb(239, 244, 245)",
          "99": "rgb(252, 253, 253)",
          "100": "rgb(255, 255, 255)",
          "main": "rgb(82, 118, 130)",
          "light": "rgb(130, 165, 176)",
          "dark": "rgb(39, 57, 63)"
        },
        "quaternary": {
          "0": "rgb(0, 0, 0)",
          "1": "rgb(1, 3, 4)",
          "5": "rgb(3, 14, 22)",
          "10": "rgb(7, 29, 44)",
          "20": "rgb(14, 57, 88)",
          "30": "rgb(21, 86, 132)",
          "40": "rgb(28, 114, 176)",
          "50": "rgb(34, 143, 221)",
          "60": "rgb(79, 165, 227)",
          "70": "rgb(123, 188, 234)",
          "80": "rgb(167, 210, 241)",
          "90": "rgb(211, 233, 248)",
          "95": "rgb(233, 244, 252)",
          "99": "rgb(251, 253, 254)",
          "100": "rgb(255, 255, 255)",
          "main": "rgb(116, 185, 233)",
          "light": "rgb(211, 233, 248)",
          "dark": "rgb(34, 143, 221)"
        },
        "info": {
          "0": "rgb(0, 0, 0)",
          "1": "rgb(0, 3, 5)",
          "5": "rgb(0, 17, 25)",
          "10": "rgb(1, 35, 50)",
          "20": "rgb(1, 69, 101)",
          "30": "rgb(2, 104, 151)",
          "40": "rgb(2, 139, 202)",
          "50": "rgb(3, 173, 252)",
          "60": "rgb(53, 190, 253)",
          "70": "rgb(104, 206, 253)",
          "80": "rgb(154, 222, 254)",
          "90": "rgb(205, 239, 254)",
          "95": "rgb(230, 247, 255)",
          "99": "rgb(250, 253, 255)",
          "100": "rgb(255, 255, 255)",
          "main": "#03A9F4",
          "light": "#4FC3F7",
          "dark": "#0288D1"
        },
        "success": {
          "0": "rgb(0, 0, 0)",
          "1": "rgb(2, 4, 2)",
          "5": "rgb(8, 18, 8)",
          "10": "rgb(16, 35, 16)",
          "20": "rgb(31, 71, 32)",
          "30": "rgb(47, 106, 49)",
          "40": "rgb(62, 142, 65)",
          "50": "rgb(78, 177, 81)",
          "60": "rgb(113, 193, 116)",
          "70": "rgb(149, 208, 151)",
          "80": "rgb(184, 224, 185)",
          "90": "rgb(220, 239, 220)",
          "95": "rgb(237, 247, 238)",
          "99": "rgb(251, 253, 252)",
          "100": "rgb(255, 255, 255)",
          "main": "#4CAF50",
          "light": "#81C784",
          "dark": "#388E3C"
        },
        "warning": {
          "0": "rgb(0, 0, 0)",
          "1": "rgb(5, 3, 0)",
          "5": "rgb(26, 15, 0)",
          "10": "rgb(51, 31, 0)",
          "20": "rgb(102, 61, 0)",
          "30": "rgb(153, 92, 0)",
          "40": "rgb(204, 122, 0)",
          "50": "rgb(255, 153, 0)",
          "60": "rgb(255, 173, 51)",
          "70": "rgb(255, 194, 102)",
          "80": "rgb(255, 214, 153)",
          "90": "rgb(255, 235, 204)",
          "95": "rgb(255, 245, 229)",
          "99": "rgb(255, 253, 250)",
          "100": "rgb(255, 255, 255)",
          "main": "#FF9800",
          "light": "#FFB74D",
          "dark": "#F57C00"
        },
        "error": {
          "0": "rgb(0, 0, 0)",
          "1": "rgb(5, 1, 0)",
          "5": "rgb(26, 6, 0)",
          "10": "rgb(51, 12, 0)",
          "20": "rgb(102, 24, 0)",
          "30": "rgb(153, 36, 0)",
          "40": "rgb(204, 48, 0)",
          "50": "rgb(255, 60, 0)",
          "60": "rgb(255, 99, 51)",
          "70": "rgb(255, 138, 102)",
          "80": "rgb(255, 177, 153)",
          "90": "rgb(255, 216, 204)",
          "95": "rgb(255, 235, 229)",
          "99": "rgb(255, 251, 250)",
          "100": "rgb(255, 255, 255)",
          "main": "#FF5722",
          "light": "#FF8A65",
          "dark": "#E64A19"
        },
        "neutral": {
          "0": "rgb(0, 0, 0)",
          "1": "rgb(3, 3, 3)",
          "5": "rgb(13, 13, 13)",
          "10": "rgb(26, 26, 26)",
          "20": "rgb(51, 51, 51)",
          "30": "rgb(77, 77, 77)",
          "40": "rgb(102, 102, 102)",
          "50": "rgb(128, 128, 128)",
          "60": "rgb(153, 153, 153)",
          "70": "rgb(179, 179, 179)",
          "80": "rgb(204, 204, 204)",
          "90": "rgb(230, 230, 230)",
          "95": "rgb(242, 242, 242)",
          "99": "rgb(252, 252, 252)",
          "100": "rgb(255, 255, 255)",
          "main": "#000000",
          "light": "rgb(26, 26, 26)",
          "dark": "rgb(26, 26, 26)"
        }
      },
      "text": {
        "primary": {
          "primary": "rgba(226, 202, 131, 0.87)",
          "secondary": "rgba(226, 202, 131, 0.54)",
          "tertiary": "rgba(226, 202, 131, 0.37)",
          "quaternary": "rgba(226, 202, 131, 0.24)"
        },
        "secondary": {
          "primary": "rgba(126, 184, 231, 0.87)",
          "secondary": "rgba(126, 184, 231, 0.54)",
          "tertiary": "rgba(126, 184, 231, 0.37)",
          "quaternary": "rgba(126, 184, 231, 0.24)"
        },
        "tertiary": {
          "primary": "rgba(161, 187, 196, 0.87)",
          "secondary": "rgba(161, 187, 196, 0.54)",
          "tertiary": "rgba(161, 187, 196, 0.37)",
          "quaternary": "rgba(161, 187, 196, 0.24)"
        },
        "quaternary": {
          "primary": "rgba(123, 188, 234, 0.87)",
          "secondary": "rgba(123, 188, 234, 0.54)",
          "tertiary": "rgba(123, 188, 234, 0.37)",
          "quaternary": "rgba(123, 188, 234, 0.24)"
        },
        "info": {
          "primary": "rgba(104, 206, 253, 0.87)",
          "secondary": "rgba(104, 206, 253, 0.54)",
          "tertiary": "rgba(104, 206, 253, 0.37)",
          "quaternary": "rgba(104, 206, 253, 0.24)"
        },
        "success": {
          "primary": "rgba(149, 208, 151, 0.87)",
          "secondary": "rgba(149, 208, 151, 0.54)",
          "tertiary": "rgba(149, 208, 151, 0.37)",
          "quaternary": "rgba(149, 208, 151, 0.24)"
        },
        "warning": {
          "primary": "rgba(255, 194, 102, 0.87)",
          "secondary": "rgba(255, 194, 102, 0.54)",
          "tertiary": "rgba(255, 194, 102, 0.37)",
          "quaternary": "rgba(255, 194, 102, 0.24)"
        },
        "error": {
          "primary": "rgba(255, 138, 102, 0.87)",
          "secondary": "rgba(255, 138, 102, 0.54)",
          "tertiary": "rgba(255, 138, 102, 0.37)",
          "quaternary": "rgba(255, 138, 102, 0.24)"
        },
        "neutral": {
          "primary": "rgba(255, 255, 255, 0.87)",
          "secondary": "rgba(255, 255, 255, 0.54)",
          "tertiary": "rgba(255, 255, 255, 0.37)",
          "quaternary": "rgba(255, 255, 255, 0.24)"
        },
        "default": {
          "primary": "rgba(255, 255, 255, 0.87)",
          "secondary": "rgba(255, 255, 255, 0.54)",
          "tertiary": "rgba(255, 255, 255, 0.37)",
          "quaternary": "rgba(255, 255, 255, 0.24)"
        },
        "divider": "rgba(255, 255, 255, 0.14)",
        "active": "rgba(255, 255, 255, 0.54)",
        "hover": "rgba(255, 255, 255, 0.04)",
        "selected": "rgba(255, 255, 255, 0.07)",
        "focus": "rgba(255, 255, 255, 0.11)",
        "disabled": "rgba(255, 255, 255, 0.37)"
      },
      "background": {
        "primary": {
          "primary": "rgb(0, 0, 0)",
          "secondary": "rgb(4, 3, 1)",
          "tertiary": "rgb(21, 17, 5)",
          "quaternary": "rgb(41, 33, 10)"
        },
        "secondary": {
          "primary": "rgb(0, 0, 0)",
          "secondary": "rgb(1, 3, 4)",
          "tertiary": "rgb(4, 14, 21)",
          "quaternary": "rgb(8, 27, 43)"
        },
        "tertiary": {
          "primary": "rgb(0, 0, 0)",
          "secondary": "rgb(2, 3, 3)",
          "tertiary": "rgb(10, 14, 16)",
          "quaternary": "rgb(20, 28, 31)"
        },
        "quaternary": {
          "primary": "rgb(0, 0, 0)",
          "secondary": "rgb(1, 3, 4)",
          "tertiary": "rgb(3, 14, 22)",
          "quaternary": "rgb(7, 29, 44)"
        },
        "info": {
          "primary": "rgb(0, 0, 0)",
          "secondary": "rgb(0, 3, 5)",
          "tertiary": "rgb(0, 17, 25)",
          "quaternary": "rgb(1, 35, 50)"
        },
        "success": {
          "primary": "rgb(0, 0, 0)",
          "secondary": "rgb(2, 4, 2)",
          "tertiary": "rgb(8, 18, 8)",
          "quaternary": "rgb(16, 35, 16)"
        },
        "warning": {
          "primary": "rgb(0, 0, 0)",
          "secondary": "rgb(5, 3, 0)",
          "tertiary": "rgb(26, 15, 0)",
          "quaternary": "rgb(51, 31, 0)"
        },
        "error": {
          "primary": "rgb(0, 0, 0)",
          "secondary": "rgb(5, 1, 0)",
          "tertiary": "rgb(26, 6, 0)",
          "quaternary": "rgb(51, 12, 0)"
        },
        "neutral": {
          "primary": "rgb(0, 0, 0)",
          "secondary": "rgb(3, 3, 3)",
          "tertiary": "rgb(13, 13, 13)",
          "quaternary": "rgb(26, 26, 26)"
        },
        "default": {
          "primary": "rgb(0, 0, 0)",
          "secondary": "rgb(3, 3, 3)",
          "tertiary": "rgb(13, 13, 13)",
          "quaternary": "rgb(26, 26, 26)"
        }
      },
      "image": "/utils/images/image.jpg"
    });

    assert(values[2]).eql({
      "light": false,
      "accessibility": "regular",
      "visual_contrast": {
        "low": {
          "opacity": {
            "primary": 0.77,
            "secondary": 0.44,
            "tertiary": 0.27,
            "quaternary": 0.14,
            "active": 0.44,
            "disabled": 0.27,
            "drag": 0.14,
            "divider": 0.13,
            "press": 0.1,
            "focus": 0.07,
            "selected": 0.05,
            "hover": 0.03
          },
          "contrast_threshold": 2.4
        },
        "regular": {
          "opacity": {
            "primary": 0.87,
            "secondary": 0.54,
            "tertiary": 0.37,
            "quaternary": 0.24,
            "active": 0.54,
            "disabled": 0.37,
            "drag": 0.16,
            "divider": 0.14,
            "press": 0.12,
            "focus": 0.11,
            "selected": 0.07,
            "hover": 0.04
          },
          "contrast_threshold": 3
        },
        "high": {
          "opacity": {
            "primary": 1,
            "secondary": 0.74,
            "tertiary": 0.57,
            "quaternary": 0.44,
            "active": 0.74,
            "disabled": 0.57,
            "drag": 0.27,
            "divider": 0.24,
            "press": 0.22,
            "focus": 0.21,
            "selected": 0.17,
            "hover": 0.14
          },
          "contrast_threshold": 4
        },
        "default": {
          "opacity": {
            "primary": 0.87,
            "secondary": 0.54,
            "tertiary": 0.37,
            "quaternary": 0.24,
            "active": 0.54,
            "disabled": 0.37,
            "drag": 0.16,
            "divider": 0.14,
            "press": 0.12,
            "focus": 0.11,
            "selected": 0.07,
            "hover": 0.04
          },
          "contrast_threshold": 3
        }
      },
      "color": {
        "primary": {
          "0": "rgb(0, 0, 0)",
          "1": "rgb(4, 3, 1)",
          "5": "rgb(21, 17, 5)",
          "10": "rgb(42, 34, 9)",
          "20": "rgb(84, 67, 18)",
          "30": "rgb(125, 101, 28)",
          "40": "rgb(167, 135, 37)",
          "50": "rgb(209, 168, 46)",
          "60": "rgb(218, 186, 88)",
          "70": "rgb(227, 203, 130)",
          "80": "rgb(237, 220, 171)",
          "90": "rgb(246, 238, 213)",
          "95": "rgb(250, 246, 234)",
          "99": "rgb(254, 253, 251)",
          "100": "rgb(255, 255, 255)",
          "main": "rgb(203, 164, 44)",
          "light": "rgb(227, 203, 130)",
          "dark": "rgb(125, 101, 28)"
        },
        "secondary": {
          "0": "rgb(0, 0, 0)",
          "1": "rgb(1, 3, 4)",
          "5": "rgb(5, 14, 21)",
          "10": "rgb(10, 28, 41)",
          "20": "rgb(19, 55, 83)",
          "30": "rgb(29, 83, 124)",
          "40": "rgb(39, 110, 165)",
          "50": "rgb(48, 138, 207)",
          "60": "rgb(90, 161, 216)",
          "70": "rgb(131, 185, 226)",
          "80": "rgb(172, 208, 236)",
          "90": "rgb(214, 232, 245)",
          "95": "rgb(234, 243, 250)",
          "99": "rgb(251, 253, 254)",
          "100": "rgb(255, 255, 255)",
          "main": "rgb(186, 216, 239)",
          "light": "rgb(214, 232, 245)",
          "dark": "rgb(90, 161, 216)"
        },
        "tertiary": {
          "0": "rgb(0, 0, 0)",
          "1": "rgb(2, 3, 3)",
          "5": "rgb(10, 14, 16)",
          "10": "rgb(19, 28, 32)",
          "20": "rgb(39, 57, 63)",
          "30": "rgb(58, 85, 95)",
          "40": "rgb(78, 113, 126)",
          "50": "rgb(97, 142, 158)",
          "60": "rgb(129, 164, 177)",
          "70": "rgb(160, 187, 197)",
          "80": "rgb(192, 210, 216)",
          "90": "rgb(223, 232, 236)",
          "95": "rgb(239, 244, 245)",
          "99": "rgb(252, 253, 253)",
          "100": "rgb(255, 255, 255)",
          "main": "rgb(84, 122, 136)",
          "light": "rgb(129, 164, 177)",
          "dark": "rgb(39, 57, 63)"
        },
        "quaternary": {
          "0": "rgb(0, 0, 0)",
          "1": "rgb(1, 3, 4)",
          "5": "rgb(4, 14, 22)",
          "10": "rgb(7, 29, 44)",
          "20": "rgb(14, 57, 88)",
          "30": "rgb(21, 86, 132)",
          "40": "rgb(29, 114, 175)",
          "50": "rgb(36, 143, 219)",
          "60": "rgb(80, 165, 226)",
          "70": "rgb(123, 188, 234)",
          "80": "rgb(167, 210, 241)",
          "90": "rgb(211, 233, 248)",
          "95": "rgb(233, 244, 251)",
          "99": "rgb(251, 253, 254)",
          "100": "rgb(255, 255, 255)",
          "main": "rgb(118, 185, 233)",
          "light": "rgb(211, 233, 248)",
          "dark": "rgb(36, 143, 219)"
        },
        "info": {
          "0": "rgb(0, 0, 0)",
          "1": "rgb(0, 3, 5)",
          "5": "rgb(0, 17, 25)",
          "10": "rgb(1, 35, 50)",
          "20": "rgb(1, 69, 101)",
          "30": "rgb(2, 104, 151)",
          "40": "rgb(2, 139, 202)",
          "50": "rgb(3, 173, 252)",
          "60": "rgb(53, 190, 253)",
          "70": "rgb(104, 206, 253)",
          "80": "rgb(154, 222, 254)",
          "90": "rgb(205, 239, 254)",
          "95": "rgb(230, 247, 255)",
          "99": "rgb(250, 253, 255)",
          "100": "rgb(255, 255, 255)",
          "main": "#03A9F4",
          "light": "#4FC3F7",
          "dark": "#0288D1"
        },
        "success": {
          "0": "rgb(0, 0, 0)",
          "1": "rgb(2, 4, 2)",
          "5": "rgb(8, 18, 8)",
          "10": "rgb(16, 35, 16)",
          "20": "rgb(31, 71, 32)",
          "30": "rgb(47, 106, 49)",
          "40": "rgb(62, 142, 65)",
          "50": "rgb(78, 177, 81)",
          "60": "rgb(113, 193, 116)",
          "70": "rgb(149, 208, 151)",
          "80": "rgb(184, 224, 185)",
          "90": "rgb(220, 239, 220)",
          "95": "rgb(237, 247, 238)",
          "99": "rgb(251, 253, 252)",
          "100": "rgb(255, 255, 255)",
          "main": "#4CAF50",
          "light": "#81C784",
          "dark": "#388E3C"
        },
        "warning": {
          "0": "rgb(0, 0, 0)",
          "1": "rgb(5, 3, 0)",
          "5": "rgb(26, 15, 0)",
          "10": "rgb(51, 31, 0)",
          "20": "rgb(102, 61, 0)",
          "30": "rgb(153, 92, 0)",
          "40": "rgb(204, 122, 0)",
          "50": "rgb(255, 153, 0)",
          "60": "rgb(255, 173, 51)",
          "70": "rgb(255, 194, 102)",
          "80": "rgb(255, 214, 153)",
          "90": "rgb(255, 235, 204)",
          "95": "rgb(255, 245, 229)",
          "99": "rgb(255, 253, 250)",
          "100": "rgb(255, 255, 255)",
          "main": "#FF9800",
          "light": "#FFB74D",
          "dark": "#F57C00"
        },
        "error": {
          "0": "rgb(0, 0, 0)",
          "1": "rgb(5, 1, 0)",
          "5": "rgb(26, 6, 0)",
          "10": "rgb(51, 12, 0)",
          "20": "rgb(102, 24, 0)",
          "30": "rgb(153, 36, 0)",
          "40": "rgb(204, 48, 0)",
          "50": "rgb(255, 60, 0)",
          "60": "rgb(255, 99, 51)",
          "70": "rgb(255, 138, 102)",
          "80": "rgb(255, 177, 153)",
          "90": "rgb(255, 216, 204)",
          "95": "rgb(255, 235, 229)",
          "99": "rgb(255, 251, 250)",
          "100": "rgb(255, 255, 255)",
          "main": "#FF5722",
          "light": "#FF8A65",
          "dark": "#E64A19"
        },
        "neutral": {
          "0": "rgb(0, 0, 0)",
          "1": "rgb(3, 3, 3)",
          "5": "rgb(13, 13, 13)",
          "10": "rgb(26, 26, 26)",
          "20": "rgb(51, 51, 51)",
          "30": "rgb(77, 77, 77)",
          "40": "rgb(102, 102, 102)",
          "50": "rgb(128, 128, 128)",
          "60": "rgb(153, 153, 153)",
          "70": "rgb(179, 179, 179)",
          "80": "rgb(204, 204, 204)",
          "90": "rgb(230, 230, 230)",
          "95": "rgb(242, 242, 242)",
          "99": "rgb(252, 252, 252)",
          "100": "rgb(255, 255, 255)",
          "main": "#000000",
          "light": "rgb(26, 26, 26)",
          "dark": "rgb(26, 26, 26)"
        }
      },
      "text": {
        "primary": {
          "primary": "rgba(227, 203, 130, 0.87)",
          "secondary": "rgba(227, 203, 130, 0.54)",
          "tertiary": "rgba(227, 203, 130, 0.37)",
          "quaternary": "rgba(227, 203, 130, 0.24)"
        },
        "secondary": {
          "primary": "rgba(131, 185, 226, 0.87)",
          "secondary": "rgba(131, 185, 226, 0.54)",
          "tertiary": "rgba(131, 185, 226, 0.37)",
          "quaternary": "rgba(131, 185, 226, 0.24)"
        },
        "tertiary": {
          "primary": "rgba(160, 187, 197, 0.87)",
          "secondary": "rgba(160, 187, 197, 0.54)",
          "tertiary": "rgba(160, 187, 197, 0.37)",
          "quaternary": "rgba(160, 187, 197, 0.24)"
        },
        "quaternary": {
          "primary": "rgba(123, 188, 234, 0.87)",
          "secondary": "rgba(123, 188, 234, 0.54)",
          "tertiary": "rgba(123, 188, 234, 0.37)",
          "quaternary": "rgba(123, 188, 234, 0.24)"
        },
        "info": {
          "primary": "rgba(104, 206, 253, 0.87)",
          "secondary": "rgba(104, 206, 253, 0.54)",
          "tertiary": "rgba(104, 206, 253, 0.37)",
          "quaternary": "rgba(104, 206, 253, 0.24)"
        },
        "success": {
          "primary": "rgba(149, 208, 151, 0.87)",
          "secondary": "rgba(149, 208, 151, 0.54)",
          "tertiary": "rgba(149, 208, 151, 0.37)",
          "quaternary": "rgba(149, 208, 151, 0.24)"
        },
        "warning": {
          "primary": "rgba(255, 194, 102, 0.87)",
          "secondary": "rgba(255, 194, 102, 0.54)",
          "tertiary": "rgba(255, 194, 102, 0.37)",
          "quaternary": "rgba(255, 194, 102, 0.24)"
        },
        "error": {
          "primary": "rgba(255, 138, 102, 0.87)",
          "secondary": "rgba(255, 138, 102, 0.54)",
          "tertiary": "rgba(255, 138, 102, 0.37)",
          "quaternary": "rgba(255, 138, 102, 0.24)"
        },
        "neutral": {
          "primary": "rgba(255, 255, 255, 0.87)",
          "secondary": "rgba(255, 255, 255, 0.54)",
          "tertiary": "rgba(255, 255, 255, 0.37)",
          "quaternary": "rgba(255, 255, 255, 0.24)"
        },
        "default": {
          "primary": "rgba(255, 255, 255, 0.87)",
          "secondary": "rgba(255, 255, 255, 0.54)",
          "tertiary": "rgba(255, 255, 255, 0.37)",
          "quaternary": "rgba(255, 255, 255, 0.24)"
        },
        "divider": "rgba(255, 255, 255, 0.14)",
        "active": "rgba(255, 255, 255, 0.54)",
        "hover": "rgba(255, 255, 255, 0.04)",
        "selected": "rgba(255, 255, 255, 0.07)",
        "focus": "rgba(255, 255, 255, 0.11)",
        "disabled": "rgba(255, 255, 255, 0.37)"
      },
      "background": {
        "primary": {
          "primary": "rgb(0, 0, 0)",
          "secondary": "rgb(4, 3, 1)",
          "tertiary": "rgb(21, 17, 5)",
          "quaternary": "rgb(42, 34, 9)"
        },
        "secondary": {
          "primary": "rgb(0, 0, 0)",
          "secondary": "rgb(1, 3, 4)",
          "tertiary": "rgb(5, 14, 21)",
          "quaternary": "rgb(10, 28, 41)"
        },
        "tertiary": {
          "primary": "rgb(0, 0, 0)",
          "secondary": "rgb(2, 3, 3)",
          "tertiary": "rgb(10, 14, 16)",
          "quaternary": "rgb(19, 28, 32)"
        },
        "quaternary": {
          "primary": "rgb(0, 0, 0)",
          "secondary": "rgb(1, 3, 4)",
          "tertiary": "rgb(4, 14, 22)",
          "quaternary": "rgb(7, 29, 44)"
        },
        "info": {
          "primary": "rgb(0, 0, 0)",
          "secondary": "rgb(0, 3, 5)",
          "tertiary": "rgb(0, 17, 25)",
          "quaternary": "rgb(1, 35, 50)"
        },
        "success": {
          "primary": "rgb(0, 0, 0)",
          "secondary": "rgb(2, 4, 2)",
          "tertiary": "rgb(8, 18, 8)",
          "quaternary": "rgb(16, 35, 16)"
        },
        "warning": {
          "primary": "rgb(0, 0, 0)",
          "secondary": "rgb(5, 3, 0)",
          "tertiary": "rgb(26, 15, 0)",
          "quaternary": "rgb(51, 31, 0)"
        },
        "error": {
          "primary": "rgb(0, 0, 0)",
          "secondary": "rgb(5, 1, 0)",
          "tertiary": "rgb(26, 6, 0)",
          "quaternary": "rgb(51, 12, 0)"
        },
        "neutral": {
          "primary": "rgb(0, 0, 0)",
          "secondary": "rgb(3, 3, 3)",
          "tertiary": "rgb(13, 13, 13)",
          "quaternary": "rgb(26, 26, 26)"
        },
        "default": {
          "primary": "rgb(0, 0, 0)",
          "secondary": "rgb(3, 3, 3)",
          "tertiary": "rgb(13, 13, 13)",
          "quaternary": "rgb(26, 26, 26)"
        }
      },
      "image": "/utils/images/image.jpg"
    });
  });

  to('update', async () => {
    // Browser
    const valueBrowsers = await evaluate((window: any) => {
      const amauiTheme = new window.AmauiStyle.AmauiTheme();

      const update = [];

      amauiTheme.subscriptions.update.subscribe(value => update.push(value));

      amauiTheme.update({
        palette: {
          light: false,

          color: {
            a: {
              main: '#f4f4da'
            }
          }
        }
      });

      delete amauiTheme.id;
      delete amauiTheme.element;
      delete amauiTheme.methods;
      delete amauiTheme.subscriptions;

      amauiTheme.breakpoints = { values: amauiTheme.breakpoints.values, unit: amauiTheme.breakpoints.unit };
      amauiTheme.space = { values: amauiTheme.space.values, unit: amauiTheme.space.unit };

      return [update, { ...amauiTheme }];
    }, { browsers });

    // Node
    const amauiTheme = new AmauiStyle.AmauiTheme();

    const update = [];

    amauiTheme.subscriptions.update.subscribe(value => update.push(value));

    amauiTheme.update({
      palette: {
        light: false,

        color: {
          a: {
            main: '#f4f4da'
          }
        }
      }
    });

    delete amauiTheme.id;
    delete amauiTheme.element;
    delete amauiTheme.methods;
    delete amauiTheme.subscriptions;

    amauiTheme.breakpoints = { values: amauiTheme.breakpoints.values, unit: amauiTheme.breakpoints.unit };
    amauiTheme.space = { values: amauiTheme.space.values, unit: amauiTheme.space.unit };

    const valueNode = [update, { ...amauiTheme }];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      [
        {
          "palette": {
            "light": false,
            "color": {
              "a": {
                "main": "#f4f4da"
              }
            }
          }
        }
      ],
      {
        "direction": "ltr",
        "preference": {
          "background": {
            "default": "neutral"
          },
          "text": {
            "default": "neutral"
          },
          "visual_contrast": {
            "default": "regular"
          }
        },
        "mode": "regular",
        "palette": {
          "light": false,
          "accessibility": "regular",
          "visual_contrast": {
            "low": {
              "opacity": {
                "primary": 0.77,
                "secondary": 0.44,
                "tertiary": 0.27,
                "quaternary": 0.14,
                "active": 0.44,
                "disabled": 0.27,
                "drag": 0.14,
                "divider": 0.13,
                "press": 0.1,
                "focus": 0.07,
                "selected": 0.05,
                "hover": 0.03
              },
              "contrast_threshold": 2.4
            },
            "regular": {
              "opacity": {
                "primary": 0.87,
                "secondary": 0.54,
                "tertiary": 0.37,
                "quaternary": 0.24,
                "active": 0.54,
                "disabled": 0.37,
                "drag": 0.16,
                "divider": 0.14,
                "press": 0.12,
                "focus": 0.11,
                "selected": 0.07,
                "hover": 0.04
              },
              "contrast_threshold": 3
            },
            "high": {
              "opacity": {
                "primary": 1,
                "secondary": 0.74,
                "tertiary": 0.57,
                "quaternary": 0.44,
                "active": 0.74,
                "disabled": 0.57,
                "drag": 0.27,
                "divider": 0.24,
                "press": 0.22,
                "focus": 0.21,
                "selected": 0.17,
                "hover": 0.14
              },
              "contrast_threshold": 4
            },
            "default": {
              "opacity": {
                "primary": 0.87,
                "secondary": 0.54,
                "tertiary": 0.37,
                "quaternary": 0.24,
                "active": 0.54,
                "disabled": 0.37,
                "drag": 0.16,
                "divider": 0.14,
                "press": 0.12,
                "focus": 0.11,
                "selected": 0.07,
                "hover": 0.04
              },
              "contrast_threshold": 3
            }
          },
          "color": {
            "primary": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(5, 5, 0)",
              "5": "rgb(26, 23, 0)",
              "10": "rgb(51, 46, 0)",
              "20": "rgb(102, 92, 0)",
              "30": "rgb(153, 138, 0)",
              "40": "rgb(204, 184, 0)",
              "50": "rgb(255, 230, 0)",
              "60": "rgb(255, 235, 51)",
              "70": "rgb(255, 240, 102)",
              "80": "rgb(255, 245, 153)",
              "90": "rgb(255, 250, 204)",
              "95": "rgb(255, 252, 229)",
              "99": "rgb(255, 254, 250)",
              "100": "rgb(255, 255, 255)",
              "main": "#FFEB3B",
              "light": "#FFF176",
              "dark": "#FBC02D"
            },
            "secondary": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(3, 4, 1)",
              "5": "rgb(13, 19, 6)",
              "10": "rgb(26, 38, 13)",
              "20": "rgb(53, 77, 26)",
              "30": "rgb(79, 115, 38)",
              "40": "rgb(105, 153, 51)",
              "50": "rgb(132, 191, 64)",
              "60": "rgb(156, 204, 102)",
              "70": "rgb(181, 217, 140)",
              "80": "rgb(206, 230, 179)",
              "90": "rgb(230, 242, 217)",
              "95": "rgb(243, 249, 236)",
              "99": "rgb(253, 254, 251)",
              "100": "rgb(255, 255, 255)",
              "main": "#8BC34A",
              "light": "#AED581",
              "dark": "#689F38"
            },
            "tertiary": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(5, 4, 0)",
              "5": "rgb(26, 19, 0)",
              "10": "rgb(51, 38, 0)",
              "20": "rgb(102, 77, 0)",
              "30": "rgb(153, 115, 0)",
              "40": "rgb(204, 153, 0)",
              "50": "rgb(255, 191, 0)",
              "60": "rgb(255, 204, 51)",
              "70": "rgb(255, 217, 102)",
              "80": "rgb(255, 230, 153)",
              "90": "rgb(255, 242, 204)",
              "95": "rgb(255, 249, 229)",
              "99": "rgb(255, 254, 250)",
              "100": "rgb(255, 255, 255)",
              "main": "#FFC107",
              "light": "#FFD54F",
              "dark": "#FFA000"
            },
            "quaternary": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(0, 5, 5)",
              "5": "rgb(0, 23, 26)",
              "10": "rgb(0, 45, 51)",
              "20": "rgb(0, 90, 102)",
              "30": "rgb(0, 135, 153)",
              "40": "rgb(0, 180, 204)",
              "50": "rgb(0, 225, 255)",
              "60": "rgb(51, 231, 255)",
              "70": "rgb(102, 237, 255)",
              "80": "rgb(153, 243, 255)",
              "90": "rgb(204, 249, 255)",
              "95": "rgb(229, 252, 255)",
              "99": "rgb(250, 254, 255)",
              "100": "rgb(255, 255, 255)",
              "main": "#00BCD4",
              "light": "#4DD0E1",
              "dark": "#0097A7"
            },
            "info": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(0, 3, 5)",
              "5": "rgb(0, 17, 25)",
              "10": "rgb(1, 35, 50)",
              "20": "rgb(1, 69, 101)",
              "30": "rgb(2, 104, 151)",
              "40": "rgb(2, 139, 202)",
              "50": "rgb(3, 173, 252)",
              "60": "rgb(53, 190, 253)",
              "70": "rgb(104, 206, 253)",
              "80": "rgb(154, 222, 254)",
              "90": "rgb(205, 239, 254)",
              "95": "rgb(230, 247, 255)",
              "99": "rgb(250, 253, 255)",
              "100": "rgb(255, 255, 255)",
              "main": "#03A9F4",
              "light": "#4FC3F7",
              "dark": "#0288D1"
            },
            "success": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(2, 4, 2)",
              "5": "rgb(8, 18, 8)",
              "10": "rgb(16, 35, 16)",
              "20": "rgb(31, 71, 32)",
              "30": "rgb(47, 106, 49)",
              "40": "rgb(62, 142, 65)",
              "50": "rgb(78, 177, 81)",
              "60": "rgb(113, 193, 116)",
              "70": "rgb(149, 208, 151)",
              "80": "rgb(184, 224, 185)",
              "90": "rgb(220, 239, 220)",
              "95": "rgb(237, 247, 238)",
              "99": "rgb(251, 253, 252)",
              "100": "rgb(255, 255, 255)",
              "main": "#4CAF50",
              "light": "#81C784",
              "dark": "#388E3C"
            },
            "warning": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(5, 3, 0)",
              "5": "rgb(26, 15, 0)",
              "10": "rgb(51, 31, 0)",
              "20": "rgb(102, 61, 0)",
              "30": "rgb(153, 92, 0)",
              "40": "rgb(204, 122, 0)",
              "50": "rgb(255, 153, 0)",
              "60": "rgb(255, 173, 51)",
              "70": "rgb(255, 194, 102)",
              "80": "rgb(255, 214, 153)",
              "90": "rgb(255, 235, 204)",
              "95": "rgb(255, 245, 229)",
              "99": "rgb(255, 253, 250)",
              "100": "rgb(255, 255, 255)",
              "main": "#FF9800",
              "light": "#FFB74D",
              "dark": "#F57C00"
            },
            "error": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(5, 1, 0)",
              "5": "rgb(26, 6, 0)",
              "10": "rgb(51, 12, 0)",
              "20": "rgb(102, 24, 0)",
              "30": "rgb(153, 36, 0)",
              "40": "rgb(204, 48, 0)",
              "50": "rgb(255, 60, 0)",
              "60": "rgb(255, 99, 51)",
              "70": "rgb(255, 138, 102)",
              "80": "rgb(255, 177, 153)",
              "90": "rgb(255, 216, 204)",
              "95": "rgb(255, 235, 229)",
              "99": "rgb(255, 251, 250)",
              "100": "rgb(255, 255, 255)",
              "main": "#FF5722",
              "light": "#FF8A65",
              "dark": "#E64A19"
            },
            "neutral": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(3, 3, 3)",
              "5": "rgb(13, 13, 13)",
              "10": "rgb(26, 26, 26)",
              "20": "rgb(51, 51, 51)",
              "30": "rgb(77, 77, 77)",
              "40": "rgb(102, 102, 102)",
              "50": "rgb(128, 128, 128)",
              "60": "rgb(153, 153, 153)",
              "70": "rgb(179, 179, 179)",
              "80": "rgb(204, 204, 204)",
              "90": "rgb(230, 230, 230)",
              "95": "rgb(242, 242, 242)",
              "99": "rgb(252, 252, 252)",
              "100": "rgb(255, 255, 255)",
              "main": "#000000",
              "light": "rgb(26, 26, 26)",
              "dark": "rgb(26, 26, 26)"
            },
            "a": {
              "0": "rgb(0, 0, 0)",
              "1": "rgb(4, 4, 1)",
              "5": "rgb(20, 20, 6)",
              "10": "rgb(39, 39, 12)",
              "20": "rgb(79, 79, 23)",
              "30": "rgb(118, 118, 35)",
              "40": "rgb(157, 157, 47)",
              "50": "rgb(196, 196, 59)",
              "60": "rgb(208, 208, 98)",
              "70": "rgb(220, 220, 137)",
              "80": "rgb(232, 232, 176)",
              "90": "rgb(243, 243, 216)",
              "95": "rgb(249, 249, 235)",
              "99": "rgb(254, 254, 251)",
              "100": "rgb(255, 255, 255)",
              "main": "#f4f4da",
              "light": "rgb(243, 243, 216)",
              "dark": "rgb(220, 220, 137)"
            }
          },
          "text": {
            "primary": {
              "primary": "rgba(255, 240, 102, 0.87)",
              "secondary": "rgba(255, 240, 102, 0.54)",
              "tertiary": "rgba(255, 240, 102, 0.37)",
              "quaternary": "rgba(255, 240, 102, 0.24)"
            },
            "secondary": {
              "primary": "rgba(181, 217, 140, 0.87)",
              "secondary": "rgba(181, 217, 140, 0.54)",
              "tertiary": "rgba(181, 217, 140, 0.37)",
              "quaternary": "rgba(181, 217, 140, 0.24)"
            },
            "tertiary": {
              "primary": "rgba(255, 217, 102, 0.87)",
              "secondary": "rgba(255, 217, 102, 0.54)",
              "tertiary": "rgba(255, 217, 102, 0.37)",
              "quaternary": "rgba(255, 217, 102, 0.24)"
            },
            "quaternary": {
              "primary": "rgba(102, 237, 255, 0.87)",
              "secondary": "rgba(102, 237, 255, 0.54)",
              "tertiary": "rgba(102, 237, 255, 0.37)",
              "quaternary": "rgba(102, 237, 255, 0.24)"
            },
            "info": {
              "primary": "rgba(104, 206, 253, 0.87)",
              "secondary": "rgba(104, 206, 253, 0.54)",
              "tertiary": "rgba(104, 206, 253, 0.37)",
              "quaternary": "rgba(104, 206, 253, 0.24)"
            },
            "success": {
              "primary": "rgba(149, 208, 151, 0.87)",
              "secondary": "rgba(149, 208, 151, 0.54)",
              "tertiary": "rgba(149, 208, 151, 0.37)",
              "quaternary": "rgba(149, 208, 151, 0.24)"
            },
            "warning": {
              "primary": "rgba(255, 194, 102, 0.87)",
              "secondary": "rgba(255, 194, 102, 0.54)",
              "tertiary": "rgba(255, 194, 102, 0.37)",
              "quaternary": "rgba(255, 194, 102, 0.24)"
            },
            "error": {
              "primary": "rgba(255, 138, 102, 0.87)",
              "secondary": "rgba(255, 138, 102, 0.54)",
              "tertiary": "rgba(255, 138, 102, 0.37)",
              "quaternary": "rgba(255, 138, 102, 0.24)"
            },
            "neutral": {
              "primary": "rgba(255, 255, 255, 0.87)",
              "secondary": "rgba(255, 255, 255, 0.54)",
              "tertiary": "rgba(255, 255, 255, 0.37)",
              "quaternary": "rgba(255, 255, 255, 0.24)"
            },
            "default": {
              "primary": "rgba(255, 255, 255, 0.87)",
              "secondary": "rgba(255, 255, 255, 0.54)",
              "tertiary": "rgba(255, 255, 255, 0.37)",
              "quaternary": "rgba(255, 255, 255, 0.24)"
            },
            "divider": "rgba(255, 255, 255, 0.14)",
            "active": "rgba(255, 255, 255, 0.54)",
            "hover": "rgba(255, 255, 255, 0.04)",
            "selected": "rgba(255, 255, 255, 0.07)",
            "focus": "rgba(255, 255, 255, 0.11)",
            "disabled": "rgba(255, 255, 255, 0.37)",
            "a": {
              "primary": "rgba(220, 220, 137, 0.87)",
              "secondary": "rgba(220, 220, 137, 0.54)",
              "tertiary": "rgba(220, 220, 137, 0.37)",
              "quaternary": "rgba(220, 220, 137, 0.24)"
            }
          },
          "background": {
            "primary": {
              "primary": "rgb(0, 0, 0)",
              "secondary": "rgb(5, 5, 0)",
              "tertiary": "rgb(26, 23, 0)",
              "quaternary": "rgb(51, 46, 0)"
            },
            "secondary": {
              "primary": "rgb(0, 0, 0)",
              "secondary": "rgb(3, 4, 1)",
              "tertiary": "rgb(13, 19, 6)",
              "quaternary": "rgb(26, 38, 13)"
            },
            "tertiary": {
              "primary": "rgb(0, 0, 0)",
              "secondary": "rgb(5, 4, 0)",
              "tertiary": "rgb(26, 19, 0)",
              "quaternary": "rgb(51, 38, 0)"
            },
            "quaternary": {
              "primary": "rgb(0, 0, 0)",
              "secondary": "rgb(0, 5, 5)",
              "tertiary": "rgb(0, 23, 26)",
              "quaternary": "rgb(0, 45, 51)"
            },
            "info": {
              "primary": "rgb(0, 0, 0)",
              "secondary": "rgb(0, 3, 5)",
              "tertiary": "rgb(0, 17, 25)",
              "quaternary": "rgb(1, 35, 50)"
            },
            "success": {
              "primary": "rgb(0, 0, 0)",
              "secondary": "rgb(2, 4, 2)",
              "tertiary": "rgb(8, 18, 8)",
              "quaternary": "rgb(16, 35, 16)"
            },
            "warning": {
              "primary": "rgb(0, 0, 0)",
              "secondary": "rgb(5, 3, 0)",
              "tertiary": "rgb(26, 15, 0)",
              "quaternary": "rgb(51, 31, 0)"
            },
            "error": {
              "primary": "rgb(0, 0, 0)",
              "secondary": "rgb(5, 1, 0)",
              "tertiary": "rgb(26, 6, 0)",
              "quaternary": "rgb(51, 12, 0)"
            },
            "neutral": {
              "primary": "rgb(0, 0, 0)",
              "secondary": "rgb(3, 3, 3)",
              "tertiary": "rgb(13, 13, 13)",
              "quaternary": "rgb(26, 26, 26)"
            },
            "default": {
              "primary": "rgb(0, 0, 0)",
              "secondary": "rgb(3, 3, 3)",
              "tertiary": "rgb(13, 13, 13)",
              "quaternary": "rgb(26, 26, 26)"
            },
            "a": {
              "primary": "rgb(0, 0, 0)",
              "secondary": "rgb(4, 4, 1)",
              "tertiary": "rgb(20, 20, 6)",
              "quaternary": "rgb(39, 39, 12)"
            }
          }
        },
        "shape": {
          "radius": {
            "xs": 4,
            "sm": 8,
            "md": 12,
            "lg": 16,
            "xl": 28
          }
        },
        "breakpoints": {
          "values": {
            "xs": 0,
            "sm": 600,
            "md": 1240,
            "lg": 1440,
            "xl": 1920
          },
          "unit": "px"
        },
        "space": {
          "values": {
            "xs": 4,
            "sm": 8,
            "md": 16,
            "lg": 32,
            "xl": 64
          },
          "unit": 8
        },
        "shadows": {
          "values": {
            "primary": {
              "0": "none",
              "1": "0px 1px 1px 0px rgba(255, 235, 59, 0.14), 0px 2px 1px -1px rgba(255, 235, 59, 0.11), 0px 1px 3px 0px rgba(255, 235, 59, 0.17)",
              "2": "0px 2px 2px 0px rgba(255, 235, 59, 0.14), 0px 3px 3px -2px rgba(255, 235, 59, 0.11), 0px 1px 8px 0px rgba(255, 235, 59, 0.17)",
              "3": "0px 3px 4px 0px rgba(255, 235, 59, 0.14), 0px 3px 3px -2px rgba(255, 235, 59, 0.11), 0px 1px 8px 0px rgba(255, 235, 59, 0.17)",
              "4": "0px 4px 5px 0px rgba(255, 235, 59, 0.14), 0px 1px 10px 0px rgba(255, 235, 59, 0.11), 0px 2px 4px -1px rgba(255, 235, 59, 0.17)",
              "6": "0px 6px 10px 0px rgba(255, 235, 59, 0.14), 0px 1px 18px 0px rgba(255, 235, 59, 0.11), 0px 3px 5px -1px rgba(255, 235, 59, 0.17)",
              "8": "0px 8px 10px 1px rgba(255, 235, 59, 0.14), 0px 3px 14px 2px rgba(255, 235, 59, 0.11), 0px 5px 5px -3px rgba(255, 235, 59, 0.17)",
              "9": "0px 9px 12px 1px rgba(255, 235, 59, 0.14), 0px 3px 16px 2px rgba(255, 235, 59, 0.11), 0px 5px 6px -3px rgba(255, 235, 59, 0.17)",
              "12": "0px 12px 17px 2px rgba(255, 235, 59, 0.14), 0px 5px 22px 4px rgba(255, 235, 59, 0.11), 0px 7px 7px -4px rgba(255, 235, 59, 0.17)",
              "16": "0px 16px 24px 2px rgba(255, 235, 59, 0.14), 0px 6px 30px 5px rgba(255, 235, 59, 0.11), 0px 8px 10px -5px rgba(255, 235, 59, 0.17)",
              "24": "0px 24px 37px 3px rgba(255, 235, 59, 0.14), 0px 9px 46px 8px rgba(255, 235, 59, 0.11), 0px 11px 15px -7px rgba(255, 235, 59, 0.17)"
            },
            "secondary": {
              "0": "none",
              "1": "0px 1px 1px 0px rgba(139, 195, 74, 0.14), 0px 2px 1px -1px rgba(139, 195, 74, 0.11), 0px 1px 3px 0px rgba(139, 195, 74, 0.17)",
              "2": "0px 2px 2px 0px rgba(139, 195, 74, 0.14), 0px 3px 3px -2px rgba(139, 195, 74, 0.11), 0px 1px 8px 0px rgba(139, 195, 74, 0.17)",
              "3": "0px 3px 4px 0px rgba(139, 195, 74, 0.14), 0px 3px 3px -2px rgba(139, 195, 74, 0.11), 0px 1px 8px 0px rgba(139, 195, 74, 0.17)",
              "4": "0px 4px 5px 0px rgba(139, 195, 74, 0.14), 0px 1px 10px 0px rgba(139, 195, 74, 0.11), 0px 2px 4px -1px rgba(139, 195, 74, 0.17)",
              "6": "0px 6px 10px 0px rgba(139, 195, 74, 0.14), 0px 1px 18px 0px rgba(139, 195, 74, 0.11), 0px 3px 5px -1px rgba(139, 195, 74, 0.17)",
              "8": "0px 8px 10px 1px rgba(139, 195, 74, 0.14), 0px 3px 14px 2px rgba(139, 195, 74, 0.11), 0px 5px 5px -3px rgba(139, 195, 74, 0.17)",
              "9": "0px 9px 12px 1px rgba(139, 195, 74, 0.14), 0px 3px 16px 2px rgba(139, 195, 74, 0.11), 0px 5px 6px -3px rgba(139, 195, 74, 0.17)",
              "12": "0px 12px 17px 2px rgba(139, 195, 74, 0.14), 0px 5px 22px 4px rgba(139, 195, 74, 0.11), 0px 7px 7px -4px rgba(139, 195, 74, 0.17)",
              "16": "0px 16px 24px 2px rgba(139, 195, 74, 0.14), 0px 6px 30px 5px rgba(139, 195, 74, 0.11), 0px 8px 10px -5px rgba(139, 195, 74, 0.17)",
              "24": "0px 24px 37px 3px rgba(139, 195, 74, 0.14), 0px 9px 46px 8px rgba(139, 195, 74, 0.11), 0px 11px 15px -7px rgba(139, 195, 74, 0.17)"
            },
            "tertiary": {
              "0": "none",
              "1": "0px 1px 1px 0px rgba(255, 193, 7, 0.14), 0px 2px 1px -1px rgba(255, 193, 7, 0.11), 0px 1px 3px 0px rgba(255, 193, 7, 0.17)",
              "2": "0px 2px 2px 0px rgba(255, 193, 7, 0.14), 0px 3px 3px -2px rgba(255, 193, 7, 0.11), 0px 1px 8px 0px rgba(255, 193, 7, 0.17)",
              "3": "0px 3px 4px 0px rgba(255, 193, 7, 0.14), 0px 3px 3px -2px rgba(255, 193, 7, 0.11), 0px 1px 8px 0px rgba(255, 193, 7, 0.17)",
              "4": "0px 4px 5px 0px rgba(255, 193, 7, 0.14), 0px 1px 10px 0px rgba(255, 193, 7, 0.11), 0px 2px 4px -1px rgba(255, 193, 7, 0.17)",
              "6": "0px 6px 10px 0px rgba(255, 193, 7, 0.14), 0px 1px 18px 0px rgba(255, 193, 7, 0.11), 0px 3px 5px -1px rgba(255, 193, 7, 0.17)",
              "8": "0px 8px 10px 1px rgba(255, 193, 7, 0.14), 0px 3px 14px 2px rgba(255, 193, 7, 0.11), 0px 5px 5px -3px rgba(255, 193, 7, 0.17)",
              "9": "0px 9px 12px 1px rgba(255, 193, 7, 0.14), 0px 3px 16px 2px rgba(255, 193, 7, 0.11), 0px 5px 6px -3px rgba(255, 193, 7, 0.17)",
              "12": "0px 12px 17px 2px rgba(255, 193, 7, 0.14), 0px 5px 22px 4px rgba(255, 193, 7, 0.11), 0px 7px 7px -4px rgba(255, 193, 7, 0.17)",
              "16": "0px 16px 24px 2px rgba(255, 193, 7, 0.14), 0px 6px 30px 5px rgba(255, 193, 7, 0.11), 0px 8px 10px -5px rgba(255, 193, 7, 0.17)",
              "24": "0px 24px 37px 3px rgba(255, 193, 7, 0.14), 0px 9px 46px 8px rgba(255, 193, 7, 0.11), 0px 11px 15px -7px rgba(255, 193, 7, 0.17)"
            },
            "quaternary": {
              "0": "none",
              "1": "0px 1px 1px 0px rgba(0, 188, 212, 0.14), 0px 2px 1px -1px rgba(0, 188, 212, 0.11), 0px 1px 3px 0px rgba(0, 188, 212, 0.17)",
              "2": "0px 2px 2px 0px rgba(0, 188, 212, 0.14), 0px 3px 3px -2px rgba(0, 188, 212, 0.11), 0px 1px 8px 0px rgba(0, 188, 212, 0.17)",
              "3": "0px 3px 4px 0px rgba(0, 188, 212, 0.14), 0px 3px 3px -2px rgba(0, 188, 212, 0.11), 0px 1px 8px 0px rgba(0, 188, 212, 0.17)",
              "4": "0px 4px 5px 0px rgba(0, 188, 212, 0.14), 0px 1px 10px 0px rgba(0, 188, 212, 0.11), 0px 2px 4px -1px rgba(0, 188, 212, 0.17)",
              "6": "0px 6px 10px 0px rgba(0, 188, 212, 0.14), 0px 1px 18px 0px rgba(0, 188, 212, 0.11), 0px 3px 5px -1px rgba(0, 188, 212, 0.17)",
              "8": "0px 8px 10px 1px rgba(0, 188, 212, 0.14), 0px 3px 14px 2px rgba(0, 188, 212, 0.11), 0px 5px 5px -3px rgba(0, 188, 212, 0.17)",
              "9": "0px 9px 12px 1px rgba(0, 188, 212, 0.14), 0px 3px 16px 2px rgba(0, 188, 212, 0.11), 0px 5px 6px -3px rgba(0, 188, 212, 0.17)",
              "12": "0px 12px 17px 2px rgba(0, 188, 212, 0.14), 0px 5px 22px 4px rgba(0, 188, 212, 0.11), 0px 7px 7px -4px rgba(0, 188, 212, 0.17)",
              "16": "0px 16px 24px 2px rgba(0, 188, 212, 0.14), 0px 6px 30px 5px rgba(0, 188, 212, 0.11), 0px 8px 10px -5px rgba(0, 188, 212, 0.17)",
              "24": "0px 24px 37px 3px rgba(0, 188, 212, 0.14), 0px 9px 46px 8px rgba(0, 188, 212, 0.11), 0px 11px 15px -7px rgba(0, 188, 212, 0.17)"
            },
            "info": {
              "0": "none",
              "1": "0px 1px 1px 0px rgba(3, 169, 244, 0.14), 0px 2px 1px -1px rgba(3, 169, 244, 0.11), 0px 1px 3px 0px rgba(3, 169, 244, 0.17)",
              "2": "0px 2px 2px 0px rgba(3, 169, 244, 0.14), 0px 3px 3px -2px rgba(3, 169, 244, 0.11), 0px 1px 8px 0px rgba(3, 169, 244, 0.17)",
              "3": "0px 3px 4px 0px rgba(3, 169, 244, 0.14), 0px 3px 3px -2px rgba(3, 169, 244, 0.11), 0px 1px 8px 0px rgba(3, 169, 244, 0.17)",
              "4": "0px 4px 5px 0px rgba(3, 169, 244, 0.14), 0px 1px 10px 0px rgba(3, 169, 244, 0.11), 0px 2px 4px -1px rgba(3, 169, 244, 0.17)",
              "6": "0px 6px 10px 0px rgba(3, 169, 244, 0.14), 0px 1px 18px 0px rgba(3, 169, 244, 0.11), 0px 3px 5px -1px rgba(3, 169, 244, 0.17)",
              "8": "0px 8px 10px 1px rgba(3, 169, 244, 0.14), 0px 3px 14px 2px rgba(3, 169, 244, 0.11), 0px 5px 5px -3px rgba(3, 169, 244, 0.17)",
              "9": "0px 9px 12px 1px rgba(3, 169, 244, 0.14), 0px 3px 16px 2px rgba(3, 169, 244, 0.11), 0px 5px 6px -3px rgba(3, 169, 244, 0.17)",
              "12": "0px 12px 17px 2px rgba(3, 169, 244, 0.14), 0px 5px 22px 4px rgba(3, 169, 244, 0.11), 0px 7px 7px -4px rgba(3, 169, 244, 0.17)",
              "16": "0px 16px 24px 2px rgba(3, 169, 244, 0.14), 0px 6px 30px 5px rgba(3, 169, 244, 0.11), 0px 8px 10px -5px rgba(3, 169, 244, 0.17)",
              "24": "0px 24px 37px 3px rgba(3, 169, 244, 0.14), 0px 9px 46px 8px rgba(3, 169, 244, 0.11), 0px 11px 15px -7px rgba(3, 169, 244, 0.17)"
            },
            "success": {
              "0": "none",
              "1": "0px 1px 1px 0px rgba(76, 175, 80, 0.14), 0px 2px 1px -1px rgba(76, 175, 80, 0.11), 0px 1px 3px 0px rgba(76, 175, 80, 0.17)",
              "2": "0px 2px 2px 0px rgba(76, 175, 80, 0.14), 0px 3px 3px -2px rgba(76, 175, 80, 0.11), 0px 1px 8px 0px rgba(76, 175, 80, 0.17)",
              "3": "0px 3px 4px 0px rgba(76, 175, 80, 0.14), 0px 3px 3px -2px rgba(76, 175, 80, 0.11), 0px 1px 8px 0px rgba(76, 175, 80, 0.17)",
              "4": "0px 4px 5px 0px rgba(76, 175, 80, 0.14), 0px 1px 10px 0px rgba(76, 175, 80, 0.11), 0px 2px 4px -1px rgba(76, 175, 80, 0.17)",
              "6": "0px 6px 10px 0px rgba(76, 175, 80, 0.14), 0px 1px 18px 0px rgba(76, 175, 80, 0.11), 0px 3px 5px -1px rgba(76, 175, 80, 0.17)",
              "8": "0px 8px 10px 1px rgba(76, 175, 80, 0.14), 0px 3px 14px 2px rgba(76, 175, 80, 0.11), 0px 5px 5px -3px rgba(76, 175, 80, 0.17)",
              "9": "0px 9px 12px 1px rgba(76, 175, 80, 0.14), 0px 3px 16px 2px rgba(76, 175, 80, 0.11), 0px 5px 6px -3px rgba(76, 175, 80, 0.17)",
              "12": "0px 12px 17px 2px rgba(76, 175, 80, 0.14), 0px 5px 22px 4px rgba(76, 175, 80, 0.11), 0px 7px 7px -4px rgba(76, 175, 80, 0.17)",
              "16": "0px 16px 24px 2px rgba(76, 175, 80, 0.14), 0px 6px 30px 5px rgba(76, 175, 80, 0.11), 0px 8px 10px -5px rgba(76, 175, 80, 0.17)",
              "24": "0px 24px 37px 3px rgba(76, 175, 80, 0.14), 0px 9px 46px 8px rgba(76, 175, 80, 0.11), 0px 11px 15px -7px rgba(76, 175, 80, 0.17)"
            },
            "warning": {
              "0": "none",
              "1": "0px 1px 1px 0px rgba(255, 152, 0, 0.14), 0px 2px 1px -1px rgba(255, 152, 0, 0.11), 0px 1px 3px 0px rgba(255, 152, 0, 0.17)",
              "2": "0px 2px 2px 0px rgba(255, 152, 0, 0.14), 0px 3px 3px -2px rgba(255, 152, 0, 0.11), 0px 1px 8px 0px rgba(255, 152, 0, 0.17)",
              "3": "0px 3px 4px 0px rgba(255, 152, 0, 0.14), 0px 3px 3px -2px rgba(255, 152, 0, 0.11), 0px 1px 8px 0px rgba(255, 152, 0, 0.17)",
              "4": "0px 4px 5px 0px rgba(255, 152, 0, 0.14), 0px 1px 10px 0px rgba(255, 152, 0, 0.11), 0px 2px 4px -1px rgba(255, 152, 0, 0.17)",
              "6": "0px 6px 10px 0px rgba(255, 152, 0, 0.14), 0px 1px 18px 0px rgba(255, 152, 0, 0.11), 0px 3px 5px -1px rgba(255, 152, 0, 0.17)",
              "8": "0px 8px 10px 1px rgba(255, 152, 0, 0.14), 0px 3px 14px 2px rgba(255, 152, 0, 0.11), 0px 5px 5px -3px rgba(255, 152, 0, 0.17)",
              "9": "0px 9px 12px 1px rgba(255, 152, 0, 0.14), 0px 3px 16px 2px rgba(255, 152, 0, 0.11), 0px 5px 6px -3px rgba(255, 152, 0, 0.17)",
              "12": "0px 12px 17px 2px rgba(255, 152, 0, 0.14), 0px 5px 22px 4px rgba(255, 152, 0, 0.11), 0px 7px 7px -4px rgba(255, 152, 0, 0.17)",
              "16": "0px 16px 24px 2px rgba(255, 152, 0, 0.14), 0px 6px 30px 5px rgba(255, 152, 0, 0.11), 0px 8px 10px -5px rgba(255, 152, 0, 0.17)",
              "24": "0px 24px 37px 3px rgba(255, 152, 0, 0.14), 0px 9px 46px 8px rgba(255, 152, 0, 0.11), 0px 11px 15px -7px rgba(255, 152, 0, 0.17)"
            },
            "error": {
              "0": "none",
              "1": "0px 1px 1px 0px rgba(255, 87, 34, 0.14), 0px 2px 1px -1px rgba(255, 87, 34, 0.11), 0px 1px 3px 0px rgba(255, 87, 34, 0.17)",
              "2": "0px 2px 2px 0px rgba(255, 87, 34, 0.14), 0px 3px 3px -2px rgba(255, 87, 34, 0.11), 0px 1px 8px 0px rgba(255, 87, 34, 0.17)",
              "3": "0px 3px 4px 0px rgba(255, 87, 34, 0.14), 0px 3px 3px -2px rgba(255, 87, 34, 0.11), 0px 1px 8px 0px rgba(255, 87, 34, 0.17)",
              "4": "0px 4px 5px 0px rgba(255, 87, 34, 0.14), 0px 1px 10px 0px rgba(255, 87, 34, 0.11), 0px 2px 4px -1px rgba(255, 87, 34, 0.17)",
              "6": "0px 6px 10px 0px rgba(255, 87, 34, 0.14), 0px 1px 18px 0px rgba(255, 87, 34, 0.11), 0px 3px 5px -1px rgba(255, 87, 34, 0.17)",
              "8": "0px 8px 10px 1px rgba(255, 87, 34, 0.14), 0px 3px 14px 2px rgba(255, 87, 34, 0.11), 0px 5px 5px -3px rgba(255, 87, 34, 0.17)",
              "9": "0px 9px 12px 1px rgba(255, 87, 34, 0.14), 0px 3px 16px 2px rgba(255, 87, 34, 0.11), 0px 5px 6px -3px rgba(255, 87, 34, 0.17)",
              "12": "0px 12px 17px 2px rgba(255, 87, 34, 0.14), 0px 5px 22px 4px rgba(255, 87, 34, 0.11), 0px 7px 7px -4px rgba(255, 87, 34, 0.17)",
              "16": "0px 16px 24px 2px rgba(255, 87, 34, 0.14), 0px 6px 30px 5px rgba(255, 87, 34, 0.11), 0px 8px 10px -5px rgba(255, 87, 34, 0.17)",
              "24": "0px 24px 37px 3px rgba(255, 87, 34, 0.14), 0px 9px 46px 8px rgba(255, 87, 34, 0.11), 0px 11px 15px -7px rgba(255, 87, 34, 0.17)"
            },
            "neutral": {
              "0": "none",
              "1": "0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.11), 0px 1px 3px 0px rgba(0, 0, 0, 0.17)",
              "2": "0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 3px -2px rgba(0, 0, 0, 0.11), 0px 1px 8px 0px rgba(0, 0, 0, 0.17)",
              "3": "0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 3px 3px -2px rgba(0, 0, 0, 0.11), 0px 1px 8px 0px rgba(0, 0, 0, 0.17)",
              "4": "0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.11), 0px 2px 4px -1px rgba(0, 0, 0, 0.17)",
              "6": "0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.11), 0px 3px 5px -1px rgba(0, 0, 0, 0.17)",
              "8": "0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.11), 0px 5px 5px -3px rgba(0, 0, 0, 0.17)",
              "9": "0px 9px 12px 1px rgba(0, 0, 0, 0.14), 0px 3px 16px 2px rgba(0, 0, 0, 0.11), 0px 5px 6px -3px rgba(0, 0, 0, 0.17)",
              "12": "0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.11), 0px 7px 7px -4px rgba(0, 0, 0, 0.17)",
              "16": "0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.11), 0px 8px 10px -5px rgba(0, 0, 0, 0.17)",
              "24": "0px 24px 37px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.11), 0px 11px 15px -7px rgba(0, 0, 0, 0.17)"
            },
            "a": {
              "0": "none",
              "1": "0px 1px 1px 0px rgba(244, 244, 218, 0.14), 0px 2px 1px -1px rgba(244, 244, 218, 0.11), 0px 1px 3px 0px rgba(244, 244, 218, 0.17)",
              "2": "0px 2px 2px 0px rgba(244, 244, 218, 0.14), 0px 3px 3px -2px rgba(244, 244, 218, 0.11), 0px 1px 8px 0px rgba(244, 244, 218, 0.17)",
              "3": "0px 3px 4px 0px rgba(244, 244, 218, 0.14), 0px 3px 3px -2px rgba(244, 244, 218, 0.11), 0px 1px 8px 0px rgba(244, 244, 218, 0.17)",
              "4": "0px 4px 5px 0px rgba(244, 244, 218, 0.14), 0px 1px 10px 0px rgba(244, 244, 218, 0.11), 0px 2px 4px -1px rgba(244, 244, 218, 0.17)",
              "6": "0px 6px 10px 0px rgba(244, 244, 218, 0.14), 0px 1px 18px 0px rgba(244, 244, 218, 0.11), 0px 3px 5px -1px rgba(244, 244, 218, 0.17)",
              "8": "0px 8px 10px 1px rgba(244, 244, 218, 0.14), 0px 3px 14px 2px rgba(244, 244, 218, 0.11), 0px 5px 5px -3px rgba(244, 244, 218, 0.17)",
              "9": "0px 9px 12px 1px rgba(244, 244, 218, 0.14), 0px 3px 16px 2px rgba(244, 244, 218, 0.11), 0px 5px 6px -3px rgba(244, 244, 218, 0.17)",
              "12": "0px 12px 17px 2px rgba(244, 244, 218, 0.14), 0px 5px 22px 4px rgba(244, 244, 218, 0.11), 0px 7px 7px -4px rgba(244, 244, 218, 0.17)",
              "16": "0px 16px 24px 2px rgba(244, 244, 218, 0.14), 0px 6px 30px 5px rgba(244, 244, 218, 0.11), 0px 8px 10px -5px rgba(244, 244, 218, 0.17)",
              "24": "0px 24px 37px 3px rgba(244, 244, 218, 0.14), 0px 9px 46px 8px rgba(244, 244, 218, 0.11), 0px 11px 15px -7px rgba(244, 244, 218, 0.17)"
            }
          },
          "opacities": [
            0.14,
            0.11,
            0.17
          ]
        },
        "typography": {
          "unit": "px",
          "font_size": {
            "html": 16
          },
          "font_family": {
            "primary": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
            "secondary": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
            "mono": "Roboto Mono, monospace"
          },
          "values": {
            "d1": {
              "fontSize": "3.5625rem",
              "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
              "fontWeight": 400,
              "lineHeight": 1.1228070175438596,
              "letterSpacing": "0em"
            },
            "d2": {
              "fontSize": "2.8125rem",
              "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
              "fontWeight": 400,
              "lineHeight": 1.1555555555555554,
              "letterSpacing": "0em"
            },
            "d3": {
              "fontSize": "2.1875rem",
              "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
              "fontWeight": 400,
              "lineHeight": 1.2571428571428571,
              "letterSpacing": "0em"
            },
            "h1": {
              "fontSize": "2rem",
              "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
              "fontWeight": 400,
              "lineHeight": 1.25,
              "letterSpacing": "0em"
            },
            "h2": {
              "fontSize": "1.6875rem",
              "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
              "fontWeight": 400,
              "lineHeight": 1.2962962962962963,
              "letterSpacing": "0em"
            },
            "h3": {
              "fontSize": "1.5rem",
              "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
              "fontWeight": 400,
              "lineHeight": 1.3333333333333333,
              "letterSpacing": "0em"
            },
            "t1": {
              "fontSize": "1.3125rem",
              "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
              "fontWeight": 400,
              "lineHeight": 3.0476190476190474,
              "letterSpacing": "0em"
            },
            "t2": {
              "fontSize": "1rem",
              "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
              "fontWeight": 500,
              "lineHeight": 1.5,
              "letterSpacing": ".15em"
            },
            "t3": {
              "fontSize": "0.875rem",
              "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
              "fontWeight": 500,
              "lineHeight": 1.4285714285714286,
              "letterSpacing": ".1em"
            },
            "l1": {
              "fontSize": "0.875rem",
              "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
              "fontWeight": 500,
              "lineHeight": 1.4285714285714286,
              "letterSpacing": ".1em"
            },
            "l2": {
              "fontSize": "0.75rem",
              "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
              "fontWeight": 500,
              "lineHeight": 1.25,
              "letterSpacing": ".5em"
            },
            "l3": {
              "fontSize": "0.6875rem",
              "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
              "fontWeight": 500,
              "lineHeight": 0.45454545454545453,
              "letterSpacing": ".5em"
            },
            "b1": {
              "fontSize": "1rem",
              "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
              "fontWeight": 400,
              "lineHeight": 1.5,
              "letterSpacing": ".5em"
            },
            "b2": {
              "fontSize": "0.875rem",
              "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
              "fontWeight": 400,
              "lineHeight": 1.4285714285714286,
              "letterSpacing": ".25em"
            },
            "b3": {
              "fontSize": "0.6875rem",
              "fontFamily": "Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif",
              "fontWeight": 400,
              "lineHeight": 1.3636363636363635,
              "letterSpacing": ".4em"
            }
          }
        },
        "z_index": {
          "tooltip": 1700,
          "modal": 1500,
          "menu_modal": 1400,
          "menu": 1300,
          "button_float": 1200,
          "app_bar": 1100,
          "main": 1000,
          "text": 0
        },
        "options": {
          "rule": {
            "sort": true,
            "prefix": false,
            "rtl": false
          }
        },
        "hash": "0xa84825a47165f38b9994e562e0ab198ef4f31a16d2fe03445c9c6afc32225c51"
      }
    ]));
  });

});
