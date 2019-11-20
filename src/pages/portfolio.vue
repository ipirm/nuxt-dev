<template lang="pug">
    transition(name="fade" mode="out-in")
        .box
            block-header
            portfolio-poster(
                :bg="page.bg || {}"
                :title="page.title"
            )
            portfolio-description(
                :subtitle="page.subtitle"
                :text="page.info"
            )
            portfolio-gallery(
                :list="portfolio"
            )
            block-footer(fullScreen = true)
</template>

<script>
import Lang from '../components/lang.vue';
import BlockHeader from '../blocks/includes/header/header.vue';
import BlockFooter from '../blocks/includes/footer/footer.vue';

import PortfolioPoster from '../blocks/portfolio/poster/poster.vue';
import PortfolioDescription from '@/blocks/portfolio/description/description.vue';
import Gallery from '@/blocks/portfolio/gallery/gallery.vue';

import $store from '../components/store';
import $api from '../components/api';

export default {
    name: 'Portfolio',
    data: function(){
        return {}
    },
    components: {
        'block-header': BlockHeader,
		'block-footer': BlockFooter,
        'portfolio-poster': PortfolioPoster,
        'portfolio-description': PortfolioDescription,
        'portfolio-gallery': Gallery,
        'lang': Lang
    },
    computed: {
        portfolio() {
            return $store.state.portfolio;
        },
        page() {
            return $store.state.portfolioPage;
        }
    },
    created: function() {
        if (this.page.isEmpty) $api.portfolio.getPage();
        if (!this.portfolio.length) $api.portfolio.get();
    }
}
</script>

<style lang="scss" scoped>
    @import '@/assets/sass/ui.scss';
    
    .box {
        min-height: 100vh;
    }
</style>


