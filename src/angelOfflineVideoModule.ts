import { NativeModules } from 'react-native';

const AngelOfflineModule = NativeModules.AngelOfflineModule;

export type OfflineContentMetadata = {
  guid: string;
  url: string;
  title: string;
};

export class AngelOfflineVideoModule {
  static getOfflineOptionsForContent(
    metadata: OfflineContentMetadata
  ): Promise<{ id: string; title: string }> {
    return AngelOfflineModule.requestOfflineContent(metadata);
  }

  // static downloadContentForOfflineViewing(
  //   guid: string,
  //   audioTrackId: string,
  //   cb: (progress: number, isComplete: boolean, error: any) => void
  // ) {}

  // static pauseContentDownload(guid: string) {}

  // static resumeContentDownload(guid: string) {}

  static onAppStart() {}

  static onAppPause() {
    this.deactivateOfflineContent();
  }

  static onAppResume() {
    this.activateOfflineContent();
  }
  /**
   * run the progress
   *
   */
  //   storeContentForOfflineViewing({
  //     _guid,
  //     _cb,
  //   }: {
  //     _guid: string;
  //     _cb: (progress: number, isComplete: boolean, error?: any) => void;
  //   }) {}

  private static deactivateOfflineContent() {}

  private static activateOfflineContent() {}
}
