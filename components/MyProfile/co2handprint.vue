<template>
    <div class="text-center">
        
        <!-- Show link to make handprint public  -->
        <div v-if="public_user_profile != null && co2calculationFromChart != null" class=" mb-3">
            <div v-if="public_user_profile.public == false">
                <nuxt-link  style="width:90%;" to="/account/myProfile?page=publish">
                    CO2 Handabdruck sichtbar machen
                    <font-awesome-icon icon="check-circle" style="font-size:20px;" />
                </nuxt-link>            
            </div>
        </div>


        <co2calculationChart :key="keyToReloadCo2Calculation" @saveCO2Calculation="getCo2calculationFromChart"/>

        <button class="btn btn-default border m-3" data-toggle="collapse" data-target="#id_div_calculateEmissions" aria-expanded="false" aria-controls="id_div_calculateEmissions" id="id_button_collapse_calculationInput" v-on:click="scrollToCalculationInput()">
            CO2 Handabdruck vergrößern
        </button>

    	<div id="id_div_to_scroll_to">
            
            <div class="text-center collapse" id="id_div_calculateEmissions">
                <h4>CO2 Handabdruck berechnen</h4>

                <p> 
                    Mit dem CO2 Rechner des Umweltbundesamtes kannst du deinen individuellen 
                    <nuxt-link to="/platform/handprint" >CO2 Handprint</nuxt-link>
                    unter "Meine CO2 Bilanz" berechnen. Nach deiner Berechnung beim Umweltbundesamt bekommst du unter "Meine Berechnung speichern" einen
                    Link, mit welchem man auf deine Berechnung zugreifen kann. Füge diesen Link hier ein, um die Berechnung zu übertragen.<br>
                    <b>Viel Spaß beim Berechnen!</b>
                </p>

                <!-- if there is already a co2calculation -> link to uba with this calculation -->
                <a v-if="co2calculationFromChart == null" target="_blanc" href="https://uba.co2-rechner.de/de_DE/" class="btn btn-default border">CO2 Berechnen <b>&rsaquo;&rsaquo;</b></a>
                
                <a v-if="co2calculationFromChart != null" target="_blanc" :href="co2calculationFromChart.link_uba_co2calculation" class="btn btn-default border">CO2 Berechnen <b>&rsaquo;&rsaquo;</b></a>

                <div>
                    <label class="mt-2">Link der Berechnung hier einfügen:</label>

                    <form @submit.prevent="saveCO2Calculation">
                        
                        <input class="form-control" v-model="link_uba_co2calculation" placeholder="https://uba.co2-rechner.de/de_DE/?bookmark=kAi4dpLEzOyBIYNl (So ähnlich sieht dein Link aus)" required/>

                        <div class="form-group">
                            <input id="id_checkbox_accept" type="checkbox" required />
                            <label style="max-width:400px;" for="id_checkbox_accept">Übertragung der CO2 Berechnung akzeptieren</label>
                        </div>

                        <button id="id_button_save" type="submit" class="btn btn-success mt-2 mb-3">
                            CO2 Handprint übertragen
                            <font-awesome-icon icon="check-circle" style="font-size:20x;"/>     
                        </button>
                        
                    </form>
                </div>

            </div>

            
            <notification :message="error" v-if="error" class="text-danger mt-2" />
            <notification :message="success" v-if="success" class="text-success mt-2" />
                


    	</div>



    </div>
</template>
<script>
import co2calculationChart from '~/components/MyClimateMasterActions/Resources/myCO2CalculationChart';
import notification from '~/components/MainComponents/Notification';

var VueScrollTo = require('vue-scrollto');

export default {
    props: ['public_user_profile'],
    components:{
        co2calculationChart,
        notification,
    },
    data(){
        return{
            error:null,
            success:null,
            co2calculationFromChart : null,
            keyToReloadCo2Calculation: 1
        }
    },
    methods:{
        scrollToCalculationInput(){
            var e = VueScrollTo.scrollTo("#id_div_to_scroll_to");
        },
        async saveCO2Calculation(){
            $("#id_button_save").addClass("loading-animation");

            try {
                const{data} = await this.$axios.post('co2calculation/storeCO2Calculation_ByCurrentUser', {
                    link_uba_co2calculation : this.link_uba_co2calculation
                });

                if(data.state == 'error'){
                    this.error = data.message;
                    this.success = null;
                }
                else if(data.state == 'success'){
                    this.success = data.message;
                    this.error = null;
                    $("#id_button_collapse_calculationInput").click();
                    //refresh co2calculation
                    this.keyToReloadCo2Calculation = this.keyToReloadCo2Calculation + 1;
                    
                }
                else{
                    this.error = "Die Berechnung konnte nicht gespeichert werden.";
                }

            } catch (e) {
                this.error = "Berechnung konnte nicht gespeichert werden. Versuchen Sie es später noch einmal. " + e.response.data.message;
            }

            $("#id_button_save").removeClass("loading-animation");
        },
        getCo2calculationFromChart(co2calculation){
            this.co2calculationFromChart = co2calculation;
        }
    }
}
</script>