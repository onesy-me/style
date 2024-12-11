import hash from '@onesy/utils/hash';
import Try from '@onesy/utils/try';
import castParam from '@onesy/utils/castParam';
import getEnvironment from '@onesy/utils/getEnvironment';
import merge from '@onesy/utils/merge';
import OnesySubscription from '@onesy/subscription';

import OnesyStyle from './OnesyStyle';
import OnesyStyleSheet from './OnesyStyleSheet';
import OnesyStyleRuleProperty from './OnesyStyleRuleProperty';
import classNamesMethod from './classNames';
import { IOptionsRule, IValuesVersion, TMode, TRef, TStatus, TValueVersion } from './interfaces';
import { cammelCaseToKebabCase, getID, getRefs, is, isOnesySubscription, valueResolve } from './utils';

export type TVersion = 'property' | 'at-rule';

export interface IRuleItemWithString {
  property: string;
  value: OnesyStyleRule | OnesyStyleRuleProperty;
}

export interface IOnesyStyleRuleValue {
  value: Array<string | (() => any) | OnesySubscription>;
  options?: {
    rule?: IOptionsRule;
  };
}

export type TRules = Array<{ property: string; value: OnesyStyleRule | OnesyStyleRuleProperty }>;

interface IOptions extends IOptionsRule {
  mode?: TMode;
  value_version?: TValueVersion;
  version?: TVersion;
  pure?: boolean;
  index?: number;
  owner?: OnesyStyleRule | OnesyStyleSheet;
  parents?: Array<OnesyStyleSheet | OnesyStyleRule>;
  onesyStyle?: OnesyStyle;
  onesyStyleSheet?: OnesyStyleSheet;
}

const optionsDefault: IOptions = {
  mode: 'regular',
  value_version: 'value',
  version: 'property',
  pure: false,
  index: 0,
  sort: true,
  prefix: true,
  rtl: true
};

const env = getEnvironment();

class OnesyStyleRule {
  public id: string;
  public value_version: TValueVersion = 'value';
  public mode: TMode = 'regular';
  public version: TVersion = 'property';
  public pure = false;
  public index = 0;
  public owner: OnesyStyleRule | OnesyStyleSheet;
  public parents: Array<OnesyStyleSheet | OnesyStyleRule> = [];
  public onesyStyleSheet: OnesyStyleSheet;
  public onesyStyle: OnesyStyle;
  public rule_: CSSStyleRule;
  public status: TStatus = 'idle';
  public level: number;
  public level_actual: number;
  public isVariable = false;
  public hash_: string;
  public static = true;
  public rules_owned: Array<OnesyStyleRule | OnesyStyleRuleProperty> = [];
  public ref: TRef;
  public className_: string = '';
  public selector_: string = '';
  public classNames_: string = '';
  public keyframesName_: string = '';
  public values = {
    value: undefined,
    css: '',
  };
  public rules: TRules = [];

  public constructor(
    public value: any,
    public property: string,
    public options: IOptions = optionsDefault
  ) {
    this.options = { ...optionsDefault, ...this.options };

    this.init();
  }

  public get selector() {
    return this.selector_;
  }

  private set selector(value: string) {
    this.selector_ = value;
  }

  public get className() {
    return this.className_;
  }

  public set className(value: string) {
    const parentKeyframes = this.parent.version === 'at-rule';

    if (!parentKeyframes) {
      this.className_ = value;

      // Update classNames
      if (!this.classNames.match(new RegExp(`^(\.)?${this.className} | (\.)?${this.className} | (\.)?${this.className}$`, 'g'))) this.classNames = `${this.className} ${this.classNames}`.trim();

      this.onesyStyleSheet.names.classNames[this.property] = this.className;

      // in onesyStyleSheetManager only for static sheets
      if (this.onesyStyleSheet.version === 'static' && this.onesyStyleSheet.onesyStyleSheetManager) {
        this.onesyStyleSheet.onesyStyleSheetManager.names.classNames[this.property] = this.className;
      }
    }
  }

  public get classNames() {
    return this.classNames_;
  }

  public set classNames(value: string) {
    this.classNames_ = value;

    this.onesyStyleSheet.names.classes[this.property] = this.classNames;

    // in onesyStyleSheetManager only for static sheets
    if (this.onesyStyleSheet.version === 'static' && this.onesyStyleSheet.onesyStyleSheetManager) {
      this.onesyStyleSheet.onesyStyleSheetManager.names.classes[this.property] = this.classNames;
    }
  }

