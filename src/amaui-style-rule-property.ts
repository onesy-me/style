import { getID, is, merge, stringify, Try } from '@amaui/utils';
import AmauiSubscription from '@amaui/subscription';

import AmauiStyle from './amaui-style';
import AmauiStyleRule from './amaui-style-rule';
import AmauiStyleSheet from './amaui-style-sheet';
import { IOptionsRule, IValuesVariant, TValueVariant } from './interfaces';
import { cammelCaseToKebabCase, getRefs, valueResolve } from './utils';

interface IOptions { }

const optionsDefault: IOptions = {};

class AmauiStyleRuleProperty {
  public options: IOptions;
  public level: number;
  public id: string;
  public values = {
    property: '',
    value: '',
    css: '',
    json: {},
  };

  public constructor(
    public value: any,
    public property: string,
    public value_variant: TValueVariant = 'value',
    public pure = false,
    public owner: AmauiStyleRule,
    public parents: Array<AmauiStyleSheet | AmauiStyleRule> = [],
    public amauiStyleRule: AmauiStyleRule,
    public amauiStyleSheet: AmauiStyleSheet,
    public amauiStyle: AmauiStyle,
    options: IOptions = optionsDefault
  ) {
    this.options = merge(options, optionsDefault);

    this.init();
  }

  private get parent(): AmauiStyleRule {
    return this.parents[this.parents.length - 1] as AmauiStyleRule;
  }

  public get response(): IValuesVariant {
    this.values.css = `${this.values.property}: ${this.values.value};`;

    this.values.json = { [this.values.property]: this.values.value };

    // For undefined animation name value
    if (this.values.css.indexOf('undefined') > -1) this.values.css = '';

    Object.keys(this.values.json).forEach(item => {
      if (is('string', this.values.json[item]) && this.values.json[item].indexOf('undefined') > -1) delete this.values.json[item];
    });

    return { css: this.values.css, json: this.values.json };
  }

  public get css(): string {
    return this.response.css;
  }

  public get json(): Record<string, any> {
    return this.response.json;
  }

  private init(value?: any) {
    // Update values
    this.values.property = cammelCaseToKebabCase(this.property);
    this.values.value = value !== undefined ? value : this.value;

    if (this.id === undefined) this.id = getID();

    if (this.level === undefined) this.level = this.parents.length - 1;

    // Add to rules_owned to all parents
    this.parents.filter(parent => !(parent instanceof AmauiStyleSheet)).forEach(parent => (parent as AmauiStyleRule).rules_owned.push(this));

    // method or AmauiSubscription
    if (
      value === undefined &&
      ['method', 'amaui_subscription'].indexOf(this.value_variant) > -1
    ) {
      if (this.value_variant === 'method') this.values.value = Try(() => this.value(this.amauiStyleSheet.props));
      else if (this.value_variant === 'amaui_subscription') {
        this.values.value = this.value.value;

        if (!(this.value as any).subscribed) (this.value as any).subscribed = [];

        if ((this.value as any).subscribed.indexOf(this) === -1) {
          (this.value as AmauiSubscription).subscribe(this.update.bind(this));

          (this.value as any).subscribed.push(this);
        }
      }

      // Value
      this.values.value = is('function', this.values.value) ? Try(() => (this.values as any).value(this.amauiStyleSheet.props)) : this.values.value;
    }

    // Value
    this.values.value = valueResolve(this.values.property, this.values.value, this.amauiStyle).value[0] as any;

    // Move through plugins
    // rtl
    const useRtl = (
      this.amauiStyle.options.rule.rtl &&
      (this.amauiStyleSheet === undefined || this.amauiStyleSheet.options.rule.rtl) &&
      (this.amauiStyleSheet?.amauiTheme === undefined || this.amauiStyleSheet.amauiTheme.options.rule.rtl !== false) &&
      // by default is true
      this.parent?.options.rtl !== false
    );

    if (useRtl) {
      const rtl = this.amauiStyle.subscriptions.rule.rtl.map(this.values);

      if (rtl?.value) {
        if (rtl?.value?.property) this.values.property = rtl.value.property;
        if (rtl?.value?.value) this.values.value = rtl.value.value;
      }
    }

    // prefix
    const usePrefix = (
      this.amauiStyle.options.rule.prefix &&
      (this.amauiStyleSheet === undefined || this.amauiStyleSheet.options.rule.prefix) &&
      (this.amauiStyleSheet?.amauiTheme === undefined || this.amauiStyleSheet.amauiTheme.options.rule.prefix !== false) &&
      // by default is true
      this.parent?.options.prefix !== false
    );

    if (
      usePrefix &&
      (
        this.values.property.indexOf('-') !== 0 &&
        Try(() => this.values.value.indexOf('-') !== 0)
      )
    ) {
      const prefixes = this.amauiStyle.subscriptions.rule.prefix.map({ value: this.values.value, property: this.values.property })?.value || [];

      if (!!prefixes.length) {
        prefixes.forEach(item => {
          const exists = (this.parent?.rules || []).find(rule_ => (
            rule_ instanceof AmauiStyleRuleProperty &&
            rule_.values.property === item.property &&
            rule_.values.value === item.value
          ));

          if (!exists && this.parent) {
            AmauiStyleRuleProperty.make(
              item.value,
              item.property,
              'value',
              this.pure,
              this.parent,
              this.parents,
              this.amauiStyleRule,
              this.parent.amauiStyleSheet,
              this.parent.amauiStyle
            );
          }
        });
      }
    }

    // Add itself to owner rules
    if (this.owner) {
      const exists = this.owner.rules.find(rule => rule.value.id === this.id);

      if (!exists) this.owner.rules.push({ property: this.property, value: this });
    }

    // Made response
    this.response;
  }

