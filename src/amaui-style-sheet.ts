import copy from '@amaui/utils/copy';
import hash from '@amaui/utils/hash';
import isEnvironment from '@amaui/utils/isEnvironment';
import getEnvironment from '@amaui/utils/getEnvironment';
import merge from '@amaui/utils/merge';

import AmauiStyle from './amaui-style';
import AmauiStyleRule from './amaui-style-rule';
import AmauiStyleSheetManager from './amaui-style-sheet-manager';
import AmauiTheme from './amaui-theme';
import { TMode, IOptionsRule, IValuesVersion, TStatus, TPriority, IAddRuleResponse, TValueObject } from './interfaces';
import { dynamic, getID, is } from './utils';

type TVersion = 'all' | 'static' | 'dynamic';

export interface IRuleItem {
  property: string;
  value: any;
}

export interface IOptionsStyle {
  attributes?: Record<string, any>;
}

export interface IOptions {
  style?: IOptionsStyle;
  rule?: IOptionsRule;
  name?: string;
}

const env = getEnvironment();

const optionsDefault: IOptions = {
  style: {
    attributes: {},
  },
  rule: {
    sort: true,
    prefix: true,
    rtl: true,
  }
};

class AmauiStyleSheet {
  public id: string;
  public status: TStatus = 'idle';
  public element: HTMLStyleElement;
  public sheet: CSSStyleSheet;
  public domElementForTesting: HTMLDivElement;
  private props_: any = {};
  public values = {
    css: '',
  };
  public rules: Array<IRuleItem> = [];
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
    public version: TVersion = 'static',
    public mode: TMode = 'regular',
    public pure = false,
    public priority: TPriority = 'upper',
    public amauiTheme?: AmauiTheme,
    public amauiStyleSheetManager?: AmauiStyleSheetManager,
    public amauiStyle?: AmauiStyle,
    props: any = {},
    public options: IOptions = copy(optionsDefault)
  ) {
    this.options = merge(options, optionsDefault, { copy: true });

    this.props = props;

    this.init();
  }

  public get props() {
    return this.props_;
  }

  public set props(props: any) {
    if (this.propsAreNew(props)) {
      this.props_ = copy(props);

      // Update if new props are set
      this.updateProps();
    }
  }

  public get response(): IValuesVersion {
    // Response
    this.values.css = ``;

    this.rules.filter(rule => !rule.value.ref).forEach(rule => {
      const css = rule.value.css;

      if (css) {
        this.values.css += `\n${css}\n`;
      }
    });

    return this.values;
  }

  public get css(): string {
    return this.response.css;
  }

  private get sort() {
    // Sort
    // Native sort based on levels first
    // for making, updating & refs
    this.rules.sort((a, b) => {
      if (a.value.level === b.value.level) return 0;

      return a.value.level < b.value.level ? -1 : 1;
    });

    // and then based on pure
    // pure rules have lower priority, are on top
    // more specific rules are on bottom have higher specificity
    this.rules.sort((a, b) => {
      if (a.value.pure && !b.value.pure) return -1;

      if (b.value.pure && !a.value.pure) return 1;

      return 0;
    });

    return this.rules;
  }

  private init() {
    this.id = getID();

    // Inherits first from amauiStyle
    this.mode = this.amauiStyle.mode || this.mode;

    // Reset rules
    this.rules = [];

    // If value is an object
    if (is('object', this.value)) {
      // Sort all properties so at-rules are at the start (ie. @keyframes for animation makeSelector value)
      // but @media rules go at the bottom
      const props = Object.keys(this.value).sort((a, b) => {
        if (a.indexOf('@keyframes') > -1) return -1;

        if (b.indexOf('@') > -1) return 1;

        return 0;
      });

      const ignore = ['@pure', '@p'];

      // Make an AmauiStyleRule for all lvl 0 props
      props.filter(prop => ignore.indexOf(prop) === -1).forEach((prop, index) => this.makeRule(prop, this.value[prop], index));

      // Pure
      const pure = { ...((this.value['@p'] || {}) as object), ...((this.value['@pure'] || {}) as object) };

      Object.keys(pure).forEach((prop, index) => this.makeRule(prop, pure[prop], props.length + index, true));

      // Sort
      this.sort;

      // Make selectors
      // on init so they are
      // available on init in node for
      // critical css extraction
      this.rules.forEach(rule => {
        // Update values
        rule.value.updateValues(false);

        // Update owned rules css
        // to use for allCss and hash value
        rule.value.rules_owned.filter(rule_ => rule_ instanceof AmauiStyleRule).forEach(rule_ => rule_.updateValues());

        // Make selectors
        rule.value.makeSelector();
      });
    }

    // Add to amauiStyle and amauiStyleSheetManager
    if (this.amauiStyleSheetManager) this.amauiStyleSheetManager.sheets[this.version]?.push(this);

    if (this.amauiStyleSheetManager && this.amauiStyleSheetManager.options.amaui_style_cache) this.amauiStyle.sheets.push(this);

    // Update inited status
    this.status = 'inited';
  }

  public addRule(value: any, property_?: string, add = true): IAddRuleResponse {
    const isDynamic = dynamic(value);

    if (
      value !== undefined &&
      (
        (this.version === 'static' && !isDynamic) ||
        (this.version === 'dynamic' && isDynamic)
      )
    ) {
      let property = property_ !== undefined ? property_ : env.amaui_methods.makeName.next().value;

      const props = (is('object', this.value) && Object.keys(this.value)) || [];

      if (!!props.length) while (props.indexOf(property) > -1) property = env.amaui_methods.makeName.next().value;

      const isPure = ['@pure', '@p'];

      if ((isPure.indexOf(property) > -1 && is('object', value))) {
        Object.keys(value).forEach(item => this.makeRule(item, value[item]));
      }
      else {
        const rule = this.makeRule(property, value);

        // Add
        if (add) rule.add();

        if (rule.status === 'active') {
          const response = {
            className: rule.className,
            classNames: rule.classNames,
            keyframeName: rule.keyframesName,
          };

          return response;
        }
      }
    }
  }

  public add(props?: any) {
    // Update props
    if (props !== undefined) this.props = props;

    if (
      this.status !== 'active' &&
      !!this.rules.length &&
      this.rules.some(rule => rule.value && !!rule.value.rules.length)
    ) {
      // If in browser only
      if (isEnvironment('browser')) {
        // Make a style tag
        const attributes = {
          element: {
            type: 'text/css',
            id: 'a' + this.id,
          },
          data: {
            ...(this.options.style?.attributes || {}),
            amaui: true,
            mode: this.mode,
            pure: this.pure,
            version: this.version,
            name: this.options.name
          },
        };

        this.element = this.amauiStyle.renderer.make(attributes) as HTMLStyleElement;

        // Add to the DOM
        this.amauiStyle.renderer.add(this.element, this.priority, attributes);

        // Add
        this.rules.filter(item => !item.value.ref).forEach(item => {
          item.value.add();
        });

        // Make css
        // Only if it's not a ref rule
        // this.rules.filter(item => !item.value.ref).forEach(item => item.value.addRuleToCss());
        this.element.innerHTML = this.response.css;

        // Make a sheet ref
        this.sheet = this.element.sheet;

        // Move through rules
        this.rules.forEach(rule => rule.value.addRuleRef());

        // Update active status
        this.status = 'active';

        this.amauiStyle.subscriptions.sheet.add.emit(this);
      }
      // Node only make names
      else {
        this.rules.filter(item => !item.value.ref).forEach(item => {
          // Add
          item.value.add();
        });
      }

      // Dom
      this.domElementForTesting = window.document.createElement('div');
    }
  }

  public update(value: any) {
    if (is('object', value)) {
      // Update active status
      if (this.status === 'remove') this.status = 'active';

      // Update all the items to pure
      if (this.pure) Object.keys(value).forEach(item => {
        if (is('object', value[item])) value[item]['@p'] = true;
      });

      const properties = {
        add: [],
        update: [],
        remove: [],
      };

      const items = {
        previous: this.rules,
        new: [],
      };

      const pure = { ...(value['@pure'] || {}), ...(value['@p'] || {}) };

      // Props
      Object.keys(value).filter(item => ['@pure', '@p'].indexOf(item) === -1).forEach(item => {
        items.new.push({ property: item, value: value[item], parents: item });
      });

      // Pure
      Object.keys(pure).forEach(item => {
        items.new.push({ property: item, value: pure[item], parents: item });
      });

      // Extract any & ref rules from new and add 'em to new
      const add = [];

      const refValues = (item, parents_) => {
        if (is('object', item)) Object.keys(item).forEach(key => {
          if (key.includes('&')) add.push({ property: key, value: item[key], parents_ });

          refValues(item[key], parents_ + ' ' + key);
        });
      };

      items.new.forEach(item => refValues(item.value, item.property));

      items.new.push(...add);

      const parents = item => {
        const parents_ = item.value.parents.filter(item_ => !(item_ instanceof AmauiStyleSheet));

        return parents_.map(item_ => item_.property).join(' ') || item.value.property;
      };

      // To update, add
      items.new.forEach(itemNew => {
        const previouses = items.previous.filter(itemPrevious => (
          (itemPrevious.value.pure === !!(itemNew.value['@pure']) || itemNew.value['@p'])) &&
          itemPrevious.property === itemNew.property &&
          parents(itemPrevious) === itemNew.parents
        );

        // Add or update
        if (!previouses.length) properties.add.push(itemNew);
        else if (previouses.some(item => (
          parents(item) === itemNew.parents &&
          hash(item.value.values.value) !== hash(itemNew.value)
        ))) properties.update.push(itemNew);
      });

      // To remove
      items.previous.forEach(itemPrevious => {
        const newItem = items.new.find(itemNew => (
          (itemPrevious.value.pure === !!(itemNew.value['@pure'] || itemNew.value['@p'])) &&
          itemPrevious.property === itemNew.property &&
          parents(itemPrevious) === itemNew.parents
        ));

        // Remove
        if (!newItem) properties.remove.push(itemPrevious);
      });

      // Activity
      Object.keys(properties).forEach(activity => {
        // Activity items
        properties[activity].forEach(item => {
          const rule = this.rules.find(rule_ => (
            (rule_.value.pure === !!(item.value['@pure'] || item.value['@p'])) &&
            (rule_.value.property === item.property) &&
            item.parents === parents(rule_)
          ));

          switch (activity) {
            case 'add':
              this.addRule(item.value, item.property);

              break;

            case 'remove':
              if (rule) rule.value.remove();

              break;

            case 'update':
              if (rule) rule.value.update(item.value);

              break;

            default:
              break;
          }
        });
      });

      this.amauiStyle.subscriptions.sheet.update.emit(this);
    }
  }

  public remove() {
    // Remove all the rules
    const rules = this.rules.map(item => item.value);

    rules.forEach(rule => rule.remove());

    // Remove the style tag, only if all the rules are removed
    if (!this.rules.length) {
      if (is('function', this.element?.remove)) this.amauiStyle.renderer.remove(this.element);

      // Remove from amauistyle
      let index = this.amauiStyle.sheets.findIndex(sheet => sheet.id === this.id);

      if (index > -1) this.amauiStyle.sheets.splice(index, 1);

      // Remove from amauiStyleSheetManager
      index = this.amauiStyleSheetManager.sheets[this.version].findIndex(sheet => sheet.id === this.id);

      if (index > -1) this.amauiStyleSheetManager.sheets[this.version].splice(index, 1);

      // Update idle status
      this.status = 'idle';
      this.element = undefined;
      this.sheet = undefined;

      this.amauiStyle.subscriptions.sheet.remove.emit(this);
    }
    else {
      // Update remove status
      this.status = 'remove';
    }
  }

  private updateProps() {
    this.rules.forEach(rule => rule.value.updateProps());

    this.amauiStyle.subscriptions.sheet.update_props.emit(this);
  }

  private propsAreNew(props: any) {
    return (
      (props && Object.keys(props).reduce((result, item) => result += item + String(props[item]), '')) ===
      (this.props && Object.keys(this.props).reduce((result, item) => result += item + String(this.props[item]), ''))
    );
  }

  private makeRule(property: string, value: any, index: number = this.rules.length, pure = false) {
    // Pre
    this.amauiStyle.subscriptions.rule.pre.emit();

    const rule = AmauiStyleRule.make(
      value,
      property,
      'regular',
      'property',
      this.pure || pure,
      index,
      this,
      [this],
      this,
      this.amauiStyle
    );

    // Post
    this.amauiStyle.subscriptions.rule.post.emit(rule);

    return rule;
  }

}

export default AmauiStyleSheet;
