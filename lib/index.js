"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AdSourceType: () => AdSourceType,
  AngelOfflineVideoModule: () => AngelOfflineVideoModule,
  Drm: () => Drm,
  LoadingState: () => LoadingState,
  Player: () => Player,
  PlayerView: () => PlayerView,
  ScalingMode: () => ScalingMode,
  Source: () => Source,
  SourceType: () => SourceType,
  SubtitleFormat: () => SubtitleFormat,
  SubtitleView: () => SubtitleView,
  UserInterfaceType: () => UserInterfaceType,
  usePlayer: () => usePlayer
});
module.exports = __toCommonJS(src_exports);

// src/components/PlayerView/index.tsx
var import_react2 = __toESM(require("react"));
var import_react_native3 = require("react-native");

// src/components/PlayerView/native.ts
var import_react_native = require("react-native");
var NativePlayerView = (0, import_react_native.requireNativeComponent)("NativePlayerView");

// src/hooks/useProxy.ts
var import_lodash = __toESM(require("lodash.omit"));
var import_react = require("react");
var import_react_native2 = require("react-native");
function unwrapNativeEvent(event) {
  return (0, import_lodash.default)(event.nativeEvent, ["target"]);
}
function useProxy(viewRef) {
  return (0, import_react.useCallback)(
    (callback) => (event) => {
      const node = event.target._nativeTag;
      if (node === (0, import_react_native2.findNodeHandle)(viewRef.current)) {
        callback?.(unwrapNativeEvent(event));
      }
    },
    [viewRef]
  );
}

// src/components/PlayerView/index.tsx
var styles = import_react_native3.StyleSheet.create({
  baseStyle: {
    alignSelf: "stretch"
  }
});
function dispatch(command, node, playerId) {
  const commandId = import_react_native3.Platform.OS === "android" ? import_react_native3.UIManager.NativePlayerView.Commands[command].toString() : import_react_native3.UIManager.getViewManagerConfig("NativePlayerView").Commands[command];
  import_react_native3.UIManager.dispatchViewManagerCommand(
    node,
    commandId,
    import_react_native3.Platform.select({
      ios: [playerId],
      android: [node, playerId]
    })
  );
}
function PlayerView(props) {
  const nativeView = (0, import_react2.useRef)(null);
  const proxy = useProxy(nativeView);
  const style = import_react_native3.StyleSheet.flatten([styles.baseStyle, props.style]);
  (0, import_react2.useEffect)(() => {
    props.player.initialize();
    const node = (0, import_react_native3.findNodeHandle)(nativeView.current);
    dispatch("attachPlayer", node, props.player.nativeId);
  }, [props.player]);
  return /* @__PURE__ */ import_react2.default.createElement(NativePlayerView, {
    ref: nativeView,
    style,
    disableAdUi: props.disableAdUi,
    onDestroy: proxy(props.onDestroy),
    onEvent: proxy(props.onEvent),
    onMuted: proxy(props.onMuted),
    onPaused: proxy(props.onPaused),
    onPlay: proxy(props.onPlay),
    onPlaybackFinished: proxy(props.onPlaybackFinished),
    onPlayerActive: proxy(props.onPlayerActive),
    onPlayerError: proxy(props.onPlayerError),
    onPlayerWarning: proxy(props.onPlayerWarning),
    onPlaying: proxy(props.onPlaying),
    onReady: proxy(props.onReady),
    onSeek: proxy(props.onSeek),
    onSeeked: proxy(props.onSeeked),
    onStallStarted: proxy(props.onStallStarted),
    onStallEnded: proxy(props.onStallEnded),
    onSourceError: proxy(props.onSourceError),
    onSourceLoad: proxy(props.onSourceLoad),
    onSourceLoaded: proxy(props.onSourceLoaded),
    onSourceUnloaded: proxy(props.onSourceUnloaded),
    onSourceWarning: proxy(props.onSourceWarning),
    onAudioAdded: proxy(props.onAudioAdded),
    onAudioChanged: proxy(props.onAudioChanged),
    onAudioRemoved: proxy(props.onAudioRemoved),
    onSubtitleAdded: proxy(props.onSubtitleAdded),
    onSubtitleChanged: proxy(props.onSubtitleChanged),
    onSubtitleRemoved: proxy(props.onSubtitleRemoved),
    onTimeChanged: proxy(props.onTimeChanged),
    onUnmuted: proxy(props.onUnmuted),
    onVideoPlaybackQualityChanged: proxy(props.onVideoPlaybackQualityChanged),
    onVideoSizeChanged: proxy(props.onVideoSizeChanged),
    onDurationChanged: proxy(props.onDurationChanged),
    onAdStarted: proxy(props.onAdStarted),
    onAdFinished: proxy(props.onAdFinished),
    onAdQuartile: proxy(props.onAdQuartile),
    onAdBreakStarted: proxy(props.onAdBreakStarted),
    onAdBreakFinished: proxy(props.onAdBreakFinished),
    onAdScheduled: proxy(props.onAdScheduled),
    onAdSkipped: proxy(props.onAdSkipped),
    onAdClicked: proxy(props.onAdClicked),
    onAdError: proxy(props.onAdError),
    onAdManifestLoad: proxy(props.onAdManifestLoad),
    onAdManifestLoaded: proxy(props.onAdManifestLoaded)
  });
}

