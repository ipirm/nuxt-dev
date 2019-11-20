<template lang="pug">	
	.head
		.head__aside(v-if="$route.name == 'New in'")
			.head__h2 {{ $lang.header.nav.newin }}
		.head__aside(v-else-if="$route.name == 'Brand'")
			.head__h2 {{ brand_name }}
		.head__aside(v-else-if="$route.query.q")
				.head__h2 {{ $lang.category.showing }} {{ $lang.category.results }} {{ $lang.category.for }} “{{ $route.query.q }}”
		.head__aside(v-else-if="$route.params.category === 'sale'")
			.head__h2 {{ $lang.header.nav.sale }}
		.head__aside(v-else)
			template(v-for="category in categories")
				.head__h2(v-if="category.seo_url == activeCategory") {{ category.name }}

		.head__category
			template(v-if="showAllMode")
				.pieces {{ productsCount }} {{ $lang.category.pieces }}
				.pieces.pieces_mobile {{ productsCount }} {{ $lang.category.pieces }}
			template(v-else)
				.pieces(v-if="productsCount > 1") {{ $lang.category.showing }} {{ from }} - {{ to > productsCount ? productsCount : to }} {{ $lang.category.of }} {{ productsCount }} {{ $lang.category.results }}
				.pieces(v-if="productsCount === 1") Showing 1 of {{ productsCount }} {{ $lang.category.results }}
				.pieces.pieces_mobile {{ productsCount }} {{ $lang.category.pieces }}
			.filters
				.filters__label
				
			.box
				//- .sort Упорядчить по
				//- v-select.sort(:searchable="searchable" :value="value", :options="sortOptions")
				//- 	template(slot="option" slot-scope="option")
				//- 		span {{ option.label }}
				//- 		img(v-if="option.url" :src="option.url")
				button.mobile-filter-btn(@click="toggleFilters()" v-bind:class="{'mobile-filter-btn_active': isMobileFiltersOpened}") {{ $lang.category.filters.filters }} <img class="mobile-filter-btn__icon" src="@/assets/img/arrow-down.svg" />
				template(v-if="windowWidth > 1200")
					.sort(v-bind:class="{sort_open: isSortOpen}")
						select(name="sort" ref="sort_select")
							template(v-for="(option, index) in sortOptions")
								option(:value="option.value") {{ option.label }}
						.sort__value(@click="toggleSort()" ref="sort_value") {{ $lang.category.filters.order_by }}
						.sort__dropdown
							template(v-for="(option, index) in sortOptions")
								.sort__li(:class="{'sort__li_active': index === activeSortItem}")
									.sort__item(@click="setSortOption(option.value, index)") {{ option.label }} <img class="sort__icon" v-if="option.url" :src="option.url" />
				template(v-else)
					.sort(v-bind:class="{sort_open: isSortOpen}")
						select(name="sort" ref="sort_select")
							template(v-for="(option, index) in sortOptions")
								option(:value="option.value") {{ option.label }}
						.sort__value(@click="toggleSort()" ref="sort_value") {{ $lang.category.filters.order_by }}
					.dropdown
						template(v-for="(option, index) in sortOptions")
							.dropdown__li(:class="{'dropdown__li_active': index === activeSortItem}")
								button.dropdown__item(@click="setSortOption(option.value, index)") {{ option.label }} <img class="dropdown__icon" v-if="option.url" :src="option.url" />
				.display
					.display__label(@click="changeViev()") {{ $lang.category.filters.show }}
					.display__item(v-bind:class="{'display__item_active' : view === 3}", @click="changeViev(3)") 3
					.display__item(:class="{'display__item_active' : view === 4}", @click="changeViev(4)") 4
</template>

