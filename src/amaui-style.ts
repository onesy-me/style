import { copy, element, isEnvironment, merge, Try } from '@amaui/utils';
import { TMethod } from '@amaui/models';
import AmauiSubscription from '@amaui/subscription';
import AmauiMeta from '@amaui/meta';

import { IOptionsRule, IValuesVariant, TMode, TRefs } from './interfaces';
import AmauiStyleRenderer from './amaui-style-renderer';
import AmauiStyleSheet from './amaui-style-sheet';
import AmauiStyleSheetManager from './amaui-style-sheet-manager';
import { getID, is } from './utils';

interface IOptions {
  rule?: IOptionsRule;
}

const optionsDefault: IOptions = {
  rule: {
    sort: true,
    prefix: false,
    rtl: false,
  },
};

class AmauiStyle {
  public id?: string;
  public direction: string;
  public subscriptions = {
    className: {
      pre: new AmauiSubscription(),
      name: new AmauiSubscription(),
      post: new AmauiSubscription(),
    },
    keyframes: {
      pre: new AmauiSubscription(),
      name: new AmauiSubscription(),
      post: new AmauiSubscription(),
    },
    rule: {
      pre: new AmauiSubscription(),
      unit: new AmauiSubscription(),
      value: new AmauiSubscription(),
      prefix: new AmauiSubscription(),
      rtl: new AmauiSubscription(),
      add: new AmauiSubscription(),
      update: new AmauiSubscription(),
      update_props: new AmauiSubscription(),
      remove: new AmauiSubscription(),
      post: new AmauiSubscription(),
    },
    rules: {
      sort: new AmauiSubscription(),
    },
    sheet: {
      add: new AmauiSubscription(),
      update: new AmauiSubscription(),
      update_props: new AmauiSubscription(),
      remove: new AmauiSubscription(),
    },
    sheet_manager: {
      add: new AmauiSubscription(),
      update: new AmauiSubscription(),
      update_props: new AmauiSubscription(),
      remove: new AmauiSubscription(),
    },
  };
  public values = {
    css: '',
  };
  public refs: TRefs = {};
  public sheets: Array<AmauiStyleSheet> = [];
  public sheet_managers: Array<AmauiStyleSheetManager> = [];

  // Any new property
  [p: string]: any;

  public constructor(
    /* tslint:disable-next-line */
    public element?: Element,
    public mode?: TMode,
    public renderer: AmauiStyleRenderer = new AmauiStyleRenderer(),
    public options: IOptions = copy(optionsDefault),
  ) {
    this.options = merge(options, optionsDefault, { copy: true });

    this.init();
  }

  public get response(): IValuesVariant {
    this.values.css = ``;

    this.sheets.forEach(sheet => {
      const css = sheet.css;

      if (css) {
        this.values.css += css;
      }
    });

    if (this.values.css) this.values.css = `\n${this.values.css}\n`;

    return this.values;
  }

  public get css(): string {
    return this.response.css;
  }

  public get plugins() {
    const amauiStyle = this;

    return {
      // Add plugins
      set add(value_: TMethod | TMethod[]) {
        const value = (is('array', value_) ? value_ : [value_]) as TMethod[];

        value
          .filter(method => (
            is('function', method) &&
            !AmauiMeta.get(method, amauiStyle, 'plugin')
          ))
          .forEach(method => {
            try {
              const response = method(amauiStyle);

              AmauiMeta.add(method, response, amauiStyle, 'plugin');
            }
            catch (error) {
              console.error('AmauiStyle use: ', error);
            }
          });
      },
      // Remove plugins
      set remove(value_: TMethod | TMethod[]) {
        const value = (is('array', value_) ? value_ : [value_]) as TMethod[];

        value
          .filter(method => is('function', method))
          .forEach(method => {
            try {
              const response = AmauiMeta.get(method, amauiStyle, 'plugin');

              if (is('function', response?.remove)) response.remove();
            }
            catch (error) {
              console.error('AmauiStyle remove plugin: ', error);
            }
          });
      }
    };
  }

  public init() {
    if (this.id === undefined) this.id = getID();

    if (isEnvironment('browser')) {
      if (this.element) {
        // AmauiStyle in element
        this.element.setAttribute('data-amaui-style', 'true');

        (this.element as any)['amaui-style'] = true;

        (this.element as any).amaui_style = this;

        // Ltr
        const style = Try(() => window.getComputedStyle(this.element));

        this.direction = style?.direction || Try(() => window.getComputedStyle(document.documentElement).direction) || 'ltr';

        this.options.rule.rtl = this.direction === 'rtl';
      }
    }
  }

  public static attributes = [
    'data-amaui-style',
    'amaui-style'
  ];

  public static get(value: Element, index = 0): AmauiStyle {
    const themes = this.all(value);

    return themes[index === -1 ? themes.length - 1 : index];
  }

  public static first(value: Element): AmauiStyle {
    return this.get(value);
  }

  public static last(value: Element): AmauiStyle {
    return this.get(value, -1);
  }

  public static nearest(value: Element): AmauiStyle {
    return (element(value).nearest(this.attributes.map(item => `[${item}]`)) as any)?.amaui_style;
  }

  public static furthest(value: Element): AmauiStyle {
    return (element(value).furthest(this.attributes.map(item => `[${item}]`)) as any)?.amaui_style;
  }

  public static all(value: Element): Array<AmauiStyle> {
    const elements = [
      value,
      ...element(value).parents(this.attributes.map(item => `[${item}]`)),
    ];

    return elements
      .filter(Boolean)
      .map((item: any) => item.amaui_style)
      .filter(Boolean) || [];
  }

}

export default AmauiStyle;
