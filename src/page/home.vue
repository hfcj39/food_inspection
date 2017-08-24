<template>
  <div style="height: 100%">
    <head-top></head-top>
    <section class="data_section">
      <div class="section_title">FUCK U HAOQI</div>
    </section>
    <foot></foot>
  </div>
</template>

<script>
  import headTop from '../components/headTop'
  import foot from '../components/foot'
  export default {
    data(){
      return {}
    },
    components: {
      headTop,
      foot
    }

  }
</script>

<style lang="less">
  @import '../style/mixin';
  .data_section{
    height: 60%;
    padding: 20px;
    //margin-bottom: 40px;
    .section_title{
      text-align: center;
      font-size: 30px;
      //margin-bottom: 10px;
    }
  }

</style>
