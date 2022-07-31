import alpha from '@amaui/utils/alpha';
import castParam from '@amaui/utils/castParam';
import clamp from '@amaui/utils/clamp';
import colorToRgb from '@amaui/utils/colorToRgb';
import copy from '@amaui/utils/copy';
import darken from '@amaui/utils/darken';
import elementMethod from '@amaui/utils/element';
import emphasize from '@amaui/utils/emphasize';
import getContrastRatio from '@amaui/utils/getContrastRatio';
import getLuminance from '@amaui/utils/getLuminance';
import hexToRgb from '@amaui/utils/hexToRgb';
import hslToRgb from '@amaui/utils/hslToRgb';
import imageToPalette from '@amaui/utils/imageToPalette';
import lighten from '@amaui/utils/lighten';
import isEnvironment from '@amaui/utils/isEnvironment';
import rgbToHex from '@amaui/utils/rgbToHex';
import rgbToHsl from '@amaui/utils/rgbToHsl';
import rgbToRgba from '@amaui/utils/rgbToRgba';
import Try from '@amaui/utils/try';
import merge from '@amaui/utils/merge';
import AmauiSubscription from '@amaui/subscription';

import { IOptionsRule, TDirection, TValue } from './interfaces';
import colors from './colors';
import { FONT_FAMILY } from './reset';
import { getID, is, pxToRem } from './utils';

export type TTone = 0 | 1 | 5 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 95 | 99 | 100;

export type TColorVariant = 'light' | 'main' | 'dark';

export type TColorValues = 'light' | 'main' | 'dark' | 0 | 1 | 5 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 95 | 99 | 100;

export type TColorBackgroundVariant = 'primary' | 'secondary' | 'tertiary' | 'quaternary';

export type TColorTextVariant = 'primary' | 'secondary' | 'tertiary' | 'quaternary';

export type TPaletteVariant = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'info' | 'success' | 'warning' | 'error' | 'neutral';

export type IColorBackground = {
  [key in TColorBackgroundVariant]?: string;
};

export type IColorText = {
  [key in TColorTextVariant]?: string;
};

export type IColor = {
  [key in TColorValues]?: string;
};

interface IOptions {
  rule?: IOptionsRule;
}

const optionsDefault: IOptions = {
  rule: {
    sort: true,
    prefix: false,
    rtl: false,
  },
};

export type TValueColorValue = {
  [key in TColorValues]?: string;
};

export type IPaletteColor = {
  primary?: TValueColorValue;
  secondary?: TValueColorValue;
  tertiary?: TValueColorValue;
  quaternary?: TValueColorValue;

  info?: TValueColorValue;
  success?: TValueColorValue;
  warning?: TValueColorValue;
  error?: TValueColorValue;

  neutral?: TValueColorValue;

  [p: string]: string | TValueColorValue;
};

export interface IPaletteBackground {
  default?: IColorBackground;

  primary?: IColorBackground;
  secondary?: IColorBackground;
  tertiary?: IColorBackground;
  quaternary?: IColorBackground;

  info?: IColorBackground;
  success?: IColorBackground;
  warning?: IColorBackground;
  error?: IColorBackground;

  neutral?: IColorBackground;

  [p: string]: string | IColorBackground;
}

export interface IPaletteText {
  default?: IColorText;

  primary?: IColorText;
  secondary?: IColorText;
  tertiary?: IColorText;
  quaternary?: IColorText;

  info?: IColorText;
  success?: IColorText;
  warning?: IColorText;
  error?: IColorText;

  neutral?: IColorText;

  divider?: string;

  active?: string;
  hover?: string;
  selected?: string;
  focus?: string;
  disabled?: string;

  [p: string]: string | any;
}

export type TVisualContrastItem = 'default' | 'low' | 'regular' | 'high';

export type TVisualContrastItemItems = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'active' | 'hover' | 'selected' | 'focus' | 'press' | 'drag' | 'disabled' | 'divider';

export type TVisualContrast = {
  [p in TVisualContrastItem]?: {
    opacity?: {
      [i in TVisualContrastItemItems]?: number;
    };

    contrast_threshold?: number;
  };
};

type TPreferenceItems = 'visual_contrast' | 'background' | 'text';

export type TPreference = {
  [key in TPreferenceItems]?: {
    default?: TPaletteVariant | TVisualContrastItem;
  };
};

export type TAccessibility = 'regular' | 'colorblind' | 'tritanopia';

export interface IPalette {
  light?: boolean;

  accessibility?: TAccessibility;

  visual_contrast?: TVisualContrast;

  image?: string;

  color?: IPaletteColor;

  text?: IPaletteText;

  background?: IPaletteBackground;
}

