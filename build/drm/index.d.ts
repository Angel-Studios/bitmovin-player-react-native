import NativeInstance, { NativeInstanceConfig } from '../nativeInstance';
import { FairplayConfig } from './fairplayConfig';
import { WidevineConfig } from './widevineConfig';
export { FairplayConfig, WidevineConfig };
/**
 * Represents the general Streaming DRM config.
 */
export interface DrmConfig extends NativeInstanceConfig {
    /**
     * FairPlay specific configuration.
     *
     * @remarks Platform: iOS
     */
    fairplay?: FairplayConfig;
    /**
     * Widevine specific configuration.
     *
     * @remarks Platform: Android, iOS (only for casting).
     */
    widevine?: WidevineConfig;
}
/**
 * Represents a native DRM configuration object.
 * @internal
 */
export declare class Drm extends NativeInstance<DrmConfig> {
    /**
     * Whether this object's native instance has been created.
     */
    isInitialized: boolean;
    /**
     * Whether this object's native instance has been disposed.
     */
    isDestroyed: boolean;
    private eventSubscriptions;
    /**
     * Allocates the DRM config instance and its resources natively.
     */
    initialize: () => Promise<void>;
    /**
     * Destroys the native DRM config and releases all of its allocated resources.
     */
    destroy: () => Promise<void>;
    /**
     * Sets up event listeners for all DRM preparation callbacks
     */
    private setupEventListeners;
    /**
     * iOS only.
     *
     * Applies the user-defined `prepareCertificate` function to native's `certificate` data and store
     * the result back in `DrmModule`.
     *
     * Called from native code when `FairplayConfig.prepareCertificate` is dispatched.
     *
     * @param certificate - Base64 encoded certificate data.
     */
    private onPrepareCertificate;
    /**
     * Applies the user-defined `prepareMessage` function to native's `message` data and store
     * the result back in `DrmModule`.
     *
     * Called from native code when `prepareMessage` is dispatched.
     *
     * @param message - Base64 encoded message data.
     * @param assetId - Optional asset ID. Only sent by iOS.
     */
    private onPrepareMessage;
    /**
     * iOS only.
     *
     * Applies the user-defined `prepareSyncMessage` function to native's `syncMessage` data and
     * store the result back in `DrmModule`.
     *
     * Called from native code when `FairplayConfig.prepareSyncMessage` is dispatched.
     *
     * @param syncMessage - Base64 encoded sync SPC message data.
     */
    private onPrepareSyncMessage;
    /**
     * Applies the user-defined `prepareLicense` function to native's `license` data and store
     * the result back in `DrmModule`.
     *
     * Called from native code when `prepareLicense` is dispatched.
     *
     * @param license - Base64 encoded license data.
     */
    private onPrepareLicense;
    /**
     * iOS only.
     *
     * Applies the user-defined `prepareLicenseServerUrl` function to native's `licenseServerUrl` data
     * and store the result back in `DrmModule`.
     *
     * Called from native code when `FairplayConfig.prepareLicenseServerUrl` is dispatched.
     *
     * @param licenseServerUrl - The license server URL string.
     */
    private onPrepareLicenseServerUrl;
    /**
     * iOS only.
     *
     * Applies the user-defined `prepareContentId` function to native's `contentId` string
     * and store the result back in `DrmModule`.
     *
     * Called from native code when `FairplayConfig.prepareContentId` is dispatched.
     *
     * @param contentId - The extracted contentId string.
     */
    private onPrepareContentId;
}
//# sourceMappingURL=index.d.ts.map