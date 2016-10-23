#!/usr/bin/env node
var extractLinks = require('../lib/extract-links-mail-magazine').extractLinks;
var jsdom = require('jsdom');
var input = process.argv[2];
jsdom.env({
    url: input,
    done: function(err, window) {
        if (err) {
            throw error;
        }
        const links = extractLinks(window.location.href, window.document);
        console.log(links.join("\n"));
    }
});