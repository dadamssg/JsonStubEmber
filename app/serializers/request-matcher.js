import DS from 'ember-data';

export default DS.RESTSerializer.extend({

    normalizeRequestMatcher: function (request_matcher) {

        var links = request_matcher._links;

        var project = null;
        var projectId = links.project.href.match(/\d+$/);
        if (projectId && projectId.length > 0) {
            project = projectId[0];
        }

        request_matcher.activeResponse = null;

        if (links.active_response) {
            var activeResponseId = links.active_response.href.match(/\d+$/);
            if (activeResponseId && activeResponseId.length === 1) {
                request_matcher.activeResponse = parseInt(activeResponseId[0]);
            }
        }

        request_matcher.links = {
            responses: links.responses.href
        };

        request_matcher.matchesGetRequest = request_matcher.matches_get_request;
        request_matcher.matchesPostRequest = request_matcher.matches_post_request;
        request_matcher.matchesPutRequest = request_matcher.matches_put_request;
        request_matcher.matchesDeleteRequest = request_matcher.matches_delete_request;
        request_matcher.createdAt = request_matcher.created_at;
        request_matcher.updatedAt = request_matcher.updated_at;

        delete request_matcher._links;

        request_matcher.project = project;

        return request_matcher;
    },

    extractSingle: function (store, primaryType, payload, recordId) {

        this.normalizeRequestMatcher(payload.request_matcher);

        return this._super(store, primaryType, payload, recordId);
    },

	extractArray: function(store, type, payload) {

        var self = this;

		var requestMatchers = payload.request_matchers;

		requestMatchers.forEach(function(requestMatcher) {

            self.normalizeRequestMatcher(requestMatcher);
		});

		return this._super(store, type, payload);
	},

    serialize: function (requestMatcher, options) {
        var json = this._super(requestMatcher, options);

        json.active_response = json.activeResponse;
        json.matches_get_request = json.matchesGetRequest;
        json.matches_post_request = json.matchesPostRequest;
        json.matches_put_request = json.matchesPutRequest;
        json.matches_delete_request = json.matchesDeleteRequest;

        delete json.activeResponse;
        delete json.matchesGetRequest;
        delete json.matchesPostRequest;
        delete json.matchesPutRequest;
        delete json.matchesDeleteRequest;
        delete json.createdAt;
        delete json.updatedAt;

        return json;
    },

    serializeIntoHash: function(data, type, record, options) {
        data.request_matcher = this.serialize(record, options);
        delete data.requestMatcher;
    }
});