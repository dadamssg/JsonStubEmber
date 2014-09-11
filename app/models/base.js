import DS from 'ember-data';

export default DS.Model.extend({
    adapterDidInvalidate: function (errors) {
        var recordErrors = this.get('errors');
        var keys = Object.keys(errors);
        keys.forEach(function (key) {
            recordErrors.add(key, errors[key]);
        });
    }
});