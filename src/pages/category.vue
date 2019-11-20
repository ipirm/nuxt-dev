<template lang="pug">
	transition(name="fade" mode="out-in")
		.box
			block-header
			.category.page
				tip
				.wrapper
					category-preloader
					category-head
					.category__box(ref="box")
						category-aside-desktop#aside( v-bind:dataColor="selectedProductData" v-if="windowWidth > 1200" v-stick-in-parent="stikyKit" ref="aside")
						category-aside-mobile(v-else v-bind:dataColor="selectedProductData")
						category-products(@sendToParent="onClickChild")
				block-footer
				block-login-modal
				lang
</template>

<script>

	import Vue from 'vue'
	import Lang from '../components/lang.vue';

	import BlockHeader from '../blocks/includes/header/header.vue';
	import Tip from '../blocks/category/tip/tip.vue';
	import Head from '../blocks/category/head/head.vue';
	import Aside from '../blocks/category/aside/aside.vue';
	import AsideMobile from '../blocks/category/aside/aside-mobile.vue';
	import Products from '../blocks/category/products/products.vue';
	import BlockFooter from '../blocks/includes/footer/footer.vue';
	import Preloader from '../blocks//category/preloader/preloader.vue';
	import BlockLoginModal from '../blocks/includes/login/login.vue';

	import VueStickyKit from 'vue-stickykit';
	Vue.use(VueStickyKit);

	// const VueSticky = VueSticky.default;
	//import axios from 'axios';

	import $api from '../components/api.js';
	import $store from '../components/store';

	export default {
		name: 'Category',
		// metaInfo: function() {
		// 	let th = this;

		// 	return {
		// 		title: this.title,
		// 		meta: [
		// 			{ vmid: 'description', name: 'description', content: th.title + '. ' + th.$lang.meta.base_description }
		// 		]
		// 	}
		// },
		data: function(){
			return {
				    selectedProductData: {},

				stikyKit: {
					options: {
						parent: '.category__box',
						offset_top: 180
					}
				},
				// title: $store.state.categories.find((item) => { return item.seo_url === $store.state.categories.active.category }).name,
				// title: '',
				windowWidth: window.innerWidth
			}
		},
		mixins: [Lang],
		components: {
			'block-header': BlockHeader,
			'category-head': Head,
			'tip': Tip,
			'category-aside-desktop': Aside,
			'category-aside-mobile': AsideMobile,
			'category-products': Products,
			'category-preloader': Preloader,
			'block-footer': BlockFooter,
			'block-login-modal': BlockLoginModal,
			'lang': Lang
		},
		computed: {
			categories() {
				var data = $store.state.categories.data;
				return data == undefined ? {} : data;
			}
		},
		created () {
			$store.commit("setProductsPreloader", 1);
			$store.commit("clearProducts");
			this.fetchData();
			console.log('CREATED');
		},
		methods: {
            onClickChild(v) {
                console.log('Ya tut');
                console.log(v);
                this.selectedProductData = v;
                console.log(this.selectedProductData);
            },
			fetchData () {
				let $this = this;

				// if (this.$route.name == "Brand") {
				// 	// $store.commit("setActiveCategory", this.$route.params.subcategory);
				// 	$store.commit("setActiveFilterCategory", this.$route.params.subcategory);
				// } else {
				// 	$store.commit("setActiveCategory", this.$route.params.category);
				// 	$store.commit("setActiveSubCategory", this.$route.params.subcategory);
				// 	$store.commit("setActiveFilterCategory", '');
				// }

				if(this.$route.name == "Category" && (this.$route.params.category == "sale" || this.$route.params.category == "new-in")) {
					$store.commit("setActiveCategory", this.$route.params.category);
					$store.commit("setActiveSubCategory", '');
					$store.commit("setActiveFilterCategory", this.$route.params.subcategory);
				} else if (this.$route.params.category == "new-in") {
					$store.commit("setActiveCategory", this.$route.params.category);
					$store.commit("setActiveSubCategory", '');
					$store.commit("setActiveFilterCategory", this.$route.params.subcategory);
					// $store.commit("setActiveFilterCategory", this.$route.params.category);
					// $store.commit("setActiveSubCategory", this.$route.params.subcategory);
				} else if (this.$route.name == "Brand") {
					$store.commit("setActiveCategory", 'brand');
					$store.commit("setActiveFilterCategory", this.$route.params.subcategory);
				} else if (this.$route.name == "Parser Deep") {
					$store.commit("setActiveCategory", this.$route.params.category);
					$store.commit("setActiveSubCategory", '');
					$store.commit("setActiveFilterCategory", this.$route.params.deep);
				} else {
					$store.commit("setActiveCategory", this.$route.params.category);
					$store.commit("setActiveSubCategory", this.$route.params.subcategory);
					$store.commit("setActiveFilterCategory", '');
				}

				$store.commit("setProductsPreloader", 1);
				$store.commit("clearProducts");

				this.$route.name == "Search" ? $api.searchProducts(this.$route.query.q, 100) : false;
				if (this.$route.name == "Category" || this.$route.name == "Parser Deep") {
					$api.getCategories(function() {
						$api.getProducts();
					});
				} else if (this.$route.name === 'Brand') {
					$api.getCategories(function() {
						$api.getProductsByBrand($this.$route.params.id);
					});
				}
				// if (this.$route.name == "Category") {
				// 	$api.getCategories(function() {
				// 		$api.getProducts();
				// 	});
				// } else if (this.$route.name === 'Brand') {
				// 	$api.getCategories(function() {
				// 		$api.getProductsByBrand($this.$route.params.id);
				// 	});
				// }
			},
			resizeHandler() {
				var w = window.innerWidth;
				this.windowWidth = w;

				var name = '';

				if (w > 1200) {
					name = 'sticky_kit:recalc';
					this.$refs.box.style.position = 'relative';
				} else {
					name = 'sticky_kit:detach';
					this.$refs.box.style.position = 'static';
				}

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
					if (this.$refs.aside) {
						this.$refs.aside.$el.dispatchEvent(event);
					}
				} else {
					if (this.$refs.aside) {
						this.$refs.aside.fireEvent("on" + event.eventType, event);
					}
				}
			},
			setMeta() {
				if (this.$route.name === 'Brand') {
					console.log('get');
					let string = $store.state.brands.data.find(item => { return item.manufacturer_id === this.$route.params.id });
					this.title = string ? string.name : '';
					return;
				}
				let currentCategory = Object.values(this.categories).find((item) => { return item.seo_url === $store.state.categories.active.category });
				let string = currentCategory.name + this.$lang.meta.base_title;
				if ($store.state.categories.active.filter) {
					console.log($store.state.categories.data[$store.state.categories.active.filter]);
					string = $store.state.categories.data[$store.state.categories.active.filter].name + ' — ' + currentCategory.name.toLowerCase() + this.$lang.meta.base_title;
				} else if (this.$route.params.subcategory) {
					string = currentCategory.categories.find(item => { return item.seo_url === this.$route.params.subcategory }).name + ' — ' + currentCategory.name.toLowerCase() + this.$lang.meta.base_title;
				}
				// if (this.$route.params.deep) {
				// 	string = currentCategory.categories.find(item => { return item.seo_url === this.$route.params.subcategory }).name + ' — ' + currentCategory.name.toLowerCase() + this.$lang.meta.base_title;
				// }
				this.title = string;
			}
		},
		watch: {
			'$route' (to, from) {
				if (to.name != from.name || to.path != from.path) {
					$store.commit("setProductsPreloader", 1);
					$store.commit("clearProducts");
					this.fetchData();
				}

				// this.setMeta();
			},
			categories() {
				// this.setMeta();
			}
		},
		mounted() {
			// this.fetchData();
			this.$children[0].menuBoxOut();
           console.log(this.productsData);
			window.addEventListener('resize', this.resizeHandler);
			this.resizeHandler();
		},
		beforeDestroy() {
			window.removeEventListener('resize', this.resizeHandler);
			$store.commit("clearFilters", '');
			$store.commit("setProductsPreloader", 1);
			$store.commit("clearProducts");
		}
	}
