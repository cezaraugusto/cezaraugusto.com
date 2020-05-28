---
title: The years at Brave
date: 2020-05-28
image: /assets/images/posts/post-004/thumbnail.png
caption: An identifier sticker I got from the last all hands event, now beautifully decorating my coffee machine.
tags:
  - work
---

The first moment I saw Brave, I wanted to be associated with it. They were a small team with a vision working on an open-source project [written in JavaScript](https://github.com/brave/browser-laptop). It was 2016.

On May 15th, 2020, it was my last day working for Brave.

I took my time to reflect on what happened in these last four years. A relationship of four years is something. You can't hide me from your mother for that long.

This blog post is about me, and Brave, and the last four years.

## 2016

It all started in 2016. I liked Brave from the start. I saw a tweet, tried it, liked it. The desktop browser was still raw, but I liked the initiative and wanted to help somehow. I thought it would be cool to start by retweeting their updates.

I think it started with this tweet.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Windows friends: Looking for a fast, safe, beautiful and way cool browser? Switch to <a href="https://twitter.com/brave?ref_src=twsrc%5Etfw">@brave</a> 🦁👌 <a href="https://t.co/hiAYYZTjmZ">https://t.co/hiAYYZTjmZ</a></p>&mdash; Cezar Augusto (@cezaraugusto) <a href="https://twitter.com/cezaraugusto/status/723541059268173826?ref_src=twsrc%5Etfw">April 22, 2016</a></blockquote>

Which Brave later retweeted:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Time to switch! <a href="https://t.co/GhlmA8tz96">https://t.co/GhlmA8tz96</a></p>&mdash; Brave Software (@brave) <a href="https://twitter.com/brave/status/723542469862805506?ref_src=twsrc%5Etfw">April 22, 2016</a></blockquote>

Social media has this magic power. This retweet made me feel good and validated, and that action motivated me to keep helping their product somehow.

At the time, Brave had less than 10 engineers working on their desktop browser, but their pile of issues was increasing fast. To this day, **I've never seemed a project with so many issues reported** (massive 11,978 issues, of which [11,310 somehow tag my username](https://github.com/brave/browser-laptop/issues?q=is%3Aissue+is%3Aclosed+%40cezaraugusto)). So I thought it would be wise to start with bug triaging until I could figure out how the project works.

After a few weeks reporting bugs and hacking around, on June 2, 2016, I [sent my first pull-request](https://github.com/brave/browser-laptop/pull/1907). I still remember the feeling of opening the packaged software, installing, and seeing the feature I added live in the release channel, for everybody to download. I think I asked around five people to they could try out my proud contribution.

{% Figure {
  src: '/assets/images/posts/post-004/001.jpg'
} %}

You could now print a web page from the context menu.

Eight days later, [another pull-request](https://github.com/brave/browser-laptop/pull/2038).

{% Figure {
  src: '/assets/images/posts/post-004/002.jpg'
} %}

**I got engaged.** I kept contributing. There is this magical feeling of working on open-source initiatives where your code ends up serving several (I guess tens of thousands, at the time) people.

Can you believe that [one of my pull-requests](https://github.com/brave/browser-laptop/pull/2644) ended up featured in a tweet from Brave's CTO, [Brian R. Bondy](https://twitter.com/brianbondy)? I was just another contributor (Brave had many at the time), but hey, I was being noticed!

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Some nice animation polish done by a <a href="https://twitter.com/cezaraugusto?ref_src=twsrc%5Etfw">@cezaraugusto</a> in <a href="https://twitter.com/brave?ref_src=twsrc%5Etfw">@brave</a> 0.11.2 :D Thanks for the contributions! <a href="https://t.co/XSWvXOxL2f">pic.twitter.com/XSWvXOxL2f</a></p>&mdash; Brian R. Bondy (@brianbondy) <a href="https://twitter.com/brianbondy/status/761281701742014464?ref_src=twsrc%5Etfw">August 4, 2016</a></blockquote>

I was lucky that Brian found value in my contributions, questionings, and genuine willingness to make the browser software better. After a few months contributing code as an outside collaborator, this happened:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Happiest tweet ever: Starting today, I&#39;m joining the awesome <a href="https://twitter.com/brave?ref_src=twsrc%5Etfw">@brave</a> team. 🦁 🏆</p>&mdash; Cezar Augusto (@cezaraugusto) <a href="https://twitter.com/cezaraugusto/status/771351046853627904?ref_src=twsrc%5Etfw">September 1, 2016</a></blockquote>

My most significant contribution to Brave at the time also came in around the same time. I was the lucky person responsible for implementing the most visited and iconic page on Brave, the **new tab page**.

{% Figure {
  src: '/assets/images/posts/post-004/003.gif',
  caption: 'This is what NTP looked like at the time in the prototype I built. Brave used to have 3 rows of top sites.'
} %}

And that's all for 2016. There I was, a proud new member of the Brave crew. Feeling proud, shipping the most visited page a browser has, doing open-source for a living, living the dream. This year was 2016.

## 2017

{% Figure {
  src: '/assets/images/posts/post-004/004.jpg',
  caption: 'This is me at Chicago, where the gathering happened.'
} %}

At the time, the desktop browser was having several performance issues, so the team decided to gather together to fix them (we did) in Chicago. There I also had the chance to help to interview a candidate for Brave for the first time. I find job interviews fascinating (still do, at least the principles I try to apply to them) — a positive experience. I would later help with other interviews a few more times.

There, I also had the chance to be featured live, representing Brave, for the first time. It was a chat we had with the fine folks of [Brave Indonesia](https://twitter.com/IndoBrave/).

<figure>
  <div class="image--filter">
    <img src="/assets/images/posts/post-004/005.jpeg">
  </div>
  <figcaption>
  {{ "I'm the person sitting in the middle inside the video, along with [Brian R. Bondy](twitter.com/brianbondy) and [Brian Clifton](https://twitter.com/_brianclifton).<br>  Photo extracted from [@IndoBrave](https://twitter.com/IndoBrave/status/893320436397645824)" | markdownify_inline | safe }}
</figcaption>
</figure>

Speaking of representing Brave, and still speaking about first-times, this year I had the chance to [speak at a conference](https://twitter.com/brave/status/903761397154160640) to talk about Brave. It was at [BrazilJS in 2017](https://web.archive.org/web/20171004170021/https://braziljs.org/conf/).

<blockquote class="twitter-tweet"><p lang="pt" dir="ltr">O que a brave pode melhorar a web. <a href="https://twitter.com/brave?ref_src=twsrc%5Etfw">@brave</a> <a href="https://twitter.com/cezaraugusto?ref_src=twsrc%5Etfw">@cezaraugusto</a> <a href="https://twitter.com/hashtag/braziljs2017?src=hash&amp;ref_src=twsrc%5Etfw">#braziljs2017</a> <a href="https://twitter.com/hashtag/braziljs?src=hash&amp;ref_src=twsrc%5Etfw">#braziljs</a> <a href="https://t.co/hx88o1tc8e">pic.twitter.com/hx88o1tc8e</a></p>&mdash; Daniel Bastos 🇧🇷 (@danielbastos) <a href="https://twitter.com/danielbastos/status/904062303875846144?ref_src=twsrc%5Etfw">September 2, 2017</a></blockquote>

This year had me working mostly on tab features. Brave used to have tab pages, a set of visible tabs you could accumulate. At the time, you could add up to 20 tabs per tab group. We take tabs in browsers for granted, but tabs are a real complex mechanism. _Have you ever thought that tabs need to be responsive?_ [I did](https://github.com/brave/browser-laptop/pull/6900), and literally, added support for [a hundred of tabs](https://github.com/brave/browser-laptop/pull/7695).

I was also lucky to be the person to implement two new, important pages. The [private new tab](https://github.com/brave/browser-laptop/pull/8074), and [the welcome page](https://github.com/brave/browser-laptop/pull/8097d). 

The year also had me started working in parallel on the desktop browser migration from [Muon](https://github.com/brave/muon) (a fork of Electron) to [Chromium](https://github.com/brave/brave-browser). Mainly on the [Brave Shields](https://github.com/brave/brave-extension/) port, my favorite part of Brave.

During the migration process, I realized this was the ideal time to create a component library that could be reused across products. I wanted to make something new and somehow make the refactoring more fun. Over one weekend, I created a proof-of-concept work and shared it with a few peers who thought it was a good idea. One week later, I [pushed the first commit](https://github.com/brave/brave-ui/commit/b1b71393d429349243916e13b34e35edc238161) of what would be called [brave-ui](https://github.com/brave/brave-ui). A set of reusable React components that accomplished the goal of having a shareable interface across Brave products. The project would later inspire the formation of a design system (months before _design systems_ were cool and somewhat common).

Doing performance work, help conducting a job interview, speaking in a great conference about Brave, several fixes for browser tabs, two new browser pages, a component library shared across the company's product. The year of 2017 was full of accomplishments. I was ready for the next.

## 2018

{% Figure {
  src: '/assets/images/posts/post-004/006.jpg',
  caption: 'The crew at the 2017 all hands event.'
} %}

This year I started working full-time on the port of the desktop codebase. I was one of the first engineers to work on this initiative. At the time, I was working on the [V2 version](https://github.com/brave/browser-laptop/pull/13197) of Sync, delayed in favor of the Chromium migration.

The new browser was great. I was excited to work on top of Chromium. My work started with me [porting](https://github.com/brave/brave-core/pull/105) the private new tab, [and later](https://github.com/brave/brave-core/pull/256) the brand new welcome page. Later, Sync V2 [eventually featured](https://github.com/brave/brave-core/pull/1019) in the Chromium version.

<figure>
  <img
    src="/assets/images/posts/post-004/007.jpg"
    style="box-shadow: none;"
  >
  <figcaption style="padding: 0;">
    This is how the welcome page looked like back in the days.
  </figcaption>
</figure>

Another speaking opportunity came in, and in October, I spoke at [Conexão KingHost](https://www.conexaokinghost.com.br/) to talk about Brave, digital ads, and blockchain. The event happened online. If I recall correctly, it had 5k+ subscribers for the edition.

The event was a great, funny, joyful experience, where I get the chance to know the dedicated and talented people behind [@kinghost](https://twitter.com/kinghost).

<blockquote class="twitter-tweet"><p lang="pt" dir="ltr">Ligadaço na <a href="https://twitter.com/hashtag/ConexaoKingHost?src=hash&amp;ref_src=twsrc%5Etfw">#ConexaoKingHost</a> com <a href="https://twitter.com/cezaraugusto?ref_src=twsrc%5Etfw">@cezaraugusto</a> - Resolvendo o problema com serviços e propaganda digital através do blockchain!! <a href="https://t.co/VqCX2X9L79">pic.twitter.com/VqCX2X9L79</a></p>&mdash; Wesley Mendes (@wesgtox) <a href="https://twitter.com/wesgtox/status/1052642641400262665?ref_src=twsrc%5Etfw">October 17, 2018</a></blockquote>

At this time, I also had the chance to help to mentor two talented engineering interns. We talked a lot about bugs, tests, life, and I was able to help and see them grow in confidence as they shipped valuable code.

Mentoring is one of my favorite things about programming, and I'm happy I had this chance many times at Brave, with both juniors and seniors from other teams. Who in this world never bargained Polymer skills for some C++ guidance?

Working full-time on the new desktop version was exciting. Sync V2 took a huge amount of time and effort to land for several reasons, and I felt relieved [when it landed](https://github.com/brave/brave-core/pull/1019). Sync was one of the most wanted features in the new Brave version.

Speaking at a conference again gave me a confidence boost that positively reflected in my daily work. The new browser felt great. Users were happy. Could I ask for more?

It was 2018.

## 2019

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">merged yesterday in our nightly channel the new interface for Shields in Brave desktop browser. Great stuff is coming up for all of you fighting for a better web! <a href="https://t.co/IGRIO2yxTK">pic.twitter.com/IGRIO2yxTK</a></p>&mdash; Cezar Augusto (@cezaraugusto) <a href="https://twitter.com/cezaraugusto/status/1105975164704116736?ref_src=twsrc%5Etfw">March 13, 2019</a></blockquote>

The year started with me working on some Sync bugs. I [pushed a change](https://github.com/brave/brave-core/pull/2874) that got Shields a brand new interface. Shields and Sync dictated the rest of the year.

This year I got another chance to help interns at Brave, but now taking full ownership of the whole interview process (up to where I'm legally allowed). From picking up a candidate from the list, passing through technical and social interviewing, to job offer. An incredible experience. I was lucky to pick up a talented front-end engineer to mentor. We had fun times and shipped quality software. Mentoring is fun.

My only regret is not having a picture to share. I went to San Francisco again to meet them and got to know the new company office. SF is great. I got to eat at the famous Fogo de Chao, took a daily city walk, got lost a couple of times. Fun!

In October, I got the chance to work on a cool feature that would ask if you want to load an archived version of an error page — using the Wayback Machine API (where I coined the name _Braveback_ Machine). [The work](https://github.com/brave/brave-core/pull/3561) started as a browser extension, and eventually, my peer [@simonhong33](https://twitter.com/simonhong33) ported it to C++, for maximum performance.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Available on <a href="https://twitter.com/brave?ref_src=twsrc%5Etfw">@brave</a> nightly: check if a missing website has an archived version available in <a href="https://t.co/JQMrtsJ5KA">https://t.co/JQMrtsJ5KA</a>. Solid work I got the chance to do with my talented peers <a href="https://twitter.com/simonhong33?ref_src=twsrc%5Etfw">@simonhong33</a>, Karen, and <a href="https://twitter.com/rebron?ref_src=twsrc%5Etfw">@rebron</a>. <a href="https://t.co/BM5r9aoTxx">pic.twitter.com/BM5r9aoTxx</a></p>&mdash; Cezar Augusto (@cezaraugusto) <a href="https://twitter.com/cezaraugusto/status/1207701750960050177?ref_src=twsrc%5Etfw">December 19, 2019</a></blockquote>

Sync, Shields, interviewing, management, mentoring, Wayback Machine.

Bye 2019.

## 2020

The year started with me finally managing to work on my dream issue, [a long-needed refactor of new tab page's top sites](https://github.com/brave/brave-core/pull/4325), along with some other features and bugs. This task was my short movie version of ([_The Last Dance_](https://en.wikipedia.org/wiki/The_Last_Dance_(2020_TV_series))). Me and Brave shaked hands formally for the last time a few months after this change landed.

At Brave, I got to know a lot of talented people, helped shape the desktop software as it is known today, spoke the good news about the company for a large audience, mentored peers, interviewed people, managed people, had fun.

<div>
{% FluidText { min: '4.2rem', scaler: '17.9vw', max: '8.8rem',
  text: 'I HAD A LOT'
} %}
{% FluidText { min: '6.8rem', scaler: '29.1vw', max: '14.4rem',
  text: 'OF FUN'
} %}
</div>

Saying goodbye is never easy, but as I finish this blog post, I'm thankful to say that the only memories I have at my time on Brave are happy.

Some people like to work for big companies. Some people like to work to make companies big. I feel rewarded seeing Brave growing strong every year. With about [ten million](https://brave.com/brave-passes-10m-mau/) monthly active users, Brave is not small anymore, by any means. I can't help but smile and feel thankful that ten million people are every month, seeing, interacting, and using features made with a code I co-created.

Brave is making history, and I'm proud to say I'm part of it.

Onwards!

<hr>

Dear Brave Software,

<div>
{% FluidText { min: '7.3rem', scaler: '31vw', max: '15.2rem',
  text: 'THANK'
} %}
{% FluidText { min: '12.8rem', scaler: '52.7vw', max: '25.8rem',
  text: 'YOU'
} %}
</div>
<hr>
