<template lang="pug">
	.content
		.content__title Privacy Policy
		.content__content
			h4 Privacy
			p Ralph Lauren Corporation and its affiliates (collectively, “Ralph Lauren”) respect your concerns about privacy. This Privacy Notice applies to personal information we collect (i) on this website, (ii) at Ralph Lauren Stores, Ralph Lauren Factory Outlet Stores (collectively, the “Stores”), and (iii) through the other channels described below. Ralph Lauren is responsible for this website.
			p The Privacy Notice describes the types of personal information we collect on this site, in our Stores, and in other ways discussed below, how we may use that information and with whom we may share it. The notice also describes the measures we take to protect the security of the personal information. We also tell you how you can reach us to ask us to (i) access, change, or not use the personal information you have provided to us; (ii) withdraw any consent you previously provided to us; (iii) tell us to refrain from communicating with you about our products or services; and (iv) answer any questions you may have about our privacy practices.
			h4 Information We Collect and How We Use It
			p Individuals may choose to provide personal information (such as name, contact details, and payment information) through this website, in our Stores, and through the other channels described below. Here are the ways you may provide the information and the types of information you may submit. We also tell you how we may use the information.
</template>

<script>
	// import $store from '../../../components/store';
	
	export default {
		name: 'block-privacy',
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
