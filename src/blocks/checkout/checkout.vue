<template lang="pug">
	.cart
		router-link.cart__back(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'cart/'", v-if="$route.params.step == 1 || $route.params.subcategory == 'login'") {{ $lang.checkout.back_to_cart }}
		router-link.cart__back(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'checkout/1/'", v-if="$route.params.step == 2") {{ $lang.checkout.back_to_checkout }}
		.cart__wrapper
			template(v-if="$route.params.subcategory == 'login'")
				block-login
			template(v-if="$route.params.step == 1")
				.cart__head
					.cart__container
						.cart__title {{ $lang.cart.checkout }}
				.cart__body
					.box
						.box__title {{ $lang.checkout.step1 }}
						.box__content
							v-input(v-model="firstname" :label="$lang.checkout.firstname" :type="'text'", :name="'firstname'" :isValid="firstnameValid" @keyup="firstnameValid = true")
							v-input(v-model="lastname", :label="$lang.checkout.lastname" :type="'text'", :name="'lastname'" :isValid="lastnameValid" @keyup="lastnameValid = true")
							v-input(v-model="email", :label="$lang.checkout.email" :type="'text'", :name="'email'" :isValid="emailValid" @keyup="emailValid = true")
							v-input(v-model="phone", :label="$lang.checkout.phone" :type="'text'", :name="'phone'")
					.box
						.box__title {{ $lang.checkout.step2 }}
						.box__content
							v-select.select(@input="setShippingMethod", :searchable="false", :value="shipping.types[0]", :options="shipping.types")
							template(v-if="shippingMethod.value == 'type1' || !shippingMethod")
								v-select.select(@input="setShippingAdress" :searchable="false", :value="shipping.stores[0]", :options="shipping.stores")
							.box__subcontent
								template(v-if="shippingMethod.value == 'type2'")
									v-input(v-model="street", :type="'text'", :label="$lang.checkout.street" :isValid="streetValid" @keyup="streetValid = true")
									v-input(v-model="house", :type="'text'", :label="$lang.checkout.house" :isValid="houseValid" @keyup="houseValid = true")
									v-input(v-model="apartment", :type="'text'", :label="$lang.checkout.apartment" :isValid="apartmentValid" @keyup="apartmentValid = true")
								template(v-if="shippingMethod.value == 'type3'")
									v-input(v-model="city", :type="'text'", :label="$lang.checkout.city" :isValid="cityValid" @keyup="cityValid = true")
									v-input(v-model="street", :type="'text'", :label="$lang.checkout.street" :isValid="streetValid" @keyup="streetValid = true")
									v-input(v-model="house", :type="'text'", :label="$lang.checkout.house" :isValid="houseValid" @keyup="houseValid = true")
									v-input(v-model="apartment", :type="'text'", :label="$lang.checkout.apartment" :isValid="apartmentValid" @keyup="apartmentValid = true")
								template(v-if="shippingMethod.value == 'type4'")
									v-input(v-model="city", :type="'text'", :label="$lang.checkout.city" :isValid="cityValid" @keyup="cityValid = true")
									v-input(v-model="department", :type="'text'", :label="$lang.checkout.department" :isValid="departmentValid" @keyup="departmentValid = true")
								
					.aside
						.promocode
							.promocode__box
								.promocode__title {{ $lang.cart.promocode }}
								button.promocode__add(@click="promocodeOpened = true")
							.promocode__box(v-if="promocodeOpened")
								.ui-input.promocode__ui-input(:class="[promocodeCheck ? 'ui-input_active' : '']")
									v-input(v-model="promocode", :label="$lang.cart.enter_promocode" :type="'text'", :name="'promocode'")
										//- input(type="text", v-model="promocode", name="promocode")
										//- .ui-input__name Enter your promocode
						block-totals
						button.cart__checkout(v-if="!loading", @click="payment()") {{ $lang.checkout.make_payment }}
						button.cart__checkout(v-if="loading") {{ $lang.checkout.processing }}
			
			template(v-if="$route.params.step == 2")
				div
					iframe.cart__pay(frameborder=0, :src="paymentUrl")
			template(v-if="$route.params.step == 'thanks'")
				.empty
					.empty__inner
						.empty__content
							.empty__title {{ $lang.checkout.thanks.title }}
							.empty__text {{ $lang.checkout.thanks.text }}
							router-link.empty__btn(to="'/'+ (lang === langDefault ? '' : lang + '/') + 'new-in'") {{ $lang.checkout.thanks.back }}

</template>

<script>
	import Vue from 'vue';
	import $api from '../../components/api';
	import $store from '../../components/store';
	import vInput from '../../components/input';
	import vSelect from 'vue-select';
	import bannerImg from '../../assets/uploads/banner-dogs.jpg';
	import payImg from '../../assets/uploads/pay.jpg';
	import BlockLogin from '../../blocks/login/login.vue';
	import BlockTotals from '../../blocks/cart/totals.vue';
	import axios from 'axios';
	import Lang from '../../components/lang.vue';

	var base = "https://api.villa.ua";

	export default {
		name: 'block-checkout',
		data: function(){
			return {
				bannerImg,
				payImg,
				firstname: '',
				firstnameValid: true,
				email:'',
				emailValid: true,
				lastname: '',
				lastnameValid: true,
				phone: '',
				city: '',
				cityValid: true,
				street: '',
				streetValid: true,
				house: '',
				houseValid: true,
				apartment: '',
				apartmentValid: true,
				department: '',
				departmentValid: true,
				shippingMethod:{label: '', value: 'type1'},
				value:"Choose your size",
				promocode:'',
				promocodeCheck:'',
				promocodeOpened:'',
				shippingAddress: {},
				loading:false,
				shipping:{types: [{}], stores: [{}]},
				langDefault: window.config.langDefault
			}
		},
		computed:{
			account() {
				var data = $store.state.account.info;
				return data == undefined ? {} : data;
			},
			paymentUrl() {
				var data = $store.state.payment.url;
				return data == undefined ? {} : data;				
			}
		},
		components:{
			'v-select': vSelect,
			'v-input': vInput,
			'block-login': BlockLogin,
			'block-totals': BlockTotals
		},
		methods:{
			isEmailValid(email) {
				var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    			return re.test(String(email).toLowerCase());
			},
			setShippingMethod(val){
				this.shippingMethod = val;
			},
			setShippingAdress(val){
				this.shippingAddress = val;
			},
			getPaymentUrl(payment){
				payment = payment.split("checkoutInit('")[1];
				payment = payment.split("');")[0];
				return payment;
			},
			payment(){
				let $this = this;

				let stringAddress = '';

				let adress = {
					"firstname": this.firstname,
					"lastname": this.lastname,
					"city": this.shippingMethod.value == 'type1' || this.shippingMethod.value == 'type2' ? 'Киев' : this.city,
					"address_1": this.street+', '+this.house+' кв.'+ stringAddress,
					"country_id": "220",
					"zone_id": "139",
					"custom_field": {
						"department": {
							"0": this.department
						},
						"shippingMethod": {
							"0": this.shippingMethod.value
						}
					}
				};

				if (this.shippingMethod.value === 'type1') {
					adress.address_1 = 'Самовывоз из ' + this.shippingAddress.label;
				}
				
				let isValidInfo = true;
				if (!this.firstname) {
					this.firstnameValid = false;
					isValidInfo = false;
				}

				if (!this.lastname) {
					this.lastnameValid = false;
					isValidInfo = false;
				}

				if (!this.isEmailValid(this.email)) {
					this.emailValid = false;
					isValidInfo = false;
				}

				if (this.shippingMethod.value == 'type2') {
					if (!this.street) {
						this.streetValid = false;
					}

					if (!this.house) {
						this.houseValid = false;
					}

					if (!this.apartment) {
						this.apartmentValid = false;
					}

					if (!this.street || !this.house || !this.apartment) return;
					adress.address_1 = 'Курьером по Киеву: ' + this.street + ', ' + this.house + ', кв. ' + this.apartment;
				}

				if (this.shippingMethod.value == 'type3') {
					
					if (!this.city) {
						this.cityValid = false;
					}

					if (!this.street) {
						this.streetValid = false;
					}

					if (!this.house) {
						this.houseValid = false;
					}

					if (!this.apartment) {
						this.apartmentValid = false;
					}

					if (!this.city || !this.street || !this.house || !this.apartment) return;
					adress.address_1 = 'Курьером по Украине: ' + this.city + ', ' + this.street + ', ' + this.house + ', кв. ' + this.apartment;
				}

				if (this.shippingMethod.value == 'type4') {

					if (!this.city) {
						this.cityValid = false;
					}

					if (!this.department) {
						this.departmentValid = false;
					}

					if (!this.city || !this.department) return;
					adress.address_1 = 'В отделении Новой Почты: ' + this.city + ', №' + this.department;
				}

				if (!isValidInfo) return;

				this.loading = true;

				const makeRequest = async () => {
					let isAddresses = await $api.checkout.setPaymentaddressNew(adress);
					if (!isAddresses) {
						$this.loading = false;
						return;
					}
					await $api.checkout.setShippingadressNew(adress);
					await $api.checkout.shippingmethodsNew();
					await $api.checkout.setShippingmethodsNew({"shipping_method" : "free.free" , "comment" : "string1"});
					await $api.checkout.paymentmethodsNew();
					await $api.checkout.setPaymentmethodsNew({payment_method: "oplata", agree: "1", comment: $this.shippingMethod.label});

					let confirm = await $api.checkout.confirmNew();
					$store.commit("setOrderData", confirm);
					let pay = await $api.checkout.payNew();
					$this.loading = false;
					$store.commit("setPaymentUrl", $this.getPaymentUrl(pay.payment));
					$this.$router.push({ name: 'Checkout Step', params: { step: 2 } });
				}

				makeRequest();

				// $api.checkout.setPaymentaddress(adress, function(data){
				// 	$api.checkout.setShippingadress(adress, function(data){
				// 		$api.checkout.shippingmethods(function(data){
				// 			$api.checkout.setShippingmethods({"shipping_method" : "free.free" , "comment" : "string1"}, function(data){
				// 				$api.checkout.paymentmethods(function(data){
				// 					$api.checkout.setPaymentmethods({payment_method: "oplata", agree: "1", comment: $this.shippingMethod.label}, function(data){
				// 						$api.checkout.confirm(function(data){
				// 							$store.commit("setOrderData", data);
				// 							$api.checkout.pay(function(data){
				// 								$this.loading = false;
				// 								$store.commit("setPaymentUrl", $this.getPaymentUrl(data.payment));
				// 								$this.$router.push({ name: 'Checkout Step', params: { step: 2 } });
				// 							});
				// 						});
				// 					});
				// 				});
				// 			});
				// 		});
				// 	});
				// }, function() {
				// 	$this.loading = false;
				// });
			}
		},
		mounted() {

			if (this.$route.params.step == 'thanks') {
				$api.cart.empty();
			}

			this.shipping = {
				types:[
					{
						label: this.$lang.checkout.pickup,
						value: 'type1'
					},
					{
						label: this.$lang.checkout.courier,
						value: 'type2'
					},
					{
						label: this.$lang.checkout.newpost_courier,
						value: 'type3'
					},
					{
						label: this.$lang.checkout.newpost_department,
						value: 'type4'
					},
				],
				stores:[
					{
						label:'RALPH LAUREN HOME - вул. Московська, 37/2, м. Київ, Україна',
						value: 'store1'
					},
					/*{
						label:'RALPH LAUREN HOME - MANDARIN PLAZA, 4 поверх, вул. Басейна, 4А, м. Київ, Україна',
						value: 'store2'
					},*/
					{
						label:'RALPH LAUREN HOME - Сади Перемоги, 4 поверх, пл. 10 квітня, м. Одеса, Україна',
						value: 'store3'
					},
					{
						label:'RALPH LAUREN HOME & DR. VRANJES - вул. Катерининська, 20, м. Одеса, Україна',
						value: 'store4'
					},
					{
						label:'DR. VRANJES - Гулівер, 1 поверх, Спортивна площа, 1а, м. Київ, Україна',
						value: 'store5'
					}
				]
			};
		},
		mixins: [Lang],
		watch: {
			'$route' () {
				
			},
			account() {
				this.firstname = this.account.firstname;
				this.lastname = this.account.lastname;
				this.email = this.account.email;
				this.phone = this.account.telephone;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/kit.scss';

	.empty {
		height: calc(100vh - 136px);
		font-size: 0;
		margin-top: 136px;

		&:before {
			content: "";
			display: inline-block;
			vertical-align: middle;
			height: 100%;
		}

		&__inner {
			display: inline-block;
			vertical-align: middle;
			width: 100%;
		}

		&__content {
			width: 318px;
			margin: auto;
			text-align: center;
		}

		&__title {
			@include kit('h2', 'dark');
			margin-bottom: 6px;
		}

		&__text {
			@include kit('p1', 'dark');
			margin-bottom: 48px;
		}

		&__btn {
			display: block;
			@include ui('button', 'dark');
			line-height: 43px;
			transition: opacity .5s ease;

			&:hover {
				opacity: .8;
			}
		}
	}

	.box {
		padding-top: 17px;
		padding-right: 56px;
		max-width: 740px;
		position: relative;

		&__title {
			@include kit('h5 11 bold', 'dark');
			margin-bottom: 16px;
		}
		&__content {
			margin-top: 33px;
			.ui-input {
				max-width: 318px;
				display: inline-block;
				margin-right: 24px;
			}
		}

		&__subcontent {
			padding-top: 16px;
		}

		&:nth-child(2) {
			.box__content {
				margin-top: 17px;
			}
		}
	}

	.cart {
		margin-top: 200px;
		padding-bottom: 300px;
		position: relative;

		&__pay {
			width: 100%;
			height: 835px;
		}

		&__back {
			@include kit('p1', 'dark');
			background:url(../../assets/img/icon-small-arrow-left.svg) no-repeat;
			background-position: left;
			background-size: auto 8px;
			padding-left: 17px;
			position: absolute;
			top:-43px;
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
			padding-top: 7px;
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
			letter-spacing: 0.01em;
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
			letter-spacing: 0.1em;
		}

		&__link {
			@include ui('link', 'dark');
			text-transform: none;
			display: inline-block;
		}
	}

	.poster {
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		width: 318px;
		border: 1px solid #f3f3f3;
		height: 130px;
		padding-top: 32px;
		padding-bottom: 30px;
		margin-bottom: 30px;
		text-align: center;

		&__title {
			@include kit('h5 11 bold', 'dark');
			text-transform: none;
			color: #0f0f0f;
			max-width: 152px;
			margin: auto;
			margin-bottom: 21px;
		}
		&__link {
			@include ui('link', 'dark');
			text-align: center;
			display: inline-block;
		}
	}

	.promocode {
		&__box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 32px;
		}

		
		input {
			border-top: 10px solid black;
		}
		

		&__title {
			@include kit('h6 300', 'dark');
			text-transform: none;
			letter-spacing: 0.04em;
		}

		&__ui-input {
			max-width: 100%;
			margin: 0;
			background-color: black;
		}

		&__add {
			width: 17px;
			height: 17px;
			border: 1px solid rgba(0, 0, 0, 0.16);
			border-radius: 50%;
			background: url(../../assets/img/icon-plus.svg) no-repeat;
			background-position: center;
		}
	}

	.total {
		opacity: 0.8;
		margin-bottom: 19px;

		&__group {
			@include kit('h6 300', 'dark');
			text-transform: none;
			color: #0f0f0f;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 13px;
			&_summ {
				@include kit('h5 11 bold', 'dark');
				text-transform: none;
				margin-top: 28px;
			}
		}
	}

	.counter {
		&__minus,
		&__plus {
			display: inline-block;
			vertical-align: middle;
			color: rgba(0, 0, 11, 0.64);
			font: 300 11px/1 'Museo', Arial, Helvetica, sans-serif;
			margin-top: -2px;
		}

		&__count {
			display: inline-block;
			vertical-align: middle;
			padding: 0 6px;
			height: 20px;
			font: 300 11px/1 'Museo', Arial, Helvetica, sans-serif;
			color: rgba(#0f0f0f, .7);
			background-color: #F3F3F3;
			text-align: center;
			min-width: 20px;
			margin: 0 9px;

			&:before {
				content: "";
				display: inline-block;
				vertical-align: middle;
				height: 100%;
			}
		}
	}

	.list {
		padding-right: 56px;
		max-width: 741px;
		position: relative;

		&:after {
			content: "";
			display: block;
			width: 1px;
			height: calc(100% - 16px);
			top: 16px;
			background-color: rgba(#C4C4C4, .2);;
			right: 0;
			position: absolute;
		}
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

	.info {

		&__block {
			display: inline-block;
			vertical-align: top;
			width: calc(100%/3);

			&:nth-child(1) {
				text-align: left;
			}

			&:nth-child(2) {
				text-align: center;
			}

			&:nth-child(3) {
				text-align: right;

				.info__value {
					color: #0f0f0f;
				}
			}
		}

		&__value {
			font: 300 11px/17px 'Museo', Arial, Helvetica, sans-serif;
			color: rgba(0,0,0,.6);
			letter-spacing: .4px;
		}
	}

	.aside {
		position: absolute;
		top:0;
		right: 1px;
		width: 318px;
		padding-top: 33px;
		text-align: center;
	}

	.select {
		border-radius: 0;
		border-color: #d6d6d6;
		@include kit('h6 300', 'dark');
		text-transform: none;
		margin-bottom: 16px;
		max-width: 318px;

		/deep/ .dropdown-toggle {
			border-radius: 0;
			border-color: #d6d6d6;
			height:44px;
			&::after {
				content:"";
				display: block;
				width: 37px;
				height: 44px;
				position: absolute;
				right:0;
				bottom:0;
				background: url(../../assets/img/arrow-down.svg) no-repeat;
				background-position: center;
				transition: transform 0.6s ease;
				transform: rotate(0deg);
			}
		}
		/deep/ .vs__selected-options {
			border-radius: 0;
			border-color: #d6d6d6;
			height:44px;
			width: 100%;	
		}
		/deep/  .selected-tag {
			position: absolute;
			width: 100%;
			height:44px;	
			margin: 0;
			padding-left: 14px;
			border:none;
		}
		/deep/ .vs__actions {
			display: none;
		}

		&.open {
			/deep/ .dropdown-toggle {
				&::after {
					transform: rotate(180deg);
				}
			}
		}
	}

	.select {
		border-radius: 0;
		// border-color: #d6d6d6;
		@include kit('h6 300', 'dark');
		text-transform: none;
		margin-bottom: 16px;
		background: none !important;
		box-shadow: none;

		/deep/ .dropdown-toggle {
			border-radius: 0;
			border-color: #d6d6d6;
			height:44px;
			transition: border-color .5s ease, border-radius .5s ease, background-color .5s ease, box-shadow .5s ease;
			background: transparent;

			&::after {
				content:"";
				display: block;
				width: 37px;
				height: 44px;
				position: absolute;
				right:0;
				bottom:0;
				background: url(../../assets/img/arrow-down.svg) no-repeat;
				background-position: center;
				transition: transform 0.6s ease;
				transform: rotate(0deg);
			}
		}
		/deep/ .vs__selected-options {
			border-radius: 0;
			border-color: #d6d6d6;
			height:44px;
			padding: 0;
		}
		/deep/  .selected-tag {
			position: absolute;
			width: 100%;
			height:44px;	
			margin: 0;
			padding-left: 14px;
			padding-right: 36px;
			// border:none;
			transition: color .5s ease;
		}
		/deep/ .vs__actions {
			display: none;
		}
		
		/deep/ .vs__option {
			opacity: 1;
			background: red;
		}
		
		/deep/ .dropdown-menu {
			@include kit('h6 300', 'dark');
			// box-shadow: 0px 2px 50px rgba(0, 0, 0, 0.07);
			border-radius: 0 0 4px 4px;
			text-transform: none;
			padding: 0;
			overflow: visible;

			li {
				color: rgba(#262626, .8);

				&.active {
					display: none;
				}

				&.active,
				&.highlight {
					background: none;
				}

				&.highlight {
					& a {
						background: none;
						color: #333;
					}
				}

				&:hover {
					& + li {
						a {
							&:before {
								opacity: 0;
							}
						}
					}
					a {
						background-color: #F3F3F3;
						color: rgba(#262626, .8);
					}
				}

				&:active {
					background-color: rgba(255, 255, 255, 0);
					outline: none;
				}
			}

			a {
				display: block;
				background: none;
				color: rgba(#262626, .8);
				padding: 16px 16px;
				position: relative;
				transition: background-color .5s ease;
				word-wrap:initial;
				white-space:initial;

				&:before {
					content: "";
					display: block;
					position: absolute;
					top: 0;
					left: 10px;
					width: calc(100% - 20px);
					height: 1px;
					background-color: #F3F3F3;
					transition: opacity .5s ease;
				}

				&:hover {
					background-color: #F3F3F3;
					color: rgba(#262626, .8);
				}
			}
		}

		/deep/ .dropdown-menu {
				
			border: none;
		}

		&.open {
			opacity: 1;

			/deep/ .dropdown-toggle {
				border-color: transparent;
				box-shadow: 0px 2px 6px 0px rgba(0,0,0,.15);
				opacity: 1;
				background-color: #fff;
				// box-shadow: none;
				border-radius: 4px 4px 0 0;
				color: rgba(#262626, .6);

				&::after {
					transform: rotate(180deg);
				}
			}

			/deep/ .vs__selected-options {
				opacity: 1;
				box-shadow: none;
			}

			/deep/ input {
				opacity: 1;
				box-shadow: none;
				outline: none;
			}

			/deep/ .selected-tag {
				opacity: 1;
				box-shadow: none;
				color: rgba(#262626, .6);
			}

			border-radius: 4px 4px 0 0;
			// box-shadow: 0px 2px 50px rgba(0, 0, 0, 0.07);
		}
	}

	@media screen and (max-width: 1200px) {
		.cart {
			margin-top: 124px;
			padding-bottom: 24px;

			&__wrapper {
				max-width: 945px;
			}
		}

		.select {
			max-width: 290px;
		}

		.box {
			width: 645px;
			padding-right: 0;
			padding-top: 33px;

			&__content {
				margin-top: 23px;

				.ui-input {
					max-width: 290px;
					margin-right: 32px;
				}
			}

			&:nth-child(2) {
				padding-top: 17px;
			}
		}

		.aside {
			width: 271px;
			padding-top: 41px;
		}
	}

	@media screen and (max-width: 960px) {
		.cart {
			padding-bottom: 37px;

			&__wrapper {
				max-width: 705px;
			}

			&__head {
				text-align: center;

				.cart__container {
					text-align: center;
					display: block;
					padding-right: 0;
				}
			}

			&__body {
				margin: auto;
				max-width: 336px;
			}
		}

		.box {
			width: 100%;
			padding-top: 31px;

			&__title {
				text-align: center;
			}

			&__content {
				margin-top: 31px;

				.ui-input {
					max-width: 100%;
				}
			}

			&:nth-child(2) {
				padding-top: 9px;
			}
		}

		.select {
			max-width: 100%;
		}

		.aside {
			position: relative;
			top: 0;
			right: 0;
			width: 100%;
			padding: 49px 8px 0;

			&:before {
				content: "";
				display: block;
				position: absolute;
				width: 100vw;
				max-width: 705px;
				height: 1px;
				background-color: #f3f3f3;
				top: 8px;
				left: 50%;
				transform: translateX(-50%);
			}
		}
	}

	@media screen and (max-width: 650px) {
		.cart {
			margin-top: 104px;
			padding-bottom: 15px;

			&__back {
				left: 20px;
			}

			&__title {
				text-align: left;
			}

			&__wrapper {
				max-width: 343px;
			}

			&__body {
				padding-top: 9px;
				max-width: 100%;
			}

			&__back {
				top: -35px;
			}

			&__pay {
				height: 560px;
			}
		}

		.box {
			&__title {
				text-align: left;
			}
		}

		.aside {
			padding: 49px 0 0;

			&:before {
				max-width: 343px;
			}
		}
	}
</style>
