<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      >
        <el-table-column
          label="上传时间"
          prop="upload_time">
        </el-table-column>
        <el-table-column
          label="审核状态"
          prop="state">
        </el-table-column>
        <el-table-column
          label="总评分"
          prop="sum_score">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              size="small"
              type="info"
              @click="handleTeacherInfo(scope.row)">教师信息
            </el-button>
            <el-button
              size="small"
              type="info"
              @click="handleInfo(scope.row)">评分内容
            </el-button>
            <el-button
              size="small"
              type="success"
              @click="handleDelete(scope.$index, scope.row)">审核
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <foot></foot>
  </div>
</template>

<script>
  import headTop from '../components/headTop'
  import foot from '../components/foot'
  import {getStore} from '../config/mUtils'
  import {getCheckList} from '../api/getData'
  export default {
    data(){
      return {
        tableData:[{
          upload_time:'test',
          state:'test',
          sum_score:'100'
        }]
      }
    },
    created(){
      this.init_data()
    },
    components:{
      headTop,
      foot
    },
    methods:{
      async init_data(){
        let local_info = getStore('user_info');
        if(local_info) {
          local_info = JSON.parse(local_info);
          let rst = await getCheckList(local_info.user_id);
          if(rst.ok) {
            this.tableData = rst.content;
          } else {
            this.tableData = null
          }
        } else {
          this.$message({
            type   : 'error',
            message: '请重新登录'
          });
        }
      },
      async handleTeacherInfo(row){
        console.log(row)
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
