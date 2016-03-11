---
title: How to stub promises using Sinon.JS
description: How to stub promises using Sinon.JS
layout: post
category: code
date: 2016-02-29
tags: [typescript, es6, tests, stub, sinon, karma]
comments: true
---
Promises are a great way of doing async programming. But testing with promises can be a bit cumbersome, even with the use of the arrow functions syntax.

Recently I've found a small and nice package to help to stub tests using Sinon, and the library is [sinon-stub-promise](https://github.com/substantial/sinon-stub-promise).

{% highlight bach %}
npm i sinon-stub-promise -D
{% endhighlight %}

So, imagine you have a code like the following:

{% highlight js %}
function fetchMovieData() {
    return fetch('/movies')
        .then(res => {
            return res.json();
        })
        .then(movies => {
            return movies;
        })
}

function printMovies() {
    fetchMovieData().then(movies => {
        movies.forEach(movie => {
            console.log(movie);
        });
    })
}
{% endhighlight %}

<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Responsive content -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-1865353648221711"
     data-ad-slot="8499334570"
     data-ad-format="auto"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

A test for this code would be something like:

{% highlight js %}
describe('printMovies', () => {
    let stubedFetch; 
   beforeEach(() => {
        stubedFetch = sinon.stub(window, 'fetch');
   }); 
   afterEach(() => {
        sinon.restore(window.fetch);
   });

   it('should work', () => {
        stubedFetch.returnsPromise().resolves(['Star Wars', 'The Matrix', 'Forrest Gump']);

        // do something
   });

   it('should handle errors', () => {
        stubedFetch.returnsPromise().rejects('a reason');
        // assert that error was handled
   })
});
{% endhighlight %}

Very simple, one just have to stub the function that will return the Promise, use the function returnsPromise. After that, you just have to the if the Promise will resolve and reject.

Oh yeah! And if you're using karma to run your tests there's even a plugin for that [karma-sinon-stub-promise](https://github.com/alexweber/karma-sinon-stub-promise).