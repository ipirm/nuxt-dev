<template lang="pug">
	transition(name="fade" mode="out-in")
		.box
			block-header 
			about-poster(
				:poster="about"
			)
			about-description(
				:content="about"
			)
			about-tabs(
				:tabs="[about.content_1, about.content_2, about.content_3, about.content_4]"
			)
			about-story
			about-brands(
				:brands="about.brands"
			)
			about-team(
				:team="about.team ? about.team.list : []"
			)
			about-next
			block-footer
			block-login-modal
</template>

<script>
	import Lang from '../components/lang.vue';
	import BlockHeader from '../blocks/includes/header/header.vue';
	import BlockFooter from '../blocks/includes/footer/footer.vue';
	
	import AboutPoster from '@/blocks/about/poster.vue';
	import AboutDescription from '@/blocks/about/description.vue';
	import AboutTabs from '@/blocks/about/tabs.vue';
	import AboutStory from '@/blocks/about/story.vue';
	import AboutTeam from '@/blocks/about/team.vue';
	import AboutNext from '@/blocks/about/next.vue';
	import AboutBrands from '@/blocks/about/brands.vue';

	import BlockLoginModal from '../blocks/includes/login/login.vue';

	import $store from '../components/store';
	import $api from '../components/api'; 
	import axios from 'axios';

	export default {
		name: 'About',
		data: function(){
			return {
				data:{}
			}
		},
		computed: {
			about() {
				return $store.state.about;
			}
		},
		created () {
			this.fetchData();
		},
		components: {
			'block-header': BlockHeader,
			'block-footer': BlockFooter,
			'block-login-modal': BlockLoginModal,
			'about-poster': AboutPoster,
			'about-team': AboutTeam,
			'about-description': AboutDescription,
			'about-tabs': AboutTabs,
			'about-story': AboutStory,
			'about-next': AboutNext,
			'about-brands': AboutBrands,
			'lang': Lang
		},
		methods: {
			createArray: function(ar) {
				let mass = [];
				for( var key in ar) {
					if(key.substr(0,8) == 'content_') mass.push(ar[key]);
				}
				return mass;
			},
			fetchData: function() {
				$api.about.get();
			}
			
		},
		watch: {
			'$route' () {
				this.fetchData();
		
			}
		}
		
	}
</script>

<style lang="scss" scoped>
</style>