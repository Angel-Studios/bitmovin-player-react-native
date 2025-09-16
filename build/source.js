import { Drm } from './drm';
import NativeInstance from './nativeInstance';
import SourceModule from './modules/SourceModule';
/**
 * Types of media that can be handled by the player.
 */
export var SourceType;
(function (SourceType) {
    /**
     * Indicates a missing source type.
     */
    SourceType["NONE"] = "none";
    /**
     * Indicates media type HLS.
     */
    SourceType["HLS"] = "hls";
    /**
     * Indicates media type DASH.
     */
    SourceType["DASH"] = "dash";
    /**
     * Indicates media type Progressive MP4.
     */
    SourceType["PROGRESSIVE"] = "progressive";
})(SourceType || (SourceType = {}));
/**
 * The different loading states a {@link Source} instance can be in.
 */
export var LoadingState;
(function (LoadingState) {
    /**
     * The source is unloaded.
     */
    LoadingState[LoadingState["UNLOADED"] = 0] = "UNLOADED";
    /**
     * The source is currently loading.
     */
    LoadingState[LoadingState["LOADING"] = 1] = "LOADING";
    /**
     * The source is loaded.
     */
    LoadingState[LoadingState["LOADED"] = 2] = "LOADED";
})(LoadingState || (LoadingState = {}));
/**
 Timeline reference point to calculate SourceOptions.startOffset from.
 Default for live: TimelineReferencePoint.EBD Default for VOD: TimelineReferencePoint.START.
 */
export var TimelineReferencePoint;
(function (TimelineReferencePoint) {
    /**
     * Relative offset will be calculated from the beginning of the stream or DVR window.
     */
    TimelineReferencePoint["START"] = "start";
    /**
     * Relative offset will be calculated from the end of the stream or the live edge in case of a live stream with DVR window.
     */
    TimelineReferencePoint["END"] = "end";
})(TimelineReferencePoint || (TimelineReferencePoint = {}));
/**
 * Represents audio and video content that can be loaded into a player.
 */
export class Source extends NativeInstance {
    /**
     * The native DRM config reference of this source.
     */
    drm;
    /**
     * The remote control config for this source.
     * This is only supported on iOS.
     *
     * @remarks Platform: iOS
     */
    remoteControl = null;
    /**
     * Whether the native {@link Source} object has been created.
     */
    isInitialized = false;
    /**
     * Whether the native {@link Source} object has been disposed.
     */
    isDestroyed = false;
    /**
     * Allocates the native {@link Source} instance and its resources natively.
     */
    initialize = async () => {
        if (!this.isInitialized) {
            const sourceMetadata = this.config?.analyticsSourceMetadata;
            if (this.config?.drmConfig) {
                this.drm = new Drm(this.config.drmConfig);
                this.drm.initialize();
            }
            if (sourceMetadata) {
                await SourceModule.initializeWithAnalyticsConfig(this.nativeId, this.drm?.nativeId, this.config, this.remoteControl || undefined, sourceMetadata);
            }
            else {
                await SourceModule.initializeWithConfig(this.nativeId, this.drm?.nativeId, this.config, this.remoteControl || undefined);
            }
            this.isInitialized = true;
        }
        return Promise.resolve();
    };
    /**
     * Destroys the native {@link Source} and releases all of its allocated resources.
     */
    destroy = () => {
        if (!this.isDestroyed) {
            SourceModule.destroy(this.nativeId);
            this.drm?.destroy();
            this.isDestroyed = true;
        }
    };
    /**
     * The duration of the source in seconds if it’s a VoD or `INFINITY` if it’s a live stream.
     * Default value is `0` if the duration is not available or not known.
     */
    duration = async () => {
        return (await SourceModule.duration(this.nativeId)) || 0;
    };
    /**
     * Whether the source is currently active in a player (i.e. playing back or paused).
     * Only one source can be active in the same player instance at any time.
     */
    isActive = async () => {
        return (await SourceModule.isActive(this.nativeId)) ?? false;
    };
    /**
     * Whether the source is currently attached to a player instance.
     */
    isAttachedToPlayer = async () => {
        return (await SourceModule.isAttachedToPlayer(this.nativeId)) ?? false;
    };
    /**
     * Metadata for the currently loaded source.
     */
    metadata = async () => {
        return SourceModule.getMetadata(this.nativeId);
    };
    /**
     * Set metadata for the currently loaded source.
     * Setting the metadata to `null` clears the metadata object in native source.
     *
     * @param metadata metadata to be set.
     */
    setMetadata = (metadata) => {
        SourceModule.setMetadata(this.nativeId, metadata);
    };
    /**
     * The current `LoadingState` of the source.
     */
    loadingState = async () => {
        return ((await SourceModule.loadingState(this.nativeId)) || LoadingState.UNLOADED);
    };
    /**
     * @returns a `Thumbnail` for the specified playback time if available.
     * Supported thumbnail formats are:
     * - `WebVtt` configured via {@link SourceConfig.thumbnailTrack}, on all supported platforms
     * - HLS `Image Media Playlist` in the multivariant playlist, Android-only
     * - DASH `Image Adaptation Set` as specified in DASH-IF IOP, Android-only
     * If a `WebVtt` thumbnail track is provided, any potential in-manifest thumbnails are ignored on Android.
     *
     * @param time - The time in seconds for which to retrieve the thumbnail.
     */
    getThumbnail = async (time) => {
        return SourceModule.getThumbnail(this.nativeId, time);
    };
}
//# sourceMappingURL=source.js.map