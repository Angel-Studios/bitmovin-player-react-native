//
//  RCTConvert+AngelOfflineModule.swift
//  Pods
//
//  Created by Matthew Hopkins on 11/21/22.
//

import Foundation
import BitmovinPlayer

struct Watchable:Codable {
    var guid: String
    var url: String
    var title: String
}

struct OfflineItem {
    var guid: String
    var sourceConfig: SourceConfig
    var offlineContentManager: OfflineContentManager
    var progress: Int
    var offlineTracks: OfflineTrackSelection?
}

extension RCTConvert {
    static func createWatchable(_ json: Any?) -> Watchable? {
        guard let json = json as? [String: Any?] else {
            return nil
        }
        do {
            return Watchable(guid: json["guid"] as! String, url: json["url"] as! String, title: json["title"] as! String)
        } catch {
            print(error)
        }
    }
}
