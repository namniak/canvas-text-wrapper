document.onreadystatechange = function() {
    if (document.readyState === 'complete') {

        (function() {
            var container = document.getElementsByTagName('section')[0];
            var w = 448;
            var h = 250;
            var aspectRatio = 0;
            var text = 'Canvas text wrapping example';

            var img = new Image();
            img.src = 'img/bg.jpg';
            img.onload = function() {
                aspectRatio = img.naturalWidth / img.naturalHeight;
                createExamples();
            };

            // use options.js file
            var options = optionsArr;

            function createExamples() {
                var fragment = new DocumentFragment();
                var context;

                for (var i = 0; i < options.length; i++) {
                    var exampleItem = document.createElement('div');
                    fragment.appendChild(exampleItem);

                    // draw canvas image
                    var canvasImg = document.createElement('canvas');
                    canvasImg.width = w;
                    canvasImg.height = h;
                    context = canvasImg.getContext('2d');
                    context.drawImage(img, 0, 0, w, w * aspectRatio);
                    exampleItem.appendChild(canvasImg);

                    // create canvas mask layer
                    var canvasMask = document.createElement('canvas');
                    canvasMask.width = w;
                    canvasMask.height = h;
                    context = canvasMask.getContext('2d');
                    context.fillStyle = 'rgba(255,255,255, 1)';
                    context.fillRect(0, 0, w, h);
                    exampleItem.appendChild(canvasMask);

                    // create text to be cut out mask layer
                    context.fillStyle = '#212121';
                    context.globalCompositeOperation = 'destination-out';

                    // create wrapper
                    new CanvasTextWrapper(canvasMask, ('#' + (i + 1) + ' ' + text), options[i]);

                    // create hint code block
                    var hint = document.createElement('div');
                    exampleItem.appendChild(hint);
                    var optionsData = '';

                    // read used properties
                    for (var property in options[i]) {
                        var stringWrapper = (property == 'paddingX' || property == 'paddingY' || property == 'sizeToFill') ? '' : '"';
                        optionsData += '         <span>' + property + ':</span> ' +
                            stringWrapper + options[i][property] + stringWrapper + ',<br/>';
                    }

                    // print example code
                    hint.innerHTML = '<h6>CODE:</h6><p>' +
                        'new CanvasTextWrapper(canvasEl, textStr, {<br/>' + optionsData + '});' +
                        '</p>';
                }

                // inject document fragment into actual DOM
                container.appendChild(fragment);
            }
        })();
    }
};