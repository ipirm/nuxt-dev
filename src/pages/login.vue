<template lang="pug">
	transition(name="fade" mode="out-in")
		.box
			block-header
			block-login
			block-footer
			lang
</template>

<script>
	import Lang from '../components/lang.vue';

	import BlockHeader from '../blocks/includes/header/header.vue';
    import BlockFooter from '../blocks/includes/footer/footer.vue';
    import BlockLogin from '../blocks/login/login.vue';

	//import axios from 'axios';

	export default {
		name: 'login',
		metaInfo: function() {
			let th = this;

			return {
				title: this.$lang.header.login.label + this.$lang.meta.base_title,
				// meta: [
				// 	{ vmid: 'description', name: 'description', content: this.$lang.header.menu.store + th.$lang.meta.base_description }
				// ]
			}
		},
		data: function(){
			return {
				data:{}
			}
		},
		components: {
			'block-header': BlockHeader,
            'block-footer': BlockFooter,
            'block-login': BlockLogin,
			'lang': Lang
		},
		created () {
			this.fetchData();
		},
		methods: {
			fetchData () {
				/*axios.
				get('https://villa-es.myshopify.com/admin/products.json', { 
					headers: {
						'X-Shopify-Storefront-Access-Token':'cc62d212d5c89e4f49d585544b984fd3',
						'Access-Control-Allow-Origin': '*',
						'Content-Type': 'application/json'
					}
				}).
				then(response => {
					this.data = response.data.data;
				});*/
			}
		},
		mixins: [Lang],
		watch: {
			'$route' () {
				this.fetchData();
			}
		}
	}
</script>

<style lang="scss">
	@import '@/assets/sass/ui.scss';
</style>