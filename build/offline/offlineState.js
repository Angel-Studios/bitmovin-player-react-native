/**
 * Contains the state an OfflineContentManager can have.
 * @remarks Platform: Android, iOS
 */
export var OfflineState;
(function (OfflineState) {
    /**
     * The offline content is downloaded and ready for offline playback.
     */
    OfflineState["Downloaded"] = "Downloaded";
    /**
     * The offline content is currently downloading.
     */
    OfflineState["Downloading"] = "Downloading";
    /**
     * The download of the offline content is suspended, and is only partly downloaded yet.
     */
    OfflineState["Suspended"] = "Suspended";
    /**
     * The offline content is not downloaded. However, some data may be still cached.
     */
    OfflineState["NotDownloaded"] = "NotDownloaded";
})(OfflineState || (OfflineState = {}));
//# sourceMappingURL=offlineState.js.map