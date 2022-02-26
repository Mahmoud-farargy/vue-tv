<template>
    <RouterLink class="category--inner flex-column" :to="`/streams/${item.category_id}/${item.category_name}`">
        <figure class="category--image--container">
              <img :src="`${require('@/assets/Play-TV-logo-on-transparent-background-PNG.png')}`" loading="lazy" :alt="`${item.category_name} category`" />
        </figure>
        <h5>{{trimText(item.category_name,40)}}</h5>
    </RouterLink>
</template>

<script>
    import { trimText } from "@/utilities/utilities";
    export default {
        props: {
            item: {
                type: Object,
                required: true
            }
        },
        methods: {
            trimText
        }
    }
</script>

<style lang="scss" scoped>
    .category--inner{
        width: 100%;
        cursor: pointer;
        gap: 0.7rem;
        text-decoration: none;
        &:hover{
            .category--image--container{
                img{
                    transform: scale(1.02);
                }
            }
        }
        .category--image--container{
              padding: 0.4rem;
              background: var(--categories-clr);
              min-height: 130px;
              border-radius: var(--radius);
              overflow: hidden;
              img{
                  transition: transform 0.3s ease-in-out;
                  object-fit: fill;
                  width: 100%;
                  height: 100%;
              }
        }
        h5{
            font-weight: var(--font-weight);
            font-size: var(--font-size-small);
            color: var(--text-black);
            width: 100vw;
            text-transform: capitalize;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
</style>