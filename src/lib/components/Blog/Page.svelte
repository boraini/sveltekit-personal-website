<script lang="ts">
    import type { DirectoryIndex } from "$lib/blog";
    import BlogSubblogCard from "./SubblogCard.svelte";
    import BlogPageCard from "./PageCard.svelte";

    export let index : DirectoryIndex;
    export let config;
</script>

{#if index.content}
<section class="header">
    {#if index.content.frontmatter?.title}
    <h1>{index.content.frontmatter.title}</h1>
    {/if}
</section>

<section class="article-body">
    {@html index.content.value}
</section>
{/if}

{#if index.pages.length != 0}
<section class="page-cards">
    {#each index.pages as page}
    <BlogPageCard index={page} config={config}/>
    {/each}
</section>
{/if}

{#if index.subblogs.length != 0}
<section class="subblog-cards">
    {#each index.subblogs as subblog}
    <BlogSubblogCard index={subblog} config={config}/>
    {/each}
</section>
{/if}
