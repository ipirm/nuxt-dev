import Vue from 'vue';
import $store from '../components/store';
import axios from 'axios';

var base = "https://api.villa.ua";
// var base = "http://dev-api-villa.tftl.pw";

export default {
	getToken: function(){
		return localStorage.getItem('token');
	},
	getSocialLinks(){
		axios.
		get('/index.php?route=feed/rest_api/getSocialLink').
		then(response => {
			if (response.data.success == 1) {
				$store.commit("getSocialLinks", response.data.data);
			}
		});
	},
	retailStores: {
		get() {
			const langCodes = {
				ua: "uk-ua",
				en: "en-gb",
				ru: "ru-ru"
			};

			delete axios.defaults.headers["x-oc-image-dimension"];
			delete axios.defaults.headers["x-oc-currency"];
			delete axios.defaults.headers["x-oc-merchant-language"];
			axios.defaults.withCredentials = false;
			let langParam = 'lang='+(localStorage.getItem('lang') || 'ua'); //old en

			axios.get('https://api.villa.ua/wp/wp-json/wp/v2/stores/?'+langParam)
			.then(resp => {
				$store.commit('setRetailStores', resp.data);
			});

			axios.defaults.headers["x-oc-image-dimension"] = "600x600";
			axios.defaults.headers["x-oc-currency"] = "UAH";
			axios.defaults.headers["x-oc-merchant-language"] = localStorage.getItem('lang') ? langCodes[localStorage.getItem('lang')] : langCodes.ua; // old en
			axios.defaults.withCredentials = true; //to true
		}
	},
	interior:{
		get: function() {
			const langCodes = {
				ua: "uk-ua",
				en: "en-gb",
				ru: "ru-ru"
			};

			delete axios.defaults.headers["x-oc-image-dimension"];
			delete axios.defaults.headers["x-oc-currency"];
			delete axios.defaults.headers["x-oc-merchant-language"];
			axios.defaults.withCredentials = false;
			let langParam = 'lang='+(localStorage.getItem('lang') || 'ua'); //old en

			axios.get('https://api.villa.ua/wp/wp-json/wp/v2/pages/?slug=bureau&'+langParam)
				.then(resp => {
					$store.commit('setInteriorPage', resp.data[0].acf);
				})

			axios.defaults.headers["x-oc-image-dimension"] = "600x600";
			axios.defaults.headers["x-oc-currency"] = "UAH";
			axios.defaults.headers["x-oc-merchant-language"] = localStorage.getItem('lang') ? langCodes[localStorage.getItem('lang')] : langCodes.ua; // old en
			axios.defaults.withCredentials = true; //to true
		}
	},
	portfolio: {
		getPage: function() {
			const langCodes = {
				ua: "uk-ua",
				en: "en-gb",
				ru: "ru-ru"
			};

			delete axios.defaults.headers["x-oc-image-dimension"];
			delete axios.defaults.headers["x-oc-currency"];
			delete axios.defaults.headers["x-oc-merchant-language"];
			axios.defaults.withCredentials = false;
			let langParam = 'lang='+(localStorage.getItem('lang') || 'ua');  //old en

			axios.get('https://api.villa.ua/wp/wp-json/wp/v2/pages/?slug=portfolio&'+langParam)
			.then(resp => {
				$store.commit('setPortfolioPage', resp.data[0].acf);
			});

			axios.defaults.headers["x-oc-image-dimension"] = "600x600";
			axios.defaults.headers["x-oc-currency"] = "UAH";
			axios.defaults.headers["x-oc-merchant-language"] = localStorage.getItem('lang') ? langCodes[localStorage.getItem('lang')] : langCodes.ua; // old en
			axios.defaults.withCredentials = true; //to true
		},
		get: function() {
			const langCodes = {
				ua: "uk-ua",
				en: "en-gb",
				ru: "ru-ru"
			};

			delete axios.defaults.headers["x-oc-image-dimension"];
			delete axios.defaults.headers["x-oc-currency"];
			delete axios.defaults.headers["x-oc-merchant-language"];
			axios.defaults.withCredentials = false;
			let langParam = 'lang='+(localStorage.getItem('lang') || 'ua'); //old en

			axios.get('https://api.villa.ua/wp/wp-json/wp/v2/portfolio/?'+langParam)
			.then(resp => {
				$store.commit('setPortfolio', resp.data);
			});

			axios.defaults.headers["x-oc-image-dimension"] = "600x600";
			axios.defaults.headers["x-oc-currency"] = "UAH";
			axios.defaults.headers["x-oc-merchant-language"] = localStorage.getItem('lang') ? langCodes[localStorage.getItem('lang')] : langCodes.ua; // old en
			axios.defaults.withCredentials = true; //to true
		}
	},
	getCategories: function(callback){

		let st = JSON.parse(localStorage.getItem('categories'));

		if (st) {
			$store.commit("setCategories", st);
			$store.commit("setHeaderPreloader", 0);
			if (typeof callback !== 'undefined') callback();
			return;
		}

		if (Object.size($store.state.categories.data)) {
			$store.commit("setHeaderPreloader", 0);
			if (typeof callback !== 'undefined') callback();
			return;
		}

		axios.
		get('/api/rest/categories/level/3').
		then(response => {
			if (response.data.success == 1) {
				$store.commit("setCategories", response.data.data)
				$store.commit("setHeaderPreloader", 0);
				localStorage.setItem('categories', JSON.stringify(response.data.data));
			}
			if (callback) {
				callback();
			}
			// (category == 'brand') ? this.getProductsByBrand(subcategory) : this.getProducts();
		});
	},
	getNewIn:function(callback) {
		$store.commit("clearProducts");
		axios.
		get('/api/rest/latest').
		then(response => {
			if(response.data.success == 1) {
				$store.commit("setProducts", response.data.data);
				$store.commit("setProductsPreloader", 0);
				if (callback) {
					callback(response.data.data);
				}
			}
		});
	},
	getProductsByBrand:function(id) {
		$store.commit("clearProducts");
		axios.
		get('/api/rest/products/manufacturer/'+id).
		then(response => {
			if(response.data.success == 1) {
				$store.commit("setProducts", response.data.data);
				$store.commit("setProductsPreloader", 0);
			}
		});
	},
	getProducts:function(id) {

		console.log("$store.getters['getCategoryBySlug']", $store.getters['getCategoryBySlug']);

		let cid = id ? id : $store.getters['getCategoryBySlug'];

		console.log(cid);

		if(cid) {
			$store.commit("clearProducts");
			axios.
			get('/api/rest/products/category/'+cid).
			then(response => {
				if(response.data.success == 1) {
					$store.commit("setProducts", response.data.data);
					$store.commit("setProductsPreloader", 0);
				}
			});

			return true;

		} else {
			return false;
		}
	},
	getPopular:function(callback) {
		axios.
		get('/index.php?route=feed/rest_api/popular').
		then(response => {
			(response.data.success == 1) ? callback(response.data.data) : false;
		});
	},
	getProductsLike:function(id, callback) {
		axios.
		get('/api/rest/products/category/'+id).
		then(response => {
			(response.data.success == 1) ? callback(response.data.data) : false;
		});
	},
	searchProducts:function(q, limit, omnibox) {
		axios.
			get('/index.php?route=feed/rest_api/products&search='+q+'&limit='+limit).
			then(response => {
				if(response.data.success == 1) {
					omnibox ? $store.commit("setSearchProducts", response.data.data) : $store.commit("setProducts", response.data.data);
					$store.commit("setProductsPreloader", 0);
				}
			});
	},
	getProduct:function(id, callback) {
		axios.
		get('/api/rest/products/'+id).
		then(response => {
			response.data.success == 1 ? callback(response.data.data) : '';
		});
	},
	getRelated:function(id, callback) {
		axios.
		get('/api/rest/related/'+id).
		then(response => {
			response.data.success == 1 ? callback(response.data.data) : '';
		});
	},
	subscribe(email, success) {

		axios({
			url:base+'/index.php?route=feed/rest_api/subscribe',
			method:'post',
			data: {
				email: email,
				captcha: "captcha"
			}
		}).
		then(response => {
			if (response.data.success) {
				success();
			}
		})
		.catch(error => {
			var text = '';
			error.response.data.error.forEach(function(item) {
				text += '<div>' + item + '</div>';
			})
			Vue.notify({
				group: 'notify',
				type: 'error',
				title: window.error_title,
				text: text,
				duration: 10000
			})
		});
	},
	login:function(email, pass, success){
		axios({
			url:base+'/api/rest/login',
			method:'post',
			data: {
				email:email,
				password:pass
			}
		}).
		then(response => {
			if (response.data.success) {
				localStorage.setItem('account_logged', '1');
				$store.commit("account", response.data.data)
				success();
			}
		})
		.catch(error => {
			var text = '';
			error.response.data.error.forEach(function(item) {
				text += '<div>' + item + '</div>';
			})
			Vue.notify({
				group: 'notify',
				type: 'error',
				title: window.error_title,
				text: text,
				duration: 10000
			})
		});
	},
	registration:function(data, success) {

		axios({
			url:base+'/api/rest/register',
			method:'post',
			data: data
		}).
		then(response => {
			if (response.data.success) {
				$store.commit("account", response.data.data);
				success();
			}
			success();

			$store.commit("setRegistrationStatus", true);
		})
		.catch(error => {
			var text = '';
			error.response.data.error.forEach(function(item) {
				text += '<div>' + item + '</div>';
			})
			Vue.notify({
				group: 'notify',
				type: 'error',
				title: window.error_title,
				text: text,
				duration: 10000
			})
		});
	},
	resetPassword:function(data, success) {
		axios({
			url:base+'/api/rest/forgotten',
			method:'post',
			data: {
				email: data
			}
		}).
		then(response => {
			if (response.data.success) {
				// $store.commit("account", response.data.data);
				success(response);
			}
		})
		.catch(error => {
			var text = '';
			error.response.data.error.forEach(function(item) {
				text += '<div>' + item + '</div>';
			})
			Vue.notify({
				group: 'notify',
				type: 'error',
				title: window.error_title,
				text: text,
				duration: 10000
			})
		});
	},
	updateAccount(data, onsuccess) {
		axios({
			url:base+'/api/rest/account',
			method:'put',
			data: data.info
		})
		.then(response => {
			if (response.data.success) {
				// $store.commit("account", response.data.data);


				axios({
					url:base+'/api/rest/account/address',
					method:'post',
					data: data.address
				})
				.then(resp => {
					onsuccess();
				})
				.catch(error => {
					var text = '';
					error.response.data.error.forEach(function(item) {
						text += '<div>' + item + '</div>';
					})
					Vue.notify({
						group: 'notify',
						type: 'error',
						title: window.error_title,
						text: text,
						duration: 10000
					})
				});
			}
		})
		.catch(error => {
			var text = '';
			error.response.data.error.forEach(function(item) {
				text += '<div>' + item + '</div>';
			})
			Vue.notify({
				group: 'notify',
				type: 'error',
				title: window.error_title,
				text: text,
				duration: 10000
			})
		});
	},
	updatePassword(psw, cpsw, onsuccess, onerror) {
		axios({
			url:base+'/api/rest/account/password',
			method:'put',
			data: {
				password: psw,
				confirm: cpsw
			}
		}).
		then(response => {
			if (response.data.success) {
				// $store.commit("account", response.data.data);
				onsuccess(response);
			}
		}, error => {
			onerror(error.response.data.error);
		})
	},
	logout:function(){
		let th = this;
		axios({
			url:'/api/rest/logout',
			method:'post'
		}).
		then(response => {
			response.data.success == 1 ? $store.commit("logout") : '';
			localStorage.setItem('account_logged', '0');
			th.cart.get();
			th.wishlist.get();

		});
	},
	account:{
		info:function(){
			if (!localStorage.getItem('account_logged') || localStorage.getItem('account_logged') == '0') {
				return;
			}
			$store.commit("setAccountPreloader", 0);
			axios({
				url:base+'/api/rest/account',
				method:'get'
			}).
			then(response => {
				if (response.data.success) {
					$store.commit("account", response.data.data);
					$store.commit("setAccountPreloader", 1);
				}
			})
			.catch(error => {
				// localStorage.setItem('account_logged', '0');
				$store.commit("setAccountPreloader", 0);
			});
		},
		orders:function(){
			if (Object.size($store.state.account.orders)) {
				return;
			}
			$store.commit("setAccountPreloader", 0);
			axios.get('/api/rest/customerorders/limit/100/page/1').
			then(response => {
				response.data.success == 1 ? $store.commit("setAccountOrders", response.data.data) : '';
				$store.commit("setAccountPreloader", 1);
			});
		},
		order:function(id){
			$store.commit("setAccountPreloader", 0);
			axios.get('/api/rest/customerorders/'+id).
			then(response => {
				response.data.success == 1 ? $store.commit("setAccountOrder", {id:id, data:response.data.data}) : '';
				$store.commit("setAccountPreloader", 1);
			});
		}
	},
	address() {

		if (Object.size($store.state.address)) {
			return;
		}

		axios({
			url:base+'/api/rest/account/address',
			method:'get'
		}).
		then(response => {
			var adr = {};
			if (response.data.data.hasOwnProperty('addresses')) {
				adr = response.data.data.addresses[response.data.data.addresses.length-1];
			}

			response.data.success == 1 ? $store.commit("address", adr) : '';
		})

	},
	wishlist:{
		delete:function(id, seo_url){
			$store.commit("deleteWishlist", seo_url);
			axios({
				url:base+'/api/rest/wishlist/'+id,
				method:'delete',
			});
		},
		add:function(id, seo_url){
			$store.commit("addWishlist", seo_url);
			axios.post('/api/rest/wishlist/'+id);
		},
		get:function(){
			axios.get('/api/rest/wishlist').
			then(response => {
				if (response.data.success) {
					$store.commit("setWishlist", response.data.data);
					$store.commit('setAccountWishesPreloader', 0);
				}
			});
		}
	},
	brands:function(){
		axios.get('/api/rest/manufacturers').
		then(response => {
			response.data.success == 1 ? $store.commit("setBrands", response.data.data) : '';
		});
	},
	cart:{
		delete:function(key, success){
			axios({
				url:base+'/api/rest/cart',
				method:'delete',
				data: {
					key,
				}
			}).
			then(response => {
				if (response.data.success) {
					this.totals();
					if (success) success(response);
				}
			});
		},
		empty() {
			axios({
				url:base+'/api/rest/cart/empty',
				method:'delete'
			})
			.then(response => {
				this.get();
			});
		},
		update:function(key, quantity){
			axios({
				url:base+'/api/rest/cart',
				method:'put',
				data: {
					key,
					quantity:quantity <= 0 ? 1 : quantity
				}
			}).
			then(response => {
				response.data.success == 1 ? this.totals() : '';
			});
		},
		totals:function(){
			axios({
				url:base+'/api/rest/cart',
				method:'get'
			}).
			then(response => {
				response.data.success == 1 ? $store.commit("setTotals", { totals:response.data.data.totals, total_product_count:response.data.data.total_product_count, total_raw:response.data.data.total_raw }) : '';
			});
		},
		get:function(callback){
			axios({
				url:base+'/api/rest/cart',
				method:'get'
			}).
			then(response => {
				response.data.success == 1 ? $store.commit("setCart", response.data.data) : '';
				if (callback) callback();
				console.log(response.data);
			});
		},
		add:function(product, success){

			var wrap = 'Нет';
			var size = false;
			var sizeId = 0;
			var sizeVal = 0;

			if (product.selectedOptions != undefined && product.selectedOptions.length) {
				var wrapArr = product.selectedOptions.find(function(item) {
					return item.name == 'упаковка' || item.name === 'packaging' || item.name === 'Упаковка';
				});

				var sizeArr = product.selectedOptions.find(function(item) {
					return item.name == 'Size';
				});


				if (wrapArr && wrapArr.value.length) {
					wrap = wrapArr.value;
				}

				if (sizeArr) {
					size = true;
					sizeId = sizeArr.product_option_id;
					sizeVal = sizeArr.option_value[0].product_option_value_id;
				}
			}

			var options = {
				'1361': wrap
			};

			if (size) {
				options[sizeId] = sizeVal;
			}

			axios({
				url:base+'/api/rest/cart',
				method:'post',
				data: {
					product_id:product.product_id,
					quantity:1,
					option: options
				}
			}).
			then(response => {
				if (response.data.success == 1) {
					$store.commit("addToCart", response.data.data.total_product_count);
					success(response);
				}
			});
		}
	},
	updateWrap:function(product, val, success) {

		let th = this;

		var activeSize = false;

		var obj = product.option.find(function(item) {
			return item.name === 'Size';
		});

		if (obj) {
			activeSize = obj.value;
		}

		var option = {};


		this.cart.delete(product.key, function() {
			th.getProduct(product.product_id, function(resp) {

				if (activeSize) {
					var el = resp.options.find(function(item) {
						return item.name === 'Size';
					});

					var activeObj = el.option_value.find(function(k) {
						return k.name === activeSize;
					});

					option[el.product_option_id] = activeObj.product_option_value_id;

				}

				var el = resp.options.find(function(item) {
					return item.name == 'упаковка' || item.name === 'packaging' || item.name === 'Упаковка';
				});

				if (el) {
					option[el.product_option_id] = val ? 'Да' : 'Нет';
				}

				// console.log({
				// 	product_id:product.product_id,
				// 	quantity:product.quantity,
				// 	option: option
				// });


				axios({
					url:base+'/api/rest/cart',
					method:'post',
					data: {
						product_id:product.product_id,
						quantity:product.quantity,
						option: option
					}
				}).
				then(response => {
					if (response.data.success == 1) {
						th.cart.get(function() {
							success();
						});
						// $store.commit("addToCart", response.data.data.total_product_count);

					}
					console.log(response.data);
				});
			});
		});


	},
	info: {
		get() {
			const langCodes = {
				ua: "uk-ua",
				en: "en-gb",
				ru: "ru-ru"
			};

			delete axios.defaults.headers["x-oc-image-dimension"];
			delete axios.defaults.headers["x-oc-currency"];
			delete axios.defaults.headers["x-oc-merchant-language"];
			axios.defaults.withCredentials = false;
			let langParam = '?lang='+(localStorage.getItem('lang') || 'ua'); //old en
			axios.get('/wp/wp-json/wp/v2/info_pages' + langParam).
			then(response => {
				$store.commit('setInfoPages', response.data);
			});
			axios.defaults.headers["x-oc-image-dimension"] = "600x600";
			axios.defaults.headers["x-oc-currency"] = "UAH";
			axios.defaults.headers["x-oc-merchant-language"] = localStorage.getItem('lang') ? langCodes[localStorage.getItem('lang')] : langCodes.ua; // old en
			axios.defaults.withCredentials = true; //to true
		}
	},
	main: {
		get() {
			const langCodes = {
				ua: "uk-ua",
				en: "en-gb",
				ru: "ru-ru"
			};

			delete axios.defaults.headers["x-oc-image-dimension"];
			delete axios.defaults.headers["x-oc-currency"];
			delete axios.defaults.headers["x-oc-merchant-language"];
			axios.defaults.withCredentials = false;
			let langParam = '&lang='+(localStorage.getItem('lang') || 'ua');//old en
			axios.get('/wp/wp-json/wp/v2/pages/?slug=home' + langParam).
			then(response => {
				$store.commit('setMainPage', response.data[0].acf);
			});
			axios.defaults.headers["x-oc-image-dimension"] = "600x600";
			axios.defaults.headers["x-oc-currency"] = "UAH";
			axios.defaults.headers["x-oc-merchant-language"] = localStorage.getItem('lang') ? langCodes[localStorage.getItem('lang')] : langCodes.ua; // old en
			axios.defaults.withCredentials = true; //to true
		}
	},
	about: {
		get() {
			const langCodes = {
				ua: "uk-ua",
				en: "en-gb",
				ru: "ru-ru"
			};

			delete axios.defaults.headers["x-oc-image-dimension"];
			delete axios.defaults.headers["x-oc-currency"];
			delete axios.defaults.headers["x-oc-merchant-language"];
			axios.defaults.withCredentials = false;
			let langParam = '&lang='+(localStorage.getItem('lang') || 'ua'); //old en
			axios.get('https://api.villa.ua/wp/wp-json/wp/v2/pages/?slug=about' + langParam).
			then(response => {
				console.log(response.data[0].acf);
				$store.commit('setAboutPage', response.data[0].acf);
			});
			axios.defaults.headers["x-oc-image-dimension"] = "600x600";
			axios.defaults.headers["x-oc-currency"] = "UAH";
			axios.defaults.headers["x-oc-merchant-language"] = localStorage.getItem('lang') ? langCodes[localStorage.getItem('lang')] : langCodes.ua; // old en
			axios.defaults.withCredentials = true; //to true
		}
	},
	checkout:{
		pay:function(callback){0
			axios.post('/api/rest/pay').
			then(response => {
				response.data.success == 1 ? callback(response.data.data) : false;
			})
			.catch(error => {
				var text = '';
				error.response.data.error.forEach(function(item) {
					text += '<div>' + item + '</div>';
				})
				Vue.notify({
					group: 'notify',
					type: 'error',
					title: window.error_title,
					text: text,
					duration: 10000
				})
			});
		},
		payNew:function(callback){
			return new Promise(resolve => {
				axios.post('/api/rest/pay').
				then(response => {
					resolve(response.data.data);
				})
				.catch(error => {
					var text = '';
					error.response.data.error.forEach(function(item) {
						text += '<div>' + item + '</div>';
					})
					Vue.notify({
						group: 'notify',
						type: 'error',
						title: window.error_title,
						text: text,
						duration: 10000
					})
				});
			});
		},
		confirm:function(callback){
			axios.post('/api/rest/confirm').
			then(response => {
				if (response.data.success) {
					callback(response.data.data);
				}
			})
			.catch(error => {
				var text = '';
				error.response.data.error.forEach(function(item) {
					text += '<div>' + item + '</div>';
				})
				Vue.notify({
					group: 'notify',
					type: 'error',
					title: window.error_title,
					text: text,
					duration: 10000
				})
			});
		},
		confirmNew:function(callback){
			return new Promise(resolve => {
				axios.post('/api/rest/confirm').
				then(response => {
					if (response.data.success) {
						resolve(response.data.data);
					}
				})
				.catch(error => {
					var text = '';
					error.response.data.error.forEach(function(item) {
						text += '<div>' + item + '</div>';
					})
					Vue.notify({
						group: 'notify',
						type: 'error',
						title: window.error_title,
						text: text,
						duration: 10000
					})
				});
			});
		},
		setPaymentaddress:function(data, callback, onerror){
			axios.post('/api/rest/paymentaddress', data).
			then(response => {
				if (response.data.success) {
					callback(response.data.data);
				}
			})
			.catch(error => {
				var text = '';
				error.response.data.error.forEach(function(item) {
					text += '<div>' + item + '</div>';
				})
				Vue.notify({
					group: 'notify',
					type: 'error',
					title: window.error_title,
					text: text,
					duration: 10000
				});

				onerror();
			});
		},
		setPaymentaddressNew:function(data, callback, onerror){
			return new Promise(resolve =>  {
				axios.post('/api/rest/paymentaddress', data).
				then(response => {
					resolve(response.data.success);
				})
				.catch(error => {
					var text = '';
					error.response.data.error.forEach(function(item) {
						text += '<div>' + item + '</div>';
					})
					Vue.notify({
						group: 'notify',
						type: 'error',
						title: window.error_title,
						text: text,
						duration: 10000
					});

					resolve(false);
				});
			});
		},
		setPaymentmethods:function(data, callback){
			axios.post('/api/rest/paymentmethods', data).
			then(response => {
				response.data.success == 1 ? callback(response.data.data) : false;
			})
			.catch(error => {
				var text = '';
				error.response.data.error.forEach(function(item) {
					text += '<div>' + item + '</div>';
				})
				Vue.notify({
					group: 'notify',
					type: 'error',
					title: window.error_title,
					text: text,
					duration: 10000
				})
			});
		},
		setPaymentmethodsNew:function(data, callback){
			return new Promise(resolve => {
				axios.post('/api/rest/paymentmethods', data).
				then(response => {
					resolve();
				})
				.catch(error => {
					var text = '';
					error.response.data.error.forEach(function(item) {
						text += '<div>' + item + '</div>';
					})
					Vue.notify({
						group: 'notify',
						type: 'error',
						title: window.error_title,
						text: text,
						duration: 10000
					})
				});
			});
		},
		paymentmethods:function(callback){
			axios.get('/api/rest/paymentmethods').
			then(response => {
				response.data.success == 1 ? callback(response.data.data) : false;
			})
			.catch(error => {
				var text = '';
				error.response.data.error.forEach(function(item) {
					text += '<div>' + item + '</div>';
				})
				Vue.notify({
					group: 'notify',
					type: 'error',
					title: window.error_title,
					text: text,
					duration: 10000
				})
			});
		},
		paymentmethodsNew:function(callback){
			return new Promise(resolve => {
				axios.get('/api/rest/paymentmethods').
				then(response => {
					resolve();
				})
				.catch(error => {
					var text = '';
					error.response.data.error.forEach(function(item) {
						text += '<div>' + item + '</div>';
					})
					Vue.notify({
						group: 'notify',
						type: 'error',
						title: window.error_title,
						text: text,
						duration: 10000
					})
				});
			});
		},
		setShippingmethods:function(data, callback){
			axios.post('/api/rest/shippingmethods', data).
			then(response => {
				response.data.success == 1 ? callback(response.data.data) : false;
			})
			.catch(error => {
				var text = '';
				error.response.data.error.forEach(function(item) {
					text += '<div>' + item + '</div>';
				})
				Vue.notify({
					group: 'notify',
					type: 'error',
					title: window.error_title,
					text: text,
					duration: 10000
				})
			});
		},
		setShippingmethodsNew:function(data, callback){
			return new Promise(resolve => {
				axios.post('/api/rest/shippingmethods', data).
				then(response => {
					resolve();
				})
				.catch(error => {
					var text = '';
					error.response.data.error.forEach(function(item) {
						text += '<div>' + item + '</div>';
					})
					Vue.notify({
						group: 'notify',
						type: 'error',
						title: window.error_title,
						text: text,
						duration: 10000
					})
				});
			});
		},
		shippingmethods:function(callback){
			axios.get('/api/rest/shippingmethods').
			then(response => {
				response.data.success == 1 ? callback(response.data.data) : false;
			})
			.catch(error => {
				var text = '';
				error.response.data.error.forEach(function(item) {
					text += '<div>' + item + '</div>';
				})
				Vue.notify({
					group: 'notify',
					type: 'error',
					title: window.error_title,
					text: text,
					duration: 10000
				})
			});
		},
		shippingmethodsNew:function(callback){
			return new Promise(resolve => {
				axios.get('/api/rest/shippingmethods').
				then(response => {
					resolve();
					// response.data.success == 1 ? callback(response.data.data) : false;
				})
				.catch(error => {
					var text = '';
					error.response.data.error.forEach(function(item) {
						text += '<div>' + item + '</div>';
					})
					Vue.notify({
						group: 'notify',
						type: 'error',
						title: window.error_title,
						text: text,
						duration: 10000
					})
				});
			});
		},
		setShippingadressNew:function(data, callback){
			return new Promise(resolve => {
				axios.post('/api/rest/shippingaddress', data).
				then(
					response => {
						resolve(response.data.data);
					// response.data.success == 1 ? callback(response.data.data) : false;
				})
				.catch(error => {
					var text = '';
					error.response.data.error.forEach(function(item) {
						text += '<div>' + item + '</div>';
					})
					Vue.notify({
						group: 'notify',
						type: 'error',
						title: window.error_title,
						text: text,
						duration: 10000
					})
				});
			});
		},
		setShippingadress:function(data, callback){
			axios.post('/api/rest/shippingaddress', data).
			then(
				response => {
				response.data.success == 1 ? callback(response.data.data) : false;
			})
			.catch(error => {
				var text = '';
				error.response.data.error.forEach(function(item) {
					text += '<div>' + item + '</div>';
				})
				Vue.notify({
					group: 'notify',
					type: 'error',
					title: window.error_title,
					text: text,
					duration: 10000
				})
			});
		},
		shippingadress:function(callback){
			axios.get('/api/rest/shippingaddress').
			then(response => {
				response.data.success == 1 ? callback(response.data.data) : false;
			})
			.catch(error => {
				var text = '';
				error.response.data.error.forEach(function(item) {
					text += '<div>' + item + '</div>';
				})
				Vue.notify({
					group: 'notify',
					type: 'error',
					title: window.error_title,
					text: text,
					duration: 10000
				})
			});
		}
	}
};
