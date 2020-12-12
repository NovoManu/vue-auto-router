import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

const setMiddlewares = (to, from, next) => {
  if (!to.meta.middlewares) {
    return next()
  }
  const middlewares = to.meta.middlewares
  Object.keys(middlewares).forEach(middleware => {
    middlewares[middleware]({ to, from, next })
  })
  return next()
}

export default Promise.all(routes).then(routes => {
  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })

  router.beforeEach(setMiddlewares)

  return router
})
