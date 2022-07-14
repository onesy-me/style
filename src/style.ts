import merge from '@amaui/utils/merge';
import Try from '@amaui/utils/Try';

import AmauiStyle from './amaui-style';
import AmauiStyleSheetManager from './amaui-style-sheet-manager';
import AmauiTheme from './amaui-theme';
import { TValue, TValueMethod, TMode, IMethodResponse, IOptionsAmauiStyle, IOptionsAmauiTheme, IAmauiStyleSheetManagerProps } from './interfaces';
import { is } from './utils';

export interface IOptions {
  element?: Element;

  amaui_style?: IOptionsAmauiStyle;

  mode?: TMode;

  amaui_theme?: IOptionsAmauiTheme;

  add?: boolean;

  return?: 'ids' | 'classNames' | 'classes' | 'keyframes';
}

const optionsDefault: IOptions = {
  mode: 'regular',
  amaui_style: {
    get: AmauiStyle.first.bind(AmauiStyle),
  },
  amaui_theme: {
    get: AmauiTheme.first.bind(AmauiTheme),
  }
};

function style(
  value_: TValue,
  options_: IOptions = {}
): IMethodResponse {
  const options = merge(options_, optionsDefault, { copy: true });

  // Amaui style
  let amauiStyle = options.amaui_style.value || (is('function', options.amaui_style.get) && options.amaui_style.get(options.element));

  if (amauiStyle === undefined) amauiStyle = new AmauiStyle();

  // Amaui theme
  const amauiTheme: AmauiTheme = options.amaui_theme.value || (is('function', options.amaui_theme.get) && options.amaui_theme.get(options.element));

  // Make value if it's a function
  const value = is('function', value_) ? Try(() => (value_ as TValueMethod)(amauiTheme)) : value_;

  // Make an instance of amauiStyleSheetManager
  const amauiStyleSheetManager = new AmauiStyleSheetManager(value, options.mode, false, 'upper', amauiTheme, amauiStyle, { style: { attributes: { method: 'style' } } });

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

  // if add
  if (options.add) {
    const addResponse = response.add();

    // return
    return (options.return ? (addResponse[options.return] || addResponse) : addResponse) as any;
  }

  // Response
  return response;
}

export default style;
