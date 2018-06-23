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

  </div>
</template>
<script>
import BuildingInfo from './BuildingInfo'
import FeedbackList from './FeedbackList'
import * as mailsRequest from '../request/mails'

export default {
  name: 'Home',
  components: {
    BuildingInfo,
    FeedbackList
  },
  data () {
    return {
      activeFloorIndex: -1,
      activeTenant: [],
      buildingData: [{
        floorNumber: '3F',
        tenants: [{
          name: 'pacific coffee',
          icon: 'logo301',
          faceScores: 3,
          persons: [{
            name: 'Jim',
            icon: 'logo301',
            scores: 5,
            sentTime: '2016-10-1',
            read: false,
            message: 'sljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjald'
          }, {
            name: 'Kitty',
            scores: 3.3,
            message: 'lasjdlajdlajda'
          }]}, {
          name: 'pacific coffee2',
          icon: 'logo302',
          faceScores: 3.4,

          persons: [{
            name: 'Jim',
            icon: 'logo302',
            scores: 1.2,
            sentTime: '2016-10-1',
            message: 'sljadlkajdljaldjald'
          }, {
            name: 'Kitty',
            scores: 2.3,
            message: 'lasjdlajdlajda',
            sentTime: '2016-10-1'
          }]}, {
          name: 'pacific coffee3',
          icon: 'logo303',
          persons: [{
            name: 'Jim',
            icon: 'logo303',
            scores: 2.3,
            sentTime: '2016-10-1',
            message: 'sljadlkajdljaldjald'
          }, {
            name: 'Kitty',
            scores: 2.3,
            message: 'lasjdlajdlajda'
          }]
        }, {
          name: 'pacific coffee4',
          icon: 'logo304',
          persons: [{
            name: 'Jim',
            icon: 'logo304',
            scores: 4.5,
            sentTime: '2016-10-1',
            message: 'sljadlkajdljaldjald'
          }, {
            name: 'Kitty',
            scores: 3.5,
            icon: 'logo304',
            message: 'lasjdlajdlajda'
          }]
        }]},
      {
        floorNumber: '2F',
        tenants: [{
          name: '201',
          icon: 'logo201',
          faceScores: 3,
          persons: [{
            name: 'Jim',
            icon: 'logo301',
            scores: 5,
            sentTime: '2016-10-1',
            message: 'sljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjald'
          }, {
            name: 'Kitty',
            scores: 3.3,
            message: 'lasjdlajdlajda'
          }]}, {
          name: '202',
          icon: 'logo202',
          persons: [{
            name: 'Jim',
            icon: 'logo302',
            scores: 1.2,
            sentTime: '2016-10-1',
            message: 'sljadlkajdljaldjald'
          }, {
            name: 'Kitty',
            scores: 2.3,
            message: 'lasjdlajdlajda',
            sentTime: '2016-10-1'
          }]}, {
          name: 'pacific coffee4',
          icon: 'logo204',
          persons: [{
            name: 'Jim',
            icon: 'logo204',
            scores: 4.5,
            sentTime: '2016-10-1',
            message: 'sljadlkajdljaldjald'
          }, {
            name: 'Kitty',
            scores: 3.5,
            icon: 'logo204',
            message: 'lasjdlajdlajda'
          }]
        }]}, {
        floorNumber: '1F',
        tenants: [{
          name: '101',
          icon: 'logo101',
          faceScores: 1,
          persons: [{
            name: 'Jim',
            icon: 'logo101',
            scores: 5,
            sentTime: '2016-10-1',
            message: 'sljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjaldsljadlkaj dljaldjald'
          }, {
            name: 'Kitty',
            scores: 3.3,
            message: 'lasjdlajdlajda'
          }]}, {
          name: '102',
          icon: 'logo102',
          faceScores: 2,
          persons: [{
            name: 'Jim',
            icon: 'logo302',
            scores: 1.2,
            sentTime: '2016-10-1',
            message: 'sljadlkajdljaldjald'
          }, {
            name: 'Kitty',
            scores: 2.3,
            message: 'lasjdlajdlajda',
            sentTime: '2016-10-1'
          }]}, {
          name: '103',
          icon: 'logo103',
          faceScores: 2,
          persons: [{
            name: 'Jim',
            icon: 'logo303',
            scores: 2.3,
            sentTime: '2016-10-1',
            message: 'sljadlkajdljaldjald'
          }, {
            name: 'Kitty',
            scores: 2.3,
            message: 'lasjdlajdlajda'
          }]
        }]}
      ]
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
    console.log(result)
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
