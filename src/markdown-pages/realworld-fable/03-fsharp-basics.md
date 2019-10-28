---
title: F# Basics
path: /real-world-fable/03-fsharp-basics
order: 3
series: RealWorld Fable
--- 
In this lesson we're going to use the `src/App.fs` as a source material to understand the basics of F#, if you know you're F# already you can skip to next lesson, otherwise stick around.

Let's take a second look at what's inside the `src/App.fs` file.

```fsharp
module App

open Fable.React

type Model = string

type Msg = Msg

let init() = "Hello World from Fable and F#"

let update msg model = model

let rootView model dispatch = div [] [ str model ]

open Elmish
open Elmish.HMR

Program.mkSimple init update rootView
|> Program.withReactSynchronous "real-world-fable-app"
|> Program.withConsoleTrace
|> Program.run
```

We're going to start from the top.

### Modules

```fsharp
module App
```

In every F# file (except for scripts) there must be at least one module, a module is how code is organized and it works as you expect from other languages. Everything inside a module is available to that module, but in F# everything declared within an module is also public for consumers of that module.

In an F# file there can be more than a module, but that's not necessary, also, as convention folks tend to use the same name of the file as the name for the module, but that's not required.

To use artifacts from other modules you first need to open those just like seen here:

```fsharp
open Fable.React
```

That is used to open modules from external packages as well as your own modules defined in the same project. Again, everything that was defined in a module is public by default, unless you make them explicitly private.

Opening a module doesn't need to happen at top of the file, it can done lower in the file, just know that the artifacts of a module will be available only after the module was opened, i.e., the artifacts from `Elmish` and `Elmish.HMR` are only available to the portion of the code that is after they were opened.

### F# Types

F# is a static typed language and as such you'll be defining types from time to time. Most of the times, the types you'll be defining are either a `Record` or a `Discriminated Union`.

In this file we have both, first, let's start with the Record type:

```fsharp
type Model = string
```

This type is pretty straight-forward we're just declaring that it's of type `string`, so an instance of the record type  `Model` must be a string.

Normally we're gonna have more complex types, something like the following:

```fsharp
type Model = {
    CurrentPage : Page
    IsSignedIn : bool
    Username : string
}
```

This is more in line with what we see later on, a record type that holds, a CurrentPage that itself is of type `Page` (that can be another record type or a discriminated union), an IsSignedIn property of type `boolean` and the Username of type `string`.

To create an instance of that all fields are required and they must match the specified types. In our case, since the `Model` we have defined is just a string, a simple string will suffice. 

```fsharp
let model = "Hello World from Fable and F#"
```

The second type definition we see in the file is:

```fsharp
type Msg = Msg
```

And although it looks very similar to `Model` type it's not, again most of the times we're gonna see a more complex type. But we are going to make this simple type work as an example for now.

If you are familiar with an `enum` this has a similar behavior, but it's more powerful as we see as we progress. In this case we have a discriminated union (or an enum) of just on option, and it happens that only option has the same name as the type.

So `type Msg` is defining the name of the type and what's after the `=` are possible choices, in this case `Msg`.

Another way to write the same type is this:

```fsharp
type Msg =
    | Msg
```

Both are exactly the same, but normally when working with discriminated unions you'll see different choices, like the following:

```fsharp
type Msg =
    | Choice1
    | Choice2
    | Choice3
```

That now may be making more sense if you're comparing discriminated unions with enums. We have now 3 possible choices and as you can see the values of those choices can be named however one would like.

Finally (at least for now), discriminated union choices can carry data, and whatever data you'd like, as you can see here:

```fsharp
type Msg =
    | SetUsername of string
    | ArticlesFetched of Article list
    | HandleSubmitClicked
```

The above is more representative of what we're going to see. Three different choices and each may carry a different type of data, or no data.

`SetUsername` carries a string with it.

`ArticlesFetched` carries a list of (record or discriminated union) articles

And `HandleSubmitClicked` carries no data.

### Declaring Functions (or Binding Values)

In F# we (normally) don't assign values, we bind values to names. Functions are values like any other so, we bind them in the same way.

To bind a value or create a function we use the keyword `let` so in the following:

```fsharp
let init() = "Hello World from Fable and F#"
```

we're creating a function called init. Or you can also say that we're binding a value that happens to be a function to the name init. In this case, this is a very simple function, this function takes as an argument a special type called `unit` which are the `()` you're seen and it returns a `string`.

Well, it so happens that our `Model` type is an alias to a `string` so the init function actually takes `unit`, again the `()` and returns a `Model`.

What's `unit` you may ask? It's a special value used when a function needs to receive any value to be invoked but that value is not going to be used. `unit` is also used, when a function is performing some side-effect (such as printing to the console) and won't return any value back.

If you wanted to be explicit about the signature of the function you could change it to this:

```fsharp
let init() : Model = "..."
```

