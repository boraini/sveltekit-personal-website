<script lang="ts">
    import type { DirectoryIndex } from "$lib/blog";
    
    export let index : DirectoryIndex;
    export let config;
</script>

<style scoped>
    a {
        display: block;
    }
</style>

<a href={config.blogURLRoot + index.path}>
    <img src={index.content.data.firstImage} alt={index.path}/>
    <h1 class="title"></h1>
    <h2 class="description"></h2>
</a>