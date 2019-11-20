<template lang="pug">
  div
    block-header
    div.main
    h1 Вторая страница
    h3(@click="test") {{ title }}
    lang
</template>

<script>
  import Lang from '../components/lang.vue';

  import BlockHeader from '../blocks/includes/header/header.vue';

  export default {
    name: 'CustomPage',
    props: {
      msg: String
    },
    data: function(){
      return {
        title: "click me pls"
      }
    },
    components: {
      'block-header': BlockHeader,
      'lang' : Lang
    },
    methods:{
      test:function(){
        this.title = "new message"
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
  color:red;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
