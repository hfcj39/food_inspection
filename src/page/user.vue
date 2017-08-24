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
      <el-card class="avatar"><img :src=baseImgPath class="image"></el-card>
    </el-card>
    <foot></foot>
  </div>
</template>

<script>
  import headTop from '../components/headTop'
  import foot from '../components/foot'
  import {getUserInfo} from '../api/getData'
  import {getStore} from '../config/mUtils'
  import {baseImgPath} from '../config/env'

  export default {
    data() {
      return {
        user:null,
        baseImgPath
      }
    },
    created() {
      this.init_data();
    },
    components: {
      headTop,
      foot
    },
    methods   : {
      init_data: async function() {
        let local_info = getStore('user_info');
        if(local_info) {
          local_info = JSON.parse(local_info);
          let rst = await getUserInfo(local_info.user_id);
          if(rst.ok){
            this.user=rst.content;
            if(rst.content.sex==="1") this.user.sex='男';
            else this.user.sex='女'
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
    watch:{
      '$route' (to, from) {
        // 对路由变化作出响应...
        this.init_data()
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
