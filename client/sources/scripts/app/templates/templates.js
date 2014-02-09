angular.module('templates-main', ['partials/feed.html', 'partials/profile.html']);

angular.module("partials/feed.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/feed.html",
    "<h2>Main feed</h2>\n" +
    "\n" +
    "<div ng-controller=\"HelloCntl\">\n" +
    "	Your name: <input type=\"text\" ng-model=\"name\"/>\n" +
    "	<hr/>\n" +
    "	Hello {{name || \"World\"}}!\n" +
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
