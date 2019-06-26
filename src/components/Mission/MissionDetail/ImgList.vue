<template>
  <a-carousel arrows dotsClass="slick-dots slick-thumb">
    <a slot="customPaging" slot-scope="props">
      <img :src="getImgUrl(props.i)">
    </a>
    <div v-for="item in images" :key="item.id">
      <img :src="item.url">
    </div>
  </a-carousel>
</template>

<script>
export default {
  props: ['images'],
  data() {
    return {}
  },
  methods: {
    getImgUrl(i) {
      return this.images[i].url
    }
  }
}
</script>
<style lang="less">
.ant-carousel {
  .slick-dots {
    height: auto;
  }
}
.ant-carousel {
  .slick-slide img {
    border: 5px solid #fff;
    display: block;
    margin: auto;
    width: auto;
    height: 250px;
    max-width: 100%;
    max-height: 100%;
  }
}
.ant-carousel {
  .slick-thumb {
    bottom: -45px;
  }
}
.ant-carousel {
  .slick-thumb li {
    width: 60px;
    height: 45px;
  }
}
.ant-carousel {
  .slick-thumb li img {
    width: 100%;
    height: 100%;
    filter: grayscale(100%);
  }
}
.ant-carousel {
  .slick-thumb li.slick-active img {
    filter: grayscale(0%);
  }
}
.ant-carousel .slick-dots {
  position: static;
}
</style>
