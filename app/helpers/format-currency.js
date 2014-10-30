import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(cents) {
    var amount = parseInt(cents, 10);
    amount = amount > 0 ? amount / 100 : 0;
    return "$" + amount.toFixed(2);
});