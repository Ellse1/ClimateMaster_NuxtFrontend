<template>
    <div>
      
      <!-- Überschriften -->
      <ueberschriftenAnimation />

      <privatUndOrganisationen/>

      <privatClimateMasterWerden :handlungsvorschlaege="handlungsvorschlaege"/>
     

    </div>
</template>

 <script>
import ueberschriftenAnimation from '~/components/UeberschriftenAnimation.vue'
import privatUndOrganisationen from '~/components/PrivatUndOrganisationen.vue'
import privatClimateMasterWerden from '~/components/PrivatClimateMasterWerden.vue'
import axios from 'axios';

export default {
  components: {
    ueberschriftenAnimation,
    privatUndOrganisationen,
    privatClimateMasterWerden
  },
  
  async asyncData(){
      const hv = await axios.get('http://localhost:8000/api/handlungsvorschlag');
      return {handlungsvorschlaege: hv.data.data};
  }
}
 </script>

<style>
</style>
