<template>
  <div>

    <NavigationBar />
    
    <div style="overflow:hidden;position:fixed;z-index:-10;">
      <img id="id_img_background" src="~/static/pictures/forSpecialSites/index/greenland.jpg" alt="leier kein Foto" />
    </div>

    <!-- main div -->
    <div style="position:absolute;top:200px;width:100%;" class="text-center ">
        <!-- Hallo User -->
        <div v-if="loggedIn" class="text-center">
          <h3>Hallo {{user.firstname}}</h3>
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

<style  scoped>

</style>