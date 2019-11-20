<template lang="pug">
	transition(name="fade" mode="out-in")
		.box
			block-header
			.product.page
				tip.product__tip
				.product__scope
					product-preloader(:visible='preloader')
					product-head(:product="product" :colors="colors")
					main-popular.popular-box(:info='popular.info', :products='products', :more='false', :isProduct='true' v-if="products.length>1")
				block-subscribe
				block-footer(v-bind:noPadding="true")
				block-login-modal
</template>

<script>
	import Lang from '../components/lang.vue';

	import BlockHeader from '../blocks/includes/header/header.vue';
	import Tip from '../blocks/category/tip/tip.vue';
	import Head from '../blocks/product/head/head.vue';
	import Aside from '../blocks/category/aside/aside.vue';
	import Products from '../blocks/category/products/products.vue';
	import MainPopular from '../blocks/main/popular/popular.vue';
	import BlockFooter from '../blocks/includes/footer/footer.vue';
	import Preloader from '../blocks/product/preloader/preloader.vue';
	import BlockLoginModal from '../blocks/includes/login/login.vue';
	import BlockSubscribe from '../blocks/main/subscribe/subscribe.vue';

	import $api from '../components/api.js';
	import $store from '../components/store';

	//import axios from 'axios';

	export default {
		name: 'Product',
		metaInfo: function() {
			let th = this;

			return {
				title: this.title,
				meta: [
					{ vmid: 'description', name: 'description', content: th.description + th.$lang.meta.base_description },
					{ vmid: 'og:description', name: 'og:description', content: th.description + th.$lang.meta.base_description },
					{ vmid: 'og:title', name: 'og:title', content: th.title }
				]
			}
		},
		data: function(){
			return {
				data:{},
				limitLikeProducts: 16,
				popular:{
					info: {
						title:'You may also like',
						description:'Discover stories that have inspired us'
					}
				},
				product:{},
				products:[],
				collection:'',
				preloader:true,
				windowWidth: 1201,
				colors: [],
				title: '',
				description: ''
			}
		},
		components: {
			'block-header': BlockHeader,
			'product-head': Head,
			'tip': Tip,
			'category-aside': Aside,
			'category-products': Products,
			'main-popular': MainPopular,
			'block-footer': BlockFooter,
			'lang': Lang,
			'product-preloader':Preloader,
			'block-login-modal': BlockLoginModal,
			'block-subscribe': BlockSubscribe
		},
		created () {
			// this.fetchData();
		},
		mounted() {
			this.getProduct();
			window.addEventListener('resize', this.resizeHandler);
			this.resizeHandler();
		},
		computed:{
			productCollection() {
				var data = this.$route.params.deep in $store.state.products.data ? $store.state.products.data[this.$route.params.deep].attribute_groups[0].attribute : '';
				let attrs = '';
				data ? data.forEach(e => {
					attrs = (e.attribute_id == 14) ? e.text : '';
				}) : false;

				return attrs;
			}
		},
		methods: {
			resizeHandler() {
				var w = window.innerWidth;
				this.windowWidth = w;
			},
		async	getLikeProducts(product, category, collection) {
				let $this = this;

			await $api.getProductsLike(category, function(data){

					$this.preloader = false;

					var limit = $this.limitLikeProducts;
					$this.products = [];
					let hashProducts = [];

					for (var i = 0; i < limit; i++) {
						let e = data[i];

						if (e == undefined) {
							break;
						}

						let c = false;
						if (e.attribute_groups) {
							e.attribute_groups[0].attribute.forEach(e => {
								(e.attribute_id == "14" && collection == e.text) ? c = true : '';
							});
						}

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

						if (c && e.product_id != product) {
							hashProducts.push({
								name:e.name,
								manufacturer:e.manufacturer,
								image:e.image,
								image_thumb: e.image_thumb,
								image_main: e.image_main,
								price:e.price,
								seo_url:e.seo_url.replace($store.getters['getLangCode'].code+'-', '')+'-'+e.product_id,
								product_id: e.product_id,
							});
						} else {
							limit++;
						}
					}

					if (hashProducts.length < 4) {
						$api.getNewIn(function(resp) {
							for (var i = 0; i < 5; i++) {


								let obj = hashProducts.find(function(item) {
									return item.product_id === resp[i].product_id;
								});

								if (!obj) {
									hashProducts.push(resp[i]);
								}
							}
							$this.products = hashProducts;
						});
					} else {
						$this.products = hashProducts;
					}
				});
			},
			getProduct(){

				// this.preloader = true;

				let $this = this;
				let product_id = this.$route.params.deep.split('-');
				product_id = product_id[product_id.length-1];

				$api.getProduct(product_id, function(data){
					let collection = 0;
					data.attribute_groups.length ? data.attribute_groups[0].attribute.forEach(e => {
						(e.attribute_id == "14") ? collection = e.text : '';
					}) : false;

					if(data.image) {
						if (data.image.indexOf('.tiff') > 0 || (data.image.indexOf('.jpeg') < 0 && data.image.indexOf('.png') < 0)) {
							data.image = "https://api.villa.ua/image/cache/no_image-600x600.png";
							data.image_thumb = data.image;
							data.image_main = data.image;
						} else {

							if (data.image.indexOf('.jpeg') > -1) {
								data.image_thumb = data.image.replace('.jpeg', '_486.jpeg');
								data.image_main = data.image.replace('.jpeg', '_1378.jpeg');
							} else if (data.image.indexOf('.png') > -1) {
								data.image_thumb = data.image.replace('.png', '_486.png');
								data.image_main = data.image.replace('.png', '_1378.png');
							} else {
								data.image_thumb = data.image;
								data.image_main = data.image;
							}


						}
					} else {
						data.image = "https://api.villa.ua/image/cache/no_image-600x600.png";
						data.image_thumb = data.image;
						data.image_main = data.image;
					}

					if(data.images && data.images.length) {
						data.images_main = [];
						data.images_thumb = [];
						data.images.forEach(function(a) {
							if (a.indexOf('.tiff') > 0 || (a.indexOf('.jpeg') < 0 && a.indexOf('.png') < 0)) {
								a = "https://api.villa.ua/image/cache/no_image-600x600.png";
								data.images_main.push(a);
								data.images_thumb.push(a);
							} else {

								if (a.indexOf('.jpeg') > -1) {
									data.images_main.push(a.replace('.jpeg', '_1378.jpeg'));
									data.images_thumb.push(a.replace('.jpeg', '_486.jpeg'));
								} else if (a.indexOf('.png') > -1) {
									data.images_main.push(a.replace('.png', '_1378.png'));
									data.images_thumb.push(a.replace('.png', '_486.png'));
								} else {
									data.images_main.push(a);
									data.images_thumb.push(a);
								}
							}
						});
					}

					$this.product = data;
					if (data.category[0] != undefined) {
						$this.getLikeProducts(data.product_id, data.category[0].id, collection);
					}

					$api.getRelated(product_id, function(data){
						let colors = [];
						data.forEach(function(item) {
							var el = item.attribute_groups[0].attribute.find(function(item) {
								return item.attribute_id == 13;
							});
							colors.push({
								name: (el.text).replace(" ", "_"),
								link: item.seo_url,
								id: item.product_id
							});
						});
						$this.colors = colors;
						$this.preloader = false;
					});

				});

				// this.setMeta();
			},
			setMeta() {
				this.title = this.product.name + ' ' + this.product.manufacturer + this.$lang.meta.product_title;
				this.description = this.product.name + ' ' + this.product.manufacturer;
			}
		},
		beforeDestroy() {
			window.removeEventListener('resize', this.resizeHandler);
		},
		mixins: [Lang],
		watch: {
			'$route' () {
				this.preloader = true;
				this.colors = [];
				this.getProduct();
				// this.setMeta();
			},
			product() {
				this.setMeta();
			}
		}
	}
