import isEnvironment from '@amaui/utils/isEnvironment';

import AmauiStyle from './AmauiStyle';
import { capitalizedCammelCase } from './utils';

export interface IPrefix {
  value?: any;
  arguments?: any;
}

export interface IOptionsSSR {
  all: boolean;
}

export interface IOptions {
  ssr?: IOptionsSSR;
}

const optionsDefault: IOptions = {
  ssr: {
    all: true
  }
};

// As of April, 01, 2022 all prefixed required for some of the browser versions
const mapAllPropertyPrefixes = {
  'appearance': ['-webkit-', '-moz-'],
  'backdrop-filter': ['-webkit-'],
  'background-clip': ['-webkit-'],
  'box-decoration-break': ['-webkit-'],
  'clip-path': ['-webkit-'],
  'color-adjust': ['-webkit-'],
  'font-smooth': ['-webkit-', '-moz-'],
  'hyphens': ['-webkit-', '-ms-', '-moz-'],
  'initial-letter': ['-webkit-'],
  'line-clamp': ['-webkit-'],
  'writing-mode': ['-webkit-'],
  'text-decoration': ['-webkit-', '-moz-'],
  'text-emphasis': ['-webkit-'],
  'text-orientation': ['-webkit-'],
  'text-size-adjust': ['-webkit-', '-ms-', '-moz-'],
  'user-select': ['-webkit-', '-ms-', '-moz-'],
  'font-kerning': ['-webkit-'],
  'tab-size': ['-o-', '-moz-'],
  'wrap-flow': ['-ms-'],
  'wrap-through': ['-ms-'],
  'grid': ['-ms-'],
  'mask': ['-webkit-'],
  'reflect': ['-webkit-'],
  'flow-into': ['-webkit-', '-ms-'],
  'flow-from': ['-webkit-', '-ms-'],
  'region-fragment': ['-webkit-', '-ms-'],
  'scroll-snap': ['-webkit-', '-ms-'],
  'text-stroke': ['-webkit-'],
  'text-fill': ['-webkit-'],
  'max-content': ['-webkit-', '-moz-'],
  'min-content': ['-webkit-', '-moz-'],
  'fit-content': ['-webkit-', '-moz-'],
  'stretch': ['-webkit-', '-moz-'],
  'available': ['-webkit-', '-moz-'],
  'resolution': ['-webkit-', '-o-'],
  'min-resolution': ['-webkit-', '-o-'],
  'max-resolution': ['-webkit-', '-o-'],
  'keyframe': ['-webkit-', '-o-', '-moz-'],
  'animation': ['-webkit-', '-moz-'],
  'transform': ['-webkit-', '-o-', '-ms-', '-moz-'],
  'transition': ['-webkit-', '-o-', '-moz-']
};

// Where property index is > -1 and value index is > -1 and replace it with
const mapAllValuePrefixes = {
  'position': {
    'sticky': ['-webkit-'],
  },
  'background-clip': {
    'text': ['-webkit-', '-ms-'],
  },
  'background-image': {
    'crossfade': ['-webkit-'],
    'image-set': ['-webkit-', '-o-', '-ms-', '-moz-'],
    'element': ['-moz-'],
    'canvas': ['-webkit-']
  },
  'background': {
    'crossfade': ['-webkit-'],
    'image-set': ['-webkit-', '-o-', '-ms-', '-moz-'],
    'element': ['-moz-'],
    'canvas': ['-webkit-']
  },
};

function prefix(amauiStyle: AmauiStyle, options_: IOptions = {}) {
  const options = { ...optionsDefault, ...options_ };

  const valid = (value: any, property: any) => {
    if (isEnvironment('browser')) {
      const element = document.createElement('a');

      const props = [property];

      if (property.indexOf('-webkit-') === 0) props.push(`webkit${capitalizedCammelCase(property.slice(8))}`);
      if (property.indexOf('-o-') === 0) props.push(`o${capitalizedCammelCase(property.slice(3))}`);
      if (property.indexOf('-ms-') === 0) props.push(`ms${capitalizedCammelCase(property.slice(4))}`);
      if (property.indexOf('-moz-') === 0) props.push(`moz${capitalizedCammelCase(property.slice(5))}`);

      for (const prop of props) {
        if (prop in element.style) {
          try {
            element.style[prop] = value;

            if (!!element.style[prop].length) return true;
          }
          catch (error) { }
        }
      }

      return false;
    }

    return options.ssr.all;
  };

  const method = (value_: { property: string; value: string; }): IPrefix => {
    const value: IPrefix = {
      value: [],
      arguments: {
        value: value_,
      },
    };

    // if initial value property are valid return
    if (isEnvironment('browser') && valid(value_.value, value_.property)) return value;

    // make mix of all prefix versions for value and property and all mixes other than the original
    const propertyPrefixesKey = Object.keys(mapAllPropertyPrefixes).find(item => value_.property.indexOf(item) > -1);
    const propertyPrefixes = mapAllPropertyPrefixes[propertyPrefixesKey] || [];
    const properties = [value_.property, ...propertyPrefixes.map(prefix_ => `${prefix_}${value_.property}`)];

    const valuePrefixesProps = mapAllValuePrefixes[value_.property];
    const valuePrefixesKey = valuePrefixesProps && Object.keys(valuePrefixesProps).find(item => value_.value.indexOf(item) > -1);
    const valuePrefixes = (valuePrefixesProps && valuePrefixesProps[valuePrefixesKey]) || [];
    const values = [value_.value, ...valuePrefixes.map(prefix_ => `${prefix_}${value_.value}`)];

    const items = [];

    properties.forEach(property__ => {
      values.forEach(value__ => {
        if (!(property__ === value_.property && value__ === value_.value)) {
          items.push({ property: property__, value: value__ });
        }
      });
    });

    // for each one that works push it to value.value
    items.forEach(item => {
      if (valid(item.value, item.property)) value.value.push(item);
    });

    return value;
  };

  // Add methods to subscriptions
  if (amauiStyle) {
    amauiStyle.subscriptions.rule.prefix.subscribe(method);
  }

  const remove = () => {
    // Remove methods from subscriptions
    if (amauiStyle) {
      amauiStyle.subscriptions.rule.prefix.unsubscribe(method);
    }
  };

  const response = {
    methods: {
      method,
    },
    remove,
  };

  return response;
}

export default prefix;
