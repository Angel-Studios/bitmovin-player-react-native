/**
 * When switching the video quality, the video decoder's configuration might change
 * as the player can't always know if the codec supports such configuration change, it destroys and recreates it.
 * This behaviour can cause brief black screens when switching between video qualities as codec recreation can be slow.
 *
 * If a codec is know to support a given configuration change without issues,
 * the configuration can be added to the `TweaksConfig.forceReuseVideoCodecReasons`
 * to always reuse the video codec and avoid the black screen.
 */
export var ForceReuseVideoCodecReason;
(function (ForceReuseVideoCodecReason) {
    /**
     * The new video quality color information is not compatible.
     */
    ForceReuseVideoCodecReason["ColorInfoMismatch"] = "ColorInfoMismatch";
    /**
     * The new video quality exceed the decoder's configured maximum sample size.
     */
    ForceReuseVideoCodecReason["MaxInputSizeExceeded"] = "MaxInputSizeExceeded";
    /**
     * The new video quality exceed the decoder's configured maximum resolution.
     */
    ForceReuseVideoCodecReason["MaxResolutionExceeded"] = "MaxResolutionExceeded";
})(ForceReuseVideoCodecReason || (ForceReuseVideoCodecReason = {}));
//# sourceMappingURL=tweaksConfig.js.map