import ReactNative from 'react-native';

const { AngelOfflineModule } = ReactNative.NativeModules;

export type OfflineContentMetadata = {
  guid: string;
  url: string;
  title: string;
  duration: number;
  thumbnail: string;
};

export class AngelOfflineVideoModule {
  getOfflineOptionsForContent(
    metadata: OfflineContentMetadata
  ): Promise<{ id: string; title: string }> {
    return AngelOfflineModule.requestOfflineContent(metadata);
  }

  onAppStart() {}

  onAppPause() {
    this.deactivateOfflineContent();
  }

  onAppResume() {
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

  private deactivateOfflineContent() {}

  private activateOfflineContent() {}
}
