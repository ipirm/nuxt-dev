<template lang="pug">
	div
		notifications(class="notifications", group="notify")

		.success_registration(v-if="isRegistered")
			.success_registration_wrapper
				button.close_thank_you(@click="closeThankYou")
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="21.2959" height="1.01409" transform="matrix(0.703915 -0.710284 0.703915 0.710284 0 15.2798)" fill="#0f0f0f"/>
						<rect width="21.2959" height="1.01409" transform="matrix(0.703915 0.710284 -0.703915 0.710284 1.00781 0)" fill="#0f0f0f"/>
					</svg>
				h2 Thank you for registration!
				button.close(@click="closeThankYou") close

		header.header
			.header__box
				.menu-line.header__menu-line(@mouseover="menuBoxOut")
					.top-menu(v-if="!search")
						router-link.logo.top-menu__logo(:to="'/' + (lang === langDefault ? '' : lang + '/')")
							img(src="@/assets/img/logo.svg")
						.controls.top-menu__controls
							.controls__item.controls__item_search(@click="search = true; addFocus()")
								.icon-search
							.controls__item.controls__item_loc {{ lang }}
								.lang-dropdown
									.lang-dropdown__container
										.lang-dropdown__item(@click="$change('ua')" v-if="lang.toLowerCase() != 'ua'") UA
										.lang-dropdown__item(@click="$change('en')" v-if="lang.toLowerCase() != 'en'") EN
										.lang-dropdown__item(@click="$change('ru')" v-if="lang.toLowerCase() != 'ru'") RU
							.controls__item.controls__item_login
								template(v-if="windowWidth > 1200")
									router-link.controls__label(:to="'/'+ (lang === langDefault ? '' : lang + '/')+(logged == 1 ? 'account' : 'login')" @click.native="closeMenu($event)" v-if="logged == 1")
										.label {{ account.firstname }}
										.icon-profile
									button.controls__label(@click="login()" v-else)
										.label {{ $lang.header.login.label }}
										.icon-profile
								template(v-else)
									router-link.control-mobile(v-if="logged == 0" :to="'/' + (lang === langDefault ? '' : lang + '/') + 'login'" @click.native="closeMenu($event)")
										.icon-profile
									.control-mobile(v-if="logged == 1" @click="toggleMobileControl($event)" ref="signControlMobile")
										.label(v-if="logged == 1") {{ account.firstname }}
										.icon-profile
								.sign-dropdown(v-if="logged == 1" ref="signDropdown")
									.sign-dropdown__container
										router-link.sign-dropdown__user(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'account'" @click.native="closeMenu($event)") {{ account.firstname }}
										router-link.sign-dropdown__item(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'account'" @click.native="closeMenu($event)") {{ $lang.header.login.dropdown.item1 }}
										router-link.sign-dropdown__item(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'account/wishes'" @click.native="closeMenu($event)") {{ $lang.header.login.dropdown.item2 }}
										router-link.sign-dropdown__item(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'account/orders'" @click.native="closeMenu($event)") {{ $lang.header.login.dropdown.item3 }}
										.sign-dropdown__item(@click="logout()") {{ $lang.header.login.dropdown.item4 }}
							router-link.controls__item.controls__item_cart(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'cart'" @click.native="closeMenu($event)")
								.label {{ $lang.header.cart.label }}
								.icon-cart
								.badge(v-if="cartCount > 0") {{ cartCount }}
					.search(v-if="search", ref="search")
						input.search__input(type="text", v-model="searchquery", @click="searchBox = true")
						.icon-search.search__icon-search
						button.search__close(@click="closeSearch()")

				.menu-line.header__menu-line.header__menu-line_nav(:class="[scrolled ? 'header__menu-line_scrolled' : '']", @mouseleave="menuParentBoxOut")
					header-preloader(v-if="windowWidth > 1200")
					nav.nav
						//- template
						//- 	span(@mouseover="menuBoxOver('newin')")
						//- 		router-link.nav__item.nav__item_static(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'new-in/'" :title="$lang.header.nav.newin" @click.native="closeMenu($event)") {{ $lang.header.nav.newin }}
						template(v-for="category in orderedCategories")
							span(@click="getCategory(category.category_id)", v-if="category.seo_url == 'new-in'", @mouseover="menuBoxOver(category.seo_url)")
								router-link.nav__item(:title="category.name", :to="'/'+ (lang === langDefault ? '' : lang + '/')+formatUrl(category.seo_url)+'/'" @click.native="closeMenu($event)" :class="{'nav__item_hover': menuBoxChange == category.seo_url}") {{ category.name }}
						template
							span(@mouseover="menuBoxOver('brands')")
								router-link.nav__item.nav__item_static(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'brands/'" :title="$lang.header.nav.brands" @click.native="closeMenu($event)" :class="{'nav__item_hover': menuBoxChange == 'brands'}") {{ $lang.header.nav.brands }}
						template(v-for="category in orderedCategories")
							span(@click="getCategory(category.category_id)", v-if="category.seo_url != 'popular' && category.seo_url != 'new-in'", @mouseover="menuBoxOver(category.seo_url)")
								router-link.nav__item(:title="category.name", :to="'/'+ (lang === langDefault ? '' : lang + '/')+formatUrl(category.seo_url)+'/'" @click.native="closeMenu($event)" :class="{'nav__item_hover': menuBoxChange == category.seo_url}") {{ category.name }}
						//- template
						//- 	span(@mouseover="menuBoxOver('sale')")
						//- 		router-link.nav__item.nav__item_static(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'sale/'" :title="$lang.header.nav.sale" @click.native="closeMenu($event)") {{ $lang.header.nav.sale }}
			.wrapper.hide
				router-link(:to="'/'+ (lang === langDefault ? '' : lang + '/')", class="logo")
					img(src="@/assets/img/logo.svg")
				nav.nav
					template(v-for="category in orderedCategories")
						span(@click="getCategory(category.category_id)", v-if="category.seo_url == 'new-in'", @mouseover="menuBoxOver(category.seo_url)")
							router-link.nav__item(:title="category.name", :to="'/'+ (lang === langDefault ? '' : lang + '/')+formatUrl(category.seo_url)+'/'" @click.native="closeMenu($event)") {{ category.name }}
					template
						span(@mouseover="menuBoxOver('brands')")
							router-link.nav__item.nav__item_static(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'brands/'" :title="$lang.header.nav.brands" @click.native="closeMenu($event)") {{ $lang.header.nav.brands }}
					template(v-for="category in orderedCategories")
						span(@click="getCategory(category.category_id)", v-if="category.seo_url != 'popular' && category.seo_url != 'new-in'", @mouseover="menuBoxOver(category.seo_url)")
							router-link.nav__item(:title="category.name", :to="'/'+ (lang === langDefault ? '' : lang + '/')+formatUrl(category.seo_url)+'/'" @click.native="closeMenu($event)") {{ category.name }}
			
		.menu(:class="[menu ? 'menu_opened' : '']" @click="smartToggleMenu()")
			.aside.menu__aside
				.langs-list.aside__langs-list
					button.langs-list__item(@click="$change('ru')" v-if="lang.toLowerCase() != 'ru'") RU
					button.langs-list__item(@click="$change('en')" v-if="lang.toLowerCase() != 'en'") EN
					button.langs-list__item(@click="$change('ua')" v-if="lang.toLowerCase() != 'ua'") UA
				.aside__list
					//- template
					//- 	router-link.aside__item(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'new-in/'" :title="$lang.header.nav.newin" @click.native="closeMenu($event)") {{ $lang.header.nav.newin }}
					template(v-for="category in orderedCategories")
						span(v-if="category.seo_url == 'new-in'")
							router-link.aside__item.s(v-bind:title="category.name", :to="'/'+ (lang === langDefault ? '' : lang + '/')+formatUrl(category.seo_url)+'/'" @click.native="function() {getCategory(category.category_id);closeMenu($event);}") {{ category.name }}
					template
						router-link.aside__item(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'brands/'" :title="$lang.header.nav.brands" @click.native="closeMenu($event)") {{ $lang.header.nav.brands }}
					template(v-for="category in orderedCategories")
						span(v-if="category.seo_url != 'popular' && category.seo_url != 'new-in'")
							router-link.aside__item.s(v-bind:title="category.name", :to="'/'+ (lang === langDefault ? '' : lang + '/')+formatUrl(category.seo_url)+'/'" @click.native="function() {getCategory(category.category_id);closeMenu($event);}") {{ category.name }}
					//- template
					//- 	router-link.nav__item(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'sale/'" :title="$lang.header.nav.sale" @click.native="closeMenu($event)") {{ $lang.header.nav.sale }}
				.aside__footer
					router-link.aside__item.aside__item_bold(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'info/support-center'") {{ $lang.header.menu.help }}
					router-link.aside__item.aside__item_bold(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'info/about-us'") {{ $lang.header.menu.about }}
					router-link.aside__item.aside__item_bold(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'stores'") {{ $lang.header.menu.store }}
					//-a.aside__icon(href="#")
						img(:src="iconApp1", width="9px")
					//-a.aside__icon(href="#")
						img(:src="iconApp2", width="11px")
		.menu-box(:class="[menuBox && !scrolled && menuBoxChange != 0 ? 'menu-box_opened' : '']")
			.menu-box__box
				.menu-box__content(v-if="menuBoxChange == 'brands'")
					.menu-box__col
						.menu-box__subtitle {{ $lang.header.menu.featured_brands }}
						template(v-for="brand in brands", v-if="brand.sort_order < 10 && brand.sort_order > 0")
							router-link.menu-box__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'brand/'+brand.manufacturer_id",) {{ brand.name }}
					.menu-box__col
						.menu-box__subtitle {{ $lang.header.menu.az_brands }}
						template(v-for="brand in brands", v-if="brand.sort_order < 1")
							router-link.menu-box__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'brand/'+brand.manufacturer_id",) {{ brand.name }}
				
				.menu-box__content(v-if="menuBoxChange == 'new-in'")
					.menu-box__col
						.menu-box__subtitle {{ $lang.header.menu.categories }}
						template(v-for="(category, key) in categories")
							router-link.menu-box__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'new-in/'+category.seo_url" v-if="category.seo_url != 'sale' && category.seo_url != 'new-in' && category.seo_url != 'popular'") {{ category.name }}
					.menu-box__cards
						router-link.card-category(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'new-in/candles-and-home-fragrance/'")
							div.card-category__image(v-bind:style="{backgroundImage: 'url(' + cat_new_1 + ')'}")
							div.card-category__title {{ $lang.header.menu.cat_new_1 }}
						router-link.card-category(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'new-in/tabletop/'")
							div.card-category__image(v-bind:style="{backgroundImage: 'url(' + cat_new_2 + ')'}")
							div.card-category__title {{ $lang.header.menu.cat_new_2 }}
				
				.menu-box__content(v-if="menuBoxChange == 'sale'")
					.menu-box__col
						.menu-box__subtitle {{ $lang.header.menu.categories }}
						template(v-for="(category, key) in categories")
							router-link.menu-box__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'sale/'+category.seo_url" v-if="category.seo_url != 'sale' && category.seo_url != 'new-in' && category.seo_url != 'popular'") {{ category.name }}
					.menu-box__cards
						router-link.card-category(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'sale/candles/'")
							div.card-category__image(v-bind:style="{backgroundImage: 'url(' + cat_sale_1 + ')'}")
							div.card-category__title {{ $lang.header.menu.cat_sale_1 }}
						router-link.card-category(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'sale/home-fragrance/'")
							div.card-category__image(v-bind:style="{backgroundImage: 'url(' + cat_sale_2 + ')'}")
							div.card-category__title {{ $lang.header.menu.cat_sale_2 }}
				template(v-for="category in categories")
					.menu-box__content(v-if="category.seo_url == menuBoxChange && category.seo_url != 'sale' && category.seo_url != 'new-in' && category.seo_url != 'popular'")
						.menu-box__col
							.menu-box__subtitle {{ $lang.header.menu.categories }}
							template(v-for="c in category.categories.slice(0, 10)")
								router-link.menu-box__link(:to="'/'+ (lang === langDefault ? '' : lang + '/')+formatUrl(category.seo_url)+'/'+c.seo_url+'/'") {{ c.name }}
						.menu-box__col
							.menu-box__subtitle &nbsp;
							template(v-for="c in category.categories.slice(10, category.categories.length)", v-if="category.categories.length > 10")
								router-link.menu-box__link(:to="'/'+ (lang === langDefault ? '' : lang + '/')+formatUrl(category.seo_url)+'/'+c.seo_url+'/'") {{ c.name }}
						.menu-box__cards(v-if="formatUrl(category.seo_url) === 'candles-and-home-fragrance'")
							router-link.card-category(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'candles-and-home-fragrance/candles/'")
								div.card-category__image(v-bind:style="{backgroundImage: 'url(' + cat_candles_1 + ')'}")
								div.card-category__title {{ $lang.header.menu.cat_candles_1 }}
							router-link.card-category(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'candles-and-home-fragrance/home-fragrance/'")
								div.card-category__image(v-bind:style="{backgroundImage: 'url(' + cat_candles_2 + ')'}")
								div.card-category__title {{ $lang.header.menu.cat_candles_2 }}
						.menu-box__cards(v-if="formatUrl(category.seo_url) === 'decorative-accessories'")
							router-link.card-category(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'decorative-accessories/vases/'")
								div.card-category__image(v-bind:style="{backgroundImage: 'url(' + cat_decorative_1 + ')'}")
								div.card-category__title {{ $lang.header.menu.cat_decorative_1 }}
							router-link.card-category(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'decorative-accessories/frames/'")
								div.card-category__image(v-bind:style="{backgroundImage: 'url(' + cat_decorative_2 + ')'}")
								div.card-category__title {{ $lang.header.menu.cat_decorative_2 }}
						.menu-box__cards(v-if="formatUrl(category.seo_url) === 'tabletop'")
							router-link.card-category(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'tabletop/serveware/'")
								div.card-category__image(v-bind:style="{backgroundImage: 'url(' + cat_tabletop_1 + ')'}")
								div.card-category__title {{ $lang.header.menu.cat_tabletop_1 }}
							router-link.card-category(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'tabletop/glassware/'")
								div.card-category__image(v-bind:style="{backgroundImage: 'url(' + cat_tabletop_2 + ')'}")
								div.card-category__title {{ $lang.header.menu.cat_tabletop_2 }}
						.menu-box__cards(v-if="formatUrl(category.seo_url) === 'home-textiles'")
							router-link.card-category(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'home-textiles/decorative-pillows/'")
								div.card-category__image(v-bind:style="{backgroundImage: 'url(' + cat_textiles_1 + ')'}")
								div.card-category__title {{ $lang.header.menu.cat_textiles_1 }}
							router-link.card-category(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'home-textiles/bed-linen/'")
								div.card-category__image(v-bind:style="{backgroundImage: 'url(' + cat_textiles_2 + ')'}")
								div.card-category__title {{ $lang.header.menu.cat_textiles_2 }}
						.menu-box__cards(v-if="formatUrl(category.seo_url) === 'artwork'")
							router-link.card-category(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'artwork/city-architecture/'")
								div.card-category__image(v-bind:style="{backgroundImage: 'url(' + cat_art_1 + ')'}")
								div.card-category__title {{ $lang.header.menu.cat_art_1 }}
							router-link.card-category(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'artwork/themed-sollection/'")
								div.card-category__image(v-bind:style="{backgroundImage: 'url(' + cat_art_2 + ')'}")
								div.card-category__title {{ $lang.header.menu.cat_art_2 }}
		.search-box(v-if="searchBox && search", ref="searchBox")
			.search-box__box
				.search-box__wrapper(v-if="searchCheck")
					.results-text
						router-link.results-text__item(v-for="b in brands", :to="'/'+ (lang === langDefault ? '' : lang + '/') + 'brand/'+b.manufacturer_id",:key="b.manufacturer_id", v-if="checkSearch(b.name, searchquery)", v-html="searchContentFilter(b.name)")
					.results-list(v-if="productsCount > 0")
						.results-list__label {{ $lang.header.search.goods_with_this_word }}
							router-link(v-for="info in products", :to="getUrl(info.seo_url)", :key="'search'+info.id")
								.card
									.card__image
										.card__bg(:style="{backgroundImage:'url('+info.image+')'}")
									.card__content
										.card__row
											.card__part.card__part_left
												.card__title {{ info.manufacturer }}
												.card__text {{ info.name }}
												.card__details {{ info.price }} ГРН
					.search-box__show-all
						router-link.search-box__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'search/?q='+searchquery", v-if="productsCount > 0") {{ $lang.header.search.all_results }}

		.menu-out(v-if="menuBox", @mouseover="menuBoxOut")
		.button(v-if="!search", :class="[menu ? 'button_opened' : '']", @click="toggleMenu()")
			.button__lines
				div
			.button__label {{ menu ? $lang.header.menu.close : $lang.header.menu.open }}

</template>

<script>
	import Vue from 'vue';
	import Lang from '../../../components/lang.vue';
	import $api from '../../../components/api.js';
	import $store from '../../../components/store';
	import iconApp1 from '@/assets/img/icon-app-1.png';
	import iconApp2 from '@/assets/img/icon-app-2.png';
	import cartItem from '../../../assets/uploads/cart_card.png';

	import cat_new_1 from '../../../assets/img/cat_new_1.jpg';
	import cat_new_2 from '../../../assets/img/cat_new_2.jpg';
	import cat_sale_1 from '../../../assets/img/cat_sale_1.jpg';
	import cat_sale_2 from '../../../assets/img/cat_sale_2.jpg';
	import cat_candles_1 from '../../../assets/img/cat_candles_1.jpg';
	import cat_candles_2 from '../../../assets/img/cat_candles_2.jpg';
	import cat_decorative_1 from '../../../assets/img/cat_decorative_1.jpg';
	import cat_decorative_2 from '../../../assets/img/cat_decorative_2.jpg';
	import cat_tabletop_1 from '../../../assets/img/cat_tabletop_1.jpg';
	import cat_tabletop_2 from '../../../assets/img/cat_tabletop_2.jpg';
	import cat_textiles_1 from '../../../assets/img/cat_textiles_1.jpg';
	import cat_textiles_2 from '../../../assets/img/cat_textiles_2.jpg';
	import cat_art_1 from '../../../assets/img/cat_art_1.jpg';
	import cat_art_2 from '../../../assets/img/cat_art_2.jpg';

	import headerPreloader from '../header-preloader/header-preloader.vue';

	var cacheX, cacheY, x, y;

	export default {
		name: 'block-header',
		data: function(){
			return {
				homeUrl:'/',
				iconApp1,
				iconApp2,
				menu:false,
				menuBox:false,
				menuBoxChange:'',
				searchBox:false,
				scrolled:false,
				search:false,
				searchCheck:false,
				searchquery:'',
				mousemove:false,
				windowWidth: 0,
				langDefault: window.config.langDefault,
				cartItem,
				cat_new_1: cat_new_1,
				cat_new_2: cat_new_2,
				cat_candles_1: cat_candles_1,
				cat_candles_2: cat_candles_2,
				cat_sale_1: cat_sale_1,
				cat_sale_2: cat_sale_2,
				cat_decorative_1: cat_decorative_1,
				cat_decorative_2: cat_decorative_2,
				cat_tabletop_1: cat_tabletop_1,
				cat_tabletop_2: cat_tabletop_2,
				cat_textiles_1: cat_textiles_1,
				cat_textiles_2: cat_textiles_2,
				cat_art_1: cat_art_1,
				cat_art_2: cat_art_2,
				loginModalTitle: {
					ua: '',
					en: '',
					ru: ''
				},
				loginModalSubtitle: {
					ua: '',
					en: '',
					ru: ''
				}
			}
		},
		props: {
			
		},
		components: {
			'header-preloader': headerPreloader,
		},
		computed: {
			categories() {
				var data = $store.state.categories.data;
				return data == undefined ? [] : Object.values(data);
			},
			isRegistered(){
				return $store.state.registration_was_succesesful_open;
			},
			orderedCategories: function () {
				let arr = this.categories.sort(function(a, b) {
					return a.sort - b.sort;
				});
				return arr;
			},
			categoriesCount() {
				return Object.keys($store.state.categories.data).length || 0;
			},
			logged() {
				return $store.state.account.logged				
			},
			account() {
				var data = $store.state.account.info;
				return data == undefined ? {} : data;
			},
			brands() {
				var data = $store.state.brands.data;
				return data == undefined ? {} : data;
			},
			products() {
				var data = $store.state.search.data;
				return data == undefined ? {} : data;
			},
			productsCount() {
				var data = $store.state.search.count;
				return data == undefined ? 0 : data;
			},
			cartCount() {
				var data = $store.state.cart.data.total_product_count;
				return data == undefined ? 0 : data;				
			}
		},
		methods:{
			login() {
				let $this = this;

				$store.commit('setLoginModalTitle', $this.loginModalTitle[$store.state.lang.code]);
				$store.commit('setLoginModalSubtitle', $this.loginModalSubtitle[$store.state.lang.code]);
				$store.commit('setLoginModalActive', true);
				$api.getSocialLinks();
			},
			closeThankYou() {
				$store.commit("setRegistrationStatus", false)
			},
			formatUrl(seo_url) {
				return seo_url.replace($store.getters['getLangCode'].code+'-', '');
			},
			toggleMobileControl(event) {
				if(event.currentTarget.classList.contains('control-mobile_active')) {
					event.currentTarget.classList.remove('control-mobile_active');
				} else {
					event.currentTarget.classList.add('control-mobile_active');
				}
			},
			checkSearch(name, query){
				name = name.toLowerCase();
				query = query.toLowerCase();
				return (~name.indexOf(query)) ? true : false; 
			},
			searchContentFilter(b) {
				/*let r = b.replace(new RegExp(this.searchquery, "i"), '<b>'+this.searchquery+'</b>')
				r = r.toLowerCase();
				r = r.charAt(0).toUpperCase() + r.slice(1);*/
				return b;
			},
			logout(){
				$api.logout();
				if (this.$route.name === 'Account') this.$router.push({name: "Main"});
			},
			getWindow() {
				return window;
			},
			getUrl(id) {
				return '/'+ ($store.getters['getLangCode'].code === this.langDefault ? '' : $store.getters['getLangCode'].code + "/")+this.$route.params.category+"/"+this.$route.params.subcategory+"/"+id;
			},
			getCategory(id){
				this.menuBoxOut();
			},
			toggleMenu() {
				this.menu = !this.menu;
			},
			closeMenu(e) {
				this.menu = false;
				let c = this.$refs.signControlMobile;
				if (c) {
					c.classList.remove('control-mobile_active');
				}
			},
			smartToggleMenu() {
				var t = event.target;

				if( t.className == "menu menu_opened" || t.className == "button button_opened" || t.className == "aside__item" || t.className == "aside__item aside__item_bold" || t.className == "aside__icon") {
					this.toggleMenu();
				}
			},
			menuBoxOver(cat) {
				this.mousemove ? this.menuBoxChange = cat : false;
			},
			menuBoxOut() {
				this.menuBox = false;
				this.menuBoxChange = 0;
				this.mousemove = false;
				var cacheX, cacheY, x, y;
			},
			menuParentBoxOut() {
				!this.menuBox ? this.menuBoxChange = 0 : false;
			},
			closeSearch(){
				this.searchBox = false;
				this.search = false;
			},
			documentClick(e){
				let target = e.target;

				if(this.searchBox) {
					let searchBox = this.$refs.searchBox;
					let search = this.$refs.search;

					try {
						if((searchBox !== target && search !== target) && !searchBox.contains(target) && !search.contains(target)) {
							this.searchBox = false;
						}
					} catch(e) {

					}
				}

				let sign = this.$refs.signDropdown;
				try {
					if((sign !== target && this.$refs.signControlMobile !== target) && !sign.contains(target) && !this.$refs.signControlMobile.contains(target)) {
						this.$refs.signControlMobile.classList.remove('control-mobile_active');
					}
				} catch(e) {

				}

				
			},
			addFocus() {
				var $this = this;
				setTimeout(function() {
					var input = document.querySelector('.search__input');
					$this.searchBox = true;
					input.focus();
				},50)
			},
			resizeHandler() {
				this.windowWidth = window.innerWidth;
			}
		},
		created () {
			document.addEventListener('click', this.documentClick);

			let th = this;

			document.addEventListener('mousemove', function(e) { 
				x = e.clientX; 
				y = e.clientY;
				th.mousemove = true;
			});

			setInterval(function(){
				if(th.menuBoxChange != 0) {
					(x != cacheX) ? cacheX = x : th.menuBox = true;
					(y != cacheY) ? cacheY = y : th.menuBox = true;
				}
			}, 400);
		},
		mounted() {

			let th = this;

			this.resizeHandler();

			window.addEventListener('resize', th.resizeHandler, false);

			$api.getToken();
			$api.getCategories();
			$api.account.info();
			$api.brands();
			$api.cart.get();
			$api.checkout.shippingadress(function(data){});
			
			let lastScrollTop = 0;

			window.onscroll = function(e) {
				let s = window.pageYOffset || document.documentElement.scrollTop;

				if(s > lastScrollTop) {
					(lastScrollTop > 100) ? th.scrolled = true : th.scrolled = false;
					lastScrollTop = s;
				} else { 
					if((lastScrollTop - s) > 50) {
						th.scrolled = false;
						lastScrollTop = s;
					}
				}
			};

			this.menuBoxOut();

			window.error_title = this.$lang.notifications.error;

			if (!Object.size($store.state.wishlist.data)) {
				$api.wishlist.get();
			}

			let touchstartX = 0;
			let touchstartY = 0;
			let touchendX = 0;
			let touchendY = 0;

			document.addEventListener('touchstart', function(event) {
				touchstartX = event.changedTouches[0].screenX;
				touchstartY = event.changedTouches[0].screenY;
			}, false);

			document.addEventListener('touchend', function(event) {
				touchendX = event.changedTouches[0].screenX;
				touchendY = event.changedTouches[0].screenY;
				if (touchendX < touchstartX) {
					th.closeMenu(event);
				}
			}, false); 

			// Vue.notify({
			// 	group: 'notify',
			// 	type: 'success',
			// 	title: 'Konstantin Konstantinopolsky',
			// 	text: 'You are logged in account',
			// 	duration: 100000
			// });

			// Vue.notify({
			// 	group: 'notify',
			// 	type: 'error',
			// 	title: 'Important message',
			// 	text: 'Hello user! This is a notification! Hello user! This is a notification! Hello user! This is a notification! Hello user! This is a notification!',
			// 	duration: 100000
			// });

			// Vue.notify({
			// 	group: 'notify',
			// 	type: 'cart',
			// 	title: 'Martini Bear Throw Pillow',
			// 	text: '<div style="background-image:url(http://service.studio-pro-villa.de-v.pw/storage/import_files/00000004171/Picture17.jpeg);"></div>Added to the bag',
			// 	duration: 100000
			// });

		},
		beforeDestroy() {

		},
		mixins: [Lang],
		watch: {
			'$route' () {
				this.menuBoxOut();
				this.searchBox = false;
				$store.commit('setLoginModalActive', false);
			},
			searchquery(val) {
				this.searchCheck = val != "" ? true : false;
				val ? $api.searchProducts(val, 3, true) : false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/mixins.scss';
	@import '@/helpers/sass/kit.scss';

	.hide {
		display: none;
	}

	.success_registration {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		z-index: 100;
		display: flex;
		justify-content: center;
		align-items: center;

		&_wrapper {
			position: relative;
			width: 40%;
			height: 50%;
			background-color: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
		}

		h2 {
			color: #000000;
		}

		.close {
			display: block;
			height: 42px;
			width: 200px;
			background: #0f0f0f;
			color: #fff;
			color: #fff;
			font-family: 'Museo';
			text-transform: uppercase;
			font-weight: 700;
			line-height: 16px;
			font-size: 11px;
			letter-spacing: 0.05em;
			text-transform: none;
			transition: opacity .5s ease;
			margin-bottom: 20px;
			margin-top: 36px;
			margin-bottom: 18px;
		}
		.close_thank_you {
			position: absolute;
			right: 24px;
			top: 24px;
		}
		button:hover {
			opacity: 0.5;
			transition: opacity .5s ease;
		}

	}

	.badge {
		width: 14px;
		height: 14px;
		padding-top: 2px;
		background: #fff;
		border-radius: 50%;
		text-align: center;
		font-family: 'Museo';
		line-height: normal;
		font-size: 8px;
		letter-spacing: 0.08em;
		color: #0f0f0f;
		text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		position: absolute;
		top: -4px;
		right: -4px;
	}

	.results-text {
		text-align: left;
		padding-bottom: 40px;
		text-transform: capitalize;
		/deep/ b {
			@include kit('h5 11 bold', 'white');
			font-weight: 700;
			text-transform: inherit;
			color: #fff;
		}
		&__item {
			@include kit('h5', 'white');
			text-transform: inherit;
			color:#fff;
			display: block;
			opacity: 0.7;
			transition: opacity .4s ease;

			&:hover {
				opacity: 1;
			}
		}
	}

	.results-list {
		text-align: left;
		padding-bottom: 39px;

		&__label {
			@include kit('h5 11 bold', 'white');
		}
	}

	.card {
		position: relative;
		padding: 16px 0;
		font-size: 0;
		text-align: left;

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
			margin-right: 12px;
			width: 64px;
			height: 73px;
			display: inline-block;
			vertical-align: middle;
		}

		&__bg {
			position: absolute;
			top: calc(50% - 48px / 2);
			left: calc(50% - 48px / 2);
			width: 48px;
			height: 49px;
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
				padding-bottom: 4px;
			}
		}

		&__title {
			font: 700 11px/16px 'Museo', Arial, Helvetica, sans-serif;
			color: #fff;
			display: block;
			letter-spacing: .6px;
			margin-bottom: 4px;
		}

		&__text {
			display: block;
			margin-top: 3px;
			font: 300 12px/14px 'Museo', Arial, Helvetica, sans-serif;
			color: rgba(255, 255, 255, 0.8);
			text-transform: none;
				margin-bottom: 13px;
		}

		&__details {
			@include kit('h6 300', 'white');
			text-transform: none;
			letter-spacing: .4px;
			margin-top: 10px;
		}
	}

	.search {
		background: #0f0f0f;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		height: 33px;

		&__input {
			height: 24px;
			width: 100%;
			max-width: 500px;
			@include kit('h4 12px light', 'white');
			font-weight: 300;
			color: #B7B7B7;
			text-transform: uppercase;
			border-bottom:1px solid rgba(#FFFFFF, 0.18);
			background: transparent;
		}
		&__icon-search {
			margin-left: 8px;
		}
		&__close {
			width: 24px;
			height: 24px;
			background:url(../../../assets/img/icon-normal-close.svg) no-repeat;
			background-size: 13px auto;
			background-position: center;
			position: absolute;
			right: 0;
		}
	}

	.search-box {
		width: 100%;
		height: auto;
		z-index: 102;
		padding-left: 8px;	
		padding-right: 8px;	
		position: fixed;
		top: 80px;
		left: 0;
		opacity: 1;
		text-align: center;

		&_opened {
			opacity: 1;
			pointer-events: all;
		}

		&__link {
			@include ui('link', 'white');
			margin: auto;
			display: inline-block;
		}

		&__show-all {
			width: 100%;
			left: 0;
			bottom: 56px;
			position: absolute;
			text-align: center;
		}

		&__box {
			width: 100%;
			min-height: 434px;
			background: #0f0f0f;
			// padding-top: 40px;
			padding-top: 51px;
			padding-left: 40px;
			padding-right: 40px;
			padding-bottom: 56px;
			border-top:1px solid rgba(#FFFFFF, 0.1);
		}
		&__wrapper {
			max-width: 500px;
			margin: auto;
		}
	}
	
	.header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 102;
		padding: 8px;		
		font-family: 'Museo';

		&__box {
			width: 100%;
			// height: 128px;
		}

		&__menu-line {
			background: #0f0f0f;
			padding: 20px 40px 19px 40px;
			color:#fff;
			transition: all 0.6s ease;
			opacity: 1;
			pointer-events: all;

			&_scrolled {
				opacity: 0;
				pointer-events: none;
			}

			&_nav {
				border-top:1px solid rgba(255, 255, 255, 0.08);
				padding: 20px 40px 19px 40px;
				min-height: 58px;
				border-bottom:none;
				position: relative;
			}
		}
	}

	.wrapper {
		max-width: 1170px;
		margin: auto;
	}

	.nav {
		display: flex;
		justify-content:space-between;
		vertical-align: top;

		&__item {
			@include kit('h6 300', 'white');
			letter-spacing: 0.05em;
			display: inline-block;
			vertical-align: top;
			opacity: 1;
			text-align: center;
			position: relative;
			color: rgba(255, 255, 255, 1.0);
			transition: all 0.3s linear;

			&::after {
				@include kit('h6 500', 'white');
				letter-spacing: 0.05em;
				display: block;
				content: attr(title);
				overflow: hidden;
				position: absolute;
				left: 0;
				top: 0;
				opacity: 0;
				transition: all 0.3s linear;
			}
			&::before {
				@include kit('h6 500', 'white');
				letter-spacing: 0.05em;
				display: block;
				content: attr(title);
				height: 0;
				overflow: hidden;
				visibility: hidden;
			}
			&:hover {
				&::after {
					opacity: 1;
				}
			}

			&_hover {
				&:after {
					opacity: 1;
				}
			}
		}
	}

	.logo {
		width: 100px;
		display: inline-block;

		&:hover {
			opacity: .7;
		}
	}

	.top-menu {
		text-align: center;
		color: #CDCDCD;
		line-height: normal;
		font-size: 10px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.button {
		@include kit('p2', 'white');
		position: fixed;
		left: 48px;
		top: 31px;
		
		cursor: pointer;
		z-index: 112;
		text-transform: uppercase;
		cursor: pointer;
		transition: all 0.3s linear;
		z-index: 130;

		&__lines  {
			display: inline-block;
			width: 22px;
			height: 13px;
			position: relative;
			vertical-align: middle;
			margin-right: 16px;
			transition: all 0.3s linear;
			opacity: 0.75;

			&::before {
				content: "";
				display: block;
				width: 18px;
				height: 1px;
				background: #fff;
				position: absolute;
				left: 2px;
				top:0;
				transition: all 0.3s ease;
				transform: translateX(0%);
			}
			div {
				display: block;
				width: 18px;
				height: 1px;
				position: absolute;
				left: 2px;
				top:6px;
				&::before {
					content: "";
					display: block;
					width: 100%;
					height: 1px;
					background: #fff;
					position: absolute;
					left: 0;
					bottom:0px;
					opacity: 1;
					transition: all 0.6s ease;
				}
				&::after {
					content: "";
					display: block;
					width: 18px;
					height: 1px;
					background: #fff;
					position: absolute;
					left: 0px;
					bottom:0px;
					opacity: 0;
					transition: all 0.6s ease;
				}
			}
			&::after {
				content: "";
				display: block;
				width: 18px;
				height: 1px;
				background: #fff;
				position: absolute;
				right: 2px;
				bottom:0px;
				transition: all 0.3s ease;
				transform: translateX(0%);
			}
		}
		&__label  {
			display: inline-block;
			vertical-align: middle;
			top:0 !important;
			transition: all 0.3s linear;
			@include kit('p2', 'white');
			color:#fff !important;
			opacity: 0.75;
		}

		&_opened {
			.button {
				&__lines  {
					&::before {
						opacity: 0;
					}
					div {
						&::before {
							transform: rotate(-45deg);
							transform-origin: center;
						}
						&::after {
							transform: rotate(45deg);
							transform-origin: center;
							opacity: 1;
						}
					}
					&::after {
						opacity: 0;
					}
				}
			}
		}

		&:hover {
			* {
				color: #fff !important;
				opacity: 1 !important;	
			}

			.button {
				&__lines {
					opacity: 1;
				}
			}
		}
	}

	.controls {
		height: 24px;
		position: absolute;
		right: 48px;
		top: 24px;

		&::before {
			content: "";
			display: inline-block;
			width: 0;
			height: 100%;
		}

		&__label {
			display: inline-block;
			// margin-top: -1px;
		}

		&__item {
			display: inline-block;
			vertical-align: middle;
			cursor: pointer;
			position: relative;
			padding-top: 1px;
			padding-bottom: 2px;
			height: 29px;
			
			&::before {
				content: "";
				display: block;
				width: 1px;
				height: 16px;
				background: rgba(2555, 255, 255, 0.1);
				position: absolute;
				right: 0;
				top: 7px;
			}

			&_search {
				padding-right: 16px;

				&:hover {
					.icon-search {
						opacity: 1;
					}
				}
			}

			.label {
				color: #fff;
				opacity: .75;
				transition: opacity .4s ease;
				&:hover {
					opacity: 1;
				}
			}

			&_loc {
				padding-right: 16px;
				padding-left: 16px;
				padding-top: 3px;
				color: #fff;
				opacity: .75;
				z-index: 102;
				&::after {
					content: "";
					display: inline-block;
					width: 0px;
					height: 24px;
					vertical-align: middle;
				}

				&:hover {
					opacity: 1;
					.lang-dropdown {
						opacity: 1;
						pointer-events: all;
						visibility: visible;
						transform: translate3d(0, 0, 1px);
					}
				}
			}
			&_login {
				padding-right: 9px;
				padding-left: 18px;
				z-index: 102;
				position: relative;
				transform: translate3d(0,0,1px);

				@media screen and (min-width: 1201px) {
					&:hover {
						.sign-dropdown {
							opacity: 1;
							pointer-events: all;
							visibility: visible;
							transform: translate3d(0, 0, 1px);
						}
					}
				}

			}
			&_cart {
				padding-left: 7px;
				margin-left: 10px;
				padding-top: 1px;

				&::before {
					display: none;
				}

				&:hover {
					.label {
						opacity: 1;
					}
				}
			}
		}
	}
	.label {
		display: inline-block;
		vertical-align: middle;
		margin-right: 10px;
		position: relative;
		top: 2px;
		letter-spacing: 0px;
		color: #CDCDCD;
		text-transform: uppercase;
	}
	.icon-search {
		width: 24px;
		height: 24px;
		background:url(../../../assets/img/icon-search-wht.png) no-repeat;
		background-size: auto 13px;
		background-position: center;
		box-sizing: border-box;
		opacity: .75;
		transition: opacity .4s ease;
	}
	.icon-profile {
		width: 24px;
		height: 24px;
		background:url(../../../assets/img/icon-profile.png) no-repeat;
		background-size: auto 24px;
		background-position: center;
		box-sizing: border-box;
		display: inline-block;
		vertical-align: middle;
	}
	.icon-cart {
		width: 24px;
		height: 24px;
		background:url(../../../assets/img/icon-cart.png) no-repeat;
		background-size: auto 24px;
		background-position: center;
		box-sizing: border-box;
		display: inline-block;
		vertical-align: middle;
	}

	@media screen and (max-width: 600px) {
		.icon-profile {
			background:url(../../../assets/img/icon-profile-mobile.png) no-repeat;
			background-size: auto 24px;
			background-position: center;			
		}
		.icon-cart {
			background:url(../../../assets/img/icon-cart-mobile.png) no-repeat;
			background-size: auto 24px;
			background-position: center;
		}
	}

	.aside {
		position: absolute;
		width: 320px;
		height: 100%;
		left: 0px;
		top: 0px;
		background: #0f0f0f;
		z-index: 101;
		padding-top: 97px;
		overflow-y: auto;
		transform: translateX(-100%);
		transition: all 0.6s ease;
		-webkit-overflow-scrolling: touch;

		&__langs-list {
			padding-left: 48px;
		}

		&__list {
			padding-top: 20px;
			padding-bottom: 20px;
			padding-left: 48px;
			box-sizing: border-box;
			min-height: calc(100% - 158px);
		}

		&__icon {
			display: inline-block;
			margin-right: 24px;
			transition: opacity .5s ease;
			margin-top: 5px;

			&:hover {
				opacity: .6;
			}
		}

		&__item {
			font-family: 'Museo';
			font-weight: 300;
			line-height: 17px;
			font-size: 11px;
			letter-spacing: 0.04em;
			color: #FFFFFF;
			margin-bottom: 19px;
			width: 100%;
			display: block;
			transition: opacity .5s ease;
			text-transform: uppercase;

			&:hover {
				opacity: .6;
			}

			&_bold {
				font-weight: 700;
			}
		}
		
		&__footer {
			width: 100%;
			height: auto;
			background: #000000;
			box-sizing: border-box;
			padding-top: 22px;
			padding-bottom: 1px;
			padding-left: 48px;
			box-sizing: border-box;
			position: relative;

			// &:before {
			// 	content: "";
			// 	display: block;
			// 	position: absolute;
			// 	width: 100%;
			// 	height: 95vh;
			// 	left: 0;
			// 	top: 0;
			// 	z-index: -1;
			// 	background: #000000;
			// }

			.aside__item {
				margin-bottom: 15px;
			}
		}
	}

	.langs-list {
		padding-bottom: 19px;
		border-bottom: 1px solid #1F1F1F;

		&__item {
			font-family: 'Museo';
			font-weight: 700;
			line-height: 16px;
			font-size: 11px;
			letter-spacing: 0.05em;
			text-transform: uppercase;
			color: #FFFFFF;
			margin-right: 16px;
			transition: opacity .5s ease;

			&:hover {
				opacity: .6;
			}
		}
	}

	.menu {
		position: fixed;
		left:0;
		top:0;
		z-index: 110;
		width: 100%;
		height: 100%;
		// background-color: rgba(13, 13, 13, 0.0);
		box-sizing: border-box;
		// transition: background-color 0.6s ease;
		pointer-events: none;

		&:after {
			content: "";
			display: block;
			position: absolute;
			z-index: 0;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(13, 13, 13, 0.72);
			opacity: 0;
			transition: opacity .5s ease;
		}

		&_opened {
			// background-color: rgba(13, 13, 13, 0.72);
			pointer-events: all;

			&:after {
				opacity: 1;
			}

			.aside {
				transform: translateX(0%);
			}
		}
	}

	.menu-box {
		width: 100%;
		z-index: 100;
		padding-left: 8px;	
		padding-right: 8px;	
		position: fixed;
		top: 136px;
		left: 0;
		opacity: 0;
		pointer-events: none;

		&_opened {
			opacity: 1;
			pointer-events: all;
		}

		&__subtitle {
			@include kit('h5 11 bold', 'white');
			margin-bottom: 23px;
		}

		&__link {
			@include kit('h4', 'white');
			text-transform: none;
			display: block;
			margin-bottom: 14px;
			color: #D6D6D6;
			transition: opacity .5s ease;

			&:hover {
				opacity: .6;
			}
		}

		&__box {
			width: 100%;
			min-height: 434px;
			background: #0f0f0f;
			padding-top: 40px;
			padding-left: 40px;
			padding-right: 40px;
		}

		&__content {
			width: 100%;
			max-width: 1182px;
			margin: auto;
			position: relative;
		}

		&__col {
			width: 19.75%;
			display: inline-block;
			vertical-align: top;
		}

		&__cards {
			position: absolute;
			top:0px;
			right:0;
			width: 47.93%;
			height: 340px;
		}
	}

	.menu-out {
		width: 100%;
		height: calc(100% - (128px + 434px));
		position: fixed;
		bottom: 0px;
		left: 0px;
		z-index: 300;
	}

	.card-category {
		display: inline-block;
		text-align: left;
		margin-left: 24px;
		width: calc(50% - 12px);
		transition: opacity .5s ease;

		&:hover {
			opacity: .7;
		}

		&:first-child {
			margin-left: 0;
		}

		&__image {
			width: 100%;
			@include proportional(267, 308);
			// background: #eee;
			margin-bottom: 15px;
			background-repeat: no-repeat;
			background-size: cover;
			background-position: center center;
		}

		&__title {
			@include kit('h5 11 bold', 'white');
			text-transform: none;
		}
	}

	.lang-dropdown,
	.sign-dropdown {
		position: absolute;
		top: 100%;
		left: calc(50% - 27px);
		width: 54px;
		opacity: 0;
		visibility: hidden;
		pointer-events: none;
		padding-top: 10px;
		transition: opacity .5s ease, transform .5s ease, visibility .5s ease;
		transform: translate3d(0, -10px, 1px);
		z-index: 2;
		box-shadow: 0px 2px 50px rgba(0, 0, 0, 0.07);

		&__container {
			background-color: #fff;
			border-radius: 2px;
			padding: 4px 0;
			cursor: default;
			position: relative;

			&:before {
				content: "";
				display: block;
				width: 0;
				height: 0;
				border-style: solid;
				border-width: 0 5px 5px 5px;
				border-color: transparent transparent #ffffff transparent;
				position: absolute;
				left: calc(50% - 5px);
				top: -5px;
			}
		}

		&__item {
			display: block;
			font-size: 10px;
			line-height: 20px;
			margin: 12px 0;
			text-align: center;
			color: #0f0f0f;
			font-family: 'Museo';
			cursor: pointer;
			transition: opacity .5s ease;
			text-transform: uppercase;

			&:hover {
				opacity: .7;
			}
		}
	}

	.sign-dropdown {
		width: 140px;
		left: calc(50% - 70px);

		&__user {
			display: none;
		}
	}

	.control-mobile {
		&_active {
			& + .sign-dropdown,
			& + .lang-dropdown {
				opacity: 1;
				pointer-events: all;
				visibility: visible;
				transform: translate3d(0, 0, 1px);
			}
		}
	}

	@media screen and (max-width: 1200px) {

		.logo {
			width: 78px;
    		margin-bottom: 2px;

			img {
				width: 100%;
			}
		}

		.header {
			z-index: 121;

			&__menu-line {
				padding-top: 14px;
				padding-bottom: 11px;

				&_nav {
					display: none;
				}
			}

			&__box {
				height: auto;
			}
		}

		.button {
			left: 27px;
			top: 21px;

			&__lines {
				width: 22px;
			}

			&__label {
				display: none;
			}
		}

		.controls {
			right: 21px;
			top: 14px;

			&__item {
				&_cart {
					margin-left: 3px;
					left: 1px;
				}

				&_login {
					padding-right: 11px;
				}

				&_loc {
					display: none;
				}

				&_search {
					// display: none;
					position: fixed;
					top: 19px;
					left: 77px;

					&:before {
						left: -10px;
						pointer-events: none;
					}
				}
			}
		}

		.label {
			display: none;
		}

		.search {
			margin-top: -7px;

			&__close {
				left: -26px;
			}
		}

		.search-box {
			top: 59px;
			
			&__box {
				min-height: 654px;
				padding-top: 35px;
			}

			&__wrapper {
				max-width: 532px;
			}
		}

		.results-text {
			padding-bottom: 31px;

			&__item {
				line-height: 26px;
				font-size: 11px;
			}
		}

		.card {
			padding-top: 19px;
			padding-bottom: 5px;
		}

		.sign-dropdown {
			width: 124px;
			left: calc(50% - 59px);
			top: 23px;
			text-align: left;
			
			&__container {
				padding: 12px 10px 6px;
			}

			&__user {
				display: block;
				text-transform: none;
				padding: 0 4px;
				font-weight: 700;
				color: rgba(23, 23, 23, 0.8);
				font-size: 11px;
				letter-spacing: .05em;
				border-bottom: 1px solid #E4E4E4;
				padding-bottom: 8px;
				line-height: 14px;
				margin-bottom: 6px;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}

			&__item {
				text-align: left;
				text-transform: none;
				padding: 0 4px;
				margin: 3px 0;
			}
		}
	}

	@media screen and (max-width: 960px) {
		.button {
			left: 25px;
			top: 19px;
		}

		.header {
			padding: 6px;
		}

		.controls {
			top: 12px;
			right: 19px;

			&__item {
				&_search {
					top: 17px;
					left: 75px;
				}
			}
		}

		.search {

			&__input {
				max-width: 312px;
			}
		}

		.search-box {
			top: 57px;

			&__wrapper {
				max-width: 346px;
			}

			&__box {
				padding-top: 34px;
			}

			&__show-all {
				bottom: 58px;
			}
		}

		.card {
			padding-top: 19px;
			padding-bottom: 5px;

			&__content {
				width: calc(100% - 115px);
			}
		}

		.sign-dropdown {
			top: 25px;
		}
	}

	@media screen and (max-width: 650px) {
		.header {
			padding: 4px;
			z-index: 121;
			padding-left: 0;
			padding-right: 0;
			top: -4px;
			padding-bottom: 0;

			&__menu-line {
				padding-top: 14px;
    			padding-bottom: 8px;
			}
		}

		.button {
			left: 21px;
			top: 9px;
		}

		.controls {
			top: 6px;
			right: 17px;

			&__item {
				&_search {
					top: 8px;
    				left: 65px;

					&::before {
						display: none;
					}
				}

				&:before {
					display: none;
				}

				&_login {
					padding-right: 8px;
					bottom: 1px;
					left: 3px;
				}
			}
		}

		.search {
			margin-top: -5px;
			margin-right: -24px;
			padding-left: 8px;
		}

		.search-box {
			padding-right: 4px;
			padding-left: 4px;
			z-index: 101;

			&__wrapper {
				max-width: 287px;
				padding-left: 25px;
			}

			&__box {
				padding-top: 32px;
				height: calc(100vh - 60px);
				min-height: 1px;
				transform: translate3d(0,0,1px);
			}

			&__show-all {
				bottom: 50px;
			}
		}

		.sign-dropdown {
			top: 27px;
			left: calc(50% - 57px);
		}

		.logo {
			width: 59px;
		}
	}

</style>
