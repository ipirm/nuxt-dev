<template lang="pug">
    div
        .head
            .wrapper
                div.overlay-cors
                    button.back(@click="gotThePrevCat") {{ this.product.category[0].name }}
                    button.back(@click="gotThePrev") {{ this.product.category[1].name }}
                    button.back() {{ this.product.name }}
                template(v-if="product.images_thumb")
                    .previews.previews_no-slider(v-if="product.images_thumb.length < 5")
                        .previews__box(v-if="product.images_thumb.length > 0")
                            .item.previews__item(:class="{'item_active': slideActive === 0}" @click="changeSlide(0)")
                                .previews__bg(:style="{ backgroundImage:'url('+product.image_thumb+')'}")

                            template(v-for="(image, index) in product.images_thumb")
                                .item.previews__item(:class="{'item_active': slideActive === index+1}" @click="changeSlide(index+1)")
                                    .previews__bg(:style="{ backgroundImage:'url('+image+')'}")
                    .previews(v-else)
                        template(v-if="isShowSlider")
                            swiper.previews__box(:options="swiperOption" ref="mySwiper")
                                swiper-slide.item.previews__item
                                    .previews__bg(:style="{ backgroundImage:'url('+product.image_thumb+')'}")
                                template(v-for="(image, index) in product.images_thumb")
                                    swiper-slide.item.previews__item
                                        .previews__bg(:style="{ backgroundImage:'url('+image+')'}")
                            button.swiper-button-prev(slot="button-prev")
                            button.swiper-button-next(slot="button-next")
                        //- template(v-for="(image, index) in product.images")
                        //- 	swiper-slide.item.previews__item(:class="[slideActive == index+1 ? 'item_active' : '']" @click="changeSlide(index+1)")
                        //- 		.previews__bg(:style="{ backgroundImage:'url('+image+')'}")
                        //- template(v-for="(image, index) in product.images")
                        //- 	swiper-slide.item.previews__item(:class="[slideActive == index+1 ? 'item_active' : '']" @click="changeSlide(index+1)")
                        //- 		.previews__bg(:style="{ backgroundImage:'url('+image+')'}")

                    //- slick.previews__box(ref="preview" :options="slickOptionsPreview")
                    //- 	.item.previews__item(:class="[slideActive == 0 ? 'item_active' : '']" @click="changeSlide(0)")
                    //- 		.previews__bg(:style="{ backgroundImage:'url('+product.image+')'}")
                        //- template(v-for="(image, index) in product.images")
                        //- 	.item.previews__item(:class="[slideActive == index+1 ? 'item_active' : '']" @click="changeSlide(index+1)")
                        //- 		.previews__bg(:style="{ backgroundImage:'url('+image+')'}")





                //- slick.slider(ref="slick", :options="slickOptions")
                //- 	.slider__image
                //- 		.slider__pic(:style="{ backgroundImage:'url('+product.image+')'}")
                //- 	template(v-for="(image, index) in product.images")
                //- 		.slider__image
                //- 			.slider__pic(:style="{ backgroundImage:'url('+image+')'}")
                template(v-if="product.image_main && isShowSlider")
                    swiper.slider(:options="swiperOptionMain" ref="mySwiperMain")
                        swiper-slide.slider__image
                            lazy-image(:src="product.image_main")
                            //- .slider__pic(:style="{ backgroundImage:'url('+product.image_main+')'}")
                        template(v-for="(image, index) in product.images_main")
                            swiper-slide.slider__image
                                //zoom-on-hover(:img-normal="info.image_thumb")
                                .slider__pic(:style="{ backgroundImage:'url('+image+')'}")
                                    .image-zoom(@click="showPopupPhoto(index)")
                                        img(src="@/assets/img/circle_search_bold-512.png")
                                    //- popup-image(:src="src" :isVisible="popupImageIsVisible")

                popup-image(:src="product.image_main" v-if="isMainImagePopup")
                popup-image(:src="product.images_main[currentSliderPhoto]" v-else)

                //- popup-image(:src="product.image_main")


                template(v-if="product.images_main && isShowSlider")
                    .previews.previews_tablet.previews_no-slider(v-if="product.images_thumb.length < 5")
                        .previews__box(v-if="product.images_thumb.length > 0")
                            .item.previews__item(:class="{'item_active': slideActive === 0}" @click="changeSlide(0)")
                                .previews__bg(:style="{ backgroundImage:'url('+product.image_thumb+')'}")
                            template(v-for="(image, index) in product.images_thumb")
                                .item.previews__item(:class="{'item_active': slideActive === index+1}" @click="changeSlide(index+1)")
                                    .previews__bg(:style="{ backgroundImage:'url('+image+')'}")

                    .previews.previews_tablet(v-else)
                        swiper.previews__box(:options="swiperOptionTablet" ref="mySwiperTablet")
                            swiper-slide.item.previews__item
                                .previews__bg(:style="{ backgroundImage:'url('+product.image_thumb+')'}")
                            template(v-for="(image, index) in product.images_thumb")
                                swiper-slide.item.previews__item
                                    .previews__bg(:style="{ backgroundImage:'url('+image+')'}")
                        button.swiper-button-prev(slot="button-prev")
                        button.swiper-button-next(slot="button-next")
                template(v-if="ifTablet960")
                    .info
                        .info__wrapper
                            .info__brand
                                router-link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'brand/' + product.manufacturer_id") {{ product.manufacturer }}
                            .info__title {{ product.name }} {{ getAvailabilityStores(product) }}
                            .price.info__price
                                .price__number {{ product.price }}
                                .price__currency {{ $lang.product.uah }}
                            .price.info__price.price_old(v-if="getOldPrice(product)")
                                .price__container
                                    .price__number {{ getOldPrice(product) }}
                                    .price__currency {{ $lang.product.uah }}
                            .info__barcode {{ $lang.product.art }} {{ product.model }}
                        .info__wrapper.info__wrapper_white
                            .info__container


                                .info__description
                                    //- div(v-readMore:25="product.description | trim")
                                    //- div(v-readMore="product.description")
                                    p(v-if="getAttribute(21, product)") {{ $lang.product.composition }}: {{ getAttribute(21, product) }}
                                    p(v-if="getAttribute(15, product)") {{ $lang.product.size }}: {{ getAttribute(15, product) }}
                                    read-more(:more-str="$lang.product.more" :text="product.description || ''" link="#" :less-str="$lang.product.less" :max-chars="80")
                                //-button.info__more(v-scroll-to="{el: '#product-content', offset: -80, easing: 'ease'}") {{ $lang.product.more }}


                                .info__box
                                    .info__colors(v-if="product.attribute_groups")
                                        .color.info__color.color_active(v-if="getColor(product).length")
                                            .color__border
                                            .color__pin(:style="{background:getColor(product)}")
                                        template(v-for="color in colors")
                                            router-link.color.info__color(:to="getUrl(color.link, color.id)")
                                                .color__pin(:style="{background:getColorByName(color.name), borderColor:getColorByName(color.name)}")
                                    template(v-if="product.attribute_groups")
                                        .info__availability-container
                                            button.info__availability(@mouseenter="showAvailability()" @mouseleave="hideAvailability()") {{ $lang.product.availability }}
                                            .modal-availability(v-bind:class="{'modal-availability_active': isAvailabilityActive}")
                                                .modal-availability__title {{ $lang.product.availability_in_stores }}
                                                .modal-availability__list
                                                    .card.modal-availability__card(v-for="store in $lang.stores", v-if="getAvailabilityStores(product).indexOf(store.id) > -1")
                                                        .card__title {{ store.name }}
                                                        .card__address {{ store.address }}

                                    template(v-else)
                                        .info__availability-container.info__availability-container_left
                                            button.info__availability(@click="isAvailabilityActive = !isAvailabilityActive") {{ $lang.product.availability }}
                                            .modal-availability.modal-availability_left(v-bind:class="{'modal-availability_active': isAvailabilityActive}")
                                                .modal-availability__title {{ $lang.product.availability_in_stores }}
                                                .modal-availability__list
                                                    .card.modal-availability__card(v-for="store in $lang.stores", v-if="getAvailabilityStores(product).indexOf(store.id) > -1")
                                                        .card__title {{ store.name }}
                                                        .card__address {{ store.address }}

                                v-select.size(v-model="size", v-if="productSizes(product.options).length > 0", :searchable="searchable", :value="productSizes(product.options)[0]", :options='productSizes(product.options)')
                                button.add(@click="addToCart(product)") {{ $lang.product.add_to_cart}}
                                template(v-if="productSizes(product.options).length > 0")
                                    .info__wish-container
                                        button.info__to-wishlist(@click="toggleWishlist(product)") {{ checkWishList(product.seo_url+'-'+product.product_id) ? $lang.product.remove_from_wishlist : $lang.product.add_to_wishlist }}
                                template(v-else)
                                    .info__wish-container.info__wish-container_with-border
                                        button.info__to-wishlist.info__to-wishlist_with-border(@click="toggleWishlist(product)") {{ checkWishList(product.seo_url+'-'+product.product_id) ? $lang.product.remove_from_wishlist : $lang.product.add_to_wishlist }}
                template(v-else)
                    .info
                        .info__brand
                            router-link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'brand/' + product.manufacturer_id") {{ product.manufacturer }}
                        .info__title {{ product.name }}
                        .price.info__price
                            .price__number {{ product.price }}
                            .price__currency {{ $lang.product.uah }}
                        .price.info__price.price_old(v-if="getOldPrice(product)")
                            .price__container
                                .price__number {{ getOldPrice(product) }}
                                .price__currency {{ $lang.product.uah }}
                        .info__barcode {{ $lang.product.art }} {{ product.model }}
                        template(v-if="windowWidth > 960")
                            .info__description
                                p(v-if="getAttribute(21, product)") {{ $lang.product.composition }}: {{ getAttribute(21, product) }}
                                p(v-if="getAttribute(15, product)") {{ $lang.product.size }}: {{ getAttribute(15, product) }}
                            button.info__more(v-scroll-to="{el: '#product-content', offset: -80, easing: 'ease'}")
                                span(v-if="product.description") {{ $lang.product.more}}
                        template(v-else)
                            .info__description
                                p(v-if="getAttribute(21, product)") {{ $lang.product.composition }}: {{ getAttribute(21, product) }}
                                p(v-if="getAttribute(15, product)") {{ $lang.product.size }}: {{ getAttribute(15, product) }}
                                read-more(:more-str="$lang.product.more" :text="product.description || ''" link="#" :less-str="$lang.product.less" :max-chars="80")
                            //-button.info__more(v-scroll-to="{el: '#product-content', offset: -80, easing: 'ease'}") {{ $lang.product.more}}
                        .info__box
                            .info__colors(v-if="product.attribute_groups")
                                .color.info__color.color_active(v-if="getColor(product)")
                                    .color__border
                                    .color__pin(:style="{background:getColor(product)}")
                                template(v-for="color in colors")
                                    router-link.color.info__color(:to="getUrl(color.link, color.id)")
                                        .color__pin(:style="{background:getColorByName(color.name), borderColor:getColorByName(color.name)}")
                            template(v-if="product.attribute_groups")
                                .info__availability-container
                                    template(v-if="windowWidth > 1200")
                                        button.info__availability(@mouseenter="showAvailability()" @mouseleave="hideAvailability()") {{ $lang.product.availability}}
                                    template(v-else)
                                        button.info__availability(@click="isAvailabilityActive = !isAvailabilityActive") {{ $lang.product.availability }}
                                    .modal-availability(v-bind:class="{'modal-availability_active': isAvailabilityActive}")
                                        .modal-availability__title(v-if="getAvailabilityStores(product).length > 0") {{ $lang.product.availability_in_stores}}
                                        .modal-availability__list
                                            .card.modal-availability__card(v-for="store in $lang.stores", v-if="getAvailabilityStores(product).indexOf(store.id) > -1")
                                                .card__title {{ store.name }}
                                                .card__address {{ store.address }}
                                        template(v-if="productAvailabilityBySize(product.options).length > 0")
                                            template(v-for="sizes in productAvailabilityBySize(product.options)", v-if="sizes.size == sizeObj.label")
                                                .card.modal-availability__card(v-for="store in $lang.stores", v-if="(sizes.stores).indexOf(store.id) > -1")
                                                    .card__title {{ store.name }}
                                                    .card__address {{ store.address }}

                            template(v-else)
                                .info__availability-container.info__availability-container_left
                                    button.info__availability(@mouseenter="showAvailability()" @mouseleave="hideAvailability()") {{ $lang.product.availability}}
                                    .modal-availability.modal-availability_left(v-bind:class="{'modal-availability_active': isAvailabilityActive}")
                                        .modal-availability__title(v-if="getAvailabilityStores(product).length > 0") {{ $lang.product.availability_in_stores}}
                                        .modal-availability__list
                                            .card.modal-availability__card(v-for="store in $lang.stores", v-if="getAvailabilityStores(product) && getAvailabilityStores(product).indexOf(store.id) > -1")
                                                .card__title {{ store.name }}
                                                .card__address {{ store.address }}


                        v-select.size(v-model="sizeObj", v-if="productSizes(product.options).length > 0", :searchable="searchable", :value="size", :options='productSizes(product.options)' )
                        button.add(@click="addToCart(product)") {{ $lang.product.add_to_cart}}
                        template(v-if="isTablet1200")
                            template(v-if="productSizes(product.options).length > 0")
                                .info__wish-container
                                    button.info__to-wishlist(@click="toggleWishlist(product)") {{ checkWishList(product.seo_url+'-'+product.product_id) ? $lang.product.remove_from_wishlist : $lang.product.add_to_wishlist }}
                            template(v-else)
                                .info__wish-container.info__wish-container_with-border
                                    button.info__to-wishlist.info__to-wishlist_with-border(@click="toggleWishlist(product)") {{ checkWishList(product.seo_url+'-'+product.product_id) ? $lang.product.remove_from_wishlist : $lang.product.add_to_wishlist }}
                        template(v-else)
                            template(v-if="productSizes(product.options).length > 0")
                                .info__wish-container
                                    button.info__to-wishlist(@click="toggleWishlist(product)") {{ checkWishList(product.seo_url+'-'+product.product_id) ? $lang.product.remove_from_wishlist : $lang.product.add_to_wishlist }}
                            template(v-else)
                                .info__wish-container.info__wish-container_with-border
                                    button.info__to-wishlist.info__to-wishlist_with-border(@click="toggleWishlist(product)") {{ checkWishList(product.seo_url+'-'+product.product_id) ? $lang.product.remove_from_wishlist : $lang.product.add_to_wishlist }}
        .wrapper
            .content(v-if="product.description")
                .content__box#product-content
                    .h3.content__h3 {{ $lang.product.details}}
                    .content__info
                        div(v-if="product.description", v-html="product.description")

                .info-box
                    .info-box__label {{ $lang.product.need_more_info}}
                    .info-box__box
                        a.info-box__link(href="#") {{ $lang.product.orders_shipping }}
                        a.info-box__link(href="#") {{ $lang.product.returns_refunds }}
                        a.info-box__link(href="#") {{ $lang.product.duties_taxes }}

