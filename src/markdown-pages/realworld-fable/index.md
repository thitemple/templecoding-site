---
title: RealWorld Fable
path: /real-world-fable
order: 0
series: RealWorld Fable
---

### Intro

In this series of articles, I'm going to walk you through how to build a front-end web application using [F#](https://fsharp.org) that will be compiled down to JavaScript using [Fable](https://fable.io). I'll be using [Elmish](https://elmish.github.io/elmish/) to structure and organize this application. We're going to build something that can be used as a reference in case you decide to build your own application, consuming APIs, using authentication, routing, all that kind of stuff.


### What will be built?

If you never heard of the [RealWord example apps](https://realworld.io) project you should check it out. The idea is pretty simple: build a complex enough app that folks can use as RealWorld reference.

*So what's the app people are building?* It's **Conduit**, a medium.com clone. If you visit the [RealWorld example apps](https://realworld.io) site you're gonna find some live demos.

Here what you'll find is a walk-through on how to build a version of Conduit using [F#](https://fsharp.org), [Elmish](https://elmish.github.io/elmish/) and [Fable](https://fable.io).

The goal is to build this application in a series of small, gentle and palatable lessons.

### What's F# and Fable

Here's a **TL;DR** explanation: F# is a functional programming language that runs of top .NET and Fable is a compiler powered by [Babel](https://babeljs.io/) that will compile F# code to JavaScript.

If you want more then that, I suggest you visit their sites [F#](https://fsharp.org) and [Fable](https://fable.io).

### What about Elmish

Elmish is an F# implementation of the [Elm architecture](https://guide.elm-lang.org/architecture/). [Elm](https://guide.elm-lang.org/) is another functional programming language and as part of how one would develop an application using it, normally you'd be using the Elm architecture.

We'll go through what the architecture is later on.

### Who's is this for?

This walk-through is targeted at folks who have experience with front-end development, probably some JavaScript. I will not assume you know any F#, Fable nor Elmish. We're gonna walk through those together.

### Table of Contents

1) [Pre-requisites](/real-world-fable/01-pre-requisites)
2) [Hello F# and Fable](/real-world-fable/02-hello-world-fsharp-fable)
3) [F# Basics](/real-world-fable/03-fsharp-basics)