  public get keyframesName() {
    return this.keyframesName_;
  }

  public set keyframesName(value: string) {
    this.keyframesName_ = value;

    const property = this.property.indexOf('@') === 0 ? this.property.split(' ')[1] : this.property;

    // Update onesyStyleSheet keyframes
    this.onesyStyleSheet.names.keyframes[property] = this.keyframesName;

    // in onesyStyleSheetManager only for static sheets
    if (this.onesyStyleSheet.version === 'static' && this.onesyStyleSheet.onesyStyleSheetManager) {
      if (!this.onesyStyleSheet.onesyStyleSheetManager.names.keyframes[property]) {
        this.onesyStyleSheet.onesyStyleSheetManager.names.keyframes[property] = this.keyframesName;
      }
    }
  }

  public get hash(): string {
    return this.hash_;
  }

  public get parent(): OnesyStyleRule | OnesyStyleSheet {
    return this.parents[this.parents.length - 1];
  }

  public get response(): IValuesVersion {
    return { css: this.values.css };
  }

  public get css(): string {
    return this.response.css;
  }

  get allOwnedCss() {
    let value = this.values.css;

    this.rules_owned
      .filter(item => item instanceof OnesyStyleRule)
      .forEach((item: OnesyStyleRule) => value += `\n\n${item.allOwnedCss}`);

    // Replace its own property selector with a constant
    value = value.replace(`${this.selector || this.property} {`, 'AMAUI_ITEM {');

    return value;
  }

  public get counter() {
    return OnesyStyle.counter;
  }

  private makeRuleClassNameDefault = (value: string = 'a') => `${this.onesyStyle.options?.classNamePrefix || ''}${value}-${++this.counter.className}`;

  private makeRuleKeyframesNameDefault = (value: string = 'a') => `${this.onesyStyle.options?.classNamePrefix || ''}${value}-${++this.counter.keyframesName}`;

  public updateValues(hash_ = true) {
    // Response
    const selector = this.selector || this.property;

    this.values.css = `${selector} {\n`;

    let empty = true;

    this.rules.forEach((rule, index) => {
      const css = rule.value.css;

      if (css) {
        empty = false;

        this.values.css += `${'  '.repeat(rule.value.level_actual)}${css}${'\n'.repeat((rule.value instanceof OnesyStyleRule && index !== this.rules.length - 1) ? 2 : 1)}`;
      }
    });

    this.values.css += `${'  '.repeat(this.level_actual)}}`;

    // Empty
    // Only if it's a variable,
    // in some use cases if there are no props in css,
    // we still have to insertRule for dynamic rules
    // so we have a rule ref for that onesyStyleRuleProperty to
    // update with a new value on update
    if (
      empty &&
      (!this.className || this.onesyStyleSheet.version === 'static')
    ) this.values.css = '';

    // Hash
    if (hash_) this.makeHash();
  }

  private makeHash() {
    if (
      !this.hash &&
      this.static &&
      this.onesyStyleSheet.onesyStyle.options.optimize &&
      this.onesyStyleSheet.version === 'static' &&
      this.version === 'property' &&
      !(this.isVariable && this.onesyStyleSheet.mode === 'atomic')
    ) this.hash_ = hash(this.onesyStyleSheet.mode === 'atomic' ? this.css : this.allOwnedCss);
  }

