<template lang="pug">
	label.ui-file(:class="{'ui-file_active': isActive}")
		input(type="file" v-on:change="onChange" :name="name" ref="input")
		.ui-file__label {{ label }}
		.ui-file__name {{ filename }}
		.ui-file__button(@click="clear")
		.ui-file__progress
</template>

<script>
  
  export default {
	name: 'v-file',
	data: function(){
		return {
			filename: '',
			isActive: false
		}
	},
	props:{
		name:{
			type:String,
			default:''
		},
		label:{
			type:String,
			default:''
		},
		isValid: {
			type: Boolean,
			default: true
		}
	},
	methods:{
		onChange(e) {
			if (e.srcElement.files.length) {
				let file = e.srcElement.files[0]
				this.filename = file.name;
				this.isActive = true;
			} else {
				this.filename = '';
				this.isActive = false;
			}
		},
		clear(e) {
			if (!this.filename) return;
			e.preventDefault();
			this.filename = '';
			this.isActive = false;
			this.$refs.input.value = '';
		}
	},
	mounted() {

	},
	watch: {
		value(val) {
			
		}
	}
  }
</script>


<style lang="scss" scoped>
	@import '../helpers/sass/kit.scss';
	
</style>
