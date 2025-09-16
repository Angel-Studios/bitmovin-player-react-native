import BufferModule from './modules/BufferModule';
/**
 * Represents different types of media.
 */
export var MediaType;
(function (MediaType) {
    /**
     * Audio media type.
     */
    MediaType["AUDIO"] = "audio";
    /**
     * Video media type.
     */
    MediaType["VIDEO"] = "video";
})(MediaType || (MediaType = {}));
/**
 * Represents different types of buffered data.
 */
export var BufferType;
(function (BufferType) {
    /**
     * Represents the buffered data starting at the current playback time.
     */
    BufferType["FORWARD_DURATION"] = "forwardDuration";
    /**
     * Represents the buffered data up until the current playback time.
     */
    BufferType["BACKWARD_DURATION"] = "backwardDuration";
})(BufferType || (BufferType = {}));
/**
 * Provides the means to configure buffer settings and to query the current buffer state.
 * Accessible through {@link Player.buffer}.
 */
export class BufferApi {
    /**
     * The native player id that this buffer api is attached to.
     */
    nativeId;
    constructor(playerId) {
        this.nativeId = playerId;
    }
    /**
     * Gets the {@link BufferLevel|buffer level} from the Player
     * @param type The {@link BufferType} to return the level for.
     * @returns a {@link BufferLevels} that contains {@link BufferLevel} values for audio and video.
     */
    getLevel = async (type) => {
        return BufferModule.getLevel(this.nativeId, type);
    };
    /**
     * Sets the target buffer level for the chosen buffer {@link BufferType} across all {@link MediaType} options.
     *
     * @param type The {@link BufferType} to set the target level for. On iOS and tvOS, only {@link BufferType.FORWARD_DURATION} is supported.
     * @param value The value to set. On iOS and tvOS when passing `0`, the player will choose an appropriate forward buffer duration suitable for most use-cases. On Android setting to `0` will have no effect.
     */
    setTargetLevel = async (type, value) => {
        return BufferModule.setTargetLevel(this.nativeId, type, value);
    };
}
//# sourceMappingURL=bufferApi.js.map