// src/components/SubtitleView/index.tsx
var import_react3 = __toESM(require("react"));
var import_react_native5 = require("react-native");

// src/components/SubtitleView/native.ts
var import_react_native4 = require("react-native");
var NativeSubtitleView = (0, import_react_native4.requireNativeComponent)(
  "BitmovinSubtitleView"
);

// src/components/SubtitleView/index.tsx
var styles2 = import_react_native5.StyleSheet.create({
  baseStyle: {
    alignSelf: "stretch"
  }
});
function SubtitleView(props) {
  const style = import_react_native5.StyleSheet.flatten([styles2.baseStyle, props.style]);
  return import_react_native5.Platform.OS === "android" ? /* @__PURE__ */ import_react3.default.createElement(NativeSubtitleView, {
    style,
    playerId: props?.player?.nativeId
  }) : null;
}

// src/drm/index.ts
var import_react_native7 = require("react-native");
var import_BatchedBridge = __toESM(require("react-native/Libraries/BatchedBridge/BatchedBridge"));

// src/nativeInstance.ts
var import_react_native6 = require("react-native");
var Uuid = import_react_native6.NativeModules.UuidModule;
var NativeInstance = class {
  constructor(config) {
    __publicField(this, "nativeId");
    __publicField(this, "config");
    this.config = config;
    this.nativeId = config?.nativeId ?? Uuid.generate();
  }
};

