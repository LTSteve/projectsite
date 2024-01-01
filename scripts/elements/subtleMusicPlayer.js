import styles from "/css/subtleMusicPlayer.css" assert {type: 'css'}
document.adoptedStyleSheets = [styles]

const _subtleMusicPlayer = (()=>{
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
        }
    }
    return {
        apply
    }
})();

export {_subtleMusicPlayer as subtleMusicPlayer}