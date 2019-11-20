<template lang="pug">
	transition(name="fade" mode="out-in")
		.stores
			.stores__map(v-if="windowWidth > 960")
				GmapMap(
					:center="center"
					:zoom="13"
					ref="mapRef"
					style="width: 100%; height: 100%"
					v-bind:options="mapStyle")
						GmapMarker(
							:key="index"
							v-for="(m, index) in $lang.stores"
							:position="m.position"
							:clickable="true"
							:draggable="false"
							:icon="isActive(index)"
							@click="setActiveAddress(index, m.cityCode)")

							//- :icon="{ url: require('../../assets/img/marker.svg') }"

			.aside.stores__aside
				.aside__h2 {{ $lang.stores__info.title }}
				.aside__label {{ $lang.stores__info.subtitle }}
				.aside__wrapper
					.tabs.login__tabs
						.tabs__item(:class="[tab == 0 ? 'tabs__item_active' : '']", @click="setActive(0)") {{ $lang.stores__info.tabs[0] }}
						.tabs__item(:class="[tab == 1 ? 'tabs__item_active' : '']", @click="setActive(1)") {{ $lang.stores__info.tabs[1] }}
					template(v-if="tab == 0")
						.list.stores__list
							template(v-for="(address, index) in $lang.stores")
								button.card.stores__item(v-if="address.cityCode == 0 && address.id != '000000005'" @click="setActiveAddress(index, address.cityCode)" v-bind:class="{card_active: activeAddress == index}")
									.card__name {{ address.name }}
									.card__adress {{ address.address }}
									.phones.card__phones
										.phones__item(v-for="phone in address.phones") {{ phone }}
							//- .card.stores__item
							//- 	.card__name VILLA
							//- 	.card__adress Kyiv, st. Bogdan Khmelnitsky, 86
							//- 	.phones.card__phones
							//- 		.phones__item +38 (044) 455-64-12
							//- 		.phones__item +38 (044) 456-95-92
							//- .card.stores__item
							//- 	.card__name RALPH LAUREN HOME
							//- 	.card__adress Kyiv, st. Moscow, 37/2
							//- 	.phones.card__phones
							//- 		.phones__item +38 (044) 455-64-12
							//- 		.phones__item +38 (044) 456-95-92
					template(v-if="tab == 1")
						.list.stores__list
							template(v-for="(address, index) in $lang.stores")
								button.card.stores__item(v-if="address.cityCode == 1" @click="setActiveAddress(index, address.cityCode)" v-bind:class="{card_active: activeAddress == index}")
									.card__name {{ address.name }}
									.card__adress {{ address.address }}
									.phones.card__phones
										.phones__item(v-for="phone in address.phones") {{ phone }}
			.stores__map(v-if="windowWidth <= 960")
				GmapMap(
					:center="center"
					:zoom="13"
					ref="mapRef"
					style="width: 100%; height: 100%"
					v-bind:options="mapStyle")
						GmapMarker(
							:key="index"
							v-for="(m, index) in addresses"
							:position="m.position"
							:clickable="true"
							:draggable="false"
							:icon="isActive(index)"
							@click="setActiveAddress(index, m.cityCode)")
</template>

