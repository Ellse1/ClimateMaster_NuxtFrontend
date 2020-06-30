<template>
    <div style="max-width:100%;overflow:hidden;">
        <!-- The chart with the green bars. The ClimateMaster Handprint chart -->
        <h4 class="text-center">Aktuelle <nuxt-link to="/platform/handprint" class="text-dark"><u>Handabdruck</u></nuxt-link>  Analyse</h4>
            <div class="text-center" id="id_div_loading_animation"></div>
            <div v-if="success">

                <div class="text-center">In vermiedenen Tonnen CO2 Äquivalent</div>
                <div class="btn-group" role="group">
                    <button id="id_button_co2calculationChart" class="btn btn-default border border-success" v-on:click="toggle_co2calculationChart_handprint('co2calculationChart')">Handabdruck Analyse</button>
                    <button id="id_button_handprint" class="btn btn-default border" v-on:click="toggle_co2calculationChart_handprint('handprint')">Handabdruck</button>
                </div>

               <!-- show calculationChart or handprint -->
                <div v-if="elementToShow == 'co2calculationChart'">
                
                    <!-- Write down the single values  -->
                    <div class="row w-100 mx-auto mb-2 mt-2">
                        <div class="col-2 p-0 text-center" v-for="emission in positiv_emissions" v-bind:key="emission.key" style="position:relative;">
                            <b>{{emission.value}}</b>
                        </div>
                    </div>

                    <div class="row w-100 mx-auto" id="id_div_co2calculationchart">
                        <div class="col-2 p-0 text-center" v-for="emission in positiv_emissions" v-bind:key="emission.key" style="position:relative;">
                            <nuxt-link :to="{path:'/climadvices',query:{climatemasterarea: emission.key}}" class="h-100 w-100">
                                <!-- Chart bar -->
                                <div :id="emission.key" class="bg-success card" style="position:absolute;left:10%;width:80%;"></div>
                                <!-- max value (max reachable co2 saving) -->
                                <div :id="'id_div_max_value_' + emission.key" class="" style="position:absolute;left:10%;width:80%;"></div>
                                <!--draw zero saving line -->
                                <div :id="'id_div_zero_saving_' + emission.key" style="position:absolute;left:0%;width:100%;border-width:1px;"></div>
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

                    <!-- Agenda -->
                    <div class="row mx-auto mt-3">
                        <div class="col-md-6 col-4 text-right row">
                            <div class="col-md-10"> </div>
                            <div class="col-md-2">
                                <hr class="w-100" style="border-color:black;border-style:solid;border-width:1.5px;"> 
                            </div>
                        </div>
                        <div class="col-md-6 col-8 text-left">
                            Maximalwert zur Klimaneutralität
                        </div>
                    </div>                    
                    <div class="row mx-auto mt-3">
                        <div class="col-md-6 col-4 text-right row">
                            <div class="col-md-10"> </div>
                            <div class="col-md-2">
                                <hr class="w-100" style="border-color:black;border-style:solid;border-width:0.5px;"> 
                            </div>
                        </div>
                        <div class="col-md-6 col-8 text-left">
                            Einsparung von 0 Tonnen
                        </div>
                    </div>
                </div>


                         <!-- show calculationChart or handprint -->
                <div v-if="elementToShow == 'handprint'">
                                    
                    <!-- Conclusion -->
                    <div class="text-center mt-2">
                        <b v-if="total_handprint">{{total_handprint}}</b> <br>
                        Tonnen CO2 vermieden!<br>
                        <font-awesome-icon id="id_hand_ClimateMaster_Handprint" icon="hand-paper" class="text-success mt-2" style="font-size:0px;"/>     
                        <br>
                        <b>Die Größe der Hand beschreibt den positiven 
                        <nuxt-link class="text-dark" to="/platform/handprint">
                            <u><span class="text-success">Climate</span>Master Handabruck.<br>
                            Mehr groß = mehr gut!</u>
                        </nuxt-link>
                        </b>
                        <br>
                    </div>
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
            ],
            elementToShow : 'co2calculationChart'  //co2calculationChart or handprint

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
        var topValue = 4.56;  //the max_value for consumption -> show max_value_bar
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

        

        //set the max_value bar on each sektor and the zero saving line (0 line -> x axis)
        this.co2emissions_german_average.forEach(emission => {
            if(emission.key != 'compensation'){
                // set max value bars
                $("#id_div_max_value_" + emission.key).css({
                    position: "absolute",
                    bottom: smalestValue * (-1) *faktor
                });
                $("#id_div_max_value_" + emission.key).css({
                    'border-top-style': "solid",
                    'border-top-color': "black"
                });
                $("#id_div_max_value_" + emission.key).height(emission.value * faktor);
            }
            // set zero saving bar
            $("#id_div_zero_saving_" + emission.key).css({
                position: "absolute",
                bottom: smalestValue * (-1) *faktor
            });
            $("#id_div_zero_saving_" + emission.key).css({
                'border-top-style': "solid",
                'border-top-color': "black"
            });
            $("#id_div_max_value_" + emission.key).height(emission.value * faktor);

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
    },
    methods:{
        toggle_co2calculationChart_handprint(value){
            this.elementToShow = value;
            $("#id_button_co2calculationChart").removeClass('border-success');
            $("#id_button_handprint").removeClass('border-success');
            $("#id_button_" + value).addClass('border-success');
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