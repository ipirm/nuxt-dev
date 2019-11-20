<template lang="pug">
    .custom-cursor
        img(src="@/assets/img/icon-add.svg")
</template>

<script>
export default {
	name: 'custom-cursor',
	data: function(){
		return {}
	}
}
</script>


<style lang="scss" scoped>
    .custom-cursor{
		width: 53px;
		height: 53px;
		border-radius: 50%;
		background-color: transparent;
		border: 1px solid rgba(255, 255, 255, 0.16);
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		position: absolute;
		top: 0;
		right: 0;
		z-index: 1000;
		opacity: 0;
		cursor: none;
		pointer-events: none;
	}
</style>


