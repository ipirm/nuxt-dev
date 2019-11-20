<template lang="pug">
    .poster( @mouseleave="card = -1")
        .poster__main-bg(:style="{backgroundImage: 'url(' + (poster.about ? poster.about.bg.url : '') + ')'}"  :class="{vis: desk && card == 0}")
        .poster__main-bg(:style="{backgroundImage: 'url(' + (poster.portfolio ? poster.portfolio.bg.url : '') + ')'}" :class="{vis: desk && card == 1}")
        .poster__main-bg(:style="{backgroundImage: 'url(' + (poster.our_stores ? poster.our_stores.bg.url : '') + ')'}" :class="{vis: desk && card == 2}")
        .poster__body
            router-link(to="/about" ).poster__col
                .container(  @mouseenter="card = 0, showCard()" )
                    .poster__bg(:style="{backgroundImage: 'url(' + (poster.about ? poster.about.bg.url : '') + ')'}" :class="{hid: card != -1}" )
                    .poster__content( :class="{mute: card != -1 && card != 0 }")
                        span.poster__num 01
                        .poster__title( v-if="mobile" ) {{ poster.about ? poster.about.title : '' }}
                        .poster__title( v-else, v-html="poster.about ? (poster.about.title.split(' ')[0] +'</br>'+ poster.about.title.split(' ')[1]) : ''" )
                        a(href="/about").poster__more( :class="{hid: card != -1 && card != 0}") Discover more
            router-link(to="/interior/portfolio"  ).poster__col
                .container(  @mouseenter="card = 1, showCard()" )
                    .poster__bg(:style="{backgroundImage: 'url(' + (poster.portfolio ? poster.portfolio.bg.url : '')  + ')'}" :class="{hid: card != -1}" )
                    .poster__content( :class="{mute: card != -1 && card != 1 }")
                        span.poster__num 02
                        .poster__title( v-if="mobile" ) {{ poster.portfolio.title }}
                        .poster__title( v-else, v-html="poster.portfolio ? (poster.portfolio.title.split(' ')[0] +'</br>'+ poster.portfolio.title.split(' ')[1]) : ''" ) 
                        a(href="/interior/portfolio").poster__more( :class="{hid: card != -1 && card != 1}") Discover more
            router-link(to="/interior/stores").poster__col
                .container( @mouseenter="card = 2, showCard()")
                    .poster__bg(:style="{backgroundImage: 'url(' + (poster.our_stores ? poster.our_stores.bg.url : '') + ')'}" :class="{hid: card != -1}"  )
                    .poster__content( :class="{mute: card != -1 && card != 2 }")
                        span.poster__num 03
                        .poster__title( v-if="mobile" ) {{ poster.our_stores ? poster.our_stores.title : '' }}
                        .poster__title( v-else, v-html="poster.our_stores.title.split(' ')[0] +'</br>'+ poster.our_stores.title.split(' ')[1]" ) 
                        a(href="/interior/stores").poster__more( :class="{hid: card != -1 && card != 2}") Discover more
</template>

<script>

import Lang from '../../../components/lang.vue';

export default {
    name: 'interior-poster',
    data: function(){
        return {
            mobile: window.innerWidth < 960,
            card: -1,
            desk: window.innerWidth > 960,
            langDefault: window.config.langDefault
        }
    },
    computed: {
        
    },
    props: {
        poster: Object
    },
    methods: {
        // setBackground(index){
        //     let col = document.getElementsByClassName('poster__bg'),
        //         bg = document.getElementsByClassName('poster__main-bg'),
        //         content = document.getElementsByClassName('poster__content'),
        //         more = document.getElementsByClassName('poster__more');

        //     for(let i = 0; i < col.length; i++){
        //         // col[i].style.opacity = 0;
        //         // bg[i].style.opacity = 0;
        //         // bg[i].style.transition = '1s all ease';
        //         // content[i].style.opacity = 0.26;
        //         // more[i].style.opacity = 0;

        //         col[i].classList.add('hid');
        //         bg[i].classList.add('hid');
        //         content[i].classList.add('mute');
        //         more[i].classList.add('hid');
                
        //     }
        //     // bg[index].style.opacity = 1;
        //     // bg[index].style.transition = 'opacity .5s all ease';
        //     // content[index].style.opacity = 1;
        //     // more[index].style.opacity = 1;

        //     bg[index].classList.add('vis');
        //     content[index].classList.add('vis');
        //     more[index].classList.add('vis');
            


        // },

        // clearBackground(){
        //     let bg = document.getElementsByClassName('poster__main-bg'),
        //         colBg = document.getElementsByClassName('poster__bg'),
        //         content = document.getElementsByClassName('poster__content'),
        //         more = document.getElementsByClassName('poster__more');

        //     for(let i = 0; i < bg.length; i++) {
        //         // bg[i].style.opacity = 0;
        //         colBg[i].style.opacity = 1;
        //         content[i].style.opacity = 1;
        //         more[i].style.opacity = 0;

        //         colBg[i].style.opacity = 1;
        //         content[i].style.opacity = 1;
        //         more[i].style.opacity = 0;
        //     }
        // },

        getWidth: function() {
			if( window.innerWidth < 960) {
                this.mobile = true;
                this.desk = false;
			} else {
                this.mobile = false;
                this.desk = true;
			} 		
        },
        showCard: function() {
            console.log(this.card);
        }
    
    },
    updated() {
        console.log(this.poster);
        // if (this.poster.about != undefined) {
        //     let col = document.getElementsByClassName('poster__col'),
        //         that = this;

        //     for(let i = 0; i < col.length; i++){
        //         col[i].addEventListener('mouseover', function(){
        //             if(window.innerWidth > 960){
        //                 that.setBackground(i);
        //             }
        //         });
        //         col[i].addEventListener('mouseleave', function(){
        //             that.clearBackground();
        //         })
        //     }

        window.addEventListener('resize', function() {
            this.getWidth();

            // if(window.innerWidth < 960) {
            //     that.clearBackground();
            // }  
        });
        //}
    },
    mixins: [Lang],
    mounted(){
        

        
    }
}
</script>

<style lang="scss" scoped>

    .poster {
        position: relative;
        display: block;
        min-height: 100vh!important;
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
            min-height: 100vh;
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