  private init(value_?: any) {
    let value = value_ !== undefined ? value_ : this.value;

    // Options
    this.mode = this.options.mode || 'regular';
    this.version = this.options.version || 'property';
    this.pure = this.options.pure !== undefined ? this.options.pure : this.pure;
    this.index = this.options.index !== undefined ? this.options.index : this.index;
    this.owner = this.options.owner;
    this.parents = this.options.parents || [];
    this.onesyStyleSheet = this.options.onesyStyleSheet;
    this.onesyStyle = this.options.onesyStyle;

    if (this.id === undefined) this.id = getID();

    if (this.level === undefined) this.level = this.parents.length - 1;

    if (this.owner) this.level_actual = (this.owner as any).level_actual === undefined ? 0 : (this.owner as any).level_actual + 1;

    // Add to rules_owned to all parents
    this.parents.filter(parent => !(parent instanceof OnesyStyleSheet)).forEach(parent => (parent as OnesyStyleRule).rules_owned.push(this));

    // Make string template value into an object
    const valueString = () => {
      const rule = {};

      value.trim().split('\n').filter(Boolean).map(item => item.trim()).forEach(item => {
        if (item) {
          const items = item.split(':');

          let value__ = items[1];

          const property = items[0];

          value__ = value__ && value__.trim().replace(';', '');

          if (property && value__) rule[property] = castParam(value__, { decode: false });
        }
      });

      return rule;
    };

    if (is('string', value)) value = valueString();

    if (is('object', value)) {
      if (value['@pure'] !== undefined) this.pure = !!value['@pure'];

      if (value['@p'] !== undefined) this.pure = !!value['@p'];
    }

    if (
      !this.pure &&
      (this.level === 0 && this.property.indexOf('@') !== 0)
    ) this.isVariable = true;

    // value method or onesySubscription
    if (is('function', value)) this.value_version = 'method';
    else if (isOnesySubscription(value)) {
      this.value_version = 'onesy_subscription';

      if (!(value as any).subscribed) (value as any).subscribed = [];

      if ((value as any).subscribed.indexOf(this) === -1) {
        (value as OnesySubscription).subscribe(this.update.bind(this));

        (value as any).subscribed.push(this);
      }
    }
    else {
      this.values.value = value;
    }

    const atRule = this.property?.indexOf('@') === 0;

    this.version = atRule ? 'at-rule' : 'property';

    // method or OnesySubscription
    if ((['method', 'onesy_subscription'].indexOf(this.value_version) > -1)) {
      if (this.value_version === 'method') this.values.value = Try(() => value(this.onesyStyleSheet.props));
      else if (this.value_version === 'onesy_subscription') this.values.value = this.value.value;

      // Value
      this.values.value = is('function', this.values.value) ? Try(() => this.values.value(this.onesyStyleSheet.props)) : this.values.value;
    }

    value = this.values.value;

    if (is('object', value)) {
      // Additional @classNames provided
      if (value['@classNames'] || value['@cs']) {
        const classNames = classNamesMethod(value['@classNames'] || value['@cs']) as string;

        if (!this.classNames.match(new RegExp(`^${classNames} | ${classNames} | ${classNames}$`, 'g'))) this.classNames = `${this.classNames || ''} ${classNames}`.trim();
      }

      // Options
      if (value['@options'] || value['@o']) this.options = merge(value['@options'] || value['@o'] || {}, this.options);

      const props = Object.keys(value);

      // rules owned
      const rules_owned = this.rules_owned;

      // Reset rules and rules owned
      this.rules = [];
      this.rules_owned = [];

      // Add all new rules
      // and it adds new and existing again
      props.forEach(prop => this.addProperty(prop, value[prop], this.rules.length, false, false));

      // Remove all the previous rules
      rules_owned.forEach(rule => rule.remove());

      // Sort and making unique rules
      this.unique;

      // Dynamic
      const dynamic = (rule: OnesyStyleRule = this) => {
        return rule.rules.some(item => (
          is('function', item.value.value) ||
          isOnesySubscription(item.value.value) ||
          (item.value instanceof OnesyStyleRule && dynamic(item.value))
        ));
      };

      // Static
      this.static = !dynamic();
    }

    // Add itself to owner rules
    if (this.owner) {
      const exists = this.owner.rules.find(rule => rule.value.id === this.id);

      if (!exists) this.owner.rules.push({ property: this.property, value: this });
    }

    // With this we have allOwnedCss
    // available for hash value
    this.updateValues();

    // Status
    this.status = 'inited';
  }