export type TRadiusKey = 'xxs' | 'xs' | 'sm' | 'rg' | 'md' | 'lg' | 'xl' | 'xxl';

export interface IRadius {
  values?: {
    xxs?: number;
    xs?: number;
    sm?: number;
    ld?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;

    round?: string;

    [p: string]: string | number;
  };
  keys?: string[];
  unit?: number;
}

export interface IShape {
  radius?: IRadius;
}

export type TBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface IBreakpoints {
  values?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;

    [p: string]: number;
  };
  keys?: string[];
  unit?: string;
}

export type TSpaceKey = 'xxs' | 'xs' | 'sm' | 'rg' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | 'round';

export interface ISpace {
  values?: {
    xxs?: number;
    xs?: number;
    sm?: number;
    ld?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
    xxxl?: number;

    [p: string]: string | number;
  };
  keys?: string[];
  unit?: number;
}

export type TShadowValues = 0 | 1 | 2 | 3 | 4 | 6 | 8 | 9 | 12 | 16 | 24;

export type IShadow = {
  [key in TShadowValues]?: string;
};

export interface IShadows {
  values?: {
    default?: IShadow;

    primary?: IShadow;
    secondary?: IShadow;
    tertiary?: IShadow;
    quaternary?: IShadow;

    info?: IShadow;
    success?: IShadow;
    warning?: IShadow;
    error?: IShadow;

    neutral?: IShadow;

    [p: string]: any;
  };

  opacities?: Array<number>;
}

export type TTransitionsTimingFunctionProperties = 'standard' | 'emphasized' | 'decelerated' | 'accelerated';

export interface ITransitionsTimingFunction {
  standard?: string;
  emphasized?: string;
  decelerated?: string;
  accelerated?: string;

  [p: string]: string;
}

export type TTransitionsDurationProperties = 'xxs' | 'xs' | 'sm' | 'rg' | 'enter' | 'leave' | 'complex';

export interface ITransitionsDuration {
  xxs?: number;
  xs?: number;
  sm?: number;
  rg?: number;
  enter?: number;
  leave?: number;
  complex?: number;

  [p: string]: number;
}

export interface ITransitions {
  timing_function?: ITransitionsTimingFunction;

  duration?: ITransitionsDuration;
}

export interface IzIndex {
  tooltip?: number;
  modal?: number;
  menu_modal?: number;
  menu?: number;
  button_float?: number;
  app_bar?: number;
  main?: number;
  text?: number;

  [p: string]: number;
}

export interface ITypographyVariant {
  fontSize?: string | number;
  fontFamily?: string;
  lineHeight?: string | number;
  letterSpacing?: string | number;
  fontWeight?: string | number;
}

export type TTypographyItem = 'd1' | 'd2' | 'd3' | 'h1' | 'h2' | 'h3' | 't1' | 't2' | 't3' | 'l1' | 'l2' | 'l3' | 'b1' | 'b2' | 'b3';

export interface ITypography {
  unit?: string;

  font_size?: {
    html?: string | number;
  };

  font_family?: {
    primary?: string;
    secondary?: string;
    mono?: string;
  };

  values?: {
    d1?: ITypographyVariant;
    d2?: ITypographyVariant;
    d3?: ITypographyVariant;
    h1?: ITypographyVariant;
    h2?: ITypographyVariant;
    h3?: ITypographyVariant;
    t1?: ITypographyVariant;
    t2?: ITypographyVariant;
    t3?: ITypographyVariant;
    l1?: ITypographyVariant;
    l2?: ITypographyVariant;
    l3?: ITypographyVariant;
    b1?: ITypographyVariant;
    b2?: ITypographyVariant;
    b3?: ITypographyVariant;

    [p: string]: any;
  };
}

type TMode = 'regular' | 'read' | 'print';

export interface IUi {
  className?: {
    static?: boolean;
  };

  elements?: {
    [p: string]: {
      className?: {
        static?: boolean;
      };

      style?: {
        add?: TValue;
        override?: TValue;
      };

      props?: {
        default?: Record<any, any>;
      };
    }
  };
}

export interface IAmauiTheme {
  preference?: TPreference;

  mode?: TMode;

  palette?: IPalette;

  shape?: IShape;

  breakpoints?: IBreakpoints;

  space?: ISpace;

  shadows?: IShadows;

  typography?: ITypography;

  transitions?: ITransitions;

  z_index?: IzIndex;

  // ui
  ui?: IUi;

  [p: string]: any;
}

