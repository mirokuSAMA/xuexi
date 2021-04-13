/* 
存放路由信息
*/
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  routes:[
    {
      path:'/',
      name: 'Login',
      component: () => import('../view/Login.vue')
    }
  ]
})