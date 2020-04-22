(function ($) {
    'use strict';

    const ACCESS_TOKEN = 'ZQAAAQib-cMgHAdzHKInlW1v8LoS_UYUyqMcP-wvk1uVr4u09eMkAsN3VnIJovSdu4CTZ2OE6PEtleAuuMCP2s432f736CkcZuw5RH0tHqi51NdG';
    const ENDPOINTS = {
        BANDS: 'https://openapi.band.us/v2.1/bands',
        POSTS: 'https://openapi.band.us/v2/band/posts',
        ALBUMS: 'https://openapi.band.us/v2/band/albums',
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

    let albumParams = new URLSearchParams({access_token: ACCESS_TOKEN, band_key: bandKey}).toString()
    let albumsEndpoint = ENDPOINTS.ALBUMS + '?' + albumParams;

    $(function () {

        let template = $("#album-item-tpl").html();

        $.ajax({
            url: albumsEndpoint,
            dataType: 'json',
            success: function (response) {
                let indexedAlbums = {};
                $.each(response.result_data.items, function (index, album) {
                    let albumsHTML = Mustache.to_html(template, album);
                    indexedAlbums[album.photo_album_key] = album;
                    $('#albums-container').append(albumsHTML);
                });
            }
        });
    });
})(jQuery)