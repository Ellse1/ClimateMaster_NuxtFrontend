<template>
  <div>
    <!-- Background Image -->
    <div style="overflow:hidden;position:fixed;top:0px;z-index:-10;">
        <img id="id_img_background" src="~/static/pictures/forSpecialSites/index/greenland.jpg" alt="leier kein Foto" style="min-height:100%;"/>
    </div>


    
    <div id="">
        <NavigationBar />

        <div style="margin-top:100px;">
            <client-only>
                <div class="text-center" v-if="loggedIn == true">
                    <h3>Hallo {{user.firstname}}, <br>Schön, dass du dabei bist!</h3>
                </div>
            </client-only>
            
            <!-- Climate Master Logo -->
            <div class="text-center">
                <img src="~/static/pictures/generalPictures/Logo_bold.png" alt="Leider kein Bild gefunden" style="max-width:150px;" class="">
            </div>

            <!-- ClimateMasterHeader -->
            <HeaderAnimation />
        </div>


    </div>

    <div id="">
        <nuxt />
    </div>

  </div>
</template>
<script>
import NavigationBar from '~/components/MainComponents/NavigationBar';
import HeaderAnimation from '~/components/MainComponents/HeaderAnimation';
import ogImage from '~/static/pictures/generalPictures/forsocialmediaposts.jpg';

// import privateAndCommunitiesCards from '~/components/PrivateAndCommunitiesCards';

export default {
  head () {
    return {
      meta: [
        { hid: 'og:image', property: 'og:image', content: 'www.climate-master.com' + ogImage }
      ]
    }
  },
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
</style>