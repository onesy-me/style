import type * as CSS from 'csstype';

import AmauiSubscription from '@amaui/subscription';

import AmauiStyle from './amaui-style';
import AmauiStyleRule from './amaui-style-rule';
import AmauiStyleSheet from './amaui-style-sheet';
import AmauiStyleSheetManager from './amaui-style-sheet-manager';
import AmauiTheme from './amaui-theme';

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

  AmauiSubscription |

  CSS.Properties<string | number | Array<string | number> | Array<Array<string | number>> | Array<TValueObjectValue> | Array<Array<TValueObjectValue>> | ((props?: any) => TValueObjectValue)> |

  Record<string, any> |

  { [index: string]: CSS.Properties<TValueObjectValue> }
);

export type TValueObject = Record<string, TValueObjectValue>;

export type TValueMethod = (theme?: AmauiTheme) => TValueObject;

export type TValue = TValueObject | TValueMethod;

export type TMode = 'regular' | 'atomic';

export type TDirection = 'ltr' | 'rtl';

export type TValueVariant = 'value' | 'method' | 'amaui_subscription';

export type TRef = { main: { sheet: AmauiStyleSheet, rule: AmauiStyleRule }, className: string; refs: Array<AmauiStyleSheet> };

export type TRefs = Record<string, TRef>;

export interface IIds {
  static: Array<string>;
  dynamic: Array<string>;
}

export type TStatus = 'idle' | 'inited' | 'active' | 'remove';

export interface IValuesVariant {
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
  static: Array<AmauiStyleSheet>;
  dynamic: Array<AmauiStyleSheet>;
}

export interface IMethodResponse {
  amaui_style_sheet_manager: AmauiStyleSheetManager;
  sheets: ISheets;
  ids: IIds;
  add: (props?: any) => IResponse;
  update: (value: any) => void;
  props: { props: any, ids: string | Array<string> } | ((value: { props: any, ids: string | Array<string> }) => any);
  remove: (ids?: string | Array<string>) => void;
  addRule: (value: any, property?: string) => IAddRuleResponse;
}

export interface IOptionsAmauiTheme {
  value?: AmauiTheme;
  get?: (value?: Element) => AmauiTheme;
}

export interface IOptionsAmauiStyle {
  value?: AmauiStyle;
  get?: (value?: Element) => AmauiStyle;
}

export interface IInsert {
  comment?: string;
}

export interface ICSSOptions {
  amaui_style?: IOptionsAmauiStyle;

  amaui_theme?: IOptionsAmauiTheme;

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

  optimize?: boolean;
  optimize_empty?: boolean;

  log?: boolean;
}

export interface IAmauiStyleSheetManagerProps {
  props: any;
  ids: string | Array<string>;
}
