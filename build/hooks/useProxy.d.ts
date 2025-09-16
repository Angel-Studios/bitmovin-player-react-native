import { RefObject } from 'react';
import { Event } from '../events';
/**
 * A function that takes a generic event as argument.
 */
type Callback<E> = (event: E) => void;
/**
 * A function that takes the synthetic version of a generic event as argument.
 */
type NativeCallback<E> = (event: {
    nativeEvent: E;
}) => void;
/**
 * Create a proxy function that unwraps native events.
 */
export declare function useProxy(viewRef: RefObject<any>): <E extends Event>(callback?: Callback<E>) => NativeCallback<E>;
export {};
//# sourceMappingURL=useProxy.d.ts.map