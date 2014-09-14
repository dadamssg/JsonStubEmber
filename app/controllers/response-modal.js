import Ember from 'ember';

export default Ember.ObjectController.extend(Ember.Evented, {

    saving: false,

    getJson: function() {
        var body = this.get('model.body').trim();
        if (body.length === 0) {
            return body;
        }
        return JSON.parse(body);
    },

    actions: {

        save: function() {

            var response = this.get('model');

            try {
                this.getJson();
            } catch (err) {
                response.get('errors').add('body', 'Invalid json.');
                return;
            }

            var self = this;

            self.set('saving', true);

            response.save().then(function(){       
                response.get('requestMatcher').then(function (requestMatcher) {
                    // reload to get updated responses because the activated response might have changed
                    return requestMatcher.reload();
                }).then(function () {
                    self.trigger('hideResponseModal');
                });       
            }).catch(function () {
            }).finally(function () {
                self.set('saving', false);
            });
        },

        delete: function() {

            var response = this.get('model');
            var self = this;

            response.get('requestMatcher.responses').then(function (responses) {
                response.destroyRecord().then(function () {
                    responses.removeObject(response);
                    self.trigger('hideResponseModal');
                });
            });
        },

        cancel: function() {

            var response = this.get('model');
            var self = this;

            if (response.get('isNew') === true) {   

            	response.get('requestMatcher.responses').then(function (responses) {
					responses.removeObject(response);
					response.deleteRecord();
	                self.trigger('hideResponseModal');
            	}).catch(function () {
                });

            	return;
            } 

            response.rollback();
            this.trigger('hideResponseModal');         
        },

        logToConsole: function () {
            try {
                var body = this.getJson();
                console.log(body);
            } catch(err) {
                console.log(err.message);
            }
        }
    },

    statusCodes: [
	    {code: 100, text: "100 - Continue"},
	    {code: 101, text: "101 - Switching Protocols"},
	    {code: 102, text: "102 - Processing"},
	    {code: 200, text: "200 - OK"},
	    {code: 201, text: "201 - Created"},
	    {code: 202, text: "202 - Accepted"},
	    {code: 203, text: "203 - Non-Authoritative Information"},
	    {code: 204, text: "204 - No Content"},
	    {code: 205, text: "205 - Reset Content"},
	    {code: 206, text: "206 - Partial Content"},
	    {code: 207, text: "207 - Multi-Status"},
	    {code: 301, text: "301 - Moved Permanently"},
	    {code: 302, text: "302 - Found"},
	    {code: 303, text: "303 - See Other"},
	    {code: 304, text: "304 - Not Modified"},
	    {code: 305, text: "305 - Use Proxy"},
	    {code: 306, text: "306 - Reserved"},
	    {code: 307, text: "307 - Temporary Redirect"},
	    {code: 308, text: "308 - Permanent Redirect"},
	    {code: 400, text: "400 - Bad Request"},
	    {code: 401, text: "401 - Unauthorized"},
	    {code: 402, text: "402 - Payment Required"},
	    {code: 403, text: "403 - Forbidden"},
	    {code: 404, text: "404 - Not Found"},
	    {code: 405, text: "405 - Method Not Allowed"},
	    {code: 406, text: "406 - Not Acceptable"},
	    {code: 407, text: "407 - Proxy Authentication Required"},
	    {code: 408, text: "408 - Request Timeout"},
	    {code: 409, text: "409 - Conflict"},
	    {code: 410, text: "410 - Gone"},
	    {code: 411, text: "411 - Length Required"},
	    {code: 412, text: "412 - Precondition Failed"},
	    {code: 413, text: "413 - Request Entity Too Large"},
	    {code: 414, text: "414 - Request-URI Too Long"},
	    {code: 415, text: "415 - Unsupported Media Type"},
	    {code: 416, text: "416 - Requested Range Not Satisfiable"},
	    {code: 417, text: "417 - Expectation Failed"},
	    {code: 418, text: "418 - I&#039;m a teapot"},
	    {code: 422, text: "422 - Unprocessable Entity"},
	    {code: 423, text: "423 - Locked"},
	    {code: 424, text: "424 - Failed Dependency"},
	    {code: 425, text: "425 - Reserved for WebDAV advanced collections expired proposal"},
	    {code: 426, text: "426 - Upgrade Required"},
	    {code: 428, text: "428 - Precondition Required"},
	    {code: 429, text: "429 - Too Many Requests"},
	    {code: 431, text: "431 - Request Header Fields Too Large"},
	    {code: 500, text: "500 - Internal Server Error"},
	    {code: 501, text: "501 - Not Implemented"},
	    {code: 502, text: "502 - Bad Gateway"},
	    {code: 503, text: "503 - Service Unavailable"},
	    {code: 504, text: "504 - Gateway Timeout"},
	    {code: 505, text: "505 - HTTP Version Not Supported"},
	    {code: 506, text: "506 - Variant Also Negotiates (Experimental)"},
	    {code: 507, text: "507 - Insufficient Storage"},
	    {code: 508, text: "508 - Loop Detected"},
	    {code: 510, text: "510 - Not Extended"},
	    {code: 511, text: "511 - Network Authentication Required"}
	  ]
});










































