'use strict';

define({
    type: 'POST',
    url: '/hey',
    dataType: 'json',
    success: function (data) {
        alert(data.data);
    }
});
