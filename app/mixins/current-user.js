import Ember from 'ember';

export default Ember.Mixin.create({

    getUser: function() {

        var session = this.get('session');
        var user = session.get('user');

        if (user) {
            return new Ember.RSVP.Promise(function (resolve) {
              resolve(user);
            });
        }

        var self = this;
        var adapter = this.store.adapterFor('application');
        var url = adapter.get('host') + '/' + adapter.get('namespace') + '/user';

        return Ember.$.ajax({
            url: url,
            dataType: 'json',
            contentType: 'application/json'
        }).then(function (response) {
            var user = self.store.createRecord('user');
            var userData = response.user;
            if (userData) {
                for(var key in userData) {
                    if(userData.hasOwnProperty(key)){
                        user.set(key, userData[key]);
                    }
                }
                user.set('apiToken', userData.api_token);
            }
            session.set('user', user);

            return user;
        }); 
    }
});