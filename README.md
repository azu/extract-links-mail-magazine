# extract-links-mail-magazine

Extract link in mail magazine like JavaScript Weekly.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install extract-links-mail-magazine

## Usage

E.g.) Extract link from [JavaScript Weekly Issue 306: October 20, 2016](http://javascriptweekly.com/issues/306 "JavaScript Weekly Issue 306: October 20, 2016")

In node.js 

```js
import jsdom from "jsdom";
import {extractLinks} from "extract-links-mail-magazine";
jsdom.env(
    "http://javascriptweekly.com/issues/306",
    function (err, window) {

        if (err) {
            throw error;
        }
        const links = extractLinks(window.location.href, window.document);
        /*
        [
            'http://thenewstack.io/javascript-grows-gets-foundation',
            'http://2ality.com/2016/10/asynchronous-iteration.html',
            'https://github.com/tc39/proposal-async-iteration',
            'https://medium.com/@nodejs/node-js-v6-transitions-to-lts-be7f18c17159',
            'https://compose.com/articles/connecting-to-compose-for-mysql',
            'https://nczonline.net/blog/2016/10/the-ecmascript-2016-change-you-probably-dont-know',
            'https://toddmotto.com/angular-2-forms-reactive',
            'https://sitepoint.com/yarn-vs-npm',
            'https://sitepoint.com/jquery-document-ready-plain-javascript',
            'https://js.foundation/announcements/2016/10/17/Linux-Foundation-Unites-JavaScript-Community-Open-Web-Development',
            'https://medium.com/google-developer-experts/angular-2-new-features-in-angular-2-1-94132b1888f0',
            'http://emberjs.com/blog/2016/10/17/ember-2-9-released.html',
            'https://github.com/facebook/jsx/issues/65',
            'https://github.com/mozilla/addons-linter/issues/1000',
            'https://developer.chrome.com/devsummit',
            'http://thejsguy.com/2016/10/15/a-practical-introduction-to-es6-generator-functions.html',
            'https://engineering.haus.com/dumb-es6-tricks-53ecadd1b29f',
            'http://blog.wolksoftware.com/contributing-to-definitelytyped',
            'https://daveceddia.com/visual-guide-to-state-in-react',
            'https://blog.risingstack.com/async-await-node-js-7-nightly',
            'http://alistapart.com/article/javascript-for-web-designers',
            'https://hackernoon.com/using-yarn-with-docker-c116ad289d56',
            'http://thenewcode.com/1152/Search-JavaScript-Arrays-Efficiently-with-includes-and-indexOf',
            'https://sitepoint.com/javascript-3d-minecraft-editor',
            'https://emberigniter.com/modern-bridge-ember-and-rails-5-with-json-api',
            'http://theodo.fr/blog/2016/10/medium-like-image-loading-with-vue-js',
            'https://youtube.com/playlist?list=PLNYkxOF6rcICc687SxHQRuo9TVNOJelSZ',
            'https://medium.com/@alexnm/is-mvc-dead-for-the-frontend-35b4d1fe39ec',
            'https://hackernoon.com/why-you-shouldnt-use-var-anymore-f109a58b9b70',
            'https://sentry.io/for/javascript',
            'https://github.com/getsentry/sentry',
            'https://github.com/moinism/faltu',
            'https://maxwellito.github.io/vivus',
            'https://github.com/usdivad/mesing',
            'http://usdivad.com/mesing'
        ]
        */
    }
);
```

## Changelog

See [Releases page](https://github.com/azu/extract-links-mail-magazine/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/extract-links-mail-magazine/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
