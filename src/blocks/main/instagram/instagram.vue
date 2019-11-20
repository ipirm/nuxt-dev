<template lang="pug">
	div
		.instagram
			h2.h2.instagram__h2 {{ $lang.home.instagram.title }}
			.label.instagram__label {{ $lang.home.instagram.description }}
			.wrapper
				.stories
				//- 	template(v-for="(story, index) in list")
				//- 		button.item(@click="openStory(index)")
				//- 			.item__outer
				//- 				.item__border
				//- 				.item__image(v-bind:style="{backgroundImage: 'url(' + story.image.url + ')'}")
				//- 			.item__title {{ story.title }}
				//- .embedsocial-story-gallery(data-ref="b055c1b4a2f9197353d649902c8debe71e560de7")
				.instagram__feed
					.embedsocial-instagram.embedsocial-hashtag(data-ref="a190ebec4812dadea9a69182e7a1d5e45e374568")
					.card.instagram__card
						.card__content
							.card__label villa_interior_company
							a.card__link(href="https://www.instagram.com/villa_interior_company/" target="_blank")
		.modal(v-bind:class="{modal_active: isModalOpened}")
			.modal__container
				button.modal__close(@click="closeStory")
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="21.2959" height="1.01409" transform="matrix(0.703915 -0.710284 0.703915 0.710284 0 15.2798)" fill="white"/>
						<rect width="21.2959" height="1.01409" transform="matrix(0.703915 0.710284 -0.703915 0.710284 1.00781 0)" fill="white"/>
					</svg>
				.story
					.story__head
						.story__image(v-bind:style="{backgroundImage: 'url(' + list[activeStory].image.url + ')'}")
						.story__title {{ list[activeStory].title }}
						.story__time {{ getTime(list[activeStory].stories[activeVideo].date) + ' ' + $lang.instagram.hours }}
						.container
							template(v-for="(story, i) in list")
								.story__progresses(v-bind:class="{story__progresses_active: i === activeStory}")
									template(v-for="(video, index) in story.stories")
										.progress(v-bind:class="{progress_default: index > activeVideo || !isModalOpened || i !== activeStory, progress_active: index === activeVideo && isModalOpened && i === activeStory, progress_completed: index < activeVideo && isModalOpened && i === activeStory}")
											.progress__value(:ref="'progress_' + i + '_' + index")
					.story__video
						button.button.button_prev(@click="prev()" :disabled="activeVideo === 0 && activeStory === 0")
						button.button.button_next(@click="next()" :disabled="activeStory === instagram.length-1 && activeVideo === list[activeStory].stories.length-1")
						template(v-for="(story, i) in list")
							template(v-for="(video, index) in story.stories")
								video.video(preload="auto" playsinline="playsinline" @ended="onVideoEnded()" :ref="'video_' + i + '_' + index" v-bind:class="{video_active: i === activeStory && index === activeVideo}")
									source(:src="video.video.url" type="video/mp4")
						//- template(v-for="(video, index) in instagram[activeStory].video")
						//- 	video.video(preload="auto" @ended="onVideoEnded(index)" :ref="'video_' + index" v-bind:class="{video_active: index === activeVideo}")
						//- 		source(:src="video.src" type="video/mp4")
</template>

