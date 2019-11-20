<template lang="pug">
	.info
		.info__h2 {{ $lang.account.info.title }}
		.info__body
			.box.account__box
				.box__label {{ $lang.account.info.account_info }}
				v-input(v-model="firstname" :label="$lang.checkout.firstname" :type="'text'", :name="'firstname'" @keyup="infoState = 1")
				v-input(v-model="lastname", :label="$lang.checkout.lastname" :type="'text'", :name="'lastname'" @keyup="infoState = 1")
				v-input(v-model="email", :label="$lang.checkout.email" :type="'text'", :name="'email'" @keyup="infoState = 1")
				v-input(v-model="telephone", :label="$lang.checkout.phone" :type="'text'", :name="'telephone'" @keyup="infoState = 1")
				//-.ui-status(v-if="account.customer_group_id")
					.ui-status__icon
					.ui-status__label {{ $lang.account.info.user }}

				.box__label {{ $lang.account.info.password_settings }}
				.ui-input.ui-input_active
					input(type="text", v-model="currentpassword", name="currentpassword" readonly)
					.ui-input__name {{ $lang.account.info.current_password }}
				button.btn-change-pass(v-if="passwordState === 0" @click="passwordState = 1") {{ $lang.account.info.change_password }}
				button.btn-change-pass.btn-change-pass_close(v-if="passwordState === 1" @click="passwordState = 0") {{ $lang.account.info.close }}
				div(v-if="passwordState === 1")
					v-input(v-model="password", :label="$lang.account.info.new_password" :type="'password'", :name="'password'")
					v-input(v-model="cpassword", :label="$lang.account.info.confirm_password" :type="'password'", :name="'cpassword'")
					.box.info__box.box_password-btn
						button.info__button(:disabled="password != cpassword || password.length < 4" @click="savePassword()") {{ $lang.account.info.save_password }}
				
				.box__label {{ $lang.account.info.shipping_info }}
				v-input(v-model="fulladdress", :label="$lang.account.info.address" :type="'text'", :name="'address'" @keyup="infoState = 1")
				v-input(v-model="city", :label="$lang.account.info.city" :type="'text'", :name="'city'" @keyup="infoState = 1")
				v-input(v-model="zipcode", :label="$lang.account.info.zip" :type="'text'", :name="'zipcode'" @keyup="infoState = 1")
				v-input(v-model="country", :label="$lang.account.info.country" :type="'text'", :name="'country'" @keyup="infoState = 1")

			.box.info__box(v-if="infoState === 1")
				button.info__button(@click="save()") {{ $lang.account.info.save }}
</template>

<script>
	import Vue from 'vue';
	import $api from '../../components/api.js';
	import $store from '../../components/store';

	import cartItem from '../../assets/uploads/cart_card.png';
	import bannerImg from '../../assets/uploads/banner-dogs.jpg';

	import vInput from '../../components/input';
	import Lang from '../../components/lang.vue';
