<template>
    <div style="width:100%;">
        <h4 class="text-center">Aktuelle CO2 Analyse</h4>
            <div class="text-center" id="id_div_loading_animation"></div>
            <div v-if="success">

                <div class="text-center">In Tonnen CO2 Äquivalent</div>
                <div class="row w-100 mx-auto" >
                    <div class="col-2 p-0" v-for="(emission, key) in emissions" v-bind:key="key" style="position:relative;height:300px;">
                        <b>{{emission}}</b>
                        <nuxt-link :to="{path:'/climadvices',query:{climatemasterarea: key}}" class="h-100 w-100">
                            <!-- Chart bar -->
                            <div :id="key" class="bg-primary card" style="position:absolute;left:10%;bottom:0px;width:80%;"></div>
                        </nuxt-link>
                    </div>
                </div>
                <!-- Comment -->
                <div id="id_div_descripton_sectors" class="row w-100 mx-auto">
                    <div class="col-2 icon_co2calculation">Heizung und Strom</div>
                    <div class="col-2 icon_co2calculation">Mobilität</div>
                    <div class="col-2 icon_co2calculation">Konsum</div>
                    <div class="col-2 icon_co2calculation">Ernährung</div>
                    <div class="col-2 icon_co2calculation">Öffentliche Emissionen</div>
                    <div class="col-2 icon_co2calculation" v-if="show_compensation == true">Kompensierung (Alles!)</div>
                </div>
                <div id="id_div_icons_sectors" class="row w-100 mt-2 mx-auto">
                    <div class="col-2 p-0 text-center">
                            <font-awesome-icon icon="plug" class="" style="font-size:20px;"/>     
                    </div>                    
                    <div class="col-2 p-0 text-center">
                        <font-awesome-icon icon="car" class="" style="font-size:20px;"/>     
                    </div>
                    <div class="col-2 p-0 text-center">
                        <font-awesome-icon icon="cart-arrow-down" class="" style="font-size:20px;"/>     
                    </div>
                    <div class="col-2 p-0 text-center">
                        <font-awesome-icon icon="hamburger" class="" style="font-size:20px;"/>     
                    </div>
                    <div class="col-2 p-0 text-center">
                        <font-awesome-icon icon="users" class="" style="font-size:20px;"/>     
                    </div>
                    <div class="col-2 p-0 text-center" v-if="show_compensation == true">
                        <font-awesome-icon icon="sort-amount-down" class="" style="font-size:20px;"/>     
                    </div>




                </div>

                <div class="text-center">
                    <b>Gesamt : {{total_emissions}} Tonnen pro Jahr</b><br>
                    <b>Deutscher Durchschnitt: 11.6 Tonnen pro Jahr</b><br>
                    Klicke auf die Balken, um Handlungsvorschläge für den jeweiligen Bereich zu bekommen.
                </div>


                <!-- Show the redution advices -->
                <co2reductionadvices  v-if="show_advices" />


            </div> 
            <div v-if="error">
                <div class="text-center text-danger">
                    Es konnte keine CO2 Berechnung gefunden werden.
                </div>
            </div>       

    </div>
</template>
<script>
import co2reductionadvices from '~/components/CO2ReductionAdvices/co2reduction_advices';
var VueScrollTo = require('vue-scrollto');

export default {
    props: ['username', 'show_advices'],    //username: if given -> get the calculation of this user -> for public profile
                                     //show_advices -> if true -> show the advices content
    components:{
        co2reductionadvices
    },
    data(){     
        return{
            error: null,
            success: null,
            emissions: {},
            total_emissions: 0,
            show_compensation: false
        }
    },
    async mounted(){

        $("#id_div_loading_animation").addClass('loading-animation-green');

        try {
            const data = null;

            //if username == null -> get data of current user
            if(this.username == null){
                this.data = await this.$axios.$post("co2calculation/getLatestCO2Calculation_ByCurrentUser");
            }
            //if username is not null -> get data of this username
            else{
                this.data = await this.$axios.$post("co2calculation/getLatestCO2CalculationForPublicProfileByUsername", {
                    username: this.username
                });
            }
            if(this.data.state == "error"){
                this.error = this.data.message;
                this.success = null;
            }
            else if(this.data.state == "success"){
                this.success = this.data.message;
                this.error = null;

                var emissions_minimized = {};
                emissions_minimized['heating_electricity'] = this.data.data['heating_electricity'];
                emissions_minimized['mobility'] = this.data.data['mobility'];
                emissions_minimized['consumption'] = this.data.data['consumption'];
                emissions_minimized['nutrition'] = this.data.data['nutrition'];
                emissions_minimized['public_emissions'] = this.data.data['public_emissions'];

                //if the user has compensated the co2 emission -> show compensation bar too
                if(this.data.isCompensated == true){
                    emissions_minimized['total_emissions'] = this.data.data['total_emissions'];
                    this.show_compensation = true;
                }

                this.emissions = emissions_minimized;

                this.total_emissions = this.data.data['total_emissions'];

                //Returns this co2calculation to parent -> if parent needs it, not necessary to get again
                this.$emit('saveCO2Calculation', this.data.data);
            }
            else{
                this.error = "Die Daten konnten nicht geholt werden";
            }
        } catch (e) {
            this.error = "Es konnte keine Berechnung geholt werden." + e.response.data.message;
        }  
        
        $("#id_div_loading_animation").removeClass('loading-animation-green');
    },
    beforeUpdate(){
        // If it should show the whole compensation too -> rerender here
        if(this.show_compensation == true){
            this.emissions['total_emissions'] = this.total_emissions;
        }
    }, 
    updated(){
        // For calculation the factor to draw the diagram
        var biggestEmission = 0.00;
        if(parseFloat(this.emissions['public_emissions']) > biggestEmission){biggestEmission=parseFloat(this.emissions['public_emissions']);}
        if(parseFloat(this.emissions['consumption']) > biggestEmission){biggestEmission=parseFloat(this.emissions['consumption']);}
        if(parseFloat(this.emissions['nutrition']) > biggestEmission){biggestEmission=parseFloat(this.emissions['nutrition']);}
        if(parseFloat(this.emissions['mobility']) > biggestEmission){biggestEmission=parseFloat(this.emissions['mobility']);}
        if(parseFloat(this.emissions['heating_electricity']) > biggestEmission){biggestEmission=parseFloat(this.emissions['heating_electricity']);}
       
        // If it should show the whole compensation too
        if(this.show_compensation == true){
            if(parseFloat(this.emissions['total_emissions']) > biggestEmission){biggestEmission=parseFloat(this.emissions['total_emissions']);}
        }
        //The height of the div is 300px -> take 250 of that
        var faktor = 250/biggestEmission; 


        $("#public_emissions").height(this.emissions['public_emissions'] * faktor);
        $("#consumption").height(this.emissions['consumption'] * faktor);
        $("#nutrition").height(this.emissions['nutrition'] * faktor);
        $("#mobility").height(this.emissions['mobility'] * faktor);
        $("#heating_electricity").height(this.emissions['heating_electricity'] * faktor);
        if(this.show_compensation == true){
            $("#total_emissions").height(this.emissions['total_emissions'] * faktor);
            $("#total_emissions").addClass("bg-success");
        }
    }
}
</script>
<style scoped>

@media only screen and (max-width: 600px) {
    #id_div_descripton_sectors{
        display:none;
    }
    #id_div_icons_sectors{
        display:flex;
    }
}
</style>