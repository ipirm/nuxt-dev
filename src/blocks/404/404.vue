<template lang="pug">
    .error
        .error__inner
            .error__content
                .error__title 404<br>Something went wrong
                .error__text Something went wrong. Page was not found
                router-link.error__link(:to="'/'+ (lang === langDefault ? '' : lang + '/')") BACK TO MAIN PAGE
</template>

<script>

    import Lang from '../../components/lang.vue';
	
	export default {
		name: 'page-404',
		data: function() {
			return {
                langDefault: window.config.langDefault
            }
		},
		props: {

        },
        mixins: [Lang],
		components: {
		},
		methods: {
			
		}
	}
</script>


<style lang="scss" scoped>

    @import '@/helpers/sass/kit.scss';

	.error {
        height: calc(100vh - 136px);
        margin-top: 136px;
        font-size: 0;
        background: url('../../assets/img/404_bg.png') center center;
        background-size: 1162px auto;

        &:before {
            content: "";
            display: inline-block;
            vertical-align: middle;
            height: 100%;
        }

        &__inner {
            display: inline-block;
            vertical-align: middle;
            width: 100%;
            text-align: center;
        }

        &__content {
            max-width: 700px;
            margin: auto;
        }

        &__title {
            font: 700 50px/64px 'Didot', Arial, Helvetica, sans-serif;
            color: #0f0f0f;
            margin-bottom: 6px;
        }

        &__text {
            @include kit('p1', 'dark');
            margin-bottom: 32px;
        }

        &__link {
            display: inline-block;
            @include ui('link', 'dark');
        }
    }

    @media only screen and (max-width: 1200px) {
        .error {
            height: calc(100vh - 63px);
            margin-top: 63px;
        }
    }

    @media only screen and (max-width: 640px) {
        .error {
            background-size: 837px auto;

            &__title {
                font-size: 32px;
                line-height: 41px;
                letter-spacing: -.4px;
                margin-bottom: 3px;
            }

            &__inner {
                margin-top: -13px;
            }
        }
    }

</style>

