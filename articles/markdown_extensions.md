## Markdown Extensions

This page mainly exists for my own reference, and will be extended as more extensions are added

**\[link\]\(|hidden|\*href\*\)** - hidden link. Invisible, but highlightable with tab

**\[link\]\(#action_name\)** - an action, calls action_name as an event on window, usually accompanied by a script block with a window eventlistener
`TODO: come up with a cleaner solution`

[Save Me For Later](#give_markdown_extensions)

[Throw Me Away](|hidden|#throw_out_markdown_extensions)

<script type="module">
    import { inventory } from "/scripts/widgets/inventory.js"
    const markdown_extensions = "Markdown Extensions";

    window.addEventListener("give_markdown_extensions", (e)=>{
        inventory.addItem(markdown_extensions, "markdown_extensions.md");
    }, false);
    
    window.addEventListener("throw_out_markdown_extensions", (e)=>{
        inventory.removeItem(markdown_extensions);
    });
</script>