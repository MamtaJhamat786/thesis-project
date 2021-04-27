import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Groups from '../views/Groups.vue'
import Events from '../views/Events.vue';
import Login from '../views/Login.vue';
import Chat from '../views/Chat.vue';
import JoinedGroup from '../components/Group/Child-el/Joined/JoinedGroup'

import store from '../store/index.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/chat/:groupName',
    name: 'Chat',
    component: Chat,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/groups',
    name: 'Groups',
    component: Groups,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/joinedgroups',
    name: 'JoinedGroup',
    component: JoinedGroup,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/events',
    name: 'Events',
    component: Events,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresUnauth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      requiresAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(function(to, _, next) {
  if(to.meta.requiresAuth && !store.getters['auth/isAuthenticated']) {
    next('/login');
  } else if (to.meta.requiresUnauth && store.getters['auth/isAuthenticated']) {
    next('/groups')
  } else {
    next();
  }
})

export default router
