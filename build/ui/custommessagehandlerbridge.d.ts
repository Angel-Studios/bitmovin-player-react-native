import { CustomMessageHandler } from './custommessagehandler';
import { CustomMessageSender } from './custommessagesender';
/**
 * Takes care of JS/Native communication for a CustomMessageHandler.
 */
export declare class CustomMessageHandlerBridge implements CustomMessageSender {
    readonly nativeId: string;
    private customMessageHandler?;
    private isDestroyed;
    private onReceivedSynchronousMessageSubscription?;
    private onReceivedAsynchronousMessageSubscription?;
    constructor(nativeId?: string);
    setCustomMessageHandler(customMessageHandler: CustomMessageHandler): void;
    /**
     * Destroys the native CustomMessageHandler
     */
    destroy(): void;
    /**
     * Called by native code, when the UI sends a synchronous message.
     * @internal
     */
    private receivedSynchronousMessage;
    /**
     * Called by native code, when the UI sends an asynchronous message.
     * @internal
     */
    private receivedAsynchronousMessage;
    /**
     * Called by CustomMessageHandler, when sending a message to the UI.
     */
    sendMessage(message: string, data: string | undefined): void;
}
//# sourceMappingURL=custommessagehandlerbridge.d.ts.map