# SvelteKit Personal Website with Automatically Indexed/Routed MD Blog

I am making this for use with my upcoming proper personal website (I hate maintaining [abmdevandgames.blogspot.com](https://abmdevandgames.blogspot.com)). My selling point for this personal website framework is how nice the blog routing is.

Every blog page is a directory with a consistent structure. See the `articles` directory or this:

```
articles/
  articles.md        # Welcome to my blog!
  cv/
    profile.png
    cv.md            # Curriculum Vitae ![profile](profile.png)
  subblog/
    subblog.md       # Welcome to my subblog!
    subblog-page.md  # This is a page in the subblog!
    collection/
      hero.png
      collection.md  # Featured collection of articles from subblog.
      collection-page.md
        # ![hero](hero.png) Article in the subblog collection.
  other-subblog/
    other-subblog.md # Welcome to my other subblog!
    other-subblog-page.md
```

Every folder gets a MD file with the same name which is used as the description of that folder's index. Other markdown files are parsed as subpages if they exist, and the folder is treated as a subblog only if so. If only the MD with the same name exists in a folder the folder is just treated as a subpage of the parent.

In the above example `articles/, subblog/` would be treated as blogs with subblogs and will get both subblog and page index sections on their pages. Meanwhile, ` other-subblog/, and collection/` would be treated as blogs with only pages and will get their page index sections. Finally, `cv/, subblog-page.md, other-subblog-page.md, and collection-page.md` would be treated as mere pages and won't get any index section in their page.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
