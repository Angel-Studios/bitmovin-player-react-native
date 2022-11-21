//
//  RCTConvert+AngelOfflineModule.swift
//  Pods
//
//  Created by Matthew Hopkins on 11/21/22.
//

import Foundation

struct Watchable:Codable {
    var guid: String
    var url: String
    var title: String
}

extension RCTConvert {
    /**
     Utility method to instantiate a `PlayerConfig` from a JS object.
     - Parameter json: JS object
     - Returns: The produced `Playerconfig` object
     */
    static func createWatchable(_ json: Any?) -> Watchable? {
        let watchable = Watchable()
        guard let json = json as? [String: Any?] else {
            return playerConfig
        }
        if let licenseKey = json["licenseKey"] as? String {
            playerConfig.key = licenseKey
        }
        if let playbackConfig = RCTConvert.playbackConfig(json["playbackConfig"]) {
            playerConfig.playbackConfig = playbackConfig
        }
        if let styleConfig = RCTConvert.styleConfig(json["styleConfig"]) {
            playerConfig.styleConfig = styleConfig
        }
        if let tweaksConfig = RCTConvert.tweaksConfig(json["tweaksConfig"]) {
            playerConfig.tweaksConfig = tweaksConfig
        }
        if let tempAdConfig = RCTConvert.tempAngelAdConfig(json["tempAngelAdConfig"]) {
            playerConfig.advertisingConfig = tempAdConfig
        }
        return playerConfig
    }
}
