<template lang="pug">
	div
		router-link.back(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'login/'", v-if="$route.params.forgot") {{ $lang.login.forgot.back }}
		.login(:class="[$route.params.forgot ? 'login_forgot' : '']")
			template(v-if="$route.params.forgot == 'thanks'")
				.forgot
					.forgot__h2 {{ $lang.login.forgot.title }}
					.forgot__label {{ $lang.login.forgot.thanks }}
					.forgot__wrapper
						router-link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'login/'")
							button.login__button {{ $lang.login.forgot.button_ok }}

			template(v-if="$route.params.forgot == 'forgot'")
				.forgot
					.forgot__h2 {{ $lang.login.forgot.title }}
					.forgot__label {{ $lang.login.forgot.label }}
					.forgot__wrapper
						.box.login__box
							v-input(v-model="email", :label="'E-mail'" :type="'text'", :name="'email'")
							button.login__button(@click="resetPassword()") {{ $lang.login.forgot.button_request }}

			template(v-if="!$route.params.forgot")
				.tabs.login__tabs
					.tabs__item(:class="[tab == 1 ? 'tabs__item_active' : '']", @click="tab = 1") {{ $lang.login.form.sign_in }}
					.tabs__item(:class="[tab == 2 ? 'tabs__item_active' : '']", @click="tab = 2") {{ $lang.login.form.sign_up }}
				template(v-if="tab == 1")
					.box.login__box
						.box__label {{ $lang.login.form.login_with_email }}
						v-input(v-model="email", :label="$lang.login.form.email" :type="'text'", :name="'email'" :isValid="emailValid" @keyup="emailValid = true")
						v-input(v-model="password", :label="$lang.login.form.password" :type="'password'", :name="'password'" :isValid="passwordValid" @keyup="passwordValid = true")
						button.login__button(@click="login()") {{ $lang.login.form.button_login }}
					.login__remeber
						label.ui-checkbox
							input(type="checkbox", name="remember")
							.ui-checkbox__icon
							.ui-checkbox__label {{ $lang.login.form.remember_me }}
						router-link.login__forgot(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'login/forgot'") {{ $lang.login.form.forgot_password }}
				template(v-if="tab == 2")
					.box.login__box
						.box__label {{ $lang.login.form.register_with_email }}
						v-input(v-model="firstname", :label="$lang.login.form.firstname" :type="'text'", :name="'firstname'" :isValid="firstnameValid" @keyup="firstnameValid = true")
						v-input(v-model="lastname", :label="$lang.login.form.lastname" :type="'text'", :name="'lastname'" :isValid="lastnameValid" @keyup="lastnameValid = true")
						v-input(v-model="email", :label="$lang.login.form.email" :type="'text'", :name="'email'" :isValid="emailValid" @keyup="emailValid = true")
						v-input(v-model="telephone", :label="$lang.login.form.telephone" :type="'text'", :name="'telephone'")
						v-input(v-model="password", :label="$lang.login.form.password" :type="'password'", :name="'password'" :isValid="passwordValid" @keyup="passwordValid = true")
						v-input(v-model="cpassword", :label="$lang.login.form.confirm_password" :type="'password'", :name="'cpassword'" :isValid="cpasswordValid" @keyup="cpasswordValid = true")
						label.ui-checkbox
							input(type="checkbox", name="agree2")
							.ui-checkbox__icon
							.ui-checkbox__label {{ $lang.login.form.checkbox_text }}
						label.ui-checkbox(:class="{'ui-checkbox_error': !agreeValid}")
							input(type="checkbox", name="agree" v-model="agree" :isValid="agreeValid" @change="agreeValid = true")
							.ui-checkbox__icon
							.ui-checkbox__label(v-html="$lang.login.form.checkbox_text_2")
						button.login__button(@click="register()") {{ $lang.login.form.button_register }}

				.box.login__box(style="display:none")
					.box__label(v-if="tab == 1") {{ $lang.login.form.login_with }}
					.box__label(v-if="tab == 2") {{ $lang.login.form.register_with }}
				template(v-if="socials")
					div(style="display:none")
						a.login__social.login__social_facebook(:href="socials.facebook") Facebook
						a.login__social.login__social_google(:href="socials.google") Google

				
</template>

<script>
	import $api from '../../components/api.js';
	import $store from '../../components/store';
	import vInput from '../../components/input';
	import vSelect from 'vue-select';
	import cartItem from '../../assets/uploads/cart_card.png';
	import bannerImg from '../../assets/uploads/banner-dogs.jpg';
	import payImg from '../../assets/uploads/pay.jpg';
	import Lang from '../../components/lang.vue';

	export default {
		name: 'block-checkout',
		data: function(){
			return {
				cartItem: cartItem,
				bannerImg,
				payImg,
				tab:1,
				firstname: '',
				firstnameValid: true,
				lastname: '',
				lastnameValid: true,
				telephone: '',
				email:'',
				emailValid: true,
				password: '',
				passwordValid: true,
				cpassword: '',
				cpasswordValid: true,
				agree: false,
				agreeValid: true,
				searchable:false,
				value:"Choose your size",
				langDefault: window.config.langDefault
			}
		},
		components:{
			'v-select': vSelect,
			'v-input': vInput
		},
		methods:{
			isEmailValid(email) {
				var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    			return re.test(String(email).toLowerCase());
			},
			login() {
				var th = this;

				let isValid = true;

				if (!this.isEmailValid(this.email)) {
					this.emailValid = false;
					isValid = false;
				}

				if (!this.password) {
					this.passwordValid = false;
					isValid = false;
				}

				if (!isValid) return;

				$api.login(this.email, this.password, function() {

					$api.account.info();
					$api.cart.get();
					$api.wishlist.get();

					if ($store.state.isLoginModalActive) {
						$store.commit('setLoginModalActive', false);
						return;
					}

					if ($store.state.currentPage != '') {
						th.$router.go(-1)
					} else {
						th.$router.push({name: 'Main'});
					}
				});
			},
			register() {
				let th = this;

				let isValid = true;

				if (!this.isEmailValid(this.email)) {
					this.emailValid = false;
					isValid = false;
				}

				if (!this.firstname) {
					this.firstnameValid = false;
					isValid = false;
				}

				if (!this.lastname) {
					this.lastnameValid = false;
					isValid = false;
				}

				if (!this.password) {
					this.passwordValid = false;
					isValid = false;
				}

				if (!this.cpassword || (this.cpassword != this.password && this.password))  {
					this.cpasswordValid = false;
					isValid = false;
				}

				if (!this.agree) {
					this.agreeValid = false;
					isValid = false;
				}

				if (!isValid) return;

				let data = {
					firstname: this.firstname,
					lastname: this.lastname,
					email: this.email,
					password: this.password,
					confirm: this.cpassword,
					agree: this.agree
				};

				if (this.telephone) {
					data.telephone = this.telephone;
				}

				$api.registration(data, function() {

					if ($store.state.isLoginModalActive) {
						$store.commit('setLoginModalActive', false);
						return;
					}
					
					$store.state.currentPage != '' ? th.$router.go(-1) : th.$router.push({name: 'Main'});
				});
			},
			resetPassword() {
				var th = this;
				$api.resetPassword(this.email, function(resp) {
					th.$router.push({path: '/login/thanks'});
				});
			}
		},
		computed: {
			checkInput(v) {
				return v != "" ? true : false;
			},
			socials() {
				var data = $store.state.socials;
				return data == undefined ? false : data;		
			}
		},
		mounted() {
			$api.getSocialLinks();
			// http://dev-api-villa.tftl.pw/index.php?route=feed/rest_api/getSocialLink
			//localStorage.getItem('account_logged') == 1 ? this.$router.push('account') : false;
			// $api.getToken();
			// $api.getSocialLinks();
		},
		mixins: [Lang],
		watch: {
			'$route' () {
				
			},
			tab() {
				this.firstnameValid = true;
				this.lastnameValid = true;
				this.emailValid = true;
				this.agreeValid = true;
				this.passwordValid = true;
				this.cpasswordValid = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/kit.scss';

	.back {
		@include kit('p1', 'dark');
		background:url(../../assets/img/icon-small-arrow-left.svg) no-repeat;
		background-position: left;
		background-size: auto 8px;
		padding-left: 17px;
		position: absolute;
		top:158px;
		left:48px;
	}

	.box {
		padding-top: 40px;
		max-width: 741px;
		position: relative;

		&__label {
			@include kit('h6 300', 'dark');
			margin-bottom: 27px;
			text-align: center;
			text-transform: none;
			letter-spacing: .04em;
		}
	}

	.forgot {
		margin-top: 353px;
		&__h2 {
			@include kit('h2', 'dark');
			text-align: center;
			margin-bottom: 6px;
		}
		&__label {
			@include kit('p1', 'dark');
			margin-bottom: 45px;
			margin-top: 26px;
			text-align: center;
		}
		&__wrapper {
			max-width: 380px;
			text-align: center;
			margin: auto;
		}

		.login__button {
			margin-bottom: 6px;
		}
	}

	.tabs{
		display: flex;
		&__item {
			width: 50%;
			@include kit('h5 11 bold', 'dark');
			border-bottom: 1px solid #8B8B8B;
			color:#8B8B8B;
			padding-bottom: 13px;
			text-align: center;
			cursor: pointer;
			opacity: 0.5;

			&_active {
				opacity: 1;
				color:#0f0f0f;
				border-bottom: 1px solid #0f0f0f;
			}
		}
	}
	.login {
		margin: auto;
		margin-top: 200px;
		// padding-bottom: 219px;
		padding-bottom: 166px;
		position: relative;
		max-width: 380px;

		&_forgot {
			max-width: 540px;
		}

		&__remeber {
			margin-top: -21px;
			margin-bottom: -26px;
		}

		&__back {
			@include kit('p1', 'dark');
			background:url(../../assets/img/icon-small-arrow-left.svg) no-repeat;
			background-position: left;
			background-size: auto 8px;
			padding-left: 20px;
			position: absolute;
			top:-40px;
			left:48px;
		}

		&__wrapper {
			max-width: 1118px;
			margin: auto;
			position: relative;
		}
		
		&__head {
			border-bottom: 1px solid rgba(#C4C4C4, .2);
			padding-bottom: 10px;
		}

		&__body {
			position: relative;
		}

		&__container {
			display: flex;
			justify-content: space-between;
			padding-right: 56px;
			max-width: 741px;
		}

		&__title {
			font: 32px/40px 'Didot', Arial, Helvetica, sans-serif;
			color: #262626;
		}

		&__link {
			@include ui('link', 'dark');
			text-transform: none;
			display: inline-block;
		}

		&__button {
			@include ui('button', 'dark');
			margin-bottom: 20px;
			margin-top: 2px;
			margin-bottom: 18px;
			// margin-bottom: 39px;
		}

		&__box {
			&:nth-child(3) {
				padding-top: 1px;
			}
		}

		&__remeber {
			display: flex;
			justify-content: space-between;
			margin-top: 0;
		}

		&__forgot {
			@include ui('link', 'dark');
			@include kit('h6 300', 'dark');
			text-transform: none;
			color: rgba(0, 0, 11, 0.6);
			height: 16px;
			margin-top: 2px;
			display: none;

			&:after {
				bottom: 1px;
			}
		}

		&__social {
			@include ui('link-button', 'white');
			@include kit('h6 300', 'dark');
			text-transform: none;
			background: #F1F1F1;
			color:#262626;
			width: 182px;
			padding-right: 20px;
			margin-right: 16px;
			position: relative;
			margin-top: -6px;
			display:inline-block;
			box-sizing: border-box;
			padding-top: 15px;
			vertical-align: top;

			&:last-child {
				margin-right: 0;
			}

			&_facebook {
				&::after {
					content: "";
					display: block;
					position: absolute;
					top: calc(50% - 5px);
					right: 53px;
					background: #F1F1F1 url(../../assets/img/icon-facebook.svg) no-repeat;
					background-position: center;
					width: 6px;
					height: 10px;
				}
				
			}
			&_google {
				&::after {
					content: "";
					display: block;
					position: absolute;
					top: calc(50% - 5px);
					right: 53px;
					background: #F1F1F1 url(../../assets/img/icon-google.svg) no-repeat;
					background-position: center;
					width: 18px;
					height: 10px;
				}
			}
		}
	}

	.ui-input {
		width: 100%;
		display: inline-block;
		margin-right: 24px;

		& + {
			.ui-checkbox {
				margin-top: -8px;
			}
		}
	}

	.ui-checkbox {
		// margin-top: -9px;
		margin-bottom: 15px;

		&__label {
			max-width: calc(100% - 22px);
			letter-spacing: .04em;
			/deep/ a {
				text-decoration: underline;
			}
		}

		&_error {
			.ui-checkbox__icon {
				border-color: #EC2B2B;
			}
		}
	}

	@media screen and (max-width: 1200px) {
		.login {
			margin-top: 125px;
			// padding-bottom: 228px;
			// padding-bottom: 65px;

			&_forgot {
				margin-top: -46px;
				padding-bottom: 233px;
			}
		}

		.back {
			top: 81px;
			left: 40px;
		}
	}

	@media screen and (max-width: 960px) {
		.login {
			margin-top: 252px;
			margin-bottom: 130px;
		}

		.forgot {
			margin-top: 434px;

			&__h2 {
				font-size: 32px;
			}
		}

		.back {
			top: 79px;
			left: 32px;
		}
	}

	@media screen and (max-width: 650px) {
		.login {
			margin-top: 120px;
			max-width: 343px;
			margin-bottom: 0;
			padding-bottom: 118px;

			&__social {
				width: calc(50% - 4px);
				font-size: 0;
				margin-right: 8px;

				&:after {
					left: calc(50% - 3px);
				}
			}
			
			&_forgot {
				margin-top: 0;
				padding-bottom: 150px;
			}
		}

		.forgot {
			margin-top: 226px;

			&__label {
				text-align: center;
			}
		}

		.box {
			padding-top: 32px;
		}

		.back {
			top: 77px;
			left: 16px;
		}
	}

</style>
