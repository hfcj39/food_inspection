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
const upload = r => require.ensure([], () => r(require('@/page/upload')), 'upload');
const historyList = r => require.ensure([], () => r(require('@/page/historyList')), 'historyList');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');
const teacherList = r => require.ensure([], () => r(require('@/page/teacherList')), 'teacherList');
const checkApplication = r => require.ensure([], () => r(require('@/page/checkApplication')), 'checkApplication');
const addScore = r => require.ensure([], () => r(require('@/page/addScore')), 'addScore');
const scoreTable = r => require.ensure([], () => r(require('@/page/scoreTable')), 'scoreTable');



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
        },
        {
          path:'/upload',
          component:upload,
          meta:['审核表管理','提交审核表']
        },
        {
          path:'/history',
          component:historyList,
          meta:['历史记录','历史审核表']
        },
        {
          path:'/explain',
          component:explain,
          meta:['说明','说明']
        }
      ]
    },{
      path:'/check',
      component:check,
      children:[
        {
          path:'',
          component:home
        },{
          path:'/userinfo_check',
          component:userinfo,
          meta:['用户管理','用户信息']
        },{
          path:'/teacherList',
          component:teacherList,
          meta:['用户管理','教师列表']
        },
        {
          path:'/explain_check',
          component:explain,
          meta:['说明','说明']
        },{
          path:'/checkApplication',
          component:checkApplication,
          meta:['审核表管理','待审核申请']
        },
        {
          path:'/addScore',
          component:addScore,
          meta:['评分表管理','新增评分项目']
        },
        {
          path:'/scoreTable',
          component:scoreTable,
          meta:['评分表管理','评分表一览']
        }
      ]
    }
  ]
})
