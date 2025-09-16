import { FullscreenHandler } from './fullscreenhandler';
/**
 * Takes care of JS/Native communication for a FullscreenHandler.
 */
export declare class FullscreenHandlerBridge {
    readonly nativeId: string;
    fullscreenHandler?: FullscreenHandler;
    isDestroyed: boolean;
    private onEnterFullScreenSubscription?;
    private onExitFullScreenSubscription?;
    constructor(nativeId?: string);
    setFullscreenHandler(fullscreenHandler: FullscreenHandler | undefined): void;
    /**
     * Destroys the native FullscreenHandler
     */
    destroy(): void;
    /**
     * Called by native code, when the UI should enter fullscreen.
     */
    private enterFullscreen;
    /**
     * Called by native code, when the UI should exit fullscreen.
     */
    private exitFullscreen;
}
//# sourceMappingURL=fullscreenhandlerbridge.d.ts.map