/**
 * Supported subtitle/caption file formats.
 * @remarks Platform: Android, iOS, tvOS
 */
export var SubtitleFormat;
(function (SubtitleFormat) {
    /**
     * Closed Captioning (CEA) subtitle format.
     * @remarks Platform: Android, iOS, tvOS
     */
    SubtitleFormat["CEA"] = "cea";
    /**
     * Timed Text Markup Language (TTML) subtitle format.
     * @remarks Platform: Android, iOS, tvOS
     */
    SubtitleFormat["TTML"] = "ttml";
    /**
     * Web Video Text Tracks Format (WebVTT) subtitle format.
     * @remarks Platform: Android, iOS, tvOS
     */
    SubtitleFormat["VTT"] = "vtt";
    /**
     * SubRip (SRT) subtitle format.
     * @remarks Platform: Android, iOS, tvOS
     */
    SubtitleFormat["SRT"] = "srt";
})(SubtitleFormat || (SubtitleFormat = {}));
//# sourceMappingURL=subtitleFormat.js.map