const amauiThemeValueDefault: IAmauiTheme = {
  preference: {
    background: {
      default: 'neutral',
    },
    text: {
      default: 'neutral',
    },
    visual_contrast: {
      default: 'regular'
    }
  },

  palette: {
    light: true,

    accessibility: 'regular',

    visual_contrast: {
      low: {
        opacity: {
          primary: .77,
          secondary: .44,
          tertiary: .27,
          quaternary: .14,

          divider: .11,

          active: .44,
          disabled: .34,
          drag: .27,
          press: .21,
          focus: .17,
          selected: .14,
          hover: .07,
        },

        contrast_threshold: 2.4
      },
      regular: {
        opacity: {
          primary: .87,
          secondary: .54,
          tertiary: .37,
          quaternary: .24,

          divider: .14,

          active: .54,
          disabled: .37,
          drag: .31,
          press: .27,
          focus: .21,
          selected: .17,
          hover: .1,
        },

        contrast_threshold: 3
      },
      high: {
        opacity: {
          primary: 1,
          secondary: .74,
          tertiary: .57,
          quaternary: .44,

          divider: .24,

          active: .74,
          disabled: .57,
          drag: .37,
          press: .31,
          focus: .24,
          selected: .21,
          hover: .14,
        },

        contrast_threshold: 4
      },
    },

    color: {
      primary: {
        light: colors.yellow[300],
        main: colors.yellow[500],
        dark: colors.yellow[700],
      },
      secondary: {
        light: colors.lightgreen[300],
        main: colors.lightgreen[500],
        dark: colors.lightgreen[700],
      },
      tertiary: {
        light: colors.amber[300],
        main: colors.amber[500],
        dark: colors.amber[700],
      },
      quaternary: {
        light: colors.cyan[300],
        main: colors.cyan[500],
        dark: colors.cyan[700],
      },

      info: {
        light: colors.lightblue[300],
        main: colors.lightblue[500],
        dark: colors.lightblue[700],
      },
      success: {
        light: colors.green[300],
        main: colors.green[500],
        dark: colors.green[700],
      },
      warning: {
        light: colors.orange[300],
        main: colors.orange[500],
        dark: colors.orange[700],
      },
      error: {
        light: colors.deeporange[300],
        main: colors.deeporange[500],
        dark: colors.deeporange[700],
      },

      neutral: {
        main: colors.black,
      },
    },

    text: {},

    background: {},
  },

  shape: {
    radius: {
      values: {
        xxs: 0.25,
        xs: 0.5,
        sm: 1,
        rg: 2,
        md: 3,
        lg: 4,
        xl: 5,
        xxl: 7,
      },
      unit: 8
    }
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1240,
      lg: 1440,
      xl: 1920,
    },
    unit: 'px',
  },

  space: {
    values: {
      xxs: 0.25,
      xs: 0.5,
      sm: 1,
      rg: 2,
      md: 3,
      lg: 4,
      xl: 5,
      xxl: 6,
      xxxl: 7,
    },
    unit: 8,
  },

  shadows: {
    values: {},

    opacities: [.14, .11, .17],
  },

  typography: {
    unit: 'px',

    font_size: {
      html: 16,
    },

    font_family: {
      primary: FONT_FAMILY.primary,
      secondary: FONT_FAMILY.secondary,
      mono: FONT_FAMILY.mono,
    },

    values: {
      d1: {
        fontSize: `${pxToRem(57, 16)}rem`,
        fontFamily: FONT_FAMILY.primary,
        fontWeight: 400,
        lineHeight: 64 / 57,
        letterSpacing: '0px'
      },
      d2: {
        fontSize: `${pxToRem(45, 16)}rem`,
        fontFamily: FONT_FAMILY.primary,
        fontWeight: 400,
        lineHeight: 52 / 45,
        letterSpacing: '0px'
      },
      d3: {
        fontSize: `${pxToRem(35, 16)}rem`,
        fontFamily: FONT_FAMILY.primary,
        fontWeight: 400,
        lineHeight: 44 / 35,
        letterSpacing: '0px'
      },
      h1: {
        fontSize: `${pxToRem(32, 16)}rem`,
        fontFamily: FONT_FAMILY.primary,
        fontWeight: 400,
        lineHeight: 40 / 32,
        letterSpacing: '0px'
      },
      h2: {
        fontSize: `${pxToRem(27, 16)}rem`,
        fontFamily: FONT_FAMILY.primary,
        fontWeight: 400,
        lineHeight: 35 / 27,
        letterSpacing: '0px'
      },
      h3: {
        fontSize: `${pxToRem(24, 16)}rem`,
        fontFamily: FONT_FAMILY.primary,
        fontWeight: 400,
        lineHeight: 32 / 24,
        letterSpacing: '0px'
      },
      t1: {
        fontSize: `${pxToRem(21, 16)}rem`,
        fontFamily: FONT_FAMILY.primary,
        fontWeight: 400,
        lineHeight: 28 / 21,
        letterSpacing: '0px'
      },
      t2: {
        fontSize: `${pxToRem(16, 16)}rem`,
        fontFamily: FONT_FAMILY.primary,
        fontWeight: 500,
        lineHeight: 24 / 16,
        letterSpacing: '.15px'
      },
      t3: {
        fontSize: `${pxToRem(14, 16)}rem`,
        fontFamily: FONT_FAMILY.primary,
        fontWeight: 500,
        lineHeight: 20 / 14,
        letterSpacing: '.1px'
      },
      l1: {
        fontSize: `${pxToRem(16, 16)}rem`,
        fontFamily: FONT_FAMILY.secondary,
        fontWeight: 500,
        lineHeight: 20 / 14,
        letterSpacing: '.5px'
      },
      l2: {
        fontSize: `${pxToRem(14, 16)}rem`,
        fontFamily: FONT_FAMILY.secondary,
        fontWeight: 500,
        lineHeight: 15 / 12,
        letterSpacing: '.25px'
      },
      l3: {
        fontSize: `${pxToRem(11, 16)}rem`,
        fontFamily: FONT_FAMILY.secondary,
        fontWeight: 500,
        lineHeight: 15 / 11,
        letterSpacing: '.4px'
      },
      b1: {
        fontSize: `${pxToRem(16, 16)}rem`,
        fontFamily: FONT_FAMILY.secondary,
        fontWeight: 400,
        lineHeight: 24 / 16,
        letterSpacing: '.5px'
      },
      b2: {
        fontSize: `${pxToRem(14, 16)}rem`,
        fontFamily: FONT_FAMILY.secondary,
        fontWeight: 400,
        lineHeight: 20 / 14,
        letterSpacing: '.25px'
      },
      b3: {
        fontSize: `${pxToRem(11, 16)}rem`,
        fontFamily: FONT_FAMILY.secondary,
        fontWeight: 400,
        lineHeight: 15 / 11,
        letterSpacing: '.4px'
      }
    }
  },

  transitions: {
    timing_function: {
      standard: 'cubic-bezier(.4, 0, .2, 1)',
      emphasized: 'cubic-bezier(.4, 0, .6, 1)',
      decelerated: 'cubic-bezier(0, 0, .2, 1)',
      accelerated: 'cubic-bezier(.4, 0, 1, 1)',
    },
    duration: {
      xxs: 100,
      xs: 200,
      sm: 250,
      rg: 300,
      enter: 250,
      leave: 200,
      complex: 500,
    },
  },

  z_index: {
    tooltip: 1700,
    modal: 1500,
    menu_modal: 1400,
    menu: 1300,
    button_float: 1200,
    app_bar: 1100,
    main: 1000,
    text: 0,
  },
};

