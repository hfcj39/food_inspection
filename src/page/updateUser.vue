<template>
  <div class="fillcontain">
    <head-top></head-top>
    <el-row style="margin-top: 100px;">
      <el-col :span="12" :offset="5">
    <el-form labelPosition="left" :model="updateForm" :rules="rules" ref="updateForm" label-width="110px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="updateForm.username" disabled placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="updateForm.password" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="updateForm.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="身份" prop="role">
        <el-select v-model="updateForm.role" disabled placeholder="选择身份" style="display:block">
          <el-option value="教师"></el-option>
          <el-option value="审核员"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="真实姓名" prop="real_name">
        <el-input v-model="updateForm.real_name" placeholder="真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="updateForm.sex">
          <el-radio label="1">男</el-radio>
          <el-radio label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone_number">
        <el-input v-model="updateForm.phone_number" placeholder="联系电话"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('updateForm')" class="submit_btn">提交</el-button>
      </el-form-item>

    </el-form>
      </el-col>
    </el-row>
    <foot></foot>
  </div>
</template>

<script>
  import headTop from '../components/headTop'
  import foot from '../components/foot'
  import {getUserInfo,updateUserInfo} from '../api/getData'
  import {getStore} from '../config/mUtils'


  export default {
    data() {
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.updateForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        updateForm: {
          username    : '',
          password    : '',
          checkPass:'',
          role        : '',
          real_name   : '',
          sex         : '',
          phone_number: ''
        },
        rules     : {
          username: [{required: true, message: '请输入用户名', trigger: 'change'}],
          password: [{required: true, message: '请输入密码', trigger: 'change'}],
          checkPass:[{validator:validatePass2,trigger: 'blur'}],
          role: [{required: true, message: '请选择身份', trigger: 'change'}]
        }
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
      },
      async submitForm(formName){
        this.$refs[formName].validate(async(valid) => {
          if(valid) {
            let obj = {
              user_id:this.updateForm.user_id,
              password:this.updateForm.password,
              real_name:this.updateForm.real_name,
              sex:this.updateForm.sex,
              phone_number:this.updateForm.phone_number
            };
            const res = await updateUserInfo(obj);
            //console.log(res);
            if(res.ok) {
              this.$message({
                type   : 'success',
                message: '修改成功'
              });
              this.$router.push('/userinfo')
            } else {
              this.$message({
                type   : 'error',
                message: res.content.message
              });
            }
          } else {
            this.$notify.error({
              title  : '错误',
              message: '输入正确的信息',
              offset : 100
            });
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="less">
  @import '../style/mixin';

</style>
