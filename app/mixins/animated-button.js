import Ember from 'ember';

export default Ember.Mixin.create({

    createAnimatedButton: function (selector, controllerProperty) {
        var button = this.$(selector)[0];
        button = Ladda.create(button); 

        if (controllerProperty) {
            var controller = this.get('controller');
            controller.addObserver(controllerProperty, this, function () { 

                if (controller.get(controllerProperty)) {
                    button.start();
                } else {
                    button.stop();
                }
                
            });
        }
        return button; 
    }
});