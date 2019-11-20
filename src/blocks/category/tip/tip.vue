<template lang="pug">	
	.tip
		slick.tip__slider(ref="slick", :options="slickOptions")
			.tip__label(v-html="$lang.tip.text1")
			//router-link.tip__label(v-html="tipText1" :to="'#'")
			//router-link.tip__label(v-html="tipText2" :to="'#'")
</template>

<script>
	import Lang from '../../../components/lang.vue';
	import Slick from 'vue-slick';
	import subscribeBox from '@/assets/uploads/subscribe-box.jpg';

	export default {
		name: 'category-tip',
		data: function(){
			return {
				subscribeBox,
				tipText1:"Free shipping",
				tipText2:"Christmas sale and discounts",
				slickOptions: {
					slidesToShow: 1,
					centerMode: false,
					variableWidth: false,
					arrows: false,
					dots: false,
					autoplay: true,
					fade: true,
					autoplaySpeed: 5000
				},
			}
		},
		components: {
			'slick':Slick
		},
		props: {
		},
		mixins: [Lang],
		mounted() {
		},
		methods:{
			fetchData() {
				
			}
		},
		watch: {
			'$route' () {
				this.fetchData();
			}
		}
	}
</script>

<style lang="scss">
	@import '@/helpers/sass/mixins.scss';
	@import '@/helpers/sass/kit.scss';

	.tip {
		width: calc(100% - 16px);
		background: #E5E5E5;
		text-align: center;
		@include kit('h6 300', 'dark');
		text-transform: none;
		margin: auto;
		margin-bottom: 12px;
		position: relative;
		z-index: 2;

		&::before {
			content: "";
			display: inline-block;
			vertical-align: middle;
			width: 0;
			height: 100%;
		}

		&__slider {
			height: 27px !important;
		}

		&__label {
			display: inline-block;
			vertical-align: middle;

			/*&::after {
				content: "";
				vertical-align: middle;
				display: inline-block;
				background: url(../../../assets/img/arrow-right.png) no-repeat;
				background-size: cover;
				background-position: center;
				width: 5px;
				height: 8px;
				margin-left: 15px;
			}*/
		}

		span {
			position: relative;
			display: inline-block;

			&:after {
				content: "";
				display: block;
				position: absolute;
				left:0;
				bottom: -2px;
				width: 100%;
				height: 1px;
				background: #0f0f0f;
			}
		}
	}

	@media screen and (max-width: 960px) {
		.tip {
			width: calc(100% - 12px);
		}
	}

	@media screen and (max-width: 650px) {
		.tip {
			width: 100%;

			&__label {
				vertical-align: top;
				margin-top: -2px;
			}
		}
	}
</style>