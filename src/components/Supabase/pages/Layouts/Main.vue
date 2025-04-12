
<template>

    <div>
        <RouterView />
    </div>

</template>


<script setup>

    import { computed, ref } from 'vue'
    import { RouterView } from 'vue-router';
    import { useRoute } from 'vue-router';

    const router = useRoute()
    console.log(router.params)
    const id = router.params.id

    const p = computed(() => ({
        name : 'todos.show',
        params : {
            id : props.todo.id,
            id : router.params.id,
        }
    }))

</script>


<style>



</style>