import store from '../../components/store';

	export default {
		name: 'block-account',
		metaInfo: function() {
			let th = this;

			return {
				title: this.$lang.account.info.title + this.$lang.meta.base_title,
				// meta: [
				// 	{ vmid: 'description', name: 'description', content: this.$lang.cart.checkout + th.$lang.meta.base_description }
				// ]
			}
		},
		data: function(){
			return {
				cartItem: cartItem,
				bannerImg,
				firstname:'',
				lastname:'',
				email:'',
				currentpassword: '***********',
				password: '',
				cpassword: '',
				telephone: '',
				country: 'Украина',
				zipcode: '',
				fulladdress: '',
				city: '',
				currentpasswordCheck:true,
				passwordCheck: false,
				cpasswordCheck:false,
				searchable:false,
				passwordState: 0,
				infoState: 0,
				langDefault: window.config.langDefault
			}
		},
		methods: {
			onUpdateSuccess(type) {

				let $this = this;

				$api.account.info();

				if (type === 'password') {
					this.passwordState = 0;
					this.password = '';
					this.cpassword = '';
					this.cpasswordCheck = false;
					this.passwordCheck = false;
				}

				if (type === 'info') {
					this.infoState = 0;
					$api.address();
				}

				Vue.notify({
					group: 'notify',
					type: 'success',
					title: $this.$lang.notifications.success,
					text: $this.$lang.notifications.data_saved,
					duration: 10000
				});
			},
			onUpdateError(error) {
				var text = '';

				var errArr = error[0];

				if (typeof error[0] === 'string') errArr = error;

				for (var i = 0; i < errArr.length; i++) {
					text += errArr[i] + '</br>';
				}

				Vue.notify({
					group: 'notify',
					type: 'error',
					title: $this.$lang.notifications.error,
					text: text,
					duration: 10000
				})
			},
			getInfo() {
				this.firstname = this.account.firstname;
				this.lastname = this.account.lastname;
				this.email = this.account.email;
				this.telephone = this.account.telephone;
				
			},
			getAddress() {
				this.country = this.address.country;
				this.city = this.address.city;
				this.zipcode = this.address.postcode;
				this.fulladdress = this.address.address_1;
			},
			save() {

				var th = this;

				var data = {
					info: {
						firstname: this.firstname,
						lastname: this.lastname,
						email: this.email,
						telephone: this.telephone
					},
					address: {
						firstname: this.firstname,
						lastname: this.lastname,
						address_1: this.fulladdress,
						city: this.city,
						country_id: '220',
						zone_id: '139',
						postcode: this.zipcode
					}
				};

				$api.updateAccount(data, function() { th.onUpdateSuccess('info') });
			},
			savePassword() {
				var th = this;
				
				$api.updatePassword(this.password, this.cpassword, function() { th.onUpdateSuccess('password') });
			}
		},
		computed: {
			account() {
				var data = $store.state.account.info;
				return data == undefined ? {} : data;
			},
			address() {
				var data = $store.state.address;
				return data == undefined ? {} : data;
			}
		},
		mounted() {
			// $api.getToken();
			// $api.getCategories();
			this.getInfo();
			this.getAddress();
			// this.getAddress();
			if (!Object.size($store.state.address)) {
				$api.address();
			}
		},
		components: {
			'v-input': vInput
		},
		mixins: [Lang],
		watch: {
			$route() {
				this.getInfo();
			},
			account() {
				this.getInfo();
			},
			address() {
				this.getAddress();
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

	.btn-change-pass {
		display: inline-block;
		vertical-align: middle;
		color: #0f0f0f;
		opacity: .6;
		font: 300 11px/17px 'Museo', Arial, Helvetica, sans-serif;
		letter-spacing: .4px;
		transition: opacity .5s ease;

		&_close {
			padding-left: 18px;
			background: url('../../assets/img/close_password.svg') no-repeat left center;
		}

		&:hover {
			opacity: .3;
		}
	}

	.info {
		padding-bottom: 200px;
		padding-bottom: 0;
		width: 100%;
		margin-top: -5px;

		&__h2 {
			@include kit('h2', 'dark');
			margin-bottom: 13px;
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
			padding-top: 6px;
		}

		&__title {
			font: 32px/40px 'Didot', Arial, Helvetica, sans-serif;
			color: #262626;
		}

		&__button {
			@include ui('button', 'dark');
			max-width: calc(50% - 127px);
			transition: opacity .5s ease;

			&[disabled='disabled'] {
				cursor: default;
				opacity: .2;

				&:hover {
					opacity: .2;
				}
			}

			&:hover {
				opacity: .8;
			}
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
		max-width: calc(50% - 126px);
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
			margin-bottom: 31px;
			margin-top: 17px;
		}

		&_password-btn {
			margin-bottom: 40px;
		}
	}

	.ui-status {
		display: flex;
		align-items: center;
		margin-bottom: 58px;
		margin-top: -5px;

		&__icon {
			width: 16px;
			height: 16px;
			background: url(../../assets/img/icon-status-check.svg) no-repeat;
			background-position: center;
			background-size: 100% auto;
			margin-right: 10px;
		}
		
		&__label {
			@include kit('h6 300', 'dark');
			text-transform: none;
			text-align: left;
			padding-top: 1px;
			letter-spacing: .04em;
		}
	}

	@media screen and (max-width: 1200px) {
		.info {
			&__h2 {
				margin-bottom: 10px;	
			}

			&__body {
				padding-top: 14px;
			}

			&__button {
				max-width: calc(50% - 42px);
			}
		}

		.ui-input {
			max-width: calc(50% - 41px);
		}

		.ui-status {
			margin-bottom: 51px;
		}
	}

	@media screen and (max-width: 960px) {
		.info {
			max-width: 330px;
			margin: auto;
			
			&__h2 {
				text-align: center;
				font-size: 32px;
				display: none;
			}

			&__body {
				border-top: none;
				position: relative;

				&:before {
					content: "";
					// display: block;
					display: none;
					position: absolute;
					width: 100vw;
					height: 1px;
					background-color: rgba(214, 214, 214, 0.4);
					left: 50%;
					top: 0;
					transform: translateX(-50%);

				}
			}

			&__button {
				max-width: 100%;
			}
		}

		.box {
			&__label {
				text-align: center;
			}
		}

		.ui-input {
			max-width: 100%;
			margin-right: 0;
		}

		.btn-change-pass {
			margin-bottom: 30px;
		}

		.ui-status {
			text-align: center;
			display: block;
			white-space: nowrap;
			margin-bottom: 42px;

			&__icon {
				display: inline-block;
				vertical-align: middle;
			}

			&__label {
				display: inline-block;
				vertical-align: middle;
				white-space: normal;
			}
		}
	}

	@media screen and (max-width: 650px) {
		.info {
			max-width: 100%;

			&__h2 {
				text-align: left;
			}

			&__body {
				padding-top: 1px;
			}
		}

		.box {
			&__label {
				text-align: left;
			}
		}

		.ui-status {
			text-align: left;
		}
	}

</style>