class AmauiTheme {
  public id?: string;
  public subscriptions = {
    update: new AmauiSubscription(),
  };
  public direction: TDirection = 'ltr';

  // Preference
  public preference: TPreference = copy(amauiThemeValueDefault.preference);
  // Mode
  public mode: TMode = 'regular';
  // Colors
  public palette: IPalette = copy(amauiThemeValueDefault.palette);
  // Shape
  public shape: IShape = copy(amauiThemeValueDefault.shape);
  // Breakpoints
  public breakpoints: IBreakpoints = copy(amauiThemeValueDefault.breakpoints);
  // Space
  public space: ISpace = copy(amauiThemeValueDefault.space);
  // Shadows
  public shadows: IShadows = copy(amauiThemeValueDefault.shadows);
  // Typography
  public typography: ITypography = copy(amauiThemeValueDefault.typography);
  // Transitions
  public transitions: ITransitions = copy(amauiThemeValueDefault.transitions);
  // zIndex
  public z_index: IzIndex = copy(amauiThemeValueDefault.z_index);
  // Methods
  public methods = {
    palette: {
      image: async (image: string, options: { amount?: number; size?: number; allowCrossOrigin?: boolean; } = {}) => {
        const values = await imageToPalette(image, { amount: 4, size: 140, allowCrossOrigin: false, ...options });

        return (values || []);
      },

      color: {
        value: (variant: TPaletteVariant | 'default', tone: TTone, light: boolean = true, palette?: IColor) => {
          const color = palette || (variant === 'default' ? this.palette.color.neutral : this.palette.color[variant]);

          if (color) return this.palette.light === light ? color[tone] : color[Math.abs(100 - tone)];
        },

        text: (background: string, max = false, prefer?: 'light' | 'dark') => {
          const preferenceText = this.preference.text.default || 'neutral';

          const luminances = {
            background: getLuminance(background),
            text: getLuminance(this.palette.text.default.primary)
          };

          let valueLighten = false;

          let tone = preferenceText === 'neutral' ? this.palette.light ? 0 : 100 : 50;

          let contrastRatio = getContrastRatio(background, this.palette.text.default.primary);

          let color: any = this.palette.text.default.primary;

          if (prefer === 'light' && !valueLighten) valueLighten = getContrastRatio(background, '#fff') >= 1.74;
          else if (prefer === 'dark' && valueLighten) valueLighten = getContrastRatio(background, '#000') >= 1.74;

          if (max) {
            tone = valueLighten ? 100 : 0;

            color = colorToRgb(this.palette.color[preferenceText][tone], this.palette.visual_contrast.default.opacity.primary);
          }
          else {
            valueLighten = luminances.text >= luminances.background;

            while (contrastRatio < this.palette.visual_contrast.default.contrast_threshold) {
              // Update tone
              valueLighten ? tone += 10 : tone -= 10;

              tone = clamp(tone, 0, 100);

              color = colorToRgb(this.palette.color[preferenceText][tone], this.palette.visual_contrast.default.opacity.primary);

              contrastRatio = getContrastRatio(background, color);
            }
          }

          return color;
        },

        alpha,
        emphasize,
        lighten,
        darken,
        getLuminance,
        getContrastRatio,
        colorToRgb,
        rgbToRgba,
        rgbToHsl,
        rgbToHex,
        hslToRgb,
        hexToRgb,
      }
    },

    color: (value: string) => AmauiTheme.make.color(value),

    shadow: (value: string = this.palette.color.primary.main, opacities: Array<number> = this.shadows.opacities) => AmauiTheme.make.shadow(value, opacities),

    space: {
      value: (value: TSpaceKey | number, unit?: string, add = 0) => {
        let value_: any;

        if (value === 'round') value_ = this.space.values[value];
        else value_ = this.space.unit * ((this.space.values[value] !== undefined ? this.space.values[value] : value as number) as number);

        return unit ? value_ + add + unit : value_ + add;
      },
    },

    shape: {
      radius: {
        value: (value: TRadiusKey | number, unit?: string, add = 0) => {
          const value_ = this.shape.radius.unit * ((this.shape.radius.values[value] !== undefined ? this.shape.radius.values[value] : value as number) as number);

          return unit ? value_ + add + unit : value_ + add;
        },
      },
    },

    breakpoints: {
      up: (value: number, media = 'only screen') => `@media ${media} and (min-width: ${value}${this.breakpoints.unit})`,
      down: (value: number, media = 'only screen') => `@media ${media} and (max-width: ${value}${this.breakpoints.unit})`,
      between: (value1: number, value2: number, media = 'only screen') => `@media ${media} and (min-width: ${value1}${this.breakpoints.unit}) and (max-width: ${value2}${this.breakpoints.unit})`,
      only: (value: number) => this.methods.breakpoints.between(value, value),
      not: (value: TBreakpoint, media = 'only screen') => {
        if (value === 'xs') return this.methods.breakpoints.up(this.breakpoints.values.xs);
        else if (value === 'xl') return this.methods.breakpoints.down(this.breakpoints.values.xl);

        const keys = this.breakpoints.keys;

        const index = keys.findIndex(item => item === value);

        return `@media ${media} and (max-width: ${this.breakpoints.values[value]}${this.breakpoints.unit}) and (min-width: ${this.breakpoints.values[keys[index + 1]]}${this.breakpoints.unit})`;
      },
    },

    transitions: {
      make: (
        properties: string | Array<string>,
        options: { duration?: TTransitionsDurationProperties | number; timing_function?: TTransitionsTimingFunctionProperties; delay?: TTransitionsDurationProperties | number; } = { duration: 'rg', timing_function: 'standard' }
      ) => {
        const props: any = is('array', properties) ? properties : [properties];

        const duration = this.transitions.duration[options?.duration] || (is('number', options?.duration) ? options?.duration : this.transitions.duration.rg);
        const timing_function = this.transitions.timing_function[options?.timing_function] || (is('string', options?.timing_function) && options?.timing_function) || this.transitions.timing_function.standard;
        const delay = this.transitions.duration[options?.delay] || (is('number', options?.delay) ? options?.delay : 0);

        return props.map(prop => `${prop} ${duration}ms ${timing_function} ${delay}ms`).join(', ');
      },
    }
  };
  public ui?: IUi = {
    className: {
      static: true
    }
  };

