require(['jquery', 'app/home/auth'], function ($, auth) {
    $(function () { 
        $.ajax({
            type: 'GET',
            url: '/user/name',
            dataType: 'json',
            success: function (response) {
                console.log('success', response);
            },
            error: function(response) {
                console.log('error', response);
            }
        });
    });
});
