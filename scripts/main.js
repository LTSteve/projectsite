import {markdownLoader} from "./markdown-loader.js"
import { fakeLink, onClick as onFakeLinkClick } from "./markedExtensions/fakeLink.js"
import { ajax } from "./helpers/ajax.js"

import { subtleMusicPlayer } from "./elements/subtleMusicPlayer.js"

markdownLoader.initialize([fakeLink],[subtleMusicPlayer]);

window.onpopstate = ()=>{
    const historyState = history.state
    markdownLoader.loadMD(historyState ? historyState.subPage : null)
};

onFakeLinkClick((href)=>{
    if(href.startsWith("#")){
        window.dispatchEvent(new Event(href.substring(1)));
        return;
    }

    console.log("loading md " + href);
    markdownLoader.loadMD(href).then(()=>{
        history.pushState({subPage:href},href);
    },(err)=>{
        console.log(err);
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