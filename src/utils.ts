import variationWithRepetition from '@onesy/utils/variationWithRepetition';
import getEnvironment from '@onesy/utils/getEnvironment';
import OnesySubscription from '@onesy/subscription';

import OnesyStyle from './OnesyStyle';
import { IOnesyStyleRuleValue } from './OnesyStyleRule';
import { IResponse } from './interfaces';

export const cammelCaseToKebabCase = (value: string) => is('string', value) ? value.replace(/[A-Z]/g, v => `-${v[0]}`).toLowerCase() : value;

export const kebabCasetoCammelCase = (value: string) => is('string', value) ? value.replace(/-./g, v => v[1] !== undefined ? v[1].toUpperCase() : '') : value;

export const capitalizedCammelCase = (value: string) => capitalize(kebabCasetoCammelCase(value));

export const capitalize = (value: string) => is('string', value) ? value.charAt(0).toUpperCase() + value.slice(1) : value;

export const is = (version: string, value: any) => {
  switch (version) {
    case 'string':
      return typeof value === 'string';

    case 'number':
      return typeof value === 'number' && !Number.isNaN(value);

    case 'array':
      return Array.isArray(value);

    case 'boolean':
      return typeof value === 'boolean';

    case 'null':
      return value === null;

    case 'undefined':
      return value === undefined;

    case 'object':
      const isObject = typeof value === 'object' && !!value && value.constructor === Object;

      return isObject;

    case 'function':
      return !!(value && value instanceof Function);

    case 'simple':
      return (
        is('string', value) ||
        is('number', value) ||
        is('boolean', value) ||
        is('undefined', value) ||
        is('null', value)
      );

    default:
      return;
  }
};

export const isOnesySubscription = value => value instanceof OnesySubscription || is('function', value?.emit);

export const getRefs = (value: string) => {
  const items = [];

  if (is('string', value)) {
    const regex = /\$[a-zA-Z1-9_]+/g;

    items.push(...(value.match(regex) || []).map(item => item.replace('$', '')));
  }

  return items;
};

export const valueResolve = (property: string, value: any, onesyStyle: OnesyStyle): IOnesyStyleRuleValue => {
  const response: IOnesyStyleRuleValue = {
    value: [],
    options: {},
  };

  // Mange all the values
  if (is('string', property) && !!property.length && value !== undefined && onesyStyle) {
    // String
    if (is('string', value)) response.value = [value];
    // Number
    else if (is('number', value)) {
      const unit = onesyStyle.subscriptions.rule.unit.map({ property, value })?.value;

      response.value = [unit?.value || value];
    }
    // Array of simple
    else if (is('array', value) && value.every(item => is('simple', item))) {
      response.value = [value.flatMap(item => valueResolve(property, item, onesyStyle).value).join(' ')];
    }
    // Array of arrays
    // Array of objects
    else if (is('array', value) && value.every(item => is('array', item) || is('object', item))) {
      response.value = [value.flatMap(item => valueResolve(property, item, onesyStyle).value).join(', ')];
    }
    // Object
    else if (is('object', value)) {
      // Object value
      if (value.value) {
        const fallbacks = (value.fallbacks || []).flatMap(item => valueResolve(property, item, onesyStyle).value);

        response.value = [fallbacks, valueResolve(property, value.value, onesyStyle).value].flat().filter(Boolean);

        if (value.rule) response.options.rule = value.rule;
      }
      else {
        // Value plugins
        const value_ = onesyStyle.subscriptions.rule.value.map({ property, value })?.value;

        response.value = value_ || [];
      }
    }
    // Method
    // OnesySubscription
    // For methods and OnesySubscription leave as is
    // these are only used during add method
    else response.value = [value];
  }

  return response;
};

export const dynamic = (value: any) => (
  is('function', value) ||
  isOnesySubscription(value) ||
  is('object', value) && Object.keys(value).some(prop => dynamic(value[prop]))
);

export function* makeName(length_ = 2, input_ = 'abcdefghijklmnopqrstuvwxyz') {
  const input = is('array', input_) ? input_ : input_.split('');
  let length = length_;
  let value: any;

  let methodNameGenerator = (variationWithRepetition(input as any, length, { response: 'yield' }) as (() => IterableIterator<any>))();

  while (true) {
    value = methodNameGenerator.next();

    if (value?.done) {
      methodNameGenerator = (variationWithRepetition(input as any, ++length, { response: 'yield' }) as (() => IterableIterator<any>))();

      value = methodNameGenerator.next();
    }

    yield value.value.join('');
  }
}

export const pxToRem = (value: number, htmlFontSize = 16) => Number((value / htmlFontSize).toFixed(4));

const env = getEnvironment();

env.onesy_methods = {
  makeName: makeName(),
};

export const names = (value: IResponse) => {
  if (is('object', value)) {
    // Update styles, className and class
    if (!value.hasOwnProperty('className')) Object.defineProperty(value, 'className', {
      get: function () { return Object.keys(value.classNames).map(item => value.classNames[item]).join(' '); }
    });

    if (!value.hasOwnProperty('class')) Object.defineProperty(value, 'class', {
      get: function () { return Object.keys(value.classes).map(item => value.classes[item]).join(' '); }
    });

    if (!value.hasOwnProperty('styles')) value.styles = (...args: string[]) => {
      const values = [];

      args.forEach(arg => {
        if (value.classes[arg]) values.push(value.classes[arg]);
      });

      return values.join(' ');
    };

    return value;
  }

  return value;
};

let i = 0;

export const getID = () => `${i++}-${new Date().getTime()}`;

export const minify = (value: string) => value.replace(/\n/g, '').replace(/ ?(\{|:|,|>|~) ?/g, '$1').replace(/;(\})/g, '$1');
