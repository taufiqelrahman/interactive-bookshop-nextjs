declare module 'react-lazyload' {
  import { Component, ReactNode, CSSProperties } from 'react';

  export interface LazyLoadProps {
    className?: string;
    style?: CSSProperties;
    once?: boolean;
    height?: number | string;
    offset?: number | number[];
    overflow?: boolean;
    resize?: boolean;
    scroll?: boolean;
    children?: ReactNode;
    throttle?: number | boolean;
    debounce?: number | boolean;
    placeholder?: ReactNode;
    scrollContainer?: string | Element;
    unmountIfInvisible?: boolean;
  }

  export default class LazyLoad extends Component<LazyLoadProps> {}

  export function lazyload(option?: LazyLoadProps): (WrappedComponent: any) => any;
  export function forceCheck(): void;
  export function forceVisible(): void;
}
