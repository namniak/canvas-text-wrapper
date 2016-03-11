var CanvasTextWrapper = require('../canvas-text-wrapper.js').CanvasTextWrapper;

var body = document.getElementsByTagName('body')[0];
body.style.margin = 0;

var canvas = document.createElement('canvas');
canvas.width = 600;
canvas.height = 600;
canvas.style.position = 'absolute';
canvas.style.left = '50%';
canvas.style.top = '50%';
canvas.style.border = '1px solid #212121';
canvas.style.transform = 'translateX(-50%) translateY(-50%)';

body.appendChild(canvas);

var ctx = canvas.getContext('2d');
var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
gradient.addColorStop('0.2', 'magenta');
gradient.addColorStop('0.5', 'blue');
gradient.addColorStop('0.7', 'purple');
ctx.fillStyle = gradient;

var opts = {
  sizeToFill: true,
  textAlign: 'center',
  verticalAlign: 'middle',
  paddingX: 20
};

CanvasTextWrapper(canvas, 'What an awesome library!', opts);