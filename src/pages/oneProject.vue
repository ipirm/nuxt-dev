<template lang="pug">
    transition(name="fade" mode="out-in")
        .box
            block-header
            project-poster(
                :page="getPortfolioBySlug($route.params.slug)"
            )
            project-description(
                :page="getPortfolioBySlug($route.params.slug)"
            )
            project-gallery(
                :page="getPortfolioBySlug($route.params.slug)"
            )
            project-next
            block-footer
</template>

<script>
import Lang from '../components/lang.vue';
import BlockHeader from '../blocks/includes/header/header.vue';
import BlockFooter from '../blocks/includes/footer/footer.vue';

import OneProject from '../blocks/oneProject/poster/poster.vue';
import Description from '../blocks/oneProject/description/description.vue';
import Gallery from '../blocks/oneProject/gallery/gallery.vue';
import Next from '../blocks/oneProject/next/next.vue';

import $store from '../components/store';
import $api from '../components/api';

export default {
    name: 'oneProject',
    data: function(){
        return {}
    },
    components: {
        'block-header': BlockHeader,
        'block-footer': BlockFooter,
        'project-poster': OneProject,
        'project-description': Description,
        'project-gallery': Gallery,
        'project-next': Next,
        'lang': Lang
    },
    created() {
        if (!this.portfolio.length) $api.portfolio.get();
    },
    computed: {
        getPortfolioBySlug() {
            return $store.getters.getPortfolioBySlug
        },
        portfolio() {
            return $store.state.portfolio
        }
    }
}
</script>

<style lang="scss">
    @import '@/assets/sass/ui.scss'; 
</style>


