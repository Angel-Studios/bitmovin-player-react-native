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
            print("AngelOfflineModule WILL FETCH TRACKS")

        } catch {
            print("error creating offline content manager \(error)")
        }
    }
    
    @objc func downloadOfflineContent(_ guid: String, selected audioTrackId: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock){
        print("AngelOfflineModule downloadOfflineContent start")

        let item = AngelOfflineModule.offlineItems[guid]
        guard let offlineItem = item else {
            let error = NSError()
            reject("AngelOfflineModule", "Could not create source config", error)
            return
        }
        
        let audioTracks = (offlineItem.offlineTracks?.audioTracks.map {
            $0.action = .none
            if (audioTrackId == $0.language){
                $0.action = .download
                print("[AngelOfflineModule] set \($0.language) for download")
            }
            return $0
        })!
        
        let textTracks = (offlineItem.offlineTracks?.textTracks.map {
            $0.action = .none
            print("[AngelOfflineModule] set subtitle \($0.language) for download")
            return $0
        })!
        
        let selection = OfflineTrackSelection._create(textTracks: textTracks, audioTracks: audioTracks)
        
        let downloadConfig = DownloadConfig()
        let averageBitrateFor720p = 825_000 as NSNumber
        downloadConfig.minimumBitrate = averageBitrateFor720p
        offlineItem.offlineContentManager.download(tracks: selection, downloadConfig: downloadConfig)
        
        switch(offlineItem.offlineContentManager.offlineState) {
        case .canceling: print("[AngelOfflineModule] cancelling")
            break
        case .downloaded: print("[AngelOfflineModule] downloaded")
            break
        case .downloading: print("[AngelOfflineModule] downloading")
            break
        case .suspended: print("[AngelOfflineModule] suspended")
            break
        case .notDownloaded: print("[AngelOfflineModule] notDownloaded")
            break
        }
    }
    
    @objc func deleteDownloadForContent(_ guid: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock){
   
    }
    
    @objc func suspendDownloadForContent(_ guid: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock){
   
    }
    
    @objc func resumeDownloadForContent(_ guid: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock){
   
    }
}

extension AngelOfflineModule: OfflineContentManagerListener {
    func onAvailableTracksFetched(_ event: BitmovinPlayer.AvailableTracksFetchedEvent, offlineContentManager: OfflineContentManager){
        print("[AngelOfflineModule] onAvailableTracksFetched start on extension")

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
