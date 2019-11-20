<template lang="pug">
    .gallery
        block-cursor
        .gallery__body
            router-link.gallery__item(v-for="(card, index) in list" :key="index" :to="getUrl((lang === langDefault ? '' : '/'+lang) + ('/interior/portfolio/' + card.slug))" :style="{backgroundImage: 'url(' + (card.acf ? card.acf.bg.sizes.medium_large : '') + ')'}")
                .gallery__bg
                .gallery__hover-item
                    .gallery__content--hover
                        .gallery__name(v-text="card.title ? card.title.rendered : ''")
                        .gallery__desc(v-html="card.acf ? card.acf.short_description : ''")
</template>

<script>
// import Vue from 'vue';
	
// import $store from '@/components/store';
// import $api from '@/components/api.js';
import Lang from '@/components/lang.vue';

import Cursor from '@/blocks/includes/cursor/cursor.vue';

export default {
    name: 'portfolio-gallery',
    data: function(){
        return {
            langDefault: window.config.langDefault,
		}
    },
    props: {
        list: Array
    },
    mixins: [Lang],
    components: {
		'block-cursor': Cursor,
    },
    methods: {
        getUrl(url) {
            return url;
        }
    },
    mounted() {
        var cursor = {
            data:{
                x:0,
                y:0,
                centerX:0,
                centerY:0, 
            },
        };

        let gallery = document.getElementsByClassName('gallery')[0],
            customCursor = document.getElementsByClassName('custom-cursor')[0];

        cursor.data.centerX = customCursor.clientWidth / 2;
        cursor.data.centerY = customCursor.clientHeight / 2;

        gallery.addEventListener('mousemove', function(e){
            customCursor.style.top = e.clientY - gallery.getBoundingClientRect().top - cursor.data.centerX + 'px';
            customCursor.style.left = e.clientX - gallery.getBoundingClientRect().left - cursor.data.centerY + 'px';
            customCursor.style.opacity = 1;
        });

        gallery.addEventListener('mouseleave', function(){
            customCursor.style.opacity = 0;
        });
    }
}
</script>

<style lang="scss" scoped>
    .gallery {
        position: relative;
        width: 100%;
        min-height: 100vh;

        &__body {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
        }

        &__item {
            height: 344px;
            width: 100%;
            overflow: hidden;
            background-repeat: no-repeat;
			background-position: center;
			background-size: cover;
            cursor: none !important;
            position: relative;
            transition: .3s all ease;

            &:hover {
                .gallery__hover-item {
                    background-color: rgba(0,0,0,0.5);
                }

                .gallery__content--hover {
                    bottom: 35px;
				}
            }
        }

        &__hover-item {
            display: flex;
            justify-content: space-between;
            padding: 35px;
            height: 100%;
            width: 100%;
            background-color: transparent;
            transition: .3s all ease;
        }

        &__content {

            &--hover {
                $padding: 35px;

				position: absolute;
				left: $padding;
				bottom: -18px;
				right: $padding;
				align-self: flex-end;
				opacity: 1;
				transition: .3s all ease;
			}
        }

        &__name {
            font-size: 24px;
            line-height: normal;
            color: #fff;
            font-family: 'Didot'; 
        }

        &__desc {
            color: #fff;
            font-family: 'Museo';
            font-weight: 100;
            font-size: 14px;
            line-height: 24px;
            letter-spacing: 0.034em;
            margin-top: 20px;

            /deep/ p {
                margin: 0;
            }
        }
    }

    @media(max-width: 1200px){
        .gallery {

            &__item {
                height: 245px;
            }

            &__hover-item {
                padding: 24px;
            }

            &__name {
                height: 23px;
                margin-bottom: 0;
            }

            &__content {
                left: 24px;
                right: 24px;
                bottom: 24px;

                &--hover {
                    left: 24px;
                    right: 24px;
                    bottom: -18px;
                }
            }
        }
    }

    @media(max-width: 960px){
        .gallery {

            &__body {
                grid-template-columns: repeat(2, 1fr);
            }

            &__item {
                height: 276px;
            }

            &__hover-item {
                padding: 24px;
            }

            &__name {
                height: 23px;
                margin-bottom: 0 !important;
            }
        }
    }

    @media(max-width: 650px){
        .gallery {
            margin-bottom: 0;
            height: auto;

            &__body {
                grid-template-columns: 1fr;
            }

            &__item{
                height: 276px;
                background-repeat: no-repeat;
                background-size: cover;

                &:hover {
                    .gallery__hover-item {
                        background-color: inherit;
                    }
                }
            }

            &__hover-item {
                padding: 30px;
            }

            &__desc {
                display: flex;
                line-height: normal;
                margin-top: 12px;
            }

            &__content {
                left: 30px;
                right: 30px;
                bottom: 30px;
                opacity: 0;

				&--hover {
                    left: 30px;
                    right: 30px;
                    bottom: 30px;
                    opacity: 1;
				}
			}
        }
    }
</style>


