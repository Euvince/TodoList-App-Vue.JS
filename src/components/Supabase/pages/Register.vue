
<template>

    <article>
      <h2>Créer un compte</h2>

      <form>
        <label for="email">Adresse e-mail</label>
        <input type="email" id="email" name="email" placeholder="jonh@doe.fr" required />

        <label for="password">Mot de passe</label>
        <input type="password" id="password" name="password" placeholder="••••••••" required />

        <label>
          <input type="checkbox" required />
          J’ai lu et compris les <a href="#">conditions d’utilisation</a>.
        </label>

        <div class="submit-btn-div">
            <button type="submit" class="contrast submit-btn">
                S'inscrire
            </button>
        </div>
      </form>

      <footer style="margin-top: 1rem;">
        <small>Tu as déjà un compte ? <RouterLink v-bind:to="{ name: 'login' }">Se connecter</RouterLink></small>
      </footer>
    </article>

</template>


<script setup>

    const 

</script>


<style>

    .submit-btn-div {
        display: flex;
        justify-content: center;
        margin-top: 1rem;
    }

    .submit-btn {
        width: auto !important;
        padding: 0.6rem 2rem !important;
        border-radius: 1.5rem !important;
    }

</style>