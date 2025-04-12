
<template>

    <article>
      <h2>Connexion</h2>

      <form>
        <label for="email">Adresse e-mail</label>
        <input type="email" id="email" name="email" placeholder="jonh@doe.fr" required />

        <label for="password">Mot de passe</label>
        <input type="password" id="password" name="password" placeholder="••••••••" required />

        <label>
          <input type="checkbox" name="remember" />
          Se souvenir de moi
        </label>

        <div class="submit-btn-div">
            <button type="submit" class="contrast submit-btn">
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