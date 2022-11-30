import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, Text, View } from 'react-native';

export const OfflineContentScreen = ({
  onContentSelected,
  headerText = 'Offline Content',
}: {
  headerText?: string;
  onContentSelected: (guid?: string) => void;
}) => {
  const [offlineItems, setOfflineItems] = useState<Array<unknown>>();

  useEffect(() => {
    setOfflineItems([]);
  }, [offlineItems]);

  return (
    <SafeAreaView>
      <View>
        <Text>{headerText}</Text>
      </View>
      <FlatList data={[]} renderItem={OfflineContentItem(onContentSelected)} />
    </SafeAreaView>
  );
};

const OfflineContentItem =
  (onContentSelected: (guid?: string) => void) =>
  ({ item }: { item: { title?: string; guid?: string } }) => {
    return (
      <Pressable onPress={() => onContentSelected(item.guid)}>
        <Text>{item.title}</Text>
      </Pressable>
    );
  };
