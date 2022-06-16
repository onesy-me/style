import { getID, is, isEnvironment, merge } from '@amaui/utils';

import AmauiStyle from './amaui-style';
import AmauiStyleSheet from './amaui-style-sheet';
import AmauiTheme from './amaui-theme';
import { TMode, IOptionsRule, IValuesVariant, TStatus, IResponse, IIds, TPriority, ISheets, IAmauiStyleSheetManagerProps, TValueObject } from './interfaces';
import { dynamic, names } from './utils';

interface IProperties {
  static: Array<{ property: string; value: any }>;
  dynamic: Array<{ property: string; value: any }>;
}

interface IOptionsStyle {
  attributes?: Record<string, any>;
}

interface IOptions {
  style?: IOptionsStyle;
  rule?: IOptionsRule;
}

const optionsDefault: IOptions = {
  style: {
    attributes: {},
  },
  rule: {
    sort: true,
    prefix: true,
    rtl: true,
  },
};

class AmauiStyleSheetManager {
  public options: IOptions;
  public id: string;
  public status: TStatus = 'idle';
  public values = {
    css: '',
    json: {},
  };
  public properties: IProperties = {
    static: [],
    dynamic: [],
  };
  public sheets: ISheets = {
    static: [],
    dynamic: [],
  };
  public names = {
    classNames: {},
    classes: {},
    keyframes: {},
    styles: (...args: string[]) => {
      const value = [];

      args.forEach(arg => {
        if (this.names.classes[arg]) value.push(this.names.classes[arg]);
      });

      return value.join(' ');
    },
  };

  public constructor(
    public value?: TValueObject,
    public mode: TMode = 'regular',
    public pure = false,
    public priority: TPriority = 'upper',
    public amauiTheme?: AmauiTheme,
    public amauiStyle?: AmauiStyle,
    options: IOptions = optionsDefault
  ) {
    this.options = merge(options, optionsDefault);

    this.init();
  }

  private propertiesVariant(variant = 'static', properties = this.properties): any {
    const value = {
      '@pure': {},
    };

    properties[variant].forEach(item => {
      if (item.value['@pure']) value['@pure'][item.property] = item.value;
      else value[item.property] = item.value;
    });

    if (!Object.keys(value['@pure']).length) delete value['@pure'];

    return value;
  }

  public set props(value: IAmauiStyleSheetManagerProps) {
    const ids = (is('array', value.ids) ? value.ids : [value.ids]) as Array<string>;

    // Update all dynamic sheets from ids value
    this.sheets.dynamic.filter(sheet => ids.some(id => sheet.id === id)).forEach(sheet => {
      // Update
      sheet.props = value.props;
    });

    this.amauiStyle.subscriptions.sheet_manager.update_props.emit(this, value);
  }

  public get ids(): IIds {
    const ids = {
      static: [],
      dynamic: [],
    };

    Object.keys(this.sheets).forEach(variant => {
      this.sheets[variant].forEach(sheet => ids[variant].push(sheet.id));
    });

    return ids;
  }

  public get response(): IValuesVariant {
    this.values.css = ``;

    this.values.json = {};

    // Static
    this.sheets.static.forEach(sheet => {
      const { css, json } = sheet.response;

      if (css) {
        this.values.css += `\n${css}\n`;

        this.values.json = {
          ...this.values.json,
          ...json,
        };
      }
    });

    // Dynamic
    this.sheets.dynamic.forEach(sheet => {
      const { css, json } = sheet.response;

      if (css) {
        this.values.css += `\n${css}\n`;

        this.values.json = {
          ...this.values.json,
          ...json,
        };
      }
    });

    return this.values;
  }

  public get css(): string {
    return this.response.css;
  }

  public get json(): Record<string, any> {
    return this.response.json;
  }

  private init() {
    this.id = getID();

    // Inherits first from amauiStyle
    this.mode = this.amauiStyle.mode || this.mode;

    // if value is an object
    if (is('object', this.value)) {
      // Props put into values.static and values.dynamic
      const variants = this.variants(this.value);

      // Add values to the properties
      Object.keys(variants).forEach(variant => {
        variants[variant].forEach(item => {
          this.properties[variant].push(item);
        });
      });

      // Make a static sheet only if it doesn't already exist
      if (!!this.properties.static.length && !this.sheets.static.length) {
        new AmauiStyleSheet(
          this.propertiesVariant(),
          'static',
          this.mode,
          this.pure,
          this.priority,
          this.amauiTheme,
          this,
          this.amauiStyle,
          {},
          this.options
        );
      }
    }

    // Make a response
    this.response;

    // Add to amauiStyle
    this.amauiStyle.sheet_managers.push(this);

    // Update inited status
    this.status = 'inited';
  }

