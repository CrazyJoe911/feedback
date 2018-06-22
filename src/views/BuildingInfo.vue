<template>
  <div class='building-info'>
    <p @click="showAll">ShowALL</p>
    <div class='imgs'>
      <transition-group name="fade" tag='div'>
        <div v-for="(floor, index) in floorsInfo"
          v-show="choosedIndex === -1 || choosedIndex === floor"
          :class="[`floor${floor}`, imgAnimationCls(floor)]"
          :style="getStyle(index, floor)" :key="index + 'floors'" 
          @click="chooseImg(floor)"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BuildingInfo',
  props: {
    activeFloor: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return ({
      floorsInfo: [3,2,1],
      choosedIndex: -1
    })
  },
  methods: {
    getStyle (index, floor) {
      const calcIndex = index
      return {
        zIndex: floor,
        marginTop: calcIndex * 100 + 'px'
      }
    },
    chooseImg (index) {
      console.log(index)
      this.choosedIndex = index
      this.activeFloor(this.choosedIndex + 'F')
    },
    getImgUrl(floor) {
      return 
    },
    imgAnimationCls(floor) {
      let cls = ''
      if (this.choosedIndex !== -1) {
        cls = this.choosedIndex === floor ? 'choosed' : this.choosedIndex < floor ? 'fadeOutDown' : 'fadeOutUp'
      }
      return cls 
    },
    showAll() {
      this.choosedIndex = -1
    }
  },
  computed: {
    
  },
  mounted () {
  }
}
</script>

<style lang="scss">
.building-info {
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .imgs {
    height: 100%;
    position: relative;
    width: 100%;
    .floor {
      left: 0;
      position: absolute;
      height: 300px;
      width: 100%;
      transition: all 1s;
    }
    .floor1 {
      @extend .floor;
      background: url('../assets/F3.svg') no-repeat no-repeat center;
    }
    .floor2 {
      @extend .floor;
      background: url('../assets/F3.svg') no-repeat no-repeat center;
    }
    .floor3 {
      @extend .floor;
      background: url('../assets/F3.svg') no-repeat no-repeat center;
    }
    .floor4 {
      @extend .floor;
      background: url('../assets/F3.svg') no-repeat no-repeat center;
      
    }
    .floor:hover {
      z-index: 100 !important;
      transform: scale(1.1);
    }
    .choosed {
      height: 500px;
      margin-top: 50px !important;
      &:hover {
        transform: scale(1.0) !important;
      }
    }
    .fade-enter-active, .fade-leave-active {
      transition: all 1s;
    }
    .fade-enter, .fade-leave-to{
      opacity: 0;
      transform: translateX(30px);
    }
  }
}
</style>
