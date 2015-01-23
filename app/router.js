import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

 Router.map(function() {
    
    // /login
    this.route('login');
    
    // /confirm
    this.route('confirm', {path: 'register/confirm/:token'});

    // /signup
    this.route('signup');
    
    // /reset/password
    this.route('reset-password', {path: 'reset/password/:token'});

    // /reset
    this.route('reset');

    // /admin
    this.resource('admin', function() {

        // /admin/profile
        this.route('profile');

        // /admin/invitations
        this.route('invitations');

        // /admin/projects
        this.resource('projects', function() {

            // /admin/projects/2
            this.resource('project', {path: ':id'}, function() {

                // /admin/projects/2/request-matchers/5
                this.resource('project.request-matcher', {path: 'request-matchers/:request_matcher_id'});
            });
        });
    });

    this.route('four-oh-four', {path: '*path'});
 });
export default Router;
