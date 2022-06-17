/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers } from '../utils/js/test/utils';

import * as AmauiStyle from '../src';
import { TValue } from '../src';

group('@amaui/style/reset', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => await closeBrowsers(browsers));

  to('reset', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const amauiStyle = new window.AmauiStyle.AmauiStyle(window.document.body);

      // Plugins
      amauiStyle.plugins.add = [
        window.AmauiStyle.unit,
        window.AmauiStyle.sort,
        window.AmauiStyle.prefix,
        window.AmauiStyle.makeClassName,
        window.AmauiStyle.rtl,
      ];

      const a = {
        a: {
          // unit
          width: 100,

          'max-width': 100,

          // Simple
          background: '#faa',

          margin: '0 14px 4px 40px',

          // rtl
          marginLeft: 41,
          float: 'left',

          // sort
          paddingLeft: 41,
          padding: 40,

          // prefixes
          position: 'sticky',
          transition: 'all .4s ease',
          maskOrigin: 'inherit',
          maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
          maskPosition: '40% 74%',

          // animation
          animation: '$a .4s ease',
        },

        meta: {
          width: 100
        },

        main: {
          // Function
          background: props => props.a === 1 ? 'yellow' : 'orange',
        },
      };

      const reset = window.AmauiStyle.reset(a, { amaui_style: { value: amauiStyle } });

      // Add
      reset.add();

      let valueCSS = ``;

      Array.from(document.styleSheets).forEach(styleSheet => {
        Array.from(styleSheet.cssRules).forEach(cssRule => valueCSS += `\n${cssRule.cssText}`);
      });

      return [
        window.document.styleSheets.length,
        Object.keys(reset),
        reset.amaui_style_sheet_manager.status === 'active',
        valueCSS,
        amauiStyle.css,
      ];
    }, { browsers });

    const values = [...valueBrowsers];

    assert(values).eql([
      [
        2,
        [
          "ids",
          "amaui_style_sheet_manager",
          "sheets",
          "add",
          "props",
          "update",
          "remove",
          "addRule"
        ],
        true,
        "\nmain { background: orange; display: block; }\na { background: transparent; cursor: pointer; float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; text-decoration: none; transition: all 0.4s ease 0s; width: 100px; }\nmeta { width: 100px; }\n[contenteditable] { user-select: text; }\n* { background: transparent; border: 0px; box-sizing: border-box; font-size: 100%; margin: 0px; outline: none; padding: 0px; touch-action: manipulation; }\nbody { background-color: rgb(255, 255, 255); font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif; font-size: 14px; font-style: normal; font-weight: normal; overflow-x: hidden; position: relative; }\nimg, embed, object, video { height: auto; max-width: 100%; }\nform { width: 100%; }\nspan { overflow-wrap: break-word; }\nhr { background: rgb(221, 221, 221); box-sizing: content-box; height: 1px; margin: 24px 0px; overflow: visible; width: 100%; }\npre, code, kbd, samp { font-family: \"Roboto Mono\", monospace; }\ncode span { white-space: pre-wrap; }\n:focus { outline: none; }\nhtml { text-size-adjust: 100%; }\nh1 { font-size: 2em; margin: 0.67em 0px; }\npre { font-family: monospace, monospace; font-size: 1em; }\nabbr[title] { border-bottom: none; text-decoration: underline; }\nb, strong { font-weight: bolder; }\ncode, kbd, samp { font-family: monospace, monospace; font-size: 1em; }\nsmall { font-size: 80%; }\nsub, sup { font-size: 75%; position: relative; vertical-align: baseline; }\nsub { bottom: -0.25em; }\nsup { top: -0.5em; }\nimg { border-style: none; }\nbutton, input, optgroup, select, textarea { font-family: inherit; font-size: 100%; margin: 0px; }\nbutton, input { overflow: visible; }\nbutton, select { text-transform: none; }\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] { appearance: button; }\nfieldset { padding: 0.35em 0.75em 0.625em; }\nlegend { box-sizing: border-box; color: inherit; display: table; max-width: 100%; padding: 0px; white-space: normal; }\nprogress { vertical-align: baseline; }\ntextarea { overflow: auto; }\n[type=\"checkbox\"], [type=\"radio\"] { box-sizing: border-box; padding: 0px; }\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button { height: auto; }\n[type=\"search\"] { appearance: textfield; outline-offset: -2px; }\n[type=\"search\"]::-webkit-search-decoration { appearance: none; }\n::-webkit-file-upload-button { appearance: button; font: inherit; }\ndetails { display: block; }\nsummary { display: list-item; }\ntemplate { display: none; }\n[hidden] { display: none; }",
        "\n\na {\nbackground: #faa;\nbackground-color: transparent;\ncursor: pointer;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntext-decoration: none;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\nmeta {\nwidth: 100px;\n}\n\n* {\nbackground: transparent;\nborder: 0px;\nbox-sizing: border-box;\nfont-size: 100%;\nmargin: 0px;\noutline: none;\npadding: 0px;\ntouch-action: manipulation;\n}\n\nbody {\nbackground-color: #fff;\nfont-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif;\nfont-size: 14px;\nfont-style: normal;\nfont-weight: normal;\noverflow-x: hidden;\nposition: relative;\n}\n\nimg, embed, object, video {\nheight: auto;\nmax-width: 100%;\n}\n\nform {\nwidth: 100%;\n}\n\nspan {\nword-wrap: break-word;\n}\n\nhr {\nbackground: #ddd;\nbox-sizing: content-box;\nheight: 1px;\nmargin: 24px 0;\noverflow: visible;\nwidth: 100%;\n}\n\npre, code, kbd, samp {\nfont-family: Roboto Mono, monospace;\n}\n\n:focus {\noutline: none;\n}\n\nhtml {\n-webkit-text-size-adjust: 100%;\n}\n\nh1 {\nfont-size: 2em;\nmargin: 0.67em 0;\n}\n\npre {\nfont-family: monospace, monospace;\nfont-size: 1em;\n}\n\nabbr[title] {\nborder-bottom: none;\ntext-decoration: underline dotted;\ntext-decoration: underline;\n}\n\nb, strong {\nfont-weight: bolder;\n}\n\ncode, kbd, samp {\nfont-family: monospace, monospace;\nfont-size: 1em;\n}\n\nsmall {\nfont-size: 80%;\n}\n\nsub, sup {\nfont-size: 75%;\nposition: relative;\nvertical-align: baseline;\n}\n\nsub {\nbottom: -0.25em;\n}\n\nsup {\ntop: -0.5em;\n}\n\nimg {\nborder-style: none;\n}\n\nbutton, input, optgroup, select, textarea {\nfont-family: inherit;\nfont-size: 100%;\nmargin: 0px;\n}\n\nbutton, input {\noverflow: visible;\n}\n\nbutton, select {\ntext-transform: none;\n}\n\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] {\n-webkit-appearance: button;\n}\n\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner {\nborder-style: none;\npadding: 0px;\n}\n\nbutton:-moz-focusring, [type=\"button\"]:-moz-focusring, [type=\"reset\"]:-moz-focusring, [type=\"submit\"]:-moz-focusring {\noutline: 1px dotted ButtonText;\n}\n\nfieldset {\npadding: 0.35em 0.75em 0.625em;\n}\n\nlegend {\nbox-sizing: border-box;\ncolor: inherit;\ndisplay: table;\nmax-width: 100%;\npadding: 0px;\nwhite-space: normal;\n}\n\nprogress {\nvertical-align: baseline;\n}\n\ntextarea {\noverflow: auto;\n}\n\n[type=\"checkbox\"], [type=\"radio\"] {\nbox-sizing: border-box;\npadding: 0px;\n}\n\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button {\nheight: auto;\n}\n\n[type=\"search\"] {\n-webkit-appearance: textfield;\noutline-offset: -2px;\n}\n\n[type=\"search\"]::-webkit-search-decoration {\n-webkit-appearance: none;\n}\n\n::-webkit-file-upload-button {\n-webkit-appearance: button;\nfont: inherit;\n}\n\ndetails {\ndisplay: block;\n}\n\nsummary {\ndisplay: list-item;\n}\n\ntemplate {\ndisplay: none;\n}\n\n[hidden] {\ndisplay: none;\n}\n\n*[contenteditable] {\nuser-select: text;\n}\n\ncode span {\nwhite-space: pre-wrap;\n}\n\n\n\nmain {\nbackground: orange;\ndisplay: block;\n}\n\n"
      ],
      [
        2,
        [
          "ids",
          "amaui_style_sheet_manager",
          "sheets",
          "add",
          "props",
          "update",
          "remove",
          "addRule"
        ],
        true,
        "\nmain { background: orange none repeat scroll 0% 0%; display: block; }\na { background: transparent none repeat scroll 0% 0%; cursor: pointer; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; text-decoration: none; transition: all 0.4s ease 0s; width: 100px; }\nmeta { width: 100px; }\n[contenteditable] { user-select: text; }\n* { background: transparent none repeat scroll 0% 0%; border: 0px none; box-sizing: border-box; font-size: 100%; margin: 0px; outline: currentcolor none medium; padding: 0px; touch-action: manipulation; }\nbody { background-color: rgb(255, 255, 255); font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif; font-size: 14px; font-style: normal; font-weight: normal; overflow-x: hidden; position: relative; }\nimg, embed, object, video { height: auto; max-width: 100%; }\nform { width: 100%; }\nspan { overflow-wrap: break-word; }\nhr { background: rgb(221, 221, 221) none repeat scroll 0% 0%; box-sizing: content-box; height: 1px; margin: 24px 0px; overflow: visible; width: 100%; }\npre, code, kbd, samp { font-family: Roboto Mono, monospace; }\ncode span { white-space: pre-wrap; }\n:focus { outline: currentcolor none medium; }\nhtml { }\nh1 { font-size: 2em; margin: 0.67em 0px; }\npre { font-family: monospace, monospace; font-size: 1em; }\nabbr[title] { border-bottom: medium none; text-decoration: underline; }\nb, strong { font-weight: bolder; }\ncode, kbd, samp { font-family: monospace, monospace; font-size: 1em; }\nsmall { font-size: 80%; }\nsub, sup { font-size: 75%; position: relative; vertical-align: baseline; }\nsub { bottom: -0.25em; }\nsup { top: -0.5em; }\nimg { border-style: none; }\nbutton, input, optgroup, select, textarea { font-family: inherit; font-size: 100%; margin: 0px; }\nbutton, input { overflow: visible; }\nbutton, select { text-transform: none; }\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] { appearance: button; }\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner { border-style: none; padding: 0px; }\nbutton:focus-visible, [type=\"button\"]:focus-visible, [type=\"reset\"]:focus-visible, [type=\"submit\"]:focus-visible { outline: buttontext dotted 1px; }\nfieldset { padding: 0.35em 0.75em 0.625em; }\nlegend { box-sizing: border-box; color: inherit; display: table; max-width: 100%; padding: 0px; white-space: normal; }\nprogress { vertical-align: baseline; }\ntextarea { overflow: auto; }\n[type=\"checkbox\"], [type=\"radio\"] { box-sizing: border-box; padding: 0px; }\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button { height: auto; }\n[type=\"search\"] { appearance: textfield; outline-offset: -2px; }\n[type=\"search\"]::-webkit-search-decoration { appearance: none; }\n::-webkit-file-upload-button { appearance: button; font: inherit; }\ndetails { display: block; }\nsummary { display: list-item; }\ntemplate { display: none; }\n[hidden] { display: none; }",
        "\n\na {\nbackground: #faa;\nbackground-color: transparent;\ncursor: pointer;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntext-decoration: none;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\nmeta {\nwidth: 100px;\n}\n\n* {\nbackground: transparent;\nborder: 0px;\nbox-sizing: border-box;\nfont-size: 100%;\nmargin: 0px;\noutline: none;\npadding: 0px;\ntouch-action: manipulation;\n}\n\nbody {\nbackground-color: #fff;\nfont-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif;\nfont-size: 14px;\nfont-style: normal;\nfont-weight: normal;\noverflow-x: hidden;\nposition: relative;\n}\n\nimg, embed, object, video {\nheight: auto;\nmax-width: 100%;\n}\n\nform {\nwidth: 100%;\n}\n\nspan {\nword-wrap: break-word;\n}\n\nhr {\nbackground: #ddd;\nbox-sizing: content-box;\nheight: 1px;\nmargin: 24px 0;\noverflow: visible;\nwidth: 100%;\n}\n\npre, code, kbd, samp {\nfont-family: Roboto Mono, monospace;\n}\n\n:focus {\noutline: none;\n}\n\nhtml {\n-webkit-text-size-adjust: 100%;\n}\n\nh1 {\nfont-size: 2em;\nmargin: 0.67em 0;\n}\n\npre {\nfont-family: monospace, monospace;\nfont-size: 1em;\n}\n\nabbr[title] {\nborder-bottom: none;\ntext-decoration: underline dotted;\ntext-decoration: underline;\n}\n\nb, strong {\nfont-weight: bolder;\n}\n\ncode, kbd, samp {\nfont-family: monospace, monospace;\nfont-size: 1em;\n}\n\nsmall {\nfont-size: 80%;\n}\n\nsub, sup {\nfont-size: 75%;\nposition: relative;\nvertical-align: baseline;\n}\n\nsub {\nbottom: -0.25em;\n}\n\nsup {\ntop: -0.5em;\n}\n\nimg {\nborder-style: none;\n}\n\nbutton, input, optgroup, select, textarea {\nfont-family: inherit;\nfont-size: 100%;\nmargin: 0px;\n}\n\nbutton, input {\noverflow: visible;\n}\n\nbutton, select {\ntext-transform: none;\n}\n\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] {\n-webkit-appearance: button;\n}\n\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner {\nborder-style: none;\npadding: 0px;\n}\n\nbutton:-moz-focusring, [type=\"button\"]:-moz-focusring, [type=\"reset\"]:-moz-focusring, [type=\"submit\"]:-moz-focusring {\noutline: 1px dotted ButtonText;\n}\n\nfieldset {\npadding: 0.35em 0.75em 0.625em;\n}\n\nlegend {\nbox-sizing: border-box;\ncolor: inherit;\ndisplay: table;\nmax-width: 100%;\npadding: 0px;\nwhite-space: normal;\n}\n\nprogress {\nvertical-align: baseline;\n}\n\ntextarea {\noverflow: auto;\n}\n\n[type=\"checkbox\"], [type=\"radio\"] {\nbox-sizing: border-box;\npadding: 0px;\n}\n\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button {\nheight: auto;\n}\n\n[type=\"search\"] {\n-webkit-appearance: textfield;\noutline-offset: -2px;\n}\n\n[type=\"search\"]::-webkit-search-decoration {\n-webkit-appearance: none;\n}\n\n::-webkit-file-upload-button {\n-webkit-appearance: button;\nfont: inherit;\n}\n\ndetails {\ndisplay: block;\n}\n\nsummary {\ndisplay: list-item;\n}\n\ntemplate {\ndisplay: none;\n}\n\n[hidden] {\ndisplay: none;\n}\n\n*[contenteditable] {\nuser-select: text;\n}\n\ncode span {\nwhite-space: pre-wrap;\n}\n\n\n\nmain {\nbackground: orange;\ndisplay: block;\n}\n\n"
      ],
      [
        2,
        [
          "ids",
          "amaui_style_sheet_manager",
          "sheets",
          "add",
          "props",
          "update",
          "remove",
          "addRule"
        ],
        true,
        "\nmain { background-color: orange; display: block; }\na { background-color: transparent; cursor: pointer; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; text-decoration: none; transition: all 0.4s ease 0s; width: 100px; }\nmeta { width: 100px; }\n[contenteditable] { }\n* { background-color: transparent; border: 0px; box-sizing: border-box; font-size: 100%; margin: 0px; outline: none; padding: 0px; touch-action: manipulation; }\nbody { background-color: rgb(255, 255, 255); font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif; font-size: 14px; font-style: normal; font-weight: normal; overflow-x: hidden; position: relative; }\nimg, embed, object, video { height: auto; max-width: 100%; }\nform { width: 100%; }\nspan { word-wrap: break-word; }\nhr { background-color: rgb(221, 221, 221); box-sizing: content-box; height: 1px; margin: 24px 0px; overflow: visible; width: 100%; }\npre, code, kbd, samp { font-family: \"Roboto Mono\", monospace; }\ncode span { white-space: pre-wrap; }\n:focus { outline: none; }\nhtml { }\nh1 { font-size: 2em; margin: 0.67em 0px; }\npre { font-family: monospace, monospace; font-size: 1em; }\nabbr[title] { border-bottom-style: none; text-decoration: underline; }\nb, strong { font-weight: bolder; }\ncode, kbd, samp { font-family: monospace, monospace; font-size: 1em; }\nsmall { font-size: 80%; }\nsub, sup { font-size: 75%; position: relative; vertical-align: baseline; }\nsub { bottom: -0.25em; }\nsup { top: -0.5em; }\nimg { border-style: none; }\nbutton, input, optgroup, select, textarea { font-family: inherit; font-size: 100%; margin: 0px; }\nbutton, input { overflow: visible; }\nbutton, select { text-transform: none; }\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] { appearance: button; }\nfieldset { padding: 0.35em 0.75em 0.625em; }\nlegend { box-sizing: border-box; color: inherit; display: table; max-width: 100%; padding: 0px; white-space: normal; }\nprogress { vertical-align: baseline; }\ntextarea { overflow: auto; }\n[type=\"checkbox\"], [type=\"radio\"] { box-sizing: border-box; padding: 0px; }\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button { height: auto; }\n[type=\"search\"] { appearance: textfield; outline-offset: -2px; }\n[type=\"search\"]::-webkit-search-decoration { appearance: none; }\n::-webkit-file-upload-button { appearance: button; font-family: inherit; font-size: inherit; font-style: inherit; font-variant-caps: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; }\ndetails { display: block; }\nsummary { display: list-item; }\ntemplate { display: none; }\n[hidden] { display: none; }",
        "\n\na {\nbackground: #faa;\nbackground-color: transparent;\ncursor: pointer;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntext-decoration: none;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\nmeta {\nwidth: 100px;\n}\n\n* {\nbackground: transparent;\nborder: 0px;\nbox-sizing: border-box;\nfont-size: 100%;\nmargin: 0px;\noutline: none;\npadding: 0px;\ntouch-action: manipulation;\n}\n\nbody {\nbackground-color: #fff;\nfont-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif;\nfont-size: 14px;\nfont-style: normal;\nfont-weight: normal;\noverflow-x: hidden;\nposition: relative;\n}\n\nimg, embed, object, video {\nheight: auto;\nmax-width: 100%;\n}\n\nform {\nwidth: 100%;\n}\n\nspan {\nword-wrap: break-word;\n}\n\nhr {\nbackground: #ddd;\nbox-sizing: content-box;\nheight: 1px;\nmargin: 24px 0;\noverflow: visible;\nwidth: 100%;\n}\n\npre, code, kbd, samp {\nfont-family: Roboto Mono, monospace;\n}\n\n:focus {\noutline: none;\n}\n\nhtml {\n-webkit-text-size-adjust: 100%;\n}\n\nh1 {\nfont-size: 2em;\nmargin: 0.67em 0;\n}\n\npre {\nfont-family: monospace, monospace;\nfont-size: 1em;\n}\n\nabbr[title] {\nborder-bottom: none;\ntext-decoration: underline dotted;\ntext-decoration: underline;\n}\n\nb, strong {\nfont-weight: bolder;\n}\n\ncode, kbd, samp {\nfont-family: monospace, monospace;\nfont-size: 1em;\n}\n\nsmall {\nfont-size: 80%;\n}\n\nsub, sup {\nfont-size: 75%;\nposition: relative;\nvertical-align: baseline;\n}\n\nsub {\nbottom: -0.25em;\n}\n\nsup {\ntop: -0.5em;\n}\n\nimg {\nborder-style: none;\n}\n\nbutton, input, optgroup, select, textarea {\nfont-family: inherit;\nfont-size: 100%;\nmargin: 0px;\n}\n\nbutton, input {\noverflow: visible;\n}\n\nbutton, select {\ntext-transform: none;\n}\n\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] {\n-webkit-appearance: button;\n}\n\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner {\nborder-style: none;\npadding: 0px;\n}\n\nbutton:-moz-focusring, [type=\"button\"]:-moz-focusring, [type=\"reset\"]:-moz-focusring, [type=\"submit\"]:-moz-focusring {\noutline: 1px dotted ButtonText;\n}\n\nfieldset {\npadding: 0.35em 0.75em 0.625em;\n}\n\nlegend {\nbox-sizing: border-box;\ncolor: inherit;\ndisplay: table;\nmax-width: 100%;\npadding: 0px;\nwhite-space: normal;\n}\n\nprogress {\nvertical-align: baseline;\n}\n\ntextarea {\noverflow: auto;\n}\n\n[type=\"checkbox\"], [type=\"radio\"] {\nbox-sizing: border-box;\npadding: 0px;\n}\n\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button {\nheight: auto;\n}\n\n[type=\"search\"] {\n-webkit-appearance: textfield;\noutline-offset: -2px;\n}\n\n[type=\"search\"]::-webkit-search-decoration {\n-webkit-appearance: none;\n}\n\n::-webkit-file-upload-button {\n-webkit-appearance: button;\nfont: inherit;\n}\n\ndetails {\ndisplay: block;\n}\n\nsummary {\ndisplay: list-item;\n}\n\ntemplate {\ndisplay: none;\n}\n\n[hidden] {\ndisplay: none;\n}\n\n*[contenteditable] {\nuser-select: text;\n}\n\ncode span {\nwhite-space: pre-wrap;\n}\n\n\n\nmain {\nbackground: orange;\ndisplay: block;\n}\n\n"
      ]
    ]);

    const amauiStyle = new AmauiStyle.AmauiStyle();

    // Plugins
    amauiStyle.plugins.add = [
      AmauiStyle.unit,
      AmauiStyle.sort,
      AmauiStyle.prefix,
      AmauiStyle.makeClassName,
      AmauiStyle.rtl,
    ];

    const a: TValue = {
      a: {
        // unit
        width: 100,

        'max-width': 100,

        // Simple
        background: '#faa',

        margin: '0 14px 4px 40px',

        // rtl
        marginLeft: 41,
        float: 'left',

        // sort
        paddingLeft: 41,
        padding: 40,

        // prefixes
        position: 'sticky',
        transition: 'all .4s ease',
        maskOrigin: 'inherit',
        maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
        maskPosition: '40% 74%',

        // animation
        animation: '$a .4s ease',
      },

      meta: {
        width: 100
      },

      main: {
        // Function
        background: props => props.a === 1 ? 'yellow' : 'orange',
      },
    };

    const reset = AmauiStyle.reset(a, { amaui_style: { value: amauiStyle } });

    // Add
    reset.add();

    const value = [
      Object.keys(reset),
      reset.amaui_style_sheet_manager.status === 'inited',
      amauiStyle.css,
    ];

    assert(value).eql([
      [
        "ids",
        "amaui_style_sheet_manager",
        "sheets",
        "add",
        "props",
        "update",
        "remove",
        "addRule"
      ],
      true,
      "\n\na {\nbackground: #faa;\nbackground-color: transparent;\ncursor: pointer;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntext-decoration: none;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\nmeta {\nwidth: 100px;\n}\n\n* {\nbackground: transparent;\nborder: 0px;\nbox-sizing: border-box;\nfont-size: 100%;\nmargin: 0px;\noutline: none;\npadding: 0px;\ntouch-action: manipulation;\n}\n\nbody {\nbackground-color: #fff;\nfont-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif;\nfont-size: 14px;\nfont-style: normal;\nfont-weight: normal;\noverflow-x: hidden;\nposition: relative;\n}\n\nimg, embed, object, video {\nheight: auto;\nmax-width: 100%;\n}\n\nform {\nwidth: 100%;\n}\n\nspan {\nword-wrap: break-word;\n}\n\nhr {\nbackground: #ddd;\nbox-sizing: content-box;\nheight: 1px;\nmargin: 24px 0;\noverflow: visible;\nwidth: 100%;\n}\n\npre, code, kbd, samp {\nfont-family: Roboto Mono, monospace;\n}\n\n:focus {\noutline: none;\n}\n\nhtml {\n-webkit-text-size-adjust: 100%;\n}\n\nh1 {\nfont-size: 2em;\nmargin: 0.67em 0;\n}\n\npre {\nfont-family: monospace, monospace;\nfont-size: 1em;\n}\n\nabbr[title] {\nborder-bottom: none;\ntext-decoration: underline dotted;\ntext-decoration: underline;\n}\n\nb, strong {\nfont-weight: bolder;\n}\n\ncode, kbd, samp {\nfont-family: monospace, monospace;\nfont-size: 1em;\n}\n\nsmall {\nfont-size: 80%;\n}\n\nsub, sup {\nfont-size: 75%;\nposition: relative;\nvertical-align: baseline;\n}\n\nsub {\nbottom: -0.25em;\n}\n\nsup {\ntop: -0.5em;\n}\n\nimg {\nborder-style: none;\n}\n\nbutton, input, optgroup, select, textarea {\nfont-family: inherit;\nfont-size: 100%;\nmargin: 0px;\n}\n\nbutton, input {\noverflow: visible;\n}\n\nbutton, select {\ntext-transform: none;\n}\n\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] {\n-webkit-appearance: button;\n}\n\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner {\nborder-style: none;\npadding: 0px;\n}\n\nbutton:-moz-focusring, [type=\"button\"]:-moz-focusring, [type=\"reset\"]:-moz-focusring, [type=\"submit\"]:-moz-focusring {\noutline: 1px dotted ButtonText;\n}\n\nfieldset {\npadding: 0.35em 0.75em 0.625em;\n}\n\nlegend {\nbox-sizing: border-box;\ncolor: inherit;\ndisplay: table;\nmax-width: 100%;\npadding: 0px;\nwhite-space: normal;\n}\n\nprogress {\nvertical-align: baseline;\n}\n\ntextarea {\noverflow: auto;\n}\n\n[type=\"checkbox\"], [type=\"radio\"] {\nbox-sizing: border-box;\npadding: 0px;\n}\n\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button {\nheight: auto;\n}\n\n[type=\"search\"] {\n-webkit-appearance: textfield;\noutline-offset: -2px;\n}\n\n[type=\"search\"]::-webkit-search-decoration {\n-webkit-appearance: none;\n}\n\n::-webkit-file-upload-button {\n-webkit-appearance: button;\nfont: inherit;\n}\n\ndetails {\ndisplay: block;\n}\n\nsummary {\ndisplay: list-item;\n}\n\ntemplate {\ndisplay: none;\n}\n\n[hidden] {\ndisplay: none;\n}\n\n*[contenteditable] {\nuser-select: text;\n}\n\ncode span {\nwhite-space: pre-wrap;\n}\n\n\n\nmain {\nbackground: orange;\ndisplay: block;\n}\n\n"
    ]);
  });

  group('options', () => {

    group('override', () => {

      to('true', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const amauiStyle = new window.AmauiStyle.AmauiStyle(window.document.body);

          // Plugins
          amauiStyle.plugins.add = [
            window.AmauiStyle.unit,
            window.AmauiStyle.sort,
            window.AmauiStyle.prefix,
            window.AmauiStyle.makeClassName,
            window.AmauiStyle.rtl,
          ];

          const a = {
            a: {
              // unit
              width: 100,

              'max-width': 100,

              // Simple
              background: '#faa',

              margin: '0 14px 4px 40px',

              // rtl
              marginLeft: 41,
              float: 'left',

              // sort
              paddingLeft: 41,
              padding: 40,

              // prefixes
              position: 'sticky',
              transition: 'all .4s ease',
              maskOrigin: 'inherit',
              maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
              maskPosition: '40% 74%',

              // animation
              animation: '$a .4s ease',
            },

            meta: {
              width: 100
            },

            main: {
              // Function
              background: props => props.a === 1 ? 'yellow' : 'orange',
            },
          };

          const reset = window.AmauiStyle.reset(a, { override: true, amaui_style: { value: amauiStyle } });

          // Add
          reset.add();

          let valueCSS = ``;

          Array.from(document.styleSheets).forEach(styleSheet => {
            Array.from(styleSheet.cssRules).forEach(cssRule => valueCSS += `\n${cssRule.cssText}`);
          });

          return [
            window.document.styleSheets.length,
            Object.keys(reset),
            reset.amaui_style_sheet_manager.status === 'active',
            valueCSS,
            amauiStyle.css,
          ];
        }, { browsers });

        const values = [...valueBrowsers];

        assert(values).eql([
          [
            4,
            [
              "ids",
              "amaui_style_sheet_manager",
              "sheets",
              "add",
              "props",
              "update",
              "remove",
              "addRule"
            ],
            true,
            "\nmain { background: orange; }\n[contenteditable] { user-select: text; }\n* { background: transparent; border: 0px; box-sizing: border-box; font-size: 100%; margin: 0px; outline: none; padding: 0px; touch-action: manipulation; }\nbody { background-color: rgb(255, 255, 255); font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif; font-size: 14px; font-style: normal; font-weight: normal; overflow-x: hidden; position: relative; }\nimg, embed, object, video { height: auto; max-width: 100%; }\na { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }\nform { width: 100%; }\nspan { overflow-wrap: break-word; }\nhr { background: rgb(221, 221, 221); box-sizing: content-box; height: 1px; margin: 24px 0px; overflow: visible; width: 100%; }\npre, code, kbd, samp { font-family: \"Roboto Mono\", monospace; }\ncode span { white-space: pre-wrap; }\n:focus { outline: none; }\nhtml { text-size-adjust: 100%; }\nh1 { font-size: 2em; margin: 0.67em 0px; }\npre { font-family: monospace, monospace; font-size: 1em; }\nabbr[title] { border-bottom: none; text-decoration: underline; }\nb, strong { font-weight: bolder; }\ncode, kbd, samp { font-family: monospace, monospace; font-size: 1em; }\nsmall { font-size: 80%; }\nsub, sup { font-size: 75%; position: relative; vertical-align: baseline; }\nsub { bottom: -0.25em; }\nsup { top: -0.5em; }\nimg { border-style: none; }\nbutton, input, optgroup, select, textarea { font-family: inherit; font-size: 100%; margin: 0px; }\nbutton, input { overflow: visible; }\nbutton, select { text-transform: none; }\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] { appearance: button; }\nfieldset { padding: 0.35em 0.75em 0.625em; }\nlegend { box-sizing: border-box; color: inherit; display: table; max-width: 100%; padding: 0px; white-space: normal; }\nprogress { vertical-align: baseline; }\ntextarea { overflow: auto; }\n[type=\"checkbox\"], [type=\"radio\"] { box-sizing: border-box; padding: 0px; }\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button { height: auto; }\n[type=\"search\"] { appearance: textfield; outline-offset: -2px; }\n[type=\"search\"]::-webkit-search-decoration { appearance: none; }\n::-webkit-file-upload-button { appearance: button; font: inherit; }\ndetails { display: block; }\nsummary { display: list-item; }\ntemplate { display: none; }\n[hidden] { display: none; }\nmeta { width: 100px; }\nmain { background: orange; display: block; }\na { background: transparent; cursor: pointer; float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; text-decoration: none; transition: all 0.4s ease 0s; width: 100px; }\nmeta { width: 100px; }\n[contenteditable] { user-select: text; }\n* { background: transparent; border: 0px; box-sizing: border-box; font-size: 100%; margin: 0px; outline: none; padding: 0px; touch-action: manipulation; }\nbody { background-color: rgb(255, 255, 255); font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif; font-size: 14px; font-style: normal; font-weight: normal; overflow-x: hidden; position: relative; }\nimg, embed, object, video { height: auto; max-width: 100%; }\nform { width: 100%; }\nspan { overflow-wrap: break-word; }\nhr { background: rgb(221, 221, 221); box-sizing: content-box; height: 1px; margin: 24px 0px; overflow: visible; width: 100%; }\npre, code, kbd, samp { font-family: \"Roboto Mono\", monospace; }\ncode span { white-space: pre-wrap; }\n:focus { outline: none; }\nhtml { text-size-adjust: 100%; }\nh1 { font-size: 2em; margin: 0.67em 0px; }\npre { font-family: monospace, monospace; font-size: 1em; }\nabbr[title] { border-bottom: none; text-decoration: underline; }\nb, strong { font-weight: bolder; }\ncode, kbd, samp { font-family: monospace, monospace; font-size: 1em; }\nsmall { font-size: 80%; }\nsub, sup { font-size: 75%; position: relative; vertical-align: baseline; }\nsub { bottom: -0.25em; }\nsup { top: -0.5em; }\nimg { border-style: none; }\nbutton, input, optgroup, select, textarea { font-family: inherit; font-size: 100%; margin: 0px; }\nbutton, input { overflow: visible; }\nbutton, select { text-transform: none; }\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] { appearance: button; }\nfieldset { padding: 0.35em 0.75em 0.625em; }\nlegend { box-sizing: border-box; color: inherit; display: table; max-width: 100%; padding: 0px; white-space: normal; }\nprogress { vertical-align: baseline; }\ntextarea { overflow: auto; }\n[type=\"checkbox\"], [type=\"radio\"] { box-sizing: border-box; padding: 0px; }\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button { height: auto; }\n[type=\"search\"] { appearance: textfield; outline-offset: -2px; }\n[type=\"search\"]::-webkit-search-decoration { appearance: none; }\n::-webkit-file-upload-button { appearance: button; font: inherit; }\ndetails { display: block; }\nsummary { display: list-item; }\ntemplate { display: none; }\n[hidden] { display: none; }",
            "\n\n* {\nbackground: transparent;\nborder: 0px;\nbox-sizing: border-box;\nfont-size: 100%;\nmargin: 0px;\noutline: none;\npadding: 0px;\ntouch-action: manipulation;\n}\n\nbody {\nbackground-color: #fff;\nfont-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif;\nfont-size: 14px;\nfont-style: normal;\nfont-weight: normal;\noverflow-x: hidden;\nposition: relative;\n}\n\nimg, embed, object, video {\nheight: auto;\nmax-width: 100%;\n}\n\na {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\nform {\nwidth: 100%;\n}\n\nspan {\nword-wrap: break-word;\n}\n\nhr {\nbackground: #ddd;\nbox-sizing: content-box;\nheight: 1px;\nmargin: 24px 0;\noverflow: visible;\nwidth: 100%;\n}\n\npre, code, kbd, samp {\nfont-family: Roboto Mono, monospace;\n}\n\n:focus {\noutline: none;\n}\n\nhtml {\n-webkit-text-size-adjust: 100%;\n}\n\nh1 {\nfont-size: 2em;\nmargin: 0.67em 0;\n}\n\npre {\nfont-family: monospace, monospace;\nfont-size: 1em;\n}\n\nabbr[title] {\nborder-bottom: none;\ntext-decoration: underline dotted;\ntext-decoration: underline;\n}\n\nb, strong {\nfont-weight: bolder;\n}\n\ncode, kbd, samp {\nfont-family: monospace, monospace;\nfont-size: 1em;\n}\n\nsmall {\nfont-size: 80%;\n}\n\nsub, sup {\nfont-size: 75%;\nposition: relative;\nvertical-align: baseline;\n}\n\nsub {\nbottom: -0.25em;\n}\n\nsup {\ntop: -0.5em;\n}\n\nimg {\nborder-style: none;\n}\n\nbutton, input, optgroup, select, textarea {\nfont-family: inherit;\nfont-size: 100%;\nmargin: 0px;\n}\n\nbutton, input {\noverflow: visible;\n}\n\nbutton, select {\ntext-transform: none;\n}\n\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] {\n-webkit-appearance: button;\n}\n\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner {\nborder-style: none;\npadding: 0px;\n}\n\nbutton:-moz-focusring, [type=\"button\"]:-moz-focusring, [type=\"reset\"]:-moz-focusring, [type=\"submit\"]:-moz-focusring {\noutline: 1px dotted ButtonText;\n}\n\nfieldset {\npadding: 0.35em 0.75em 0.625em;\n}\n\nlegend {\nbox-sizing: border-box;\ncolor: inherit;\ndisplay: table;\nmax-width: 100%;\npadding: 0px;\nwhite-space: normal;\n}\n\nprogress {\nvertical-align: baseline;\n}\n\ntextarea {\noverflow: auto;\n}\n\n[type=\"checkbox\"], [type=\"radio\"] {\nbox-sizing: border-box;\npadding: 0px;\n}\n\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button {\nheight: auto;\n}\n\n[type=\"search\"] {\n-webkit-appearance: textfield;\noutline-offset: -2px;\n}\n\n[type=\"search\"]::-webkit-search-decoration {\n-webkit-appearance: none;\n}\n\n::-webkit-file-upload-button {\n-webkit-appearance: button;\nfont: inherit;\n}\n\ndetails {\ndisplay: block;\n}\n\nsummary {\ndisplay: list-item;\n}\n\ntemplate {\ndisplay: none;\n}\n\n[hidden] {\ndisplay: none;\n}\n\nmeta {\nwidth: 100px;\n}\n\n*[contenteditable] {\nuser-select: text;\n}\n\ncode span {\nwhite-space: pre-wrap;\n}\n\n\n\nmain {\nbackground: orange;\n}\n\n"
          ],
          [
            4,
            [
              "ids",
              "amaui_style_sheet_manager",
              "sheets",
              "add",
              "props",
              "update",
              "remove",
              "addRule"
            ],
            true,
            "\nmain { background: orange none repeat scroll 0% 0%; }\n[contenteditable] { user-select: text; }\n* { background: transparent none repeat scroll 0% 0%; border: 0px none; box-sizing: border-box; font-size: 100%; margin: 0px; outline: currentcolor none medium; padding: 0px; touch-action: manipulation; }\nbody { background-color: rgb(255, 255, 255); font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif; font-size: 14px; font-style: normal; font-weight: normal; overflow-x: hidden; position: relative; }\nimg, embed, object, video { height: auto; max-width: 100%; }\na { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }\nform { width: 100%; }\nspan { overflow-wrap: break-word; }\nhr { background: rgb(221, 221, 221) none repeat scroll 0% 0%; box-sizing: content-box; height: 1px; margin: 24px 0px; overflow: visible; width: 100%; }\npre, code, kbd, samp { font-family: Roboto Mono, monospace; }\ncode span { white-space: pre-wrap; }\n:focus { outline: currentcolor none medium; }\nhtml { }\nh1 { font-size: 2em; margin: 0.67em 0px; }\npre { font-family: monospace, monospace; font-size: 1em; }\nabbr[title] { border-bottom: medium none; text-decoration: underline; }\nb, strong { font-weight: bolder; }\ncode, kbd, samp { font-family: monospace, monospace; font-size: 1em; }\nsmall { font-size: 80%; }\nsub, sup { font-size: 75%; position: relative; vertical-align: baseline; }\nsub { bottom: -0.25em; }\nsup { top: -0.5em; }\nimg { border-style: none; }\nbutton, input, optgroup, select, textarea { font-family: inherit; font-size: 100%; margin: 0px; }\nbutton, input { overflow: visible; }\nbutton, select { text-transform: none; }\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] { appearance: button; }\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner { border-style: none; padding: 0px; }\nbutton:focus-visible, [type=\"button\"]:focus-visible, [type=\"reset\"]:focus-visible, [type=\"submit\"]:focus-visible { outline: buttontext dotted 1px; }\nfieldset { padding: 0.35em 0.75em 0.625em; }\nlegend { box-sizing: border-box; color: inherit; display: table; max-width: 100%; padding: 0px; white-space: normal; }\nprogress { vertical-align: baseline; }\ntextarea { overflow: auto; }\n[type=\"checkbox\"], [type=\"radio\"] { box-sizing: border-box; padding: 0px; }\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button { height: auto; }\n[type=\"search\"] { appearance: textfield; outline-offset: -2px; }\n[type=\"search\"]::-webkit-search-decoration { appearance: none; }\n::-webkit-file-upload-button { appearance: button; font: inherit; }\ndetails { display: block; }\nsummary { display: list-item; }\ntemplate { display: none; }\n[hidden] { display: none; }\nmeta { width: 100px; }\nmain { background: orange none repeat scroll 0% 0%; display: block; }\na { background: transparent none repeat scroll 0% 0%; cursor: pointer; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; text-decoration: none; transition: all 0.4s ease 0s; width: 100px; }\nmeta { width: 100px; }\n[contenteditable] { user-select: text; }\n* { background: transparent none repeat scroll 0% 0%; border: 0px none; box-sizing: border-box; font-size: 100%; margin: 0px; outline: currentcolor none medium; padding: 0px; touch-action: manipulation; }\nbody { background-color: rgb(255, 255, 255); font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif; font-size: 14px; font-style: normal; font-weight: normal; overflow-x: hidden; position: relative; }\nimg, embed, object, video { height: auto; max-width: 100%; }\nform { width: 100%; }\nspan { overflow-wrap: break-word; }\nhr { background: rgb(221, 221, 221) none repeat scroll 0% 0%; box-sizing: content-box; height: 1px; margin: 24px 0px; overflow: visible; width: 100%; }\npre, code, kbd, samp { font-family: Roboto Mono, monospace; }\ncode span { white-space: pre-wrap; }\n:focus { outline: currentcolor none medium; }\nhtml { }\nh1 { font-size: 2em; margin: 0.67em 0px; }\npre { font-family: monospace, monospace; font-size: 1em; }\nabbr[title] { border-bottom: medium none; text-decoration: underline; }\nb, strong { font-weight: bolder; }\ncode, kbd, samp { font-family: monospace, monospace; font-size: 1em; }\nsmall { font-size: 80%; }\nsub, sup { font-size: 75%; position: relative; vertical-align: baseline; }\nsub { bottom: -0.25em; }\nsup { top: -0.5em; }\nimg { border-style: none; }\nbutton, input, optgroup, select, textarea { font-family: inherit; font-size: 100%; margin: 0px; }\nbutton, input { overflow: visible; }\nbutton, select { text-transform: none; }\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] { appearance: button; }\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner { border-style: none; padding: 0px; }\nbutton:focus-visible, [type=\"button\"]:focus-visible, [type=\"reset\"]:focus-visible, [type=\"submit\"]:focus-visible { outline: buttontext dotted 1px; }\nfieldset { padding: 0.35em 0.75em 0.625em; }\nlegend { box-sizing: border-box; color: inherit; display: table; max-width: 100%; padding: 0px; white-space: normal; }\nprogress { vertical-align: baseline; }\ntextarea { overflow: auto; }\n[type=\"checkbox\"], [type=\"radio\"] { box-sizing: border-box; padding: 0px; }\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button { height: auto; }\n[type=\"search\"] { appearance: textfield; outline-offset: -2px; }\n[type=\"search\"]::-webkit-search-decoration { appearance: none; }\n::-webkit-file-upload-button { appearance: button; font: inherit; }\ndetails { display: block; }\nsummary { display: list-item; }\ntemplate { display: none; }\n[hidden] { display: none; }",
            "\n\n* {\nbackground: transparent;\nborder: 0px;\nbox-sizing: border-box;\nfont-size: 100%;\nmargin: 0px;\noutline: none;\npadding: 0px;\ntouch-action: manipulation;\n}\n\nbody {\nbackground-color: #fff;\nfont-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif;\nfont-size: 14px;\nfont-style: normal;\nfont-weight: normal;\noverflow-x: hidden;\nposition: relative;\n}\n\nimg, embed, object, video {\nheight: auto;\nmax-width: 100%;\n}\n\na {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\nform {\nwidth: 100%;\n}\n\nspan {\nword-wrap: break-word;\n}\n\nhr {\nbackground: #ddd;\nbox-sizing: content-box;\nheight: 1px;\nmargin: 24px 0;\noverflow: visible;\nwidth: 100%;\n}\n\npre, code, kbd, samp {\nfont-family: Roboto Mono, monospace;\n}\n\n:focus {\noutline: none;\n}\n\nhtml {\n-webkit-text-size-adjust: 100%;\n}\n\nh1 {\nfont-size: 2em;\nmargin: 0.67em 0;\n}\n\npre {\nfont-family: monospace, monospace;\nfont-size: 1em;\n}\n\nabbr[title] {\nborder-bottom: none;\ntext-decoration: underline dotted;\ntext-decoration: underline;\n}\n\nb, strong {\nfont-weight: bolder;\n}\n\ncode, kbd, samp {\nfont-family: monospace, monospace;\nfont-size: 1em;\n}\n\nsmall {\nfont-size: 80%;\n}\n\nsub, sup {\nfont-size: 75%;\nposition: relative;\nvertical-align: baseline;\n}\n\nsub {\nbottom: -0.25em;\n}\n\nsup {\ntop: -0.5em;\n}\n\nimg {\nborder-style: none;\n}\n\nbutton, input, optgroup, select, textarea {\nfont-family: inherit;\nfont-size: 100%;\nmargin: 0px;\n}\n\nbutton, input {\noverflow: visible;\n}\n\nbutton, select {\ntext-transform: none;\n}\n\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] {\n-webkit-appearance: button;\n}\n\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner {\nborder-style: none;\npadding: 0px;\n}\n\nbutton:-moz-focusring, [type=\"button\"]:-moz-focusring, [type=\"reset\"]:-moz-focusring, [type=\"submit\"]:-moz-focusring {\noutline: 1px dotted ButtonText;\n}\n\nfieldset {\npadding: 0.35em 0.75em 0.625em;\n}\n\nlegend {\nbox-sizing: border-box;\ncolor: inherit;\ndisplay: table;\nmax-width: 100%;\npadding: 0px;\nwhite-space: normal;\n}\n\nprogress {\nvertical-align: baseline;\n}\n\ntextarea {\noverflow: auto;\n}\n\n[type=\"checkbox\"], [type=\"radio\"] {\nbox-sizing: border-box;\npadding: 0px;\n}\n\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button {\nheight: auto;\n}\n\n[type=\"search\"] {\n-webkit-appearance: textfield;\noutline-offset: -2px;\n}\n\n[type=\"search\"]::-webkit-search-decoration {\n-webkit-appearance: none;\n}\n\n::-webkit-file-upload-button {\n-webkit-appearance: button;\nfont: inherit;\n}\n\ndetails {\ndisplay: block;\n}\n\nsummary {\ndisplay: list-item;\n}\n\ntemplate {\ndisplay: none;\n}\n\n[hidden] {\ndisplay: none;\n}\n\nmeta {\nwidth: 100px;\n}\n\n*[contenteditable] {\nuser-select: text;\n}\n\ncode span {\nwhite-space: pre-wrap;\n}\n\n\n\nmain {\nbackground: orange;\n}\n\n"
          ],
          [
            4,
            [
              "ids",
              "amaui_style_sheet_manager",
              "sheets",
              "add",
              "props",
              "update",
              "remove",
              "addRule"
            ],
            true,
            "\nmain { background-color: orange; }\n[contenteditable] { }\n* { background-color: transparent; border: 0px; box-sizing: border-box; font-size: 100%; margin: 0px; outline: none; padding: 0px; touch-action: manipulation; }\nbody { background-color: rgb(255, 255, 255); font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif; font-size: 14px; font-style: normal; font-weight: normal; overflow-x: hidden; position: relative; }\nimg, embed, object, video { height: auto; max-width: 100%; }\na { background-color: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }\nform { width: 100%; }\nspan { word-wrap: break-word; }\nhr { background-color: rgb(221, 221, 221); box-sizing: content-box; height: 1px; margin: 24px 0px; overflow: visible; width: 100%; }\npre, code, kbd, samp { font-family: \"Roboto Mono\", monospace; }\ncode span { white-space: pre-wrap; }\n:focus { outline: none; }\nhtml { }\nh1 { font-size: 2em; margin: 0.67em 0px; }\npre { font-family: monospace, monospace; font-size: 1em; }\nabbr[title] { border-bottom-style: none; text-decoration: underline; }\nb, strong { font-weight: bolder; }\ncode, kbd, samp { font-family: monospace, monospace; font-size: 1em; }\nsmall { font-size: 80%; }\nsub, sup { font-size: 75%; position: relative; vertical-align: baseline; }\nsub { bottom: -0.25em; }\nsup { top: -0.5em; }\nimg { border-style: none; }\nbutton, input, optgroup, select, textarea { font-family: inherit; font-size: 100%; margin: 0px; }\nbutton, input { overflow: visible; }\nbutton, select { text-transform: none; }\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] { appearance: button; }\nfieldset { padding: 0.35em 0.75em 0.625em; }\nlegend { box-sizing: border-box; color: inherit; display: table; max-width: 100%; padding: 0px; white-space: normal; }\nprogress { vertical-align: baseline; }\ntextarea { overflow: auto; }\n[type=\"checkbox\"], [type=\"radio\"] { box-sizing: border-box; padding: 0px; }\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button { height: auto; }\n[type=\"search\"] { appearance: textfield; outline-offset: -2px; }\n[type=\"search\"]::-webkit-search-decoration { appearance: none; }\n::-webkit-file-upload-button { appearance: button; font-family: inherit; font-size: inherit; font-style: inherit; font-variant-caps: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; }\ndetails { display: block; }\nsummary { display: list-item; }\ntemplate { display: none; }\n[hidden] { display: none; }\nmeta { width: 100px; }\nmain { background-color: orange; display: block; }\na { background-color: transparent; cursor: pointer; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; text-decoration: none; transition: all 0.4s ease 0s; width: 100px; }\nmeta { width: 100px; }\n[contenteditable] { }\n* { background-color: transparent; border: 0px; box-sizing: border-box; font-size: 100%; margin: 0px; outline: none; padding: 0px; touch-action: manipulation; }\nbody { background-color: rgb(255, 255, 255); font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif; font-size: 14px; font-style: normal; font-weight: normal; overflow-x: hidden; position: relative; }\nimg, embed, object, video { height: auto; max-width: 100%; }\nform { width: 100%; }\nspan { word-wrap: break-word; }\nhr { background-color: rgb(221, 221, 221); box-sizing: content-box; height: 1px; margin: 24px 0px; overflow: visible; width: 100%; }\npre, code, kbd, samp { font-family: \"Roboto Mono\", monospace; }\ncode span { white-space: pre-wrap; }\n:focus { outline: none; }\nhtml { }\nh1 { font-size: 2em; margin: 0.67em 0px; }\npre { font-family: monospace, monospace; font-size: 1em; }\nabbr[title] { border-bottom-style: none; text-decoration: underline; }\nb, strong { font-weight: bolder; }\ncode, kbd, samp { font-family: monospace, monospace; font-size: 1em; }\nsmall { font-size: 80%; }\nsub, sup { font-size: 75%; position: relative; vertical-align: baseline; }\nsub { bottom: -0.25em; }\nsup { top: -0.5em; }\nimg { border-style: none; }\nbutton, input, optgroup, select, textarea { font-family: inherit; font-size: 100%; margin: 0px; }\nbutton, input { overflow: visible; }\nbutton, select { text-transform: none; }\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] { appearance: button; }\nfieldset { padding: 0.35em 0.75em 0.625em; }\nlegend { box-sizing: border-box; color: inherit; display: table; max-width: 100%; padding: 0px; white-space: normal; }\nprogress { vertical-align: baseline; }\ntextarea { overflow: auto; }\n[type=\"checkbox\"], [type=\"radio\"] { box-sizing: border-box; padding: 0px; }\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button { height: auto; }\n[type=\"search\"] { appearance: textfield; outline-offset: -2px; }\n[type=\"search\"]::-webkit-search-decoration { appearance: none; }\n::-webkit-file-upload-button { appearance: button; font-family: inherit; font-size: inherit; font-style: inherit; font-variant-caps: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; }\ndetails { display: block; }\nsummary { display: list-item; }\ntemplate { display: none; }\n[hidden] { display: none; }",
            "\n\n* {\nbackground: transparent;\nborder: 0px;\nbox-sizing: border-box;\nfont-size: 100%;\nmargin: 0px;\noutline: none;\npadding: 0px;\ntouch-action: manipulation;\n}\n\nbody {\nbackground-color: #fff;\nfont-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif;\nfont-size: 14px;\nfont-style: normal;\nfont-weight: normal;\noverflow-x: hidden;\nposition: relative;\n}\n\nimg, embed, object, video {\nheight: auto;\nmax-width: 100%;\n}\n\na {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\nform {\nwidth: 100%;\n}\n\nspan {\nword-wrap: break-word;\n}\n\nhr {\nbackground: #ddd;\nbox-sizing: content-box;\nheight: 1px;\nmargin: 24px 0;\noverflow: visible;\nwidth: 100%;\n}\n\npre, code, kbd, samp {\nfont-family: Roboto Mono, monospace;\n}\n\n:focus {\noutline: none;\n}\n\nhtml {\n-webkit-text-size-adjust: 100%;\n}\n\nh1 {\nfont-size: 2em;\nmargin: 0.67em 0;\n}\n\npre {\nfont-family: monospace, monospace;\nfont-size: 1em;\n}\n\nabbr[title] {\nborder-bottom: none;\ntext-decoration: underline dotted;\ntext-decoration: underline;\n}\n\nb, strong {\nfont-weight: bolder;\n}\n\ncode, kbd, samp {\nfont-family: monospace, monospace;\nfont-size: 1em;\n}\n\nsmall {\nfont-size: 80%;\n}\n\nsub, sup {\nfont-size: 75%;\nposition: relative;\nvertical-align: baseline;\n}\n\nsub {\nbottom: -0.25em;\n}\n\nsup {\ntop: -0.5em;\n}\n\nimg {\nborder-style: none;\n}\n\nbutton, input, optgroup, select, textarea {\nfont-family: inherit;\nfont-size: 100%;\nmargin: 0px;\n}\n\nbutton, input {\noverflow: visible;\n}\n\nbutton, select {\ntext-transform: none;\n}\n\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] {\n-webkit-appearance: button;\n}\n\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner {\nborder-style: none;\npadding: 0px;\n}\n\nbutton:-moz-focusring, [type=\"button\"]:-moz-focusring, [type=\"reset\"]:-moz-focusring, [type=\"submit\"]:-moz-focusring {\noutline: 1px dotted ButtonText;\n}\n\nfieldset {\npadding: 0.35em 0.75em 0.625em;\n}\n\nlegend {\nbox-sizing: border-box;\ncolor: inherit;\ndisplay: table;\nmax-width: 100%;\npadding: 0px;\nwhite-space: normal;\n}\n\nprogress {\nvertical-align: baseline;\n}\n\ntextarea {\noverflow: auto;\n}\n\n[type=\"checkbox\"], [type=\"radio\"] {\nbox-sizing: border-box;\npadding: 0px;\n}\n\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button {\nheight: auto;\n}\n\n[type=\"search\"] {\n-webkit-appearance: textfield;\noutline-offset: -2px;\n}\n\n[type=\"search\"]::-webkit-search-decoration {\n-webkit-appearance: none;\n}\n\n::-webkit-file-upload-button {\n-webkit-appearance: button;\nfont: inherit;\n}\n\ndetails {\ndisplay: block;\n}\n\nsummary {\ndisplay: list-item;\n}\n\ntemplate {\ndisplay: none;\n}\n\n[hidden] {\ndisplay: none;\n}\n\nmeta {\nwidth: 100px;\n}\n\n*[contenteditable] {\nuser-select: text;\n}\n\ncode span {\nwhite-space: pre-wrap;\n}\n\n\n\nmain {\nbackground: orange;\n}\n\n"
          ]
        ]);

        const amauiStyle = new AmauiStyle.AmauiStyle();

        // Plugins
        amauiStyle.plugins.add = [
          AmauiStyle.unit,
          AmauiStyle.sort,
          AmauiStyle.prefix,
          AmauiStyle.makeClassName,
          AmauiStyle.rtl,
        ];

        const a: TValue = {
          a: {
            // unit
            width: 100,

            'max-width': 100,

            // Simple
            background: '#faa',

            margin: '0 14px 4px 40px',

            // rtl
            marginLeft: 41,
            float: 'left',

            // sort
            paddingLeft: 41,
            padding: 40,

            // prefixes
            position: 'sticky',
            transition: 'all .4s ease',
            maskOrigin: 'inherit',
            maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
            maskPosition: '40% 74%',

            // animation
            animation: '$a .4s ease',
          },

          meta: {
            width: 100
          },

          main: {
            // Function
            background: props => props.a === 1 ? 'yellow' : 'orange',
          },
        };

        const reset = AmauiStyle.reset(a, { override: true, amaui_style: { value: amauiStyle } });

        // Add
        reset.add();

        const value = [
          Object.keys(reset),
          reset.amaui_style_sheet_manager.status === 'inited',
          amauiStyle.css,
        ];

        assert(value).eql([
          [
            "ids",
            "amaui_style_sheet_manager",
            "sheets",
            "add",
            "props",
            "update",
            "remove",
            "addRule"
          ],
          true,
          "\n\n* {\nbackground: transparent;\nborder: 0px;\nbox-sizing: border-box;\nfont-size: 100%;\nmargin: 0px;\noutline: none;\npadding: 0px;\ntouch-action: manipulation;\n}\n\nbody {\nbackground-color: #fff;\nfont-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif;\nfont-size: 14px;\nfont-style: normal;\nfont-weight: normal;\noverflow-x: hidden;\nposition: relative;\n}\n\nimg, embed, object, video {\nheight: auto;\nmax-width: 100%;\n}\n\na {\nbackground: #faa;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\nform {\nwidth: 100%;\n}\n\nspan {\nword-wrap: break-word;\n}\n\nhr {\nbackground: #ddd;\nbox-sizing: content-box;\nheight: 1px;\nmargin: 24px 0;\noverflow: visible;\nwidth: 100%;\n}\n\npre, code, kbd, samp {\nfont-family: Roboto Mono, monospace;\n}\n\n:focus {\noutline: none;\n}\n\nhtml {\n-webkit-text-size-adjust: 100%;\n}\n\nh1 {\nfont-size: 2em;\nmargin: 0.67em 0;\n}\n\npre {\nfont-family: monospace, monospace;\nfont-size: 1em;\n}\n\nabbr[title] {\nborder-bottom: none;\ntext-decoration: underline dotted;\ntext-decoration: underline;\n}\n\nb, strong {\nfont-weight: bolder;\n}\n\ncode, kbd, samp {\nfont-family: monospace, monospace;\nfont-size: 1em;\n}\n\nsmall {\nfont-size: 80%;\n}\n\nsub, sup {\nfont-size: 75%;\nposition: relative;\nvertical-align: baseline;\n}\n\nsub {\nbottom: -0.25em;\n}\n\nsup {\ntop: -0.5em;\n}\n\nimg {\nborder-style: none;\n}\n\nbutton, input, optgroup, select, textarea {\nfont-family: inherit;\nfont-size: 100%;\nmargin: 0px;\n}\n\nbutton, input {\noverflow: visible;\n}\n\nbutton, select {\ntext-transform: none;\n}\n\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] {\n-webkit-appearance: button;\n}\n\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner {\nborder-style: none;\npadding: 0px;\n}\n\nbutton:-moz-focusring, [type=\"button\"]:-moz-focusring, [type=\"reset\"]:-moz-focusring, [type=\"submit\"]:-moz-focusring {\noutline: 1px dotted ButtonText;\n}\n\nfieldset {\npadding: 0.35em 0.75em 0.625em;\n}\n\nlegend {\nbox-sizing: border-box;\ncolor: inherit;\ndisplay: table;\nmax-width: 100%;\npadding: 0px;\nwhite-space: normal;\n}\n\nprogress {\nvertical-align: baseline;\n}\n\ntextarea {\noverflow: auto;\n}\n\n[type=\"checkbox\"], [type=\"radio\"] {\nbox-sizing: border-box;\npadding: 0px;\n}\n\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button {\nheight: auto;\n}\n\n[type=\"search\"] {\n-webkit-appearance: textfield;\noutline-offset: -2px;\n}\n\n[type=\"search\"]::-webkit-search-decoration {\n-webkit-appearance: none;\n}\n\n::-webkit-file-upload-button {\n-webkit-appearance: button;\nfont: inherit;\n}\n\ndetails {\ndisplay: block;\n}\n\nsummary {\ndisplay: list-item;\n}\n\ntemplate {\ndisplay: none;\n}\n\n[hidden] {\ndisplay: none;\n}\n\nmeta {\nwidth: 100px;\n}\n\n*[contenteditable] {\nuser-select: text;\n}\n\ncode span {\nwhite-space: pre-wrap;\n}\n\n\n\nmain {\nbackground: orange;\n}\n\n"
        ]);
      });

      to('false', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          const amauiStyle = new window.AmauiStyle.AmauiStyle(window.document.body);

          // Plugins
          amauiStyle.plugins.add = [
            window.AmauiStyle.unit,
            window.AmauiStyle.sort,
            window.AmauiStyle.prefix,
            window.AmauiStyle.makeClassName,
            window.AmauiStyle.rtl,
          ];

          const a = {
            a: {
              // unit
              width: 100,

              'max-width': 100,

              // Simple
              background: '#faa',

              margin: '0 14px 4px 40px',

              // rtl
              marginLeft: 41,
              float: 'left',

              // sort
              paddingLeft: 41,
              padding: 40,

              // prefixes
              position: 'sticky',
              transition: 'all .4s ease',
              maskOrigin: 'inherit',
              maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
              maskPosition: '40% 74%',

              // animation
              animation: '$a .4s ease',
            },

            meta: {
              width: 100
            },

            main: {
              // Function
              background: props => props.a === 1 ? 'yellow' : 'orange',
            },
          };

          const reset = window.AmauiStyle.reset(a, { amaui_style: { value: amauiStyle } });

          // Add
          reset.add();

          let valueCSS = ``;

          Array.from(document.styleSheets).forEach(styleSheet => {
            Array.from(styleSheet.cssRules).forEach(cssRule => valueCSS += `\n${cssRule.cssText}`);
          });

          return [
            window.document.styleSheets.length,
            Object.keys(reset),
            reset.amaui_style_sheet_manager.status === 'active',
            valueCSS,
            amauiStyle.css,
          ];
        }, { browsers });

        const values = [...valueBrowsers];

        assert(values).eql([
          [
            6,
            [
              "ids",
              "amaui_style_sheet_manager",
              "sheets",
              "add",
              "props",
              "update",
              "remove",
              "addRule"
            ],
            true,
            "\nmain { background: orange; display: block; }\na { background: transparent; cursor: pointer; float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; text-decoration: none; transition: all 0.4s ease 0s; width: 100px; }\nmeta { width: 100px; }\n[contenteditable] { user-select: text; }\n* { background: transparent; border: 0px; box-sizing: border-box; font-size: 100%; margin: 0px; outline: none; padding: 0px; touch-action: manipulation; }\nbody { background-color: rgb(255, 255, 255); font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif; font-size: 14px; font-style: normal; font-weight: normal; overflow-x: hidden; position: relative; }\nimg, embed, object, video { height: auto; max-width: 100%; }\nform { width: 100%; }\nspan { overflow-wrap: break-word; }\nhr { background: rgb(221, 221, 221); box-sizing: content-box; height: 1px; margin: 24px 0px; overflow: visible; width: 100%; }\npre, code, kbd, samp { font-family: \"Roboto Mono\", monospace; }\ncode span { white-space: pre-wrap; }\n:focus { outline: none; }\nhtml { text-size-adjust: 100%; }\nh1 { font-size: 2em; margin: 0.67em 0px; }\npre { font-family: monospace, monospace; font-size: 1em; }\nabbr[title] { border-bottom: none; text-decoration: underline; }\nb, strong { font-weight: bolder; }\ncode, kbd, samp { font-family: monospace, monospace; font-size: 1em; }\nsmall { font-size: 80%; }\nsub, sup { font-size: 75%; position: relative; vertical-align: baseline; }\nsub { bottom: -0.25em; }\nsup { top: -0.5em; }\nimg { border-style: none; }\nbutton, input, optgroup, select, textarea { font-family: inherit; font-size: 100%; margin: 0px; }\nbutton, input { overflow: visible; }\nbutton, select { text-transform: none; }\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] { appearance: button; }\nfieldset { padding: 0.35em 0.75em 0.625em; }\nlegend { box-sizing: border-box; color: inherit; display: table; max-width: 100%; padding: 0px; white-space: normal; }\nprogress { vertical-align: baseline; }\ntextarea { overflow: auto; }\n[type=\"checkbox\"], [type=\"radio\"] { box-sizing: border-box; padding: 0px; }\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button { height: auto; }\n[type=\"search\"] { appearance: textfield; outline-offset: -2px; }\n[type=\"search\"]::-webkit-search-decoration { appearance: none; }\n::-webkit-file-upload-button { appearance: button; font: inherit; }\ndetails { display: block; }\nsummary { display: list-item; }\ntemplate { display: none; }\n[hidden] { display: none; }\nmain { background: orange; }\n[contenteditable] { user-select: text; }\n* { background: transparent; border: 0px; box-sizing: border-box; font-size: 100%; margin: 0px; outline: none; padding: 0px; touch-action: manipulation; }\nbody { background-color: rgb(255, 255, 255); font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif; font-size: 14px; font-style: normal; font-weight: normal; overflow-x: hidden; position: relative; }\nimg, embed, object, video { height: auto; max-width: 100%; }\na { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }\nform { width: 100%; }\nspan { overflow-wrap: break-word; }\nhr { background: rgb(221, 221, 221); box-sizing: content-box; height: 1px; margin: 24px 0px; overflow: visible; width: 100%; }\npre, code, kbd, samp { font-family: \"Roboto Mono\", monospace; }\ncode span { white-space: pre-wrap; }\n:focus { outline: none; }\nhtml { text-size-adjust: 100%; }\nh1 { font-size: 2em; margin: 0.67em 0px; }\npre { font-family: monospace, monospace; font-size: 1em; }\nabbr[title] { border-bottom: none; text-decoration: underline; }\nb, strong { font-weight: bolder; }\ncode, kbd, samp { font-family: monospace, monospace; font-size: 1em; }\nsmall { font-size: 80%; }\nsub, sup { font-size: 75%; position: relative; vertical-align: baseline; }\nsub { bottom: -0.25em; }\nsup { top: -0.5em; }\nimg { border-style: none; }\nbutton, input, optgroup, select, textarea { font-family: inherit; font-size: 100%; margin: 0px; }\nbutton, input { overflow: visible; }\nbutton, select { text-transform: none; }\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] { appearance: button; }\nfieldset { padding: 0.35em 0.75em 0.625em; }\nlegend { box-sizing: border-box; color: inherit; display: table; max-width: 100%; padding: 0px; white-space: normal; }\nprogress { vertical-align: baseline; }\ntextarea { overflow: auto; }\n[type=\"checkbox\"], [type=\"radio\"] { box-sizing: border-box; padding: 0px; }\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button { height: auto; }\n[type=\"search\"] { appearance: textfield; outline-offset: -2px; }\n[type=\"search\"]::-webkit-search-decoration { appearance: none; }\n::-webkit-file-upload-button { appearance: button; font: inherit; }\ndetails { display: block; }\nsummary { display: list-item; }\ntemplate { display: none; }\n[hidden] { display: none; }\nmeta { width: 100px; }\nmain { background: orange; display: block; }\na { background: transparent; cursor: pointer; float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; text-decoration: none; transition: all 0.4s ease 0s; width: 100px; }\nmeta { width: 100px; }\n[contenteditable] { user-select: text; }\n* { background: transparent; border: 0px; box-sizing: border-box; font-size: 100%; margin: 0px; outline: none; padding: 0px; touch-action: manipulation; }\nbody { background-color: rgb(255, 255, 255); font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif; font-size: 14px; font-style: normal; font-weight: normal; overflow-x: hidden; position: relative; }\nimg, embed, object, video { height: auto; max-width: 100%; }\nform { width: 100%; }\nspan { overflow-wrap: break-word; }\nhr { background: rgb(221, 221, 221); box-sizing: content-box; height: 1px; margin: 24px 0px; overflow: visible; width: 100%; }\npre, code, kbd, samp { font-family: \"Roboto Mono\", monospace; }\ncode span { white-space: pre-wrap; }\n:focus { outline: none; }\nhtml { text-size-adjust: 100%; }\nh1 { font-size: 2em; margin: 0.67em 0px; }\npre { font-family: monospace, monospace; font-size: 1em; }\nabbr[title] { border-bottom: none; text-decoration: underline; }\nb, strong { font-weight: bolder; }\ncode, kbd, samp { font-family: monospace, monospace; font-size: 1em; }\nsmall { font-size: 80%; }\nsub, sup { font-size: 75%; position: relative; vertical-align: baseline; }\nsub { bottom: -0.25em; }\nsup { top: -0.5em; }\nimg { border-style: none; }\nbutton, input, optgroup, select, textarea { font-family: inherit; font-size: 100%; margin: 0px; }\nbutton, input { overflow: visible; }\nbutton, select { text-transform: none; }\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] { appearance: button; }\nfieldset { padding: 0.35em 0.75em 0.625em; }\nlegend { box-sizing: border-box; color: inherit; display: table; max-width: 100%; padding: 0px; white-space: normal; }\nprogress { vertical-align: baseline; }\ntextarea { overflow: auto; }\n[type=\"checkbox\"], [type=\"radio\"] { box-sizing: border-box; padding: 0px; }\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button { height: auto; }\n[type=\"search\"] { appearance: textfield; outline-offset: -2px; }\n[type=\"search\"]::-webkit-search-decoration { appearance: none; }\n::-webkit-file-upload-button { appearance: button; font: inherit; }\ndetails { display: block; }\nsummary { display: list-item; }\ntemplate { display: none; }\n[hidden] { display: none; }",
            "\n\na {\nbackground: #faa;\nbackground-color: transparent;\ncursor: pointer;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntext-decoration: none;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\nmeta {\nwidth: 100px;\n}\n\n* {\nbackground: transparent;\nborder: 0px;\nbox-sizing: border-box;\nfont-size: 100%;\nmargin: 0px;\noutline: none;\npadding: 0px;\ntouch-action: manipulation;\n}\n\nbody {\nbackground-color: #fff;\nfont-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif;\nfont-size: 14px;\nfont-style: normal;\nfont-weight: normal;\noverflow-x: hidden;\nposition: relative;\n}\n\nimg, embed, object, video {\nheight: auto;\nmax-width: 100%;\n}\n\nform {\nwidth: 100%;\n}\n\nspan {\nword-wrap: break-word;\n}\n\nhr {\nbackground: #ddd;\nbox-sizing: content-box;\nheight: 1px;\nmargin: 24px 0;\noverflow: visible;\nwidth: 100%;\n}\n\npre, code, kbd, samp {\nfont-family: Roboto Mono, monospace;\n}\n\n:focus {\noutline: none;\n}\n\nhtml {\n-webkit-text-size-adjust: 100%;\n}\n\nh1 {\nfont-size: 2em;\nmargin: 0.67em 0;\n}\n\npre {\nfont-family: monospace, monospace;\nfont-size: 1em;\n}\n\nabbr[title] {\nborder-bottom: none;\ntext-decoration: underline dotted;\ntext-decoration: underline;\n}\n\nb, strong {\nfont-weight: bolder;\n}\n\ncode, kbd, samp {\nfont-family: monospace, monospace;\nfont-size: 1em;\n}\n\nsmall {\nfont-size: 80%;\n}\n\nsub, sup {\nfont-size: 75%;\nposition: relative;\nvertical-align: baseline;\n}\n\nsub {\nbottom: -0.25em;\n}\n\nsup {\ntop: -0.5em;\n}\n\nimg {\nborder-style: none;\n}\n\nbutton, input, optgroup, select, textarea {\nfont-family: inherit;\nfont-size: 100%;\nmargin: 0px;\n}\n\nbutton, input {\noverflow: visible;\n}\n\nbutton, select {\ntext-transform: none;\n}\n\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] {\n-webkit-appearance: button;\n}\n\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner {\nborder-style: none;\npadding: 0px;\n}\n\nbutton:-moz-focusring, [type=\"button\"]:-moz-focusring, [type=\"reset\"]:-moz-focusring, [type=\"submit\"]:-moz-focusring {\noutline: 1px dotted ButtonText;\n}\n\nfieldset {\npadding: 0.35em 0.75em 0.625em;\n}\n\nlegend {\nbox-sizing: border-box;\ncolor: inherit;\ndisplay: table;\nmax-width: 100%;\npadding: 0px;\nwhite-space: normal;\n}\n\nprogress {\nvertical-align: baseline;\n}\n\ntextarea {\noverflow: auto;\n}\n\n[type=\"checkbox\"], [type=\"radio\"] {\nbox-sizing: border-box;\npadding: 0px;\n}\n\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button {\nheight: auto;\n}\n\n[type=\"search\"] {\n-webkit-appearance: textfield;\noutline-offset: -2px;\n}\n\n[type=\"search\"]::-webkit-search-decoration {\n-webkit-appearance: none;\n}\n\n::-webkit-file-upload-button {\n-webkit-appearance: button;\nfont: inherit;\n}\n\ndetails {\ndisplay: block;\n}\n\nsummary {\ndisplay: list-item;\n}\n\ntemplate {\ndisplay: none;\n}\n\n[hidden] {\ndisplay: none;\n}\n\n*[contenteditable] {\nuser-select: text;\n}\n\ncode span {\nwhite-space: pre-wrap;\n}\n\n\n\nmain {\nbackground: orange;\ndisplay: block;\n}\n\n"
          ],
          [
            6,
            [
              "ids",
              "amaui_style_sheet_manager",
              "sheets",
              "add",
              "props",
              "update",
              "remove",
              "addRule"
            ],
            true,
            "\nmain { background: orange none repeat scroll 0% 0%; display: block; }\na { background: transparent none repeat scroll 0% 0%; cursor: pointer; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; text-decoration: none; transition: all 0.4s ease 0s; width: 100px; }\nmeta { width: 100px; }\n[contenteditable] { user-select: text; }\n* { background: transparent none repeat scroll 0% 0%; border: 0px none; box-sizing: border-box; font-size: 100%; margin: 0px; outline: currentcolor none medium; padding: 0px; touch-action: manipulation; }\nbody { background-color: rgb(255, 255, 255); font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif; font-size: 14px; font-style: normal; font-weight: normal; overflow-x: hidden; position: relative; }\nimg, embed, object, video { height: auto; max-width: 100%; }\nform { width: 100%; }\nspan { overflow-wrap: break-word; }\nhr { background: rgb(221, 221, 221) none repeat scroll 0% 0%; box-sizing: content-box; height: 1px; margin: 24px 0px; overflow: visible; width: 100%; }\npre, code, kbd, samp { font-family: Roboto Mono, monospace; }\ncode span { white-space: pre-wrap; }\n:focus { outline: currentcolor none medium; }\nhtml { }\nh1 { font-size: 2em; margin: 0.67em 0px; }\npre { font-family: monospace, monospace; font-size: 1em; }\nabbr[title] { border-bottom: medium none; text-decoration: underline; }\nb, strong { font-weight: bolder; }\ncode, kbd, samp { font-family: monospace, monospace; font-size: 1em; }\nsmall { font-size: 80%; }\nsub, sup { font-size: 75%; position: relative; vertical-align: baseline; }\nsub { bottom: -0.25em; }\nsup { top: -0.5em; }\nimg { border-style: none; }\nbutton, input, optgroup, select, textarea { font-family: inherit; font-size: 100%; margin: 0px; }\nbutton, input { overflow: visible; }\nbutton, select { text-transform: none; }\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] { appearance: button; }\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner { border-style: none; padding: 0px; }\nbutton:focus-visible, [type=\"button\"]:focus-visible, [type=\"reset\"]:focus-visible, [type=\"submit\"]:focus-visible { outline: buttontext dotted 1px; }\nfieldset { padding: 0.35em 0.75em 0.625em; }\nlegend { box-sizing: border-box; color: inherit; display: table; max-width: 100%; padding: 0px; white-space: normal; }\nprogress { vertical-align: baseline; }\ntextarea { overflow: auto; }\n[type=\"checkbox\"], [type=\"radio\"] { box-sizing: border-box; padding: 0px; }\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button { height: auto; }\n[type=\"search\"] { appearance: textfield; outline-offset: -2px; }\n[type=\"search\"]::-webkit-search-decoration { appearance: none; }\n::-webkit-file-upload-button { appearance: button; font: inherit; }\ndetails { display: block; }\nsummary { display: list-item; }\ntemplate { display: none; }\n[hidden] { display: none; }\nmain { background: orange none repeat scroll 0% 0%; }\n[contenteditable] { user-select: text; }\n* { background: transparent none repeat scroll 0% 0%; border: 0px none; box-sizing: border-box; font-size: 100%; margin: 0px; outline: currentcolor none medium; padding: 0px; touch-action: manipulation; }\nbody { background-color: rgb(255, 255, 255); font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif; font-size: 14px; font-style: normal; font-weight: normal; overflow-x: hidden; position: relative; }\nimg, embed, object, video { height: auto; max-width: 100%; }\na { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }\nform { width: 100%; }\nspan { overflow-wrap: break-word; }\nhr { background: rgb(221, 221, 221) none repeat scroll 0% 0%; box-sizing: content-box; height: 1px; margin: 24px 0px; overflow: visible; width: 100%; }\npre, code, kbd, samp { font-family: Roboto Mono, monospace; }\ncode span { white-space: pre-wrap; }\n:focus { outline: currentcolor none medium; }\nhtml { }\nh1 { font-size: 2em; margin: 0.67em 0px; }\npre { font-family: monospace, monospace; font-size: 1em; }\nabbr[title] { border-bottom: medium none; text-decoration: underline; }\nb, strong { font-weight: bolder; }\ncode, kbd, samp { font-family: monospace, monospace; font-size: 1em; }\nsmall { font-size: 80%; }\nsub, sup { font-size: 75%; position: relative; vertical-align: baseline; }\nsub { bottom: -0.25em; }\nsup { top: -0.5em; }\nimg { border-style: none; }\nbutton, input, optgroup, select, textarea { font-family: inherit; font-size: 100%; margin: 0px; }\nbutton, input { overflow: visible; }\nbutton, select { text-transform: none; }\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] { appearance: button; }\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner { border-style: none; padding: 0px; }\nbutton:focus-visible, [type=\"button\"]:focus-visible, [type=\"reset\"]:focus-visible, [type=\"submit\"]:focus-visible { outline: buttontext dotted 1px; }\nfieldset { padding: 0.35em 0.75em 0.625em; }\nlegend { box-sizing: border-box; color: inherit; display: table; max-width: 100%; padding: 0px; white-space: normal; }\nprogress { vertical-align: baseline; }\ntextarea { overflow: auto; }\n[type=\"checkbox\"], [type=\"radio\"] { box-sizing: border-box; padding: 0px; }\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button { height: auto; }\n[type=\"search\"] { appearance: textfield; outline-offset: -2px; }\n[type=\"search\"]::-webkit-search-decoration { appearance: none; }\n::-webkit-file-upload-button { appearance: button; font: inherit; }\ndetails { display: block; }\nsummary { display: list-item; }\ntemplate { display: none; }\n[hidden] { display: none; }\nmeta { width: 100px; }\nmain { background: orange none repeat scroll 0% 0%; display: block; }\na { background: transparent none repeat scroll 0% 0%; cursor: pointer; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; text-decoration: none; transition: all 0.4s ease 0s; width: 100px; }\nmeta { width: 100px; }\n[contenteditable] { user-select: text; }\n* { background: transparent none repeat scroll 0% 0%; border: 0px none; box-sizing: border-box; font-size: 100%; margin: 0px; outline: currentcolor none medium; padding: 0px; touch-action: manipulation; }\nbody { background-color: rgb(255, 255, 255); font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif; font-size: 14px; font-style: normal; font-weight: normal; overflow-x: hidden; position: relative; }\nimg, embed, object, video { height: auto; max-width: 100%; }\nform { width: 100%; }\nspan { overflow-wrap: break-word; }\nhr { background: rgb(221, 221, 221) none repeat scroll 0% 0%; box-sizing: content-box; height: 1px; margin: 24px 0px; overflow: visible; width: 100%; }\npre, code, kbd, samp { font-family: Roboto Mono, monospace; }\ncode span { white-space: pre-wrap; }\n:focus { outline: currentcolor none medium; }\nhtml { }\nh1 { font-size: 2em; margin: 0.67em 0px; }\npre { font-family: monospace, monospace; font-size: 1em; }\nabbr[title] { border-bottom: medium none; text-decoration: underline; }\nb, strong { font-weight: bolder; }\ncode, kbd, samp { font-family: monospace, monospace; font-size: 1em; }\nsmall { font-size: 80%; }\nsub, sup { font-size: 75%; position: relative; vertical-align: baseline; }\nsub { bottom: -0.25em; }\nsup { top: -0.5em; }\nimg { border-style: none; }\nbutton, input, optgroup, select, textarea { font-family: inherit; font-size: 100%; margin: 0px; }\nbutton, input { overflow: visible; }\nbutton, select { text-transform: none; }\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] { appearance: button; }\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner { border-style: none; padding: 0px; }\nbutton:focus-visible, [type=\"button\"]:focus-visible, [type=\"reset\"]:focus-visible, [type=\"submit\"]:focus-visible { outline: buttontext dotted 1px; }\nfieldset { padding: 0.35em 0.75em 0.625em; }\nlegend { box-sizing: border-box; color: inherit; display: table; max-width: 100%; padding: 0px; white-space: normal; }\nprogress { vertical-align: baseline; }\ntextarea { overflow: auto; }\n[type=\"checkbox\"], [type=\"radio\"] { box-sizing: border-box; padding: 0px; }\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button { height: auto; }\n[type=\"search\"] { appearance: textfield; outline-offset: -2px; }\n[type=\"search\"]::-webkit-search-decoration { appearance: none; }\n::-webkit-file-upload-button { appearance: button; font: inherit; }\ndetails { display: block; }\nsummary { display: list-item; }\ntemplate { display: none; }\n[hidden] { display: none; }",
            "\n\na {\nbackground: #faa;\nbackground-color: transparent;\ncursor: pointer;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntext-decoration: none;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\nmeta {\nwidth: 100px;\n}\n\n* {\nbackground: transparent;\nborder: 0px;\nbox-sizing: border-box;\nfont-size: 100%;\nmargin: 0px;\noutline: none;\npadding: 0px;\ntouch-action: manipulation;\n}\n\nbody {\nbackground-color: #fff;\nfont-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif;\nfont-size: 14px;\nfont-style: normal;\nfont-weight: normal;\noverflow-x: hidden;\nposition: relative;\n}\n\nimg, embed, object, video {\nheight: auto;\nmax-width: 100%;\n}\n\nform {\nwidth: 100%;\n}\n\nspan {\nword-wrap: break-word;\n}\n\nhr {\nbackground: #ddd;\nbox-sizing: content-box;\nheight: 1px;\nmargin: 24px 0;\noverflow: visible;\nwidth: 100%;\n}\n\npre, code, kbd, samp {\nfont-family: Roboto Mono, monospace;\n}\n\n:focus {\noutline: none;\n}\n\nhtml {\n-webkit-text-size-adjust: 100%;\n}\n\nh1 {\nfont-size: 2em;\nmargin: 0.67em 0;\n}\n\npre {\nfont-family: monospace, monospace;\nfont-size: 1em;\n}\n\nabbr[title] {\nborder-bottom: none;\ntext-decoration: underline dotted;\ntext-decoration: underline;\n}\n\nb, strong {\nfont-weight: bolder;\n}\n\ncode, kbd, samp {\nfont-family: monospace, monospace;\nfont-size: 1em;\n}\n\nsmall {\nfont-size: 80%;\n}\n\nsub, sup {\nfont-size: 75%;\nposition: relative;\nvertical-align: baseline;\n}\n\nsub {\nbottom: -0.25em;\n}\n\nsup {\ntop: -0.5em;\n}\n\nimg {\nborder-style: none;\n}\n\nbutton, input, optgroup, select, textarea {\nfont-family: inherit;\nfont-size: 100%;\nmargin: 0px;\n}\n\nbutton, input {\noverflow: visible;\n}\n\nbutton, select {\ntext-transform: none;\n}\n\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] {\n-webkit-appearance: button;\n}\n\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner {\nborder-style: none;\npadding: 0px;\n}\n\nbutton:-moz-focusring, [type=\"button\"]:-moz-focusring, [type=\"reset\"]:-moz-focusring, [type=\"submit\"]:-moz-focusring {\noutline: 1px dotted ButtonText;\n}\n\nfieldset {\npadding: 0.35em 0.75em 0.625em;\n}\n\nlegend {\nbox-sizing: border-box;\ncolor: inherit;\ndisplay: table;\nmax-width: 100%;\npadding: 0px;\nwhite-space: normal;\n}\n\nprogress {\nvertical-align: baseline;\n}\n\ntextarea {\noverflow: auto;\n}\n\n[type=\"checkbox\"], [type=\"radio\"] {\nbox-sizing: border-box;\npadding: 0px;\n}\n\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button {\nheight: auto;\n}\n\n[type=\"search\"] {\n-webkit-appearance: textfield;\noutline-offset: -2px;\n}\n\n[type=\"search\"]::-webkit-search-decoration {\n-webkit-appearance: none;\n}\n\n::-webkit-file-upload-button {\n-webkit-appearance: button;\nfont: inherit;\n}\n\ndetails {\ndisplay: block;\n}\n\nsummary {\ndisplay: list-item;\n}\n\ntemplate {\ndisplay: none;\n}\n\n[hidden] {\ndisplay: none;\n}\n\n*[contenteditable] {\nuser-select: text;\n}\n\ncode span {\nwhite-space: pre-wrap;\n}\n\n\n\nmain {\nbackground: orange;\ndisplay: block;\n}\n\n"
          ],
          [
            6,
            [
              "ids",
              "amaui_style_sheet_manager",
              "sheets",
              "add",
              "props",
              "update",
              "remove",
              "addRule"
            ],
            true,
            "\nmain { background-color: orange; display: block; }\na { background-color: transparent; cursor: pointer; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; text-decoration: none; transition: all 0.4s ease 0s; width: 100px; }\nmeta { width: 100px; }\n[contenteditable] { }\n* { background-color: transparent; border: 0px; box-sizing: border-box; font-size: 100%; margin: 0px; outline: none; padding: 0px; touch-action: manipulation; }\nbody { background-color: rgb(255, 255, 255); font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif; font-size: 14px; font-style: normal; font-weight: normal; overflow-x: hidden; position: relative; }\nimg, embed, object, video { height: auto; max-width: 100%; }\nform { width: 100%; }\nspan { word-wrap: break-word; }\nhr { background-color: rgb(221, 221, 221); box-sizing: content-box; height: 1px; margin: 24px 0px; overflow: visible; width: 100%; }\npre, code, kbd, samp { font-family: \"Roboto Mono\", monospace; }\ncode span { white-space: pre-wrap; }\n:focus { outline: none; }\nhtml { }\nh1 { font-size: 2em; margin: 0.67em 0px; }\npre { font-family: monospace, monospace; font-size: 1em; }\nabbr[title] { border-bottom-style: none; text-decoration: underline; }\nb, strong { font-weight: bolder; }\ncode, kbd, samp { font-family: monospace, monospace; font-size: 1em; }\nsmall { font-size: 80%; }\nsub, sup { font-size: 75%; position: relative; vertical-align: baseline; }\nsub { bottom: -0.25em; }\nsup { top: -0.5em; }\nimg { border-style: none; }\nbutton, input, optgroup, select, textarea { font-family: inherit; font-size: 100%; margin: 0px; }\nbutton, input { overflow: visible; }\nbutton, select { text-transform: none; }\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] { appearance: button; }\nfieldset { padding: 0.35em 0.75em 0.625em; }\nlegend { box-sizing: border-box; color: inherit; display: table; max-width: 100%; padding: 0px; white-space: normal; }\nprogress { vertical-align: baseline; }\ntextarea { overflow: auto; }\n[type=\"checkbox\"], [type=\"radio\"] { box-sizing: border-box; padding: 0px; }\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button { height: auto; }\n[type=\"search\"] { appearance: textfield; outline-offset: -2px; }\n[type=\"search\"]::-webkit-search-decoration { appearance: none; }\n::-webkit-file-upload-button { appearance: button; font-family: inherit; font-size: inherit; font-style: inherit; font-variant-caps: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; }\ndetails { display: block; }\nsummary { display: list-item; }\ntemplate { display: none; }\n[hidden] { display: none; }\nmain { background-color: orange; }\n[contenteditable] { }\n* { background-color: transparent; border: 0px; box-sizing: border-box; font-size: 100%; margin: 0px; outline: none; padding: 0px; touch-action: manipulation; }\nbody { background-color: rgb(255, 255, 255); font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif; font-size: 14px; font-style: normal; font-weight: normal; overflow-x: hidden; position: relative; }\nimg, embed, object, video { height: auto; max-width: 100%; }\na { background-color: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }\nform { width: 100%; }\nspan { word-wrap: break-word; }\nhr { background-color: rgb(221, 221, 221); box-sizing: content-box; height: 1px; margin: 24px 0px; overflow: visible; width: 100%; }\npre, code, kbd, samp { font-family: \"Roboto Mono\", monospace; }\ncode span { white-space: pre-wrap; }\n:focus { outline: none; }\nhtml { }\nh1 { font-size: 2em; margin: 0.67em 0px; }\npre { font-family: monospace, monospace; font-size: 1em; }\nabbr[title] { border-bottom-style: none; text-decoration: underline; }\nb, strong { font-weight: bolder; }\ncode, kbd, samp { font-family: monospace, monospace; font-size: 1em; }\nsmall { font-size: 80%; }\nsub, sup { font-size: 75%; position: relative; vertical-align: baseline; }\nsub { bottom: -0.25em; }\nsup { top: -0.5em; }\nimg { border-style: none; }\nbutton, input, optgroup, select, textarea { font-family: inherit; font-size: 100%; margin: 0px; }\nbutton, input { overflow: visible; }\nbutton, select { text-transform: none; }\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] { appearance: button; }\nfieldset { padding: 0.35em 0.75em 0.625em; }\nlegend { box-sizing: border-box; color: inherit; display: table; max-width: 100%; padding: 0px; white-space: normal; }\nprogress { vertical-align: baseline; }\ntextarea { overflow: auto; }\n[type=\"checkbox\"], [type=\"radio\"] { box-sizing: border-box; padding: 0px; }\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button { height: auto; }\n[type=\"search\"] { appearance: textfield; outline-offset: -2px; }\n[type=\"search\"]::-webkit-search-decoration { appearance: none; }\n::-webkit-file-upload-button { appearance: button; font-family: inherit; font-size: inherit; font-style: inherit; font-variant-caps: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; }\ndetails { display: block; }\nsummary { display: list-item; }\ntemplate { display: none; }\n[hidden] { display: none; }\nmeta { width: 100px; }\nmain { background-color: orange; display: block; }\na { background-color: transparent; cursor: pointer; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; text-decoration: none; transition: all 0.4s ease 0s; width: 100px; }\nmeta { width: 100px; }\n[contenteditable] { }\n* { background-color: transparent; border: 0px; box-sizing: border-box; font-size: 100%; margin: 0px; outline: none; padding: 0px; touch-action: manipulation; }\nbody { background-color: rgb(255, 255, 255); font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif; font-size: 14px; font-style: normal; font-weight: normal; overflow-x: hidden; position: relative; }\nimg, embed, object, video { height: auto; max-width: 100%; }\nform { width: 100%; }\nspan { word-wrap: break-word; }\nhr { background-color: rgb(221, 221, 221); box-sizing: content-box; height: 1px; margin: 24px 0px; overflow: visible; width: 100%; }\npre, code, kbd, samp { font-family: \"Roboto Mono\", monospace; }\ncode span { white-space: pre-wrap; }\n:focus { outline: none; }\nhtml { }\nh1 { font-size: 2em; margin: 0.67em 0px; }\npre { font-family: monospace, monospace; font-size: 1em; }\nabbr[title] { border-bottom-style: none; text-decoration: underline; }\nb, strong { font-weight: bolder; }\ncode, kbd, samp { font-family: monospace, monospace; font-size: 1em; }\nsmall { font-size: 80%; }\nsub, sup { font-size: 75%; position: relative; vertical-align: baseline; }\nsub { bottom: -0.25em; }\nsup { top: -0.5em; }\nimg { border-style: none; }\nbutton, input, optgroup, select, textarea { font-family: inherit; font-size: 100%; margin: 0px; }\nbutton, input { overflow: visible; }\nbutton, select { text-transform: none; }\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] { appearance: button; }\nfieldset { padding: 0.35em 0.75em 0.625em; }\nlegend { box-sizing: border-box; color: inherit; display: table; max-width: 100%; padding: 0px; white-space: normal; }\nprogress { vertical-align: baseline; }\ntextarea { overflow: auto; }\n[type=\"checkbox\"], [type=\"radio\"] { box-sizing: border-box; padding: 0px; }\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button { height: auto; }\n[type=\"search\"] { appearance: textfield; outline-offset: -2px; }\n[type=\"search\"]::-webkit-search-decoration { appearance: none; }\n::-webkit-file-upload-button { appearance: button; font-family: inherit; font-size: inherit; font-style: inherit; font-variant-caps: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; }\ndetails { display: block; }\nsummary { display: list-item; }\ntemplate { display: none; }\n[hidden] { display: none; }",
            "\n\na {\nbackground: #faa;\nbackground-color: transparent;\ncursor: pointer;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntext-decoration: none;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\nmeta {\nwidth: 100px;\n}\n\n* {\nbackground: transparent;\nborder: 0px;\nbox-sizing: border-box;\nfont-size: 100%;\nmargin: 0px;\noutline: none;\npadding: 0px;\ntouch-action: manipulation;\n}\n\nbody {\nbackground-color: #fff;\nfont-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif;\nfont-size: 14px;\nfont-style: normal;\nfont-weight: normal;\noverflow-x: hidden;\nposition: relative;\n}\n\nimg, embed, object, video {\nheight: auto;\nmax-width: 100%;\n}\n\nform {\nwidth: 100%;\n}\n\nspan {\nword-wrap: break-word;\n}\n\nhr {\nbackground: #ddd;\nbox-sizing: content-box;\nheight: 1px;\nmargin: 24px 0;\noverflow: visible;\nwidth: 100%;\n}\n\npre, code, kbd, samp {\nfont-family: Roboto Mono, monospace;\n}\n\n:focus {\noutline: none;\n}\n\nhtml {\n-webkit-text-size-adjust: 100%;\n}\n\nh1 {\nfont-size: 2em;\nmargin: 0.67em 0;\n}\n\npre {\nfont-family: monospace, monospace;\nfont-size: 1em;\n}\n\nabbr[title] {\nborder-bottom: none;\ntext-decoration: underline dotted;\ntext-decoration: underline;\n}\n\nb, strong {\nfont-weight: bolder;\n}\n\ncode, kbd, samp {\nfont-family: monospace, monospace;\nfont-size: 1em;\n}\n\nsmall {\nfont-size: 80%;\n}\n\nsub, sup {\nfont-size: 75%;\nposition: relative;\nvertical-align: baseline;\n}\n\nsub {\nbottom: -0.25em;\n}\n\nsup {\ntop: -0.5em;\n}\n\nimg {\nborder-style: none;\n}\n\nbutton, input, optgroup, select, textarea {\nfont-family: inherit;\nfont-size: 100%;\nmargin: 0px;\n}\n\nbutton, input {\noverflow: visible;\n}\n\nbutton, select {\ntext-transform: none;\n}\n\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] {\n-webkit-appearance: button;\n}\n\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner {\nborder-style: none;\npadding: 0px;\n}\n\nbutton:-moz-focusring, [type=\"button\"]:-moz-focusring, [type=\"reset\"]:-moz-focusring, [type=\"submit\"]:-moz-focusring {\noutline: 1px dotted ButtonText;\n}\n\nfieldset {\npadding: 0.35em 0.75em 0.625em;\n}\n\nlegend {\nbox-sizing: border-box;\ncolor: inherit;\ndisplay: table;\nmax-width: 100%;\npadding: 0px;\nwhite-space: normal;\n}\n\nprogress {\nvertical-align: baseline;\n}\n\ntextarea {\noverflow: auto;\n}\n\n[type=\"checkbox\"], [type=\"radio\"] {\nbox-sizing: border-box;\npadding: 0px;\n}\n\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button {\nheight: auto;\n}\n\n[type=\"search\"] {\n-webkit-appearance: textfield;\noutline-offset: -2px;\n}\n\n[type=\"search\"]::-webkit-search-decoration {\n-webkit-appearance: none;\n}\n\n::-webkit-file-upload-button {\n-webkit-appearance: button;\nfont: inherit;\n}\n\ndetails {\ndisplay: block;\n}\n\nsummary {\ndisplay: list-item;\n}\n\ntemplate {\ndisplay: none;\n}\n\n[hidden] {\ndisplay: none;\n}\n\n*[contenteditable] {\nuser-select: text;\n}\n\ncode span {\nwhite-space: pre-wrap;\n}\n\n\n\nmain {\nbackground: orange;\ndisplay: block;\n}\n\n"
          ]
        ]);

        const amauiStyle = new AmauiStyle.AmauiStyle();

        // Plugins
        amauiStyle.plugins.add = [
          AmauiStyle.unit,
          AmauiStyle.sort,
          AmauiStyle.prefix,
          AmauiStyle.makeClassName,
          AmauiStyle.rtl,
        ];

        const a: TValue = {
          a: {
            // unit
            width: 100,

            'max-width': 100,

            // Simple
            background: '#faa',

            margin: '0 14px 4px 40px',

            // rtl
            marginLeft: 41,
            float: 'left',

            // sort
            paddingLeft: 41,
            padding: 40,

            // prefixes
            position: 'sticky',
            transition: 'all .4s ease',
            maskOrigin: 'inherit',
            maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
            maskPosition: '40% 74%',

            // animation
            animation: '$a .4s ease',
          },

          meta: {
            width: 100
          },

          main: {
            // Function
            background: props => props.a === 1 ? 'yellow' : 'orange',
          },
        };

        const reset = AmauiStyle.reset(a, { amaui_style: { value: amauiStyle } });

        // Add
        reset.add();

        const value = [
          Object.keys(reset),
          reset.amaui_style_sheet_manager.status === 'inited',
          amauiStyle.css,
        ];

        assert(value).eql([
          [
            "ids",
            "amaui_style_sheet_manager",
            "sheets",
            "add",
            "props",
            "update",
            "remove",
            "addRule"
          ],
          true,
          "\n\na {\nbackground: #faa;\nbackground-color: transparent;\ncursor: pointer;\nfloat: left;\nmargin: 0 14px 4px 40px;\nmargin-left: 41px;\nmask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\nmask-origin: inherit;\nmask-position: 40% 74%;\nmax-width: 100px;\npadding: 40px;\npadding-left: 41px;\nposition: sticky;\ntext-decoration: none;\ntransition: all .4s ease;\nwidth: 100px;\n}\n\nmeta {\nwidth: 100px;\n}\n\n* {\nbackground: transparent;\nborder: 0px;\nbox-sizing: border-box;\nfont-size: 100%;\nmargin: 0px;\noutline: none;\npadding: 0px;\ntouch-action: manipulation;\n}\n\nbody {\nbackground-color: #fff;\nfont-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif;\nfont-size: 14px;\nfont-style: normal;\nfont-weight: normal;\noverflow-x: hidden;\nposition: relative;\n}\n\nimg, embed, object, video {\nheight: auto;\nmax-width: 100%;\n}\n\nform {\nwidth: 100%;\n}\n\nspan {\nword-wrap: break-word;\n}\n\nhr {\nbackground: #ddd;\nbox-sizing: content-box;\nheight: 1px;\nmargin: 24px 0;\noverflow: visible;\nwidth: 100%;\n}\n\npre, code, kbd, samp {\nfont-family: Roboto Mono, monospace;\n}\n\n:focus {\noutline: none;\n}\n\nhtml {\n-webkit-text-size-adjust: 100%;\n}\n\nh1 {\nfont-size: 2em;\nmargin: 0.67em 0;\n}\n\npre {\nfont-family: monospace, monospace;\nfont-size: 1em;\n}\n\nabbr[title] {\nborder-bottom: none;\ntext-decoration: underline dotted;\ntext-decoration: underline;\n}\n\nb, strong {\nfont-weight: bolder;\n}\n\ncode, kbd, samp {\nfont-family: monospace, monospace;\nfont-size: 1em;\n}\n\nsmall {\nfont-size: 80%;\n}\n\nsub, sup {\nfont-size: 75%;\nposition: relative;\nvertical-align: baseline;\n}\n\nsub {\nbottom: -0.25em;\n}\n\nsup {\ntop: -0.5em;\n}\n\nimg {\nborder-style: none;\n}\n\nbutton, input, optgroup, select, textarea {\nfont-family: inherit;\nfont-size: 100%;\nmargin: 0px;\n}\n\nbutton, input {\noverflow: visible;\n}\n\nbutton, select {\ntext-transform: none;\n}\n\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] {\n-webkit-appearance: button;\n}\n\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner {\nborder-style: none;\npadding: 0px;\n}\n\nbutton:-moz-focusring, [type=\"button\"]:-moz-focusring, [type=\"reset\"]:-moz-focusring, [type=\"submit\"]:-moz-focusring {\noutline: 1px dotted ButtonText;\n}\n\nfieldset {\npadding: 0.35em 0.75em 0.625em;\n}\n\nlegend {\nbox-sizing: border-box;\ncolor: inherit;\ndisplay: table;\nmax-width: 100%;\npadding: 0px;\nwhite-space: normal;\n}\n\nprogress {\nvertical-align: baseline;\n}\n\ntextarea {\noverflow: auto;\n}\n\n[type=\"checkbox\"], [type=\"radio\"] {\nbox-sizing: border-box;\npadding: 0px;\n}\n\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button {\nheight: auto;\n}\n\n[type=\"search\"] {\n-webkit-appearance: textfield;\noutline-offset: -2px;\n}\n\n[type=\"search\"]::-webkit-search-decoration {\n-webkit-appearance: none;\n}\n\n::-webkit-file-upload-button {\n-webkit-appearance: button;\nfont: inherit;\n}\n\ndetails {\ndisplay: block;\n}\n\nsummary {\ndisplay: list-item;\n}\n\ntemplate {\ndisplay: none;\n}\n\n[hidden] {\ndisplay: none;\n}\n\n*[contenteditable] {\nuser-select: text;\n}\n\ncode span {\nwhite-space: pre-wrap;\n}\n\n\n\nmain {\nbackground: orange;\ndisplay: block;\n}\n\n"
        ]);
      });

    });

  });

});
