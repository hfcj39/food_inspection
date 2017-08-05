import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const signUp = r => require.ensure([], () => r(require('@/page/signUp')), 'signUp');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const check = r => require.ensure([], () => r(require('@/page/check')), 'check');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const userinfo = r => require.ensure([], () => r(require('@/page/user')), 'user');
const editinfo = r => require.ensure([], () => r(require('@/page/updateUser')), 'updateUser');



export default new Router({
  routes: [
    {
      path     : '/',
      component: login
    }, {
      path     : '/register',
      component: signUp
    },{
      path:'/manage',
      component:manage,
      children:[
        {
          path:'',
          component:home
        },{
          path:'/userinfo',
          component:userinfo,
          meta:['用户管理','用户信息']
        },{
          path:'/editinfo',
          component:editinfo,
          meta:['用户管理','信息修改']
        }
      ]
    },{
      path:'/check',
      component:check
    }
  ]
})
