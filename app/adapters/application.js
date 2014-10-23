import DS from 'ember-data';
import Ember from 'ember';
import config from '../config/environment';

export default DS.RESTAdapter.reopen({
    host: config.APP.API.host,
    namespace: config.APP.API.namespace,
    headers:  {
        "Content-Type": 'application/json'
    },
    ajaxError: function(jqXHR) {
        var error = this._super(jqXHR);

        if (jqXHR && jqXHR.status === 400) {
            var errors = {
                base: Ember.$.parseJSON(jqXHR.responseText)["errors"]
            };
            return new DS.InvalidError(errors);
        } 
        
        return error;
    }
    // }.property().volatile()
});

// export default DS.RESTAdapter.reopen({
//     host: 'http://jsonstub.com',
// 	headers: function() {
// 		var session = this.container.lookup('ember-simple-auth-session:main');

// 		return {
// 			"Authorization": 'Bearer ' + session.get('access_token'),
// 			'JsonStub-User-Key': 'bed578bd-f32a-4ce8-ac28-bec286a93b62',
// 			'JsonStub-Project-Key': '9afc3a84-1dfc-4624-9572-a33b6f60c52a'
// 		};
// 	}.property().volatile()
// });