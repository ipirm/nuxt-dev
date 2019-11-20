<template lang="pug">
    .description
        .description__wrapper
            .description__title(v-text="page.acf ? page.acf.subtitle : ''")
            .description__content(v-html="page.acf ? page.acf.description : ''")
</template>

<script>
	import Vue from 'vue';
	
	import $store from '@/components/store';
	import $api from '@/components/api.js';
	import Lang from '@/components/lang.vue';

	export default {
		name: 'project-description',
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

    .description {
        text-align: center;
        margin-top: 93px;
        margin-bottom: 93px;

        &__wrapper {
            width: 90%;
            max-width: 730px;
            margin: auto;
        }

        &__title {
            font: 700 13px/25px 'Museo', Arial, Helvetica, sans-serif;
            color: #171717;
            text-transform: uppercase;
            letter-spacing: 1.27px;
        }

        &__content {
            font: 100 14px/24px 'Museo', Arial, Helvetica, sans-serif;
            color: #171717;
            letter-spacing: .47px;

            /deep/ p {
                margin: 23px 0;

                &:nth-child(1) {
                    margin-top: 17px;
                }
            }
        }
    }

    @media(max-width: 1200px){
        .description{
            margin-top: 75px;
            margin-bottom: 70px;

            &__wrapper {
                max-width: 750px;
            }

            &__title {
                font: 700 13px/25px 'Museo', Arial, Helvetica, sans-serif;
                max-width: 708px;
                letter-spacing: 0.1em;
                margin: 0 auto;
            }
        }
    }

    @media(max-width: 960px){
        .description {
            margin-top: 66px;
            margin-bottom: 61px;

            &__wrapper {
                max-width: 522px;
            }

            &__title {
                max-width: 492px;
                margin: 0 auto;
                line-height: 25px;
            }
        }
    }

    @media(max-width: 650px){
        .description {
            margin-top: 59px;
            margin-bottom: 59px;

            &__title {
                max-width: 303px;
                margin: 0 auto;
                font: 700 13px/25px 'Museo', Arial, Helvetica, sans-serif;
            }

            &__content {
                max-width: 327px;
                margin: 0 auto;
                line-height: 24px;

                /deep/ p {
                    margin: 10px 0;
                }
            }
        }

    }

</style>