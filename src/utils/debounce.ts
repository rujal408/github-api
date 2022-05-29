 // Executes function after 500ms
 function debounce  (callback: (...params: any[]) => any)  {
    let inDebounce: ReturnType<typeof setTimeout>;
    return function (this:any, ...args: any[]) {
        clearTimeout(inDebounce);
        inDebounce = setTimeout(() => callback.apply(this, args), 500);
    };
};

export default debounce