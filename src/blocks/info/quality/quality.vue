<template lang="pug">
	.content
		.content__title Quality and safety
		.content__content
			h4 Alterations in Ralph Lauren stores
			p We offer complimentary alterations on full-price men’s suits and Collection apparel in select Ralph Lauren stores. Click here for a list of stores that offer these services. Customers must present a copy of their invoice to the store for alterations to be made. Alterations may take up to 10 days.
			p Complimentary alterations are made only on items purchased at full price (not on sale items). If you have purchased a men’s suit or women’s Collection item on sale and wish to have alterations made, you may visit any of the select Ralph Lauren stores that offer these services and pay an alterations fee. 
			p If you have additional questions about alterations in our Ralph Lauren stores, contact a Customer Assistance representative at 888-475-7674 or email us at CustomerAssistance@RalphLauren.com.
</template>

<script>
	// import $store from '../../../components/store';
	
	export default {
		name: 'block-return',
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

	@media only screen and (max-width: 960px) {
		.content {

			&__title {
				display: none;
			}
		}
	}
</style>
