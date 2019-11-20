<template lang="pug">	
	.preloader(:class="[visible ? '' : 'preloader_hide']")
		.preloader__box
</template>

<script>
	import $store from '../../../components/store';

	export default {
		name: 'category-preloader',
		props: {
			visible:{
				type:Boolean,
				default:false
			}
		},
		mounted() {
		},
		computed: {
			// product() {
			// 	var data = $store.state.products.data[this.$route.params.deep];
			// 	//data ? data : api.getProduct(this.$route.params.deep);
			// 	return data == undefined ? {} : data;
			// },
		},
		methods:{
			// fetchData() {
				
			// }
		},
		watch: {
			'$route' () {
				// this.fetchData();
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/mixins.scss';
	@import '@/helpers/sass/kit.scss';

	.preloader {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 176px;
		left: 0px;
		z-index: 30;
		transform: translateZ(1px);
		opacity: 1;
		pointer-events: all;
		transition: all 0.3s ease;
		background: #fff;

		&:before {
			content:"";
			display: block;
			width: 100%;
			min-height: 596px;
			background: #F3F3F3;
		}

		&_hide {
			opacity: 0;
			pointer-events: none;
		}

		&__box {
			background: url(../../../assets/img/product-preloader.svg) no-repeat;
			background-size: 100% auto;
			background-position: center top;
			width: calc(100% - 48px * 2);
			height: 100%;
			position: absolute;
			left:48px;
			top:60px;
		}
	}

	@media only screen and (max-width: 1200px) {
		.preloader {
			width: 100%;
			left: 0;
			top: 127px;

			&__box {
				background: url(../../../assets/img/product-preloader-tablet.svg) no-repeat;
				background-size: 100% auto;
				left: 32px;
				top: 0;
				width: calc(100% - 32px * 2);
			}

			&::before {
				min-height: 641px;
			}
		}
	}

	@media only screen and (max-width: 960px) {
		.preloader {
			top: 131px;

			&__box {
				background: url(../../../assets/img/product-preloader-tablet2.svg) no-repeat;
				background-size: 100% auto;
			}

			&::before {
				min-height: 892px;
			}
		}
	}

	@media only screen and (max-width: 650px) {
		.preloader {
			top: 121px;
			top: 106px;

			&__box {
				background: url(../../../assets/img/product-preloader-mobile.svg) no-repeat;
				background-size: 100% auto;
				width: calc(100% - 16px * 2);
				left: 16px;
			}

			&::before {
				min-height:898px;
			}
		}
	}

	@media only screen and (max-width: 375px) {
		.preloader {

			&__box {
				background-size: 100% auto;
			}
		}
	}
</style>