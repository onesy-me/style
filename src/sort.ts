import AmauiStyle from './AmauiStyle';
import AmauiStyleRuleProperty from './AmauiStyleRuleProperty';
import { IRuleItem } from './AmauiStyleSheet';
import { is } from './utils';

export interface ISort {
  value?: any;
  arguments?: any;
}

export type TOptionsPriority = 'original' | 'shorthand' | 'individual';

export interface IOptions {
  priority?: TOptionsPriority;
}

const optionsDefault: IOptions = {
  priority: 'individual',
};

function sort(amauiStyle: AmauiStyle, options_: IOptions = {}) {
  const options = { ...optionsDefault, ...options_ };

  const method = (values: Array<IRuleItem>): ISort => {
    const value: ISort = {
      arguments: {
        values,
      },
    };

    if (is('array', values)) {
      const priority = options.priority;

      // Sort by grouping all rules
      values.sort((a, b) => {
        if (a.value instanceof AmauiStyleRuleProperty && !(b.value instanceof AmauiStyleRuleProperty)) return -1;

        if (
          (a.constructor === b.constructor) ||
          (is('simple', a.value) && is('simple', b.value))
        ) return 0;

        return 1;
      });

      // Order by priority
      if (priority !== 'original') values.sort((a, b) => {
        if (!(
          (a.value instanceof AmauiStyleRuleProperty && b.value instanceof AmauiStyleRuleProperty) ||
          (is('simple', a.value) && is('simple', b.value))
        )) return 0;

        if (a?.property < b?.property) return priority === 'individual' ? -1 : 1;

        if (a?.property > b?.property) return priority === 'individual' ? 1 : -1;
      });

      // Add sorted array to value
      value.value = values;
    }

    return value;
  };

  // Add method to subscriptions
  if (amauiStyle) {
    amauiStyle.subscriptions.rules.sort.subscribe(method);
  }

  const remove = () => {
    // Remove method from subscriptions
    if (amauiStyle) {
      amauiStyle.subscriptions.rules.sort.unsubscribe(method);
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

export default sort;
