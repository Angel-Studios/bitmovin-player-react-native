package com.bitmovin.player.reactnative

import android.util.TypedValue
import com.bitmovin.player.SubtitleView
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class RNSubtitleViewManager(private val context: ReactApplicationContext) : SimpleViewManager<SubtitleView>() {

    /**
     * Exported module name to JS.
     */
    override fun getName() = "BitmovinSubtitleView"

    /**
     * The component's native view factory. RN calls this method multiple times
     * for each component instance.
     */
    override fun createViewInstance(reactContext: ThemedReactContext) = SubtitleView(context)

    @ReactProp(name = "playerId" )
    fun setPlayerId(view: SubtitleView, playerId: String?) {
        val player = context.getNativeModule(PlayerModule::class.java)?.getPlayer(playerId)
        if (player != null) {
            view.setPlayer(player)
        }
    }

    /**
     * Sets whether font sizes embedded within the cues should be applied.
     * Enabled by default.
     * Only takes effect if setApplyEmbeddedStyles is set to true.
     */
    @ReactProp(name = "applyEmbeddedFontSizes", defaultBoolean = true )
    fun setApplyEmbeddedFontSizes(view: SubtitleView, applyEmbeddedFontSizes: Boolean) {
        view.setApplyEmbeddedFontSizes(applyEmbeddedFontSizes)
    }

    /**
     * Sets whether styling embedded within the cues should be applied.
     * Enabled by default.
     * Overrides any setting made with setApplyEmbeddedFontSizes.
     */
    @ReactProp(name = "applyEmbeddedStyles", defaultBoolean = true )
    fun setApplyEmbeddedStyles(view: SubtitleView, applyEmbeddedStyles: Boolean) {
        view.setApplyEmbeddedStyles(applyEmbeddedStyles)
    }

    /**
     * Sets the bottom padding fraction to apply when getLine is DIMEN_UNSET, as a fraction of the view's remaining height after its top and bottom padding have been subtracted.
     */
    @ReactProp(name = "bottomPaddingFraction", defaultFloat = -1.0f )
    fun setBottomPaddingFraction(view: SubtitleView, bottomPaddingFraction: Float) {
        if (bottomPaddingFraction > 0) {
            view.setBottomPaddingFraction(bottomPaddingFraction)
        }
    }

    /**
     * Set the text size to a given unit and value.
     */
    @ReactProp(name = "fixedTextSize" )
    fun setFixedTextSize(view: SubtitleView, fixedTextSize: ReadableMap?) {
        if (fixedTextSize != null && fixedTextSize.hasKey("size")) {
            val size = fixedTextSize.getDouble("size")
            val unit = fixedSizeUnit(fixedTextSize)
            if (size > 0) {
                view.setFixedTextSize(unit, size.toFloat())
            }

        }
    }

    /**
     * Sets the text size to be a fraction of the height of this view.
     * When `ignorePadding` is true, sets the text size to be a fraction of the views remaining height after its top and bottom padding have been subtracted.
     */
    @ReactProp(name = "fractionalTextSize" )
    fun setFractionalTextSize(view: SubtitleView, fractionalTextSize: ReadableMap?) {
        if (fractionalTextSize != null && fractionalTextSize.hasKey("fractionOfHeight")) {
            val fractionOfHeight = fractionalTextSize.getDouble("fractionOfHeight")
            if (fractionOfHeight > -1) {
                if (fractionalTextSize.hasKey("ignorePadding")) {
                    val ignorePadding = fractionalTextSize.getBoolean("ignorePadding")
                    view.setFractionalTextSize(fractionOfHeight.toFloat(), ignorePadding)
                } else {
                    view.setFractionalTextSize(fractionOfHeight.toFloat())
                }
            }
        }
    }

    private fun fixedSizeUnit(fixedTextSize: ReadableMap): Int {
        if (!fixedTextSize.hasKey("unit") || fixedTextSize.getString("unit").isNullOrEmpty()) {
            return TypedValue.COMPLEX_UNIT_SP
        }

        return when(fixedTextSize.getString("unit")) {
            "COMPLEX_UNIT_PX" -> TypedValue.COMPLEX_UNIT_PX
            "COMPLEX_UNIT_DIP" -> TypedValue.COMPLEX_UNIT_DIP
            "COMPLEX_UNIT_SP" -> TypedValue.COMPLEX_UNIT_SP
            "COMPLEX_UNIT_PT" -> TypedValue.COMPLEX_UNIT_PT
            "COMPLEX_UNIT_IN" -> TypedValue.COMPLEX_UNIT_IN
            "COMPLEX_UNIT_MM" -> TypedValue.COMPLEX_UNIT_MM
            else -> TypedValue.COMPLEX_UNIT_SP
        }
    }

}
