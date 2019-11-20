<template lang="pug">
	.about
		h2.h2.about__h2 {{ $lang.home.about.title }}
		.label.about__label {{ $lang.home.about.description }}
		.wrapper(v-for="(row, index) in list" :key="index" :class="{'wrapper_full': row.acf_fc_layout === 'type_3'}")
			.about__kit(:class="{'about__kit_type-1': row.acf_fc_layout === 'type_1', 'about__kit_type-2': row.acf_fc_layout === 'type_2' && row.slider_position === 'right', 'about__kit_type-3': row.acf_fc_layout === 'type_2' && row.slider_position === 'left', 'about__kit_type-4': row.acf_fc_layout === 'type_3'}")
				template(v-if="row.acf_fc_layout === 'type_1'")
					.card(v-for="(card, i) in row.block" :key="i")
						.patterns
							.patterns__item(:class="['patterns__item_' + getClassForPattern(i, 0)]" :style="{ backgroundImage:'url('+card.pattern_1.url+')'}" v-parallax.absY="0.09")
							.patterns__item(:class="['patterns__item_' + getClassForPattern(i, 1)]" :style="{ backgroundImage:'url('+card.pattern_2.url+')'}" v-parallax.absY="0.09")
							.patterns__item(:class="['patterns__item_' + getClassForPattern(i, 2)]" :style="{ backgroundImage:'url('+card.pattern_3.url+')'}" v-parallax.absY="0.09")
						router-link.image.card__image.card__image_no-multiply(:to="getUrl((lang === langDefault ? '' : '/'+lang) + card.link)" :style="{ backgroundImage:'url('+card.image.url+')'}")
						.info.card__info
							router-link.h3(:to="getUrl((lang === langDefault ? '' : '/'+lang) + card.link)") {{ card.title }}
							router-link(v-html="card.description" :to="getUrl((lang === langDefault ? '' : '/'+lang) + card.link)")
							router-link.link(:to="getUrl((lang === langDefault ? '' : '/'+lang) + card.link)") {{ $lang.home.about.show_now }}
				template(v-if="row.acf_fc_layout === 'type_2' && row.slider_position === 'right'")
					router-link.card(:to="getUrl((lang === langDefault ? '' : '/'+lang) + row.link)" :style="{ backgroundImage:'url('+row.Image.url+')'}")
						.h1.card__h1.card__h1_dark {{ row.title }}
					.card
						slick.products(:options="slickOptions")
							.item.products__item(v-for="(slide, j) in row.slider" :key="j")
								.image.item__image(:style="{ backgroundImage:'url('+slide.image.url+')'}")
								.info
									.h3 {{ slide.title }}
									router-link(:to="getUrl((lang === langDefault ? '' : '/'+lang) + slide.link)" v-html="slide.description")
									router-link.link(:to="getUrl((lang === langDefault ? '' : '/'+lang) + slide.link)") {{ $lang.home.about.show_now }}
				template(v-if="row.acf_fc_layout === 'type_2' && row.slider_position === 'left'")
					.card
						slick.products(:options="slickOptions")
							.item.products__item(v-for="(slide, j) in row.slider" :key="j")
								.image.item__image(:style="{ backgroundImage:'url('+slide.image.url+')'}")
								.info
									.h3 {{ slide.title }}
									router-link(:to="getUrl((lang === langDefault ? '' : '/'+lang) + slide.link)" v-html="slide.description")
									router-link.link(:to="getUrl((lang === langDefault ? '' : '/'+lang) + slide.link)") {{ $lang.home.about.show_now }}
					router-link.card(:to="getUrl((lang === langDefault ? '' : '/'+lang) + row.link)" :style="{ backgroundImage:'url('+row.Image.url+')'}")
						.h1.card__h1.card__h1_dark {{ row.title }}
				template(v-if="row.acf_fc_layout === 'type_3'")
					.card(:style="{ backgroundImage:'url('+row.image.url+')'}")
						.card__content
							.h1.card__h1.card__h1_white {{ row.title }}
							.link
								router-link(:to="getUrl((lang === langDefault ? '' : '/'+lang) + row.link)") {{ $lang.poster.show_more }}

		//- .wrapper
		//- 	.about__kit.about__kit_type-2
		//- 		.card(:style="{ backgroundImage:'url('+card1+')'}")
		//- 			.h1.card__h1.card__h1_dark Linen collection
		//- 		.card
		//- 			slick.products(ref="slick", :options="slickOptions")
		//- 				.item.products__item
		//- 					.image.item__image(:style="{ backgroundImage:'url('+slideCard1+')'}")
		//- 					.info
		//- 						.h3 Gifts
		//- 						.p A selection of gifts which will delight on every occasion.
		//- 						router-link.link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'home-textiles/plaids/'") Shop now
		//- 				.item.products__item
		//- 					.image.item__image(:style="{ backgroundImage:'url('+slideCard2+')'}")
		//- 					.info
		//- 						.h3 Gifts
		//- 						.p A selection of gifts which will delight on every occasion.
		//- 						router-link.link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'home-textiles/decorative-pillows/'") Shop now

		//- .wrapper.hide
		//- 	.about__kit.about__kit_type-3
		//- 		.card
		//- 			slick.products(ref="slick", :options="slickOptions")
		//- 				.item.products__item
		//- 					.image.item__image.item__image(:style="{ backgroundImage:'url('+slideCard1+')'}")
		//- 					.info
		//- 						.h3 Gifts
		//- 						.p The king of living in luxury, Lauren offers a collection of soft neutrals, natural textures including wood.
		//- 						a.link(href="#") Shop now
		//- 				.item.products__item
		//- 					.image.item__image.item__image(:style="{ backgroundImage:'url('+slideCard1+')'}")
		//- 					.info
		//- 						.h3 Gifts
		//- 						.p The king of living in luxury, Lauren offers a collection of soft neutrals, natural textures including wood.
		//- 						a.link(href="#") Shop now
		//- 				.item.products__item
		//- 					.image.item__image(:style="{ backgroundImage:'url('+slideCard1+')'}")
		//- 					.info
		//- 						.h3 Gifts
		//- 						.p The king of living in luxury, Lauren offers a collection of soft neutrals, natural textures including wood.
		//- 						a.link(href="#") Shop now
		//- 		.card(:style="{ backgroundImage:'url('+card1+')'}")
		//- 			.h1.card__h1.card__h1_dark Linen collection
		//- .about__kit.about__kit_type-4
		//- 	.card(:style="{ backgroundImage:'url('+card2+')'}")
		//- 		.card__content
		//- 			.h1.card__h1.card__h1_white Dr. Vranjes Firenze
		//- 			.link
		//- 				router-link(to="/brand/14") {{ $lang.poster.show_more }}
					