  // Any new property
  [p: string]: any;

  public constructor(
    value: IAmauiTheme = amauiThemeValueDefault,
    public element?: Element,
    public options: IOptions = copy(optionsDefault),
  ) {
    this.options = merge(options, optionsDefault, { copy: true });

    this.init(value);
  }

  public init(value_: IAmauiTheme | AmauiTheme = this) {
    const { mode, preference, palette = {}, shape = {}, breakpoints = {}, space = {}, shadows = {}, typography = {}, transitions, z_index = {}, id, subscriptions, methods, element, options, direction, ...other } = copy(value_ || {});

    const { light, color = {}, background = {}, text = {}, visual_contrast = {}, accessibility } = palette || {};

    if (this.id === undefined) this.id = getID();

    // Direction
    if (isEnvironment('browser')) {
      if (this.element) {
        // AmauiStyle in element
        this.element.setAttribute('data-amaui-theme', 'true');

        (this.element as any)['amaui-theme'] = true;

        (this.element as any).amaui_theme = this;

        const style = Try(() => window.getComputedStyle(this.element));

        this.direction = style?.direction || Try(() => window.getComputedStyle(document.documentElement).direction) || 'ltr';

        this.options.rule.rtl = this.direction === 'rtl';
      }
    }

    // Light
    if (light !== undefined) this.palette.light = light;

    // Mode
    if (mode !== undefined) this.mode = mode;

    // Preference
    if (is('object', preference)) this.preference = merge(preference, this.preference);

    // Visual contrast
    if (is('object', visual_contrast)) this.palette.visual_contrast = merge(visual_contrast, this.palette.visual_contrast);

    this.palette.visual_contrast.default = this.palette.visual_contrast[this.preference.visual_contrast?.default || 'regular'];

    // Colors
    const defaults = ['primary', 'secondary', 'tertiary', 'quaternary', 'info', 'success', 'warning', 'error', 'neutral'];

    // Normalize
    Object.keys(color).forEach(prop => {
      const item = color[prop] as string;

      if (is('string', item)) color[prop] = { main: item };
    });

    // Defaults if not provided add 'em
    defaults.forEach(item => {
      if (!is('object', color[item])) color[item] = this.palette.color[item];

      if (!(is('string', (color[item] as IPaletteColor).light) || is('string', (color[item] as IPaletteColor).main) || is('string', (color[item] as IPaletteColor).dark))) {
        (color[item] as IPaletteColor).main = (this.palette.color[item] as IPaletteColor).main;
      }
    });

    // Accessibility
    if (accessibility !== undefined) this.palette.accessibility = accessibility;

    if (this.palette.accessibility !== 'regular') {
      switch (this.palette.accessibility) {
        case 'colorblind':
          // Primary
          color.primary.light = colors.blue[300];
          color.primary.main = colors.blue[500];
          color.primary.dark = colors.blue[700];

          // Secondary
          color.secondary.light = colors.orange[300];
          color.secondary.main = colors.orange[500];
          color.secondary.dark = colors.orange[700];

          // Tertiary
          color.tertiary.light = colors.yellow[300];
          color.tertiary.main = colors.yellow[500];
          color.tertiary.dark = colors.yellow[700];

          // Quaternary
          color.quaternary.light = colors.gray[300];
          color.quaternary.main = colors.gray[500];
          color.quaternary.dark = colors.gray[700];

          break;

        case 'tritanopia':
          // Primary
          color.primary.light = colors.blue[300];
          color.primary.main = colors.blue[500];
          color.primary.dark = colors.blue[700];

          // Secondary
          color.secondary.light = colors.red[300];
          color.secondary.main = colors.red[500];
          color.secondary.dark = colors.red[700];

          // Tertiary
          color.tertiary.light = colors.cyan[300];
          color.tertiary.main = colors.cyan[500];
          color.tertiary.dark = colors.cyan[700];

          // Quaternary
          color.quaternary.light = colors.gray[300];
          color.quaternary.main = colors.gray[500];
          color.quaternary.dark = colors.gray[700];

          break;

        default:
          break;
      }
    }

    Object.keys(color).forEach(prop => {
      const item = color[prop];
      const value = AmauiTheme.make.color((color[prop] as TValueColorValue).main || (color[prop] as TValueColorValue).light || (color[prop] as TValueColorValue).dark);

      if (value) {
        this.palette.color[prop] = value;

        const variants = ['light', 'main', 'dark'];

        // Override the main variants with user provided values
        variants.forEach(variant => { if (is('string', item[variant]) && !!item[variant].length) this.palette.color[prop][variant] = item[variant]; });
      }
    });

    // text
    // add to text
    Object.keys(text).forEach(prop => {
      this.palette.text[prop] = text[prop];
    });

    Object.keys(this.palette.color).forEach(item => {
      const variant = this.palette.color[item] as TValueColorValue;

      if (!this.palette.text[item]) this.palette.text[item] = {};

      const colorValue = this.palette.light ? variant[item === 'neutral' ? 0 : 30] : variant[item === 'neutral' ? 100 : 70];

      this.palette.text[item].primary = text[item]?.primary || colorToRgb(colorValue, this.palette.visual_contrast.default?.opacity.primary);
      this.palette.text[item].secondary = text[item]?.secondary || colorToRgb(colorValue, this.palette.visual_contrast.default?.opacity.secondary);
      this.palette.text[item].tertiary = text[item]?.tertiary || colorToRgb(colorValue, this.palette.visual_contrast.default?.opacity.tertiary);
      this.palette.text[item].quaternary = text[item]?.quaternary || colorToRgb(colorValue, this.palette.visual_contrast.default?.opacity.quaternary);
    });

    // background
    // add to text
    Object.keys(background).forEach(prop => {
      this.palette.background[prop] = background[prop];
    });

    Object.keys(this.palette.color).forEach(item => {
      const variant = this.palette.color[item];

      if (!this.palette.background[item]) this.palette.background[item] = {};

      (this.palette.background[item] as IColorBackground).primary = (background[item] as IColorBackground)?.primary || variant[!this.palette.light ? 0 : 100];
      (this.palette.background[item] as IColorBackground).secondary = (background[item] as IColorBackground)?.secondary || variant[!this.palette.light ? 1 : 99];
      (this.palette.background[item] as IColorBackground).tertiary = (background[item] as IColorBackground)?.tertiary || variant[!this.palette.light ? 5 : 95];
      (this.palette.background[item] as IColorBackground).quaternary = (background[item] as IColorBackground)?.quaternary || variant[!this.palette.light ? 10 : 90];
    });

    // default
    (this.palette.background.default as IColorBackground) = this.palette.background[this.preference.background.default || 'white'] as IColorBackground;
    this.palette.text.default = this.palette.text[this.preference.text.default || 'neutral'];

    // other
    this.palette.text.divider = colorToRgb(this.palette.text.default.primary, this.palette.visual_contrast.default?.opacity.divider) as string;

    this.palette.text.active = this.palette.text.default.secondary;
    this.palette.text.hover = colorToRgb(this.palette.text.default.primary, this.palette.visual_contrast.default?.opacity.hover) as string;
    this.palette.text.selected = colorToRgb(this.palette.text.default.primary, this.palette.visual_contrast.default?.opacity.selected) as string;
    this.palette.text.focus = colorToRgb(this.palette.text.default.primary, this.palette.visual_contrast.default?.opacity.focus) as string;
    this.palette.text.disabled = this.palette.text.default.tertiary;

    // Shape
    if (is('object', shape)) this.shape = merge(shape, this.shape);

    // Radius
    if (is('object', shape.radius)) {
      this.shape.radius.unit = shape.radius.unit !== undefined ? shape.radius.unit : this.shape.radius.unit;
    }

    if (!this.shape.radius.keys) Object.defineProperty(this.shape.radius, 'keys', {
      get() { return Object.keys(instance.shape.radius.values); }
    });

    // Breakpoints
    if (is('object', breakpoints)) this.breakpoints = merge(breakpoints, this.breakpoints);

    const instance = this;

    if (!this.breakpoints.keys) Object.defineProperty(this.breakpoints, 'keys', {
      get() { return Object.keys(instance.breakpoints.values); }
    });

    // Space
    if (is('object', space)) {
      this.space = merge(space, this.space);

      this.space.unit = space.unit !== undefined ? space.unit : this.space.unit;
    }

    if (!this.space.keys) Object.defineProperty(this.space, 'keys', {
      get() { return Object.keys(instance.space.values); }
    });

    // Shadows
    if (is('object', shadows)) this.shadows = merge(shadows, this.shadows);

    Object.keys(this.palette.color).forEach(item => {
      const variant = this.palette.color[item] as TValueColorValue;

      this.shadows.values[item] = AmauiTheme.make.shadow(variant.main, this.shadows.opacities);
    });

    // Typography
    if (is('object', typography)) this.typography = merge(typography, this.typography);

    // Transitions
    if (is('object', transitions)) this.transitions = merge(transitions, this.transitions);

    // zIndex
    if (is('object', z_index)) this.z_index = merge(z_index, this.z_index);

    // Other
    Object.keys(other).forEach(prop => this[prop] = other[prop]);
  }

