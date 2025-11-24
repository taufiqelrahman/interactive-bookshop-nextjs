declare module 'detect-it' {
  export interface DeviceInfo {
    deviceType: 'hybrid' | 'touchOnly' | 'mouseOnly';
    passiveEvents: boolean;
    hasTouch: boolean;
    hasMouse: boolean;
    maxTouchPoints: number;
    primaryInput: 'touch' | 'mouse';
    primaryPointer: 'coarse' | 'fine' | 'none';
    state: {
      detectHover: number;
      detectPointer: number;
      detectTouchEvents: number;
      detectPointerEvents: number;
    };
  }

  const detectIt: DeviceInfo;
  export default detectIt;
}
