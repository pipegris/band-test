(function ($) {
    'use strict';

    const API_DOMAIN21 = 'https://openapi.band.us/v2.1/';
    const ACCESS_TOKEN = 'ZQAAAQib-cMgHAdzHKInlW1v8LoS_UYUyqMcP-wvk1uVr4u09eMkAsN3VnIJovSdu4CTZ2OE6PEtleAuuMCP2s432f736CkcZuw5RH0tHqi51NdG';
    const ENDPOINTS = {
        BANDS: 'bands'
    };

    let bandParams = new URLSearchParams({ access_token: ACCESS_TOKEN}).toString()
    let bandsEndpoint = API_DOMAIN21 + ENDPOINTS.BANDS + '?' + bandParams;

    $(function () {

        let template = $("#band-item-tpl").html();

        $.ajax({
            url: bandsEndpoint,
            dataType: 'json',
            success: function (response) {
                let indexedBands = {};
                $.each(response.result_data.bands, function (index, band) {
                    let html = Mustache.to_html(template, band);
                    indexedBands[band.band_key] = band;
                    $('#bands-container').append(html);

                    localStorage.setItem('bands', JSON.stringify(indexedBands));
                });
            }
        });
    });
})(jQuery)