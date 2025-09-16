import AudioSessionModule from './modules/AudioSessionModule';
/**
 * An object that communicates to the system how you intend to use audio in your app.
 *
 * @remarks Platform: iOS
 * @see https://developer.apple.com/documentation/avfaudio/avaudiosession
 */
export const AudioSession = {
    /**
     * Sets the audio session's category.
     *
     * @remarks Platform: iOS
     * @see https://developer.apple.com/documentation/avfaudio/avaudiosession/1616583-setcategory
     */
    setCategory: async (category) => {
        if (AudioSessionModule) {
            await AudioSessionModule.setCategory(category);
        }
    },
};
//# sourceMappingURL=audioSession.js.map