<script>
	import Lang from '../../../components/lang.vue';

	import testVideo1 from '../../../assets/uploads/v1.mp4';
	import testVideo2 from '../../../assets/uploads/v2.mp4';
	import testVideo3 from '../../../assets/uploads/v3.mp4';
	import testVideo4 from '../../../assets/uploads/v4.mp4';
	import testVideo5 from '../../../assets/uploads/v5.mp4';
	import testImage from '../../../assets/uploads/vi1.jpg';
	import testImage2 from '../../../assets/uploads/vi2.jpg';

	export default {
		name: 'main-instagram',
		data: function() {
			return {
				isModalOpened: false,
				instagram: [
					{
						thumb: {url: testImage},
						label: 'VILLA Odessa',
						video: [
							{
								src: testVideo1,
								date: ''
							},
							{
								src: testVideo2,
								date: ''
							}
						]
					},
					{
						thumb: {url: testImage2},
						label: 'NEW',
						video: [
							{
								src: testVideo4,
								date: ''
							},
							{
								src: testVideo5,
								date: ''
							},
							{
								src: testVideo3,
								date: ''
							}
						]
					}
				],
				activeStory: 0,
				activeVideo: 0
			}
		},
		components: {
		},
		props: {
			list: {
				type: Array,
				default: []
			}
		},
		mixins: [Lang],
		mounted() {
			//this.fetchData(document, "script", "EmbedSocialStoryGalleryScript", "https://embedsocial.com/embedscript/stg.js");
			this.fetchData(document, "script", "EmbedSocialHashtagScript", "https://embedsocial.com/cdn/ht.js");
			this.$nextTick(() => {
				this.getDurations();
			});
		},
		methods:{
			setDuration(i, index, video) {
				let th = this;
				var obj = document.createElement('video');
				obj.onloadedmetadata = function() {
					th.$refs['progress_' + i + '_' + index][0].style.transitionDuration = obj.duration + 's';
				}
				obj.src = video;
			},
			onVideoEnded() {
				this.next()
			},
			getTime(date) {
				let diff = Math.floor((Date.now() - Date.parse(date))/1000/60/60);
				return diff;
			},
			openStory(id) {
				let th = this;
				this.activeStory = id;
				this.activeVideo = 0;

				this.isModalOpened = true;
				this.$refs['video_' + this.activeStory + '_' + this.activeVideo][0].currentTime = 0;
				this.$refs['video_' + this.activeStory + '_' + this.activeVideo][0].play();
			},
			getDurations() {
				let th = this;

				this.list.forEach(function(item, i) {
					item.stories.forEach(function(el, index) {
						th.setDuration(i, index, el.video.url);
					});
				});
			},
			closeStory() {
				let th = this;
				this.$refs['video_' + this.activeStory + '_' + this.activeVideo][0].pause();
				this.isModalOpened = false;
				setTimeout(function() {
					th.activeVideo = 0;
				}, 500);
			},
			prev() {
				let curVideo = this.$refs['video_' + this.activeStory + '_' + this.activeVideo][0];
				curVideo.pause();
				curVideo.currentTime = 0;

				if (this.activeVideo === 0) {
					if (this.activeStory === 0) {
						this.closeStory();
						this.activeStory = 0;
						this.activeVideo = 0;
					} else {
						this.activeStory--;
						this.activeVideo = this.list[this.activeStory].stories.length-1;
						this.$refs['video_' + this.activeStory + '_' + this.activeVideo][0].play();
					}
				} else {
					this.activeVideo--;
					this.$refs['video_' + this.activeStory + '_' + this.activeVideo][0].play();
				}
			},
			next() {
				let curVideo = this.$refs['video_' + this.activeStory + '_' + this.activeVideo][0];
				curVideo.pause();
				curVideo.currentTime = 0;

				if (this.activeVideo + 1 === this.list[this.activeStory].stories.length) {
					if (this.activeStory + 1 === this.list.length) {
						this.closeStory();
						this.activeStory = 0;
						this.activeVideo = 0;
					} else {
						this.activeStory++;
						this.activeVideo = 0;
						this.$refs['video_' + this.activeStory + '_' + this.activeVideo][0].play();
					}
				} else {
					this.activeVideo++;
					this.$refs['video_' + this.activeStory + '_' + this.activeVideo][0].play();
				}
			},
			removeElement(elementId) {
				var element = document.getElementById(elementId);
				element ? element.parentNode.removeChild(element) : false;
			},
			fetchData (d, s, id, url) {
				this.removeElement(id);
				var js; 
				if (d.getElementById(id)) {return;} 
				js = d.createElement(s); 
				js.id = id; 
				js.src = url;
				d.getElementsByTagName("head")[0].appendChild(js);
			}
		},
		watch: {
			'$route' () {
				//this.fetchData(document, "script", "EmbedSocialStoryGalleryScript", "https://embedsocial.com/embedscript/stg.js");
				this.fetchData(document, "script", "EmbedSocialHashtagScript", "https://embedsocial.com/cdn/ht.js");
			},
			list() {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/mixins.scss';
	@import '@/helpers/sass/kit.scss';

	.button {
		border-radius: 50%;
		width: 40px;
		height: 40px;
		position: absolute;
		top: calc(50% - 20px);
		z-index: 1;
		transition: opacity .5s ease;

		&_prev {
			left: -72px;
			background: rgba(255, 255, 255, 0.8) url('../../../assets/img/icon-arrow-left.svg') no-repeat;
			background-size: 6px auto;
			background-position: 15px center;
		}

		&_next {
			right: -72px;
			background: rgba(255, 255, 255, 0.8) url('../../../assets/img/icon-arrow-right.svg') no-repeat;
			background-size: 6px auto;
			background-position: 18px center;
		}

		&[disabled] {
			opacity: 0;
			cursor: default;

			&:hover {
				opacity: 0;
			}
		}

		&:hover {
			opacity: .7;
		}
	}

	.estitle.title-box, .new-espagination {
		display:none;
	}
	.col-grid-responsive{
		width:11.11% !important;
	}
	.gallery-view {
		padding:0;
	}

	.modal {
		position: fixed;
		font-size: 0;
		text-align: center;
		background: rgba(13, 13, 13, 0.95);
		z-index: 10000;
		left: 0;
		right: 0;
		bottom: 0;
		top: -70px;
		padding-bottom: 70px;
		transform: translateY(70px);
		width: 100%;
		height: 100%;
		overflow-y: auto;
		opacity: 0;
		pointer-events: none;
		transition: opacity .5s ease;
		-webkit-overflow-scrolling: touch;

		&_active {
			opacity: 1;
			pointer-events: all;
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
			position: relative;
			margin: 70px 0 30px;
		}

		&__close {
			position: absolute;
			right: -36px;
			top: 57px;
			transition: opacity .5s ease;

			&:hover {
				opacity: .7;
			}
		}
	}

	.story {

		&__video {
			width: 318px;
			height: 561px;
			position: relative;
			object-fit: cover;
			background-color: #000;
		}

		&__head {
			text-align: left;
			height: 57px;
		}

		&__image,
		&__title,
		&__time {
			display: inline-block;
			vertical-align: middle;
		}

		&__image {
			width: 32px;
			height: 32px;
			background-color: #fff;
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
			border-radius: 50%;
			margin-right: 10px;
		}

		&__title {
			@include kit('h6 300', 'dark');
			color: #fff;
			margin-right: 6px;
		}

		&__time {
			@include kit('p2', 'dark');
			color: rgba(255, 255, 255, 0.8);
			margin-top: 1px;
		}

		&__progresses {
			display: flex;
			width: 100%;
			flex-direction: row;
			margin: 0 -2px;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
			opacity: 0;

			&_active {
				opacity: 1;
			}
		}
	}

	.container {
		position: relative;
		margin-top: 14px;
		width: 100%;
		height: 57px;
	}

	.progress {
		position: relative;
		height: 2px;
		background-color: #727272;
		flex-grow: 1;
		margin: 0 2px;

		&__value {
			height: 100%;
			background-color: #fff;
			width: 100%;
			transform: scaleX(0);
			transition-timing-function: linear;
			transform-origin: 0 0;
		}

		&_active {
			.progress__value {
				transform: scaleX(1);
			}
		}

		&_completed {
			.progress__value {
				transform: scaleX(1);
				transition-duration: 0s !important;
			}
		}

		&_default {
			.progress__value {
				transition-duration: 0s !important;
			}
		}
	}

	.video {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #000;
		opacity: 0;

		&_active {
			opacity: 1;
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

	.stories {
		text-align: center;
		margin-top: 53px;
		margin-bottom: 30px;
	}

	.item {
		margin: 0 13px;
		text-align: center;
		width: 110px;

		&__outer {
			margin: auto;
			width: 80px;
			height: 80px;
			border-radius: 50%;
			position: relative;
		}

		&__border {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border: 1px solid rgba(0, 0, 0, 0.18);
			border-radius: 50%;
		}

		&__image {
			position: absolute;
			width: calc(100% - 6px);
			height: calc(100% - 6px);
			top: 3px;
			left: 3px;
			border-radius: 50%;
			background-color: #0f0f0f;
			background-size: cover;
			background-position: center center;
			background-repeat: no-repeat;
		}

		&__title {
			@include kit('h6 300', 'dark');
			margin-top: 10px;
		}
	}

	.card {
		width: calc(22.22% + 2px);
		height: auto;
		background: #0f0f0f;
		position: absolute;
		left: calc(66.66% + 3px);
		top: calc(50% - 3px);
		@include proportional(296, 148);

		&__label {
			columns: #fff;
			@include kit('h6 300', 'white');
			display: inline-block;
			vertical-align:middle;

			&::before {
				content: "";
				width: 16px;
				height: 16px;
				display: inline-block;
				vertical-align:middle;
				background: url(../../../assets/img/icon-instagram.png) no-repeat;
				background-position: center;
				background-size: 100% auto;
				margin-right: 11px;
				margin-top: -3px;
			}
		}

		&__link {
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: 1;
			transform: translate3d(0,0,1px);
			top: 0;
			left: 0;
		}

		&__content {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			@include vertical-align-middle;
		}
	}

	.instagram {
		width: 100%;
		text-align: center;
		padding-bottom: 66px;

		&__h2 {
			@include kit('h2', 'dark');
			margin-bottom: 6px;
		}
		&__label {
			@include kit('p1', 'dark');
			max-width: 586px;
			margin: auto;
			margin-bottom: 0px;
		}
		&__feed {
			position: relative;
		}
		&__card {

		}
	}

	@media screen and (max-width: 1200px) {
		.instagram {
			&__h2 {
				margin-bottom: 14px;
			}
		}

		.card {
			width: calc(33.3% + 2px);
			left: auto;
			right: 0;
		}

		.stories {
			margin-top: 35px;
			margin-bottom: 44px;
		}
	}

	@media screen and (max-width: 981px) {
		.card {
			display: none;
		}
	}

	@media screen and (max-width: 850px) {
		.instagram {
			&__label {
				max-width: 540px;
			}

			&__h2 {
				margin-bottom: 10px;
			}
		}

		.stories {
			margin-top: 38px;
			margin-bottom: 47px;
		}
	}

	@media screen and (max-width: 650px) {

		.button {
			&_prev {
				left: 16px;
			}

			&_next {
				right: 16px;
			}

			&:hover {
				opacity: 1;
			}

			&[disabled] {
				&:hover {
					opacity: 0;
				}
			}
		}

		.instagram {
			padding-top: 4px;

			&__label {
				padding: 0 39px;
				font-size: 15px;
				line-height: 25px;
				letter-spacing: .3px;
			}

			&__h2 {
				margin-bottom: 8px;
			}

			&__feed {
				max-width: 343px;
    			margin: 0 auto;
			}
		}

		.stories {
			margin-top: 33px;
			margin-bottom: 40px;
		}

		.story {
			&__video {
				width: 100%;
			}
		}

		.modal {
			&__close {
				position: absolute;
				right: 0;
				top: 9px;
			}

			&__container {
				width: calc(100% - 32px);
				max-width: 343px;
				margin: 32px 0;
			}
		}
	}

	@media screen and (max-width: 325px) {
	

		.stories {
			margin-top: 33px;
		}

		.modal {
			padding-left: 8px;
			padding-right: 8px;

			&__close {
				position: absolute;
				right: 0;
				top: 9px;
			}

			&__container {
				width: 100%;
				margin: 35px 0 0px;
			}
		}
		
		.story {
			&__video {
				width: 100%;
			}
		}
	}


</style>