  public async image(value_: string, other: any = {}) {
    // Image
    if (value_) {
      const values = await this.methods.palette.image(value_);

      if (!!values.length) {
        const palette: IPalette = {
          color: {
            primary: {},
            secondary: {},
            tertiary: {},
            quaternary: {}
          },
        };

        palette.color.primary.main = values[0];
        palette.color.secondary.main = values[1];
        palette.color.tertiary.main = values[2];
        palette.color.quaternary.main = values[3];

        const value = merge({ palette }, other, { copy: true });

        this.init(value);

        // Add image to the palette
        this.palette.image = value_;
      }
    }
  }

  public update(value: IAmauiTheme) {
    if (value !== undefined) {
      this.init(copy(value));

      this.subscriptions.update.emit(value, this);
    }
  }

  public static get amaui_theme() { return new AmauiTheme(); }

  public static get make() {
    return {
      color: (value: string): IColor => {
        const rgb = colorToRgb(value) as string;

        if (rgb) {
          const values: IColor = {};

          const [hue, saturation, light] = rgbToHsl(rgb, 1, true);

          const tones: Array<TTone> = [0, 1, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];

          // Tones
          tones.forEach(tone => values[tone] = hslToRgb(`hsl(${hue}, ${saturation}%, ${tone}%)`) as string);

          // Main
          values.main = rgb;

          const mainTone = Math.round(castParam(light) / 10) * 10;

          const mainIndex = tones.findIndex(item => item === mainTone);

          // Light
          // max light 90 value
          if (mainIndex >= 10) values.light = values[90];
          // min light 10 value
          else if (mainIndex === 0) values.light = values[10];
          else values.light = values[tones[mainIndex + 2]];

          // Dark
          // min dark 10 value
          if (mainIndex < 5) values.dark = values[10];
          // max dark 90 value
          else if (mainIndex === 14) values.dark = values[90];
          else values.dark = values[tones[mainIndex - 2]];

          return values;
        }
      },
      shadow: (value: string, opacities: Array<number> = []): IShadow => {
        const shadow: IShadow = {
          '0': 'none',
        };

        const values = [
          ['1', [0, 1, 1, 0, 0, 2, 1, -1, 0, 1, 3, 0]],
          ['2', [0, 2, 2, 0, 0, 3, 3, -2, 0, 1, 8, 0]],
          ['3', [0, 3, 4, 0, 0, 3, 3, -2, 0, 1, 8, 0]],
          ['4', [0, 4, 5, 0, 0, 1, 10, 0, 0, 2, 4, -1]],
          ['6', [0, 6, 10, 0, 0, 1, 18, 0, 0, 3, 5, -1]],
          ['8', [0, 8, 10, 1, 0, 3, 14, 2, 0, 5, 5, -3]],
          ['9', [0, 9, 12, 1, 0, 3, 16, 2, 0, 5, 6, -3]],
          ['12', [0, 12, 17, 2, 0, 5, 22, 4, 0, 7, 7, -4]],
          ['16', [0, 16, 24, 2, 0, 6, 30, 5, 0, 8, 10, -5]],
          ['24', [0, 24, 37, 3, 0, 9, 46, 8, 0, 11, 15, -7]],
        ];

        values.forEach(([item, v]) => shadow[item as string] = [
          `${v[0]}px ${v[1]}px ${v[2]}px ${v[3]}px ${colorToRgb(value, opacities[0])}`,
          `${v[4]}px ${v[5]}px ${v[6]}px ${v[7]}px ${colorToRgb(value, opacities[1])}`,
          `${v[8]}px ${v[9]}px ${v[10]}px ${v[11]}px ${colorToRgb(value, opacities[2])}`
        ].join(', '));

        return shadow;
      },
    };
  }

  public static attributes = [
    'data-amaui-theme',
    'amaui-theme'
  ];

  public static get(value: Element, index = 0): AmauiTheme {
    const themes = this.all(value);

    return themes[index === -1 ? themes.length - 1 : index];
  }

  public static first(value: Element): AmauiTheme {
    return this.get(value);
  }

  public static last(value: Element): AmauiTheme {
    return this.get(value, -1);
  }

  public static nearest(value: Element): AmauiTheme {
    return (elementMethod(value).nearest(this.attributes.map(item => `[${item}]`)) as any)?.amaui_theme;
  }

  public static furthest(value: Element): AmauiTheme {
    return (elementMethod(value).furthest(this.attributes.map(item => `[${item}]`)) as any)?.amaui_theme;
  }

  public static all(value: Element): Array<AmauiTheme> {
    const elements = [
      value,
      ...elementMethod(value).parents(this.attributes.map(item => `[${item}]`)),
    ];

    return elements
      .filter(Boolean)
      .map((item: any) => item.amaui_theme)
      .filter(Boolean) || [];
  }
}

export default AmauiTheme;
