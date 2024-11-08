package com.bitmovin.player.reactnative.extensions

import com.bitmovin.player.reactnative.DrmModule
import com.bitmovin.player.reactnative.NetworkModule
import com.bitmovin.player.reactnative.OfflineModule
import com.bitmovin.player.reactnative.PlayerModule
import com.bitmovin.player.reactnative.SourceModule
import com.bitmovin.player.reactnative.ui.CustomMessageHandlerModule
import com.facebook.react.bridge.*
import com.facebook.react.uimanager.UIManagerModule

inline fun <reified T : ReactContextBaseJavaModule> ReactContext.getModule(): T? {
    return getNativeModule(T::class.java)
}

val ReactContext.playerModule get() = getModule<PlayerModule>()
val ReactContext.sourceModule get() = getModule<SourceModule>()
val ReactContext.offlineModule get() = getModule<OfflineModule>()
val ReactContext.uiManagerModule get() = getModule<UIManagerModule>()
val ReactContext.drmModule get() = getModule<DrmModule>()
val ReactContext.customMessageHandlerModule get() = getModule<CustomMessageHandlerModule>()
val ReactContext.networkModule get() = getModule<NetworkModule>()
