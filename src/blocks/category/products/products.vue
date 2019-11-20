<template lang="pug">
	.products-box
		.products(:class="[view == 3 ? 'products_v3' : '']")
			div(v-if="!showAllMode")
				template(v-for="product in productsData")
					product.products__item(v-bind:info="product", v-bind:slider="false")
			div(v-else)
				template(v-for="product in allProducts")
					product.products__item(v-bind:info="product", v-bind:slider="false")
				mugen-scroll(:handler="loadMore" :should-handle="!isBusy")
			.pagination-container(v-if="pagesCount > 1 && !showAllMode")
				v-pagination(v-model="currentPage" :page-count="pagesCount" :labels="{prev: '<img src=' + pagPrev + '>', next: '<img src=' + pagNext + '>'}")
				.pagination-container__label &nbsp;&nbsp;
				button.pagination-container__show(@click="showAll") {{ $lang.category.show_all }}

</template>

<script>
	import Lang from '../../../components/lang.vue';
	import subscribeBox from '@/assets/uploads/subscribe-box.jpg';
	import slideCard2 from '@/assets/uploads/slider-card-2.png';

	import pagPrev from '@/assets/img/icon-small-arrow-left.svg';
	import pagNext from '@/assets/img/icon-small-arrow-right.svg';

	import ProductCard from '../../includes/product/product.vue';
	import vPagination from 'vue-plain-pagination';

	import $api from '../../../components/api.js';
	import $store from '../../../components/store';
	import MugenScroll from 'vue-mugen-scroll';

	Array.prototype.diff = function(a) {
		return this.filter(function(i) {return a.indexOf(i) < 0;});
	};


	export default {
		name: 'category-products',
		data: function(){
			return {
				subscribeBox,
				productsData:[],
				slider:true,
				count:0,
				dataForFilter: [],
				pagesCount: 0,
				currentPage: 1,
				paginationList: [],
				pagPrev: pagPrev,
				pagNext: pagNext,
				showAllMode: false,
				allProducts: [],
				isBusy: false
			}
		},
		components: {
			'product': ProductCard,
			vPagination,
			MugenScroll
		},
		props: {
		},
		mixins: [Lang],
		computed: {
			view () {
				return $store.state.products.view;
			},
			filter() {
				let data = $store.state.products.filter;
				return data == undefined ? {} : data;
			},
			filterBrand() {
				return $store.state.products.brandFilter;
			},
			products() {
				let data = $store.state.products.data;
				return data == undefined ? {} : data;
			},
			productsCount() {
				var data = $store.state.products.count;
				return data == undefined ? 0 : data;
			},
			order() {
				let data = $store.state.products.order;
				return data == undefined ? false : data;
			},
		},
		methods:{
			loadMore: function() {
				this.isBusy = true;

				this.currentPage++;
				this.getAllPage();
			},
			showAll() {
				let th = this;
				this.showAllMode = true;
				// window.scrollTo({
				// 	top: 0,
				// 	behavior: 'smooth'
				// });
				// this.currentPage = 1;
				this.getAllPage();
				$store.commit('setShowAllMode', true);
				setTimeout(function() {
					let name = 'sticky_kit:recalc';
					var event; // The custom event that will be created
					if (document.createEvent) {
						event = document.createEvent("HTMLEvents");
						event.initEvent(name, true, true);
					} else {
						event = document.createEventObject();
						event.eventType = name;
					}

					event.eventName = name;

					if (document.createEvent) {
						document.getElementById("aside").dispatchEvent(event);
					} else {
						document.getElementById("aside").fireEvent("on" + event.eventType, event);
					}
				}, 200);
			},
			productsDraw(){
				var th = this;

				let limit = $store.state.products.productsPerPage;
				let data = Object.values($store.state.products.data);

				if (data.length) {
					data = this.filterData(data);
					if (this.order) {
						console.log('orderr  ' + this.order);
						data = this.orderData(data);
					}
					th.pagesCount = Math.ceil(data.length/limit);
					$store.commit('setProductCount', data.length);
				} else {
					th.pagesCount = Math.ceil(data.length/limit);
					$store.commit('setProductCount', data.length);
				}

				data = data.splice((th.currentPage-1)*limit, limit);

				this.productsData = data == undefined ? {} : data;
				// console.log(this.productsData);
				// console.log('4i da');
                this.$emit('sendToParent', this.productsData);
			},
			getAllPage() {
				var th = this;

				let limit = $store.state.products.productsPerPage;
				let data = Object.values($store.state.products.data);

				if (data.length) {
					data = this.filterData(data);
					if (this.order) {
						console.log('orderr  ' + this.order);
						data = this.orderData(data);
					}
					th.pagesCount = Math.ceil(data.length/limit);
					$store.commit('setProductCount', data.length);

					data = data.splice((th.currentPage-1)*limit, limit);

					this.allProducts = this.allProducts.concat(data == undefined ? [] : data);

					this.isBusy = false;
				}

			},
			setAvailableFilters(data) {
				var len = data.length;

				var availableFilters = {
					category: [],
					color: [],
					collection: [],
					size: [],
					type: [],
					brand: []
				}

				for (len;len>0;len--) {
					var e = data[len-1];
					availableFilters.color.push(e.attribute_groups[0].attribute[1].text);
					availableFilters.collection.push(e.attribute_groups[0].attribute[2].text);
					availableFilters.size.push(e.attribute_groups[0].attribute[3].text);
					availableFilters.type.push(e.attribute_groups[0].attribute[4].text);
					availableFilters.brand.push(e.manufacturer);
				}

				$store.commit("setAvailableFilters", availableFilters);
			},
			filterData(data) {

				let th = this;

				var params = this.filter;


				return data.filter(function(item) {


					if (!item.categories.length && th.filterBrand != 0) return false;

					let types = {
						'13': '',
						'14': '',
						'15': '',
						'16': '',
						'17': '',
						'18': '',
						'19': ''
					};

					let color = '';
					let collection = '';
					let size = '';
					let type = '';

					if (item.attribute_groups[0] != undefined) {
						for (var i = 0; i < item.attribute_groups[0].attribute.length; i++) {
							let el = item.attribute_groups[0].attribute[i];
							types[el.attribute_id] = el.text;
						}
					}

					return !(params.category.length && params.category.diff(item.categories).length)
						 && !(params.color.length && !(params.color.indexOf(types['13']) >= 0))
						 && !(params.collection.length && !(params.collection.indexOf(types['14']) >= 0))
						 && !(params.size.length && !(params.size.indexOf(types['15']) >= 0))
						 && !(params.brand.length && !(params.brand.indexOf(item.manufacturer_id) >= 0))
						 && !(params.type.length && !(params.type.indexOf(types['12']) >= 0));

				});

				this.setAvailableFilters(data);

			},
			orderData(data) {

				var orders = {
					popularity: function() {
						return data;
					},
					price_up: function() {
						return data.sort((a,b) => (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0));
					},
					price_down: function() {
						return data.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
					},
					alphabetically: function() {
						return data.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
					}
				};

				return orders[this.order]();
			}
			// page(p) {
			// 	this.currentPage = p;
			// 	$store.commit("setPage", p);
			// 	this.productsDraw();
			// 	window.scrollTo(0,0);
			// }
		},
		beforeDestroy() {
			$store.commit('setShowAllMode', false);
		},
		mounted(){
			let th = this;
			this.productsDraw();
			// $api.wishlist.get();
		},
		watch: {
			'$route' (to, from) {
				if (!this.showAllMode) {
					this.allProducts = [];
					this.currentPage = 1;
					this.productsDraw();
				} else {

					if (from.params.category != to.params.category) {
						this.showAllMode = false;
					}
					this.allProducts = [];
					this.currentPage = 1;
					window.scrollTo(0,0);
					this.getAllPage();
				}
			},
			products() {
				if (!this.showAllMode) {
					this.productsDraw();
				} else {
					this.getAllPage();
				}
			},
			filter() {
				if (!this.showAllMode) {
					this.productsDraw();
					this.currentPage = 1;
				} else {
					this.allProducts = [];
					this.currentPage = 1;
					window.scrollTo(0,0);
					this.getAllPage();
				}
			},
			filterBrand() {
				if (!this.showAllMode) {
					this.productsDraw();
					this.currentPage = 1;
				} else {
					this.allProducts = [];
					this.currentPage = 1;
					window.scrollTo(0,0);
					this.getAllPage();
				}
			},
			order() {
				if (!this.showAllMode) {
					this.productsDraw();
					this.currentPage = 1;
				} else {
					this.allProducts = [];
					this.currentPage = 1;
					window.scrollTo(0,0);
					this.getAllPage();
				}
			},
			'currentPage' () {
				var th = this;
				if (!this.showAllMode) {
					window.scrollTo({
						top: 0,
						behavior: 'smooth'
					});
					this.productsDraw();
				}
				$store.commit("setPage", th.currentPage);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/mixins.scss';
	@import '@/helpers/sass/kit.scss';

	.products-box {
		width: calc(100% - 257px);
		display: inline-block;
    	vertical-align: top;
	}

	.products {
		width: 100%;
		height: auto;
		min-height: 100vh;
		display: inline-block;
		vertical-align: top;
		margin-bottom: 30px;
		&__item {
			width: 25%;
			padding-left: 10px;
			padding-right: 0;
		}
		&_v3 {
			.products {
				&__item {
					width: 33.33%;
				}
			}
		}
	}

	.pagination-container {
		margin: auto;
		text-align: center;
		padding-bottom: 41px;
		@include kit('h6 300', 'white');
		color: rgba(0, 0, 11, 0.46);
		margin-top: 31px;

		&__label {
			display: inline-block;
			margin-left: 48px;
			margin-right: 48px;
			text-transform: none;
		}

		&__show {
			@include kit('h5 11 bold', 'white');
			color:#0f0f0f;
			text-transform: none;
		}
	}

	/deep/ .pagination {
		padding-left: 32px;
		display: inline-block;
		vertical-align: middle;
		margin-right: -24px;


		&__arrow {
			width: 5px;
			height: 8px;
			font-size: 0;
			display: inline-block;
			vertical-align: middle;

			&_left {
				background:url(../../../assets/img/icon-small-arrow-left.svg) no-repeat;
				background-position: center;
				background-size: cover;
			}
			&_right {
				background:url(../../../assets/img/icon-small-arrow-right.svg) no-repeat;
				background-position: center;
				background-size: cover;
			}
		}

		&-link {
			&--active {
				cursor: default !important;
			}
		}

		&-item {
			&:first-child {
				display: none;
			}

			&:last-child {
				display: none;
			}

			&--active {
				cursor: default !important;
			}
		}

		&__list {
			padding-left: 32px;
			padding-right: 32px;
			display: inline-block;
			vertical-align: middle;
		}

		&__item,
		&-item {
			display: inline-block;
			margin-right: 24px;
			cursor: pointer;
			vertical-align: middle;
			transition: color .5s ease, opacity .5s ease;
			color: rgba(0, 0, 11, 0.46);

			button {
				color: inherit;
			}

			&_active {
				color: #0f0f0f;
				opacity: 1;
			}

			&--active {
				color: #0f0f0f;
				opacity: 1;
				cursor: default !important;

			}

			&--disable {
				cursor: default;
				cursor: default !important;
			}

			&:last-child {
				margin-right: 0;
			}
		}
	}

	@media screen and (max-width: 1200px) {
		.products {

			&-box {
				width: calc(100% - -24px);
				margin-left: -24px;
			}

			&__item {
				width: calc(100%/3);
				padding-left: 24px;
			}
		}

		.pagination-container {
			margin-top: 9px;
			padding-bottom: 30px;
		}
	}

	@media screen and (max-width: 850px) {
		.products {
			&__item {
				width: 50%;
			}
		}
	}

	@media screen and (max-width: 650px) {
		.products {

			&-box {
				width: calc(100% - -8px);
				margin-left: -8px;
			}

			&__item {
				padding-left: 8px;
			}
		}

		.pagination {
			padding-left: 0;
		}

		.pagination-container {
			margin-top: 15px;
			padding-bottom: 17px;

			&__label {
				margin-right: 20px;
				margin-left: 20px;
			}

			// &__label {
			// 	display: none;
			// }

			// &__show {
			// 	display: none;
			// }
		}
	}

	@media screen and (max-width: 340px) {
		.pagination-container {

			&__label {
				margin: 0 10px;
			}
		}
	}

</style>
