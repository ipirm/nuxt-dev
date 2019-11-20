<template lang="pug">
	transition(name="fade" mode="out-in")
		.box
			block-header
			.template
				.template__wrapper
					template(v-if="isTablet")
						.aside
							.sort(v-bind:class="{sort_open: isSortOpen}")
								.sort__value(@click="toggleSort()" ref="sort_value")
								.sort__dropdown
									.sort__li(v-for="(item, index) in pages" :key="index")
										router-link.sort__item(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'info/' + item.slug", :class="[$route.params.page == item.slug || (!$route.params.page && index === 0) ? 'aside__item_active' : '']")
											.link(@click="setSortOption" v-html="item.title.rendered")
						.template__container
							block-return(:page="getInfoPageBySlug")
					template(v-else)
						.aside
							router-link.aside__item(v-for="(item, index) in pages" :key="index" :to="'/'+ (lang === langDefault ? '' : lang + '/') + 'info/' + item.slug", :class="[$route.params.page == item.slug || (!$route.params.page && index === 0) ? 'aside__item_active' : '']")
								.link(v-html="item.title.rendered")
						.template__container
							block-return(:page="getInfoPageBySlug")
							//- block-return(v-if="$route.params.page == 'return' || !$route.params.page")
							//- block-quality(v-if="$route.params.page == 'quality'")
							//- block-privacy(v-if="$route.params.page == 'privacy-policy'")
							//- block-career(v-if="$route.params.page == 'career'")
			block-footer
			block-login-modal
</template>

<script>
	import Lang from '../components/lang.vue';
	import $api from '@/components/api.js';
	import $store from '@/components/store.js';

	import BlockHeader from '../blocks/includes/header/header.vue';
	import BlockFooter from '../blocks/includes/footer/footer.vue';
	import BlockReturn from '../blocks/info/return/return.vue';
	import BlockQuality from '../blocks/info/quality/quality.vue';
	import BlockPrivacy from '../blocks/info/privacy-policy/privacy-policy.vue';
	import BlockCareer from '../blocks/info/career/career.vue';
	import BlockLoginModal from '../blocks/includes/login/login.vue';

	//import axios from 'axios';

	export default {
		name: 'Info',
		data: function(){
			return {
				data:{
					
				},
				isTablet: false,
				isSortOpen: false,
				langDefault: window.config.langDefault
			}
		},
		components: {
			'block-header': BlockHeader,
			'block-footer': BlockFooter,
			'block-return': BlockReturn,
			'block-quality': BlockQuality,
			'block-privacy': BlockPrivacy,
			'block-career': BlockCareer,
			'block-login-modal': BlockLoginModal
		},
		mounted() {
			var th = this;
			var width;

			width = window.innerWidth;
				if ( width <= 960) {
					th.isTablet = true;
				} else {
					th.isTablet = false;
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
			});

			setTimeout(function() {
				// th.setValue();
			}, 100);
		},
		created () {
			this.fetchData();
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
				$api.info.get(function(resp) {

				})
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
		computed: {
			pages() {
				return $store.state.infoPages;
			},
			getInfoPageBySlug() {
				let slug = this.$route.params.page;
				return $store.getters.getInfoPageBySlug(slug);
			}
		},
		mixins: [Lang],
		watch: {
			'$route' () {
				this.fetchData();
			},
			pages() {
				if (this.pages.length) {
					this.$nextTick(() => {
						this.setValue();
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/kit.scss';
	.template {
		margin-top: 205px;
		padding-bottom: 59px;
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
		margin-top: 32px;
		text-align: left;
		display: inline-block;
		padding-right: 20px;

		&__item {
			display: block;
			margin-bottom: 10px;

			&_active {
				.link {
					@include ui('link', 'dark');
					text-transform: none;
					text-decoration: underline;

					&:after {
						display: none;
					}
				}
			}
		}
	}
	.link {
		@include kit('h4 12px light', 'dark');
		// max-width: 90px;
		display: inline-block;
		cursor: pointer;
	}

	@media only screen and (max-width: 960px) {

		.aside {
			display: block;
			width: calc(100% + 14px);
			margin-left: -7px;

			&__item {
				margin-bottom: 0;
				padding: 0 13px;
				position: relative;

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
			z-index: 101;
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
				top: 25px;
				display: block;
				width: 10px;
				height: 10px;
				background: url(../assets/img/arrow-right.png) no-repeat;
				// background-size: cover;
				background-size: contain;
				background-position: center;
				transform: rotate(90deg);
				transition: transform .5s ease;
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
				padding: 15px 15px 13px 15px;
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
				z-index: 101;

				&::after {
					content: '';
					position: absolute;
					top: 0;
					left: 50%;
					width: calc(100% - 22px);
					height: 1px;
					background-color: rgba(214, 214, 214, .4);
					transform: translate3d(-50%, 0, 1px);
				}
			}

			&__item {
				padding: 0 16px 0 15px;
				margin: 0;
				display: block;
				cursor: pointer;
				transition: opacity .5s ease;
				position: relative;

				&::after {
					content: '';
					display: block;
					width: calc(100% - 22px);
					position: absolute;
					left: 50%;
					bottom: 2px;
					height: 1px;
					background-color: rgba(214, 214, 214, .4);
					transform: translate3d(-50%, 1px, 1px);
				}

				&:hover {
					opacity: .5s ease;
				}

				img {
					margin-top: -1px;
					margin-left: 5px;
					vertical-align: middle;
				}
			}

			&__li {

				&:last-child {

					.sort {

						&__item {

							&::after {
								display: none;
							}
						}
					}
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
			letter-spacing: 0;
		}

		.template {
			margin-top: 84px;
			padding: 0 24px;
			min-height: 500px;

			&__wrapper {
				width: 100%;
				display: block;
			}

			&__container {
				width: 100%;
				display: block;
			}
		}

		.content img {
			width: 100%;
		}

		.content {

			&__title {
				display: none;
			}
		}
	}

	@media only screen and (max-width: 650px) {
		.template {
			margin-top: 80px;
		}

		.aside {
			width: calc(100% + 34px);
			margin-left: -17px;
		}

		.sort {

			&__value {
				padding: 16px 15px 14px 15px;
				letter-spacing: 0;

				&::after {
					width: calc(100% - 18px);
					left: 50%;
					transform: translate3d(-50%, 0, 1px);
				}
			}

			&__dropdown {
				box-shadow: 0px 8px 30px rgba(0,0,0,0.07);
			}

			&::after {
				right: 17px;
				top: 27px;
			}

			&_open {

				.sort {

					&__value {
						box-shadow: 0px 8px 30px rgba(0,0,0,0.07);
					}
				}
			}
		}
	}
</style>