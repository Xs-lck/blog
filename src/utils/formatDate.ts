export default function (time:string, showTime = false) {
    const date = new Date(+time);
    let str = '';
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const newtime = date.getDate().toString().padStart(2, '0');
    str = `${date.getFullYear()}-${month}-${newtime}`;
    if (showTime) {
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        const second = date.getSeconds().toString().padStart(2, '0');
        str += ` ${hour}:${minute}:${second}`;
    }
    return str;
}