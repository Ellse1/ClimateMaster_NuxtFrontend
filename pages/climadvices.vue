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
            <div class="text-center mb-3">
                <button class="btn btn-light m-2 buttonClimateMasterArea" id="id_button_public_emissions" v-on:click="showonlyOfClimateMasterArea('public_emissions')">Öffentliche Emissionen</button>
                <button class="btn btn-light m-2 buttonClimateMasterArea" id="id_button_consumption" v-on:click="showonlyOfClimateMasterArea('consumption')">Konsum</button>
                <button class="btn btn-light m-2 buttonClimateMasterArea" id="id_button_nutrition" v-on:click="showonlyOfClimateMasterArea('nutrition')">Ernährung</button>
                <button class="btn btn-light m-2 buttonClimateMasterArea" id="id_button_mobility" v-on:click="showonlyOfClimateMasterArea('mobility')">Mobilität</button>
                <button class="btn btn-light m-2 buttonClimateMasterArea" id="id_button_heating_electricity" v-on:click="showonlyOfClimateMasterArea('heating_electricity')">Heizung und Strom</button>
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

                //If in route is a special climateMasterArea
                if(this.$route.query.climatemasterarea != undefined){
                    //Show this button rounded green
                    var id_button = "#id_button_" + this.$route.query.climatemasterarea;
                    $(id_button).addClass("border-success");

                    var allClimadvices = this.climadvices;
                    this.climadvicesToShow = [];
                    allClimadvices.forEach(climadvice => {
                        if(climadvice.climateMasterArea == this.$route.query.climatemasterarea){
                            this.climadvicesToShow.push(climadvice);
                        }
                    });
                }
            }
            if(data.state == null){
                this.error = "Es konnte kein 'state' geladen werden";
            }

        } catch (e) {
            this.error = e.response.data.message;
            this.success = null;
        }

        $("#id_button_showAll").removeClass("loading-animation");
    },
    methods:{
        showAllClimatedvices(){
            //Show now climatemasterarea button rounded green -> no one is activ
            $(".buttonClimateMasterArea").removeClass("border-success");
            this.$router.push({path: "/climadvices", query:{}})
            this.climadvicesToShow = this.climadvices;
       },
       showOnlyEasyClimadvices(){
            //Show now climatemasterarea button rounded green -> no one is activ
            $(".buttonClimateMasterArea").removeClass("border-success");
            var allClimadvices = this.climadvices;
            this.climadvicesToShow = [];
            allClimadvices.forEach(climadvice => {
                if(climadvice.easy == 1){
                    this.climadvicesToShow.push(climadvice);
                }
            });
       },
       showOnlyLongTermClimadvices(){
            //Show now climatemasterarea button rounded green -> no one is activ
            $(".buttonClimateMasterArea").removeClass("border-success");
            var allClimadvices = this.climadvices;
            this.climadvicesToShow = [];
            allClimadvices.forEach(climadvice => {
                if(climadvice.easy == 0){
                    this.climadvicesToShow.push(climadvice);
                }
            });
       },
       showonlyOfClimateMasterArea(climatemasterarea){
           $(".buttonClimateMasterArea").removeClass("border-success");
            //Show this button rounded green
            var id_button = "#id_button_" + climatemasterarea;
            $(id_button).addClass("border-success");
            // Push path to router
            this.$router.push({path: "/climadvices", query:{climatemasterarea: climatemasterarea}});

            var allClimadvices = this.climadvices;
            this.climadvicesToShow = [];
            allClimadvices.forEach(climadvice => {
                if(climadvice.climateMasterArea == climatemasterarea){
                    this.climadvicesToShow.push(climadvice);
                }
            }); 
       }
    }

}
</script>