
<template>

    <article>
      <h2>Connexion</h2>

      <div v-if="error" class="error"><strong>{{ error }}</strong></div>

      <form @submit.prevent>
        <label for="email">Adresse e-mail</label>
        <input type="email" id="email" name="email" v-model="email" placeholder="jonh@doe.fr" required />

        <label for="password">Mot de passe</label>
        <input type="password" id="password" name="password" v-model="password" placeholder="••••••••" required />

        <label>
          <input type="checkbox" name="remember" v-model="rememberMe" />
          Se souvenir de moi
        </label>

        <div
            v-if="isLoading"
            class="submit-btn-div"
        >
            <div class="loader"></div>
        </div>
        <div
            v-else
            class="submit-btn-div"
        >
            <button
                type="submit"
                class="contrast submit-btn"
                @click="submitForm"
                v-bind:disabled="isLoading || !canSubmitForm"
            >
                Se connecter
            </button>
        </div>
      </form>

      <footer style="margin-top: 1rem;">
        <!--<small><a href="#">Mot de passe oublié ?</a></small><br />-->
        <small>Pas encore de compte ? <RouterLink v-bind:to="{ name: 'register' }">Créer un compte</RouterLink></small>
      </footer>
    </article>

</template>


<script setup>

import { computed, ref } from 'vue'
    import { supabase } from '../supabase'
    import { useRouter } from 'vue-router';
    import { AuthApiError } from '@supabase/supabase-js';

    const router = useRouter()
    const mode = ref('login')
    const email = ref('')
    const password = ref('')
    const rememberMe= ref(false)
    const isLoading = ref(false)
    const error = ref(null)

    const canSubmitForm = computed(() => email.value && password.value)

    const submitForm = async () => {
        if (!email.value || !password.value) {
            error.value = "Veuillez remplir tous les champs"
            return
        }

        try {
            isLoading.value = true
            error.value = null

            const { error: signInError } = await supabase
                .auth
                .signInWithPassword({ email: email.value, password: password.value })
            if (signInError) throw signInError

            router.push({ name: 'home' })
        }
        catch(e) {
            if (e instanceof AuthApiError) {
                if (e.message.includes('Invalid login credentials')) {
                    error.value = "Les identifiants fournis ne correspondent pas à nos enregistrements."
                }
                else if (e.message.includes('Email not found')) {
                    error.value = "Cet email n'est associé à aucun compte"
                }
                else if (e.message.includes('Your email is not verified')) {
                    error.value = "Veuillez vérifier votre adresse e-mail"
                }
                else if (e.message.includes('Email not confirmed')) {
                    error.value = "Veuillez vérifier votre adresse e-mail"
                }
                else {
                    error.value = "Une erreur s'est produite lors de la connexion"
                }
            } else {
                error.value = "Erreur lors de la connexion : " + e.message
            }
            console.error(e)
        }
        finally {
            isLoading.value = false
        }
    }

</script>


<style>

    .submit-btn-div, .error {
        display: flex;
        justify-content: center;
        margin-top: 1rem;
    }

    .submit-btn {
        width: auto !important;
        padding: 0.6rem 2rem !important;
        border-radius: 1.5rem !important;
    }

    .loader {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: solid 5px #FFF;
        border-top: 5px solid transparent;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

</style>