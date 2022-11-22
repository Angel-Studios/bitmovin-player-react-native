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
    static func createWatchable(_ json: Any?) -> Watchable? {
        guard let json = json as? [String: Any?] else {
            return nil
        }
        do {
            var watchable = try Watchable(from: <#Decoder#>)
            if let guid = json["guid"] as? String {
                watchable.guid = guid
            }
            if let url = json["url"] as? String {
                watchable.url = url
            }
            if let title = json["title"] as? String {
                watchable.title = title
            }
            return watchable
        } catch {
            print(error)
        }
    }
}
