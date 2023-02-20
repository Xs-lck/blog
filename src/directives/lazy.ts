import { deBounce } from '@/utils';
import defaultGif from '@/assets/default.gif';

let images:Array<imgType> = [];

function setImg(img:imgType) {
  img.dom.src = defaultGif;
  const clientHeight = document.documentElement.clientHeight;
  const Rect = img.dom.getBoundingClientRect();
  let height = Rect.height;
  if (Rect.top > -height && Rect.top < clientHeight) {
    const tempImg = new Image();
    tempImg.src = img.src;
    tempImg.onload = () => {
      img.dom.src = tempImg.src;
    };
    images = images.filter((i) => i !== img);
  }
}

function setImage() {
  for (const img of images) {
    //看是否已经加载完成了
    setImg(img);
  }
}
function handleScroll() {
  setImage();
}

interface imgType {
  dom: any,
  src: string
}

export default {
  mounted(el:any, bindings:any) {
bindings.value.proxy.$eventBus.on('mainScroll', deBounce(handleScroll, 50));
    const img:imgType = {
      dom: el,
      src: bindings.value.src,
    };
    images.push(img);
    setImg(img);
  },
  unmounted(el:any) {
    images = images.filter((img) => img.dom !== el);
  },
};
