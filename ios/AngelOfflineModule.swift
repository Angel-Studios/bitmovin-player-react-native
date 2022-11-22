//
//  AngelOfflineModule.swift
//  Pods
//
//  Created by Matthew Hopkins on 11/21/22.
//

import Foundation
import BitmovinPlayer

// How do we access context like we do in the Kotlin file?
// Do we need ot set up a variable that holds the cacheDir?
// What is the role of companion object in Kotlin?
// What is the equivalent of mutableMapOf in Swift?


@objc(AngelOfflineModule)
class AngelOfflineModule: NSObject, RCTBridgeModule {
    /// React bridge reference.
    @objc var bridge: RCTBridge!
    
    /// JS module name.
    static func moduleName() -> String! {
        "AngelOfflineModule"
    }
    
    /// Module requires main thread initialization.
    static func requiresMainQueueSetup() -> Bool {
        true
    }
    
    static var offlineItems: [String: OfflineItem] = [:]
    static var resolveCache: [String: RCTPromiseResolveBlock] = [:]
    static var rejectCache: [String: RCTPromiseRejectBlock] = [:]
    
    @objc func releaseOfflineManagers(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock){
        AngelOfflineModule.resolveCache = [:]
        AngelOfflineModule.rejectCache = [:]
        resolve(true)
    }
    
    @objc func requestOfflineContent(_ watchable: Any?, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock){
        do {
            let metaData = RCTConvert.createWatchable(watchable);
            
            guard let guid = metaData?.guid else {
                let error = NSError()
                reject("AngelOfflineModule", "Could not find guid", error)
                return
            }
            guard let url = metaData?.url else {
                let error = NSError()
                reject("AngelOfflineModule", "Could not find url", error)
                return
            }
            
            let sourceConfig = SourceConfig(url: URL(string: url)!)
            sourceConfig?.metadata["guid"] = guid
            sourceConfig?.title = metaData?.title
            AngelOfflineModule.resolveCache[guid] = resolve
            AngelOfflineModule.rejectCache[guid] = reject
            
            guard let src = sourceConfig else {
                let error = NSError()
                reject("AngelOfflineModule", "Could not create source config", error)
                return
            }
                
            let offlineManager = OfflineManager.sharedInstance()
            let offlineContentManager = try offlineManager.offlineContentManager(for: src)
            offlineContentManager.add(listener: self)
            let offlineItem = OfflineItem(guid: guid, sourceConfig: src, offlineContentManager: offlineContentManager, progress: 0, offlineTracks: nil)
            
            AngelOfflineModule.offlineItems[guid] = offlineItem
            offlineItem.offlineContentManager.fetchAvailableTracks()
            print("WASABI WILL FETCH TRACKS")

        } catch {
            print("error creating offline content manager \(error)")
        }
    }
    
    @objc func downloadOfflineContent(_ guid: String, selected audioTrackId: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock){
        print("WASABI downloadOfflineContent start")

        let item = AngelOfflineModule.offlineItems[guid]
        guard let offlineItem = item else {
            let error = NSError()
            reject("AngelOfflineModule", "Could not create source config", error)
            
            return
        }
        
        var selection = offlineItem.offlineTracks.map{
            $0.audioTracks.map{
                $0.action = .none
                if (audioTrackId == $0.language){
                    $0.action = .download
                }
            }
            $0.textTracks.map{
                $0.action = .download
            }
            return $0
        }
        
        guard let tracksSelection = selection else {
            let error = NSError()
            reject("AngelOfflineModule", "Could not create tracks selection", error)
            return
        }
        
        let downloadConfig = DownloadConfig()
        let averageBitrateFor720p = 3000 as NSNumber
        downloadConfig.minimumBitrate = averageBitrateFor720p
        offlineItem.offlineContentManager.download(tracks: tracksSelection, downloadConfig: downloadConfig)
    }
    
    @objc func deleteDownloadForContent(_ guid: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock){
   
    }
    
    @objc func suspendDownloadForContent(_ guid: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock){
   
    }
    
    @objc func resumeDownloadForContent(_ guid: String){
   
    }
}

extension AngelOfflineModule: OfflineContentManagerListener {
    func onAvailableTracksFetched(_ event: BitmovinPlayer.AvailableTracksFetchedEvent, offlineContentManager: OfflineContentManager){
        print("WASABI onAvailableTracksFetched start on class")

        let guid = offlineContentManager.sourceConfig.metadata["guid"] as! String
        let resolve = AngelOfflineModule.resolveCache[guid]
        let reject = AngelOfflineModule.rejectCache[guid]!
        let audioTracks = event.tracks.audioTracks.map{
            [ "id": $0.language, "title": $0.label ]
        }
        
        var item = AngelOfflineModule.offlineItems[guid]
        item?.offlineTracks = event.tracks
        AngelOfflineModule.offlineItems[guid] = item
        guard let res = resolve else {
            let error = NSError()
            reject("AngelOfflineModule", "Could not create source config", error)
            return
        }
        res(audioTracks)
    }
    
    func onOfflineError(
        _ event: OfflineErrorEvent,
        offlineContentManager: OfflineContentManager
    ) {
        let errorMessage = event.message
        print("[AngelOfflineModule] Download resulted in error: \(errorMessage)")
    }
    
    func onContentDownloadFinished(
        _ event: ContentDownloadFinishedEvent,
        offlineContentManager: OfflineContentManager
    ) {
        print("[AngelOfflineModule] Download Finished")
    }
    
    func onContentDownloadProgressChanged(
        _ event: ContentDownloadProgressChangedEvent,
        offlineContentManager: OfflineContentManager
    ) {
        print("[AngelOfflineModule] Progress")
    }
    
    func onContentDownloadSuspended(
        _ event: ContentDownloadSuspendedEvent,
        offlineContentManager: OfflineContentManager
    ) {
        print("[AngelOfflineModule] Suspended")
    }
    
    func onContentDownloadResumed(
        _ event: ContentDownloadResumedEvent,
        offlineContentManager: OfflineContentManager
    ) {
        print("[AngelOfflineModule] Resumed")
    }
    
    func onContentDownloadCanceled(
        _ event: ContentDownloadCanceledEvent,
        offlineContentManager: OfflineContentManager
    ) {
        print("[AngelOfflineModule] Canceled")
    }
}