  public addProperty(prop: string, value: any, index = this.rules.length, unique = true, add = true) {
    const atRule_ = prop.indexOf('@') === 0;
    const parent = this as unknown as OnesyStyleRule;
    const parentAtRule = this.version === 'at-rule';
    const parentKeyFrames = parentAtRule && parent.property?.indexOf('@keyframes') > -1;
    const selector = prop.indexOf('&') > -1 || parentAtRule || parentKeyFrames;
    const isProperty = !(atRule_ || selector) || ['@font-face'].includes(parent.property);

    const toSkip = ['@classNames', '@cs', '@options', '@o', '@pure', '@p'].indexOf(prop) > -1;

    if (toSkip) return;

    // if it's a css property
    if (isProperty) {
      const property = cammelCaseToKebabCase(prop);

      const { value: ruleValues = [], options } = valueResolve(property, value, this.onesyStyle);

      // Add to rules
      ruleValues.forEach(item => {
        if (this.onesyStyleSheet.mode === 'regular' || !parent.isVariable) {
          if (!!item) {
            OnesyStyleRuleProperty.make(
              item,
              property,
              {
                value_version: (is('function', item) || isOnesySubscription(item)) ? is('function', item) ? 'method' : 'onesy_subscription' : 'value',
                pure: this.pure,
                owner: parent,
                parents: [...parent.parents, parent],
                onesyStyleRule: parent,
                onesyStyleSheet: parent.onesyStyleSheet,
                onesyStyle: parent.onesyStyle,
                ...options.rule
              }
            );
          }
        }
        else if (this.onesyStyleSheet.mode === 'atomic' && parent.isVariable) {
          OnesyStyleRule.make(
            { [property]: item },
            env.onesy_methods.makeName.next().value,
            {
              mode: 'atomic',
              version: 'property',
              pure: this.pure,
              index: (this.index + 1) + index,
              owner: parent.parent,
              parents: [...parent.parents, parent],
              onesyStyleSheet: parent.onesyStyleSheet,
              onesyStyle: parent.onesyStyle
            }
          );
        }
      });
    }
    else {
      // Pre
      this.onesyStyle.subscriptions.rule.pre.emit();

      let rule: OnesyStyleRule;

      const parents = [...parent.parents, parent];

      // if its an at-rule
      const atTopLevel = ['@import', '@charset', '@namespace', '@color-profile', '@property', '@font-feature-values', '@counter-style', '@keyframes', '@font-face', '@page'];

      const atNested = ['@media', '@supports'];

      // if parent is keyframes
      if (parentKeyFrames) {
        rule = OnesyStyleRule.make(
          value,
          prop,
          {
            mode: 'regular',
            version: atRule_ ? 'at-rule' : 'property',
            pure: false,
            index,
            owner: parent,
            parents,
            onesyStyleSheet: parent.onesyStyleSheet,
            onesyStyle: parent.onesyStyle
          }
        );
      }
      // if it's a top level at-rule
      else if (atRule_ && atTopLevel.some(item => prop.indexOf(item) === 0)) {
        rule = OnesyStyleRule.make(
          value,
          prop,
          {
            mode: 'regular',
            version: atRule_ ? 'at-rule' : 'property',
            pure: false,
            index,
            owner: this.onesyStyleSheet,
            parents,
            onesyStyleSheet: parent.onesyStyleSheet,
            onesyStyle: parent.onesyStyle
          }
        );
      }
      // if it's @media or @supports or
      // it's & or a $ ref value
      else if (
        (atRule_ && atNested.some(item => prop.indexOf(item) === 0)) ||
        selector
      ) {
        let owner: any;

        for (let i = parents.length - 1; i >= 0; i--) {
          owner = parents[i];

          // Move it to nearest @media or @supports or OnesyStyleSheet parent as a rule in rules value
          // only if the parent is at-rule @media or @supports, or OnesyStyleSheet
          if (
            (
              owner.version === 'at-rule' &&
              atNested.some(item => owner.property.indexOf(item) === 0)
            ) ||
            owner instanceof OnesyStyleSheet
          ) break;
        }

        rule = OnesyStyleRule.make(
          value,
          prop,
          {
            mode: 'regular',
            version: atRule_ ? 'at-rule' : 'property',
            pure: false,
            index,
            owner,
            parents,
            onesyStyleSheet: parent.onesyStyleSheet,
            onesyStyle: parent.onesyStyle
          }
        );
      }

      // Post
      this.onesyStyle.subscriptions.rule.post.emit(rule);
    }

    // Adding individual new prop
    // Sort and making unique rules
    if (unique) this.unique;

    if (add) {
      // Add
      const added = this.add();

      // Update
      if (!added) this.rules_owned.forEach(rule => rule.update());
    }
  }

  public add(update = true) {
    // Update values
    // manually adding the rule
    if (!this.css) this.updateValues();

    // Make selector
    this.makeSelector();

    // add for onesyStyleRule value
    this.rules_owned.filter(rule => rule instanceof OnesyStyleRule).forEach(rule => (rule as OnesyStyleRule).add());

    // Update values
    if (update) this.updateValues();

    // Add rule if sheet is active
    if (this.onesyStyleSheet.status === 'active') return this.addRuleToCss();

    this.status = 'active';
  }

