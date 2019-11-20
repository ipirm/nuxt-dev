<template lang="pug">
	div
		.preloader(v-if="!isPreloaderSlice" :class="[preloader != 1 ? 'preloader_hide' : '']")
			.preloader__box
		.preloader.preloader_slice(v-else :class="[preloader != 1 ? 'preloader_hide' : '']")
			.preloader__box
</template>

<script>
	import $store from '../../../components/store';

	export default {
		name: 'category-preloader',
		data: function() {
			return {
				isPreloaderSlice: false
			}
		},
		props: {
		},
		mounted() {
		},
		computed: {
			preloader() {
				return $store.state.products.preloader;
			},
		},
		methods:{
			fetchData() {
				
			}
		},
		watch: {
			'$route' (to, from) {
				this.fetchData();
				if (to.params.category == from.params.category) {
					this.isPreloaderSlice = true;
				} else {
					this.isPreloaderSlice = false;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/mixins.scss';
	@import '@/helpers/sass/kit.scss';

	.preloader {
		width: calc(100% - 48px * 2);
		height: 100%;
		position: absolute;
		top: 18px;
		left: 48px;
		z-index: 70;
		transform: translateZ(1px);
		opacity: 1;
		pointer-events: all;
		transition: opacity 0.3s ease;

		&_hide {
			opacity: 0;
			pointer-events: none;
		}

		&__box {
			background: #fff url(../../../assets/img/products-preloader.svg) no-repeat;
			background-size: 100% auto;
			background-position: center top;
			width: 100%;
			height: 100%;
			position: absolute;
			left:0;
			top:0;
		}

		&_slice {
			width: calc(100% - 362px);
			left: auto;
			right: 48px;
			top: 122px;
			transition: opacity 0s ease;

			.preloader__box {
				background: #fff url(../../../assets/img/preloader_slice.svg) no-repeat;
				background-size: 100% auto;
				background-position: center top;
			}

			&.preloader_hide {
				transition: opacity .3s ease;
			}
		}
	}

	@media only screen and (max-width: 1200px) {
		.preloader {
			width: calc(100% - 40px * 2);
			left: 40px;

			&__box {
				background: #fff url(../../../assets/img/products-preloader-tablet.svg) no-repeat;
				background-size: 100% auto;
			}

			&_slice {
				top: 130px;

				.preloader__box {
					background: #fff url(../../../assets/img/preloader_slice_1024.svg) no-repeat;
					background-size: 100% auto;
				}
			}
		}
	}

	@media only screen and (max-width: 960px) {
		.preloader {
			width: calc(100% - 32px * 2);
			left: 32px;
			top: 16px;

			&__box {
				background: #fff url(../../../assets/img/products-preloader-tablet2.svg) no-repeat;
				background-size: 100% auto;
			}

			&_slice {
				top: 128px;

				.preloader__box {
					background: #fff url(../../../assets/img/preloader_slice_768.svg) no-repeat;
					background-size: 100% auto;
				}
			}
		}
	}

	@media only screen and (max-width: 650px) {
		.preloader {
			width: calc(100% - 16px * 2);
			left: 16px;
			top: 16px;
			
			&__box {
				background: #fff url(../../../assets/img/products-preloader-mobile.svg) no-repeat;
				background-size: 100% auto;
			}

			&_slice {
				top: 120px;

				.preloader__box {
					background: #fff url(../../../assets/img/preloader_slice_375.svg) no-repeat;
					background-size: 100% auto;
				}
			}
		}
	}
</style>