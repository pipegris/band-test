(function ($) {
    'use strict';

    const ACCESS_TOKEN = 'ZQAAAQib-cMgHAdzHKInlW1v8LoS_UYUyqMcP-wvk1uVr4u09eMkAsN3VnIJovSdu4CTZ2OE6PEtleAuuMCP2s432f736CkcZuw5RH0tHqi51NdG';
    const ENDPOINTS = {
        BANDS: 'https://openapi.band.us/v2.1/bands',
        POSTS: 'https://openapi.band.us/v2/band/posts',
    };

    let hash = window.location.hash;
    let bandKey = hash.replace('#', '');

    let bandsData = localStorage.getItem('bands');
    if (!bandsData) {
        window.location = 'index.html';
    }
    let bandList = JSON.parse(bandsData);
    if (!bandList.hasOwnProperty(bandKey)) {
        window.location = 'index.html';
    }
    let band = bandList[bandKey];

    let postParams = new URLSearchParams({access_token: ACCESS_TOKEN, band_key: bandKey}).toString()
    let postsEndpoint = ENDPOINTS.POSTS + '?' + postParams;

    $(function () {

        let postTpl = $("#post-item-tpl").html();
        let commentTpl = $("#post-comment-tpl").html();
        let bandTpl = $("#band-tpl").html();
        let bandHTML = Mustache.to_html(bandTpl, band);
        $('#band-container').html(bandHTML);

        $.ajax({
            url: postsEndpoint,
            dataType: 'json',
            success: function (response) {
                $.each(response.result_data.items, function (index, post) {
                    post.created_at = new Date(post.created_at).toLocaleDateString("es-ES");
                    post.commentsHTML = '';
                    $.each(post.latest_comments, function (index, comment) {
                        post.commentsHTML += Mustache.to_html(commentTpl, comment);
                    });
                    let postsHTML = Mustache.to_html(postTpl, post);
                    $('#posts-container').append(postsHTML);
                });
            }
        });
    });
})(jQuery)