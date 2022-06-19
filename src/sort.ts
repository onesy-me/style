import AmauiCache from '@amaui/cache';
import { is, merge } from '@amaui/utils';

import AmauiStyle from './amaui-style';
import AmauiStyleRuleProperty from './amaui-style-rule-property';
import { IRuleItem } from './amaui-style-sheet';

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
  const options: IOptions = merge(options_, optionsDefault, { copy: true });

  const method = (values: Array<IRuleItem>): ISort => {
    // Check in cache if class name already exists with these values
    const valueCached = AmauiCache.get((is('array', values) && values.map((item: any) => item.id)) || (values as any)?.id, options, amauiStyle?.id);

    if (valueCached) return valueCached;

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

    // Add value to AmauiCache for this property and value_
    AmauiCache.add(value, (is('array', values) && values.map((item: any) => item.id)) || (values as any)?.id, options, amauiStyle?.id);

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
