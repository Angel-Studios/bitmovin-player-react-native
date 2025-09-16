import { DecoderConfig } from './decoderConfig';
import NativeInstance from '../nativeInstance';
/**
 * Takes care of JS/Native communication for a `DecoderConfig`.
 */
export declare class DecoderConfigBridge extends NativeInstance<DecoderConfig> {
    /**
     * Whether this object's native instance has been created.
     */
    isInitialized: boolean;
    /**
     * Whether this object's native instance has been disposed.
     */
    isDestroyed: boolean;
    private onOverrideDecodersPrioritySubscription?;
    initialize(): void;
    /**
     * Destroys the native `DecoderConfig`
     */
    destroy(): void;
    /**
     * Called by native code, when the decoder priority should be evaluated.
     */
    private overrideDecodersPriority;
}
//# sourceMappingURL=index.d.ts.map