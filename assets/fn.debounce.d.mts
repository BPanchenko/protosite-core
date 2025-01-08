export { debounce as default };
declare function debounce(func: any, wait?: number, options?: {}): {
    (...args: any[]): any;
    cancel: () => void;
    flush: () => any;
};
