import { isEnvironment, merge } from '@amaui/utils';
import AmauiCache from '@amaui/cache';

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
  const options: IOptions = merge(options_, optionsDefault, { copy: true });

  // If both dev and prod are false, then dev is true
  const production = options.production !== undefined ? options.production : optionsDefault.production;

  const makeNameMethod = makeName();

  const domUnique = (value: string) => {
    const allClassNames = [...new Set(Array.from(window.document.querySelectorAll('[class]')).flatMap(item => [...item.classList]))];

    return allClassNames.indexOf(value) === -1;
  };

  const method = (value_: { property: string; value: any; }): IMakeClassName => {
    // Check in cache if class name already exists with these values
    const valueCached = AmauiCache.get(value_, options, amauiStyle?.id);

    if (valueCached) return valueCached;

    const value: IMakeClassName = {
      arguments: {
        value: value_,
      },
    };

    const makeClassNameNames = AmauiCache.get('amaui-makeClassName-values', amauiStyle?.id) || [];

    let inc = 0;

    // Make a class name
    // Production
    if (production) {
      value.value = makeNameMethod.next().value;

      while (true) {
        if (
          makeClassNameNames.indexOf(value.value) > -1 ||
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
          makeClassNameNames.indexOf(value.value) > -1 ||
          (options.dom?.unique && !domUnique(value.value))
        ) {
          value.value = `${value_?.property}-${++inc}`;
        }
        else break;
      }
    }

    // Add class name to names in AmauiCache
    makeClassNameNames.push(value.value);

    // Update makeClassNameNames
    AmauiCache.add(makeClassNameNames, 'amaui-makeClassName-values', amauiStyle?.id);

    // Add value to AmauiCache for this property and value_
    AmauiCache.add(value, value_, options, amauiStyle?.id);

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
