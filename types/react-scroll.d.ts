declare module 'react-scroll' {
  export interface ScrollToOptions {
    duration?: number;
    delay?: number;
    smooth?: boolean | string;
    offset?: number;
    spy?: boolean;
    hashSpy?: boolean;
    isDynamic?: boolean;
    ignoreCancelEvents?: boolean;
  }

  export const animateScroll: {
    scrollTo: (to: number, options?: ScrollToOptions) => void;
    scrollToTop: (options?: ScrollToOptions) => void;
    scrollToBottom: (options?: ScrollToOptions) => void;
    scrollMore: (toScroll: number, options?: ScrollToOptions) => void;
  };

  export const Events: {
    scrollEvent: {
      register: (eventName: string, callback: Function) => void;
      remove: (eventName: string) => void;
    };
  };

  export const scroller: {
    scrollTo: (to: string, options?: ScrollToOptions) => void;
  };

  export const Element: React.ComponentType<any>;
  export const Link: React.ComponentType<any>;
}
