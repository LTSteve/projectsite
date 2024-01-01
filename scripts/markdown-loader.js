import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import { ajax } from "./helpers/ajax.js";
import { setInnerHTML } from "./helpers/setInnerHtml.js"

const ARTICLES_URL = "/articles/";

const _markdownLoader = (()=>{
    let markdownContainer = document.querySelector('[data-markdown-load]');
    let contentSettingsUrl = markdownContainer.getAttribute('data-markdown-load');
    let contentSettings = {}
    let currentMarkdownFile = "";
    let loaderExtensions = []

    let initialize = (markedExtensions, loaderExt)=>{
        if (markedExtensions){
            for(const extension of markedExtensions){
                marked.use({renderer: extension})
            }
        }
        if (loaderExtensions){
            loaderExtensions = loaderExt;
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
                setInnerHTML(markdownContainer, marked.parse(text));
                currentMarkdownFile = mdFileName;
                for(const extension of loaderExtensions){
                    extension.apply(markdownContainer);
                }
            });
    }
    return {
        initialize,
        loadMD
    }
})();

export {_markdownLoader as markdownLoader}