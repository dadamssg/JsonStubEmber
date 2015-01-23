import Modal from './modal';
import AnimatedButtonMixin from '../mixins/animated-button';

export default Modal.extend(AnimatedButtonMixin, {

    didInsertElement: function () {
        this._super();
        this.createAnimatedButton('.submit-button', 'submitting');
    }
});