<script context="module" lang="ts">
    import type { DirectoryIndex } from "$lib/blog";

    const config = {blogURLRoot: "/blog/"};

    export async function load(ctx) {
    const {url, fetch, params} = ctx;
    const index = await fetch(`${config.blogURLRoot}index.json`)
        //.then(x => x.text())
        //.then(console.log);
        .then((r) => r.json());
    return {
      props: { index, config }
    };
  }
</script>

<script lang="ts">
  import BlogPage from "$lib/components/Blog/Page.svelte";

  export let index : DirectoryIndex;
  export let config;
</script>

<BlogPage index={index} config={config}/>