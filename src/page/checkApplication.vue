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
              @click="handleScoreInfo(scope.row)">评分内容
            </el-button>
            <el-button
              size="small"
              type="success"
              @click="handleCheck(scope.row)">审核
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="评分内容" :visible.sync="dialogDetailTableVisible" size="large">
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
          <el-table-column property="detail.remark1" label="项目名称"></el-table-column>
        </el-table>
      </el-dialog>

      <el-dialog title="教师信息" :visible.sync="dialogTeacherTableVisible">
        <el-table :data="teacherData" stripe>
          <el-table-column prop="username" label="用户名"></el-table-column>
          <el-table-column property="sex" label="性别"></el-table-column>
          <el-table-column property="role" label="角色"></el-table-column>
          <el-table-column property="real_name" label="真实姓名"></el-table-column>
          <el-table-column property="phone_number" label="联系方式"></el-table-column>
        </el-table>
      </el-dialog>


      <el-dialog title="审核" :visible.sync="dialogCheckTableVisible">
        <el-form :model="form" :rules="rules">
          <el-form-item>
            <el-radio-group v-model="form.state" size="large">
              <el-radio-button label="已通过">通过审核</el-radio-button>
              <el-radio-button label="不通过">不通过审核</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <a style="color: #94aeb9;">通过审核不需要填写理由</a>
          </el-form-item>
          <el-form-item>
            <el-input
              type="textarea"
              :autosize="{minRows: 4}"
              placeholder="请输入理由"
              v-model="form.textarea"
              :disabled="form.state!='不通过'">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="info"
              @click="check(form)"
              style="float: right;"
            >提交
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

    </div>
    <foot></foot>
  </div>
</template>

<script>
  import headTop from '../components/headTop'
  import foot from '../components/foot'
  import {getStore} from '../config/mUtils'
  import {getCheckList, getUserInfo,check} from '../api/getData'
  import ElForm from "../../node_modules/element-ui/packages/form/src/form.vue";
  import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item.vue";

  export default {
    data() {
      return {
        tableData                : [{
          upload_time: 'test',
          state      : 'test',
          sum_score  : '100'
        }],
        form:{
          textarea:'',
          state:'',
          order_id:''
        },
        rules:{},
        teacherData              : [],
        detailData               : [],
        checkData               : [],
        dialogDetailTableVisible : false,
        dialogTeacherTableVisible: false,
        dialogCheckTableVisible: false,
      }
    },
    created() {
      this.init_data()
    },
    components: {
      headTop,
      foot
    },
    methods   : {
      async init_data() {
        let local_info = getStore('user_info');
        if(local_info) {
          local_info = JSON.parse(local_info);
          let rst = await getCheckList({user_id:local_info.user_id});
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
      async handleTeacherInfo(row) {
        let rst = await getUserInfo({user_id:row.user_id});
        this.teacherData = [];
        if(rst.ok) {
          this.teacherData.push(rst.content);
          this.dialogTeacherTableVisible = true
        } else {
          this.$message({
            type   : 'error',
            message: '获取信息失败，请点击重试'
          });
        }
      },
      async handleScoreInfo(row) {
        //todo 修改单位表格显示方式
        this.detailData = [];
        this.detailData.push(...row.content);
        this.dialogDetailTableVisible = true
      },
      async handleCheck(row){
        this.form.textarea = '';
        this.form.state = '';
        this.form.order_id = row.order_id;
        this.dialogCheckTableVisible = true
      },
      async check(form){
        this.$confirm('即将提交审核结果, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let local_info = getStore('user_info');
          if(local_info) {
            local_info = JSON.parse(local_info);
            let data = {
              user_id:local_info.user_id,
              order_id:form.order_id,
              state:form.state,
              defeat_reason:form.textarea
            };
            let rst = await check(data);
            if(rst.ok) {
              this.$message({
                type   : 'success',
                message: '审核成功!'
              });
              this.dialogCheckTableVisible = false;
              this.init_data();
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
            message: '已取消'
          });
        });
      }
    }
  }
</script>

<style lang="less">
  @import '../style/mixin';

  .table_container {
    padding: 20px;
  }


</style>
