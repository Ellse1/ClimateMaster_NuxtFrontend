<template>
    <div>
        <div class="text-center">
            <notification :message="error" v-if="error" class="text-danger mt-3" />
        </div>

        <div class="container mb-5">
            <h1 class="mb-3 text-center" id="id_becomeClimateMasterPrivat">Climadvices</h1>
            <p class="text-center">Effiziente Möglichkeiten für klimafreundliches Leben</p>

            <div class="row mb-5">
            <div class="col-md-5 col-sm-12 text-center mt-2">
                <button class="btn btn-lg btn-success" style="width:90%;min-height:70px;border-radius:20px;" v-on:click="showOnlyEasyClimadvices">Eher leicht</button>
            </div>
                <div class="col-md-2 col-sm-12 text-center mt-2">
                <button id="id_button_showAll" class="btn btn-lg btn-success" style="width:80%;min-height:70px;border-radius:20px;" v-on:click="showAllClimatedvices">Alle</button>
            </div>
            <div class="col-md-5 col-sm-12 text-center mt-2">
                <button class="btn btn-lg btn-success" style="width:90%;min-height:70px;border-radius:20px;" v-on:click="showOnlyLongTermClimadvices">Eher langfristig</button>
            </div>
            </div>

            <climadviceList  :climadvices="climadvicesToShow" />
            
        </div>
    </div>
</template>
<script>
import climadviceList from '~/components/Climadvice/ClimadviceList';
import notification from '~/components/MainComponents/Notification';
var VueScrooTo = require('vue-scrollto')
export default {
    components:{
         climadviceList,
         notification
    },
    data(){
        return{
            climadvices : null,
            climadvicesToShow: null,
            error: null,
            success: null
        }
    },
    async mounted(){
        $("#id_button_showAll").addClass("loading-animation");

        try {

            const{data} = await this.$axios.get("climadvice/index");

            if(data.state == "error"){
                this.error = data.message;
                this.success = false;
            }
            if(data.state == "success"){
                this.success = data.message;
                this.error = null;
                this.climadvices = data.data;
                this.climadvicesToShow = this.climadvices;
            }

        } catch (e) {
            this.error = e.response.data.message;
            this.success = null;
        }

        $("#id_button_showAll").removeClass("loading-animation");
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