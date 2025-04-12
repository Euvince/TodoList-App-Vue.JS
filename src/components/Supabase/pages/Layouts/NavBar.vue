
<template>

    <div>
        <nav>
            <ul>
                <strong>TodoApp</strong>
            </ul>
            <ul>
                <li>
                    <RouterLink
                        class="router-link"
                        to="/home"
                    >
                        Acceuil
                    </RouterLink>
                </li>
                <li>
                    <RouterLink
                        class="router-link"
                        to="/todos"
                    >
                        Tâches
                    </RouterLink>
                </li>
                <button @click="logout" class="logout-btn">Se déconnecter</button>
            </ul>
        </nav>
    </div>

</template>


<script setup>

    import { supabase } from '../../supabase';
    import { useRouter } from 'vue-router'

    const router = useRouter()

    const logout = async () => {
      await supabase.auth.signOut()
      router.push({ name: 'login' })
    }

</script>


<style>

    .router-link {
        color: #e8ae01;
    }

    .router-link:hover {
        cursor: pointer;
        text-decoration: underline;
    }

    .logout-btn {
        background: none !important;
        border: none !important;
        color: red !important;
        padding-top: 0 !important;
        padding-bottom: 0 !important;
    }

    .logout-btn:hover {
        text-decoration: none !important;
        border: 0 !important;
        color: none !important;
    }

</style>