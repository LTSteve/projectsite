const _callbacks = {};
let _general_callback = (href)=>{
    document.location = href;
};

const fakeLink = {
    link(href,title,text) {
        title = title || href || text;
        return `
            <span class="fake-link" title="${title}" onClick="FakeLinkClick('${href}')">${text}</span>
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