</template>

<script>

    import Vue from 'vue';
    import Lang from '../../../components/lang.vue';
    import slide3 from '@/assets/uploads/product-1.jpg';
    import ReadMore from 'vue-read-more';

    import Slick from 'vue-slick';
    import vSelect from 'vue-select';
    import vueMagnifier from 'vue-magnifier';
    import VueScrollTo from 'vue-scrollto';
    import $api from '../../../components/api';
    import $store from '../../../components/store';
    import $colors from '../../../components/colors';

    import lazyImage from '../../../components/lazyImage.vue';
    // import ZoomOnHover from '@/components/ZoomOnHover.vue';
    import PopupImage from '@/components/PopupImage.vue';

    import 'swiper/dist/css/swiper.css';
    import {swiper, swiperSlide} from 'vue-awesome-swiper';

    Vue.use(VueScrollTo);

    export default {
        name: 'product-head',
        data: function () {
            return {
                slide3,
                tipText: "Express <a href='#'>delivery</a> and free returns within 14 days",
                store: $store.state.count,
                swiperOption: {},
                swiperOptionTablet: {},
                history: window.history,
                swiperOptionMain: {},
                added_to_wishlist: '',
                added_to_bag: '',
                slideActive: 0,
                searchable: false,
                popupImageIsVisible: false,
                currentSliderPhoto: null,
                isMainImagePopup: true,
                value: "Choose your size",
                isAvailabilityActive: false,
                windowWidth: window.innerWidth,
                ifTablet960: false,
                isTablet1200: false,
                isShowSlider: true,
                size: '',
                sizeObj: {},
                sizeSet: false,
                loginModalTitle: {
                    ua: 'Додати товар у список побажань',
                    en: 'Add item to wish list',
                    ru: 'Добавить товар в список желаний'
                },
                loginModalSubtitle: {
                    ua: 'Увійдіть або зареєструйтеся, щоб додати товари до свого списку побажань',
                    en: 'Login or register to add products to your wish list',
                    ru: 'Войдите или зарегистрируйтесь, чтобы добавить продукты в список желаний'
                },
                langDefault: window.config.langDefault
            }
        },
        components: {
            Slick,
            'v-select': vSelect,
            swiper,
            swiperSlide,
            'lazy-image': lazyImage,
            vueMagnifier,
            PopupImage
        },
        mounted() {
            var th = this;

            let showPopupButton = document.querySelector(".image-zoom");
            showPopupButton.addEventListener("click", function () {
                document.body.classList.add("scroll_stop");
            });

            var width = window.innerWidth;
            if (width < 960 && width > 650) {
                th.ifTablet960 = true;
            } else {
                th.ifTablet960 = false;
            }

            if (width < 1200) {
                th.isTablet1200 = true;
            } else {
                th.isTablet1200 = false;
            }

            window.addEventListener('resize', th.resizeHandler, false);

            this.getPreviewsItem();
        },
        props: {
            product: {
                type: Object,
                default: {
                    images: [],
                    images_main: [],
                    images_thumb: []
                }
            },
            colors: {
                type: Array,
                default: []
            }
        },
        mixins: [Lang],
        filters: {
            trim(text) {
                if (!text) return '';
                var text = text.replace(/<br\/>/g, " ");
                var wordsToCut = 12;
                var wordsArray = text.split(" ");
                var cutted = "";
                if (wordsToCut > wordsArray.length) {
                    return text;
                }
                for (var i = 0; i < wordsToCut; i++) {
                    cutted += wordsArray[i] + " ";
                }
                return cutted.trim() + "...";
            }
        },
        computed: {
            view() {
                return $store.state.products.view
            },
            shortDescription() {
                var data = $store.state.products.data[this.$route.params.deep].description;
                return data == undefined ? {} : data;
            },
            wishlist() {
                var data = $store.state.wishlist.data;
                return data == undefined ? {} : data;
            }
        },
        mounted() {
            console.log('Ilham check');
            console.log(product);
            let th = this;
            this.$nextTick(function () {
                th.swiperOptionMain = {
                    slidesPerView: 1,
                    effect: 'fade',
                    loop: false,
                    lazy: true,
                    allowTouchMove: false,
                    observer: true,
                    observeParents: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    fadeEffect: {
                        crossFade: true
                    },
                    breakpoints: {
                        650: {
                            allowTouchMove: true,
                            loop: true
                        }
                    },
                    on: {
                        slideChange: function () {
                            th.slideActive = this.realIndex;
                        }
                    }
                };
            });

            document.body.addEventListener('click', th.documentClickHandler, false);
        },
        created() {
            let $this = this;
            console.log('Ilhamik');
            let links = this.$route.path.split('/');
            // links[3] = this.product.category[1].name.toLowerCase();
            // let url = `${links.join('/')}`;
            console.log(this.product.category);
            console.log(links);
            // this.$router.push(url);
            this.swiperOption = {
                direction: 'vertical',
                slidesPerView: 5,
                spaceBetween: 12,
                centeredSlides: true,
                slideToClickedSlide: true,
                observer: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                on: {
                    slideChange: function () {
                        $this.slideActive = this.realIndex;
                        $this.$refs.mySwiperMain.swiper.slideTo($this.slideActive);
                    }
                },
                breakpoints: {}
            };

            this.swiperOptionTablet = {
                direction: 'horizontal',
                slidesPerView: 5,
                spaceBetween: 19,
                centeredSlides: true,
                slideToClickedSlide: true,
                on: {
                    slideChange: function () {
                        $this.slideActive = this.realIndex;
                        $this.$refs.mySwiperMain.swiper.slideTo($this.slideActive);
                    }
                }
            };
        },
        methods: {
            createRoute(){
                let links = this.$route.path.split('/');
                links[3] = this.product.category[1].name.toLowerCase();
                let url = `${links.join('/')}`;
                this.$route.path = url;
                console.log('Done')
            },
            gotThePrev() {
                let link = `/${this.$route.params.category}/${this.$route.params.subcategory}`;
                return this.$router.push(link);
            },
            gotThePrevCat() {
                let link = `/${this.$route.params.category}`;
                return this.$router.push(link);
            },
            showPopupPhoto(index) {
                this.currentSliderPhoto = index;
                this.popupImageIsVisible = true;
                this.isMainImagePopup = false;
                document.body.style.overflow = "hidden";
                console.log("document.body");
                console.log(document.body);
            },
            resizeHandler() {
                let th = this;
                var width = window.innerWidth;
                this.isShowSlider = false;
                this.windowWidth = width;
                if (width < 960 && width > 650) {
                    th.ifTablet960 = true;
                } else {
                    th.ifTablet960 = false;
                }

                if (width < 1200) {
                    th.isTablet1200 = true;
                } else {
                    th.isTablet1200 = false;
                }

                setTimeout(function () {
                    th.isShowSlider = true;
                }, 500);
            },
            getAttribute(id, product) {
                if (product.attribute_groups == undefined) return false;
                var el = product.attribute_groups[0].attribute.find(function (item) {
                    return item.attribute_id == id;
                });
                return el ? el.text : false;
            },
            getAvailabilityStores(product) {
                if (product.attribute_groups == undefined) return false;
                var el = product.attribute_groups[0].attribute.find(function (item) {
                    return item.attribute_id == '18';
                });
                return el ? (el.text).split(" | ") : false;
            },
            getOldPrice(product) {
                if (product.attribute_groups == undefined) return false;
                var el = product.attribute_groups[0].attribute.find(function (item) {
                    return item.attribute_id == '19';
                });

                if (el) {
                    return el.text > product.price ? el.text : false;
                }

                return false;
            },
            openAvailability() {
                this.isAvailabilityActive = true;
            },
            closeAvailability() {
                this.isAvailabilityActive = false;
            },
            showAvailability() {
                this.isAvailabilityActive = true;
            },
            hideAvailability() {
                this.isAvailabilityActive = false;
            },
            changeViev(v) {
                $store.commit('productsView', v);
            },
            changeSlide(v) {
                if (this.windowWidth <= 650) {
                    this.$refs.mySwiperMain.swiper.slideToLoop(v);
                } else {
                    this.$refs.mySwiperMain.swiper.slideTo(v);
                }
                // this.slideActive = v;
            },
            toggleWishlist(product) {
                let $this = this;

                let id = product.product_id;
                let seo_url = product.seo_url + '-' + product.product_id;

                if ($store.state.account.logged) {

                    if (this.checkWishList(seo_url)) {
                        $api.wishlist.delete(id, seo_url);
                        Vue.notify({
                            group: 'notify',
                            type: 'wishlist',
                            title: product.name,
                            text: $this.$lang.notifications.removed_from_wishlist,
                            //duration: 100000,
                        });
                    } else {
                        $api.wishlist.add(id, seo_url);

                        Vue.notify({
                            group: 'notify',
                            type: 'wishlist',
                            title: product.name,
                            text: $this.$lang.notifications.added_to_wishlist,
                            //duration: 100000,
                        });
                    }

                } else {
                    $store.commit('setLoginModalTitle', $this.loginModalTitle[$store.state.lang.code]);
                    $store.commit('setLoginModalSubtitle', $this.loginModalSubtitle[$store.state.lang.code]);
                    $store.commit('setLoginModalActive', true);
                }
            },
            checkWishList(seo_url) {
                return (seo_url in this.wishlist) ? true : false;
            },
            addToCart(product) {

                let $this = this;

                Vue.notify({
                    group: 'notify',
                    type: 'cart',
                    title: product.name,
                    text: '<div style="background-image:url(' + product.image + ');"></div>' + $this.$lang.notifications.added_to_the_bag,
                    //duration: 100000,
                });

                product.selectedOptions = [];


                if (this.sizeObj.hasOwnProperty('value')) {
                    product.selectedOptions.push({
                        name: 'Size',
                        product_option_id: this.sizeObj.value.product_option_id,
                        option_value: [
                            {product_option_value_id: this.sizeObj.value.product_option_value_id}
                        ]
                    });
                }

                $api.cart.add(product, function (resp) {
                    $api.cart.get();
                });

            },
            productSizes(options) {
                var data = options ? options[0].option_value : false;
                let attrs = [];
                data ? data.forEach(e => {
                    attrs.push({
                        label: e.name,
                        value: {
                            "product_option_id": options[0].product_option_id,
                            "product_option_value_id": e.product_option_value_id
                        }
                    });
                }) : false;

                //attrs.length == 0 ? attrs.push('One size') : false;

                return attrs;
            },
            productAvailabilityBySize(options) {
                var data = options ? options[0].option_value : false;
                let attrs = [];
                data ? data.forEach(e => {
                    attrs.push({size: e.name, stores: (e.in_stock).split("|")});
                }) : false;
                console.log('attrs', attrs);
                return attrs;
            },
            getColor(product, border) {
                let el = product.attribute_groups[0].attribute.find(function (item) {
                    return item.attribute_id == '13';
                });
                // let color = border && $colors[name] == "#ffffff" ? '#ACAEB2' : $colors[name];
                if (el) {

                    let name = el.text;


                    if (name.indexOf(' ' > -1)) {
                        name = name.replace(' ', '_');
                    }

                    return border ? '1px solid ' + $colors[name] : $colors[name];
                }
                return '';
            },
            getColorByName(name) {
                console.log(name);
                console.log(name.toLowerCase());
                return $colors[name.toLowerCase()] ? $colors[name.toLowerCase()] : "#eee";
            },
            getUrl(seo_url, id) {
                var path = (this.$route.path).split("/");
                path.splice(path.length - 1, 1);
                path = path.join("/");
                path = path + "/" + seo_url.replace($store.getters['getLangCode'].code + '-', '') + '-' + id;
                return path;
                //return '/'+ ($store.getters['getLangCode'].code === this.langDefault ? '' : $store.getters['getLangCode'].code + "/") + seo_url.replace($store.getters['getLangCode'].code+'-', '')+'-'+id;
            },
            getPreviewsItem() {
                // var items = document.querySelectorAll('.previews_tablet .previews__item');
                // var previews = document.querySelector('.previews_tablet');

                // if (items.length <= 1) {
                // 	previews.classList.add('previews_hidden');
                // }

            },
            documentClickHandler(e) {
                let th = this;
                let target = e.target;
                var list = target.classList;
                if (!list.contains('info__availability') && !list.contains('modal-availability') && !target.closest('.modal-availability')) {

                    th.closeAvailability();
                }
            }
        },
        beforeUpdate() {
            // if (this.$refs.slick) {
            // 	this.$refs.slick.destroy();
            // }

            // if (this.$refs.preview) {
            // 	this.$refs.preview.destroy();
            // }
        },
        updated() {

            var options = this.product.options;

            if (!this.sizeSet && options != undefined) {

                var opt = options.find(function (item) {
                    return item.name === 'Size';
                });

                if (opt) {
                    this.size = opt.option_value[0].name;

                    this.sizeObj = {
                        label: this.size,
                        value: {
                            product_option_id: opt.product_option_id,
                            product_option_value_id: opt.option_value[0].product_option_value_id
                        }
                    };

                    this.sizeSet = true;
                }
            }

            // this.$nextTick(function () {
            // 	if (this.$refs.slick) {
            // 		this.$refs.slick.create(this.slickOptions);
            // 		this.$refs.slick.setPosition();
            // 		this.$refs.slick.goTo(0, false);
            // 	}

            // 	if (this.$refs.preview) {
            // 		this.$refs.preview.create(this.slickOptionsPreview);
            // 		this.$refs.preview.setPosition();
            // 		this.$refs.preview.goTo(0, false);
            // 	}
            // });
        },
        beforeDestroy() {
            let th = this;
            window.removeEventListener('resize', th.resizeHandler, false);
            document.body.removeEventListener('click', th.documentClickHandler, false);
        },
        watch: {
            '$route'() {
                let th = this;
                this.slideActive = 0;
                // this.$refs.mySwiperMain.swiper.slideTo(0);

                // if (th.$refs.mySwiperMain) {
                // 	th.$refs.mySwiperMain.swiper.destroy(false, false);
                // }

                // if (th.$refs.mySwiper) {
                // 	th.$refs.mySwiper.swiper.destroy(false, false);
                // }

            },
            product() {
                let $this = this;

                this.isShowSlider = false;

                this.$nextTick(function () {
                    // console.log($this.$refs.mySwiperMain.swiper);
                    // $this.$refs.mySwiperMain.swiper.init();
                    // $this.$refs.mySwiper.swiper.init();
                    // this.recreateSwiper();
                    this.isShowSlider = true;
                });

                // if ($this.$refs.mySwiperMain) {
                // 	$this.$refs.mySwiperMain.swiper.update();
                // }

                // if ($this.$refs.mySwiper) {
                // 	$this.$refs.mySwiper.swiper.update();
                // }

                // this.$nextTick(function() {
                // if ($this.$refs.mySwiperMain) {
                // 	$this.$refs.mySwiperMain.swiper.destroy();
                // }

                // if ($this.$refs.mySwiper) {
                // 	$this.$refs.mySwiper.swiper.destroy();
                // }
                // });
            }
        }
    }

    if (!Element.prototype.closest) {
        if (!Element.prototype.matches) {
            Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
        }
        Element.prototype.closest = function (s) {
            var el = this;
            var ancestor = this;
            if (!document.documentElement.contains(el)) return null;
            do {
                if (ancestor.matches(s)) return ancestor;
                ancestor = ancestor.parentElement;
            } while (ancestor !== null);
            return null;
        };
    }