// src/drm/index.ts
var DrmModule = import_react_native7.NativeModules.DrmModule;
var Drm = class extends NativeInstance {
  constructor() {
    super(...arguments);
    __publicField(this, "isInitialized", false);
    __publicField(this, "isDestroyed", false);
    __publicField(this, "initialize", () => {
      if (!this.isInitialized) {
        import_BatchedBridge.default.registerCallableModule(`DRM-${this.nativeId}`, this);
        DrmModule.initWithConfig(this.nativeId, this.config);
        this.isInitialized = true;
      }
    });
    __publicField(this, "destroy", () => {
      if (!this.isDestroyed) {
        DrmModule.destroy(this.nativeId);
        this.isDestroyed = true;
      }
    });
    __publicField(this, "onPrepareCertificate", (certificate) => {
      if (this.config?.fairplay?.prepareCertificate) {
        DrmModule.setPreparedCertificate(
          this.nativeId,
          this.config?.fairplay?.prepareCertificate?.(certificate)
        );
      }
    });
    __publicField(this, "onPrepareMessage", (message, assetId) => {
      const config = import_react_native7.Platform.OS === "ios" ? this.config?.fairplay : this.config?.widevine;
      if (config && config.prepareMessage) {
        DrmModule.setPreparedMessage(
          this.nativeId,
          import_react_native7.Platform.OS === "ios" ? config.prepareMessage?.(message, assetId) : config.prepareMessage?.(message)
        );
      }
    });
    __publicField(this, "onPrepareSyncMessage", (syncMessage, assetId) => {
      if (this.config?.fairplay?.prepareSyncMessage) {
        DrmModule.setPreparedSyncMessage(
          this.nativeId,
          this.config?.fairplay?.prepareSyncMessage?.(syncMessage, assetId)
        );
      }
    });
    __publicField(this, "onPrepareLicense", (license) => {
      const prepareLicense = import_react_native7.Platform.OS === "ios" ? this.config?.fairplay?.prepareLicense : this.config?.widevine?.prepareLicense;
      if (prepareLicense) {
        DrmModule.setPreparedLicense(this.nativeId, prepareLicense(license));
      }
    });
    __publicField(this, "onPrepareLicenseServerUrl", (licenseServerUrl) => {
      if (this.config?.fairplay?.prepareLicenseServerUrl) {
        DrmModule.setPreparedLicenseServerUrl(
          this.nativeId,
          this.config?.fairplay?.prepareLicenseServerUrl?.(licenseServerUrl)
        );
      }
    });
    __publicField(this, "onPrepareContentId", (contentId) => {
      if (this.config?.fairplay?.prepareContentId) {
        DrmModule.setPreparedContentId(
          this.nativeId,
          this.config?.fairplay?.prepareContentId?.(contentId)
        );
      }
    });
  }
};

// src/events.ts
var AdSourceType = /* @__PURE__ */ ((AdSourceType2) => {
  AdSourceType2["Ima"] = "Ima";
  AdSourceType2["Unknown"] = "Unknown";
  AdSourceType2["Progressive"] = "Progressive";
  return AdSourceType2;
})(AdSourceType || {});

// src/hooks/usePlayer.ts
var import_react4 = require("react");

// src/player.ts
var import_react_native9 = require("react-native");

// src/source.ts
var import_react_native8 = require("react-native");
var SourceModule = import_react_native8.NativeModules.SourceModule;
var SourceType = /* @__PURE__ */ ((SourceType2) => {
  SourceType2["NONE"] = "none";
  SourceType2["HLS"] = "hls";
  SourceType2["DASH"] = "dash";
  SourceType2["PROGRESSIVE"] = "progressive";
  return SourceType2;
})(SourceType || {});
var LoadingState = /* @__PURE__ */ ((LoadingState2) => {
  LoadingState2[LoadingState2["UNLOADED"] = 0] = "UNLOADED";
  LoadingState2[LoadingState2["LOADING"] = 1] = "LOADING";
  LoadingState2[LoadingState2["LOADED"] = 2] = "LOADED";
  return LoadingState2;
})(LoadingState || {});
var Source = class extends NativeInstance {
  constructor() {
    super(...arguments);
    __publicField(this, "drm");
    __publicField(this, "isInitialized", false);
    __publicField(this, "isDestroyed", false);
    __publicField(this, "initialize", () => {
      if (!this.isInitialized) {
        if (this.config?.drmConfig) {
          this.drm = new Drm(this.config.drmConfig);
          this.drm.initialize();
          SourceModule.initWithDrmConfig(
            this.nativeId,
            this.drm.nativeId,
            this.config
          );
        } else {
          SourceModule.initWithConfig(this.nativeId, this.config);
        }
        this.isInitialized = true;
      }
    });
    __publicField(this, "destroy", () => {
      if (!this.isDestroyed) {
        SourceModule.destroy(this.nativeId);
        this.drm?.destroy();
        this.isDestroyed = true;
      }
    });
    __publicField(this, "duration", async () => {
      return SourceModule.duration(this.nativeId);
    });
    __publicField(this, "isActive", async () => {
      return SourceModule.isActive(this.nativeId);
    });
    __publicField(this, "isAttachedToPlayer", async () => {
      return SourceModule.isAttachedToPlayer(this.nativeId);
    });
    __publicField(this, "metadata", async () => {
      return SourceModule.getMetadata(this.nativeId);
    });
    __publicField(this, "setMetadata", (metadata) => {
      SourceModule.setMetadata(this.nativeId, metadata);
    });
    __publicField(this, "loadingState", async () => {
      return SourceModule.loadingState(this.nativeId);
    });
  }
};

