<template>
  <div class='feedback-list'>
    <div class='floorNumber'>
      <span class='showAll' @click="resetActiveTenant">
        {{ floorData && floorData.floorNumber }}
      </span>
    </div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item v-for="tenant in floorData.tenants"
        :name="tenant.name"
        :key="tenant.name"
        v-show="showTenant(tenant)"
      >
        <div slot='title' class='tenant-title'>
          <span :class="['icon', `${tenant.icon}`]"></span>
          <span class='name'>{{tenant.name}}</span>
          <span :class="['face', getFaceIcon(tenant.faceScores || 5)]"></span>
        </div>
        <div :class="['person-info']" v-for="(person, index ) in tenant.persons"
          :key="person.name + index"
          @click="readMessage(person)"
        >
          <div class='profile'>
            <span :class="['avatar', `${person.icon}`]">
              <i v-if="person.read===false" class='unread'/>
            </span>
            <span class='name'>
                  <span class='sentby'>
                    {{person.name}}
                  </span>
            <i class='sentTime'>
                    {{formatDate(person.sentTime)}}
                  </i>
            </span>
            <span class='rate'>
                  <RatePanel :scores="person.scores"/>
                </span>
          </div>
          <div class='message'>
            <span class='bubble'>
                  <span class='small'></span>
            <span class='big'></span>
            </span>
            <span class='message-content'>{{ person.message }}</span>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import RatePanel from './RatePanel'
const moment = require('moment')

export default {
  name: 'FeedbackList',
  components: {
    RatePanel
  },
  props: {
    floorData: {
      type: Object,
      default: () =>{},
      required: true
    },
    activeTenant: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      activeNames: []
    }
  },
  methods: {
    changeRate (val, index) {
      this.persons.splice(index, 1, val)
    },
    handleChange (val) {
    },
    formatDate (date) {
      return moment(date).format('DD/MM/YY')
    },
    getFaceIcon (scores) {
      let clsName = 'laugh-face'
      if (scores < 2) {
        clsName = 'angry-face'
      } else if (scores < 3) {
        clsName = 'sad-face'
      } else if (scores < 4) {
        clsName = 'smile-face'
      } else if (scores < 5) {
        clsName = 'laugh-face'
      }
      return clsName
    },
    showTenant (tenant) {
      return this.activeNames.includes(tenant.name) || this.activeNames.length === 0
    },
    resetActiveTenant () {
      this.activeNames = []
    },
    readMessage (person) {
      person.read = true
    }
  },
  watch: {
    activeTenant () {
      this.activeNames = this.activeTenant
    }
  }
}
</script>

<style lang='scss'>
  @import '../styles/logos.scss';
  .feedback-list {
    margin-bottom: 20px;
    $logo-size: 45px;
    $face-size: 60px;

    .angry-face {
      background: url('../assets/emotion/1.svg') center center no-repeat
    }
    .sad-face {
      background: url('../assets/emotion/2.svg') center center no-repeat
    }
    .smile-face {
      background: url('../assets/emotion/3.svg') center center no-repeat
    }
    .laugh-face {
      background: url('../assets/emotion/4.svg') center center no-repeat
    }

    .floorNumber {
      text-align: left;
      span.showAll {
        padding: 0 10px;
        text-align: center;
        background: #1D7695;
        width: 120px;
        height: 40px;
        line-height: 40px;
        color: white;
        font-size: 22px;
        box-sizing: border-box;
        font-weight: bold;
        display: inline-block;
        cursor: pointer;
      }
    }
    .tenant-title {
      display: flex;
      align-items: center;
      span {
        display: inline-block;
      }
      .name {
        flex: 1;
        font-size: 17px;
        font-weight: bold;
        text-align: left;
        padding-left: 20px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }
      .face {
        height: $face-size;
        width: $face-size;
        background-color: #DFF1D8;
      }
    }

    .el-collapse-item__header {
      height: 60px;
      line-height: 60px;
      background: #DFF2F4;
      i::before {
        display: none;
      }
    }
    .el-collapse-item__content {
      background: #F4FEFE;
    }
    .unread {
      height: 10px;
      width: 10px;
      border-radius: 50%;
      display: inline-block;
      background: red;
      position: absolute;
      right: 0;
    }
    .person-info {
      cursor: pointer;
      .message {
        display: flex;
        .bubble {
          height: 60px;
          width: 60px;
          display: inline-block;
          position: relative;
          .circle {
            position: absolute;
            border-radius: 50%;
            background: #DFF2F4;
            display: inline-block;
          }
          .small {
            @extend .circle;
            height: 10px;
            width: 10px;
          }
          .big {
            @extend .circle;
            height: 20px;
            width: 20px;
            margin-top: 11px;
            margin-left: 5px;
          }
        }
        .message-content {
          padding: 5px;
          margin-top: 15px;
          border-radius: 7px;
          display: inline-block;
          flex: 1;
          background: #DFF2F4;
        }
      }
    }
    .person-info {
      $person-height: 50px;
      $avatar-size: 40px;
      .profile {
        height: $person-height;
        display: flex;
        line-height: $person-height;
        padding: 5px 0 5px 20px;
        align-items: center;
      }
      .avatar,
      .name,
      .rate {
        display: inline-block;
      }
      .avatar {
        position: relative;
        height: $avatar-size;
        width: $avatar-size;
      }
      .name {
        flex: 1;
        text-align: left;
        font-size: 16px;
        font-weight: bold;
        margin-left: 15px;
        .sentby,
        .sentTime {
          height: 20px;
          line-height: 20px;
          display: block;
        }
        .sentTime {
          font-weight: normal;
          font-size: 12px;
        }
      }
      .rate {
        width: 120px;
      }
    }
  }
</style>
