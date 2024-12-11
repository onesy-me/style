/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';
import OnesySubscription from '@onesy/subscription';
import * as OnesyUtils from '@onesy/utils';

import { evaluate } from '../utils/js/test/utils';

import * as OnesyStyle from '../src';

group('@onesy/style/utils', () => {

  to('kebabCasetoCammelCase', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        '',
        'a',
        'meta',
        'background-',
        '-background',
        'background-color',
        'Background-color',
        'background-Color',
        'background color',
        4,
        true,
        undefined,
        new Array(),
      ];

      return values_.map(item => window.OnesyStyle.kebabCasetoCammelCase(item));
    });

    const values_ = [
      '',
      'a',
      'meta',
      'background-',
      '-background',
      'background-color',
      'Background-color',
      'background-Color',
      'background color',
      4,
      true,
      undefined,
      new Array(),
    ];

    const valueNode = values_.map((item: any) => OnesyStyle.kebabCasetoCammelCase(item));

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '',
      'a',
      'meta',
      'background-',
      'Background',
      'backgroundColor',
      'BackgroundColor',
      'backgroundColor',
      'background color',
      4,
      true,
      undefined,
      []
    ]));
  });

  to('cammelCaseToKebabCase', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        '',
        'a',
        'meta',
        'backgroundColor',
        'background-',
        '-background',
        'background-color',
        'Background-color',
        'background-Color',
        'background color',
        4,
        true,
        undefined,
        new Array(),
      ];

      return values_.map(item => window.OnesyStyle.cammelCaseToKebabCase(item));
    });

    const values_ = [
      '',
      'a',
      'meta',
      'backgroundColor',
      'background-',
      '-background',
      'background-color',
      'Background-color',
      'background-Color',
      'background color',
      4,
      true,
      undefined,
      new Array(),
    ];

    const valueNode = values_.map((item: any) => OnesyStyle.cammelCaseToKebabCase(item));

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '',
      'a',
      'meta',
      'background-color',
      'background-',
      '-background',
      'background-color',
      '-background-color',
      'background--color',
      'background color',
      4,
      true,
      undefined,
      []
    ]));
  });

  to('capitalizedCammelCase', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        '',
        'a',
        'meta',
        'backgroundColor',
        'background-',
        '-background',
        'background-color',
        'Background-color',
        'background-Color',
        'background color',
        4,
        true,
        undefined,
        new Array(),
      ];

      return values_.map(item => window.OnesyStyle.capitalizedCammelCase(item));
    });

    const values_ = [
      '',
      'a',
      'meta',
      'backgroundColor',
      'background-',
      '-background',
      'background-color',
      'Background-color',
      'background-Color',
      'background color',
      4,
      true,
      undefined,
      new Array(),
    ];

    const valueNode = values_.map((item: any) => OnesyStyle.capitalizedCammelCase(item));

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '',
      'A',
      'Meta',
      'BackgroundColor',
      'Background-',
      'Background',
      'BackgroundColor',
      'BackgroundColor',
      'BackgroundColor',
      'Background color',
      4,
      true,
      undefined,
      []
    ]));
  });

  to('isOnesySubscription', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        new window.OnesySubscription(),
        '',
        4,
        true,
        undefined,
        new Array()
      ];

      return values_.map(item => window.OnesyStyle.isOnesySubscription(item));
    });

    const values_ = [
      new OnesySubscription(),
      '',
      4,
      true,
      undefined,
      new Array()
    ];

    const valueNode = values_.map((item: any) => OnesyStyle.isOnesySubscription(item));

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      true,
      ...new Array(5).fill(false)
    ]));
  });

  to('getRefs', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        '',
        '& a',
        '& a .a14',
        '& $a1',
        '& $a1$a14',
        '& $ a1',
        'a',
        4,
        true,
        undefined,
        new Array()
      ];

      return values_.map(item => window.OnesyStyle.getRefs(item));
    });

    const values_ = [
      '',
      '& a',
      '& a .a14',
      '& $a1',
      '& $a1$a14',
      '& $ a1',
      'a',
      4,
      true,
      undefined,
      new Array()
    ];

    const valueNode = values_.map((item: any) => OnesyStyle.getRefs(item));

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      ...new Array(3).fill([]),
      ['a1'],
      ['a1', 'a14'],
      ...new Array(6).fill([])
    ]));
  });

  to('valueResolve', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        ['width', '14px'],
        ['width', 14],
        ['background', ['#faa', 'url("a.jpg")', 'no-repeat', 'right', 'top']],
        ['background', [
          ['url("a.jpg")', 'no-repeat', 'right', 'top'],
          ['url("ad.jpg")', 'no-repeat', 'right', 'top'],
          ['url("ad.jpg")', 'no-repeat', 'right', 'top']
        ]],
        ['background', [
          { image: 'url("a.jpg")', repeat: 'no-repeat', position: 'center right' },
          { image: 'url("a.jpg")', repeat: 'repeat-y', position: 'center center' },
          { image: 'url("ad.jpg")', repeat: 'repeat-y', position: 'center' },
        ]],
        ['background', {
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
        }],
        ['background', {
          // Multi version value
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
        }],
        ['background', {
          color: 'orange',
          image: 'url("a.jpg")',
          repeat: 'repeat-y',
          position: 'center center',
        }],
        ['background', props => props.a === 1 ? 'yellow' : 'orange'],
        ['background', new window.OnesySubscription('yellow')],

        [''],
        [4],
        [true],
        [undefined],
        [new Array()]
      ];

      const onesyStyle = new window.OnesyStyle.OnesyStyle();

      onesyStyle.plugins.add = [window.OnesyStyle.unit, window.OnesyStyle.valueObject];

      return values_.map(item => {
        const value = window.OnesyStyle.valueResolve(...item, onesyStyle).value;

        if (
          window.OnesyUtils.is('function', value[0]) ||
          window.OnesyStyle.isOnesySubscription(value[0])
        ) return true;

        return value;
      });
    });

    const values_ = [
      ['width', '14px'],
      ['width', 14],
      ['background', ['#faa', 'url("a.jpg")', 'no-repeat', 'right', 'top']],
      ['background', [
        ['url("a.jpg")', 'no-repeat', 'right', 'top'],
        ['url("ad.jpg")', 'no-repeat', 'right', 'top'],
        ['url("ad.jpg")', 'no-repeat', 'right', 'top']
      ]],
      ['background', [
        { image: 'url("a.jpg")', repeat: 'no-repeat', position: 'center right' },
        { image: 'url("a.jpg")', repeat: 'repeat-y', position: 'center center' },
        { image: 'url("ad.jpg")', repeat: 'repeat-y', position: 'center' },
      ]],
      ['background', {
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
      }],
      ['background', {
        // Multi version value
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
      }],
      ['background', {
        color: 'orange',
        image: 'url("a.jpg")',
        repeat: 'repeat-y',
        position: 'center center',
      }],
      ['background', props => props.a === 1 ? 'yellow' : 'orange'],
      ['background', new OnesySubscription('yellow')],

      [''],
      [4],
      [true],
      [undefined],
      [new Array()]
    ];

    const onesyStyle = new OnesyStyle.OnesyStyle();

    onesyStyle.plugins.add = [OnesyStyle.unit, OnesyStyle.valueObject];

    const valueNode = values_.map((item: [any, any]) => {
      const value = OnesyStyle.valueResolve(...item, onesyStyle).value;

      if (
        OnesyUtils.is('function', value[0]) ||
        OnesyStyle.isOnesySubscription(value[0])
      ) return true;

      return value;
    });

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql(
      [
        ["14px"],
        ["14px"],
        ["#faa url(\"a.jpg\") no-repeat right top"],
        ["url(\"a.jpg\") no-repeat right top, url(\"ad.jpg\") no-repeat right top, url(\"ad.jpg\") no-repeat right top"],
        ["url(\"a.jpg\") no-repeat center right, url(\"a.jpg\") repeat-y center center, url(\"ad.jpg\") repeat-y center"],
        ["#faa", "#fff url(\"a.jpg\") no-repeat right top", "url(\"a.jpg\") no-repeat right top, url(\"a.jpg\") no-repeat right top, url(\"ad.jpg\") no-repeat right top", "#faa"],
        ["#faa", "#fff url(\"a.jpg\") no-repeat right top", "url(\"a.jpg\") no-repeat right top, url(\"a.jpg\") no-repeat right top, url(\"ad.jpg\") no-repeat right top", "url(\"a.jpg\") no-repeat right top, url(\"a1.jpg\") no-repeat right top, url(\"ad.jpg\") no-repeat right top"],
        ["orange url(\"a.jpg\") repeat-y center center"],
        ...new Array(2).fill(true),
        ...new Array(5).fill([]),
      ]));
  });

  to('dynamic', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        () => 'a',
        new window.OnesySubscription(),
        { a: () => 'a' },
        { a: new window.OnesySubscription() },
        { a: 'a' },
        { a: new Array() },
        '',
        4,
        true,
        undefined,
        new Array()
      ];

      return values_.map(item => window.OnesyStyle.dynamic(item));
    });

    const values_ = [
      () => 'a',
      new OnesySubscription(),
      { a: () => 'a' },
      { a: new OnesySubscription() },
      { a: 'a' },
      { a: new Array() },
      '',
      4,
      true,
      undefined,
      new Array()
    ];

    const valueNode = values_.map((item: any) => OnesyStyle.dynamic(item));

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      ...new Array(4).fill(true),
      ...new Array(7).fill(false)
    ]));
  });

  to('makeName', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const makeNameMethod = window.OnesyStyle.makeName();

      const values_ = [];

      while (values_.length < 140) values_.push(makeNameMethod.next().value);

      return values_;
    });

    const makeNameMethod = OnesyStyle.makeName();

    const values_ = [];

    while (values_.length < 140) values_.push(makeNameMethod.next().value);

    const valueNode = values_;

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'aa', 'ab', 'ac', 'ad', 'ae', 'af', 'ag', 'ah', 'ai', 'aj', 'ak', 'al', 'am', 'an', 'ao', 'ap', 'aq', 'ar', 'as', 'at', 'au', 'av', 'aw', 'ax', 'ay', 'az', 'ba', 'bb', 'bc', 'bd', 'be', 'bf', 'bg', 'bh', 'bi', 'bj', 'bk', 'bl', 'bm', 'bn', 'bo', 'bp', 'bq', 'br', 'bs', 'bt', 'bu', 'bv', 'bw', 'bx', 'by', 'bz', 'ca', 'cb', 'cc', 'cd', 'ce', 'cf', 'cg', 'ch', 'ci', 'cj', 'ck', 'cl', 'cm', 'cn', 'co', 'cp', 'cq', 'cr', 'cs', 'ct', 'cu', 'cv', 'cw', 'cx', 'cy', 'cz', 'da', 'db', 'dc', 'dd', 'de', 'df', 'dg', 'dh', 'di', 'dj', 'dk', 'dl', 'dm', 'dn', 'do', 'dp', 'dq', 'dr', 'ds', 'dt', 'du', 'dv', 'dw', 'dx', 'dy', 'dz', 'ea', 'eb', 'ec', 'ed', 'ee', 'ef', 'eg', 'eh', 'ei', 'ej', 'ek', 'el', 'em', 'en', 'eo', 'ep', 'eq', 'er', 'es', 'et', 'eu', 'ev', 'ew', 'ex', 'ey', 'ez', 'fa', 'fb', 'fc', 'fd', 'fe', 'ff', 'fg', 'fh', 'fi', 'fj'
    ]));
  });

  to('pxToRem', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        [1],
        [4],
        [14],
        [16],
        [64],
        [124],
        [1, 14],
        [4, 14],
        [14, 14],
        [16, 14],
        [64, 14],
        [124, 14],
      ];

      return values_.map(item => window.OnesyStyle.pxToRem(...item));
    });

    const values_ = [
      [1],
      [4],
      [14],
      [16],
      [64],
      [124],
      [1, 14],
      [4, 14],
      [14, 14],
      [16, 14],
      [64, 14],
      [124, 14],
    ];

    const valueNode = values_.map((item: [any, any?]) => OnesyStyle.pxToRem(...item));

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      0.0625,
      0.25,
      0.875,
      1,
      4,
      7.75,
      0.0714,
      0.2857,
      1,
      1.1429,
      4.5714,
      8.8571
    ]));
  });

  to('names', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        window.OnesyStyle.names({ classNames: { a: 'a-0', a1: 'a1-1' } }).className,
        window.OnesyStyle.names({ classes: { a: 'a-0 a14-4', a1: 'a1-1' } }).class,
      ];

      return values_;
    });

    const values_ = [
      OnesyStyle.names({ classNames: { a: 'a-0', a1: 'a1-1' } } as any).className,
      OnesyStyle.names({ classes: { a: 'a-0 a14-4', a1: 'a1-1' } } as any).class,
    ];

    const valueNode = values_;

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      "a-0 a1-1",
      "a-0 a14-4 a1-1"
    ]));
  });

});
