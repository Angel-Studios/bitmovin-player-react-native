package com.bitmovin.player.reactnative

import com.bitmovin.player.api.deficiency.ErrorEvent
import com.bitmovin.player.api.offline.OfflineContentManager
import com.bitmovin.player.api.offline.OfflineContentManagerListener
import com.bitmovin.player.api.offline.OfflineSourceConfig
import com.bitmovin.player.api.offline.options.OfflineContentOptions
import com.bitmovin.player.api.source.SourceConfig
import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = AngelOfflineModule.name)
class AngelOfflineModule(private val context: ReactApplicationContext): ReactContextBaseJavaModule(context),
    OfflineContentManagerListener {

    private val cacheDir = context.cacheDir
    private val retryOfflinePlayback = true

    override fun getName() = AngelOfflineModule.name

    companion object {
        /**
         * JS exported module name.
         */
        const val name = "AngelOfflineModule"

        /**
         * Map of offline content managers that are keyed by the GUID of a hydra watachable
         */
        private val offlineManagers = mutableMapOf<String, OfflineContentManager>()
        private val promiseCache = mutableMapOf<String, Promise>()

        fun getOfflineSourceConfig(guid: String): OfflineSourceConfig? {
            return offlineManagers[guid]?.offlineSourceConfig
        }
    }

    // Release the memory held by the offline managers, should be called on app pause
    @ReactMethod
    fun destroy() {
        offlineManagers.forEach {
            it.value.release()
        }
    }

    // hydrate content that is already downloaded, should be called on app start and resume
    @ReactMethod
    fun hydrateOfflineContentOptions(watchables: ReadableArray,  promise: Promise) {

    }

    //requestOfflineContent(hydraWatchable, cb: (List<opt, id>) => void) //
    fun requestOfflineContent(watchable: ReadableMap, promise: Promise) {
        watchable.getString("url")
        val guid = watchable.getString("guid")
        //store Promise, need to wait for async return of available downloadable options
        guid?.let { promiseCache[it] = promise }

    }

    override fun onCompleted(source: SourceConfig?, offlineOptions: OfflineContentOptions?) {
        TODO("Not yet implemented")
    }

    override fun onError(source: SourceConfig?, error: ErrorEvent?) {
        TODO("Not yet implemented")
    }

    override fun onProgress(source: SourceConfig?, progress: Float) {
        TODO("Not yet implemented")
    }

    override fun onOptionsAvailable(source: SourceConfig?, offlineOptions: OfflineContentOptions?) {
        TODO("Not yet implemented")
    }

    override fun onDrmLicenseUpdated(source: SourceConfig?) {
        TODO("Not yet implemented")
    }

    override fun onSuspended(source: SourceConfig?) {
        TODO("Not yet implemented")
    }

    override fun onResumed(source: SourceConfig?) {
        TODO("Not yet implemented")
    }
}

data class ListItem(val sourceConfig: SourceConfig, val offlineContentManager: OfflineContentManager) {
    var offlineContentOptions: OfflineContentOptions? = null
    var progress: Float = 0f
}