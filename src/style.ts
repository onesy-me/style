import merge from '@onesy/utils/merge';
import Try from '@onesy/utils/try';

import OnesyStyle from './OnesyStyle';
import OnesyStyleSheetManager from './OnesyStyleSheetManager';
import OnesyTheme from './OnesyTheme';
import { TValue, TValueMethod, TMode, IMethodResponse, IOptionsOnesyStyle, IOptionsOnesyTheme, IOnesyStyleSheetManagerProps } from './interfaces';
import { is } from './utils';

export interface IOptions {
  element?: Element;

  name?: string;

  mode?: TMode;

  onesy_style?: IOptionsOnesyStyle;

  onesy_theme?: IOptionsOnesyTheme;

  add?: boolean;

  return?: 'ids' | 'classNames' | 'classes' | 'keyframes';
}

const optionsDefault: IOptions = {
  mode: 'regular',
  onesy_style: {
    get: OnesyStyle.first.bind(OnesyStyle),
  },
  onesy_theme: {
    get: OnesyTheme.first.bind(OnesyTheme),
  }
};

function style(
  value_: TValue,
  options_: IOptions = {}
): IMethodResponse {
  const options = merge(options_, optionsDefault, { copy: true });

  // Onesy style
  let onesyStyle = options.onesy_style.value || (is('function', options.onesy_style.get) && options.onesy_style.get(options.element));

  if (onesyStyle === undefined) onesyStyle = new OnesyStyle();

  // Onesy theme
  const onesyTheme: OnesyTheme = options.onesy_theme.value || (is('function', options.onesy_theme.get) && options.onesy_theme.get(options.element));

  // Make value if it's a function
  const value = is('function', value_) ? Try(() => (value_ as TValueMethod)(onesyTheme)) : value_;

  // Make an instance of onesyStyleSheetManager
  const onesyStyleSheetManager = new OnesyStyleSheetManager(
    value,
    {
      mode: options.mode,
      pure: false,
      priority: 'upper',
      onesyTheme,
      onesyStyle,
      name: options.name,
      style: {
        attributes: {
          method: 'style'
        }
      }
    }
  );

  const response: IMethodResponse = {
    ids: onesyStyleSheetManager.ids,
    onesy_style_sheet_manager: onesyStyleSheetManager,
    sheets: onesyStyleSheetManager.sheets,
    add: onesyStyleSheetManager.add.bind(onesyStyleSheetManager),
    set props(value__: IOnesyStyleSheetManagerProps) { onesyStyleSheetManager.props = value__; },
    update: onesyStyleSheetManager.update.bind(onesyStyleSheetManager),
    remove: onesyStyleSheetManager.remove.bind(onesyStyleSheetManager),
    addRule: onesyStyleSheetManager.sheets.static[0] && onesyStyleSheetManager.sheets.static[0].addRule.bind(onesyStyleSheetManager.sheets.static[0]),
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
