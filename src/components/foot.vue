<template>
  <div class="ft">上海海洋大学 版权所有 {{date}} 极栈信息科技有限责任公司 技术支持</div>
</template>

<script>
  export default {
    data(){
      return {
        date:new Date().getFullYear()
      }
    },
  }
</script>

<style>
  .ft{
    margin-top:100px;
    padding-top: 50px;
    text-align: center;
    color: #9eaebb;
    width: 100%;
  }
</style>
