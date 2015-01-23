import Ember from "ember";
 
export default Ember.Component.extend({
    actions: {
        showConfirmation: function() {
            this.set('isShowingConfirmation', true);
        },
        cancel: function () {
            this.set('isShowingConfirmation', false);
        },
        confirm: function() {
            this.set('isShowingConfirmation', false);
            this.sendAction('action', this.get('param'));
        }
    }
});