import unique from '@amaui/utils/unique';

import { is } from './utils';

export function classNames(value?: any, prefix = '', array = false): string {
  let classNameValues = [];

  const method = (item: any, prop?: any) => {
    if (is('string', item) && item.length) classNameValues.push(item);
    else if (is('object', item)) Object.keys(item).forEach(prop_ => method(item[prop_], prop_));
    else if (is('array', item)) item.forEach(item_ => method(item_));
    else if (prop && !!item) classNameValues.push(prop);
  };

  // Move through the value
  method(value);

  classNameValues = classNameValues.filter(Boolean).map(item_ => {
    let item = item_.trim();

    if (['.', '#'].indexOf(item[0]) > -1) item = item.slice(1);

    return `${prefix || ''}${item}`;
  });

  classNameValues = unique(classNameValues);

  return array ? classNameValues as any : classNameValues.join(' ');
}

export default classNames;
