package com.bitmovin.player.reactnative.ui

import android.app.Activity
import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi
import com.bitmovin.player.api.Player
import com.bitmovin.player.ui.DefaultPictureInPictureHandler

private const val TAG = "RNPiPHandler"

class RNPictureInPictureHandler(
    activity: Activity,
    player: Player,
) : DefaultPictureInPictureHandler(activity, player) {
    // Current PiP implementation on the native side requires playerView.exitPictureInPicture() to be called
    // for `PictureInPictureExit` event to be emitted.
    // Additionally, the event is only emitted if `isPictureInPicture` is true. At the point in time we call
    // playerView.exitPictureInPicture() the activity will already have exited the PiP mode,
    // and thus the event won't be emitted. To work around this we keep track of the PiP state ourselves.
    private var _isPictureInPicture = false

    override val isPictureInPicture: Boolean
        get() = _isPictureInPicture

    @RequiresApi(Build.VERSION_CODES.O)
    override fun enterPictureInPicture() {
        if (!isPictureInPictureAvailable) {
            Log.w(TAG, "Calling enterPictureInPicture without PiP support.")
            return
        }

        _isPictureInPicture = true
    }

    override fun exitPictureInPicture() {
        super.exitPictureInPicture()
        _isPictureInPicture = false
    }
}
