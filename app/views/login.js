import Ember from 'ember';
import AnimatedButtonMixin from '../mixins/animated-button';

export default Ember.View.extend(AnimatedButtonMixin, {

    didInsertElement: function () {
        this.createAnimatedButton('.login-button', 'submitting');
    }
});