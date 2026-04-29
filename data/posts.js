// =============================================================
// YOUR BLOG POSTS
// Edit this array to add, remove, or update posts. The page
// re-renders automatically based on what's here.
//
// Body supports light markdown: ## heading, ### subheading,
// > blockquote, ![alt](image-path) for images, and
// blank-line-separated paragraphs.
// =============================================================
const posts = [
  {
    title: "The biggest influences on your life are the people who are only about 1 to 2 steps ahead of you",
    date: "2026-04-29",
    tags: ["Blog Post"],
    excerpt: "The most useful role models are the ones 1–2 steps ahead of you.",
    body: `**Opinion:**

The most inspiring role models are those not necessarily at the apex of their domain, but rather those who provide a realistic enough image of who you can be:

- Not the supermodel, but the guy/girl who's been training just slightly longer than you and has an above-average physique that you see as genuinely attainable
- Not the billionaire, but the relative who just started their first business, or that older cousin who got a promotion at work in a career path that you're aspiring to get into
- Not the professor, but that UNI acquaintance who understands the coursework just enough to teach it in a way that finally clicks
- Not the linguist, but that friend of yours who can speak a little bit more of a foreign language than you can

These people might not offer perfection, but they do offer proximity. In a sense it's proof that the first step/few steps on your journey to where you want to be is genuinely reachable.

An antidote to inaction.`
  },
  {
    title: "I Have To vs I Get To",
    date: "2026-04-29",
    tags: ["Mental Models"],
    excerpt: "A small but powerful reframe",
    body: `> "Everything can be taken from a man but one thing: the last of the human freedoms - to choose one's attitude in any given set of circumstances." - Viktor Frankl, Man's Search for Meaning

This isn't toxic positivity but rather, a small but very powerful cognitive reframing technique to put things into perspective occasionally.

…And a reminder of just how good you have it.

The *'I have to'* way of thinking vs the *'I get to'* way of thinking.

One connotes stress, resentment and frustration. The other shifts the paradigm completely - encouraging you to focus on opportunity and privilege.

Here are some examples:

- *I have to go to the gym today* → **I get to go to the gym today** *(somewhere, someone physically can't)*
- *I have to go to work* → **I get to go to work** *(a job, an income, a sense of purpose)*
- *I have to cook dinner* → **I get to cook dinner** *(food on the table, a home to cook in)*

Perspective is everything.`
  },
  {
    title: "My Opinion on Vibe Coding",
    date: "2026-04-29",
    tags: ["Blog Post"],
    excerpt: "The barrier to building has never been lower, but fundamentals matter more than ever.",
    body: `**April 2026:**\nThese views are likely to get outdated fast, but here is a short stream of consciousness around what I have experienced around the current state of 'vibe coding', a term popularised around early 2025 around the usage and reliance on LLMs to generate, refine and ship code.

## 1. The bar to get started has never been set lower

The gap between imagination and implementation has never been slimmer. If you are someone with a vision who is motivated enough to start, in terms of prototyping an idea and developing a proof of concept (POC), the barrier is no longer whether you can code or not. That's simply been taken away, and the exploratory and early implementation phase of an idea has never been more democratised.

## 2. Fundamentals matter more than ever

Vibe coding tends to work well, until it doesn't. Until you need to scale for growing users, or meet enterprise-grade security requirements. Until you have to deeply understand why something is almost working, but not quite…or why that number you calculated has suddenly spiked or nose-dived without much surrounding knowledge or context.\n\nWhen you build something you fully understand based on the basis of first-principles thinking, there's a robustness to that; you build a complete mental model of each line of code…each minor component to your solution and an ability to be agile and change course if needed.\n\nIt's when you can ground yourself in the fundamentals that AI really has a profound impact, particularly in terms of generating boilerplate, planning, introducing you to new ideas and performing/suggesting QA checks.

More to come…`
  },
  {
    title: "A Note on Simplicity",
    date: "2026-04-28",
    tags: ["Blog Post"],
    excerpt: "A handful of core principles tend to drive most of the outcome - in fitness, finance, friendship, and just about everywhere else.",
    body: `> What you need to do is identify the core principles - generally 3-12 of them that govern the field. The million things you thought you had to memorise are simply combinations of the core principles. - John Reed, Succeeding

![Complex vs Simple](assets/images/posts/simple.png)

Does the perceived complexity of a subject matter or goal hold us back, either from getting started or staying motivated enough to continue?

I'd say, 'yes'.

The above quote is powerful because with so many real-life phenomenon you see this apply:

- Around 90% of improving your body composition is just training with progressive overload, consistently hitting macros, hydrating and sleeping
- In personal finance, spending less than what you earn, saving and investing the difference and being patient forms the vast majority of what is needed to succeed
- Making friends as an adult comes down to very little apart from taking the first step (by initiating plans etc.), showing a genuine interest and not making communication too infrequent

Why do we tend to overcomplicate it all? I like the way Morgan Housel puts it:

> In most fields a handful of variables dictate the majority of outcomes. But paying attention to only those few variables can feel like you're leaving too much on the table.

Simple is often the answer, or at worst, a far better starting point than we might have thought.`
  },
  {
    title: "Fluid vs Crystallised Intelligence",
    date: "2026-04-27",
    tags: ["Mental Models"],
    excerpt: "Two kinds of smarts: the reasoning you bring to new problems, and the knowledge you've stockpiled over a lifetime.",
    body: `Fluid intelligence involves the ability to reason and think flexibly, whereas crystallised intelligence refers to the accumulation of knowledge, facts, and skills that are acquired throughout life.

![Fluid vs crystallised intelligence](assets/images/posts/head.png)`
  },
  {
    title: "Perverse Incentives",
    date: "2026-04-27",
    tags: ["Mental Models"],
    excerpt: "When the reward you offer ends up producing the exact problem you were trying to solve.",
    body: `## Overview

A perverse incentive is a particular type of incentive which produces an undesirable result that acts contrary to its original intention.

Two really evident examples come to mind:

### Cobra effect

The British government (during the colonial British Raj period) were concerned about the number of venomous cobras in Delhi, hence they offered a bounty for every cobra killed. Initially this was successful, with large numbers of snakes killed for the reward. However, entrepreneurs began breeding cobras specifically to claim the bounty. When the government cancelled the programme, the now worthless snakes were released into the wild, exacerbating the problem significantly beyond its original scale.

![](assets/images/posts/snake.jpeg)

### The Great Hanoi Rat Massacre

Hanoi, Vietnam, under French colonial rule (circa 1902) had a similar problem, but on this occasion concerning rats. A similar bounty programme was therefore introduced, whereby returning a severed rat tail as proof of a kill was met with monetary compensation. As people realised that only a rat tail was required, many began breeding rats to accumulate more tails to profit from the bounty. When the authorities became aware of the practice, the initiative was scrapped, and the now worthless rats were released back into the wild, multiplying the severity of the original problem.`
  },
  {
    title: "Prospect Theory",
    date: "2026-04-27",
    tags: ["Mental Models"],
    excerpt: "The pain of losing is psychologically twice as powerful as the pleasure of gaining.",
    body: `Prospect Theory is a behavioural economics concept that suggests the pain of losing is psychologically more than twice as powerful as the pleasure of gaining an equivalent amount.

![Prospect theory value function](assets/images/posts/prospect-theory.png)`
  },
  {
    title: "Welcome to the blog",
    date: "2026-04-27",
    tags: ["Meta"],
    excerpt: "A quiet corner for longer-form notes that don't fit in a book review.",
    body: `## Why a blog?

The library is for books. This is for everything else - ideas I've been mulling over, things I've learned, notes I want to be able to find again later.

Think of it as one centralised place for the knowledge I've picked up over the years.

## What to expect

Short pieces, mostly. Written when I have something worth saying, not on a schedule.`
  }
];
