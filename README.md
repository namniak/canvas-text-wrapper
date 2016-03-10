# canvas-text-wrapper


## Syntax
```javascript
CanvasTextWrapper(HTMLCanvasElement, String [, options]);
```


__Options:__


```font:``` (String) - text style that includes font size (in px), font weight, font family, etc. Similar to CSS font
 shorthand property
 
 
```lineHeight:``` (String or Number) - Number means 'n' times font size where 1 is equivalent to '100%'. Also the property can be set in '%' or 'px'.


```textAlign:``` (String)- horizontal alignment of each line
   * 'left'
   * 'center'
   * 'right'


```verticalAlign```: (String)- vertical alignment for the whole text block
   * 'top'
   * 'middle'
   * 'bottom'


```paddingX```: (Number) - horizontal padding (in px) that is equally set on left and right


```paddingY```: (Number) - vertical padding (in px) that is equally set on top and bottom


```fitParent```: (Boolean) - fit canvas' container size instead of its own size


```lineBreak```: (String) - text split rule
   * 'auto' - text goes to the next line on a whole word when there's no more room
   * 'word' - each next word is placed on a new line


```sizeToFill```: (Boolean) - ignore given font size and line height and resize text to fill its padded container


```strokeText```: (Boolean) - allow text outline based on canvas context configuration


```justifyLines```: (Boolean) - all lines match the same width with flexed spaces between words


```allowNewLine```: (Boolean) - the text breaks on new line character '\n'. Note it doesn't support multiple new lines so '\n\n\n' will be the same as having a single '\n'.


```renderHDPI```: (Boolean) - text is rendered based on device pixel ratio


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
        allowNewLine: true,
        justifyLines: false,
        renderHDPI: true
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
