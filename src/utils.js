import Animated, { Easing } from 'react-native-reanimated';
const {
  Value,
  set,
  cond,
  startClock,
  clockRunning,
  timing,
  stopClock,
  block,
  debug,
} = Animated;

export const runTiming = (clock, value, dest) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 300,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    // empty array as first arg since cond doesn't process nots
    cond(
      clockRunning(clock),
      [],
      [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock),
      ]
    ),
    timing(clock, state, config),
    cond(state.finished, [stopClock(clock)]),
    state.position,
  ]);
};

export const runHeightAnimation = (clock, value, dest) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 400,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(
      clockRunning(clock),
      [],
      [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock),
      ]
    ),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position,
  ]);
};
