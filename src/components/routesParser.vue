<template lang="pug">
    span
      checkout(v-if="$route.params.category == 'checkout'")
      product(v-if="checkProduct($route.params.deep) && $route.params.category != 'checkout'")
      category(v-if="!checkProduct($route.params.deep) && $route.params.category != 'checkout'")
</template>

<script>
  import Category from "../pages/category.vue";
  import Product from '../pages/product.vue';
  import Checkout from '../pages/checkout.vue';

  export default {
    name: 'Parser',
    data: function(){
      return {
        langCode: window.config.langDefault,
      }
    },
		components: {
            'category':Category,
            'product':Product,
            'checkout':Checkout
		},
    methods:{
      checkProduct:function(id){
        return /[0-9]/.test(id);
      },
      changeLang:function(code){
        /*let _path = (code != window.config.langDefault ? '/'+code : '')+'/'+(this.$route.name ? this.$route.name+'/' : '');
        this.$router.push({ path: _path });
        localStorage.langCode = this.langCode = code;*/
      }
    },
    mounted() {

    }
  }
</script>