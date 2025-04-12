
<template>

    <div>
        <RouterView />
    </div>

</template>


<script setup>

    import { computed, ref } from 'vue'
    import { RouterView } from 'vue-router';
    import { useRoute } from 'vue-router';

    const route = useRoute()
    console.log(route.params)
    const id = route.params.id

    const p = computed(() => ({
        name : 'todos.show',
        params : {
            id : props.todo.id,
            id : route.params.id,
        }
    }))

    const showHeader = computed(() => {
        const hiddenHeaderNames = ['auth']
        return !hiddenHeaderNames.includes(route.name)
    })

</script>


<style>



</style>