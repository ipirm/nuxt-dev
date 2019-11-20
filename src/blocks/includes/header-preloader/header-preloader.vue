<template lang="pug">	
	.preloader(:class="[preloader != 1 ? 'preloader_hide' : '']")
		.preloader__box
</template>

<script>
	import $store from '../../../components/store';

	export default {
		name: 'header-preloader',
		props: {
        },
        computed: {
			preloader() {
				return $store.state.headerPreloader;
			},
        },
        created() {
            this.fetchData();
        },
        methods:{
			fetchData() {
				if (Object.size($store.state.categories.data)) return;
                $store.commit("setHeaderPreloader", 1);
			}
		},
		mounted() {
            this.fetchData();
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/mixins.scss';
	@import '@/helpers/sass/kit.scss';

	.preloader {
		width: calc(100% - 26px * 2);
		height: 100%;
		position: absolute;
		top: 0;
		left: 50%;
		z-index: 1;
		transform: translateZ(1px) translate3d(-50%, 0, 1px);
		opacity: 1;
		pointer-events: all;
		transition: all 0.3s ease;

		&_hide {
			opacity: 0;
			pointer-events: none;
		}

		&__box {
			background: #0f0f0f url(../../../assets/img/header-preloader.svg) no-repeat;
			background-size: 100% auto;
			background-position: center top;
			width: 100%;
			height: 19px;
			position: absolute;
			left:0;
			top:50%;
            transform: translate3d(0,-50%,1px);
		}
	}
</style>