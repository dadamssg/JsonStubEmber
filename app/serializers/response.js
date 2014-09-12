import DS from 'ember-data';

export default DS.RESTSerializer.extend({

    normalizeResponse: function (response) {

        var links = response._links;

        var request_matcher = null;
        var request_matcherId = links.request_matcher.href.match(/\d+$/);
        if (request_matcherId && request_matcherId.length === 1) {
            request_matcher = request_matcherId[0];
        }

        delete response._links;

        response.requestMatcher = request_matcher;
        response.statusCode = response.status_code;
        response.createdAt = response.created_at;
        response.updatedAt = response.updated_at;

        delete response.status_code;
        delete response.created_at;
        delete response.updated_at;

        return response;
    },

    extractSingle: function (store, primaryType, payload, recordId) {

        this.normalizeResponse(payload.response);

        return this._super(store, primaryType, payload, recordId);
    },

    extractArray: function(store, type, payload) {

        var self = this;

        var responses = payload.responses;

        responses.forEach(function(response) {

            self.normalizeResponse(response);
        });

        return this._super(store, type, payload);
    },

    serialize: function(record, options) {

        var json = this._super(record, options);

        json.request_matcher = json.requestMatcher;
        json.status_code = json.statusCode;

        delete json.requestMatcher;
        delete json.statusCode;
        delete json.createdAt;
        delete json.updatedAt;

        return json;
    }
});