<script>
	import Lang from '../../components/lang.vue';

	export default {
		name: 'Stores',
		data: function(){
			return {
				icon: {
					path: 'M8.49965 0C3.81317 0 0 3.96381 0 8.83593C0 10.1068 0.250226 11.3201 0.743353 12.4426C2.8685 17.2767 6.943 22.3804 8.14144 23.8293C8.23123 23.9376 8.36213 24 8.49988 24C8.63764 24 8.76854 23.9376 8.85833 23.8293C10.0563 22.3806 14.1308 17.2771 16.2566 12.4426C16.75 11.3201 17 10.1068 17 8.83593C16.9995 3.96381 13.1864 0 8.49965 0ZM8.49965 13.4253C6.0652 13.4253 4.08442 11.3663 4.08442 8.83568C4.08442 6.30481 6.0652 4.24578 8.49965 4.24578C10.9341 4.24578 12.9149 6.30481 12.9149 8.83568C12.9151 11.3663 10.9343 13.4253 8.49965 13.4253Z',
					fillColor: '#0f0f0f',
					fillOpacity: .5,
					strokeOpacity: 0
				},
				iconActive: {
					path: 'M8.49965 0C3.81317 0 0 3.96381 0 8.83593C0 10.1068 0.250226 11.3201 0.743353 12.4426C2.8685 17.2767 6.943 22.3804 8.14144 23.8293C8.23123 23.9376 8.36213 24 8.49988 24C8.63764 24 8.76854 23.9376 8.85833 23.8293C10.0563 22.3806 14.1308 17.2771 16.2566 12.4426C16.75 11.3201 17 10.1068 17 8.83593C16.9995 3.96381 13.1864 0 8.49965 0ZM8.49965 13.4253C6.0652 13.4253 4.08442 11.3663 4.08442 8.83568C4.08442 6.30481 6.0652 4.24578 8.49965 4.24578C10.9341 4.24578 12.9149 6.30481 12.9149 8.83568C12.9151 11.3663 10.9343 13.4253 8.49965 13.4253Z',
					fillColor: '#0f0f0f',
					fillOpacity: 1,
					strokeOpacity: 0
				},
				tab: 0,
				// markers: [{
				// 	position: {lat: 50.46087996, lng: 30.51004511},
				// },
				// {
				// 	position: {lat: 50.36087996, lng: 30.51004511},
				// }
				// ],
				center: {lat: 50.4338929, lng: 30.5433677},
				windowWidth: window.innerWidth,
				addresses: [
					{
						name: 'RALPH LAUREN HOME',
						city: 'Київ',
						cityCode: 0,
						address: 'вул. Московська, 37/2',
						phones: [
							'+380442888000',
							'+380442888999'
						],
						position: {lat: 50.4338929, lng: 30.5433677}
					},
					{
						name: 'RALPH LAUREN HOME',
						city: 'Київ',
						cityCode: 0,
						address: 'MANDARIN PLAZA, 4 поверх, вул. Басейна, 4А',
						phones: [
							'+380442350020'
						],
						position: {lat: 50.4412309, lng: 30.5194703}
					},
					{
						name: 'DR. VRANJES',
						city: 'Київ',
						cityCode: 0,
						address: 'Гулівер, 1 поверх, Спортивна площа, 1а',
						phones: [],
						position: {lat: 50.4371899, lng: 30.5201645}
					},
					{
						name: 'RALPH LAUREN HOME',
						city: 'Одеса',
						cityCode: 1,
						address: 'Сади Перемоги, 4 поверх, пл. 10 квітня',
						phones: ['+380487405944'],
						position: {lat: 46.4398273, lng: 30.7558662}
					},
					{
						name: 'RALPH LAUREN HOME & DR. VRANJES',
						city: 'Одеса',
						cityCode: 1,
						address: 'вул. Катерининська, 20',
						phones: ['+380487013713'],
						position: {lat: 46.4830396, lng: 30.7358954}
					}
				],
				activeAddress: -1,
				mapStyle: {
					disableDefaultUI : true,
					styles:[
						{
							"featureType": "water",
							"elementType": "geometry",
							"stylers": [
								{
									"color": "#e9e9e9"
								},
								{
									"lightness": 17
								}
							]
						},
						{
							"featureType": "landscape",
							"elementType": "geometry",
							"stylers": [
								{
									"color": "#f5f5f5"
								},
								{
									"lightness": 20
								}
							]
						},
						{
							"featureType": "road.highway",
							"elementType": "geometry.fill",
							"stylers": [
								{
									"color": "#ffffff"
								},
								{
									"lightness": 17
								}
							]
						},
						{
							"featureType": "road.highway",
							"elementType": "geometry.stroke",
							"stylers": [
								{
									"color": "#ffffff"
								},
								{
									"lightness": 29
								},
								{
									"weight": 0.2
								}
							]
						},
						{
							"featureType": "road.arterial",
							"elementType": "geometry",
							"stylers": [
								{
									"color": "#ffffff"
								},
								{
									"lightness": 18
								}
							]
						},
						{
							"featureType": "road.local",
							"elementType": "geometry",
							"stylers": [
								{
									"color": "#ffffff"
								},
								{
									"lightness": 16
								}
							]
						},
						{
							"featureType": "poi",
							"elementType": "geometry",
							"stylers": [
								{
									"color": "#f5f5f5"
								},
								{
									"lightness": 21
								}
							]
						},
						{
							"featureType": "poi.park",
							"elementType": "geometry",
							"stylers": [
								{
									"color": "#dedede"
								},
								{
									"lightness": 21
								}
							]
						},
						{
							"elementType": "labels.text.stroke",
							"stylers": [
								{
									"visibility": "on"
								},
								{
									"color": "#ffffff"
								},
								{
									"lightness": 16
								}
							]
						},
						{
							"elementType": "labels.text.fill",
							"stylers": [
								{
									"saturation": 36
								},
								{
									"color": "#333333"
								},
								{
									"lightness": 40
								}
							]
						},
						{
							"elementType": "labels.icon",
							"stylers": [
								{
									"visibility": "off"
								}
							]
						},
						{
							"featureType": "transit",
							"elementType": "geometry",
							"stylers": [
								{
									"color": "#f2f2f2"
								},
								{
									"lightness": 19
								}
							]
						},
						{
							"featureType": "administrative",
							"elementType": "geometry.fill",
							"stylers": [
								{
									"color": "#fefefe"
								},
								{
									"lightness": 20
								}
							]
						},
						{
							"featureType": "administrative",
							"elementType": "geometry.stroke",
							"stylers": [
								{
									"color": "#fefefe"
								},
								{
									"lightness": 17
								},
								{
									"weight": 1.2
								}
							]
						}
					]
				}
			}
		},
		mixins: [Lang],
		methods: {
			resizeHandler() {
				var w = window.innerWidth;
				this.windowWidth = w;
			},
			isActive(index) {
				if (this.activeAddress === -1) {
					return this.iconActive;
				} else {
					return index === this.activeAddress ? this.iconActive : this.icon;
				}
			},
			setActive(i) {
				this.tab = i;
				// this.activeMarker
				// this.center = this.
			},
			setActiveAddress(i, city) {
				this.activeAddress = i;
				this.tab = city;
				// this.center = this.addresses[i].position;
				this.$refs.mapRef.panTo(this.$lang.stores[i].position);
			}
		},
		beforeDestroy() {
			let th = this;
			window.removeEventListener('resize', th.resizeHandler);
		},
		mounted () {
			let th = this;
			window.addEventListener('resize', th.resizeHandler);
			var cursor = {
				data:{
					x:0,
					y:0,
					centerX:0,
					centerY:0, 
				},
			};

			let gallery = document.getElementsByClassName('stores')[0],
				customCursor = document.getElementsByClassName('custom-cursor')[0];

			cursor.data.centerX = customCursor.clientWidth / 2;
			cursor.data.centerY = customCursor.clientHeight / 2;

			gallery.addEventListener('mousemove', function(e){
				customCursor.style.top = e.clientY - gallery.getBoundingClientRect().top - cursor.data.centerX + 'px';
				customCursor.style.left = e.clientX - gallery.getBoundingClientRect().left - cursor.data.centerY + 'px';
				customCursor.style.opacity = 1;
			});

			gallery.addEventListener('mouseleave', function(){
				customCursor.style.opacity = 0;
			});
		}
		
	}
