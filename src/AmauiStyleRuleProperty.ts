import Try from '@onesy/utils/try';
import isEnvironment from '@onesy/utils/isEnvironment';
import OnesySubscription from '@onesy/subscription';

import OnesyStyle from './OnesyStyle';
import OnesyStyleRule from './OnesyStyleRule';
import OnesyStyleSheet from './OnesyStyleSheet';
import { IOptionsRule, IValuesVersion, TValueVersion } from './interfaces';
import { cammelCaseToKebabCase, getID, getRefs, is, valueResolve } from './utils';

interface IOptions extends IOptionsRule {
  value_version?: TValueVersion;
  pure?: boolean;
  owner?: OnesyStyleRule;
  parents?: Array<OnesyStyleSheet | OnesyStyleRule>;
  onesyStyle?: OnesyStyle;
  onesyStyleSheet?: OnesyStyleSheet;
  onesyStyleRule?: OnesyStyleRule;
}

const optionsDefault: IOptions = {
  value_version: 'value',
  pure: false,
  parents: [],
  sort: true,
  prefix: true,
  rtl: true
};

class OnesyStyleRuleProperty {
  public value_version: TValueVersion = 'value';
  public pure: boolean = false;
  public owner: OnesyStyleRule;
  public parents: Array<OnesyStyleSheet | OnesyStyleRule> = [];
  public onesyStyleRule: OnesyStyleRule;
  public onesyStyleSheet: OnesyStyleSheet;
  public onesyStyle: OnesyStyle;
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
    public options: IOptions = optionsDefault
  ) {
    this.init();
  }

  public get parent(): OnesyStyleRule {
    return this.parents[this.parents.length - 1] as OnesyStyleRule;
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

    // Options
    this.value_version = this.options.value_version || 'value';
    this.pure = this.options.pure !== undefined ? this.options.pure : false;
    this.owner = this.options.owner;
    this.parents = this.options.parents || [];
    this.onesyStyle = this.options.onesyStyle;
    this.onesyStyleSheet = this.options.onesyStyleSheet;
    this.onesyStyleRule = this.options.onesyStyleRule;

    if (this.id === undefined) this.id = getID();

    if (this.level === undefined) this.level = this.parents.length - 1;

    // Add to rules_owned to all parents
    this.parents.filter(parent => !(parent instanceof OnesyStyleSheet)).forEach(parent => (parent as OnesyStyleRule).rules_owned.push(this));

    // method or OnesySubscription
    if (
      value === undefined &&
      ['method', 'onesy_subscription'].indexOf(this.value_version) > -1
    ) {
      if (this.value_version === 'method') this.values.value = Try(() => this.value(this.onesyStyleSheet.props));
      else if (this.value_version === 'onesy_subscription') {
        this.values.value = this.value.value;

        if (!(this.value as any).subscribed) (this.value as any).subscribed = [];

        if ((this.value as any).subscribed.indexOf(this) === -1) {
          (this.value as OnesySubscription).subscribe(this.update.bind(this));

          (this.value as any).subscribed.push(this);
        }
      }

      // Value
      this.values.value = is('function', this.values.value) ? Try(() => (this.values as any).value(this.onesyStyleSheet.props)) : this.values.value;
    }

    // Value
    this.values.value = valueResolve(this.values.property, this.values.value, this.onesyStyle).value[0] as any;

    // Move through plugins
    // rtl
    const useRtl = (
      this.onesyStyle.options.rule.rtl &&
      (this.onesyStyleSheet === undefined || this.onesyStyleSheet.options.rule.rtl !== false) &&
      (this.onesyStyleSheet?.onesyTheme === undefined || this.onesyStyleSheet.onesyTheme.options.rule.rtl) &&
      // by default is true
      this.parent?.options.rtl !== false
    );

    if (useRtl) {
      const rtl = this.onesyStyle.subscriptions.rule.rtl.map(this.values);

      if (rtl?.value) {
        if (rtl?.value?.property) this.values.property = rtl.value.property;
        if (rtl?.value?.value) this.values.value = rtl.value.value;
      }
    }

    // prefix
    const usePrefix = (
      this.onesyStyle.options.rule.prefix &&
      (this.onesyStyleSheet === undefined || this.onesyStyleSheet.options.rule.prefix !== false) &&
      (this.onesyStyleSheet?.onesyTheme === undefined || this.onesyStyleSheet.onesyTheme.options.rule.prefix !== false) &&
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
      const prefixes = this.onesyStyle.subscriptions.rule.prefix.map({ value: this.values.value, property: this.values.property })?.value || [];

      if (!!prefixes.length) {
        prefixes.forEach(item => {
          const exists = (this.parent?.rules || []).find(rule_ => (
            rule_ instanceof OnesyStyleRuleProperty &&
            rule_.values.property === item.property &&
            rule_.values.value === item.value
          ));

          if (!exists && this.parent) {
            OnesyStyleRuleProperty.make(
              item.value,
              item.property,
              {
                value_version: 'value',
                pure: this.pure,
                owner: this.parent,
                parents: this.parents,
                onesyStyleRule: this.onesyStyleRule,
                onesyStyleSheet: this.parent.onesyStyleSheet,
                onesyStyle: this.parent.onesyStyle
              }
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

  // Update only if onesyStyleSheet is version 'dynamic'
  public update(value?: any) {
    // Init with value
    if (value !== undefined) this.init(value);

    // Make selector
    // ie. for animation, and animation-name
    this.makeSelector();

    // Update the rule
    // method or OnesySubscription
    if (
      value === undefined &&
      (['method', 'onesy_subscription'].indexOf(this.value_version) > -1)
    ) {
      if (this.value_version === 'method') this.values.value = Try(() => this.value(this.onesyStyleSheet.props));
      else if (this.value_version === 'onesy_subscription') this.values.value = this.value.value;

      // Value
      this.values.value = is('function', this.values.value) ? Try(() => (this.values as any).value(this.onesyStyleSheet.props)) : this.values.value;

      this.values.value = valueResolve(this.values.property, this.values.value, this.onesyStyle).value[0] as any;
    }

    // Update values
    this.updateValues();

    const domElement = this.onesyStyleSheet.domElementForTesting || (isEnvironment('browser') && window.document.createElement('div'));

    if (domElement) domElement.style[this.values.property] = this.values.value;

    const valueNew = domElement?.style?.[this.values.property] || this.values.value;

    // Only if rule reference exists
    if (this.owner.rule) {
      // Only update if value is diff from previous update
      if (this.owner.rule.style[this.values.property] !== valueNew) {
        const rule: any = ((this.owner.owner as OnesyStyleRule).rule || (this.owner.owner as OnesyStyleSheet).sheet);

        // For some reason important will not update the style property
        // updating it through rule.style[property]
        // only way is to fully remove the CSSStyleRule
        // and insert a new one with new value
        if (is('string', this.values.value) && this.values.value?.includes('!important')) {
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

      const refValues = refs.map(item => this.onesyStyleSheet.onesyStyleSheetManager.names.keyframes[item]).filter(Boolean);

      refs.forEach((ref, i) => ((this as OnesyStyleRuleProperty)).values.value = (((this as OnesyStyleRuleProperty)).values.value as string).replace(`$${ref}`, refValues[i]));

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
    this.parents.filter(parent => !(parent instanceof OnesyStyleSheet)).forEach(parent => {
      const index = (parent as OnesyStyleRule).rules_owned.findIndex(item => item.value === this);

      if (index > -1) (parent as OnesyStyleRule).rules_owned.splice(index, 1);
    });
  }

  public static make(
    value: any,
    property: string,
    options: IOptions = {
      value_version: 'value',
      pure: false,
      parents: [this] as any[],
    }
  ): OnesyStyleRuleProperty {
    return new OnesyStyleRuleProperty(
      value,
      property,
      options
    );
  }

}

export default OnesyStyleRuleProperty;
