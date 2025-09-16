import { NativeModule } from 'expo-modules-core';
export type AudioSessionModuleEvents = Record<string, any>;
declare class AudioSessionModule extends NativeModule<AudioSessionModuleEvents> {
    setCategory(category: string): Promise<void>;
}
declare const _default: AudioSessionModule | null;
export default _default;
//# sourceMappingURL=AudioSessionModule.d.ts.map