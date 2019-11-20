<template lang="pug">
    section.store
        .store__wrapper
            .slider
                swiper.slider__body(v-if="page.acf" ref="mySwiper" :options="swiperOptions")
                    swiper-slide.slider__slide(v-for="(card, index) in page.acf.gallery" :key="index" :style="{backgroundImage: 'url(' + card.sizes.large + ')'}")
                    div.slider__pagination(slot="pagination")
                button.slider__arrow.slider__arrow--left(@click="prev")
                    img(src="@/assets/img/store-slider-arrow.svg")
                button.slider__arrow.slider__arrow--right(@click="next")
                    img(src="@/assets/img/store-slider-arrow.svg")
            .store__content
                .store__info
                    h2.store__title(v-text="page.title ?page.title.rendered : ''")
                    .store__desc
                        //- p.store__name(v-text="page.title.rendered")
                        p.store__adress(v-text="page.acf ? page.acf.address : ''")
                        a(href="").store__map Open on map
                        .store__tel(v-if="page.acf")
                            a(v-for="(phone, index) in page.acf.phones" :key="index" :href="'tel:'+phone.phone" v-text="phone.phone")
                .store__location
                    GmapMap(
                        v-if="page.acf"
                        :center="getLatLng(page.acf.map_pin)"
                        :zoom="13"
                        ref="mapRef"
                        style="width: 100%; height: 100%"
                        v-bind:options="mapStyle")
                            GmapMarker(
                                :position="getLatLng(page.acf.map_pin)"
                                :clickable="true"
                                :draggable="false"
                                :icon="iconActive")
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
    name: 'BlockPoster',
    props: {
        page: Object
    },
    data: function(){
        return {
            swiperOptions: {
                slidesPerView: 1,
                slideToClickedSlide: true,
                pagination:{
                    el:'.slider__pagination',
                    clickable: true,
                }
            },
            icon: {
				path: 'M8.49965 0C3.81317 0 0 3.96381 0 8.83593C0 10.1068 0.250226 11.3201 0.743353 12.4426C2.8685 17.2767 6.943 22.3804 8.14144 23.8293C8.23123 23.9376 8.36213 24 8.49988 24C8.63764 24 8.76854 23.9376 8.85833 23.8293C10.0563 22.3806 14.1308 17.2771 16.2566 12.4426C16.75 11.3201 17 10.1068 17 8.83593C16.9995 3.96381 13.1864 0 8.49965 0ZM8.49965 13.4253C6.0652 13.4253 4.08442 11.3663 4.08442 8.83568C4.08442 6.30481 6.0652 4.24578 8.49965 4.24578C10.9341 4.24578 12.9149 6.30481 12.9149 8.83568C12.9151 11.3663 10.9343 13.4253 8.49965 13.4253Z',
				fillColor: '#0f0f0f',
				fillOpacity: .5,
				strokeOpacity: 0
			},
			iconActive: {
				path: 'M8.49965 0C3.81317 0 0 3.96381 0 8.83593C0 10.1068 0.250226 11.3201 0.743353 12.4426C2.8685 17.2767 6.943 22.3804 8.14144 23.8293C8.23123 23.9376 8.36213 24 8.49988 24C8.63764 24 8.76854 23.9376 8.85833 23.8293C10.0563 22.3806 14.1308 17.2771 16.2566 12.4426C16.75 11.3201 17 10.1068 17 8.83593C16.9995 3.96381 13.1864 0 8.49965 0ZM8.49965 13.4253C6.0652 13.4253 4.08442 11.3663 4.08442 8.83568C4.08442 6.30481 6.0652 4.24578 8.49965 4.24578C10.9341 4.24578 12.9149 6.30481 12.9149 8.83568C12.9151 11.3663 10.9343 13.4253 8.49965 13.4253Z',
				fillColor: '#0f0f0f',
				fillOpacity: 1,
				strokeOpacity: 0
            },
            mapStyle: {
					disableDefaultUI : true,
					styles:[
						{
							"featureType": "water",
							"elementType": "geometry",
							"stylers": [
								{
									"color": "#e9e9e9"
								},
								{
									"lightness": 17
								}
							]
						},
						{
							"featureType": "landscape",
							"elementType": "geometry",
							"stylers": [
								{
									"color": "#f5f5f5"
								},
								{
									"lightness": 20
								}
							]
						},
						{
							"featureType": "road.highway",
							"elementType": "geometry.fill",
							"stylers": [
								{
									"color": "#ffffff"
								},
								{
									"lightness": 17
								}
							]
						},
						{
							"featureType": "road.highway",
							"elementType": "geometry.stroke",
							"stylers": [
								{
									"color": "#ffffff"
								},
								{
									"lightness": 29
								},
								{
									"weight": 0.2
								}
							]
						},
						{
							"featureType": "road.arterial",
							"elementType": "geometry",
							"stylers": [
								{
									"color": "#ffffff"
								},
								{
									"lightness": 18
								}
							]
						},
						{
							"featureType": "road.local",
							"elementType": "geometry",
							"stylers": [
								{
									"color": "#ffffff"
								},
								{
									"lightness": 16
								}
							]
						},
						{
							"featureType": "poi",
							"elementType": "geometry",
							"stylers": [
								{
									"color": "#f5f5f5"
								},
								{
									"lightness": 21
								}
							]
						},
						{
							"featureType": "poi.park",
							"elementType": "geometry",
							"stylers": [
								{
									"color": "#dedede"
								},
								{
									"lightness": 21
								}
							]
						},
						{
							"elementType": "labels.text.stroke",
							"stylers": [
								{
									"visibility": "on"
								},
								{
									"color": "#ffffff"
								},
								{
									"lightness": 16
								}
							]
						},
						{
							"elementType": "labels.text.fill",
							"stylers": [
								{
									"saturation": 36
								},
								{
									"color": "#333333"
								},
								{
									"lightness": 40
								}
							]
						},
						{
							"elementType": "labels.icon",
							"stylers": [
								{
									"visibility": "off"
								}
							]
						},
						{
							"featureType": "transit",
							"elementType": "geometry",
							"stylers": [
								{
									"color": "#f2f2f2"
								},
								{
									"lightness": 19
								}
							]
						},
						{
							"featureType": "administrative",
							"elementType": "geometry.fill",
							"stylers": [
								{
									"color": "#fefefe"
								},
								{
									"lightness": 20
								}
							]
						},
						{
							"featureType": "administrative",
							"elementType": "geometry.stroke",
							"stylers": [
								{
									"color": "#fefefe"
								},
								{
									"lightness": 17
								},
								{
									"weight": 1.2
								}
							]
						}
					]
				},
            }
    },
    components: {
        swiper,
		swiperSlide
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper
        },
        swiperContent() {
            return this.$refs.mySwiperContent.swiper
        }
    },
    methods:{
        prev() {
            this.swiper.slidePrev();
            this.swiperContent.slidePrev();
        },
        next() {
            this.swiper.slideNext();
            this.swiperContent.slidePrev();
        },
        isActive(index) {
			if (this.activeAddress === -1) {
				return this.iconActive;
			} else {
				return index === this.activeAddress ? this.iconActive : this.icon;
			}
        },
        getLatLng(pin) {
            return {
                lat: -(-pin.lat),
                lng: -(-pin.lng)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    p,h1,h2,h3,h4,h5 {
        margin: 0;
        padding: 0;
    }

    .store {
        padding: 136px 0 0 0;

        &__wrapper {
            display: flex;
            width: 100%;
            padding: 0 8px;
            box-sizing: border-box;
        }

        &__content {
            height: 100%;
            width: 37%;
            display: flex;
            flex-direction: column;
        }

        &__info {
            height: 336px;
            padding: 43px 0 0 45px;
        }

        &__title {
            font-family: 'Didot';
            font-size: 32px;
            line-height: normal;
            margin-bottom: 26px;
            color: #0D0D0D;
        }

        &__desc {
            font-family: 'Museo';
            font-size: 11px;
            line-height: 17px;
            letter-spacing: 0.04em;
            color: #0D0D0D;
        }

        &__name {
            margin-bottom: 10px;
        }

        &__adress {
            opacity: 0.7;
            margin-bottom: 10px;
        }

        &__map {
            display: inline-block;
            text-decoration: underline;
            opacity: 0.7;
            margin-bottom: 36px;
        }

        &__tel {
            opacity: 0.7;

            a {
                margin-right: 10px;
            }
        }

        &__location {
            height: 336px;
        }

    }

    .slider {
        width: 63%;
        height: 672px;
        position: relative;
        margin: 0;

        &__body {
            position: relative;
            // height: 672px;
            height: 100%;
        }

        &__slide {
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
        }

        &__pagination {
            position: absolute;
            z-index: 2;
            bottom: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &__slide {
            width: 100%;
            
            img {
                width: 100%;
                height: 100%;
            }
        }

        &__arrow {
            position: absolute;
            width: 53px;
            height: 53px;
            border-radius: 50%;
            border: 1px solid #fff;
            top: calc(50% - 26px);
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;

            &--left {
                left: 40px;

                img {
                    transform: scale(-1, 1);
                }
            }

            &--right {
                right: 40px;
            }
        }
    }

    /deep/ .swiper-pagination-bullet {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);

        &-active {
            width: 12px;
            height: 12px;
            border: 1px solid #fff;
            box-sizing: border-box;
            background: transparent;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;

            &:before {
                content: '';
                position: absolute;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: #fff;
            }
        }
    }

    @media(max-width:1200px) {
        .store {
            padding-top: 60px;

            &__content {
                width: 44%;
            }

            &__location {
                height: 358px;
            }

            &__info {
                height: 349px;
                padding: 48px 0 0 48px;
            }
        }

        .slider {
            width: 56%;
            height: 707px;

            &__body {
                height: 100%;
            }
        }
    }

    @media(max-width:960px){
        .store {
            padding-top: 59px;

            &__wrapper {
                flex-direction: column;
            }

            &__content {
                width: 100%;
                height: 454px;
                flex-direction: row;
            }

            &__info {
                width: 50%;
                height: 100%;
                order: 2;
            }

            &__location {
                width: 50%;
                height: 100%;
                order: 1;
            }

            &__title {
                font-size: 28px;
                margin-bottom: 32px;
            }

            &__map {
                margin-bottom: 32px;
            }
        }

        .slider {
            width: 100%;
            height: 512px;

            &__body {
                width: 100%;
            }

            &__slide {
                width: 100% !important;
            }
        }
    }

    @media(max-width:650px) {
        .store {
            padding-top: 44px;
            padding-bottom: 767px;

            &__wrapper {
                padding: 0;
            }

            &__content {
                flex-direction: column;
                height: auto;
            }

            &__info {
                order: 1;
                height: auto;
                width: 100%;
                padding: 48px;
            }

            &__title {
                text-align: center;
            }

            &__name {
                text-align: center;
            }

            &__adress {
                text-align: center;
            }

            &__map {
                text-align: center;
                display: block;
            }

            &__tel {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                a {
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }

            &__location {
                order: 2;
                width: 100%;
                height: 281px;
            }
        }

        .slider {
            height: 334px;

            &__arrow {
                &--left{
                    left:16px;
                }

                &--right{
                    right: 16px;
                }
            }

            &__pagination {
                bottom: 16px;
            }
        }
    }
</style>