// src/player.ts
var PlayerModule = import_react_native9.NativeModules.PlayerModule;
var Player = class extends NativeInstance {
  constructor() {
    super(...arguments);
    __publicField(this, "source");
    __publicField(this, "isInitialized", false);
    __publicField(this, "isDestroyed", false);
    __publicField(this, "initialize", () => {
      if (!this.isInitialized) {
        PlayerModule.initWithConfig(this.nativeId, this.config);
        this.isInitialized = true;
      }
    });
    __publicField(this, "destroy", () => {
      if (!this.isDestroyed) {
        PlayerModule.destroy(this.nativeId);
        this.source?.destroy();
        this.isDestroyed = true;
      }
    });
    __publicField(this, "load", (sourceConfig) => {
      this.loadSource(new Source(sourceConfig));
    });
    __publicField(this, "loadSource", (source) => {
      source.initialize();
      this.source = source;
      PlayerModule.loadSource(this.nativeId, source.nativeId);
    });
    __publicField(this, "unload", () => {
      PlayerModule.unload(this.nativeId);
    });
    __publicField(this, "play", () => {
      PlayerModule.play(this.nativeId);
    });
    __publicField(this, "pause", () => {
      PlayerModule.pause(this.nativeId);
    });
    __publicField(this, "seek", (time) => {
      PlayerModule.seek(this.nativeId, time);
    });
    __publicField(this, "mute", () => {
      PlayerModule.mute(this.nativeId);
    });
    __publicField(this, "unmute", () => {
      PlayerModule.unmute(this.nativeId);
    });
    __publicField(this, "setVolume", (volume) => {
      PlayerModule.setVolume(this.nativeId, volume);
    });
    __publicField(this, "getVolume", async () => {
      return PlayerModule.getVolume(this.nativeId);
    });
    __publicField(this, "setPlaybackSpeed", (speed) => {
      PlayerModule.setPlaybackSpeed(this.nativeId, speed);
    });
    __publicField(this, "getPlaybackSpeed", async () => {
      return PlayerModule.getPlaybackSpeed(this.nativeId);
    });
    __publicField(this, "getCurrentTime", async (mode) => {
      return PlayerModule.currentTime(this.nativeId, mode);
    });
    __publicField(this, "getDuration", async () => {
      return PlayerModule.duration(this.nativeId);
    });
    __publicField(this, "isMuted", async () => {
      return PlayerModule.isMuted(this.nativeId);
    });
    __publicField(this, "isPlaying", async () => {
      return PlayerModule.isPlaying(this.nativeId);
    });
    __publicField(this, "isPaused", async () => {
      return PlayerModule.isPaused(this.nativeId);
    });
    __publicField(this, "isLive", async () => {
      return PlayerModule.isLive(this.nativeId);
    });
    __publicField(this, "isAirPlayActive", async () => {
      if (import_react_native9.Platform.OS === "android") {
        console.warn(
          `[Player ${this.nativeId}] Method isAirPlayActive is not available for Android. Only iOS devices.`
        );
        return false;
      }
      return PlayerModule.isAirPlayActive(this.nativeId);
    });
    __publicField(this, "isAirPlayAvailable", async () => {
      if (import_react_native9.Platform.OS === "android") {
        console.warn(
          `[Player ${this.nativeId}] Method isAirPlayAvailable is not available for Android. Only iOS devices.`
        );
        return false;
      }
      return PlayerModule.isAirPlayAvailable(this.nativeId);
    });
    __publicField(this, "getAvailableAudioTracks", async () => {
      return PlayerModule.getAvailableAudioTracks(this.nativeId);
    });
    __publicField(this, "setAudioTrack", async (trackIdentifier) => {
      PlayerModule.setAudioTrack(this.nativeId, trackIdentifier);
    });
    __publicField(this, "getAvailableSubtitles", async () => {
      return PlayerModule.getAvailableSubtitles(this.nativeId);
    });
    __publicField(this, "setSubtitleTrack", async (trackIdentifier) => {
      PlayerModule.setSubtitleTrack(this.nativeId, trackIdentifier);
    });
    __publicField(this, "skipAd", async () => {
      PlayerModule.skipAd(this.nativeId);
    });
  }
};

