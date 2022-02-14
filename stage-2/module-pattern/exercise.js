/*
 * Exercise: Create some modules!
 *
 * When you think you have finished, run the command:
 *   npm run s2.modules
 * This will run a series of tests which should all pass.
 */
"use strict";

/*
 * Create a single module (using an IIFE) which contains functionality to parse
 * URLs.
 *
 * We have started you off with the basic structure.
 *
 *     https    ://   www.example.com  /   hello  ?  foo=1&bar=2
 * |          |     |                |   |      |  |             |
 * | protocol |     |    domain      |   | path |  | querystring |
 */

var UrlParser = (function () {
  // fill in ...

  return {
    // a function that takes a URL and returns its protocol
    protocol: function (url) {
      return url.split("://")[0];
    },

    // a function that takes a URL and returns its domain
    domain: function (url) {
      return url.split("://")[1].split("/")[0];
    },

    // a function that takes a URL and returns its path
    path: function (url) {
      let arr = url.split("://")[1].split("/");
      arr.shift(arr[0]);
      let last = arr[arr.length - 1].split("?")[0];
      arr.pop(arr[0]);
      arr.push(last);
      let path = arr.join("/");
      return path;
    },

    // a function that takes a URL and returns its query string
    querystring: function (url) {
      return url.split("?")[1];
    },
  };
})();

/*
 * Create a module that can support multiple instances (like in our example).
 * The module should be a function with several additional methods attached as
 * attributes.
 *
 * Example:
 * var exampleBuilder = createUrlBuilder('https://example.com');
 *
 * var url = exampleBuilder({ query: { foo: 1, bar: 2 }, path: 'hello' });
 *
 * console.log(url); // https://example.com/hello?foo=1&bar=2
 *
 * exampleBuilder.
 */
let createUrlBuilder = function (host) {
  let url = host;

  let builder = function (obj) {
    let pathValue = obj.hasOwnProperty("path") ? obj.path : "";
    let queryValue = obj.hasOwnProperty("path") ? obj.query : {};
    return `${builder.path(pathValue)}${queryString(queryValue)}`;
  };

  let queryString = (query) =>
    `?${Object.entries(query)
      .map((keyAndValue) => keyAndValue.join("="))
      .join("&")}`;

  builder.path = (path) => `${url}/${path}`;
  builder.query = (query) => `${url}${queryString(query)}`;
  return builder;
};

module.exports = {
  UrlParser,
  createUrlBuilder,
};
