CanvasTextWrapper
=================

##Syntax
```
new CanvasTextWrapper(HTMLCanvasElement, String [, options]);
```

```options``` - is a JavaScript object with the following available properties and values:

- ```font: String``` - text style that includes font size, family, similar to CSS font shorthand property
- ```textAlign: "left" | "center" | "right"``` - horizontal alignment that applies for each line
- ```verticalAlign: "top" | "middle" | "bottom"``` - vertical alignment that applies on a whole block of text
- ```paddingX: Number``` - horizontal padding in pixels set equally on both, left and right sides of the element
- ```paddingY: Number``` - vertical padding in pixels set equally on both, top and bottom sides of the element
- ```fitParent: Boolean``` - parameter that controls which element to fit where ```true``` means fit canvas parent's width instead of canvas own width
- ```lineBreak: "auto" | "word"``` - text split rule. When using ```"auto"```, text fills the element's width going to a new line on a whole word when no more space. If ```"word"``` is set as value, each next word will be placed on a new line.

NOTE: if a single word is too long to fit the width with specified font size, it will be broken into as many lines as required on any letter without specific word breaking rule.

##Defaults

The default options object which values will be used if a property is not specified or no object is passed:

``` 
   { 
       font:          "18px Arial, sans-serif",
       textAlign:     "left",
       verticalAlign: "top",
       paddingX:       0,
       paddingY:       0,
       fitParent:      false,
       lineBreak:     "auto" 
    } 
```

##Usage
Use standard canvas text drawing methods such as "fillStyle" and "globalCompositeOperation" when needed before using CanvasTextWrapper like so:
``` 
var canvas = document.createElement('canvas');
canvas.width = 300;
canvas.height = 250;
context = canvas.getContext("2d");
context.fillStyle = "rgb(255, 255, 255)";
context.fillRect(0, 0, canvas.width, canvas.height);

context.globalCompositeOperation = "destination-out";

new CanvasTextWrapper(canvas, "Hi there", {
      font:          "normal 40px Open Sans, sans-serif",
      textAlign:     "center",
      verticalAlign: "top",
      paddingY:      10,
      lineBreak:     "word",
});
```

##Examples
http://namniak.github.io/CanvasTextWrapper/
