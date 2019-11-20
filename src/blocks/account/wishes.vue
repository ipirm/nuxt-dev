<template lang="pug">
	.wishes
		.wishes__h2 {{ $lang.account.wishes.title }}
		.wishes__body
			.list
				.card(v-for="wish in wishlist")
					.card__image
						.card__bg(:style="{backgroundImage:'url('+image(wish.image_thumb)+')'}")
					.card__content
						.card__row
							.card__part.card__part_left
								.card__title
									router-link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'brand/' + wish.brand.id") {{ wish.brand.name }}
								router-link.card__text(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'undefined/undefined' + getUrl(wish.seo_url, wish.product_id)") {{ wish.name }}
								.card__details
									div(v-if="getSize(wish.attribute_groups).length") {{ $lang.cart.size }} {{ getSize(wish.attribute_groups) }}
									div(v-if="getColor(wish.attribute_groups).length") {{ $lang.cart.color }} {{ getColor(wish.attribute_groups) }}
							.card__part.card__part_right
								.price {{ parseInt(wish.price, 10) }} {{ $lang.product.uah }}
								.price.price_old(v-if="getOldPrice(wish)") {{ getOldPrice(wish) }} {{ $lang.product.uah }}
						.card__row
							.desktop
								.card__part.card__part_left
									//- button.btn-gift(@click="addToCart(wish)")
									//- 	.btn-gift__icon
									//- 		img(src="@/assets/img/cart.svg", height="12px")
									//- 	.btn-gift__text {{ $lang.account.wishes.add_to_bag }}
								.card__part.card__part_right
									.btn-control
										button.btn-gift(@click="addToCart(wish)")
											.btn-gift__icon
												img(src="@/assets/img/cart.svg", height="12px")
											.btn-gift__text {{ $lang.account.wishes.add_to_bag }}
									button.btn-control.btn-control_remove(@click="remove(wish)") {{ $lang.account.wishes.remove }} <img src="@/assets/img/close-remove.svg" />
							.mobile
								.card__part.card__part_right
									.btn-control_remove
										//- button.btn-gift(@click="addToCart(wish)")
										//- 	.btn-gift__icon
										//- 		img(src="@/assets/img/cart.svg", height="12px")
										//- 	.btn-gift__text {{ $lang.account.wishes.add_to_bag }}
									button.btn-control.btn-control_remove(@click="remove(wish)") {{ $lang.account.wishes.remove }} <img src="@/assets/img/close-remove.svg" />
								.card__part.card__part_left
									button.btn-gift(@click="addToCart(wish)")
										.btn-gift__icon
											img(src="@/assets/img/cart.svg", height="12px")
										.btn-gift__text {{ $lang.account.wishes.add_to_bag }}

</template>

<script>
	import Vue from 'vue';
	
	import $api from '../../components/api';
	import $store from '../../components/store';

	import cartItem from '../../assets/uploads/cart_card.png';
	import bannerImg from '../../assets/uploads/banner-dogs.jpg';
	import Lang from '../../components/lang.vue';

	export default {
		name: 'block-account',
		metaInfo: function() {
			let th = this;

			return {
				title: this.$lang.account.wishes.title + this.$lang.meta.base_title,
				// meta: [
				// 	{ vmid: 'description', name: 'description', content: this.$lang.cart.checkout + th.$lang.meta.base_description }
				// ]
			}
		},
		data: function(){
			return {
				cartItem: cartItem,
				bannerImg,
				langDefault: window.config.langDefault
			}
		},
		computed:{
			wishlist() {
			
				var data = $store.state.wishlist.data;
				
				return data == undefined ? {} : data;
			}
		},
		methods:{
			getUrl(seo_url, id) {
				return '/'+ ($store.getters['getLangCode'].code === this.langDefault ? '' : $store.getters['getLangCode'].code + "/") + seo_url.replace($store.getters['getLangCode']+'-', '')+'-'+id;
			},
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
			addToCart(product){
				let $this = this;

				Vue.notify({
					group: 'notify',
					type: 'cart',
					title: product.name,
					text: '<div style="background-image:url('+this.image(product.image_thumb)+');"></div>' + $this.$lang.notifications.added_to_the_bag,
				});
				$api.cart.add(product, function(resp) {
					$api.cart.get();
				});
			},
			remove(product) {

				let $this = this;

				let id = product.product_id;
				let seo_url = product.seo_url+'-'+product.product_id;

				$api.wishlist.delete(id, seo_url);

				Vue.notify({
					group: 'notify',
					type: 'wishlist',
					title: product.name,
					text: $this.$lang.notifications.removed_from_wishlist
				});

			},
			image(src) {
				if(src && src != "") {
					(src.indexOf('.tiff') > 0 || (src.indexOf('.jpeg') < 0 && src.indexOf('.png') < 0)) ? src = window.config.noImage : false;
				} else {
					src = window.config.noImage;
				}
				return src;
			},
			getSize(attr){
				var data = attr ? attr[0].attribute : [];
				let attrs = false;
				data ? data.forEach(e => {
					(!attrs && e.attribute_id == 15) ? attrs = e.text : false;
				}) : false;
				return attrs;
			},
			getColor(attr){
				var data = attr ? attr[0].attribute : [];
				let attrs = false;
				data ? data.forEach(e => {
					(!attrs && e.attribute_id == 13) ? attrs = e.text : false;
				}) : false;
				return attrs;					
			}
		},
		created() {
			// if (!Object.size($store.state.wishlist.data)) {
				$api.wishlist.get();
			// }
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
	.hide {
		display: none;
	}

	.price {
		@include kit('h6 300', 'dark');
		color: rgba(0,0,0,.6);
		letter-spacing: .4px;
		text-align: right;

		&_old {
			font-size: 11px;
			opacity: .4;
			text-decoration: line-through;
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
			background-repeat: no-repeat;
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

			/deep/ a {
				transition: opacity .5s ease;

				&:hover {
					opacity: .7;
				}
			}
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
				display: inline-block;
				margin-bottom: 6px;
				text-transform: capitalize;
			}
		}
	}

	.btn-gift {
		padding-left: 20px;
		position: relative;
		// margin-bottom: 7px;

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

		&_remove {
			img {
				display: none;
			}
		}
	}

	.wishes {
		padding-bottom: 200px;
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
			// padding-top: 24px;
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

	.mobile {
		display: none;
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
		.wishes {
			margin-top: 0;
		}
	}

	@media screen and (max-width: 960px) {
		.wishes {
			padding-bottom: 0;

			&__h2 {
				font-size: 32px;
				padding-bottom: 5px;
				display: none;
			}

			&__body {
				border-top: none;
			}
		}
	}

	@media screen and (max-width: 650px) {
		.wishes {
			&__h2 {
				padding-bottom: 10px;
			}

			&__body {
				padding-top: 0;
			}
		}

		.card {
			padding-bottom: 29px;
			padding-top: 24px;

			&__image {
				width: 96px;
				height: 129px;
				margin-right: 16px;
			}

			&__content {
				padding-top: 10px;
				width: calc(100% - 112px);
			}

			&__part {
				&_left {
					width: 100%;
				}

				&_right {
					width: 100%;
				}
			}

			&__text {
				margin-top: 1px;
			}

			&__row {

				&:nth-child(1) {
					.card__part {
						&_right {
							position: absolute;
							bottom: 41px;
							right: 0;
						}
					}
				}

				&:nth-child(2) {
					position: static;
					text-align: right;
					padding-top: 20px;
					margin-top: 25px;

					.card__part {
						display: inline-block;
						vertical-align: top;
						width: auto;
					}
				}
			}

			&__details {
				margin-top: 9px;
			}
		}

		.btn-control {
			&_remove {
				position: absolute;
				top: -4px;
				right: 0;
				font-size: 0;

				img {
					display: block;
				}
			}
		}

		.desktop {
			display: none;
		}

		.mobile {
			display: block;
		}

		.btn-gift {
			padding-left: 26px;
		}
	}

</style>
