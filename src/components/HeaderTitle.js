import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated from 'react-native-reanimated';

const { interpolate, Extrapolate } = Animated;

class HeaderTitle extends React.Component {
  interpolatedOpacity = interpolate(this.props.scrollY, {
    inputRange: [0, 120, 180],
    outputRange: [0, 0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  render() {
    const { currentSong } = this.props;

    const containerAnimationStyles = {
      opacity: this.interpolatedOpacity,
    };

    return (
      <Animated.View style={[styles.container, containerAnimationStyles]}>
        <Text style={styles.text}>{currentSong.track.artists[0].name}</Text>
      </Animated.View>
    );
  }
}

export default HeaderTitle;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  text: {
    color: '#131313',
    fontSize: 15,
  },
});
