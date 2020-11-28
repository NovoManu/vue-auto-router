# Vue Automatic Router
Inspired with NuxtJS routing this package add the similar system to native VueJS project.
That is mean that it does not need to change routing by developer.
Instead, routes will be added automatically once you add
a new page into views directory.

## How to add new pages
Automatic router will read your `views` directory and create appropriate routes.
For example:
```
--views
----index.vue
```
will create a next routes
```
[{
    path: '/',
    name: 'Index',
    component: () => import('@/views/index.vue'),
    meta: {
        layout: 'AppDefaultLayout'
        middlewares: {}
    },
    children: []
}]
```
To create more difficult structure, see next example:
```
--views
----index
------index.vue
------user.vue
----profile.vue
```
```
[
    {
        path: '/',
        name: 'Index',
        component: () => import('@/views/index.vue'),
        meta: {
            layout: 'default'
            middlewares: {}
        },
        children: []
    },
    {
        path: '/user',
        name: 'User',
        component: () => import('@/views/user.vue'),
        meta: {
            layout: 'default'
            middlewares: {}
        },
        children: []
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/profile.vue'),
        meta: {
            layout: 'default'
            middlewares: {}
        },
        children: []
    }
]
```

If you need dynamic parameter in your view, it needs to start your component with `_`
For example:
```
--views
----posts
------index.vue
------_id.vue
```
will create next structure
```
[
    {
        path: '/',
        name: 'Posts',
        component: () => import('@/views/posts/index.vue'),
        meta: {
            layout: 'default'
            middlewares: {}
        },
        children: []
    },
    {
        path: '/posts/:id',
        name: 'PostsId',
        component: () => import('@/views/posts/_id.vue'),
        meta: {
            layout: 'default'
            middlewares: {}
        },
        children: []
    }
]
```
To add children (nested routes) to your should start your route with `^` on the same level as the parent
```
--views
----index
------index.vue
------^post.vue
```
```
[
    {
        path: '/',
        name: 'Index',
        component: () => import('@/views/index.vue'),
        meta: {
            layout: 'default'
            middlewares: {}
        },
        children: [
            name: 'Post',
            path: '/post',
            component: () => import('@/views/^post.vue'),
            meta: {
              layout: 'default',
              middlewares: {}
            }
        ]
    }
]
```

Note restriction: it is not possible now to add second level children

##Layouts and middlewares
Vue automatic router allows you to specify layouts and middlewares inside your component.

To add layouts to the project read this article:

https://itnext.io/vue-tricks-smart-layouts-for-vuejs-5c61a472b69b

After that it is possible to add your layout into vue components
```
export default {
  name: 'Login',
  layout: 'MyLayout'
}
```
Vue automatic router is looking for the layout "MyLayout.vue" in '/layouts' directory and add it to the route.

It is possible to add vue router middlewares in a vue component.

Here is middleware example
```
export default function myMiddleware({ next }) {
  return next();
}
```
```
import myMiddleware from '...'

export default {
  name: 'Login',
  middlewares: { myMiddleware },
}
```
Note: middlewares option must be an JS object

Read more about navigation guards here
https://router.vuejs.org/guide/advanced/navigation-guards.html
