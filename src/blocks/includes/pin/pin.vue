<template lang="pug">
	router-link.pin-box(:style="position" :to="getUrl(url)")
		.pin(@mouseover="cardOpened = true")
		.card(:class="[cardOpened ? 'card_opened' : '']", @mouseleave="cardOpened = false")
			.card__brand {{ brand }}
			.card__name {{ name }}
			.card__price {{ price }}
</template>

<script>

	import Lang from '../../../components/lang.vue';

	export default {
		name: 'Pin',
		data:function(){
			return {
				cardOpened:false,
				langDefault: window.config.langDefault
			}
		},
		props: {
			position:{
				type:Object,
				default:function(){
					return {
						left:'0%',
						top:'0%'
					}
				}
			},
			brand: {
				type:String,
				default:''
			},
			name: {
				type:String,
				default:''
			},
			price: {
				type:String,
				default:''
			},
			url: {
				type: String,
				default: '#'
			}
		},
		mounted() {
			this.fetchData();
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
			getUrl(url) {
				return url;
			}
		},
		mixins: [Lang],
		watch: {
			'$route' () {
				this.fetchData();
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/kit.scss';
	.pin-box {
		position: absolute;
	}

	.pin {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 1px solid rgba(255, 255, 255, 0.5);
		position: absolute;
		top:0;
		left: 0;
		box-sizing: border-box;
		cursor: pointer;
		z-index: 10;

		&::before {
			content: "";
			position: absolute;
			left: 3px;
			top: 3px;
			width: 32px;
			height: 32px;
			border-radius: 50%;
			background: rgba(255, 255, 255, 0.8);
		}
	}

	.card {
		cursor: pointer;
		display: block;
		background: #0f0f0f;
		width: 188px;
		height: auto;
		min-height: 91px;
		padding: 16px;
		position: absolute;
		left: calc((188px/2 - 40px/2) * -1);
		top:-17px;
		text-align: center;
		transition: all 0.6s ease;
		pointer-events: none;
		opacity: 0;
		z-index: 10;

		&_opened {
			pointer-events: all;
			opacity: 1;
		}

		&__brand {
			@include kit('h6 700', 'white');
			letter-spacing: 0.04em;
			display: block;
			margin-bottom: 6px;
		}

		&__name {
			display: block;
			color: #fff;
			@include kit('h6 300', 'white');
			text-transform: none;
			margin-bottom: 13px;
		}

		&__price {
			@include kit('h6 300', 'white');
			letter-spacing: 0.08em;
			text-transform: none;
			letter-spacing: .4px;
		}
	}
</style>
