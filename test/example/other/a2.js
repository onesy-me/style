
const subs = {
   background: new AmauiSubscription('beige'),
   media: new AmauiSubscription('yellow'),
   var: new AmauiSubscription({
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
   }),
};

// All the methods used
// Add unit, value-object, rtl , sort
const amauiStyle = new AmauiStyle.AmauiStyle(document.body);

amauiStyle.plugins.add = [AmauiStyle.unit, AmauiStyle.prefix, AmauiStyle.valueObject, AmauiStyle.rtl, AmauiStyle.sort];

// amauiStyle.plugins.add = AmauiStyle.makeClassName;

const a = {
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
      backgroundColor: subs.background,
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

      body: {
         '@pure': true,
         margin: 4,
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

   a2: {
      color: 'yellow',

      '& $a': {
         color: 'yellow',

         '& > a': {

            '&:hover': {
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
      '& $a $a1$a7': {
         color: 'orange'
      },
   },

   ad: props => props.a === 1 ? {
      width: 100,
      background: 'yellow',

      '& $a': {
         color: 'yellow',

         '& > a': {

            '&:hover': {
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
      '& $a $a1$a7': {
         color: 'orange'
      },
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
};

const responses = {};

// Style
const style = AmauiStyle.style(a, { amaui_style: { value: amauiStyle } });

responses.style = style.add();

console.log('Style:', responses.style);

document.getElementsByTagName('div')[0].classList.add('ad-1', 'ad1-2');
