<template lang="pug">
	.team
		.team__head
			.team__title Team
			.team__subtitle Discover the brand that's right for you.
		.team__body
			.team__list( v-if="team.length" )
				.card( v-for="member in team" )
					.card__img( :style="{'background-image': 'url('+ member.photo.url +')'}")
					.card__title {{ member.name}}
					.card__subtitle {{ member.position }}
				button.card.card_join(@click="isModalActive = true")
					.card__img
						.card__outer
							.card__inner
								.card__label Join the team
								img.card__icon(src="@/assets/img/join.svg")
		.modal(:class="{'modal_active': isModalActive}")
			button.modal__close(@click="isModalActive = false") CLOSE
			.modal__inner
				.form
					.form__title Enter your details
					form.form__form
						.grid
							.grid__item
								v-input(v-model="firstname" :name="'firstname'" :type="'text'", :label="'First name'" :isValid="firstnameValid" @keyup="firstnameValid = true")
							.grid__item
								v-input(v-model="email" :name="'email'" :type="'text'", :label="'E-mail'" :isValid="emailValid" @keyup="emailValid = true")
							.grid__item
								v-input(v-model="lastname" :name="'lastname'" :type="'text'", :label="'Last name'" :isValid="lastnameValid" @keyup="lastnameValid = true")
							.grid__item
								v-input(v-model="phone" :name="'phone'" :type="'text'", :label="'Phone number'" :isValid="phoneValid" @keyup="phoneValid = true")
							.grid__item
								v-input(v-model="message" :name="'message'" :type="'text'", :label="'Your message'" :isValid="messageValid" @keyup="messageValid = true")
							.grid__item
								v-file(:label="'Add CV'" :name="'file'" :isValid="fileValid")
							.grid__item
								button.form__submit Send

</template>

