import NativeInstance from '../nativeInstance';
import { HttpRequestType, HttpRequest, HttpResponse, NetworkConfig } from './networkConfig';
export { HttpRequestType, HttpRequest, HttpResponse, NetworkConfig };
/**
 * Represents a native Network configuration object.
 * @internal
 */
export declare class Network extends NativeInstance<NetworkConfig> {
    /**
     * Whether this object's native instance has been created.
     */
    isInitialized: boolean;
    /**
     * Whether this object's native instance has been disposed.
     */
    isDestroyed: boolean;
    private onPreprocessHttpRequestSubscription?;
    private onPreprocessHttpResponseSubscription?;
    /**
     * Allocates the Network config instance and its resources natively.
     */
    initialize: () => Promise<void>;
    /**
     * Destroys the native Network config and releases all of its allocated resources.
     */
    destroy: () => Promise<void>;
    /**
     * Applies the user-defined `preprocessHttpRequest` function to native's `type` and `request` data and store
     * the result back in `NetworkModule`.
     *
     * Called from native code when `NetworkConfig.preprocessHttpRequest` is dispatched.
     *
     * @param requestId Passed through to identify the completion handler of the request on native.
     * @param type Type of the request to be made.
     * @param request The HTTP request to process.
     */
    private onPreprocessHttpRequest;
    /**
     * Applies the user-defined `preprocessHttpResponse` function to native's `type` and `response` data and store
     * the result back in `NetworkModule`.
     *
     * Called from native code when `NetworkConfig.preprocessHttpResponse` is dispatched.
     *
     * @param responseId Passed through to identify the completion handler of the response on native.
     * @param type Type of the request to be made.
     * @param response The HTTP response to process.
     */
    private onPreprocessHttpResponse;
}
//# sourceMappingURL=index.d.ts.map