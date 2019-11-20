import Vue from 'vue';
import VueRouter from 'vue-router';
import * as VueGoogleMaps from 'vue2-google-maps';
import Notifications from 'vue-notification';
import VueAnalytics from 'vue-analytics';
// import VueFacebookPixel from 'vue-analytics-facebook-pixel';
import $store from './components/store';

import VueCollapse from 'vue2-collapse';
import VueParallaxJs from 'vue-parallax-js'

//Langs
// import Lang from './components/lang.vue';

//Pages
import Main from './pages/main.vue';
import Category from './pages/category.vue';
import Cart from './pages/cart.vue';
import Login from './pages/login.vue';
import Checkout from './pages/checkout.vue';
import Brands from './pages/brands.vue';
import Account from './pages/account.vue';
import Stores from './pages/stores.vue';
import Info from './pages/info.vue';
import PageNotFound from './pages/404.vue';
import SocialLogin from './pages/social.vue';
import About from './pages/about.vue';
import Portfolio from './pages/portfolio.vue';
import Retail from './pages/retail.vue';
import OneProject from './pages/oneProject';
import Interior from './pages/interior';
import SingleStore from './pages/singleStore';
import axios from 'axios';
import Meta from 'vue-meta';

// let lngs = {
//     en: $en,
//     ru: $ru,
//     ua: $ua
// };

// let normalLang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';
// let $lng = lngs[normalLang];

import routesParser from './components/routesParser.vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

import ReadMore from 'vue-read-more';

Vue.use(Meta);
Vue.use(VueRouter);
Vue.use(VueCollapse);
Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyAsfI3KJ8jUb64KcsxeyK6RhOoGZj7ljS8',
      libraries: 'places',
    }
});
Vue.use($store);
Vue.use(Notifications);
Vue.use(VueParallaxJs, option);
Vue.use(VueAwesomeSwiper, {
    loop: true
});
Vue.use(ReadMore);

const option = {
    minWidth: 1200, 
    className: '.patterns__item',  
    container: '.patterns'
};

window.config = {
    langDefault:'ua', //old en
    token: localStorage.getItem('token'),
    activeLang: localStorage.getItem('lang') != undefined ? localStorage.getItem('lang') : 'ua', //old en
    domain:"https://villa.ua/",
    // domain:"http://dev-api-villa.tftl.pw/",
    api:"https://api.villa.ua/!/Fetch",
    // api: "http://dev-api-villa.tftl.pw/!/Fetch",
    apiwp: "https://api.villa.ua/wp/wp-json/wp/v2",
    noImage:"https://api.villa.ua/image/cache/no_image-600x600.png",
    langs:{
        ru:'Рус',
        en:'Eng',
        ua:'Укр'
    }
};

console.log("window.config.langDefault");
console.log(window.config.langDefault);

const langChanged = window.location.pathname.split('/')[1];
(langChanged in window.config.langs ? localStorage.langCode = langChanged : localStorage.langCode = window.config.langDefault);

