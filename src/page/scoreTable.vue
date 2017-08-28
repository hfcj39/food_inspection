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
      <el-form>

      </el-form>
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
        dialogTableVisible:false
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
