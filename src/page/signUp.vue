<template>
  <div class="signUp_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showSignup">
        <div class="manage_tip">
          <p>注册</p>
        </div>
        <el-form :model="signupForm" :rules="rules" ref="signupForm">
          <el-form-item prop="username">
            <el-input v-model="signupForm.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="signupForm.password" placeholder="密码" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="role">
            <el-select v-model="signupForm.role" placeholder="选择身份" style="display:block">
              <el-option value="教师"></el-option>
              <el-option value="审核员"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="real_name">
            <el-input v-model="signupForm.real_name" placeholder="真实姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-radio-group v-model="signupForm.sex">
              <el-radio label="男" value="1"></el-radio>
              <el-radio label="女" value="0"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="phone_number">
            <el-input v-model.number="signupForm.phone_number" placeholder="联系电话"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('signupForm')" class="submit_btn">注册</el-button>
          </el-form-item>
          <el-form-item>
            <router-link to="/"><el-button class="submit_btn">返回</el-button></router-link>
          </el-form-item>
        </el-form>
        <foot></foot>
      </section>
    </transition>
  </div>
</template>

<script>
  import {signup} from '../api/getData'
  import ElFormItem from '../../node_modules/element-ui/packages/form/src/form-item.vue';
  import foot from '../components/foot'

  export default {
    components: {
      ElFormItem,
      foot
    },
    data() {
      return {
        signupForm: {
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
        },
        showSignup: false
      }
    },
    mounted() {
      this.showSignup = true
    },
    methods:{
      async submitForm(formName){
        this.$refs[formName].validate(async(valid) => {
          if(valid) {
            let obj = {
              username:this.signupForm.username,
              password:this.signupForm.password,
              role:this.signupForm.role,
              real_name:this.signupForm.real_name,
              sex:this.signupForm.sex,
              phone_number:this.signupForm.phone_number
            };
            const res = await signup(obj);
            //console.log(res);
            if(res.ok) {
              this.$message({
                type   : 'success',
                message: '注册成功'
              });
              this.$router.push('/')
            } else {
              this.$message({
                type   : 'error',
                message: res.content.message
              });
            }
          } else {
            this.$notify.error({
              title  : '错误',
              message: '请输入正确的用户名密码',
              offset : 100
            });
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../style/mixin';

  .signUp_page {
    background-color: #324057;
  }

  .manage_tip {
    position: absolute;
    width: 100%;
    top: -100px;
    left: 0;
    p {
      font-size: 34px;
      color: #ffffff;
    }
  }
  .form_contianer {
    .wh(320px, 450px);
    .ctp(320px, 450px);
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    background-color: #f9f9f9;
    .submit_btn {
      width: 100%;
      font-size: 16px;
    }
  }

  .form-fade-enter-active, .form-fade-leave-active {
    transition: all 2s;
  }

  .form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -100px, 0);
    opacity: 0;
  }
</style>
