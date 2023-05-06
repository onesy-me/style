
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
// Add unit, valueObject, rtl , sort
const amauiStyle = new AmauiStyle.AmauiStyle(document.body);

amauiStyle.plugins.add = [AmauiStyle.unit, AmauiStyle.prefix, AmauiStyle.valueObject, AmauiStyle.rtl, AmauiStyle.sort];

// amauiStyle.plugins.add = AmauiStyle.makeClassName;

const responses = {};

const aa = {
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
               position: 'sticky',
               transition: 'all .4s ease',
               maskOrigin: 'margin-box',
               maskImage: 'linear-gradient(rgba(0, 0, 0, 1.0), transparent)',
               maskPosition: '40% 74%',
            }

         }

      },

   },

   a3: {

      '& $a': {
         color: 'yellow',

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

   a4: {
      // Function
      background: props => props.a === 1 ? 'yellow' : 'orange',
   },

   a5: {
      // AmauiSubscription
      background: subs.background,
   },
};

const atomic = AmauiStyle.style(aa, { mode: 'atomic', amaui_style: { value: amauiStyle } });

responses.atomic = atomic.add();

console.log('Atomic', responses.atomic);
