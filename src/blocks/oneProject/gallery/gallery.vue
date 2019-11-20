<template lang="pug">
    .gallery
        .gallery__body
            .gallery__item(v-for="item in (page.acf ? page.acf.photos : [])" :class="[item.acf_fc_layout ? item.acf_fc_layout : '']")
                template(v-if="item.acf_fc_layout === 'type_1'")
                    .gallery__img(:style="{backgroundImage: 'url(' + item.photo_1 + ')'}")
                template(v-if="item.acf_fc_layout === 'type_2'")
                    .gallery__img(:style="{backgroundImage: 'url(' + item.photo_1 + ')'}")
                    .gallery__img(:style="{backgroundImage: 'url(' + item.photo_2 + ')'}")
                template(v-if="item.acf_fc_layout === 'type_3'")
                    .gallery__img(:style="{backgroundImage: 'url(' + item.photo_1 + ')'}")
                    .gallery__subgrid
                        .gallery__img(:style="{backgroundImage: 'url(' + item.photo_2 + ')'}")
                        .gallery__img(:style="{backgroundImage: 'url(' + item.photo_3 + ')'}")
</template>

<script>
export default {
    name: 'project-gallery',
    data: function(){
        return {

        }
    },
    props:{
        page:Object
    },
}
</script>

<style lang="scss" scoped>
    .gallery {
        padding-bottom: 87px;   

        &__body {
            max-width: 1108px;
            margin: 0 auto;
        }

        &__item {
            // height: 713px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-column-gap: 10px;
            grid-row-gap: 10px;

            &.type_1 {
                .gallery__img {
                    height: 634px;
                    grid-column-start: 1;
                    grid-column-end: 3;
                }
            }

            &.type_2 {
                .gallery__img {
                    height: 713px;
                }
            }

            &.type_3 {
                .gallery__img {
                    height: 713px;
                }

                .gallery__subgrid {
                    display: flex;
                    flex-direction: column;
                    height: 713px;

                    &:first-child {
                        margin-bottom: 10px;
                    }

                    & > * {
                        width: 100%;
                        height: 351px !important;
                    }
                }
            }
        }
    }

    @media(max-width: 1200px){
        .gallery {
            padding-bottom: 72px;

            &__body {
                padding: 0 40px;
                box-sizing: border-box;
            }

            &__item {
                height: 607px;

                &.type_1 {
                    .gallery__img {
                        height: 540px;
                    }
                }

                &.type_2 {
                    .gallery__img {
                        height: 607px;
                    }
                }

                &.type_3 {
                    .gallery__img {
                        height: 607px;
                    }

                    .gallery__subgrid {
                        height: 607px;

                        & > * {
                            height: 299px !important;
                        }
                    }
                }
            }
        }
    }

    @media(max-width: 960px){
        .gallery {

            &__body {
                padding: 0 32px;
                grid-template-columns: repeat(2, 1fr);
            }

            &__item {
                height: 452px;

                &.type_1 {
                    .gallery__img {
                        height: 403px;
                    }
                }

                &.type_2 {
                    .gallery__img {
                        height: 452px;
                    }
                }

                &.type_3 {
                    .gallery__img {
                        height: 452px;
                    }

                    .gallery__subgrid {
                        height: 452px;

                        & > * {
                            height: 222px !important;
                        }
                    }
                }
            }
        }
    }

    @media(max-width: 650px){
        .gallery {
            height: auto;

            &__body {
                padding: 0 16px;
                display: flex;
                flex-direction: column;

                & > * {
                    &:not(:last-child) {
                        margin-bottom: 10px;
                    }
                }
            }

            &__item {
                display: block;

                &.type_1 {
                    .gallery__img {
                        height: 445px;
                    }
                }

                &.type_2 {
                    display: flex;
                    flex-direction: column;

                    .gallery__img {
                        height: 445px;
                    }
                }

                &.type_3 {
                    .gallery__img {
                        height: 445px;
                    }

                    .gallery__subgrid {
                        height: 445px;
                        display: flex;
                        flex-direction: column;

                        &:first-child {
                            margin-bottom: 10px;
                        }

                        & > * {
                            height: 218px !important;
                        }
                    }
                }
            }
        }
    }
</style>


