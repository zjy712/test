import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import { Loading } from 'element-ui';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Index,
      children: [

        {
          path: '/movieinfo/:id',
          name: 'movieinfo',
          component: () => import('./views/movieinfo.vue')
        },

      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '*',
      name: 'Notfound',
      component: () => import('./views/404.vue')
    }
  ]
});


// 路由守卫

let loading; 
function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(0,0,0,0,7)'
    });
}
function endLoading() {
    loading.close()
}



router.beforeEach((to, from, next) => {
  const isLogin = localStorage.Token ? true : false;
  startLoading()
  if (to.path == '/login' || to.path == '/register') {
    next();
    endLoading()
  } else {
    isLogin ? next() : next('/login')
    endLoading()
  }
})

export default router;
