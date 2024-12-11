import copy from '@onesy/utils/copy';
import element from '@onesy/utils/element';
import isEnvironment from '@onesy/utils/isEnvironment';
import merge from '@onesy/utils/merge';
import Try from '@onesy/utils/try';
import { TMethod } from '@onesy/models';
import OnesySubscription from '@onesy/subscription';
import OnesyMeta from '@onesy/meta';

import { IOptionsRule, IValuesVersion, TMode, TRefs } from './interfaces';
import OnesyStyleRenderer from './OnesyStyleRenderer';
import OnesyStyleSheet from './OnesyStyleSheet';
import OnesyStyleSheetManager from './OnesyStyleSheetManager';
import { getID, is, minify } from './utils';

export interface IOnesyPluginItem {
  method: TMethod;
  arguments: any[];
}

export type TOnesyPlugin = TMethod | IOnesyPluginItem;

export type OnesyPlugins = TOnesyPlugin | TOnesyPlugin[];

interface IOptions {
  element?: Element;
  mode?: TMode;
  renderer?: OnesyStyleRenderer;
  rule?: IOptionsRule;
  minify?: boolean;
  optimize?: boolean;
  classNamePrefix?: string;
}

const optionsDefault: IOptions = {
  mode: 'regular',
  rule: {
    sort: true,
    prefix: true,
    rtl: false,
  },
  minify: true,
  optimize: false,
  classNamePrefix: ''
};

class OnesyStyle {
  public id?: string;
  public element?: Element;
  public mode?: TMode = 'regular';
  public renderer: OnesyStyleRenderer;
  public direction: string;
  public subscriptions = {
    className: {
      pre: new OnesySubscription(),
      name: new OnesySubscription(),
      post: new OnesySubscription(),
    },
    keyframes: {
      pre: new OnesySubscription(),
      name: new OnesySubscription(),
      post: new OnesySubscription(),
    },
    rule: {
      pre: new OnesySubscription(),
      unit: new OnesySubscription(),
      value: new OnesySubscription(),
      prefix: new OnesySubscription(),
      rtl: new OnesySubscription(),
      add: new OnesySubscription(),
      update: new OnesySubscription(),
      update_props: new OnesySubscription(),
      remove: new OnesySubscription(),
      post: new OnesySubscription(),
    },
    rules: {
      sort: new OnesySubscription(),
    },
    sheet: {
      add: new OnesySubscription(),
      update: new OnesySubscription(),
      update_props: new OnesySubscription(),
      remove: new OnesySubscription(),
    },
    sheet_manager: {
      add: new OnesySubscription(),
      update: new OnesySubscription(),
      update_props: new OnesySubscription(),
      remove: new OnesySubscription(),
    },
  };
  public values = {
    css: '',
  };
  public refs: TRefs = {};
  public sheets: Array<OnesyStyleSheet> = [];
  public sheet_managers: Array<OnesyStyleSheetManager> = [];

  public static counter = {
    className: 0,
    keyframesName: 0
  };

  // Any new property
  [p: string]: any;

  public constructor(
    public options: IOptions = copy(optionsDefault),
  ) {
    this.options = merge(options, optionsDefault, { copy: true });

    this.init();
  }

  public get response(): IValuesVersion {
    this.values.css = ``;

    this.sheets.forEach(sheet => {
      const css = sheet.css;

      if (css) {
        this.values.css += css;
      }
    });

    if (this.values.css) this.values.css = `\n${this.values.css}\n`;

    if (this.options.minify) this.values.css = minify(this.values.css);

    return this.values;
  }

  public get css(): string {
    return this.response.css;
  }

  public get plugins() {
    const onesyStyle = this;

    return {
      // Add plugins
      set add(value_: OnesyPlugins) {
        const value = (is('array', value_) ? value_ : [value_]);

        (value as any[])
          .filter(item => (
            (
              is('object', item) &&
              (
                is('function', item.method) &&
                !OnesyMeta.get(item.method, onesyStyle, 'plugin')
              )
            ) ||
            (
              is('function', item) &&
              !OnesyMeta.get(item, onesyStyle, 'plugin')
            )
          ))
          .forEach(item => {
            try {
              const method = is('function', item) ? item : (item as any).method;
              const args = is('object', item) ? item.arguments : [];

              const response = method(onesyStyle, ...args);

              OnesyMeta.add(method, response, onesyStyle, 'plugin');
            }
            catch (error) {
              console.error('OnesyStyle use: ', error);
            }
          });
      },

      // Remove plugins
      set remove(value_: OnesyPlugins) {
        const value = (is('array', value_) ? value_ : [value_]);

        (value as TOnesyPlugin[])
          .filter(item => (
            (
              is('object', item) &&
              (
                is('function', (item as any).method) &&
                !OnesyMeta.get((item as any).method, onesyStyle, 'plugin')
              )
            ) ||
            (
              is('function', item) &&
              !OnesyMeta.get(item, onesyStyle, 'plugin')
            )
          ))
          .forEach(item => {
            try {
              const method = is('function', item) ? item : (item as any).method;

              const response = OnesyMeta.get(method, onesyStyle, 'plugin');

              if (is('function', response?.remove)) response.remove();
            }
            catch (error) {
              console.error('OnesyStyle remove plugin: ', error);
            }
          });
      }
    };
  }

  public init() {
    // Options
    this.element = this.options.element || this.element;
    this.mode = this.options.mode || 'regular';
    this.renderer = this.options.renderer || new OnesyStyleRenderer();

    if (this.id === undefined) this.id = getID();

    if (isEnvironment('browser')) {
      if (!this.element) this.element = window.document.body;

      // OnesyStyle in element
      this.element.setAttribute('data-onesy-style', 'true');

      (this.element as any)['onesy-style'] = true;

      (this.element as any).onesy_style = this;

      // Ltr
      const style = Try(() => window.getComputedStyle(this.element));

      this.direction = style?.direction || Try(() => window.getComputedStyle(document.documentElement).direction) || 'ltr';

      this.options.rule.rtl = this.direction === 'rtl';
    }
  }

  public static attributes = [
    'data-onesy-style',
    'onesy-style'
  ];

  public static get(value: Element, index = 0): OnesyStyle {
    const themes = this.all(value);

    return themes[index === -1 ? themes.length - 1 : index];
  }

  public static first(value: Element): OnesyStyle {
    return this.get(value);
  }

  public static last(value: Element): OnesyStyle {
    return this.get(value, -1);
  }

  public static nearest(value: Element): OnesyStyle {
    return (element(value).nearest(this.attributes.map(item => `[${item}]`)) as any)?.onesy_style;
  }

  public static furthest(value: Element): OnesyStyle {
    return (element(value).furthest(this.attributes.map(item => `[${item}]`)) as any)?.onesy_style;
  }

  public static all(value: Element): Array<OnesyStyle> {
    const elements = [
      value,
      ...element(value).parents(this.attributes.map(item => `[${item}]`)),
    ];

    return elements
      .filter(Boolean)
      .map((item: any) => item.onesy_style)
      .filter(Boolean) || [];
  }

}

export default OnesyStyle;
