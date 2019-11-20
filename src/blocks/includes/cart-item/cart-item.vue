<template lang="pug">
    .card(v-for="(product, index) in products")
        template(v-if="isMobile")
            .card__remove(@click="remove(product.key, index)")
            .card__image
                .card__bg(:style="{backgroundImage:'url('+image(product.image)+')'}")
            .card__content
                .card__row
                    .card__part.card__part_left
                        .card__title {{ product.brand.name }}
                        router-link.card__text(to="#") {{ product.name }}
                        .card__details Size: 18" L x 18" W.<br> Color: Black
                    .card__part.card__part_right
                        .info
                            .info__block
                                .info__value
                                    .counter
                                        button.counter__minus(@click="quantity(product.key, index, Number(product.quantity) - 1)") -
                                        input.counter__count(type="number", :value="product.quantity" @input="quantity(product.key, index, $event.target.value)")
                                        button.counter__plus(@click="quantity(product.key, index, Number(product.quantity) + 1)") +
                            .info__block
                                .info__value {{ product.price_raw }} ГРН
                            .info__block
                                .info__value {{ summ(product) }} ГРН
            .card__row.card__row_mobile
                .card__part.card__part_left
                    button.btn-gift(@click="toggleGiftWrap(product)")
                        .btn-gift__icon
                            img(src="@/assets/img/gift.svg")
                        .btn-gift__text Add Gift Wrap
                .card__part.card__part_right
                    button.btn-control(@click="addToWishList(product)") Move to wishlist
                    button.btn-control(@click="remove(product.key, index)") Remove
        template(v-else)
            .card__image
                .card__bg(:style="{backgroundImage:'url('+image(product.image)+')'}")
            .card__content
                    .card__row
                        .card__part.card__part_left
                            .card__title {{ product.brand.name }}
                            router-link.card__text(to="#") {{ product.name }}
                            .card__details Size: 18" L x 18" W.<br> Color: Black
                        .card__part.card__part_right
                            .info
                                .info__block
                                    .info__value {{ product.price_raw }} ГРН
                                .info__block
                                    .info__value
                                        .counter
                                            button.counter__minus(@click="quantity(product.key, index, Number(product.quantity) - 1)") -
                                            input.counter__count(type="number", :value="product.quantity" @input="quantity(product.key, index, $event.target.value)")
                                            button.counter__plus(@click="quantity(product.key, index, Number(product.quantity) + 1)") +
                                .info__block
                                    .info__value {{ summ(product) }} ГРН
                    .card__row
                        .card__part.card__part_left
                            button.btn-gift(@click="toggleGiftWrap(product)")
                                .btn-gift__icon
                                    img(src="@/assets/img/gift.svg")
                                .btn-gift__text Add Gift Wrap
                        .card__part.card__part_right
                            button.btn-control(@click="addToWishList(product)") Move to wishlist
                            button.btn-control(@click="remove(product.key, index)") Remove
</template>


<script>
	import Vue from 'vue';
	
	import $store from '../../components/store';
	import $api from '../../components/api.js';
	import cartItem from '../../assets/uploads/cart_card.png';
	import Lang from '../../components/lang.vue';

	export default {
		name: 'block-cart',
		data: function(){
			return {
				cartProducts:[],
				promocode:'',
				promocodeOpened:false,
				cartItem: cartItem,
				isMobile: false
			}
		},
		computed: {
			logged() {
				return $store.state.account.logged				
			},
			products() {
				var data = $store.state.cart.data.products;
				return data == undefined ? [] : data;		
			},
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
		},
		methods:{
			image(img) {
				return (img.indexOf('.tiff') > 0 || img.indexOf('.jpeg') < 0) ? "https://api.villa.ua/image/cache/no_image-600x600.png" : img;
			},
			quantity(key, index, val) {
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
			addToWishList(product){
				let $this = this;
				Vue.notify({
					group: 'notify',
					type: 'wishlist',
					title: product.name,
					text: $this.$lang.notifications.added_to_wishlist
				});
			},
			toggleGiftWrap(product) {
				
			}
		},
		mixins: [Lang],
		watch: {
			'$route' () {
				
			},
		}
	}
</script>

<style lang="scss" scoped>
    @import '@/helpers/sass/kit.scss';

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

	@media only screen and (max-width: 1200px) {
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
	}

	@media only screen and (max-width: 960px) {

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

	}

	@media only screen and (max-width: 640px) {
		.btn-control {
			
			&:nth-child(2) {
				display: none;
			}
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
		}

		.info {

			&__block {

				&:nth-child(2) {
					text-align: left;
				}
			}
		}
	}
</style>
