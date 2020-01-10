<template>
     <div class="container mb-5">
        <h1 class="mb-3 text-center" id="id_becomeClimateMasterPrivat">Climadvices</h1>
        <p class="text-center">Effiziente Möglichkeiten für klimafreundliches Leben</p>

        <div class="row mb-5">
           <div class="col-md-5 col-sm-12 text-center mt-2">
               <button class="btn btn-lg btn-success" style="width:90%;min-height:70px;border-radius:20px;" v-on:click="showOnlyEasyClimadvices">Eher leicht</button>
           </div>
            <div class="col-md-2 col-sm-12 text-center mt-2">
               <button class="btn btn-lg btn-success" style="width:80%;min-height:70px;border-radius:20px;" v-on:click="showAllClimatedvices">Alle</button>
           </div>
           <div class="col-md-5 col-sm-12 text-center mt-2">
               <button class="btn btn-lg btn-success" style="width:90%;min-height:70px;border-radius:20px;" v-on:click="showOnlyLongTermClimadvices">Eher langfristig</button>
           </div>
        </div>

        <climadviceList :climadvices="climadvicesToShow" />

      </div>
</template>

<script>
import climadviceList from '~/components/Climadvice/ClimadviceList';

export default {
   props:['climadvices'],
   components: {
       climadviceList
    },
    data(){
       return{
          climadvicesToShow: this.climadvices
       }
    },
    methods:{
       showAllClimatedvices(){
          this.climadvicesToShow = this.climadvices;
       },
       showOnlyEasyClimadvices(){
          var allClimadvices = this.climadvices;
          this.climadvicesToShow = [];
          allClimadvices.forEach(climadvice => {
             if(climadvice.easy == 1){
                this.climadvicesToShow.push(climadvice);
             }
          });
       },
       showOnlyLongTermClimadvices(){
         var allClimadvices = this.climadvices;
         this.climadvicesToShow = [];
         allClimadvices.forEach(climadvice => {
            if(climadvice.easy == 0){
               this.climadvicesToShow.push(climadvice);
            }
         });
       }
    }



}
</script>




