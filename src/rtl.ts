import AmauiCache from '@amaui/cache';
import { is, merge } from '@amaui/utils';

import AmauiStyle from './amaui-style';

export interface IRtl {
  value?: any;
  arguments?: any;
}

export interface IOptions { }

const optionsDefault: IOptions = {};

function rtl(amauiStyle: AmauiStyle, options_: IOptions = {}) {
  const options: IOptions = merge(options_, optionsDefault, { copy: true });

  const method = (value_: { value: string; property: string; }): IRtl => {
    // Value in the AmauiCache
    const valueCached = AmauiCache.get(value_, amauiStyle?.id);

    if (valueCached) return valueCached;

    const value: IRtl = {
      value: {
        value: '',
        property: '',
      },
      arguments: {
        value: value_,
      },
    };

    if (is('string', value_.value)) {
      if (value_.value.indexOf('left') > -1) value.value.value = value_.value.replace(/left/ig, 'right');
      else if (value_.value.indexOf('right') > -1) value.value.value = value_.value.replace(/right/ig, 'left');
      else value.value.value = value_.value;
    }

    if (is('string', value_.property)) {
      if (value_.property.indexOf('left') > -1) value.value.property = value_.property.replace(/left/ig, 'right');
      else if (value_.property.indexOf('right') > -1) value.value.property = value_.property.replace(/right/ig, 'left');
      else value.value.property = value_.property;
    }

    // Add value to AmauiCache
    AmauiCache.add(value, value_, amauiStyle?.id);

    return value;
  };

  // Add method to subscriptions
  if (amauiStyle) {
    amauiStyle.subscriptions.rule.rtl.subscribe(method);
  }

  const remove = () => {
    // Remove method from subscriptions
    if (amauiStyle) {
      amauiStyle.subscriptions.rule.rtl.unsubscribe(method);
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

export default rtl;
