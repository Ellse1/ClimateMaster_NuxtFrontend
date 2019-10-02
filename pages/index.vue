<template>
    <div>
      
      <nuxt-link to="/HandlungsvorschalgHinzufuegen" exact-active-class="active">Handlungsmoeglichkeit hinzufuegen</nuxt-link>

      <!-- Überschriften -->
      <ueberschriftenAnimation />

      <privatUndOrganisationen/>

      <privatClimateMasterWerden />
     

    </div>
</template>

 <script>
import ueberschriftenAnimation from '~/components/UeberschriftenAnimation.vue'
import privatUndOrganisationen from '~/components/PrivatUndOrganisationen.vue'
import privatClimateMasterWerden from '~/components/PrivatClimateMasterWerden.vue'

export default {
  components: {
    ueberschriftenAnimation,
    privatUndOrganisationen,
    privatClimateMasterWerden
  }
}
 </script>

<style>
</style>
