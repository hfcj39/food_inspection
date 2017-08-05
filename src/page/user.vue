<template>
  <div class="fillcontain">
    <head-top></head-top>
    <header class="admin_title">用户信息</header>
    <el-card class="admin_set">
      <ul v-if="user" class="info">
        <li>
          <span>用户名：</span>&nbsp<span>{{user.username}}</span>
        </li>
        <li>
          <span>身份：</span>&nbsp<span>{{user.role}}</span>
        </li>
        <li>
          <span>真实姓名：</span>&nbsp<span>{{user.real_name}}</span>
        </li>
        <li>
          <span>性别：</span>&nbsp<span>{{user.sex}}</span>
        </li>
        <li>
          <span>联系方式：</span>&nbsp<span>{{user.phone_number}}</span>
        </li>
      </ul>
      <el-card class="avatar"><img src="/static/logo.png" class="image"></el-card>
    </el-card>

  </div>
</template>

<script>
  import headTop from '../components/headTop'
  import {getUserInfo} from '../api/getData'
  import {getStore} from '../config/mUtils'

  export default {
    data() {
      return {
        user:null
      }
    },
    created() {
      this.init_data();
    },
    components: {
      headTop,
    },
    methods   : {
      init_data: async function() {
        let local_info = getStore('user_info');
        if(local_info) {
          local_info = JSON.parse(local_info);
          let rst = await getUserInfo(local_info.user_id);
          if(rst.ok){
            this.user=rst.content;
            //return rst.content;
          }else {
            this.user=null
          }
        }else {
          this.$message({
            type   : 'error',
            message: '请重新登录'
          });
        }

      }
    },
  }
</script>

<style lang="less">
  @import '../style/mixin';

  .admin_set {
    padding: 5%;
    width: 60%;
    background-color: #F9FAFC;
    min-height: 400px;
    margin: 20px auto 0;
    border-radius: 10px;
    ul > li {
      padding: 20px;
      span {
        color: #666;
      }
    }
  }

  .admin_title {
    margin-top: 20px;
    .sc(24px, #666);
    text-align: center;
  }
  .info{
    float: left;
  }
  .avatar{
    .wh(200px,200px);
    float: right;
    position: relative;
  }
  .image {
    width: 100%;
    display: block;
  }
</style>
