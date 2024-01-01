import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import { ajax } from "./helpers/ajax.js";

const ARTICLES_URL = "/articles/";

const _markdownLoader = (()=>{
    let markdownContainer = document.querySelector('[data-markdown-load]');
    let contentSettingsUrl = markdownContainer.getAttribute('data-markdown-load');
    let contentSettings = {}
    let currentMarkdownFile = "";

    let initialize = (extensions)=>{
        if (extensions){
            for(const extension of extensions){
                marked.use({renderer: extension})
            }
        }
        ajax.get(contentSettingsUrl, false)
            .then((json)=>{
                contentSettings = json;
                loadMD(contentSettings.main_article);
                currentMarkdownFile = contentSettings.main_article;
            });
    };

    let loadMD = (mdFileName)=>{
        mdFileName = mdFileName || contentSettings.main_article;
        return ajax.get(ARTICLES_URL + mdFileName, true)
            .then((text)=>{
                markdownContainer.innerHTML = marked.parse(text);
                currentMarkdownFile = mdFileName;
            });
    }
    return {
        initialize,
        loadMD
    }
})();

export {_markdownLoader as markdownLoader}