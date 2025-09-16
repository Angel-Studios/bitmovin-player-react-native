import NativeInstance from '../nativeInstance';
import DecoderConfigModule from './decoderConfigModule';
/**
 * Takes care of JS/Native communication for a `DecoderConfig`.
 */
export class DecoderConfigBridge extends NativeInstance {
    /**
     * Whether this object's native instance has been created.
     */
    isInitialized = false;
    /**
     * Whether this object's native instance has been disposed.
     */
    isDestroyed = false;
    onOverrideDecodersPrioritySubscription;
    initialize() {
        if (!this.isInitialized) {
            // Set up event listener for decoder priority override
            this.onOverrideDecodersPrioritySubscription =
                DecoderConfigModule.addListener('onOverrideDecodersPriority', ({ nativeId, context, preferredDecoders, }) => {
                    if (nativeId !== this.nativeId) {
                        return;
                    }
                    this.overrideDecodersPriority(context, preferredDecoders);
                });
            // Create native configuration object.
            DecoderConfigModule.initializeWithConfig(this.nativeId, this.config || {});
            this.isInitialized = true;
        }
    }
    /**
     * Destroys the native `DecoderConfig`
     */
    destroy() {
        if (!this.isDestroyed) {
            DecoderConfigModule.destroy(this.nativeId);
            this.onOverrideDecodersPrioritySubscription?.remove();
            this.onOverrideDecodersPrioritySubscription = undefined;
            this.isDestroyed = true;
        }
    }
    /**
     * Called by native code, when the decoder priority should be evaluated.
     */
    overrideDecodersPriority(context, preferredDecoders) {
        const orderedPriority = this.config?.decoderPriorityProvider?.overrideDecodersPriority(context, preferredDecoders) ?? preferredDecoders;
        DecoderConfigModule.overrideDecoderPriorityProviderComplete(this.nativeId, orderedPriority);
    }
}
//# sourceMappingURL=index.js.map