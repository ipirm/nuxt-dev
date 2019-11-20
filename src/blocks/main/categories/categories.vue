<template lang="pug">
	
	.categories
		h2.h2.categories__h2 {{ $lang.home.category.title }}
		//- .label.categories__label Meet our weekly new arrivals.
		slick.categories__slider(ref="slick" :options="slickOptions") 
			//- div.card
			//- 	div.card__image
			//- 		img(:src="slide1")
			//- 		a.card__link(:href="'/'+ (lang === langDefault ? '' : lang + '/') + 'new-in/'")
			//- 			span View more
			//- 	div.card__title New in

			template(v-for="category in orderedCategories")
				div.card(v-if="category.seo_url != 'popular'")
					div.card__image
						img(:src="category.original_image")
						a.card__link(:href="'/'+ (lang === langDefault ? '' : lang + '/') + category.seo_url + '/'")
							span {{ $lang.home.category.view_more }}
					div.card__title {{ category.name }}
</template>

<script>
	import Lang from '../../../components/lang.vue';
	import $store from '../../../components/store';

	import slide1 from '@/assets/img/new-in.jpg';

	import Slick from 'vue-slick';
	export default {
		name: 'main-poster',
		data: function(){
			return {
				texts_email: 'Электронная почта',
				texts_button: 'Попробовать',
				slickOptions: {
					// slidesToShow: 1,
					centerMode: true,
					variableWidth: true,
					arrows: true,
					dots: false,
					autoplay: true,
					autoplaySpeed: 10000
				},
				slide1: slide1,
				langDefault: window.config.langDefault,
			}
		},
		components: {
			Slick
		},
		props: {
			tag:String,
			title:String,
			text:String,
			image:String
		},
		mixins: [Lang],
		computed:{
			categories() {
				var data = $store.state.categories.data;
				return data == undefined ? {} : data;
			},
			orderedCategories() {
				let arr = Object.values(this.categories).sort(function(a, b) {
					return a.sort - b.sort;
				});
				return arr;
			}
		},
		mounted() {
			this.fetchData();
		},
		methods:{
			goTo(url) {
				this.$router.push({path: url});
			},
			swipe() {
				
			},
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
			}
		},
		watch: {
			'$route' () {
				this.fetchData();
			}
		},
		beforeUpdate() {
			if (this.$refs.slick) {
				this.$refs.slick.destroy();
			}
		},
		updated() {
			this.$nextTick(function () {
				if (this.$refs.slick) {
					this.$refs.slick.create(this.slickOptions);
					this.$refs.slick.setPosition();
					this.$refs.slick.goTo(0, false);
				}
			});
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/kit.scss';
	.categories {
		width: 100%;
		text-align: center;
		padding-top: 56px;

		&__slider {
			height: 600px;
		}

		&__h2 {
			@include kit('h2', 'dark');
			margin-bottom: 31px;
		}
		&__label {
			@include kit('p1', 'dark');
			margin-bottom: 40px;
		}
	}
	.card {
		padding-left: 12px;
		padding-right: 12px;
		position: relative;
		cursor: pointer;

		&__image {
			width: auto;
			height: 540px;
			overflow: hidden;
			position: relative;
			margin-bottom: 16px;

			img {
				height: 540px;
			}
		}
		&__link {
			position: absolute;
			left:0;
			// top:255px;
			top: 0;
			width: 100%;
			height: 100%;
			opacity: 0;
			transition: all 1s ease;
			display: block;
			text-align: center;
			font-size: 0;

			&:before {
				content: "";
				display: inline-block;
				vertical-align: middle;
				height: 100%;
			}

			span {
				@include kit('h3', 'white');
				display: inline-block;
				vertical-align: middle;
				position: relative;

				&::after {
					content: "";
					display: block;
					width: 100%;
					height: 1px;
					background: #fff;
					position: absolute;
					left:0;
					bottom:0px;
				}
			}
		}

		&__title {
			@include kit('h6 700', 'dark');
		}

		&:hover {
			.card {
				&__link {
					opacity: 1;
				}
			}
		}
	}

	/deep/ .slick-prev {
		left: 48px;
		background:rgba(255, 255, 255, 0.9) url(../../../assets/img/icon-arrow-left.svg) no-repeat;
		background-size: 6px auto;
		background-position: 15px center;
	}
	/deep/ .slick-next {
		right:48px;
		background:rgba(255, 255, 255, 0.9) url(../../../assets/img/icon-arrow-right.svg) no-repeat;
		background-size: 6px auto;
		background-position: 18px center;
	}
	/deep/ .slick-arrow {
		position: absolute;
		top:calc(50% - 40px);
		width: 40px;
		height: 40px;
		border-radius: 50%;
		z-index: 10;
		font-size: 0;
	}

	@media screen and (max-width: 1200px) {
		.categories {
			padding-top: 72px;

			&__label {
				margin-bottom: 31px;
			}
		}

		.card {
			&__link {
				span {
					&:after {
						bottom: 5px;
					}
				}
			}

			&__title {
				letter-spacing: 0.04em;
			}

			&__image {
				margin-bottom: 18px;
			}
		}

		/deep/ .slick-arrow {
			top: calc(50% - 50px);
		}

		/deep/ .slick-prev {
			left: 40px;
		}

		/deep/ .slick-next {
			right: 40px;
		}
	}

	@media screen and (max-width: 850px) {
		.categories {
			&__slider {
				height: 487px;
			}
		}

		.card {
			&__image {
				height: 428px;

				img {
					height: 428px;
				}
			}
		}
	}

	@media screen and (max-width: 600px) {
		.categories {
			padding-top: 64px;
		}

		.card {
			&__link {
				top: 0;
				opacity: 1;

				span {
					z-index: 1;
					transform: translate3d(0,0,1px);
				}
				
				&:before {
					content: "";
					display: inline-block;
					vertical-align: middle;
					height: 100%;
				}

				&::after {
					content: "";
					display:  block;
					height: 100%;
					width: 100%;
					position: absolute;
					top: 0;
					left: 0;
					z-index: 0;
					transform: translate3d(0,0,1px);
					background-color: rgba(0,0,0,.15);
				}
			}
		}

		/deep/ .slick-arrow {
			width: 32px;
			height: 32px;
			top: calc(50% - 47px);
		}

		/deep/ .slick-prev {
			left: 32px;
			background-position: center;
		}

		/deep/ .slick-next {
			right: 32px;
			background-position: center;
		}
	}

</style>