  public updateProps() {
    if ((['method', 'onesy_subscription'].indexOf(this.value_version) > -1)) this.init();

    // Add
    this.add(false);

    // Update
    this.rules_owned.forEach(rule => rule.update());

    // Update values
    this.updateValues();

    this.onesyStyle.subscriptions.rule.update_props.emit(this);
  }

  public update(value?: any) {
    // Manual update
    if (
      value !== undefined ||
      (['method', 'onesy_subscription'].indexOf(this.value_version) > -1)
    ) this.init(value);

    // Add
    this.add(false);

    // Update
    this.rules_owned.forEach(rule => rule.update());

    // Update values
    this.updateValues();

    this.onesyStyle.subscriptions.rule.update.emit(this);
  }

  public remove() {
    // Remove all own onesyStyleRules
    this.rules_owned.filter(rule => rule instanceof OnesyStyleRule).forEach(rule => (rule as OnesyStyleRule).remove());

    // Only if rule and onesyStyleSheet.sheet exists
    // find index of the rule in the sheet
    // remove the rule from the sheet
    const ref = this.onesyStyle.refs[this.hash];

    // No ref or ref is main and ref.refs are empty
    if (!ref || (ref.main.rule === this && !ref.refs.length)) {
      if (ref) delete this.onesyStyle.refs[this.hash];

      if (this.onesyStyleSheet.sheet) {
        const index = Array.from(this.onesyStyleSheet.sheet.cssRules).findIndex(item => item === this.rule);

        if (index > -1) this.onesyStyleSheet.sheet.deleteRule(index);
      }

      this.clear();
    }
    else if (ref && ref.main.rule !== this) {
      const indexRef = ref.refs.indexOf(this.onesyStyleSheet);

      if (indexRef > -1) ref.refs.splice(indexRef, 1);

      // if ref is removed and there are no more refs trigger sheet remove
      // which if that sheet has no more refs will be removed
      if (!ref.refs.length && ref.main.sheet.status === 'remove') ref.main.sheet.remove();

      this.clear();
    }
  }

  private addRuleToCss() {
    // if !rule ref &
    // if not a ref rule
    if (!this.rule && !this.ref) {
      const css = this.css;

      if (css) {
        const rule = ((this.owner as OnesyStyleSheet).sheet || (this.owner as OnesyStyleRule).rule) as (CSSStyleSheet | CSSMediaRule);

        if (rule?.cssRules) {
          let index = rule.cssRules.length;

          index = Try(() => rule.insertRule(css, index));

          if (index !== undefined) {
            const ruleCSS = rule.cssRules[index] as CSSStyleRule;

            this.rule = ruleCSS;

            this.onesyStyle.subscriptions.rule.add.emit(this);

            return true;
          }
        }
      }
    }
  }

  public addRuleRef() {
    if (!this.rule) {
      const rule = ((this.owner as OnesyStyleSheet).sheet || (this.owner as OnesyStyleRule).rule) as (CSSStyleSheet | CSSMediaRule);

      if (rule?.cssRules) {
        const ref = Array.from(rule.cssRules).find((item: CSSStyleRule) => item.selectorText === this.selector) as CSSStyleRule;

        if (ref !== undefined) this.rule = ref;

        // Move through rules
        this.rules_owned.filter(rule_ => rule_ instanceof OnesyStyleRule).forEach((rule_: OnesyStyleRule) => rule_.addRuleRef());
      }
    }
  }

  public makeSelector() {
    if (!this.selector) {
      // Make hash first so we can use refs
      if (!this.hash) this.makeHash();

      const parentAtRule = this.parent.version === 'at-rule';
      const isKeyframes = this.property.indexOf('@keyframes') === 0;

      // Variable
      if ((this.isVariable || this.mode === 'atomic') || isKeyframes) {
        // if it's a variable
        this.makeRuleClassName();

        // if it's a keyframes rule
        this.makeRuleKeyframesName();
      }
      else {
        // Make property the selector
        this.selector = this.property;

        // level 0 property inside an at-rule
        if (parentAtRule && this.version === 'property') {
          // & ref
          let parent: any = this.parent;

          while (parent.version === 'at-rule') parent = parent.parent;

          this.selector = this.selector.replace(/&/g, (parent as OnesyStyleRule).selector);

          // properties ie. body should remain the same targeting html element
          // we only replace $ ref values in properties
          // $ ref
          const refs = getRefs(this.property as string);

          refs.forEach(ref => {
            const className = this.makeClassName(ref);

            const regex = new RegExp(`\\$${ref}`, 'g');

            this.selector = this.property.replace(regex, `.${className}`);
          });
        }
        // other regular selectors
        // and & value rules
        else {
          // & ref
          this.selector = this.selector.replace(/&/g, (this.parent as OnesyStyleRule).selector);

          // $ ref
          const refs = getRefs(this.selector as string);

          refs.forEach(ref => {
            const className = this.makeClassName(ref);

            const regex = new RegExp(`\\$${ref}`, 'g');

            this.selector = this.selector.replace(regex, `.${className}`);
          });
        }
      }

      // Move through the rules
      this.rules.forEach(rule => rule.value.makeSelector());

      // Update values without hash
      this.updateValues(false);
    }
  }