// src/hooks/usePlayer.ts
function usePlayer(config) {
  return (0, import_react4.useRef)(new Player(config)).current;
}

// src/subtitleTrack.ts
var SubtitleFormat = /* @__PURE__ */ ((SubtitleFormat2) => {
  SubtitleFormat2["CEA"] = "cea";
  SubtitleFormat2["TTML"] = "ttml";
  SubtitleFormat2["VTT"] = "vtt";
  return SubtitleFormat2;
})(SubtitleFormat || {});

// src/styleConfig.ts
var UserInterfaceType = /* @__PURE__ */ ((UserInterfaceType2) => {
  UserInterfaceType2["bitmovin"] = "bitmovin";
  UserInterfaceType2["system"] = "system";
  UserInterfaceType2["subtitle"] = "subtitle";
  return UserInterfaceType2;
})(UserInterfaceType || {});
var ScalingMode = /* @__PURE__ */ ((ScalingMode2) => {
  ScalingMode2["Fit"] = "Fit";
  ScalingMode2["Stretch"] = "Stretch";
  ScalingMode2["Zoom"] = "Zoom";
  return ScalingMode2;
})(ScalingMode || {});

// src/angelOfflineVideoModule.ts
var import_react_native10 = require("react-native");
var AngelOfflineModule = import_react_native10.NativeModules.AngelOfflineModule;
var AngelOfflineVideoModule = class {
  static startEventListeners() {
    const eventEmitter = new import_react_native10.NativeEventEmitter(import_react_native10.NativeModules.ToastExample);
    this.eventEmitterListenerRef = eventEmitter.addListener(
      "DownloadEvent",
      (event) => this.callbacks[event.guid](event)
    );
  }
  static stopEventListeners() {
    this.eventEmitterListenerRef?.remove();
  }
  static getOfflineOptionsForContent(metadata) {
    return AngelOfflineModule.requestOfflineContent(metadata);
  }
  static downloadContentForOfflineViewing(guid, audioTrackId, cb) {
    this.callbacks[guid] = cb;
    return AngelOfflineModule.downloadOfflineContent(guid, audioTrackId);
  }
  static onAppStart() {
  }
  static onAppPause() {
    this.deactivateOfflineContent();
  }
  static onAppResume() {
    this.activateOfflineContent();
  }
  static deactivateOfflineContent() {
  }
  static activateOfflineContent() {
  }
};
__publicField(AngelOfflineVideoModule, "eventEmitterListenerRef", null);
__publicField(AngelOfflineVideoModule, "callbacks", {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AdSourceType,
  AngelOfflineVideoModule,
  Drm,
  LoadingState,
  Player,
  PlayerView,
  ScalingMode,
  Source,
  SourceType,
  SubtitleFormat,
  SubtitleView,
  UserInterfaceType,
  usePlayer
});
