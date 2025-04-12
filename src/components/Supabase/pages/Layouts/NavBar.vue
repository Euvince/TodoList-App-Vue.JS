
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
            </ul>
        </nav>
    </div>

</template>


<script setup>



</script>


<style>

    .router-link {
        color: #e8ae01;
    }

    .router-link:hover {
        cursor: pointer;
        text-decoration: underline;
    }

</style>