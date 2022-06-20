import { Try } from '@amaui/utils';

import AmauiStyle from './amaui-style';
import AmauiStyleSheetManager from './amaui-style-sheet-manager';
import AmauiTheme from './amaui-theme';
import { TValue, TValueMethod, IAmauiStyleSheetManagerProps, IMethodResponse, IOptionsAmauiStyle, IOptionsAmauiTheme } from './interfaces';
import { is } from './utils';

export interface IOptions {
  element?: Element;

  amaui_style?: IOptionsAmauiStyle;

  amaui_theme?: IOptionsAmauiTheme;

  optimize?: boolean;
}

function pure(
  value_: TValue,
  options_: IOptions = {}
): IMethodResponse {
  const optionsDefault: IOptions = {
    amaui_style: {
      get: AmauiStyle.first.bind(AmauiStyle),
    },
    amaui_theme: {
      get: AmauiTheme.first.bind(AmauiTheme),
    },
    optimize: true
  };

  const options = { ...options_, ...optionsDefault };

  // Amaui style
  let amauiStyle = options.amaui_style.value || (is('function', options.amaui_style.get) && options.amaui_style.get(options.element));

  if (amauiStyle === undefined) amauiStyle = new AmauiStyle();

  // Amaui theme
  const amauiTheme: AmauiTheme = options.amaui_theme.value || (is('function', options.amaui_theme.get) && options.amaui_theme.get(options.element));

  // Make value if it's a function
  const value = is('function', value_) ? Try(() => (value_ as TValueMethod)(amauiTheme)) : value_;

  // Make an instance of amauiStyleSheetManager
  const amauiStyleSheetManager = new AmauiStyleSheetManager(value, 'regular', true, 'lower', amauiTheme, amauiStyle, { style: { attributes: { method: 'pure' } }, optimize: options.optimize });

  const response: IMethodResponse = {
    ids: amauiStyleSheetManager.ids,
    amaui_style_sheet_manager: amauiStyleSheetManager,
    sheets: amauiStyleSheetManager.sheets,
    add: amauiStyleSheetManager.add.bind(amauiStyleSheetManager),
    set props(value__: IAmauiStyleSheetManagerProps) { amauiStyleSheetManager.props = value__; },
    update: amauiStyleSheetManager.update.bind(amauiStyleSheetManager),
    remove: amauiStyleSheetManager.remove.bind(amauiStyleSheetManager),
    addRule: amauiStyleSheetManager.sheets.static[0] && amauiStyleSheetManager.sheets.static[0].addRule.bind(amauiStyleSheetManager.sheets.static[0]),
  };

  // Response
  return response;
}

export default pure;
