---
title: What changes in Chrome Extension Manifest V3
description: Major change includes changes in almost every field of the Manifest file, permissions updates, API changes, and more.
date: 2020-03-17
tags:
  - webExtension
  - chrome
  - browser
---

A few months ago, I announced (a personally ambitious move) on Twitter that I [started writing](https://twitter.com/cezaraugusto/status/1210275097774379009) a [book about WebExtensions](https://github.com/cezaraugusto/web-extensions-for-the-builders). It was just about the same time I saw a talk about [Chrome extensions and the world of tomorrow](https://www.youtube.com/watch?v=7-ALJiZCI6w).

Being Chrome the browser that championed the Extensions concept, I got interested to know the changes behind [their decision](https://security.googleblog.com/2018/10/trustworthy-chrome-extensions-by-default.html) to [roll out](https://bugs.chromium.org/p/chromium/issues/detail?id=896897&desc=2) the update. How does it affect the ecosystem? What changes in real-terms? What do extension developers need to know?

That was when the idea of this post came into mind. This blog post is the result of personal research, mostly based on the publicly available [Chrome's Manifest V3 design document](https://docs.google.com/document/d/1nPu6Wy4LWR66EFLeYInl3NzzhHzc-qnk4w4PX-0XMw8/edit#heading=h.eezuzudj00ye). All other resources are linked wherever they are mentioned.

> While Manifest V3 is not finished at the moment of this writing, several fundamental changes are already available in Chrome Canary.

## Motivations behind the Manifest V3 update

According to the [design document (draft)](https://docs.google.com/document/d/1nPu6Wy4LWR66EFLeYInl3NzzhHzc-qnk4w4PX-0XMw8/edit#heading=h.eezuzudj00ye), the motivations for this update were divided in three core areas:

```diff
- "manifest_version": 2,
+ "manifest_version": 3,
```

* **Security**. Improve security guarantees against external attackers and malicious extensions. Increase the end-user trust in what they install.
* **Privacy**. Give users more control over what an extension can run/access. Encourage developers to use in-context permission requests and temporary permission grants, namely `activeTab.`
* **Performance**. Reduce the number of resources consumed by an extension over its lifetime. Disallow long-running background processes.

Based on these three key points, some Manifest fields such as background scripts, content scripts, and host permissions were updated. This update also changed important/popular APIs such as `webRequest,` `declarativeNetRequest,` and the `browserAction`/`pageAction` APIs

## What changes in Manifest V3?

* **Changes in the background context**. A service worker replaces the background script, end of long-lived/DOM-supported backgrounds.
* **Changes in the Manifest host permission specification**. New field for `host_permissions`, drop support for `<all_urls>`, `activeTab`-style host permissions.
* **Changes in the Manifest Content Security Policy**. Split CSP per context, disallow `script-src`, `worker-src`, `object-src`, and `style-src` with non-local values.
* **Changes in content scripts cross-origin capabilities**. Content scripts will be allowed to execute cross-origin requests only where the host page is allowed.
* **Deprecate NaCl/PNaCl**. Extension authors should finish their native code to WebAssembly as NaCl/PNaCl (already deprecated) will stop working.
* **Promise-based APIs**. Instead of callbacks, authors can take advantage of Promises. The current callback version will still be supported.
* **API changes** Changes in `webRequest`, addition of `declarativeNetRequest`, merge of `browserAction` and `pageAction`, `chrome.favicon` namespace instead of `chrome://favicon`. Maybe more.
* **More restrictions for Web-Accessible resources**. All resources to be loaded should be declared. Resources URL will be exposed using a unique identifier, instead of through their path.
* **Dynamic Content Scripts**. Support the ability to add/remove and enable/disable content scripts permissions dynamically.

### Changes in the background context

In the extension context, "background" pages/scripts refer to the code that runs in the background process, invisible to the user, and allows extensions to execute (and listen) for code outside any tab or window.

With Manifest V2, you have two types of background processes: persistent pages (in theory, if you need to use the [`webRequest`](https://developer.chrome.com/webRequest) API) and lazy (event) pages.

In Manifest V3, **the only background option will be using a service worker**.

```diff
"background": [{
-  "scripts": ["background.js"]
+  "service_worker": ["background.js"]
}],
```

Since [Service workers were inspired by background pages](https://developer.chrome.com/extensions/migrating_to_service_workers), we should not have any problems updating an extension using event pages for background processes. In their execution context, both can listen and terminate events when they are no longer needed.

Unlike background pages (which inherits from the `Window` scope), The service workers' scope is limited. It inherits its interface from [WorkerGlobalScope](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope), a child of [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget), so it has no means to access the DOM. Another change is for extensions that use the long-lived background to store a global state. Since **service workers are event-based**, there is no way to save a permanent state in long-lived backgrounds anymore.

If your extension falls into one of these cases, take a look at [Migrate to Event-Driven Background Scripts](https://developer.chrome.com/extensions/background_migration). If the above situations do not apply to you, but still concerns, Chrome has a [Service Worker migration guide](https://developer.chrome.com/extensions/migrating_to_service_workers) to help you through the migration process.

### Changes in the Manifest host permission specification

The host permission allows extensions to inject scripts on and intercept network requests from the host. In Manifest V2, extensions can request hosts by:

* **Specificity**, like, `https://cezaraugusto.net.`
* **Patterns**, like `https://*.cezaraugusto.net.`
* **Special keys**, like `<all_urls>.`

```diff
+ "host_permissions": [
+  "*://*.twitter.com/*",
+  "*://*.instagram.com/*",
+ ],
"permissions": [
-  "*://*.twitter.com/*",
-  "*://*.instagram.com/*",
  "webRequest",
  "webRequestBlocking",
],
```

In Manifest V3, a new manifest key `"host_permissions"` was added to host permissions and will be used only for API permissions. What is also new is that **host permissions will require runtime approval by the use**. This change plans to give users more control over permissions.

Exceptional cases in extensions that require broad permissions such as `*://*/*` and `<all_urls>` are rare, but often abused by developers. With Manifest V3, Chrome plans to prevent it by dropping support for `<all_urls>` and start asking permissions at runtime, using an [activeTab](https://developer.chrome.com/extensions/activeTab)-style host permission by default, with extra options such as to always run on a specific site. In Manifest V3 public design document, using the [`chrome.permission`](https://developer.chrome.com/apps/permissions) API is also under consideration.

> `activeTab` allows temporary access to an extension in the active tab after user invocation (such as clicking a browser action). If a user clicks an extension on a website, there is an implicit understanding that they are allowing the extension to see its contents.

It's recommended that while developing your extension, try to target interactions around temporary host permissions (see `activeTab` itself).

### Changes on the Manifest Content Security Policy

With the Manifest V3 update, **Chrome will disallow extensions from using remotely-hosted JavaScript, CSS, and WebAssembly code**. Extensions will still be able to make server communication to request data, such as loading JSON, requesting media access, and remote API calls.

Chrome plans to make this change by changing how CSP works in the Manifest file (along with undisclosed policy changes). The `content_security_policy` property is now split into three main categories:

```diff
-  "content_security_policy": "font-src 'self' data:; script-src 'self';"
+  "content_security_policy": {
+  "extension_pages": "font-src 'self' data:; img-src 'self'",
+  "isolated_world": "script-src 'self'",
+  "sandbox": "worker-src: 'self'"
+ }
```

* `extension_pages`. Directives for the service worker and extension pages.
* `isolated_world `. Used by content scripts to protects you against attacker's attempts against your extension.
* `sandbox`. Used for sandboxed pages.

Another change is with the directives `script-src,` `worker-src,` `object-src`, and `style-src` with that will be disallowed from using non-local values.

The official migration guide has a [dedicated section](https://developers.chrome.com/extensions/migrating_to_manifest_v3#csp_changes) about all the CSP field changes.

### Changes in the content scripts cross-origin capabilities

Right now, extensions can make cross-origin requests via extension pages and content scripts. As long as Manifest's host permissions are defined, extensions can make cross-origin requests to any domain.

In Manifest V3, will stop content scripts will stop having special request privileges by allowing exclusive access only through its background page, using extension messaging. **Content scripts will only be allowed to make cross-origin requests that the host page is capable of doing**.

If a cross-origin request needs to perform where there's no permission, requests should be made from the background context and pass the response to a content script. See [Changes to Cross-Origin Requests in Chrome Extension Content Scripts](https://www.chromium.org/Home/chromium-security/extension-content-script-fetches) for proper guidance on how to execute cross-origin requests safely in an extension.

### Deprecate NaCl/PNaCl

NaCl (Native Client) and PNaCI (Portable Native Client) allow developers to run native compiled C and C++ code as part of their extension.

PNaCl support was dropped everywhere already, except inside Chrome Apps and Extensions. **Starting with Manifest V3, [NaCl and PNaCl](https://developer.chrome.com/native-client/nacl-and-pnacl) will no longer be supported**. Instead of PNaCI, extension authors should use WebAssembly. There is a specific [set of recommendations](https://developer.chrome.com/native-client/migration) to help developers and authors through the migration process.

### All APIs will be promise-based

The current callback version will still be supported. Providing a callback to an API method will prevent the promise from being returned. This backward compatibility allows developers to have more time migrating all the changes required in Manifest V3.

Worth noting that Firefox has been using a promise-based API for a while, and since Chromium represents all other major browsers, this change makes it easier for extension developers to create cross-browser extensions.

### API changes

* **`webRequest`** allows extensions to intercept network requests to modify, redirect, or using its blocking version, block them. In this change, **the blocking version will be limited**, possibly making blocking options observational for most events.
* **`declarativeNetRequest`** allows extensions to synchronously tell Chrome what to do with a request, rather than have Chrome forward the request to the extension. **It will be created as the primary way to modify network requests**.
* **`browserAction` and `pageAction`** allow extensions to create a toolbar icon. They **will be merged into a single `action` API**. Since their difference is not well defined and both APIs have the same UI surface in the toolbar (`pageAction` used to appear ephemerally inside the Omnibox).
* **`chrome://favicon`** **will move to a new API under `chrome.favicon.` namespace**. This API would be available with either new favicon permission, or with granted host permission for the requested favicon.
* **`chrome.capture`** the namespace will **allow extensions to capture the content of a user's screen**. The APIs `tabs.captureVisibleTab()`, `tabCapture.capture()`, `tabCapture.getMediaStreamId()`, `pageCapture.saveAsMHTML()`, and `desktopCapture.chooseDesktopMedia()` will be moved under it.
* **`chrome.notifications`** **will be replaced by** its native web counterpart, **the [Web Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/notification)**.
* **Update or remove APIs that returns `DOMWindow` or `HTMLElement`** since Service Workers runs on a different thread in the renderer without DOM access.
* **Deprecate APIs**. Discontinue APIs described [in this list](https://docs.google.com/document/d/1nPu6Wy4LWR66EFLeYInl3NzzhHzc-qnk4w4PX-0XMw8/edit#heading=h.32kivo9w2uy1).
* **Unused, unpopular and limbo APIs** are going to be removed too, such as `declarativeWebRequest` (obsolete with `declarativeNetRequest`).
* **Miscellaneous API changes** `i18n.getMessage` is considered to be changed, but the design document mentions the alternative for this method is TBD.

Note that the [API changes section](https://docs.google.com/document/d/1nPu6Wy4LWR66EFLeYInl3NzzhHzc-qnk4w4PX-0XMw8/edit#heading=h.xe5njuo7voeb) in Manifest V3 is not finished at the moment of this writing and thus prone to changes. If you are unsure about changes described here, use the linked material as the definitive reference.

### More restrictions for Web-Accessible resources

Web-Accessible resources are resources used in the context of a web page. An extension that modifies the interface of a page must specify the modifying resources in the Manifest file under the `web_accessible_resources` field.

In Manifest V3, resources restrictions will be stricter by requiring that any resource that will be loaded in an untrusted frame to be also specified.

```diff
{
  "web_accessible_resources": [
    "images/*.png"
  ]
}
```

Another change refers to the resources URL. Resources are identified as `chrome-extension://<extension-id>/<resource-path>`. This schema allows websites to fingerprint extensions. According to the [Manifest V3 design document](https://docs.google.com/document/d/1nPu6Wy4LWR66EFLeYInl3NzzhHzc-qnk4w4PX-0XMw8/edit#heading=h.46mbslraf4b6), Chrome plans to improve this by (optionally) allowing resources to only be exposed through a unique identifier, rather than through their path.


### Dynamic Content Scripts

Extensions will be able to dynamically add, remove, enable, and disable content scripts. This dynamic feature will allow extensions to add scripts only once they have such permission.

## Conclusions

There are many changes. Moving background scripts to a Service Worker is a big move, both for the platform and for authors. Another high point is the API moving to be promise-based, making the development of WebExtensions similar to Firefox's Add-On API. Considering there are no standards for Extensions, this is great for authors looking to ease the process of writing cross-platform extensions, considering that in theory, other Chromium-based browsers will not object in following changes that don't affect the output (such as API _promisification_).

Still talking about the code standardization, my bet is that other browsers will follow most of the Manifest V3 changes, despite some divergences. See [Firefox's Manifest V3 FAQ](https://blog.mozilla.org/addons/2019/09/03/mozillas-manifest-v3-faq/) and [Opera, Brave, and Vivaldi's opinions](https://www.zdnet.com/article/opera-brave-vivaldi-to-ignore-chromes-anti-ad-blocker-changes-despite-shared-codebase/) for more. 

Call me an optimist, but I hope this update also gives traction to the [browser extension community group](https://www.w3.org/community/browserext/).