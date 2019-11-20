<template lang="pug">
    transition(name="fade" mode="out-in")
        .box
            block-header
            retail-gallery(
                :list="retailStores"
            )
            block-footer(fullScreen = true)
</template>

<script>
import Lang from '../components/lang.vue';
import BlockHeader from '../blocks/includes/header/header.vue';
import BlockFooter from '../blocks/includes/footer/footer.vue';

import Gallery from '../blocks/retail/gallery/gallery.vue';

import $store from '../components/store';
import $api from '../components/api';

export default {
    name: 'Retail',
    data: function(){
        return {}
    },
    components: {
        'block-header': BlockHeader,
        'block-footer': BlockFooter,
        'retail-gallery': Gallery,
        'lang': Lang
    },
    computed: {
        retailStores() {
            return $store.state.retailStores;
        }
    },
    created() {
        if (!this.retailStores.length) $api.retailStores.get();
    }
}
</script>

<style lang='scss' scoped>
    @import '@/assets/sass/ui.scss';

    .box {
        min-height: 100vh;
    }
</style>