<script>
	import Lang from '../../../components/lang.vue';
	import subscribeBox from '@/assets/uploads/subscribe-box.jpg';
	import $store from '../../../components/store';
	import vSelect from 'vue-select';

	import arrUp from '@/assets/img/select_up.svg';
	import arrDown from '@/assets/img/select_down.svg';


	export default {
		name: 'category-tip',
		metaInfo: function() {
			let th = this;

			return {
				title: this.pageTitle,
				meta: [
					{ vmid: 'description', name: 'description', content: th.pageDescription + th.$lang.meta.base_description },
					{ vmid: 'og:description', name: 'og:description', content: th.pageDescription + th.$lang.meta.base_description },
					{ vmid: 'og:title', name: 'og:title', content: this.pageTitle }
				]
			}
		},
		data: function(){
			return {
				subscribeBox,
				tipText:"Express <a href='#'>delivery</a> and free returns within 14 days",
				store:$store.state.count,
				value:"",
				searchable: false,
				isSortOpen: false,
				sortOptions: [],
				windowWidth: window.innerWidth,
				activeSortItem: -1,
				pageTitle: '',
				pageDescription: ''
			}
		},
		components: {
			'v-select': vSelect
		},
		props: {
		},
		mixins: [Lang],
		mounted() {
			var th = this;

			document.addEventListener('click', function(e) {
				if (!e.target.classList.contains('sort') && !e.target.classList.contains('sort__value') && !e.target.classList.contains('sort__dropdown') && !e.target.classList.contains('sort__item') && !e.target.classList.contains('sort__icon')) {
					th.closeSort()
				}
			});

			if (this.$lang != undefined) {
				this.sortOptions = [
					{label: this.$lang.category.filters.popularity, value: 'popularity', url: ''},
					{label: this.$lang.category.filters.high_price, value: 'price_up', url: ''},
					{label: this.$lang.category.filters.low_price, value: 'price_down', url: ''},
					{label: this.$lang.category.filters.alphabetically, value: 'alphabetically', url: ''}
				];
			}


			if ($store.state.products.order ) {
				for (let i = 0; i < this.sortOptions.length; i++) {
					if ($store.state.products.order === this.sortOptions[i].value) {
						this.setSortOption($store.state.products.order, i);
						break;
					}
				}
			}


			window.addEventListener('resize', th.resizeHandler, false);
		},
		computed: {
			view () {
				return $store.state.products.view
			},
			from(){
				let data = $store.state.products.productsPerPage * ($store.state.products.page - 1);
				return data == 0 ? 1 : data;
			},
			showAllMode() {
				return $store.state.products.showAllMode;
			},
			to(){
				let data = ($store.state.products.productsPerPage * ($store.state.products.page - 1)) + $store.state.products.productsPerPage;
				return data > $store.state.products.count ? $store.state.products.count : data;
			},
			categories() {
				var data = $store.state.categories.data;
				return data == undefined ? {} : data;
			},
			activeCategory() {
				var data = $store.state.categories.active.category;
				return data == undefined ? 0 : data;
			},
			productsCount() {
				var data = $store.state.currentProductsCount;
				return data == undefined ? 0 : data;
			},
			isMobileFiltersOpened() {
				var data = $store.state.isMobileFiltersOpened;
				return data == undefined ? false : data;
			},
			brand_name() {
				let $this = this;

				var data = $store.state.brands.data;
				if (data.length) {
					let el = data.find(function(item) {
						return item.manufacturer_id == $this.$route.params.id;
					});
					return el.name;
				} else {
					return '';
				}
			},
			title() {
				let title = '';
				var id = this.$route.params.subcategory;

				var i = 0;

				if (this.$route.params.category === 'brand') {
					if ($store.state.brands.data.length) {
						var id = this.$route.params.subcategory;
						var el = $store.state.brands.data.find(function(item, t) {
							if (item.manufacturer_id == id) i = t;
							return item.manufacturer_id === id;
						});
					}
				}
				
				return $store.state.brands.data.length ? $store.state.brands.data[i].name : '';
			}
		},
		methods:{
			fetchData() {
				
			},
			resizeHandler() {
				this.windowWidth = window.innerWidth;
			},
			toggleFilters() {
				$store.commit('toggleMobileFilters');
			},
			changeViev(v) {
				$store.commit('productsView', v);
			},
			openSort() {
				this.isSortOpen = true;
			},
			closeSort() {
				this.isSortOpen = false;
			},
			toggleSort() {
				this.isSortOpen = !this.isSortOpen;
			},
			setSortOption(value, index) {
				this.closeSort();

				var el = this.sortOptions.find(function(item) {
					return item.value === value;
				});

				var html = el.label;

				if (el.url) {
					html += '<img src="'+ el.url +'" />';
				}

				this.$refs.sort_value.innerHTML = html;
				this.$refs.sort_select.value = el.value;

				this.$refs.sort_select.dispatchEvent(new Event('change'));

				$store.commit('setOrder', value);
				
				this.activeSortItem = index;
			},
			setMeta() {
				if (this.$route.name === 'Brand') {
					let string = this.brand_name;
					this.pageTitle = string ? (string + this.$lang.meta.base_title) : '';
					this.pageDescription = string;
					return;
				}
				let currentCategory = Object.values(this.categories).find((item) => { return item.seo_url === $store.state.categories.active.category });
				let string = currentCategory.name + this.$lang.meta.category_title;
				let desc = currentCategory.name;
				if ($store.state.categories.active.filter) {
					string = $store.state.categories.data[$store.state.categories.active.filter].name + ' — ' + currentCategory.name.toLowerCase() + this.$lang.meta.category_title;
					desc = $store.state.categories.data[$store.state.categories.active.filter].name;
				} else if (this.$route.params.subcategory) {
					string = currentCategory.categories.find(item => { return item.seo_url === this.$route.params.subcategory }).name + (localStorage.getItem('lang') === 'en' ? ' | ' : ' — ') + (localStorage.getItem('lang') === 'en' ? currentCategory.name : currentCategory.name.toLowerCase()) + this.$lang.meta.subcategory_title;
					desc = currentCategory.categories.find(item => { return item.seo_url === this.$route.params.subcategory }).name;
				}
				// if (this.$route.params.deep) {
				// 	string = currentCategory.categories.find(item => { return item.seo_url === this.$route.params.subcategory }).name + ' — ' + currentCategory.name.toLowerCase() + this.$lang.meta.base_title;
				// }
				this.pageTitle = string;
				this.pageDescription = desc;
			}
		},
		beforeDestroy() {
			let th = this;
			window.removeEventListener('resize', th.resizeHandler, false);
		},
		updated() {
			this.setMeta();
		},
		created(){

		},
		watch: {
			'$store.state.brands'() {
				if (!this.brands.data.length) return;

				if (this.$route.params.category === 'brand') {
					var id = this.$route.params.subcategory;
					var el = $store.state.brands.data.find(function(item) {
						return item.manufacturer_id === id;
					})
					this.title = el.name;
				}
				this.setMeta();
			},
			brand_name() {
				this.setMeta();
			},
			'$route' () {
				this.fetchData();
				this.setMeta();
			}
		}
	}

	function Event( event, params ) {
		params = params || { bubbles: false, cancelable: false, detail: undefined };
		var evt = document.createEvent( 'CustomEvent' );
		evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
		return evt;
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/mixins.scss';
	@import '@/helpers/sass/kit.scss';

	.head {
		border-bottom: 1px solid #f3f3f3;
		padding-bottom: 2px;
		margin-bottom: 33px;

		&__h2 {
			@include kit('h2', 'dark');
			font-size: 31px;
			margin-bottom: 3px;
		}
		&__aside {
			width: 100%;
			display: inline-block;
			vertical-align: bottom;
			padding-top: 13px;
			padding-bottom: 0px;
			margin-bottom: -4px;
		}
		&__category {
			width: 100%;
			padding-bottom: 7px;
			display: inline-block;
			vertical-align: bottom;
			text-align: right;
			position: relative;
		}
	}

	.box {
		display: inline-block;
		vertical-align: bottom;
	}
	
	.pieces {
		display: inline-block;
		vertical-align: bottom;
		font-family: 'Museo';
		line-height: normal;
		font-size: 12px;
		font-weight: 100;
		letter-spacing: 0.04em;
		color: #262626;
		position: absolute;
		left: 0;
		bottom: 10px;

		&_mobile {
			display: none;
		}
	}

	.dropdown {
		display: none;
	}

	.sort {
		display: inline-block;
		// vertical-align: bottom;
		font-family: 'Museo';
		line-height: normal;
		font-size: 12px;
		font-weight: 100;
		letter-spacing: 0.04em;
		color: #262626;
		// padding-right: 15px;
		position: relative;
		cursor: pointer;
		z-index: 60;
		// min-width: 143px;

		select {
			visibility: hidden;
			opacity: 0;
			pointer-events: none;
			position: absolute;
		}

		&:after {
			content: "";
			position: absolute;
			// right:10px;
			left: 17px;
			top:15px;
			display: block;
			width: 5px;
			height: 8px;
			background: url(../../../assets/img/arrow-right.png) no-repeat;
			background-size: cover;
			background-position: center;
			transform: rotate(90deg);
			transition: transform .5s ease;
			pointer-events: none;
		}
	}

	.sort {
		border-radius: 0;
		// border-color: #d6d6d6;
		// @include kit('h6 300', 'dark');
		text-transform: none;
		// margin-bottom: 16px;
		// width: 109px;
		height: 43px;
		margin-bottom: -15px;
		color: rgba(#0f0f0f, .6);
		display: inline-block;
		min-width: 143px;
		width: auto;
		position: relative;
		text-align: left;
		cursor: default;
		vertical-align: middle;

		&__value {
			height: 43px;
			border-radius: 2px 2px 0 0;
			padding: 11px 16px 14px 34px;
			transition: background-color .5s ease;
			cursor: pointer;
			position: relative;
			white-space: nowrap;

			/deep/ img {
				margin-top: -1px;
				margin-left: 5px;
				vertical-align: middle;
			}

			&::after {
				content: '';
				display: block;
				width: 100%;
				height: 1px;
				position: absolute;
				bottom: 5px;
				background-color: rgba(0,0,0,0);
				border-radius: 2px;
				left: 0;
				transition: background-color .5s ease;
			}

		}

		button {
			background: none !important;
			font-weight: 300;
		}

		&__dropdown {
			position: absolute;
			width: 100%;
			top: 100%;
			left: 0;
			background-color: #fff;
			border-radius: 0 0 2px 2px;
			box-shadow: 0px 9px 24px rgba(0, 0, 0, 0.04);
			opacity: 0;
			visibility: hidden;
			pointer-events: none;
			transition: opacity .5s ease, visibility .5s ease;
		}

		&__item {
			padding: 8px 16px 8px 16px;
			// margin: 16px 0;
			cursor: pointer;
			// transition: opacity .5s ease;
			transition: background-color .5s ease;

			&:hover {
				opacity: .5s ease;
				background-color: #f3f3f3;
			}

			img {
				margin-top: -1px;
				margin-left: 5px;
				vertical-align: middle;
			}
		}

		&__li {
			&_active {
				.sort__item {
					text-decoration: underline;
				}
			}
		}

		&_open {
			.sort__value {
				background-color: #fff;
				box-shadow: 0px 2px 24px rgba(0, 0, 0, 0.04);

				&::after {
					background-color: #f3f3f3;
				}
			}

			.sort__dropdown {
				opacity: 1;
				visibility: visible;
				pointer-events: all;
			}

			&:after {
				transform: rotate(270deg) translate3d(1px, 0, 1px);
			}
		}
	}

	.mobile-filter-btn {
		display: none;
	}

	.display {
		display: inline-block;
		vertical-align: middle;
		font-family: 'Museo';
		line-height: normal;
		font-size: 12px;
		font-weight: 100;
		letter-spacing: 0.04em;
		color: #262626;
		padding-right: 9px;
		// margin-left: 66px;
		margin-left: 20px;
		margin-top: 7px;

		&__label {
			display: inline-block;
			vertical-align: middle;
			margin-right: 4px;	
		}
		&__item {
			display: inline-block;
			vertical-align: middle;
			margin-left: 10px;
			color: #262626;
			cursor: pointer;

			&_active {
				color:#ADADB1;
			}	
		}
	}

	.mobile-filters {
		display: none;
	}

	@media screen and (max-width: 1200px) {
		.head {
			padding-bottom: 4px;

			&__aside {
				padding-top: 18px;
			}

			&__category {
				padding-top: 8px;
			}

			&__h2 {
				margin-bottom: 0;
			}
		}

		.pieces {
			bottom: 7px;
		}

		.display {
			display: none;
		}
		
		.dropdown {
			display: block;
			position: absolute;
			top: 44px;
			right: 0;
			background: #FFFFFF;
			border: 1px solid rgba(0, 0, 0, 0.04);
			box-shadow: 0px 2px 50px rgba(0, 0, 0, 0.07);
			border-radius: 4px;
			z-index: 11;
			text-align: left;
			padding: 23px 40px 25px 25px;

			font-family: 'Museo';
			line-height: normal;
			font-size: 12px;
			font-weight: 100;
			letter-spacing: 0.04em;
			color: #0D0D0D;
			font-weight: 300;

			opacity: 0;
			visibility: hidden;
			pointer-events: none;
			transition: opacity .5s ease, visibility .5s ease;

			&__li {
				margin-bottom: 18px;

				&:last-child {
					margin-bottom: 0;
				}

				&_active {
					.dropdown__item {
						text-decoration: underline;
					}
				}
			}

			&__item {
				font-weight: 300;
			}
		}

		.sort {
			margin-bottom: -12px;
			height: 35px;
			width: auto;
			margin-left: 19px;

			&__value {
				padding: 11px 0 10px 20px;
				height: 35px;

				&::after {
					bottom: 0;
					display: none;
				}
			}

			&:after {
				top: 15px;
				left: 6px;
			}

			&_open {
				.sort__value {
					background: none;
					box-shadow: none;
				}

				& + .dropdown {
					opacity: 1;
					visibility: visible;
					pointer-events: all;
				}
			}
		}

		.mobile-filter-btn {
			display: inline-block;
			vertical-align: bottom;
			font-family: 'Museo';
			line-height: normal;
			font-size: 12px;
			font-weight: 100;
			letter-spacing: 0.04em;
			color: #262626;
			padding-right: 9px;
			margin-left: 66px;
			opacity: 1;
			position: relative;
			vertical-align: top;
			margin-bottom: 0;
			margin-top: 11px;
			padding-left: 20px;

			&__icon {
				transition: transform .5s ease;
				position: absolute;
				top: 5px;
				left: 6px;
			}

			&_active {
				.mobile-filter-btn__icon {
					transform: rotate(180deg);
				}
			}
		}

		.sort {
			color: #262626;
		}
	}

	@media screen and (max-width: 960px) {

	}

	@media screen and (max-width: 650px) {
		.head {
			padding-bottom: 6px;
			margin-bottom: 32px;

			&__aside {
				padding-top: 12px;
			}
		}

		.pieces {
			display: none;

			&_mobile {
				display: block;
				bottom: 5px;
			}
		}

		.box {
			margin-bottom: -2px;
		}

		.mobile-filter-btn {
			// margin-bottom: -2px;
			vertical-align: top;
			margin-bottom: 0;
			margin-top: 11px;
		}

		.mobile-filters {
			top: 103px !important;
		}

		.sort {
			vertical-align: top;

			&__value {
				// padding: 11px 16px 10px 31px;
				height: 37px;
			}

			&__dropdown {
				top: calc(100% + 2px);
			}
			
			&::after {
				top: 15px;
			}
		}
	}

</style>