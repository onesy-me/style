import OnesyStyle from './OnesyStyle';
import OnesyStyleRuleProperty from './OnesyStyleRuleProperty';
import { IRuleItem } from './OnesyStyleSheet';
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

function sort(onesyStyle: OnesyStyle, options_: IOptions = {}) {
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
        if (a.value instanceof OnesyStyleRuleProperty && !(b.value instanceof OnesyStyleRuleProperty)) return -1;

        if (
          (a.constructor === b.constructor) ||
          (is('simple', a.value) && is('simple', b.value))
        ) return 0;

        return 1;
      });

      // Order by priority
      if (priority !== 'original') values.sort((a, b) => {
        if (!(
          (a.value instanceof OnesyStyleRuleProperty && b.value instanceof OnesyStyleRuleProperty) ||
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
  if (onesyStyle) {
    onesyStyle.subscriptions.rules.sort.subscribe(method);
  }

  const remove = () => {
    // Remove method from subscriptions
    if (onesyStyle) {
      onesyStyle.subscriptions.rules.sort.unsubscribe(method);
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
