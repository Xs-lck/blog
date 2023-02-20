import loadingUrl from '@/assets/loading.svg';
import style from '../style/loading.module.less'

function getLoading(el:HTMLElement){
    return el.querySelectorAll('img[data-id=loading]');
}

function createLoading(){
    const img = document.createElement('img');
    img.dataset.id = 'loading';
    img.className = style.loading;
    img.src = loadingUrl;
    return img;
}

export default function(el:HTMLElement, binding:any){
    const curImgs = getLoading(el);
    if(binding.value){
        
        if(!curImgs.length){
            const img = createLoading();
            el.appendChild(img);
        }
    }else{
        
        if(curImgs.length){
            for (const img of curImgs) {
                img.remove();
            }
            
        }
    }
}