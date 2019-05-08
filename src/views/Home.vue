<template>
  <div class="home">
    <Topbar />
    <Banner />
    <Page1 />
  </div>
</template>

<script>
// @ is an alias to /src
import Topbar from '@/components/HomePage/TopBar.vue'
import Banner from '@/components/HomePage/Banner.vue'
import Page1 from '@/components/HomePage/DisplayPage1.vue'

export default {
  name: 'topbar',
  components: {
    Topbar, Banner, Page1
  }
}
</script>

<style lang="less" scoped>

.home {
  overflow: hidden;
  min-width: 655px;
}

</style>
