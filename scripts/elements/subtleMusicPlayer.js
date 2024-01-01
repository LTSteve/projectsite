import styles from "/css/subtleMusicPlayer.css" assert {type: 'css'}
import { SC } from "/scripts/lib/sc.js"
document.adoptedStyleSheets = [styles]

const _subtleMusicPlayer = (()=>{
    let currentInterval = null;
    
    let apply = (rootElement)=>{
        var toApplyTo = rootElement.querySelectorAll('[data-subtle-music-player]');
        if(!toApplyTo || toApplyTo.length === 0) return;

        for(const element of toApplyTo) {
            let input = document.createElement("input");
            input.type = "range";
            input.min = 0;
            input.max = 100;
            input.value = 0;
            element.appendChild(input);
            
            let scWidget = SC.Widget(element.querySelector("iframe"));
            input.addEventListener("mousedown",(ev)=>{
                if(currentInterval){
                    window.clearInterval(currentInterval);
                    currentInterval = null;
                }
                scWidget.play();
                currentInterval = window.setInterval(()=>{
                    scWidget.setVolume(input.value);
                }, 80);
            });
            input.addEventListener("mouseup",(ev)=>{
                window.clearInterval(currentInterval);
                currentInterval = null;
                if(input && input.value === "0"){
                    scWidget.pause();
                }
            });
        }
    }
    return {
        apply
    }
})();

export {_subtleMusicPlayer as subtleMusicPlayer}