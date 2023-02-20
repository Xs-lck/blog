export default function(fn:() => void, duration = 1000){
    let timer:any = null;
    return (...args: any) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn();
        }, duration);
    }
}