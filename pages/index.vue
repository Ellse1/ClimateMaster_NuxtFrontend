<template>
    <div>
      
      <!-- HeaderAnimation -->
      <headerAnimation />
      <!-- Private and Communitiies Cards-->
      <privateAndCommunitiesCards @gotClimadvices="gotClimadvices"/>

      <span id="id_over_becomeClimateMasterPrivate"></span>
      <becomeClimateMasterPrivate v-if="climadvices" :climadvices="climadvices"/>
      
     

    </div>
</template>

 <script>
import headerAnimation from '~/components/HeaderAnimation.vue'
import privateAndCommunitiesCards from '~/components/PrivateAndCommunitiesCards.vue'
import becomeClimateMasterPrivate from '~/components/Climadvice/BecomeClimateMasterPrivate.vue'
import axios from 'axios';
var VueScrollTo = require('vue-scrollto');
export default {
  components: {
    headerAnimation,
    privateAndCommunitiesCards,
    becomeClimateMasterPrivate
  },
  data(){
    return{
      climadvices: null
    }
  },
  methods: {
    gotClimadvices(climadvices){
      this.climadvices = climadvices;
      var scrollTo = VueScrollTo.scrollTo('#id_over_becomeClimateMasterPrivate');
    }
  }
}
 </script>

<style>
</style>
