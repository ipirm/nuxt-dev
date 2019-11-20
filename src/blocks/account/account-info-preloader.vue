<template lang="pug">	
	.preloader(:class="[preloader == 1 ? 'preloader_hide' : '']")
		.preloader__box
</template>

<script>
	import $store from '../../components/store';

	export default {
		name: 'account-info-preloader',
		computed: {
			preloader() {
				return $store.state.account.preloader;
			},
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
			background: url(../../assets/img/info-preloader.svg) #fff no-repeat;
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
			// height: calc(100% - 341px);
			height: 100%;

			&__box {
				background: url(../../assets/img/info-preloader-tablet.svg) #fff no-repeat;
				background-size: 100% auto;
				left: 0;
				top: 0;
				width: 100%;
			}
		}
	}

	@media only screen and (max-width: 960px) {
		.preloader {
			width: calc(100% - 18px * 2);
			top: 100px;
			z-index: 65;
			height: 100%;

			&__box {
				background: url(../../assets/img/info-preloader-tablet2.svg) #fff no-repeat;
				background-size: 100% auto;
			}
		}
	}

	@media only screen and (max-width: 650px) {
		.preloader {
			height: calc(100% + 240px);

			&__box {
				background: url(../../assets/img/info-preloader-mobile.svg) no-repeat;
				width: calc(100% - -2px * 2);
				left: -3px;
				background-size: cover;
			}
		}
	}

	@media only screen and (max-width: 350px) {
		.preloader {
			width: calc(100% - 14px * 2);
			height: calc(100% + 254px);

			&__box {
				background-size: contain;
			}
		}
	}
</style>