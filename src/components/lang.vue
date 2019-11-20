<template lang="pug">
</template>

<script>
  import $store from "../components/store.js";

  export default {
    name: 'Lang',
    data: function(){
      return {
        lang:window.config.activeLang
      }
    },
    computed:{
      $lang(){
        var data = $store.getters['langstore'];
				return data == undefined ? {} : data;		
      }
    },
    methods:{
      $code(block){
        return $store.getters['lang'];
      },
      $change(code){
        localStorage.setItem('lang', code);
        localStorage.removeItem('categories');
        let currentUrl = window.location.pathname;
        if (code != window.config.langDefault) {

          var langCode = currentUrl.split('/')[1];
          if (langCode == 'ua' || langCode == 'ru' || langCode == 'en') {
            currentUrl = currentUrl.replace('/' + langCode + '/', '/'+code+'/');
          } else {
            currentUrl = '/' + code + currentUrl;
          }
        } else {
          currentUrl = currentUrl.replace('/en/', '/'); //old ua
          currentUrl = currentUrl.replace('/ru/', '/');
        }
        window.location.replace(currentUrl);
      }
    },
    watch: {
      
    }
  }
</script>
<style></style>
