<template lang="pug">
	.content
		.content__title Career
		.content__content
			h4 Career at villa
			p VILLA is a unique team, which employs highly qualified specialists from various fields, striving for perfection and being in constant creative search. The staff is our most valuable resource and wealth. This is the key to the success of the Company and its fundamental competitive advantage. Our personnel policy is based on the principle of attracting the best specialists who can get a whole range of opportunities to realize their potential, so we take particular care in building our team. We are interested in gifted people with a broad outlook and developed intellectual abilities.
			p If you share our values, we are waiting for you in the VILLA team!
			img(src="@/assets/uploads/career.jpg")
			h4 Staff recruitment
			p In parallel with the training and development of its employees, SANAHUNT is constantly looking for new talented people necessary to maintain the dynamic development of the Company.
			p We strive to attract and retain the best candidates regardless of their work experience. In turn, our candidates are attracted by the opportunity to acquire rare experience and realize their potential.
			p We are looking for employees who combine a pragmatic approach and creativity, who are ready to work for the result and have an active lifestyle.
			p The selection of candidates takes place in several stages. If you are interested in your resume, you will be invited to undergo a preliminary interview with one of the specialists of the personnel management department. Candidates who successfully passed this stage will be invited for further interviews with the head of their business unit.
			.vacancy
				.vacancy__title Vacancies
				.vacancy__text Consider a job for you? Then send a resume to our HR department at hr@villa.com.ua. or Fill in the form
				.vacancy__list
					.card
						.card__title Assistant to the general director
						.card__parameters
							.card__param Kiev
							.card__param Ukraine
							.card__param Sales
					.card
						.card__title Assistant to the general director
						.card__parameters
							.card__param Kiev
							.card__param Ukraine
							.card__param Sales
					.card
						.card__title Assistant to the general director
						.card__parameters
							.card__param Kiev
							.card__param Ukraine
							.card__param Sales
					.card
						.card__title Assistant to the general director
						.card__parameters
							.card__param Kiev
							.card__param Ukraine
							.card__param Sales
</template>

<script>
	// import $store from '../../../components/store';
	
	export default {
		name: 'block-career',
		data: function(){
			return {
				
			}
		},
		mounted() {
			// $api.getToken();
			// $api.getCategories();
		},
		watch: {
			
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/kit.scss';
	.content {
		@include kit('text-template', 'dark');

		&__title {
			border-bottom: 1px solid rgba(#D6D6D6, .4);
			padding-bottom: 10px;
			// font: 32px/1 'Didot', Arial, Helvetica, sans-serif;
			@include kit('h2', 'dark');
		}

		&__content {
			max-width: 738px;
		}
	}

	.vacancy {
		margin-top: 42px;

		&__title {
			@include kit('h3', 'dark');
		}

		&__text {
			@include kit('p1', 'dark');
			max-width: 494px;
			margin-top: 13px;
		}

		&__list {
			margin-top: 29px;
			max-width: 594px;
		}
	}

	.card {
		width: 257px;
		display: inline-block;
		vertical-align: top;
		margin-right: 40px;
		margin-bottom: 19px;

		&__title {
			@include kit('h6 300', 'dark');
			text-transform: none;
			letter-spacing: .04em;
		}

		&__parameters {
			margin-top: 7px;
		}

		&__param {
			@include kit('h6 100', 'dark');
			display: inline-block;
			vertical-align: top;
			color: rgba(#262626, .44);
			text-transform: none;
			position: relative;
			padding: 0 8px;

			&:nth-child(1) {
				padding-left: 0;
			}

			&:last-child {
				padding-right: 0;

				&:after {
					display: none;
				}
			}

			&:after {
				content: "";
				display: block;
				position: absolute;
				right: 0;
				top: 0;
				width: 1px;
				height: 10px;
				background-color: #EDEDED;
			}
		}
	}
	@media only screen and (max-width: 960px) {
		.content {

			&__title {
				display: none;
			}
		}
	}
</style>
