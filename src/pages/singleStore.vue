<template lang="pug">
    transition(name="fade" mode="out-in")
        .box
            block-header
            block-poster(
                :page="getRetailStore($route.params.slug) || {}"
            )
            block-footer(noPadding = true)
</template>

<script>
import Lang from '../components/lang.vue';
import BlockHeader from '../blocks/includes/header/header.vue';
import BlockFooter from '../blocks/includes/footer/footer.vue';
import BlockPoster from '../blocks/singleStore/poster/poster.vue';
import $store from '@/components/store.js';
import $api from '@/components/api.js';

export default {
    name:'SingleStore',
    data: function(){
        return {}
    },
    components: {
        'lang': Lang,
        'block-header': BlockHeader,
        'block-footer': BlockFooter,
        'block-poster': BlockPoster
    },
    created() {
        if (!this.retailStores.length) $api.retailStores.get();
    },
    computed: {
        retailStores() {
            return $store.state.retailStores
        },
        getRetailStore() {
            return $store.getters.getRetailStore
        }
    }
}
</script>

<style lang="scss" scoped>

</style>


