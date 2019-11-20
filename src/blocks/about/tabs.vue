<template lang="pug">
    .tabs
        .tabs__head
            //- button.tabs__btn( v-for="(tab, index) in tabs" :class="{tabs__btn_active: active == index}" @click="active = index") {{ tab.title}}
            button.tabs__btn(:class="{tabs__btn_active: active === 0}" @click="active = 0;") Проектное бюро
            button.tabs__btn(:class="{tabs__btn_active: active === 1}" @click="active = 1;") МЕБЕЛЬ
            button.tabs__btn(:class="{tabs__btn_active: active === 2}" @click="active = 2;") Текстиль
            button.tabs__btn(:class="{tabs__btn_active: active === 3}" @click="active = 3;") Розничная сеть
            v-select(:options="selectOptions", v-model="selected", :value="selected")
        .tabs__body( )
            .tabs__tab( v-for="(tab, index) in tabs" :key="index" :class="{tabs__tab_active: (active == index && !mobile) || (selected == selectOptions[index] && mobile)}")
                .container(v-if="tab.length")
                    swiper.slider(:options="swiperOptions" ref="mySwiper" @slideChange="callback")
                        swiper-slide( v-for="(slide, ind) in tab" :key="ind")  
                            .slider__img(:style="{backgroundImage: 'url(' + slide.image.url + ')'}")
                        //- swiper-slide
                        //-     .slider__img(:style="{backgroundImage: 'url(' + require('@/assets/uploads/slide-2.jpg') + ')'}")
                    .content
                        .content__status
                            .content__page {{ (activeSlide+1) }}
                            .content__divider
                            .content__count {{ tab.length }}
                        .content__description
                            swiper(:options="swiperOptionsContent" ref="mySwiperContent") 
                                swiper-slide( v-for="(slide, k) in tab" :key="k")
                                    .content__title {{ slide.title }}
                                    .content__text( v-html="slide.info") 
                                    .content__store {{ slide.store.name }}
                                    .content__address {{ slide.store.address }}
                            //- swiper-slide
                            //-     .content__title We create a strong team for better results.
                            //-     .content__text Ralph Lauren Corporation is a global leader in the design, marketing, and distribution of premium lifestyle products, including apparel, accessories, home furnishings.
                            //-     .content__store RALPH LAUREN HOME
                            //-     .content__address Kyiv, st. Shpaka 2
                        .content__arrows
                            button.arrow.arrow_left(:class="{'arrow_disabled': activeSlide <= 0}" @click="prev")
                            button.arrow.arrow_right(:class="{'arrow_disabled': activeSlide >= 1}" @click="next")
            //- .tabs__tab(:class="{tabs__tab_active: active === 1}")
            //- .tabs__tab(:class="{tabs__tab_active: active === 2}")
            //- .tabs__tab(:class="{tabs__tab_active: active === 3}")
</template>

