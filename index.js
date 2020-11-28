import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import routes from '@/router/routes';

Vue.use(Router);

export default Promise.all(routes).then(routes => {
  const router = new Router({
    mode: 'history',
    routes
  });

  router.beforeEach((to, from, next) => {
    if (!to.meta.middlewares) {
      return next();
    }
    const middlewares = to.meta.middlewares;
    Object.keys(middlewares).forEach(middleware => {
      middlewares[middleware]({ to, from, next, store });
    });
    return next();
  });

  return router;
});
