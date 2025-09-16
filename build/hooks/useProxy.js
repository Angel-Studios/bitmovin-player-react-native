import { useCallback } from 'react';
import { findNodeHandle } from 'react-native';
import { normalizeNonFinite } from '../utils/normalizeNonFinite';
/**
 * Create a proxy function that unwraps native events.
 */
export function useProxy(viewRef) {
    return useCallback((callback) => (event) => {
        const eventTargetNodeHandle = event.nativeEvent.target;
        if (eventTargetNodeHandle !== findNodeHandle(viewRef.current)) {
            return;
        }
        const { target, ...eventWithoutTarget } = event.nativeEvent;
        const sanitized = normalizeNonFinite(eventWithoutTarget);
        callback?.(sanitized);
    }, [viewRef]);
}
//# sourceMappingURL=useProxy.js.map