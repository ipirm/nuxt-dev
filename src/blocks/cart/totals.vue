<template lang="pug">
	.total
		//- .total__group(v-for="(total, index) in totals", v-if="index < 2")
		//- 	.total__col {{ index == 0 ? $lang.cart.subtotal : $lang.cart.villa_discount}}
		//- 	.total__col {{ total.value }} {{ $lang.product.uah }}
		.total__group(v-for="(total, index) in totals", v-if="index < 1")
			.total__col {{ $lang.cart.subtotal }}
			.total__col {{ total.value }} {{ $lang.product.uah }}
		.total__group
			.total__col {{ $lang.cart.shipping }}
			.total__col 0 {{ $lang.product.uah }}
		.total__group(v-if="countWraps > 0")
			.total__col {{ $lang.cart.gift_wrap }}
			.total__col 0 {{ $lang.product.uah }}
		.total__group.total__group_summ
			.total__col.total__col_upper {{ $lang.cart.total }}
			.total__col {{ total }} {{ $lang.product.uah }}
				
</template>

<script>
	import $store from '../../components/store';
	import $api from '../../components/api.js';
	import Lang from '../../components/lang.vue';

	export default {
		name: 'block-totals',
		data: function(){
			return {
			}
		},
		computed: {
			totals() {
				var data = $store.state.cart.data.totals;
				return data == undefined ? {} : data;		
            },
            total() {
				var data = $store.state.cart.data.total_raw;
				return data == undefined ? {} : data;                
			},
			countWraps() {
				return $store.state.cart.countWraps;
			}
		},
		mixins: [Lang],
		mounted() {
			$api.cart.get();
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/kit.scss';

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
		&__col {
			&_upper{
				text-transform: uppercase;
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
		right: 0;
		width: 321px;
		padding-top: 16px;
		text-align: center;
	}

</style>
