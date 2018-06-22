<template>
  <div class="home">
    <div class='header'>Exchange Square</div>
    <div class='content'>
      <div class='building-overview'>
        <BuildingInfo :activeFloor="activeFloor"/>
      </div>
      <div class='feedbacklist-overview'>
        <div class='list-header'>
          <p class='title'>{{ title }}</p>
        </div>
        <FeedbackList/>
      </div>
    </div>

  </div>
</template>
<script>
import BuildingInfo from './BuildingInfo'
import FeedbackList from './FeedbackList'

export default {
  name: 'Home',
  components: {
    BuildingInfo,
    FeedbackList
  },
  data() {
    return {
      title: 'All Floors'
    }
  },
  computed: {
    
  },
  methods: {
    activeFloor(name = 'All Floors') {
      this.title = name
    }
  }
}
</script>

<style lang='scss'>
.home {
  height: 100%;
  .header {
    height: 40px;
    background: #1D7695;
    color: white;
    line-height: 40px;
    font-size: 24px;
    font-weight: bold;
  }
  .content {
    box-sizing: border-box;
    padding: 30px 20px;
    height: calc(100% - 40px);
    display: flex;
    .building-overview {
      flex: 3;
    }
    .feedbacklist-overview {
      flex: 2;
    }
  }
  .building-overview{
    overflow: auto;
    border: 1px solid #C2C2C2;
  }
  .feedbacklist-overview {
    overflow: auto;
    padding: 0 20px;

    p.title {
      margin: 0;
      height: 40px;
      text-align: left;
      background: #1D7695;
      line-height: 40px;
      font-size: 25px;
      color: white;
      text-align: center;
      font-weight: bold;
      width: 150px;
    }
  }
}
</style>
