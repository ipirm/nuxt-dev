<template lang="pug">
	.content(v-if="page.acf")
		.content__title(v-html="page.title.rendered")
		.content__content(v-html="page.acf.content")
</template>

<script>
	import Lang from '../../../components/lang.vue';
	
	export default {
		name: 'block-return',
		metaInfo: function() {
			let th = this;

			return {
				title: this.page.title ? this.getString(this.page.title.rendered) + this.$lang.meta.base_title : '',
				meta: [
					{ vmid: 'description', name: 'description', content: this.page.title ? this.getString(this.page.title.rendered) + th.$lang.meta.base_description : '' },
					{ vmid: 'og:description', name: 'og:description', content: this.page.title ? this.getString(this.page.title.rendered) + th.$lang.meta.base_description : '' },
					{ vmid: 'og:title', name: 'og:title', content: this.page.title ? this.getString(this.page.title.rendered) + this.$lang.meta.base_title : '' }
				]
			}
		},
		data: function(){
			return {
				
			}
		},
		methods: {
			getString(str) {
				return str.replace('&#8211;', '—');
			}
		},
		mixins: [Lang],
		props: {
			page: {
				type: Object,
				default: {title: {}},
				required: true
			}
		},
		mounted() {
			// $api.getToken();
			// $api.getCategories();
		},
		watch: {
			
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/kit.scss';
	.content {
		@include kit('text-template', 'dark');

		&__title {
			border-bottom: 1px solid rgba(#D6D6D6, .4);
			padding-bottom: 10px;
			// font: 32px/1 'Didot', Arial, Helvetica, sans-serif;
			@include kit('h2', 'dark');
		}

		&__content {
			max-width: 660px;
		}

		/deep/ ul {
			li {
				list-style-type: disc;
				list-style-position: inside;
			}
		}

		/deep/ a {
			transition: opacity .5s ease;

			&:hover {
				opacity: .7;
			}
		}

		/deep/ table {
			width: 100%;
			text-align: center;
			border-collapse: collapse;

			td,
			th {
				border: 1px solid #111;
				padding: 5px 60px;
			}
		}
	}

	@media only screen and (max-width: 960px) {
		.content {

			&__title {
				display: none;
			}
		}
	}
@media(max-width: 500px) {
		.content {

		/deep/ table {
			th, td {
				padding: 5px 30px;
			}
		}
	}
}
@media(max-width: 350px) {
		.content {

		/deep/ table {
			th, td {
				padding: 5px 20px;
			}
		}
	}
}
</style>
