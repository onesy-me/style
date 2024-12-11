import type * as CSS from 'csstype';

import OnesySubscription from '@onesy/subscription';

import OnesyStyle from './OnesyStyle';
import OnesyStyleRule from './OnesyStyleRule';
import OnesyStyleSheet from './OnesyStyleSheet';
import OnesyStyleSheetManager from './OnesyStyleSheetManager';
import OnesyTheme from './OnesyTheme';

declare module 'csstype' {
  interface Properties {
    animationDuration?: CSS.Property.AnimationDuration | number | undefined;

    position?: CSS.Property.Position | CSS.Property.BackgroundPosition | undefined;

    [index: string]: any;
  }
}

export type TValueObjectValue = (
  string |

  ((props?: any) => TValueObjectValue) |

  OnesySubscription |

  CSS.Properties<string | number | Array<string | number> | Array<Array<string | number>> | Array<TValueObjectValue> | Array<Array<TValueObjectValue>> | ((props?: any) => TValueObjectValue)> |

  Record<string, any> |

  { [index: string]: CSS.Properties<TValueObjectValue> }
);

export type TValueObject = Record<string, TValueObjectValue>;

export type TValueMethod = (theme: OnesyTheme) => TValueObject;

export type TValue = TValueObject | TValueMethod;

export type TMode = 'regular' | 'atomic';

export type TDirection = 'ltr' | 'rtl';

export type TValueVersion = 'value' | 'method' | 'onesy_subscription';

export type TRef = { main: { sheet: OnesyStyleSheet, rule: OnesyStyleRule }, className: string; refs: Array<OnesyStyleSheet> };

export type TRefs = Record<string, TRef>;

export interface IIds {
  static: Array<string>;
  dynamic: Array<string>;
}

export type TStatus = 'idle' | 'inited' | 'active' | 'remove';

export interface IValuesVersion {
  css: string;
}

export interface IOptionsRule {
  sort?: boolean;
  prefix?: boolean;
  rtl?: boolean;
}

export interface IAddRuleResponse {
  className: string;
  classNames: string;
  keyframeName: string;
}

export interface IResponse {
  ids: IIds;
  classNames: Record<string, string>;
  classes: Record<string, string>;
  keyframes: Record<string, string>;
  className: string;
  class: string;
  styles: (...args: string[]) => string;
}

export type TPriority = 'lower' | 'upper';

export interface ISheets {
  static: Array<OnesyStyleSheet>;
  dynamic: Array<OnesyStyleSheet>;
}

export interface IMethodResponse {
  onesy_style_sheet_manager: OnesyStyleSheetManager;
  sheets: ISheets;
  ids: IIds;
  add: (props?: any) => IResponse;
  update: (value: any) => void;
  props: { props: any, ids: string | Array<string> } | ((value: { props: any, ids: string | Array<string> }) => any);
  remove: (ids?: string | Array<string>) => void;
  addRule: (value: any, property?: string) => IAddRuleResponse;
}

export interface IOptionsOnesyTheme {
  value?: OnesyTheme;
  get?: (value?: Element) => OnesyTheme;
}

export interface IOptionsOnesyStyle {
  value?: OnesyStyle;
  get?: (value?: Element) => OnesyStyle;
}

export interface IInsert {
  comment?: string;
}

export interface ICSSOptions {
  onesy_style?: IOptionsOnesyStyle;

  onesy_theme?: IOptionsOnesyTheme;

  mode?: TMode;

  pure?: boolean;

  reset?: boolean;

  resetProps?: {
    override?: boolean;
  };

  css?: {
    file?: {
      name?: string;
      hash?: boolean;
    };

    folders?: Array<{ url?: string; clear?: boolean; }>;

    clear?: boolean;

    minify?: boolean;
  };

  html?: {
    files?: Array<{
      url?: string;
      insert?: IInsert;
    }>;

    insert?: IInsert;

    add?: boolean;

    addNames?: boolean;
  };

  rule?: IOptionsRule;

  log?: boolean;
}

export interface IOnesyStyleSheetManagerProps {
  props: any;
  ids: string | Array<string>;
}