  private makeClassName(property: string, rule?: OnesyStyleRule) {
    const names = this.onesyStyleSheet.onesyStyleSheetManager?.names || this.onesyStyleSheet.names;

    const cached = names.classNames[property];

    if (cached) return cached;

    // onesyStyle ref
    // ref className already exists for the same hash
    const ref = this.onesyStyle.refs[this.hash];

    // Only reuse classNames for static onesyStyleSheets and for variables only not & rules
    if (
      rule instanceof OnesyStyleRule &&
      (rule.isVariable || rule.mode === 'atomic') &&
      this.hash &&
      ref &&
      this.onesyStyleSheet.version === 'static'
    ) {
      // Push onesyStyleSheet ref if it doesn't already exist in refs
      if (
        ref.main.sheet !== this.onesyStyleSheet &&
        ref.refs.indexOf(this.onesyStyleSheet) === -1
      ) ref.refs.push(this.onesyStyleSheet);

      // Update rule ref
      rule.ref = ref;

      return ref.className;
    }

    // Make a className
    const className = (
      // Make with plugin/s
      this.onesyStyle.subscriptions.className.name.map({ property, value: rule?.value })?.value ||

      // Make with a default method
      this.makeRuleClassNameDefault(property)
    );

    // Add to onesyStyle ref,
    // only reuse classNames for static onesyStyleSheets
    if (
      rule instanceof OnesyStyleRule &&
      (rule.isVariable || rule.mode === 'atomic') &&
      this.hash &&
      this.onesyStyleSheet.version === 'static'
    ) {
      this.onesyStyle.refs[this.hash] = {
        main: {
          sheet: this.onesyStyleSheet,
          rule: this
        },
        className,
        refs: []
      };
    }

    // if no rule, means it's a non-existent (or dynamic) variable
    // so cache the className value as this value
    if (!rule) {
      this.onesyStyleSheet.names.classNames[property] = className;
      this.onesyStyleSheet.names.classes[property] = className;

      if (this.onesyStyleSheet.version === 'static' && this.onesyStyleSheet.onesyStyleSheetManager) {
        this.onesyStyleSheet.onesyStyleSheetManager.names.classNames[property] = className;
        this.onesyStyleSheet.onesyStyleSheetManager.names.classes[property] = className;
      }
    }

    return className;
  }

  private makeRuleClassName(property: string = this.property, rule: OnesyStyleRule = this) {
    if (
      rule instanceof OnesyStyleRule &&
      (rule.isVariable || rule.mode === 'atomic') &&
      !rule.className
    ) {
      const names = this.onesyStyleSheet.onesyStyleSheetManager?.names || this.onesyStyleSheet.names;

      const cached = names.classNames[rule.property];

      if (cached && rule.className) return cached;

      // Make a className
      // Pre
      this.onesyStyle.subscriptions.className.pre.emit();

      // Name
      const className = this.makeClassName(property, rule);

      // Post
      this.onesyStyle.subscriptions.className.post.emit(className);

      rule.className = className;

      rule.selector = `.${className}`;

      return className;
    }
  }

