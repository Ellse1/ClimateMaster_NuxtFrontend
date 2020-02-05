<template>
    <div>
        <div class="border border-dark rounded container">
            <div class="w-100 row">
                <div class="col-1">
                    <font-awesome-icon icon="calculator" class="mt-1" style="font-size:50px;"/>     
                </div>
                <div class="col-10">
                    <div class="number-class mx-auto mt-1">
                        1
                    </div>
                </div>
            </div>

            <div class="text-center" id="id_div_hideAfterSave">
                <h4>CO2 Ausstoß berechnen</h4>

                <p> 
                    Mit dem CO2 Rechner des Umweltbundesamtes kannst du deinen individuellen Ausstoß von Treibhausgasen 
                    (z.B. CO2) berechnen. Mit dieser Berechnung können wir dir individuell effiziente Möglichkeiten für 
                    persönlichen Klimaschutz vorschlagen. Nach deiner Berechnung bekommst du unter "Meine Berechnung speichern" einen
                    Link, mit welchem man auf deine Berechnung zugreifen kann. Füge diesen Link hier ein, um die Berechnung zu übertragen.<br>
                    <b>Viel Spaß beim Berechnen!</b>
                </p>
                
                

                <a target="_blanc" href="https://uba.co2-rechner.de/de_DE/" class="btn btn-default border">CO2 Berechnen <b>&rsaquo;&rsaquo;</b></a>
                <div>
                    <label class="mt-2">Link der Berechnung einfügen</label>

                    <form @submit.prevent="saveCO2Calculation">
                        
                        <input class="form-control" v-model="link_uba_co2calculation" placeholder="https://uba.co2-rechner.de/de_DE/?bookmark=kAi4dpLEzOyBIYNl (So ähnlich sieht dein Link aus)" required/>

                        <div class="form-group">
                            <input id="id_checkbox_accept" type="checkbox" required />
                            <label style="max-width:400px;" for="id_checkbox_accept">Übertragung der CO2 Berechnung akzeptieren</label>
                        </div>

                        <button id="id_button_save" type="submit" class="btn btn-success mt-2 mb-3">
                            Link speichern und Schritt abschließen
                            <font-awesome-icon icon="check-circle" style="font-size:20x;"/>     
                        </button>
                        
                    </form>
                </div>

                <notification :message="error" v-if="error" class="text-danger mt-2" />
                <notification :message="success" v-if="success" class="text-success mt-2" />
               

            </div>
            
            <co2calculationChart v-if="success" />

        </div>
    </div>
</template>
<script>
import notification from '~/components/MainComponents/Notification';
import co2calculationChart from '~/components/MyClimateMasterActions/Resources/myCO2CalculationChart';

export default {
    components:{
        notification,
        co2calculationChart
    },
    data(){
        return {
            error: null,
            success: null,
            link_uba_co2calculation: null,
        };
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
                    $("#id_div_hideAfterSave").hide();
                    this.$emit('climatemaster_steps_completed_changed');
                }
                else{
                    this.error = "Die Berechnung konnte nicht gespeichert werden.";
                }

            } catch (e) {
                this.error = "Berechnung konnte nicht gespeichert werden. Versuchen Sie es später noch einmal. " + e.response.data.message;
            }

            $("#id_button_save").removeClass("loading-animation");
        },
        
    }
}
</script>