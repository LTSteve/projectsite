const _ajax = (()=>{
    let get = (url,plainText)=>{
        return fetch(url)
            .then((response)=> {
                let parser = plainText ? response.text() : response.json();
                if(response.status >= 200 && response.status < 300){
                    return parser
                }
                else {
                    return Promise.reject(response.status);
                }
            });
    }
    return {
        get
    }
})();

export {_ajax as ajax}