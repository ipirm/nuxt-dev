<template lang="pug">
	.orders
		.orders__h2 {{ $lang.account.orders.title }}
		.orders__head
			.orders__col
			.orders__col {{ $lang.account.orders.price }}
		.orders__body
			.orders__container
				.orders__item(:class="[order.order_id == orderOpened ? 'orders__item_active' : '']" v-for="(order, index, i) in orders", @click="open(order.order_id)")
					.order
						.order__col {{ '#'+ (Object.size(orders) - i) }}
						.order__col
							.card
								.card__image
									.card__bg(:style="{backgroundImage:'url('+image(order.image_thumb)+')'}")
								.card__content
									.card__row
										.card__part.card__part_left
											.card__title {{ $lang.account.orders.order }} {{ '#'+order.order_id }}
											.card__text {{ order.date_added }}
						.order__col
							.ui-status.hide
								.ui-status__icon
								.ui-status__label {{ $lang.account.orders.delivered }}
							.price {{ ~~order.total_raw }} {{ $lang.product.uah }}
							.button(:class="[order.order_id == orderOpened ? 'button_active' : '']")

					template(v-if="order.data")
						.info
							.info__box
								.info__label {{ $lang.account.orders.shipping_address }}
								.info__desc {{ order.data.shipping_address_1}}
							.info__box
								.info__label {{ $lang.account.orders.shipping_type }}
								.info__desc {{ order.data.comment }}
						.list
							.order(v-for="product in order.data.products")
								template(v-if="isMobileOrder")
									.order__col
									.order__col
										.card
											.card__image
												.card__bg(:style="{backgroundImage:'url('+image(product.image_thumb)+')'}")
											.card__content
												.card__row
													.card__part.card__part_left
														.card__title
															router-link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'brand/' + product.brand.id") {{ product.brand.name }}
														router-link.card__text(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'undefined/undefined' + getUrl(product.seo_url, product.product_id)") {{ product.name }}
														.card__details
															div(v-if="getSize(product.attribute_groups)") {{ $lang.cart.size }} {{ getSize(product.attribute_groups) }}
															div(v-if="getColor(product.attribute_groups)") {{ $lang.cart.color }} {{ getColor(product.attribute_groups) }}
												.card__row.card__row_2
													.ui-status
														.ui-status__label {{ $lang.cart.item_qty }}{{ product.quantity }}
													.price {{ price(order.total_raw, order.data.totals[0].value, product.total_raw) }} {{ $lang.product.uah }}
													.button.button_transparent
								template(v-else)
									.order__col
									.order__col
										.card
											.card__image
												.card__bg(:style="{backgroundImage:'url('+image(product.image_thumb)+')'}")
											.card__content
												.card__row
													.card__part.card__part_left
														.card__title
															router-link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'brand/' + product.brand.id") {{ product.brand.name }}
														router-link.card__text(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'undefined/undefined' + getUrl(product.seo_url, product.product_id)") {{ product.name }}
														.card__details
															span(v-if="getSize(product.attribute_groups)") {{ $lang.cart.size }} {{ getSize(product.attribute_groups) }}
															br
															span(v-if="getColor(product.attribute_groups)") {{ $lang.cart.color }} {{ getColor(product.attribute_groups) }}
									.order__col
										.ui-status
											.ui-status__label {{ $lang.cart.item_qty }}{{ product.quantity }}
										.price {{ price(order.total_raw, order.data.totals[0].value, product.total_raw) }} {{ $lang.product.uah }}
										.button.button_transparent
</template>

<script>
	import $store from '../../components/store';
	import $api from '../../components/api';

	import cartItem from '../../assets/uploads/cart_card.png';
	import bannerImg from '../../assets/uploads/banner-dogs.jpg';
	import Lang from '../../components/lang.vue';

	export default {
		name: 'block-account',
		metaInfo: function() {
			let th = this;

			return {
				title: this.$lang.account.orders.title + this.$lang.meta.base_title,
				// meta: [
				// 	{ vmid: 'description', name: 'description', content: this.$lang.cart.checkout + th.$lang.meta.base_description }
				// ]
			}
		},
		data: function(){
			return {
				cartItem: cartItem,
				bannerImg,
				orderOpened:false,
				orderOpenedInfo:{},
				langDefault: window.config.langDefault
			}
		},
		methods:{
			open(id) {
				this.orderOpened = this.orderOpened == id ? false : id;
				$api.account.order(id);
			},
			price(total, subtotal, summ){
				let t = Number(total);
				let s = Number(subtotal);
				let sm = Number(summ);
				let p = (s-t)/s;
				return sm-(sm*p);
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
			},
			getUrl(seo_url, id) {
				return '/'+ ($store.getters['getLangCode'].code === this.langDefault ? '' : $store.getters['getLangCode'].code + "/") + seo_url.replace($store.getters['getLangCode']+'-', '')+'-'+id;
			}
		},
		computed:{
			orders() {
				var data = $store.state.account.orders;
				return data == undefined ? {} : data;
			}
		},
		props: {
			isMobileOrder: {
				type: Boolean
			}
		},
		mixins: [Lang],
		mounted() {
			$api.account.orders();
		},
		watch: {
			'$route' () {
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/kit.scss';
	.hide {
		display: none !important;
	}

	.price {
		@include kit('h6 300', 'dark');
		color: rgba(0,0,0,.6);
		letter-spacing: .4px;
		text-align: right;
		margin-left: 109px;
		min-width: 70px;
	}

	.button {
		min-width: 24px;
		height: auto;
		text-align: center;
		margin-left: 26px;
		background: url(../../assets/img/icon-arrow-down.svg) no-repeat;
		background-size: 7px auto;
		background-position: center;
		transform: rotate(0deg);
		transition: 0.3s all ease;
		
		&_transparent {
			opacity: 0;
		}
		
		&_active {
			transform: rotate(180deg);
		}
	}

	.info {
		padding-top: 24px;
		padding-left: 65px;

		&__box {
			margin-bottom: 24px;
			max-width: 180px;
		}
		&__label {
			@include kit('h5 11 bold', 'dark');
			margin-bottom: 12px;
		}
		&__desc {
			@include kit('h6 100', 'dark');
			text-transform: none;
			line-height: 17px;
		}
	}
	.order {
		width: 100%;
		max-height: 142px;
		padding-left: 24px;
		padding-right: 12px;
		display: flex;
		align-items: center;
		cursor: pointer;
		position: relative;

		&::after {
			content: "";
			width: calc(100% - 32px);
			height: 1px;
			position: absolute;
			left:16px;
			bottom: 0px;
			background: url(../../assets/img/icon-dashed.svg) repeat-x;
		}

		&__col {
			display: inline-block;
			@include kit('h6 300', 'dark');
			&:nth-child(1) {
				width: 40px;
			}
			&:nth-child(2) {
				width:57.4%;
			}
			&:nth-child(3) {
				width: calc(100% - (57.4% + 40px));
				text-align: right;
				display: flex;
				justify-content: flex-end;
			}
		}
	}

	.card {
		position: relative;
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
			width: 82px;
			height: 109px;
			display: inline-block;
			vertical-align: middle;
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
			vertical-align: middle;
			position: relative;
			height: auto;
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
				width: 100%;
			}
		}

		&__title {
			color: #262626;
			font: 700 11px/16px 'Museo', Arial, Helvetica, sans-serif;
			display: block;
			letter-spacing: .5px;
			text-transform: none;

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
			text-transform: none;
		}

		&__details {
			@include kit('h6 300', 'dark');
			text-transform: none;
			color: rgba(#0f0f0f, .6);
			letter-spacing: .4px;
			margin-top: 16px;
			span {
				display: inline-block;
				margin-bottom: 6px;
				text-transform: capitalize;
			}
		}
	}

	.list {
		padding-bottom: 3px;
		.order {
			margin-top: 16px;
			border: none;
			&::after {
				display: none;
			}
		}
		.card {
			padding: 0;
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

	.orders {
		padding-bottom: 200px;
		width: 100%;
		position: relative;
		margin-top: -5px;

		&__h2 {
			@include kit('h2', 'dark');
			// padding-bottom: 9px;
			padding-bottom: 13px;
		}

		&__wrapper {
			width: calc((100% / 12) * 10);
			margin: auto;
			display: flex;
		}
		
		&__head {
			padding-bottom: 16px;
			text-align: right;
			position: absolute;
			left: 0;
			top:16px;
			width: 100%;
			padding-right: 60px;
		}

		&__col {
			display: inline-block;
			@include kit('h6 300', 'dark');
			color: rgba(#0f0f0f,0.6);
			text-transform: none;
			margin-left: 153px;
		}

		&__container {
			width: 100%;
		}

		&__body {
			position: relative;
			border-top: 1px solid rgba(#D6D6D6, .4);
			padding-top: 0px;
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

		&__item {
			padding-bottom: 16px;
			height: 141px;
			border: 1px solid rgba(0, 0, 0, 0);
			border-bottom: 1px solid #efefef;
			position: relative;
			overflow: hidden;

			&_active {
				background: #FFFFFF;
				border: 1px solid rgba(0, 0, 0, 0.04);
				box-sizing: border-box;
				box-shadow: 0px 2px 50px rgba(0, 0, 0, 0.07);
				border-radius: 4px;
				height: auto;
				overflow: inherit;
				&::before {
					content: "";
					display: block;
					width: 100%;
					height: 4px;
					background: #fff;
					position: absolute;
					top: -3px;
					left: 0;
					border-radius: 4px;
				}
			}
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

	.ui-status {
		display: flex;
		align-items: center;
		
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
		}
	}

	@media screen and (max-width: 1200px) {
		.orders {
			padding-bottom: 0;
			margin-top: 0;

			&__h2 {
				margin-top: -5px;
				padding-bottom: 10px;
			}

			&__head {
				padding-right: 96px;
			}

			&__container {
				margin-top: 15px;
			}
		}

		.info {
			padding-top: 26px;

			&__label {
				margin-bottom: 10px;
			}

			&__box {
				margin-bottom: 27px;
			}
		}

		.card {
			&__image {
				margin-right: 21px;
			}
		}

		.order {
			&__col {
				&:nth-child(3) {
					padding-right: 18px;
					// margin-top: 20px;
				}
			}
		}
	}

	@media screen and (max-width: 960px) {
		.orders {
			&__h2 {
				font-size: 32px;
				display: none;
			}

			&__head {
				display: none;
			}

			&__body {
				border-top: none;
			}

			&__item {

				&:last-child {
					border-bottom-color: rgba(0, 0, 0, 0);
				}
			}
		}

		.order {
			padding-left: 24px;
			padding-right: 15px;

			&__col {
				&:nth-child(3) {
					padding-right: 0;
				}
			}

			&::after {
				left: 23px;
				width: calc(100% - 46px);
			}
		}

		.price {
			margin-left: 82px;
		}

		.info {
			padding-left: 55px;
		}

		.button {
			margin-left: 53px;
		}
	}

	@media screen and (max-width: 650px) {
		.orders {
			&__h2 {
				margin-top: 0;
			}

			&__head {
				.orders__col:nth-child(2) {
					display: none;
				}
			}
		}

		.order {
			padding-left: 15px;

			&__col {
				width: 66.4%;

				&:nth-child(1) {
					display: none;
				}

				&:nth-child(2) {
					width: 66.4%;
				}

				&:nth-child(3) {
					width: calc(100% - (66.4% + 0px));
				}
			}
		}

		.card {
			&__image {
				margin-right: 12px;
			}

			&__content {
				width: calc(100% - 94px);
			}
		}

		.button {
			display: none;
		}

		.info {
			padding-left: 19px;
		}

		.list {

			.order {
				display: block;

				&__col {

					&:nth-child(2) {
						display: block;
						width: 100%;
					}

					&:nth-child(3) {
						display: block;
					}
				}
			}

			.card {

				&__text {
					margin-top: 1px;
				}

				&__details {
					margin-top: 9px;
					line-height: 18px;
				}

				&__row {

					&_2 {
						position: static;
						font-size: 0;
						letter-spacing: 0;
						margin-top: 16px;
					}
				}

				.ui-status {
					display: inline-block;
					width: 50%;
				}

				.price {
					display: inline-block;
					width: 50%;
					margin-left: 0;
				}
			}
		}
	}

</style>
