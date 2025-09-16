/**
 * Specifies how the video content is scaled or stretched.
 */
export var ScalingMode;
(function (ScalingMode) {
    /**
     * Specifies that the player should preserve the video’s aspect ratio and fit the video within the container's bounds.
     */
    ScalingMode["Fit"] = "Fit";
    /**
     * Specifies that the video should be stretched to fill the container’s bounds. The aspect ratio may not be preserved.
     */
    ScalingMode["Stretch"] = "Stretch";
    /**
     * Specifies that the player should preserve the video’s aspect ratio and fill the container’s bounds.
     */
    ScalingMode["Zoom"] = "Zoom";
})(ScalingMode || (ScalingMode = {}));
/**
 * Indicates which type of UI should be used.
 */
export var UserInterfaceType;
(function (UserInterfaceType) {
    /**
     * Indicates that Bitmovin's customizable UI should be used.
     */
    UserInterfaceType["Bitmovin"] = "Bitmovin";
    /**
     * Indicates that the system UI should be used.
     * @remarks Platform: iOS, tvOS
     */
    UserInterfaceType["System"] = "System";
    /**
     * Indicates that only subtitles should be displayed along with the video content.
     */
    UserInterfaceType["Subtitle"] = "Subtitle";
})(UserInterfaceType || (UserInterfaceType = {}));
//# sourceMappingURL=styleConfig.js.map