</template>

<script>
	import Lang from '../../../components/lang.vue';
	import part1 from '@/assets/uploads/part-1.png';
	import part2 from '@/assets/uploads/part-2.png';
	import part3 from '@/assets/uploads/part-3.png';
	import part4 from '@/assets/uploads/part-4.png';
	import part5 from '@/assets/uploads/part-5.png';
	import part6 from '@/assets/uploads/part-6.png';

	import bgCard1 from '@/assets/uploads/bg-card-1.jpg';
	import bgCard2 from '@/assets/uploads/bg-card-2.jpg';

	import card1 from '@/assets/uploads/card-1.jpg';
	import card2 from '@/assets/uploads/card-2.jpg';

	import slide1 from '@/assets/uploads/c-slide-1.jpg';
	import slideCard1 from '@/assets/uploads/slider-card-1.png';
	import slideCard2 from '@/assets/uploads/slider-card-2.png';
	
	import Slick from 'vue-slick';
	export default {
		name: 'main-about',
		data: function() {
			return {
				slickOptions: {
					infinite:true,
					slidesToShow: 1,
					arrows: true,
					dots: false,
					autoplay: true,
					autoplaySpeed: 10000
				},
				slide1: slide1,
				slideCard1:slideCard1,
				slideCard2:slideCard2,
				card1:card1,
				card2:card2,
				part1,
				part2,
				part3,
				part4,
				part5,
				part6,
				bgCard1,
				bgCard2,
				langDefault: window.config.langDefault,
				patterns: {
					0: [1, 2, 6],
					1: [3, 4, 5]
				}
			}
		},
		props: {
			about__items:Array,
			list: {
				type: Array,
				default: []
			}
		},
		components: {
			Slick
		},
		mixins: [Lang],
		methods: {
			toggle () {
				this.active = !this.active
			},
			getClassForPattern(row, index) {
				return this.patterns[row][index];
			},
			getUrl(url) {
				return url;
			}
		}
	}
