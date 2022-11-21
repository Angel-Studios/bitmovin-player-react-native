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

export class AngelOfflineVideoModule {
  private static eventEmitterListenerRef: EmitterSubscription | null = null;

  private static callbacks: Record<string, (event: DwonloadEvent) => void> = {};

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
  static pauseDownload(guid: string): Promise<boolean> {
    return AngelOfflineModule.pauseDownloadForContent(guid);
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
