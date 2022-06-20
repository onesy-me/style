import { variationWithRepetition, getEnvironment } from '@amaui/utils';
import AmauiSubscription from '@amaui/subscription';

import AmauiStyle from './amaui-style';
import { IAmauiStyleRuleValue } from './amaui-style-rule';
import { IResponse } from './interfaces';

export const kebabCasetoCammelCase = (value_: string) => {
  let value: any = value_;

  if (is('string', value)) {
    value = value.split('-').filter(Boolean);

    value = value.map((item: string, index: number) => index === 0 ? item.toLowerCase() : capitalize(item));

    return is('string', value) ? value : value.join('');
  }

  return value;
};

export const capitalizedCammelCase = (value: string) => capitalize(cammelCaseToKebabCase(value));

export const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export const is = (variant: string, value: any) => {
  switch (variant) {
    case 'string':
      return typeof value === 'string';

    case 'number':
      return typeof value === 'number' && !Number.isNaN(value);

    case 'simple':
      return typeof value !== 'object' || typeof value !== 'function';

    case 'array':
      return Array.isArray(value);

    case 'object':
      const isObject = typeof value === 'object' && !!value && value.constructor === Object;

      return isObject;

    case 'function':
      return !!(value && value instanceof Function);

    default:
      return;
  }
};

export const isAmauiSubscription = value => value instanceof AmauiSubscription || is('function', value?.emit);

export const getRefs = (value: string) => {
  const items = [];

  if (is('string', value)) {
    const regex = /(?:\$)[^ \$\.#]+/g;

    items.push(...(value.match(regex) || []).map(item => item.replace('$', '')));
  }

  return items;
};

export const valueResolve = (property: string, value: any, amauiStyle: AmauiStyle): IAmauiStyleRuleValue => {
  const response: IAmauiStyleRuleValue = {
    value: [value],
    options: {},
  };

  // Mange all the values
  if (is('string', property) && !!property.length && value !== undefined && amauiStyle) {
    // String
    if (is('string', value)) response.value = [value];
    // Number
    else if (is('number', value)) {
      const unit = amauiStyle.subscriptions.rule.unit.map({ property, value })?.value;

      response.value = [unit?.value || value];
    }
    // Array of simple
    else if (is('array', value) && value.every(item => is('simple', item))) {

      response.value = [value.flatMap(item => valueResolve(property, item, amauiStyle).value).join(' ')];
    }
    // Array of arrays
    // Array of objects
    else if (is('array', value) && value.every(item => is('array', item) || is('object', item))) {
      response.value = [value.flatMap(item => valueResolve(property, item, amauiStyle).value).join(', ')];
    }
    // Object
    else if (is('object', value)) {
      // Object value
      if (value.value) {
        const fallbacks = (value.fallbacks || []).flatMap(item => valueResolve(property, item, amauiStyle).value);

        response.value = [fallbacks, valueResolve(property, value.value, amauiStyle).value].flat().filter(Boolean);

        if (value.rule) response.options.rule = value.rule;
      }
      else {
        // Value plugins
        const value_ = amauiStyle.subscriptions.rule.value.map({ property, value })?.value;

        response.value = value_ || [];
      }
    }
    // Method
    // AmauiSubscription
    // For methods and AmauiSubscription leave as is
    // these are only used during add method
    else response.value = [value];
  }

  return response;
};

export const dynamic = (value: any) => (
  is('function', value) ||
  isAmauiSubscription(value) ||
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

env.amaui_methods = {
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

export const cammelCaseToKebabCase = (value: string) => value.replace(/-./g, x => x[1].toUpperCase());
