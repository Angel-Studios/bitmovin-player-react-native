import React, { useCallback, useState } from 'react';
import { View, Platform, StyleSheet, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  Event,
  usePlayer,
  PlayerView,
  SourceType,
} from 'bitmovin-player-react-native';
import { useTVGestures } from '../hooks';
import {
  AngelOfflineVideoModule,
  OfflineContentMetadata,
  DwonloadEvent,
} from '../../../src/angelOfflineVideoModule';
import { Picker } from '@react-native-picker/picker';

function prettyPrint(header: string, obj: any) {
  console.log(header, JSON.stringify(obj, null, 2));
}

const options: OfflineContentMetadata = {
  guid: '12345689',
  url: 'https://media.angelstudios.com/copied-from-old-account/The_Chosen/S01E08_with_CTA/2022-07-29/The_Chosen_S01E08.m3u8',
  title: 'test',
};

interface OfflineOptions {
  title: string;
  id: string;
}

export default function OfflinePlayback() {
  const [offlineOptions, setOfflineOptions] = useState<OfflineOptions[]>();
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState('aud:English');
  useTVGestures();

  const player = usePlayer({
    licenseKey: '4766495e-67aa-4c7e-9992-5b70675b0660',
  });

  useFocusEffect(
    useCallback(() => {
      getOptions();
      player.load({
        url:
          Platform.OS === 'ios'
            ? 'https://media.angelstudios.com/copied-from-old-account/The_Chosen/S01E08_with_CTA/2022-07-29/The_Chosen_S01E08.m3u8'
            : 'https://media.angelstudios.com/copied-from-old-account/The_Chosen/S01E08_with_CTA/2022-07-29/The_Chosen_S01E08.m3u8',
        type: SourceType.HLS,
        poster: 'https://bitmovin-a.akamaihd.net/content/sintel/poster.png',
      });
      return () => {
        player.destroy();
      };
    }, [player])
  );

  const onEvent = useCallback((event: Event) => {
    prettyPrint(`EVENT [${event.name}]`, event);
  }, []);

  const getOptions = () => {
    prettyPrint('HIT DOWNLOAD:', options);
    AngelOfflineVideoModule.getOfflineOptionsForContent(options).then((o) => {
      prettyPrint('options:', o);
      setOfflineOptions(o);
    });
  };

  const handleDownloadOptionsPress = () => {
    if (!offlineOptions) return;
    setShowOptions(!showOptions);
  };

  const updateProgress = (downloadEvent: DwonloadEvent) => {
    console.log('DOWNLOAD EVENT', downloadEvent);
  };

  const handleDownloadPress = () => {
    console.log('DOWNLOAD', selectedLanguage);
    AngelOfflineVideoModule.downloadContentForOfflineViewing(
      options.guid,
      selectedLanguage,
      updateProgress
    );
  };

  return (
    <View style={styles.container}>
      <Button
        title="See Download Options"
        onPress={handleDownloadOptionsPress}
      />
      {showOptions ? (
        <View style={{ flex: 1, width: '100%', backgroundColor: 'white' }}>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
            itemStyle={{ color: 'white' }}
          >
            {offlineOptions?.map((audioTrack) => (
              <Picker.Item
                key={audioTrack.id}
                label={audioTrack.title}
                value={audioTrack.id}
              />
            ))}
          </Picker>
          <Button title="Download Now" onPress={handleDownloadPress} />
        </View>
      ) : (
        <PlayerView
          player={player}
          style={styles.player}
          onSubtitleAdded={onEvent}
          onSubtitleChanged={onEvent}
          onSubtitleRemoved={onEvent}
        />
      )}
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
