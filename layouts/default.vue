<template>
  <div>

    <NavigationBar />
    
    <div v-if="loggedIn" class="text-center">
      <h3>Hallo {{user.name}}</h3>
    </div>

    <nuxt />
  
    <div v-if="loggedIn" class="text-center"> 
        <nuxt-link to="/" exact-active-class="active">Home</nuxt-link> |
        <a @click.prevent="logout" href="#">logout</a>
    </div>

  </div>
</template>
<script>
import NavigationBar from '~/components/MainComponents/NavigationBar';
export default {
  components:{
    NavigationBar
  },
  methods: {
    logout(){
      this.$auth.logout();
    }
  }
}
</script>