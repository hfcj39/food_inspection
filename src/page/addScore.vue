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
            <el-input v-model="updateForm.third_list" placeholder="审核项目三级目录"></el-input>
          </el-form-item>
          <el-form-item label="四级目录" prop="real_name">
            <el-input v-model="updateForm.forth_list" placeholder="审核内容四级目录"></el-input>
          </el-form-item>
          <el-form-item label="分数">
            <el-input v-model="updateForm.score" placeholder="审核项目的分数"></el-input>
          </el-form-item>

          <el-form-item
            v-for="(domain, index) in updateForm.unit"
            :label="'单位' + index"
            :key="index"
          >
            <el-input v-model="updateForm.unit[index]"></el-input>
            <el-button @click.prevent="removeUnit(domain)">删除</el-button>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('updateForm')" class="submit_btn">提交</el-button>
            <el-button @click="addUnit">新增单位</el-button>
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
  import {addScore} from '../api/getData'
  import {getStore} from '../config/mUtils'

  export default {
    data() {
      return {
        updateForm: {
          first_list : '',
          second_list: '',
          third_list : '',
          forth_list : '',
          score      : '',
          unit       : ['']
        }
      };

    },
    created() {

    },
    components: {
      headTop,
      foot
    },
    methods   : {
      //todo 样式
      async submitForm(f) {
        this.$refs[f].validate(async(valid) => {
          if(valid) {
            let user_info = getStore('user_info');
            if(user_info) {
              user_info = JSON.parse(user_info);
              this.updateForm.user_id = user_info.user_id;
              this.updateForm.score = parseInt(this.updateForm.score);
//              console.log(this.updateForm);
              let rst = await addScore(this.updateForm);
              if(rst.ok) {
                this.$message({
                  type   : 'success',
                  message: '新增成功'
                });
                this.$router.push('/scoreTable')
              } else {
                this.$message({
                  type   : 'error',
                  message: rst.content.message
                });
              }
            } else {
              this.$message({
                type   : 'error',
                message: '请重新登录'
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
      },
      removeUnit(item){
        let index = this.updateForm.unit.indexOf(item);
//        console.log(index)
        if (index !== -1) {
          this.updateForm.unit.splice(index, 1)
        }
      },
      addUnit(){
        this.updateForm.unit.push('');
      }
    },
    watch     : {
      '$route'(to, from) {
        // 对路由变化作出响应...
        this.updateForm = {
          first_list : '',
          second_list: '',
          third_list : '',
          forth_list : '',
          score      : '',
          unit       : ''
        };
      }
    },

  }
</script>

<style lang="less">
  @import '../style/mixin';
</style>
