<template lang="pug">
	.ui-input(:class="{'ui-input_active' : checkVal, 'ui-input_error' : !isValid}")
		input(v-if="type != 'phone'", :type="type", v-bind:value="value" v-on:input="$emit('input', $event.target.value)" @keyup="$emit('keyup')" :name="name" :autocomplete="autocomplete" :class="{'short_input': isPromo}")
		input(v-if="type == 'phone'", :type="type", v-bind:value="value" v-on:input="$emit('input', $event.target.value)" @keyup="$emit('keyup')" :name="name", v-mask="'+38 (###) ###-##-##'" placeholder="+38 (        )" maxlength="18" :autocomplete="autocomplete")
		.ui-input__name {{ label }}
</template>

<script>
  import {mask} from 'vue-the-mask';
  
  export default {
	name: 'v-input',
	data: function(){
	  return {
			checkVal:false
	  }
	},
	directives: {mask},
	props:{
		value:{
			type:String,
			default:''
		},
		name:{
			type:String,
			default:''
		},
		type:{
			type:String,
			default:'text'
		},
		label:{
			type:String,
			default:''
		},
		autocomplete: {
			type: String,
			default: ''
		},
		isValid: {
			type: Boolean,
			default: true
		},
		isPromo: {
			type: Boolean,
			default: false
		}
	},
	methods:{
	},
	mounted() {
		this.checkVal = this.value !="" ? true : false;
	},
	watch: {
		value(val) {
			this.checkVal = val !="" ? true : false;
		},
	}
  }
</script>
<style lang="scss" scoped>
	@import '../helpers/sass/kit.scss';
	.short_input {
		padding-right: 100px;
	}
	.ui-input {
		width: 100%;
		position: relative;
		margin-bottom: 30px;

		&__name {
			@include kit('h4 12px light', 'dark');
			position: absolute;
			left: 0px;
			top: 0px;
			transform: translateX(8px) translateY(5px);
			transform-origin: 0 0;
			pointer-events: none;
			transition: all 0.3s ease;
		}

		input {
			width: 100%;
			height: 25px;
			border-bottom:1px solid #D6D6D6;
			font-family: 'Museo';
			font-style: normal;
			font-weight: normal;
			line-height: normal;
			font-size: 12px;
			font-weight: 500;
			color: #0f0f0f;
			padding-left: 8px;
			transition: border-color .5s ease;

			&:focus {
				& + .ui-input {
					&__name {
						transform: translateX(8px) translateY(-13px) scale(0.86);
						transform-origin: 0 0;
					}
				}
			}
		}

		&_active {
			
			.ui-input {
				&__name {
					transform: translateX(8px) translateY(-13px) scale(0.86);
					transform-origin: 0 0;
				}
			}
		}

		&_error {
			input {
				border-color: #EC2B2B;
			}
		}
	}
</style>
