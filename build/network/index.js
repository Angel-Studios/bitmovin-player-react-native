import NativeInstance from '../nativeInstance';
import NetworkModule from './networkModule';
import { HttpRequestType, } from './networkConfig';
export { HttpRequestType };
/**
 * Represents a native Network configuration object.
 * @internal
 */
export class Network extends NativeInstance {
    /**
     * Whether this object's native instance has been created.
     */
    isInitialized = false;
    /**
     * Whether this object's native instance has been disposed.
     */
    isDestroyed = false;
    onPreprocessHttpRequestSubscription;
    onPreprocessHttpResponseSubscription;
    /**
     * Allocates the Network config instance and its resources natively.
     */
    initialize = async () => {
        if (!this.isInitialized) {
            console.log('Initializing Network config:', this.nativeId);
            // Set up event listeners for HTTP request/response preprocessing
            this.onPreprocessHttpRequestSubscription = NetworkModule.addListener('onPreprocessHttpRequest', ({ nativeId, requestId, type, request }) => {
                console.log(`Received HTTP Request [${type}]:`, request);
                if (nativeId !== this.nativeId) {
                    return;
                }
                this.onPreprocessHttpRequest(requestId, type, request);
            });
            this.onPreprocessHttpResponseSubscription = NetworkModule.addListener('onPreprocessHttpResponse', ({ nativeId, responseId, type, response }) => {
                console.log(`Received HTTP Response [${type}]:`, response);
                if (nativeId !== this.nativeId) {
                    return;
                }
                this.onPreprocessHttpResponse(responseId, type, response);
            });
            // Create native configuration object using Expo module
            if (this.config) {
                await NetworkModule.initializeWithConfig(this.nativeId, this.config);
            }
            this.isInitialized = true;
        }
    };
    /**
     * Destroys the native Network config and releases all of its allocated resources.
     */
    destroy = async () => {
        if (!this.isDestroyed) {
            await NetworkModule.destroy(this.nativeId);
            this.onPreprocessHttpRequestSubscription?.remove();
            this.onPreprocessHttpResponseSubscription?.remove();
            this.onPreprocessHttpRequestSubscription = undefined;
            this.onPreprocessHttpResponseSubscription = undefined;
            this.isDestroyed = true;
        }
    };
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
    onPreprocessHttpRequest = (requestId, type, request) => {
        this.config
            ?.preprocessHttpRequest?.(type, request)
            .then((resultRequest) => {
            NetworkModule.setPreprocessedHttpRequest(requestId, resultRequest);
        })
            .catch(() => {
            NetworkModule.setPreprocessedHttpRequest(requestId, request);
        });
    };
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
    onPreprocessHttpResponse = (responseId, type, response) => {
        this.config
            ?.preprocessHttpResponse?.(type, response)
            .then((resultResponse) => {
            NetworkModule.setPreprocessedHttpResponse(responseId, resultResponse);
        })
            .catch(() => {
            NetworkModule.setPreprocessedHttpResponse(responseId, response);
        });
    };
}
//# sourceMappingURL=index.js.map