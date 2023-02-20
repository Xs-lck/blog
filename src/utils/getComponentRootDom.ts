import {createApp, defineComponent, h} from 'vue'
export default function(comp:any, props:Object):Element{
    const app = defineComponent({
        render() {
            return h(comp, {...props})
        }
    })
    const vm = createApp(app) 
    const span = document.createElement('span');
    vm.mount(span);

    return vm._container as Element;
}