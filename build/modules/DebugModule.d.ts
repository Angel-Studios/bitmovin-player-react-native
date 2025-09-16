import { NativeModule } from 'expo-modules-core';
export type DebugModuleEvents = Record<string, any>;
declare class DebugModule extends NativeModule<DebugModuleEvents> {
    setDebugLoggingEnabled(enabled: boolean): Promise<void>;
}
declare const _default: DebugModule;
export default _default;
//# sourceMappingURL=DebugModule.d.ts.map