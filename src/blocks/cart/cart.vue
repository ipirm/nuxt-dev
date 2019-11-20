<template lang="pug">
	.cart(v-if="products.length")
		.cart__wrapper
			.cart__head
				.cart__container
					.cart__title {{ $lang.cart.title }}
					.cart__heading
						.cart__column {{ $lang.cart.item_price }}
						.cart__column {{ $lang.cart.item_qty }}
						.cart__column {{ $lang.cart.item_total_price }}
			.cart__body
				.list
					.card(v-for="(product, index) in products")
						template(v-if="isMobile")
							.card__remove(@click="remove(product.key, index)")
							.card__image
								.card__bg(:style="{backgroundImage:'url('+image(product.image_thumb)+')'}")
							.card__content
								.card__row
									.card__part.card__part_left
										router-link.card__title(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'brand/' + product.brand.id") {{ product.brand.name }}
										router-link.card__text(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'undefined/undefined' + getUrl(product.seo_url, product.product_id)") {{ product.name }}
										.card__details
											span(v-if="getSize(product)") {{ $lang.cart.size }} {{ getSize(product) }}
											span(v-if="getColor(product.attribute_groups)") {{ $lang.cart.color }} {{ getColor(product.attribute_groups) }}
									.card__part.card__part_right
										.info
											.info__block
												.info__value
													.counter
														button.counter__minus(@click="quantity(product.key, index, Number(product.quantity) - 1)") -
														input.counter__count(type="number", :value="product.quantity" @input="quantity(product.key, index, $event.target.value)")
														button.counter__plus(@click="quantity(product.key, index, Number(product.quantity) + 1)") +
											.info__block
												.info__value {{ product.price_raw }} {{ $lang.product.uah }}
												.info__value.info__value_old(v-if="getOldPrice(product)") {{ getOldPrice(product) }} {{ $lang.product.uah }}
											.info__block
												.info__value {{ summ(product) }} {{ $lang.product.uah }}
							.card__row.card__row_mobile
								.card__part.card__part_left
									button.btn-gift(@click="toggleGiftWrap($event, product)" v-bind:class="{'btn-gift_active': getWrap(product)}" :disabled="busyIds.indexOf(product.product_id) >= 0")
										.btn-gift__icon
											img.btn-gift__i(src="@/assets/img/gift.svg")
											img.btn-gift__i.btn-gift__i_active(src="@/assets/img/icon-status-check.svg")
										.btn-gift__text {{ $lang.cart.add_wrap }}
									button.ui-status
										.ui-status__icon
										.ui-status__label

								.card__part.card__part_right
									button.btn-control(@click="addToWishList(product, product.key, index)") {{ checkWishList(product.seo_url+'-'+product.product_id) ? $lang.product.remove_from_wishlist : $lang.product.add_to_wishlist }}
									button.btn-control(@click="remove(product.key, index)") {{ $lang.cart.remove }}
						template(v-else)
							.card__image
								.card__bg(:style="{backgroundImage:'url('+image(product.image_thumb)+')'}")
							.card__content
									.card__row
										.card__part.card__part_left
											router-link.card__title(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'brand/' + product.brand.id") {{ product.brand.name }}
											router-link.card__text(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'undefined/undefined' + getUrl(product.seo_url, product.product_id)") {{ product.name }}
											.card__details
												span(v-if="getSize(product)") {{ $lang.cart.size }} {{ getSize(product) }}
												span(v-if="getColor(product.attribute_groups)") {{ $lang.cart.color }} {{ getColor(product.attribute_groups) }}
										.card__part.card__part_right
											.info
												.info__block
													.info__value {{ product.price_raw }} {{ $lang.product.uah }}
													.info__value.info__value_old(v-if="getOldPrice(product)") {{ getOldPrice(product) }} {{ $lang.product.uah }}
												.info__block
													.info__value
														.counter
															button.counter__minus(@click="quantity(product.key, index, Number(product.quantity) - 1)") -
															input.counter__count(type="number", min="1" :value="product.quantity" @input="quantity(product.key, index, $event.target.value, $event)")
															button.counter__plus(@click="quantity(product.key, index, Number(product.quantity) + 1)") +
												.info__block
													.info__value {{ summ(product) }} {{ $lang.product.uah }}
									.card__row
										.card__part.card__part_left
											button.btn-gift(@click="toggleGiftWrap($event, product)" v-bind:class="{'btn-gift_active': getWrap(product)}" :disabled="busyIds.indexOf(product.product_id) >= 0")
												.btn-gift__icon
													img.btn-gift__i(src="@/assets/img/gift.svg")
													img.btn-gift__i.btn-gift__i_active(src="@/assets/img/icon-status-check.svg")
												.btn-gift__text {{ $lang.cart.add_wrap }}
										.card__part.card__part_right
											button.btn-control(@click="addToWishList(product)") {{ checkWishList(product.seo_url+'-'+product.product_id) ? $lang.product.remove_from_wishlist : $lang.product.add_to_wishlist }}
											button.btn-control(@click="remove(product.key, index)") {{ $lang.cart.remove }}
				.aside
					//- .poster(v-if="logged == 0", :style="{backgroundImage:'url('+bannerImg+')'}")
					//- 	.poster__title {{ $lang.cart.club.title }}
					//- 	button.link.poster__link(@click="openLoginDiscount") {{ $lang.cart.club.sign }}
					.promocode
						.promocode__box
							.promocode__title {{ $lang.cart.promocode }}
							button.promocode__add(@click="promocodeOpened = !promocodeOpened" v-bind:class="{promocode__add_close: promocodeOpened}")
						.promocode__box(v-if="promocodeOpened")
							v-input(v-model="promocode", :isPromo="true" :label="$lang.cart.enter_promocode" :type="'text'", :name="'promocode'")
							button.promocode__apply(@click="applyPromocode()" v-show="promocode.length > 0") {{ $lang.cart.apply }}
					block-totals
					template(v-if="logged")
						router-link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'checkout/1'")
							button.cart__checkout {{ $lang.cart.checkout }}
					template(v-else)
						button.cart__checkout(@click="openLogin") {{ $lang.cart.checkout }}
					a.link.cart__link(href="/new-in") {{ $lang.cart.continue_shopping }}
	.empty(v-else)
		.empty__inner
			.empty__content
				.empty__title {{ $lang.cart.empty.title }}
				.empty__text {{ $lang.cart.empty.text }}
				router-link.empty__btn(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'new-in'") {{ $lang.cart.empty.in_store }}

				
</template>

<script>
	import Vue from 'vue';
	
	import $store from '../../components/store';
	import $api from '../../components/api.js';
	import cartItem from '../../assets/uploads/cart_card.png';
	import bannerImg from '../../assets/uploads/banner-dogs.jpg';
	import blockTotals from '../cart/totals.vue';
	import Lang from '../../components/lang.vue';

	import vInput from '../../components/input';
	// import cartItem from '../../includes/cart-item/cart-item.vue';

	export default {
		name: 'block-cart',
		data: function(){
			return {
				cartProducts:[],
				promocode:'',
				promocodeOpened:false,
				cartItem: cartItem,
				bannerImg,
				isMobile: false,
				busyIds: [],
				loginModalTitle: {
					ua: '',
					en: '',
					ru: ''
				},
				loginModalSubtitle: {
					ua: '',
					en: '',
					ru: ''
				},
				loginModalTitleDiscount: {
					ua: 'Увійдіть для отримання знижки',
					en: 'Sign in for your discount',
					ru: 'Войдите, чтобы получить скидку'
				},
				loginModalSubtitleDiscount: {
					ua: '',
					en: '',
					ru: ''
				},
				productsData: {},
				langDefault: window.config.langDefault
			}
		},
		components:{
			'block-totals':blockTotals,
			'v-input': vInput,
			// 'cart-item': cartItem,
		},
		mixins: [Lang],
		computed: {
			logged() {
				return $store.state.account.logged				
			},
			products() {
				var th = this;
				var data = $store.state.cart.data.products;
				// if (data != undefined && data.length) {
				// 	data.forEach(function(item) {
				// 		$api.getProductById(item.product_id, function(product) {
				// 			th.productsData[product.product_id] = product;
				// 		});
				// 	});
				// }
				return data == undefined ? [] : data;		
			},
			wishlist() {
				var data = $store.state.wishlist.data;
				return data == undefined ? {} : data;
			}
		},
		mounted () {
			let width;
			let th = this;
			width = window.innerWidth;
				if ( width <= 640) {
					th.isMobile = true;
				} else {
					th.isMobile = false;
				}
			window.addEventListener('resize', function() {
				width = window.innerWidth;
				if ( width <= 640) {
					th.isMobile = true;
				} else {
					th.isMobile = false;
				}
			});

			window.addEventListener("load", () => {

				for (let product of this.products) {

					var elWrap = product.option.find(function(item) {
						return item.name == 'упаковка' || item.name === 'packaging' || item.name === 'Упаковка';
					});

					if (elWrap !== undefined && elWrap.value === 'Да') {
						$store.commit('plusWrap');
					}
				}
			})

		},
		methods:{
			getOldPrice(product) {
				if (product.attribute_groups == undefined) return false;
				var el = product.attribute_groups[0].attribute.find(function(item) {
					return item.name === 'Старая цена';
				});

				if (el) {
					return el.text > product.price ? el.text : false;
					// return el.text;
				}

				return false;
			},
			getWrap(product) {
				var elWrap = product.option.find(function(item) {
					return item.name == 'упаковка' || item.name === 'packaging' || item.name === 'Упаковка';
				});
				
				// console.log(elWrap);

				if (elWrap !== undefined && elWrap.value === 'Да') {
					return true;
				}

				return false;
			},
			openLogin() {
				let th = this;

				$store.commit('setLoginModalTitle', th.loginModalTitle[$store.state.lang.code]);
				$store.commit('setLoginModalSubtitle', th.loginModalSubtitle[$store.state.lang.code]);
				$store.commit('setLoginModalActive', true);
			},
			openLoginDiscount() {
				let th = this;

				$store.commit('setLoginModalTitle', th.loginModalTitleDiscount[$store.state.lang.code]);
				$store.commit('setLoginModalSubtitle', th.loginModalSubtitleDiscount[$store.state.lang.code]);
				$store.commit('setLoginModalActive', true);
			},
			image(img) {
				if (img == null || img == undefined) return "https://api.villa.ua/image/cache/no_image-600x600.png";
				return (img.indexOf('.tiff') > 0 || img.indexOf('.jpeg') < 0) ? "https://api.villa.ua/image/cache/no_image-600x600.png" : img;
			},
			quantity(key, index, val, event) {
				// console.log($store.state.cart.data.products[index].quantity);
				// if (!+event.data) {

				// 	console.log(val.toString());
				// }
				$api.cart.update(key, val);
				$store.commit("setCartQuantity", {index:index, quantity:val});
			},
			summ(product){
				return product.price_raw*product.quantity;
			},
			remove(key, index) {
				$api.cart.delete(key);
				$store.commit("removeCartItem", index);
			},
			checkWishList(seo_url){
				return (seo_url in this.wishlist) ? true : false;
			},
			addToWishList(product){
			

				let $this = this;

				let id = product.product_id;
				let seo_url = product.seo_url+'-'+product.product_id;

				if ($store.state.account.logged) {

					if (this.checkWishList(seo_url)) {
						$api.wishlist.delete(id, seo_url);
						Vue.notify({
							group: 'notify',
							type: 'wishlist',
							title: product.name,
							text: $this.$lang.notifications.removed_from_wishlist,
							//duration: 100000,
						});
					} else {
						$api.wishlist.add(id, seo_url);
						Vue.notify({
							group: 'notify',
							type: 'wishlist',
							title: product.name,
							text: $this.$lang.notifications.added_to_wishlist,
							//duration: 100000,
						});
					}

				} else {
					$store.commit('setLoginModalTitle', $this.loginModalTitle[$store.state.lang.code]);
					$store.commit('setLoginModalSubtitle', $this.loginModalSubtitle[$store.state.lang.code]);
					$store.commit('setLoginModalActive', true);
				}
			},
			applyPromocode() {
				var promo = this.promocode;

				let $this = this;

				Vue.notify({
					group: 'notify',
					type: 'error',
					title: $this.$lang.notifications.error,
					text: $this.$lang.notifications.error_promocode,
					duration: 10000
				});
			},
			toggleGiftWrap(event, product) {

				let th = this;

				this.busyIds.push(product.product_id);

				if (event.currentTarget.classList.contains('btn-gift_active')) {
					event.currentTarget.classList.remove('btn-gift_active');
					$api.updateWrap(product, false, function() {
						th.busyIds.splice(th.busyIds.indexOf(product.product_id), 1);
						$store.commit('minusWrap');
					});
				} else {
					event.currentTarget.classList.add('btn-gift_active');
					$api.updateWrap(product, true, function() {
						th.busyIds.splice(th.busyIds.indexOf(product.product_id), 1);
						$store.commit('plusWrap');
					});
				}

				// var id = 0;
				// var val = false;

				// var elWrap = product.selectedOptions.find(function(item) {
				// 	if (item.name == 'упаковка') {
				// 		// val = !item.
				// 	}
				// 	return true;
				// });
				
			},
			getSize(product){

				var options = product.option;

				var opt = options.find(function(item) {
					return item.name === 'Size';
				});

				if (opt) {
					return opt.value;
				}

				// var data = attr ? attr[0].attribute : [];
				// let attrs = false;
				// data ? data.forEach(e => {
				// 	(!attrs && e.attribute_id == 15) ? attrs = e.text : false;
				// }) : false;
				// return attrs;
			},
			getColor(attr){
				var data = attr ? attr[0].attribute : [];
				let attrs = false;
				data ? data.forEach(e => {
					(!attrs && e.attribute_id == 13) ? attrs = e.text : false;
				}) : false;
				return attrs;					
			},
			getUrl(seo_url, id) {
				return '/'+ ($store.getters['getLangCode'].code === this.langDefault ? '' : $store.getters['getLangCode'].code + "/") + seo_url.replace($store.getters['getLangCode']+'-', '')+'-'+id;
			}
		},
		watch: {
			'$route' () {
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/kit.scss';

	input[type=number] {
		-moz-appearance:textfield;
	}

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

	.cart {
		margin-top: 205px;
		padding-bottom: 300px;

		&__wrapper {
			max-width: 1118px;
			margin: auto;
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
			margin-bottom: 17px;
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
		padding-top: 30px;
		padding-bottom: 30px;
		margin-bottom: 32px;
		text-align: center;

		&__title {
			@include kit('h5 11 bold', 'dark');
			text-transform: none;
			color: #0f0f0f;
			max-width: 152px;
			margin: auto;
			margin-bottom: 19px;
		}
		&__link {
			@include ui('link', 'dark');
			font-size: 10px;
			letter-spacing: 0.02em;
			text-align: center;
			display: inline-block;
			&:after {
				bottom: -1px;
			}
		}
	}

	.promocode {
		margin-top: 15px;


		input {
			border-top: 10px solid black;
		}
		

		&__box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 28px;
			position: relative;

			&:last-child {
				margin-bottom: 40px;
			}
		}

		&__apply {
			position: absolute;
			top: 4px;
			right: 7px;
			color: #262626;
			@include kit('h4', 'dark');
			font-weight: 300;
			transition: opacity .5s ease;

			&:hover {
				opacity: .7;
			}
		}

		/deep/ .ui-input {
			margin-bottom: 0;
		}

		&__ui-input {
			max-width: 100%;
			margin: 0;
		}

		&__title {
			@include kit('h6 300', 'dark');
			text-transform: none;
		}

		&__add {
			width: 17px;
			height: 17px;
			border: 1px solid rgba(0, 0, 0, 0.16);
			border-radius: 50%;
			background: url(../../assets/img/icon-plus.svg) no-repeat;
			background-position: center;

			&_close {
				background: url(../../assets/img/icon-minus.svg) no-repeat;
				background-position: center;
			}
		}
	}

	.total {
		opacity: 0.8;
		margin-bottom: 19px;
		padding-right: 2px;
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
				padding-top: 15px;
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
			width: 26px;
			height: 20px;
			font: 300 11px/1 'Museo', Arial, Helvetica, sans-serif;
			color: rgba(#0f0f0f, .7);
			background-color: #F3F3F3;
			text-align: center;
			min-width: 20px;
			margin: 0 9px;
			-webkit-appearance: none; 
			-moz-appearance: none; 
			appearance: none; 
			&::-webkit-inner-spin-button,
			::-webkit-outer-spin-button {
				-webkit-appearance: none;
				margin: 0;
			}
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
			background-repeat: no-repeat;
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
			text-transform: uppercase;
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

			span {
				display: block;
				text-transform: capitalize;
			}
		}
	}

	.btn-gift {
		padding-left: 24px;
		position: relative;
		margin-bottom: 7px;
		transition: opacity .5s ease;

		&__icon {
			position: absolute;
			top: 2px;
			left: 1px;
		}

		&__text {
			color: rgba(#0f0f0f, .8);
			font: 300 11px/17px 'Museo', Arial, Helvetica, sans-serif;
			letter-spacing: .4px;
			vertical-align: middle;
		}

		&__i {
			vertical-align: middle;
			&_active {
				display: none;
				margin-top: -2px;
			}
		}

		&[disabled] {
			opacity: .4;
			cursor: default;
		}

		&_active {
			.btn-gift__i {
				display: none;

				&_active {
					display: inline-block;
				}
			}
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

			&_old {
				opacity: .4;
				font-size: 11px;
				text-decoration: line-through;
			}
		}
	}



	

	.aside {
		position: absolute;
		top:0;
		right: 0;
		width: 321px;
		padding-top: 16px;
		text-align: center;
	}

	@media only screen and (max-width: 1200px) {

		.empty {
			margin-top: 70px;
		}
		
		.cart {
			margin-top: 124px;
			padding-bottom: 89px;

			&__wrapper {
				max-width: 100%;
				padding: 0 40px;
			}

			&__container {
				max-width: 668px;
			}

			&__head {
				padding-bottom: 11px;
			}

			&__body {
				font-size: 0;
				letter-spacing: 0;
				overflow: hidden;
			}

			&__checkout {
				margin-bottom: 21px;
			}
		}

		.counter {
			margin-top: -2px;
			padding-right: 9px;

			&__count {
				width: 20px;
				padding: 0 2px;
			}
		}

		.list {
			max-width: 642px;
			padding-right: 30px;
			width: 68%;
			display: inline-block;
			vertical-align: top;
		}

		.card {
			padding-top: 24px;
			padding-bottom: 12px;

			&__image {
				width: 102px;
				height: 137px;
				margin-right: 18px;
			}

			&__content {
				width: calc(100% - 120px);
				padding-top: 11px;
				// height: 147px;
				min-height: 133px;
				height: 100%;
			}

			&__title {
				text-transform: uppercase;
				letter-spacing: 0.05em;
			}

			&__text {
				margin-top: 1px;
				padding-right: 20px;
			}

			&__details {
				margin-top: 16px;
				span {
					text-transform: capitalize;
				}
			}

			&__part {

				&_right {
					margin-top: -1px;
					width: 256px;
				}

				&_left {
					width: calc(100% - 256px);
				}
			}
		}

		.aside {
			width: 272px;
			padding-top: 23px;
			display: inline-block;
			position: static;
			float: right;
		}

		.promocode {

			&__box {

				&:last-child {
					margin-bottom: 32px;
				}
			}
		}

		.poster {
			width: 100%;
			height: 132px;
			padding-top: 37px;
			padding-bottom: 0;

			&__title {
				margin-bottom: 6px;
			}
		}
	}

	@media only screen and (max-width: 960px) {
		.cart {
			margin-top: 114px;
			padding-bottom: 50px;

			&__wrapper {
				padding: 0 32px;
			}

			&__container {
				width: 100%;
				max-width: 100%;
				padding-right: 0;
			}
		}

		.list {
			width: 100%;
			max-width: 100%;
			padding-right: 0;	
			display: block;
			padding-top: 10px;

			&::after {
				display: none;
			}
		}

		.card {
			padding-bottom: 12px;
			padding-top: 13px;

			&__content {
				height: 133px;
			}

			&:last-of-type {
				position: relative;
				margin-bottom: 65px;

				&::after {
					content: '';
					display: inline-block;
					position: absolute;
					width: 100%;
					height: 1px;
					left: 0;
					bottom: -34px;
					background-color: rgba(196, 196, 196, 0.2);
				}
			}
		}

		.aside {
			position: static;
			margin: 0 auto;
			width: 318px;
			display: block;
			float: none;

			.poster {
				padding-top: 31px;
				
				&__title {
					margin-bottom: 24px;
				}
			}
		}
	}

	@media only screen and (max-width: 650px) {
		.cart {
			margin-top: 104px;
			padding-bottom: 51px;
			// padding-bottom: 53px;

			&__wrapper {
				padding: 0 16px;
			}

			&__heading {
				display: none;
			}
		}

		.btn-control {
			
			// &:nth-child(2) {
			// 	display: none;
			// }
		}

		.card {
			max-width: 420px;
			display: block;
			margin: 0 auto;
			padding-bottom: 16px;
			margin-bottom: 11px;
			padding-top: 14px;

			&__image {
				width: 96px;
				height: 128px;
				margin-right: 16px;
			}

			&__details {
				margin-top: 9px;
			}

			&__text {
				padding-right: 20px;
			}

			&__content {
				width: calc(100% - 112px);
				height: auto;
				padding-top: 9px;
			}

			&__remove {
				width: 30px;
				height: 30px;
				position: absolute;
				top: 15px;
				right: 0;
				z-index: 1;
				display: none;

				&::before, &::after {
					content: '';
					display: inline-block;
					position: absolute;
					width: 11px;
					top: 50%;
					right: -1px;
					height: 1px;
					z-index: 0;
					background-color: #262626;
					transform: translate3d(0, -50%, 1px) rotate(-45deg);
				}

				&::after {
					transform: translate3d(0, -50%, 1px) rotate(45deg);
				}
			}

			&__row {

				&:nth-child(2) {
					position: static;
				}

				&_mobile {
					margin-top: 11px;

					.card__part_left {
						min-width: 100px;
						width: auto;
						display: inline-block;
						vertical-align: top;
					}

					.card__part_right {
						width: auto;
						display: inline-block;
						margin-top: 0;
						float: right;
					}
				}
			}

			&__part {

				&_left {
					width: 100%;
				}

				&_right {
					width: 100%;
					margin-top: 15px;
				}
			}

			&:last-of-type {
				border-bottom: none;

				&::after {
					bottom: -25px;
				}
			}
		}

		.aside {
			width: 100%;
			max-width: 420px;
		}

		.info {

			&__block {

				&:nth-child(2) {
					text-align: left;
				}
			}
		}

		.link {
			padding-bottom: 2px;

			&::after {
				bottom: 0;
			}
		}
	}

</style>
