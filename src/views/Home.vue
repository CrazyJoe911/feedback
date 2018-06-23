<template>
  <div class="home">
    <div class='header'>Exchange Square</div>
    <div class='content'>
      <div class='building-overview'>
        <BuildingInfo :activeFloorIndex="getActiveFloorIndex" :floorsData="activeFloorData" :getActiveTenant="getActiveTenant" />
      </div>
      <div class='feedbacklist-overview'>
        <FeedbackList v-for="floor in activeFloorData" :floorData="floor"
          :key="floor.floorNumber"
          :activeTenant="activeTenant"
        />
      </div>
    </div>
    <div class='charts'>
      <BarBrush class='chart'/>
      <Pie class='chart'/>
      <LineStack class='chart'/>
    </div>
  </div>
</template>
<script>
import BuildingInfo from './BuildingInfo'
import FeedbackList from './FeedbackList'
import BarBrush from '../components/BarBrush'
import Pie from '../components/Pie'
import LineStack from '../components/LineStack'
import * as mailsRequest from '../request/mails'

export default {
  name: 'Home',
  components: {
    BuildingInfo,
    FeedbackList,
    BarBrush,
    Pie,
    LineStack
  },
  data () {
    return {
      activeFloorIndex: -1,
      activeTenant: [],
      buildingData: []
    }
  },
  computed: {
    activeFloorData () {
      if (this.activeFloorIndex === -1) {
        return this.buildingData
      } else {
        for (let i = 0; i < this.buildingData.length; i++) {
          if (parseInt(this.buildingData[i].floorNumber) === this.activeFloorIndex) {
            return [this.buildingData[i]]
          }
        }
      }
    }
  },
  methods: {
    getActiveFloorIndex (index) {
      this.activeFloorIndex = index
    },
    getActiveTenant (tenant) {
      this.activeTenant = [tenant.name]
    }
  },
  async mounted () {
    const result = await mailsRequest.getParsedMessages()
    const formatData = []

    for(let floor in result) {
      const floorInfo = result[floor]
      const tenants = []
      for (let tenant in floorInfo) {
        tenants.push({
          tenantNumber: tenant,
          ...floorInfo[tenant]
        })
      }
      formatData.push({
        name: floor,
        floorNumber: floor,
        tenants
      })
    }

    console.log(formatData)
    this.buildingData = formatData.reverse()
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
    overflow-y: auto;
    border: 1px solid #C2C2C2;
  }
  .feedbacklist-overview {
    overflow: auto;
    padding-left: 20px;

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
  .charts {
    height: 200px;
    display: flex;
    .chart {
      flex: 1;
      margin: 10px;
      box-sizing: border-box;
    }
  }
}
</style>
