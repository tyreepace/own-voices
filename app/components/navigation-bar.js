import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  classNames: ['navigation-setup'],

  links: computed(function() {
    return {
      'Books': 'books',
      'Authors': 'authors',
      'Submissions': 'submissions',
      'Team': 'team',
      'Blog': 'blog'
    };
  }),
});
