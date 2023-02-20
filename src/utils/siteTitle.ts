
let routerTitle = '';
let siteTitle = '';

function setTitle(){
    if(!routerTitle && !siteTitle){
        document.title = 'loading...';
    }else if(!routerTitle && siteTitle){
        document.title = siteTitle
    }else if(routerTitle && !siteTitle){
        document.title = routerTitle
    }else{
        document.title = `${routerTitle}-${siteTitle}`
    }
}

export default {
    setRouterTitle(title:string){
        routerTitle = title;
        setTitle();
    },
    setSiteTitle(title:string){
        siteTitle = title;
        setTitle();
    }
}