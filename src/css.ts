import path from 'path';
import fg from 'fast-glob';
import fs from 'fs-extra';

import is from '@onesy/utils/is';
import getEnvironment from '@onesy/utils/getEnvironment';
import hash from '@onesy/utils/hash';
import merge from '@onesy/utils/merge';
import stringify from '@onesy/utils/stringify';
import to from '@onesy/utils/to';
import Try from '@onesy/utils/try';
import unique from '@onesy/utils/unique';
import OnesyNode from '@onesy/node';

import OnesyStyle from './OnesyStyle';
import OnesyTheme from './OnesyTheme';
import OnesyStyleSheetManager from './OnesyStyleSheetManager';
import { TValue, TValueMethod, IMethodResponse, TPriority, ICSSOptions } from './interfaces';
import { resetDefault, normalize } from './reset';

interface IResponse {
  make: () => Promise<void>;
}

const optionsDefault: ICSSOptions = {
  mode: 'regular',
  onesy_style: {
    get: OnesyStyle.first.bind(OnesyStyle),
  },
  onesy_theme: {
    get: OnesyTheme.first.bind(OnesyTheme),
  },
  css: {
    file: {
      hash: true
    },
    minify: true
  },
  html: {
    insert: {
      comment: '<!-- onesy style insert -->'
    },

    add: true
  },
  rule: {
    rtl: false,
    prefix: true,
    sort: true
  },
  log: true
};

const env = getEnvironment();

const getValuePaths = async (value: any, options: any = { onlyDirectories: true }) => {
  const wd = process.cwd();

  let paths = (is('array', value) ? value : [value])
    .map(item => item?.url || item)
    .filter(Boolean)
    .filter(item => is('string', item))
    .map(item => path.isAbsolute(item) ? item : path.join(wd, item));

  paths = (await fg(paths, options) as any)
    .map(filePath => path.resolve(filePath));

  return unique(paths);
};

const minify = (value: string) => {
  if (is('string', value)) return value.replace(/\n/g, '').replace(/ ?(\{|:|,|>|~) ?/g, '$1').replace(/;(\})/g, '$1');

  return value;
};

