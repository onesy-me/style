import { TMethod } from '@amaui/models';

import { ICSSOptions } from './interfaces';

export * from './utils';
export * from './interfaces';
export { default as AmauiStyle } from './amaui-style';
export { default as AmauiStyleRenderer } from './amaui-style-renderer';
export { default as AmauiStyleSheet } from './amaui-style-sheet';
export { default as AmauiStyleSheetManager } from './amaui-style-sheet-manager';
export { default as AmauiStyleRule } from './amaui-style-rule';
export { default as AmauiStyleRuleProperty } from './amaui-style-rule-property';
export { default as AmauiTheme } from './amaui-theme';
export { default as style } from './style';
export { default as pure } from './pure';
export { default as reset } from './reset';
export { default as inline } from './inline';
export { default as makeClassName } from './makeClassName';
export { default as classNames } from './classNames';
export { default as prefix } from './prefix';
export { default as rtl } from './rtl';
export { default as sort } from './sort';
export { default as unit } from './unit';
export { default as valueObject } from './value-object';
export { default as colors } from './colors';

declare global {
  function css(method: TMethod | Record<string, any>, options: ICSSOptions): void;
}
