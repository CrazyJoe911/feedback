<template>
  <div class='feedback-list'>
   <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item v-for="tenant in tenants" :name="tenant.name" :key="tenant.name">
        <div slot='title' class='tenant-title'>
          <span :class="['icon', `${tenant.icon}`]"></span>
          <span class='name'>{{tenant.name}}</span>
          <span class='face'></span>
        </div>
        <div class='person-info' v-for="(person, index ) in tenant.persons" :key="person.name + index">
          <div class='profile'>
            <span class='avatar'></span>
            <span class='name'>{{person.name}}</span>
            <span class='rate'></span>
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
export default {
  name: 'FeedbackList',
  data () {
    return {
      activeNames: ['pacific coffee'],
      tenants: [{
        name: 'pacific coffee',
        icon: 'logo301',
        persons: [{
          name: 'Jim',
          icon: 'logo301',
          message: 'sljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjald'
        }, {
          name: 'Kitty',
          message: 'lasjdlajdlajda'
        }]
      }, {
        name: 'pacific coffee2',
        icon: 'logo302',
        persons: [{
          name: 'Jim',
          icon: 'logo301',
          message: 'sljadlkajdljaldjald'
        }, {
          name: 'Kitty',
          message: 'lasjdlajdlajda'
        }]
      }, {
        name: 'pacific coffee3',
        icon: 'logo303',
        persons: [{
          name: 'Jim',
          icon: 'logo301',
          message: 'sljadlkajdljaldjald'
        }, {
          name: 'Kitty',
          message: 'lasjdlajdlajda'
        }]
      }, {
        name: 'pacific coffee4',
        icon: 'logo304',
        persons: [{
          name: 'Jim',
          icon: 'logo301',
          message: 'sljadlkajdljaldjald'
        }, {
          name: 'Kitty',
          message: 'lasjdlajdlajda'
        }]
      }]
    }
  },
  methods: {
    changeRate (val, index) {
      this.persons.splice(index, 1, val)
    },
    handleChange(val) {
      console.log(val)
    }
  }
}
</script>

<style lang='scss'>
.feedback-list {
  $logo-size: 45px;
  $face-size: 60px;
  .tenant-title {
    display: flex;
    align-items: center;
    span {
      display: inline-block;
    }
    .logo {
      width: $logo-size;
      height: $logo-size;
      margin-left: 15px;
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
      background: #DFF1D8;
    }
  }
  .logo301 {
    @extend .logo;
    background: url('../assets/logo301.svg') no-repeat no-repeat center;
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
  .person-info {
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
        margin-top: 15px;
        border-radius: 7px;
        display: inline-block;
        flex: 1;      
        background: #DFF2F4;
      }
    }
  }
}

</style>
