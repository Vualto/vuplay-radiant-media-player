# vuplay-radiant-media-player

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Built with Grunt](http://cdn.gruntjs.com/builtwith.svg)](https://gruntjs.com/)

This repository will demonstrate how to use [VUDRM](https://docs.vualto.com/projects/vudrm/en/latest/index.html) with [Radiant Media Player](https://www.radiantmediaplayer.com). If you have any questions please contact support@vualto.com

This repository is currently targeted at Radiant Media Player version 5.1.6

## Instructions

### Install dependencies

1. Install [npm](https://www.npmjs.com/)
2. Install the [grunt-cli](https://www.npmjs.com/package/grunt-cli): `npm install -g grunt-cli`
3. Clone the repository: `git clone git@github.com:Vualto/vuplay-radiant-media-player.git`
4. Navigate to the project's root folder: `cd vuplay-radiant-media-player`
5. Install the dependencies: `npm install`

### Build and run the dev environment

1. Open the repository in your favourite javascript editor.
2. In file `index.html` replace `<your-license-key>` with your Radiant Media Player key.
3. In file `index.html` replace `<your-stream-url>` with your stream URL. This can be an [MPEG-DASH](https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP) or [HLS](https://developer.apple.com/streaming/) stream.
4. Run `npm start` in the project's root. This will create a `dist` folder that contains all the files needed to run this demo, and run them on a local dev server.
5. Load a supported browser and go to `https://radiant.media.player.local.vuplay.co.uk:14705`
    - You will need to add the host `radiant.media.player.local.vuplay.co.uk` to your local machine's hosts file in order for this to work.

NB: In order to allow DRM encrypted playback in Chrome (https://goo.gl/EEhZqT), SSL has been enabled for the demo. You will get a warning about an invalid cert `NET::ERR_CERT_AUTHORITY_INVALID` but this can be safely ignored.

### Browser support

The browser must support [encrypted media extensions](https://www.w3.org/TR/2016/CR-encrypted-media-20160705/).
Currently this includes the latest versions of Chrome, Firefox, Internet Explorer 11, Edge, and Safari.
For a complete breakdown of supported media extensions please contact support@vualto.com

## Useful links

### VUDRM

- [Contact Vualto](https://www.vualto.com/contact-us/)
- [VUDRM](https://docs.vualto.com/projects/vudrm/en/latest/index.html)
- [VUDRM token documentation](https://docs.vualto.com/projects/vudrm/en/latest/VUDRM-token.html)

### MPEG-DASH

- [MPEG-DASH](https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP)
- [What is MPEG-DASH](https://www.streamingmedia.com/Articles/Editorial/What-Is-.../What-is-MPEG-DASH-79041.aspx)

### HLS

- [Apple's developer resources on HLS](https://developer.apple.com/streaming/)
- [HLS wikipedia](https://en.wikipedia.org/wiki/HTTP_Live_Streaming)
- [What is HLS?](https://www.streamingmedia.com/Articles/Editorial/What-Is-.../What-is-HLS-(HTTP-Live-Streaming)-78221.aspx)

### Encrypted media extensions

- [Encrypted media extensions specification](https://www.w3.org/TR/2016/CR-encrypted-media-20160705/)
- [Encrypted media extensions wikipedia](https://en.wikipedia.org/wiki/Encrypted_Media_Extensions)
- [Encrypted media extensions on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Encrypted_Media_Extensions_API)
- [Intro to encrypted media extensions](https://www.html5rocks.com/en/tutorials/eme/basics/)

### Radiant Media Player

- [Radiant Media Player](https://www.radiantmediaplayer.com)
- [Online documentation](https://www.radiantmediaplayer.com/docs/latest/quick-start.html)

### Build tools

- [npm](https://www.npmjs.com/)
- [grunt](https://gruntjs.com/)
