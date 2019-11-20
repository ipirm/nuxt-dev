<template lang="pug">
  
     .img_container(v-if="$parent.$data.popupImageIsVisible" @click.self="hidePopup" class="popup_hide_area")
        .img_content(@click.self="hidePopup" class="popup_hide_area")
            img(:src="src")
  
</template>

<script>

  export default {
    name: 'PopupImage',
    props: {
      src: String,
    //   isVisible: Boolean
    },
    // data: function() {
    //     return {
    //         isVisibleLocal: this.isVisible
    //     }
    // },
    methods: {
        hidePopup() {
            this.$parent.$data.popupImageIsVisible = false;
            document.body.style.overflow = "auto";
        },
    }
  }
</script>

<style>
.scroll_stop {
    overflow: hidden;
}
</style>


<style lang="scss" scoped>
.img_container{
  position: fixed;
  overflow-y: scroll;
  left: 0;
  top: 0;
  width: 100vw;
  height: 140vh;
  background-color: rgba(0, 0, 0, 0.6);
  text-align: center;
  z-index: 1000;
  .img_content {
      padding: 40px 0;
      min-height: 150%;
  }
  img {
    width: 50%;
  }
}

@media(max-width: 768px) {
    .img_container{
    position: fixed;
    overflow-y: hidden;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
        .img_content {
            padding: 0;
            height: 100%;
            min-height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        img {
            width: 60%;
        }
    }
}
</style>



