// First we specify a streaming URL for the player - in this example an HLS on-demand feed
// Replace this URL with your own HLS feed

// https://d1chyo78gdexn4.cloudfront.net/vualto-demo/sintel/sintel_nodrm.ism/manifest.m3u8'
var bitrates = {
    dash: '<your-dash-stream-url>',
    hls: '<your-hls-stream-url>'
};
// Then we set our player settings
var settings = {
    licenseKey: '<your-licenseKey>',
    bitrates: bitrates,
    width: 640,
    height: 360,
    skin: 's1',
    poster: 'vuplay_poster.png'
};

// Reference to our container div (unique id)
var elementID = 'rmpPlayer';
// Create an object based on RadiantMP constructor
var rmp = new RadiantMP(elementID);
// Initialization ... test your page and done!
rmp.init(settings);