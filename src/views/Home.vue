<template>
  <div class="home">
    <Topbar />
    <Banner />
  </div>
</template>

<script>
// @ is an alias to /src
import Topbar from '@/components/TopBar.vue'
import Banner from '@/components/Banner.vue'

export default {
  name: 'topbar',
  components: {
    Topbar, Banner
  }
}
</script>

<style lang="less" scoped>

.home {
  overflow: hidden;
  padding: 0 5%;
}

</style>