function css(
  value__: TValue,
  options_: ICSSOptions = {}
): IResponse {
  const options = merge(options_, optionsDefault, { copy: true });

  // Onesy style
  let onesyStyle = options.onesy_style.value || (is('function', options.onesy_style.get) && options.onesy_style.get());

  if (onesyStyle === undefined) onesyStyle = new OnesyStyle();

  // Onesy theme
  const onesyTheme: OnesyTheme = options.onesy_theme.value || (is('function', options.onesy_theme.get) && options.onesy_theme.get());

  // Make value if it's a function
  let value_ = is('function', value__) ? Try(() => (value__ as TValueMethod)(onesyTheme)) : value__;

  // For reset, add reset to value
  let method = 'css';
  let priority: TPriority = 'upper';

  if (options.reset) {
    method = 'reset';

    // Default
    const valueDefault = merge(resetDefault, normalize);

    // Add reset defaults
    // user provided values override reset default values
    if (options.resetProps?.override) value_ = {
      ...valueDefault,
      ...value_,
    };
    else value_ = merge(value_, valueDefault);
  }

  // reset or pure update priority
  if (options.pure) method = 'pure';

  if (options.reset || options.pure) priority = 'lower';

  // Make an instance of onesyStyleSheetManager
  const onesyStyleSheetManager = new OnesyStyleSheetManager(
    value_,
    {
      mode: options.mode,
      pure: options.reset || options.pure,
      priority,
      onesyTheme,
      onesyStyle,
      rule: options.rule,
      style: {
        attributes: {
          method
        }
      }
    }
  );

  const responseManager: IMethodResponse = {
    ids: onesyStyleSheetManager.ids,
    onesy_style_sheet_manager: onesyStyleSheetManager,
    sheets: onesyStyleSheetManager.sheets,
    add: onesyStyleSheetManager.add.bind(onesyStyleSheetManager),
    props: onesyStyleSheetManager.props,
    update: onesyStyleSheetManager.update.bind(onesyStyleSheetManager),
    remove: onesyStyleSheetManager.remove.bind(onesyStyleSheetManager),
    addRule: onesyStyleSheetManager.sheets.static[0] && onesyStyleSheetManager.sheets.static[0].addRule.bind(onesyStyleSheetManager.sheets.static[0]),
  };

  const response: IResponse = {
    make: async () => {
      const wd = process.cwd();

      // add
      const responseManagerValue = responseManager.add();

      // All css
      let value = onesyStyleSheetManager.css;

      const minified = minify(value);

      if (options.css.minify) value = minified;

      // CSS
      // Make file name, only if at least 1 folder is provided
      // and it exists
      let made = false;

      const paths = {
        folders: {
          css: await getValuePaths(options.css.folders),
        },
        files: {
          html: await getValuePaths(options.html.files, { onlyFiles: true }),
        },
      };

      const madeFiles = {
        css: [],
      };

      const fileHash = hash(minified, { withPrefix: false });

      if (paths.folders.css?.length) {
        const folders = paths.folders.css;

        const name = `${options.css?.file?.name || env.onesy_methods.makeName.next().value}${options.css?.file?.hash ? `.${fileHash}` : ''}.css`;

        // Clear folder if clear
        const make = async (path_: string, index: number) => {
          const folder = options.css.folders.find(item => path_ === (path.isAbsolute(item.url) ? item.url : path.join(wd, item.url)));

          if (folder) {
            const clear = folder.clear !== undefined ? folder.clear : options.css.clear;

            // Empty folder if clear
            if (clear) await fs.emptyDir(path_);

            // Make the file
            const nameWithPath = path.join(path_, name);

            await OnesyNode.file.add(nameWithPath, value);

            // Add to files
            if (index === 0 || !madeFiles.css.length) madeFiles.css.push(nameWithPath);

            if (options.log) console.log(`Made \x1b[34m${nameWithPath}\x1b[0m \x1b[32m${to(value, 'size')}\x1b[0m`);
          }
        };

        // Make files in all the folders
        if (options.log) console.log();

        await Promise.all(folders.map((item, index) => make(item, index)));

        if (options.log) console.log();

        made = true;
      }

      // HTML
      // Only if css is made and in folders
      // and html at least 1 file is provided and it exists
      // and html add: true
      if (made && paths.files.html.length && options.html.add) {
        const files = paths.files.html;

        const add = async (path_: string) => {
          const file = options.html.files.find(item => path_ === (path.isAbsolute(item.url) ? item.url : path.join(wd, item.url)));

          if (file) {
            // Add path relative from the css file to the index path
            const valueHTML = await OnesyNode.file.get(path_, false) as string;

            const values = valueHTML.split('\n');

            const filesRelative = madeFiles.css.map(item => path.relative(path.dirname(path_), item));

            // Add css files to folders

            // Start from insert or file.insert comment or if none exists
            // start from the first group of onesy inserted links, or
            // start from first the bottom of head
            const insert = file.insert?.comment || options.html?.insert?.comment;

            const indexInsertComment = values.findIndex(item => item.indexOf(insert) > -1);

            const indexOnesyInserts = values.findIndex(item => item.indexOf('<link') > -1 && item.indexOf(`data-onesy='true'`) > -1);
            const indexBottomHead = values.findIndex(item => item.indexOf('</head>') > -1);
            const indexBottomBody = values.findIndex(item => item.indexOf('</body>') > -1);

            const indexStart = (
              (indexInsertComment > -1 && indexInsertComment + 1) ||
              (indexOnesyInserts > -1 && indexOnesyInserts) ||
              indexBottomHead
            );

            const inBody = indexStart > indexBottomHead;

            // Adding order depends on if it's reset, pure or regular style
            const allLinks = values.slice(indexStart, inBody ? indexBottomBody : indexBottomHead).filter(item => item.indexOf('<link') > -1);
            const onesyLinks = allLinks.filter(item => item.indexOf(`data-onesy='true'`) > -1);
            const onesyLinksPure = onesyLinks.filter(item => item.indexOf(`data-pure='true'`) > -1);
            const onesyLinksNoReset = onesyLinks.filter(item => item.indexOf(`data-reset='true'`) === -1);
            const onesyLinkReset = values.find(item => item.indexOf('<link') > -1 && item.indexOf(`data-reset='true'`) > -1);
            const onesyLinkResetIndex = values.findIndex(item => item === onesyLinkReset);

            let indexInsert = onesyLinkResetIndex > - 1 ? onesyLinkResetIndex + 1 : indexStart;

            if (!!onesyLinksNoReset.length && !options.reset) {
              if (!options.pure) {
                const onesyLinkLastIndex = values.findIndex(item => item === onesyLinksNoReset[onesyLinksNoReset.length - 1]);

                indexInsert = onesyLinkLastIndex + 1;
              }
              else {
                const onesyLinkFirstIndex = values.findIndex(item => item === onesyLinksNoReset[0]);

                if (!onesyLinksPure.length) indexInsert = onesyLinkFirstIndex;
                else {
                  const onesyLinkPureLast = values.findIndex(item => item === onesyLinksPure[onesyLinksPure.length - 1]);

                  indexInsert = onesyLinkPureLast + 1;
                }
              }
            }

            // Take whitespace padding from other styles or links, or title or body + tab space
            let padding: any = '';

            const element = values[(inBody ? indexBottomBody : indexBottomHead) - 1];
            const main = values[(inBody ? indexBottomBody : indexBottomHead)];

            padding = element.split(/(?! )/)[0];

            if (padding[0] !== ' ') padding = main.split(/(?! )/)[0];
            if (padding[0] !== ' ') padding = '  ';

            filesRelative.forEach(file_ => values.splice(indexInsert, 0, `${padding}<link rel='stylesheet' href='${file_}' data-onesy='true'${options.reset ? ` data-reset='true'` : ''}${options.pure ? ` data-pure='true'` : ''} />`));

            // if not pure and reset
            // get names and add (update) as a script global variable to window
            // add at the bottom of head
            if (options.html?.addNames && !options.pure && !options.reset) {
              delete responseManagerValue.ids;

              values.splice(indexBottomHead + 1, 0, `${padding}<script>
${padding}  if (!window.onesyStyleNames) window.onesyStyleNames = {};
${padding}
${padding}  window.onesyStyleNames['${fileHash}'] = ${stringify(responseManagerValue, padding.length + 2)};
${padding}</script>`);
            }

            // Update the file
            await OnesyNode.file.update(path_, values.join('\n'));
          }
        };

        await Promise.all(files.map(item => add(item)));
      }
    },
  };

  // Response
  return response;
}

export default css;