</script>

<style lang="scss">
	@import '@/assets/sass/ui.scss';
		.wrapper {
			width: 100%;
			padding-left: 48px;
			padding-right: 48px;
			max-width: calc(1344px + 48px*2);
			margin: 0 auto;
			box-sizing: border-box;
		}
		.product {
			width: 100%;
			height:auto;
			padding-top: 136px;
			position: relative;

			&__scope {

			}

			&__box {
				height: auto;
				min-height: calc(100vh - (144px + 376px));
			}
			&__tip {
				margin-bottom: 0px !important;
			}

			&::after {
				content: '';
				display: block;
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 176px;
				z-index: -1;
				transform: translate3d(0,0,1px);
				background-color: #f3f3f3;
			}
		}

		.popular-box {
			padding-top: 72px !important;
			.label {
				margin-bottom: 40px !important;
			}
		}

		@media only screen and (max-width: 1200px) {
			.product {
				padding-top: 60px;

				&__tip {
					padding-top: 4px;
					padding-bottom: 3px;
				}

				.wrapper {
					padding-right: 40px;
					padding-left: 40px;
				}

				.popular {
					padding-top: 72px;

					// .card {
					// 	padding-left: 12px;
					// 	padding-right: 12px;

					// 	&__slider {
					// 		margin-bottom: 20px;
					// 		padding-bottom: 8px;

					// 		&::after {
					// 			padding-bottom: 122.5%;
					// 		}
					// 	}

					// 	&__brand {
					// 		margin-bottom: 6px;
					// 		font-size: 14px;
					// 		letter-spacing: .53px;
					// 	}

					// 	&__title {
					// 		margin-bottom: 14px;
					// 	}
					// }

					// .wrapper {
					// 	padding-left: 28px;
					// 	padding-right: 28px;
					// }
				}

				.slick-prev {
					left: 28px;
					top: 32.3%;
				}

				.slick-next {
					right: 28px;
					top: 32.3%;
				}

				&::after {
					height: 108px;
				}
			}
		}

		@media only screen and (max-width: 960px) {
			.product {

				&__tip {
					padding-top: 2px;
				}

				.popular {
					padding-top: 61px;

					&__h2 {
						margin-bottom: 9px;
					}

					&__label {
						letter-spacing: 0.05em;
						margin-bottom: 32px;
					}

					.wrapper {
						padding-left: 20px;
						padding-right: 20px;
					}

					.items {
						// font-size: 0;
						// letter-spacing: 0;
						// width: calc(100% + 24px);
						// margin-left: -12px;
						// text-align: left;
					}

					// .card {
					// 	width: 50%;
					// 	margin-bottom: 25px;

					// 	&__slider {
					// 		margin-bottom: 24px;

					// 		&::after {
					// 			padding-bottom: 118.2%;
					// 		}
					// 	}
					// }
				}
			}
		}

		@media only screen and (max-width: 650px) {
			.product {
				padding-top: 44px;

				.subscribe {
					margin-bottom: -741px;
				}

				.tip {
					width: 100%;
					padding-bottom: 0;
					padding-top: 0;

					a {
						font-size: 11px;
					}

					&__label {

						&::after {
							margin-left: 26px;
						}
					}
				}

				.item {
					width: 37px;
					height: 44px;
				}

				.popular {
					padding-top: 63px !important;

					.wrapper {
						padding-left: 12px;
						padding-right: 12px;
						// max-width: 440px;
					}

					.items {
						// width: calc(100% + 8px);
						// margin-left: -4px;
						// text-align: left;
					}

					// .card {
					// 	padding: 0 4px;
					// 	margin-left: 0;
					// 	margin-right: 0;
					// 	margin-bottom: 14px;

					// 	&__slider {
					// 		padding-bottom: 0;
					// 		margin-bottom: 17px;

					// 		&::after {
					// 			padding-bottom: 116.2%;
					// 		}
					// 	}

					// 	&__brand {
					// 		font-size: 13px;
					// 		margin-bottom: 7px;
					// 	}

					// 	&__title {
					// 		margin-bottom: 12px;
					// 	}
					// }
				}

				.info__wish-container {
					opacity: 1;
					pointer-events: all;
				}

				.head {
					padding-bottom: 40px;
				}
			}
		}
</style>
