import Ember from 'ember';

export default Ember.Mixin.create({

 //   successMessages: [], <-- this is required in the target

 //   errorMessages: DS.Errors.create(), <-- this is required in the target

    clearMessages: function () {
        this.get('successMessages').clear();
        this.get('errorMessages').clear();
    },

    addSuccessMessage: function (message) {
        this.get('successMessages').pushObject(message);
    },

    addErrorMessage: function (field, error) {
        if (error === undefined) {
            error = field;
            field = 'api';
        }
        this.get('errorMessages').add(field, error);
    },

    extractErrors: function (response) {

        this.clearMessages();

        var errorMessages = this.get('errorMessages');

        if (response.jqXHR === undefined) {
            this.addErrorMessage('api', 'An error occurred. :(');
            return;
        }

        var json = response.jqXHR.responseJSON;

        var error = json.error; 
        if (error) {
            errorMessages.add("api", error);
        }

        var errors = json.errors;
        if (errors) {

            if (errors instanceof Array) {
                errors.forEach(function (error) {
                    errorMessages.add("api", error);
                });
                return;
            } 

            var fields = Ember.keys(errors);

            if (fields instanceof Array) {
                fields.forEach(function (field) {
                    errorMessages.add(field, errors[field]);
                });
            }
        }
    }
});