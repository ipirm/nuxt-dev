<template lang="pug">
	.account
		.account__wrapper
			.aside
				router-link.aside__item(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'account'", :class="[!$route.params.tab ? 'aside__item_active' : '']")
					.link {{ $lang.account.info.title }}
				router-link.aside__item(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'account/wishes'", :class="[$route.params.tab == 'wishes' ? 'aside__item_active' : '']")
					.link {{ $lang.account.wishes.title }}
				router-link.aside__item(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'account/orders'", :class="[$route.params.tab == 'orders' ? 'aside__item_active' : '']")
					.link {{ $lang.account.orders.title }}
			.account__container
				.account__h2(v-if="!$route.params.tab") {{ $lang.account.info.title }}
				.account__h2(v-if="$route.params.tab == 'wishes'") {{ $lang.account.wishes.title }}
				.account__h2(v-if="$route.params.tab == 'orders'") {{ $lang.account.orders.title }}

				.account__body(v-if="$route.params.tab == 'wishes'")
					.list
						.card
							.card__image
								.card__bg(:style="{backgroundImage:'url('+cartItem+')'}")
							.card__content
								.card__row
									.card__part.card__part_left
										router-link.card__title(to="#") BAOBAB
										router-link.card__text(to="#") Rum – Saffron – Labdanum
										.card__details Size: 18" L x 18" W.<br> Color: Black
									.card__part.card__part_right
										.price 152 200 ГРН
								.card__row
									.card__part.card__part_left
										button.btn-gift
											.btn-gift__icon
												img(src="@/assets/img/cart.svg", height="12px")
											.btn-gift__text Add to bag
									.card__part.card__part_right
										button.btn-control Edit
										button.btn-control Remove from wishlist
					.card
						.card__image
							.card__bg(:style="{backgroundImage:'url('+cartItem+')'}")
						.card__content
							.card__row
								.card__part.card__part_left
									router-link.card__title(to="#") BAOBAB
									router-link.card__text(to="#") Rum – Saffron – Labdanum
									.card__details Size: 18" L x 18" W.<br> Color: Black
								.card__part.card__part_right
									.price 152 200 ГРН
							.card__row
								.card__part.card__part_left
									button.btn-gift
										.btn-gift__icon
											img(src="@/assets/img/cart.svg", height="12px")
										.btn-gift__text Add to bag
								.card__part.card__part_right
									button.btn-control Edit
									button.btn-control Remove from wishlist

				.account__body(v-if="$route.params.tab == 'orders'")
					.account__box
						.orders
							.orders__head
								.orders__col Order status
								.orders__col Price
							.orders__container
								.order
									.order__col #1
									.order__col
										.card
											.card__image
												.card__bg(:style="{backgroundImage:'url('+cartItem+')'}")
											.card__content
												.card__row
													.card__part.card__part_left
														router-link.card__title(to="#") ORDER #555036
														.card__details 12.12.2017
									.order__col
										.status Delivered
									.order__col 500 UAH
									.order__col
										.button +

				.account__body(v-if="!$route.params.tab")
					.box.account__box
						.box__label ACCOUNT INFO
						.ui-input(:class="[firstnameCheck ? 'ui-input_active' : '']")
							input(type="text", v-model="firstname", name="firstname", )
							.ui-input__name Name
						.ui-input(:class="[emailCheck ? 'ui-input_active' : '']")
							input(type="text", v-model="email", name="email", )
							.ui-input__name E-mail
						.ui-input(:class="[passwordCheck ? 'ui-input_active' : '']")
							input(type="password", v-model="password", name="password", )
							.ui-input__name Password
						.ui-input(:class="[cpasswordCheck ? 'ui-input_active' : '']")
							input(type="password", v-model="cpassword", name="cpassword", )
							.ui-input__name Confirm password
						
						.box__label SHIPPING INFORMATION
						.ui-input(:class="[firstnameCheck ? 'ui-input_active' : '']")
							input(type="text", v-model="firstname", name="firstname", )
							.ui-input__name Name
						.ui-input(:class="[emailCheck ? 'ui-input_active' : '']")
							input(type="text", v-model="email", name="email", )
							.ui-input__name E-mail
						.ui-input(:class="[passwordCheck ? 'ui-input_active' : '']")
							input(type="password", v-model="password", name="password", )
							.ui-input__name Password
						.ui-input(:class="[cpasswordCheck ? 'ui-input_active' : '']")
							input(type="password", v-model="cpassword", name="cpassword", )
							.ui-input__name Confirm password

					.box.account__box
						button.account__button Save
</template>

<script>
	import $store from '../../components/store';

	import cartItem from '../../assets/uploads/cart_card.png';
	import bannerImg from '../../assets/uploads/banner-dogs.jpg';
	import Lang from '../../components/lang.vue';

	export default {
		name: 'block-account',
		data: function(){
			return {
				cartItem: cartItem,
				bannerImg,
				firstname: '',
				email:'',
				password: '',
				cpassword: '',
				firstnameCheck:false,
				lastnameCheck:false,
				emailCheck:false,
				phoneCheck:false,
				passwordCheck:false,
				cpasswordCheck:false,
				searchable:false,
				langDefault: window.config.langDefault
			}
		},
		mounted() {
			// $api.getCategories();
		},
		mixins: [Lang],
		watch: {
			'$route' () {
			},
			firstname(val) {
				this.firstnameCheck = val !="" ? true : false;
			},
			lastname(val) {
				this.lastnameCheck = val !="" ? true : false;
			},
			email(val) {
				this.emailCheck = val !="" ? true : false;
			},
			password(val) {
				this.passwordCheck = val !="" ? true : false;
			},
			cpassword(val) {
				this.cpasswordCheck = val !="" ? true : false;
			},
			phone(val) {
				this.phoneCheck = val !="" ? true : false;
			},
			city(val) {
				this.cityCheck = val !="" ? true : false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/kit.scss';
	.hide {
		display: none;
	}

	.price {
		@include kit('h6 300', 'dark');
		color: rgba(0,0,0,.6);
		letter-spacing: .4px;
	    text-align: right;
	}

	.card {
		position: relative;
		border-bottom: 1px solid rgba(#C4C4C4, .2);
		padding: 16px 0;
		font-size: 0;

		&__row {
			&:nth-child(2) {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;

				.card__part_right {
					text-align: right;
				}
			}
		}

		&__image {
			background-color: #F3F3F3;
			position: relative;
			margin-right: 33px;
			width: 114px;
			height: 152px;
			display: inline-block;
			vertical-align: top;
		}

		&__bg {
			position: absolute;
			top: 25px;
			left: 14px;
			width: calc(100% - 28px);
			height: calc(100% - 50px);
			background-size: contain;
			background-position: center center;
			mix-blend-mode: multiply;
		}

		&__content {
			width: calc(100% - 147px);
			display: inline-block;
			vertical-align: top;
			padding-top: 15px;
			position: relative;
			height: 152px;
		}

		&__part {
			&_right {
				width: 263px;
				display: inline-block;
				vertical-align: top;
			}

			&_left {
				display: inline-block;
				vertical-align: top;
				width: calc(100% - 263px);
			}
		}

		&__title {
			color: #262626;
			font: 700 11px/16px 'Museo', Arial, Helvetica, sans-serif;
			display: block;
			letter-spacing: .5px;
		}

		&__text {
			display: block;
			margin-top: 3px;
			color: rgba(23, 23, 23, 0.8);
			font: 300 12px/14px 'Museo', Arial, Helvetica, sans-serif;
		}

		&__details {
			margin-top: 15px;
			font: 300 11px/18px 'Museo', Arial, Helvetica, sans-serif;
			color: rgba(#0f0f0f, .6);
			letter-spacing: .4px;
		}
	}

	.btn-gift {
		padding-left: 24px;
		position: relative;
		margin-bottom: 7px;

		&__icon {
			position: absolute;
			top: 2px;
    		left: 1px;
		}

		&__text {
			color: rgba(#0f0f0f, .8);
			font: 300 11px/17px 'Museo', Arial, Helvetica, sans-serif;
			letter-spacing: .4px;
		}
	}

	.btn-control {
		display: inline-block;
		vertical-align: bottom;
		font: 300 11px/17px 'Museo', Arial, Helvetica, sans-serif;
		color: rgba(#0f0f0f, .8);
		margin-left: 32px;
		letter-spacing: .4px;
	}

	.account {
		margin-top: 205px;
		padding-bottom: 200px;
		width: 100%;
		padding-left: 48px;
		padding-right: 48px;

		&__h2 {
			@include kit('h2', 'dark');
		}

		&__wrapper {
			width: calc((100% / 12) * 10);
			margin: auto;
			display: flex;
		}
		
		&__head {
			border-bottom: 1px solid rgba(#C4C4C4, .2);
			padding-bottom: 10px;
		}

		&__container {
			width: calc((100% / 10) * 7 + 24px * 6);
		}

		&__body {
			position: relative;
			border-top: 1px solid rgba(#D6D6D6, .4);
			padding-top: 24px;
		}

		&__title {
			font: 32px/40px 'Didot', Arial, Helvetica, sans-serif;
			color: #262626;
		}

		&__button {
			@include ui('button', 'dark');
			max-width: calc(50% - 48px);
		}

		&__heading {
			width: 263px;
			align-self: flex-end;
			padding-bottom: 2px;
		}

		&__column {
			font: 300 12px/14px 'Museo', Arial, Helvetica, sans-serif;
			color: rgba(#0f0f0f, .6);
			width: calc(100%/3);
			display: inline-block;
			vertical-align: top;

			&:nth-child(1) {
				text-align: left;
			}

			&:nth-child(2) {
				text-align: center;
			}

			&:nth-child(3) {
				text-align: right;
			}
		}
		&__checkout {
			@include ui('button', 'dark');
			margin-bottom: 19px;
		}

		&__link {
			@include ui('link', 'dark');
			text-transform: none;
			display: inline-block;
		}
	}

	.ui-input {
		max-width: calc(50% - 48px);
		display: inline-block;
		margin-right: 24px;
	}

	.link {
		@include kit('h4 12px light', 'dark');
		max-width: 90px;
		display: inline-block;
		cursor: pointer;
	} 

	.box {
		&__label {
			@include kit('h5 11 bold', 'dark');
			margin-bottom: 20px;
		}
	}

	.aside {
		position: relative;
		top:0;
		right: 0;
		width: calc((100% / 10)*2 + 24px * 2);
		text-align: left;
		display: inline-block;
		&__item {
			display: block;
			margin-bottom: 20px;

			&_active {
				.link {
					@include ui('link', 'dark');
					text-transform: none;
				}
			}
		}
	}

	@media screen and (max-width: 1200px) {
		
	}

	@media screen and (max-width: 960px) {
		
	}

</style>
