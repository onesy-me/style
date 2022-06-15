import AmauiCache from '@amaui/cache';
import { is, merge } from '@amaui/utils';

import AmauiStyle from './amaui-style';
import { valueResolve } from './utils';

export interface IValueObject {
  value?: any;
  arguments?: any;
}

export interface IOptions { }

const optionsDefault: IOptions = {};

function valueObject(amauiStyle: AmauiStyle, options_: IOptions = {}) {
  const options: IOptions = merge(options_, optionsDefault, { copy: true });

  const method = (value_: { property?: string; value?: any } = {}): IValueObject => {
    // Check in cache if class name already exists with these values
    const valueCached = AmauiCache.get(value_, amauiStyle?.id);

    if (valueCached) return valueCached;

    const value: IValueObject = {
      arguments: {
        value: value_,
      },
    };

    const { property } = value_;

    if (is('object', value_.value)) {
      // Object extendable
      let top: any;
      let right: any;
      let bottom: any;
      let left: any;
      let width: any;
      let height: any;
      let horizontal: any;
      let vertical: any;
      let templateRows: any;
      let templateColumns: any;
      let position: any;
      let duration: any;
      let delay: any;
      let easingFunction: any;

      switch (property) {
        case 'animation':
          duration = valueResolve('animation-duration', value_.value['duration'], amauiStyle).value[0];
          duration = duration !== undefined ? duration : value_.value['duration'];

          delay = valueResolve('animation-delay', value_.value['delay'], amauiStyle).value[0];
          delay = delay !== undefined ? delay : value_.value['delay'];

          easingFunction = value_.value['easing-function'] || value_.value['easingFunction'];

          const iterationCount = value_.value['iterationCount'] !== undefined ? value_.value['iterationCount'] : value_.value['iteration-count'];

          const fillMode = value_.value['fillMode'] !== undefined ? value_.value['fillMode'] : value_.value['fill-mode'];

          const playState = value_.value['playState'] !== undefined ? value_.value['playState'] : value_.value['play-state'];

          value.value = [
            [
              value_.value['name'],
              duration,
              easingFunction,
              delay,
              iterationCount,
              value_.value['direction'],
              fillMode,
              playState
            ].filter(item => item !== undefined).join(' '),
          ];

          break;

        case 'background':
          position = valueResolve('background-position', value_.value['position'], amauiStyle).value[0];
          position = position !== undefined ? position : value_.value['position'];

          value.value = [
            [
              value_.value['color'],
              value_.value['image'],
              value_.value['repeat'],
              position
            ].filter(item => item !== undefined).join(' '),
          ];

          break;

        case 'border':
        case 'border-top':
        case 'border-right':
        case 'border-bottom':
        case 'border-left':
        case 'border-block':
        case 'border-block-end':
        case 'border-block-start':
        case 'border-inline-end':
        case 'border-inline-start':
        case 'column-rule':
          width = valueResolve(property, value_.value['width'], amauiStyle).value[0];
          width = width !== undefined ? width : value_.value['width'];

          value.value = [
            [
              width,
              value_.value['style'],
              value_.value['color']
            ].filter(item => item !== undefined).join(' '),
          ];

          break;

        case 'outline':
          width = valueResolve('outline-width', value_.value['width'], amauiStyle).value[0] || value_.value['width'];
          width = width !== undefined ? width : value_.value['width'];

          value.value = [
            [
              value_.value['color'],
              value_.value['style'],
              width
            ].filter(item => item !== undefined).join(' '),
          ];

          break;

        case 'border-color':
        case 'border-top-color':
        case 'border-right-color':
        case 'border-bottom-color':
        case 'border-left-color':
          top = value_.value['top'] !== undefined ? value_.value['top'] : 'transparent';
          right = value_.value['right'] !== undefined ? value_.value['right'] : 'transparent';
          bottom = value_.value['bottom'] !== undefined ? value_.value['bottom'] : 'transparent';
          left = value_.value['left'] !== undefined ? value_.value['left'] : 'transparent';

          value.value = [
            [
              top,
              right,
              bottom,
              left
            ].filter(item => item !== undefined).join(' '),
          ];

          break;

        case 'background-position':
          const keys = Object.keys(value_.value);

          value.value = [[]];

          keys.forEach(item => {
            let value__ = valueResolve('background-position', value_.value[item], amauiStyle).value[0];
            value__ = value__ !== undefined ? value__ : value_.value[item];

            if (value__ !== undefined) value.value[0].push(value__);
          });

          value.value[0] = value.value[0].join(' ');

          break;

        case 'font':
          const lineHeight = value_.value['line-height'] || value_.value['lineHeight'] || value_.value['height'];

          let fontSize = valueResolve('font-size', value_.value['size'], amauiStyle).value[0];
          fontSize = fontSize !== undefined ? fontSize : value_.value['size'];

          let fontFamily = valueResolve('font-family', value_.value['family'], amauiStyle).value[0];
          fontFamily = fontFamily !== undefined ? fontFamily : value_.value['family'];

          const other = fontSize && lineHeight ? [`${fontSize}/${lineHeight}`] : [fontSize, lineHeight];

          value.value = [
            [
              value_.value['style'],
              value_.value['weight'],
              ...other,
              fontFamily
            ].filter(item => item !== undefined).join(' '),
          ];

          break;

        case 'margin':
        case 'padding':
        case 'border-width':
        case 'border-image-outset':
          top = valueResolve(property, value_.value['top'], amauiStyle).value[0];
          top = top !== undefined ? top : value_.value['top'] !== undefined ? value_.value['top'] : 0;

          right = valueResolve(property, value_.value['right'], amauiStyle).value[0];
          right = right !== undefined ? right : value_.value['right'] !== undefined ? value_.value['right'] : 0;

          bottom = valueResolve(property, value_.value['bottom'], amauiStyle).value[0];
          bottom = bottom !== undefined ? bottom : value_.value['bottom'] !== undefined ? value_.value['bottom'] : 0;

          left = valueResolve(property, value_.value['left'], amauiStyle).value[0];
          left = left !== undefined ? left : value_.value['left'] !== undefined ? value_.value['left'] : 0;

          value.value = [
            [
              top,
              right,
              bottom,
              left
            ].filter(item => item !== undefined).join(' '),
          ];

          break;

        case 'scroll-margin':
        case 'scroll-padding':
          top = valueResolve(property, value_.value['top'], amauiStyle).value[0];
          top = top !== undefined ? top : value_.value['top'] !== undefined ? value_.value['top'] : 0;

          right = valueResolve(property, value_.value['right'], amauiStyle).value[0];
          right = right !== undefined ? right : value_.value['right'] !== undefined ? value_.value['right'] : 0;

          bottom = valueResolve(property, value_.value['bottom'], amauiStyle).value[0];
          bottom = bottom !== undefined ? bottom : value_.value['bottom'] !== undefined ? value_.value['bottom'] : 0;

          left = valueResolve(property, value_.value['left'], amauiStyle).value[0];
          left = left !== undefined ? left : value_.value['left'] !== undefined ? value_.value['left'] : 0;

          value.value = [
            [
              bottom,
              left,
              right,
              top
            ].filter(item => item !== undefined).join(' '),
          ];

          break;

        case 'overflow':
        case 'background-repeat':
          value.value = [
            [
              value_.value['x'],
              value_.value['y']
            ].filter(item => item !== undefined).join(' '),
          ];

          break;

        case 'background-size':
          width = valueResolve(property, value_.value['width'], amauiStyle).value[0];
          width = width !== undefined ? width : value_.value['width'] !== undefined ? value_.value['width'] : 0;

          height = valueResolve(property, value_.value['height'], amauiStyle).value[0];
          height = height !== undefined ? height : value_.value['height'] !== undefined ? value_.value['height'] : 0;

          value.value = [
            [
              width,
              height
            ].filter(item => item !== undefined).join(' '),
          ];

          break;

        case 'border-bottom-left-radius':
        case 'border-bottom-right-radius':
        case 'border-top-left-radius':
        case 'border-top-right-radius':
        case 'border-end-end-radius':
        case 'border-end-start-radius':
        case 'border-start-end-radius':
        case 'border-start-start-radius':
          horizontal = valueResolve('border-radius', value_.value['horizontal'], amauiStyle).value[0];
          horizontal = horizontal !== undefined ? horizontal : value_.value['horizontal'] !== undefined ? value_.value['horizontal'] : 0;

          vertical = valueResolve('border-radius', value_.value['vertical'], amauiStyle).value[0];
          vertical = vertical !== undefined ? vertical : value_.value['vertical'] !== undefined ? value_.value['vertical'] : 0;

          value.value = [
            [
              horizontal,
              vertical
            ].filter(item => item !== undefined).join(' '),
          ];

          break;

        case 'border-image':
          width = valueResolve('border-image-width', value_.value['width'], amauiStyle).value[0];
          width = width !== undefined ? width : value_.value['width'];

          let outset = valueResolve('border-image-outset', value_.value['outset'], amauiStyle).value[0];
          outset = outset !== undefined ? outset : value_.value['outset'];

          const slice = value_.value['slice'];

          const widthAndSlice = (width && slice) ? `${slice} / ${width}` : width ? width : slice;

          value.value = [
            [
              value_.value['source'],
              widthAndSlice,
              outset,
              value_.value['repeat']
            ].filter(item => item !== undefined).join(' '),
          ];

          break;

        case 'border-radius':
          let topLeft = valueResolve('border-top-left-radius', value_.value['top-left'] !== undefined ? value_.value['top-left'] : value_.value['topLeft'], amauiStyle).value[0];
          topLeft = topLeft !== undefined ? topLeft : (value_.value['top-left'] !== undefined ? value_.value['top-left'] : value_.value['topLeft'] || 0);

          let topRight = valueResolve('border-top-right-radius', value_.value['top-right'] !== undefined ? value_.value['top-right'] : value_.value['topRight'], amauiStyle).value[0];
          topRight = topRight !== undefined ? topRight : (value_.value['top-right'] !== undefined ? value_.value['top-right'] : value_.value['topRight'] || 0);

          let bottomRight = valueResolve('border-bottom-right-radius', value_.value['bottom-right'] !== undefined ? value_.value['bottom-right'] : value_.value['bottomRight'], amauiStyle).value[0];
          bottomRight = bottomRight !== undefined ? bottomRight : (value_.value['bottom-right'] !== undefined ? value_.value['bottom-right'] : value_.value['bottomRight'] || 0);

          let bottomLeft = valueResolve('border-bottom-left-radius', value_.value['bottom-left'] !== undefined ? value_.value['bottom-left'] : value_.value['bottomLeft'], amauiStyle).value[0];
          bottomLeft = bottomLeft !== undefined ? bottomLeft : (value_.value['bottom-left'] !== undefined ? value_.value['bottom-left'] : value_.value['bottomLeft'] || 0);

          value.value = [
            [
              topLeft,
              topRight,
              bottomRight,
              bottomLeft
            ].filter(item => item !== undefined).join(' '),
          ];

          break;

        case 'border-style':
          top = value_.value['top'] !== undefined ? value_.value['top'] : 'transparent';
          right = value_.value['right'] !== undefined ? value_.value['right'] : 'transparent';
          bottom = value_.value['bottom'] !== undefined ? value_.value['bottom'] : 'transparent';
          left = value_.value['left'] !== undefined ? value_.value['left'] : 'transparent';

          value.value = [
            [
              top,
              right,
              bottom,
              left
            ].filter(item => item !== undefined).join(' '),
          ];

          break;

        case 'columns':
          width = valueResolve('column-width', value_.value['width'], amauiStyle).value[0];
          width = width !== undefined ? width : value_.value['width'];

          value.value = [
            [
              width,
              value_.value['count']
            ].filter(item => item !== undefined).join(' '),
          ];

          break;

        case 'flex':
          let basis = valueResolve('flex-basis', value_.value['basis'], amauiStyle).value[0];
          basis = basis !== undefined ? basis : value_.value['basis'];

          value.value = [
            [
              value_.value['grow'],
              value_.value['shrink'],
              basis
            ].filter(item => item !== undefined).join(' '),
          ];

          break;

        case 'flex-flow':
          value.value = [
            [
              value_.value['direction'],
              value_.value['wrap']
            ].filter(item => item !== undefined).join(' '),
          ];

          break;

        case 'gap':
          let row = valueResolve('gap', value_.value['row'], amauiStyle).value[0];
          row = row !== undefined ? row : value_.value['row'];

          let column = valueResolve('gap', value_.value['column'], amauiStyle).value[0];
          column = column !== undefined ? column : value_.value['column'];

          value.value = [
            [
              row,
              column
            ].filter(item => item !== undefined).join(' '),
          ];

          break;

        case 'grid':
          let autoRows = valueResolve('grid-auto-rows', value_.value['autoRows'] !== undefined ? value_.value['autoRows'] : value_.value['auto-rows'], amauiStyle).value[0];
          autoRows = autoRows !== undefined ? autoRows : value_.value['autoRows'] !== undefined ? value_.value['autoRows'] : value_.value['auto-rows'];

          let autoColumns = valueResolve('grid-auto-columns', value_.value['autoColumns'] !== undefined ? value_.value['autoColumns'] : value_.value['auto-columns'], amauiStyle).value[0];
          autoColumns = autoColumns !== undefined ? autoColumns : value_.value['autoColumns'] !== undefined ? value_.value['autoColumns'] : value_.value['auto-columns'];

          templateRows = valueResolve('grid-template-rows', value_.value['templateRows'] !== undefined ? value_.value['templateRows'] : value_.value['template-rows'], amauiStyle).value[0];
          templateRows = templateRows !== undefined ? templateRows : value_.value['templateRows'] !== undefined ? value_.value['templateRows'] : value_.value['template-rows'];

          templateColumns = valueResolve('grid-template-rows', value_.value['templateColumns'] !== undefined ? value_.value['templateColumns'] : value_.value['template-columns'], amauiStyle).value[0];
          templateColumns = templateColumns !== undefined ? templateColumns : value_.value['templateColumns'] !== undefined ? value_.value['templateColumns'] : value_.value['template-columns'];

          if (templateRows) {
            value.value = [
              [
                templateRows,
                '/',
                (value_.value['auto-flow'] !== undefined ? value_.value['auto-flow'] : value_.value['autoFlow']),
                autoColumns
              ].filter(item => item !== undefined).join(' '),
            ];
          }
          else {
            value.value = [
              [
                (value_.value['auto-flow'] !== undefined ? value_.value['auto-flow'] : value_.value['autoFlow']),
                autoRows,
                '/',
                templateColumns
              ].filter(item => item !== undefined).join(' '),
            ];
          }

          break;

        case 'grid-area':
          value.value = [
            [
              (value_.value['row-start'] !== undefined ? value_.value['row-start'] : value_.value['rowStart']) || 0,
              '/',
              (value_.value['column-start'] !== undefined ? value_.value['column-start'] : value_.value['columnStart']) || 0,
              '/',
              (value_.value['row-end'] !== undefined ? value_.value['row-end'] : value_.value['rowEnd']) || 0,
              '/',
              (value_.value['column-end'] !== undefined ? value_.value['column-end'] : value_.value['columnEnd']) || 0,
            ].filter(item => item !== undefined).join(' '),
          ];

          break;

        case 'grid-column':
        case 'grid-row':
          value.value = [
            [
              value_.value['end'] || 0,
              '/',
              value_.value['start'] || 0
            ].filter(item => item !== undefined).join(' '),
          ];

          break;

        case 'grid-template':
          templateRows = valueResolve('grid-template-rows', value_.value['rows'], amauiStyle).value[0];
          templateRows = templateRows !== undefined ? templateRows : value_.value['rows'];

          templateColumns = valueResolve('grid-template-columns', value_.value['columns'], amauiStyle).value[0];
          templateColumns = templateColumns !== undefined ? templateColumns : value_.value['columns'];

          value.value = [
            [
              value_.value['areas'],
              templateRows,
              '/',
              templateColumns
            ].filter(item => item !== undefined).join(' '),
          ];

          break;

        case 'list-style':
          value.value = [
            [
              value_.value['type'],
              value_.value['image'],
              value_.value['position']
            ].filter(item => item !== undefined).join(' '),
          ];

          break;

        case 'mask':
          value.value = [
            [
              value_.value['image'],
              value_.value['mode'],
              value_.value['repeat'],
              value_.value['position'],
              value_.value['clip'],
              value_.value['origin'],
              value_.value['size'],
              value_.value['composite']
            ].filter(item => item !== undefined).join(' '),
          ];

          break;

        case 'offset':
          let anchor = valueResolve('offset-anchor', value_.value['anchor'], amauiStyle).value[0];
          anchor = anchor !== undefined ? anchor : value_.value['anchor'];

          let distance = valueResolve('offset-distance', value_.value['distance'], amauiStyle).value[0];
          distance = distance !== undefined ? distance : value_.value['distance'];

          let rotate = valueResolve('offset-rotate', value_.value['rotate'], amauiStyle).value[0];
          rotate = rotate !== undefined ? rotate : value_.value['rotate'];

          position = valueResolve('offset-position', value_.value['position'], amauiStyle).value[0];
          position = position !== undefined ? position : value_.value['position'];

          value.value = [
            [
              value_.value['path'],
              distance,
              rotate,
              '/',
              position,
              anchor
            ].filter(item => item !== undefined).join(' '),
          ];

          break;

        case 'place-items':
        case 'place-self':
        case 'place-content':
          value.value = [
            [
              value_.value['align'],
              value_.value['justify']
            ].filter(item => item !== undefined).join(' '),
          ];

          break;

        case 'text-decoration':
          let thickness = valueResolve('text-decoration-thickness', value_.value['thickness'], amauiStyle).value[0];
          thickness = thickness !== undefined ? thickness : value_.value['thickness'];

          value.value = [
            [
              value_.value['line'],
              value_.value['style'],
              value_.value['color'],
              thickness
            ].filter(item => item !== undefined).join(' '),
          ];

          break;

        case 'text-emphasis':
          value.value = [
            [
              value_.value['style'],
              value_.value['color']
            ].filter(item => item !== undefined).join(' '),
          ];

          break;

        case 'transition':
          duration = valueResolve('transition-duration', value_.value['duration'], amauiStyle).value[0];
          duration = duration !== undefined ? duration : value_.value['duration'];

          delay = valueResolve('transition-delay', value_.value['delay'], amauiStyle).value[0] || value_.value['delay'];
          delay = delay !== undefined ? delay : value_.value['delay'];

          easingFunction = value_.value['easing-function'] || value_.value['easingFunction'];
          easingFunction = easingFunction !== undefined ? easingFunction : value_.value['easingFunction'];

          value.value = [
            [
              value_.value['name'],
              duration,
              easingFunction,
              delay
            ].filter(item => item !== undefined).join(' '),
          ];

          break;

        default:
          break;
      }
    }

    // Add value to AmauiCache for this property and value_
    AmauiCache.add(value, value_, amauiStyle?.id);

    return value;
  };

  // Add method to subscriptions
  if (amauiStyle) {
    amauiStyle.subscriptions.rule.value.subscribe(method);
  }

  const remove = () => {
    // Remove method from subscriptions
    if (amauiStyle) {
      amauiStyle.subscriptions.rule.value.unsubscribe(method);
    }
  };

  const response = {
    methods: {
      method,
    },
    remove,
  };

  return response;
}

export default valueObject;
