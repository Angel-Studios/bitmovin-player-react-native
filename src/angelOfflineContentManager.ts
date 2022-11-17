// export type OfflineContentMetadata = {
//   guid: string;
//   url: string;
//   title: string;
//   duration: number;
//   thumbnail: string;
// };

// export class AngelOfflineContentManager {
//   getOfflineOptionsForContent({
//     guid,
//     url,
//     title,
//     duration,
//     thumbnail,
//   }: OfflineContentMetadata) {
//     /**
//      * store full OfflineContentMetadata, this is the source object that is required for all other operations
//      * optimistically store it.
//      * returns a list of audio languages if multiple are available
//      */
//   }

//   onAppStart() {}

//   onAppPause() {
//     this.deactivateOfflineContent();
//   }

//   onAppResume() {
//     this.activateOfflineContent();
//   }
//   /**
//    * run the progress
//    *
//    */
//   storeContentForOfflineViewing({
//     _guid,
//     _cb,
//   }: {
//     _guid: string;
//     _cd: (progress: number, isComplete: boolean, error?: any) => void;
//   }) {}

//   private deactivateOfflineContent() {}

//   private activateOfflineContent() {}
// }
