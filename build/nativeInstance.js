import * as Crypto from 'expo-crypto';
export default class NativeInstance {
    /**
     * Optionally user-defined string `id` for the native instance, or UUIDv4.
     */
    nativeId;
    /**
     * The configuration object used to initialize this instance.
     */
    config;
    /**
     * Generate UUID in case the user-defined `nativeId` is empty.
     */
    constructor(config) {
        this.config = config;
        this.nativeId = config?.nativeId ?? Crypto.randomUUID();
    }
}
//# sourceMappingURL=nativeInstance.js.map