  // Alias for update
  public add = this.update.bind(this);

  // Update only if amauiStyleSheet is variant 'dynamic'
  public update(value?: any) {
    // Init with value
    if (value !== undefined) this.init(value);

    // Update the rule
    // method or AmauiSubscription
    if (
      value === undefined &&
      (['method', 'amaui_subscription'].indexOf(this.value_variant) > -1)
    ) {
      if (this.value_variant === 'method') this.values.value = Try(() => this.value(this.amauiStyleSheet.props));
      else if (this.value_variant === 'amaui_subscription') this.values.value = this.value.value;

      // Value
      this.values.value = is('function', this.values.value) ? Try(() => (this.values as any).value(this.amauiStyleSheet.props)) : this.values.value;

      this.values.value = valueResolve(this.values.property, this.values.value, this.amauiStyle).value[0] as any;
    }

    // Only if rule reference exists
    if (this.owner.rule) {
      // Only update if value is diff from previous update
      if (this.owner.rule.style[this.values.property] !== this.values.value) {
        Try(() => this.owner.rule.style[this.values.property] = this.values.value);

        // Update the values css string value and json value
        // css
        this.values.css = `${this.values.property}: ${this.values.value};`;
        // json
        this.values.json = stringify({ [this.values.property]: this.values.value });
      }
    }
  }

  public remove() {
    this.clear();
  }

  public makeSelector() {
    if (['animation', 'animation-name'].some(item => this.values.property.indexOf(item) > -1)) {
      const refs = getRefs(this.values.value as string);

      const refValues = refs.map(item => this.amauiStyleSheet.amauiStyleSheetManager.names.keyframes[item]).filter(Boolean);

      refs.forEach((ref, i) => ((this as AmauiStyleRuleProperty)).values.value = (((this as AmauiStyleRuleProperty)).values.value as string).replace(`$${ref}`, refValues[i]));
    }
  }

  private clear() {
    // rule
    if (this.owner?.rule) this.owner.rule.style[this.values.property] = '';

    // rules
    if (this.owner) {
      const index = this.owner.rules.findIndex(item => item.value === this);

      if (index > -1) this.owner.rules.splice(index, 1);
    }

    // rules owned
    this.parents.filter(parent => !(parent instanceof AmauiStyleSheet)).forEach(parent => {
      const index = (parent as AmauiStyleRule).rules_owned.findIndex(item => item.value === this);

      if (index > -1) (parent as AmauiStyleRule).rules_owned.splice(index, 1);
    });
  }

  public static make(
    value: any,
    property: string,
    variant: TValueVariant = 'value',
    pure = false,
    owner: AmauiStyleRule,
    parents: any[] = [this],
    amauiStyleRule: AmauiStyleRule,
    amauiStyleSheet: AmauiStyleSheet,
    amauiStyle: AmauiStyle,
    ruleOptions?: IOptionsRule
  ): AmauiStyleRuleProperty {
    return new AmauiStyleRuleProperty(
      value,
      property,
      variant,
      pure,
      owner,
      parents,
      amauiStyleRule,
      amauiStyleSheet,
      amauiStyle,
      ruleOptions
    );
  }

}

export default AmauiStyleRuleProperty;
