import Ember from 'ember';

export default Ember.Mixin.create({
    
    isSortingByField: function (field) {
        var activeProperty = this.get('sortProperties').get('firstObject');
        return field === activeProperty;
    },

    actions: {
        sort: function (field) {
            var activeProperty = this.get('sortProperties').get('firstObject');
            if (field === activeProperty) {
                this.toggleProperty('sortAscending');   
            } else {
                this.set('sortProperties', [field]);
            }  
        }
    }
});