<template lang="pug">
    .poster
        .poster__bg(:style="{backgroundImage: 'url(' + (page.acf ? page.acf.bg.url : '') + ')'}")
        .poster__outer
            .poster__inner
                .poster__title(v-text="page.title ? page.title.rendered : ''")
</template>

<script>
	import Vue from 'vue';
	
	import $store from '../../../components/store';
	import $api from '../../../components/api.js';
	import Lang from '../../../components/lang.vue';

	export default {
		name: 'project-poster',
		data: function(){
			return {
				
			}
        },
        props: {
            page: Object
        },
		mixins: [Lang],
		mounted () {
            
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/kit.scss';

    .poster {
        position: relative;

        &__bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
        }

        &__outer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            font-size: 0;
            text-align: center;

            &:before {
                content: "";
                display: inline-block;
                vertical-align: middle;
                height: 100%;
            }
        }

        &__inner {
            display: inline-block;
            vertical-align: middle;
            max-width: 682px;
            width: 90%;
            margin-top: 124px;
        }

        &__title {
            color: #fff;
            font: 700 56px/72px 'Didot', Arial, Helvetica, sans-serif;
        }

        &:after {
            content: "";
            display: block;
            padding-top: 47.36%;
        }
    }

    @media(max-width: 1200px){
        .poster {
            height: 590px;

            &__title {
                max-width: 629px;
                margin: 0 auto;
                line-height: normal;
            }

            &__inner {
                margin-top: 38px;
            }
        }
    }

    @media(max-width: 960px){
        .poster {
            height: 640px;

            &__title {
                font-size: 48px;
                max-width: 570px;
                line-height: normal;
            }

            &__inner {
                margin-top: 20px;
            }
        }
    }

    @media(max-width: 650px){
        .poster {
            height: 667px;

            &__title {
                max-width: 339px;
                line-height: normal;
                text-align: center;
            }

            &__inner {
                margin-top: 17px;
                width: 81%;
            }
        }
    }

</style>