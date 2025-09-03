import BitmovinPlayer
import ExpoModulesCore

public class PlayerModule: Module {
    // swiftlint:disable:next function_body_length
    public func definition() -> ModuleDefinition {
        Name("PlayerModule")
        OnCreate {}
        OnDestroy {
            // Destroy all players on the main thread when the module is deallocated.
            // This is necessary when the IMA SDK is present in the app,
            // as it may crash if the players are destroyed on a background thread.
            DispatchQueue.main.async {
                PlayerRegistry.getAllPlayers().forEach { $0.destroy() }
                PlayerRegistry.clear()
            }
        }
        AsyncFunction("play") { (nativeId: NativeId) in
            PlayerRegistry.getPlayer(nativeId: nativeId)?.play()
        }.runOnQueue(.main)
        AsyncFunction("pause") { (nativeId: NativeId) in
            PlayerRegistry.getPlayer(nativeId: nativeId)?.pause()
        }.runOnQueue(.main)
        AsyncFunction("mute") { (nativeId: NativeId) in
            PlayerRegistry.getPlayer(nativeId: nativeId)?.mute()
        }.runOnQueue(.main)
        AsyncFunction("unmute") { (nativeId: NativeId) in
            PlayerRegistry.getPlayer(nativeId: nativeId)?.unmute()
        }.runOnQueue(.main)
        AsyncFunction("seek") { (nativeId: NativeId, time: Double) in
            PlayerRegistry.getPlayer(nativeId: nativeId)?.seek(time: time)
        }.runOnQueue(.main)
        AsyncFunction("timeShift") { (nativeId: NativeId, offset: Double) in
            PlayerRegistry.getPlayer(nativeId: nativeId)?.timeShift = offset
        }.runOnQueue(.main)
        AsyncFunction("destroy") { (nativeId: NativeId) in
            if let player = PlayerRegistry.getPlayer(nativeId: nativeId) {
                player.destroy()
                PlayerRegistry.unregister(nativeId: nativeId)
            }
        }.runOnQueue(.main)
        AsyncFunction("setVolume") { (nativeId: NativeId, volume: Int) in
            PlayerRegistry.getPlayer(nativeId: nativeId)?.volume = volume
        }.runOnQueue(.main)
        AsyncFunction("unload") { (nativeId: NativeId) in
            PlayerRegistry.getPlayer(nativeId: nativeId)?.unload()
        }.runOnQueue(.main)
        AsyncFunction("setPlaybackSpeed") { (nativeId: NativeId, playbackSpeed: Float) in
            PlayerRegistry.getPlayer(nativeId: nativeId)?.playbackSpeed = playbackSpeed
        }.runOnQueue(.main)
        AsyncFunction("setMaxSelectableBitrate") { (nativeId: NativeId, maxSelectableBitrate: Int) in
            PlayerRegistry.getPlayer(nativeId: nativeId)?.maxSelectableBitrate = UInt(maxSelectableBitrate)
        }.runOnQueue(.main)
        AsyncFunction("getVolume") { (nativeId: NativeId) -> Int? in
            PlayerRegistry.getPlayer(nativeId: nativeId)?.volume
        }.runOnQueue(.main)
        AsyncFunction("currentTime") { (nativeId: NativeId, mode: String?) -> Double? in
            let player = PlayerRegistry.getPlayer(nativeId: nativeId)
            if let mode {
                return player?.currentTime(RCTConvert.timeMode(mode))
            }
            return player?.currentTime
        }.runOnQueue(.main)
        AsyncFunction("isPlaying") { (nativeId: NativeId) -> Bool? in
            PlayerRegistry.getPlayer(nativeId: nativeId)?.isPlaying
        }.runOnQueue(.main)
        AsyncFunction("isPaused") { (nativeId: NativeId) -> Bool? in
            PlayerRegistry.getPlayer(nativeId: nativeId)?.isPaused
        }.runOnQueue(.main)
        AsyncFunction("duration") { (nativeId: NativeId) -> Double? in
            PlayerRegistry.getPlayer(nativeId: nativeId)?.duration
        }.runOnQueue(.main)
        AsyncFunction("isMuted") { (nativeId: NativeId) -> Bool? in
            PlayerRegistry.getPlayer(nativeId: nativeId)?.isMuted
        }.runOnQueue(.main)
        AsyncFunction("getTimeShift") { (nativeId: NativeId) -> Double? in
            PlayerRegistry.getPlayer(nativeId: nativeId)?.timeShift
        }.runOnQueue(.main)
        AsyncFunction("isLive") { (nativeId: NativeId) -> Bool? in
            PlayerRegistry.getPlayer(nativeId: nativeId)?.isLive
        }.runOnQueue(.main)
        AsyncFunction("getMaxTimeShift") { (nativeId: NativeId) -> Double? in
            PlayerRegistry.getPlayer(nativeId: nativeId)?.maxTimeShift
        }.runOnQueue(.main)
        AsyncFunction("getPlaybackSpeed") { (nativeId: NativeId) -> Float? in
            PlayerRegistry.getPlayer(nativeId: nativeId)?.playbackSpeed
        }.runOnQueue(.main)
        AsyncFunction("isAd") { (nativeId: NativeId) -> Bool? in
            PlayerRegistry.getPlayer(nativeId: nativeId)?.isAd
        }.runOnQueue(.main)
        AsyncFunction("canPlayAtPlaybackSpeed") { (nativeId: NativeId, playbackSpeed: Float) -> Bool? in
            PlayerRegistry.getPlayer(nativeId: nativeId)?.canPlay(atPlaybackSpeed: playbackSpeed)
        }.runOnQueue(.main)
        AsyncFunction("getAudioTrack") { (nativeId: NativeId) -> [String: Any]? in
            RCTConvert.audioTrackJson(PlayerRegistry.getPlayer(nativeId: nativeId)?.audio)
        }.runOnQueue(.main)
        AsyncFunction("getAvailableAudioTracks") { (nativeId: NativeId) -> [[String: Any]] in
            PlayerRegistry.getPlayer(nativeId: nativeId)?
                .availableAudio.compactMap { RCTConvert.audioTrackJson($0) } ?? []
        }.runOnQueue(.main)
        AsyncFunction("setAudioTrack") { (nativeId: NativeId, trackIdentifier: String) in
            PlayerRegistry.getPlayer(nativeId: nativeId)?.setAudio(trackIdentifier: trackIdentifier)
        }.runOnQueue(.main)
        AsyncFunction("getSubtitleTrack") { (nativeId: NativeId) -> [String: Any]? in
            RCTConvert.subtitleTrackJson(PlayerRegistry.getPlayer(nativeId: nativeId)?.subtitle)
        }.runOnQueue(.main)
        AsyncFunction("getAvailableSubtitles") { (nativeId: NativeId) -> [[String: Any]] in
            PlayerRegistry.getPlayer(nativeId: nativeId)?
                .availableSubtitles.compactMap { RCTConvert.subtitleTrackJson($0) } ?? []
        }.runOnQueue(.main)
        AsyncFunction("setSubtitleTrack") { (nativeId: NativeId, trackIdentifier: String?) in
            PlayerRegistry.getPlayer(nativeId: nativeId)?.setSubtitle(trackIdentifier: trackIdentifier)
        }.runOnQueue(.main)

        AsyncFunction("getVideoQuality") { (nativeId: NativeId) -> [String: Any]? in
            RCTConvert.toJson(videoQuality: PlayerRegistry.getPlayer(nativeId: nativeId)?.videoQuality)
        }.runOnQueue(.main)
        AsyncFunction("getAvailableVideoQualities") { (nativeId: NativeId) -> [[String: Any]] in
            PlayerRegistry.getPlayer(nativeId: nativeId)?
                .availableVideoQualities.compactMap { RCTConvert.toJson(videoQuality: $0) } ?? []
        }.runOnQueue(.main)
        AsyncFunction("getThumbnail") { (nativeId: NativeId, time: Double) -> [String: Any]? in
            RCTConvert.toJson(thumbnail: PlayerRegistry.getPlayer(nativeId: nativeId)?.thumbnail(forTime: time))
        }.runOnQueue(.main)
        AsyncFunction("loadOfflineContent") { [weak self] (nativeId: NativeId, bridgeId: String, options: [String: Any]?) in // swiftlint:disable:this line_length
            #if os(iOS)
            guard let player = PlayerRegistry.getPlayer(nativeId: nativeId),
                  let offlineModule = self?.appContext?.moduleRegistry.get(OfflineModule.self),
                  let offlineContentManagerBridge = offlineModule.retrieve(bridgeId) else { return }
            let optionsDictionary = options ?? [:]
            let restrictedToAssetCache = optionsDictionary["restrictedToAssetCache"] as? Bool ?? true
            let offlineSourceConfig = offlineContentManagerBridge.offlineContentManager.createOfflineSourceConfig(
                restrictedToAssetCache: restrictedToAssetCache
            )
            guard let offlineSourceConfig else { return }
            player.load(sourceConfig: offlineSourceConfig)
            #endif
        }.runOnQueue(.main)
        AsyncFunction("scheduleAd") { (nativeId: NativeId, adItemJson: [String: Any]) in
            guard let adItem = RCTConvert.adItem(adItemJson) else { return }
            PlayerRegistry.getPlayer(nativeId: nativeId)?.scheduleAd(adItem: adItem)
        }.runOnQueue(.main)
        AsyncFunction("isAirPlayActive") { (nativeId: NativeId) -> Bool? in
            #if os(iOS)
            PlayerRegistry.getPlayer(nativeId: nativeId)?.isAirPlayActive
            #else
            nil
            #endif
        }.runOnQueue(.main)
        AsyncFunction("isAirPlayAvailable") { (nativeId: NativeId) -> Bool? in
            #if os(iOS)
            PlayerRegistry.getPlayer(nativeId: nativeId)?.allowsAirPlay
            #else
            nil
            #endif
        }.runOnQueue(.main)
        AsyncFunction("isCastAvailable") { (nativeId: NativeId) -> Bool? in
            PlayerRegistry.getPlayer(nativeId: nativeId)?.isCastAvailable
        }.runOnQueue(.main)
        AsyncFunction("isCasting") { (nativeId: NativeId) -> Bool? in
            PlayerRegistry.getPlayer(nativeId: nativeId)?.isCasting
        }.runOnQueue(.main)
        AsyncFunction("castVideo") { (nativeId: NativeId) in
            PlayerRegistry.getPlayer(nativeId: nativeId)?.castVideo()
        }.runOnQueue(.main)
        AsyncFunction("castStop") { (nativeId: NativeId) in
            PlayerRegistry.getPlayer(nativeId: nativeId)?.castStop()
        }.runOnQueue(.main)
        AsyncFunction("skipAd") { (nativeId: NativeId) in
            PlayerRegistry.getPlayer(nativeId: nativeId)?.skipAd()
        }.runOnQueue(.main)
        AsyncFunction(
            "initializeWithConfig"
        ) { [weak self] (nativeId: NativeId, config: [String: Any]?, networkNativeId: NativeId?, _: String?) in // swiftlint:disable:this line_length
            guard !PlayerRegistry.hasPlayer(nativeId: nativeId),
                  let playerConfig = RCTConvert.playerConfig(config) else { return }
            #if os(iOS)
            self?.setupRemoteControlConfig(playerConfig.remoteControlConfig)
            #endif
            if let networkNativeId, let networkConfig = self?.setupNetworkConfig(nativeId: networkNativeId) {
                playerConfig.networkConfig = networkConfig
            }
            let player = PlayerFactory.create(playerConfig: playerConfig)
            PlayerRegistry.register(player: player, nativeId: nativeId)
        }.runOnQueue(.main)
        AsyncFunction(
            "initializeWithAnalyticsConfig"
        ) { [weak self] (nativeId: NativeId, analyticsConfig: [String: Any]?, config: [String: Any]?, networkNativeId: NativeId?, _: String?) in // swiftlint:disable:this line_length
            guard !PlayerRegistry.hasPlayer(nativeId: nativeId),
                  let playerConfig = RCTConvert.playerConfig(config),
                  let analyticsConfig = RCTConvert.analyticsConfig(analyticsConfig) else { return }
            #if os(iOS)
            self?.setupRemoteControlConfig(playerConfig.remoteControlConfig)
            #endif
            if let networkNativeId, let networkConfig = self?.setupNetworkConfig(nativeId: networkNativeId) {
                playerConfig.networkConfig = networkConfig
            }
            let defaultMetadata = RCTConvert.analyticsDefaultMetadataFromAnalyticsConfig(analyticsConfig)
            let player = PlayerFactory.create(
                playerConfig: playerConfig,
                analyticsConfig: analyticsConfig,
                defaultMetadata: defaultMetadata ?? DefaultMetadata()
            )
            PlayerRegistry.register(player: player, nativeId: nativeId)
        }.runOnQueue(.main)
        AsyncFunction("loadSource") { [weak self] (nativeId: NativeId, sourceNativeId: NativeId) in
            guard let player = PlayerRegistry.getPlayer(nativeId: nativeId),
                  let sourceModule = self?.appContext?.moduleRegistry.get(SourceModule.self),
                  let source = sourceModule.retrieve(sourceNativeId) else { return }
            player.load(source: source)
        }.runOnQueue(.main)
    }

