<template lang="pug">
    .brands
        .brands__head
            .brands__title {{ brands.title }}
            .brands__subtitle {{ brands.subtitle }}
        .brands__body
            .brands__slider-container.brands__slider-container_with-bg
                swiper.slider(ref="mySwiper" :options="swiperOptions" @slideChange="onSlide")
                    swiper-slide.card(:class="{'card_active': activeSlide === 0}")
                        .card__outer(@click="setActive(0)")
                            .card__bg(:style="{backgroundImage: 'url(' + require('@/assets/uploads/c-slide-2.jpg') + ')'}")
                            .card__inner
                                img.card__logo.card__logo_dark(src="@/assets/uploads/about_logo_1.png")
                                //- img.card__logo.card__logo_light(src="@/assets/uploads/about_logo_1_light.svg")
                    swiper-slide.card(:class="{'card_active': activeSlide === 1}")
                        .card__outer(@click="setActive(1)")
                            .card__bg(:style="{backgroundImage: 'url(' + require('@/assets/uploads/c-slide-2.jpg') + ')'}")
                            .card__inner
                                img.card__logo.card__logo_dark(src="@/assets/uploads/about_logo_1.png")
                                img.card__logo.card__logo_light(src="@/assets/uploads/about_logo_1_light.svg")
                    swiper-slide.card(:class="{'card_active': activeSlide === 2}")
                        .card__outer(@click="setActive(2)")
                            .card__bg(:style="{backgroundImage: 'url(' + require('@/assets/uploads/c-slide-2.jpg') + ')'}")
                            .card__inner
                                img.card__logo.card__logo_dark(src="@/assets/uploads/about_logo_1.png")
                                img.card__logo.card__logo_light(src="@/assets/uploads/about_logo_1_light.svg")
                    swiper-slide.card(:class="{'card_active': activeSlide === 3}")
                        .card__outer(@click="setActive(3)")
                            .card__bg(:style="{backgroundImage: 'url(' + require('@/assets/uploads/c-slide-2.jpg') + ')'}")
                            .card__inner
                                img.card__logo.card__logo_dark(src="@/assets/uploads/about_logo_1.png")
                                img.card__logo.card__logo_light(src="@/assets/uploads/about_logo_1_light.svg")
                    swiper-slide.card(:class="{'card_active': activeSlide === 4}")
                        .card__outer(@click="setActive(4)")
                            .card__bg(:style="{backgroundImage: 'url(' + require('@/assets/uploads/c-slide-2.jpg') + ')'}")
                            .card__inner
                                img.card__logo.card__logo_dark(src="@/assets/uploads/about_logo_1.png")
                                img.card__logo.card__logo_light(src="@/assets/uploads/about_logo_1_light.svg")
                    swiper-slide.card(:class="{'card_active': activeSlide === 5}")
                        .card__outer(@click="setActive(5)")
                            .card__bg(:style="{backgroundImage: 'url(' + require('@/assets/uploads/c-slide-2.jpg') + ')'}")
                            .card__inner
                                img.card__logo.card__logo_dark(src="@/assets/uploads/about_logo_1.png")
                                img.card__logo.card__logo_light(src="@/assets/uploads/about_logo_1_light.svg")
                button.arrow.arrow_left(@click="prev")
                button.arrow.arrow_right(@click="next")
            .brands__content
                .brands__slider-container
                    swiper.content(ref="mySwiperContent" :options="swiperOptionsContent")
                        swiper-slide.item
                            .item__content
                                .item__title Visual Comfort & Co.
                                .item__text
                                    p Ralph Lauren Corporation is a global leader in the design, marketing, and distribution of premium lifestyle products, including apparel, accessories, home furnishings, and other licensed product categories. For five decades, our long-standing reputation and distinctive image have been consistently developed across an expanding number of products, brands, sales channels, and international markets. We believe that our global reach, breadth of product offerings, and multichannel distribution are unique among luxury and apparel companies.
                                    p Ralph Lauren Corporation is a global leader in the design, marketing, and distribution of premium lifestyle products, including apparel, accessories, home furnishings, and other licensed product categories.
                                router-link.item__link(to="#") VIEW PRODUCT
                            .item__images
                                .item__image(:style="{backgroundImage: 'url(' + require('@/assets/uploads/c-slide-3.jpg') + ')'}")
                                .item__image(:style="{backgroundImage: 'url(' + require('@/assets/uploads/c-slide-2.jpg') + ')'}")
                        swiper-slide.item
                            .item__content
                                .item__title Visual Comfort & Co.
                                .item__text
                                    p Ralph Lauren Corporation is a global leader in the design, marketing, and distribution of premium lifestyle products, including apparel, accessories, home furnishings, and other licensed product categories. For five decades, our long-standing reputation and distinctive image have been consistently developed across an expanding number of products, brands, sales channels, and international markets. We believe that our global reach, breadth of product offerings, and multichannel distribution are unique among luxury and apparel companies.
                                    p Ralph Lauren Corporation is a global leader in the design, marketing, and distribution of premium lifestyle products, including apparel, accessories, home furnishings, and other licensed product categories.
                                router-link.item__link(to="#") VIEW PRODUCT
                            .item__images
                                .item__image(:style="{backgroundImage: 'url(' + require('@/assets/uploads/c-slide-3.jpg') + ')'}")
                                .item__image(:style="{backgroundImage: 'url(' + require('@/assets/uploads/c-slide-2.jpg') + ')'}")
                        swiper-slide.item
                            .item__content
                                .item__title Visual Comfort & Co.
                                .item__text
                                    p Ralph Lauren Corporation is a global leader in the design, marketing, and distribution of premium lifestyle products, including apparel, accessories, home furnishings, and other licensed product categories. For five decades, our long-standing reputation and distinctive image have been consistently developed across an expanding number of products, brands, sales channels, and international markets. We believe that our global reach, breadth of product offerings, and multichannel distribution are unique among luxury and apparel companies.
                                    p Ralph Lauren Corporation is a global leader in the design, marketing, and distribution of premium lifestyle products, including apparel, accessories, home furnishings, and other licensed product categories.
                                router-link.item__link(to="#") VIEW PRODUCT
                            .item__images
                                .item__image(:style="{backgroundImage: 'url(' + require('@/assets/uploads/c-slide-3.jpg') + ')'}")
                                .item__image(:style="{backgroundImage: 'url(' + require('@/assets/uploads/c-slide-2.jpg') + ')'}")
                        swiper-slide.item
                            .item__content
                                .item__title Visual Comfort & Co.
                                .item__text
                                    p Ralph Lauren Corporation is a global leader in the design, marketing, and distribution of premium lifestyle products, including apparel, accessories, home furnishings, and other licensed product categories. For five decades, our long-standing reputation and distinctive image have been consistently developed across an expanding number of products, brands, sales channels, and international markets. We believe that our global reach, breadth of product offerings, and multichannel distribution are unique among luxury and apparel companies.
                                    p Ralph Lauren Corporation is a global leader in the design, marketing, and distribution of premium lifestyle products, including apparel, accessories, home furnishings, and other licensed product categories.
                                router-link.item__link(to="#") VIEW PRODUCT
                            .item__images
                                .item__image(:style="{backgroundImage: 'url(' + require('@/assets/uploads/c-slide-3.jpg') + ')'}")
                                .item__image(:style="{backgroundImage: 'url(' + require('@/assets/uploads/c-slide-2.jpg') + ')'}")
                        swiper-slide.item
                            .item__content
                                .item__title Visual Comfort & Co.
                                .item__text
                                    p Ralph Lauren Corporation is a global leader in the design, marketing, and distribution of premium lifestyle products, including apparel, accessories, home furnishings, and other licensed product categories. For five decades, our long-standing reputation and distinctive image have been consistently developed across an expanding number of products, brands, sales channels, and international markets. We believe that our global reach, breadth of product offerings, and multichannel distribution are unique among luxury and apparel companies.
                                    p Ralph Lauren Corporation is a global leader in the design, marketing, and distribution of premium lifestyle products, including apparel, accessories, home furnishings, and other licensed product categories.
                                router-link.item__link(to="#") VIEW PRODUCT
                            .item__images
                                .item__image(:style="{backgroundImage: 'url(' + require('@/assets/uploads/c-slide-3.jpg') + ')'}")
                                .item__image(:style="{backgroundImage: 'url(' + require('@/assets/uploads/c-slide-2.jpg') + ')'}")
                        swiper-slide.item
                            .item__content
                                .item__title Visual Comfort & Co.
                                .item__text
                                    p Ralph Lauren Corporation is a global leader in the design, marketing, and distribution of premium lifestyle products, including apparel, accessories, home furnishings, and other licensed product categories. For five decades, our long-standing reputation and distinctive image have been consistently developed across an expanding number of products, brands, sales channels, and international markets. We believe that our global reach, breadth of product offerings, and multichannel distribution are unique among luxury and apparel companies.
                                    p Ralph Lauren Corporation is a global leader in the design, marketing, and distribution of premium lifestyle products, including apparel, accessories, home furnishings, and other licensed product categories.
                                router-link.item__link(to="#") VIEW PRODUCT
                            .item__images
                                .item__image(:style="{backgroundImage: 'url(' + require('@/assets/uploads/c-slide-3.jpg') + ')'}")
                                .item__image(:style="{backgroundImage: 'url(' + require('@/assets/uploads/c-slide-2.jpg') + ')'}")
