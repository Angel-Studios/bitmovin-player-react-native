/**
 * Available HTTP request types.
 */
export var HttpRequestType;
(function (HttpRequestType) {
    HttpRequestType["ManifestDash"] = "manifest/dash";
    HttpRequestType["ManifestHlsMaster"] = "manifest/hls/master";
    HttpRequestType["ManifestHlsVariant"] = "manifest/hls/variant";
    HttpRequestType["ManifestSmooth"] = "manifest/smooth";
    HttpRequestType["MediaProgressive"] = "media/progressive";
    HttpRequestType["MediaAudio"] = "media/audio";
    HttpRequestType["MediaVideo"] = "media/video";
    HttpRequestType["MediaSubtitles"] = "media/subtitles";
    HttpRequestType["MediaThumbnails"] = "media/thumbnails";
    HttpRequestType["DrmLicenseFairplay"] = "drm/license/fairplay";
    HttpRequestType["DrmCertificateFairplay"] = "drm/certificate/fairplay";
    HttpRequestType["DrmLicenseWidevine"] = "drm/license/widevine";
    HttpRequestType["KeyHlsAes"] = "key/hls/aes";
    HttpRequestType["Unknown"] = "unknown";
})(HttpRequestType || (HttpRequestType = {}));
//# sourceMappingURL=networkConfig.js.map