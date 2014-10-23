/* jshint node: true */

module.exports = function(environment) {

  var api_host = 'https://jsonstub.dev/app_test.php';
  var stripeKey = 'pk_N3Me9PMC88rJy8wZ5jLQ9fvexdR9W';
  var devMode = true;

  if (environment === 'production') {
    api_host = 'http://jsonstub.com';
    stripeKey = 'pk_N3Me9PMC88rJy8wZ5jLQ9fvexdR9W';
    devMode = false;
  }

  var ENV = {
    modulePrefix: 'jsonstub-ember',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      API: {
        devMode: devMode,
        host: api_host,
        namespace: 'api'
      },
      STRIPE: {
        pubKey: stripeKey
      }
    },

    'simple-auth': {
      authorizer: 'simple-auth-authorizer:oauth2-bearer',
      crossOriginWhitelist: ['http://jsonstub.dev', 'http://jsonstub.com'],
      routeAfterAuthentication: 'projects',
      store: 'simple-auth-session-store:local-storage'
    },
    'simple-auth-oauth2': {
        serverTokenEndpoint: api_host + "/oauth/v2/token",
        serverTokenRevocationEndpoint: api_host + "/oauth/v2/token/destroy",
        refreshAccessTokens: true
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'auto';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  return ENV;
};
