<template>
  <div>

    <div v-if="loggedIn" class="text-center">
      <h3>Hallo {{user.name}}</h3>
    </div>

    <nuxt />
  
    <div v-if="loggedIn" class="text-center"> 
        <nuxt-link to="/HandlungsvorschlagHinzufuegen" exact-active-class="active">Handlungsvorschlag hinzufuegen</nuxt-link> |
        <nuxt-link to="/" exact-active-class="active">Home</nuxt-link> |
        <a @click.prevent="logout" href="#">logout</a>
    </div>

  </div>
</template>
<script>
export default {
  methods: {
    logout(){
      this.$auth.logout();
    }
  }
}
</script>