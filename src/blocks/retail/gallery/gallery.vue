<template lang="pug">
	.gallery
		block-cursor
		.gallery__body
			router-link.gallery__item(:to="getUrl((lang === langDefault ? '' : '/'+lang) + ('/interior/stores/' + card.slug))" v-for="(card, index) in list" :key="index" :style="{backgroundImage: 'url(' + card.acf.gallery[0].sizes.medium_large + ')'}")
				.gallery__hover-item
					.gallery__content--hover
						.gallery__name(v-text="card.title.rendered")
						.gallery__desc(v-text="card.acf.address")
</template>

<script>
import Cursor from '@/blocks/includes/cursor/cursor.vue';
import cursorJs from '@/components/cursor.js';
import Lang from '@/components/lang.vue';

export default {
	name: 'retail-gallery',
	data: function(){
		return {
			langDefault: window.config.langDefault
		}
	},
	props: {
		list: Array
	},
	mixins: [Lang],
	components: {
		'block-cursor': Cursor,
	},
	methods: {
		getUrl(url) {
			return url
		}
	},
}
</script>

<style lang="scss" scoped>
	.gallery {
		position: relative;
		width: 100%;
		min-height: 100vh;

		&__body {
			display: grid;
			grid-template-columns: repeat(4, 1fr);

			&:hover {
				cursor: none;
			}
		}

		&__item {
			height: 454px;
			width: 100%;
			overflow: hidden;
			background-repeat: no-repeat;
			background-position: center;
			background-size: cover;
			position: relative;
			cursor: none !important;
			transition: .3s all ease;

			&:nth-child(n+5){
				height: 328px;
			}

			&:hover {
				.gallery__hover-item {
					background: rgba(0, 0, 0, 0.5);
				}

				.gallery__content--hover {
					bottom: 32px;
					opacity: 1;
					transition: .3s all ease;
				}
			}
		}

		&__hover-item {
			position: relative;
			padding: 32px;
			height: 100%;
			width: 100%;
			background-color: transparent;
			transition: .3s all ease;
		}

		&__content {
			$padding: 32px;

			position: absolute;
			left: $padding;
			bottom: $padding;
			right: $padding;
			font-size: 24px;
			line-height: normal;
			color: #fff;
			font-family: 'Didot';
			text-transform: uppercase;
			transition: .3s all ease;
			// opacity: 1;
			opacity: 0;

			&--hover {
				$padding: 32px;

				position: absolute;
				left: $padding;
				// bottom: $padding;
				bottom: -20px;
				right: $padding;
				align-self: flex-end;
				// opacity: 0;
				opacity: 1;
				transition: .3s all ease;
			}
		}

		&__name {
			font-size: 24px;
			line-height: normal;
			color: #fff;
			font-family: 'Didot';
			text-transform: uppercase;
		}

		&__desc {
			color: #fff;
			font-family: 'Museo';
			font-weight: 100;
			font-size: 14px;
			line-height: 24px;
			letter-spacing: 0.034em;
			margin-top: 21px;
		}
	}

	@media(max-width: 1200px){
		.gallery {
			&__body {
				grid-template-columns: repeat(3, 1fr);
			}

			&__item {
				height: 305px;

				&:nth-child(n+5){
					height: 245px;
				}

				&:nth-child(n+4) {
					height: 245px;
				}

				&:last-child {
					grid-column-start: 2;
					grid-column-end: 4;
				}
			}

			&__hover-item {
				padding: 24px;
			}

			&__content {
				right: 24px;
				left: 24px;
				bottom: 24px;

				&--hover {
					right: 24px;
					left: 24px;
					bottom: -20px;
				}
			}

			&__name {
				// height: 23px;
				margin-bottom: 0;
			}

			&__desc {
				margin-top: 12px;
			}
		}
	}

	@media(max-width: 960px){
		.gallery {

			&__body {
				grid-template-columns: repeat(2, 1fr);
			}

			&__item {
				height: 334px;

				&:nth-child(n+5){
					height: 276px;
				}

				&:nth-child(n+4) {
					height: 276px;
				}
				
				&:nth-child(n+3){
					height: 276px;
				}

				&:last-child {
					grid-column-start: 2;
					grid-column-end: 3;
				}
			}

			&__hover-item {
				padding: 24px;
			}

			&__name {
				margin-bottom: 0 !important;
			}
		}
	}

	@media(max-width: 650px){
		.gallery {
			margin-bottom: 0;
			height: auto;

			&__body {
				grid-template-columns: 1fr;
			}

			&__item{
				height: 276px;

				&:first-child {
					margin-top: 44px;
				}

				&:last-child {
					grid-column-start: auto;
					grid-column-end: auto;
				}

				&:hover {
					.gallery__hover-item {
						background-color: inherit;
					}
				}
			}

			&__content {
				opacity: 0;

				&--hover {
					opacity: 1;
				}
			}

			&__hover-item {
				padding: 30px;
			}

			&__content {
				right: 30px;
				left: 30px;
				bottom: 30px;

				&--hover {
					right: 30px;
					left: 30px;
					bottom: 30px;
				}
			}

			&__desc {
				line-height: normal;
			}
		}
	}
</style>


