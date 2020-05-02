<template>
    <div style="max-width:100%;overflow:hidden;">
        <!-- The chart with the green bars. The ClimateMaster Handprint chart -->
        <h4 class="text-center">Aktuelle Handabdruck Analyse</h4>
            <div class="text-center" id="id_div_loading_animation"></div>
            <div v-if="success">

                <div class="text-center">In Tonnen CO2 Äquivalent</div>
               
                <!-- Write down the single values  -->
                <div class="row w-100 mx-auto">
                    <div class="col-2 p-0 text-center" v-for="emission in positiv_emissions" v-bind:key="emission.key" style="position:relative;">
                        <b>{{emission.value}}</b>
                    </div>
                </div>

                <div class="row w-100 mx-auto" id="id_div_co2calculationchart">
                    <div class="col-2 p-0 text-center" v-for="emission in positiv_emissions" v-bind:key="emission.key" style="position:relative;">
                        <nuxt-link :to="{path:'/climadvices',query:{climatemasterarea: emission.key}}" class="h-100 w-100">
                            <!-- Chart bar -->
                            <div :id="emission.key" class="bg-success card" style="position:absolute;left:10%;width:80%;"></div>
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
                    <div class="col-2 icon_co2calculation">Kompensation</div>
                </div>
                <!-- Icons -->
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
                    <div class="col-2 p-0 text-center">
                        <font-awesome-icon icon="sort-amount-down" class="" style="font-size:20px;"/>     
                    </div>
                </div>

                <!-- Conclusion -->
                <div class="text-center mt-2">
                    <b>Die Größe der Hand beschreibt den positiven <span class="text-success">Climate</span>Master Handabruck</b> <br>
                    <b v-if="total_handprint">{{total_handprint}}</b> <br>
                    <font-awesome-icon id="id_hand_ClimateMaster_Handprint" icon="hand-paper" class="text-success mt-2" style="font-size:0px;"/>     
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
                                     //show_advices -> if true -> show the advices content -> energy, mobility ... content
    components:{
        co2reductionadvices
    },
    data(){     
        return{
            error: null,
            success: null,
            total_handprint: null,
            positiv_emissions: [],
            co2emissions_german_average : [
                {key: 'heating_electricity', value: 2.40},
                {key: 'mobility', value : 2.18},
                {key: 'consumption', value : 4.56},
                {key: 'nutrition', value : 1.74},
                {key: 'public_emissions', value : 0.73},
                {key: 'compensation', value : 0.00}
            ]
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
            //-> for showing a publicUserProfile
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

                var valueFromDB = null;
                this.co2emissions_german_average.forEach(emission => {
                    // if one value which i need is null -> set it to 0.00, then i can calculate with it
                    if(this.data.data[emission.key] == null){
                        valueFromDB = 0.00
                    }else{
                        valueFromDB = this.data.data[emission.key]
                    }
                    //German Average - value = amount of how much the person saved in comparison to the german average 
                    this.positiv_emissions.push({key: emission.key, value: (emission.value - this.data.data[emission.key]).toFixed(2)});
                });

                //make it negativ -> than it is deducted on the right places
                this.positiv_emissions[5].value = this.positiv_emissions[5].value * (-1);

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
    updated(){
        // Find the biggest positiv value and the biggest negative value -> make the div enough high
        var topValue = 0.00;
        var smalestValue = 0.00;
        this.positiv_emissions.forEach(function(item, index, array){
            if(parseFloat(array[index].value) > topValue){topValue=parseFloat(array[index].value);}
            if(parseFloat(array[index].value) < smalestValue){smalestValue=parseFloat(array[index].value);}
        });

        var totalHeight = parseFloat((topValue + (smalestValue * (-1))).toFixed(2)); //smalest value is 0.00 or negative

        //faktor, so that it is nice in the view
        var faktor = 50;

        $("#id_div_co2calculationchart").height(totalHeight * faktor);
        
        //value to calculate the whole handprint
        var handprint = 0.00;

        //Set the correct point and height of the bars -> draw it
        this.positiv_emissions.forEach(function(item, index){
            handprint = handprint + parseFloat(item.value);
            //positive values
            if(item.value >= 0){
                $("#" + item.key).css({
                    position: "absolute",
                    bottom: smalestValue * (-1) *faktor
                });
                $("#" + item.key).height(item.value * faktor);
            }
            //negative values
            if(item.value < 0){
                $("#" + item.key).attr('bottom', (smalestValue - (item.value * (-1))) * faktor);
                $("#" + item.key).css({
                    position: "absolute",
                    bottom: (smalestValue - item.value) * (-1)  * faktor
                });
                $("#" + item.key).height(item.value * (-1) * faktor);
            }
        });

        //set handprint to 2 digits
        this.total_handprint = parseFloat(handprint.toFixed(2));

        var faktorForHandprint = 35;
        var handprintSize = parseFloat((handprint * faktorForHandprint).toFixed(2));
        //set site of the Hand for the Handprint
        if(handprintSize > 0){
            $("#id_hand_ClimateMaster_Handprint").css({
                fontSize: handprintSize
            });
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