import Modal from './modal';
import AnimatedButtonMixin from '../mixins/animated-button';

export default Modal.extend(AnimatedButtonMixin, {
    didInsertElement: function() {
        this._super();
        this.createAnimatedButton('.submit-button', 'submitting');
        this.createAnimatedButton('.cancel-button', 'canceling');

        this.$('#exp-year').attr('data-stripe', 'exp-year');
    }
});