<template>
  <div style="height: 100%">
    <head-top></head-top>
    <section class="data_section">
      <div class="section_title">欢迎您,{{role}}！用户：{{username}}</div>
      <div id="clock">
      <el-card class="clock">

          <p class="date">{{ date }}</p>
          <p class="time">{{ time }}</p>
          <!--<p class="text">好奇大纸张~</p>-->

      </el-card>
      </div>
    </section>
    <foot></foot>
  </div>
</template>

<script>
  import headTop from '../components/headTop'
  import foot from '../components/foot'
  import {getUserInfo} from '../api/getData'
  import {getStore} from '../config/mUtils'

  export default {
    data() {

      return {
        time    : '',
        date    : '',
        username: '',
        role    : '',
        week    : ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
      }
    },
    created() {
      this.init_data();
      setInterval(this.updateTime, 1000);
      this.updateTime();
    },
    components: {
      headTop,
      foot
    },
    methods   : {
      async init_data() {
        let info = JSON.parse(getStore('user_info'));
        let rst = await getUserInfo({user_id:info.user_id});
        this.username = rst.content.username;
        this.role = rst.content.role;
      },
      zeroPadding(num, digit) {
        let zero = '';
        for(let i = 0; i < digit; i++) {
          zero += '0';
        }
        return (zero + num).slice(-digit);
      },
      updateTime() {
        let cd = new Date();
        this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
        this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth() + 1, 2) + '-' + this.zeroPadding(cd.getDate(), 2) + ' ' + this.week[cd.getDay()];
      }

    }

  }
</script>

<style lang="less">
  @import '../style/mixin';

  .data_section {
    height: 60%;
    padding: 20px;

    .section_title {
      /*text-align: center;*/
      font-size: 30px;
      margin: 100px 100px 0;
    }
  }

  #clock {
    font-family: 'Share Tech Mono', monospace;
    text-align: center;
    position: relative;
    left: 70%;
    top: 150px;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    /*color: #daf6ff;*/
    color: #000000;
    background-color: #a5b3ca;
    width: 500px;
    /*text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);*/
  }

  #clock .time {
    letter-spacing: 0.05em;
    font-size: 60px;
    padding: 5px 0;
  }

  #clock .date {
    letter-spacing: 0.1em;
    font-size: 24px;
    padding-top: 20px;
  }

  #clock .text {
    letter-spacing: 0.1em;
    font-size: 12px;
    padding: 20px 0 20px;
  }
</style>
