---
title: Agents will ship the next browser extensions
description: For years, browser extensions were a craft for a few stubborn developers. AI agents are about to change who builds them, and the part that still hurts is shipping.
date: 2026-11-25
image: /static/images/posts/post-007/thumbnail.png
alt: Extension.js logo, a handshake, and the extension.dev logo
imageWidth: 1200
imageHeight: 630
tags:
  - webExtension
  - browser
  - ai
---

This year I completed a decade of building extensions for the browser. I started contributing to Brave in 2016, triaging bugs on a browser [written in JavaScript](https://github.com/brave/browser-laptop). In 2020 I wrote about [what changes in Manifest V3](/posts/what-changes-in-chrome-extension-manifest-v3/). The same year, I started [Extension.js](https://github.com/extension-js/extension.js).

The reason was simple. I wanted to build one extension and run it everywhere, and no browser vendor was ever going to build that tool for me. Each vendor cares about its own browser first. Developers care about their users, and their users are spread across Chrome, Edge, Firefox and Safari.

This post is about why I think extensions are about to get a lot more builders, and why most of them won't be people.

## Extensions were always the hard kind of web app

An extension looks like a small web app. It is not.

It has a manifest that every browser reads a little differently. It has a background context that can be put to sleep at any moment. It has content scripts that run inside pages you don't control. Then, when it finally works, you have to package it and submit it to each store, one at a time, each with its own review, its own credentials and its own rules.

None of this is hard to understand. It is just a lot of small, specific rules, and that is where people get tired and give up.

Extension.js was my answer to the first half of that. One command creates a project, one command runs it in a real browser, and one command builds a store-ready ZIP file for each target:

```bash
npx extension@latest create my-extension
cd my-extension
npm run dev
```

My goal with open source is always sharing what is useful to me in the hope that other developers find it useful too, so Extension.js stays true to its intent: MIT licensed, free, and it stays that way.

## Then the agents showed up

Something changed in the last year. People stopped asking about "how do I write this content script?" and started asking "why did my agent write this content script wrong?"

That is a different question. An agent can write a popup in React faster than I can. What it can't do on its own is know that a permission silently breaks review on one store, or that a service worker went to sleep and took its state with it. Extensions fail quietly. An agent that can't see the failure can't fix it.

The numbers say this shift is real for Extension.js. The `extension` package on npm was downloaded 4,742 times in November 2025. In the 30 days ending November 24, 2026, it was downloaded 56,676 times. That is about twelve times more in a year. The repository has passed 5,200 stars on GitHub. I didn't add twelve times more features. More people, and more of their tools, started building extensions.

I see the same thing from another angle. I maintain [chromium-edge-launcher](https://www.npmjs.com/package/chromium-edge-launcher), a small package that launches Edge with the DevTools Protocol port open. It was downloaded about 59 million times last month. Almost nobody types its name. Automation pulls it in. That is what a tool looks like when machines are the main users, and I think extension tooling is heading the same way.

## What an agent needs to ship an extension

Watch an agent try to build an extension from start to finish, over and over, and the pattern is clear. It needs three things:

1. **A predictable framework.** The fewer special cases, the better the output. Zero config is not a nice-to-have for an agent; it is the whole point.
2. **The rules, written down.** Cross-browser quirks, silent failures and the publish checklist, in a form the agent can read before it acts.
3. **Hands.** A way to create, build, preview and submit from the chat, without a person clicking through four store dashboards.

Extension.js covers the first one. The other two became [extension.dev](https://extension.dev).

## Where extension.dev fits

extension.dev is the platform I am building around that last mile. Its homepage says it better than I can: "Built for developers. Ready for their agents." You describe an extension, run it in minutes, and send it to the stores.

It ships an [MCP server](https://docs.extension.dev/tools/mcp), `@extension.dev/mcp`, that gives an agent tools to create, build, preview and submit to the Chrome, Firefox, Edge and Safari stores. It also ships an [agent skill](https://docs.extension.dev/tools/skill) that teaches the agent the cross-browser rules before it writes a line. In our own graded evals, an agent with the skill passed 15 of 15 checks, against 10 of 15 without it.

The split between the two is on purpose. Extension.js is the framework you run on your own machine, and it ends at packaging. extension.dev is where it ships. Sponsorship funds the framework, and paid plans fund the platform. extension.dev is a sponsor of Extension.js, and the framework doesn't depend on it.

The platform is still in private alpha, but the MCP server and the skill are public. Send an email to hello@extension.dev if you want an invite when the platform is stable enough.

## Why now

Three things happened at the same time.

Manifest V3 settled, so the target stopped moving. Agents got good enough to write real extension code, so the number of people who can build an extension jumped. And the bottleneck moved: writing the code is no longer the slow part. Shipping it to every store is.

That last part is where I have spent the last six years, one browser quirk at a time. I think the next million extensions will be described by people and built by agents. I want them to work in every browser, and I want them to actually reach the stores.

If you build with an agent, you can try the public part today: add the [extension.dev MCP server](https://docs.extension.dev/tools/mcp) to your agent, ask it to build an extension for every browser, and see how far it gets. When it breaks, [open an issue](https://github.com/extensiondev/mcp/issues) or write to hello@extension.dev. I read every one.
