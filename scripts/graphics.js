MyGame.graphics = (function() {
    'use strict';

    let canvas = document.getElementById('id-canvas');
    let context = canvas.getContext('2d');

    const HEIGHT_BOUND = 14;

    let cellHeight = canvas.height / 20;
    let cellWidth = canvas.width / 30;

    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawTexture(image, center, size) {
        context.save();

        context.translate(center.x, center.y);
        context.translate(-center.x, -center.y);

        context.drawImage(
            image,
            center.x - size.x / 2,
            center.y - size.y / 2,
            size.x, size.y);

        context.restore();
    }

    function drawRectangle(rect) {
        context.save();
        context.translate(rect.center.x, rect.center.y );
        context.rotate(rect.rotation);
        context.translate(-rect.center.x, -rect.center.y);
        
        context.fillStyle = rect.fill;
        context.fillRect(rect.center.x - rect.size.x / 2, rect.center.y - rect.size.y / 2, rect.size.x, rect.size.y);
        
        context.strokeStyle = rect.stroke;
        context.strokeRect(rect.center.x - rect.size.x / 2, rect.center.y - rect.size.y / 2, rect.size.x, rect.size.y);

        context.restore();
    }

    let api = {
        clear: clear,
        drawTexture: drawTexture,
        drawRectangle: drawRectangle,
        canvas,
        HEIGHT_BOUND,
        cellHeight,
        cellWidth
    };

    return api;
}());
