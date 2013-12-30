define({
    type: 'POST',
    url: '/hey',
    dataType: 'json',
    success: function (data, status, xhr) {
        alert(data.data);
    }
});
