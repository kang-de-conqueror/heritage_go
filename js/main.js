$(document).scroll(function () {
    var scroll = $(this).scrollTop();
    $(".js-blur").css({
        '-webkit-transform': 'translateY(-' + scroll + 'px)',
        'transform': 'translateY(-' + scroll + 'px)',
    });
});

$(function () {
    $("main").clone().prependTo($("header")).addClass("js-blur");
    $(".js-blur").css({
        '-webkit-filter': 'blur(.2em)',
        'filter': 'blur(.2em)',
        'background': '#fff',
    });
});