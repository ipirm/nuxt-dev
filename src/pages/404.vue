<template lang="pug">
	transition(name="fade" mode="out-in")
		.box
			block-header
			error-404
			block-footer
			lang
		
</template>

<script>

	import Lang from '../components/lang.vue';

	import BlockHeader from '../blocks/includes/header/header.vue';
    import BlockFooter from '../blocks/includes/footer/footer.vue';
	import Page404 from '../blocks/404/404.vue';

	export default {
		metaInfo: function() {
			let th = this;

			return {
				title: '404' + this.$lang.meta.base_title,
				// meta: [
				// 	{ vmid: 'description', name: 'description', content: this.$lang.header.menu.store + th.$lang.meta.base_description }
				// ]
			}
		},
		name: 'PageNotFound',
		data: function(){
			return {
			}
		},
		mixins: [Lang],
		components: {
			'error-404': Page404,
			'block-header': BlockHeader,
            'block-footer': BlockFooter,
			'lang': Lang
		},
		methods:{

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	@import '@/helpers/sass/mixins.scss';
	@import '@/helpers/sass/kit.scss';
</style>
