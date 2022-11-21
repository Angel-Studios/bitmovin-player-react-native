package com.bitmovin.player.reactnative

import android.content.ContextWrapper
import android.util.Log
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

    private val offlineDir =  context.cacheDir

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
    fun releaseOfflineManagers(promise: Promise) {
        try {
            offlineManagers.forEach {
                it.value.offlineContentManager.release()
            }
            promise.resolve(true)
        }
        catch (e: Exception) {
            promise.reject("Angel Offline Module", "failed to release the offline managers: ${e.localizedMessage}")
        }
    }

    /**
     * hydrate content that is already downloaded, should be called on app start and resume
     */
    @ReactMethod
    fun initializeOfflineManagers(watchables: ReadableArray,  promise: Promise) {
        try {
            for (i in 0 until watchables.size()) {
                val item = watchables.getMap(i)
                requestOfflineContent(item, promise)
            }
        }
        catch (e: Exception) {
            promise.reject("Angel Offline Module", "failed to initialize the offline managers: ${e.localizedMessage}")
        }
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
                offlineDir.path, guid, this, context.applicationContext
            )
            offlineManagers[guid] = OfflineItem(guid, source, offlineManager)
            //store Promise, need to wait for async return of available downloadable options
            promiseCache[guid] = promise

            offlineManager.getOptions()
        }
        catch (e: Exception) {
            promise.reject( "Angel Offline Module", "error with requestOfflineContent ${e.localizedMessage}")
        }
    }

    @ReactMethod
    fun downloadOfflineContent(guid: String, audioTrackId: String, promise: Promise) {
        try {
            val offlineManager = offlineManagers[guid]

            //mark users selected audio track for download
            offlineManager?.offlineContentOptions?.audioOptions?.forEach {
                it.action = null
                if(it.id == audioTrackId) {
                    it.action = OfflineOptionEntryAction.Download
                }
            }

            //download all subtitle tracks
            offlineManager?.offlineContentOptions?.textOptions?.forEach {
                it.action = null
                it.action = OfflineOptionEntryAction.Download
            }

            val selectedVideoId = offlineManager?.offlineContentOptions?.videoOptions
                ?.sortedBy { it.bitrate }
                ?.chunked((offlineManager.offlineContentOptions?.videoOptions?.size ?: 1)/2)
                ?.firstOrNull()
                ?.lastOrNull()
                ?.id

            offlineManager?.offlineContentOptions?.videoOptions?.forEach {
                it.action = null
                if(it.id == selectedVideoId) {
                    it.action = OfflineOptionEntryAction.Download
                }
            }

            val optionsRef = offlineManager?.offlineContentOptions
            if(optionsRef != null) {
                offlineManager.offlineContentManager.process(optionsRef)
                offlineManager.offlineContentManager.resume()
                promise.resolve(true)
            }
            else {
                promise.reject("Angel Offline Module", "could not start download of content for $guid")
            }
        }
        catch (e: Exception) {
            promise.reject("Angel Offline Module", "encountered an error trying to download content: ${e.localizedMessage}")
        }
    }

    @ReactMethod
    fun deleteDownloadForContent(guid: String) {
        val manager = offlineManagers[guid]
        manager?.offlineContentManager?.deleteAll()
    }

    @ReactMethod
    fun suspendDownloadForContent(guid: String) {
        val manager = offlineManagers[guid]
        manager?.offlineContentManager?.suspend()
    }

    @ReactMethod
    fun resumeDownloadForContent(guid: String) {
        val manager = offlineManagers[guid]
        manager?.offlineContentManager?.resume()
    }

    override fun onOptionsAvailable(source: SourceConfig?, offlineOptions: OfflineContentOptions?) {
        try {
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
        catch(e: Exception) {
            val guid = source?.metadata?.get("guid")
            val promise = promiseCache[guid]
            promise?.reject("Angel Offline Module", "failed to parse available download options: ${e.localizedMessage}")
        }

    }

    override fun onCompleted(source: SourceConfig?, offlineOptions: OfflineContentOptions?) {
        val guid = source?.metadata?.get("guid")
        Log.d("bitmovin offline", "Guid: $guid -- Complete: true")
        val params = Arguments.createMap().apply {
            putString("guid", guid)
            putString("currentState", "completed")
        }
        context
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("DownloadEvent", params)
    }

    override fun onError(source: SourceConfig?, error: ErrorEvent?) {
        val guid = source?.metadata?.get("guid")
        Log.d("bitmovin offline", "Guid: $guid -- error: ${error?.message}")
        val params = Arguments.createMap().apply {
            putString("guid", guid)
            putString("currentState", "error")
            putString("error", error?.message)
        }
        context
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("DownloadEvent", params)
    }

    override fun onProgress(source: SourceConfig?, progress: Float) {
        val guid = source?.metadata?.get("guid")
        Log.d("bitmovin offline", "Guid: $guid -- Progress: $progress")

        val manager = offlineManagers[guid]
        val oldProgress = manager?.progress
        manager?.progress = progress

        if (oldProgress?.toInt() != progress.toInt()) {
            val params = Arguments.createMap().apply {
                putString("guid", guid)
                putString("currentState", "inProgress")
                putDouble("progress", progress.toDouble())
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
        val guid = source?.metadata?.get("guid")
        Log.d("bitmovin offline", "Guid: $guid -- Suspended: true")
        val params = Arguments.createMap().apply {
            putString("guid", guid)
            putString("currentState", "suspended")
        }
        context
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("DownloadEvent", params)
    }

    override fun onResumed(source: SourceConfig?) {
        val guid = source?.metadata?.get("guid")
        Log.d("bitmovin offline", "Guid: $guid -- Resume: true")
        val params = Arguments.createMap().apply {
            putString("guid", guid)
            putString("currentState", "resumed")
        }
        context
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("DownloadEvent", params)
    }
}

data class OfflineItem(val guid: String, val sourceConfig: SourceConfig, val offlineContentManager: OfflineContentManager) {
    var offlineContentOptions: OfflineContentOptions? = null
    var progress: Float = 0f
}