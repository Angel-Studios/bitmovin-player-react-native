package com.bitmovin.player.reactnative

import com.bitmovin.player.api.deficiency.ErrorEvent
import com.bitmovin.player.api.offline.OfflineContentManager
import com.bitmovin.player.api.offline.OfflineContentManagerListener
import com.bitmovin.player.api.offline.OfflineSourceConfig
import com.bitmovin.player.api.offline.options.OfflineContentOptions
import com.bitmovin.player.api.offline.options.OfflineOptionEntryAction
import com.bitmovin.player.api.source.SourceConfig
import com.bitmovin.player.api.source.SourceType
import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.modules.core.DeviceEventManagerModule

@ReactModule(name = AngelOfflineModule.name)
class AngelOfflineModule(private val context: ReactApplicationContext): ReactContextBaseJavaModule(context),
    OfflineContentManagerListener {

    private val cacheDir = context.cacheDir

    override fun getName() = AngelOfflineModule.name

    companion object {
        /**
         * JS exported module name.
         */
        const val name = "AngelOfflineModule"

        /**
         * Map of offline content managers that are keyed by the GUID of a hydra watchable
         */
        private val offlineManagers = mutableMapOf<String, OfflineItem>()
        private val promiseCache = mutableMapOf<String, Promise>()

        fun getOfflineSourceConfig(guid: String): OfflineSourceConfig? {
            return offlineManagers[guid]?.offlineContentManager?.offlineSourceConfig
        }
    }

    /**
     * Release the memory held by the offline managers, should be called on app pause
     */
    @ReactMethod
    fun destroy() {
        offlineManagers.forEach {
            it.value.offlineContentManager.release()
        }
    }

    /**
     * hydrate content that is already downloaded, should be called on app start and resume
     */
    @ReactMethod
    fun hydrateOfflineContentOptions(watchables: ReadableArray,  promise: Promise) {
        // TBD
    }

    @ReactMethod
    fun requestOfflineContent(watchable: ReadableMap, promise: Promise) {
        try {
            val url = watchable.getString("url")
            val guid = watchable.getString("guid")
            if(url.isNullOrBlank() || guid.isNullOrBlank()) {
                promise.reject("Bitmovin", "url or guid not provided")
                return
            }

            val source = SourceConfig(
                url,
                SourceType.Hls
            )
            source.title = watchable.getString("title")
            source.metadata = mapOf("guid" to guid)
            val offlineManager = OfflineContentManager.getOfflineContentManager(
                source,
                cacheDir.path, guid, this, context
            )
            offlineManagers[guid] = OfflineItem(guid, source, offlineManager)
            //store Promise, need to wait for async return of available downloadable options
            promiseCache[guid] = promise

            offlineManager.getOptions()
        }
        catch (e: Exception) {
            promise.reject("requestOfflineContent", e.localizedMessage)
        }
    }

    @ReactMethod
    fun downloadOfflineContent(guid: String, audioTrackId: String, promise: Promise) {
        try {
            val offlineManager = offlineManagers[guid]

            //mark users selected audio track for download
            offlineManager?.offlineContentOptions?.audioOptions?.forEach {
                if(it.id == audioTrackId) {
                    it.action = OfflineOptionEntryAction.Download
                }
            }

            //download all subtitle tracks
            offlineManager?.offlineContentOptions?.textOptions?.forEach {
                it.action = OfflineOptionEntryAction.Download
            }

            val selectedVideoId = offlineManager?.offlineContentOptions?.videoOptions
                ?.sortedBy { it.bitrate }
                ?.chunked(offlineManager.offlineContentOptions?.videoOptions?.size ?: 1)
                ?.firstOrNull()
                ?.lastOrNull()
                ?.id

            offlineManager?.offlineContentOptions?.videoOptions?.forEach {
                if(it.id == selectedVideoId)
                it.action = OfflineOptionEntryAction.Download
            }

            val optionsRef = offlineManager?.offlineContentOptions
            if(optionsRef != null) {
                offlineManager.offlineContentManager.process(optionsRef)
                promise.resolve(true)
            }
            else {
                promise.reject("offline video", "could not start download of content for $guid")
            }
        }
        catch (e: Exception) {
            promise.reject("offline video", "encountered an error trying to download content")
        }
    }

    override fun onOptionsAvailable(source: SourceConfig?, offlineOptions: OfflineContentOptions?) {
        val guid = source?.metadata?.get("guid")
        val promise = promiseCache[guid]
        val output = Arguments.createArray()
        offlineOptions?.audioOptions?.forEach {
            val map = Arguments.createMap()
            if(it.id != null) {
                map.putString("title", it.id!!.replace("aud:", ""))
                map.putString("id", it.id!!)

            }
            output.pushMap(map)
        }

        offlineManagers[guid]?.offlineContentOptions = offlineOptions
        promise?.resolve(output)
    }

    override fun onCompleted(source: SourceConfig?, offlineOptions: OfflineContentOptions?) {
        TODO("Not yet implemented")
    }

    override fun onError(source: SourceConfig?, error: ErrorEvent?) {
        TODO("Not yet implemented")
    }

    override fun onProgress(source: SourceConfig?, progress: Float) {
        val guid = source?.metadata?.get("guid")
        val manager = offlineManagers[guid]
        val oldProgress = manager?.progress
        manager?.progress = progress

        if (oldProgress?.toInt() != progress.toInt()) {
            val params = Arguments.createMap().apply {
                putString("guid", guid)
                putDouble("progress", progress.toDouble())
                putBoolean("isComplete", progress == 1F)
            }
            context
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("DownloadEvent", params)
        }
    }

    override fun onDrmLicenseUpdated(source: SourceConfig?) {
        // TBD
    }

    override fun onSuspended(source: SourceConfig?) {
        TODO("Not yet implemented")
    }

    override fun onResumed(source: SourceConfig?) {
        TODO("Not yet implemented")
    }
}

data class OfflineItem(val guid: String, val sourceConfig: SourceConfig, val offlineContentManager: OfflineContentManager) {
    var offlineContentOptions: OfflineContentOptions? = null
    var progress: Float = 0f
}