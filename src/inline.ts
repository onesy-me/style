import Try from '@onesy/utils/try';

import OnesyStyle from './OnesyStyle';
import OnesyStyleSheetManager from './OnesyStyleSheetManager';
import OnesyTheme from './OnesyTheme';
import { TValue, TValueMethod, IIds, IOptionsOnesyStyle, IOptionsOnesyTheme } from './interfaces';
import { cammelCaseToKebabCase, is, isOnesySubscription, kebabCasetoCammelCase } from './utils';

export interface IMakeStyles {
  onesy_style_sheet_manager: OnesyStyleSheetManager;
  ids: IIds;
  add: (props?: any) => void;
  update: (props: any) => void;
  remove: () => void;
}

export interface IOptions {
  element?: Element;

  onesy_style?: IOptionsOnesyStyle;

  onesy_theme?: IOptionsOnesyTheme;

  response?: 'css' | 'json';

  response_json_property_version?: 'cammel' | 'kebab';
}

const optionsDefault: IOptions = {
  onesy_style: {
    get: OnesyStyle.first.bind(OnesyStyle),
  },
  onesy_theme: {
    get: OnesyTheme.first.bind(OnesyTheme),
  },
  response: 'css',
  response_json_property_version: 'cammel'
};

function inline(
  value_: TValue,
  props?: any,
  options_: IOptions = {}
) {
  const options = { ...optionsDefault, ...options_ };

  // Onesy style
  let onesyStyle = options.onesy_style.value || (is('function', options.onesy_style.get) && options.onesy_style.get(options.element));

  if (onesyStyle === undefined) onesyStyle = new OnesyStyle();

  // Onesy theme
  const onesyTheme: OnesyTheme = options.onesy_theme.value || (is('function', options.onesy_theme.get) && options.onesy_theme.get(options.element));

  // Make value if it's a function
  const value = is('function', value_) ? Try(() => (value_ as TValueMethod)(onesyTheme)) : value_;

  // Go through all properties
  // make an OnesyStyleRuleProperty for each prop
  // and then make css string from each one
  let response: any = '';

  if (is('object', value)) {
    const properties = Object.keys(value);

    const valueNew = {};

    // Filter out at-rule and dynamic properies
    properties
      .filter(prop =>
        (prop.indexOf('@') !== 0) &&
        !(is('function', value[prop]) || isOnesySubscription(value[prop]))
      )
      .forEach(prop => valueNew[prop] = value[prop]);

    // Parse dynamic properties into static
    const propertiesDynamic = properties.filter(prop =>
      (prop.indexOf('@') !== 0) &&
      (is('function', value[prop]) || isOnesySubscription(value[prop]))
    );

    propertiesDynamic.forEach(prop => {
      const valueProp = value[prop];

      if (is('function', valueProp)) valueNew[prop] = Try(() => valueProp(props));
      else if (isOnesySubscription(valueProp)) valueNew[prop] = Try(() => valueProp.value);
    });

    // Make an instance of onesyStyleSheetManager
    const onesyStyleSheetManager = new OnesyStyleSheetManager(
      { a: valueNew },
      {
        mode: 'regular',
        pure: false,
        priority: 'upper',
        onesyTheme,
        onesyStyle,
        onesy_style_cache: false,
        style: {
          attributes: {
            method: 'inline'
          }
        }
      }
    );

    const rules = onesyStyleSheetManager.sheets.static[0].rules[0].value.rules;

    rules.map((rule: any) => rule.value).forEach((rule: any) => response += ` ${rule.css}`);

    // Make into json
    if (options.response === 'json') {
      const values = (response as string).split(';').filter(Boolean);

      response = {};

      values.forEach(item => {
        let [property, value__] = item.split(':').filter(Boolean);

        property = property?.trim();
        value__ = value__?.trim();

        if (property && value__) {
          response[options.response_json_property_version === 'cammel' ? kebabCasetoCammelCase(property) : cammelCaseToKebabCase(property)] = value__;
        }
      });
    }
  }

  if (options.response === 'css') response = (response as string).trim();

  // Response
  return response;
}

export default inline;
