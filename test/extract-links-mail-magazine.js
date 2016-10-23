import assert from "assert"
import jsdom from "jsdom";
import fs from "fs";
import {extractLinks, extractLinkAndTitle} from "../src/extract-links-mail-magazine";
describe("extract-item-links-test", function() {
    it("should return URL list", function() {
        let ml = ["javascript", "frontrend", "node"];
        let promises = ml.map(type => {
            return new Promise((resolve, reject) => {
                const content = fs.readFileSync(__dirname + "/fixtures/" + type + "/index.html", "utf-8");
                jsdom.env(
                    content,
                    function(err, window) {
                        if (err) {
                            return reject(err);
                        }
                        let links = extractLinkAndTitle(window.location.href, window.document);
                        console.log(links);
                        console.log(type + " " + links.length);
                        assert(links.length > 10);
                        resolve();
                    }
                );

            });
        });
        return Promise.all(promises);
    });
    context("JavaScriptWeeklyIssue306.html", () => {
        it("should extract link", (done) => {
            const expected = [
                [
                    'http://thenewstack.io/javascript-grows-gets-foundation',
                    'JavaScript Gets Its Own Foundation'
                ],
                [
                    'http://2ality.com/2016/10/asynchronous-iteration.html',
                    'An ES Proposal: Asynchronous Iteration'
                ],
                [
                    'https://github.com/tc39/proposal-async-iteration',
                    'asynchronous iteration'
                ],
                [
                    'https://medium.com/@nodejs/node-js-v6-transitions-to-lts-be7f18c17159',
                    'Node.js v6 Transitions to LTS'
                ],
                [
                    'https://compose.com/articles/connecting-to-compose-for-mysql',
                    'MySQL on Compose - hosted on AWS, GCP or SoftLayer'
                ],
                [
                    'https://nczonline.net/blog/2016/10/the-ecmascript-2016-change-you-probably-dont-know',
                    'The ECMAScript 2016 Change You Probably Don\'t Know'
                ],
                [
                    'https://toddmotto.com/angular-2-forms-reactive',
                    'Angular 2 Form Fundamentals: Reactive Forms'
                ],
                [
                    'https://sitepoint.com/yarn-vs-npm',
                    'Yarn vs npm: Everything You Need to Know'
                ],
                [
                    'https://sitepoint.com/jquery-document-ready-plain-javascript',
                    'Replacing jQuery\'s ready() with Plain JavaScript'
                ],
                [
                    'https://js.foundation/announcements/2016/10/17/Linux-Foundation-Unites-JavaScript-Community-Open-Web-Development',
                    'The Linux Foundation Unites JavaScript Community for Open Web Development'
                ],
                [
                    'https://medium.com/google-developer-experts/angular-2-new-features-in-angular-2-1-94132b1888f0',
                    'A Quick Review of New Features in Angular 2.1'
                ],
                [
                    'http://emberjs.com/blog/2016/10/17/ember-2-9-released.html',
                    'Ember.js 2.8-LTS, 2.9 and 2.10 Beta Released'
                ],
                [
                    'https://github.com/facebook/jsx/issues/65',
                    'Facebook Wants Your Input for JSX 2.0'
                ],
                [
                    'https://github.com/mozilla/addons-linter/issues/1000',
                    'Angular 1.x Banned From Use in Firefox Addons'
                ],
                [
                    'https://developer.chrome.com/devsummit',
                    'Chrome Dev Summit 2016'
                ],
                [
                    'http://thejsguy.com/2016/10/15/a-practical-introduction-to-es6-generator-functions.html',
                    'A Practical Introduction to ES6 Generator Functions'
                ],
                [
                    'https://engineering.haus.com/dumb-es6-tricks-53ecadd1b29f',
                    'Some Simple ES6 Syntax Tricks'
                ],
                [
                    'http://blog.wolksoftware.com/contributing-to-definitelytyped',
                    'How to Create Your Own TypeScript Type Definition Files (.d.ts)'
                ],
                [
                    'https://daveceddia.com/visual-guide-to-state-in-react',
                    'A Visual Guide to State in React'
                ],
                [
                    'https://blog.risingstack.com/async-await-node-js-7-nightly',
                    'Experimenting with async/await in Node.js 7 Nightly'
                ],
                [
                    'http://alistapart.com/article/javascript-for-web-designers',
                    'JavaScript for Web Designers: DOM Scripting'
                ],
                [
                    'https://hackernoon.com/using-yarn-with-docker-c116ad289d56',
                    'Using Yarn with Docker'
                ],
                [
                    'http://thenewcode.com/1152/Search-JavaScript-Arrays-Efficiently-with-includes-and-indexOf',
                    'Searching JavaScript Arrays Efficiently with includes and indexOf'
                ],
                [
                    'https://sitepoint.com/javascript-3d-minecraft-editor',
                    'Building a 3D Minecraft-Style Editor in JavaScript'
                ],
                [
                    'https://emberigniter.com/modern-bridge-ember-and-rails-5-with-json-api',
                    'Ember and Rails 5 with JSON API: A Modern Bridge'
                ],
                [
                    'http://theodo.fr/blog/2016/10/medium-like-image-loading-with-vue-js',
                    'Medium-Like Image Loading with Vue.js'
                ],
                [
                    'https://youtube.com/playlist?list=PLNYkxOF6rcICc687SxHQRuo9TVNOJelSZ',
                    'Polymer Summit 2016: Recordings of All Talks Are Now Available'
                ],
                [
                    'https://medium.com/@alexnm/is-mvc-dead-for-the-frontend-35b4d1fe39ec',
                    'Is MVC Dead for The Frontend?'
                ],
                [
                    'https://hackernoon.com/why-you-shouldnt-use-var-anymore-f109a58b9b70',
                    'Why You Shouldn’t Use ‘var’ Anymore'
                ],
                [
                    'https://sentry.io/for/javascript',
                    'Debugging JS errors in production'
                ],
                ['https://github.com/getsentry/sentry', '100% open source'],
                [
                    'https://github.com/moinism/faltu',
                    'Faltu: Search Sort, Filter, and Limit An Array of Objects in MongoDB-esque Style'
                ],
                [
                    'https://maxwellito.github.io/vivus',
                    'Vivus.js: Bring SVGs to Life by \'Drawing\' Them via Animations'
                ],
                [
                    'https://github.com/usdivad/mesing',
                    'meSing.js: JavaScript Singing Synthesis Library'
                ],
                ['http://usdivad.com/mesing', 'demo here.']
            ];
            const content = fs.readFileSync(__dirname + "/fixtures/javascript/JavaScriptWeeklyIssue306.html", "utf-8");
            jsdom.env(
                content,
                function(err, window) {
                    if (err) {
                        throw error;
                    }
                    const titleAndURLs = extractLinkAndTitle(window.location.href, window.document);
                    assert.deepEqual(titleAndURLs, expected);
                    done();
                }
            );

        });
    });
});