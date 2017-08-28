<template>
  <div class="fillcontain">
    <head-top></head-top>
    <el-row style="margin-top: 100px;">
      <el-col :span="12" :offset="5">
        <el-form labelPosition="left" :model="updateForm" ref="updateForm" label-width="110px">
          <el-form-item label="一级目录" prop="first_list">
            <el-input v-model="updateForm.first_list" placeholder="审核项目一级目录"></el-input>
          </el-form-item>
          <el-form-item label="二级目录" prop="second_list">
            <el-input v-model="updateForm.second_list" placeholder="审核项目二级目录"></el-input>
          </el-form-item>
          <el-form-item label="三级目录" prop="role">
            <el-input v-model="updateForm.second_list" placeholder="审核项目三级目录"></el-input>
          </el-form-item>
          <el-form-item label="四级目录" prop="real_name">
            <el-input v-model="updateForm.real_name" placeholder="审核内容四级目录"></el-input>
          </el-form-item>
          <el-form-item label="分数">
            <el-input v-model="updateForm.second_list" placeholder="审核项目的分数"></el-input>
          </el-form-item>
          <el-form-item label="XXX" prop="phone_number">
            <el-input v-model="updateForm.phone_number" placeholder="XXX"></el-input>
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

  export default {
    data(){
      return{
        updateForm:{
          first_list:'',
          second_list:'',
        }
      };

    },
    created(){

    },
    components:{
      headTop,
      foot
    },
    methods:{
      //todo 新增功能
    }
  }
</script>

<style lang="less">
  @import '../style/mixin';
</style>
