<template>
  <div>

    <NavigationBar />
    
    <!-- Hallo User -->
    <div v-if="loggedIn" class="text-center">
      <h3>Hallo {{user.name}}</h3>
    </div>


    <HeaderAnimation />


    <!-- Private and Communitiies Cards -->
    <!-- <privateAndCommunitiesCards/> -->


    <nuxt />
  
    <div v-if="loggedIn" class="text-center"> 
        <nuxt-link to="/" exact-active-class="active">Home</nuxt-link> |
        <a @click.prevent="logout" href="#">logout</a>
    </div>

  </div>
</template>
<script>
import NavigationBar from '~/components/MainComponents/NavigationBar';
import HeaderAnimation from '~/components/MainComponents/HeaderAnimation';
import privateAndCommunitiesCards from '~/components/PrivateAndCommunitiesCards';

export default {
  components:{
    NavigationBar,
    HeaderAnimation,
    privateAndCommunitiesCards
  },
  methods: {
    logout(){
      this.$auth.logout();
    }
  }
}
</script>