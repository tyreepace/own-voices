var VALID_DEPLOY_TARGETS = [ // update these to match what you call your deployment targets
  'dev',
  'qa',
  'prod'
];

module.exports = function(deployTarget) {
  var ENV = {
    build: {},
    redis: {
      allowOverwrite: true,
      keyPrefix: 'own-voices:index'
    },
    s3: {
      prefix: 'own-voices'
    }
  };

  if (VALID_DEPLOY_TARGETS.indexOf(deployTarget) === -1) {
    throw new Error('Invalid deployTarget ' + deployTarget);
  }

  if (deployTarget === 'dev') {
    ENV.build.environment = 'development';
    ENV.redis.url = process.env.REDIS_URL || 'redis://0.0.0.0:6379/';
    // only care about deploying index.html into redis in dev
    ENV.pipeline = {
      disabled: {
        allExcept: ['redis']
      }
    }
  }

  if (deployTarget === 'qa') {
    ENV.redis.url = process.env.QA_REDIS_URL;
  }

  if (deployTarget === 'prod') {
    ENV["redis"] = {
      host: '104.248.212.229',
      port: 6379,
      password: secret_password,
      keyPrefix: 'ownvoices-bucket'
    };

    ENV["s3"] = {
      accessKeyId: ACCESS_ID,
      secretAccessKey: ACCESS_KEY,
      bucket: 'ownvoices-bucket',
      region: 'us-west-1',
      filePattern: '**/*.{js,css,png,gif,ico,jpg,map,xml,txt,svg,swf,eot,ttf,woff,woff2,html}'
    };
  }

  return ENV;

  /* Note: a synchronous return is shown above, but ember-cli-deploy
   * does support returning a promise, in case you need to get any of
   * your configuration asynchronously. e.g.
   *
   *    var Promise = require('ember-cli/lib/ext/promise');
   *    return new Promise(function(resolve, reject){
   *      var exec = require('child_process').exec;
   *      var command = 'heroku config:get REDISTOGO_URL --app my-app-' + deployTarget;
   *      exec(command, function (error, stdout, stderr) {
   *        ENV.redis.url = stdout.replace(/\n/, '').replace(/\/\/redistogo:/, '//:');
   *        if (error) {
   *          reject(error);
   *        } else {
   *          resolve(ENV);
   *        }
   *      });
   *    });
   *
   */
}
