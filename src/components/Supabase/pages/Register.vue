
<template>

    <article>
      <h2>Créer un compte</h2>

      <div v-if="error" class="error"><strong>{{ error }}</strong></div>

      <form @submit.prevent>
        <label for="email">Adresse e-mail</label>
        <input type="email" id="email" name="email" placeholder="jonh@doe.fr" v-model="email" required />

        <label for="password">Mot de passe</label>
        <input type="password" id="password" name="password" placeholder="••••••••" v-model="password" required />

        <label>
          <input type="checkbox" name="acceptTerms" v-model="acceptTerms" required />
          J’ai lu et compris les <a href="#">conditions d’utilisation</a>.
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
                S'inscrire
            </button>
        </div>
      </form>

      <footer style="margin-top: 1rem;">
        <small>Vous avez déjà un compte ? <RouterLink v-bind:to="{ name: 'login' }">Se connecter</RouterLink></small>
      </footer>
    </article>

</template>


<script setup>

    import { computed, ref } from 'vue'
    import { supabase } from '../supabase'
    import { useRouter } from 'vue-router';
    import { AuthApiError } from '@supabase/supabase-js';

    const router = useRouter()
    const mode = ref('register')
    const email = ref('')
    const password = ref('')
    const acceptTerms = ref(false)
    const isLoading = ref(false)
    const error = ref(null)

    const canSubmitForm = computed(() => email.value && password.value && acceptTerms.value)

    const submitForm = async () => {
        if (!email.value || !password.value) {
            error.value = "Veuillez remplir tous les champs"
            return
        }

        try {
            isLoading.value = true
            error.value = null

            /* const { data: existingUser, error: checkError } = await supabase
                .rpc('check_email_exists', { email_to_check: email.value })
            if (checkError) throw checkError
            if (existingUser) {
                error.value = "Cette adresse email est déjà utilisée.";
                return
            } */

            const { data: existingEmail, error: checkError } = await supabase
                .from('users_emails')
                .select('email')
                .eq('email', email.value)
                .maybeSingle()
            if (checkError) throw checkError
            if (existingEmail) {
                error.value = "Cette adresse email est déjà utilisée.";
                return
            }

            const { error: signUpError } = await supabase
                .auth
                .signUp({ email: email.value, password: password.value })
            if (signUpError) {
                if (signUpError.message.includes('User already registered') ||
                    signUpError.message.includes('duplicate key') ||
                    signUpError.message.includes('already exists')
                ) {
                    error.value = "Cette adresse email est déjà utilisée.";
                } else {
                    error.value = "Erreur lors de l'inscription : " + signUpError.message;
                }
                throw signUpError
            }

            const { data, error: insertError } = await supabase
                .from('users_emails')
                .insert([
                    { email: email.value }
                ])
                if (insertError) {
                    console.error("Erreur lors de l'enregistrement de l'email :", insertError)
                }

            router.push({ name: 'login' })
        }
        catch(e) {
            error.value = "Erreur lors de l'inscription : " + e.message
            if (e instanceof AuthApiError)
            error.value = "Veuillez remplir tous les champs et fournir une adresse email valide. "
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