const routesList = [
    {path : '/social',  name: 'SocialLogin', component: SocialLogin },

    {path : '/en',  name: 'Main', component: Main },
    {path : "/en/404", name: 'PageNotFound', component: PageNotFound},
    {path : '/en/about/', name: 'About', component: About},
    {path : '/en/interior/', name: 'Interior', component: Interior},
    {path : '/en/interior/portfolio', name: 'Portfolio', component: Portfolio},
    {path : '/en/interior/portfolio/:slug', name: 'onePortfolio', component: OneProject},
    {path : '/en/interior/stores', name: 'retailStores', component: Retail},
    {path : '/en/interior/stores/:slug', name: 'retailStore', component: SingleStore},
    // {path : '/en/interior', name: 'Interior', component: Interior},
    // {path : '/en/single-store', name: 'SingleStore', component: SingleStore},
    {path : '/en/account', name: 'Account', component: Account },
    {path : '/en/stores', name: 'Stores', component: Stores },
    {path : '/en/search', name: 'Search', component: Category },
    {path : '/en/account/:tab', name: 'Account', component: Account },
    {path : '/en/info', name: 'Info', component: Info },
    {path : '/en/info/:page', name: 'info', component: Info },
    {path : '/en/cart/', name: 'Cart', component: Cart },
    {path : '/en/brands/', name: 'Brands', component: Brands },
    {path : '/en/brand/:id', name: 'Brand', component: Category },
    {path : '/en/brand/:id/:subcategory', name: 'Brand', component: Category },
    {path : '/en/login/', name: 'Login', component: Login },
    {path : '/en/login/:forgot', name: 'Login', component: Login },
    {path : '/en/checkout/:step', name: 'Checkout Step', component: Checkout },
    {path : '/en/:category', name: 'Category', component: Category },
    {path : '/en/:category/:subcategory', name: 'Category', component: Category },
    {path : '/en/:category/:subcategory/:deep/', name: 'Parser Deep', component: routesParser },
    {path : '/en/:category/:subcategory/:deep/:subdeep/', name: 'Parser Subdeep', component: routesParser },

    {path : '/ru',  name: 'Main', component: Main },
    {path : "/ru/404", name: 'PageNotFound', component: PageNotFound},
    {path : '/ru/about/', name: 'About', component: About},
    {path : '/ru/interior/', name: 'Interior', component: Interior},
    {path : '/ru/interior/portfolio', name: 'Portfolio', component: Portfolio},
    {path : '/ru/interior/portfolio/:slug', name: 'onePortfolio', component: OneProject},
    {path : '/ru/interior/stores', name: 'retailStores', component: Retail},
    {path : '/ru/interior/stores/:slug', name: 'retailStore', component: SingleStore},
    // {path : '/ru/interior', name: 'Interior', component: Interior},
    // {path : '/ru/single-store', name: 'SingleStore', component: SingleStore},
    {path : '/ru/account', name: 'Account', component: Account },
    {path : '/ru/stores', name: 'Stores', component: Stores },
    {path : '/ru/search', name: 'Search', component: Category },
    {path : '/ru/account/:tab', name: 'Account', component: Account },
    {path : '/ru/info', name: 'Info', component: Info },
    {path : '/ru/info/:page', name: 'info', component: Info },
    {path : '/ru/cart/', name: 'Cart', component: Cart },
    {path : '/ru/brands/', name: 'Brands', component: Brands },
    {path : '/ru/brand/:id', name: 'Brand', component: Category },
    {path : '/ru/brand/:id/:subcategory', name: 'Brand', component: Category },
    {path : '/ru/login/', name: 'Login', component: Login },
    {path : '/ru/login/:forgot', name: 'Login', component: Login },
    {path : '/ru/checkout/:step', name: 'Checkout Step', component: Checkout },
    {path : '/ru/:category', name: 'Category', component: Category },
    {path : '/ru/:category/:subcategory', name: 'Category', component: Category },
    {path : '/ru/:category/:subcategory/:deep/', name: 'Parser Deep', component: routesParser },
    {path : '/ru/:category/:subcategory/:deep/:subdeep/', name: 'Parser Subdeep', component: routesParser },

    {path : '/',  name: 'Main', component: Main},
    {path : "/404", name: 'PageNotFound', component: PageNotFound},
    {path : '/about/', name: 'About', component: About},
    {path : '/interior/', name: 'Interior', component: Interior},
    {path : '/interior/portfolio', name: 'Portfolio', component: Portfolio},
    {path : '/interior/portfolio/:slug', name: 'onePortfolio', component: OneProject},
    {path : '/interior/stores', name: 'retailStores', component: Retail},
    {path : '/interior/stores/:slug', name: 'retailStore', component: SingleStore},
    {path : '/account', name: 'Account', component: Account },
    {path : '/stores', name: 'Stores', component: Stores },
    {path : '/search', name: 'Search', component: Category },
    {path : '/account/:tab', name: 'Account', component: Account },
    {path : '/info', name: 'Info', component: Info },
    {path : '/info/:page', name: 'info', component: Info },
    {path : '/cart/', name: 'Cart', component: Cart },
    {path : '/brands/', name: 'Brands', component: Brands },
    {path : '/brand/:id', name: 'Brand', component: Category },
    {path : '/brand/:id/:subcategory', name: 'Brand', component: Category },
    {path : '/login/', name: 'Login', component: Login },
    {path : '/login/:forgot', name: 'Login', component: Login },
    {path : '/checkout/:step', name: 'Checkout Step', component: Checkout },
    {path : '/:category', name: 'Category', component: Category },
    {path : '/:category/:subcategory', name: 'Category', component: Category },
    {path : '/:category/:subcategory/:deep/', name: 'Parser Deep', component: routesParser },
    {path : '/:category/:subcategory/:deep/:subdeep/', name: 'Parser Subdeep', component: routesParser },
];


var setVh = function() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

setVh();
window.addEventListener('resize', function() {
    setVh();
});

let router = new VueRouter({
    mode: 'history',
    routes: routesList,
    // eslint-disable-next-line
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});

Vue.use(VueAnalytics, {
    id: 'UA-140792974-1',
    router
});

// Vue.use(VueFacebookPixel);

// Vue.analytics.fbq.init('292171648018083', {});


