<template>
    <div>
        MissionList
    </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {

    }
  },
  mounted: async function() {
    // let res = await this.$service.user.GetFollowers.call(this, this.id, {
    //   page: 1,
    //   size: 10,
    //   user_id: this.id
    // })
  }
}
</script>

<style lang="less" scoped>

</style>
