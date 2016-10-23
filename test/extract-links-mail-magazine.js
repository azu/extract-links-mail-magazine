import assert from "assert"
import jsdom from "jsdom";
import fs from "fs";
import {extractLinks} from "../src/extract-links-mail-magazine";
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
                        let links = extractLinks(window.location.href, window.document);
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
        it("should extract link", () => {
            const expected = [
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
            ];
            const content = fs.readFileSync(__dirname + "/fixtures/javascript/JavaScriptWeeklyIssue306.html", "utf-8");
            jsdom.env(
                content,
                function(err, window) {
                    if (err) {
                        throw error;
                    }
                    const links = extractLinks(window.location.href, window.document);
                    assert.deepEqual(links, expected);
                }
            );

        });
    });
});