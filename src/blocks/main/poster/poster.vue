<template lang="pug">
	.poster(ref="poster")
		slick.poster__slider(ref="slick", :options="slickOptions" @init="handleInit" v-if="slider")
			.poster__slide(v-for="(card, index) in slider" :style="{ backgroundImage: 'url(' + card.image.url + ')' }" :key="index")
				.poster__inner
					h1.h1.poster__h1 {{ card.text }}
					.poster__link
						router-link(:to="getUrl((lang === langDefault ? '' : '/'+lang) + card.url)") {{ $lang.poster.show_more }}
				pin(v-for="(pin, i) in card.pins" :key="i" :style="{top: pin.top, left: pin.left}" v-bind:brand="pin.name" v-bind:name="pin.description" v-bind:price="pin.price + ' ' + $lang.product.uah" v-bind:url="(lang === langDefault ? '' : '/'+lang) + pin.link")
				//- pin(:style="{top:'39%', left:'10%'}"  v-bind:brand="'Ralph Lauren Home'" v-bind:name="'Anette Floor Lamp'" v-bind:price="'32 395 ' + $lang.product.uah")
			//- .poster__slide(:style="{ backgroundImage: `url('${slide2}')` }")
			//- 	.poster__inner
			//- 		h1.h1.poster__h1 Shop Ralph Lauren Home
			//- 		.poster__link
			//- 			router-link(to="/new-in/") {{ $lang.poster.show_more }}
			//- 	pin(:style="{top:'65%', left:'22%'}" v-bind:brand="'Ralph Lauren Home'" v-bind:name="'Durban Large Nut Bowl'" v-bind:price="'6380 ' + $lang.product.uah" v-bind:url="'/'+ (lang === langDefault ? '' : lang + '/') + 'tabletop/table-accents/durban-large-nut-bowl-347'")
			//- 	pin(:style="{top:'37%', left:'42%'}" v-bind:brand="'Ralph Lauren Home'" v-bind:name="'Greenwich decanter'" v-bind:price="'8295 ' + $lang.product.uah" v-bind:url="'/'+ (lang === langDefault ? '' : lang + '/') + 'tabletop/glassware/greenwich-decanter-382'")
			//- 	pin(:style="{top:'69%', left:'62%'}" v-bind:brand="'Ralph Lauren Home'" v-bind:name="'Greenwich dof-pair'" v-bind:price="'4040 ' + $lang.product.uah" v-bind:url="'/'+ (lang === langDefault ? '' : lang + '/') + 'tabletop/glassware/greenwich-dof-pair-383'")
</template>

