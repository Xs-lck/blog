import getComponentRootDom from "./getComponentRootDom.js"
import Icon from '@/components/Icon/index.vue'
import styles from '@/style/showMessage.module.less'
export default function(content:string, type = 'info', duration = 2000, container:any, callback:() => void){
    let div = document.createElement('div');
    const em = getComponentRootDom(Icon, {type});
    div.innerHTML = `<span class="${styles.iconStyle}">${em.outerHTML}</span><div>${content}</div>`;
    const messageType = styles[`message-${type}`];
    div.className = `${styles.message} ${messageType}`;
    if(!container){
        container = document.body;
    }else{
        if(getComputedStyle(container).position == 'static'){
            container.style.position = 'relative';
        }
    }
    container.appendChild(div);
    //强行使浏览器渲染一遍  reflow
    div.clientHeight;

    div.style.opacity = '1';
    div.style.transform = 'translate(-50%, -50%)'
    setTimeout(() => {
        div.style.opacity = '0';
        div.style.transform = 'translate(-50%, -50%) translateY(-15px)';
        div.addEventListener("transitionend", function(){
            div.remove();
            callback && callback();
        }, {once: true})
    }, duration);
}