<template lang="pug">
	transition(name="fade" mode="out-in")
		.box
			block-header
			.main.page
				main-poster(
					:slider="main.slider"
				)
				main-categories
				main-about(
					v-if="main.landing_page"
					:list="main.landing_page"
				)
				main-popular(:products="products" :popular2="false")
				main-instagram(
					v-if="main.instagram_stories"
					:list="main.instagram_stories"
				)
				main-subscribe
				block-footer(v-bind:noPadding="true")
				block-login-modal
				lang
</template>

<script>
	import Lang from '../components/lang.vue';

	import BlockHeader from '../blocks/includes/header/header.vue';
	import MainPoster from '../blocks/main/poster/poster.vue';
	import MainCategories from '../blocks/main/categories/categories.vue';
	import MainAbout from '../blocks/main/about/about.vue';
	import MainPopular from '../blocks/main/popular/popular.vue';
	import MainInstagram  from '../blocks/main/instagram/instagram.vue';
	import MainSubscribe  from '../blocks/main/subscribe/subscribe.vue';
	import BlockFooter from '../blocks/includes/footer/footer.vue';
	import BlockLoginModal from '../blocks/includes/login/login.vue';

	import $store from '../components/store';
	import $api from '../components/api';
	import axios from 'axios';

	export default {
		name: 'Main',
		metaInfo: function() {
			let th = this;

			return {
				title: th.$lang.meta.home_title,
				meta: [
					{ vmid: 'description', name: 'description', content: th.$lang.meta.home_description },
					{ vmid: 'og:description', name: 'og:description', content: th.$lang.meta.home_description },
					{ vmid: 'og:title', name: 'og:title', content: th.$lang.meta.home_title }
				]
			}
		},
		data: function(){
			return {
				data:{},
				products:[]
			}
		},

		components: {
			'block-header': BlockHeader,
			'main-poster': MainPoster,
			'main-categories': MainCategories,
			'main-about': MainAbout,
			'main-popular': MainPopular,
			'main-instagram': MainInstagram,
			'main-subscribe': MainSubscribe,
			'block-footer': BlockFooter,
			'block-login-modal': BlockLoginModal,
			'lang': Lang
		},
		created () {
			this.fetchData();
		},
		methods: {
			getPopular() {
				let $this = this;

				$api.getPopular(function(data){

					let arr = [];

					if (data) {
						data.forEach(e => {

							if(e.image) {
								if (e.image.indexOf('.tiff') > 0 || (e.image.indexOf('.jpeg') < 0 && e.image.indexOf('.png') < 0)) {
									e.image = "https://api.villa.ua/image/cache/no_image-600x600.png";
									e.image_thumb = e.image;
									e.image_main = e.image;
								} else {

									if (e.image.indexOf('.jpeg') > -1) {
										e.image_thumb = e.image.replace('.jpeg', '_486.jpeg');
										e.image_main = e.image.replace('.jpeg', '_1378.jpeg');
									} else if (e.image.indexOf('.png') > -1) {
										e.image_thumb = e.image.replace('.png', '_486.png');
										e.image_main = e.image.replace('.png', '_1378.png');
									} else {
										e.image_thumb = e.image;
										e.image_main = e.image;
									}


								}
							} else {
								e.image = "https://api.villa.ua/image/cache/no_image-600x600.png";
								e.image_thumb = e.image;
								e.image_main = e.image;
							}

							arr.push({
								name:e.name,
								manufacturer:e.manufacturer,
								image:e.image,
								image_thumb: e.image_thumb,
								image_main: e.image_main,
								price:e.price,
								seo_category:e.seo_category,
								seo_url:e.seo_url.replace($store.getters['getLangCode'].code+'-', '')+'-'+e.product_id,
								attribute_groups: e.attribute_groups,
								product_id: e.product_id
							});

						});

						$this.products = arr;
					}
				});
			},
			fetchData () {
				$api.main.get();
			}
		},
		mounted(){
			this.getPopular();
		},
		computed: {
			main() {
				return $store.state.main;
			}
		},
		mixins: [Lang],
		watch: {
			'$route' () {
				this.fetchData();
				this.$nextTick(function() {
					this.$refs.slick.reSlick();
				});
			}
		}
	}
</script>

<style lang="scss">
	@import '@/assets/sass/ui.scss';

	@media only screen and (max-width: 650px) {
		.main {

			.popular {


			}

			.footer {

				&__column {
					// padding-top: 40px;
					padding-left: 3px;
				}

				&__content {
					margin-top: 0;
				}
			}
		}
	}

	@media only screen and (max-width: 360px) {
		.main {

			.popular {


			}
		}
	}
</style>
