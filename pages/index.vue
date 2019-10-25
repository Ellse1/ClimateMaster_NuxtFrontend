<template>
    <div>
      
      <!-- HeaderAnimation -->
      <headerAnimation />
      <!-- Private and Communitiies Cards-->
      <privateAndCommunitiesCards/>

      <becomeClimateMasterPrivate :climadvices="climadvices"/>
     

    </div>
</template>

 <script>
import headerAnimation from '~/components/HeaderAnimation.vue'
import privateAndCommunitiesCards from '~/components/PrivateAndCommunitiesCards.vue'
import becomeClimateMasterPrivate from '~/components/BecomeClimateMasterPrivate.vue'
import axios from 'axios';

export default {
  components: {
    headerAnimation,
    privateAndCommunitiesCards,
    becomeClimateMasterPrivate
  },
  
  async asyncData(){
      const climadvicesData = await axios.get('http://localhost:8000/api/climadvice/index');
      return {climadvices: climadvicesData.data.data};
  }
}
 </script>

<style>
</style>