</script>

<style lang="scss" scoped>
	@import '@/helpers/sass/kit.scss';
	.stores {
		margin-top: 148px;
		padding-bottom: 0px;
		width: 100%;
		height: 844px;
		padding-left: 8px;
		padding-right: 8px;
		display: flex;

		&__map {
			width:63.4%;
			height: 100%;
			background: #eee;
		}

		&__item {
			padding:22px;
			padding-left: 16px;
			padding-bottom: 15px;
			text-align: left;
		}
	}

	.tabs{
		display: flex;
		margin-bottom: 16px;

		&__item {
			width: 50%;
			@include kit('h5 11 bold', 'dark');
			border-bottom: 1px solid #8B8B8B;
			color:#8B8B8B;
			padding-bottom: 14px;
			text-align: center;
			cursor: pointer;
			opacity: 0.5;

			&_active {
				opacity: 1;
				color:#0f0f0f;
				border-bottom: 1px solid #0f0f0f;
			}
		}
	}

	.card {
		border-bottom: 1px solid #F3F3F3;
		display: block;
		width: 100%;
		transition: background-color .5s ease;

		&__name {
			@include kit('h5 11 bold', 'dark');
			margin-bottom: 5px;
		}

		&__adress {
			@include kit('h6 300', 'dark');
			margin-bottom: 5px;
			text-transform: none;
			color: rgba(#262626, .7);
		}

		&_active {
			// background-color:  #F3F3F3;
			background-color: #fff;
			border: 1px solid rgba(0, 0, 0, 0.04);
			border-radius: 4px;
			box-shadow: 0px 2px 50px rgba(0, 0, 0, 0.04);
		}
	}

	.phones { 
		&__item {
			@include kit('h6 300', 'dark');
			display: inline-block;
			margin-right: 10px;
			color: rgba(#262626, .7);
		}
	}

	.aside {
		position: relative;
		top:0;
		right: 0;
		width: 36.6%;
		height: auto;
		text-align: center;
		padding-top: 64px;

		&__wrapper {
			max-width: 376px;
			margin: auto;
		}

		&__h2 {
			@include kit('h2', 'dark');
			text-align: center;
			margin-bottom: 6px;
		}

		&__label {
			@include kit('p1', 'dark');
			margin-bottom: 39px;
		}

		&__item {
			display: block;
			margin-bottom: 20px;

			&_active {
				.link {
					@include ui('link', 'dark');
					text-transform: none;
				}
			}
		}
	}

	@media screen and (max-width: 1200px) {

		.stores {
			margin-top: 69px;
			height: 692px;

			&__map {
				width: calc(100% - 434px);		
			}
		}

		.aside {
			width: 420px;
			margin-left: 14px;
			padding-top: 135px;
		}
	}

	@media screen and (max-width: 960px) {
		.stores {
			height: auto;
			display: block;

			&__map {
				height: 406px;
				width: 100%;
				margin-top: 68px;
			}
		}

		.aside {
			width: 100%;
			margin-left: 0;
			padding-top: 63px;

			&__label {
				margin-bottom: 32px;
			}
		}
	}

	@media screen and (max-width: 650px) {
		.stores {
			&__map {
				height: 550px;
				width: calc(100% - -32px);
				margin-left: -16px;
				margin-top: 59px;
				margin-bottom: -13px;
			}
		}

		.aside {
			padding-left: 16px;
			padding-top: 38px;
			padding-right: 16px;

			&__h2 {
				margin-bottom: 9px;
			}
		}
	}
</style>