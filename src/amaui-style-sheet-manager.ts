import isEnvironment from '@amaui/utils/isEnvironment';
import merge from '@amaui/utils/merge';

import AmauiStyle from './amaui-style';
import AmauiStyleSheet from './amaui-style-sheet';
import AmauiTheme from './amaui-theme';
import { TMode, IOptionsRule, IValuesVersion, TStatus, IResponse, IIds, TPriority, ISheets, IAmauiStyleSheetManagerProps, TValueObject } from './interfaces';
import { dynamic, getID, is, names } from './utils';

interface IProperties {
  static: Array<{ property: string; value: any }>;
  dynamic: Array<{ property: string; value: any }>;
}

interface IOptionsStyle {
  attributes?: Record<string, any>;
}

interface IOptions {
  mode?: TMode;
  pure?: boolean;
  priority?: TPriority;
  amauiTheme?: AmauiTheme;
  amauiStyle?: AmauiStyle;
  style?: IOptionsStyle;
  rule?: IOptionsRule;
  amaui_style_cache?: boolean;
  name?: string;
}

const optionsDefault: IOptions = {
  mode: 'regular',
  pure: false,
  priority: 'upper',
  style: {
    attributes: {},
  },
  rule: {
    sort: true,
    prefix: true,
    rtl: true,
  },
  amaui_style_cache: true
};

class AmauiStyleSheetManager {
  public id: string;
  public status: TStatus = 'idle';
  public mode: TMode = 'regular';
  public pure: boolean = false;
  public priority: TPriority = 'upper';
  public amauiTheme: AmauiTheme;
  public amauiStyle: AmauiStyle;
  public values = {
    css: '',
  };
  public properties: IProperties = {
    static: [],
    dynamic: [],
  };
  public sheets: ISheets = {
    static: [],
    dynamic: [],
  };
  public names: IResponse = {
    classNames: {},
    classes: {},
    keyframes: {},
  } as any;
  public users = 0;

  public constructor(
    public value?: TValueObject,
    public options: IOptions = optionsDefault
  ) {
    this.options = merge(options, optionsDefault, { copy: true });

    this.init();
  }

  private propertiesVersion(version = 'static', properties = this.properties): any {
    const value = {
      '@pure': {},
    };

    properties[version].forEach(item => {
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

    Object.keys(this.sheets).forEach(version => {
      this.sheets[version].forEach(sheet => ids[version].push(sheet.id));
    });

    return ids;
  }

  public get response(): IValuesVersion {
    // Response
    this.values.css = ``;

    // Static
    this.sheets.static.forEach(sheet => {
      const { css } = sheet.response;

      if (css) {
        this.values.css += `\n${css}\n`;
      }
    });

    // Dynamic
    this.sheets.dynamic.forEach(sheet => {
      const { css } = sheet.response;

      if (css) {
        this.values.css += `\n${css}\n`;
      }
    });

    return this.values;
  }

  public get css(): string {
    return this.response.css;
  }

  private init() {
    this.id = getID();

    // Options
    this.mode = this.options.mode || this.mode;
    this.pure = this.options.pure !== undefined ? this.options.pure : this.pure;
    this.priority = this.options.priority || this.priority;
    this.amauiTheme = this.options.amauiTheme;
    this.amauiStyle = this.options.amauiStyle;

    // Inherits first from amauiStyle
    this.mode = this.amauiStyle.mode || this.mode;

    this.options.name = this.options.name || this.options.style?.attributes?.method || this.mode;

    // if value is an object
    if (is('object', this.value)) {
      // Props put into values.static and values.dynamic
      const versions = this.versions(this.value);

      // Add values to the properties
      Object.keys(versions).forEach(version => {
        versions[version].forEach(item => {
          this.properties[version].push(item);
        });
      });

      // Make a static sheet only if it doesn't already exist
      if (!!this.properties.static.length && !this.sheets.static.length) {
        new AmauiStyleSheet(
          this.propertiesVersion(),
          {
            version: 'static',
            mode: this.mode,
            pure: this.pure,
            priority: this.priority,
            amauiStyleSheetManager: this,
            amauiTheme: this.amauiTheme,
            amauiStyle: this.amauiStyle,
            props: {},
            ...this.options
          }
        );
      }
    }

    // Update names with methods
    names(this.names);

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
    } as any;

    response = merge(response, this.names, { copy: true });

    const sheets = [
      ...this.sheets.static,
    ];

    // If no static sheet
    // Usecase React.StrictMode purposefull add / remove / add of elements
    // while preserving their state meaning it will add, remove the static sheet
    // yet reuse the AmauiStyleSheetManager instance
    if (!this.sheets.static.length) {
      if (!!this.properties.static.length) {
        const sheet = new AmauiStyleSheet(
          this.propertiesVersion(),
          {
            version: 'static',
            mode: this.mode,
            pure: this.pure,
            priority: this.priority,
            amauiStyleSheetManager: this,
            amauiTheme: this.amauiTheme,
            amauiStyle: this.amauiStyle,
            props: {},
            ...this.options
          }
        );

        sheets.push(sheet);

        // Add dynamic names into the response
        response = merge(response, sheet.names, { copy: true });

        // Add id to the response
        response.ids.static.push(sheet.id);
      }
    }

    // Reviving the static status removed
    if (!!this.sheets.static.length) this.sheets.static.filter(sheet => sheet.status === 'remove').forEach(sheet => sheet.update(this.propertiesVersion()));

    // Static
    sheets.filter(sheet => sheet.version === 'static').forEach(sheet => {
      // Add
      sheet.add(props);
    });

    // if values.dynamic min 1 prop make a dynamic sheet
    if (!!this.properties.dynamic.length) {
      const sheet = new AmauiStyleSheet(
        this.propertiesVersion('dynamic'),
        {
          version: 'dynamic',
          mode: this.mode,
          pure: this.pure,
          priority: this.priority,
          amauiStyleSheetManager: this,
          amauiTheme: this.amauiTheme,
          amauiStyle: this.amauiStyle,
          props: {},
          ...this.options
        }
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

    // Update users value
    this.users++;

    this.amauiStyle.subscriptions.sheet_manager.add.emit(this);

    return response;
  }

  // Make sure to also call all the update hooks
  public update(value: any) {
    // Make all props into remove, add, update props
    if (is('object', value)) {
      const versions = {
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
      const versions_values = this.versions(value);

      // Add values to the versions new
      Object.keys(versions_values).forEach(version => {
        versions_values[version].forEach(item => {
          versions.new[version].push(item);
        });
      });

      // Update

      // Static
      if (!!versions.new.static.length) this.sheets.static.forEach(sheet => sheet.update(this.propertiesVersion('static', versions_values)));

      // Dynamic
      if (!!versions.new.dynamic.length) this.sheets.dynamic.forEach(sheet => sheet.update(this.propertiesVersion('dynamic', versions_values)));
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

    // Update users value
    this.users--;

    // If no more users
    if (!this.users) {
      this.sheets.static.forEach(sheet => {
        // Remove
        sheet.remove();
      });

      // If no more !sheets.static.length and !sheets.dynamic.length
      // update status to idle else update status to remove
      this.status = (!this.sheets.static.length && !this.sheets.dynamic.length) ? 'idle' : 'remove';

      this.amauiStyle.subscriptions.sheet_manager.remove.emit(ids, this);
    }
  }

  private versions(value: any) {
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
