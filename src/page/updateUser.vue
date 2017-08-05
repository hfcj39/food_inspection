<template>
  <div class="fillcontain">
    <head-top></head-top>
    <el-form :model="updateForm" :rules="rules" ref="updateForm">
      <el-form-item prop="username">
        <el-input v-model="updateForm.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="updateForm.password" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="role">
        <el-select v-model="updateForm.role" placeholder="选择身份" style="display:block">
          <el-option value="教师"></el-option>
          <el-option value="审核员"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="real_name">
        <el-input v-model="updateForm.real_name" placeholder="真实姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="updateForm.sex">
          <el-radio label="男" value="男"></el-radio>
          <el-radio label="女" value="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="phone_number">
        <el-input v-model.number="updateForm.phone_number" placeholder="联系电话"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('updateForm')" class="submit_btn">提交</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @cilck="this.init_data()" class="submit_btn">取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import headTop from '../components/headTop'
  import {getUserInfo} from '../api/getData'
  import {getStore} from '../config/mUtils'

  export default {
    data() {
      return {
        updateForm: {
          username    : '',
          password    : '',
          role        : '',
          real_name   : '',
          sex         : '',
          phone_number: ''
        },
        rules     : {
          username: [{required: true, message: '请输入用户名', trigger: 'change'}],
          password: [{required: true, message: '请输入密码', trigger: 'change'}],
          role: [{required: true, message: '请选择身份', trigger: 'change'}],
          real_name: [{required: true, message: '请输入真实姓名', trigger: 'change'}],
          phone_number:[{type:'number',message:'请输入正确的电话',trigger: 'blur'}]
        }
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
            this.updateForm=rst.content;
            //return rst.content;
          }else {
            this.updateForm=null
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

</style>
