<template lang="pug">

	.card
		button.add-to-wishlst(:class="[checkWishList(info.seo_url) ? 'add-to-wishlst_active' : '']", @click="toggleWishlist(info)")
		.card__slider
			slick.slider(ref="slick", :options="slickOptions" v-if="slider")
				.slider__image
					router-link(:to="getUrl(info.seo_url)")
						img(:src="info.image")

			.slider.slider_for-image(v-else)
				.slider__image
					router-link(:to="getUrl(info.seo_url)")
						img(:src="info.image_thumb")

		router-link(:to="getUrl(info.seo_url)")
			.card__brand
				router-link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'brand/' + info.manufacturer_id") {{ info.manufacturer }}
			.card__title {{ info.name }}
			.card__price {{ info.price }} {{ $lang.product.uah }}
			.card__price.card__price_old(v-if="getOldPrice(info)") {{ getOldPrice(info) }} {{ $lang.product.uah }}
			//zoom-on-hover(:img-normal="info.image_thumb")
	//- .card
	//- 	button.add-to-wishlst(:class="[wishlist ? 'add-to-wishlst_active' : '']", @click="wishlist = !wishlist")
	//- 	.card__slider
	//- 		slick.slider(ref="slick", :options="slickOptions")
	//- 			.slider__image
	//- 				router-link(:to="getUrl(info.seo_url)")
	//- 					img(:src="info.image")
	//- 			template(v-if="slider")
	//- 				.slider__image(v-for="img in info.images")
	//- 					router-link(to="/product/")
	//- 						img(:src="img")
	//- 	router-link(:to="getUrl(info.seo_url)")
	//- 		.card__brand {{ info.manufacturer }}
	//- 		.card__title {{ info.name }}
	//- 		.card__price {{ info.price }} ГРН
</template>

