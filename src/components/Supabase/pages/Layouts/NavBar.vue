
<template>

    <div>
        <nav>
            <ul>
                <RouterLink
                    style="text-decoration: none; color: white; cursor: pointer;"
                    v-bind:to="{ name : 'home' }"
                >
                    <strong>Tester VueRouter</strong>
                </RouterLink>
            </ul>
            <ul>
                <li>
                    <RouterLink
                        class="router-link"
                        to="/about"
                    >
                        À propos
                    </RouterLink>
                </li>
                <li>
                    <RouterLink
                        class="router-link"
                        to="/contact"
                    >
                        Contact
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