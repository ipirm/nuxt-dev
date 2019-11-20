<template lang="pug">
	.story
		.story__head
			.story__title Our story
			.story__subtitle Discover stories that have inspired us
			swiper.story__slider.slider(:options="swiperOption" ref="mySwiper")
				swiper-slide.slider__slide(:style="{backgroundImage: 'url(' + require('@/assets/uploads/project-gallery-3.png') + ')'}")
				swiper-slide.slider__slide(:style="{backgroundImage: 'url(' + require('@/assets/uploads/project-gallery-4.png') + ')'}")
				swiper-slide.slider__slide(:style="{backgroundImage: 'url(' + require('@/assets/uploads/project-gallery-5.png') + ')'}")
				swiper-slide.slider__slide(:style="{backgroundImage: 'url(' + require('@/assets/uploads/project-gallery-3.png') + ')'}")
				swiper-slide.slider__slide(:style="{backgroundImage: 'url(' + require('@/assets/uploads/project-gallery-4.png') + ')'}")
				swiper-slide.slider__slide(:style="{backgroundImage: 'url(' + require('@/assets/uploads/project-gallery-5.png') + ')'}")
			.story__timeline.timeline(ref="timeline" v-if="isMac || windowWidth <= 760")
				.timeline__wrapper
					button.timeline__item(@click="setActive(0)" :class="{'timeline__item_active': active === 0}")
						.timeline__year 1995
						.timeline__desc The Ralph Lauren collection is showcased in a 4,700-square-foot retail store in Mehrauli, New Delhi.
					button.timeline__item(@click="setActive(1)" :class="{'timeline__item_active': active === 1}")
						.timeline__year 2002
						.timeline__desc We believe that our global reach, breadth of product offerings, and multichannel distribution.
					button.timeline__item(@click="setActive(2)" :class="{'timeline__item_active': active === 2}")
						.timeline__year 2008
						.timeline__desc Premium lifestyle products, including apparel, accessories, home furnishings, and other licensed product categories.
					button.timeline__item(@click="setActive(3)" :class="{'timeline__item_active': active === 3}")
						.timeline__year 1995
						.timeline__desc The Ralph Lauren collection is showcased in a 4,700-square-foot retail store in Mehrauli, New Delhi.
					button.timeline__item(@click="setActive(4)" :class="{'timeline__item_active': active === 4}")
						.timeline__year 2002
						.timeline__desc We believe that our global reach, breadth of product offerings, and multichannel distribution.
					button.timeline__item(@click="setActive(5)" :class="{'timeline__item_active': active === 5}")
						.timeline__year 2008
						.timeline__desc Premium lifestyle products, including apparel, accessories, home furnishings, and other licensed product categories.
			.story__timeline.timeline.timeline_windows(ref="timelineWindows" v-else)
				.timeline__wrapper
					.slider-container(ref="container")
						slick.slider(:options="slickOptions" ref="slick" @beforeChange="handleBeforeChange")
							.card
								button.timeline__item(:class="{'timeline__item_active': active === 0}")
									.timeline__year 1995
									.timeline__desc The Ralph Lauren collection is showcased in a 4,700-square-foot retail store in Mehrauli, New Delhi.
							.card
								button.timeline__item(:class="{'timeline__item_active': active === 1}")
									.timeline__year 2002
									.timeline__desc We believe that our global reach, breadth of product offerings, and multichannel distribution.
							.card
								button.timeline__item(:class="{'timeline__item_active': active === 2}")
									.timeline__year 2008
									.timeline__desc Premium lifestyle products, including apparel, accessories, home furnishings, and other licensed product categories.
							.card
								button.timeline__item(:class="{'timeline__item_active': active === 3}")
									.timeline__year 1995
									.timeline__desc The Ralph Lauren collection is showcased in a 4,700-square-foot retail store in Mehrauli, New Delhi.
							.card
								button.timeline__item(:class="{'timeline__item_active': active === 4}")
									.timeline__year 2002
									.timeline__desc We believe that our global reach, breadth of product offerings, and multichannel distribution.
							.card
								button.timeline__item(:class="{'timeline__item_active': active === 5}")
									.timeline__year 2008
									.timeline__desc Premium lifestyle products, including apparel, accessories, home furnishings, and other licensed product categories.