<script>
	import Vue from 'vue';
	import Lang from '../../../components/lang.vue';
	import Slick from 'vue-slick';
	import $store from '../../../components/store';
	import $api from '../../../components/api';
	import ZoomOnHover from '@/components/ZoomOnHover.vue';

	export default {
		name: 'product',
		data: function(){
			return {
				slickOptions: {
					infinite:false,
					slidesToShow: 1,
					arrows: true,
					dots: false,
				},
				wishlistLocal:[],
				loginModalTitle: {
					ua: 'Додати товар у список побажань',
					en: 'Add item to wish list',
					ru: 'Добавить товар в список желаний'
				},
				loginModalSubtitle: {
					ua: 'Увійдіть або зареєструйтеся, щоб додати товари до свого списку побажань',
					en: 'Login or register to add products to your wish list',
					ru: 'Войдите или зарегистрируйтесь, чтобы добавить продукты в список желаний'
				},
				langDefault: window.config.langDefault
			}
		},
		props: {
		    popular2:{
		      type: Boolean,
              default: false
            },
			info:{
				type:Object,
				default:function(){
					return {
						id:0,
						image:'',
						image_thumb: '',
						image_main: '',
						images:[],
						manufacturer:'',
                        seo_category:'dadaadaada',
						name:'',
						price:0,
						product_id: 0
					}
				}
			},
			slider:{
				type:Boolean,
				default:false
			}
		},
		computed: {
			imagesCount() {
				return Number(this.info.images.length);
			},
			view () {
				return $store.state.products.view;
			},
			wishlist() {
				var data = $store.state.wishlist.data;
				return data == undefined ? {} : data;
			}
		},
		components: {
			Slick,
			ZoomOnHover
		},
		mixins: [Lang],
		watch: {
			'$route' () {

			},
			view () {
				if (this.$refs.slick && this.$refs.slick.$el.classList.contains('slick-initialized')) {
					this.$refs.slick.reSlick();
				}
			}
		},
		methods: {
			getOldPrice(product) {
				if (product.attribute_groups == undefined || !product.attribute_groups.length) return false;
				var el = product.attribute_groups[0].attribute.find(function(item) {
					return item.name === 'Старая цена';
				});

				if (el) {
					return el.text > product.price ? el.text : false;
				}

				return false;
			},
			getUrl(id) {
			    if(this.popular2){
			        return id
                }else{
                    if(this.info.seo_category[1].name.split(' ').length >= 2) {
                        return '/' + ($store.getters['getLangCode'].code === this.langDefault ? '' : $store.getters['getLangCode'].code + "/") + this.$route.params.category + "/" + this.info.seo_category[1].name.toLowerCase().split(' ').join('') + "/" + id;
                    } else {
                        return '/' + ($store.getters['getLangCode'].code === this.langDefault ? '' : $store.getters['getLangCode'].code + "/") + this.$route.params.category + "/" + this.info.seo_category[1].name.toLowerCase().split(' ').join('-') +  "/" + id;
                    }
                }
			},
			toggleWishlist(product){
				let $this = this;

				let id = product.product_id;
				let seo_url = product.seo_url;

				if ($store.state.account.logged) {

					if (this.checkWishList(seo_url)) {
						$api.wishlist.delete(id, seo_url);
						Vue.notify({
							group: 'notify',
							type: 'wishlist',
							title: product.name,
							text: $this.$lang.notifications.removed_from_wishlist,
							//duration: 100000,
						});
					} else {
						$api.wishlist.add(id, seo_url);

						Vue.notify({
							group: 'notify',
							type: 'wishlist',
							title: product.name,
							text: $this.$lang.notifications.added_to_wishlist,
							//duration: 100000,
						});
					}

				} else {
					$store.commit('setLoginModalTitle', $this.loginModalTitle[$store.state.lang.code]);
					$store.commit('setLoginModalSubtitle', $this.loginModalSubtitle[$store.state.lang.code]);
					$store.commit('setLoginModalActive', true);
				}
			},
			checkWishList(seo_url){
				return (seo_url in this.wishlist) ? true : false;
			}
		},
		mounted(){
			// this.wishlistLocal[this.info.id] = ('product'+this.info.id in this.wishlist);
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/mixins.scss';
	@import '@/helpers/sass/kit.scss';

	.card {
		padding-left: 5px;
		padding-right: 5px;
		position: relative;
		overflow: hidden;
		display: inline-block;
		vertical-align: top;
		width: relative-calc(1344, 328);
		height: auto;
		text-align: center;
		margin-bottom: 19px;
		transition: all 0.3s ease;

		&__image {
			background-color: #F3F3F3;
			background-size: 70% auto;
			background-position: center;
			background-repeat: no-repeat;
			width: 100%;
			@include proportional(328, 410);
			margin-bottom: 14px;
			backface-visibility: hidden;
		}

		&__slider {
			width: 100%;
			@include proportional(328, 410);
			margin-bottom: 15px;
			position: relative;
			overflow: hidden;
			backface-visibility: hidden;
		}

		&__brand {
			@include kit('h6 700', 'dark');
			margin-bottom: 6px;

			/deep/ a {
				transition: opacity .5s ease;

				&:hover {
					opacity: .7;
				}
			}
		}
		&__title {
			@include kit('h6 100', 'dark');
			text-transform: none;
			margin-bottom: 12px;
			line-height: 1.4;
		}
		&__price {
			@include kit('h6 300', 'dark');
			margin-bottom: 14px;

			&_old {
				opacity: .4;
				display: inline-block;
				position: relative;
				text-decoration: line-through;
				top: -12px;
				margin-bottom: 0;
			}
		}

		&:hover {
			opacity: 0.8;
			.add-to-wishlst {
				opacity: 1;
			}
		}
	}

	.add-to-wishlst {
		width: 32px;
		height: 32px;
		position: absolute;
		top:8px;
		right:8px;
		border-radius: 50%;
		z-index: 10;
		transition: all 0.3s ease;
		opacity: 0;

		&:before {
			content: "";
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(#D6D6D6, 0.1) url(../../../assets/img/icon-star.svg) no-repeat;
			background-size: 15px auto;
			background-position:center;
			opacity: 1;
			transition: opacity .3s ease;
			border-radius: 50%;
		}

		&:after {
			content: "";
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(#D6D6D6, 0.1) url(../../../assets/img/icon-star-fill.svg) no-repeat;
			background-size: 15px auto;
			background-position:center;
			opacity: 0;
			transition: opacity .3s ease;
		}

		&_active {
			opacity: 1;

			&:after {
				opacity: 1;
			}

			&:before {
				opacity: 0;
			}
		}
	}

	.items {
		margin-bottom: 14px;
	}

	.slider {
		&__image {
			background-color: #F3F3F3;
			background-size: 70% auto;
			background-position: center;
			background-repeat: no-repeat;
			width: 100%;
			height: 100%;

			a {
				width: inherit;
				height: inherit;
				display: inline-block;
				text-align: center;
				@include vertical-align-middle;
			}

			img {
				max-width: 70%;
				max-height: 70%;
				display: inline-block;
				vertical-align: middle;
				margin: auto;
				mix-blend-mode: multiply;
			}
		}

		&_for-image {
			position: absolute;
			height: 100%;
			width: 100%;
			top: 0;
			left: 0;
		}
	}

	/deep/ .slick-prev {
		left:0px;
		background:transparent url(../../../assets/img/icon-arrow-left.svg) no-repeat;
		background-size: 6px auto;
		background-position: 15px center;
	}
	/deep/ .slick-next {
		right:0px;
		background:transparent url(../../../assets/img/icon-arrow-right.svg) no-repeat;
		background-size: 6px auto;
		background-position: 18px center;
	}
	/deep/ .slick-arrow {
		position: absolute;
		top:relative-calc(322, 141);
		width: 40px;
		height: 40px;
		border-radius: 50%;
		z-index: 10;
		font-size: 0;
	}
	/deep/ .slick-disabled {
		opacity: 0.5;
	}

	/deep/ .slick-slider {
		width: 100%;
		height: 100%;
		position: absolute;
	}

	@media screen and (max-width: 1200px) {
		.card {
			padding-left: 10px;
			padding-right: 10px;

			&__title {
				margin-bottom: 13px;
				font-size: 15px;
			}

			&__price {
				font-size: 14px;

				&_old {
					font-size: 11px;
					top: -14px;
				}
			}

			&__brand {
				font-size: 14px;
			}

			&__slider {
				margin-bottom: 20px;
			}
		}

		.add-to-wishlst {
			opacity: 1;
			right: 18px;
		}
	}

	@media screen and (max-width: 960px) {
		.popular {
			&__label {
				margin-bottom: 34px;
			}
		}

		.card {
			padding-left: 10px;
			padding-right: 10px;

			&__slider {
				margin-bottom: 24px;
				@include proportional(340, 410);
			}

			&__brand {
				font-size: 15px;
			}

			&__title {
				font-size: 14px;
				margin-bottom: 15px;
			}

			&__price {
				font-size: 13px;

				&_old {
					font-size: 11px;
				}
			}
		}

		/deep/ .slick-arrow {
			top: 36%;
		}

		/deep/ .slick-next {
			right: 13px;
		}

		/deep/ .slick-prev {
			left: 13px;
		}

		.add-to-wishlst {
			right: 22px;
		}
	}

	@media screen and (max-width: 650px) {
		.card {
			margin-bottom: 14px;

			&__slider {
				margin-bottom: 17px;
				@include proportional(168, 195);
			}

			&__brand {
				margin-bottom: 7px;
				font-size: 11px;
				letter-spacing: 0.05em;
			}

			&__title {
				font-size: 13px;
				margin-bottom: 12px;
				line-height: 1.4;
			}

			&__price {
				font-size: 13px;

				&_old {
					font-size: 12px;
				}
			}
		}

		.add-to-wishlst {
			top: 6px;
			right: 6px;
		}
	}

</style>
