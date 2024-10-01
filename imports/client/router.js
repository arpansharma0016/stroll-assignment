import VueRouter from 'vue-router';

const router = new VueRouter({
  base: '/',
  routes: [
    {
      path: '/',
      component: () => import('./pages/index.vue'),
    },
    {
      path: '/create-question',
      component: () => import('./pages/createQuestion.vue'),
    },
    {
      path: '/create-cycle',
      component: () => import('./pages/createCycle.vue'),
    },
    {
      path: '/create-region',
      component: () => import('./pages/createRegion.vue'),
    },
  ],
  mode: 'history',
});

router.beforeEach((to, _, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (Meteor.userId()) {
      if (Meteor.user()) next();
      else {
        Tracker.autorun(t => {
          const user = Meteor.user();
          if (user) {
            next();
            t.stop();
          }
        });
      }
    } else next({name: 'login', replace: true});
  } else next();
});

Meteor.startup(() => {
  Meteor.subscribe('userData');
});

export default router;
