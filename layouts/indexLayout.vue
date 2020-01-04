<template>
  <div>

    <NavigationBar />
    
    <!-- Background Image -->
    <div style="overflow:hidden;position:fixed;top:0px;z-index:-10;">
        <img id="id_img_background" src="~/static/pictures/forSpecialSites/index/greenland.jpg" alt="leier kein Foto" />
    </div>

    
    <!-- Climate Master Logo -->
    <div class="text-center" style="margin-top:150px;">
        <img src="~/static/pictures/generalPictures/LogoTransparent.png" alt="Leider kein Bild gefunden" style="max-width:150px;" class="">
    </div>

    <HeaderAnimation />

    <nuxt />
  


  </div>
</template>
<script>
import NavigationBar from '~/components/MainComponents/NavigationBar';
import HeaderAnimation from '~/components/MainComponents/HeaderAnimation';
// import privateAndCommunitiesCards from '~/components/PrivateAndCommunitiesCards';

export default {
  components:{
    NavigationBar,
    HeaderAnimation,
    // privateAndCommunitiesCards
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