</template>

<script>
	import Vue from 'vue';
	
	import $store from '../../components/store';
	import $api from '../../components/api.js';
    import Lang from '../../components/lang.vue';
    
    import 'swiper/dist/css/swiper.css';
	import { swiper, swiperSlide } from 'vue-awesome-swiper';

	export default {
		name: 'about-brands',
		data: function(){
			return {
                activeSlide: 0,

				swiperOptions: {
                    slidesPerView: 5,
                    // slideToClickedSlide: true,
                    // simulateTouch: false,
                    preventClicks: false,
                    preventClicksPropagation: false,
                    loop: false,
                    breakpoints: {
                        1024: {
                            slidesPerView: 4,
                        },
                        900: {
                            slidesPerView: 3
                        },
                        760: {
                            slidesPerView: 1,
                        }
                    }
                },
                swiperOptionsContent: {
                    slidesPerView: 1,
                    effect: 'fade',
                    fadeEffect: { crossFade: true },
                    allowTouchMove: false
                }
			}
        },
        props: {
            brands: Object
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            },
            swiperContent() {
                return this.$refs.mySwiperContent.swiper
            }
        },
        methods: {
            prev() {
                this.swiper.slidePrev();
                // this.swiperContent.slidePrev();
            },
            next() {
                this.swiper.slideNext();
                // this.swiperContent.slidePrev();
            },
            callback() {
                let slide = this.swiper.realIndex;
                this.activeSlide = slide;
                this.swiperContent.slideToLoop(slide);
            },
            setActive(i) {
                this.swiperContent.slideToLoop(i);
                this.activeSlide = i;
            },
            onSlide() {
                if (window.innerWidth < 690) {
                    let slide = this.swiper.realIndex;
                    this.activeSlide = slide;
                    this.swiperContent.slideToLoop(slide);
                }
            }
        },
        components: {
            swiper,
			swiperSlide
        },
		mixins: [Lang],
		mounted () {
            
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/kit.scss';

    .brands {
        margin-top: 93px;
        
        &__head {
            text-align: center;
        }

        &__body {
            padding: 0 11.52%;
        }

        &__title {
			font: 32px/40px 'Didot', Arial, Helvetica, sans-serif;
			color: #171717;
		}

		&__subtitle {
			font: 100 14px/24px 'Museo', Arial, Helvetica, sans-serif;
			color: #171717;
			letter-spacing: .4px;
			margin-top: 7px;
		}

        &__slider-container {
            position: relative;

            &_with-bg {
                /deep/ .swiper-container {
                    &:before {
                        content: "";
                        display: block;
                        width: 2px;
                        height: 100%;
                        position: absolute;
                        background-color: #fff;
                        top: 0;
                        left: 0;
                        z-index: 2;
                    }
                }
            }
        }

        &__content {
            margin-top: 79px;
        }

    }

    .slider {
        margin-top: 40px;

        /deep/ .swiper-slide {
            border: 1px solid #F3F3F3;
            border-right: none;

            &:after {
                content: "";
                display: block;
                padding-top: 80%;
            }
        }
    }

    .arrow {
        position: absolute;
        width: 53px;
        height: 53px;
        border-radius: 50%;
        border: 1px solid rgba(54, 54, 54, 0.06);
        top: calc(50% - 26px);
        z-index: 2;

        &_left {
            left: -83px;
            background: url('../../assets/img/left-arrow-key.svg') no-repeat center center;
        }

        &_right {
            right: -83px;
            background: url('../../assets/img/right-arrow-key.svg') no-repeat center center;
        }
    }

    .card {
        // width: 221px !important;
        // height: 177px;
        cursor: pointer;

        &__outer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            font-size: 0;
            text-align: center;

            &:before {
                content: "";
                display: inline-block;
                vertical-align: middle;
                height: 100%;
            }
        }

        &__inner {
            display: inline-block;
            vertical-align: middle;
            width: 71%;
            position: relative;
            height: 50%;
        }

        &__logo-container {
            max-height: 100%;
            max-width: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        &__logo {
            max-height: 100%;
            max-width: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            transition: opacity .5s ease, filter .5s ease;

            &_dark {
                opacity: 1;
            }

            &_light {
                opacity: 0;
            }
        }

        &__bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            transition: opacity .5s ease;
            opacity: 0;

            &:before {
                content: "";
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(23, 23, 23, 0.65);
            }
        }

        @media screen and (min-width: 1200px) {
            &:hover {
                .card__logo {
                    &_light {
                        // opacity: 1;
                        opacity: 0;
                    }

                    &_dark {
                        opacity: 1;
                        filter:invert(100%);
                    }
                }

                .card__bg {
                    opacity: 1;
                }
            }
        }

        &_active {
            .card__logo {
                &_light {
                    // opacity: 1;
                    opacity: 0;
                }

                &_dark {
                    opacity: 1;
                    filter:invert(100%);
                }
            }

            .card__bg {
                opacity: 1;
            }
        }


    }
    
    .item {
        font-size: 0;

        &__content {
            width: 53.06%;
            display: inline-block;
            vertical-align: top;
            padding-top: 71px;
        }

        &__images {
            width: 46.94%;
            display: inline-block;
            vertical-align: top;
            height: 492px;
            position: relative;
        }

        &__title {
            font: 24px/30px 'Didot', Arial, Helvetica, sans-serif;
            color: #262626;
        }

        &__text {
            font: 100 14px/24px 'Museo', Arial, Helvetica, sans-serif;
            color: #262626;
            letter-spacing: .47px;

            /deep/ p {
                margin: 23px 0;

                &:nth-child(1) {
                    margin-top: 18px;
                }
            }
        }

        &__image {
            position: absolute;
            background-size: cover;
            background-position: center;
            
            &:nth-child(1) {
                right: 110px;
                bottom: 0;
                width: 260px;
                height: 441px;
            }

            &:nth-child(2) {
                right: 0;
                top: 0;
                width: 331px;
                height: 454px
            }
        }

        &__link {
            text-transform: uppercase;
            font: 300 11px/13px 'Museo', Arial, Helvetica, sans-serif;
            color: #171717;
            margin-top: 9px;
            display: inline-block;
            border-bottom: 1px solid #171717;
            padding-bottom: 1px;
            transition: opacity .5s ease;
            letter-spacing: .8px;

            &:hover {
                opacity: .7;
            }
        }
    }

    @media(max-width:1200px) {
        .brands {
            margin-top: 72px;

            &__content {
                margin-top: 57px;
                // padding-left: 2.4%;
            }
        }

        .item {
            &__content {
                padding-top: 0;
                width: auto;
                max-width: 460px;
            }

            &__images {
                height: 290px;
                width: calc(100% - 460px);
                margin-top: 55px;
            }

            &__image {

                &:nth-child(1) {
                    width: 154px;
                    height: 260px;
                    right: 64px;
                }

                &:nth-child(2) {
                    width: 200px;
                    height: 272px;
                }

            }
        }

        .card {
            height: 177px;
        }

        /deep/ .arrow {
            &_left {
                left: -78px;
            }

            &_right {
                right: -78px;
            }
        }
    }

    @media screen and (max-width: 900px) {
        .brands {
            &__content {
                margin-top: 73px;
            }
        }

        .item {
            &__images {
                display: none;
            }

            &__content {
                width: 100%;
                max-width: 100%;
                text-align: center;
            }
        }
    }

    @media screen and (max-width: 760px) {
        .brands {
            &__body {
                padding: 0 16px;
            }

            &__content {
                margin-top: 109px;
            }
        }

        .arrow {
            top: calc(100% - -20px);

            &_left {
                left: 15%;
            }

            &_right {
                right: 15%;
            }
        }
    }

</style>