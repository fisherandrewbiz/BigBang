import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '@/store';

function requireAuth(to, from, next) {
  if (store.state.token) next();
  else next({ name: 'signin' });
}

Vue.use(VueRouter);

const routes = [
  {
    path: '/signin',
    name: 'signin',
    component: () => import(/* webpackChunkName: "signin" */ './Signin.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "signup" */ './Signup.vue'),
  },
  {
    path: '',
    name: 'dashboard',
    beforeEnter: requireAuth
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;