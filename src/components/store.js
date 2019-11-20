import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import $ru from "../locales/ru.json";
import $en from "../locales/en.json";
import $ua from "../locales/ua.json";

export default new Vuex.Store({
		state: {
			main: {
				isEmpty: true
			},
			about: [],
			registration_was_succesesful_open: false,
			api: {
				access_token:false
			},
			socials:{},
			currentProductsCount: 0,
			isMobileFiltersOpened: false,
			headerPreloader: 0,
			infoPages: [],
			products: {
				preloader:0,
				showAllMode: false,
				view:4,
				page:1,
				productsPerPage:24,
				allData: {},
				data:{},
				render:{},
				count:0,
				attributes:{},
				brands:{},
				brandFilter: 0,
				filter: {
					category: [],
					color: [],
					collection: [],
					size: [],
					type: [],
					brand: []
				},
				availableFilters: {
					category: [],
					color: [],
					collection: [],
					size: [],
					type: [],
					brand: []
				},
				order: false
			},
			lang:{
				code: localStorage.getItem('lang') || 'ua', // en
				data: {
					ua:$ua,
					ru:$ru,
					en:$en
				}
			},
			search:{
				data:{},
				count:0
			},
			categories: {
				active: {
					category:'',
					subcategory:'',
					filter:''
				},
				data:{}
			},
			account:{
				preloader:0,
				info:{},
				logged:0,
				orders:{}
			},
			address: {},
			cart:{
				data:{},
				countWraps: 0
			},
			order:{
				data:{}
			},
			payment:{
				url:''
			},
			brands:{
				data:{}
			},
			currentPage: '',
			wishlist:{
				data:{}
			},
			isLoginModalActive: false,
			loginModalTitle: '',
			loginModalSubtitle: '',
			portfolioPage: {
				isEmpty: true
			},
			portfolio: [],
			retailStores: [],
			interior: []
		},
		mutations: {
			setInfoPages(state, payload) {
				state.infoPages = payload;
			},
			setRegistrationStatus (state, payload) {
				state.registration_was_succesesful_open = payload;
			},
			setMainPage(state, payload) {
				state.main = payload;
			},
			setAboutPage(state, payload) {
				state.about = payload;
			},
			setLang(state, code){
				state.lang.code = code;
			},
			plusWrap(state) {
				// state.cart.countWraps +=  1;

				Vue.set(state.cart, 'countWraps', state.cart.countWraps+1);
				// console.log(state.cart.countWraps);
			},
			minusWrap(state) {

				// state.cart.countWraps -=  1;
				Vue.set(state.cart, 'countWraps', state.cart.countWraps-1);
				// console.log(state.cart.countWraps);
			},
			toggleMobileFilters(state) {
				state.isMobileFiltersOpened = !state.isMobileFiltersOpened;
			},
			setProductsPreloader(state, preloader) {
				state.products.preloader = preloader;
			},
			setAccountPreloader(state, preloader) {
				state.account.preloader = preloader;
			},
			setHeaderPreloader(state, headerPreloader) {
				state.headerPreloader = headerPreloader;
			},
			setAccountInfoPreloader(state, accountInfoPreloader) {
				state.accountInfoPreloader = accountInfoPreloader;
			},
			setAccountOrdersPreloader(state, accountOrdersPreloader) {
				state.accountOrdersPreloader = accountOrdersPreloader;
			},
			setAccountWishesPreloader(state, accountWishesPreloader) {
				state.accountWishesPreloader = accountWishesPreloader;
			},
			setCurrentPage(state, page) {
				state.currentPage = page;
			},
			deleteWishlist(state, seo_url) {
				Vue.delete(state.wishlist.data, seo_url);
			},
			addWishlist(state, seo_url) {
				Vue.set(state.wishlist.data, seo_url, {});
			},
			setWishlist(state, wishlist) {

				let obj = {};
				wishlist ? wishlist.forEach(e => {
					obj[e.seo_url+'-'+e.product_id] = e;
					if(e.thumb) {
						if (e.thumb.indexOf('.tiff') > 0 || (e.thumb.indexOf('.jpeg') < 0 && e.thumb.indexOf('.png') < 0)) {
							e.thumb = "http://dev-api-villa.tftl.pw/image/cache/no_image-600x600.png";
							e.image_thumb = e.thumb;
						} else {

							if (e.thumb.indexOf('.jpeg') > -1) {
								e.image_thumb = e.thumb.replace('.jpeg', '_486.jpeg');
							} else if (e.image.indexOf('.png') > -1) {
								e.image_thumb = e.thumb.replace('.png', '_486.png');
							} else {
								e.image_thumb = e.thumb;
							}


						}
					} else {
						e.thumb = "http://dev-api-villa.tftl.pw/image/cache/no_image-600x600.png";
						e.image_thumb = e.thumb;
					}

				}) : false;

				Vue.set(state.wishlist, 'data', obj);

			},
			setAccountOrder(state, order) {
				order.data.products.forEach(function(a) {
					if(a.image) {
						if (a.image.indexOf('.tiff') > 0 || (a.image.indexOf('.jpeg') < 0 && a.image.indexOf('.png') < 0)) {
							a.image = "http://dev-api-villa.tftl.pw/image/cache/no_image-600x600.png";
							a.image_thumb = a.image;
						} else {

							if (a.image.indexOf('.jpeg') > -1) {
								a.image_thumb = a.image.replace('.jpeg', '_486.jpeg');
							} else if (e.image.indexOf('.png') > -1) {
								a.image_thumb = a.image.replace('.png', '_486.png');
							} else {
								a.image_thumb = a.image;
							}


						}
					} else {
						a.image = "http://dev-api-villa.tftl.pw/image/cache/no_image-600x600.png";
						a.image_thumb = a.image;
					}
				});
				state.account.orders['order'+order.id].data = order.data;
			},
			setAccountOrders(state, orders) {
				let obj = {};
				if (orders) {
					orders.forEach(e => {

						if(e.image) {
							if (e.image.indexOf('.tiff') > 0 || (e.image.indexOf('.jpeg') < 0 && e.image.indexOf('.png') < 0)) {
								e.image = "http://dev-api-villa.tftl.pw/image/cache/no_image-600x600.png";
								e.image_thumb = e.image;
							} else {

								if (e.image.indexOf('.jpeg') > -1) {
									e.image_thumb = e.image.replace('.jpeg', '_486.jpeg');
								} else if (e.image.indexOf('.png') > -1) {
									e.image_thumb = e.image.replace('.png', '_486.png');
								} else {
									e.image_thumb = e.image;
								}


							}
						} else {
							e.image = "http://dev-api-villa.tftl.pw/image/cache/no_image-600x600.png";
							e.image_thumb = e.image;
						}

						e.data = {};
						obj['order'+e.order_id] = e;
					});
					Vue.set(state.account, 'orders', obj);
				}
			},
			setBrands(state, data) {
				Vue.set(state.brands, 'data', data);
			},
			setPaymentUrl(state, url) {
				state.payment.url = url;
			},
			setOrderData(state, data) {
				state.order.data = data;
			},
			productsView(state, view) {
				state.products.view = view;
			},
			setShowAllMode(state, value) {
				Vue.set(state.products, 'showAllMode', value);
			},
			setAccessToken(state, token) {
				state.api.access_token = token;
			},
			setLoginModalActive(state, value) {
				state.isLoginModalActive = value;
				if (value) {
					document.body.style.overflow = 'hidden';
				} else {
					document.body.style.overflow = 'auto';
				}
			},
			setLoginModalTitle(state, value) {
				state.loginModalTitle = value;
			},
			setLoginModalSubtitle(state, value) {
				state.loginModalSubtitle = value;
			},
			setCategories(state, categories) {
				let obj = {};
				let objSale = false;
				categories.forEach(e => {
					e.seo_url = e.seo_url.replace(this.getters['getLangCode'].code+'-', '');
					let tempCat = [];
					e.categories.forEach(a => {
						a.seo_url = a.seo_url.replace(this.getters['getLangCode'].code+'-', '');
						tempCat.push(a);

						let tempSubcat = [];
						a.categories.forEach(b => {
							b.seo_url = b.seo_url.replace(this.getters['getLangCode'].code+'-', '');
							tempSubcat.push(b);
						});

						a.categories = tempSubcat;
					});
					e.categories = tempCat;
					obj[e.seo_url] = e;
					if (e.seo_url == 'sale') {
						objSale = e;
					}
				});
				Vue.set(state.categories, 'data', obj);
			},
			clearProducts(state) {
				state.products.data = {};
				state.products.brands = {};
				state.products.attributes = {};
				state.products.count = 0;
				state.products.page = 1;
			},
			clearAvailableFilters(state) {
				state.products.availableFilters.color = [];
				state.products.availableFilters.collection = [];
				state.products.availableFilters.size = [];
				state.products.availableFilters.type = [];
				state.products.availableFilters.brand = [];
			},
			setAvailableFilters(state, payload) {
				state.products.availableFilters = payload;
				state.products = { ...state.products, 'availableFilters': payload }
			},
			addFilter(state, payload) {
				var val = state.products.filter[payload.key];
				if (val.indexOf(payload.value === -1)) val.push(payload.value)
				state.products.filter = { ...state.products.filter, [payload.key]: val }
			},
			setBrandFilter(state, payload) {
				Vue.set(state.products, 'brandFilter', payload);
			},
			removeFilter(state, payload) {
				var val = state.products.filter[payload.key];
				var i = val.indexOf(payload.value);
				val.splice(i, 1);
				state.products.filter = { ...state.products.filter, [payload.key]: val }
			},
			clearFilters(state) {
				Vue.set(state.products, 'filter', {
					category: [],
					color: [],
					collection: [],
					size: [],
					type: [],
					brand: []
				});
			},
			setOrder(state, payload) {
				//state.products = { ...state.products, 'order': payload }
				state.products['order'] = payload;
			},
			setProductCount(state, payload) {
				state.currentProductsCount = payload;
			},
			setProducts(state, products) {
				state.products.count = state.currentProductsCount = products.length;

				if (products) {

					let productsObj = {};
					let allProductsObj = {};
					let brandsObj = {};
					let attributesObj = {};
					let availableFilters = state.products.availableFilters;
					attributesObj['attr12'] = new Set();
					attributesObj['attr13'] = new Set();
					attributesObj['attr14'] = new Set();
					attributesObj['attr15'] = new Set();
					attributesObj['attr16'] = new Set();
					attributesObj['attr17'] = new Set();
					attributesObj['attr18'] = new Set();
					attributesObj['attr19'] = new Set();
					products.forEach(e => {

						e.categories = [];

						if(e.category){
							for(var i = 0; i < e.category.length; i++) {
								e.categories.push(e.category[i].id);
							}
						}



						allProductsObj[e.seo_url] = e;

						if (state.categories.active.filter && (state.categories.active.category !== "sale" && state.categories.active.category !== "new-in" && state.categories.active.category !== "brand")) {
							let categoryId = state.categories.data[state.categories.active.filter] != undefined ? state.categories.data[state.categories.active.filter].category_id : 0;

							if (e.categories.indexOf(categoryId) === -1 ) {
								state.categories.data[state.categories.active.category].categories.forEach(cat => {
									if(cat.categories.length > 0) {
										cat.categories.forEach(subcat => {
											console.log(subcat.seo_url+"|"+state.categories.active.filter);
											if(subcat.seo_url == state.categories.active.filter) {
												categoryId = subcat.category_id
											}
										});
									}
								});
								//return;
							}

						} else if(state.categories.active.filter) {
							let categoryId = state.categories.data[state.categories.active.filter] != undefined ? state.categories.data[state.categories.active.filter].category_id : 0;

							if (e.categories.indexOf(categoryId) === -1) {
								return;
							}
						}

						e.seo_url ? e.seo_url = e.seo_url.replace(this.getters['getLangCode'].code+'-', '')+'-'+e.product_id : e.seo_url = "product"+e.product_id;

						if(e.image) {
							if (e.image.indexOf('.tiff') > 0 || (e.image.indexOf('.jpeg') < 0 && e.image.indexOf('.png') < 0)) {
								e.image = "http://dev-api-villa.tftl.pw/image/cache/no_image-600x600.png";
								e.image_thumb = e.image;
								e.image_main = e.image;
							} else {

								if (e.image.indexOf('.jpeg') > -1) {
									e.image_thumb = e.image.replace('.jpeg', '_486.jpeg');
									e.image_main = e.image.replace('.jpeg', '_1378.jpeg');
								} else if (e.image.indexOf('.png') > -1) {
									e.image_thumb = e.image.replace('.png', '_486.png');
									e.image_main = e.image.replace('.png', '_1378.png');
								} else {
									e.image_thumb = e.image;
									e.image_main = e.image;
								}


							}
						} else {
							e.image = "http://dev-api-villa.tftl.pw/image/cache/no_image-600x600.png";
							e.image_thumb = e.image;
							e.image_main = e.image;
						}

						productsObj[e.seo_url] = e;

						brandsObj['brand'+e.manufacturer_id] = {manufacturer:e.manufacturer, manufacturer_id:e.manufacturer_id};

						let attribute_groups = e.attribute_groups[0] ? e.attribute_groups[0] : false;

						if (attribute_groups) {
							attribute_groups.attribute.forEach(a => {
								if (a.text.length && attributesObj.hasOwnProperty('attr'+a.attribute_id)) attributesObj['attr'+a.attribute_id].add(a.text);

								if (a.attribute_id == '13') {
									availableFilters.color.push(a.text);
									return;
								}

								if (a.attribute_id == '14') {
									availableFilters.collection.push(a.text);
									return;
								}

								if (a.attribute_id == '15') {
									availableFilters.size.push(a.text);
									return;
								}

								if (a.attribute_id == '12') {
									availableFilters.type.push(a.text);
									return;
								}

							});

							availableFilters.brand.push(e.manufacturer);
						}

					});

					Vue.set(state.products, 'data', productsObj);
					Vue.set(state.products, 'allData', allProductsObj);
					Vue.set(state.products, 'brands', brandsObj);
					Vue.set(state.products, 'attributes', attributesObj);
					Vue.set(state.products, 'availableFilters', availableFilters);
				}

			},
			setSearchProducts(state, products) {
				state.search.data = {};
				state.search.count = products.length;

				if (products) {
					let obj = {};
					products.forEach(e => {
						e.seo_url ? e.seo_url = e.seo_url.replace(this.getters['getLangCode'].code+'-', '')+'-'+e.product_id : e.seo_url = "product"+e.product_id;

						if(e.image) {
							if (e.image.indexOf('.tiff') > 0 || (e.image.indexOf('.jpeg') < 0 && e.image.indexOf('.png') < 0)) {
								e.image = "http://dev-api-villa.tftl.pw/image/cache/no_image-600x600.png";
								e.image_thumb = e.image;
								e.image_main = e.image;
							} else {

								if (e.image.indexOf('.jpeg') > -1) {
									e.image_thumb = e.image.replace('.jpeg', '_486.jpeg');
									e.image_main = e.image.replace('.jpeg', '_1378.jpeg');
								} else if (e.image.indexOf('.png') > -1) {
									e.image_thumb = e.image.replace('.png', '_486.png');
									e.image_main = e.image.replace('.png', '_1378.png');
								} else {
									e.image_thumb = e.image;
									e.image_main = e.image;
								}


							}
						} else {
							e.image = "http://dev-api-villa.tftl.pw/image/cache/no_image-600x600.png";
							e.image_thumb = e.image;
							e.image_main = e.image;
						}
						obj[e.seo_url] = e;
					});

					Vue.set(state.search, 'data', obj);
				}
			},
			setProduct(state, product) {
				Vue.set(state.product, product.seo_url, product);
			},
			setActiveCategory(state, active) {
				if(state.categories.active.category != active) {
					state.categories.active.category = active;
				}
			},
			setActiveSubCategory(state, active) {
				state.categories.active.subcategory = active;
			},
			setActiveFilterCategory(state, active) {
				if(state.categories.active.filter != active) {
					state.categories.active.filter = active;
				}
			},
			getSocialLinks(state, links) {
				state.socials = links;
			},
			setPage(state, page) {
				state.products.page = page;
			},
			account(state, account) {
				state.account.info = account;
				state.account.logged = 1;
				localStorage.setItem('account_logged', '1');
			},
			address(state, address) {
				state.address = address;
			},
			logout(state) {
				state.account.info = {};
				state.account.logged = 0;
				localStorage.removeItem('account_logged');
			},
			setCart(state, cart) {
				if (cart.products) {
					cart.products.forEach(function(e) {
						if(e.image) {
							if (e.image.indexOf('.tiff') > 0 || (e.image.indexOf('.jpeg') < 0 && e.image.indexOf('.png') < 0)) {
								e.image = "http://dev-api-villa.tftl.pw/image/cache/no_image-600x600.png";
								e.image_thumb = e.image;
							} else {

								if (e.image.indexOf('.jpeg') > -1) {
									e.image_thumb = e.image.replace('.jpeg', '_486.jpeg');
								} else if (e.image.indexOf('.png') > -1) {
									e.image_thumb = e.image.replace('.png', '_486.png');
								} else {
									e.image_thumb = e.image;
								}


							}
						} else {
							e.image = "http://dev-api-villa.tftl.pw/image/cache/no_image-600x600.png";
							e.image_thumb = e.image;
						}
					});
				}

				state.cart.data = cart;
			},
			setTotals(state, totals) {
				state.cart.data.totals = totals.totals;
				state.cart.data.total_product_count = totals.total_product_count;
				state.cart.data.total_raw = totals.total_raw;
			},
			setCartQuantity(state, product) {
				state.cart.data.products[product.index].quantity = (product.quantity <= 0 ? 1 : product.quantity);
			},
			removeCartItem(state, index) {
				state.cart.data.products.splice(index, 1);
			},
			addToCart(state, count) {
				state.cart.count = count;
			},
			setPortfolioPage(state, payload) {
				state.portfolioPage = payload;
			},
			setPortfolio(state, payload) {
				state.portfolio = payload;
			},
			setRetailStores(state, payload) {
				state.retailStores = payload;
			},
			setInteriorPage(state, payload){
				state.interior = payload;
			}
		},
		getters: {
			getRetailStore: (state) => (slug) => {
				return state.retailStores.find(item => item.slug === slug);
			},
			getPortfolioBySlug: (state) => (slug) => {
				console.log(state.portfolio.find(item => item.slug == slug));
				return state.portfolio.find(item => item.slug === slug) || {};
			},
			getInfoPageBySlug: (state) => (slug) => {
				if (!slug) {
					return state.infoPages[0] || {};
				}
				return state.infoPages.find(item => {
					return item.slug === slug;
				}) || {};
			},
			langstore(state){
				return state.lang.data[state.lang.code];
			},
			lang(state){
				let lang = localStorage.getItem('lang');

				if (lang) {
					return lang;
				} else {
					return state.lang.code;
				}
			},
			getCategoryBySlug(state) {
				let id = 0;

				if(!state.categories.active.subcategory && !state.categories.active.filter) {
					(Object.values(state.categories.data)).find(function(cat){
						if (state.categories.active.category === 'sale') {
							id = 76; // временный костыль на /sale. убрать после фикса бага
						}
						(state.categories.active.category == cat.seo_url ? id = cat.category_id : false);
					});
				} else if(state.categories.active.filter) {
					if (state.categories.active.category !== 'sale' && state.categories.active.category !== 'new-in') {
						(Object.values(state.categories.data)).find(function(cat){
							(Object.values(cat.categories)).find(function(subcat){
								(Object.values(subcat.categories)).find(function(subsubcat){
									(state.categories.active.filter == subsubcat.seo_url ? id = subsubcat.category_id : false);
								})
							})
						});
					} else if(state.categories.active.category === 'sale'){
						id = 76;
					} else if(state.categories.active.category === 'new-in'){
						id = 120;
					}
				} else {
					(Object.values(state.categories.data)).find(function(cat){
						if(state.categories.active.category == cat.seo_url) {
							(Object.values(cat.categories)).find(function(subcat){
								(state.categories.active.subcategory == subcat.seo_url ? id = subcat.category_id : false);
							});
						}
					});
				}
				return id;
			},
			getLangCode(getters){
				return getters.lang;
			}
		}
});
