import { requireNativeModule } from 'expo-modules-core';
import { Platform } from 'react-native';
/**
 * Expo-based DecoderConfigModule implementation.
 * Android-only module that gracefully handles iOS by providing no-op implementations.
 */
let DecoderConfigModuleInstance;
if (Platform.OS === 'android') {
    DecoderConfigModuleInstance = requireNativeModule('DecoderConfigModule');
}
else {
    // iOS graceful fallback - provide no-op implementations
    DecoderConfigModuleInstance = {
        initializeWithConfig: async () => {
            // No-op on iOS
        },
        overrideDecoderPriorityProviderComplete: async () => {
            // No-op on iOS
        },
        destroy: async () => {
            // No-op on iOS
        },
        addListener: () => ({ remove: () => { } }),
        removeListener: () => { },
        removeAllListeners: () => { },
        emit: () => { },
        listenerCount: () => 0,
    };
}
export default DecoderConfigModuleInstance;
//# sourceMappingURL=decoderConfigModule.js.map