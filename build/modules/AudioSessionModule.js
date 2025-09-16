import { requireNativeModule } from 'expo-modules-core';
import { Platform } from 'react-native';
// iOS-only module
export default Platform.OS === 'ios'
    ? requireNativeModule('AudioSessionModule')
    : null;
//# sourceMappingURL=AudioSessionModule.js.map