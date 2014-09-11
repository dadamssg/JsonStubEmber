import Ember from 'ember';

export default Ember.Mixin.create({

    errorMessages: [],

    successMessages: [],

    clearMessages: function() {
        this.clearErrors();
        this.clearSuccessMessages();
    },

    clearErrors: function() {
        this.get('errorMessages').clear();
    },

    clearSuccessMessages: function() {
        this.get('successMessages').clear();
    },

    addError: function (error) {
        this.get('errorMessages').pushObject(error);
    }, 

    extractErrors: function (jqXHR) {

        var errorMessages = this.get('errorMessages');

        var error = jqXHR.responseJSON.error; 
        if (error) {
            errorMessages.pushObject(error);
        }

        var errors = jqXHR.responseJSON.errors;
        if (errors) {
            var addError = function (error) {
                errorMessages.pushObject(error);
            };

            if (errors instanceof Array) {
                errors.forEach(addError);
                return;
            } 

            for (var field in errors) {
                if (errors.hasOwnProperty(field) && errors[field] instanceof Array) {                   
                    errors[field].forEach(addError);
                }
            }
        }
    }
});