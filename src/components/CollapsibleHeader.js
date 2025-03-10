import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Animated from 'react-native-reanimated';

import { NAV_BAR_HEIGHT } from '../utils/constants';

const { interpolate, Extrapolate, multiply } = Animated;

class CollapsibleHeader extends React.Component {
  interpolatedTranslateY = interpolate(this.props.scrollY, {
    inputRange: [-100, 0, 130],
    outputRange: [100, 0, 130],
  });

  interpolatedTranslateYShadow = interpolate(this.props.scrollY, {
    inputRange: [0, 130],
    outputRange: [0, 130],
    extrapolate: Extrapolate.CLAMP,
  });

  interpolatedOpacity = interpolate(this.props.scrollY, {
    inputRange: [0, 200],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  interpolatedScale = interpolate(this.props.scrollY, {
    inputRange: [-100, 0, 130],
    outputRange: [1.5, 1, 0.6],
  });

  render() {
    const { currentSong } = this.props;

    const imageContainerAnimationStyles = {
      opacity: this.interpolatedOpacity,
      transform: [
        {
          translateY: multiply(this.interpolatedTranslateY, 0.3),
          scale: this.interpolatedScale,
        },
      ],
    };

    const shadowContainerAnimationStyles = {
      height: this.interpolatedTranslateYShadow,
    };

    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.imageContainer, imageContainerAnimationStyles]}
        >
          <Image
            source={{
              uri: currentSong.track.album.images[0].url,
            }}
            style={styles.image}
          />
          <Text style={styles.artistName}>
            {currentSong.track.artists[0].name}
          </Text>
        </Animated.View>
        <Animated.View
          style={[styles.shadowContainer, shadowContainerAnimationStyles]}
        />
      </View>
    );
  }
}

export default CollapsibleHeader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: NAV_BAR_HEIGHT,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  shadowContainer: {
    width: '100%',
    backgroundColor: '#FFF',
    bottom: 0,
    position: 'absolute',
    elevation: 16,
    shadowColor: '#1c1c1c',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  artistName: {
    color: '#131313',
    padding: 16,
    fontSize: 20,
    fontWeight: '600',
  },
  imageContainer: {
    position: 'absolute',
    top: 20,
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
});
