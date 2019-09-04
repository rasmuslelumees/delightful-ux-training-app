import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import Animated from 'react-native-reanimated';

import CollapsibleHeader from './CollapsibleHeader';
import HeaderTitle from './HeaderTitle';
import SongItem from './SongItem';
import { NAV_BAR_HEIGHT, PLAYER_HEIGHT } from '../utils/constants';

const { event, Value } = Animated;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const SongList = ({
  songs,
  currentSong,
  onSongPress,
  onSongRemove,
  onFavouriteToggle,
}) => {
  const renderRow = item => {
    return (
      <SongItem
        item={item.item}
        onSongRemove={onSongRemove}
        onSongFavouriteToggle={onFavouriteToggle}
        onPress={onSongPress}
      />
    );
  };

  const scrollY = new Value(0);

  return (
    <React.Fragment>
      <CollapsibleHeader scrollY={scrollY} currentSong={currentSong} />
      <AnimatedFlatList
        data={songs}
        renderItem={renderRow}
        keyExtractor={item => item.track.id}
        bounces={false}
        contentContainerStyle={styles.listContainer}
        onScroll={event([
          {
            nativeEvent: {
              contentOffset: {
                y: scrollY,
              },
            },
          },
        ])}
        scrollEventThrottle={16}
      />

      <HeaderTitle scrollY={scrollY} currentSong={currentSong} />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: NAV_BAR_HEIGHT,
    paddingBottom: PLAYER_HEIGHT,
  },
});

export default SongList;
