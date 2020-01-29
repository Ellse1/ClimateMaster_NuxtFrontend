<template>
    <div>
        <div class="border border-dark rounded container">
            <div class="w-100 row">
                <div class="col-1">
                    <font-awesome-icon icon="thumbs-up" class="mt-1" style="font-size:50px;"/>     
                </div>
                <div class="col-10">
                    <div class="number-class mx-auto mt-1">
                        2
                    </div>
                </div>
            </div>
            <h4>Treibhausgase einfach und effizient vermeiden</h4>
            <div class="container">
                <p>Unter Climadvices findest du besonders effiziente Möglichkeiten deinen persönlichen Ausstoß
                von Treibhausgasen zu reduzieren. Überlege welche Maßnahmen du jetzt umsetzen kannst und
                 willst, bevor du weiter machst. Nehme dir für diesen Schritt 2-4 Wochen Zeit.
                </p>
                              
            </div>

            <co2calculationChart />

            <div id="id_div_hideAfterStepCompleted">

                <button class="btn btn-success mb-2 mt-3" id="id_button_save" v-on:click="reduceShortTermCompleted">
                    Schritt abschließen
                    <font-awesome-icon icon="check-circle" style="font-size:20x;"/> 
                </button>

                <notification :message="error" v-if="error" class="text-danger mt-2" />
                <notification :message="success" v-if="success" class="text-success mt-2" />
            </div>

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
            success: null
        }
    },
    methods: {
        async reduceShortTermCompleted(){
            $("#id_button_save").addClass("loading-animation");
            try {
                const{data} = await this.$axios.post("climatemaster_steps_completed/reduceShortTermCompleted");

                if(data.state == "error"){
                    this.error = data.message;
                    this.success = null;
                }
                else if(data.state == "success"){
                    this.success = data.message;
                    this.error = null;
                    $("#id_div_hideAfterStepCompleted").hide();
                    this.$emit('climatemaster_steps_completed_changed');
                }
                else{
                    this.error = "Der aktuelle Zustand konnte nicht gespeichert werden.";
                }
            } catch (e) {
                
            }

            $("#id_button_save").removeClass("loading-animation");
        }
    }
}
</script>
<style scoped>
</style>