</script>


<style lang="scss" scoped>

	@import '@/helpers/sass/mixins.scss';
	@import '@/helpers/sass/kit.scss';

	.hide {
		display: none;
	}

	.wrapper {
		width: 100%;
		padding-left: 48px;
		padding-right: 48px;
		max-width: calc(1344px + 48px*2);
		margin: 0 auto;
		box-sizing: border-box;

		&_full {
			max-width: 100%;
			padding-left: 0;
			padding-right: 0;
		}
	}
	.card {
		position: absolute;
		height: 100%;
		top:0;
		background-color: #F3F3F3;
		background-position: center;
		background-size: cover;
		overflow: hidden;

		&__h1 {
			margin: auto;
			display: inline-block;
			vertical-align: middle;

			&_white {
				@include kit('h1', 'white');
				margin-top: 13px;
			}
			&_dark {
				@include kit('h1', 'dark');
				margin-top: 13px;
			}
		}

		&__image {
			display: block;
			&_no-multiply {
				mix-blend-mode: unset !important;
			}
		}

		&__info {
			position: relative;
   			z-index: 101;
		}
	}

	.info {
		// max-width: 373px; 
		max-width: 413px;
		margin: auto;
		margin-top: percentage(51/718);
		// padding-bottom: 30px;
	}
	.h4 {
		@include kit('h4', 'dark');
		margin-bottom: 19px;
	}
	.h3 {
		@include kit('h3', 'dark');
		margin-bottom: 9px;
		display: block;
	}
	/deep/ p {
		@include kit('p1', 'dark');
		margin-bottom: percentage(32/718);
		margin-bottom: 7.2%;
		display: block;
	}
	.link {
		@include ui('link', 'dark');
		letter-spacing: 0.07em;
	}

	.patterns {
		position: absolute;
		width: 100%;
		height: 100%;
		
		&__item {
			position: absolute;

			&_1 {
				right: relative-calc(660, 0);
				top: relative-calc(718, -171);
				width: relative-calc(660, 53);
				@include proportional(53, 285);
			}
			&_2 {
				left: relative-calc(660, 294);
				top: relative-calc(718, 315);
				width: relative-calc(660, 308);
				@include proportional(308, 91);
			}
			&_6 {
				left: relative-calc(660, 0);
				top: relative-calc(718, 201);
				width: relative-calc(660, 98);
				@include proportional(98, 91);
			}
			&_3 {
				left: 0;
				top: relative-calc(718, 244);
				width: relative-calc(660, 390);
				@include proportional(390, 101);
			}
			&_4 {
				left: relative-calc(660, 66);
				top: relative-calc(718, -59);
				width: relative-calc(660, 390);
				@include proportional(390, 85);
			}
			&_5 {
				right: relative-calc(660, 40);
				top: relative-calc(718, 66);
				width: relative-calc(660, 130);
				@include proportional(130, 130);
			}
		}
	}

	.image {
		background-color: #0f0f0f;
		background-size:cover;
		background-position: center;
		width: relative-calc(660, 466);
		margin: auto;
		margin-top: relative-calc(718, 56);
		@include proportional(466, 466);
		position: relative;
		z-index: 1;
		mix-blend-mode: multiply;
	}

	.item {
		background-color: #F3F3F3;
		&__image {
			background-color: transparent;
			background-size: contain;
			background-position: center;
			background-repeat: no-repeat;
			width: relative-calc(432, 306);
			mix-blend-mode: multiply;
		}
	}
	.about {
		width: 100%;
		text-align: center;
		padding-top: 41px;
	
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
		&__kit {
			display: block;
			font-size: 0;
			line-height: 0;
			width: 100%;
			height: auto;
			position: relative;

			&_type-1 {
				margin-bottom: 24px;
				.card {
					width: calc(50% - 24px/2);
					&:first-child {
						left: 0;
					}
					&:last-child {
						right: 0;
					}
				}
				@include proportional(1344, 760);
			}
			&_type-2 {
				margin-bottom: 24px;

				.card {					
					&:first-child {
						width: calc(67.27% - 24px/2);
						left: 0;
						@include vertical-align-middle;
					}
					&:last-child {
						width: calc(32.72% - 24px/2);
						right: 0;
					}
				}
				@include proportional(1344, 520);
			}
			&_type-3 {
				margin-bottom: 24px;

				.card {
					&:first-child {
						width: calc(32.72% - 24px/2);
						left: 0;
					}
					&:last-child {
						width: calc(67.27% - 24px/2);
						right: 0;
						@include vertical-align-middle;
					}
				}
				@include proportional(1344, 520);
			}
			&_type-4 {
				margin-bottom: 24px;
				.card {
					width: 100%;
					background-color: #0f0f0f;
					
					@include vertical-align-middle;
					

					&__h1 {
						margin-top: 37px;
						width: 100%;
						margin-bottom: 37px;
					}

					&__content {
						width: auto;
						max-width: 561px;
						display: inline-block;
						vertical-align: middle;
					}
				}

				.link {
					display: inline-block;
					color: #fff;
					position: absolute;
					bottom: 43px;
					left: 50%;
					transform: translate3d(-50%,0,1px);
					z-index: 1;
					
						
					&:after{
						background: #fff;
					}

				}

				@include proportional(1440, 570);
			}
		}
	}
	/deep/ .slick-prev {
		left: 16px;
		background:rgba(255, 255, 255, 0.9) url(../../../assets/img/icon-arrow-left.svg) no-repeat;
		background-size: 6px auto;
		background-position: 15px center;
	}
	/deep/ .slick-next {
		right:16px;
		background:rgba(255, 255, 255, 0.9) url(../../../assets/img/icon-arrow-right.svg) no-repeat;
		background-size: 6px auto;
		background-position: 18px center;
	}
	/deep/ .slick-arrow {
		position: absolute;
		top:relative-calc(510, 165);
		width: 40px;
		height: 40px;
		border-radius: 50%;
		z-index: 10;
		font-size: 0;
	}
	/deep/ .slick-disabled {
		opacity: 0.5;
	}

	@media screen and (min-width: 1201px) and (max-width: 1355px) {
		.p {
			padding: 0 15px;
			margin-bottom: 4.2%;
		}

		.info {
			margin-top: 2.10306%;
		}
	}

	@media screen and (max-width: 1200px) {
		.about {
			padding-top: 44px;

			&__label {
				margin-bottom: 35px;
			}

			&__kit {
				&_type-1 {
					@include proportional(1234, 768);
				}

				&_type-2 {
					@include proportional(1440, 669);
					
					.card {
						&:first-child {
							width: calc(62.8% - 24px/2);
							padding: 0 9%;
						}

						&:last-child {
							width: calc(37.2% - 24px/2);

							.h3 {
								font-size: 20px;
								margin-bottom: 7px;
							}

							.info {
								margin-top: 4.64465%;
								max-width: 265px;
							}
							
							.image {
								margin-top: percentage(20/439);
							}

							.p {
								letter-spacing: 0.026em;
								margin-bottom: 6%;
							}

							
						}
					}
				}

				&_type-3 {
					@include proportional(1440, 669);

					.card {
						&:last-child {
							width: calc(62.8% - 24px/2);
						}

						&:first-child {
							width: calc(37.2% - 24px/2);

							.h3 {
								font-size: 20px;
								margin-bottom: 7px;
							}

							.info {
								margin-top: 4.64465%;
								max-width: 265px;
							}
							
							.image {
								margin-top: percentage(20/439);
							}

							.p {
								letter-spacing: 0.026em;
								margin-bottom: 6%;
							}

							
						}
					}
				}

				&_type-4 {
					@include proportional(1024, 570);

					.card {
						&__h1 {
							margin-top: 1px;
						}
					}
					
					.link {
						position: absolute;
						bottom: 34px;
						left: 50%;
						transform: translate3d(-50%,0,1px);
					}
				}
			}
		}

		.wrapper {
			padding-left: 40px;
			padding-right: 40px;
		}

		.image {
			margin-top: relative-calc(760, 56);
			// @include proportional(466, 466);
		}

		.info {
			max-width: 373px;
			margin: auto;
			margin-top: percentage(77/718);
			position: relative;
			z-index: 2;
			transform: translate3d(0,0,1px);
		}

		.h3 {
			// font-size: 
		}

		.patterns {

			&__item {

				&_2 {
					top: relative-calc(718, 200);
				}

				&_6 {
					top: relative-calc(718, 255);
				}
			}
		}

		/deep/ .slick-arrow {
			position: absolute;
			top:relative-calc(439, 123);
			width: 32px;
			height: 32px;
			border-radius: 50%;
			z-index: 10;
			font-size: 0;
		}

		/deep/ .slick-prev {
			left: 11px;
			background-position: center;
		}

		/deep/ .slick-next {
			right: 11px;
			background-position: center;
		}

		.card {

			&__h1_dark {
				margin-top: 4px;
				font-size: 56px;
			}
		}
	}

	@media screen and (max-width: 850px) {
		.about {
			&__h2 {
				margin-bottom: 8px;
			}

			&__label {
				margin-bottom: 43px;
			}

			&__kit {
				&_type-1,
				&_type-2,
				&_type-3 {
					// @include proportional(768, 502);
					height: auto;
					display: flex;
					width: 100%;

					&:after {
						content: "";
						display: table;
						clear: both;
						margin-top: 0;
						padding-top: 0;
						padding-bottom: 0;
					}

					.card {
						height: auto;
						position: relative;
						flex-grow: 0;
						flex-shrink: 0;
						padding-bottom: 37px;

						&:first-child {
							float: left;
							flex-basis: calc(50% - 24px/2);
							// flex: 1;
						}

						&:last-child {
							float: right;
							flex-basis: calc(50% - 24px/2);
							// flex: 2;
							margin-left: 24px;
						}
					}
				}

				&_type-2,
				&_type-3 {
					@include proportional(768, 479);

					.card {
						.h3 {
							height: auto;
						}

						.p {
							padding: 0 0;
							line-height: 23px;
						}
					}
				}

				&_type-2 {
					.card {
						&:first-child {
							padding: 0 3%;
						}
					}
				}

				&_type-4 {
					@include proportional(769, 492);

					.card__h1 {
						margin-top: 12px;
					}
				}
			}

			.card {
				&__h1 {
					&_dark {
						font-size: 47px;
						letter-spacing: .01em;
					}
				}
			}
		}

		.patterns {
			&__item {
				&_6 {
					top: 10.99443%
				}

				&_5 {
					right: 3%;
					top: -7%;
					width: 15%;
				}

				&_4 {
					left: 7%;
					top: -37%;
					width: 72%;
				}

				&_3 {
					left: 0;
					top: 4.45682%;
					width: 48%;
				}

				&_2 {
					left: 66.9697%;
					top: 16%;
					width: 12.72727%;
					opacity: 0;
				}

				&_1 {
					top: -32.81616%;
				}
				background-size: cover;
			}
		}

		.wrapper {
			padding: 0 32px;
		}

		.image {
			@include proportional(244, 242);
		}

		.info {
			margin-top: 41px;
		}

		.p {
			padding: 0 45px;
			line-height: 21px;
			letter-spacing: .02em;
			margin-bottom: 18px;
		}

		.h3 {
			height: 50px;
			padding: 0 45px;
			line-height: 27px;
			margin-bottom: 15px;
		}

		.card {
			&__h1 {
				&_dark {
					margin-top: -1px;
				}
			}
		}

		/deep/ .slick-arrow {
			top: 32.3%;
		}
	}

	@media screen and (max-width: 650px) {

		.wrapper {
			padding: 0 18px;
		}

		.image {
			@include proportional(240, 242);
		}

		.info {
			margin-top: 55px;
		}

		.h3 {
			height: auto;
			margin-bottom: 8px;
		}

		.card {
			margin-bottom: 20px;

			&__h1_dark {
				margin-top: 60px;
				font-size: 48px;
				letter-spacing: -0.02em;
				line-height: 52px;
			}
		}

		.about {
			padding-top: 37px;

			&__label {
				margin-bottom: 33px;
			}

			&__kit {
				&_type-1,
				&_type-2 {
					display: block;
					margin-bottom: 18px;

					.card {
						display: block;
						padding-bottom: 52px;

						&:before {
							content: "";
							display: table;
						}

						&:first-child {
							float: none;
							width: 100%;
						}

						&:last-child {
							float: none;
							width: 100%;
							margin-left: 0;
							padding-bottom: 24px;
							margin-bottom: 0;

							.info {
								margin-top: 28px;
								padding-bottom: 4px;
							}
						}
					}
				}

				&_type-2 {
					.card {

						&:first-child {
							height: 492px;
						}
					}

					&:after {
						display: none;
					}
				}

				&_type-3 {
					display: block;
					margin-bottom: 0;

					.card {
						display: block;
						padding-bottom: 52px;

						&:before {
							content: "";
							display: table;
						}

						&:last-child {
							float: none;
							width: 100%;
							margin-left: 0;
							height: 492px;
						}

						&:first-child {
							float: none;
							width: 100%;
							margin-left: 0;
							padding-bottom: 40px;
							margin-bottom: 0;

							.info {
								margin-top: 12px;
							}
						}
					}
				}

				&_type-4 {
					&:after {
						display: none;
					}

					height: auto;

					.card {
						height: 492px;
						position: relative;

						&__h1 {
							margin-top: 6px;
							font-size: 48px;
							letter-spacing: -0.03em;
							line-height: 52px;
						}
					}

					.link {
						background-color: black;
						position: static;
						bottom: auto;
						left: auto;
						transform: translate3d(0,0,1px);
					}
				}
			}
		}

		.patterns {

			&__item {

				&_1 {
					left: relative-calc(343, 232);
					top: relative-calc(485, 93);
					width: relative-calc(343, 44);
					@include proportional(44, 91);
				}

				&_3 {
					left: relative-calc(343, 0);
					top: relative-calc(485, 57);
					width: relative-calc(343, 80);
					@include proportional(80, 35);
				}

				&_4 {
					left: relative-calc(343, 23);
					top: relative-calc(485, -132);
					width: relative-calc(343, 190);
					@include proportional(190, 48);
				}

				&_5 {
					left: relative-calc(343, 281);
					top: relative-calc(485, -59);
					width: relative-calc(343, 50);
					@include proportional(50, 72);
				}

				&_6 {
					left: relative-calc(343, 26);
					top: relative-calc(485, -107);
					width: relative-calc(343, 44);
					@include proportional(44, 207);
				}
			}
		}

		.card {
			&__h1 {
				&_dark {
					letter-spacing: 0;
					font-size: 47px;
					margin-top: 9px;
				}
			}
		}

		/deep/ .slick-arrow {
			top: 30%;
		}
	}

</style>

