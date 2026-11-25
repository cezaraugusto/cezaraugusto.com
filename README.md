# cezaraugusto.com

Personal website and blog of Cezar Augusto, creator of [Extension.js](https://extension.js.org) and founder of [extension.dev](https://extension.dev). [See it live](https://cezaraugusto.com).

## Stack

- [Eleventy 3](https://www.11ty.dev), configured in `config/eleventy.config.mjs`.
- pnpm 12.16.1 (the version CI pins) on Node 24.
- A fork of [sakura.css](https://github.com/oxalorg/sakura) v1.5.1, inlined in `src/_includes/layouts/default.njk` and maintained here.
- Manrope from `@fontsource/manrope`, self-hosted (weights 500 and 700).
- Shiki syntax highlighting with a dual theme (`github-light` and `github-dark`).
- Share cards (1200x630 PNG) rendered at build time with `@11ty/eleventy-img` (`config/og-cards.mjs`).
- JSON-LD structured data from `config/structured-data.mjs`.
- Projects data fetched at build time from the GitHub API and npm (`src/_data/projects.mjs`), plus the Substack feed (`src/_data/substack.mjs`), cached in `.cache` for a day.
- Atom feed, sitemap, `robots.txt` and `llms.txt`, all generated.

## Local development

```sh
pnpm install
pnpm dev
```

`pnpm dev` serves the site at http://localhost:8080 with live reload. In this mode `robots.txt` and the robots meta tag tell crawlers not to index.

The projects data calls the GitHub API without a token by default, which hits the anonymous rate limit fast. Pass a token through the environment to raise it:

```sh
GITHUB_TOKEN="$(gh auth token)" pnpm dev
```

## Building

```sh
pnpm build
```

The output goes to `_site`. Use `--output` to build somewhere else, for example `pnpm build --output=/tmp/site`.

## Drafts

Set `draft: true` in a page's front matter to keep it out of production. Drafts render in `pnpm dev` only; `pnpm build` skips them, and the sitemap leaves them out.

## Editing `src/_data/site.json`

- `intro`: the Markdown line under the name on the home page.
- `now`: the "Now" section on the home page. `text` is Markdown and `date` is the month it was last true, as `YYYY-MM`.
- `homeProjects`: the GitHub repositories featured on the home page, as `owner/name`. A name missing from the project list prints a `[projects]` warning at build time.
- `excludeProjects`: repositories to keep off the open source list, as `"owner/name": "reason"`. `excludeProjectPattern` hides repositories by name, such as demos, templates and reproductions.

## Deploy

Every push to `main` runs `.github/workflows/deploy-website.yml`, which builds the site with pnpm on Node 24 and publishes `_site` to GitHub Pages. It can also be started by hand from the Actions tab. The custom domain is set in `CNAME`.

## License

Code is licensed under [MIT](./LICENSE). Articles are licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