The `: Model` makes the returned value explicit. That's fine and sometimes needed, but since the F# compiler has a very powerful type inference you don't need to add it, and you'll see that many times you don't even need to specify what are the types being expected either.

For instance, the next function defined in our initial code:

```fsharp
let update msg model = model
```

The function is bound to the name `update` which is a fancy way of saying that we have a function named `update`. This function takes two arguments `msg` and `model`, in F# we define the arguments expected by a function separated by spaces.

After the `=` we have the body of the function, in this case we are just returning whatever was passed as the `model` argument. And the `msg` is not being used in the function.

Don't worry, that will make more sense later, for now the point is to understand the syntax.

We have a third and final function:

```fsharp
let rootView model dispatch = div [] [ str model ]
```

`rootView` is the name of the function and it takes two arguments `model` and `dispatch`, then in the body of the function it's calling a function called `div` which expects two arguments and those arguments are both lists.

A list in F# can be created with `[]`, so `[]` is an empty list.

`str` is another function, a function that expects a string. Hey! our model is a string, so the model is being passed as an argument to `str`.

The result of calling `str model` is a value that is in the second list. 

So, let's read that again

`div` is a function that expects two lists as argument, we're calling it (`div`) passing one empty list as the first argument and one second list that has only one value, the result of calling the function `str`.

The result of the function `div` is the what's being returned from the function `rootView`.

The actual signature of the `rootView` function if we were to define it explicitly is:

```fsharp
let rootView (model : Model) (dispatch : Msg -> unit) : ReactElement =
    div [ ] [ str model ]
```

`model` is of type `Model`.

`dispatch` is a function that takes a `Msg` and returns a `unit`

OK, now you know how to define explicitly the types of each argument, and that the function is actually returning a ReactElement (but more on that later).


### Currying, partial application and piping

We're going to use the last snippet of that code to have a look at a few things.

```fsharp
Program.mkSimple init update rootView
|> Program.withReactSynchronous "real-world-fable-app"
|> Program.withConsoleTrace
|> Program.run
```

The first line of this snippet `Program.mkSimple init update rootView` is actually pretty simple. We are accessing the `Program` module and calling the `mkSimple` function passing three arguments to it.

As we saw before, functions work like any other data and can be passed around as arguments.

Using the `Program.` notation is a way to explicitly access the `Program` module without having to open it before.

Now, things start getting interesting from the second line on.

`withReactSynchronous` is a function that expects two arguments a string as we are passing `"real-world-fable-app"` and also an instance of the type `Program`. You can see the signature of the function if you mouseover it. 

When we call it like this `Program.withReactSynchronous "real-world-fable-app"` only one argument is being passed, which in many languages would mean an error in F# this works fine. In F#, whenever you call a function with fewer arguments than it requires to be run, that function will in turn return a function that expects only the remainder of the arguments.

So, if `withReactSynchronous` expects two arguments and you only pass one, the result of it is another function that now expects only the missing argument.

This feature of functions is called `currying` and calling a function passing fewer than the required arguments is called `partial application` and they both always go together. 

Now calling `Program.mkSimple` with all of its required arguments, will return an instance of a `Program` type. This program is being passed as the last expected argument of `withReactSynchronous`. Who is that happen? With the use of the `|>` (pipe) operator.

The pipe operator does exactly that it takes the value from the left of the operator, which may be a simple value such as a string or the result of calling another function (this case) and then it passes that value as the last argument of the function at the right side of the pipe and that function gets executed.

You could read that snippet of code like this:

Call `Program.mkSimple` passing `init`, `update` and `rootView` as args, take the result of that and
|> pass it as the last arg to the function `Program.withReactSynchronous`, which had already received a string as its first arg and take the result of that and
|> pass it as the last (and only) arg to the function `Program.withConsoleTrace`, then take the result of that and
|> pass it as the last (and only) arg to the function `Program.run`, then the result of that is the final result.


**WOW!! That's a lot!**

I know, if you're new to F# (and functional programming languages) there was a lot to unpack in such small sample of code, but those are the main blocks we'll be using throughout this app, Records, Discriminated Unions, functions, currying and partial application, and piping.

In this lesson we focused on F#'s syntax, on the next one we'll understand what does that means in terms of functionality on our application.

I promise, it's just one more on theory before we start adding more code.

#### Resources

If need more reading on the things we saw today, take some time and read the following:

- [Record types](https://fsharpforfunandprofit.com/posts/records/)
- [Discriminated Unions](https://fsharpforfunandprofit.com/posts/discriminated-unions/)
- [Functions](https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/functions/)
- [Currying](https://fsharpforfunandprofit.com/posts/currying/)
- [Partial Application](https://fsharpforfunandprofit.com/posts/partial-application)
- [Piping](https://fsharpforfunandprofit.com/posts/partial-application/#understanding-the-pipe-function)
