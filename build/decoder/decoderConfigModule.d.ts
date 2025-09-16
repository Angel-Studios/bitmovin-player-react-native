export type DecoderConfigModuleEvents = {
    onOverrideDecodersPriority: ({ nativeId, context, preferredDecoders, }: {
        nativeId: string;
        context: any;
        preferredDecoders: any[];
    }) => void;
};
/**
 * Expo-based DecoderConfigModule implementation.
 * Android-only module that gracefully handles iOS by providing no-op implementations.
 */
declare let DecoderConfigModuleInstance: any;
export default DecoderConfigModuleInstance;
//# sourceMappingURL=decoderConfigModule.d.ts.map