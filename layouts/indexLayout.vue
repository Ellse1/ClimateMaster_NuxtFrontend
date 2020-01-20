<template>
  <div>
    <!-- Background Image -->
    <div style="overflow:hidden;position:fixed;top:0px;z-index:-10;">
        <img id="id_img_background" src="~/static/pictures/forSpecialSites/index/greenland.jpg" alt="leier kein Foto" />
    </div>


    
    <div id="">
        <NavigationBar />
        
        <!-- Climate Master Logo -->
        <div class="text-center" style="margin-top:150px;">
            <img src="~/static/pictures/generalPictures/LogoTransparent.png" alt="Leider kein Bild gefunden" style="max-width:150px;" class="">
        </div>

        <!-- ClimateMasterHeader -->
        <HeaderAnimation />

        <!-- ShortText -->
        <h4 class="text-center">Schön, dass du Interesse an konkretem, umweltfreundlichen Klimaschutz hast!</h4>

    </div>

    <div id="">
        <nuxt />
    </div>

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
<style>
@media only screen and (max-width: 600px) {



}
</style>