    /**
     Loads the given offline source configuration into `nativeId`'s `Player` object.
     - Parameter nativeId: Target player.
     - Parameter offlineContentManagerBridgeId: The `nativeId` of the `OfflineModule` object.
     */
    @objc(loadOfflineContent:offlineContentManagerBridgeId:options:)
    func loadOfflineContent(_ nativeId: NativeId, offlineContentManagerBridgeId: NativeId, options: Any?) {
#if os(iOS)
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            guard let player = self?.players[nativeId],
                  let offlineContentManagerBridge = self?.bridge[OfflineModule.self]?
                .retrieve(offlineContentManagerBridgeId) else {
                return
            }
            let optionsDictionary = options as? [String: Any?] ?? [:]
            let restrictedToAssetCache = optionsDictionary["restrictedToAssetCache"] as? Bool ?? true
            let offlineSourceConfig = offlineContentManagerBridge
                .offlineContentManager
                .createOfflineSourceConfig(restrictedToAssetCache: restrictedToAssetCache)

            guard let offlineSourceConfig else { return }
            player.load(sourceConfig: offlineSourceConfig)
        }
#endif
    }

    /**
     Call `.unload()` on `nativeId`'s player.
     - Parameter nativeId: Target player Id.
     */
    @objc(unload:)
    func unload(_ nativeId: NativeId) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            self?.players[nativeId]?.unload()
        }
    }

    /**
     Call `.play()` on `nativeId`'s player.
     - Parameter nativeId: Target player Id.
     */
    @objc(play:)
    func play(_ nativeId: NativeId) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            self?.players[nativeId]?.play()
        }
    }

    /**
     Call `.pause()` on `nativeId`'s player.
     - Parameter nativeId: Target player Id.
     */
    @objc(pause:)
    func pause(_ nativeId: NativeId) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            self?.players[nativeId]?.pause()
        }
    }

    /**
     Call `.seek(time:)` on `nativeId`'s player.
     - Parameter nativeId: Target player Id.
     - Parameter time: Time to seek in seconds.
     */
    @objc(seek:time:)
    func seek(_ nativeId: NativeId, time: NSNumber) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            self?.players[nativeId]?.seek(time: time.doubleValue)
        }
    }

    /**
     Sets `timeShift` on `nativeId`'s player.
     - Parameter nativeId: Target player Id.
     - Parameter offset: Offset to timeShift to in seconds.
     */
    @objc(timeShift:offset:)
    func timeShift(_ nativeId: NativeId, offset: NSNumber) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            self?.players[nativeId]?.timeShift = offset.doubleValue
        }
    }

    /**
     Call `.mute()` on `nativeId`'s player.
     - Parameter nativeId: Target player Id.
     */
    @objc(mute:)
    func mute(_ nativeId: NativeId) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            self?.players[nativeId]?.mute()
        }
    }

    /**
     Call `.unmute()` on `nativeId`'s player.
     - Parameter nativeId: Target player Id.
     */
    @objc(unmute:)
    func unmute(_ nativeId: NativeId) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            self?.players[nativeId]?.unmute()
        }
    }

    /**
     Call `.destroy()` on `nativeId`'s player.
     - Parameter nativeId: Target player Id.
     */
    @objc(destroy:)
    func destroy(_ nativeId: NativeId) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            if let player = self?.players[nativeId] {
                player.destroy()
                // Remove destroyed player from the players
                self?.players[nativeId] = nil
            }
        }
    }

    /**
     Call `.setVolume(volume:)` on `nativeId`'s player.
     - Parameter nativeId: Target player Id.
     - Parameter volume: Integer representing the volume level (between 0 to 100).
     */
    @objc(setVolume:volume:)
    func setVolume(_ nativeId: NativeId, volume: NSNumber) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            self?.players[nativeId]?.volume = volume.intValue
        }
    }

    /**
     Resolve `nativeId`'s current volume.
     - Parameter nativeId: Target player Id.
     - Parameter resolver: JS promise resolver.
     - Parameter rejecter: JS promise rejecter.
     */
    @objc(getVolume:resolver:rejecter:)
    func getVolume(
        _ nativeId: NativeId,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            resolve(self?.players[nativeId]?.volume)
        }
    }

    /**
     Resolve `nativeId`'s current playback time.
     - Parameter nativeId: Target player Id.
     - Parameter mode: Time mode: either relative or absolute. Can be empty.
     - Parameter resolver: JS promise resolver.
     - Parameter rejecter: JS promise rejecter.
     */
    @objc(currentTime:mode:resolver:rejecter:)
    func currentTime(
        _ nativeId: NativeId,
        mode: String?,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            let player = self?.players[nativeId]
            if let mode {
                resolve(player?.currentTime(RCTConvert.timeMode(mode)))
            } else {
                resolve(player?.currentTime)
            }
        }
    }

    /**
     Resolve `nativeId`'s active source duration.
     - Parameter nativeId: Target player Id.
     - Parameter resolver: JS promise resolver.
     - Parameter rejecter: JS promise rejecter.
     */
    @objc(duration:resolver:rejecter:)
    func duration(
        _ nativeId: NativeId,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            resolve(self?.players[nativeId]?.duration)
        }
    }

    /**
     Resolve `nativeId`'s current muted state.
     - Parameter nativeId: Target player Id.
     - Parameter resolver: JS promise resolver.
     - Parameter rejecter: JS promise rejecter.
     */
    @objc(isMuted:resolver:rejecter:)
    func isMuted(
        _ nativeId: NativeId,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            resolve(self?.players[nativeId]?.isMuted)
        }
    }

    /**
     Resolve `nativeId`'s current playing state.
     - Parameter nativeId: Target player Id.
     - Parameter resolver: JS promise resolver.
     - Parameter rejecter: JS promise rejecter.
     */
    @objc(isPlaying:resolver:rejecter:)
    func isPlaying(
        _ nativeId: NativeId,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            resolve(self?.players[nativeId]?.isPlaying)
        }
    }

    /**
     Resolve `nativeId`'s current paused state.
     - Parameter nativeId: Target player Id.
     - Parameter resolver: JS promise resolver.
     - Parameter rejecter: JS promise rejecter.
     */
    @objc(isPaused:resolver:rejecter:)
    func isPaused(
        _ nativeId: NativeId,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            resolve(self?.players[nativeId]?.isPaused)
        }
    }

    /**
     Resolve `nativeId`'s live streaming state.
     `true` if source is a live streaming.
     - Parameter nativeId: Target player Id.
     - Parameter resolver: JS promise resolver.
     - Parameter rejecter: JS promise rejecter.
     */
    @objc(isLive:resolver:rejecter:)
    func isLive(
        _ nativeId: NativeId,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            resolve(self?.players[nativeId]?.isLive)
        }
    }

    /**
     Resolve `nativeId`'s air play activation state.
     - Parameter nativeId: Target player Id.
     - Parameter resolver: JS promise resolver.
     - Parameter rejecter: JS promise rejecter.
     */
    @objc(isAirPlayActive:resolver:rejecter:)
    func isAirPlayActive(
        _ nativeId: NativeId,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            resolve(self?.players[nativeId]?.isAirPlayActive)
        }
    }

    /**
     Resolve `nativeId`'s air play availability state.
     - Parameter nativeId: Target player Id.
     - Parameter resolver: JS promise resolver.
     - Parameter rejecter: JS promise rejecter.
     */
    @objc(isAirPlayAvailable:resolver:rejecter:)
    func isAirPlayAvailable(
        _ nativeId: NativeId,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            resolve(self?.players[nativeId]?.isAirPlayAvailable)
        }
    }

    /**
     Resolve `nativeId`'s currently selected audio track.
     - Parameter nativeId: Target player Id.
     - Parameter resolver: JS promise resolver.
     - Parameter rejecter: JS promise rejecter.
     */
    @objc(getAudioTrack:resolver:rejecter:)
    func getAudioTrack(
        _ nativeId: NativeId,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            resolve(RCTConvert.audioTrackJson(self?.players[nativeId]?.audio))
        }
    }

    /**
     Resolve `nativeId`'s player available audio tracks.
     - Parameter nativeId: Target player Id.
     - Parameter resolver: JS promise resolver.
     - Parameter rejecter: JS promise rejecter.
     */
    @objc(getAvailableAudioTracks:resolver:rejecter:)
    func getAvailableAudioTracks(
        _ nativeId: NativeId,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            let audioTracksJson = self?.players[nativeId]?.availableAudio.map {
                RCTConvert.audioTrackJson($0)
            }
            resolve(audioTracksJson ?? [])
        }
    }

    /**
     Set `nativeId`'s player audio track.
     - Parameter nativeId: Target player Id.
     - Parameter trackIdentifier: The audio track identifier.
     - Parameter resolver: JS promise resolver.
     - Parameter rejecter: JS promise rejecter.
     */
    @objc(setAudioTrack:trackIdentifier:resolver:rejecter:)
    func setAudioTrack(
        _ nativeId: NativeId,
        trackIdentifier: String,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            self?.players[nativeId]?.setAudio(trackIdentifier: trackIdentifier)
            resolve(nil)
        }
    }

    /**
     Resolve `nativeId`'s currently selected subtitle track.
     - Parameter nativeId: Target player Id.
     - Parameter resolver: JS promise resolver.
     - Parameter rejecter: JS promise rejecter.
     */
    @objc(getSubtitleTrack:resolver:rejecter:)
    func getSubtitleTrack(
        _ nativeId: NativeId,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            resolve(RCTConvert.subtitleTrackJson(self?.players[nativeId]?.subtitle))
        }
    }

    /**
     Resolve `nativeId`'s player available subtitle tracks.
     - Parameter nativeId: Target player Id.
     - Parameter resolver: JS promise resolver.
     - Parameter rejecter: JS promise rejecter.
     */
    @objc(getAvailableSubtitles:resolver:rejecter:)
    func getAvailableSubtitles(
        _ nativeId: NativeId,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            let subtitlesJson = self?.players[nativeId]?.availableSubtitles.map {
                RCTConvert.subtitleTrackJson($0)
            }
            resolve(subtitlesJson ?? [])
        }
    }

    /**
     Set `nativeId`'s player subtitle track.
     - Parameter nativeId: Target player Id.
     - Parameter trackIdentifier: The subtitle track identifier.
     - Parameter resolver: JS promise resolver.
     - Parameter rejecter: JS promise rejecter.
     */
    @objc(setSubtitleTrack:trackIdentifier:resolver:rejecter:)
    func setSubtitleTrack(
        _ nativeId: NativeId,
        trackIdentifier: String?,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            if (trackIdentifier ?? "").isEmpty {
                self?.players[nativeId]?.setSubtitle(trackIdentifier: nil)
            } else {
                self?.players[nativeId]?.setSubtitle(trackIdentifier: trackIdentifier)
            }

            resolve(nil)
        }
    }

    /**
     Schedules an `AdItem` in the `nativeId`'s associated player.
     - Parameter nativeId: Target player id.
     - Parameter adItemJson: Json representation of the `AdItem` to be scheduled.
     */
    @objc(scheduleAd:adItemJson:)
    func scheduleAd(_ nativeId: NativeId, adItemJson: Any?) {
        guard let adItem = RCTConvert.adItem(adItemJson) else {
            return
        }
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            self?.players[nativeId]?.scheduleAd(adItem: adItem)
        }
    }

    /**
     Skips the current ad in `nativeId`'s associated player.
     Has no effect if the current ad is not skippable or if no ad is being played back.
     - Parameter nativeId: Target player id.
     */
    @objc(skipAd:)
    func skipAd(_ nativeId: NativeId) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            self?.players[nativeId]?.skipAd()
        }
    }

    /**
     Returns `true` while an ad is being played back or when main content playback has been paused for ad playback.
     - Parameter nativeId: Target player id.
     - Parameter resolver: JS promise resolver.
     - Parameter rejecter: JS promise rejecter.
     */
    @objc(isAd:resolver:rejecter:)
    func isAd(
        _ nativeId: NativeId,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            resolve(self?.players[nativeId]?.isAd)
        }
    }

    /**
     The current time shift of the live stream in seconds. This value is always 0 if the active `source` is not a
     live stream or there are no sources loaded.
     - Parameter nativeId: Target player id.
     - Parameter resolver: JS promise resolver.
     - Parameter rejecter: JS promise rejecter.
     */
    @objc(getTimeShift:resolver:rejecter:)
    func getTimeShift(
        _ nativeId: NativeId,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            resolve(self?.players[nativeId]?.timeShift)
        }
    }

    /**
     Returns the limit in seconds for time shift. Is either negative or 0. Is applicable for live streams only.
     - Parameter nativeId: Target player id.
     - Parameter resolver: JS promise resolver.
     - Parameter rejecter: JS promise rejecter.
     */
    @objc(getMaxTimeShift:resolver:rejecter:)
    func getMaxTimeShift(
        _ nativeId: NativeId,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            resolve(self?.players[nativeId]?.maxTimeShift)
        }
    }

    /**
     Sets the max selectable bitrate for the player.
     - Parameter nativeId: Target player id.
     - Parameter maxBitrate: The desired max bitrate limit.
     */
    @objc(setMaxSelectableBitrate:maxSelectableBitrate:)
    func setMaxSelectableBitrate(_ nativeId: NativeId, maxSelectableBitrate: NSNumber) {
        let maxSelectableBitrateValue = maxSelectableBitrate.intValue
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            let maxSelectableBitrate = maxSelectableBitrateValue != -1 ? maxSelectableBitrateValue : 0
            self?.players[nativeId]?.maxSelectableBitrate = UInt(maxSelectableBitrate)
        }
    }

    /**
     Returns the thumbnail image for the active `Source` at a certain time.
     - Parameter nativeId: Target player id.
     - Parameter resolver: JS promise resolver.
     - Parameter rejecter: JS promise rejecter.
     */
    @objc(getThumbnail:time:resolver:rejecter:)
    func getThumbnail(
        _ nativeId: NativeId,
        time: NSNumber,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            resolve(RCTConvert.toJson(thumbnail: self?.players[nativeId]?.thumbnail(forTime: time.doubleValue)))
        }
    }

    /**
     Returns `true` if casting to another device (such as a ChromeCast) is available, otherwise false.
     - Parameter nativeId: Target player id.
     - Parameter resolver: JS promise resolver.
     - Parameter rejecter: JS promise rejecter.
     */
    @objc(isCastAvailable:resolver:rejecter:)
    func isCastAvailable(
        _ nativeId: NativeId,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            resolve(self?.players[nativeId]?.isCastAvailable)
        }
    }

    /**
     Returns `true` if the video is currently casted to a device and not played locally,
     or `false` if the video is played locally.
     - Parameter nativeId: Target player id.
     - Parameter resolver: JS promise resolver.
     - Parameter rejecter: JS promise rejecter.
     */
    @objc(isCasting:resolver:rejecter:)
    func isCasting(
        _ nativeId: NativeId,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            resolve(self?.players[nativeId]?.isCasting)
        }
    }

    /**
     Initiates casting the current video to a cast-compatible device.
     The user has to choose to which device it should be sent.
     */
    @objc(castVideo:)
    func castVideo(_ nativeId: NativeId) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            self?.players[nativeId]?.castVideo()
        }
    }

    /**
     Stops casting the current video if it is casting at the moment (i.e. `isCasting` returns `true`).
     Has no effect if `isCasting` returns `false`.
     */
    @objc(castStop:)
    func castStop(_ nativeId: NativeId) {
        bridge.uiManager.addUIBlock { [weak self] _, _ in
            self?.players[nativeId]?.castStop()
        }
    /// This needs to stay stable to maintain compatibility for cross-module access..
    @objc
    public func retrieve(_ nativeId: NativeId) -> Player? {
        PlayerRegistry.getPlayer(nativeId: nativeId)
    }

    private func setupRemoteControlConfig(_ remoteControlConfig: RemoteControlConfig) {
        remoteControlConfig.prepareSource = { [weak self] _, sourceConfig in
            guard let sourceModule = self?.appContext?.moduleRegistry.get(SourceModule.self),
                  let sourceNativeId = sourceModule.nativeId(where: { $0.sourceConfig === sourceConfig }),
                  let castSourceConfig = sourceModule.retrieveCastSourceConfig(sourceNativeId) else {
                return nil
            }

            return castSourceConfig
        }
    }

    private func setupNetworkConfig(nativeId: NativeId) -> NetworkConfig? {
        guard let networkModule = self.appContext?.moduleRegistry.get(NetworkModule.self) else {
            return nil
        }
        return networkModule.retrieve(nativeId)
    }
}
