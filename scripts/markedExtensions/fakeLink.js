const _callbacks = {};
let _general_callback = (href)=>{
    document.location = href;
};

const HIDDEN_TAG = "|hidden|";
const HIDDEN_TAG_LENGTH = 8;

const fakeLink = {
    link(href,title,text) {
        let isHidden = false;
        if(href.startsWith(HIDDEN_TAG)){
            href = href.substring(8);
            isHidden = true;
        }

        title = title || href || text;

        return `
            <span class="fake-link${isHidden ? " hidden-link" : " "}" title="${title}" onClick="FakeLinkClick('${href}')" tabindex="0">${text}</span>
            `;
    }
};

const onClick = (href,callback) =>{
    if (typeof href === "function"){
        _general_callback = href;
    }
    else{
        _callbacks[href] = callback;
    }
};

window.FakeLinkClick = (href) =>{
    if(_callbacks.hasOwnProperty(href)){
        _callbacks[href]();
    }
    else{
        _general_callback(href);
    }
};

export {fakeLink, onClick}