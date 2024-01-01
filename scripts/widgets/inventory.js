import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import { setInnerHTML } from "../helpers/setInnerHtml.js"

const _inventory = (()=>{
    let _bound = false;
    let _hidden = true;

    const _getInventory = () => {
        const makeNewInventory = !localStorage.inventory || (typeof localStorage.inventory != "string") || !localStorage.inventory.startsWith("{");
        return makeNewInventory ? {} : JSON.parse(localStorage.inventory);
    };

    const _saveInventory = (inv) => {
        localStorage.setItem("inventory", JSON.stringify(inv));
    };

    const _toggleInventory = () => {
        const inventoryElement = document.querySelector('[data-inventory]');
        const inventoryList = inventoryElement.querySelector('.inventory-list');
        
        _hidden = !_hidden;

        for(const inventoryItem of inventoryList.children){
            if(_hidden){
                inventoryItem.classList.add("hidden");
            }
            else {
                inventoryItem.classList.remove("hidden");
            }
        }
    };

    const addItem = (name, link) => {
        const inv = _getInventory();
        if(inv[name]) {
            alert("you already have it, dingus");
            return;
        }

        inv[name] = link;
        _saveInventory(inv);
        alert("you picked up " + name);
        renderInventory();
    };

    const removeItem = (name) => {
        const inv = _getInventory();
        if(!inv[name]){
            return;
        }

        delete inv[name];
        alert("you dropped " + name);
        _saveInventory(inv);
        renderInventory();
    };

    const renderInventory = () => {
        if(!_bound){
            const inventoryButton = document.querySelector('.inventory-button');
            inventoryButton.onclick = _toggleInventory;
            _bound = true;
        }

        const inv = _getInventory();
        const inventoryElement = document.querySelector('[data-inventory]');

        const inventoryList = inventoryElement.querySelector('.inventory-list');
        inventoryList.innerHTML = "";

        if(Object.keys(inv).length === 0){
            inventoryElement.classList.add("hidden");
            return;
        }
        inventoryElement.classList.remove("hidden");

        const inventoryListItemTemplate = inventoryElement.querySelector("#inventory-item");
        for(const item in inv){
            const newInventoryListItem = inventoryListItemTemplate.content.cloneNode(true).firstElementChild;
            if (_hidden){
                newInventoryListItem.classList.add("hidden");
            }
            setInnerHTML(newInventoryListItem, marked.parse(`[${item}](${inv[item]})`));
            inventoryList.appendChild(newInventoryListItem);
        }
    };

    return {
        addItem,
        removeItem,
        renderInventory
    };
})();

export {_inventory as inventory}