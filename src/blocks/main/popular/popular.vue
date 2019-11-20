<template lang="pug">

	.popular
		h2.h2.popular__h2 {{ $lang.home.popular.title }}
		.label.popular__label {{ $lang.home.popular.description }}
		.wrapper
			template(v-if="isProduct")
				.container(v-if="windowWidth > 650")
					template(v-if="products.length")
						swiper.items(:options="swiperOptions" ref="mySwiper")
							template(v-for="product in products")
								swiper-slide
									product(v-bind:info="product" :key="product.product_id" :popular2="true")
						button.swiper-button-prev(slot="button-prev")
						button.swiper-button-next(slot="button-next")

				.items(v-else)
					template(v-for="product in products")
						product(v-bind:info="product", :key="product.product_id" :popular2="true")
			template(v-else)
				.container(v-if="windowWidth > 650")
					template(v-if="products.length")
						swiper.items(:options="swiperOptions" ref="mySwiper")
							template(v-for="product in products")
								swiper-slide
									product(v-bind:info="product" :key="product.product_id" :popular2="true")
					button.swiper-button-prev(slot="button-prev")
					button.swiper-button-next(slot="button-next")

				.items(v-else)
					template(v-for="product in products")
						product(v-bind:info="product", :key="product.product_id" popular2="true")

			router-link.link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'new-in/'", v-if='more') {{ $lang.popular.show_more }}
</template>