let initVue = function() {
    new Vue({
        el: "#app",
        router,
        $store,
        methods:{
        },
        watch: {
            $route (to, from){
                if (from.name != 'Login') $store.commit('setCurrentPage', to.name);
                $store.commit('setLoginModalActive', false);
            }
        },
        mounted() {
            // this.$router.go();
        }
    });
}

var langDefault = 'en';

const langCodes = {
	ua: "uk-ua",
	en: "en-gb",
	ru: "ru-ru"
};

window.setLang = function() {
    let lang = localStorage.getItem('lang');

    if (lang) {
        let currentUrl = window.location.pathname;
        var langCode = currentUrl.split('/')[1];
        if (langCode == 'ua' || langCode == 'ru' || langCode == 'en') {

            if (langCode != lang) {
                var newLang = lang === langDefault ? '' : lang;
                currentUrl = currentUrl.replace(langCode, newLang);
                currentUrl = currentUrl.replace('//', '/');
                window.location.replace(currentUrl);
            } else {
                localStorage.setItem('lang', langCode);
				$store.commit('setLang', langCode);
            }
        } else {
            // console.log("tag");
            // console.log(window.location);
            // if (lang != langDefault) {
            //     currentUrl = '/' + lang + currentUrl;
            //     window.location.replace(currentUrl);
            // }
        }
    } else {
		let currentUrl = window.location.pathname;
		var langCode = currentUrl.split('/')[1];

		if (langCode == 'ua' || langCode == 'ru' || langCode == 'en') {
			localStorage.setItem('lang', langCode);
			$store.commit('setLang', langCode);
		}
	}
};

window.location.pathname != '/social' ? window.setLang() : false;

let contentLang = localStorage.getItem('lang') ? langCodes[localStorage.getItem('lang')] : langCodes.ua; //old en

axios.defaults.baseURL = "https://api.villa.ua";
// axios.defaults.baseURL = "http://dev-api-villa.tftl.pw";

if (window.config.token) {

    if (Date.now() > localStorage.getItem('token_expires')) {
        localStorage.setItem('account_logged', '0');
        // $api.logout();
        axios({
			url:'/api/rest/logout',
			method:'post'
		});
        localStorage.removeItem('categories');
        axios.
        post('/get_token.php').
        then(response => {
            // $store.commit("setAccessToken", 'Bearer '+response.data.access_token);
            window.config.token = 'Bearer ' + response.data.access_token;
            localStorage.setItem('token', window.config.token);
            localStorage.setItem('token_expires', (Date.now() + response.data.expires_in));
            axios.defaults.headers = {
                "authorization":window.config.token,
                "x-oc-merchant-language":contentLang,
                "x-oc-currency":"UAH",
                "x-oc-image-dimension":"600x600"
            };
            axios.defaults.withCredentials = true;  //true for build production, false for dev
            initVue();
        });
    } else {
        axios.defaults.headers = {
            "authorization":window.config.token,
            "x-oc-merchant-language":contentLang,
            "x-oc-currency":"UAH",
            "x-oc-image-dimension":"600x600"
        };
        axios.defaults.withCredentials = true; //true for build production, false for dev
        initVue();
    }
    
} else {
    axios.
    post('/get_token.php').
    then(response => {
        // $store.commit("setAccessToken", 'Bearer '+response.data.access_token);
        window.config.token = 'Bearer ' + response.data.access_token;
        localStorage.setItem('token', window.config.token);
        localStorage.setItem('token_expires', (Date.now() + response.data.expires_in));
        // localStorage.setItem('token_expires', (Date.now() + 30000));
        axios.defaults.headers = {
            "authorization":window.config.token,
            "x-oc-merchant-language":contentLang,
            "x-oc-currency":"UAH", 
            "x-oc-image-dimension":"600x600"
        };
        axios.defaults.withCredentials = true; //true for build production, false for dev
        initVue();
    });
}


// document.title = $lng.meta.home_title;
// document.querySelector('meta[name="description"]').setAttribute("content", $lng.meta.home_description);

// router.beforeEach((to, from, next) => {

//     let title = '';

//     console.log(to);
//     if (to.name === 'Category') {

//         if (to.params.subcategory) {
//             title = to.params.subcategory;
//         } else {
//             // category
//             console.log($store.state.categories);
//         }
//     }

//     if (to.name === 'Parser Deep') {
//         title = to.params.deep;
//     }

//     if (to.name === 'Parser Subdeep') {
//         title = to.params.subdeep;
//     }

//     document.title = title.length ? (title + $lng.meta.base_title) : $lng.meta.home_title;
//     document.querySelector('meta[name="description"]').setAttribute("content", $lng.meta.home_description);

//     next();
// });