<template>
  <div class="home">
    <Banner />
    <Page1 />
  </div>
</template>

<script>
// @ is an alias to /src
import Banner from '@/components/HomePage/Banner.vue'
import Page1 from '@/components/HomePage/DisplayPage1.vue'

export default {
  name: 'topbar',
  components: {
    Banner, Page1
  }
}
</script>

<style lang="less" scoped>

.home {
  overflow: hidden;
  background: white;
  min-width: 655px;
}

</style>