</script>

<style lang="scss">
	@import '@/assets/sass/ui.scss';
	.wrapper {
		width: 100%;
		padding-left: 48px;
		padding-right: 48px;
		max-width: calc(1344px + 48px*2);
		margin: 0 auto;
		box-sizing: border-box;
		position: relative;
	}
	.category {
		padding-top: 136px;
		min-height: calc(100vh - (144px + 376px));

		&__box {
			height: auto;
		}
	}

	@media screen and (max-width: 1200px) {
		.category {
			padding-top: 60px;

			&__box {
				position: static !important;
			}
		}

		.wrapper {
			padding-left: 40px !important;
    		padding-right: 40px !important;
		}
	}

	@media screen and (max-width: 850px) {
		.wrapper {
			padding-left: 32px !important;
    		padding-right: 32px !important;
		}
	}

	@media screen and (max-width: 650px) {
		.category {
			padding-top: 44px;

			&__box {
				position: relative !important;
			}

			.product {

				&__item {

					.card {

						&__slider {
							margin-bottom: 18px;
						}

						&__brand {
							margin-bottom: 6px;
						}

						&__price {
							font-size: 14px;
						}

						&__title {
							margin-bottom: 11px;
						}
					}
				}
			}
		}

		.wrapper {
			padding-left: 16px !important;
    		padding-right: 16px !important;
		}
	}


</style>
