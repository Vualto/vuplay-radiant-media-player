(function() {
    var vudrmToken = "<your-vudrm-token>";
    var source = {
        dash: "<your-dash-widevine-or-playeady-encrypted-stream>",
        fps: "<your-hls-fairplay-encrypted-stream>",
    };
    var playReadyLaURL =
        "https://playready-license.drm.technology/rightsmanager.asmx?token=" +
        encodeURIComponent(vudrmToken);
    var widevineLaURL = "https://widevine-proxy.drm.technology/proxy";
    var FairplayCertificatePath =
        "https://fairplay-license.drm.technology/certificate";
    var FairplayProcessSpcPath =
        "https://fairplay-license.drm.technology/license";
    var rmp = new RadiantMP("rmpPlayer");

    var shakaCustomRequestFilter = function(type, request) {
        if (type != shaka.net.NetworkingEngine.RequestType.LICENSE) return;

        var shakaPlayerInstance = rmp.shakaPlayer;
        if (!shakaPlayerInstance) {
            return;
        }

        var selectedDrmInfo = shakaPlayerInstance.drmInfo();
        if (selectedDrmInfo.keySystem !== "com.widevine.alpha") {
            return;
        }
        var keyId = selectedDrmInfo.keyIds[0].toUpperCase();

        var body = {
            token: vudrmToken,
            drm_info: Array.apply(null, new Uint8Array(request.body)),
            kid: keyId,
        };
        body = JSON.stringify(body);
        request.body = body;
        request.headers["Content-Type"] = "application/json";
    };

    var FairplayLicenseResponseType = "arraybuffer";

    var contentId = null;
    var FairplayExtractContentId = function(initData) {
        var arrayToString = function(array) {
            var uint16array = new Uint16Array(array.buffer);
            return String.fromCharCode.apply(null, uint16array);
        };
        var rawContentId = arrayToString(initData);
        var tmp = rawContentId.split("/");
        contentId = tmp[tmp.length - 1];
        return contentId;
    };

    var FairplayLicenseRequestLoaded = function(event) {
        if (event && event.target) {
            var request = event.target;
            if (
                typeof request.status === "number" &&
                request.status === 200 &&
                request.session &&
                request.response
            ) {
                var session = request.session;
                var key = new Uint8Array(request.response);
                session.update(key);
            }
        }
    };

    var base64EncodeUint8Array = function(input) {
        var keyStr =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        while (i < input.length) {
            chr1 = input[i++];
            chr2 = i < input.length ? input[i++] : Number.NaN;
            chr3 = i < input.length ? input[i++] : Number.NaN;

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output +=
                keyStr.charAt(enc1) +
                keyStr.charAt(enc2) +
                keyStr.charAt(enc3) +
                keyStr.charAt(enc4);
        }
        return output;
    };

    var FairplayLicenseRequestMessage = function(keyMessage) {
        var body = {
            token: vudrmToken,
            contentId: contentId,
            payload: base64EncodeUint8Array(keyMessage),
        };
        return JSON.stringify(body);
    };

    var FairplayLicenseRequestHeaders = [
        {
            name: "Content-type",
            value: "application/json",
        },
    ];

    var FairplayCertificateRequestHeaders = [
        {
            name: "x-vudrm-token",
            value: vudrmToken,
        },
    ];

    rmp.init({
        licenseKey: "<your-radiant-media-player-key>",
        src: source,
        muted: true,
        width: 640,
        height: 360,
        skin: "s1",
        preload: "auto",
        poster: "vuplay_poster.png",
        shakaDrm: {
            servers: {
                "com.widevine.alpha": widevineLaURL,
                "com.microsoft.playready": playReadyLaURL,
            },
        },
        shakaCustomRequestFilter: shakaCustomRequestFilter,
        fpsDrm: {
            certificatePath: FairplayCertificatePath,
            certificateRequestHeaders: FairplayCertificateRequestHeaders,
            processSpcPath: FairplayProcessSpcPath,
            licenseResponseType: FairplayLicenseResponseType,
            licenseRequestHeaders: FairplayLicenseRequestHeaders,
            extractContentId: FairplayExtractContentId,
            licenseRequestLoaded: FairplayLicenseRequestLoaded,
            licenseRequestMessage: FairplayLicenseRequestMessage,
        },
    });
})();