<script>
	import Vue from 'vue';

	import $store from '../../components/store';
	import $api from '../../components/api.js';
    import Lang from '../../components/lang.vue';
    
    import 'swiper/dist/css/swiper.css';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import vSelect from 'vue-select';

	export default {
		name: 'about-tabs',
		data: function(){
			return {
                active: 0,
                activeSlide: 0,
                swiperOptions: {
                    slidesPerView: 'auto',
                    spaceBetween: 0,
                    loop: false,
                    slidesPerColumn: 1
                },
                swiperOptionsContent: {
                    effect: "fade",
                    autoHeight: true,
                    loop: false,
                    fadeEffect: { crossFade: true },
                    allowTouchMove: false
                },
                selectOptions: [
                    'Проектное бюро',
                    'МЕБЕЛЬ',
                    'Текстиль',
                    'Розничная сеть'
                ],
                selected: 'Проектное бюро',
                mobile: window.innerWidth < 650
			}
        },
        props: {
            tabs: Object
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper[0].swiper;
            },
            swiperContent() {
                return this.$refs.mySwiperContent[0].swiper; 
            }
        },
        components: {
            swiper,
            swiperSlide,
            'v-select': vSelect
        },
        methods: {
            prev() {
                this.swiperContent.slidePrev();
                this.swiper.slidePrev();
            },
            next() {
                console.log('i work');
                this.swiper.slideNext();
                this.swiperContent.slideNext();
            },
            callback() {
                let slide = this.swiper.realIndex;
                this.activeSlide = slide;
                this.swiperContent.slideTo(slide);
            },
            getWidth() {
                window.innerWidth < 650 ? this.mobile = true : this.mobile = false; 
                
            }
        },
		mixins: [Lang],
        updated() {
            // this.$refs.mySwiper.swiper.update();
            // this.$refs.mySwiperContent.swiper.update();
            this.swiper.update();
            this.swiperContent.update();
            this.swiper.updateSlides();
            this.swiperContent.updateSlides();
            // console.log(this.slider);
            // console.log(this.slider2);
            // console.log(this.slider.length);
            // console.log(this.slider2.length);
            console.log(this.tabs);
            console.log(this.selected);
        },
        mounted() {
            // console.log(this.$refs.mySwiperContent);
            // console.log(this.$refs.mySwiper.realIndex);
            // console.log(this.$refs.mySwiper);
            // console.log(this.$refs.mySwiperContent.realIndex);
            // console.log(this.$refs.mySwiperContent.swiper.realIndex);
            console.log(this.$refs.mySwiper);
            console.log(this.$refs.mySwiperContent);
            window.addEventListener('resize', this.getWidth());
            console.log('sellllllll' + this.selectOptions[0]);
        },
        watch: {
            active() {
                this.$nextTick(function(){
                    console.log('we have changes! ATTENTION!'); 
                    this.swiper.update();
                    this.swiperContent.update();
                    this.swiper.updateSlides();
                    this.swiperContent.updateSlides();
                })
               
            },
            selected() {
                console.log(this.selected);
            }
        }
	}
</script>

