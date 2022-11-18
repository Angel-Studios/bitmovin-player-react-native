import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  Event,
  usePlayer,
  PlayerView,
  SourceType,
  AngelOfflineVideoModule,
} from 'bitmovin-player-react-native';
import { useTVGestures } from '../hooks';

function prettyPrint(header: string, obj: any) {
  console.log(header, JSON.stringify(obj, null, 2));
}

export default function BasicPlayback() {
  useTVGestures();

  const player = usePlayer();

  useFocusEffect(
    useCallback(() => {
      AngelOfflineVideoModule.getOfflineOptionsForContent({
        guid: '1234',
        title: 'test',
        url: 'https://media.angelstudios.com/copied-from-old-account/The_Chosen/S01E08_with_CTA/2022-07-29/The_Chosen_S01E08.m3u8',
      })
        .then((v) => {
          console.log(v);
        })
        .catch((e) => {
          console.error(e);
        });

      player.load({
        url: 'https://media.angelstudios.com/copied-from-old-account/The_Chosen/S01E08_with_CTA/2022-07-29/The_Chosen_S01E08.m3u8',
        type: SourceType.HLS,
        title: 'Art of Motion',
        poster:
          'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/poster.jpg',
      });
      return () => {
        player.destroy();
      };
    }, [player])
  );

  const onReady = useCallback((event: Event) => {
    prettyPrint(`EVENT [${event.name}]`, event);
  }, []);

  const onEvent = useCallback((event: Event) => {
    prettyPrint(`EVENT [${event.name}]`, event);
  }, []);

  return (
    <View style={styles.container}>
      <PlayerView
        player={player}
        style={styles.player}
        onPlay={onEvent}
        onPlaying={onEvent}
        onPaused={onEvent}
        onReady={onReady}
        onSourceLoaded={onEvent}
        onSeek={onEvent}
        onSeeked={onEvent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  player: {
    flex: 1,
  },
});
