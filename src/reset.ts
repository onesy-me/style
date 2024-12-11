import merge from '@onesy/utils/merge';
import Try from '@onesy/utils/try';

import { is } from './utils';
import OnesyStyle from './OnesyStyle';
import OnesyStyleSheetManager from './OnesyStyleSheetManager';
import OnesyTheme from './OnesyTheme';
import { TValue, TValueMethod, IOnesyStyleSheetManagerProps, IMethodResponse, IOptionsOnesyStyle, IOptionsOnesyTheme, TMode } from './interfaces';

export interface IOptions {
  element?: Element;

  name?: string;

  mode?: TMode;

  onesy_style?: IOptionsOnesyStyle;

  onesy_theme?: IOptionsOnesyTheme;

  override?: boolean;
}

export const FONT_FAMILY = {
  primary: [
    'DM Sans',
    'Helvetica',
    '"Helvetica Neue"',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Arial',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    'sans-serif',
  ].join(', '),
  secondary: [
    'DM Sans',
    'Helvetica',
    '"Helvetica Neue"',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Arial',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    'sans-serif',
  ].join(', '),
  mono: [
    'Roboto Mono',
    'monospace',
  ].join(', '),
};

/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */
export const normalize = {
  html: {
    lineHeight: '1.15',
    '-webkit-text-size-adjust': '100%'
  },

  main: {
    display: 'block'
  },

  h1: {
    fontSize: '2em'
  },

  hr: {
    boxSizing: 'content-box',
    height: '0px',
    overflow: 'visible'
  },

  pre: {
    fontFamily: 'monospace, monospace',
    fontSize: '1em'
  },

  a: {
    backgroundColor: 'transparent'
  },

  'abbr[title]': {
    borderBottom: 'none',
    textDecoration: {
      value: 'underline',
      fallbacks: [
        'underline dotted'
      ]
    }
  },

  'b, strong': {
    fontWeight: 'bolder'
  },

  'code, kbd, samp': {
    fontFamily: 'monospace, monospace',
    fontSize: '1em'
  },

  small: {
    fontSize: '80%'
  },

  'sub, sup': {
    fontSize: '75%',
    lineHeight: '0',
    position: 'relative',
    verticalAlign: 'baseline',
  },

  sub: {
    bottom: '-0.25em'
  },

  sup: {
    top: '-0.5em'
  },

  img: {
    borderStyle: 'none'
  },

  'button, input, optgroup, select, textarea': {
    fontFamily: 'inherit',
    fontSize: '100%',
    lineHeight: '1.15',
    margin: '0px'
  },

  'button, input': {
    overflow: 'visible'
  },

  'button, select': {
    textTransform: 'none'
  },

  'button, [type="button"], [type="reset"], [type="submit"]': {
    '-webkit-appearance': 'button'
  },

  'button::-moz-focus-inner, [type="button"]::-moz-focus-inner, [type="reset"]::-moz-focus-inner, [type="submit"]::-moz-focus-inner': {
    borderStyle: 'none',
    padding: '0px'
  },

  'button:-moz-focusring, [type="button"]:-moz-focusring, [type="reset"]:-moz-focusring, [type="submit"]:-moz-focusring': {
    outline: '1px dotted ButtonText'
  },

  fieldset: {
    padding: '0.35em 0.75em 0.625em'
  },

  legend: {
    boxSizing: 'border-box',
    color: 'inherit',
    display: 'table',
    maxWidth: '100%',
    padding: '0px',
    whiteSpace: 'normal'
  },

  progress: {
    verticalAlign: 'baseline'
  },

  textarea: {
    overflow: 'auto'
  },

  '[type="checkbox"], [type="radio"]': {
    boxSizing: 'border-box',
    padding: '0px'
  },

  '[type="number"]::-webkit-inner-spin-button, [type="number"]::-webkit-outer-spin-button': {
    height: 'auto'
  },

  '[type="search"]': {
    '-webkit-appearance': 'textfield',
    outlineOffset: '-2px'
  },

  '[type="search"]::-webkit-search-decoration': {
    '-webkit-appearance': 'none'
  },

  '::-webkit-file-upload-button': {
    '-webkit-appearance': 'button',
    font: 'inherit'
  },

  details: {
    display: 'block'
  },

  summary: {
    display: 'list-item'
  },

  template: {
    display: 'none'
  },

  '[hidden]': {
    display: 'none'
  },
};

