//
//  AngelOfflineModule.swift
//  Pods
//
//  Created by Matthew Hopkins on 11/21/22.
//

import Foundation
import BitmovinPlayer



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
    
    @objc func releaseOfflineManagers(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock){
   
        
    }
    
    
    @objc func requestOfflineContent(_ watchable: Any?, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock){
   
        
    }
    @objc func downloadOfflineContent(_ guid: String, selected audioTrackId: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock){
   
        
    }
    @objc func deleteDownloadForContent(_ guid: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock){
   
        
    }
    @objc func suspendDownloadForContent(_ guid: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock){
   
        
    }
    @objc func resumeDownloadForContent(_ guid: String){
   
        
    }
    
}
