import { TMethod } from '@amaui/models';

import { ICSSOptions } from './interfaces';

export * from './utils';
export * from './interfaces';
export { default as AmauiStyle } from './AmauiStyle';
export { default as AmauiStyleRenderer } from './AmauiStyleRenderer';
export { default as AmauiStyleSheet } from './AmauiStyleSheet';
export { default as AmauiStyleSheetManager } from './AmauiStyleSheetManager';
export { default as AmauiStyleRule } from './AmauiStyleRule';
export { default as AmauiStyleRuleProperty } from './AmauiStyleRuleProperty';
export { default as AmauiTheme } from './AmauiTheme';
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
export { default as valueObject } from './valueObject';
export { default as colors } from './colors';

declare global {
  function css(method: TMethod | Record<string, any>, options: ICSSOptions): void;
}
