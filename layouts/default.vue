<template>
  <div>

    <NavigationBar />
    
    <!-- Background Image -->
    <div style="overflow:hidden;position:fixed;top:0px;z-index:-10;">
        <img id="id_img_background" src="~/static/pictures/forSpecialSites/index/greenland.jpg" alt="leier kein Foto" style="min-height:100%;"/>
    </div>


  
    <!-- All the rest -->
    <nuxt style="margin-top:100px;"/>
  
  
  </div>
</template>
<script>
import NavigationBar from '~/components/MainComponents/NavigationBar';

export default {
   head () {
    return {
      meta: [
        { hid: 'og:title', property: 'og:title', content: 'ClimateMaster' },
        { hid: 'og:image', property: 'og:image', content: 'https://www.climate-master.com/images/general/forsocialmediaposts.jpg' },
        { hid: 'og:description', property: 'og:description', content: 'Finde hier die effizientesten Möglichkeiten klimafreundlich zu leben' }
      ]
    }
  },
  components:{
    NavigationBar,
  },
  methods: {
    logout(){
      this.$auth.logout();
    }
  }
}
</script>

<style>
.loading-animation:after {
  content: " ";
  display: block;
  width: 20px;
  height: 20px;
  /* margin: 8px; */
  margin:auto;
  border-radius: 50%;
  border: 2px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: loading-animation 1.2s linear infinite;
}
.loading-animation-green:after {
  content: " ";
  display: block;
  width: 20px;
  height: 20px;
  /* margin: 8px; */
  margin:auto;
  border-radius: 50%;
  border: 2px solid #fff;
  border-color: green transparent green transparent;
  animation: loading-animation 1.2s linear infinite;
}
@keyframes loading-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* For Cards */
.cursor-pointer{
    cursor: pointer;
}
.cursor-pointer:hover{
    box-shadow: 0 0 10px gray;
}

</style>