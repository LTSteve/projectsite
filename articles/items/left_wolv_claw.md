It's a claw from the real wolverine. He's still attached funny enough.

[Return to where you met](rambles/01_01_2024.md)

[Throw Away](#remove_wolv_claw)

<script type="module">
    import { inventory } from "/scripts/widgets/inventory.js"
    const l_wolv_claw = "The Left Wolv Claw";

    window.addEventListener("remove_wolv_claw", (e)=>{
        inventory.removeItem(l_wolv_claw, ". He scurries away, dejected.");
    }, false);
</script>