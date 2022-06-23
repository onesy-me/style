/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate } from '../utils/js/test/utils';

import * as AmauiStyle from '../src';
import { TValue } from '../src';

group('@amaui/style/reset', () => {

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
    });

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
        "\nmain { background: orange; display: block; }\na { background: transparent; cursor: pointer; float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; text-decoration: none; transition: all 0.4s ease 0s; width: 100px; }\nmeta { width: 100px; }\n* { background: transparent; border: 0px; box-sizing: border-box; font-size: 100%; margin: 0px; outline: none; padding: 0px; touch-action: manipulation; }\nbody { background-color: rgb(255, 255, 255); font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif; font-size: 14px; font-style: normal; font-weight: normal; overflow-x: hidden; position: relative; }\nimg, embed, object, video { height: auto; max-width: 100%; }\nform { width: 100%; }\nspan { overflow-wrap: break-word; }\nhr { background: rgb(221, 221, 221); box-sizing: content-box; height: 1px; margin: 24px 0px; overflow: visible; width: 100%; }\npre, code, kbd, samp { font-family: \"Roboto Mono\", monospace; }\n:focus { outline: none; }\nhtml { text-size-adjust: 100%; }\nh1 { font-size: 2em; margin: 0.67em 0px; }\npre { font-family: monospace, monospace; font-size: 1em; }\nabbr[title] { border-bottom: none; text-decoration: underline; }\nb, strong { font-weight: bolder; }\ncode, kbd, samp { font-family: monospace, monospace; font-size: 1em; }\nsmall { font-size: 80%; }\nsub, sup { font-size: 75%; position: relative; vertical-align: baseline; }\nsub { bottom: -0.25em; }\nsup { top: -0.5em; }\nimg { border-style: none; }\nbutton, input, optgroup, select, textarea { font-family: inherit; font-size: 100%; margin: 0px; }\nbutton, input { overflow: visible; }\nbutton, select { text-transform: none; }\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] { appearance: button; }\nfieldset { padding: 0.35em 0.75em 0.625em; }\nlegend { box-sizing: border-box; color: inherit; display: table; max-width: 100%; padding: 0px; white-space: normal; }\nprogress { vertical-align: baseline; }\ntextarea { overflow: auto; }\n[type=\"checkbox\"], [type=\"radio\"] { box-sizing: border-box; padding: 0px; }\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button { height: auto; }\n[type=\"search\"] { appearance: textfield; outline-offset: -2px; }\n[type=\"search\"]::-webkit-search-decoration { appearance: none; }\n::-webkit-file-upload-button { appearance: button; font: inherit; }\ndetails { display: block; }\nsummary { display: list-item; }\ntemplate { display: none; }\n[hidden] { display: none; }\n[contenteditable] { user-select: text; }\ncode span { white-space: pre-wrap; }",
        "\n\na {\n  background: #faa;\n  background-color: transparent;\n  cursor: pointer;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  text-decoration: none;\n  transition: all .4s ease;\n  width: 100px;\n}\n\nmeta {\n  width: 100px;\n}\n\n* {\n  background: transparent;\n  border: 0px;\n  box-sizing: border-box;\n  font-size: 100%;\n  margin: 0px;\n  outline: none;\n  padding: 0px;\n  touch-action: manipulation;\n}\n\nbody {\n  background-color: #fff;\n  font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: normal;\n  overflow-x: hidden;\n  position: relative;\n}\n\nimg, embed, object, video {\n  height: auto;\n  max-width: 100%;\n}\n\nform {\n  width: 100%;\n}\n\nspan {\n  word-wrap: break-word;\n}\n\nhr {\n  background: #ddd;\n  box-sizing: content-box;\n  height: 1px;\n  margin: 24px 0;\n  overflow: visible;\n  width: 100%;\n}\n\npre, code, kbd, samp {\n  font-family: Roboto Mono, monospace;\n}\n\n:focus {\n  outline: none;\n}\n\nhtml {\n  -webkit-text-size-adjust: 100%;\n}\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\npre {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\nabbr[title] {\n  border-bottom: none;\n  text-decoration: underline dotted;\n  text-decoration: underline;\n}\n\nb, strong {\n  font-weight: bolder;\n}\n\ncode, kbd, samp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\nsmall {\n  font-size: 80%;\n}\n\nsub, sup {\n  font-size: 75%;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\nimg {\n  border-style: none;\n}\n\nbutton, input, optgroup, select, textarea {\n  font-family: inherit;\n  font-size: 100%;\n  margin: 0px;\n}\n\nbutton, input {\n  overflow: visible;\n}\n\nbutton, select {\n  text-transform: none;\n}\n\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0px;\n}\n\nbutton:-moz-focusring, [type=\"button\"]:-moz-focusring, [type=\"reset\"]:-moz-focusring, [type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\nlegend {\n  box-sizing: border-box;\n  color: inherit;\n  display: table;\n  max-width: 100%;\n  padding: 0px;\n  white-space: normal;\n}\n\nprogress {\n  vertical-align: baseline;\n}\n\ntextarea {\n  overflow: auto;\n}\n\n[type=\"checkbox\"], [type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0px;\n}\n\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  outline-offset: -2px;\n}\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  font: inherit;\n}\n\ndetails {\n  display: block;\n}\n\nsummary {\n  display: list-item;\n}\n\ntemplate {\n  display: none;\n}\n\n[hidden] {\n  display: none;\n}\n\n*[contenteditable] {\n  user-select: text;\n}\n\ncode span {\n  white-space: pre-wrap;\n}\n\nmain {\n  background: orange;\n  display: block;\n}\n\n"
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
        "\nmain { background: orange none repeat scroll 0% 0%; display: block; }\na { background: transparent none repeat scroll 0% 0%; cursor: pointer; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; text-decoration: none; transition: all 0.4s ease 0s; width: 100px; }\nmeta { width: 100px; }\n* { background: transparent none repeat scroll 0% 0%; border: 0px none; box-sizing: border-box; font-size: 100%; margin: 0px; outline: currentcolor none medium; padding: 0px; touch-action: manipulation; }\nbody { background-color: rgb(255, 255, 255); font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif; font-size: 14px; font-style: normal; font-weight: normal; overflow-x: hidden; position: relative; }\nimg, embed, object, video { height: auto; max-width: 100%; }\nform { width: 100%; }\nspan { overflow-wrap: break-word; }\nhr { background: rgb(221, 221, 221) none repeat scroll 0% 0%; box-sizing: content-box; height: 1px; margin: 24px 0px; overflow: visible; width: 100%; }\npre, code, kbd, samp { font-family: Roboto Mono, monospace; }\n:focus { outline: currentcolor none medium; }\nhtml { }\nh1 { font-size: 2em; margin: 0.67em 0px; }\npre { font-family: monospace, monospace; font-size: 1em; }\nabbr[title] { border-bottom: medium none; text-decoration: underline; }\nb, strong { font-weight: bolder; }\ncode, kbd, samp { font-family: monospace, monospace; font-size: 1em; }\nsmall { font-size: 80%; }\nsub, sup { font-size: 75%; position: relative; vertical-align: baseline; }\nsub { bottom: -0.25em; }\nsup { top: -0.5em; }\nimg { border-style: none; }\nbutton, input, optgroup, select, textarea { font-family: inherit; font-size: 100%; margin: 0px; }\nbutton, input { overflow: visible; }\nbutton, select { text-transform: none; }\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] { appearance: button; }\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner { border-style: none; padding: 0px; }\nbutton:focus-visible, [type=\"button\"]:focus-visible, [type=\"reset\"]:focus-visible, [type=\"submit\"]:focus-visible { outline: buttontext dotted 1px; }\nfieldset { padding: 0.35em 0.75em 0.625em; }\nlegend { box-sizing: border-box; color: inherit; display: table; max-width: 100%; padding: 0px; white-space: normal; }\nprogress { vertical-align: baseline; }\ntextarea { overflow: auto; }\n[type=\"checkbox\"], [type=\"radio\"] { box-sizing: border-box; padding: 0px; }\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button { height: auto; }\n[type=\"search\"] { appearance: textfield; outline-offset: -2px; }\n[type=\"search\"]::-webkit-search-decoration { appearance: none; }\n::-webkit-file-upload-button { appearance: button; font: inherit; }\ndetails { display: block; }\nsummary { display: list-item; }\ntemplate { display: none; }\n[hidden] { display: none; }\n[contenteditable] { user-select: text; }\ncode span { white-space: pre-wrap; }",
        "\n\na {\n  background: #faa;\n  background-color: transparent;\n  cursor: pointer;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  text-decoration: none;\n  transition: all .4s ease;\n  width: 100px;\n}\n\nmeta {\n  width: 100px;\n}\n\n* {\n  background: transparent;\n  border: 0px;\n  box-sizing: border-box;\n  font-size: 100%;\n  margin: 0px;\n  outline: none;\n  padding: 0px;\n  touch-action: manipulation;\n}\n\nbody {\n  background-color: #fff;\n  font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: normal;\n  overflow-x: hidden;\n  position: relative;\n}\n\nimg, embed, object, video {\n  height: auto;\n  max-width: 100%;\n}\n\nform {\n  width: 100%;\n}\n\nspan {\n  word-wrap: break-word;\n}\n\nhr {\n  background: #ddd;\n  box-sizing: content-box;\n  height: 1px;\n  margin: 24px 0;\n  overflow: visible;\n  width: 100%;\n}\n\npre, code, kbd, samp {\n  font-family: Roboto Mono, monospace;\n}\n\n:focus {\n  outline: none;\n}\n\nhtml {\n  -webkit-text-size-adjust: 100%;\n}\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\npre {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\nabbr[title] {\n  border-bottom: none;\n  text-decoration: underline dotted;\n  text-decoration: underline;\n}\n\nb, strong {\n  font-weight: bolder;\n}\n\ncode, kbd, samp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\nsmall {\n  font-size: 80%;\n}\n\nsub, sup {\n  font-size: 75%;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\nimg {\n  border-style: none;\n}\n\nbutton, input, optgroup, select, textarea {\n  font-family: inherit;\n  font-size: 100%;\n  margin: 0px;\n}\n\nbutton, input {\n  overflow: visible;\n}\n\nbutton, select {\n  text-transform: none;\n}\n\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0px;\n}\n\nbutton:-moz-focusring, [type=\"button\"]:-moz-focusring, [type=\"reset\"]:-moz-focusring, [type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\nlegend {\n  box-sizing: border-box;\n  color: inherit;\n  display: table;\n  max-width: 100%;\n  padding: 0px;\n  white-space: normal;\n}\n\nprogress {\n  vertical-align: baseline;\n}\n\ntextarea {\n  overflow: auto;\n}\n\n[type=\"checkbox\"], [type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0px;\n}\n\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  outline-offset: -2px;\n}\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  font: inherit;\n}\n\ndetails {\n  display: block;\n}\n\nsummary {\n  display: list-item;\n}\n\ntemplate {\n  display: none;\n}\n\n[hidden] {\n  display: none;\n}\n\n*[contenteditable] {\n  user-select: text;\n}\n\ncode span {\n  white-space: pre-wrap;\n}\n\nmain {\n  background: orange;\n  display: block;\n}\n\n"
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
        "\nmain { background-color: orange; display: block; }\na { background-color: transparent; cursor: pointer; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; text-decoration: none; transition: all 0.4s ease 0s; width: 100px; }\nmeta { width: 100px; }\n* { background-color: transparent; border: 0px; box-sizing: border-box; font-size: 100%; margin: 0px; outline: none; padding: 0px; touch-action: manipulation; }\nbody { background-color: rgb(255, 255, 255); font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif; font-size: 14px; font-style: normal; font-weight: normal; overflow-x: hidden; position: relative; }\nimg, embed, object, video { height: auto; max-width: 100%; }\nform { width: 100%; }\nspan { word-wrap: break-word; }\nhr { background-color: rgb(221, 221, 221); box-sizing: content-box; height: 1px; margin: 24px 0px; overflow: visible; width: 100%; }\npre, code, kbd, samp { font-family: \"Roboto Mono\", monospace; }\n:focus { outline: none; }\nhtml { }\nh1 { font-size: 2em; margin: 0.67em 0px; }\npre { font-family: monospace, monospace; font-size: 1em; }\nabbr[title] { border-bottom-style: none; text-decoration: underline; }\nb, strong { font-weight: bolder; }\ncode, kbd, samp { font-family: monospace, monospace; font-size: 1em; }\nsmall { font-size: 80%; }\nsub, sup { font-size: 75%; position: relative; vertical-align: baseline; }\nsub { bottom: -0.25em; }\nsup { top: -0.5em; }\nimg { border-style: none; }\nbutton, input, optgroup, select, textarea { font-family: inherit; font-size: 100%; margin: 0px; }\nbutton, input { overflow: visible; }\nbutton, select { text-transform: none; }\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] { appearance: button; }\nfieldset { padding: 0.35em 0.75em 0.625em; }\nlegend { box-sizing: border-box; color: inherit; display: table; max-width: 100%; padding: 0px; white-space: normal; }\nprogress { vertical-align: baseline; }\ntextarea { overflow: auto; }\n[type=\"checkbox\"], [type=\"radio\"] { box-sizing: border-box; padding: 0px; }\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button { height: auto; }\n[type=\"search\"] { appearance: textfield; outline-offset: -2px; }\n[type=\"search\"]::-webkit-search-decoration { appearance: none; }\n::-webkit-file-upload-button { appearance: button; font-family: inherit; font-size: inherit; font-style: inherit; font-variant-caps: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; }\ndetails { display: block; }\nsummary { display: list-item; }\ntemplate { display: none; }\n[hidden] { display: none; }\n[contenteditable] { }\ncode span { white-space: pre-wrap; }",
        "\n\na {\n  background: #faa;\n  background-color: transparent;\n  cursor: pointer;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  text-decoration: none;\n  transition: all .4s ease;\n  width: 100px;\n}\n\nmeta {\n  width: 100px;\n}\n\n* {\n  background: transparent;\n  border: 0px;\n  box-sizing: border-box;\n  font-size: 100%;\n  margin: 0px;\n  outline: none;\n  padding: 0px;\n  touch-action: manipulation;\n}\n\nbody {\n  background-color: #fff;\n  font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: normal;\n  overflow-x: hidden;\n  position: relative;\n}\n\nimg, embed, object, video {\n  height: auto;\n  max-width: 100%;\n}\n\nform {\n  width: 100%;\n}\n\nspan {\n  word-wrap: break-word;\n}\n\nhr {\n  background: #ddd;\n  box-sizing: content-box;\n  height: 1px;\n  margin: 24px 0;\n  overflow: visible;\n  width: 100%;\n}\n\npre, code, kbd, samp {\n  font-family: Roboto Mono, monospace;\n}\n\n:focus {\n  outline: none;\n}\n\nhtml {\n  -webkit-text-size-adjust: 100%;\n}\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\npre {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\nabbr[title] {\n  border-bottom: none;\n  text-decoration: underline dotted;\n  text-decoration: underline;\n}\n\nb, strong {\n  font-weight: bolder;\n}\n\ncode, kbd, samp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\nsmall {\n  font-size: 80%;\n}\n\nsub, sup {\n  font-size: 75%;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\nimg {\n  border-style: none;\n}\n\nbutton, input, optgroup, select, textarea {\n  font-family: inherit;\n  font-size: 100%;\n  margin: 0px;\n}\n\nbutton, input {\n  overflow: visible;\n}\n\nbutton, select {\n  text-transform: none;\n}\n\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0px;\n}\n\nbutton:-moz-focusring, [type=\"button\"]:-moz-focusring, [type=\"reset\"]:-moz-focusring, [type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\nlegend {\n  box-sizing: border-box;\n  color: inherit;\n  display: table;\n  max-width: 100%;\n  padding: 0px;\n  white-space: normal;\n}\n\nprogress {\n  vertical-align: baseline;\n}\n\ntextarea {\n  overflow: auto;\n}\n\n[type=\"checkbox\"], [type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0px;\n}\n\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  outline-offset: -2px;\n}\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  font: inherit;\n}\n\ndetails {\n  display: block;\n}\n\nsummary {\n  display: list-item;\n}\n\ntemplate {\n  display: none;\n}\n\n[hidden] {\n  display: none;\n}\n\n*[contenteditable] {\n  user-select: text;\n}\n\ncode span {\n  white-space: pre-wrap;\n}\n\nmain {\n  background: orange;\n  display: block;\n}\n\n"
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
      "\n\na {\n  background: #faa;\n  background-color: transparent;\n  cursor: pointer;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  text-decoration: none;\n  transition: all .4s ease;\n  width: 100px;\n}\n\nmeta {\n  width: 100px;\n}\n\n* {\n  background: transparent;\n  border: 0px;\n  box-sizing: border-box;\n  font-size: 100%;\n  margin: 0px;\n  outline: none;\n  padding: 0px;\n  touch-action: manipulation;\n}\n\nbody {\n  background-color: #fff;\n  font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: normal;\n  overflow-x: hidden;\n  position: relative;\n}\n\nimg, embed, object, video {\n  height: auto;\n  max-width: 100%;\n}\n\nform {\n  width: 100%;\n}\n\nspan {\n  word-wrap: break-word;\n}\n\nhr {\n  background: #ddd;\n  box-sizing: content-box;\n  height: 1px;\n  margin: 24px 0;\n  overflow: visible;\n  width: 100%;\n}\n\npre, code, kbd, samp {\n  font-family: Roboto Mono, monospace;\n}\n\n:focus {\n  outline: none;\n}\n\nhtml {\n  -webkit-text-size-adjust: 100%;\n}\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\npre {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\nabbr[title] {\n  border-bottom: none;\n  text-decoration: underline dotted;\n  text-decoration: underline;\n}\n\nb, strong {\n  font-weight: bolder;\n}\n\ncode, kbd, samp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\nsmall {\n  font-size: 80%;\n}\n\nsub, sup {\n  font-size: 75%;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\nimg {\n  border-style: none;\n}\n\nbutton, input, optgroup, select, textarea {\n  font-family: inherit;\n  font-size: 100%;\n  margin: 0px;\n}\n\nbutton, input {\n  overflow: visible;\n}\n\nbutton, select {\n  text-transform: none;\n}\n\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0px;\n}\n\nbutton:-moz-focusring, [type=\"button\"]:-moz-focusring, [type=\"reset\"]:-moz-focusring, [type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\nlegend {\n  box-sizing: border-box;\n  color: inherit;\n  display: table;\n  max-width: 100%;\n  padding: 0px;\n  white-space: normal;\n}\n\nprogress {\n  vertical-align: baseline;\n}\n\ntextarea {\n  overflow: auto;\n}\n\n[type=\"checkbox\"], [type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0px;\n}\n\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  outline-offset: -2px;\n}\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  font: inherit;\n}\n\ndetails {\n  display: block;\n}\n\nsummary {\n  display: list-item;\n}\n\ntemplate {\n  display: none;\n}\n\n[hidden] {\n  display: none;\n}\n\n*[contenteditable] {\n  user-select: text;\n}\n\ncode span {\n  white-space: pre-wrap;\n}\n\nmain {\n  background: orange;\n  display: block;\n}\n\n"
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
        });

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
            "\nmain { background: orange; }\n* { background: transparent; border: 0px; box-sizing: border-box; font-size: 100%; margin: 0px; outline: none; padding: 0px; touch-action: manipulation; }\nbody { background-color: rgb(255, 255, 255); font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif; font-size: 14px; font-style: normal; font-weight: normal; overflow-x: hidden; position: relative; }\nimg, embed, object, video { height: auto; max-width: 100%; }\na { background: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }\nform { width: 100%; }\nspan { overflow-wrap: break-word; }\nhr { background: rgb(221, 221, 221); box-sizing: content-box; height: 1px; margin: 24px 0px; overflow: visible; width: 100%; }\npre, code, kbd, samp { font-family: \"Roboto Mono\", monospace; }\n:focus { outline: none; }\nhtml { text-size-adjust: 100%; }\nh1 { font-size: 2em; margin: 0.67em 0px; }\npre { font-family: monospace, monospace; font-size: 1em; }\nabbr[title] { border-bottom: none; text-decoration: underline; }\nb, strong { font-weight: bolder; }\ncode, kbd, samp { font-family: monospace, monospace; font-size: 1em; }\nsmall { font-size: 80%; }\nsub, sup { font-size: 75%; position: relative; vertical-align: baseline; }\nsub { bottom: -0.25em; }\nsup { top: -0.5em; }\nimg { border-style: none; }\nbutton, input, optgroup, select, textarea { font-family: inherit; font-size: 100%; margin: 0px; }\nbutton, input { overflow: visible; }\nbutton, select { text-transform: none; }\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] { appearance: button; }\nfieldset { padding: 0.35em 0.75em 0.625em; }\nlegend { box-sizing: border-box; color: inherit; display: table; max-width: 100%; padding: 0px; white-space: normal; }\nprogress { vertical-align: baseline; }\ntextarea { overflow: auto; }\n[type=\"checkbox\"], [type=\"radio\"] { box-sizing: border-box; padding: 0px; }\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button { height: auto; }\n[type=\"search\"] { appearance: textfield; outline-offset: -2px; }\n[type=\"search\"]::-webkit-search-decoration { appearance: none; }\n::-webkit-file-upload-button { appearance: button; font: inherit; }\ndetails { display: block; }\nsummary { display: list-item; }\ntemplate { display: none; }\n[hidden] { display: none; }\nmeta { width: 100px; }\n[contenteditable] { user-select: text; }\ncode span { white-space: pre-wrap; }",
            "\n\n* {\n  background: transparent;\n  border: 0px;\n  box-sizing: border-box;\n  font-size: 100%;\n  margin: 0px;\n  outline: none;\n  padding: 0px;\n  touch-action: manipulation;\n}\n\nbody {\n  background-color: #fff;\n  font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: normal;\n  overflow-x: hidden;\n  position: relative;\n}\n\nimg, embed, object, video {\n  height: auto;\n  max-width: 100%;\n}\n\na {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\nform {\n  width: 100%;\n}\n\nspan {\n  word-wrap: break-word;\n}\n\nhr {\n  background: #ddd;\n  box-sizing: content-box;\n  height: 1px;\n  margin: 24px 0;\n  overflow: visible;\n  width: 100%;\n}\n\npre, code, kbd, samp {\n  font-family: Roboto Mono, monospace;\n}\n\n:focus {\n  outline: none;\n}\n\nhtml {\n  -webkit-text-size-adjust: 100%;\n}\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\npre {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\nabbr[title] {\n  border-bottom: none;\n  text-decoration: underline dotted;\n  text-decoration: underline;\n}\n\nb, strong {\n  font-weight: bolder;\n}\n\ncode, kbd, samp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\nsmall {\n  font-size: 80%;\n}\n\nsub, sup {\n  font-size: 75%;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\nimg {\n  border-style: none;\n}\n\nbutton, input, optgroup, select, textarea {\n  font-family: inherit;\n  font-size: 100%;\n  margin: 0px;\n}\n\nbutton, input {\n  overflow: visible;\n}\n\nbutton, select {\n  text-transform: none;\n}\n\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0px;\n}\n\nbutton:-moz-focusring, [type=\"button\"]:-moz-focusring, [type=\"reset\"]:-moz-focusring, [type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\nlegend {\n  box-sizing: border-box;\n  color: inherit;\n  display: table;\n  max-width: 100%;\n  padding: 0px;\n  white-space: normal;\n}\n\nprogress {\n  vertical-align: baseline;\n}\n\ntextarea {\n  overflow: auto;\n}\n\n[type=\"checkbox\"], [type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0px;\n}\n\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  outline-offset: -2px;\n}\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  font: inherit;\n}\n\ndetails {\n  display: block;\n}\n\nsummary {\n  display: list-item;\n}\n\ntemplate {\n  display: none;\n}\n\n[hidden] {\n  display: none;\n}\n\nmeta {\n  width: 100px;\n}\n\n*[contenteditable] {\n  user-select: text;\n}\n\ncode span {\n  white-space: pre-wrap;\n}\n\nmain {\n  background: orange;\n}\n\n"
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
            "\nmain { background: orange none repeat scroll 0% 0%; }\n* { background: transparent none repeat scroll 0% 0%; border: 0px none; box-sizing: border-box; font-size: 100%; margin: 0px; outline: currentcolor none medium; padding: 0px; touch-action: manipulation; }\nbody { background-color: rgb(255, 255, 255); font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif; font-size: 14px; font-style: normal; font-weight: normal; overflow-x: hidden; position: relative; }\nimg, embed, object, video { height: auto; max-width: 100%; }\na { background: rgb(255, 170, 170) none repeat scroll 0% 0%; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }\nform { width: 100%; }\nspan { overflow-wrap: break-word; }\nhr { background: rgb(221, 221, 221) none repeat scroll 0% 0%; box-sizing: content-box; height: 1px; margin: 24px 0px; overflow: visible; width: 100%; }\npre, code, kbd, samp { font-family: Roboto Mono, monospace; }\n:focus { outline: currentcolor none medium; }\nhtml { }\nh1 { font-size: 2em; margin: 0.67em 0px; }\npre { font-family: monospace, monospace; font-size: 1em; }\nabbr[title] { border-bottom: medium none; text-decoration: underline; }\nb, strong { font-weight: bolder; }\ncode, kbd, samp { font-family: monospace, monospace; font-size: 1em; }\nsmall { font-size: 80%; }\nsub, sup { font-size: 75%; position: relative; vertical-align: baseline; }\nsub { bottom: -0.25em; }\nsup { top: -0.5em; }\nimg { border-style: none; }\nbutton, input, optgroup, select, textarea { font-family: inherit; font-size: 100%; margin: 0px; }\nbutton, input { overflow: visible; }\nbutton, select { text-transform: none; }\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] { appearance: button; }\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner { border-style: none; padding: 0px; }\nbutton:focus-visible, [type=\"button\"]:focus-visible, [type=\"reset\"]:focus-visible, [type=\"submit\"]:focus-visible { outline: buttontext dotted 1px; }\nfieldset { padding: 0.35em 0.75em 0.625em; }\nlegend { box-sizing: border-box; color: inherit; display: table; max-width: 100%; padding: 0px; white-space: normal; }\nprogress { vertical-align: baseline; }\ntextarea { overflow: auto; }\n[type=\"checkbox\"], [type=\"radio\"] { box-sizing: border-box; padding: 0px; }\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button { height: auto; }\n[type=\"search\"] { appearance: textfield; outline-offset: -2px; }\n[type=\"search\"]::-webkit-search-decoration { appearance: none; }\n::-webkit-file-upload-button { appearance: button; font: inherit; }\ndetails { display: block; }\nsummary { display: list-item; }\ntemplate { display: none; }\n[hidden] { display: none; }\nmeta { width: 100px; }\n[contenteditable] { user-select: text; }\ncode span { white-space: pre-wrap; }",
            "\n\n* {\n  background: transparent;\n  border: 0px;\n  box-sizing: border-box;\n  font-size: 100%;\n  margin: 0px;\n  outline: none;\n  padding: 0px;\n  touch-action: manipulation;\n}\n\nbody {\n  background-color: #fff;\n  font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: normal;\n  overflow-x: hidden;\n  position: relative;\n}\n\nimg, embed, object, video {\n  height: auto;\n  max-width: 100%;\n}\n\na {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\nform {\n  width: 100%;\n}\n\nspan {\n  word-wrap: break-word;\n}\n\nhr {\n  background: #ddd;\n  box-sizing: content-box;\n  height: 1px;\n  margin: 24px 0;\n  overflow: visible;\n  width: 100%;\n}\n\npre, code, kbd, samp {\n  font-family: Roboto Mono, monospace;\n}\n\n:focus {\n  outline: none;\n}\n\nhtml {\n  -webkit-text-size-adjust: 100%;\n}\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\npre {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\nabbr[title] {\n  border-bottom: none;\n  text-decoration: underline dotted;\n  text-decoration: underline;\n}\n\nb, strong {\n  font-weight: bolder;\n}\n\ncode, kbd, samp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\nsmall {\n  font-size: 80%;\n}\n\nsub, sup {\n  font-size: 75%;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\nimg {\n  border-style: none;\n}\n\nbutton, input, optgroup, select, textarea {\n  font-family: inherit;\n  font-size: 100%;\n  margin: 0px;\n}\n\nbutton, input {\n  overflow: visible;\n}\n\nbutton, select {\n  text-transform: none;\n}\n\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0px;\n}\n\nbutton:-moz-focusring, [type=\"button\"]:-moz-focusring, [type=\"reset\"]:-moz-focusring, [type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\nlegend {\n  box-sizing: border-box;\n  color: inherit;\n  display: table;\n  max-width: 100%;\n  padding: 0px;\n  white-space: normal;\n}\n\nprogress {\n  vertical-align: baseline;\n}\n\ntextarea {\n  overflow: auto;\n}\n\n[type=\"checkbox\"], [type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0px;\n}\n\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  outline-offset: -2px;\n}\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  font: inherit;\n}\n\ndetails {\n  display: block;\n}\n\nsummary {\n  display: list-item;\n}\n\ntemplate {\n  display: none;\n}\n\n[hidden] {\n  display: none;\n}\n\nmeta {\n  width: 100px;\n}\n\n*[contenteditable] {\n  user-select: text;\n}\n\ncode span {\n  white-space: pre-wrap;\n}\n\nmain {\n  background: orange;\n}\n\n"
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
            "\nmain { background-color: orange; }\n* { background-color: transparent; border: 0px; box-sizing: border-box; font-size: 100%; margin: 0px; outline: none; padding: 0px; touch-action: manipulation; }\nbody { background-color: rgb(255, 255, 255); font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif; font-size: 14px; font-style: normal; font-weight: normal; overflow-x: hidden; position: relative; }\nimg, embed, object, video { height: auto; max-width: 100%; }\na { background-color: rgb(255, 170, 170); float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; transition: all 0.4s ease 0s; width: 100px; }\nform { width: 100%; }\nspan { word-wrap: break-word; }\nhr { background-color: rgb(221, 221, 221); box-sizing: content-box; height: 1px; margin: 24px 0px; overflow: visible; width: 100%; }\npre, code, kbd, samp { font-family: \"Roboto Mono\", monospace; }\n:focus { outline: none; }\nhtml { }\nh1 { font-size: 2em; margin: 0.67em 0px; }\npre { font-family: monospace, monospace; font-size: 1em; }\nabbr[title] { border-bottom-style: none; text-decoration: underline; }\nb, strong { font-weight: bolder; }\ncode, kbd, samp { font-family: monospace, monospace; font-size: 1em; }\nsmall { font-size: 80%; }\nsub, sup { font-size: 75%; position: relative; vertical-align: baseline; }\nsub { bottom: -0.25em; }\nsup { top: -0.5em; }\nimg { border-style: none; }\nbutton, input, optgroup, select, textarea { font-family: inherit; font-size: 100%; margin: 0px; }\nbutton, input { overflow: visible; }\nbutton, select { text-transform: none; }\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] { appearance: button; }\nfieldset { padding: 0.35em 0.75em 0.625em; }\nlegend { box-sizing: border-box; color: inherit; display: table; max-width: 100%; padding: 0px; white-space: normal; }\nprogress { vertical-align: baseline; }\ntextarea { overflow: auto; }\n[type=\"checkbox\"], [type=\"radio\"] { box-sizing: border-box; padding: 0px; }\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button { height: auto; }\n[type=\"search\"] { appearance: textfield; outline-offset: -2px; }\n[type=\"search\"]::-webkit-search-decoration { appearance: none; }\n::-webkit-file-upload-button { appearance: button; font-family: inherit; font-size: inherit; font-style: inherit; font-variant-caps: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; }\ndetails { display: block; }\nsummary { display: list-item; }\ntemplate { display: none; }\n[hidden] { display: none; }\nmeta { width: 100px; }\n[contenteditable] { }\ncode span { white-space: pre-wrap; }",
            "\n\n* {\n  background: transparent;\n  border: 0px;\n  box-sizing: border-box;\n  font-size: 100%;\n  margin: 0px;\n  outline: none;\n  padding: 0px;\n  touch-action: manipulation;\n}\n\nbody {\n  background-color: #fff;\n  font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: normal;\n  overflow-x: hidden;\n  position: relative;\n}\n\nimg, embed, object, video {\n  height: auto;\n  max-width: 100%;\n}\n\na {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\nform {\n  width: 100%;\n}\n\nspan {\n  word-wrap: break-word;\n}\n\nhr {\n  background: #ddd;\n  box-sizing: content-box;\n  height: 1px;\n  margin: 24px 0;\n  overflow: visible;\n  width: 100%;\n}\n\npre, code, kbd, samp {\n  font-family: Roboto Mono, monospace;\n}\n\n:focus {\n  outline: none;\n}\n\nhtml {\n  -webkit-text-size-adjust: 100%;\n}\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\npre {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\nabbr[title] {\n  border-bottom: none;\n  text-decoration: underline dotted;\n  text-decoration: underline;\n}\n\nb, strong {\n  font-weight: bolder;\n}\n\ncode, kbd, samp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\nsmall {\n  font-size: 80%;\n}\n\nsub, sup {\n  font-size: 75%;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\nimg {\n  border-style: none;\n}\n\nbutton, input, optgroup, select, textarea {\n  font-family: inherit;\n  font-size: 100%;\n  margin: 0px;\n}\n\nbutton, input {\n  overflow: visible;\n}\n\nbutton, select {\n  text-transform: none;\n}\n\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0px;\n}\n\nbutton:-moz-focusring, [type=\"button\"]:-moz-focusring, [type=\"reset\"]:-moz-focusring, [type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\nlegend {\n  box-sizing: border-box;\n  color: inherit;\n  display: table;\n  max-width: 100%;\n  padding: 0px;\n  white-space: normal;\n}\n\nprogress {\n  vertical-align: baseline;\n}\n\ntextarea {\n  overflow: auto;\n}\n\n[type=\"checkbox\"], [type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0px;\n}\n\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  outline-offset: -2px;\n}\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  font: inherit;\n}\n\ndetails {\n  display: block;\n}\n\nsummary {\n  display: list-item;\n}\n\ntemplate {\n  display: none;\n}\n\n[hidden] {\n  display: none;\n}\n\nmeta {\n  width: 100px;\n}\n\n*[contenteditable] {\n  user-select: text;\n}\n\ncode span {\n  white-space: pre-wrap;\n}\n\nmain {\n  background: orange;\n}\n\n"
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
          "\n\n* {\n  background: transparent;\n  border: 0px;\n  box-sizing: border-box;\n  font-size: 100%;\n  margin: 0px;\n  outline: none;\n  padding: 0px;\n  touch-action: manipulation;\n}\n\nbody {\n  background-color: #fff;\n  font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: normal;\n  overflow-x: hidden;\n  position: relative;\n}\n\nimg, embed, object, video {\n  height: auto;\n  max-width: 100%;\n}\n\na {\n  background: #faa;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  transition: all .4s ease;\n  width: 100px;\n}\n\nform {\n  width: 100%;\n}\n\nspan {\n  word-wrap: break-word;\n}\n\nhr {\n  background: #ddd;\n  box-sizing: content-box;\n  height: 1px;\n  margin: 24px 0;\n  overflow: visible;\n  width: 100%;\n}\n\npre, code, kbd, samp {\n  font-family: Roboto Mono, monospace;\n}\n\n:focus {\n  outline: none;\n}\n\nhtml {\n  -webkit-text-size-adjust: 100%;\n}\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\npre {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\nabbr[title] {\n  border-bottom: none;\n  text-decoration: underline dotted;\n  text-decoration: underline;\n}\n\nb, strong {\n  font-weight: bolder;\n}\n\ncode, kbd, samp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\nsmall {\n  font-size: 80%;\n}\n\nsub, sup {\n  font-size: 75%;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\nimg {\n  border-style: none;\n}\n\nbutton, input, optgroup, select, textarea {\n  font-family: inherit;\n  font-size: 100%;\n  margin: 0px;\n}\n\nbutton, input {\n  overflow: visible;\n}\n\nbutton, select {\n  text-transform: none;\n}\n\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0px;\n}\n\nbutton:-moz-focusring, [type=\"button\"]:-moz-focusring, [type=\"reset\"]:-moz-focusring, [type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\nlegend {\n  box-sizing: border-box;\n  color: inherit;\n  display: table;\n  max-width: 100%;\n  padding: 0px;\n  white-space: normal;\n}\n\nprogress {\n  vertical-align: baseline;\n}\n\ntextarea {\n  overflow: auto;\n}\n\n[type=\"checkbox\"], [type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0px;\n}\n\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  outline-offset: -2px;\n}\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  font: inherit;\n}\n\ndetails {\n  display: block;\n}\n\nsummary {\n  display: list-item;\n}\n\ntemplate {\n  display: none;\n}\n\n[hidden] {\n  display: none;\n}\n\nmeta {\n  width: 100px;\n}\n\n*[contenteditable] {\n  user-select: text;\n}\n\ncode span {\n  white-space: pre-wrap;\n}\n\nmain {\n  background: orange;\n}\n\n"
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
        });

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
            "\nmain { background: orange; display: block; }\na { background: transparent; cursor: pointer; float: left; margin: 0px 14px 4px 41px; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; text-decoration: none; transition: all 0.4s ease 0s; width: 100px; }\nmeta { width: 100px; }\n* { background: transparent; border: 0px; box-sizing: border-box; font-size: 100%; margin: 0px; outline: none; padding: 0px; touch-action: manipulation; }\nbody { background-color: rgb(255, 255, 255); font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif; font-size: 14px; font-style: normal; font-weight: normal; overflow-x: hidden; position: relative; }\nimg, embed, object, video { height: auto; max-width: 100%; }\nform { width: 100%; }\nspan { overflow-wrap: break-word; }\nhr { background: rgb(221, 221, 221); box-sizing: content-box; height: 1px; margin: 24px 0px; overflow: visible; width: 100%; }\npre, code, kbd, samp { font-family: \"Roboto Mono\", monospace; }\n:focus { outline: none; }\nhtml { text-size-adjust: 100%; }\nh1 { font-size: 2em; margin: 0.67em 0px; }\npre { font-family: monospace, monospace; font-size: 1em; }\nabbr[title] { border-bottom: none; text-decoration: underline; }\nb, strong { font-weight: bolder; }\ncode, kbd, samp { font-family: monospace, monospace; font-size: 1em; }\nsmall { font-size: 80%; }\nsub, sup { font-size: 75%; position: relative; vertical-align: baseline; }\nsub { bottom: -0.25em; }\nsup { top: -0.5em; }\nimg { border-style: none; }\nbutton, input, optgroup, select, textarea { font-family: inherit; font-size: 100%; margin: 0px; }\nbutton, input { overflow: visible; }\nbutton, select { text-transform: none; }\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] { appearance: button; }\nfieldset { padding: 0.35em 0.75em 0.625em; }\nlegend { box-sizing: border-box; color: inherit; display: table; max-width: 100%; padding: 0px; white-space: normal; }\nprogress { vertical-align: baseline; }\ntextarea { overflow: auto; }\n[type=\"checkbox\"], [type=\"radio\"] { box-sizing: border-box; padding: 0px; }\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button { height: auto; }\n[type=\"search\"] { appearance: textfield; outline-offset: -2px; }\n[type=\"search\"]::-webkit-search-decoration { appearance: none; }\n::-webkit-file-upload-button { appearance: button; font: inherit; }\ndetails { display: block; }\nsummary { display: list-item; }\ntemplate { display: none; }\n[hidden] { display: none; }\n[contenteditable] { user-select: text; }\ncode span { white-space: pre-wrap; }",
            "\n\na {\n  background: #faa;\n  background-color: transparent;\n  cursor: pointer;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  text-decoration: none;\n  transition: all .4s ease;\n  width: 100px;\n}\n\nmeta {\n  width: 100px;\n}\n\n* {\n  background: transparent;\n  border: 0px;\n  box-sizing: border-box;\n  font-size: 100%;\n  margin: 0px;\n  outline: none;\n  padding: 0px;\n  touch-action: manipulation;\n}\n\nbody {\n  background-color: #fff;\n  font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: normal;\n  overflow-x: hidden;\n  position: relative;\n}\n\nimg, embed, object, video {\n  height: auto;\n  max-width: 100%;\n}\n\nform {\n  width: 100%;\n}\n\nspan {\n  word-wrap: break-word;\n}\n\nhr {\n  background: #ddd;\n  box-sizing: content-box;\n  height: 1px;\n  margin: 24px 0;\n  overflow: visible;\n  width: 100%;\n}\n\npre, code, kbd, samp {\n  font-family: Roboto Mono, monospace;\n}\n\n:focus {\n  outline: none;\n}\n\nhtml {\n  -webkit-text-size-adjust: 100%;\n}\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\npre {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\nabbr[title] {\n  border-bottom: none;\n  text-decoration: underline dotted;\n  text-decoration: underline;\n}\n\nb, strong {\n  font-weight: bolder;\n}\n\ncode, kbd, samp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\nsmall {\n  font-size: 80%;\n}\n\nsub, sup {\n  font-size: 75%;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\nimg {\n  border-style: none;\n}\n\nbutton, input, optgroup, select, textarea {\n  font-family: inherit;\n  font-size: 100%;\n  margin: 0px;\n}\n\nbutton, input {\n  overflow: visible;\n}\n\nbutton, select {\n  text-transform: none;\n}\n\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0px;\n}\n\nbutton:-moz-focusring, [type=\"button\"]:-moz-focusring, [type=\"reset\"]:-moz-focusring, [type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\nlegend {\n  box-sizing: border-box;\n  color: inherit;\n  display: table;\n  max-width: 100%;\n  padding: 0px;\n  white-space: normal;\n}\n\nprogress {\n  vertical-align: baseline;\n}\n\ntextarea {\n  overflow: auto;\n}\n\n[type=\"checkbox\"], [type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0px;\n}\n\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  outline-offset: -2px;\n}\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  font: inherit;\n}\n\ndetails {\n  display: block;\n}\n\nsummary {\n  display: list-item;\n}\n\ntemplate {\n  display: none;\n}\n\n[hidden] {\n  display: none;\n}\n\n*[contenteditable] {\n  user-select: text;\n}\n\ncode span {\n  white-space: pre-wrap;\n}\n\nmain {\n  background: orange;\n  display: block;\n}\n\n"
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
            "\nmain { background: orange none repeat scroll 0% 0%; display: block; }\na { background: transparent none repeat scroll 0% 0%; cursor: pointer; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; mask-position: 40% 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; text-decoration: none; transition: all 0.4s ease 0s; width: 100px; }\nmeta { width: 100px; }\n* { background: transparent none repeat scroll 0% 0%; border: 0px none; box-sizing: border-box; font-size: 100%; margin: 0px; outline: currentcolor none medium; padding: 0px; touch-action: manipulation; }\nbody { background-color: rgb(255, 255, 255); font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif; font-size: 14px; font-style: normal; font-weight: normal; overflow-x: hidden; position: relative; }\nimg, embed, object, video { height: auto; max-width: 100%; }\nform { width: 100%; }\nspan { overflow-wrap: break-word; }\nhr { background: rgb(221, 221, 221) none repeat scroll 0% 0%; box-sizing: content-box; height: 1px; margin: 24px 0px; overflow: visible; width: 100%; }\npre, code, kbd, samp { font-family: Roboto Mono, monospace; }\n:focus { outline: currentcolor none medium; }\nhtml { }\nh1 { font-size: 2em; margin: 0.67em 0px; }\npre { font-family: monospace, monospace; font-size: 1em; }\nabbr[title] { border-bottom: medium none; text-decoration: underline; }\nb, strong { font-weight: bolder; }\ncode, kbd, samp { font-family: monospace, monospace; font-size: 1em; }\nsmall { font-size: 80%; }\nsub, sup { font-size: 75%; position: relative; vertical-align: baseline; }\nsub { bottom: -0.25em; }\nsup { top: -0.5em; }\nimg { border-style: none; }\nbutton, input, optgroup, select, textarea { font-family: inherit; font-size: 100%; margin: 0px; }\nbutton, input { overflow: visible; }\nbutton, select { text-transform: none; }\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] { appearance: button; }\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner { border-style: none; padding: 0px; }\nbutton:focus-visible, [type=\"button\"]:focus-visible, [type=\"reset\"]:focus-visible, [type=\"submit\"]:focus-visible { outline: buttontext dotted 1px; }\nfieldset { padding: 0.35em 0.75em 0.625em; }\nlegend { box-sizing: border-box; color: inherit; display: table; max-width: 100%; padding: 0px; white-space: normal; }\nprogress { vertical-align: baseline; }\ntextarea { overflow: auto; }\n[type=\"checkbox\"], [type=\"radio\"] { box-sizing: border-box; padding: 0px; }\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button { height: auto; }\n[type=\"search\"] { appearance: textfield; outline-offset: -2px; }\n[type=\"search\"]::-webkit-search-decoration { appearance: none; }\n::-webkit-file-upload-button { appearance: button; font: inherit; }\ndetails { display: block; }\nsummary { display: list-item; }\ntemplate { display: none; }\n[hidden] { display: none; }\n[contenteditable] { user-select: text; }\ncode span { white-space: pre-wrap; }",
            "\n\na {\n  background: #faa;\n  background-color: transparent;\n  cursor: pointer;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  text-decoration: none;\n  transition: all .4s ease;\n  width: 100px;\n}\n\nmeta {\n  width: 100px;\n}\n\n* {\n  background: transparent;\n  border: 0px;\n  box-sizing: border-box;\n  font-size: 100%;\n  margin: 0px;\n  outline: none;\n  padding: 0px;\n  touch-action: manipulation;\n}\n\nbody {\n  background-color: #fff;\n  font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: normal;\n  overflow-x: hidden;\n  position: relative;\n}\n\nimg, embed, object, video {\n  height: auto;\n  max-width: 100%;\n}\n\nform {\n  width: 100%;\n}\n\nspan {\n  word-wrap: break-word;\n}\n\nhr {\n  background: #ddd;\n  box-sizing: content-box;\n  height: 1px;\n  margin: 24px 0;\n  overflow: visible;\n  width: 100%;\n}\n\npre, code, kbd, samp {\n  font-family: Roboto Mono, monospace;\n}\n\n:focus {\n  outline: none;\n}\n\nhtml {\n  -webkit-text-size-adjust: 100%;\n}\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\npre {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\nabbr[title] {\n  border-bottom: none;\n  text-decoration: underline dotted;\n  text-decoration: underline;\n}\n\nb, strong {\n  font-weight: bolder;\n}\n\ncode, kbd, samp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\nsmall {\n  font-size: 80%;\n}\n\nsub, sup {\n  font-size: 75%;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\nimg {\n  border-style: none;\n}\n\nbutton, input, optgroup, select, textarea {\n  font-family: inherit;\n  font-size: 100%;\n  margin: 0px;\n}\n\nbutton, input {\n  overflow: visible;\n}\n\nbutton, select {\n  text-transform: none;\n}\n\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0px;\n}\n\nbutton:-moz-focusring, [type=\"button\"]:-moz-focusring, [type=\"reset\"]:-moz-focusring, [type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\nlegend {\n  box-sizing: border-box;\n  color: inherit;\n  display: table;\n  max-width: 100%;\n  padding: 0px;\n  white-space: normal;\n}\n\nprogress {\n  vertical-align: baseline;\n}\n\ntextarea {\n  overflow: auto;\n}\n\n[type=\"checkbox\"], [type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0px;\n}\n\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  outline-offset: -2px;\n}\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  font: inherit;\n}\n\ndetails {\n  display: block;\n}\n\nsummary {\n  display: list-item;\n}\n\ntemplate {\n  display: none;\n}\n\n[hidden] {\n  display: none;\n}\n\n*[contenteditable] {\n  user-select: text;\n}\n\ncode span {\n  white-space: pre-wrap;\n}\n\nmain {\n  background: orange;\n  display: block;\n}\n\n"
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
            "\nmain { background-color: orange; display: block; }\na { background-color: transparent; cursor: pointer; float: left; margin: 0px 14px 4px 41px; mask-image: linear-gradient(rgb(0, 0, 0), transparent); mask-origin: inherit; -webkit-mask-position-x: 40%; -webkit-mask-position-y: 74%; max-width: 100px; padding: 40px 40px 40px 41px; position: sticky; text-decoration: none; transition: all 0.4s ease 0s; width: 100px; }\nmeta { width: 100px; }\n* { background-color: transparent; border: 0px; box-sizing: border-box; font-size: 100%; margin: 0px; outline: none; padding: 0px; touch-action: manipulation; }\nbody { background-color: rgb(255, 255, 255); font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif; font-size: 14px; font-style: normal; font-weight: normal; overflow-x: hidden; position: relative; }\nimg, embed, object, video { height: auto; max-width: 100%; }\nform { width: 100%; }\nspan { word-wrap: break-word; }\nhr { background-color: rgb(221, 221, 221); box-sizing: content-box; height: 1px; margin: 24px 0px; overflow: visible; width: 100%; }\npre, code, kbd, samp { font-family: \"Roboto Mono\", monospace; }\n:focus { outline: none; }\nhtml { }\nh1 { font-size: 2em; margin: 0.67em 0px; }\npre { font-family: monospace, monospace; font-size: 1em; }\nabbr[title] { border-bottom-style: none; text-decoration: underline; }\nb, strong { font-weight: bolder; }\ncode, kbd, samp { font-family: monospace, monospace; font-size: 1em; }\nsmall { font-size: 80%; }\nsub, sup { font-size: 75%; position: relative; vertical-align: baseline; }\nsub { bottom: -0.25em; }\nsup { top: -0.5em; }\nimg { border-style: none; }\nbutton, input, optgroup, select, textarea { font-family: inherit; font-size: 100%; margin: 0px; }\nbutton, input { overflow: visible; }\nbutton, select { text-transform: none; }\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] { appearance: button; }\nfieldset { padding: 0.35em 0.75em 0.625em; }\nlegend { box-sizing: border-box; color: inherit; display: table; max-width: 100%; padding: 0px; white-space: normal; }\nprogress { vertical-align: baseline; }\ntextarea { overflow: auto; }\n[type=\"checkbox\"], [type=\"radio\"] { box-sizing: border-box; padding: 0px; }\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button { height: auto; }\n[type=\"search\"] { appearance: textfield; outline-offset: -2px; }\n[type=\"search\"]::-webkit-search-decoration { appearance: none; }\n::-webkit-file-upload-button { appearance: button; font-family: inherit; font-size: inherit; font-style: inherit; font-variant-caps: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; }\ndetails { display: block; }\nsummary { display: list-item; }\ntemplate { display: none; }\n[hidden] { display: none; }\n[contenteditable] { }\ncode span { white-space: pre-wrap; }",
            "\n\na {\n  background: #faa;\n  background-color: transparent;\n  cursor: pointer;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  text-decoration: none;\n  transition: all .4s ease;\n  width: 100px;\n}\n\nmeta {\n  width: 100px;\n}\n\n* {\n  background: transparent;\n  border: 0px;\n  box-sizing: border-box;\n  font-size: 100%;\n  margin: 0px;\n  outline: none;\n  padding: 0px;\n  touch-action: manipulation;\n}\n\nbody {\n  background-color: #fff;\n  font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: normal;\n  overflow-x: hidden;\n  position: relative;\n}\n\nimg, embed, object, video {\n  height: auto;\n  max-width: 100%;\n}\n\nform {\n  width: 100%;\n}\n\nspan {\n  word-wrap: break-word;\n}\n\nhr {\n  background: #ddd;\n  box-sizing: content-box;\n  height: 1px;\n  margin: 24px 0;\n  overflow: visible;\n  width: 100%;\n}\n\npre, code, kbd, samp {\n  font-family: Roboto Mono, monospace;\n}\n\n:focus {\n  outline: none;\n}\n\nhtml {\n  -webkit-text-size-adjust: 100%;\n}\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\npre {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\nabbr[title] {\n  border-bottom: none;\n  text-decoration: underline dotted;\n  text-decoration: underline;\n}\n\nb, strong {\n  font-weight: bolder;\n}\n\ncode, kbd, samp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\nsmall {\n  font-size: 80%;\n}\n\nsub, sup {\n  font-size: 75%;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\nimg {\n  border-style: none;\n}\n\nbutton, input, optgroup, select, textarea {\n  font-family: inherit;\n  font-size: 100%;\n  margin: 0px;\n}\n\nbutton, input {\n  overflow: visible;\n}\n\nbutton, select {\n  text-transform: none;\n}\n\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0px;\n}\n\nbutton:-moz-focusring, [type=\"button\"]:-moz-focusring, [type=\"reset\"]:-moz-focusring, [type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\nlegend {\n  box-sizing: border-box;\n  color: inherit;\n  display: table;\n  max-width: 100%;\n  padding: 0px;\n  white-space: normal;\n}\n\nprogress {\n  vertical-align: baseline;\n}\n\ntextarea {\n  overflow: auto;\n}\n\n[type=\"checkbox\"], [type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0px;\n}\n\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  outline-offset: -2px;\n}\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  font: inherit;\n}\n\ndetails {\n  display: block;\n}\n\nsummary {\n  display: list-item;\n}\n\ntemplate {\n  display: none;\n}\n\n[hidden] {\n  display: none;\n}\n\n*[contenteditable] {\n  user-select: text;\n}\n\ncode span {\n  white-space: pre-wrap;\n}\n\nmain {\n  background: orange;\n  display: block;\n}\n\n"
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
          "\n\na {\n  background: #faa;\n  background-color: transparent;\n  cursor: pointer;\n  float: left;\n  margin: 0 14px 4px 40px;\n  margin-left: 41px;\n  mask-image: linear-gradient(rgba(0, 0, 0, 1.0), transparent);\n  mask-origin: inherit;\n  mask-position: 40% 74%;\n  max-width: 100px;\n  padding: 40px;\n  padding-left: 41px;\n  position: sticky;\n  text-decoration: none;\n  transition: all .4s ease;\n  width: 100px;\n}\n\nmeta {\n  width: 100px;\n}\n\n* {\n  background: transparent;\n  border: 0px;\n  box-sizing: border-box;\n  font-size: 100%;\n  margin: 0px;\n  outline: none;\n  padding: 0px;\n  touch-action: manipulation;\n}\n\nbody {\n  background-color: #fff;\n  font-family: Roboto, Helvetica, \"Helvetica Neue\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", sans-serif;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: normal;\n  overflow-x: hidden;\n  position: relative;\n}\n\nimg, embed, object, video {\n  height: auto;\n  max-width: 100%;\n}\n\nform {\n  width: 100%;\n}\n\nspan {\n  word-wrap: break-word;\n}\n\nhr {\n  background: #ddd;\n  box-sizing: content-box;\n  height: 1px;\n  margin: 24px 0;\n  overflow: visible;\n  width: 100%;\n}\n\npre, code, kbd, samp {\n  font-family: Roboto Mono, monospace;\n}\n\n:focus {\n  outline: none;\n}\n\nhtml {\n  -webkit-text-size-adjust: 100%;\n}\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\npre {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\nabbr[title] {\n  border-bottom: none;\n  text-decoration: underline dotted;\n  text-decoration: underline;\n}\n\nb, strong {\n  font-weight: bolder;\n}\n\ncode, kbd, samp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\nsmall {\n  font-size: 80%;\n}\n\nsub, sup {\n  font-size: 75%;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\nimg {\n  border-style: none;\n}\n\nbutton, input, optgroup, select, textarea {\n  font-family: inherit;\n  font-size: 100%;\n  margin: 0px;\n}\n\nbutton, input {\n  overflow: visible;\n}\n\nbutton, select {\n  text-transform: none;\n}\n\nbutton, [type=\"button\"], [type=\"reset\"], [type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0px;\n}\n\nbutton:-moz-focusring, [type=\"button\"]:-moz-focusring, [type=\"reset\"]:-moz-focusring, [type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\nlegend {\n  box-sizing: border-box;\n  color: inherit;\n  display: table;\n  max-width: 100%;\n  padding: 0px;\n  white-space: normal;\n}\n\nprogress {\n  vertical-align: baseline;\n}\n\ntextarea {\n  overflow: auto;\n}\n\n[type=\"checkbox\"], [type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0px;\n}\n\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  outline-offset: -2px;\n}\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  font: inherit;\n}\n\ndetails {\n  display: block;\n}\n\nsummary {\n  display: list-item;\n}\n\ntemplate {\n  display: none;\n}\n\n[hidden] {\n  display: none;\n}\n\n*[contenteditable] {\n  user-select: text;\n}\n\ncode span {\n  white-space: pre-wrap;\n}\n\nmain {\n  background: orange;\n  display: block;\n}\n\n"
        ]);
      });

    });

  });

});
