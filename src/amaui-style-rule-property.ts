import Try from '@amaui/utils/try';
import isEnvironment from '@amaui/utils/isEnvironment';
import AmauiSubscription from '@amaui/subscription';

import AmauiStyle from './amaui-style';
import AmauiStyleRule from './amaui-style-rule';
import AmauiStyleSheet from './amaui-style-sheet';
import { IOptionsRule, IValuesVersion, TValueVersion } from './interfaces';
import { cammelCaseToKebabCase, getID, getRefs, is, valueResolve } from './utils';

interface IOptions { }

class AmauiStyleRuleProperty {
  public level: number;
  public level_actual: number;
  public id: string;
  public values = {
    property: '',
    value: '',
    css: '',
  };

  public constructor(
    public value: any,
    public property: string,
    public value_version: TValueVersion = 'value',
    public pure = false,
    public owner: AmauiStyleRule,
    public parents: Array<AmauiStyleSheet | AmauiStyleRule> = [],
    public amauiStyleRule: AmauiStyleRule,
    public amauiStyleSheet: AmauiStyleSheet,
    public amauiStyle: AmauiStyle,
    public options: IOptions = {}
  ) {
    this.init();
  }

  public get parent(): AmauiStyleRule {
    return this.parents[this.parents.length - 1] as AmauiStyleRule;
  }

  public get response(): IValuesVersion {
    return { css: this.values.css };
  }

  public get css(): string {
    return this.response.css;
  }

  private updateValues() {
    // Response
    this.values.css = `${this.values.property}: ${this.values.value};`;

    // For undefined animation name value
    if (this.values.css.indexOf('undefined') > -1) this.values.css = '';
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
      ['method', 'amaui_subscription'].indexOf(this.value_version) > -1
    ) {
      if (this.value_version === 'method') this.values.value = Try(() => this.value(this.amauiStyleSheet.props));
      else if (this.value_version === 'amaui_subscription') {
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
      (this.amauiStyleSheet === undefined || this.amauiStyleSheet.options.rule.rtl !== false) &&
      (this.amauiStyleSheet?.amauiTheme === undefined || this.amauiStyleSheet.amauiTheme.options.rule.rtl) &&
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
      (this.amauiStyleSheet === undefined || this.amauiStyleSheet.options.rule.prefix !== false) &&
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

      this.level_actual = this.owner.level_actual + 1;
    }

    // Update values
    this.updateValues();
  }

  // Update only if amauiStyleSheet is version 'dynamic'
  public update(value?: any) {
    // Init with value
    if (value !== undefined) this.init(value);

    // Make selector
    // ie. for animation, and animation-name
    this.makeSelector();

    // Update the rule
    // method or AmauiSubscription
    if (
      value === undefined &&
      (['method', 'amaui_subscription'].indexOf(this.value_version) > -1)
    ) {
      if (this.value_version === 'method') this.values.value = Try(() => this.value(this.amauiStyleSheet.props));
      else if (this.value_version === 'amaui_subscription') this.values.value = this.value.value;

      // Value
      this.values.value = is('function', this.values.value) ? Try(() => (this.values as any).value(this.amauiStyleSheet.props)) : this.values.value;

      this.values.value = valueResolve(this.values.property, this.values.value, this.amauiStyle).value[0] as any;
    }

    // Update values
    this.updateValues();

    const domElement = this.amauiStyleSheet.domElementForTesting || (isEnvironment('browser') && window.document.createElement('div'));

    if (domElement) domElement.style[this.values.property] = this.values.value;

    const valueNew = domElement?.style[this.values.property] || this.values.value;

    // Only if rule reference exists
    if (this.owner.rule) {
      // Only update if value is diff from previous update
      if (this.owner.rule.style[this.values.property] !== valueNew) {
        const rule: any = ((this.owner.owner as AmauiStyleRule).rule || (this.owner.owner as AmauiStyleSheet).sheet);

        // For some reason important will not update the style property
        // updating it through rule.style[property]
        // only way is to fully remove the CSSStyleRule
        // and insert a new one with new value
        if (this.values.value?.includes('!important')) {
          let index = Array.from(rule?.cssRules || []).findIndex(item => item === this.owner.rule);

          if (index > -1) {
            Try(() => rule.deleteRule(index));

            // Update owner values so it includes
            // new update for this property value
            this.owner.updateValues();

            index = Try(() => rule.insertRule(this.owner.values.css));

            if (index > -1) this.owner.rule = rule.cssRules[index];
          }
        }
        else Try(() => this.owner.rule.style[this.values.property] = this.values.value); // Update the values css string value

        this.values.css = "".concat(this.values.property, ": ").concat(this.values.value, ";");
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

      // Update values
      this.updateValues();
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
    version: TValueVersion = 'value',
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
      version,
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
