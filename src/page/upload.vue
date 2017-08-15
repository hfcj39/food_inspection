<template>
  <div>
    <head-top></head-top>
    <el-row style="margin-top: 100px;">
      <el-col :span="14" :offset="4">
        <header class="form_header">提交申请表</header>
        <el-form labelPosition="left" :model="appForm" label-width="110px" class="form food_form">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="appForm.name" disabled></el-input>
          </el-form-item>
          <el-row style=" text-align: center;">
            <el-button type="primary" @click="dialog" style="margin-bottom: 10px;">添加评分项目</el-button>
            <el-table
              :data="appForm.content"
              stripe
              style="margin-bottom: 20px;">
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
                prop="type2"
                label="数量一">
              </el-table-column>
              <el-table-column
                prop="type3"
                label="数量二">
              </el-table-column>
              <el-table-column
                prop="type1"
                label="备注">
              </el-table-column>
              <el-table-column
                prop="score"
                label="单位分值">
              </el-table-column>
              <el-table-column label="操作">
                <template scope="scope">
                  <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.$index)">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-form-item>
            <el-button type="primary" @click="upload(appForm)" style="float: right">确认提交申请表<i class="el-icon-upload2 el-icon--right"></i></el-button>
          </el-form-item>
        </el-form>
        <el-dialog title="添加评分项" size="full" v-model="dialogFormVisible">
          <el-form :model="contentForm">
            <el-form-item label="数量一" label-width="100px">
              <el-input-number v-model="contentForm.type2" :min="0" :max="100"></el-input-number>
            </el-form-item>
            <el-form-item label="数量二" label-width="100px">
              <el-input-number v-model="contentForm.type3" :min="0" :max="10000"></el-input-number>
              <a style="margin-left: 20px">不需要则不填</a>
            </el-form-item>
            <el-form-item label="备注" label-width="100px">
              <el-input v-model="contentForm.type1" type="textarea" autosize placeholder="请输入项目详细补充或备注"></el-input>
            </el-form-item>
          </el-form>


          <el-table
            :data="scoreData"
            height="600"
            border
            highlight-current-row
            @current-change="handleCurrentChange"
            style="width: 100%;overflow: auto">
            <el-table-column
              prop="item_id"
              label="编号"
              sortable
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
              label="分值"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="unit"
              label="单位"
              width="180">
            </el-table-column>
          </el-table>


          <div slot="footer" class="dialog-footer">
            <router-link to="explain"><a @click="dialogFormVisible = false" style="margin-right: 20px">点击这里阅读说明</a>
            </router-link>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="add">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import headTop from '@/components/headTop'
  import {getUserInfo, getScoreTable, uploadTable} from '../api/getData'
  import {getStore} from '../config/mUtils'

  export default {
    data() {
      return {
        appForm          : {
          name   : '',
          user_id: '',
          content: [],
        },
        scoreData        : [],
        dialogFormVisible: false,
        contentForm      : {
          type3: null,
          type2: null,
          type1: null,
          selectedScore    : null,
        }
      }
    },
    components: {
      headTop,
    },
    created() {
      this.initData();
    },
    computed  : {
      selectValue: function() {
        return this.categoryForm.categoryList[this.categoryForm.categorySelect] || {}
      }
    },
    methods   : {
      async initData() {
        try {
          let local_info = getStore('user_info');
          if(local_info) {
            local_info = JSON.parse(local_info);
            let rst = await getUserInfo(local_info.user_id);
            if(rst.ok) {
              this.appForm.name = rst.content.username;
              this.appForm.user_id = rst.content.user_id;
            } else {
              this.$message({
                type   : 'error',
                message: '请求用户数据失败，请刷新重试'
              });
            }
          } else {
            this.$message({
              type   : 'error',
              message: '请重新登录'
            });
          }
        } catch(err) {
          console.log(err)
        }
      },
      async dialog() {
        //TODO 获取数据 scoreData
        let rst = await getScoreTable();
        this.scoreData = rst.content;
        this.contentForm.type1=null;
        this.contentForm.type2=0;
        this.contentForm.type3=0;
        this.dialogFormVisible = true;
      },
      handleCurrentChange(val) {
        this.contentForm.selectedScore = val;
      },
      add() {
        if(this.contentForm.selectedScore){
          this.appForm.content.push({...this.contentForm.selectedScore,...this.contentForm});
          this.dialogFormVisible = false;
        }else {
          this.$message({
            type:'error',
            message:'请选择一个评分项目'
          })
        }
      },

      handleDelete(index) {
        this.appForm.content.splice(index, 1);
      },
      async upload(appForm) {
        // 检查是否有评分项目
        if(appForm.content.length){
          try{
            let rst = await uploadTable(appForm);
            if(rst.ok){
              this.$message({
                type:'success',
                message:rst.content.message
              });
              this.$router.replace('/history')
            }else {
              this.$message({
                type:'error',
                message:rst.content.message
              })
            }
          }catch(e){
            console.log(e)
            this.$message({
              type:'error',
              message:'发生错误请重试'
            })
          }
        }else {
          this.$message({
            type:'error',
            message:'请选择一个评分项目'
          })
        }

      }
    }
  }
</script>

<style lang="less">
  @import '../style/mixin';

  .form {
    min-width: 900px;
    margin-bottom: 30px;
    &:hover {
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
      border-radius: 6px;
      transition: all 400ms;
    }
  }

  .food_form {
    border: 1px solid #eaeefb;
    padding: 50px;
  }

  .form_header {
    margin-top: 20px;
    margin-bottom: 30px;
    .sc(24px, #666);
    text-align: center;
  }

  .category_select {
    border: 1px solid #eaeefb;
    padding: 10px 30px 10px 10px;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
  }

  .add_category_row {
    height: 0;
    overflow: auto;
    transition: all 400ms;
    background: #f9fafc;
  }

  .showEdit {
    height: 185px;
  }

  .add_category {
    background: #f9fafc;
    padding: 10px 30px 0px 10px;
    border: 1px solid #eaeefb;
    border-top: none;
  }

  .add_category_button {
    text-align: center;
    line-height: 40px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    border: 1px solid #eaeefb;
    border-top: none;
    transition: all 400ms;
    &:hover {
      background: #f9fafc;
      span, .edit_icon {
        color: #20a0ff;
      }
    }
    span {
      .sc(14px, #999);
      transition: all 400ms;
    }
    .edit_icon {
      color: #ccc;
      transition: all 400ms;
    }
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .cell {
    text-align: center;
  }
</style>
