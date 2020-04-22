(function ($) {
    'use strict';

    const ACCESS_TOKEN = 'ZQAAAQib-cMgHAdzHKInlW1v8LoS_UYUyqMcP-wvk1uVr4u09eMkAsN3VnIJovSdu4CTZ2OE6PEtleAuuMCP2s432f736CkcZuw5RH0tHqi51NdG';
    const ENDPOINTS = {
        BANDS: 'https://openapi.band.us/v2.1/bands',
        POSTS: 'https://openapi.band.us/v2/band/posts',
    };

    let hash = window.location.hash;
    let bandKey = hash.replace('#', '');

    let bands = localStorage.getItem('bands');
    if (!bands) {
        window.location = 'index.html';
    }
    let postParams = new URLSearchParams({access_token: ACCESS_TOKEN, band_key: bandKey}).toString()
    let postsEndpoint = ENDPOINTS.POSTS + '?' + postParams;

    $(function () {

        let template = $("#post-item-tpl").html();

        $.ajax({
            url: postsEndpoint,
            dataType: 'json',
            success: function (response) {
                $.each(response.result_data.items, function (index, post) {
                    let html = Mustache.to_html(template, post);
                    $('#posts-container').append(html);
                });
            }
        });
    });
})(jQuery)