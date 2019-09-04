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
  spring,
  decay,
  call,
} = Animated;

const DEFAULT_DURATION = 300;

export function runAnimationTiming({
  clock,
  toValue,
  position = new Value(0),
  duration = DEFAULT_DURATION,
  easing = Easing.linear,
  onFinish = () => {},
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
    easing,
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
    cond(state.finished, [stopClock(clock), call([state.finished], onFinish)]),
    state.position,
  ]);
}

export function runSwipeDecay(clock, value, velocity) {
  const state = {
    finished: new Value(0),
    velocity: velocity,
    position: value,
    time: new Value(0),
  };

  const config = {
    deceleration: new Value(0.99),
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, velocity),
      set(state.position, value),
      set(config.deceleration, 0.99),
      startClock(clock),
    ]),
    decay(clock, state, config),
    cond(state.finished, [stopClock(clock)]),
    state.position,
  ];
}

export function runSpring(clock, position) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    stiffness: new Value(150),
    mass: new Value(1),
    damping: new Value(16),
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
    toValue: new Value(0),
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, 0),
      set(state.position, position),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, [stopClock(clock)]),
    state.position,
  ];
}
