<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table
        v-loading="loading"
        element-loading-text="数据加载中"
        :data="scoreData"
        stripe
        height="600"
        border
        style="width: 100%;overflow: auto">
        <el-table-column
          prop="item_id"
          label="编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="first_list"
          label="分类一">
        </el-table-column>
        <el-table-column
          prop="second_list"
          label="分类二">
        </el-table-column>
        <el-table-column
          prop="third_list"
          label="分类三">
        </el-table-column>
        <el-table-column
          prop="forth_list"
          label="分类四">
        </el-table-column>
        <el-table-column
          prop="score"
          label="分值">
        </el-table-column>
        <el-table-column
          prop="unit"
          label="单位">
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template scope="scope">
            <el-button
              size="small"
              type="info"
              @click="handleEdit(scope.row)">修改
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDeleteScore(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="修改内容" :visible.sync="dialogTableVisible" size="large">
      <div style="max-width: 600px;padding-left: 20%;">
        <el-form labelPosition="left" :model="updateForm" ref="updateForm" label-width="110px">
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
      </div>

    </el-dialog>
    <foot></foot>
  </div>
</template>

<script>
  import headTop from '../components/headTop'
  import foot from '../components/foot'
  import {getUserInfo, getScoreTable,deleteScore,editScore} from '../api/getData'
  import {getStore} from '../config/mUtils'
  import ElForm from "../../node_modules/element-ui/packages/form/src/form.vue";

  export default {
    data(){
      return{
        scoreData        : [],
        loading: true,
        dialogTableVisible:false,
        updateForm:{

        }
      }
    },
    components:{
      ElForm,
      headTop,
      foot
    },
    created(){
      this.initData()
    },
    methods:{
      async initData(){
        this.loading= true;
        let rst = await getScoreTable();
        this.scoreData = rst.content;
        this.loading= false
      },
      async handleEdit(row){
        //todo 修改功能
        console.log(row);
        this.dialogTableVisible = true;
      },
      async handleDeleteScore(row){
        this.$confirm('此操作将永久删除该条, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let local_info = getStore('user_info');
          if(local_info) {
            local_info = JSON.parse(local_info);
            let data = {
              user_id:local_info.user_id,
              item_id:row.item_id
            };
            let rst = await deleteScore(data);
            if(rst.ok) {
              this.$message({
                type   : 'success',
                message: '删除成功!'
              });
              this.initData();
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    }
  }
</script>

<style lang="less">
  @import '../style/mixin';

  .table_container {
    padding: 20px;
  }
</style>
