export default {
  name: 'inject-response-serializer',
  after: "store",
  initialize: function(container, application){
    application.inject('route:project', 'responseSerializer', 'serializer:response');
  }
};