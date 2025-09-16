import { Platform } from 'react-native';
import NativeInstance from '../nativeInstance';
import DrmModule from './drmModule';
/**
 * Represents a native DRM configuration object.
 * @internal
 */
export class Drm extends NativeInstance {
    /**
     * Whether this object's native instance has been created.
     */
    isInitialized = false;
    /**
     * Whether this object's native instance has been disposed.
     */
    isDestroyed = false;
    eventSubscriptions = [];
    /**
     * Allocates the DRM config instance and its resources natively.
     */
    initialize = async () => {
        if (!this.isInitialized) {
            // Set up event listeners for DRM preparation callbacks
            this.setupEventListeners();
            // Create native configuration object using Expo module.
            if (this.config) {
                await DrmModule.initializeWithConfig(this.nativeId, this.config);
            }
            this.isInitialized = true;
        }
    };
    /**
     * Destroys the native DRM config and releases all of its allocated resources.
     */
    destroy = async () => {
        if (!this.isDestroyed) {
            await DrmModule.destroy(this.nativeId);
            // Clean up event subscriptions
            this.eventSubscriptions.forEach((subscription) => subscription.remove());
            this.eventSubscriptions = [];
            this.isDestroyed = true;
        }
    };
    /**
     * Sets up event listeners for all DRM preparation callbacks
     */
    setupEventListeners() {
        // iOS-only events
        this.eventSubscriptions.push(DrmModule.addListener('onPrepareCertificate', ({ nativeId, id, certificate }) => {
            if (nativeId !== this.nativeId)
                return;
            this.onPrepareCertificate(id, certificate);
        }));
        this.eventSubscriptions.push(DrmModule.addListener('onPrepareSyncMessage', ({ nativeId, id, syncMessage, assetId }) => {
            if (nativeId !== this.nativeId)
                return;
            this.onPrepareSyncMessage(id, syncMessage, assetId);
        }));
        this.eventSubscriptions.push(DrmModule.addListener('onPrepareLicenseServerUrl', ({ nativeId, id, licenseServerUrl }) => {
            if (nativeId !== this.nativeId)
                return;
            this.onPrepareLicenseServerUrl(id, licenseServerUrl);
        }));
        this.eventSubscriptions.push(DrmModule.addListener('onPrepareContentId', ({ nativeId, id, contentId }) => {
            if (nativeId !== this.nativeId)
                return;
            this.onPrepareContentId(id, contentId);
        }));
        // Cross-platform events
        this.eventSubscriptions.push(DrmModule.addListener('onPrepareMessage', ({ nativeId, id, data, message, assetId }) => {
            if (nativeId !== this.nativeId)
                return;
            // Android sends 'data', iOS sends 'message'
            this.onPrepareMessage(id, data || message, assetId);
        }));
        this.eventSubscriptions.push(DrmModule.addListener('onPrepareLicense', ({ nativeId, id, data, license }) => {
            if (nativeId !== this.nativeId)
                return;
            // Android sends 'data', iOS sends 'license'
            this.onPrepareLicense(id, data || license);
        }));
    }
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
    onPrepareCertificate = (id, certificate) => {
        if (this.config?.fairplay?.prepareCertificate) {
            const result = this.config?.fairplay?.prepareCertificate?.(certificate);
            DrmModule.setPreparedCertificate(id, result);
        }
    };
    /**
     * Applies the user-defined `prepareMessage` function to native's `message` data and store
     * the result back in `DrmModule`.
     *
     * Called from native code when `prepareMessage` is dispatched.
     *
     * @param message - Base64 encoded message data.
     * @param assetId - Optional asset ID. Only sent by iOS.
     */
    onPrepareMessage = (id, message, assetId) => {
        if (!message) {
            DrmModule.setPreparedMessage(id, undefined);
            return;
        }
        const config = Platform.OS === 'ios' ? this.config?.fairplay : this.config?.widevine;
        if (config && config.prepareMessage) {
            const result = Platform.OS === 'ios'
                ? config.prepareMessage?.(message, assetId)
                : config.prepareMessage?.(message);
            DrmModule.setPreparedMessage(id, result);
        }
    };
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
    onPrepareSyncMessage = (id, syncMessage, assetId) => {
        if (this.config?.fairplay?.prepareSyncMessage) {
            const result = this.config?.fairplay?.prepareSyncMessage?.(syncMessage, assetId);
            DrmModule.setPreparedSyncMessage(id, result);
        }
    };
    /**
     * Applies the user-defined `prepareLicense` function to native's `license` data and store
     * the result back in `DrmModule`.
     *
     * Called from native code when `prepareLicense` is dispatched.
     *
     * @param license - Base64 encoded license data.
     */
    onPrepareLicense = (id, license) => {
        if (!license) {
            DrmModule.setPreparedLicense(id, undefined);
            return;
        }
        const prepareLicense = Platform.OS === 'ios'
            ? this.config?.fairplay?.prepareLicense
            : this.config?.widevine?.prepareLicense;
        if (prepareLicense) {
            DrmModule.setPreparedLicense(id, prepareLicense(license));
        }
    };
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
    onPrepareLicenseServerUrl = (id, licenseServerUrl) => {
        if (this.config?.fairplay?.prepareLicenseServerUrl) {
            const result = this.config?.fairplay?.prepareLicenseServerUrl?.(licenseServerUrl);
            DrmModule.setPreparedLicenseServerUrl(id, result);
        }
    };
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
    onPrepareContentId = (id, contentId) => {
        console.log('onPrepareContentId', contentId);
        if (this.config?.fairplay?.prepareContentId) {
            const result = this.config?.fairplay?.prepareContentId?.(contentId);
            DrmModule.setPreparedContentId(id, result);
        }
    };
}
//# sourceMappingURL=index.js.map