import AmauiSubscription from '@amaui/subscription';

import * as AmauiStyle from '../../../src';

const subs = {
  background: new AmauiSubscription('beige'),
  media: new AmauiSubscription('yellow'),
  var: new AmauiSubscription({
    width: 100,

    'max-width': 100,

    // Simple
    background: '#faa',

    margin: '0 14px 4px 40px',

    // rtl
    marginLeft: 41,
    float: 'left',

    // sort
    paddingLeft: 41,
    padding: 40,

    // prefixes
    transition: 'all .4s ease',
    maskOrigin: 'inherit',
    maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
    maskPosition: '40% 74%',

    // animation
    animation: '$a .4s ease',
  }),
};

// All the methods used
const amauiStyle = new AmauiStyle.AmauiStyle();

amauiStyle.plugins.add = [
  AmauiStyle.unit,
  AmauiStyle.prefix,
  AmauiStyle.valueObject,
  AmauiStyle.rtl,
  AmauiStyle.sort
];

const a = {
  '@keyframes a': {
    '0%': {
      color: 'white',
    },
    '40%': {
      color: 'yellow',
    },
  },

  a: {
    width: 100,

    'max-width': 100,

    // Simple
    background: '#faa',

    margin: '0 14px 4px 40px',

    // rtl
    marginLeft: 41,
    float: 'left',

    // sort
    paddingLeft: 41,
    padding: 40,

    // prefixes
    position: 'sticky',
    transition: 'all .4s ease',
    maskOrigin: 'inherit',
    maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
    maskPosition: '40% 74%',

    // animation
    animation: '$a .4s ease',
  },

  a1: {
    width: 100,

    'max-width': 100,

    // Simple
    background: '#faa',

    margin: '0 14px 4px 40px',

    // rtl
    marginLeft: 41,
    float: 'left',

    // sort
    paddingLeft: 41,
    padding: 40,

    // prefixes
    transition: 'all .4s ease',
    maskOrigin: 'inherit',
    maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
    maskPosition: '40% 74%',

    // animation
    animation: '$a .4s ease',
  },

  a2: {
    color: 'yellow',

    '& .a19': {
      color: 'white',

      '& > a': {
        color: 'yellow',

        '&:hover': {
          color: 'orange',

          // rtl
          marginLeft: 40,
          float: 'left',

          // sort
          padding: 40,
          paddingLeft: 41,

          // prefixes
          transition: 'all .4s ease',
          maskOrigin: 'margin-box',
          maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
          maskPosition: '40% 74%',
        }

      }

    },

  },

  a3: {

    '& $a1': {

      '& > a': {

        '&:hover': {
          '@options': {
            prefix: false,
            sort: false,
            rtl: false,
          },

          color: 'orange',

          // rtl
          marginLeft: 40,
          float: 'left',

          // sort
          paddingLeft: 41,
          padding: 40,

          // prefixes
          transition: 'all .4s ease',
          maskOrigin: 'margin-box',
          maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
          maskPosition: '40% 74%',
        }

      }

    },

    // Multiple refs
    '& $a1 $a2$a7': {
      color: 'yellow'
    },

  },

  a4: {
    // Function
    background: props => props.a === 1 ? 'yellow' : 'orange',
  },

  a5: {
    // AmauiSubscription
    background: subs.background,
  },
};

// Reset
css({}, {
  reset: true,
  amaui_style: { value: amauiStyle },
  css: {
    file: {
      name: 'reset',
    },
    folders: [
      { url: 'test/folders/css' }
    ],
  },
  html: {
    files: [
      { url: 'test/folders/html/index.html' }
    ]
  },
  log: false
});

// Style
css(a, {
  amaui_style: { value: amauiStyle },
  css: {
    folders: [
      { url: 'test/folders/css' }
    ]
  },
  html: {
    files: [
      { url: 'test/folders/html/index.html' }
    ],
    addNames: true
  },
  rule: {
    prefix: true,
  },
  log: false
});
