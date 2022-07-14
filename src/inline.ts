import Try from '@amaui/utils/try';

import AmauiStyle from './amaui-style';
import AmauiStyleSheetManager from './amaui-style-sheet-manager';
import AmauiTheme from './amaui-theme';
import { TValue, TValueMethod, IIds, IOptionsAmauiStyle, IOptionsAmauiTheme } from './interfaces';
import { cammelCaseToKebabCase, is, isAmauiSubscription, kebabCasetoCammelCase } from './utils';

export interface IMakeStyles {
  amaui_style_sheet_manager: AmauiStyleSheetManager;
  ids: IIds;
  add: (props?: any) => void;
  update: (props: any) => void;
  remove: () => void;
}

export interface IOptions {
  element?: Element;

  amaui_style?: IOptionsAmauiStyle;

  amaui_theme?: IOptionsAmauiTheme;

  response?: 'css' | 'json';

  response_json_property_variant?: 'cammel' | 'kebab';
}

const optionsDefault: IOptions = {
  amaui_style: {
    get: AmauiStyle.first.bind(AmauiStyle),
  },
  amaui_theme: {
    get: AmauiTheme.first.bind(AmauiTheme),
  },
  response: 'css',
  response_json_property_variant: 'cammel'
};

function inline(
  value_: TValue,
  props?: any,
  options_: IOptions = {}
) {
  const options = { ...optionsDefault, ...options_ };

  // Amaui style
  let amauiStyle = options.amaui_style.value || (is('function', options.amaui_style.get) && options.amaui_style.get(options.element));

  if (amauiStyle === undefined) amauiStyle = new AmauiStyle();

  // Amaui theme
  const amauiTheme: AmauiTheme = options.amaui_theme.value || (is('function', options.amaui_theme.get) && options.amaui_theme.get(options.element));

  // Make value if it's a function
  const value = is('function', value_) ? Try(() => (value_ as TValueMethod)(amauiTheme)) : value_;

  // Go through all properties
  // make an AmauiStyleRuleProperty for each prop
  // and then make css string from each one
  let response: any = '';

  if (is('object', value)) {
    const properties = Object.keys(value);

    const valueNew = {};

    // Filter out at-rule and dynamic properies
    properties
      .filter(prop =>
        (prop.indexOf('@') !== 0) &&
        !(is('function', value[prop]) || isAmauiSubscription(value[prop]))
      )
      .forEach(prop => valueNew[prop] = value[prop]);

    // Parse dynamic properties into static
    const propertiesDynamic = properties.filter(prop =>
      (prop.indexOf('@') !== 0) &&
      (is('function', value[prop]) || isAmauiSubscription(value[prop]))
    );

    propertiesDynamic.forEach(prop => {
      const valueProp = value[prop];

      if (is('function', valueProp)) valueNew[prop] = Try(() => valueProp(props));
      else if (isAmauiSubscription(valueProp)) valueNew[prop] = Try(() => valueProp.value);
    });

    // Make an instance of amauiStyleSheetManager
    const amauiStyleSheetManager = new AmauiStyleSheetManager({ a: valueNew }, 'regular', false, 'upper', amauiTheme, amauiStyle, { style: { attributes: { method: 'inline' } }, amaui_style_cache: false });

    const rules = amauiStyleSheetManager.sheets.static[0].rules[0].value.rules;

    rules.map(rule => rule.value).forEach(rule => {
      response += ` ${rule.css}`;
    });

    // Make into json
    if (options.response === 'json') {
      const values = (response as string).split(';').filter(Boolean);

      response = {};

      values.forEach(item => {
        let [property, value__] = item.split(':').filter(Boolean);

        property = property?.trim();
        value__ = value__?.trim();

        if (property && value__) {
          response[options.response_json_property_variant === 'cammel' ? kebabCasetoCammelCase(property) : cammelCaseToKebabCase(property)] = value__;
        }
      });
    }
  }

  if (options.response === 'css') response = (response as string).trim();

  // Response
  return response;
}

export default inline;
