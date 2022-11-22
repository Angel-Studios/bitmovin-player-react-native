//
//  AngelOfflineModule.m
//  Pods
//
//  Created by Matthew Hopkins on 11/21/22.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_REMAP_MODULE(AngelOfflineModule, AngelOfflineModule, NSObject)

RCT_EXTERN_METHOD(initWithConfig:(NSString *)nativeId config:(nullable id)config)
RCT_EXTERN_METHOD(destroy:(NSString *)nativeId)
RCT_EXTERN_METHOD(releaseOfflineManagers:(RCTPromiseResolveBlock)resolve                                            rejecter:(RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(requestOfflineContent:(NSDictionary *)watchable
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(downloadOfflineContent:(NSString *)guid
                  selected:(NSString *)audioTrackId
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )


@end

