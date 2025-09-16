import { useRef } from 'react';
import { Player } from '../player';
/**
 * React hook that creates and returns a reference to a `Player` instance
 * that can be used inside any component.
 */
export function usePlayer(config) {
    return useRef(new Player(config)).current;
}
//# sourceMappingURL=usePlayer.js.map