import Animated, { Easing } from 'react-native-reanimated';
const {
  Value,
  block,
  cond,
  clockRunning,
  stopClock,
  timing,
  set,
  startClock,
} = Animated;

const DEFAULT_DURATION = 200;

export function runLinearTiming({
  clock,
  toValue,
  position = new Value(0),
  duration = DEFAULT_DURATION,
}) {
  const state = {
    finished: new Value(0),
    frameTime: new Value(0),
    position: position,
    time: new Value(0),
  };

  const config = {
    toValue,
    duration,
    easing: Easing.linear,
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.frameTime, 0),
      set(config.toValue, toValue),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, [stopClock(clock)]),
    state.position,
  ]);
}

export function runSwipeDecay() {}

export function runSpring() {}
