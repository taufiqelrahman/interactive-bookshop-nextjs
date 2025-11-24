declare module 'dompurify' {
  interface DOMPurifyI {
    sanitize(source: string | Node, config?: any): string;
    sanitize(source: string | Node, config: { RETURN_DOM_FRAGMENT: true }): DocumentFragment;
    sanitize(source: string | Node, config: { RETURN_DOM: true }): HTMLBodyElement;
    addHook(hook: string, cb: (currentNode: Element, data: any, config: any) => void): void;
    removeHook(hook: string): void;
    removeHooks(hook: string): void;
    removeAllHooks(): void;
    isValidAttribute(tag: string, attr: string, value: string): boolean;
  }

  const DOMPurify: DOMPurifyI;
  export default DOMPurify;
}
