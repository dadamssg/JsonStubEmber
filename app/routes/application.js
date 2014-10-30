import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';
import config from '../config/environment';

export default Ember.Route.extend(ApplicationRouteMixin, {

    actions: {
        sessionInvalidationSucceeded: function() {
            this.transitionTo('login');
        },
        
        didTransition: function() {

            if (config.environment === 'production') {
                Ember.run.once(this, function() {
                    ga('send', 'pageview', this.router.get('url'));
                });
            }
        },

        openModal: function (template) {
            this.render(template, {
                into: 'application',
                outlet: 'modal'
            });
        },

        closeModal: function () {
            this.disconnectOutlet({
                outlet: 'modal',
                parentView: 'application'
            });
        },

        tweet: function () {
            var url = 'https://twitter.com/home?status=Fake%20the%20backend%20API%20while%20you%20develop%20the%20frontend%20with%20@JsonStub%20http://jsonstub.com%20/';
            var width = 550;
            var height = 350;
            var top = (screen.height/2)-(height/2);
            var left = (screen.width/2)-(width/2);
            var opts = [];
            opts.push('toolbar=no');
            opts.push('location=no');
            opts.push('status=no');
            opts.push('menubar=no');
            opts.push('scrollbars=no');
            opts.push('resizable=no');
            opts.push('width=' + width);
            opts.push('height=' + height);
            opts.push('top=' + top);
            opts.push('left=' + left);

            var win = window.open(url, 'tweet', opts.join());
            win.focus();
        }
    }
});