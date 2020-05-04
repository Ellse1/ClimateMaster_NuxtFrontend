<template>
    <div>
        <div class="text-center">
            <notification :message="error" v-if="error" class="text-danger mt-3" />
        </div>

        <div class="container mb-5">
            <h1 class="mb-3 text-center" id="id_becomeClimateMasterPrivat">Climadvices</h1>
            <p class="text-center">Effiziente Möglichkeiten für klimafreundliches Leben</p>

            <div class="text-center mb-3">
                <button class="btn btn-light m-2 buttonClimateMasterArea" id="id_button_heating_electricity" v-on:click="showonlyOfClimateMasterArea('heating_electricity')">Heizung und Strom</button>
                <button class="btn btn-light m-2 buttonClimateMasterArea" id="id_button_mobility" v-on:click="showonlyOfClimateMasterArea('mobility')">Mobilität</button>
                <button class="btn btn-light m-2 buttonClimateMasterArea" id="id_button_consumption" v-on:click="showonlyOfClimateMasterArea('consumption')">Konsum</button>
                <button class="btn btn-light m-2 buttonClimateMasterArea" id="id_button_public_emissions" v-on:click="showonlyOfClimateMasterArea('public_emissions')">Öffentliche Emissionen</button>
                <button class="btn btn-light m-2 buttonClimateMasterArea" id="id_button_nutrition" v-on:click="showonlyOfClimateMasterArea('nutrition')">Ernährung</button>
            </div>


            <climadviceList  :climadvices="climadvicesToShow" @showOnlyOneClimadvice="showOnlyOneClimadvice" @closeClimadvice="closeClimadvice" />
            
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
            activatedClimatemasterArea: null,
            error: null,
            success: null
        }
    },
    async mounted(){
        $("#id_button_showAll").addClass("loading-animation");

        try {

            //look if the climadvices are in store
            var climadvices_from_store = this.$store.state.climadvices.list;

            //If climadvices are already in
            if(climadvices_from_store.length >= 1){
                this.climadvices = climadvices_from_store;
                this.climadvicesToShow = this.climadvices;
            }

            //If the climadvices are not already loaded in store -> get them from backend:
            else{
                const{data} = await this.$axios.get("climadvice/getAllClimadvices");

                if(data.state == "error"){
                    this.error = data.message;
                    this.success = false;
                }
                if(data.state == "success"){
                    this.success = data.message;
                    this.error = null;
                    this.climadvices = data.data;
                    this.climadvicesToShow = this.climadvices;

                    //Store the climadvices in Store
                    this.$store.commit('climadvices/set', this.climadvices)

                }
                if(data.state == null){
                    this.error = "Es konnte kein 'state' geladen werden";
                }
            }


            //If in route is a special climadvice
            if(this.$route.query.climadvice != undefined){
                var climadviceFromRoute = this.$route.query.climadvice;
                this.showOnlyOneClimadvice(climadviceFromRoute);
            }
            //if there is no climadvice but a climatemasterarea
            else if(this.$route.query.climatemasterarea != undefined){
                var climatemasterareaFromRoute = this.$route.query.climatemasterarea;
                this.showonlyOfClimateMasterArea(climatemasterareaFromRoute);
            }





        } catch (e) {
            this.error = "Es konnten keine Climadvices geladen werden.";
            if(e.response != null){
                this.error += e.response.data.message;
            }
            this.success = null;
        }


        $("#id_button_showAll").removeClass("loading-animation");


        //add Page log
        try {
          const{data} = this.$axios.post('pageLog/addPageLog', {
              page: this.$route.fullPath
        });
        } catch (e) {}
    },
    methods:{
        showonlyOfClimateMasterArea(climatemasterarea){
           $(".buttonClimateMasterArea").removeClass("border-success");
           //if another climatemasterarea was clicked
            if(climatemasterarea != this.activatedClimatemasterArea){
                //Show this button rounded green
                var id_button = "#id_button_" + climatemasterarea;
                $(id_button).addClass("border-success");

                var allClimadvices = this.climadvices;
                this.climadvicesToShow = [];
                allClimadvices.forEach(climadvice => {
                    if(climadvice.climateMasterArea == climatemasterarea){
                        this.climadvicesToShow.push(climadvice);
                    }
                }); 
                // Push path to router
                this.$router.push({path: "/climadvices", query:{climatemasterarea: climatemasterarea}});
                this.activatedClimatemasterArea = climatemasterarea;
            }
            //if the same climatemasterarea was clicked
            else{
                //load all climadvices
                this.climadvicesToShow = this.climadvices;
                this.activatedClimatemasterArea = null;
                this.$router.push({path: "/climadvices", query:{}});
            }

        },
        showOnlyOneClimadvice(climadviceNameID){
            var allClimadvices = this.climadvices;

            // if i click on the same climatemasterarea as before -> don't show all climadvices 
            //but the ones of this (already opened) area
            this.activatedClimatemasterArea = null;
            //hide all other climadvices
            this.climadvicesToShow = [];
            allClimadvices.forEach(climadvice => {
                if(climadvice.name == climadviceNameID){
                    this.climadvicesToShow.push(climadvice);
                }
            })
            //push the router
            //if there was already the climatemasterarea set -> leafe it there!
            if(this.$route.query.climatemasterarea != undefined){
                var climatemasterareaFromRoute = this.$route.query.climatemasterarea;
                this.$router.push({path: "/climadvices", query:{climatemasterarea: climatemasterareaFromRoute, climadvice: climadviceNameID}});
            }else{
                this.$router.push({path: "/climadvices", query:{climadvice: climadviceNameID}});
            }
        },
        closeClimadvice(){
            //check if there is a climatemasterarea
            //if so -> load all this climadvices in climadvicesToShow
            if(this.$route.query.climatemasterarea != undefined){
                var climatemasterareaFromRoute = this.$route.query.climatemasterarea;
                var allClimadvices = this.climadvices;
                this.climadvicesToShow = [];
                allClimadvices.forEach(climadvice => {
                    if(climadvice.climateMasterArea == climatemasterareaFromRoute){
                        this.climadvicesToShow.push(climadvice);
                    }
                }); 

                // if i click on the same climatemasterarea as before -> don't show all climadvices 
                //but the ones of this (already opened) area
                this.activatedClimatemasterArea = climatemasterareaFromRoute;
                //put the correct router
                this.$router.push({path: "/climadvices", query:{climatemasterarea: climatemasterareaFromRoute}});
            }
            //if not -> load everything, put no router querys
            else{
                this.climadvicesToShow = this.climadvices;
                this.$router.push({path: "/climadvices", query:{}});
            }

        }
    }

}
</script>