  public add(props?: any): IResponse {
    let response: IResponse = {
      ids: {
        static: this.ids.static,
        dynamic: [],
      },
    };

    response = merge(response, this.names, { copy: true });

    const sheets = [
      ...this.sheets.static,
    ];

    // Reviving the static status removed
    if (!!this.sheets.static.length) this.sheets.static.filter(sheet => sheet.status === 'remove').forEach(sheet => sheet.update(this.propertiesVariant()));

    // Static
    sheets.filter(sheet => sheet.variant === 'static').forEach(sheet => {
      // Add
      sheet.add(props);
    });

    // if values.dynamic min 1 prop make a dynamic sheet
    if (!!this.properties.dynamic.length) {
      const sheet = new AmauiStyleSheet(
        this.propertiesVariant('dynamic'),
        'dynamic',
        this.mode,
        this.pure,
        this.priority,
        this.amauiTheme,
        this,
        this.amauiStyle,
        {},
        this.options
      );

      // Add
      sheet.add(props);

      // atm
      sheets.push(sheet);

      // Add dynamic names into the response
      response = merge(response, sheet.names, { copy: true });

      // Add id to the response
      response.ids.dynamic.push(sheet.id);
    }

    if (isEnvironment('browser')) {
      // Status
      this.status = 'active';
    }

    // Update object names value
    names(response);

    this.amauiStyle.subscriptions.sheet_manager.add.emit(this);

    return response;
  }

  // Make sure to also call all the update hooks
  public update(value: any) {
    // Make all props into remove, add, update props
    if (is('object', value)) {
      const variants = {
        previous: {
          static: this.properties.static,
          dynamic: this.properties.dynamic,
        },
        new: {
          static: [],
          dynamic: [],
        },
      };

      // Props put into values.static and values.dynamic
      const variants_values = this.variants(value);

      // Add values to the variants new
      Object.keys(variants_values).forEach(variant => {
        variants_values[variant].forEach(item => {
          variants.new[variant].push(item);
        });
      });

      // Update

      // Static
      if (!!variants.new.static.length) this.sheets.static.forEach(sheet => sheet.update(this.propertiesVariant('static', variants_values)));

      // Dynamic
      if (!!variants.new.dynamic.length) this.sheets.dynamic.forEach(sheet => sheet.update(this.propertiesVariant('dynamic', variants_values)));
    }

    const response: IResponse = {
      ids: this.ids,
      ...this.names,
    };

    this.amauiStyle.subscriptions.sheet_manager.update.emit(this);

    return response;
  }

  public remove(ids_: string[] = []) {
    const ids = is('array', ids_) ? ids_ : [ids_];

    // Remove all dynamic sheets from ids value
    this.sheets.dynamic.filter(sheet => ids.some(id => sheet.id === id)).forEach(sheet => {
      // Remove
      sheet.remove();
    });

    // And if !sheets.dynamic.length remove all static sheets as well
    if (!this.sheets.dynamic.length) {
      this.sheets.static.forEach(sheet => {
        // Remove
        sheet.remove();
      });
    }

    // If no more !sheets.static.length and !sheets.dynamic.length
    // update status to idle else update status to remove
    this.status = (!this.sheets.static.length && !this.sheets.dynamic.length) ? 'idle' : 'remove';

    this.amauiStyle.subscriptions.sheet_manager.remove.emit(ids, this);
  }

  private variants(value: any) {
    const response = {
      static: [],
      dynamic: [],
    };

    if (is('object', value)) {
      const pureValues = { static: {}, dynamic: {} };

      // pure props
      Object.keys(value).filter(prop => value[prop]['@pure'] === true || value[prop]['@p'] === true).forEach(prop => {
        pureValues[!dynamic(value[prop]) ? 'static' : 'dynamic'][prop] = value[prop];
      });

      // @pure object
      const pure = merge(value['@pure'] || {}, value['@p'] || {});

      Object.keys(pure).forEach(prop => {
        const isStatic = !dynamic(pure[prop]);

        pureValues[isStatic ? 'static' : 'dynamic'][prop] = {
          ...(merge(pureValues[isStatic ? 'static' : 'dynamic'][prop] || {}, pure[prop])),
          '@pure': true,
        };
      });

      // regular props
      Object.keys(value).filter(prop => ['@pure', '@p'].indexOf(prop) === -1 && !(value[prop]['@pure'] === true || value[prop]['@p'] === true)).forEach(prop => {
        response[!dynamic(value[prop]) ? 'static' : 'dynamic'].push({ property: prop, value: value[prop] });
      });

      // Merge pure and regular props
      response.static = [
        ...Object.keys(pureValues.static).map(prop => ({ property: prop, value: pureValues.static[prop] })),
        ...response.static,
      ];

      response.dynamic = [
        ...Object.keys(pureValues.dynamic).map(prop => ({ property: prop, value: pureValues.dynamic[prop] })),
        ...response.dynamic,
      ];
    }

    return response;
  }

}

export default AmauiStyleSheetManager;
