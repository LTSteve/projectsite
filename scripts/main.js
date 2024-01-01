import {markdownLoader} from "./markdown-loader.js"
import { fakeLink, onClick as onFakeLinkClick } from "./markedExtensions/fakeLink.js"
import { ajax } from "./helpers/ajax.js"

markdownLoader.initialize([fakeLink]);

window.onpopstate = ()=>{
    const historyState = history.state
    markdownLoader.loadMD(historyState ? historyState.subPage : null)
};

onFakeLinkClick((href)=>{
    console.log("loading md " + href);
    markdownLoader.loadMD(href).then(()=>{
        history.pushState({subPage:href},href);
    },()=>{
        if(href.startsWith("http")) {
            document.location = href;
        }
        else{
            ajax.get(href, true).then(()=>{
                //successful sub-page link
                document.location = href;
            }, ()=>{
                alert("Broken Link! " + href);
            });
        }
    });
});