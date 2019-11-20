<template lang="pug">
</template>

<script>
	import axios from 'axios';
	import $api from '../components/api.js';
	import $store from '../components/store';

	export default {
		name: 'SocialLogin',
		data: function(){
			return {
			}
		},
		components: {
		},
		methods:{
		},
		mounted() {
			localStorage.setItem('account_logged', '1');
			location.href = "/";
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
