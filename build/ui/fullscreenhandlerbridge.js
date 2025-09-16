import * as Crypto from 'expo-crypto';
import FullscreenHandlerModule from './fullscreenHandlerModule';
/**
 * Takes care of JS/Native communication for a FullscreenHandler.
 */
export class FullscreenHandlerBridge {
    nativeId;
    fullscreenHandler;
    isDestroyed;
    onEnterFullScreenSubscription;
    onExitFullScreenSubscription;
    constructor(nativeId) {
        this.nativeId = nativeId ?? Crypto.randomUUID();
        this.isDestroyed = false;
        this.onEnterFullScreenSubscription = FullscreenHandlerModule.addListener('onEnterFullscreen', ({ nativeId, id }) => {
            if (nativeId !== this.nativeId) {
                return;
            }
            this.enterFullscreen(id);
        });
        this.onExitFullScreenSubscription = FullscreenHandlerModule.addListener('onExitFullscreen', ({ nativeId, id }) => {
            if (nativeId !== this.nativeId) {
                return;
            }
            this.exitFullscreen(id);
        });
        FullscreenHandlerModule.registerHandler(this.nativeId);
    }
    setFullscreenHandler(fullscreenHandler) {
        if (this.fullscreenHandler === fullscreenHandler) {
            return;
        }
        this.fullscreenHandler = fullscreenHandler;
        // synchronize current state from fullscreenHandler to native
        FullscreenHandlerModule.setIsFullscreenActive(this.nativeId, fullscreenHandler?.isFullscreenActive ?? false);
    }
    /**
     * Destroys the native FullscreenHandler
     */
    destroy() {
        if (!this.isDestroyed) {
            FullscreenHandlerModule.destroy(this.nativeId);
            this.onEnterFullScreenSubscription?.remove();
            this.onExitFullScreenSubscription?.remove();
            this.onEnterFullScreenSubscription = undefined;
            this.onExitFullScreenSubscription = undefined;
            this.isDestroyed = true;
        }
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * Called by native code, when the UI should enter fullscreen.
     */
    enterFullscreen(id) {
        this.fullscreenHandler?.enterFullscreen();
        FullscreenHandlerModule.notifyFullscreenChanged(id, this.fullscreenHandler?.isFullscreenActive ?? false);
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * Called by native code, when the UI should exit fullscreen.
     */
    exitFullscreen(id) {
        this.fullscreenHandler?.exitFullscreen();
        FullscreenHandlerModule.notifyFullscreenChanged(id, this.fullscreenHandler?.isFullscreenActive ?? false);
    }
}
//# sourceMappingURL=fullscreenhandlerbridge.js.map