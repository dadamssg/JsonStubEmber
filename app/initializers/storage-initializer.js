import LocalStorage from 'simple-auth/stores/local-storage';


var storage = LocalStorage.extend({

    key: 'jsonstub',

    getValue: function (key, defaultValue) {
        var data = this.restore() || {};
        return data[key] === undefined ? defaultValue : data[key];
    },

    setValue: function (key, value) {
        var data = this.restore() || {};
        data[key] = value;
        this.persist(data);
    }
});

export default {
    name: 'storage-initializer',
    initialize: function(container, application) {

        application.register('jsonstub:storage', storage);
        application.inject('controller', 'storage', 'jsonstub:storage');
    }
};