import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import iconHeart from '../../assets/icon_heart.png';
import Animated, { Easing } from 'react-native-reanimated';
import { runAnimationTiming } from '../utils/animationHelpers';

const { Value, Clock } = Animated;

const DEFAULT_BUTTON_OPACITY = 0.1;

class FavouriteIcon extends React.Component {
  clock = new Clock();
  toValue = new Value(DEFAULT_BUTTON_OPACITY);
  opacity = runAnimationTiming({
    clock: this.clock,
    toValue: this.toValue,
    position: new Value(DEFAULT_BUTTON_OPACITY),
    duration: 200,
    easing: Easing.linear,
  });

  componentDidUpdate(prevProps) {
    if (prevProps.checked !== this.props.checked) {
      this.toValue.setValue(this.props.checked ? 1 : DEFAULT_BUTTON_OPACITY);
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback
        enabled={this.props.tapEnabled}
        onPress={this.props.onToggle}
      >
        <Animated.Image
          source={iconHeart}
          style={[style.icon, { opacity: this.opacity }]}
        />
      </TouchableWithoutFeedback>
    );
  }
}

export default FavouriteIcon;

const style = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
    tintColor: '#3903fc',
  },
});
