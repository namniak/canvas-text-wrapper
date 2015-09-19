/*! CanvasTextWrapper
 *  https://github.com/namniak/CanvasTextWrapper
 *  Version:  0.4.0
 *  MIT License (http://www.opensource.org/licenses/mit-license.html)
 */

(function(root) {
	'use strict';

	var EL_WIDTH,EL_HEIGHT,MAX_TXT_WIDTH,MAX_TXT_HEIGHT;

	var defaults = {
		font: '18px Arial, sans-serif',
		sizeToFill: false,      // text is resized to fill the container (given font size is ignored)
		lineHeight: 1,          // default line height equivalent of '100%'
		allowNewLine: true,     // breaks text on every new line character '\n'
		lineBreak: 'auto',      // text fills the element's (canvas or parent) width going to a new line on a whole word
		textAlign: 'left',      // each line of text is aligned left
		verticalAlign: 'top',   // text lines block is aligned top
		justifyLines: false,    // lines are not justified
		paddingX: 0,            // 0px left & right text padding relatively to canvas or its container
		paddingY: 0,            // 0px top & bottom text padding relatively to canvas or its container
		fitParent: false,       // text is set to fit canvas width
		strokeText: false       // text is stroked according to context configuration
	};

	var CanvasTextWrapper = function(canvas,text,options) {
		if (!(this instanceof CanvasTextWrapper)) {
			return new CanvasTextWrapper(canvas,text,options);
		}

		this.canvas = canvas;
		this.text = text;
		this.context = this.canvas.getContext('2d');
		this.context.font = this.font;
		this.context.textBaseline = 'bottom';

		for (var property in defaults) {
			if (defaults.hasOwnProperty(property)) {
				this[property] = (options && options[property]) ? options[property] : defaults[property];
			}
		}

		EL_WIDTH = (this.fitParent === false) ? this.canvas.width : this.canvas.parentNode.clientWidth;
		EL_HEIGHT = (this.fitParent === false) ? this.canvas.height : this.canvas.parentNode.clientHeight;
		MAX_TXT_WIDTH = EL_WIDTH - (this.paddingX * 2);
		MAX_TXT_HEIGHT = EL_HEIGHT - (this.paddingY * 2);

		this._init();
	};

	CanvasTextWrapper.prototype = {
		_init: function() {
			/* Substituting this line that causing a bug with font-weight numeric values	*/
			//this.fontSize = parseInt(this.font.replace(/^\D+/g,''),10) || 18;

			/* This line allow font values like : "italic 500 25px" to preserve both numeric a literal value of font-weight*/
			this.fontSize = this.font.match(/\d+(px|em|\%)/g) ? +this.font.match(/\d+(px|em|\%)/g)[0].match(/\d+/g) : 18;

			this.textBlockHeight = 0;
			this.lines = [];
			this.newLineIndexes = [];
			this.textPos = {x: 0,y: 0};

			this._setFont(this.fontSize);
			this._setLineHeight();
			this._validate();
			this._render();
		},

		_render: function() {
			if (this.sizeToFill) {
				var numWords = this.text.trim().split(/\s+/).length;
				var fontSize = 0;

				do {
					this._setFont(++fontSize);
					this.lineHeight = this.fontSize;
					this._wrap();
				} while (this.textBlockHeight < MAX_TXT_HEIGHT && (this.lines.join(' ').split(/\s+/).length == numWords));

				this._setFont(--fontSize);
				this.lineHeight = this.fontSize;
			} else {
				this._wrap();
			}

			if (this.justifyLines && this.lineBreak === 'auto') {
				this._justify();
			}

			this._setAlignY();
			this._drawText();
		},

		_setFont: function(fontSize) {
			var fontParts = (!this.sizeToFill) ? this.font.split(/\b\d+px\b/i) : this.context.font.split(/\b\d+px\b/i);
			this.context.font = fontParts[0] + fontSize + 'px' + fontParts[1];
			this.fontSize = fontSize;
		},

		_setLineHeight: function() {
			if (!isNaN(this.lineHeight)) {
				this.lineHeight = this.fontSize * this.lineHeight;
			} else if (this.lineHeight.toString().indexOf('px') !== -1) {
				this.lineHeight = parseInt(this.lineHeight);
			} else if (this.lineHeight.toString().indexOf('%') !== -1) {
				this.lineHeight = (parseInt(this.lineHeight) / 100) * this.fontSize;
			}
		},

		_wrap: function() {
			if (this.allowNewLine) {
				var newLines = this.text.trim().split('\n');
				for (var i = 0,idx = 0; i < newLines.length - 1; i++) {
					idx += newLines[i].trim().split(/\s+/).length;
					this.newLineIndexes.push(idx)
				}
			}

			var words = this.text.trim().split(/\s+/);
			this._checkLength(words);
			this._breakText(words);

			this.textBlockHeight = this.lines.length * this.lineHeight;
		},

		_checkLength: function(words) {
			var testString,tokenLen,sliced,leftover;

			for (var i = 0; i < words.length; i++) {
				testString = '';
				tokenLen = this.context.measureText(words[i]).width;

				if (tokenLen > MAX_TXT_WIDTH) {
					for (var k = 0; (this.context.measureText(testString + words[i][k]).width <= MAX_TXT_WIDTH) && (k < words[i].length); k++) {
						testString += words[i][k];
					}

					sliced = words[i].slice(0,k);
					leftover = words[i].slice(k);
					words.splice(i,1,sliced,leftover);
				}
			}
		},

		_breakText: function(words) {
			for (var i = 0,j = 0; i < words.length; j++) {
				this.lines[j] = '';

				if (this.lineBreak === 'auto') {
					while ((this.context.measureText(this.lines[j] + words[i]).width <= MAX_TXT_WIDTH) && (i < words.length)) {

						this.lines[j] += words[i] + ' ';
						i++;

						if (this.allowNewLine) {
							for (var k = 0; k < this.newLineIndexes.length; k++) {
								if (this.newLineIndexes[k] === i) {
									j++;
									this.lines[j] = '';
									break;
								}
							}
						}
					}
					this.lines[j] = this.lines[j].trim();
				} else {
					this.lines[j] = words[i];
					i++;
				}
			}
		},

		_justify: function() {
			var maxLen,longestLineIndex,tokenLen;
			for (var i = 0; i < this.lines.length; i++) {
				tokenLen = this.context.measureText(this.lines[i]).width;

				if (!maxLen || tokenLen > maxLen) {
					maxLen = tokenLen;
					longestLineIndex = i;
				}
			}

			// fill lines with extra spaces
			var numWords,spaceLength,numOfSpaces,num,filler;
			var delimiter = '\u200A';
			for (i = 0; i < this.lines.length; i++) {
				if (i === longestLineIndex) continue;

				numWords = this.lines[i].trim().split(/\s+/).length;
				if (numWords <= 1) continue;

				this.lines[i] = this.lines[i].trim().split(/\s+/).join(delimiter);

				spaceLength = this.context.measureText(delimiter).width;
				numOfSpaces = (maxLen - this.context.measureText(this.lines[i]).width) / spaceLength;
				num = numOfSpaces / (numWords - 1);

				filler = '';
				for (var j = 0; j < num; j++) {
					filler += delimiter;
				}

				this.lines[i] = this.lines[i].trim().split(delimiter).join(filler);
				//console.log('numWords:', numWords, 'numOfSpaces:', numOfSpaces, 'num:', num);
			}
		},

		_drawText: function() {
			for (var i = 0; i < this.lines.length; i++) {
				this._setAlignX(this.lines[i]);

				this.textPos.y = parseInt(this.textPos.y) + this.lineHeight;
				this.context.fillText(this.lines[i],this.textPos.x,this.textPos.y);

				if (this.strokeText) {
					this.context.strokeText(this.lines[i],this.textPos.x,this.textPos.y);
				}
			}
		},

		_setAlignX: function(line) {
			if (this.textAlign == 'center') {
				this.textPos.x = (EL_WIDTH - this.context.measureText(line).width) / 2;
			} else if (this.textAlign == 'right') {
				this.textPos.x = EL_WIDTH - this.context.measureText(line).width - this.paddingX;
			} else {
				this.textPos.x = this.paddingX;
			}
		},

		_setAlignY: function() {
			if (this.verticalAlign == 'middle') {
				this.textPos.y = (EL_HEIGHT - this.textBlockHeight) / 2;
			} else if (this.verticalAlign == 'bottom') {
				this.textPos.y = EL_HEIGHT - this.textBlockHeight - this.paddingY;
			} else {
				this.textPos.y = this.paddingY;
			}
		},

		_validate: function() {
			if (!(this.canvas instanceof HTMLCanvasElement))
				throw new TypeError('The first parameter must be an instance of HTMLCanvasElement.');

			if (typeof this.text !== 'string')
				throw new TypeError('The second parameter must be a string.');

			if (isNaN(this.fontSize))
				throw new TypeError('Cannot parse "font".');

			if (isNaN(this.lineHeight))
				throw new TypeError('Cannot parse "lineHeight".');

			if (this.textAlign.toLocaleLowerCase() !== 'left' && this.textAlign.toLocaleLowerCase() !== 'center' && this.textAlign.toLocaleLowerCase() !== 'right')
				throw new TypeError('Property "textAlign" must be set to either "left", "center", or "right".');

			if (this.verticalAlign.toLocaleLowerCase() !== 'top' && this.verticalAlign.toLocaleLowerCase() !== 'middle' && this.verticalAlign.toLocaleLowerCase() !== 'bottom')
				throw new TypeError('Property "verticalAlign" must be set to either "top", "middle", or "bottom".');

			if (typeof this.justifyLines !== 'boolean')
				throw new TypeError('Property "justifyLines" must be set to a Boolean.');

			if (isNaN(this.paddingX))
				throw new TypeError('Property "paddingX" must be set to a Number.');

			if (isNaN(this.paddingY))
				throw new TypeError('Property "paddingY" must be set to a Number.');

			if (typeof this.fitParent !== 'boolean')
				throw new TypeError('Property "fitParent" must be set to a Boolean.');

			if (this.lineBreak.toLocaleLowerCase() !== 'auto' && this.lineBreak.toLocaleLowerCase() !== 'word')
				throw new TypeError('Property "lineBreak" must be set to either "auto" or "word".');

			if (typeof this.sizeToFill !== 'boolean')
				throw new TypeError('Property "sizeToFill" must be set to a Boolean.');

			if (typeof this.strokeText !== 'boolean')
				throw new TypeError('Property "strokeText" must be set to a Boolean.');
		}
	};

  if ('module' in root && 'exports' in module) {
    module.exports = CanvasTextWrapper;
  } else {
    root.CanvasTextWrapper = CanvasTextWrapper;
  }
})(this);