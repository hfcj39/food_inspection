<template>
  <div class="header_container">

    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown @command="handleCommand" menu-align='start'>
      <img :src="baseImgPath" class="avator">
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="home">首页</el-dropdown-item>
        <el-dropdown-item command="singout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  import {getStore,removeStore} from '../config/mUtils'
  import {baseImgPath} from '@/config/env'
  //import {mapActions, mapState} from 'vuex'

  export default {
    data() {
      return {
        baseImgPath,
      }
    },
    methods: {
//      ...mapActions(['getAdminData']),
      async handleCommand(command) {
        if(command === 'home') {
          let user_info =JSON.parse(getStore('user_info'));
          if(user_info.role==='教师') this.$router.push('/manage');
          else if(user_info.role==='审核员') this.$router.push('/check');
        } else if(command === 'singout') {
          removeStore('user_info');
          this.$message({
            type   : 'success',
            message: '退出成功'
          });
          this.$router.push('/');
        }
      },
    }
  }
</script>

<style lang="less">
  @import '../style/mixin';

  .header_container {
    background-color: #EFF2F7;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
  }

  .avator {
    .wh(36px, 36px);
    border-radius: 50%;
    margin-right: 37px;
  }

  .el-dropdown-menu__item {
    text-align: center;
  }
</style>
