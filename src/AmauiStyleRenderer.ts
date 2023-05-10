import isEnvironment from '@amaui/utils/isEnvironment';

import { TPriority } from './interfaces';

class AmauiStyleRenderer {

  public make(attributes = { element: {}, data: {} }, version = 'style'): Element {
    // Append to the bottom of head element
    if (isEnvironment('browser')) {
      const element = window.document.createElement(version);

      Object.keys(attributes?.element || {}).forEach(attribute => element.setAttribute(attribute, attributes.element[attribute]));

      // Add attributes
      Object.keys(attributes?.data || {}).forEach(attribute => {
        element[attribute] = attributes.data[attribute];

        element.setAttribute(attribute.indexOf('data-') === 0 ? attribute : `data-${attribute}`, attributes.data[attribute]);
      });

      return element;
    }
  }

  public add(value: Element, priority: TPriority = 'lower', attributes: any): Element {
    // Append to the bottom of head element
    if (isEnvironment('browser')) {
      const styleSheets = window.document.styleSheets;

      if (!styleSheets.length || priority === 'upper') window.document.head.append(value);
      else {
        const reset = Array.from(styleSheets).find(item => (item.ownerNode as any).method === 'reset');
        let pure: any = Array.from(styleSheets).filter(item => (item.ownerNode as any).method === 'pure');

        pure = pure[pure.length - 1] as CSSStyleSheet;

        if (
          attributes?.data?.method === 'reset' ||
          (priority === 'lower' && !(pure || reset))
        ) window.document.head.insertBefore(value, styleSheets[0]?.ownerNode || null);
        else if (priority === 'lower') {
          if (pure) window.document.head.insertBefore(value, pure.ownerNode.nextElementSibling);
          else if (reset) window.document.head.insertBefore(value, reset.ownerNode.nextElementSibling);
        }
        else window.document.head.append(value);
      }

      return value;
    }
  }

  public remove(value: Element) {
    let element = value;

    if ((value as any)?.ownerNode) element = (element as any).ownerNode;

    if (element?.remove) element.remove();
  }

}

export default AmauiStyleRenderer;
