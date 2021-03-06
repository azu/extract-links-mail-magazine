// LICENSE : MIT
"use strict";
import unique from "array-unique";
import stripUTM from "strip-utm";
const MapLike = require("map-like");
const defaultBlackList = [
    // Mail
    /list-manage\.com/,
    /list-manage\d+.com/,
    /forward-to-friend\.com/,
    /campaign-archive.com/,
    /campaign-archive\d+.com/,
    /typeform\.com/,
    // share
    /^https?:\/\/twitter.com\/intent\//,
    /^https?:\/\/www.facebook.com\/sharer\//,
    /^https?:\/\/facebook.com\/sharer\//
];

const defaultBlockTitleList = [
    /\(PR\)/,
    /\[PR\]/,
    /^こちら$/
];
const hasNotTextSibling = (prev, next)=> {
    if (prev && next) {
        return prev.nodeName !== "#text" && next.nodeName !== "#text";
    } else if (prev) {
        return prev.nodeName !== "#text"
    } else if (next) {
        return next.nodeName !== "#text"
    }
};
const isEmptyTextNode = (node)=> {
    if (!node) {
        return true;
    }
    if (node.nodeName !== "#text") {
        return false;
    }
    return node.nodeValue.trim().length === 0;
};
const isListChild = (node)=> {
    let parent = node.parentNode;
    return parent.nodeName === "LI";
};
const isBR = (node)=> {
    if (!node) {
        return false;
    }
    return node.nodeName === "BR";
};
const isLink = (node)=> {
    if (!node) {
        return false;
    }
    return node.nodeName === "A";
};

const isAbsoluteLink = (aLink) => {
    return /^https?:\/\//.test(aLink.getAttribute("href"))
};

/**
 * extract link in the document.
 * @param {string} currentURL
 * @param {Document} document Browser's document or Jsdom's document
 * @param {Object} options
 * @returns {String[]}
 */
export function extractLinks(currentURL, document, options = {}) {
    return extractLinkAndTitle(currentURL, document, options).map(([url]) => {
        return url;
    });
}
/**
 * extract link in the document.
 * @param {string} currentURL
 * @param {Document} document Browser's document or Jsdom's document
 * @param {Object} options
 * @returns {String[]}
 */
export function extractLinkAndTitle(currentURL, document, options = {}) {
    const blackList = options.blackList || defaultBlackList;
    const blackTitleList = options.blackTitleList || defaultBlockTitleList;
    const allLinks = document.querySelectorAll("a");
    const isNotSameURLWithCurrent = (url) => {
        return currentURL !== url;
    };
    const isNotEmptyTitle = (title) => {
        return title && title.length > 0;
    };
    const removeBlackList = (url) => {
        return !blackList.some(blackRegExp => {
            return blackRegExp.test(url);
        });
    };
    const removeBlackTitleList = (title) => {
        return !blackTitleList.some(blackRegExp => {
            return blackRegExp.test(title);
        });
    };
    const filterByOnlyChild = (aLink) => {
        let prev = aLink.previousSibling;
        let prevElement = aLink.previousElementSibling;
        let next = aLink.nextSibling;
        let nextElement = aLink.nextElementSibling;
        if ((prev == null && next == null) || (prevElement == null && nextElement == null)) {
            if (isListChild(aLink)) {
                return false;
            }
            return true;
        }
        // sibling link pattern
        if (nextElement == null && (isLink(prevElement) || isBR(prevElement))) {
            return false
        }
        if (prevElement == null && (isLink(nextElement) || isBR(nextElement))) {
            return false;
        }

        // only-child
        if (hasNotTextSibling(prev, next)) {
            return true;
        }
        // empty | link | empty
        if (isEmptyTextNode(prev) && isEmptyTextNode(next)) {
            return true;
        }

        return false;
    };
    const linkArray = Array.prototype.slice.call(allLinks);
    const linkTitleMap = new MapLike();
    linkArray.forEach((aLink) => {
        linkTitleMap.set(aLink.href, aLink.getAttribute("title") || aLink.textContent);
    });
    return unique(linkArray
        .filter(filterByOnlyChild)
        .filter(isAbsoluteLink)
        .map(aLink => {
            const stripURL = stripUTM(aLink.href);
            const title = aLink.textContent || aLink.getAttribute("title") || '';
            const trimmedTitle = title.replace(/\n(\s+)?/g, "");
            linkTitleMap.set(stripURL, trimmedTitle);
            return stripURL;
        })
        .filter(removeBlackList)
        .filter(isNotSameURLWithCurrent)
    ).map(url => {
        return [url, linkTitleMap.get(url)];
    }).filter(([url, title]) => {
        return isNotEmptyTitle(title);
    }).filter(([url, title]) => {
        return removeBlackTitleList(title);
    });
}