</script>

<style>
    .scroll_stop {
        overflow: hidden;
    }
</style>

<style lang="scss" scoped>
    @import '@/helpers/sass/mixins.scss';
    @import '@/helpers/sass/kit.scss';

    .overlay-cors {
        position: absolute;
        max-width: 900px;
        z-index: 12;
        display: flex;
        justify-content: space-between;
        top: -5px;
        button{
            position: relative;
        }
        button::after{
            content: '';
            background-image: url("../../../assets/img/breadcrumb-arrow-right.svg");
            width: 4px;
            height: 7px;
            position: absolute;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
        }
    }

    .back {
        position: relative !important;
        z-index: auto !important;
        padding-left: 25px !important;
    }

    .back::after {
        content: '';
        background-image: url(/img/breadcrumb-arrow-right.31e8d057.svg);
        width: 4px;
        height: 7px;
        position: absolute;
        display: inline-block;
        left: 12px;
        top: 8px;
    }

    .back:first-of-type::after {
        display: none !important;
        cursor: none !important;
    }

    .image-zoom {
        position: absolute;
        right: 20px;
        bottom: 0px;
        width: 30px;
        cursor: pointer;

        img {
            width: 100%;
        }
    }

    .head {
        width: 100%;
        height: auto;
        min-height: 596px;
        background: #F3F3F3;
        box-sizing: border-box;
        font-size: 0;
        padding-bottom: 4px;
        padding-top: 8px;
        position: relative;

        .wrapper {
            position: static;
        }

        @media screen and (max-width: 850px) {
            padding-top: 0px;
        }
    }

    .back {
        margin: 0;
        color: #0f0f0f;
        font-family: 'Museo';
        font-weight: 100;
        line-height: 24px;
        font-size: 11px;
        letter-spacing: 0.034em;
        background: url(/img/icon-small-arrow-left.6e43542a.svg) no-repeat;
        background-position: left;
        background-size: auto 8px;
        padding-left: 17px;
        position: absolute;
        z-index: 2;
        top: 19px;
        left: 48px;
        @media screen and (max-width: 850px) {
            left: 16px;
        }
    }

    .wrapper {
        width: 100%;
        height: 100%;
        padding-left: 48px;
        padding-right: 48px;
        max-width: calc(1344px + 48px * 2);
        margin: 0 auto;
        box-sizing: border-box;
    }

    .previews {
        display: inline-block;
        vertical-align: middle;
        width: calc((100% - 264px) / 12);
        height: 100%;
        height: 328px;
        margin-right: 24px;
        mix-blend-mode: multiply;
        // @include vertical-align-middle;
        position: relative;

        /deep/ .swiper-button-next {
            position: absolute;
            top: calc(100% - -36px);
            left: 4px;
            right: auto;
            background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOSIgaGVpZ2h0PSI2IiB2aWV3Qm94PSIwIDAgOSA2IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0zLjg4OTExIDQuOTc4MjRMMC40NDkzNDkgMS41Mjk5N0MwLjIzMDQyNSAxLjMxMDYyIDAuMjMwNDI1IDAuOTU0OTgxIDAuNDQ5MzQ5IDAuNzM1NzM2QzAuNjY4MDc3IDAuNTE2NDczIDEuMDIyODMgMC41MTY0NzMgMS4yNDE1NSAwLjczNTczNkw0LjI4NTIxIDMuNzg2OTJMNy4zMjg3NyAwLjczNTgyNUM3LjU0NzU5IDAuNTE2NTYyIDcuOTAyMzEgMC41MTY1NjIgOC4xMjEwNCAwLjczNTgyNUM4LjMzOTg2IDAuOTU1MDg4IDguMzM5ODYgMS4zMTA3MSA4LjEyMTA0IDEuNTMwMDZMNC42ODEyMiA0Ljk3ODMzQzQuNTcxODEgNS4wODc5NiA0LjQyODU1IDUuMTQyNzIgNC4yODUyMyA1LjE0MjcyQzQuMTQxODQgNS4xNDI3MiAzLjk5ODQ4IDUuMDg3ODYgMy44ODkxMSA0Ljk3ODI0WiIgZmlsbD0iIzY2NjY2NiIvPjwvc3ZnPg==);
            background-size: auto 5px;
            background-position: center center;
            width: 40px;
            height: 40px;
            transition: opacity .5s ease;

            &:hover {
                opacity: .7;
            }
        }

        /deep/ .swiper-button-prev {
            position: absolute;
            top: -34px;
            left: 4px;
            right: auto;
            background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOSIgaGVpZ2h0PSI1IiB2aWV3Qm94PSIwIDAgOSA1IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik00LjY4MTIgMC4xNjQzMzVMOC4xMjA5NiAzLjYxMjZDOC4zMzk4OSAzLjgzMTk2IDguMzM5ODkgNC4xODc2IDguMTIwOTYgNC40MDY4NEM3LjkwMjI0IDQuNjI2MSA3LjU0NzQ4IDQuNjI2MSA3LjMyODc3IDQuNDA2ODRMNC4yODUxIDEuMzU1NjZMMS4yNDE1NCA0LjQwNjc1QzEuMDIyNzIgNC42MjYwMiAwLjY2Nzk5OCA0LjYyNjAyIDAuNDQ5MjY5IDQuNDA2NzVDMC4yMzA0NTIgNC4xODc0OSAwLjIzMDQ1MiAzLjgzMTg3IDAuNDQ5MjY5IDMuNjEyNTJMMy44ODkwOSAwLjE2NDI0NkMzLjk5ODUxIDAuMDU0NjE0NSA0LjE0MTc2IC0wLjAwMDEzOTIzNiA0LjI4NTA4IC0wLjAwMDEzOTIzNkM0LjQyODQ3IC0wLjAwMDEzOTIzNiA0LjU3MTgzIDAuMDU0NzIwOSA0LjY4MTIgMC4xNjQzMzVaIiBmaWxsPSIjNjY2NjY2Ii8+PC9zdmc+);
            background-size: auto 5px;
            background-position: center center;
            width: 40px;
            height: 40px;
            transition: opacity .5s ease;

            &:hover {
                opacity: .7;
            }
        }

        &_no-slider {
            height: auto;
        }

        &__box {
            display: inline-block;
            vertical-align: middle;
            width: 100%;
            height: auto;
            height: 100%;
        }

        &_tablet {
            display: none;
        }

        &__bg {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
        }
    }

    .slider {
        display: inline-block;
        width: calc((((100% - 264px) / 12 * 7) + (6 * 24px)));
        height: 596px;
        vertical-align: middle;
        mix-blend-mode: multiply;

        &__image {
            width: 100%;
            height: 100%;
        }

        &__pic {
            position: absolute;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            width: 90%;
            height: 90%;
            top: 5%;
            left: 5%;
        }
    }

    .item {
        width: 48px;
        height: 56px;
        border: 1px solid #d6d6d6;
        box-sizing: border-box;
        margin-bottom: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        opacity: 1;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        position: relative;

        &_active,
        &.swiper-slide-active {
            border-color: #0f0f0f;
        }

        &:hover {
            opacity: 0.8;
        }

        &:last-child {
            margin-bottom: 0px;
        }
    }

    .info {
        width: calc((((100% - 264px) / 12 * 4) + (3 * 24px)));
        height: 400px;
        display: inline-block;
        vertical-align: middle;
        vertical-align: top;
        margin-left: 76px;
        margin-top: 61px;
        width: calc((((100% - 420px) / 12 * 4) + (3 * 24px)));
        height: auto;

        &__brand {
            @include kit('h5 11 bold', 'dark');
            margin-bottom: 7px;
            display: block;

            /deep/ a {
                transition: opacity .5s ease;

                &:hover {
                    opacity: .7;
                }
            }
        }

        &__title {
            font-family: 'Museo';
            line-height: normal;
            font-size: 20px;
            color: #262626;
            font-weight: 100;
            margin-bottom: 24px;
        }

        &__price {
            margin-bottom: 39px;
        }

        &__barcode {
            @include kit('h6 300', 'dark');
            opacity: 0.5;
        }

        &__description {
            @include kit('p1', 'dark');
            text-align: left;
            display: block;
            margin-right: 12px;
            margin-top: 6px;

            /deep/ p {
                margin: 0;
            }
        }

        &__more {
            display: inline-block;
            @include ui('link', 'dark');
            line-height: normal;
            font-size: 10px;
            letter-spacing: 0.08em;
            text-transform: none;
            margin-bottom: 63px;
            margin-top: 7px;
            transition: opacity .5s ease;

            &:hover {
                opacity: .7;
            }
        }

        /deep/ #readmore {
            display: inline-block;
            @include ui('link', 'dark');
            line-height: normal;
            font-size: 10px;
            letter-spacing: 0.08em;
            text-transform: none;
            margin-bottom: 63px;
            margin-top: 7px;
            transition: opacity .5s ease;

            &:hover {
                opacity: .7;
            }
        }

        &__box {
            display: block;
            margin-bottom: 32px;

            &:after {
                content: "";
                display: table;
                clear: both;
            }
        }

        &__colors {
            float: left;
            max-width: 45%;
            margin-bottom: -6px;
        }

        &__availability-container {
            float: right;
            max-width: 45%;
            position: relative;

            &_left {
                float: left;
            }
        }

        &__availability {
            @include ui('link', 'dark');
            line-height: normal;
            font-size: 10px;
            letter-spacing: 0.02em;
            text-transform: none;
            margin-top: 3px;
            transition: opacity .5s ease;

            &:after {
                background: none;
                bottom: 0;
                border-bottom: 1px dashed #0D0D0D;
                height: 0;
            }

            &:hover {
                opacity: .7;
            }
        }

        &__to-wishlist {
            @include ui('link', 'dark');
            line-height: normal;
            font-size: 10px;
            letter-spacing: 0.02em;
            text-transform: none;
            margin-top: 21px;
            transition: opacity .5s ease;
            padding-bottom: 3px;

            &:hover {

            }

            &:after {
                bottom: 1px;
            }

            &_with-border {
                margin-top: 0;
                width: 100%;
                height: 100%;
                display: block;
                font-size: 11px;
                padding-top: 14px;
                padding-bottom: 12px;

                &::after {
                    display: none;
                }
            }
        }

        &__wish-container {
            text-align: center;

            &_with-border {
                margin-top: 8px;
                border: 1px solid #D6D6D6;
            }
        }
    }

    .modal-availability {
        width: 316px;
        background-color: #fff;
        box-shadow: 0px 2px 50px rgba(0, 0, 0, 0.07);
        border-radius: 2px;
        padding: 24px 16px 9px;
        position: absolute;
        bottom: calc(100% - -15px);
        right: 2px;
        z-index: 2;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: opacity .5s ease, visibility .5s ease, transform .5s ease;
        transform: translate3d(0, 10px, 1px);

        &_active {
            pointer-events: all;
            visibility: visible;
            opacity: 1;
            transform: translate3d(0, 0, 1px);
        }

        &:after {
            content: "";
            display: block;
            position: absolute;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 5px 5px 0 5px;
            border-color: #ffffff transparent transparent transparent;
            right: 40px;
            bottom: -5px;
        }

        &__title {
            @include kit('h5 11 bold', 'dark');
            color: #000;
            text-transform: none;
            padding: 0 8px;
        }

        &_left {
            left: 30px;

            &::after {
                left: 40px;
            }
        }

        .card {
            padding: 13px 8px;
            border-bottom: 1px solid #F3F3F3;

            &__title {
                @include kit('h5', 'dark');
                font-weight: 500;
                text-transform: uppercase;
                line-height: 20px;
                color: #262626;
            }

            &__address {
                @include kit('h5', 'dark');
                color: rgba(#262626, .7);
                line-height: 16px;
                text-transform: none;
                max-width: 80%;
            }

            &:first-child {
                padding-top: 10px;
            }

            &:last-child {
                border-bottom: none;
            }
        }
    }

    .price {
        &__number {
            display: inline-block;
            font-family: 'Museo';
            line-height: normal;
            font-size: 20px;
            letter-spacing: 0.03em;
            text-transform: uppercase;
            color: #262626;
            margin-right: 10px;
        }

        &__currency {
            display: inline-block;
            @include kit('h4', 'dark');
        }

        &_old {
            opacity: .4;
            font-size: 11px;
            margin-top: -34px;

            .price__container {
                position: relative;
                display: inline-block;

                &:after {
                    content: "";
                    display: block;
                    background: rgba(#00000B, .4);
                    width: 100%;
                    height: 1px;
                    top: calc(50% - -1px);
                    position: absolute;
                    left: 0;
                }
            }

            .price__currency {
                font-size: 11px;
            }

            .price__number {
                font-size: 14px;
                margin-right: 5px;
            }
        }
    }

    .color {
        text-transform: none;
        transition: all 0.3s ease;
        display: inline-block;
        cursor: pointer;
        width: 21px;
        height: 21px;
        margin-right: 6px;
        margin-bottom: 6px;
        position: relative;
        vertical-align: top;

        &:hover {
            opacity: 0.8;
        }

        &__pin {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            display: inline-block;
            vertical-align: middle;
            background: transparent;
            // border: 3px solid #0D0D0D;
            position: absolute;
            top: 3px;
            left: 3px;
        }

        &__border {
            position: absolute;
            border: 1px solid #0D0D0D;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            border-radius: 50%;
        }

        &_active {
            .color {
                &__pin {
                    position: relative;
                    // border-width: 1px;

                    // &:after {
                    // 	content: "";
                    // 	display: block;
                    // 	position: absolute;
                    // 	left: 0px;
                    // 	top: 0px;
                    // 	width: 17px;
                    // 	height: 17px;
                    // 	background: transparent;
                    // 	border-radius: 50%;
                    // 	border: 2px solid #f3f3f3;
                    // 	box-sizing: border-box;
                    // }
                }
            }
        }
    }

    .add {
        @include ui('button', 'dark');
    }

    .size {
        border-radius: 0;
        // border-color: #d6d6d6;
        @include kit('h6 300', 'dark');
        text-transform: none;
        margin-bottom: 16px;
        background: none !important;
        box-shadow: none;

        /deep/ .dropdown-toggle {
            border-radius: 0;
            border-color: #d6d6d6;
            height: 44px;
            transition: border-color .5s ease, border-radius .5s ease, background-color .5s ease;
            background: transparent;

            &::after {
                content: "";
                display: block;
                width: 44px;
                height: 44px;
                position: absolute;
                right: 0;
                bottom: 0;
                background: url(../../../assets/img/arrow-down.svg) no-repeat;
                background-position: center;
                transition: transform 0.6s ease;
                transform: rotate(0deg);
            }
        }

        /deep/ .vs__selected-options {
            border-radius: 0;
            border-color: #d6d6d6;
            height: 44px;
            padding: 0;
        }

        /deep/ .selected-tag {
            position: absolute;
            width: 100%;
            height: 44px;
            margin: 0;
            padding-left: 14px;
            border: none;
            transition: color .5s ease;
        }

        /deep/ .vs__actions {
            display: none;
        }

        /deep/ .dropdown-menu {
            @include kit('h6 300', 'dark');
            // box-shadow: 0px 2px 50px rgba(0, 0, 0, 0.07);
            border-radius: 0 0 4px 4px;
            text-transform: none;
            padding: 0;
            overflow: visible;

            li {
                color: rgba(#262626, .8);

                &.active,
                &.highlight {
                    background: none;
                }

                &.highlight {
                    & a {
                        background: none;
                        color: #333;
                    }
                }

                &:hover {
                    & + li {
                        a {

                            &:before {
                                opacity: 0;
                            }
                        }
                    }

                    a {
                        background-color: #F3F3F3;
                        color: rgba(#262626, .8);
                    }
                }
            }

            a {
                display: block;
                background: none;
                color: rgba(#262626, .8);
                padding: 16px 16px;
                position: relative;
                transition: background-color .5s ease;

                &:before {
                    content: "";
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 10px;
                    width: calc(100% - 20px);
                    height: 1px;
                    background-color: #F3F3F3;
                    transition: opacity .5s ease;
                }

                &:hover {
                    background-color: #F3F3F3;
                    color: rgba(#262626, .8);
                }
            }
        }

        /deep/ .dropdown-menu {

            border: none;
        }

        &.open {
            opacity: 1;

            /deep/ .dropdown-toggle {
                border-color: transparent;
                opacity: 1;
                background-color: #fff;
                box-shadow: none;
                border-radius: 4px 4px 0 0;
                color: rgba(#262626, .6);

                &::after {
                    transform: rotate(180deg);
                }
            }

            /deep/ .vs__selected-options {
                opacity: 1;
                box-shadow: none;
            }

            /deep/ input {
                opacity: 1;
                box-shadow: none;
            }

            /deep/ .selected-tag {
                opacity: 1;
                box-shadow: none;
                color: rgba(#262626, .6);
            }

            border-radius: 4px 4px 0 0;
            // box-shadow: 0px 2px 50px rgba(0, 0, 0, 0.07);
        }
    }

    .content {
        position: relative;
        border-bottom: 1px solid rgba(214, 214, 214, 0.4);
        padding-bottom: 72px;

        &__box {
            padding-top: 24px;
            padding-bottom: 72px;
            // width:calc((((100% - 264px)/12 * 6) + (5 * 24px)));
            width: calc((((100% - 210px) / 12 * 7) + (5 * 24px)));
            padding-left: calc((100% / 12) + 2px);
        }

        &__h3 {
            @include kit('h3', 'dark');
            margin-bottom: 14px;
        }

        &__info {
            @include kit('p1', 'dark');
            text-align: left;
        }
    }

    .info-box {
        position: absolute;
        right: 220px;
        top: 38px;

        &__label {
            @include kit('h5 11 bold', 'dark');
            margin-bottom: 14px;
        }

        &__box {
            text-align: left;
        }

        &__link {
            display: block;
            @include kit('p1', 'dark');
            text-align: left;
        }
    }

    @media only screen and (max-width: 1200px) {
        .head {
            padding-top: 115px;
            padding-bottom: 108px;

            .wrapper {
                &:before {
                    content: "";
                    display: inline-block;
                    vertical-align: middle;
                    height: 100%;
                }
            }
        }
        .slider {
            height: 359px;
            width: calc((((100% - 420px) / 12 * 7) + (6 * 24px)));
            // margin-top: 32px;
        }

        .info {
            width: calc((((100% - 21px) / 12 * 4) + (3 * 24px)));
            margin-top: 0;
            margin-left: 34px;
            vertical-align: middle;
        }

        .back {
            left: 35px;
        }

        .info-box {
            right: 10px;
            top: 88px;

            &__label {
                margin-bottom: 19px;
            }
        }

        .content {
            width: 100%;

            &__box {
                width: 70%;
                padding-left: 0;
                padding-top: 77px;
            }

            &__h3 {
                font-size: 30px;
                margin-bottom: 16px;
            }
        }

        .previews {
            margin-left: -4px;
            margin-right: 28px;
            height: 192px;
            // margin-top: 46px;

            &__box {
                text-align: center;
            }

            &__item {
                display: inline-block;
            }
        }
    }

    @media only screen and (max-width: 960px) {
        .head {
            padding-bottom: 0;
        }

        .back {
            left: 32px;
        }

        .info {
            display: block;
            width: calc(100% + 80px);
            margin-left: -40px;
            margin-top: 81px;
            font-size: 0;
            letter-spacing: 0;

            &__title {
                display: inline-block;
                max-width: 348px;
                margin-bottom: 14px;
                vertical-align: top;
            }

            &__price {
                display: inline-block;
                width: calc(100% - 348px);
                text-align: right;
                margin-bottom: 14px;
                vertical-align: top;
            }

            &__brand {
                margin-bottom: 6px;
            }

            &__description {
                margin-top: 0;
                // max-width: 300px;
                max-width: 100%;
                font-size: 15px;
                line-height: 25px;
                margin-bottom: 35px;
            }

            &__container {
                max-width: 522px;
                margin: 0 auto;
            }

            &__more {
                margin-top: 18px;
                margin-bottom: 35px;
                margin-bottom: 0;
            }

            /deep/ #readmore {
                margin-top: 18px;
                margin-bottom: 22px;
            }

            &__barcode {
                padding-bottom: 37px;
            }

            &__box {
                margin-bottom: 28px;
            }

            &__wrapper {
                margin: 0 auto;
                max-width: 522px;

                &_white {
                    background-color: #fff;
                    max-width: 100%;
                    padding-top: 37px;
                }
            }
        }

        .price {

            &__number {
                margin-right: 3px;
            }
        }

        .previews {
            display: none;
            width: 100%;
            max-width: 341px;
            margin: 31px auto 0;
            height: auto;

            &__box {
                width: 100%;
            }

            &__item {
                width: 53px;
                height: 62px;
                vertical-align: top;
            }

            &_no-slider {
                .previews__item {
                    margin: 0 9px;
                }
            }

            &_tablet {
                display: block;
            }

            &_hidden {
                display: none;
            }

            /deep/ .swiper-button-next {
                position: absolute;
                top: 38px;
                left: calc(100% - -70px);
                right: auto;
                background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAxMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMSAxTDExIDExTDEgMjEiIHN0cm9rZT0iI0Q2RDZENiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==);
                background-size: auto 20px;
                background-position: center center;
                width: 30px;
                height: 30px;
                transition: opacity .5s ease;

                &:hover {
                    opacity: .7;
                }
            }

            /deep/ .swiper-button-prev {
                position: absolute;
                top: 38px;
                left: -102px;
                right: auto;
                background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAxMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTEgMUwxIDExTDExIDIxIiBzdHJva2U9IiNENkQ2RDYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=);
                background-size: auto 20px;
                background-position: center center;
                width: 30px;
                height: 30px;
                transition: opacity .5s ease;

                &:hover {
                    opacity: .7;
                }
            }
        }

        .slider {
            display: block;
            height: 520px;
            width: 100%;
            max-width: 468px;
            margin: 0 auto;
        }

        .head + .wrapper {
            max-width: 586px;
            padding: 0;
        }

        .content {
            border-bottom: 0;
            // min-height: 350px;
            margin-top: 74px;
            padding-bottom: 0;

            &__box {
                width: 100%;
                max-width: 100%;
                padding-top: 74px;
                padding-bottom: 49px;
                display: none;
            }

            &__info {
                line-height: 25px;
                font-size: 15px;
                letter-spacing: 0.02em;
            }

            &__h3 {
                font-size: 28px;
                letter-spacing: .2px;
                margin-bottom: 9px;
            }
        }

        .info-box {
            position: static;

            &__label {
                letter-spacing: .04em;
                font-size: 14px;
                margin-bottom: 13px;
            }

            &__link {
                line-height: 25px;
                font-size: 15px;
                letter-spacing: 0.02em;
            }
        }

        .info {
            margin-top: 69px;
        }
    }


    @media(max-width: 765px) {
        .image-zoom {
            display: none;
        }
    }

    @media only screen and (max-width: 960px) and (min-width: 651px) {
        .info {

            &__price {
                float: right;
            }
        }

        .price {

            &_old {
                text-align: left;
            }
        }
    }

    @media only screen and (max-width: 650px) {
        .head {
            padding-top: 0px;
            padding-bottom: 7px;
            padding-top: 67px;

            .wrapper {
                padding: 0 16px;
                max-width: 440px;
            }
        }

        .slider {
            height: 293px;
        }

        .previews {
            max-width: 240px;
            margin: 10px auto 0;
        }

        .back {
            left: 16px;
        }

        .price {
            &__number {
                font-size: 17px;
            }
        }

        .info {
            margin-left: 0;
            margin-top: 41px;
            width: 100%;

            &__wish-container {
                opacity: 0;
                pointer-events: none;
            }

            &__price {
                display: block;
                width: 100%;
                text-align: left;
                margin-bottom: 36px;
            }

            &__title {
                margin-bottom: 14px;
            }

            &__barcode {
                font-size: 12px;
                padding-bottom: 6px;
            }

            &__box {
                padding-left: 11px;
                margin-bottom: 24px;
            }

            &__description {
                margin-bottom: 0px;
            }

            &__more {
                margin-bottom: 42px;
                margin-bottom: 0;
            }

            /deep/ #moreless {
                margin-bottom: 42px;
                margin-bottom: 0;
            }

            &__availability-container {

                &_left {
                    margin-left: -12px;
                }
            }

            &__wrapper {
                &_white {
                    background: none;
                }
            }
        }

        .content {
            border-bottom: 1px solid rgba(214, 214, 214, 0.4);
            padding-bottom: 25px;

            &__box {
                padding-top: 48px;
                padding-bottom: 42px;
            }

            &__h3 {
                letter-spacing: 0;
            }
        }

        .head + .wrapper {
            padding: 0 16px;
            max-width: 440px;
        }

        .modal-availability {

            &_left {
                left: 0;
            }
        }

        .content {
            margin-top: 51px;
        }
    }
</style>
