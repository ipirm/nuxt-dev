<template lang="pug">
	div
		footer.footer(v-bind:class="{'footer_no-padding': noPadding, 'footer_full-screen': fullScreen, 'footer_tablet-full-screen': tabletFullScreen}")
			.footer__content
				.wrapper
					.footer__column
						.footer__subtitle {{ $lang.footer.info_title }}
						.footer__list
							router-link.footer__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'info/loyalty-program'") {{ $lang.footer.info.item1 }}
							router-link.footer__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'info/payment'") {{ $lang.footer.info.item2 }}
							router-link.footer__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'info/delivery'") {{ $lang.footer.info.item3 }}
							router-link.footer__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'info/faq'") {{ $lang.footer.info.item4 }}
							router-link.footer__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'info/returns-exchange'") {{ $lang.footer.info.item10 }}
					.footer__column
						.footer__subtitle
						.footer__list
							router-link.footer__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'info/about-us'") {{ $lang.footer.info.item5 }}
							router-link.footer__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'stores'") {{ $lang.footer.info.item6 }}
							router-link.footer__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'info/privacy-policy'") {{ $lang.footer.info.item7 }}
							router-link.footer__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'info/terms'") {{ $lang.footer.info.item8 }}
						//- .footer__app
						//- 	.footer__subtitle {{ $lang.footer.download_our_app }}  
						//- 	.footer__list
						//- 		a.footer__icon.footer__icon_app(:href="'/'+ lang + '/'")
						//- 			img(:src="iconApp1", width="9px")
						//- 		a.footer__icon.footer__icon_app(:href="'/'+ lang + '/'")
						//- 			img(:src="iconApp2", width="11px")


					.footer__column
						.footer__subtitle {{ $lang.footer.follow_us }}
						.footer__list
							a.footer__link(href="https://www.facebook.com/RalphLaurenHome/" target="_blank") Facebook
							a.footer__link(href="https://www.instagram.com/villa_interior_company" target="_blank") Instagram
					.footer__column
						//- .footer__subtitle {{ $lang.header.menu.store }}
						//- .footer__list
						//- 	router-link.footer__link(:to="'/'+ (lang === langDefault ? '' : lang + '/')") {{ $lang.footer.store.item1 }}
						//- 	router-link.footer__link(:to="'/'+ (lang === langDefault ? '' : lang + '/')") {{ $lang.footer.store.item2 }}
						.footer__subtitle {{ $lang.footer.we_accept }}
						.footer__list
							.footer__icon(href="/")
								img(:src="iconMc", height="24px")
							.footer__icon(href="/")
								img(:src="iconVisa", height="24px")
				span.footer__line
				.wrapper
					.footer__part
						.rights
							| © 2019 VILLA. All rights reserved.
						.pages
							.copy Developer <a href="https://thefirstthelast.agency/" target="_blank"><img src="@/assets/img/thefirstthelast.svg" /></a>
							//- a.pages__link(href="#", target="_blank") Terms of use
							//- a.pages__link(href="#", target="_blank") Privacy Policy
							//- a.pages__link(href="#", target="_blank") Sitemap


		footer.footer.footer_mobile(v-bind:class="{'footer_no-padding': noPadding, 'footer_full-screen': fullScreen, 'footer_tablet-full-screen': tabletFullScreen}")
			.footer__content
				.wrapper
					.footer__column
						.footer__subtitle {{ $lang.footer.info_title }}
						.footer__list
							router-link.footer__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'info/loyalty-program'") {{ $lang.footer.info.item1 }}
							router-link.footer__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'info/payment'") {{ $lang.footer.info.item2 }}
							router-link.footer__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'info/delivery'") {{ $lang.footer.info.item3 }}
							router-link.footer__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'info/faq'") {{ $lang.footer.info.item4 }}
							router-link.footer__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'info/returns-exchange'") {{ $lang.footer.info.item10 }}
							router-link.footer__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'info/about-us'") {{ $lang.footer.info.item5 }}
							router-link.footer__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'stores'") {{ $lang.footer.info.item6 }}
							router-link.footer__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'info/privacy-policy'") {{ $lang.footer.info.item7 }}
							router-link.footer__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'info/terms'") {{ $lang.footer.info.item8 }}
					.footer__column
						.footer__subtitle {{ $lang.footer.follow_us }}
						.footer__list
							a.footer__link(href="https://www.facebook.com/RalphLaurenHome/" target="_blank") Facebook
							a.footer__link(href="https://www.instagram.com/villa_interior_company" target="_blank") Instagram

					//- .footer__column
					//- 	.footer__subtitle {{ $lang.header.menu.store }}
					//- 	.footer__list
					//- 		router-link.footer__link(:to="'/'+ (lang === langDefault ? '' : lang + '/')") {{ $lang.footer.store.item1 }}
					//- 		router-link.footer__link(:to="'/'+ (lang === langDefault ? '' : lang + '/')") {{ $lang.footer.store.item2 }}
					//- .footer__column
					//- 	.footer__subtitle {{ $lang.footer.follow_us }}
					//- 	.footer__list
					//- 		router-link.footer__link(:to="'/'+ (lang === langDefault ? '' : lang + '/')") Facebook
					//- 		router-link.footer__link(:to="'/'+ (lang === langDefault ? '' : lang + '/')") Instagram
					.footer__column
						.footer__subtitle {{ $lang.footer.we_accept }}
						.footer__list
							.footer__icon(:href="'/'+ (lang === langDefault ? '' : lang + '/')")
								img(:src="iconMc", height="24px")
							.footer__icon(href="'/'+ (lang === langDefault ? '' : lang + '/')")
								img(:src="iconVisa", height="24px")
				span.footer__line
				.wrapper.wrapper_bottom
					.footer__part
						.pages
							//- a.pages__link(href="#", target="_blank") Terms of use
							//- a.pages__link(href="#", target="_blank") Privacy Policy
							//- a.pages__link(href="#", target="_blank") Sitemap
						.rights
							| © 2019 VILLA. All rights reserved.<br>Developer
							a.rights__link(href="https://thefirstthelast.agency/" target="_blank") <img src="@/assets/img/thefirstthelast.svg" />
