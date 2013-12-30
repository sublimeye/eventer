require(['jquery', 'app/home/auth'], function ($, auth) {
    $(function () { 
        $.ajax(auth);
    });
});
