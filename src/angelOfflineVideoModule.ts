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
  progress: number;
  isComplete: boolean;
  error?: any;
};

export class AngelOfflineVideoModule {
  private static eventEmitterListenerRef: EmitterSubscription | null = null;

  private static callbacks: Record<string, (event: DwonloadEvent) => void> = {};

  static startEventListeners() {
    const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
    this.eventEmitterListenerRef = eventEmitter.addListener(
      'DownloadEvent',
      (event: DwonloadEvent) => this.callbacks[event.guid](event)
    );
  }

  static stopEventListeners() {
    this.eventEmitterListenerRef?.remove();
  }

  static getOfflineOptionsForContent(
    metadata: OfflineContentMetadata
  ): Promise<[{ id: string; title: string }]> {
    return AngelOfflineModule.requestOfflineContent(metadata);
  }

  static downloadContentForOfflineViewing(
    guid: string,
    audioTrackId: string,
    cb: (event: DwonloadEvent) => void
  ) {
    this.callbacks[guid] = cb;
    return AngelOfflineModule.downloadOfflineContent(guid, audioTrackId);
  }

  // static pauseContentDownload(guid: string) {}

  // static resumeContentDownload(guid: string) {}

  static onAppStart() {}

  static onAppPause() {
    this.deactivateOfflineContent();
  }

  static onAppResume() {
    this.activateOfflineContent();
  }

  private static deactivateOfflineContent() {}

  private static activateOfflineContent() {}
}
