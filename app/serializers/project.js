import DS from 'ember-data';

export default DS.RESTSerializer.extend({

    serialize: function(record, options) {

        var json = this._super(record, options);

        delete json.responses;
        delete json.apiToken;

        return json;
    },
    
    extractArray: function (store, primaryType, payload) {

        var projects = payload.projects;

        projects.forEach(function(project) {
            project.links = {
                requestMatchers: project._links.request_matchers.href
            };

            project.apiToken = project.api_token;

            delete project.api_token;
            delete project._links;
        });

        return this._super(store, primaryType, payload);
    },

    extractSingle: function (store, primaryType, payload, recordId) {

        payload.project.links = {
            requestMatchers: payload.project._links.request_matchers.href
        };

        payload.project.apiToken = payload.project.api_token;

        delete payload.project.api_token;
        delete payload.project._links;

        return this._super(store, primaryType, payload, recordId);
    }
});