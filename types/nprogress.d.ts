declare module 'nprogress' {
  interface NProgressOptions {
    minimum?: number;
    template?: string;
    easing?: string;
    speed?: number;
    trickle?: boolean;
    trickleSpeed?: number;
    showSpinner?: boolean;
    parent?: string;
  }

  interface NProgressStatic {
    version: string;
    settings: NProgressOptions;
    status: number | null;
    configure(options: NProgressOptions): NProgressStatic;
    set(number: number): NProgressStatic;
    isStarted(): boolean;
    start(): NProgressStatic;
    done(force?: boolean): NProgressStatic;
    inc(amount?: number): NProgressStatic;
    trickle(): NProgressStatic;
    remove(): void;
    isRendered(): boolean;
    getPositioningCSS(): string;
  }

  const NProgress: NProgressStatic;
  export default NProgress;
}
