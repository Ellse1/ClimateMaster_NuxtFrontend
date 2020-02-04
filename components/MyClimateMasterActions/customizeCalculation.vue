<template>
    <div>
        <div class="border border-dark rounded container">
            <div class="w-100 row">
                <div class="col-1">
                    <font-awesome-icon icon="calculator" class="mt-1" style="font-size:50px;"/>     
                </div>
                <div class="col-10">
                    <div class="number-class mx-auto mt-1">
                        3
                    </div>
                </div>
            </div>
            <h4>Berechnung anpassen</h4>
            <div class="container">
                <p>
                    Bevor du im nächsten Schritt <span class="text-success">Climate</span>Master wirst, hast du hier noch einmal die
                    Möglichkeit, deine CO2 Berechnung an die Realität anzupassen. Ist dir schon ein Fortschritt bei persönlichem
                    Klimaschutz gelungen?
                </p>
            </div>

            <co2calculationChart :key="keyReloadChart" @saveCO2Calculation="getCO2CalculationFromChildComponent"/>

            <!-- hide this, after this step is completed -->
            <div id="id_div_hideAfterCompleted">
                <!-- link to change calculation with co2 calculator -->
                <a target="_blanc" v-if="co2calculation != null" class="btn btn-default border border-dark mt-3 mb-3" :href="co2calculation['link_uba_co2calculation']">Aktuelle Berechnung mit CO2 Rechner anpassen <b>&rsaquo;&rsaquo;</b></a>

                <!-- Form to add new calculation / edit old calculation -->
                <form @submit.prevent="saveCO2Calculation">
                    <label><b>Link der aktualisierten Berechnung einfügen</b></label>
                    <input class="form-control" v-model="link_uba_co2calculation" placeholder="https://uba.co2-rechner.de/de_DE/?bookmark=kAi4dpLEzOyBIYNl (Link der angepassten Berechnung)" required>
                    
                    <!-- Checkbox -->
                    <div class="form-group">
                        <input id="id_checkbox_accept" type="checkbox" required />
                        <label style="max-width:400px;" for="id_checkbox_accept">Übertragung der CO2 Berechnung akzeptieren</label>
                    </div>
                    
                    <button id="id_button_save" type="submit" class="btn btn-success mt-2 mb-2">
                        Berechnung speichern
                    </button>
                </form>

                <button id="id_button_completed" class="btn btn-success mt-2 mb-2" v-on:click="costumizeCalculationCompleted">
                    Schritt mit dieser Berechnung abschließen
                    <font-awesome-icon icon="check-circle" style="font-size:20x;"/> 
                </button>
                <p>Dannach können Sie Ihre Berechnung wieder am 01. Januar 2021 anpassen.</p>
                
            </div>

        </div>
    </div>
</template>
<script>
import co2calculationChart from '~/components/MyClimateMasterActions/Resources/myCO2CalculationChart';
export default {
    components:{
        co2calculationChart
    },
    data(){
        return {
            co2calculation: null,
            link_uba_co2calculation: null,
            keyReloadChart: 0
        }
    },
    methods:{
        async saveCO2Calculation(){
            $("#id_button_save").addClass("loading-animation");

            try {
                const{data} = await this.$axios.post('co2calculation/store', {
                    link_uba_co2calculation : this.link_uba_co2calculation
                });

                if(data.state == 'error'){
                    this.error = data.message;
                    this.success = null;
                }
                else if(data.state == 'success'){
                    this.success = data.message;
                    this.error = null;
                    this.keyReloadChart += 1;
                    this.co2calculation = data.data;
                    this.link_uba_co2calculation = null;
                }
                else{
                    this.error = "Die Berechnung konnte nicht gespeichert werden.";
                }

            } catch (e) {
                this.error = "Berechnung konnte nicht gespeichert werden. Versuchen Sie es später noch einmal. " + e.response.data.message;
            }

            $("#id_button_save").removeClass("loading-animation");
        },
        async costumizeCalculationCompleted(){
            $("#id_button_completed").addClass("loading-animation");
            try {
                const{data} = await this.$axios.post("climatemaster_steps_completed/customizeCalculationCompleted");

                if(data.state == "error"){
                    this.error = data.message;
                    this.success = null;
                }
                else if(data.state == "success"){
                    this.success = data.message;
                    this.error = null;
                    $("#id_div_hideAfterCompleted").hide();
                    this.$emit('climatemaster_steps_completed_changed');
                }
                else{
                    this.error = "Der aktuelle Zustand konnte nicht gespeichert werden.";
                }
            } catch (e) {
                
            }

            $("#id_button_completed").removeClass("loading-animation");
        },
        //gets the co2calculation from the child component "co2calculationChart"
        getCO2CalculationFromChildComponent(co2calculation){
            this.co2calculation = co2calculation;
        }
    }
}
</script>