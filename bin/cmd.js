#!/usr/bin/env node
var extractLinkAndTitle = require('../lib/extract-links-mail-magazine').extractLinkAndTitle;
var jsdom = require('jsdom');
var input = process.argv[2];
jsdom.env({
    url: input,
    done: function(err, window) {
        if (err) {
            throw error;
        }
        const linkAndTitles = extractLinkAndTitle(window.location.href, window.document);
        linkAndTitles.forEach(site => {
            console.log("# " + site[1] +"\n"+ site[0]);
        })
    }
});