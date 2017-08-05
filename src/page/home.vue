<template>
  <div style="height: 100%">
    <head-top></head-top>
    <section class="data_section">
      <div class="section_title">FUCK U HAOQI</div>
    </section>
    <div class="ft">上海海洋大学 版权所有 {{date}} 极栈信息科技有限责任公司 技术支持</div>
  </div>
</template>

<script>
  import headTop from '../components/headTop'
  export default {
    data(){
      return {
        date:new Date().getFullYear()
      }
    },
    components: {
      headTop
    }

  }
</script>

<style lang="less">
  @import '../style/mixin';
  .data_section{
    height: 70%;
    padding: 20px;
    //margin-bottom: 40px;
    .section_title{
      text-align: center;
      font-size: 30px;
      //margin-bottom: 10px;
    }
  }
  .ft{
    .wh(100%,150px);
    color: #8197ab;
    text-align: center;
    padding-top:85px;
    position: relative;
    background-color: #EFF2F7;
  }
</style>
