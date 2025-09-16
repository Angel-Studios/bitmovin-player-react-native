import NativeInstance from './nativeInstance';
import { Source, SourceConfig } from './source';
import { AudioTrack } from './audioTrack';
import { SubtitleTrack } from './subtitleTrack';
import { OfflineContentManager, OfflineSourceOptions } from './offline';
import { Thumbnail } from './thumbnail';
import { AnalyticsApi } from './analytics/player';
import { PlayerConfig } from './playerConfig';
import { AdItem } from './advertising';
import { BufferApi } from './bufferApi';
import { VideoQuality } from './media';
/**
 * Loads, controls and renders audio and video content represented through {@link Source}s. A player
 * instance can be created via the {@link usePlayer} hook and will idle until one or more {@link Source}s are
 * loaded. Once {@link Player.load} or {@link Player.loadSource} is called, the player becomes active and initiates necessary downloads to
 * start playback of the loaded source(s).
 *
 * Can be attached to {@link PlayerView} component in order to use Bitmovin's Player Web UI.
 * @see PlayerView
 */
export declare class Player extends NativeInstance<PlayerConfig> {
    /**
     * Whether the native `Player` object has been created.
     */
    isInitialized: boolean;
    /**
     * Whether the native `Player` object has been disposed.
     */
    isDestroyed: boolean;
    /**
     * Currently active source, or `null` if none is active.
     */
    source?: Source;
    /**
     * The `AnalyticsApi` for interactions regarding the `Player`'s analytics.
     *
     * `undefined` if the player was created without analytics support.
     */
    analytics?: AnalyticsApi;
    /**
     * The {@link BufferApi} for interactions regarding the buffer.
     */
    buffer: BufferApi;
    private network?;
    private decoderConfig?;
    /**
     * Allocates the native `Player` instance and its resources natively.
     */
    initialize: () => Promise<void>;
    /**
     * Destroys the native `Player` and releases all of its allocated resources.
     */
    destroy: () => Promise<void>;
    /**
     * Loads a new {@link Source} from `sourceConfig` into the player.
     */
    load: (sourceConfig: SourceConfig) => Promise<void> | void;
    /**
     * Loads the downloaded content from {@link OfflineContentManager} into the player.
     */
    loadOfflineContent: (offlineContentManager: OfflineContentManager, options?: OfflineSourceOptions) => Promise<void> | void;
    /**
     * Loads the given {@link Source} into the player.
     */
    loadSource: (source: Source) => Promise<void>;
    /**
     * Unloads all {@link Source}s from the player.
     */
    unload: () => Promise<void> | void;
    /**
     * Starts or resumes playback after being paused. Has no effect if the player is already playing.
     */
    play: () => Promise<void> | void;
    /**
     * Pauses the video if it is playing. Has no effect if the player is already paused.
     */
    pause: () => Promise<void> | void;
    /**
     * Seeks to the given playback time specified by the parameter `time` in seconds. Must not be
     * greater than the total duration of the video. Has no effect when watching a live stream since
     * seeking is not possible.
     *
     * @param time - The time to seek to in seconds.
     */
    seek: (time: number) => Promise<void> | void;
    /**
     * Shifts the time to the given `offset` in seconds from the live edge. The resulting offset has to be within the
     * timeShift window as specified by `maxTimeShift` (which is a negative value) and 0. When the provided `offset` is
     * positive, it will be interpreted as a UNIX timestamp in seconds and converted to fit into the timeShift window.
     * When the provided `offset` is negative, but lower than `maxTimeShift`, then it will be clamped to `maxTimeShift`.
     * Has no effect for VoD.
     *
     * Has no effect if no sources are loaded.
     *
     * @param offset - Target offset from the live edge in seconds.
     */
    timeShift: (offset: number) => Promise<void> | void;
    /**
     * Mutes the player if an audio track is available. Has no effect if the player is already muted.
     */
    mute: () => Promise<void> | void;
    /**
     * Unmutes the player if it is muted. Has no effect if the player is already unmuted.
     */
    unmute: () => Promise<void> | void;
    /**
     * Sets the player's volume between 0 (silent) and 100 (max volume).
     *
     * @param volume - The volume level to set.
     */
    setVolume: (volume: number) => Promise<void> | void;
    /**
     * @returns The player's current volume level.
     */
    getVolume: () => Promise<number>;
    /**
     * @returns The current playback time in seconds.
     *
     * For VoD streams the returned time ranges between 0 and the duration of the asset.
     *
     * For live streams it can be specified if an absolute UNIX timestamp or a value
     * relative to the playback start should be returned.
     *
     * @param mode - The time mode to specify: an absolute UNIX timestamp ('absolute') or relative time ('relative').
     */
    getCurrentTime: (mode?: "relative" | "absolute") => Promise<number>;
    /**
     * @returns The total duration in seconds of the current video or INFINITY if it’s a live stream.
     */
    getDuration: () => Promise<number>;
    /**
     * @returns `true` if the player is muted.
     */
    isMuted: () => Promise<boolean>;
    /**
     * @returns `true` if the player is currently playing, i.e. has started and is not paused.
     */
    isPlaying: () => Promise<boolean>;
    /**
     * @returns `true` if the player has started playback but it's currently paused.
     */
    isPaused: () => Promise<boolean>;
    /**
     * @returns `true` if the displayed video is a live stream.
     */
    isLive: () => Promise<boolean>;
    /**
     * @remarks Only available for iOS devices.
     * @returns `true` when media is played externally using AirPlay.
     */
    isAirPlayActive: () => Promise<boolean>;
    /**
     * @remarks Only available for iOS devices.
     * @returns `true` when AirPlay is available.
     */
    isAirPlayAvailable: () => Promise<boolean>;
    /**
     * @returns The currently selected audio track or `null`.
     */
    getAudioTrack: () => Promise<AudioTrack | null>;
    /**
     * @returns An array containing {@link AudioTrack} objects for all available audio tracks.
     */
    getAvailableAudioTracks: () => Promise<AudioTrack[]>;
    /**
     * Sets the audio track to the ID specified by trackIdentifier. A list can be retrieved by calling getAvailableAudioTracks.
     *
     * @param trackIdentifier - The {@link AudioTrack.identifier} to be set.
     */
    setAudioTrack: (trackIdentifier: string) => Promise<void>;
    /**
     * @returns The currently selected {@link SubtitleTrack} or `null`.
     */
    getSubtitleTrack: () => Promise<SubtitleTrack | null>;
    /**
     * @returns An array containing SubtitleTrack objects for all available subtitle tracks.
     */
    getAvailableSubtitles: () => Promise<SubtitleTrack[]>;
    /**
     * Sets the subtitle track to the ID specified by trackIdentifier. A list can be retrieved by calling getAvailableSubtitles.
     *
     * @param trackIdentifier - The {@link SubtitleTrack.identifier} to be set.
     */
    setSubtitleTrack: (trackIdentifier?: string) => Promise<void>;
    /**
     * Dynamically schedules the {@link AdItem} for playback.
     * Has no effect if there is no active playback session.
     *
     * @param adItem - Ad to be scheduled for playback.
     *
     * @remarks Platform: iOS, Android
     */
    scheduleAd: (adItem: AdItem) => Promise<void> | void;
    /**
     * Skips the current ad.
     * Has no effect if the current ad is not skippable or if no ad is being played back.
     *
     * @remarks Platform: iOS, Android
     */
    skipAd: () => Promise<void> | void;
    /**
     * @returns `true` while an ad is being played back or when main content playback has been paused for ad playback.
     * @remarks Platform: iOS, Android
     */
    isAd: () => Promise<boolean>;
    /**
     * The current time shift of the live stream in seconds. This value is always 0 if the active {@link Source} is not a
     * live stream or no sources are loaded.
     */
    getTimeShift: () => Promise<number>;
    /**
     * The limit in seconds for time shifting. This value is either negative or 0 and it is always 0 if the active
     * {@link Source} is not a live stream or no sources are loaded.
     */
    getMaxTimeShift: () => Promise<number>;
    /**
     * Sets the upper bitrate boundary for video qualities. All qualities with a bitrate
     * that is higher than this threshold will not be eligible for automatic quality selection.
     *
     * Can be set to `null` for no limitation.
     */
    setMaxSelectableBitrate: (bitrate: number | null) => Promise<void> | void;
    /**
     * @returns a {@link Thumbnail} for the specified playback time for the currently active source if available.
     * Supported thumbnail formats are:
     * - `WebVtt` configured via {@link SourceConfig.thumbnailTrack}, on all supported platforms
     * - HLS `Image Media Playlist` in the multivariant playlist, Android-only
     * - DASH `Image Adaptation Set` as specified in DASH-IF IOP, Android-only
     * If a `WebVtt` thumbnail track is provided, any potential in-manifest thumbnails are ignored on Android.
     *
     * @param time - The time in seconds for which to retrieve the thumbnail.
     */
    getThumbnail: (time: number) => Promise<Thumbnail | null>;
    /**
     * Whether casting to a cast-compatible remote device is available. {@link CastAvailableEvent} signals when
     * casting becomes available.
     *
     * @remarks Platform: iOS, Android
     */
    isCastAvailable: () => Promise<boolean>;
    /**
     * Whether video is currently being casted to a remote device and not played locally.
     *
     * @remarks Platform: iOS, Android
     */
    isCasting: () => Promise<boolean>;
    /**
     * Initiates casting the current video to a cast-compatible remote device. The user has to choose to which device it
     * should be sent.
     *
     * @remarks Platform: iOS, Android
     */
    castVideo: () => Promise<void> | void;
    /**
     * Stops casting the current video. Has no effect if {@link Player.isCasting} is `false`.
     *
     * @remarks Platform: iOS, Android
     */
    castStop: () => Promise<void> | void;
    /**
     * Returns the currently selected video quality.
     * @returns The currently selected video quality.
     */
    getVideoQuality: () => Promise<VideoQuality>;
    /**
     * Returns an array containing all available video qualities the player can adapt between.
     * @returns An array containing all available video qualities the player can adapt between.
     */
    getAvailableVideoQualities: () => Promise<VideoQuality[]>;
    /**
     * Sets the video quality.
     * @remarks Platform: Android
     *
     * @param qualityId value obtained from {@link VideoQuality}'s `id` property, which can be obtained via `Player.getAvailableVideoQualities()` to select a specific quality. To use automatic quality selection, 'auto' can be passed here.
     */
    setVideoQuality: (qualityId: string) => Promise<void> | void;
    /**
     * Sets the playback speed of the player. Fast forward, slow motion and reverse playback are supported.
     * @remarks
     * Platform: iOS, tvOS
     *
     * - Slow motion is indicated by values between `0` and `1`.
     * - Fast forward by values greater than `1`.
     * - Slow reverse is used by values between `0` and `-1`, and fast reverse is used by values less than `-1`. iOS and tvOS only.
     * - Negative values are ignored during Casting and on Android.
     * - During reverse playback the playback will continue until the beginning of the active source is
     *   reached. When reaching the beginning of the source, playback will be paused and the playback
     *   speed will be reset to its default value of `1`. No {@link PlaybackFinishedEvent} will be
     *   emitted in this case.
     *
     * @param playbackSpeed - The playback speed to set.
     */
    setPlaybackSpeed: (playbackSpeed: number) => Promise<void> | void;
    /**
     * @see {@link setPlaybackSpeed} for details on which values playback speed can assume.
     * @returns The player's current playback speed.
     */
    getPlaybackSpeed: () => Promise<number>;
    /**
     * Checks the possibility to play the media at specified playback speed.
     * @param playbackSpeed - The playback speed to check.
     * @returns `true` if it's possible to play the media at the specified playback speed, otherwise `false`. On Android it always returns `undefined`.
     * @remarks Platform: iOS, tvOS
     */
    canPlayAtPlaybackSpeed: (playbackSpeed: number) => Promise<boolean | undefined>;
    private maybeInitDecoderConfig;
}
//# sourceMappingURL=player.d.ts.map