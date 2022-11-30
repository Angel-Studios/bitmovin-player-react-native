import {
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';

const AngelOfflineModule = NativeModules.AngelOfflineModule;

export type OfflineContentMetadata = {
  guid: string;
  url: string;
  title: string;
};

export type DwonloadEvent = {
  guid: string;
  currentState: 'completed' | 'suspended' | 'resumed' | 'error' | 'inProgress';
  progress: number;
  error?: string;
};

type AsyncStorageTypeRef = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  mergeItem: (key: string, value: string) => Promise<void>;
  clear: () => Promise<void>;
  getAllKeys: () => Promise<readonly string[]>;
  flushGetRequests: () => void;
  multiGet: (
    keys: readonly string[]
  ) => Promise<readonly [string, string | null][]>;
  multiSet: (keyValuePairs: [string, string][]) => Promise<void>;
  multiRemove: (keys: readonly string[]) => Promise<void>;
  multiMerge: (keyValuePairs: [string, string][]) => Promise<void>;
};

const listOfContentStorageKey = 'bitmovinOfflineContentMetadata';

export class AngelOfflineVideoModule {
  /**
   * Reference to React Native Async Storage
   */
  private static asyncStorageRef: AsyncStorageTypeRef | null = null;

  /**
   * React native event listener reference
   */
  private static eventEmitterListenerRef: EmitterSubscription | null = null;

  /**
   * callback references for updating UI state for a given content keyed on GUID
   */
  private static callbacks: Record<string, (event: DwonloadEvent) => void> = {};

  static setAsyncStorageInstance(async: AsyncStorageTypeRef) {
    this.asyncStorageRef = async;
  }

  /**
   * when entering UI that manages downloads start the event listener
   */
  static startEventListeners() {
    const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
    this.eventEmitterListenerRef = eventEmitter.addListener(
      'DownloadEvent',
      (event: DwonloadEvent) => this.callbacks[event.guid](event)
    );
  }

  /**
   * when leaving a download managing view, stop the listeners
   */
  static stopEventListeners() {
    this.callbacks = {};
    this.eventEmitterListenerRef?.remove();
  }

  static listAvailableOfflineContent(): Promise<Array<OfflineContentMetadata>> {
    if (this.asyncStorageRef) {
      return this.asyncStorageRef
        .getItem(listOfContentStorageKey)
        .then((v) => (v ? JSON.parse(v) : []))
        .catch((e) =>
          Promise.reject(`failed to parse offline content metadata ${e}`)
        );
    } else {
      return Promise.reject('Async storage reference not found');
    }
  }

  /**
   *  start by calling this function to get a list of available languages for download, video quality is automatically selected, and all subtitle tracks are automatically downloaded
   */
  static getOfflineOptionsForContent(
    metadata: OfflineContentMetadata
  ): Promise<[{ id: string; title: string }]> {
    return AngelOfflineModule.requestOfflineContent(metadata);
  }

  /**
   * downloads a given audio track (implicitly downloading related video and subtitles tracks)
   */
  static downloadContentForOfflineViewing(
    guid: string,
    audioTrackId: string,
    cb: (event: DwonloadEvent) => void
  ) {
    this.callbacks[guid] = cb;
    return AngelOfflineModule.downloadOfflineContent(guid, audioTrackId);
  }

  /**
   * Resume content download for given content guid
   */
  static resumeDownload(guid: string): Promise<boolean> {
    return AngelOfflineModule.resumeDownloadForContent(guid);
  }

  /**
   * pause content download for given content guid
   */
  static suspendDownload(guid: string): Promise<boolean> {
    return AngelOfflineModule.suspendDownloadForContent(guid);
  }

  /**
   * delete content download for given content guid
   */
  static deleteDownload(guid: string): Promise<boolean> {
    return AngelOfflineModule.deleteDownloadForContent(guid);
  }

  /**
   * call on app start and resume. Initializes the native objects needed to operate offline playback
   */
  static onAppStart(
    storedMetadata: Array<OfflineContentMetadata>
  ): Promise<boolean> {
    return AngelOfflineModule.initializeOfflineManagers(storedMetadata);
  }

  static onAppPause(): Promise<boolean> {
    return AngelOfflineModule.releaseOfflineManagers();
  }
}
