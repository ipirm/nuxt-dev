<template lang="pug">
    transition(name="fade" mode="out-in")
        .box
            block-header
            //- interior-poster( :poster="interior")
            .poster( @mouseleave="card = -1")
                .poster__main-bg(:style="{backgroundImage: 'url(' + (interior.about ? interior.about.bg.url : '') + ')'}"  :class="{vis: desk && card == 0}")
                .poster__main-bg(:style="{backgroundImage: 'url(' + (interior.portfolio ? interior.portfolio.bg.url : '') + ')'}" :class="{vis: desk && card == 1}")
                .poster__main-bg(:style="{backgroundImage: 'url(' + (interior.our_stores ? interior.our_stores.bg.url : '') + ')'}" :class="{vis: desk && card == 2}")
                .poster__body
                    router-link(to="/about" ).poster__col
                        .container(  @mouseenter="card = 0, showCard()" )
                            .poster__bg(:style="{backgroundImage: 'url(' + (interior.about ? interior.about.bg.url : '') + ')'}" :class="{hid: card != -1}" )
                            .poster__content( :class="{mute: card != -1 && card != 0 }")
                                span.poster__num 01
                                .poster__title( v-if="mobile" ) {{ interior.about ? interior.about.title : '' }}
                                .poster__title( v-else, v-html="interior.about ? (interior.about.title.split(' ')[0] +'</br>'+ interior.about.title.split(' ')[1]) : ''" )
                                a(href="/about").poster__more( :class="{hid: card != -1 && card != 0}") Discover more
                    router-link(to="/interior/portfolio"  ).poster__col
                        .container(  @mouseenter="card = 1, showCard()" )
                            .poster__bg(:style="{backgroundImage: 'url(' + (interior.portfolio ? interior.portfolio.bg.url : '')  + ')'}" :class="{hid: card != -1}" )
                            .poster__content( :class="{mute: card != -1 && card != 1 }")
                                span.poster__num 02
                                .poster__title( v-if="mobile" ) {{ interior.portfolio.title }}
                                .poster__title( v-else, v-html="interior.portfolio ? (interior.portfolio.title.split(' ')[0] +'</br>'+ interior.portfolio.title.split(' ')[1]) : ''" ) 
                                a(href="/interior/portfolio").poster__more( :class="{hid: card != -1 && card != 1}") Discover more
                    router-link(to="/interior/stores").poster__col
                        .container( @mouseenter="card = 2, showCard()")
                            .poster__bg(:style="{backgroundImage: 'url(' + (interior.our_stores ? interior.our_stores.bg.url : '') + ')'}" :class="{hid: card != -1}"  )
                            .poster__content( :class="{mute: card != -1 && card != 2 }")
                                span.poster__num 03
                                .poster__title( v-if="mobile" ) {{ interior.our_stores ? interior.our_stores.title : '' }}
                                .poster__title( v-else, v-html="interior.our_stores.title.split(' ')[0] +'</br>'+ interior.our_stores.title.split(' ')[1]" ) 
                                a(href="/interior/stores").poster__more( :class="{hid: card != -1 && card != 2}") Discover more
            block-footer(tabletFullScreen = true)
</template>

<script>
import Lang from '@/components/lang.vue';
import BlockHeader from '../blocks/includes/header/header.vue';
import BlockFooter from '../blocks/includes/footer/footer.vue';

import Poster from '../blocks/interior/poster/poster.vue';

import $store from '../components/store';
import $api from '../components/api';

export default {
    name: 'Interior',
    data: function(){
        return {
            mobile: window.innerWidth < 960,
            langDefault: window.config.langDefault,
            card: -1,
            desk: window.innerWidth > 960,
        }
    },
    components: {
        'block-header': BlockHeader,
        'block-footer': BlockFooter,
        'interior-poster': Poster,
        'lang': Lang
    },
    created(){
        if(!this.interior.length) $api.interior.get();
        // $api.interior.get();
    },
    computed: {
        interior() {
            return $store.state.interior;
        }
    },
    methods: {
        getWidth: function() {
			if( window.innerWidth < 960) {
                this.mobile = true;
                this.desk = false;
			} else {
                this.mobile = false;
                this.desk = true;
			} 		
        },
    },
    mixins: [Lang],
    updated() {
        window.addEventListener('resize', function() {
            this.getWidth();
        });
        
    },
    mounted() {
        console.log(this.interior);
    }
}
</script>

<style lang="scss" scoped>
    @import '@/assets/sass/ui.scss';
    .poster {
        position: relative;
        min-height: 100vh;
        background-color: #000;
        z-index: 0;

        &__main-bg {
            position: absolute;
            z-index: -1;
            width: 100%;
            height: 100%;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            opacity: 0;
            transition: all .5s ease;

            &:before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.5);
            }
        }

        &__body {
            display: flex;
            width: 100%;
            height: 1161px;
            margin-bottom: -302px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
        }

        &__col {
            height: 100%;
            width: 33.333%;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            padding-top: 393px;
            position: relative;
            z-index: 1;
        }

        &__bg{
            position: absolute;
            z-index: -1;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            transition: .5s all ease;

            &:before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.5);
            }
        }

        &__content {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            transition: .5s all ease;
        }

        &__num {
            font-family: 'Museo';
            font-size: 11px;
            line-height: 17px;
            letter-spacing: 0.04em;
            color: #fff;
            margin-bottom: 20px;
        }

        &__title {
            font-family: 'Didot';
            font-size: 56px;
            line-height: normal;
            text-align: center;
            color: #fff;
        }

        &__more {
            opacity: 0;
            transition: .5s all ease;
            text-transform: uppercase;
            padding-bottom: 2px;
            border-bottom: 1px solid #fff;
            color: #fff;
            font-family: 'Museo';
            font-size: 11px;
            line-height: 17px;
            text-align: center;
            letter-spacing: 0.04em;
            margin-top: 19px;
        }
    }

    .vis {
        opacity: 1;
        transition: all .5s ease;
        // z-index: -1;
    }

    .hid {
        opacity: 0;
        transition: all .5s ease;
    }

    .mute {
        opacity: .26;
        transition: all .5s ease; 
    }

    .hidden {
        opacity: 0;
    }

    @media(max-width: 1200px){
        .poster {

            &__body {
                height: 1140px;
                margin-bottom: -380px;
            }

            &__col {
                padding-top: 338px;
            }

            &__num {
                margin-bottom: 16px;
            }
        }
    }

    @media(max-width: 960px){
        .poster {

            &__body {
                flex-direction: column;
                height: auto;
                margin-bottom: 0;
            }

            &__col {
                padding-top: 110px;
                width: 100%;
                height: 322px;

                &:first-child {
                    height: 380px;
                    padding-top: 168px;
                }
            }

            &__num {
                margin-bottom: 8px;
            }
        }
    }

    @media(max-width: 650px){
        .poster {
            margin-bottom: -10px;

            &__col {
                height: 208px;
                padding-top: 65px;

                &:first-child {
                    height: 208px;
                    padding-top: 65px;
                    margin-top: 44px;
                }
            }

            &__num {
                margin-bottom: 4px;
            }

            &__title {
                font-size: 40px;
            }
        }
    }
</style>


