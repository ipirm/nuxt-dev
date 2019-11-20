<template lang="pug">
	transition(name="fade" mode="out-in")
		.box
			block-header
			block-stores
			block-footer
			block-login-modal
</template>

<script>
	import Lang from '../components/lang.vue';
	import BlockHeader from '../blocks/includes/header/header.vue';
	import BlockFooter from '../blocks/includes/footer/footer.vue';
	import BlockStores from '../blocks/stores/stores.vue';

	import BlockLoginModal from '../blocks/includes/login/login.vue';

	import $store from '../components/store';
	import $api from '../components/api';

	export default {
		name: 'Stores',
		metaInfo: function() {
			let th = this;

			return {
				title: this.$lang.header.menu.store + this.$lang.meta.base_title,
				meta: [
					{ vmid: 'description', name: 'description', content: this.$lang.header.menu.store + th.$lang.meta.base_description },
					{ vmid: 'og:description', name: 'og:description', content: this.$lang.header.menu.store + th.$lang.meta.base_description },
					{ vmid: 'og:title', name: 'og:title', content: th.$lang.header.menu.store + th.$lang.meta.base_title }
				]
			}
		},
		mixins: [Lang],
		data: function(){
			return {
				data:{}
			}
		},
		components: {
			'block-header': BlockHeader,
			'block-footer': BlockFooter,
			'block-stores': BlockStores,
			'block-login-modal': BlockLoginModal,
			'lang': Lang
		}
	}
</script>

<style lang="scss" scoped>
</style>