let isLoading = false;
let ignored = -1;
// See/ Unsee password
function seePassword() {
    var x = document.getElementById("myPassword");
    var y = document.getElementById("seePassword");
    if (x.type === "password") {
        x.type = "text";
        y.className = "fas fa-lock-open";
    }
    else {
        x.type = "password";
        y.className = "fas fa-lock";
    }
}

// Render photo from heritage_go js file
function render_photo(image, photoPost, mainContent) {
    mHeritageGoService
        .getPhoto(image)
        .then(photo => {
            photoPost
                .find('.avatar')
                .attr('src', `http:${photo.account.picture_url}`);
            photoPost.find('.info-caption').html(photo.title[0].content);
            photoPost.find('.location-name').html(photo.area_name);
            photoPost
                .find('.img-body-feed-section')
                .attr({
                    'src': `http:${photo.image_url}?size=medium`,
                    'alt': photo.title[0].content
                });
            if (photo.capture_time) {
                photoPost.find('.date').html(photo.capture_time);
            } else {
                photoPost.find('.date').remove();
            }
            photoPost.find('.love-count').html(photo.like_count);
            photoPost.find('.comment-count').html(photo.comment_count);
            photoPost.find('.view-count').html(photo.view_count);
            photoPost.hide().appendTo(mainContent).fadeIn();
        })
        .catch(error => {
            console.log(error);
        });
}

// Render full photos
function render_photos() {
    let main = $('main');
    ignored += 1
    mHeritageGoService
        .getPhotos({
            limit: 1,
            offset: ignored
        })
        .then(photos => {
            let postId = $('#defaultPost')
            isLoading = false
            $(photos).each(function () {
                let newPost = postId.clone()
                newPost.removeAttr('id')
                newPost.removeAttr('hidden')
                render_photo(this, newPost, main)
            });
        })
        .catch(error => {
            console.log(error);
        });
}


$(document).scroll(function () {
    var scroll = $(this).scrollTop();
    $(".js-blur").css({
        '-webkit-transform': 'translateY(-' + scroll + 'px)',
        '-moz-transform': 'translateY(-' + scroll + 'px)',
        'transform': 'translateY(-' + scroll + 'px)',
    });
});

$(function () {
    $("main").clone().prependTo($("header")).addClass("js-blur");
    $(".js-blur").css({
        '-webkit-filter': 'blur(.2em)',
        '-moz-filter': 'blur(.2em)',
        'filter': 'blur(.2em)',
        'background': '#fafafa',
    });
    for (var i = 0; i < 4; i++) {
        render_photos();
    }

    // On scroll
    $(window).scroll(function () {
        if ($(window).scrollTop() >= $(document).height() - $(window).height() - 1) {
            for (var i = 0; i < 4; i++) {
                render_photos();
            }
        }
    })
});