</template>

<script>

	import Lang from '../../../components/lang.vue';

	import iconApp1 from '@/assets/img/icon-app-1.png';
	import iconApp2 from '@/assets/img/icon-app-2.png';
	import iconMc from '@/assets/img/icon-mc.png';
	import iconVisa from '@/assets/img/icon-visa.png';
	
	// import social2 from '@/assets/uploads/social2.svg';
	// import social3 from '@/assets/uploads/social3.svg';
	// import social4 from '@/assets/uploads/social4.svg';
	// import social5 from '@/assets/uploads/social5.svg';

	export default {
		name: 'block-footer',
		data: function(){
			return {
				right: "YouScan 2018 Все права защищены",
				created: "Разработано",
				iconApp1,
				iconApp2,
				iconMc,
				iconVisa,
				langDefault: window.config.langDefault
			}
		},
		props: {
			footer__columns:Array,
			footer__socials:Array,
			noPadding: Boolean,
			fullScreen: Boolean,
			tabletFullScreen: Boolean
		},

		mixins: [Lang],
		mounted() {
			this.fetchData();
		},
		methods:{
			fetchData () {
				let response = {
						right:{
							ru:'YouScan 2018 Все права защищены',
							en:'YouScan 2018 All rights reserved',
							ua:'YouScan 2018 Всі права захищені'
						},
						created:{
							ru:'Разработано',
							en:'Developed by',
							ua:'Розроблено'				
						}
					}
			}
		},
		watch: {
			'$route' () {
				this.fetchData();
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/mixins.scss';
	@import '@/helpers/sass/kit.scss';
	.footer {
		width: 100%;
		// height: 376px;
		position: relative;
		z-index: 100;
		padding: 8px;

		&_mobile {
			display: none;
		}

		&_no-padding {
			padding-top: 0;
		}

		&_full-screen {
			padding: 0 !important;
			margin-top: 0 !important;
		}

		&__content {
			display:block;
			width: 100%;
			height: 100%;
			background-color: #0f0f0f;	
		}

		&__list {
			display: inline-block;
			margin-bottom: 33px;
			&:last-child {
				margin-bottom: 0;
			}
		}

		&__subtitle {
			@include kit('h6 700', 'white');
			margin-bottom: 29px;
			min-height: 13px;
		}

		&__column {
			display: inline-block;
			vertical-align: top;
			// width: calc(100% / 4);
			width: auto;
			min-width: 100px;
			padding-top: 32px;
			min-height: 237px;

			&:nth-child(1) {
				width: calc(100%/12*3 + 16px);
			}

			&:nth-child(2) {
				width: calc(100%/12*3 + 13px);
			}

			&:nth-child(3) {
				width: calc(100%/12*3 + 4px);

				.footer__list {
					min-height: 84px;
				}
			}
		}

		&__link {
			@include kit('h5', 'white');
			text-transform: none;
			transition: all 0.3s ease;
			margin-bottom: 4px;
			display: block;
		
			&:hover {
				opacity: 0.6;
			}
		}

		&__country {
			position: absolute;
			top: -6px;
			left: 0;
			width: 24px;
			height: 24px;
			border: 1px solid #C4C4C4;
			border-radius: 50%;
			color: #818181;
			padding-top: 8px;
			text-align: center;
			font-size: 8px;
		}

		&__line {
			display: block;
			width: 100%;
			height: 1px;
			background:rgba(255, 255, 255, 0.06);
		}

		&__part {
			font-size: 0;
			letter-spacing: 0;
			text-align: left;
			overflow: hidden;
			opacity: 0.5;
			width: 100%;
			height: 48px;
			@include vertical-align-middle;
		}
		&__icon {
			display: inline-block;
			margin-right: 24px;
			
			&_app {
				margin-top: 4px;
			}
		}

		a.footer__icon {
			transition: opacity .5s ease;
			
			&:hover {
				opacity: .6;
			}
		}
	}

	.wrapper {
		margin: 0 auto;
		width: 100%;
		padding-left: 40px;
		padding-right: 40px;
		font-size: 0;
		letter-spacing: 0;
	}

	.logo {
		display: inline-block;
		vertical-align: top;
	}

	.rights {
		@include kit('h6 100', 'white');
		text-transform: none;
		display: inline-block;
		letter-spacing: 0.05em;
		line-height: 47px;
		&__link {
			position: relative;
			margin-left: -2px;

			// &::after {
			// 	content: "";
			// 	position: absolute;
			// 	left: 0;
			// 	bottom: -1px;
			// 	display: block;
			// 	width: 100%;
			// 	height: 1px;
			// 	background: #fff;
			// }
		}
	}

	.copy {
		float: right;
		margin-top: 17px;

		img {
			vertical-align: baseline;
			position: relative;
			top: 1px;
			margin-left: 8px;
		}

		a {
			transition: opacity .5s ease;

			&:hover {
				opacity: .7;
			}
		}
	}
	
	.pages {
		float: right;
		height: 100%;
		@include kit('h6 100', 'white');
		text-transform: none;

		&__link {
			@include kit('h6 100', 'white');
			text-transform: none;
			margin-left: 53px;
			display: inline-block;
			vertical-align: middle;
		}
	}

	.created-by {
		display: inline-block;
		float: right;

		&__text {
			font-size: 14px;
			display: inline-block;
			vertical-align: middle;
			margin-top: -12px;
		}

		&__link {
			display: inline-block;
			vertical-align: middle;
			margin-left: 11px;
		}
	}

	@media screen and (max-width: 1200px) {
		.footer {
			&__column {
				min-height: 309px;
				padding-top: 34px;

				&:nth-child(2) {
					width: calc(100%/12*3 + 7px);
				}

				&:nth-child(3) {
					width: calc(100%/12*3 + 28px);

					.footer__list {
						min-height: 75px;
					}
				}
			}

			&__link {
				margin-bottom: 1px;
			}

			&__list {
				margin-bottom: 40px;
			}

			&__subtitle {
				margin-bottom: 19px;
				letter-spacing: 0.05em;
			}

			&__icon {
				margin-top: 5px;
				display: inline-block;
			}

			&__part {
				height: 54px;
			}
		}

		.wrapper {
			padding: 0 32px !important;
		}

		.rights {
			letter-spacing: 0.04em;

			&__link {
				margin-left: 3px;
			}
		}

		.pages {
			margin-top: -3px;

			&__link {
				margin-left: 47px;
			}
		}
	}

	@media screen and (max-width: 960px) {
		.footer {
			&__column {
				padding-top: 69px;
				min-height: 326px;

				&:nth-child(1) {
					width: calc(100%/12*3 + 23px);
				}

				&:nth-child(2) {
					width: calc(100%/12*3 + 16px);
				}

				&:nth-child(3) {
					width: calc(100%/12*3 + 33px);
				}
			}

			&__subtitle {
				margin-bottom: 11px;
			}

			&__part {
				height: 46px;
			}

			&__icon {
				margin-top: -2px;

				&_app {
					margin-top: 4px;
				}
			}

			&_full-screen {
				padding: 0;
			}

			&_tablet-full-screen{
				padding: 0;
			}
		}

		.pages {
			margin-top: 0;

			&__link {
				margin-left: 24px;
				letter-spacing: .04em;
			}
		}
		
		.wrapper {
			padding: 0 24px !important;
		}
	}

	@media screen and (max-width: 760px) {
		.footer {
			&__column {
				&:nth-child(1),
				&:nth-child(2),
				&:nth-child(3) {
					width: calc(100%/12*3 + 16px);
				}
			}
		}
	}

	@media screen and (max-width: 680px) {
		.footer {
			&__part {
				height: 70px;

				&:before {
					display: none;
				}
			}
		}

		.rights,
		.pages {
			float: none;
			height: auto;
		}

		.rights {
			line-height: 35px;
			margin-top: 5px;
		}

		.pages {
			&__link {
				&:nth-child(1) {
					margin-left: 0;
				}
			}
		}
	}

	@media screen and (max-width: 650px) {
		.footer {
			// margin-top: -764px;
			padding: 4px;
			padding-left: 0;
			padding-right: 0;
			padding-bottom: 0;
			display: none;

			&_mobile {
				display: block;

				&-full-screen {

				}
			}

			&__app {
				position: absolute;
				bottom: 6px;
				left: 176px;
			}

			&__part {
				height: auto;
				padding-top: 24px;
				padding-bottom: 21px;
			}

			&_no-padding {
				padding-top: 0;
				margin-top: -777px;
			}

			&_full-screen {
				padding: 0;

				& > .footer__content {
					padding: 0;
					margin: 0;
				}
			}

			&_tablet-full-screen{
				padding: 0;
				margin: 0;
			}

			&__content {
				margin-top: 10px;
				padding-top: 9px;
			}

			&__line {
				margin-top: 41px;
			}

			&__column {
				width: 100%;
				min-height: 0;
				padding-top: 31px;

				&:nth-child(1),
				&:nth-child(2),
				&:nth-child(3),
				&:nth-child(4) {
					width: 100%;
				}

				&:nth-child(2) {
					.footer__list {
						margin-bottom: 0;
					}	
				}

				&:nth-child(3) {
					.footer__list {
						min-height: auto;
					}	
				}
			}
		}

		.pages {
			float: none;

			&__link {
				margin-left: 0;
				margin-right: 20px;
			}
		}

		.rights {
			line-height: 20px;
			margin-top: 0;
			float: left;

			&__link {
				img {
					margin-left: 8px;
					position: relative;
					top: 1px
				}
			}
		}

		.wrapper {
			padding: 0 16px !important;

			&_bottom {
				padding: 0 19px !important;
			}
		}
	}

</style>