angular.module('templates-main', ['partials/home.html', 'partials/profile.html']);

angular.module("partials/home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/home.html",
    "<div class=\"container\">\n" +
    "  <h1>Home</h1>\n" +
    "\n" +
    "  <div class=\"well\">\n" +
    "    Create an event and invite your friends\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"well\">\n" +
    "    Search for cool events\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"well\">\n" +
    "    Subscribe for interesting events\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"well\">\n" +
    "    Find a good place: gym, rally track, surfing, etc\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("partials/profile.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/profile.html",
    "<h2>Profile</h2>\n" +
    "\n" +
    "<div>\n" +
    "	<p>Hi, username: {{user}}</p>\n" +
    "</div>");
}]);