<script>
	import Vue from 'vue';
	
	import $store from '../../components/store';
	import $api from '../../components/api.js';
	import Lang from '../../components/lang.vue';
	import vInput from '../../components/input';
	import vFile from '@/components/file';

	export default {
		name: 'about-team',
		data: function(){
			return {
				isModalActive: false,
				firstname: '',
				firstnameValid: true,
				email: '',
				emailValid: true,
				lastname: '',
				lastnameValid: true,
				phone: '',
				phoneValid: true,
				message: '',
				messageValid: true,
				fileValid: true,
			}
		},
		components: {
			'v-input': vInput,
			'v-file': vFile
		},
		props: {
			team: Object
		},
		mixins: [Lang],
		methods: {
			
		},
		mounted () {
			
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/kit.scss';

	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.98);
		z-index: 1000;
		font-size: 0;
		opacity: 0;
		pointer-events: none;
		visibility: hidden;
		transition: opacity .5s ease, visibility .5s ease;
		overflow-y: scroll;

		&_active {
			opacity: 1;
			pointer-events: all;
			visibility: visible;
		}

		&::-webkit-scrollbar,
		&::-webkit-scrollbar-button,
		&::-webkit-scrollbar-track,
		&::-webkit-scrollbar-track-piece, 
		&::-webkit-scrollbar-thumb,
		&::-webkit-scrollbar-corner,
		&::-webkit-resizer {
			display: none;
		}

		&:before {
			content: "";
			display: inline-block;
			vertical-align: middle;
			height: 100%;
		}

		&__close {
			position: absolute;
			top: 45px;
			right: 52px;
			transition: opacity .5s ease;
			font: 300 10px/12px 'Museo', Arial, Helvetica, sans-serif;
			height: 16px;
			text-transform: uppercase;
			color: #0D0D0D;
			letter-spacing: .4px;
			padding-left: 35px;
			background: url('../../assets/img/join_close.svg') no-repeat left center;
			background-repeat: no-repeat;
			z-index: 1;

			&:hover {
				opacity: .7;	
			}
		}

		&__inner {
			display: inline-block;
			vertical-align: middle;
			width: 100%;
		}
	}

	.form {
		background-color: #F3F3F3;
		max-width: 951px;
		width: 90%;
		padding: 83px 10.2% 100px;
		margin: auto;
		text-align: left;
		// height: 55vh;

		&__title {
			font: 32px/40px 'Didot', Arial, Helvetica, sans-serif;
			color: #262626;
		}

		&__submit {
			display: block;
			width: 100%;
			height: 42px;
			background-color: #0D0D0D;
			color: #fff;
			font: 700 12px/17px 'Museo', Arial, Helvetica, sans-serif;
			transition: opacity .5s ease;
			margin-top: 8px;
			letter-spacing: .5px;

			&:hover {
				opacity: .7;
			}
		}

		
	}

	.grid {
		display: grid;
   		grid-template-columns: repeat(2, 1fr);
		grid-column-gap: 24px;
		margin-top: 42px;

		/deep/ .ui-input {
			input {
				background-color: transparent;
			}
		}
	}

	.team {
		text-align: center;
		margin-top: 95px;

		&__title {
			font: 32px/40px 'Didot', Arial, Helvetica, sans-serif;
			color: #171717;
		}

		&__subtitle {
			font: 100 14px/24px 'Museo', Arial, Helvetica, sans-serif;
			color: #171717;
			letter-spacing: .4px;
			margin-top: 7px;
		}

		&__list {
			font-size: 0;
			padding: 0 8.5%;
			margin-top: 44px;
			text-align: left;
		}
	}
	
	.card {
		display: inline-block;
		vertical-align: top;
		width: calc(100% / 6);
		text-align: center;
		margin-bottom: 32px;

		&__img {
			width: 100%;
			background-size: cover;
			background-position: center;

			&:hover {
				filter: brightness(1.2);
				transition: filter .3s linear;
			}

			&:after {
				content: "";
				display: block;
				padding-top: 132.6%;
			}
		}

		&__title {
			color: #262626;
			font: 700 11px/16px 'Museo', Arial, Helvetica, sans-serif;
			text-transform: uppercase;
			letter-spacing: .5px;
			margin-top: 15px;
		}

		&__subtitle {
			color: rgba(23, 23, 23, 0.8);
			opacity: .6;
			font: 300 12px/14px 'Museo', Arial, Helvetica, sans-serif;
			margin-top: 4px;
		}

		&_join {
			position: relative;
			cursor: pointer;

			.card__label {
				font: 24px/30px 'Didot', Arial, Helvetica, sans-serif;
				color: #171717;
			}

			.card__img {
				background-color: #F3F3F3;
				font-size: 0;
				position: relative;
			}

			.card__outer {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;

				&:before {
					content: "";
					display: inline-block;
					vertical-align: middle;
					height: 100%;
				}
			}

			.card__inner {
				display: inline-block;
				vertical-align: middle;
				width: 100%;
				padding: 0 15%;
			}

			.card__icon {
				margin-top: 19px;
			}
		}
	}

	@media(max-width: 1200px) {
		.form {
			width: 73%;
			padding: 83px 6.2% 100px;
			
		}

		.team {
			&__list {
				padding: 0 40px;
				margin-top: 40px;
			}
		}

		.card {
			width: 25%;

			&__img {
				&:after {
					padding-top: 112%;
				}
			}
		}
	}

	@media(max-width: 960px) {
		.modal {
			&__close {
				top: 43px;
				right: 40px;
				font-size: 12px;
				letter-spacing: 0;
			}

			&__inner {
				height: 620px;
			}
		
		}

		.form {
			width: 68%;
			


			&__title {
				font-size: 28px;
				line-height: 32px;
				text-align: center;
			}

			&__submit {
				width: 97%;
				margin-top: 28px;
				transform: translateX(1%);
			}
		}

		.grid {
			grid-template-columns: repeat(1,2fr);
			margin-top: 33px;
		}

		/deep/ .ui-input {
			margin-bottom: 28px;
		}

		.team {
			&__list {
				padding: 0 32px;
			}
		}

		.card {
			width: calc(100%/3);
		}
	}

	@media(max-width: 650px) {
		.modal {
			&__close {
				top: 23px;
				right: 26px;
				font-size: 11px;
			}

			&__inner {
				height: 518px;

			}
		}
		.form {
			width: 100%;
			padding: 44px 4.6% 50px;
			

			&__submit {
				width: 100%;
				transform: translateX(0);
				margin-top: 8px;
			}
		}

		.grid {
			margin-top: 20px;
		}

		.team {
			&__list {
				padding: 0 16px;
			}
		}

		.card {
			width: 50%;

			&__img {
				&:after {
					padding-top: 133%;
				}
			}
		}
	}

</style>