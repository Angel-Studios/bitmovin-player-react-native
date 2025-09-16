/**
 * Android and iOS only.
 * For Android it requires Player SDK version 3.39.0 or higher.
 *
 * Provides a two-way communication channel between the Player UI and the integration.
 */
export class CustomMessageHandler {
    onReceivedSynchronousMessage;
    onReceivedAsynchronousMessage;
    /** @internal */
    customMessageSender;
    /**
     * Android and iOS only.
     *
     * Creates a new `CustomMessageHandler` instance to handle two-way communication between the integation and the Player UI.
     *
     * @param options - Configuration options for the `CustomMessageHandler` instance.
     */
    constructor({ onReceivedSynchronousMessage, onReceivedAsynchronousMessage, }) {
        this.onReceivedSynchronousMessage = onReceivedSynchronousMessage;
        this.onReceivedAsynchronousMessage = onReceivedAsynchronousMessage;
    }
    /**
     * Gets called when a synchronous message was received from the Bitmovin Web UI.
     *
     * @param message Identifier of the message.
     * @param data Optional data of the message as string (can be a serialized object).
     * @returns Optional return value as string which will be propagates back to the JS counterpart.
     */
    receivedSynchronousMessage(message, data) {
        return this.onReceivedSynchronousMessage(message, data);
    }
    /**
     * Gets called when an asynchronous message was received from the Bitmovin Web UI.
     *
     * @param message Identifier of the message.
     * @param data Optional data of the message as string (can be a serialized object).
     */
    receivedAsynchronousMessage(message, data) {
        this.onReceivedAsynchronousMessage(message, data);
    }
    /**
     * Android and iOS only.
     *
     * Sends a message to the Player UI.
     *
     * @param message - Identifier for the callback which should be called.
     * @param data - Payload for the callback.
     */
    sendMessage(message, data) {
        this.customMessageSender?.sendMessage(message, data);
    }
}
//# sourceMappingURL=custommessagehandler.js.map