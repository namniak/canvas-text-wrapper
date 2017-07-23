# canvas-text-wrapper


## Syntax
```javascript
CanvasTextWrapper(HTMLCanvasElement, String [, options]);
```

## Options

| Option  | Value | Description |
| ------------- | ------------- | ------------- |
| **font**  | *String*  | Text style that includes font size (in px), font weight, font family, etc.  |
| **lineHeight**  | *String* or *Number* | Number - 'n' times font size where 1 is equivalent to '100%'. Also the property can be set in '%' or 'px'. |
| **textAlign**  | `"left"` `"center"` `"right"` | Horizontal alignment of each line. |
| **verticalAlign** | `"top"`  `"middle"` `"bottom"` | Vertical alignment of the whole text block. |
| **paddingX**  | *Number* | Horizontal padding (in px) that is equally set on left and right sides. |
| **paddingY**  | *Number* | Vertical padding (in px) that is equally set on top and bottoms. |
| **fitParent**  | *Boolean* | Fit canvas' container size instead of its own size. |
| **lineBreak**  | `"auto"` `"word"` |  `"auto"` - text goes to the next line on a whole word when there's no room  `"word"` - each next word is placed on a new line |
| **sizeToFill**  | *Boolean* |  Ignore given font size and line height and resize text to fill its padded container. |
| **maxFontSizeToFill**  | *Number* |  If above option is `true` text won't be bigger than set. |
| **strokeText**  | *Boolean* |  Allow text outline based on canvas context configuration. |
| **justifyLines**  | *Boolean* |  All lines will try to match the same width with flexed spaces between the words. |
| **allowNewLine**  | *Boolean* |  Text breaks on a new line character "\n". Supports multiple consecutive new lines. |
| **renderHDPI**  | *Boolean* |  Text is rendered based on device pixel ratio. |
| **textDecoration**  | `"none"`  `"underline"` |  Text is underlined according to `context.strokeStyle` and `context.lineWidth` |

NOTE: if a single word is too long to fit the width with specified font size, it will break on any letter unless ```sizeToFill``` option is enabled.


## Default options
```javascript
   { 
        font: '18px Arial, sans-serif',
        lineHeight: 1,
        textAlign: 'left',
        verticalAlign: 'top',
        paddingX: 0,
        paddingY: 0,
        fitParent: false,
        lineBreak: 'auto',
        strokeText: false
        sizeToFill: false,
        maxFontSizeToFill: false,
        allowNewLine: true,
        justifyLines: false,
        renderHDPI: true,
        textDecoration: 'none'
    }
```


## Usage
Configure context properties such as ```fillStyle```, ```lineWidth```, ```strokeStyle``` etc. before passing it to CanvasTextWrapper like so:

```javascript
var CanvasTextWrapper = require('canvas-text-wrapper').CanvasTextWrapper;

var canvas = document.getElementById('#canvasText');
canvas.width = 200;
canvas.height = 200;
context = canvas.getContext('2d');
context.lineWidth = 2;
context.strokeStyle = '#ff0000';

CanvasTextWrapper(canvas, 'Hello', {strokeText: true});
```


## Test
Run ```npm t```
NOTE: Test requires [beefy](http://didact.us/beefy/) to be installed globally 


## Examples
[see here](http://namniak.github.io/canvas-text-wrapper/)


## Install
```sh
npm i canvas-text-wrapper --save
bower install canvas-text-wrapper
```
