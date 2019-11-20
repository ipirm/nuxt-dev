<template lang="pug">
	
	.subscribe(:style="{ backgroundImage:'url('+subscribeBox+')'}")
		.subscribe__box
			.content.subscribe__content
				h2.h2.subscribe__h2 {{ $lang.home.subscribe.title }}
				.label.subscribe__label {{ $lang.home.subscribe.description }}
				.input.subscribe__input
					.success(v-if="loading")
						img.success__check.success__check_animate(src="@/assets/img/loading.svg")
						.success__text {{ $lang.subscribe.wait }}
					.success(v-else-if="sended")
						img.success__check(src="@/assets/img/subscribe.svg")
						.success__text {{ $lang.subscribe.success }}
					form.subscribe__form(@submit.prevent="submit()" v-else)
						v-input(v-model="email", :label="$lang.subscribe.placeholder" :type="'text'"  :autocomplete="'off'" :name="'email'")
						button.subscribe__button {{ $lang.subscribe.submit }}
</template>

<script>
	import $api from '../../../components/api.js';
	import Lang from '../../../components/lang.vue';
	import subscribeBox from '@/assets/uploads/subscribe-box.jpg';
	import vInput from '../../../components/input';
	import Vue from 'vue';

	export default {
		name: 'main-subscribe',
		data: function(){
			return {
				subscribeBox,
				email:'',
				loading: false,
				sended: false
			}
		},
		components: {
			'v-input': vInput
		},
		mixins: [Lang],
		methods:{
			submit() {
				let $this = this;

				var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if (re.test(String($this.email).toLowerCase())) {
					$this.loading = true;
					$api.subscribe($this.email, function() {
						$this.email = '';
						$this.loading = false;
						$this.sended = true;

						setTimeout(function() {
							$this.sended = false;
							$this.loading = false;
						}, 5000);
					});
				} else {
					Vue.notify({
						group: 'notify',
						type: 'error',
						title: window.error_title,
						text: $this.$lang.subscribe.email_error,
						duration: 10000
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/mixins.scss';
	@import '@/helpers/sass/kit.scss';

	.success {
		height: 25px;
		text-align: center;
		position: relative;

		&__check {
			margin-top: -25px;

			&_animate {
				animation: loading 1s linear infinite;
			}
		}
		
		&__text {
			@include kit('p1', 'white');
			margin-top: 14px;
		}

		@keyframes loading {
			from {
				transform: rotate(0deg);
			}

			to {
				transform: rotate(360deg);
			}
		}
	}

	.wrapper {
		width: 100%;
		padding-left: 48px;
		padding-right: 48px;
		max-width: calc(1344px + 48px*2);
		margin: 0 auto;
		box-sizing: border-box;
	}

	.content {
		display: inline-block;
		vertical-align: middle;
		width: 406px;
		margin-top: 1px;
	}

	.subscribe {
		width: 100%;
		height:760px;
		text-align: center;
		background-color: #0f0f0f;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		position: relative;
		margin-bottom: -386px;
		
		&::before {
			content: "";
			display: block;
			position: absolute;
			top: 0;
			left:0;
			width: 100%;
			height: 100%;
			background: rgba(38, 38, 38, 0.65);
		}
		&__h2 {
			@include kit('h2', 'white');
			margin-bottom: 6px;
		}
		&__label {
			@include kit('p1', 'white');
			max-width: 586px;
			margin: auto;
			margin-bottom: 72px;
		}

		&__form {
			position: relative;
			height: 25px;
			margin: auto;
			max-width: 412px;
		}
		&__box {
			position: absolute;
			left:0;
			top:0;
			text-align: center;
			width: 100%;
			height: 376px;
			@include vertical-align-middle;
		}
		&__button {
			outline: none;
			@include kit('h6 500', 'white');
			position: absolute;
			right: 5px;
			top: 7px;
			transition: opacity .5s ease;

			&:hover {
				opacity: .7;
			}
		}

		/deep/ .ui-input {
			input {
				background: transparent;
				color:#fff;
				border-bottom: 1px solid #fff;
				font-size: 13px;
			}

			.ui-input__name {
				color: #fff;
			}
		}
	}

	@media screen and (max-width: 1200px) {
		.subscribe {
			height: 780px;

			&__h2 {
				margin-bottom: 14px;
			}

			&__label {
				margin-bottom: 52px;
			}

			&__button {
				letter-spacing: 0.04em;
				top: 5px;
				right: 3px;
			}

			&__form {
				max-width: 307px;
			}
		}

		.content {
			margin-top: 50px;
		}
	}

	@media screen and (max-width: 850px) {
		.subscribe {
			height: 752px;

			&__h2 {
				margin-bottom: 9px;
			}

			&__label {
				margin-bottom: 35px;
			}

			&__form {
				max-width: 307px;
			}
		}

		.content {
			margin-top: 19px;
		}

		.ui-input {
			// width: 300px;
			margin-left: auto;
			margin-right: auto;
		}

		.success {
			&__check {
				margin-top: 0;
			}
		}
	}

	@media screen and (max-width: 680px) {
		.subscribe {
			height: 772px;
			margin-bottom: -406px;
		}
	}

	@media screen and (max-width: 650px) {
		.subscribe {
			height: 1269px;
			// margin-bottom: 0;

			&__label {
				margin-bottom: 27px;
			}

			&__button {
				top: 5px;
				right: 8px;
			}
		}

		.success {
			&__check {
				margin-top: 0px;
			}
		}

		.content {
			width: 100%;
			padding: 0 34px;
			margin-top: 116px;
		}

		.ui-input {
			width: 100%;
			max-width: 306px;
		}
	}

</style>