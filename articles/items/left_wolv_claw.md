It's a claw

[Throw Away](#remove_wolv_claw)

<script type="module">
    import { inventory } from "/scripts/widgets/inventory.js"
    const l_wolv_claw = "The Left Wolv Claw";

    window.addEventListener("remove_wolv_claw", (e)=>{
        inventory.removeItem(l_wolv_claw);
    }, false);
</script>