<template>
  <div class="manage_page fillcontain">
    <el-row style="height: 100%;">
      <el-col :span="4"  style="min-height: 100%; background-color: #324057; overflow: hidden">
        <el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
          <el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-document"></i>用户管理</template>
            <el-menu-item index="userinfo">用户信息</el-menu-item>
            <el-menu-item index="editinfo">信息修改</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-plus"></i>审核表管理</template>
            <el-menu-item index="upload">提交申请表</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-star-on"></i>历史记录</template>
            <el-menu-item index="history">历史审核表</el-menu-item>
            <!-- <el-menu-item index="newMember">用户数据</el-menu-item> -->
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-warning"></i>说明</template>
            <el-menu-item index="explain">说明</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%;overflow: auto;">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {getStore} from '../config/mUtils'
  export default {
    computed: {
      defaultActive: function(){
        return this.$route.path.replace('/', '');
      }
    },
    beforeCreate(){
      let user_info =JSON.parse(getStore('user_info'));
      if(user_info.role!=='教师'){
        this.$message({
          type   : 'warning',
          message: '身份有误,跳回首页'
        });
        this.$router.push('/')
      }
    }
  }
</script>


<style lang="less" scoped>
  @import '../style/mixin';
  .manage_page{

  }
</style>
