<template lang="pug">
	.modal(v-bind:class="{modal_active: isLoginModalActive}")
		.modal__container
			.modal__inner
				.modal__heading(v-if="title.length || subtitle.length")
					.modal__title {{ title }}
					.modal__subtitle {{ subtitle }}
				button.modal__close(@click="closeModal")
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="21.2959" height="1.01409" transform="matrix(0.703915 -0.710284 0.703915 0.710284 0 15.2798)" fill="#0f0f0f"/>
						<rect width="21.2959" height="1.01409" transform="matrix(0.703915 0.710284 -0.703915 0.710284 1.00781 0)" fill="#0f0f0f"/>
					</svg>

				block-login
</template>

<script>

	import Lang from '../../../components/lang.vue';
	import $store from '../../../components/store';
	import BlockLogin from '../../../blocks/login/login.vue';

	export default {
		name: 'block-login-modal',
		data: function(){
			return {
				
			}
		},
		mixins: [Lang],
		methods: {
			closeModal() {
				$store.commit('setLoginModalActive', false);
			}
		},
		computed: {
			isLoginModalActive() {
				return $store.state.isLoginModalActive;
			},
			title() {
				return $store.state.loginModalTitle;
			},
			subtitle() {
				return $store.state.loginModalSubtitle;
			}
		},
		components: {
			'block-login': BlockLogin
		},
		watch: {
			'$route' () {

			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/mixins.scss';
	@import '@/helpers/sass/kit.scss';
	

	.modal {
		font-size: 0;
		text-align: center;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.5);
		z-index: 10000;
		overflow: auto;
		pointer-events: none;
		opacity: 0;
		transition: opacity .5s ease;

		&__heading {
			margin-bottom: 40px;
			max-width: 380px;
		}

		&__title {
			@include kit('h2', 'dark');
		}

		&__subtitle {
			@include kit('p1', 'dark');
			margin-top: 5px;
		}

		&_active {
			opacity: 1;
			pointer-events: all;
		}

		/deep/ .login {
			margin-top: 0;
			margin-bottom: 0;
			padding-bottom: 0;
		}

		&__inner {
			display: block;
			background: #fff;
			padding: 64px 96px;
			margin: 100px 0;
			position: relative;
		}

		&__close {
			position: absolute;
			top: 28px;
			right: 28px;
			transition: opacity .5s ease;

			&:hover {
				opacity: .7;
			}
		}

		&:before {
			content: "";
			display: inline-block;
			vertical-align: middle;
			height: 100%;
		}

		&__container {
			display: inline-block;
			vertical-align: middle;
		}
	}

	@media screen and (max-width: 650px) {
		.modal {
			max-width: 100%;
			
			&__inner {
				padding: 40px 17px;
				max-width: calc(100% - 16px);
				margin: 80px auto;
			}

			&__close {
				width: 30px;
				height: 30px;
				top: 10px;
				right: 10px;
			}

			&__social {
				width: calc(50% - 8px);
				font-size: 0;

				&:after {
					left: calc(50% - 3px);
				}
			}
		}
	}

</style>