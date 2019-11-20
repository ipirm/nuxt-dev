<template lang="pug">	
	.preloader(:class="{'preloader_hide': hidePreloader}")
		.preloader__box
</template>

<script>
	import $store from '../../components/store';

	export default {
		name: 'account-info-preloader',
		computed: {
			hidePreloader() {
				return $store.state.account.orders != undefined && Object.size($store.state.account.orders);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/mixins.scss';
	@import '@/helpers/sass/kit.scss';

	.preloader {
		width: calc(((100% / 12) * 10) + 20px);
		// height: calc(100% - 376px);
		height: 100%;
		position: absolute;
		top: 144px;
		left: 50%;
		z-index: 30;
		transform: translate3d(-50%, 0, 1px);
		opacity: 1;
		pointer-events: all;
		transition: all 0.3s ease;
		background: #fff;

		&_hide {
			opacity: 0;
			pointer-events: none;
		}

		&__box {
			background: url(../../assets/img/orders-preloader.svg) #fff no-repeat;
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
			width: calc(100% - 48px * 2);
			left: 50%;
			top: 138px;
			height: 100%;

			&__box {
				background: url(../../assets/img/orders-preloader-tablet.svg) #fff no-repeat;
				background-size: 100% auto;
				left: 0;
				top: 0;
				width: 100%;
			}
		}
	}

	// @media only screen and (max-width: 960px) {
	// 	.preloader {
	// 		top: 131px;

	// 		&__box {
	// 			background: url(../../../assets/img/product-preloader-tablet2.svg) no-repeat;
	// 			background-size: cover;
	// 		}

	// 		&::before {
	// 			min-height: 892px;
	// 		}
	// 	}
	// }

	// @media only screen and (max-width: 650px) {
	// 	.preloader {
	// 		top: 121px;

	// 		&__box {
	// 			background: url(../../../assets/img/product-preloader-mobile.svg) no-repeat;
	// 			width: calc(100% - 16px * 2);
	// 			left: 16px;
	// 			background-size: cover;
	// 		}

	// 		&::before {
	// 			min-height:898px;
	// 		}
	// 	}
	// }

	// @media only screen and (max-width: 375px) {
	// 	.preloader {

	// 		&__box {
	// 			background-size: contain;
	// 		}
	// 	}
	// }
</style>