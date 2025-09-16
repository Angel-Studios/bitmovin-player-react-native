import { NativeModule } from 'expo-modules-core';
export type BitmovinCastManagerModuleEvents = Record<string, any>;
declare class BitmovinCastManagerModule extends NativeModule<BitmovinCastManagerModuleEvents> {
    isInitialized(): Promise<boolean>;
    initializeCastManager(options?: Record<string, any>): Promise<void>;
    sendMessage(message: string, messageNamespace?: string): Promise<void>;
    updateContext?(): Promise<void>;
}
declare const _default: BitmovinCastManagerModule;
export default _default;
//# sourceMappingURL=BitmovinCastManagerModule.d.ts.map