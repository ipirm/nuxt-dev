<template lang="pug">
    .description
        .description__wrapper
            .description__title {{ content.subtitle ? content.subtitle : ''}}
            .description__content( v-html="content.description ? content.description : content.description")

</template>

<script>
	import Vue from 'vue';
	
	import $store from '../../components/store';
	import $api from '../../components/api.js';
	import Lang from '../../components/lang.vue';

	export default {
		name: 'about-description',
		data: function(){
			return {
				
			}
        },
        props: {
            content: Object
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
        margin-bottom: 96px;

        &__wrapper {
            width: 90%;
            max-width: 708px;
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

    @media(max-width: 1200px) {
        .description {
            margin-top: 75px;
            margin-bottom: 70px;

            &__wrapper {
                max-width: 750px;
            }

            &__title {
                max-width: 708px;
                margin: 0 auto;
            }
        }
    }

    @media(max-width:960px) {
        .description {
            margin-top: 68px;
            margin-bottom: 60px;

            &__wrapper {
                max-width: 522px;
            }

            &__title {
                max-width: 492px;
            }
        }
    }

    @media(max-width:650px) {
        .description {
            margin-top: 60px;
            margin-bottom: 24px;

            &__wrapper {
                max-width: 327px;
            }

            &__title {
                max-width: 303px;
                text-align: center;
            }

            &__content {
                /deep/ p{

                    &:last-child {
                        margin-top: 28px;
                    }
                }
            }
        }
    }

</style>