<style lang="scss" scoped>
    @import '@/helpers/sass/kit.scss';

    .tabs {
        &__head {
            text-align: center;
            padding-bottom: 12px;
        }

        &__btn {
            display: inline-block;
            vertical-align: top;
            font: 300 10px/12px 'Museo', Arial, Helvetica, sans-serif;
            color: #0D0D0D;
            opacity: .55;
            text-transform: uppercase;
            letter-spacing: .25px;
            margin: 0 20px;
            transition: opacity .5s ease;

            &_active {
                opacity: 1;
            }
        }

        &__tab {
            display: none;

            &_active {
                display: block;
            }
        }
    }

    .v-select {
        display: none;
    }

    .slider {
        height: 726px;

        // /deep/ .swiper-slide {
        //     // width: auto;
        // }

        &__img {
            height: 100%;
            width: 100%;
            transition: transform .5s ease;
            background-size: cover;
            background-position: center;
        }

        // /deep/ .swiper-slide-active + .swiper-slide .slider__img {
        //     // transform: translate3d(-98px, 0, 1px);
        // }
    }

    .container {
        position: relative;
    }

    .content {
        position: absolute;
        height: 100%;
        width: 390px;
        right: 98px;
        top: 0;
        z-index: 1;
        background-color: #F3F3F3;

        &__status {
            position: absolute;
            top: 55px;
            left: 0;
            padding: 0 43px;
            font: 300 10px/12px 'Museo', Arial, Helvetica, sans-serif;
            letter-spacing: .5px;
        }

        &__page {
            color: #171717;
            display: inline-block;
            vertical-align: middle;
        }

        &__divider {
            display: inline-block;
            vertical-align: middle;
            margin: 0 15px;
            width: 64px;
            height: 1px;
            background-color: rgba(196, 196, 196, 0.24);
        }

        &__count {
            display: inline-block;
            vertical-align: middle;
            color: rgba(23, 23, 23, 0.34);
        }

        &__arrows {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 0 43px 49px;
        }

        &__description {
            position: absolute;
            width: 100%;
            bottom: 141px;
            left: 0;
            padding: 0 68px 0 43px;
        }

        &__title {
            font: 24px/30px 'Didot', Arial, Helvetica, sans-serif;
            color: #171717;
            max-width: 223px;
        }

        &__text {
            font: 100 14px/24px 'Museo', Arial, Helvetica, sans-serif;
            color: #171717;
            letter-spacing: .45px;
            margin-top: 22px;
        }

        &__store {
            margin-top: 66px;
            font: 500 11px/17px 'Museo', Arial, Helvetica, sans-serif;
            color: #0D0D0D;
            letter-spacing: .4px;
            text-transform: uppercase;
        }

        &__address {
            margin-top: 3px;
            font: 300 11px/17px 'Museo', Arial, Helvetica, sans-serif;
            color: rgba(#0D0D0D, .7);
            letter-spacing: .4px;
        }
    }

    .arrow {
        width: 53px;
        height: 53px;
        border-radius: 50%;
        border: 1px solid rgba(54, 54, 54, 0.06);
        display: inline-block;
        vertical-align: top;
        margin-right: 15px;
        transition: opacity .5s ease;

        &_left {
            background: url('../../assets/img/arr-left.svg') no-repeat center center;
        }

        &_right {
            background: url('../../assets/img/arr-right.svg') no-repeat center center;
        }

        &_disabled {
            cursor: default;
            opacity: .75;
        }
    }

    @media(max-width: 1200px) {
        .tabs {

            &__head {
                padding-bottom: 23px;
            }

            &__btn {
                margin: 0 24px;
            }
        }

        .content {
            width: 363px;
            right: 40px;

            &__status {
                top: 42px;
            }

            &__text {
                margin-top: 50px;
            }

            &__description {
                bottom: 132px;
            }

            &__arrows {
                padding: 0px 43px 41px;
            }

            &__divider {
                margin: 0 17px 0 15px;
            }
        }

        .slider {
            height: 638px;
        }

        .swiper-wrapper {
            height: 297px !important;
        }
    }

    @media(max-width:960px) {
        .slider {
            height: 576px;
        }

        .content{
            right: 31px;

            &__status {
                top: 31px;
            }

            &__arrows {
                padding: 0px 34px 32px;
            }

            &__description {
                bottom: 88px;
                padding: 0 50px 0 33px;
            }
        }
    }

    @media(max-width:650px) {
        .content {
            position: relative;
            right: auto;
            left: auto;
            top: auto;
            bottom: auto;
            width: 91.46%;
            margin: 0 auto;
            height: 455px;

            &__status {
                top: 44px;
                left: 50%;
                transform: translateX(-50%);
                padding: 0;
            }

            &__description {
                bottom: 160px;
                padding: 0 23px;
            }

            &__title {
                margin-top: 0;
                margin-right: auto;
                margin-left: auto;
                text-align: center;
            }

            &__text {
                margin-top: 24px;
                text-align: center;
                max-width:295px;
                margin-right: auto;
                margin-left: auto;
            }

            &__store {
                margin-top: 0;
                text-align: center;
            }

            &__address {
                text-align: center;
            }

            &__arrows {
                text-align: center;
                padding-bottom: 51px;
            }
        }

        .slider {
            width: 91.46%;
            height: 201px;
            margin: 0 auto;
        }

        .tabs {
            &__btn {
                display: none;
            }
        }

        .v-select {
            display: block;
            width: 91.46%;
            margin: 0 auto;
            border-radius: 0;
            border: none;
            border-bottom: 1px solid #D6D6D6;
        }

        /deep/ .dropdown-toggle{
            border: none !important;
            padding-bottom: 0!important;
        }

        /deep/ .swiper-slide {
            width: 100%!important;
        }

        /deep/ .dropdown-menu {
            padding-top: 0!important;
            padding-bottom: 0!important;
            border-radius: 0!important;
            border: 0!important;
            li {
                font: 300 10px/20px 'Museo', Arial, Helvetica, sans-serif!important;
                color: #0D0D0D!important;
                opacity: .75!important;
                border-bottom: 1px solid #D6D6D6!important;
                text-transform: uppercase!important;
            }
        }

        /deep/ .open-indicator {
            &:before {
                border-width: 1px 1px 0 0!important;
                width: 8px!important;
                height: 8px!important;
            }
        }

        /deep/ .clear {
            visibility: hidden!important;
        }

        /deep/ .active a {
            background: #fff!important;
        }

        /deep/ .highlight {
            background-color: #fff!important;
            opacity: 1;
            color: #0D0D0D!important;

            a {
                background-color: #fff!important;
                color: #0D0D0D!important;

            }
            
            
        }

        /deep/ .listbox {
            max-height: auto!important;
        }

       

        /deep/ .selected-tag {
            font: 300 10px/20px 'Museo', Arial, Helvetica, sans-serif!important;
            color: #0D0D0D!important;
            text-transform: uppercase!important;
        }
    }

</style>