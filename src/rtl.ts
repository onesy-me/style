import AmauiStyle from './AmauiStyle';
import { is } from './utils';

export interface IRtl {
  value?: any;
  arguments?: any;
}

function rtl(amauiStyle: AmauiStyle) {
  const method = (value_: { value: string; property: string; }): IRtl => {
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
