export { throttle as default };
declare function throttle(func: any, wait?: number, options?: {}): {
    (...args: any[]): any;
    cancel: () => void;
    flush: () => any;
};
