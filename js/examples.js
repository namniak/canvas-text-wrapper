document.onreadystatechange = function() {
	'use strict';
	if (document.readyState === 'complete') {
		(function() {
			var container = document.getElementsByTagName('section')[0];
			var w = 448;
			var h = 250;
			var options = model;

			createExamples();

			function createExamples() {
				var fragment = new DocumentFragment();
				var context;

				for (var i = 0; i < options.length; i++) {
					var exampleItem = document.createElement('div');
					fragment.appendChild(exampleItem);

					var canvas = document.createElement('canvas');
					exampleItem.appendChild(canvas);
					canvas.width = w;
					canvas.height = h;
					context = canvas.getContext('2d');
					context.lineWidth = 2;
					context.strokeStyle = 'yellow';
					CanvasTextWrapper(canvas,(options[i].txt),options[i]);

					var hint = document.createElement('div');
					exampleItem.appendChild(hint);
					var optionsData = '';

					for (var property in options[i]) {
						if (options[i].hasOwnProperty(property)) {
							if (property == 'txt') continue;
							var stringWrapper = (property == 'paddingX' || property == 'paddingY' || property == 'sizeToFill' || property === 'justifyLines' || property === 'allowNewLine' || property === 'strokeText') ? '' : '"';
							optionsData += '         <span>' + property + ':</span> ' +
							stringWrapper + options[i][property] + stringWrapper + ',<br/>';
						}
					}

					hint.innerHTML = '<h6>CODE:</h6><p>' +
					'CanvasTextWrapper(canvas, str, {<br/>' + optionsData + '});' +
					'</p>';
				}

				container.appendChild(fragment);
			}
		})();
	}
};