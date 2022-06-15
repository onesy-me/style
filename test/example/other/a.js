
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
      position: 'sticky',
      transition: 'all .4s ease',
      maskOrigin: 'inherit',
      maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
      maskPosition: '40% 74%',

      // animation
      animation: '$a .4s ease',
   }),
};

// All the methods used
// Add unit, value-object, rtl , sort
const amauiStyle = new AmauiStyle.AmauiStyle(document.body);

amauiStyle.plugins.add = [AmauiStyle.unit, AmauiStyle.prefix, AmauiStyle.valueObject, AmauiStyle.rtl, AmauiStyle.sort];

// amauiStyle.plugins.add = AmauiStyle.makeClassName;

const a = theme => ({
   '@keyframes a': {
      '0%': {
         color: 'white',
      },
      '40%': {
         color: 'yellow',
      },
   },

   body: {
      '@pure': true,
      margin: 40,
   },

   main: {
      '@p': true,
      margin: 40,
   },

   '@pure': {
      a: {
         margin: 4,
      },

      meta: {
         margin: 4,
      },
   },

   a: {
      width: 100,

      'max-width': 100,

      // Simple
      background: theme.palette.color.primary.main,

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

   // options at rule level
   a1: {
      '@options': {
         prefix: false,
         sort: false,
         rtl: false,
      },

      // Keyframes nested
      '@keyframes a1': {
         '0%': {
            color: 'lightgreen',
         },
         '40%': {
            color: 'orange',
         },
      },

      width: '100%',

      maxWidth: 100,

      margin: [0, 14, 4, 40],

      // Array of arrays
      background: ['#faa', 'url("a.jpg")', 'no-repeat', 'right', 'top'],

      animationName: '$a1',
      animationDuration: 1.4,

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
   },

   // with classNames
   a2: {
      '@classNames': ['ad', 'ad', 'ad1', 'ad4', true && 'a', false && 'b', 0, 14, '114', { 'c': false, d: true, e: { u: true } }],

      margin: [0, 14, '4em'],

      // Array of arrays
      background: [
         ['url("a.jpg")', 'no-repeat', 'right', 'top'],
         ['url("ad.jpg")', 'no-repeat', 'right', 'top'],
         ['url("ad.jpg")', 'no-repeat', 'right', 'top']
      ],

      // animation with non-existing keyframes
      animation: '$a14 .4s ease',
   },

   a3: {
      // Array of objects
      background: [
         { image: 'url("a.jpg")', repeat: 'no-repeat', position: 'center right' },
         { image: 'url("a.jpg")', repeat: 'repeat-y', position: 'center center' },
         { image: 'url("ad.jpg")', repeat: 'repeat-y', position: 'center' },
      ],

      // animationName with non-existing keyframes
      animationName: '$a114',
   },

   a4: {
      // Object
      background: {
         value: '#faa',
         // In order of specificity they will actually be used at
         fallbacks: [
            '#faa',
            ['#fff', 'url("a.jpg")', 'no-repeat', 'right', 'top'],
            [
               ['url("a.jpg")', 'no-repeat', 'right', 'top'],
               ['url("a.jpg")', 'no-repeat', 'right', 'top'],
               ['url("ad.jpg")', 'no-repeat', 'right', 'top']
            ]
         ]
      }
   },

   a5: {
      // Object
      background: {
         // Multi variant value
         value: [
            ['url("a.jpg")', 'no-repeat', 'right', 'top'],
            ['url("a1.jpg")', 'no-repeat', 'right', 'top'],
            ['url("ad.jpg")', 'no-repeat', 'right', 'top']
         ],
         // In order of specificity they will actually be used at
         fallbacks: [
            '#faa',
            ['#fff', 'url("a.jpg")', 'no-repeat', 'right', 'top'],
            [
               ['url("a.jpg")', 'no-repeat', 'right', 'top'],
               ['url("a.jpg")', 'no-repeat', 'right', 'top'],
               ['url("ad.jpg")', 'no-repeat', 'right', 'top']
            ]
         ]
      }
   },

   a6: {
      // Object with expanded props
      background: {
         color: 'orange',
         image: 'url("a.jpg")',
         repeat: 'repeat-y',
         position: 'center center',
      },
   },

   a7: {
      // Function
      background: props => props.a === 1 ? 'yellow' : 'orange',
   },

   a8: {
      // AmauiSubscription
      background: subs.background,
   },

   // Additionaly nested
   a9: {
      color: 'yellow',

      '& .a19': {
         color: 'white',

         '& > a': {
            color: 'yellow',

            '&:active': {
               color: 'orange',

               // rtl
               marginLeft: 40,
               float: 'left',

               // sort
               padding: 40,
               paddingLeft: 41,

               // prefixes
               position: 'sticky',
               transition: 'all .4s ease',
               maskOrigin: 'margin-box',
               maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
               maskPosition: '40% 74%',
            }

         }

      },

   },

   // Reference class name
   // and empty rules and options nested
   a10: {

      '& $a1': {

         '& > a': {

            '&:active': {
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
               position: 'sticky',
               transition: 'all .4s ease',
               maskOrigin: 'margin-box',
               maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
               maskPosition: '40% 74%',
            }

         }

      },

      // Multiple refs
      '& $a1 $a4$a7': {
         color: 'yellow'
      },

   },

   // Reference of non-existing refs
   // + reuse of a10 as it has the same hash
   a11: {

      '& $ad $a114': {
         color: 'white',
      },

   },

   // Reference multiple
   a12: {

      '& $a4& &': {
         color: 'white',
      },

   },

   // Empty rules
   // Ought not to be added as it's not dynamic, and it has empty rules
   a13: {

   },

   aa: `
      width: 100;
      maxWidth: 100%;
      background: orange;

      marginLeft: 41;
      float: left;
      paddingRight: 41;
      padding: 40px;
   `,

   ad: props => props.a === 1 ? {
      width: 100,

      'max-width': 100,

      // Simple
      background: '#faa',

      margin: '0 14px 4px 40px',

      // rtl
      marginLeft: 41,
      float: 'left',

      // sort
      paddingRight: 41,
      padding: 40,

      // prefixes
      position: 'sticky',
      transition: 'all .4s ease',
      maskOrigin: 'inherit',
      maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
      maskPosition: '40% 74%',

      // animation
      animation: '$a .4s ease',
   } : {
      width: 100,

      'max-width': 100,

      // Simple
      background: 'orange',

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

   ad1: subs.var,

   // @Media

   // Empty
   '@media only screen and (min-width: 1401px)': {

   },

   '@media only screen and (min-width: 1404px)': {
      $a: {
         color: 'beige',
      },

      $var: {
         color: 'yellow',
      },
   },

   '@media only screen and (max-width: 1414px)': {
      // element
      body: {
         background: 'beige',
      },

      $a: {
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

      // options at rule level
      $a1: {
         '@options': {
            prefix: false,
            sort: false,
            rtl: false,
         },

         // Keyframes nested
         '@keyframes a1': {
            '0%': {
               color: 'lightgreen',
            },
            '40%': {
               color: 'orange',
            },
         },

         width: '100%',

         maxWidth: 100,

         margin: [0, 14, 4, 40],

         // Array of arrays
         background: ['#faa', 'url("a.jpg")', 'no-repeat', 'right', 'top'],

         animationName: '$a1',
         animationDuration: 1.4,

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
      },

      $a7: {
         // Function
         background: props => props.a === 1 ? 'azure' : 'aliceblue',
      },

      $a8: {
         // AmauiSubscription
         background: subs.media,
      },

      // Additionaly nested
      $a9: {
         color: 'yellow',

         '& .a19': {
            color: 'white',

            '& > a': {
               color: 'yellow',

               '&:active': {
                  color: 'orange',

                  // rtl
                  marginLeft: 40,
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
               }

            }

         },

      },

      // Reference class name
      // and empty rules and with options nested
      $a10: {

         '& $a1': {

            '& > a': {

               '&:active': {
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
                  position: 'sticky',
                  transition: 'all .4s ease',
                  maskOrigin: 'margin-box',
                  maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
                  maskPosition: '40% 74%',
               }

            }

         },

         // Multiple refs
         '& $a1 $a4$a7': {
            color: 'yellow'
         },

      },

      // Reference of non-existing refs
      // + reuse of a10 as it has the same hash
      $a11: {

         '& $ad $a114': {
            color: 'white',
         },

      },

      // Reference multiple
      $a12: {

         '& $a4& &': {
            color: 'white',
         },

      },

      // Empty rules
      // Ought not to be added as it's not dynamic, and it has empty rules
      $a13: {

      },

      $ad: props => props.a === 1 ? {
         width: 100,

         'max-width': 100,

         // Simple
         background: '#faa',

         margin: '0 14px 4px 40px',

         // rtl
         marginLeft: 41,
         float: 'left',

         // sort
         paddingRight: 41,
         padding: 40,

         // prefixes
         position: 'sticky',
         transition: 'all .4s ease',
         maskOrigin: 'inherit',
         maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
         maskPosition: '40% 74%',

         // animation
         animation: '$a .4s ease',
      } : {
         width: 100,

         'max-width': 100,

         // Simple
         background: 'orange',

         margin: '0 14px 4px 40px',

         // rtl
         marginLeft: 41,
         float: 'left',

         // sort
         paddingLeft: 41,
         padding: 40,

         // prefixes
         transition: 'all .4s ease',
         maskComposite: 'inherit',

         // animation
         animation: '$a .4s ease',
      },

      $ad1: subs.var,

      // @media nested
      '@media print': {
         // element
         body: {
            background: 'beige',
         },

         $a: {
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

         // options at rule level
         $a1: {
            '@options': {
               prefix: false,
               sort: false,
               rtl: false,
            },

            // Keyframes nested
            '@keyframes a1': {
               '0%': {
                  color: 'lightgreen',
               },
               '40%': {
                  color: 'orange',
               },
            },

            width: '100%',

            maxWidth: 100,

            margin: [0, 14, 4, 40],

            // Array of arrays
            background: ['#faa', 'url("a.jpg")', 'no-repeat', 'right', 'top'],

            animationName: '$a1',
            animationDuration: 1.4,

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
         },

         $a7: {
            // Function
            background: props => props.a === 1 ? 'azure' : 'aliceblue',
         },

         $a8: {
            // AmauiSubscription
            background: subs.media,
         },

         // Additionaly nested
         $a9: {
            color: 'yellow',

            '& .a19': {
               color: 'white',

               '& > a': {
                  color: 'yellow',

                  '&:active': {
                     color: 'orange',

                     // rtl
                     marginLeft: 40,
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
                  }

               }

            },

         },

         // Reference class name
         // and empty rules and with options nested
         $a10: {

            '& $a1': {

               '& > a': {

                  '&:active': {
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
                     position: 'sticky',
                     transition: 'all .4s ease',
                     maskOrigin: 'margin-box',
                     maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
                     maskPosition: '40% 74%',
                  }

               }

            },

            // Multiple refs
            '& $a1 $a4$a7': {
               color: 'yellow'
            },

         },

         // Reference of non-existing refs
         // + reuse of a10 as it has the same hash
         $a11: {

            '& $ad $a114': {
               color: 'white',
            },

         },

         // Reference multiple
         $a12: {

            '& $a4& &': {
               color: 'white',
            },

         },

         // Empty rules
         // Ought not to be added as it's not dynamic, and it has empty rules
         $a13: {

         },

         $ad: props => props.a === 1 ? {
            width: 100,

            'max-width': 100,

            // Simple
            background: '#faa',

            margin: '0 14px 4px 40px',

            // rtl
            marginLeft: 41,
            float: 'left',

            // sort
            paddingRight: 41,
            padding: 40,

            // prefixes
            position: 'sticky',
            transition: 'all .4s ease',
            maskOrigin: 'inherit',
            maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
            maskPosition: '40% 74%',

            // animation
            animation: '$a .4s ease',
         } : {
            width: 100,

            'max-width': 100,

            // Simple
            background: 'orange',

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
            maskComposite: 'inherit',

            // animation
            animation: '$a .4s ease',
         },

         $ad1: subs.var,
      },

   },

   a40: {
      color: 'beige',
      padding: 41,

      '@media only screen and (min-width: 1404px)': {
         '&': {
            color: 'orange',
         },
      }
   }

});

const a1 = {
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
};

// Reset
const r = {
   body: {
      margin: 14,
   },
   main: {
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
   }
};

const responses = {};

// Inline
const i = {
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

   '@media only screen and (min-width: 1404px)': {
      body: {
         color: 'yellow',
      },
   },
};
const inline = AmauiStyle.inline(i, { amaui_style: { value: amauiStyle } });

console.log('Inline', inline);

// Reset
const reset = AmauiStyle.reset(r, { amaui_style: { value: amauiStyle } });

responses.reset = reset.add();

console.log('Reset', responses.reset);

// Pure
const p = {
   map: {
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
   }
};

const pure = AmauiStyle.pure(p, { amaui_style: { value: amauiStyle } });

responses.pure = pure.add();

console.log('Pure', responses.pure);

// Style
const style = AmauiStyle.style(a, { amaui_style: { value: amauiStyle } });

const styleA = AmauiStyle.style(a1, { amaui_style: { value: amauiStyle } });

responses.style = style.add();

window.document.getElementById('a').className = Object.keys(responses.style.classes).map(key => responses.style.classes[key]).join(' ');

console.log('Style:', responses.style);

responses.style1 = style.add();

console.log('Style:', responses.style1);

responses.styleA = styleA.add();

console.log('StyleA:', responses.styleA);

