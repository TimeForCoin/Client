<template>
  <div class="discover">
    <div class="background"></div>
    <MissionBlock />
  </div>
</template>

<script>
import MissionBlock from '@/components/Discover/MissionBlock.vue'

export default {
  name: 'discover',
  components: {
    MissionBlock
  }

}
</script>

<style lang="less" scoped>
.discover {
  background-color: white;

  .background {
    width: 100%;
    height: 40vh;
    background-image: url("../assets/HomePage/page1-background.jpg");
    background-size: cover;
    background-position: center;
  }
}
</style>
