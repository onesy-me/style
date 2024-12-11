import { TMethod } from '@onesy/models';

import { ICSSOptions } from './interfaces';

export * from './utils';
export * from './interfaces';
export { default as OnesyStyle } from './OnesyStyle';
export { default as OnesyStyleRenderer } from './OnesyStyleRenderer';
export { default as OnesyStyleSheet } from './OnesyStyleSheet';
export { default as OnesyStyleSheetManager } from './OnesyStyleSheetManager';
export { default as OnesyStyleRule } from './OnesyStyleRule';
export { default as OnesyStyleRuleProperty } from './OnesyStyleRuleProperty';
export { default as OnesyTheme } from './OnesyTheme';
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
