import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', { path: '/' });
  this.route('books');
  this.route('authors');
  this.route('submissions');
  this.route('team');
  this.route('blog');
  this.route('privacy');
});

export default Router;
