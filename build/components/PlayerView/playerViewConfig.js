export class Variant {
    uiManagerFactoryFunction;
    /**
     * Specifies the function name that will be used to initialize the `UIManager`
     * for the Bitmovin Player Web UI.
     *
     * The function is called on the `window` object with the `Player` as the first argument and
     * the `UIConfig` as the second argument.
     *
     * Example:
     * When you added a new function or want to use a different function of our `UIFactory`,
     * you can specify the full qualifier name including namespaces.
     * e.g. `bitmovin.playerui.UIFactory.buildDefaultSmallScreenUI` for the SmallScreenUi.
     * @see UIFactory https://github.com/bitmovin/bitmovin-player-ui/blob/develop/src/ts/uifactory.ts#L60
     *
     * Notes:
     * - It's not necessary to use our `UIFactory`. Any static function can be specified.
     */
    constructor(uiManagerFactoryFunction) {
        this.uiManagerFactoryFunction = uiManagerFactoryFunction;
    }
}
export class SmallScreenUi extends Variant {
    constructor() {
        super('bitmovin.playerui.UIFactory.buildDefaultSmallScreenUI');
    }
}
export class TvUi extends Variant {
    constructor() {
        super('bitmovin.playerui.UIFactory.buildDefaultTvUI');
    }
}
export class CustomUi extends Variant {
}
/**
 * The type of surface on which to render video.
 *
 * See {@link https://developer.android.com/guide/topics/media/ui/playerview#surfacetype|Choosing a surface type}
 * for more information.
 */
export var SurfaceType;
(function (SurfaceType) {
    /**
     * SurfaceView generally causes lower battery consumption,
     * and has better handling for HDR and secure content.
     */
    SurfaceType["SurfaceView"] = "SurfaceView";
    /** TextureView is sometime needed for smooth animations. */
    SurfaceType["TextureView"] = "TextureView";
})(SurfaceType || (SurfaceType = {}));
//# sourceMappingURL=playerViewConfig.js.map