<script>
	import Lang from '../../../components/lang.vue';
	import ProductCard from '../../includes/product/product.vue';

	import $api from '../../../components/api.js';
	import $store from '../../../components/store';

	import Slick from 'vue-slick';

	import 'swiper/dist/css/swiper.css';
	import { swiper, swiperSlide } from 'vue-awesome-swiper';

	export default {
		name: 'main-popular',
		data: function(){
			return {
				texts_email: 'Электронная почта',
				texts_button: 'Попробовать',
				swiperOptions: {
					slidesPerView: 4,
					spaceBetween: 0,
					slidesPerGroup: 4,
					// loopFillGroupWithBlank: true,
					loop: true,
					watchOverflow: true,
					noSwiping: false,
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					breakpoints: {
						1200: {
							slidesPerView: 3,
							slidesPerGroup: 3,
							// loopFillGroupWithBlank: true,
							// loopedSlides: 3,
							// loop: true,
							// watchOverflow: true
						},
						850: {
							slidesPerView: 2,
							slidesPerGroup: 2,
							// loopFillGroupWithBlank: true,
							// loopedSlides: 2,
							// loop: true,
							// watchOverflow: true
						}
					}
				},
				windowWidth: window.innerWidth,
				langDefault: window.config.langDefault
			}
		},
		components: {
			'product': ProductCard,
			Slick,
			swiper,
			swiperSlide
		},
		props: {
			tag:String,
			title:String,
			text:String,
			image:String,
			info:{
				type:Object,
				default: function () {
					return {
						title:'Popular items',
						description:'Discover stories that have inspired us'
					}
				}
			},
			more:{
				type:Boolean,
				default:true
			},
			products:{
				type:Array,
				default: function () {
					return {
						name:"",
						manufacturer:"",
						image:"",
						price:0,
						seo_url:"",
						product_id: 0
					}
				}
			},
			isProduct : {
				type: Boolean
			}
		},
		mixins: [Lang],
		computed:{
			// productsList() {
			// 	var data = $store.state.products.data;
			// 	return data == undefined ? {} : data;
			// },
			swiper() {
				if (this.$refs.mySwiper && this.$refs.mySwiper.swiper) {
					return this.$refs.mySwiper.swiper
				}

				return false;
			}
		},
		async mounted() {
			// $api.getToken();
            console.log('jfjafuiag2874g82781g');
            console.log(this.products);
			let $this = this;
		await 	$api.getProducts(121);
			window.addEventListener('resize', $this.resizeHandler, false);


			// this.$nextTick(function() {
			// 	if ($this.swiper) {
			// 		$this.swiper.update();
			// 	}
			// });
		},
		methods:{
			fetchData () {
				let response = {
						texts_email:{
							ru:'Электронная почта',
							en:'E-mail',
							ua:'Електронна пошта',
						},
						texts_button:{
							ru:'Попробовать',
							en:'Get it now',
							ua:'Спробувати',
						}
				}
			},
			resizeHandler() {
				let $this = this;
				this.windowWidth = window.innerWidth;
				// $this.swiper.destroy(false, false);

				this.$nextTick(function() {
					if ($this.swiper) $this.swiper.update();
				});
			}
		},
		beforeDestroy() {
			let $this = this;
			window.removeEventListener('resize', $this.resizeHandler, false);
		},
		updated() {
			let $this = this;
		},
		watch: {
			products() {
				let $this = this;

				// $this.$nextTick(function() {
				// 	if ($this.swiper) {
				// 		$this.swiper.update();
				// 	}
				// });
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/mixins.scss';
	@import '@/helpers/sass/kit.scss';
	.wrapper {
		width: 100%;
		max-width: 1425px;
		margin: 0 auto;
		box-sizing: border-box;
		padding-left: 35px;
		padding-right: 35px;
	}

	.popular {
		width: 100%;
		text-align: center;
		padding-top: 48px;
		padding-bottom: 68px;

		&__slider {
			height: 600px;
		}

		&__h2 {
			@include kit('h2', 'dark');
			margin-bottom: 6px;
		}
		&__label {
			@include kit('p1', 'dark');
			margin-bottom: 43px;
		}
	}

	.card {
		padding-left: 5px;
		padding-right: 5px;
		position: relative;
		overflow: hidden;
		display: inline-block;
		vertical-align: top;
		width: relative-calc(1344, 332);
		width: 100%;
		height: auto;

		&__image {
			background-color: #F3F3F3;
			background-size: 70% auto;
			background-position: center;
			background-repeat: no-repeat;
			width: 100%;
			@include proportional(328, 410);
			margin-bottom: 14px;
		}
		&__brand {
			@include kit('h6 700', 'dark');
			margin-bottom: 6px;
		}
		&__title {
			@include kit('h6 100', 'dark');
			text-transform: none;
			margin-bottom: 13px;
		}
		&__price {
			@include kit('h6 300', 'dark');
			margin-bottom: 14px;
		}

		&:hover {
			opacity: 0.8;
		}
	}

	.items {
		margin-bottom: 0;
	}

	.link {
		@include ui('link', 'dark');
		top: -4px;
	}

	/deep/ .swiper-button-prev {
		left: 56px;
		background:rgba(255, 255, 255, 0.9) url(../../../assets/img/icon-arrow-left.svg) no-repeat;
		background-size: 6px auto;
		background-position: 15px center;
	}
	/deep/ .swiper-button-next {
		right: 56px;
		background:rgba(255, 255, 255, 0.9) url(../../../assets/img/icon-arrow-right.svg) no-repeat;
		background-size: 6px auto;
		background-position: 18px center;
	}
	/deep/ .swiper-button-prev,
	/deep/ .swiper-button-next {
		position: absolute;
		top: 37.7%;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		z-index: 10;
		font-size: 0;
		transition: opacity .5s ease;

		&.swiper-button-disabled {
			opacity: 0 !important;
		}

		&:hover {
			opacity: .7;
		}
	}
	/deep/ .slick-disabled {
		opacity: 0.5;
	}

	@media screen and (max-width: 1200px) {
		.card {
			padding-left: 11px;
			padding-right: 11px;

			&__slider {
				margin-bottom: 20px;
			}

			&__brand {
				font-size: 14px;
			}

			&__title {
				margin-bottom: 13px;
			}

			&__price {
				&_old {
					font-size: 11px;
				}
			}
		}

		.wrapper {
			padding-left: 29px !important;
			padding-right: 29px !important;
		}

		/deep/ .swiper-button-prev,
		/deep/ .swiper-button-next {
			top: 36.2%;
		}

		/deep/ .swiper-button-prev {
			left: 56px;
		}

		/deep/ .swiper-button-next {
			right: 56px;
		}
	}

	@media screen and (max-width: 850px) {
		.popular {
			&__label {
				margin-bottom: 34px;
			}
		}

		/deep/ .swiper-button-prev,
		/deep/ .swiper-button-next {
			top: 37.4%;
		}

		/deep/ .swiper-button-next {
			// right: 28px;
		}

		/deep/ .swiper-button-prev {
			// left: 28px;
		}

		.wrapper {
			padding-left: 20px !important;
			padding-right: 20px !important;
		}

		.card {
			padding-left: 12px;
			padding-right: 12px;
		}
	}

	@media screen and (max-width: 650px) {
		.popular {
			padding-top: 40px;
			padding-bottom: 61px;

			&__h2 {
				margin-bottom: 9px;
			}

			&__label {
				letter-spacing: .6px;
				margin-bottom: 32px;
			}
		}

		.wrapper {
			padding: 0 10px !important;
		}

		.items {
			// margin: 0 -4px;
		}

		.card {
			display: none;
			padding: 0;
			margin: 0 8px 14px;

			&:nth-child(1),
			&:nth-child(2),
			&:nth-child(3),
			&:nth-child(4) {
				display: inline-block;
				margin-left: 4px !important;
				margin-right: 4px !important;
				width: 161px;
				width: calc(50% - 24px) !important;
			}
		}

		.items {
			margin: 0 -13px;
		}

		.card {
			margin: 0 4px 16px;

			&:nth-child(1),
			&:nth-child(2),
			&:nth-child(3),
			&:nth-child(4) {
				width: 168px;
			}
		}
	}

	@media screen and (max-width: 360px) {
		.items {
			margin: 0 -15px;
		}

		.card {
			margin: 0 4px 16px;

			&:nth-child(1),
			&:nth-child(2),
			&:nth-child(3),
			&:nth-child(4) {
				width: 147px;
			}
		}
	}
</style>
