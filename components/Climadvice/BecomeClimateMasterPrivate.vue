<template>
     <div class="container mb-5">
        <h1 class="mb-3 text-center" id="id_becomeClimateMasterPrivat">Climadvices</h1>
        <p class="text-center">Effiziente Möglichkeiten für klimafreundliches Leben</p>

        <climadviceList :climadvices="climadvices" />

      </div>
</template>

<script>
import climadviceList from '~/components/Climadvice/ClimadviceList';

export default {
   props:['climadvices'],
   components: {
       climadviceList
    },

}
</script>




