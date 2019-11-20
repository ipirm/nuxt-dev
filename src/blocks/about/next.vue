<template lang="pug">
	.next
		.next__outer
			.next__inner
				.next__label Next section
				.next__title Bureau portfolio
				router-link.next__link(to='/interior/portfolio') GO TO PAGE
</template>

<script>
	import Vue from 'vue';
	
	import $store from '../../components/store';
	import $api from '../../components/api.js';
	import Lang from '../../components/lang.vue';

	export default {
		name: 'about-next',
		data: function(){
			return {
				
			}
		},
		mixins: [Lang],
		mounted () {
			
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/kit.scss';

	.next {
		height: 665px;
		margin-bottom: -302px;
		background: url('../../assets/uploads/about-next.png') no-repeat center center;
		background-size: cover;
		margin-top: 62px;
		position: relative;

		&:after {
			content: "";
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(180deg, rgba(0, 0, 0, 0.264) 4.32%, rgba(0, 0, 0, 0) 51.94%), linear-gradient(0deg, rgba(0, 0, 0, 0.66), rgba(0, 0, 0, 0.66))
		}

		&__label {
			font: 11px/17px 'Museo', Arial, Helvetica, sans-serif;
			color: #fff;
			letter-spacing: .35px;
		}

		&__title {
			font: 60px/1 'Didot', Arial, Helvetica, sans-serif;
			color: #fff;
			letter-spacing: 1px;
			margin-top: 3px;
		}

		&__link {
			font: 11px 'Museo', Arial, Helvetica, sans-serif;
			color: #fff;
			letter-spacing: .5px;
			text-transform: uppercase;
			border-bottom: 1px solid #fff;
			padding-bottom: 1px;
			margin-top: 44px;
			display: inline-block;
			transition: opacity .5s ease;

			&:hover {
				opacity: .7;
			}
		}

		&__outer {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 302px;
			z-index: 1;
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
			max-width: 90%;
			margin-top: 70px;
		}
	}

	@media(max-width:1200px) {
		.next {
			&__title {
				font-size: 32px;
				line-height: 32px;
				letter-spacing: 0;
			}

			&__inner {
				margin-top: 61px;
			}

			&__link {
				margin-top: 23px;
			}
		}
	}

</style>