<script>
	import Lang from '../../../components/lang.vue';
	import Pin from '../../../blocks/includes/pin/pin.vue';
	import slide1 from '@/assets/uploads/slide-1.jpg';
	import slide2 from '@/assets/uploads/slide-2.jpg';

	import Slick from 'vue-slick';
	export default {
		name: 'main-poster',
		data: function(){
			return {
				texts_email: 'Электронная почта',
				texts_button: 'Попробовать',
				slickOptions: {
					arrows: false,
					dots: true,
					autoplay: true,
					autoplaySpeed: 4000,
					initialSlide: 1,
					fade:true,
					customPaging : function() {
						return '<svg class="dot" width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" fill="none" stroke="#FFFFFF" /></svg>';
					}
				},
				slide1: slide1,
				slide2: slide2,
				langDefault: window.config.langDefault
			}
		},
		components: {
			Slick,
			'pin':Pin
		},
		props: {
			tag:String,
			title:String,
			text:String,
			image:String,
			slider: {
				type: Array
			}
		},
		mixins: [Lang],
		mounted() {
			let $this = this;
			this.fetchData();
			this.$nextTick(function() {
				if (window.innerWidth <= 1200) {
					$this.setPoster();
				}
			});

			// if (window.innerWidth <= 1200) {
			// 	window.addEventListener('orientationchange', $this.orientationHandler, false);
			// }
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
			handleInit(event, slick) {
				slick.goTo(0);
			},
			orientationHandler() {
				this.setPoster();
			},
			setPoster() {
				this.$refs.poster.style.height = this.$refs.poster.offsetHeight+'px';
			},
			getUrl(url) {
				return url;
			}
		},
		beforeDestroy() {
			let $this = this;
			// window.removeEventListener('orientationchange', $this.orientationHandler, false);
		},
		watch: {
			'$route' () {
				this.fetchData();
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/kit.scss';
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
		opacity: 0
	}

	.poster {
		position: relative;
		overflow: hidden;
		font-size: 0;
		width: 100%;
		height: 70vh;
		min-height: 682px;
		background: #888;

		&__inner {
			display: inline-block;
			vertical-align: middle;
			padding: 0 20px;
		}

		&__slider {
			width: 100%;
			height: 100%;
		}
		&__slide {
			min-width: 100vw;
			height: 100%;
			position: relative;
			display: block;
			float: left;
			text-align: center;
			background-repeat: no-repeat;
			background-size: auto 100%;
			background-position: center center;
			background: #111;
			color:#fff;
			padding-top: 136px;
			background-size: cover !important;
    		background-position: center center !important;

			&:before {
				content:"";
				display: inline-block;
				vertical-align: middle;
				width: 0;
				height: 100%;
			}

			&:after {
				content: "";
				width: 100%;
				height: 100%;
				position: absolute;
				left:0;
				top:0;
				background: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 19.1%, rgba(0, 0, 0, 0.1) 100%);
			}
		}
		&__h1 {
			@include kit('h1', 'white');
			width: 567px;
			display: inline-block;
			vertical-align: middle;
			position: relative;
    		bottom: 21px;
			z-index: 10;
			bottom: 11px;
    		line-height: 72px;

			/deep/ strong {
				color: #ff821d;
			}
		}
		&__link {
			width: 100%;
			text-align: center;
			position: absolute;
			left:0;
			bottom:43px;
			z-index: 10;
			padding-right: 9px;

			a {
				@include ui('link', 'white');
			}
		}
	}

	/deep/ .slick-dots {
		width: auto;
		list-style: none;
		position: absolute;
		right: 16px;
		bottom: 35px;
		z-index: 10;
		
		li {
			width: 12px;
			height: 12px;
			border-radius: 50%;
			transition: all 1s ease;
			// border: 1px solid rgba(255, 255, 255, 0);
			display: inline-block;
			margin-right: 6px;
			position: relative;
			box-sizing: border-box;
			cursor: pointer;

			.dot {
				width: 100%;
				height: 100%;
				position: absolute;
				top: -1px;
				left: -1px;

				circle {
					stroke-dasharray: 38;
					stroke-dashoffset: 38;
				}
			}

			&::before {
				content: "";
				width: 6px;
				height: 6px;
				background: #fff;
				border-radius: 50%;
				position: absolute;
				left:2px;
				top:2px;
			}
			&.slick-active {
				// border: 1px solid rgba(255, 255, 255, 1.0);

				.dot {
					circle {
						transition: stroke-dashoffset 4.4s linear;
						stroke-dashoffset: 0;
					}
				}
			}
		}
	}

	@media screen and (max-width: 1200px) {
		.poster {
			min-height: 500px;
			height: 590px;

			&__inner {
				margin-top: -20px;;
			}

			&__link {
				bottom: 34px;
				padding-right: 2px;
			}

			&__slide {
				padding-top: 72px;
			}

			&__h1 {
				font-size: 56px;
			}
		}

		/deep/ .slick-dots {
			bottom: 33px;
			right: 15px;

			li {
				margin-right: 5px;
			}
		}

		.pin-box {
			display: none;
		}
	}

	@media screen and (max-width: 850px) {
		.poster {
			height: 640px;

			&__h1 {
				letter-spacing: -.02em;
				line-height: 60px;
				bottom: 17px;
				font-size: 50px;
			}

			&__inner {
				margin-top: -3px;
			}
		}
	}

	@media screen and (max-width: 600px) {
		.poster {
			height: 100vh;
			height: calc(var(--vh, 1vh) * 100);
			transition: all .2s linear;
			  
			&__slide {
				padding-top: 3px;
			}

			&__h1 {
				width: 100%;
				bottom: 0;
				font-size: 48px;
				line-height: 52px;
			}

			&__link {
				position: relative;
				bottom: 0;
				margin-top: 38px;
			}
		}

		/deep/ .slick-dots {
			width: 100%;
			right: 0;
			text-align: center;
			bottom: 19px;
		}
	}

</style>
