<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          label="用户编号"
          prop="user_id">
        </el-table-column>
        <el-table-column
          label="用户名"
          prop="username">
        </el-table-column>

        <el-table-column
          label="真实姓名"
          prop="real_name">
        </el-table-column>
        <el-table-column
          label="性别"
          :formatter="formatSex"
          prop="sex">
        </el-table-column>
        <el-table-column
          label="身份"
          prop="role">
        </el-table-column>
        <el-table-column
          label="联系电话"
          prop="phone_number">
        </el-table-column>
      </el-table>
      <div class="Pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :pageSize="15"
          layout="total, prev, pager, next"
          :total="count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import headTop from '../components/headTop'
  import {getTeacherList} from '../api/getData'
  import {getStore} from '../config/mUtils'

  export default {
    data() {
      return {
        city              : {},
        count             : 0,
        tableData         : [],
        allData           : [],
        currentPage       : 1,
      }
    },
    created() {
      this.init_data();
    },
    computed  : {},
    components: {
      headTop,
    },
    methods   : {
      async init_data() {
        let local_info = getStore('user_info');
        if(local_info) {
          this.tableData = [];
          local_info = JSON.parse(local_info);
          let rst = await getTeacherList(local_info.user_id);
          if(rst.ok) {
            this.allData = rst.content;
            this.tableData = rst.content.slice(0, 15);
            this.count = rst.content.length;
          } else {
            this.$message({
              type   : 'error',
              message: rst.content.message
            });
            this.tableData = null
          }
        } else {
          this.$message({
            type   : 'error',
            message: '请重新登录'
          });
        }
      },
      formatSex(row,colum){
        if(row.sex==='0') return '女';
        else return '男'
      },
      handleCurrentChange(val) {
        this.tableData = [];
        let offset = ((val - 1) * 15 );
        this.tableData = this.allData.slice(offset, offset + 15);
      },
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

  .table_container {
    padding: 20px;
  }

  .Pagination {
    display: flex;
    justify-content: flex-start;
    margin-top: 8px;
  }
</style>
