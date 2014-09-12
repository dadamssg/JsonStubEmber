import config from '../config/environment';

export default {
    name: 'simple-auth-config',
    before: 'simple-auth',
    initialize: function() {
        window.ENV = window.ENV || {};
        window.ENV['simple-auth-oauth2'] = {
            serverTokenEndpoint: config.APP.API.host + "/oauth/v2/token",
            serverTokenRevocationEndpoint: config.APP.API.host + "/oauth/v2/token/destroy",
            refreshAccessTokens: true
        };
    }
};