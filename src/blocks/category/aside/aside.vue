<template lang="pug">
    .aside
        .choosed(v-if="selectedFilters.length > 0")
            .aside__subtitle.choosed__subtitle {{ $lang.category.filters.you_choosed }}
            .choosed__box
                template(v-for="(card, index) in selectedFilters")
                    .choosed__item(@click="removeFilter(index)") {{card.label}}
            button.choosed__clear(@click="clearFilters()") {{ $lang.category.see_all }}

        .aside__subtitle {{ $lang.category.filters.category }}
        .aside__list
            .aside__box(v-if="$route.params.category == 'new-in'")
                router-link.aside__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') +'new-in/'" :class='{"aside__link_active": $route.params.subcategory == "" || $route.params.subcategory == undefined}') {{ $lang.category.filters.all_products }}
            .aside__box(v-else-if="$route.params.category == 'sale'")
                router-link.aside__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'sale/'" :class='{"aside__link_active": $route.params.subcategory == "" || $route.params.subcategory == undefined}') {{ $lang.category.filters.all_products }}
            .aside__box(v-else-if="$route.name == 'Brand'")
                router-link.aside__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') +'brand/' + $route.params.id + '/'" :class='{"aside__link_active": $route.params.subcategory == "" || $route.params.subcategory == undefined}') {{ $lang.category.filters.all_products }}
            .aside__box(v-else)
                router-link.aside__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') +$route.params.category+'/'" :class='{"aside__link_active": $route.params.subcategory == "" || $route.params.subcategory == undefined}') {{ $lang.category.filters.all_products }}
            template(v-if="$route.params.category == 'new-in'")
                .container.container_categories(:class="[containers.saleCategories || saleCategories.length <= 10 ? 'container_opened':'']")
                    template(v-for="s in saleCategories")
                        .aside__box(v-if="s.seo_url != 'new-in' && s.seo_url != 'popular'")
                            router-link.aside__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'new-in/' + s.seo_url" :class='{"aside__link_active": $route.params.subcategory == s.seo_url}') {{ s.name }}
                .more.aside__more(v-if="saleCategories.length > 10" v-bind:class="{'aside__more_less': containers.saleCategories}" @click="containers.avaliableCategories = !containers.saleCategories") {{ !containers.saleCategories ? $lang.category.filters.all_categories : $lang.category.filters.slide_up }}
            template(v-else-if="$route.params.category == 'sale'")
                .container.container_categories(:class="[containers.saleCategories || saleCategories.length <= 10 ? 'container_opened':'']")
                    template(v-for="s in saleCategories")
                        .aside__box
                            router-link.aside__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'sale/' + s.seo_url" :class='{"aside__link_active": $route.params.subcategory == s.seo_url}') {{ s.name }}
                .more.aside__more(v-if="saleCategories.length > 10" v-bind:class="{'aside__more_less': containers.saleCategories}" @click="containers.avaliableCategories = !containers.saleCategories") {{ !containers.saleCategories ? $lang.category.filters.all_categories : $lang.category.filters.slide_up }}
            template(v-else-if="$route.name == 'Brand'")
                .container.container_categories(:class="[containers.saleCategories || saleCategories.length <= 10 ? 'container_opened':'']")
                    template(v-for="s in saleCategories")
                        .aside__box(v-if="s.seo_url != 'new-in' && s.seo_url != 'popular'")
                            router-link.aside__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + 'brand/' + $route.params.id + '/' + s.seo_url" :class='{"aside__link_active": $route.params.subcategory == s.seo_url}') {{ s.name }}
                .more.aside__more(v-if="saleCategories.length > 10" v-bind:class="{'aside__more_less': containers.saleCategories}" @click="containers.avaliableCategories = !containers.saleCategories") {{ !containers.saleCategories ? $lang.category.filters.all_categories : $lang.category.filters.slide_up }}
            template(v-else)
                template(v-for="rootcategory in categories")
                    template(v-for="category in rootcategory.categories")
                        template(v-if="rootcategory.seo_url == activeCategory")
                            .aside__box(@click="getCategory(category.category_id)")
                                router-link.aside__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + rootcategory.seo_url+'/'+category.seo_url+'/'", :class='{"aside__link_active": $route.params.subcategory == category.seo_url}') {{ category.name }}
                        template(v-if="rootcategory.seo_url == activeCategory && $route.params.subcategory == category.seo_url && category.categories.length > 0")
                            .aside__box.aside__box_shift
                                router-link.aside__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + rootcategory.seo_url+'/'+category.seo_url+'/'", :class='{"aside__link_active": $route.params.subcategory == category.seo_url && !$route.params.deep}') {{ $lang.category.filters.all_products }}
                            .aside__box.aside__box_shift(v-for="c in category.categories", @click="getCategory(c.category_id)")
                                router-link.aside__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + rootcategory.seo_url+'/'+category.seo_url+'/'+c.seo_url+'/'", :class='{"aside__link_active": $route.params.deep == c.seo_url}') {{ c.name }}

                            .subcategory(v-if="category.categories.length", :class='[category.category_id == activeSubcategory ? "subcategory_active" : ""]')
                                .subcategory__box
                                    .aside__list
                                        .aside__box(@click="getCategory(category.category_id)")
                                            .aside__link(:class='[activeCategory == 0 ? "aside__link_active" : ""]') {{ $lang.category.filters.all_things }}
                                        .aside__box(v-for="subcategory in category.categories", @click="getSubcategory(subcategory.category_id)")
                                            router-link.aside__link(:to="'/'+ (lang === langDefault ? '' : lang + '/') + rootcategory.seo_url+'/'+category.seo_url+'/'+subcategory.seo_url+'/'", :class='[activeSubcategory == subcategory.category_id ? "aside__link_active" : ""]') *--- {{ subcategory.name }}

        template(v-if="$route.params.category != 'brand' && brands.length > 1 && $route.query.brands === undefined ")
            .aside__subtitle {{ $lang.category.filters.brand }}
            .aside__list
                .container(:class="[containers.brands ? 'container_opened':'']")
                    template(v-for="(brand, index) in getItemBrands()")
                        .aside__box(v-if="brand.manufacturer && filter.brand.indexOf(brand.manufacturer_id) < 0")
                            .aside__link.aside__link_capitalize(@click="addFilter('brand', brand.manufacturer_id, brand.manufacturer, index)") {{ brand.manufacturer }}
                .more.aside__more(v-if="brands.length > 10 && countFilters.brand != brands.length && brands.length - countFilters.brand > 10" v-bind:class="{'aside__more_less': containers.brands}"  @click="toggleSize('brands')") {{ !containers.brands ? $lang.category.filters.all_brands : $lang.category.filters.slide_up }}
                .label-empty(v-if="countFilters.brand == brands.length") {{ $lang.category.filters.brands_selected }}

        template(v-if="colors.length > 1 && getItemColors().length >= 2")
            .aside__subtitle {{ $lang.category.filters.color }}
            .aside__list
                .container(:class="[containers.colors ? 'container_opened':'']")
                    template(v-for="(color, index) in getItemColors()")
                        .color.aside__color(v-if="color.length && filter.color.indexOf(color) < 0" @click="addFilter('color', color, color, index)" )
                            .color__pin(:style="{background:getColor(color.toLowerCase())}")
                            .color__label {{ color }}
                .more.aside__more(v-if="colors.length > 10 && getItemColors().length >= 10 && countFilters.color != colors.length && colors.length - countFilters.color > 10" v-bind:class="{'aside__more_less': containers.colors}" @click="toggleSize('colors')") {{ !containers.colors ? $lang.category.filters.all_colors : $lang.category.filters.slide_up }}
                .label-empty(v-if="countFilters.color == colors.length") {{ $lang.category.filters.colors_selected }}

        template(v-if="sizes.length > 1 && getItemSizes().length >= 2")
            .aside__subtitle {{ $lang.category.filters.size }}
            .aside__list
                .container.container_sizes(:class="[containers.sizes ? 'container_opened':'']")
                    template(v-for="(size, index) in getItemSizes()")
                        .aside__box(v-if="size && filter.size.indexOf(size) < 0"  )
                            .aside__link(@click="addFilter('size', size, size, index)") {{ size }}
                .more.aside__more(v-if="sizes.length > 10 && getItemSizes().length >= 10 && countFilters.size != sizes.length && sizes.length - countFilters.size > 10" v-bind:class="{'aside__more_less': containers.sizes}" @click="toggleSize('sizes')") {{ !containers.sizes ? $lang.category.filters.all_sizes : $lang.category.filters.slide_up }}
                .label-empty(v-if="countFilters.size == sizes.length") {{ $lang.category.filters.sizes_selected }}

        template(v-if="collections.length > 1 && getItemsCat().length >= 2")
            .aside__subtitle {{ $lang.category.filters.collection }}
            .aside__list
                .container.container_collections(:class="[containers.collections ? 'container_opened':'']")
                    template(v-for="(c, index) in getItemsCat()")
                        .aside__box(v-if="c && filter.collection.indexOf(c) < 0")
                            .aside__link.aside__link_capitalize(@click="addFilter('collection', c, c, index)") {{ c }}
                .more.aside__more(v-if="collections.length > 10 && getItemsCat().length >= 10 && countFilters.collection != collections.length && collections.length - countFilters.collection > 10" v-bind:class="{'aside__more_less': containers.collections}"  @click="toggleSize('collections')") {{ !containers.collections ? $lang.category.filters.all_collections : $lang.category.filters.slide_up }}
                .label-empty(v-if="countFilters.collection == collections.length") {{ $lang.category.filters.collections_selected }}

