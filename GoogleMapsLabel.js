// Define the overlay, derived from google.maps.OverlayView
function Label(opt_options) {
    // Initialization
    this.setValues(opt_options);

    // Label specific
    var span = this.span_ = document.createElement('span');
    span.style.cssText = 'position: relative; ' +
        'left: -50%;' +
        'top: -20px;' +
        'z-index:30;' +
        'min-height:29px; ' +
        'display: block ' +
        'min-width:20px;' +
        'white-space: nowrap; ' +
        'padding: 0; ' +
        'background-image: url("church-icon.png");' +
        'color: white; ' +
        'font-weight: bold; ' +
        'font-size:11px; ' +
        '-webkit-transform: translateZ(100px);';

    var div = this.div_ = document.createElement('div');
    div.appendChild(span);
    div.style.cssText = 'position: absolute; display: none';
}
Label.prototype = new google.maps.OverlayView;

// Implement onAdd
Label.prototype.onAdd = function() {
    var pane = this.getPanes().overlayLayer;
    pane.appendChild(this.div_);

    // Ensures the label is redrawn if the text or position is changed.
    var me = this;
    this.listeners_ = [
        google.maps.event.addListener(this, 'position_changed',
            function() { me.draw(); }),
        google.maps.event.addListener(this, 'text_changed',
            function() { me.draw(); })
    ];
};

// Implement onRemove
Label.prototype.onRemove = function() {
    this.div_.parentNode.removeChild(this.div_);

    // Label is removed from the map, stop updating its position/text.
    for (var i = 0, I = this.listeners_.length; i < I; ++i) {
        google.maps.event.removeListener(this.listeners_[i]);
    }
};

// Implement draw
Label.prototype.draw = function () {
    var projection = this.getProjection();
    var position = projection.fromLatLngToDivPixel(this.get('position'));

    var div = this.div_;
    div.style.left = position.x + 'px';
    div.style.top = position.y + 'px';
    div.style.display = 'block';


    var span = this.span_;

    span.innerHTML = this.get('text').toString();
    span.style.display = 'block';
    span.style.width = '20px';
    span.style.height = '29px';
    span.style.textAlign = 'center';
    span.style.lineHeight = '38px';
    span.style.verticalAlign = 'bottom';
    span.style.backgroundImage = 'url(church-icon.png)';
};