<template lang="pug">
  
     .slider__pic(:style="{ backgroundImage:'url('+src+')'}" ref="imgEle")
      .image-zoom(@click="showPopupPhoto")
        img(src="@/assets/img/circle_search_bold-512.png")
   
     //-zoom-on-hover(:img-normal="src" :scale="2" :disabled="isDisabled") 
  
</template>

<script>
import ZoomOnHover from '@/components/ZoomOnHover.vue';
import PopupImage from '@/components/PopupImage.vue';

  export default {
    name: 'lazyImage',
    props: {
      src: String
    },
    data: () => ({
      isDisabled: false,
      popupImageIsVisible: false
    }),
    components: {
      ZoomOnHover,
      PopupImage
    },
    methods: {
      showPopupPhoto() {
        this.$parent.$parent.$parent.$data.isMainImagePopup = true;
        this.$parent.$parent.$parent.$data.popupImageIsVisible = true;
        this.popupImageIsVisible = true;
        document.body.style.overflow = "hidden";
      }
    },
    mounted(){
     if (document.body.clientWidth < 960) {
      this.isDisabled = true;
     }
    },
    updated() {
      this.$refs.imgEle.src = this.src
    }
  }
</script>

<style lang="scss" scoped>
.image-zoom {
  position: absolute;
  right: 20px;
  bottom: 0px;
  width: 30px;
  cursor: pointer;

  img {
    width: 100%;
  }
}

@media(max-width: 765px) {
  .image-zoom {
    display: none;
  }
}
</style>



