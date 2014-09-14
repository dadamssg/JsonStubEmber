import Ember from 'ember';

export default Ember.Mixin.create({
    
    attemptingDelete: false,

    actions: {
        attemptDelete: function () {
            this.set('attemptingDelete', true);
        }
    }
});