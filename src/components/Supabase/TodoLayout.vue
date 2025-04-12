
<template>

    <Header />
    <Main />

</template>


<script setup>

    import Header from "./pages/Layouts/Header.vue";
    import Main from "./pages/Layouts/Main.vue";
    import { computed, ref, onMounted } from 'vue'
    import { supabase } from './supabase'


    const isLoggedIn = ref(false)

    const checkUser = async () => {
      const { data } = await supabase.auth.getSession()
      isLoggedIn.value = !!data.session
      console.log(data.session)
    }

    onMounted(() => {
      checkUser()

      supabase.auth.onAuthStateChange((event) => {
        isLoggedIn.value = event !== 'SIGNED_OUT'
      })
    })

    const showHeader = computed(() => {
        const hiddenHeaderNames = ['auth']
        return !hiddenHeaderNames.includes(router.name)
    })

</script>