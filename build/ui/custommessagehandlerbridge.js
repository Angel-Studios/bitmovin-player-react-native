import * as Crypto from 'expo-crypto';
import CustomMessageHandlerModule from './customMessageHandlerModule';
/**
 * Takes care of JS/Native communication for a CustomMessageHandler.
 */
export class CustomMessageHandlerBridge {
    nativeId;
    customMessageHandler;
    isDestroyed;
    onReceivedSynchronousMessageSubscription;
    onReceivedAsynchronousMessageSubscription;
    constructor(nativeId) {
        this.nativeId = nativeId ?? Crypto.randomUUID();
        this.isDestroyed = false;
        // Set up event listeners for synchronous and asynchronous messages
        this.onReceivedSynchronousMessageSubscription =
            CustomMessageHandlerModule.addListener('onReceivedSynchronousMessage', ({ nativeId, id, message, data }) => {
                if (nativeId !== this.nativeId) {
                    return;
                }
                this.receivedSynchronousMessage(id, message, data);
            });
        this.onReceivedAsynchronousMessageSubscription =
            CustomMessageHandlerModule.addListener('onReceivedAsynchronousMessage', ({ nativeId, message, data }) => {
                if (nativeId !== this.nativeId) {
                    return;
                }
                this.receivedAsynchronousMessage(message, data);
            });
        CustomMessageHandlerModule.registerHandler(this.nativeId);
    }
    setCustomMessageHandler(customMessageHandler) {
        this.customMessageHandler = customMessageHandler;
        this.customMessageHandler.customMessageSender = this;
    }
    /**
     * Destroys the native CustomMessageHandler
     */
    destroy() {
        if (!this.isDestroyed) {
            CustomMessageHandlerModule.destroy(this.nativeId);
            this.onReceivedSynchronousMessageSubscription?.remove();
            this.onReceivedAsynchronousMessageSubscription?.remove();
            this.onReceivedSynchronousMessageSubscription = undefined;
            this.onReceivedAsynchronousMessageSubscription = undefined;
            this.isDestroyed = true;
        }
    }
    /**
     * Called by native code, when the UI sends a synchronous message.
     * @internal
     */
    receivedSynchronousMessage(id, message, data) {
        const result = this.customMessageHandler?.receivedSynchronousMessage(message, data);
        CustomMessageHandlerModule.onReceivedSynchronousMessageResult(id, result);
    }
    /**
     * Called by native code, when the UI sends an asynchronous message.
     * @internal
     */
    receivedAsynchronousMessage(message, data) {
        this.customMessageHandler?.receivedAsynchronousMessage(message, data);
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * Called by CustomMessageHandler, when sending a message to the UI.
     */
    sendMessage(message, data) {
        CustomMessageHandlerModule.sendMessage(this.nativeId, message, data);
    }
}
//# sourceMappingURL=custommessagehandlerbridge.js.map