  private makeRuleKeyframesName(property_: string = this.property, rule: OnesyStyleRule = this) {
    if (
      rule instanceof OnesyStyleRule &&
      !rule.keyframesName &&
      rule.property.indexOf('@keyframes') === 0
    ) {
      const keyframe = property_.indexOf('@keyframes') === 0;
      const property = keyframe ? property_.split(' ')[1] : property_;

      const names = this.onesyStyleSheet.onesyStyleSheetManager?.names || this.onesyStyleSheet.names;

      const cached = names.keyframes[property];

      if (cached) return cached;

      // Make a keyframes name value
      // Pre
      this.onesyStyle.subscriptions.keyframes.pre.emit();

      // Name
      const keyframesName = (
        // Make with plugin/s
        this.onesyStyle.subscriptions.keyframes.name.map({ property, value: rule.value })?.value ||

        // Make with a default method
        this.makeRuleKeyframesNameDefault(property)
      );

      // Post
      this.onesyStyle.subscriptions.keyframes.post.emit(keyframesName);

      rule.keyframesName = keyframesName;

      // Add to selector as well
      rule.selector = `@keyframes ${keyframesName}`;
    }
  }

  public get rule(): CSSStyleRule {
    return this.rule_;
  }

  public set rule(rule: CSSStyleRule) {
    // Update active status
    this.status = 'active';

    this.rule_ = rule;

    if (!!(this.rule as any)?.cssRules?.length) {
      Array.from((this.rule as any).cssRules).forEach((item: any) => {
        let selector = item.selectorText;

        if (item instanceof CSSMediaRule) selector = `@media ${item.conditionText}`;
        else if (item instanceof CSSSupportsRule) selector = `@supports ${item.conditionText}`;

        const rule_ = this.rules.find(rule__ => (rule__.value as OnesyStyleRule).selector === selector);

        if (rule_) (rule_.value as OnesyStyleRule).rule = item;
      });
    }
  }

  private get unique() {
    // Remove duplicate rules
    const values = [];

    this.rules.forEach((rule, index) => {
      const exists = rule instanceof OnesyStyleRuleProperty && values.find(item => (
        item instanceof OnesyStyleRuleProperty &&
        item.values.property === rule.values.property &&
        item.values.value === rule.values.value
      ));

      if (exists) this.rules.splice(index, 1);
      else values.push(rule);
    });

    // Native sort based on levels first
    // for making, updating & refs
    this.rules.sort((a, b) => {
      if (a.value.level === b.value.level) return 0;

      return a.value.level < b.value.level ? -1 : 1;
    });

    const atRule = this.version === 'at-rule';

    // Sort
    const useSort = (
      !atRule &&
      this.onesyStyle.options.rule.sort &&
      (this.onesyStyleSheet !== undefined || this.onesyStyleSheet.options.rule.sort !== false) &&
      (this.onesyStyleSheet?.onesyTheme !== undefined || this.onesyStyleSheet.onesyTheme?.options.rule.sort !== false) &&
      // by default is true
      this.options.sort !== false
    );

    if (useSort) {
      this.onesyStyle.subscriptions.rules.sort.map(this.rules);

      // Post
      this.onesyStyle.subscriptions.rules.sort.emit(this);
    }

    return this.rules;
  }

  private clear() {
    this.rule = undefined;
    this.ref = undefined;
    this.status = 'idle';

    // rules
    if (this.owner) {
      const index = this.owner.rules.findIndex(item => item.value === this);

      if (index > -1) this.owner.rules.splice(index, 1);
    }

    // rules owned
    this.parents.filter(parent => !(parent instanceof OnesyStyleSheet)).forEach(parent => {
      const index = (parent as OnesyStyleRule).rules_owned.findIndex(item => item.value === this);

      if (index > -1) (parent as OnesyStyleRule).rules_owned.splice(index, 1);
    });

    // remove it's selector
    // or keyframes name from
    // sheet and sheetManager
    if (this.className) {
      delete this.onesyStyleSheet.names.classNames[this.property];
      delete this.onesyStyleSheet.names.classes[this.property];

      delete this.onesyStyleSheet.onesyStyleSheetManager.names.classNames[this.property];
      delete this.onesyStyleSheet.onesyStyleSheetManager.names.classes[this.property];
    }
    else if (this.keyframesName) {
      const property = this.property.split(' ')[1];

      delete this.onesyStyleSheet.names.keyframes[property];

      delete this.onesyStyleSheet.onesyStyleSheetManager.names.keyframes[property];
    }

    this.onesyStyle.subscriptions.rule.remove.emit(this);
  }

  public static make(
    value: any,
    property: string,
    options: IOptions = {
      mode: 'regular',
      version: 'property',
      pure: false,
      index: 0,
      parents: [this] as any[],
    }
  ): OnesyStyleRule {
    return new OnesyStyleRule(
      value,
      property,
      options
    );
  }
}

export default OnesyStyleRule;
