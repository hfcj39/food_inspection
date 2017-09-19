<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="审核表编号">
                <span>{{ props.row.order_id }}</span>
              </el-form-item>
              <el-form-item label="上传时间">
                <span>{{ props.row.upload_time }}</span>
              </el-form-item>
              <el-form-item label="审核状态">
                <el-tag>{{ props.row.state }}</el-tag>
              </el-form-item>
              <el-form-item label="审核理由">
                <span>{{ props.row.defeat_reason }}</span>
              </el-form-item>
              <el-form-item label="总评分">
                <span>{{ props.row.sum_score }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="上传时间"
          prop="upload_time">
        </el-table-column>
        <el-table-column
          label="审核状态"
          prop="state">
        </el-table-column>
        <el-table-column
          label="审核理由"
          prop="defeat_reason">
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
              @click="handleInfo(scope.row)">内容
            </el-button>
            <el-button
              size="small"
              type="success"
              @click="handleExport(scope.row)">导出
            </el-button>
            <el-button
              size="small"
              type="danger"
              :disabled="scope.row.state!=='未审核'"
              @click="handleDelete(scope.$index, scope.row)">撤销
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="详细内容" :visible.sync="dialogTableVisible" size="large">
        <el-table :data="detailData" stripe>
          <el-table-column prop="first_list" label="分类一"></el-table-column>
          <el-table-column property="second_list" label="分类二"></el-table-column>
          <el-table-column property="third_list" label="分类三"></el-table-column>
          <el-table-column property="forth_list" label="分类四"></el-table-column>
          <el-table-column property="score" label="分数"></el-table-column>
          <el-table-column property="detail.remark2" label="数量">
            <template scope="scope">
              <span v-for="a,index in scope.row.unit">{{scope.row.detail.remark2[index]}} {{ scope.row.unit[index]}}</span>
            </template>
          </el-table-column>
          <el-table-column property="detail.remark1" label="备注"></el-table-column>
        </el-table>
      </el-dialog>
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
  import {getHistoryList, repeal,exportTable} from '../api/getData'
  import {getStore} from '../config/mUtils'
  export default {
    data() {
      return {
        city              : {},
        count             : 0,
        tableData         : [],
        allData           : [],
        currentPage       : 1,
        detailData        : [],
        dialogTableVisible: false,
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
      //TODO 修改表格单位显示方式
      async init_data() {
        let local_info = getStore('user_info');
        if(local_info) {
          this.tableData = [];
          local_info = JSON.parse(local_info);
          let rst = await getHistoryList({user_id:local_info.user_id});
          if(rst.ok) {
            this.allData = rst.content;
            this.tableData = rst.content.slice(0, 15);
            this.count = rst.content.length;
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
      handleCurrentChange(val) {
        this.tableData = [];
        let offset = ((val - 1) * 15 );
        this.tableData = this.allData.slice(offset, offset + 15);
      },
      handleInfo(row) {
        //console.log(...row.content);
        this.detailData = [];
        this.detailData.push(...row.content);
        console.log(...row.content);
        this.dialogTableVisible = true;
      },
      async handleDelete(index, row) {
        this.$confirm('即将撤销选中的审核表, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText : '取消',
          type             : 'warning'
        }).then(async() => {
          let local_info = getStore('user_info');
          if(local_info) {
            local_info = JSON.parse(local_info);
            let opt = {
              user_id : local_info.user_id,
              order_id: row.order_id
            };
            let rst = await repeal(opt);
            if(rst.ok) {
              this.$message({
                type   : 'success',
                message: '撤销成功!'
              });
              this.init_data();
              this.currentPage = 1;
            } else {
              this.$message({
                type   : 'error',
                message: '撤销失败!'
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
            type   : 'info',
            message: '已取消操作'
          });
        });
      },
      async handleExport(row){
        let rst = await exportTable({order_id:row.order_id});
        let a = document.createElement('a');
        a.href = rst.url;
        a.download = rst.filename;
        a.click();
        window.URL.revokeObjectURL(rst.url);
      }
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

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .table_container {
    padding: 20px;
  }

  .Pagination {
    display: flex;
    justify-content: flex-start;
    margin-top: 8px;
  }
</style>
