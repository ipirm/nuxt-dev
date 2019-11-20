<template lang="pug">
	.brands
		.brands__wrapper
			.brands__title Brands
			.brands__desc Discover the brand that's right for you.
			.cards
				.list.brands__list
					router-link.card.card_big(:style="{backgroundImage:'url('+brand.original_image+')'}", v-for="brand in brands", v-if="brand.sort_order < 3 && brand.sort_order > 0", :to="'/'+ (lang === langDefault ? '' : lang + '/') + 'brand/'+brand.manufacturer_id", :key="'brandBigCard'+brand.manufacturer_id")
						.card__content
				.list.brands__list
					router-link.card(:style="{backgroundImage:'url('+brand.original_image+')'}", v-for="brand in brands", v-if="brand.sort_order < 10 && brand.sort_order > 2", :to="'/'+ (lang === langDefault ? '' : lang + '/') + 'brand/'+brand.manufacturer_id", :key="'brandCard'+brand.manufacturer_id")
						.card__content

			.cards.cards_mobile
				router-link.card.card_big(:style="{backgroundImage:'url('+brand.original_image+')'}", v-for="brand in brands", v-if="brand.sort_order < 2 && brand.sort_order > 0", :to="'/'+ (lang === langDefault ? '' : lang + '/') + 'brand/'+brand.manufacturer_id", :key="'brandMobileBigCard'+brand.manufacturer_id")
					.card__content
				router-link.card(:style="{backgroundImage:'url('+brand.original_image+')'}", v-for="brand in brands", v-if="brand.sort_order < 10 && brand.sort_order > 1", :to="'/'+ (lang === langDefault ? '' : lang + '/') + 'brand/'+brand.manufacturer_id", :key="'brandMobileCard'+brand.manufacturer_id")
					.card__content


			.brands__label A - Z
			.list.brands__list
				template(v-for="brand in brands", v-if="brand.sort_order == 0")
					router-link.item(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'brand/'+brand.manufacturer_id") {{ brand.name }}
				
</template>

<script>
	import $store from '../../components/store';

	import cartItem from '../../assets/uploads/cart_card.png';
	import bannerImg from '../../assets/uploads/banner-dogs.jpg';
	import imageBrand1 from '../../assets/uploads/image-brand-1.jpg';
	import imageBrand2 from '../../assets/uploads/brand-rl.svg';

	import Lang from '../../components/lang.vue';
	
	export default {
		name: 'block-cart',
		data: function(){
			return {
				cartItem: cartItem,
				bannerImg,
				imageBrand1,
				imageBrand2,
				langDefault: window.config.langDefault
			}
		},
		computed:{
			brands() {
				var data = $store.state.brands.data;
				return data == undefined ? {} : data;
			}
		},
		mixins: [Lang],
		mounted() {
			// $api.getToken();
			// $api.getCategories();
		},
		watch: {
			'$route' () {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/kit.scss';

	.brands {
		margin-top: 205px;
		padding-bottom: 200px;
		&__wrapper {
			max-width: 890px;
			margin: auto;
		}
		&__title {
			@include kit('h2', 'dark');
			margin-bottom: 20px;
			text-align: center;
		}
		&__desc {
			@include kit('p1', 'dark');
			margin-bottom: 56px;
			text-align: center;
		}
		&__label {
			@include kit('h5 11 bold', 'dark');
			margin-bottom: 26px;
			text-align: center;
		}
		&__list {
			font-size: 0;
			text-align: center;
		}
	}
	.cards {
		margin-bottom: 56px;

		&_mobile {
			display: none;
		}
	}
	.card {
		display: inline-block;
		width: 288px;
		height: 117px;
		margin-right: 12px;
		margin-bottom: 12px;
		padding: 9px;
		position: relative;
		cursor: pointer;
		background-position: center;
		background-size: cover;

		&_big {
			width: 438px;
		}

		&__content {
			width: 100%;
			height: 100%;
			position: relative;
			z-index: 10;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		&::before {
			content: "";
			width: 100%;
			height: 100%;
			display: block;
			position: absolute;
			left:0;
			top:0;
			/*background:rgba(#0f0f0f, 0.65);*/
		}
		&:last-child {
			margin-right: 0;
		}
	}
	.item {
		@include kit('h4 12px light', 'dark');
		margin-left: 20px;
		margin-right: 20px;
		margin-bottom: 18px;
		display: inline-block;
	}

	@media screen and (max-width: 1200px) {
		.brands {
			margin-top: 132px;
			padding-bottom: 42px;

			&__title {
				margin-bottom: 6px;
			}

			&__desc {
				margin-bottom: 39px;
			}

			&__wrapper {
				max-width: 750px;
			}

			&__label {
				margin-bottom: 15px;
			}
		}

		.cards {
			margin-bottom: 36px;
		}

		.card {
			height: 119px;
			margin-bottom: 10px;
			width: 242px;

			&_big {
				width: 369px;
			}
		}

		.item {
			margin-left: 12px;
    		margin-right: 12px;
		}
	}

	@media screen and (max-width: 960px) {
		.brands {
			margin-top: 130px;

			&__title {
				margin-bottom: 9px;
			}

			&__desc {
				letter-spacing: 0.05em;
			}

			&__wrapper {
				max-width: 522px;
			}
		}

		.cards {
			display: none;

			&_mobile {
				display: grid;
				grid-gap: 10px 12px;
				grid-template-columns: auto auto;
				margin-bottom: 47px;
			}
		}

		.card {
			width: 255px;
			width: auto;
			margin: 0;

			&_big {
				width: 100%;
				width: auto;
				margin-right: 0;
				grid-column-start: 1;
				grid-column-end: 3;
			}
		}
	}

	@media screen and (max-width: 650px) {
		.brands {
			margin-top: 120px;
			padding-bottom: 29px;

			&__wrapper {
				max-width: 344px;
			}

			&__label {
				margin-bottom: 11px;
			}
		}

		.cards {
			&_mobile {
				display: block;
				margin-bottom: 37px;
			}
		}

		.card {
			width: 100%;
			margin-bottom: 10px;
		}
	}

</style>
