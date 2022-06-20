import { isEnvironment } from '@amaui/utils';

import AmauiStyle from './amaui-style';
import { makeName } from './utils';

export interface IOptionsDom {
  unique?: boolean;
}

export interface IMakeClassName {
  value?: any;
  arguments?: any;
  variant?: 'development' | 'production';
}

export interface IOptions {
  production?: boolean;
  dom?: IOptionsDom;
}

const optionsDefault: IOptions = {
  production: (
    isEnvironment('browser') ||
    (isEnvironment('nodejs') && ['prod', 'production'].indexOf(process.env.NODE_ENV) > -1)
  ),
};

function makeClassName(amauiStyle: AmauiStyle, options_: IOptions = {}) {
  const options = { ...options_, ...optionsDefault };

  // If both dev and prod are false, then dev is true
  const production = options.production !== undefined ? options.production : optionsDefault.production;

  const makeNameMethod = makeName();

  const domUnique = (value: string) => {
    const allClassNames = [...new Set(Array.from(window.document.querySelectorAll('[class]')).flatMap(item => [...item.classList]))];

    return allClassNames.indexOf(value) === -1;
  };

  const method = (value_: { property: string; value: any; }): IMakeClassName => {
    const value: IMakeClassName = {
      arguments: {
        value: value_,
      },
    };

    let inc = 0;

    // Make a class name
    // Production
    if (production) {
      value.value = makeNameMethod.next().value;

      while (true) {
        if (
          (options.dom?.unique && !domUnique(value.value))
        ) {
          value.value = makeNameMethod.next().value;
        }
        else break;
      }
    }
    // Development
    else {
      value.value = `${value_.property}-${inc}`;

      while (true) {
        if (
          (options.dom?.unique && !domUnique(value.value))
        ) {
          value.value = `${value_?.property}-${++inc}`;
        }
        else break;
      }
    }

    return value;
  };

  // Add methods to subscriptions
  if (amauiStyle) {
    amauiStyle.subscriptions.className.name.subscribe(method);
  }

  const remove = () => {
    // Remove methods from subscriptions
    if (amauiStyle) {
      amauiStyle.subscriptions.className.name.unsubscribe(method);
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

export default makeClassName;
