
<template>

    <div style="margin-top: 40px;">
        <RouterView />
    </div>

</template>


<script setup>

    import { computed, ref } from 'vue'
    import { useRoute } from 'vue-router';

    // Obtenir les params de la route
    const route = useRoute()
    console.log(route.params)
    const id = route.params.id

    const link = computed(() => ({
        name : 'posts.show',
        params : {
            id : props.post.id,
            id : route.params.id,
        }
    }))

</script>


<style>



</style>