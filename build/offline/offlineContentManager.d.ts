import NativeInstance from '../nativeInstance';
import { OfflineContentManagerListener } from './offlineContentManagerListener';
import { OfflineContentConfig } from './offlineContentConfig';
import { OfflineDownloadRequest } from './offlineDownloadRequest';
import { OfflineState } from './offlineState';
/**
 * Provides the means to download and store sources locally that can be played back with a Player
 * without an active network connection. An OfflineContentManager instance can be created via
 * the constructor and will be idle until initialized.
 *
 * @remarks Platform: Android, iOS
 */
export declare class OfflineContentManager extends NativeInstance<OfflineContentConfig> {
    isInitialized: boolean;
    isDestroyed: boolean;
    private eventSubscription?;
    private listeners;
    private drm?;
    /**
     * Allocates the native `OfflineManager` instance and its resources natively.
     * Registers the `DeviceEventEmitter` listener to receive data from the native `OfflineContentManagerListener` callbacks
     */
    initialize: () => Promise<void>;
    /**
     * Adds a listener to the receive data from the native `OfflineContentManagerListener` callbacks
     * Returns a function that removes this listener from the `OfflineContentManager` that registered it.
     */
    addListener: (listener: OfflineContentManagerListener) => (() => void);
    /**
     * Destroys the native `OfflineManager` and releases all of its allocated resources.
     */
    destroy: () => Promise<void>;
    /**
     * Gets the current state of the `OfflineContentManager`
     */
    state: () => Promise<OfflineState>;
    /**
     * Loads the current `OfflineContentOptions`.
     * When the options are loaded the data will be passed to the `OfflineContentManagerListener.onOptionsAvailable`.
     */
    getOptions: () => Promise<void>;
    /**
     * Enqueues downloads according to the `OfflineDownloadRequest`.
     * The promise will reject in the event of null or invalid request parameters.
     * The promise will reject when calling this method when download has already started or is completed.
     * The promise will resolve when the download has been queued. The download will is not finished when the promise resolves.
     */
    download: (request: OfflineDownloadRequest) => Promise<void>;
    /**
     * Resumes all suspended actions.
     */
    resume: () => Promise<void>;
    /**
     * Suspends all active actions.
     */
    suspend: () => Promise<void>;
    /**
     * Cancels and deletes the active download.
     */
    cancelDownload: () => Promise<void>;
    /**
     * Resolves how many bytes of storage are used by the offline content.
     */
    usedStorage: () => Promise<number>;
    /**
     * Deletes everything related to the related content ID.
     */
    deleteAll: () => Promise<void>;
    /**
     * Downloads the offline license.
     * When finished successfully, data will be passed to the `OfflineContentManagerListener.onDrmLicenseUpdated`.
     * Errors are transmitted to the `OfflineContentManagerListener.onError`.
     */
    downloadLicense: () => Promise<void>;
    /**
     * Releases the currently held offline license.
     * When finished successfully data will be passed to the `OfflineContentManagerListener.onDrmLicenseUpdated`.
     * Errors are transmitted to the `OfflineContentManagerListener.onError`.
     *
     * @remarks Platform: Android
     */
    releaseLicense: () => Promise<void>;
    /**
     * Renews the already downloaded DRM license.
     * When finished successfully data will be passed to the `OfflineContentManagerListener.onDrmLicenseUpdated`.
     * Errors are transmitted to the `OfflineContentManagerListener.onError`.
     */
    renewOfflineLicense: () => Promise<void>;
}
//# sourceMappingURL=offlineContentManager.d.ts.map