<template lang="pug">
	transition(name="fade" mode="out-in")
		.box
			block-header
			.account
				.account__wrapper
					info-preloader
					//-orders-preloader(v-if="$route.params.tab == 'orders'")
					//-wishes-preloader(v-if="$route.params.tab == 'wishes'")
					template(v-if="isTablet")
						.aside
							.sort(v-bind:class="{sort_open: isSortOpen}")
								.sort__value(@click="toggleSort()" ref="sort_value")
								.sort__dropdown
									router-link.aside__item(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'account'", :class="[!$route.params.tab ? 'aside__item_active' : '']")
										.link(@click="setSortOption") {{ $lang.account.info.title }}
									router-link.aside__item(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'account/wishes'", :class="[$route.params.tab == 'wishes' ? 'aside__item_active' : '']")
										.link(@click="setSortOption") {{ $lang.account.wishes.title }}
									router-link.aside__item(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'account/orders'", :class="[$route.params.tab == 'orders' ? 'aside__item_active' : '']")
										.link(@click="setSortOption") {{ $lang.account.orders.title }}
						.account__container
							template(v-if="isMobile")
								block-info(v-if="!$route.params.tab")
								block-orders(v-if="$route.params.tab == 'orders'" isMobileOrder=true)
								block-wishes(v-if="$route.params.tab == 'wishes'")
							template(v-else)
								block-info(v-if="!$route.params.tab")
								block-orders(v-if="$route.params.tab == 'orders'")
								block-wishes(v-if="$route.params.tab == 'wishes'")
					template(v-else)
						.aside
							router-link.aside__item(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'account'", :class="[!$route.params.tab ? 'aside__item_active' : '']")
								.link {{ $lang.account.info.title }}
							router-link.aside__item(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'account/wishes'", :class="[$route.params.tab == 'wishes' ? 'aside__item_active' : '']")
								.link {{ $lang.account.wishes.title }}
							router-link.aside__item(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'account/orders'", :class="[$route.params.tab == 'orders' ? 'aside__item_active' : '']")
								.link {{ $lang.account.orders.title }}
						.account__container
							block-info(v-if="!$route.params.tab")
							block-orders(v-if="$route.params.tab == 'orders'")
							block-wishes(v-if="$route.params.tab == 'wishes'")
			block-footer
			lang
</template>

<script>
	import Lang from '../components/lang.vue';
	import BlockHeader from '../blocks/includes/header/header.vue';
	import BlockFooter from '../blocks/includes/footer/footer.vue';
	import BlockInfo from '../blocks/account/info.vue';
	import BlockOrders from '../blocks/account/orders.vue';
	import BlockWishes from '../blocks/account/wishes.vue';
	import InfoPreloader from '../blocks/account/account-info-preloader.vue';
	import OrdersPreloader from '../blocks/account/account-orders-preloader.vue';
	import WishesPreloader from '../blocks/account/account-wishes-preloader.vue';

	import $api from '../components/api';
	import $store from '../components/store';
	//import axios from 'axios';

	export default {
		name: 'Cart',
		// metaInfo: function() {
		// 	let th = this;

		// 	return {
		// 		title: this.$lang.meta.home_title,
		// 		// meta: [
		// 		// 	{ vmid: 'description', name: 'description', content: this.$lang.cart.checkout + th.$lang.meta.base_description }
		// 		// ]
		// 	}
		// },
		data: function(){
			return {
				data:{},
				isTablet: false,
				isSortOpen: false,
				isMobile: false,
				langDefault: window.config.langDefault
			}
		},
		components: {
			'block-header': BlockHeader,
			'block-footer': BlockFooter,
			'block-info': BlockInfo,
			'block-orders': BlockOrders,
			'block-wishes': BlockWishes,
			'lang': Lang,
			'info-preloader': InfoPreloader,
			'orders-preloader': OrdersPreloader,
			'wishes-preloader': WishesPreloader,
		},
		created () {
			this.fetchData();
		},
		mounted(){
			var th = this;
			var width;

			width = window.innerWidth;

			if ( width <= 960) {
				th.isTablet = true;
			} else {
				th.isTablet = false;
			}

			if (width <= 650) {
				th.isMobile = true;
			} else {
				th.isMobile = false;
			}
			window.addEventListener('resize', function() {
				width = window.innerWidth;

				if ( width <= 960) {
					th.isTablet = true;
					var field = document.querySelector('.sort__value');

					if (field != null) {
						var fieldText = field.innerHTML;
					

						if (fieldText == '') {
							var t = document.querySelector('.aside__item_active .link').innerHTML;
							field.innerHTML = t;
						}
					}
				} else {
					th.isTablet = false;
				}

				if (width <= 650) {
					th.isMobile = true;
				} else {
					th.isMobile = false;
				}
			});

			setTimeout(function() {
				th.setValue();
			}, 50);
		},
		methods: {
			toggleSort() {
				this.isSortOpen = !this.isSortOpen;
			},
			closeSort() {
				this.isSortOpen = false;
			},
			setSortOption(event) {
				var field = document.querySelector('.sort__value');
				var t = event.target.innerHTML;
				field.innerHTML = t;
				this.closeSort();
			},
			setValue() {
				var width;

				width = window.innerWidth;
				if ( width <= 960) {
					var field = document.querySelector('.sort__value');
					var t = document.querySelector('.aside__item_active .link').innerHTML;
					field.innerHTML = t;
				}
			},
			fetchData () {

				// $api.address();
				// $api.account.info();

				/*axios.
				get('https://villa-es.myshopify.com/admin/products.json', { 
					headers: {
						'X-Shopify-Storefront-Access-Token':'cc62d212d5c89e4f49d585544b984fd3',
						'Access-Control-Allow-Origin': '*',
						'Content-Type': 'application/json'
					}
				}).
				then(response => {
					this.data = response.data.data;
				});*/
			}
		},
		mixins: [Lang],
		watch: {
			'$route' (to, from) {
				this.fetchData();
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/kit.scss';
	.account {
		margin-top: 205px;
		padding-bottom: 200px;
		padding-bottom: 64px;
		width: 100%;
		padding-left: 48px;
		padding-right: 48px;

		&__wrapper {
			width: calc((100% / 12) * 10);
			margin: auto;
			display: flex;
		}

		&__container {
			width: calc((100% / 10) * 7 + 24px * 6);
		}
	}

	.aside {
		position: relative;
		top:0;
		right: 0;
		width: calc((100% / 10)*2 + 8px * 2);
		text-align: left;
		display: inline-block;
		&__item {
			display: block;
			margin-bottom: 10px;

			&_active {
				.link {
					@include ui('link', 'dark');
					text-transform: none;
				}
			}
		}
	}

	.link {
		@include kit('h4 12px light', 'dark');
		max-width: 90px;
		display: inline-block;
		cursor: pointer;
	} 

	@media screen and (max-width: 1200px) {
		.aside {
			width: calc((100% / 10)*2 + 3px * 2);
		}

		.account {
			margin-top: 137px;
			min-height: 700px;

			&__wrapper {
				width: calc((100% / 12) * 12px);
				width: 100%;
			}
		}
	}
	
	@media screen and (max-width: 960px) {
		// .aside {
		// 	display: none;
		// }

		.account {
			// margin-top: 130px;
			margin-top: 83px;
			padding-left: 24px;
			padding-right: 24px;
			padding-bottom: 44px;
			min-height: 250px;
			
			// &__wrapper {
			// 	max-width: 330px;
			// }

			&__container {
				width: 100%;
				margin-top: 28px;
			}

			&__wrapper {
				display: block;
			}
		}

		.router-link-active + .aside__item {

			&::after {
				display: none;
			}
		}

		.router-link-exact-active + .aside__item {
			
			&::after {
				display: block;
			}
		}

		.aside {
			display: block;
			// width: 100%;
			width: calc(100% + 14px);
			margin-left: -7px;

			&__item {
				margin-bottom: 0;
				// padding: 0 13px;
				padding: 0 15px;
				position: relative;

				&::after {
					content: '';
					display: block;
					width: calc(100% - 22px);
					position: absolute;
					left: 50%;
					bottom: 1px;
					height: 1px;
					background-color: rgba(214, 214, 214, .4);
					transform: translate3d(-50%, 0px, 1px);
				}

				&:last-child {

					&::after {
						display: none;
					}
				}
				&_active {

					.link {
						@include kit('h3', 'dark');
						display: none;

						&::after {
							display: none;
						}
					}

					&::after {
						display: none !important;
					}
				}
			}
		}

		.sort {
			display: inline-block;
			vertical-align: bottom;
			font-family: 'Museo';
			line-height: normal;
			font-size: 12px;
			font-weight: 100;
			letter-spacing: 0.04em;
			color: #262626;
			// padding-right: 15px;
			position: relative;
			cursor: pointer;
			z-index: 60;
			// min-width: 143px;

			select {
				visibility: hidden;
				opacity: 0;
				pointer-events: none;
				position: absolute;
			}

			&:after {
				content: "";
				position: absolute;
				right: 15px;
				top: 26px;
				display: block;
				// width: 9px;
				// height: 9px;
				width: 10px;
				height: 10px;
				background: url(../assets/img/arrow-right.png) no-repeat;
				// background-size: cover;
				background-size: contain;
				background-position: center;
				transform: rotate(90deg);
				transition: transform .5s ease;
				z-index: -1;
			}
		}

		.sort {
			border-radius: 0;
			// border-color: #d6d6d6;
			// @include kit('h6 300', 'dark');
			text-transform: none;
			// margin-bottom: 16px;
			// width: 109px;
			height: auto;
			margin-bottom: -15px;
			color: rgba(#0f0f0f, .6);
			display: inline-block;
			width: 100%;
			position: relative;
			text-align: left;
			cursor: default;

			&__value {
				height: auto;
				@include kit('h3', 'dark');
				border-radius: 2px 2px 0 0;
				padding: 15px 15px 14px 14px;
				transition: background-color .5s ease;
				cursor: pointer;
				letter-spacing: .1px;
				position: relative;
				
				&::after {
					content: '';
					display: block;
					width: 100%;
					position: absolute;
					left: 0;
					bottom: 1px;
					height: 1px;
					background-color: rgba(214, 214, 214, .4);
				}

				/deep/ img {
					margin-top: -1px;
					margin-left: 5px;
					vertical-align: middle;
				}
			}

			&__dropdown {
				position: absolute;
				width: 100%;
				top: calc(100% - 2px);
				padding-top: 2px;
				// top: 100%;
				left: 0;
				background-color: #fff;
				border-radius: 0 0 2px 2px;
				box-shadow: 0px 7px 24px rgba(0, 0, 0, 0.04);
				opacity: 0;
				visibility: hidden;
				pointer-events: none;
				transition: opacity .5s ease, visibility .5s ease;

				&::after {
					content: '';
					position: absolute;
					top: 0;
					left: 50%;
					width: calc(100% - 22px);
					height: 1px;
					background-color: rgba(214, 214, 214, .4);
					transform: translate3d(-50%, 0, 1px);
					// z-index: -1;
				}
			}

			&__item {
				padding: 0 16px 0 20px;
				margin: 16px 0;
				display: block;
				cursor: pointer;
				transition: opacity .5s ease;

				&:hover {
					opacity: .5s ease;
				}

				img {
					margin-top: -1px;
					margin-left: 5px;
					vertical-align: middle;
				}
			}

			&_open {
				.sort__value {
					background-color: #fff;
					box-shadow: 0px 2px 24px rgba(0, 0, 0, 0.04);
				}

				.sort__dropdown {
					opacity: 1;
					visibility: visible;
					pointer-events: all;
				}

				&:after {
					transform: rotate(270deg) translate3d(1px, 0, 1px);
				}
			}
		}

		.link {
			@include kit('h3', 'dark');
			color: rgba(38, 38, 38, .48);
			display: block;
			max-width: 100%;
			width: 100%;
			padding: 14px 0;
		}
	}

	@media screen and (max-width: 650px) {
		.account {
			padding: 0 16px;
			margin-top: 81px;
			padding-bottom: 37px;
			min-height: 250px;
			// margin-top: 120px;

			&__wrapper {
				max-width: 100%;
				width: 100%;
			}

			&__container {
				margin-top: 29px;
			}
		}

		.sort {
			width: calc(100% + 18px);
			margin-left: -9px;

			&__value {
				padding-left: 14px;
				padding-bottom: 14px;

				&::after {
					width: calc(100% - 18px);
					left: 50%;
					transform: translate3d(-50%, 0, 1px);
				}
			}

			&::after {
				right: 17px;
			}
		}

		.aside {
			width: 100%;
			margin-left: 0;
		}
	}
</style>