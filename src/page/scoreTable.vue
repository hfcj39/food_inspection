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
          <template scope="scope">
            <span v-for="a,index in scope.row.unit">{{ scope.row.unit[index]+'.'}}</span>
          </template>
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
          <el-form-item label="一级目录" prop="username">
            <el-input v-model="updateForm.first_list" placeholder="审核项目一级目录"></el-input>
          </el-form-item>
          <el-form-item label="二级目录" prop="password">
            <el-input v-model="updateForm.second_list" placeholder="审核项目二级目录"></el-input>
          </el-form-item>
          <el-form-item label="三级目录" prop="checkPass">
            <el-input v-model="updateForm.third_list" placeholder="审核项目三级目录"></el-input>
          </el-form-item>
          <el-form-item label="四级目录" prop="role">
            <el-input v-model="updateForm.forth_list" placeholder="审核项目四级目录"></el-input>
          </el-form-item>
          <el-form-item label="分数" prop="real_name">
            <el-input v-model="updateForm.score" placeholder="审核项目的分数"></el-input>
          </el-form-item>

          <el-form-item
            :inline="true"
            v-for="(domain, index) in updateForm.unit"
            :label="'单位' + index"
            :key="index"
          >
            <el-col :span="18"><el-input v-model="updateForm.unit[index]"></el-input></el-col>
            <el-button @click.prevent="removeUnit(domain)" style="float: right;" type="danger">删除</el-button>

          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('updateForm')" class="submit_btn">提交</el-button>
            <el-button @click="addUnit">新增单位</el-button>
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
  import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";

  export default {
    data(){
      return{
        scoreData        : [],
        loading: true,
        dialogTableVisible:false,
        updateForm:{
          first_list:'',
          second_list:'',
          third_list:'',
          forth_list:'',
          score:'',
          unit:[]
        }
      }
    },
    components:{
      ElInput,
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
        //todo 修改功能 数组 ；修改单位表格显示方式
//        console.log(row);
        this.updateForm=row;
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
      removeUnit(item) {
        let index = this.updateForm.unit.indexOf(item);
//        console.log(index)
        if(index !== -1) {
          this.updateForm.unit.splice(index, 1)
        }
      },
      addUnit() {
        this.updateForm.unit.push('');
      },
      async submitForm(form){
        let user_info = getStore('user_info');
        if(user_info){
          user_info = JSON.parse(user_info);
          this.updateForm.user_id=user_info.user_id;
          this.updateForm.score = parseInt(this.updateForm.score);
          let rst = await editScore(this.updateForm);
          if (rst.ok){
            this.$message({
              type   : 'success',
              message: '修改成功'
            });
            this.dialogTableVisible = false;
            this.initData();
          }else {
            this.$message({
              type   : 'error',
              message: rst.content.message
            });
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
        this.initData();
      }
    },
  }
</script>

<style lang="less">
  @import '../style/mixin';

  .table_container {
    padding: 20px;
  }
</style>
