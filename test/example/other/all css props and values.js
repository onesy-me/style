// all css props and values

const a = {
   "accent-color": "#aaa",
   "additive-symbols": "4 '0'",
   "align-content": "center",
   "align-items": "center",
   "align-self": "center",
   "all": "initial",

   // shorthand
   // multiple
   /*
      @keyframes duration | easing-function | delay | iteration-count | direction | fill-mode | play-state | name
      @keyframes name | duration | easing-function | delay
      @keyframes name | duration
   */
   "animation": "4s ease-in 1s 2 reverse both paused slidein",
   // multiple
   "animation-delay": "4s",
   // multiple
   "animation-direction": "reverse",
   // multiple
   "animation-duration": "4s",
   // multiple
   "animation-fill-mode": "both",
   // multiple
   "animation-iteration-count": "4",
   // multiple
   "animation-name": "a",
   // multiple
   "animation-play-state": "paused",
   // multiple
   "animation-timing-function": "ease-in",

   "appearance": "inherit",
   "ascent-override": "115%",
   "aspect-ratio": "1",

   // multiple
   // url(filters.svg#filter) blur(4px) saturate(150%)
   "backdrop-filter": "blur(4px)",

   "backface-visibility": "visible",

   // shorthand
   // multiple
   /*
      <background-color>  orange
      <bg-image> and <repeat-style>  url("test.jpg") repeat-y
      <box> and <background-color>  border-box orange
      image, centered and scaled  no-repeat center/80% url("../img/image.png")
      multiple  url(firefox.png), url(bubbles.png), linear-gradient(to right, rgba(30, 75, 115, 1), rgba(255, 255, 255, 0));
   */
   "background": "url(firefox.png), url(bubbles.png), linear-gradient(to right, rgba(30, 75, 115, 1)",
   // multiple
   "background-attachment": "inherit",
   // multiple
   "background-blend-mode": "multiple",
   // multiple
   "background-clip": "padding-box",
   // multiple
   "background-color": "orange",
   // multiple
   "background-image": "url('a.jpeg')",
   // multiple
   "background-origin": "padding-box",
   // part-shorthand
   // multiple
   /*
      top
      right 4em bottom 10px
      top right 10px
      shorthand  74% 24%
      shorthand  14px 14px
      multiple  14px 14px, center
   */
   "background-position": "40%",
   // multiple
   /*
      left
      24%
      14px
      left 14px
      multiple  14px, center
   */
   "background-position-x": "left",
   // multiple
   /*
      left
      24%
      14px
      top 14px
      multiple  14px, center
   */
   "background-position-y": "top",

   // part-shorthand
   // multiple
   /*
      repeat-x
      shorthand  repeat no-repeat
   */
   "background-repeat": "repeat",
   // part-shorthand
   // multiple
   /*
      cover
      40%
      shorthand (width, height)  74% auto
      multiple  40%, auto, cover
   */
   "background-size": "cover",

   "block-size": "min-content",

   // shorthand
   // multiple
   /*
      width | style | color  14px dashed orange
   */
   "border": "",
   // shorthand
   // color | style | width  medium dashed orange
   "border-block": "medium dashed orange",
   "border-block-color": "orange",
   "border-block-style": "",
   "border-block-width": "",
   // shorthand
   // color | style | width  medium dashed orange
   "border-block-end": "medium dashed orange",
   "border-block-end-color": "",
   "border-block-end-style": "",
   "border-block-end-width": "",
   // shorthand
   // color | style | width  medium dashed orange
   "border-block-start": "medium dashed orange",
   "border-block-start-color": "",
   "border-block-start-style": "",
   "border-block-start-width": "",
   // shorthand
   // color | style | width  medium dashed orange
   "border-bottom": "medium dashed orange",
   "border-bottom-color": "",
   "border-bottom-style": "",
   "border-bottom-width": "",
   // part-shorthand
   // horizontal vertical 14% 40px
   "border-bottom-left-radius": "",
   // part-shorthand
   // horizontal vertical 14% 40px
   "border-bottom-right-radius": "",
   "border-collapse": "separate",
   // shorthand
   /*
      top
      top and bottom | left and right
      top | left and right | bottom
      top | right | bottom | left
   */
   "border-color": "",
   // part-shorthand
   // horizontal vertical 14% 40px
   "border-end-end-radius": "",
   // part-shorthand
   // horizontal vertical 14% 40px
   "border-end-start-radius": "",
   // shorthand
   /*
      src | slice
      src | slice | repeat
      src | slice | width
      src | slice | width | outset | repeat
   */
   "border-image": "",
   // part-shorthand
   /*
      vertical | horizontal
      top | horizontal | bottom
      top | right | bottom | left
   */
   "border-image-outset": "",
   "border-image-repeat": "",
   "border-image-slice": "",
   "border-image-source": "",
   "border-image-width": "",
   "border-inline": "",
   "border-inline-color": "",
   // shorthand
   // width style color
   "border-inline-end": "",
   "border-inline-end-color": "",
   "border-inline-end-style": "",
   "border-inline-end-width": "",
   // shorthand
   // width style color
   "border-inline-start": "",
   "border-inline-start-color": "",
   "border-inline-start-style": "",
   "border-inline-start-width": "",
   "border-inline-style": "",
   "border-inline-width": "",
   // shorthand
   // width style color
   "border-left": "",
   "border-left-color": "",
   "border-left-style": "",
   "border-left-width": "",
   // shorthand
   // 14px or 14px 14px or 14px 14px 14px or 14px 14px 14px 14px or 14px 14px / 14px 14px etc.
   "border-radius": "",
   // shorthand
   // width style color
   "border-right": "",
   "border-right-color": "",
   "border-right-style": "",
   "border-right-width": "",
   "border-spacing": "",
   "border-start-end-radius": "",
   "border-start-start-radius": "",
   // shorthand
   // top and bottom | left and right or top | left and rigth | bottom or etc.
   "border-style": "",
   // shorthand
   // width style color
   "border-top": "",
   "border-top-color": "",
   "border-top-left-radius": "",
   "border-top-right-radius": "",
   "border-top-style": "",
   "border-top-width": "",
   // shorthand
   // top and bottom | left and right or top | left and rigth | bottom or etc.
   "border-width": "",

   "bottom": "",
   "box-shadow": "",
   "box-sizing": "",
   "break-after": "",
   "break-before": "",
   "break-inside": "",
   "buffered-rendering": "",

   "caption-side": "",
   "caret-color": "",
   "clear": "",
   "clip": "",
   "clip-path": "",
   "clip-rule": "",
   "color": "",
   "color-interpolation": "",
   "color-interpolation-filters": "",
   "color-rendering": "",
   "color-scheme": "",

   "column-count": "",
   "column-fill": "",
   "column-gap": "",
   // shorthand
   // top and bottom | left and right or top | left and rigth | bottom or etc.
   "column-rule": "",
   "column-rule-color": "",
   "column-rule-style": "",
   "column-rule-width": "",
   "column-span": "",
   "column-width": "",
   // shorthand
   // width count
   "columns": "",

   "contain": "",
   "contain-intrinsic-block-size": "",
   "contain-intrinsic-height": "",
   "contain-intrinsic-inline-size": "",
   "contain-intrinsic-size": "",
   "contain-intrinsic-width": "",
   "content": "",
   "content-visibility": "",
   "counter-increment": "",
   "counter-reset": "",
   "counter-set": "",
   // multiple
   "cursor": "",

   "descent-override": "",
   "direction": "",
   "display": "",
   "dominant-baseline": "",

   "empty-cells": "",

   "fallback": "",
   "fill": "",
   "fill-opacity": "",
   "fill-rule": "",
   "filter": "",
   // shorthand
   // flex-grow | flex-basis or flex-grow | flex-shrink or flex-grow | flex-shrink | flex-basis etc.
   "flex": "",
   "flex-basis": "",
   "flex-direction": "",
   // shorthand
   // flex-direction flex-wrap
   "flex-flow": "",
   "flex-grow": "",
   "flex-shrink": "",
   "flex-wrap": "",
   "float": "",
   "flood-color": "",
   "flood-opacity": "",

   // shorthand
   // multiple
   // style variant weight size line-height family
   "font": "",
   "font-display": "",
   // multiple
   "font-family": "",
   // multiple
   "font-feature-settings": "",
   "font-kerning": "",
   "font-optical-sizing": "",
   "font-size": "",
   "font-stretch": "",
   "font-style": "",
   "font-synthesis": "",
   "font-synthesis-small-caps": "",
   "font-synthesis-style": "",
   "font-synthesis-weight": "",
   "font-variant": "",
   "font-variant-caps": "",
   "font-variant-east-asian": "",
   "font-variant-ligatures": "",
   "font-variant-numeric": "",
   "font-variation-settings": "",
   "font-weight": "",

   "forced-color-adjust": "",

   // shorthand
   // row-gap or row-gap column-gap  etc.
   "gap": "",

   // shorthand
   // variations
   "grid": "",
   // shorthand
   // variations
   "grid-area": "",
   "grid-auto-columns": "",
   "grid-auto-flow": "",
   "grid-auto-rows": "",
   // shorthand
   // variations
   "grid-column": "",
   "grid-column-end": "",
   "grid-column-gap": "",
   "grid-column-start": "",
   "grid-gap": "",
   // shorthand
   // variations
   "grid-row": "",
   "grid-row-end": "",
   "grid-row-gap": "",
   "grid-row-start": "",
   // shorthand
   // variations
   "grid-template": "",
   "grid-template-areas": "",
   "grid-template-columns": "",
   "grid-template-rows": "",

   "height": "",
   "hyphens": "",

   "image-orientation": "",
   "image-rendering": "",
   "inherits": "",
   "initial-value": "",
   "inline-size": "",

   "inset": "",
   "inset-block": "",
   "inset-block-end": "",
   "inset-block-start": "",
   "inset-inline": "",
   "inset-inline-end": "",
   "inset-inline-start": "",

   "isolation": "",

   "justify-content": "",
   "justify-items": "",
   "justify-self": "",

   "left": "",
   "letter-spacing": "",
   "lighting-color": "",
   "line-break": "",
   "line-gap-override": "",
   "line-height": "",
   // shorthand
   // position or type | position or type | image | position
   "list-style": "",
   "list-style-image": "",
   "list-style-position": "",
   "list-style-type": "",

   // shorthand
   // top and bottom | left and right or top | left and rigth | bottom or etc.
   "margin": "",
   "margin-block": "",
   "margin-block-end": "",
   "margin-block-start": "",
   "margin-bottom": "",
   "margin-inline": "",
   "margin-inline-end": "",
   "margin-inline-start": "",
   "margin-left": "",
   "margin-right": "",
   "margin-top": "",

   "marker": "",
   "marker-end": "",
   "marker-mid": "",
   "marker-start": "",
   // shorthand
   // multiple
   // image mode repeat position clip origin size composite
   "mask": "",
   "mask-type": "",
   "max-block-size": "",
   "max-height": "",
   "max-inline-size": "",
   "max-width": "",
   "max-zoom": "",
   "min-block-size": "",
   "min-height": "",
   "min-inline-size": "",
   "min-width": "",
   "min-zoom": "",
   "mix-blend-mode": "",

   "negative": "",

   "object-fit": "",
   "object-position": "",

   // shorthand
   // position path distance anchor rotate
   "offset": "",
   "offset-distance": "",
   "offset-path": "",
   "offset-rotate": "",

   "opacity": "",
   "order": "",
   "orientation": "",
   "orphans": "",

   // shorthand
   // color style width
   "outline": "",
   "outline-color": "",
   "outline-offset": "",
   "outline-style": "",
   "outline-width": "",

   // shorthand
   // x y
   "overflow": "",
   "overflow-anchor": "",
   "overflow-clip-margin": "",
   "overflow-wrap": "",
   "overflow-x": "",
   "overflow-y": "",

   "overscroll-behavior": "",
   "overscroll-behavior-block": "",
   "overscroll-behavior-inline": "",
   "overscroll-behavior-x": "",
   "overscroll-behavior-y": "",

   "pad": "",

   // shorthand
   // top and bottom | left and right or top | left and rigth | bottom or etc.
   "padding": "",
   "padding-block": "",
   "padding-block-end": "",
   "padding-block-start": "",
   "padding-bottom": "",
   "padding-inline": "",
   "padding-inline-end": "",
   "padding-inline-start": "",
   "padding-left": "",
   "padding-right": "",
   "padding-top": "",

   "page": "",
   "page-break-after": "",
   "page-break-before": "",
   "page-break-inside": "",
   "page-orientation": "",
   "paint-order": "",
   "perspective": "",
   "perspective-origin": "",
   // shorthand
   // align-content justify-content
   "place-content": "",
   // shorthand
   // align-items justify-items
   "place-items": "",
   // shorthand
   // align-self justify-self
   "place-self": "",
   "pointer-events": "",
   "position": "",
   "prefix": "",

   "quotes": "",

   "range": "",
   "resize": "",
   "right": "",
   "row-gap": "",

   "scroll-behavior": "",
   // shorthand
   // top and bottom | left and right or top | left and rigth | bottom or etc.
   "scroll-margin": "",
   "scroll-margin-block": "",
   "scroll-margin-block-end": "",
   "scroll-margin-block-start": "",
   "scroll-margin-bottom": "",
   "scroll-margin-inline": "",
   "scroll-margin-inline-end": "",
   "scroll-margin-inline-start": "",
   "scroll-margin-left": "",
   "scroll-margin-right": "",
   "scroll-margin-top": "",
   // shorthand
   // top and bottom | left and right or top | left and rigth | bottom or etc.
   "scroll-padding": "",
   "scroll-padding-block": "",
   "scroll-padding-block-end": "",
   "scroll-padding-block-start": "",
   "scroll-padding-bottom": "",
   "scroll-padding-inline": "",
   "scroll-padding-inline-end": "",
   "scroll-padding-inline-start": "",
   "scroll-padding-left": "",
   "scroll-padding-right": "",
   "scroll-padding-top": "",
   "scroll-snap-align": "",
   "scroll-snap-stop": "",
   "scroll-snap-type": "",
   "scrollbar-gutter": "",

   "shape-image-threshold": "",
   "shape-margin": "",
   "shape-outside": "",
   "shape-rendering": "",
   "size": "",
   "size-adjust": "",
   "speak": "",
   "speak-as": "",
   "src": "",
   "stop-color": "",
   "stop-opacity": "",
   "stroke": "",
   "stroke-dasharray": "",
   "stroke-dashoffset": "",
   "stroke-linecap": "",
   "stroke-linejoin": "",
   "stroke-miterlimit": "",
   "stroke-opacity": "",
   "stroke-width": "",
   "suffix": "",
   "symbols": "",
   "syntax": "",
   "system": "",

   "tab-size": "",
   "table-layout": "",
   "text-align": "",
   "text-align-last": "",
   "text-anchor": "",
   "text-combine-upright": "",

   // shorthand
   // line style color thickness
   "text-decoration": "",
   "text-decoration-color": "",
   "text-decoration-line": "",
   "text-decoration-skip-ink": "",
   "text-decoration-style": "",
   "text-decoration-thickness": "",

   // shorthand
   // style color
   "text-emphasis": "",
   "text-emphasis-color": "",
   "text-emphasis-position": "",
   "text-emphasis-style": "",
   "text-indent": "",
   "text-orientation": "",
   "text-overflow": "",
   "text-rendering": "",
   // multiple
   "text-shadow": "",
   "text-size-adjust": "",
   "text-transform": "",
   "text-underline-offset": "",
   "text-underline-position": "",
   "touch-action": "",
   "top": "",

   "transform": "",
   "transform-box": "",
   "transform-origin": "",
   "transform-style": "",

   // shorthand
   // multiple
   // name | duration | easing function | delay
   "transition": "",
   // multiple
   "transition-delay": "",
   // multiple
   "transition-duration": "",
   // multiple
   "transition-property": "",
   // multiple
   "transition-timing-function": "",

   "unicode-bidi": "",
   "unicode-range": "",
   "user-select": "",

   "vector-effect": "",
   "vertical-align": "",
   "visibility": "",

   "white-space": "",
   "widows": "",
   "width": "",
   "will-change": "",
   "word-break": "",
   "word-spacing": "",
   "word-wrap": "",
   "writing-mode": "",

   "z-index": ""
};
