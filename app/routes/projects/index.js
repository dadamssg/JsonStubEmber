import Ember from 'ember';

export default Ember.Route.extend({

    model: function() {
        console.log('projects.index route!');
        
        var projects = this.modelFor('projects');
        if (projects && projects.get('length') === 1) {
            this.transitionTo('project', projects.get('firstObject'));
        }
    }
});