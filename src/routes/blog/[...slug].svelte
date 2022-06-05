<script context="module">
  const config = {blogURLRoot: "/blog/"};
  export async function load(ctx) {
    const {url, fetch, params} = ctx;
    const slug = params.slug;
    const index = await fetch(`${config.blogURLRoot}${slug}.json`)
        .then((r) => r.json());
    return {
      props: { index, config }
    };
  }
</script>

<script>
  import BlogPage from "$lib/components/Blog/Page.svelte"

  export let index;
  export let config;
</script>

<BlogPage index={index} config={config} />