</template>

<script>
    import Vue from 'vue';
    import subscribeBox from '@/assets/uploads/subscribe-box.jpg';

    import $api from '../../../components/api.js';
    import $store from '../../../components/store';
    import $colors from '../../../components/colors';

    import VueCollapse from 'vue2-collapse';
    import Lang from '../../../components/lang.vue';

    Object.size = function (obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    Vue.component('accordion', {
        props: ['theme',],

        template: `<div class="accordion">
			<div class="header" v-on:click="toggle" v-bind:class="{header_active: show}">
				<slot name="header">HINT</slot>
			</div>
			<transition name="accordion"
				v-on:before-enter="beforeEnter" v-on:enter="enter"
				v-on:before-leave="beforeLeave" v-on:leave="leave">
				<div class="body" v-show="show">
					<slot></slot>
				</div>
			</transition>
		</div>`,

        data() {
            return {
                show: false,
                cats: []
            }
        },

        methods: {
            toggle: function () {
                this.show = !this.show;
            },
            // enter: function(el, done) {
            //   $(el).slideDown(150, done);
            // },
            // leave: function(el, done) {
            //   $(el).slideUp(150, done);
            // },
            beforeEnter: function (el) {
                el.style.height = '0';
            },
            enter: function (el) {
                el.style.height = el.scrollHeight + 'px';
            },
            beforeLeave: function (el) {
                el.style.height = el.scrollHeight + 'px';
            },
            leave: function (el) {
                el.style.height = '0';
            }
        }
    });

    export default {
        props: ['dataColor'],
        name: 'category-aside',
        data: function () {
            return {
                active_color: true,
                filterType: {},
                windowWidth: 0,
                subscribeBox,
                subcategory: [],
                showedSubcategory: false,
                activeBrandCategory: 0,
                // activeSubcategory:-1,
                check: 0,
                avaliableCategories: [],
                saleCategories: [],
                selectedFilters: [],
                containers: {
                    sizes: false,
                    colors: false,
                    brands: false,
                    collections: false,
                    avaliableCategories: false,
                    saleCategories: false
                },
                countFilters: {
                    brand: 0,
                    color: 0,
                    size: 0,
                    collection: 0
                },
                langDefault: window.config.langDefault
            }
        },
        components: {},
        created() {
            var cats = this.categories;
            if (Object.size(cats)) {
                this.getCategories();
            }
        },
        mixins: [Lang],
        computed: {
            isMobileFiltersOpened() {
                var data = $store.state.isMobileFiltersOpened;
                return data == undefined ? false : data;
            },
            categories() {
                var data = $store.state.categories.data;
                return data == undefined ? {} : data;
            },
            products() {
                let data = $store.state.products.data;
                return data == undefined ? {} : data;
            },
            allProducts() {
                let data = $store.state.products.allData;
                return data == undefined ? {} : data;
            },
            colors() {
                var data = $store.state.products.attributes.attr13;
                return data == undefined ? {} : Array.from(data);
            },
            sizes() {
                var data = $store.state.products.attributes.attr15;
                let arr = [];
                if (data) {
                    arr = Array.from(data);
                    arr.sort(function (a, b) {
                        let hashA = a.split(' ');
                        let hashB = b.split(' ');
                        let aNum = hashA.length > 1 ? 1 : 0;
                        let bNum = hashB.length > 1 ? 1 : 0;
                        return hashA[aNum] == hashB[bNum] ? hashA[0] - hashB[0] : hashA[aNum] < hashB[bNum] ? -1 : 1;
                    });
                }
                return data == undefined ? {} : arr;
            },
            collections() {
                var data = $store.state.products.attributes.attr14;
                return data == undefined ? {} : Array.from(data);
            },
            brands() {
                var data = $store.state.products.brands;
                data = Object.keys(data).map(i => data[i]);
                return data == undefined ? false : data;
            },
            filter() {
                let data = $store.state.products.filter;
                return data == undefined ? {} : data;
            },
            brandFilter() {
                return $store.state.products.brandFilter;
            },
            activeCategory() {
                var data = $store.state.categories.active.category;
                return data == undefined ? 0 : data;
            },
            activeSubcategory() {
                var data = $store.state.categories.active.subcategory;
                return data == undefined ? 0 : data;
            }
        },
        mounted() {

            var th = this;
            this.windowWidth = window.innerWidth;

            window.addEventListener('resize', th.resizeHandler, false);
        },
        methods: {
            getItemColors() {
                let initial_data = [];
                let loc = this.$route.path.split('/');
                console.log('fjafajafj');
                console.log(this.$route.query.brands);
                if (loc.indexOf('new-in') === -1) {
                    if (loc[1] === 'en') {
                        Array.from(this.dataColor).forEach(function (item) {
                            if (initial_data.indexOf(item.attribute_groups[0].attribute[2].text) === -1) {
                                initial_data.push(item.attribute_groups[0].attribute[2].text);
                            }
                        });
                    } else if (loc[1] === 'ru') {
                        Array.from(this.dataColor).forEach(function (item) {
                            if (initial_data.indexOf(item.attribute_groups[0].attribute[6].text) === -1) {
                                initial_data.push(item.attribute_groups[0].attribute[6].text);
                            }
                        });
                    } else {
                        Array.from(this.dataColor).forEach(function (item) {
                            if (initial_data.indexOf(item.attribute_groups[0].attribute[2].text) === -1) {
                                initial_data.push(item.attribute_groups[0].attribute[2].text);
                            }
                        });
                    }
                } else {
                    if (loc[1] === 'en') {
                        Array.from(this.dataColor).forEach(function (item) {
                            if (item.attribute_groups[0].attribute[3].text === "true") {
                                if (initial_data.indexOf(item.attribute_groups[0].attribute[2].text) === -1) {
                                    initial_data.push(item.attribute_groups[0].attribute[2].text);
                                }
                            }
                        });
                    } else if (loc[1] === 'ru') {
                        console.log('321111');
                        console.log(this.dataColor);
                        Array.from(this.dataColor).forEach(function (item) {
                            if (item.attribute_groups[0].attribute[1].text === "true") {
                                if (initial_data.indexOf(item.attribute_groups[0].attribute[6].text) === -1) {
                                    initial_data.push(item.attribute_groups[0].attribute[6].text);
                                }
                            }
                        });
                    } else {
                        Array.from(this.dataColor).forEach(function (item) {
                            if (item.attribute_groups[0].attribute[1].text === "true") {
                                if (initial_data.indexOf(item.attribute_groups[0].attribute[2].text) === -1) {
                                    initial_data.push(item.attribute_groups[0].attribute[2].text);
                                }
                            }
                        });
                    }
                }
                return initial_data
            },
            getItemsCat() {
                let initial_data = [];
                let loc = this.$route.path.split('/');
                if (loc.indexOf('new-in') === -1) {
                    if (loc[1] === 'ru') {
                        Array.from(this.dataColor).forEach(function (item) {
                            if (initial_data.indexOf(item.attribute_groups[0].attribute[2].text) === -1) {
                                initial_data.push(item.attribute_groups[0].attribute[2].text);
                            }
                        });
                    } else if (loc[1] === 'en') {
                        Array.from(this.dataColor).forEach(function (item) {
                            if (initial_data.indexOf(item.attribute_groups[0].attribute[1].text) === -1) {
                                initial_data.push(item.attribute_groups[0].attribute[1].text);
                            }
                        });
                    } else {
                        Array.from(this.dataColor).forEach(function (item) {
                            if (initial_data.indexOf(item.attribute_groups[0].attribute[3].text) === -1) {
                                initial_data.push(item.attribute_groups[0].attribute[3].text);
                            }
                        });
                    }
                } else {
                    if (loc[1] === 'en') {
                        Array.from(this.dataColor).forEach(function (item) {
                            if (item.attribute_groups[0].attribute[3].text === "true") {
                                if (initial_data.indexOf(item.attribute_groups[0].attribute[1].text) === -1) {
                                    initial_data.push(item.attribute_groups[0].attribute[1].text);
                                }
                            }
                        });
                    } else if (loc[1] === 'ru') {
                        Array.from(this.dataColor).forEach(function (item) {
                            if (item.attribute_groups[0].attribute[1].text === "true") {
                                if (initial_data.indexOf(item.attribute_groups[0].attribute[2].text) === -1) {
                                    initial_data.push(item.attribute_groups[0].attribute[2].text);
                                }
                            }
                        });
                    } else {
                        Array.from(this.dataColor).forEach(function (item) {
                            if (item.attribute_groups[0].attribute[1].text === "true") {
                                if (initial_data.indexOf(item.attribute_groups[0].attribute[3].text) === -1) {
                                    initial_data.push(item.attribute_groups[0].attribute[3].text);
                                }
                            }
                        });
                    }
                }
                return initial_data
            },
            getItemBrands() {
                let initial_data = [];
                let brands = [];
                Array.from(this.dataColor).forEach(function (item, index) {
                    if (Object.values(item).indexOf(item.manufacturer_id) > -1) {
                        initial_data.push(
                            {
                                manufacturer: item.manufacturer,
                                manufacturer_id: item.manufacturer_id,
                            });
                        console.log('Lol23293829');
                    }
                });
                function groupBy(list, keyGetter) {
                    const map = new Map();
                    list.forEach((item) => {
                        const key = keyGetter(item);
                        const collection = map.get(key);
                        if (!collection) {
                            map.set(key, [item]);
                        } else {
                            collection.push(item);
                        }
                    });
                    return map;
                }

                const grouped = groupBy(initial_data, pet => pet.manufacturer);
                Array.from(grouped).forEach(function (item) {
                    brands.push(item[1][0]);
                });
                console.log(brands);
                return brands
            },
            getItemSizes() {
                let initial_data = [];
                let loc = this.$route.path.split('/');
                if (loc.indexOf('new-in') === -1) {
                    if (loc[1] === 'en') {
                        Array.from(this.dataColor).forEach(function (item) {
                            if (initial_data.indexOf(item.attribute_groups[0].attribute[4].text) === -1) {
                                initial_data.push(item.attribute_groups[0].attribute[4].text);
                            }
                        });
                    } else if (loc[1] === 'ru') {
                        Array.from(this.dataColor).forEach(function (item) {
                            if (initial_data.indexOf(item.attribute_groups[0].attribute[3].text) === -1) {
                                initial_data.push(item.attribute_groups[0].attribute[3].text);
                            }
                        });
                    } else {
                        Array.from(this.dataColor).forEach(function (item) {
                            if (initial_data.indexOf(item.attribute_groups[0].attribute[4].text) === -1) {
                                initial_data.push(item.attribute_groups[0].attribute[4].text);
                            }
                        });
                    }
                } else {
                    if (loc[1] === 'ru') {
                        Array.from(this.dataColor).forEach(function (item) {
                            if (item.attribute_groups[0].attribute[1].text === "true") {
                                if (initial_data.indexOf(item.attribute_groups[0].attribute[3].text) === -1) {
                                    initial_data.push(item.attribute_groups[0].attribute[3].text);
                                }
                            }
                        });
                    } else if (loc[1] === 'en') {
                        Array.from(this.dataColor).forEach(function (item) {
                            if (item.attribute_groups[0].attribute[3].text === "true") {
                                if (initial_data.indexOf(item.attribute_groups[0].attribute[4].text) === -1) {
                                    initial_data.push(item.attribute_groups[0].attribute[4].text);
                                }
                            }
                        });
                    } else {
                        Array.from(this.dataColor).forEach(function (item) {
                            if (item.attribute_groups[0].attribute[1].text === "true") {
                                if (initial_data.indexOf(item.attribute_groups[0].attribute[4].text) === -1) {
                                    initial_data.push(item.attribute_groups[0].attribute[4].text);
                                }
                            }
                        });
                    }
                }
                return initial_data
            },
            toggleSize(type) {
                let val = !this.containers[type];
                this.containers = {
                    sizes: false,
                    colors: false,
                    brands: false,
                    collections: false,
                    avaliableCategories: false,
                    saleCategories: false
                };
                this.containers[type] = val;

                setTimeout(function () {
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
            resizeHandler() {
                this.windowWidth = window.innerWidth;
            },
            setBrandFilter(id) {
                if (!id) {
                    this.activeBrandCategory = 0;
                    $store.commit('setBrandFilter', 0);
                    return;
                }

                this.activeBrandCategory = id;

                $store.commit('setBrandFilter', id);
            },
            toggleFilters() {
                $store.commit('toggleMobileFilters');
            },
            addQuery(arr) {
                var types = {};

                arr.forEach(e => {
                    types[e.type] = [];
                });
                arr.forEach(e => {
                    types[e.type].push(e.id);
                });

                var queryTypes = [];
                types['color'] ? queryTypes['colors'] = (types['color']).join() : false;
                types['size'] ? queryTypes['sizes'] = (types['size']).join() : false;
                types['collection'] ? queryTypes['collections'] = (types['collection']).join() : false;
                types['brand'] ? queryTypes['brands'] = (types['brand']).join() : false;

                queryTypes = {...queryTypes};
                this.$router.replace({query: queryTypes});
            },
            parseQuery() {
                console.log("this.$route.query", this.$route.query);
                console.log("this.containers", this.containers);

                console.log("colors", this.colors);
                console.log("sizes", this.sizes);
                console.log("collections", this.collections);
                console.log("brands", this.brands);

                var th = this;
                this.$route.query.colors ? this.$route.query.colors.split(',').forEach(v => {
                    th.addFilter("color", this.colors[v], this.colors[v], v, true);
                }) : false;
                this.$route.query.sizes ? this.$route.query.sizes.split(',').forEach(v => {
                    th.addFilter("size", this.sizes[v], this.sizes[v], v, true);
                }) : false;
                this.$route.query.collections ? this.$route.query.collections.split(',').forEach(v => {
                    th.addFilter("collection", this.collections[v], this.collections[v], v, true);
                }) : false;
                this.$route.query.brands ? this.$route.query.brands.split(',').forEach(v => {
                    th.addFilter("brand", this.brands[v].manufacturer_id, this.brands[v].manufacturer, v, true);
                }) : false;
            },
            addFilter(key, value, label, id, noQuery) {
                var index = 0;
                var a = this.selectedFilters.find(function (item, i) {
                    if (item.type === key && item.value === value) {
                        index = i;
                        return true;
                    }
                });

                if (a != undefined) {
                    this.removeFilter(index);
                    Vue.set(this.countFilters, key, this.countFilters[key] - 1);
                    return;
                }

                $store.commit('addFilter', {key: key, value: value});
                var arr = this.selectedFilters;
                arr.push({value: value, label: label, type: key, id: id});
                this.selectedFilters = arr;
                window.scrollTo(0, 0);
                Vue.set(this.countFilters, key, this.countFilters[key] + 1);
                if (this.isMobileFiltersOpened) this.toggleFilters();


                !noQuery ? this.addQuery(arr) : false;
            },
            removeFilter(i) {
                var key = this.selectedFilters[i].type;
                var value = this.selectedFilters[i].value
                $store.commit('removeFilter', {key: key, value: value});
                this.selectedFilters.splice(i, 1);
                window.scrollTo(0, 0);
                Vue.set(this.countFilters, key, this.countFilters[key] - 1);

                this.addQuery(this.selectedFilters);

                if (this.isMobileFiltersOpened) this.toggleFilters();
            },
            clearFilters() {
                console.log(this.selectedFilters);
                console.log('Routerrr mineself');
                console.log(this.dataColor);
                this.$router.push(`${this.$route.path}`);
                this.selectedFilters = [];

                this.countFilters = {
                    brand: 0,
                    color: 0,
                    size: 0,
                    collection: 0
                };
                $store.commit('clearFilters');
                window.scrollTo(0, 0);
                if (this.isMobileFiltersOpened) this.toggleFilters();
            },
            getSubcategory(id) {
                this.activeSubcategory = id;
            },
            getCategory(id) {
                this.showedSubcategory = id;
                //$store.commit("setActiveCategory", id);
            },
            getColor(name, border) {
                // let color = border && $colors[name] == "#ffffff" ? '#ACAEB2' : $colors[name];
                if (name.indexOf(' ' > -1)) {
                    name = name.replace(' ', '_');
                }
                return $colors[name];
            },
            getCategories() {
                let th = this;
                this.check++;

                if (this.check > 1) {

                    let arr = [];
                    var ids = [];
                    let cats = this.categories;

                    delete cats.sale;
                    cats = Object.values(cats);

                    Object.values(this.products).forEach(function (item) {

                        item.category.forEach(function (cat) {

                            var slug = '';

                            Object.values(th.categories).forEach(function (v) {
                                if (v.category_id === cat.id) {
                                    slug = v.seo_url;
                                }
                            });

                            var h = {
                                id: cat.id,
                                name: cat.name,
                                slug: slug
                            };

                            if (ids.indexOf(cat.id) === -1) {
                                arr.push(h);
                                ids.push(cat.id);
                            }
                        });
                    });

                    let allArr = [];
                    let allIds = [];

                    Object.values(this.allProducts).forEach(function (item) {
                        item.category.forEach(function (cat) {

                            var slug = '';

                            Object.values(th.categories).forEach(function (v) {
                                if (v.category_id === cat.id) {
                                    slug = v.seo_url;
                                }
                            });

                            var h = {
                                id: cat.id,
                                name: cat.name,
                                slug: slug
                            };

                            if (allIds.indexOf(cat.id) === -1) {
                                allArr.push(h);
                                allIds.push(cat.id);
                            }
                        });
                    });

                    let readyCats = [];
                    cats.forEach(function (c) {
                        let h = allArr.find(function (a) {
                            return a.id === c.category_id;
                        });

                        if (h) {
                            readyCats.push(c);
                        }
                    });

                    this.avaliableCategories = arr;
                    this.saleCategories = readyCats;

                }
            }
        },
        beforeDestroy() {
            let th = this;
            window.removeEventListener('resize', th.resizeHandler, false);
        },
        watch: {
            categories() {
                var cats = this.categories;
                if (Object.size(cats)) {
                    this.getCategories();
                }
            },
            products() {
                var pr = this.products;
                if (Object.size(pr)) {
                    this.getCategories();
                    this.parseQuery();
                }
            },
            '$route'(to, from) {
                this.containers = {
                    sizes: false,
                    colors: false,
                    brands: false,
                    collections: false,
                    avaliableCategories: false,
                    saleCategories: false
                };
                if (to.params.category != from.params.category) {
                    this.clearFilters();
                }
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

    .container {
        overflow: hidden;
        max-height: 285px;

        &_sizes,
        &_categories,
        &_collections {
            max-height: 288px;
        }

        &_opened {
            // max-height: 800px;
            max-height: none;
        }
    }

    .label-empty {
        font-family: 'Museo';
        line-height: normal;
        font-size: 10px;
        letter-spacing: 0.08em;
        color: #454545;
        text-transform: lowercase;

        &:first-letter {
            text-transform: uppercase;
        }
    }

    .aside {
        width: 257px;
        height: auto;
        display: inline-block;
        vertical-align: top;
        padding-bottom: 76px;
        transform: translate3d(0, 0, 0);

        &__box {
            display: block;
            width: 100%;

            &_shift {
                margin-left: 16px;
            }

            &:last-child {
                .aside__link {
                    margin-bottom: 0;
                }
            }
        }

        &__subtitle {
            @include kit('h6 700', 'dark');
            margin-bottom: 18px;
        }

        &__list {
            margin-bottom: 31px;

            &:last-child {
                margin-bottom: 0;
            }
        }

        &__link {
            @include kit('h5', 'dark');
            text-transform: none;
            transition: all 0.3s ease;
            margin-bottom: 6px;
            display: block;
            cursor: pointer;
            position: relative;
            display: inline-block;
            text-transform: lowercase;

            &:first-letter {
                text-transform: uppercase;
            }

            &:before {
                content: "";
                display: block;
                position: absolute;
                bottom: 3px;
                left: 0px;
                width: 100%;
                height: 1px;
                background: #0f0f0f;
                opacity: 0;
                transform: scaleX(0);
                transform-origin: left center;
                transition: transform 0.6s ease, opacity 0.6s ease;
            }

            &_capitalize {
                text-transform: capitalize;

                &:first-letter {
                    text-transform: capitalize;
                }
            }

            &_active {
                &:before {
                    transform: scaleX(1);
                    opacity: 1;
                }
            }

            &:hover {
                opacity: 0.8;
            }
        }

        &__color {
            margin-bottom: 12px;
            @include kit('h5', 'dark');
            text-transform: none;
            transition: all 0.3s ease;

            &_active {
                .color {
                    &__pin {
                        position: relative;
                        border-width: 1px;

                        &:after {
                            content: "";
                            display: block;
                            position: absolute;
                            left: 0px;
                            top: 0px;
                            width: 17px;
                            height: 17px;
                            background: transparent;
                            border-radius: 50%;
                            border: 2px solid #fff;
                            box-sizing: border-box;
                        }
                    }
                }
            }
        }
    }

    .choosed {
        max-width: 168px;
        opacity: 0.6;
        margin-bottom: 40px;

        &__subtitle {
            margin-bottom: 14px;
        }

        &__clear {
            @include kit('h4 12px light', 'white');
            color: #00000B;
            text-decoration: underline;
            font-size: 10px;
            font-weight: 100;
            transition: opacity .5s ease;

            &:hover {
                opacity: .7;
            }
        }

        &__item {
            @include kit('h4 12px light', 'white');
            color: #454545;
            display: inline-block;
            padding-left: 11px;
            position: relative;
            margin-bottom: 9px;
            margin-right: 13px;
            cursor: pointer;
            transition: all 0.6s ease;

            &::before {
                content: "";
                display: block;
                width: 10px;
                height: 10px;
                background: url(../../../assets/img/icon-close.svg) no-repeat;
                position: absolute;
                left: 0;
                bottom: 0;
            }

            &:hover {
                color: #000;
            }
        }
    }

    .more {
        font-family: 'Museo';
        line-height: normal;
        font-size: 10px;
        letter-spacing: 0.08em;
        text-decoration-line: underline;
        color: #00000B;
        cursor: pointer;
        margin-top: 16px;

        &.aside__more_less {
            margin-top: 12px;
        }
    }

    .color {
        margin-bottom: 4px;
        display: block;
        cursor: pointer;

        &:last-child {
            margin-bottom: 0;
        }

        &:hover {
            opacity: 0.8;
        }

        &__pin {
            width: 19px;
            height: 19px;
            border-radius: 50%;
            display: inline-block;
            vertical-align: middle;
            margin-right: 8px;
            background: transparent;
            border: 1px solid #fff;
            position: relative;
        }

        &__border {
            display: none;
        }

        &__label {
            display: inline-block;
            vertical-align: middle;
            text-transform: lowercase;

            &:first-letter {
                text-transform: uppercase;
            }
        }
    }

    .subcategory {
        margin-left: 16px;
        opacity: 0.8;
        height: auto;
        max-height: 0px;
        overflow: hidden;
        position: relative;
        transition: all 0.6s ease;

        &__box {
            padding-top: 10px;
            padding-bottom: 16px;
        }

        &_active {
            height: auto;
            max-height: 600px;
        }

        .aside {
            &__link {
                margin-bottom: 4px;

                &::before {
                    bottom: 4px;
                }
            }
        }
    }

    .mobile-filters {
        display: none;
    }

    @media screen and (max-width: 1200px) {
        .container {
            overflow: visible;
        }

        .aside {
            display: none;
        }

        .mobile-filters {
            position: absolute !important;
            width: 100% !important;
            top: 97px !important;
            left: 0;
            z-index: 11;
            padding: 0 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-flow: column wrap;
            align-content: stretch;
            bottom: auto !important;

            text-align: left;

            // &__column {
            // 	width: 194px;
            // }

            &__outer {
                padding: 34px 32px;
                width: 100%;
                background-color: #F3F3F3;
                display: flex;
                justify-content: space-between;
                padding-right: 60px;
                box-shadow: 0px 2px 50px rgba(0, 0, 0, 0.07);
            }

            &__column {
                width: 194px;
            }
        }

        .color {

            &__pin {
                width: 15px;
                height: 15px;
            }

            &__border {
                display: block;
                position: absolute;
                left: -4px;
                top: -4px;
                width: 21px;
                height: 21px;
                background: transparent;
                border-radius: 50%;
                // border: 1px solid #000;
                box-sizing: border-box;
                opacity: 0;
                border-width: 1px;
                border-style: solid;
            }
        }

        .item {
            margin-bottom: 29px;

            &__title {
                @include kit('h6 700', 'dark');
                margin-bottom: 16px;
            }

            &__box {
                display: block;
                width: 100%;
            }

            &__list {
                margin-bottom: 39px;

                &:last-child {
                    margin-bottom: 0;
                }
            }

            &__link {
                @include kit('h5', 'dark');
                text-transform: none;
                transition: all 0.3s ease;
                margin-bottom: 6px;
                display: block;
                cursor: pointer;
                position: relative;
                display: inline-block;
                text-transform: lowercase;

                &:first-letter {
                    text-transform: uppercase;
                }

                &::before {
                    content: "";
                    display: block;
                    position: absolute;
                    bottom: 3px;
                    left: 0px;
                    width: 100%;
                    height: 1px;
                    background: #0f0f0f;
                    opacity: 0;
                    transform: scaleX(0);
                    transform-origin: left center;
                    transition: transform 0.6s ease, opacity 0.6s ease;
                }

                &.router-link-active {
                    &::before {
                        transform: scaleX(1);
                        opacity: 1;
                    }
                }

                &:hover {
                    opacity: 0.8;
                }

                &_selected {
                    text-decoration: underline;
                }
            }

            &__color {
                @include kit('h5', 'dark');
                margin-bottom: 6px;
                text-transform: none;
                transition: all 0.3s ease;

                &_active {
                    .color {
                        &__pin {
                            position: relative;
                            border-width: 1px;
                        }

                        &__border {
                            opacity: 1;
                        }
                    }
                }

                &_selected {
                    .color {
                        &__pin {
                            position: relative;
                            border-width: 1px;
                        }

                        &__border {
                            opacity: 1;
                        }
                    }
                }
            }
        }
    }

    @media screen and (max-width: 960px) {
        .mobile-filters {
            padding: 0 24px;
            top: 93px !important;

            &__outer {
                padding-right: 33px;
            }
        }
    }

    @media screen and (max-width: 650px) {
        .mobile-filters {
            width: 100% !important;
            margin-left: 0;
            top: 105px !important;
            padding: 0 16px;

            &__outer {
                display: block;
                padding: 7px 16px;
                padding-right: 16px;
            }

            &__column {
                width: 100%;
            }
        }

        .item {
            margin-bottom: 0;

            &__title {
                border-bottom: 1px solid rgba(#C4C4C4, .2);
                padding: 18px 8px 15px;
                margin-bottom: 0;
                position: relative;

                &:after {
                    content: "";
                    display: block;
                    position: absolute;
                    right: 7px;
                    top: 18px;
                    width: 10px;
                    height: 10px;
                    background: url('../../../assets/img/mobile-filters.svg') no-repeat center center;
                    transform: rotate(0);
                    transition: transform .3s ease;
                }
            }

            .header_active {
                .item__title {
                    &:after {
                        transform: rotate(180deg);
                    }
                }
            }

            &__content {
                padding: 13px 8px 0;
            }
        }
    }

</style>
