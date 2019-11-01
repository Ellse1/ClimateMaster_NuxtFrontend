<template>
     <div class="container mt-5 pt-5 border-top mb-5">
        <h1 class="mb-3" id="id_becomeClimateMasterPrivat">Privat</h1>

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