</template>

<script>
	import Vue from 'vue';
	
	import $store from '../../components/store';
	import $api from '../../components/api.js';
	import Lang from '../../components/lang.vue';

	import Slick from 'vue-slick';

	import 'swiper/dist/css/swiper.css';
	import { swiper, swiperSlide } from 'vue-awesome-swiper';

	export default {
		name: 'about-story',
		data: function(){
			return {
				active: 0,
				isMac: navigator.platform.toUpperCase().indexOf('MAC')>=0,
				windowWidth: window.innerWidth,
				translateX: {
					desc: -416,
					tablet: -387
				},
				swiperOption: {
					loop: false,
					initialSlide: 0,
					effect: 'fade',
					allowTouchMove: false,
					fadeEffect: {
						crossFade: true
					}
				},
				swiperOptionsWindows: {
					loop: false,
					initialSlide: 0,
					autoWidth: true,
					slidesPerView: 'auto',
					slideToClickedSlide: true,
					centeredSlides: true
				},
				slickOptions: {
					// slidesToShow: 1,
					centerMode: true,
					variableWidth: true,
					arrows: false,
					focusOnSelect: true,
					infinite: false,
					initialSlide: 0,
					speed: 500,
					responsive: [
						{
							breakpoint: 1200,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 1
							}
						},
						{
							breakpoint: 960,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 1,
								centerMode: false
							}
						},
						{
							breakpoint: 650,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
								centerMode: false
							}
						}
					]
				},
			}
		},
		components: {
			swiper,
			swiperSlide,
			Slick
		},
		mixins: [Lang],
		mounted () {
			if (this.windowWidth > 760) this.$refs.container.style.transform = 'translate3d(-416px, 0, 1px)';
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper
			}
		},
		methods: {
			setActive(i) {
				this.active = i;
				this.swiper.slideTo(i);
				let el = this.$refs.timeline.querySelectorAll('.timeline__item')[i];
				let left = el.offsetLeft - el.offsetWidth;
				if (this.windowWidth <= 1200 && this.windowWidth > 960) {
					left += 126;
				}
				if (this.windowWidth <= 960 && this.windowWidth > 650) {
					left += 126;
				}
				if (this.windowWidth <= 650) {
					left += 280;
				}
				if (i === 0 || (i === 1 && this.windowWidth > 650)) left = 0;
				this.$refs.timeline.scrollTo({
					left: left,
					behavior: "smooth"
				});
			},
			handleBeforeChange(event, slick, currentSlide, nextSlide) {
				let x = this.windowWidth > 1200 ? this.translateX.desc : this.windowWidth <= 1200 && this.windowWidth > 960 ? this.translateX.tablet : 0;
				this.active = nextSlide;
				this.swiper.slideTo(this.active);
				if (nextSlide === 0 && this.windowWidth > 760) {
					this.$refs.container.style.transform = 'translate3d(' + this.translateX.desc + 'px, 0, 1px)';
				} else {
					this.$refs.container.style.transform = 'translate3d(0, 0, 1px)';
				}
			},
			reInitSlick: function() {
				this.$refs.slick.reSlick();
			}
		},
		mounted() {
			console.log(this.$refs.slick);
			window.addEventListener('resize', this.reInitSlick());
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/kit.scss';

	.story {
		padding-top: 93px;

		&__title {
			font-family: 'Didot';
			font-size: 32px;
			line-height: normal;
			text-align: center;
			color: #171717;
			margin-bottom: 4px;
		}

		&__subtitle {
			font-family: 'Museo';
			font-size: 14px;
			line-height: 24px;
			text-align: center;
			letter-spacing: 0.034em;
			color: #171717;
			margin-bottom: 40px;
		}
	}

	.slider {
		&__slide {
			height: 492px;
			width: 100%;
			background-repeat: no-repeat;
			background-position: center;
			background-size: cover;
		}
	}

	.timeline {
		background: #F3F3F3;
		padding-top: 51px;
		overflow-x: auto;
		border-top: 1px solid rgba(0, 0, 0, 0.08);
		position: relative;

		// &:before {
		// 	content: "";
		// 	display: block;
		// 	position: absolute;
		// 	width: 100%;
		// 	height: 1px;
		// 	top: 51px;
		// 	left: 0;
		// 	background-color: rgba(0, 0, 0, 0.08);
		// }

		&:not(.timeline_windows) {
			&::-webkit-scrollbar {
				width: 0;
				display: none;
			}
		}

		&__wrapper {
			width: 100%;
			display: inline-block;
			vertical-align: top;
			white-space: nowrap;

			// overflow-x: hidden;
			// display: flex;
			// justify-content: flex-start;
		}

		&_windows {
			overflow: hidden;

			.timeline__wrapper {
				display: block;
				white-space: normal;
				max-width: 1248px;
			}

			/deep/ .slick-track,
			/deep/ .slick-list,
			/deep/ .slick-slider {
				overflow: visible;
			}

			.slider-container {
				transition: transform .5s ease;
			}
		}

		&__item {
			padding: 36px 0 93px 126px;
			position: relative;
			border-top: 1px solid rgba(0, 0, 0, 0.08);
			// height: 275px;
			display: inline-block;
			vertical-align: top;
			max-width: 416px;
			white-space: normal;
			text-align: left;

			&:after {
				content: '';
				height: 33px;
				width: 1px;
				background: linear-gradient(180deg, #E0E0E0 34.85%, rgba(224, 224, 224, 0) 113.46%);
				position: absolute;
				z-index: 1;
				top: 0;
				left: 153px;
			}

			&:before {
				content: '';
				position: absolute;
				z-index: 2;
				top: -4.5px;
				left: 148.5px;
				width: 9px;
				height: 9px;
				border-radius: 50%;
				border: 1px solid rgba(0, 0, 0, 0.11);
				box-sizing: border-box;
				background: #F3F3F3;
			}

			&:not(.timeline__item_active):hover {
				.timeline__year {
					color: #DAD3D3;
				}
			}

			&_active {
				.timeline__year {
					color: #171717;
					-webkit-text-stroke-color: #171717;
				}
			}
		}

		&__year {
			font-family: 'DidotNum';
			font-size: 56px;
			line-height: normal;
			// color: #DAD3D3;
			color: transparent;
			margin-bottom: 7px;
			// -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
			-webkit-text-stroke-width: 1px;
			-webkit-text-stroke-color: #DAD3D3;
			transition: color .5s ease, -webkit-text-stroke-color .5s ease;
			text-transform: uppercase;
		}

		&__desc {
			font-family: 'Museo';
			font-size: 14px;
			line-height: 24px;
			letter-spacing: 0.034em;
			font-weight: 100;

			color: #171717;
		}
	}

	@media(max-width: 1200px) {
		.story {

			&__title {
				margin-bottom: 5px;
			}

			&__subtitle {
				word-spacing: 2.4px;
				letter-spacing: 0.02em;
				font-size: 13px;

			}

			&__timeline {
				padding-top: 44px;
			}
		}
		.timeline {

			&:before {
				top: 44px;
			}

			&__wrapper {
				// padding-left: 6%;
			}

			&__item {
				max-width: 387px;
				padding-bottom: 56px;

				&:nth-child(1) {
					padding-left: 40px;
					max-width: 261px;
				}
			}
		}

		/deep/ .slick-slide {
			width: 390px;
		}
	}

	@media(max-width: 960px) {
		.story {
			&__title {
				font-size: 29px;
				margin-bottom: 8px;
			}

			&__subtitle {
				font-size: 12px;
				letter-spacing: 0;
				word-spacing: 0;
				margin-bottom: 33px;
			}
		}

		.timeline {
			&__wrapper {
				// padding-left: 20%;

			}

			&__item {
				max-width: 351px;
			}
		}

		/deep/ .slick-slide {
			width: 362px;
		}
	}

	@media(max-width: 650px) {
		.story {
			&__title {
				letter-spacing: -0.2px;
				margin-bottom: 7px;
			}

			&__subtitle {
				font-size: 14px;
				letter-spacing: 0.03em;
				margin-bottom: 32px;
			}
		}
		/deep/ .slider__slide {
			height: 224px;
		}

		.timeline {
			&__year {
				font-size: 38px;
			}

			&__item {
				padding-left: 56px;
				max-width: 257px;

				&:nth-child(1) {
					padding-left: 32px;
				}
			}
		}
	}

</style>