export const resetDefault = {
  '*': {
    margin: '0px',
    padding: '0px',
    border: 'none',
    outline: 'none',
    fontSize: '100%',
    background: 'transparent',
    boxSizing: 'border-box',
    touchAction: 'manipulation',
    '-webkit-tap-highlight-color': 'transparent',
    '-webkit-focus-ring-color': 'transparent',

    '&[contenteditable]': {
      userSelect: 'text'
    },

    '&[contenteditable]:empty:before': {
      display: 'block',
      content: `attr(data-placeholder)`,
      color: 'inherit',
      fontStyle: 'inherit',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      opacity: '0.24'
    }
  },

  body: {
    fontSize: '0.875rem',
    fontFamily: FONT_FAMILY.secondary,
    fontWeight: 'normal',
    fontStyle: 'normal',
    position: 'relative',
    overflowX: 'hidden',
    backgroundColor: '#fff',
    wordBreak: 'break-word',

    // visibility hidden ui elements
    '& .onesy-hidden': {
      width: '0px',
      height: '0px',
      opacity: '0',
      overflow: 'hidden',
      visibility: 'hidden',
      userSelect: 'none',
      pointerEvents: 'none'
    }
  },

  'img, embed, object, video': {
    maxWidth: '100%',
    height: 'auto'
  },

  a: {
    textDecoration: 'none',
    cursor: 'pointer'
  },

  form: {
    width: '100%'
  },

  span: {
    wordWrap: 'break-word'
  },

  hr: {
    height: '1px',
    background: '#ddd',
    width: '100%',
    margin: '24px 0'
  },

  'pre, code, kbd, samp': {
    fontFamily: FONT_FAMILY.mono
  },

  code: {
    '& span': {
      whiteSpace: 'pre-wrap'
    },
  },

  ':focus': {
    outline: 'none'
  },

  '::-webkit-scrollbar': {
    width: '16px',
    height: '16px'
  },

  '::-webkit-scrollbar-track, ::-webkit-scrollbar-corner': {
    background: 'transparent'
  },

  '::-webkit-scrollbar-thumb': {
    borderRadius: '8px',
    border: '4px solid transparent',
    backgroundClip: 'content-box',
    backgroundColor: 'rgba(221, 221, 221, 0.4)',

    '&:hover': {
      backgroundColor: 'rgba(221, 221, 221, 0.7)'
    }
  }
};

const optionsDefault: IOptions = {
  mode: 'regular',
  onesy_style: {
    get: OnesyStyle.first.bind(OnesyStyle),
  },
  onesy_theme: {
    get: OnesyTheme.first.bind(OnesyTheme),
  }
};

function reset(
  value_: TValue,
  options_: IOptions = {}
): IMethodResponse {
  const options = merge(options_, optionsDefault, { copy: true });

  // Onesy style
  let onesyStyle = options.onesy_style.value || (is('function', options.onesy_style.get) && options.onesy_style.get(options.element));

  if (onesyStyle === undefined) onesyStyle = new OnesyStyle();

  // Onesy theme
  const onesyTheme: OnesyTheme = options.onesy_theme.value || (is('function', options.onesy_theme.get) && options.onesy_theme.get(options.element));

  // Make value if it's a function
  let value = is('function', value_) ? Try(() => (value_ as TValueMethod)(onesyTheme)) : value_;

  if (!is('object', value)) value = {};

  // Default
  const valueDefault = merge(resetDefault, normalize, { copy: true });

  // Add reset defaults
  // user provided values override reset default values
  if (options.override) value = {
    ...valueDefault,
    ...value,
  };
  else value = merge(value, valueDefault, { copy: true });

  // Make an instance of onesyStyleSheetManager
  const onesyStyleSheetManager = new OnesyStyleSheetManager(
    value,
    {
      mode: 'regular',
      pure: true,
      priority: 'lower',
      onesyTheme,
      onesyStyle,
      name: options.name,
      style: {
        attributes: {
          method: 'reset'
        }
      }
    }
  );

  const response: IMethodResponse = {
    ids: onesyStyleSheetManager.ids,
    onesy_style_sheet_manager: onesyStyleSheetManager,
    sheets: onesyStyleSheetManager.sheets,
    add: onesyStyleSheetManager.add.bind(onesyStyleSheetManager),
    set props(value__: IOnesyStyleSheetManagerProps) { onesyStyleSheetManager.props = value__; },
    update: onesyStyleSheetManager.update.bind(onesyStyleSheetManager),
    remove: onesyStyleSheetManager.remove.bind(onesyStyleSheetManager),
    addRule: onesyStyleSheetManager.sheets.static[0] && onesyStyleSheetManager.sheets.static[0].addRule.bind(onesyStyleSheetManager.sheets.static[0]),
  };

  // Response
  return response;
}

export default reset;
