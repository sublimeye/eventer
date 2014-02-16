angular.module('templates-main', ['partials/auth.html', 'partials/event-edit.html', 'partials/home.html', 'partials/profile.html']);

angular.module("partials/auth.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/auth.html",
    "<div class=\"modal fade\" id=\"js-w-auth\" data-backdrop=\"static\" data-keyboard=\"false\">\n" +
    "  <div class=\"modal-dialog\">\n" +
    "    <div class=\"modal-content\">\n" +
    "      <div class=\"modal-header\">\n" +
    "        <!--<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>-->\n" +
    "        <h4 class=\"modal-title\">Sign In</h4>\n" +
    "      </div>\n" +
    "      <div class=\"modal-body\">\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "          <form class=\"col-xs-6\">\n" +
    "            <div class=\"form-group\"><input class=\"form-control\" type=\"text\" placeholder=\"Login\"/></div>\n" +
    "            <div class=\"form-group\"><input class=\"form-control\" type=\"text\" placeholder=\"Password\"/></div>\n" +
    "            <div class=\"form-group\"><button class=\"btn btn-default\" type=\"button\">Sign In</button></div>\n" +
    "          </form>\n" +
    "          <div class=\"col-xs-6\">\n" +
    "            FB VK GG\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "          <div class=\"col-xs-8\">\n" +
    "            <p><a href=\"#\">Forget password</a></p>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "          <div class=\"col-xs-8\">\n" +
    "            <p><a href=\"#\">Sign up</a></p>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "      </div>\n" +
    "      <div class=\"modal-footer\">\n" +
    "        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n" +
    "        <button type=\"button\" class=\"btn btn-primary\">Save changes</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <!-- /.modal-content -->\n" +
    "  </div>\n" +
    "  <!-- /.modal-dialog -->\n" +
    "</div>\n" +
    "");
}]);

angular.module("partials/event-edit.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/event-edit.html",
    "<div class=\"container\">\n" +
    "  <h1>Event: create/edit</h1>\n" +
    "  <form>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"form-group col-sm-6\">\n" +
    "        <label>Event Title</label> <input class=\"form-control\" placeholder=\"Event title\">\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"form-group col-sm-6\">\n" +
    "        <label>Event description</label>\n" +
    "        <textarea class=\"form-control\" placeholder=\"Event description... \"></textarea>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"form-group col-sm-6\">\n" +
    "        <label>Where</label>\n" +
    "        <input class=\"form-control\" placeholder=\"Where...\">\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"form-group col-sm-6\">\n" +
    "        <label>Who</label>\n" +
    "        <input class=\"form-control\" placeholder=\"Invite friends...\">\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"form-group col-sm-6\">\n" +
    "        <label>When</label>\n" +
    "        <input class=\"form-control\" placeholder=\"When: find a time\">\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n" +
    "");
}]);

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
    "<div class=\"container\">\n" +
    "  <div class=\"row mb-2\">\n" +
    "    <div class=\"col-sm-12\">\n" +
    "    <h1>Profile</h1>\n" +
    "    <a href=\"/logout\" class=\"btn btn-default btn-sm\">Sign Out</a>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"row\">\n" +
    "    <!-- LOCAL INFORMATION -->\n" +
    "    <div class=\"col-sm-6\">\n" +
    "      <div class=\"well\">\n" +
    "        <h3><span class=\"fa fa-user\"></span> Local</h3>\n" +
    "\n" +
    "        <p>\n" +
    "          <strong>id</strong>: <%= user._id %>\n" +
    "          <br>\n" +
    "          <strong>email</strong>: <%= user.local.email %>\n" +
    "          <br>\n" +
    "          <strong>password</strong>: <%= user.local.password %>\n" +
    "        </p>\n" +
    "\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div><!-- // profile info row -->\n" +
    "</div>");
}]);
