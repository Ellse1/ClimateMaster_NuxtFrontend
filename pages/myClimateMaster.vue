<template>
    <div class="container pb-4">

        <!-- Dieser Teil ist noch im Aufbau -->
        <div class="bg-light border border-success text-center p-3">
            <h4>Werde Klimaneutral</h4>
            Hallo {{user.firstname}},<br>
            Diese Seite hilft dir dabei 2020 Klimaneutral und ClimateMaster zu werden. Konkret bedeutet das, dass
            durch deinen Lebensstiel nicht mehr Treibhausgase in die Atmosphaire gelangen, als du auch wieder verhinderst.
            Folgen den 6 Schritten, um deinen persönlichen Treibhausgasausstoß zu verringern und klimaneutral zu werden.
            Bei Fragen oder Anregungen freuen wir uns über eine E-Mail an elias.singer@online.de.<br>
            <b>Vielen Dank für deine Anstrengungen für konsequenten Umwelt- und Klimaschutz!</b>
        </div>


        <div class="row">
            <div class="col-md-4 mt-2" style="height:300px;">
                <div class="card h-100" v-on:click="openClimateMasterAction(0, 'calculate')">
                    <div class="number-class mx-auto my-auto text-center">
                        1
                    </div>
                    <!-- If this is already done, show check circle -->
                    <div v-if="climatemaster_steps_completed['calculate'] == true" class="text-center text-success">
                        <font-awesome-icon icon="check-circle" class="mt-1" style="font-size:50px;"/>                         
                    </div>
                    <h3 class="text-center">CO2 Ausstoß berechnen</h3>
                </div>
            </div>
            <div class="col-md-1 col-sm-6 if-device-large" style="height:150px;border-bottom: 10px dashed green;"></div>
            <div class="if-device-small" id="id_div_center_left" style="width:80%;height:150px;border-right: 10px dashed green;"></div>
            <div class="col-md-3 mt-2" style="height:300px;">
                <div class="card h-100" v-on:click="openClimateMasterAction(1, 'reduce_short_term')">
                    <div class="number-class mx-auto my-auto text-center">
                        2
                    </div>
                    <!-- If this is already done, show check circle -->
                    <div v-if="climatemaster_steps_completed['reduce_short_term'] == true" class="text-center text-success">
                        <font-awesome-icon icon="check-circle" class="mt-1" style="font-size:50px;"/>                         
                    </div>
                    <h3 class="text-center">Treibhausgase effizient vermeiden</h3>
                </div>
            </div>
            <div class="col-md-1 if-device-large" style="height:150px;border-bottom: 10px dashed green;"></div>
            <div class="if-device-small" id="id_div_center_left" style="width:20%;height:150px;border-right: 10px dashed green;"></div>
            <div class="col-md-3 mt-2" style="height:300px;">
                <div class="card h-100" v-on:click="openClimateMasterAction(2, 'customize_calculation')">
                    <div class="number-class mx-auto my-auto text-center">
                        3
                    </div>
                    <!-- If this is already done, show check circle -->
                    <div v-if="climatemaster_steps_completed['customize_calculation'] == true" class="text-center text-success">
                        <font-awesome-icon icon="check-circle" class="mt-1" style="font-size:50px;"/>                         
                    </div>
                    <h3 class="text-center">Berechnung anpassen</h3>
                </div>
            </div>
        </div>
        <div class="row" style="height:150px;">
            <div class="col-10">

            </div>
            <div class="col-2 h-100" style="border-left: 10px dashed green;">

            </div>
        </div>
        <div class="row">
            <div class="col-md-4 mt-2 if-device-large" style="height:300px;">
                <div class="card h-100" v-on:click="openClimateMasterAction(5, 'reduce_long_term')">
                    <div class="number-class mx-auto my-auto text-center">
                        6
                    </div>
                    <!-- If this is already done, show check circle -->
                    <div v-if="climatemaster_steps_completed['reduce_long_term'] == true" class="text-center text-success">
                        <font-awesome-icon icon="check-circle" class="mt-1" style="font-size:50px;"/>                         
                    </div>
                    <h3 class="text-center">Langfristige Maßnahmen einleiten</h3>
                </div>
            </div>
            <div class="if-device-small col-12" style="height:300px;">
                <div class="card  h-100" v-on:click="openClimateMasterAction(3, 'become_climatemaster')">
                    <div class="number-class mx-auto my-auto text-center">
                        4
                    </div>
                    <!-- If this is already done, show check circle -->
                    <div v-if="climatemaster_steps_completed['become_climatemaster'] == true" class="text-center text-success">
                        <font-awesome-icon icon="check-circle" class="mt-1" style="font-size:50px;"/>                         
                    </div>
                    <h3 class="text-center">ClimateMaster werden</h3>
                </div>
            </div>
            <div class="col-md-1 if-device-large" id="id_div_center_left" style="height:150px;border-bottom: 10px dashed green;"></div>
            <div class="if-device-small" id="id_div_center_left" style="width:50%;height:150px;border-right: 10px dashed green;"></div>
            <div class="col-md-3 mt-2" id="id_div_center" style="height:300px;">
                <div class="card  h-100" v-on:click="openClimateMasterAction(4, 'present_progress')">
                    <div class="number-class mx-auto my-auto text-center">
                        5
                    </div>
                    <!-- If this is already done, show check circle -->
                    <div v-if="climatemaster_steps_completed['present_progress'] == true" class="text-center text-success">
                        <font-awesome-icon icon="check-circle" class="mt-1" style="font-size:50px;"/>                         
                    </div>
                    <h3 class="text-center">Fortschritt präsentieren, Freunde für Klimaschutz gewinnen</h3>
                </div>
            </div>
            <div class="col-md-1 if-device-large" id="id_div_center_right" style="height:150px;border-bottom: 10px dashed green;"></div>
            <div class="if-device-small" id="id_div_center_left" style="width:50%;height:150px;border-right: 10px dashed green;"></div>
            <div class="col-md-3 mt-2 if-device-large" id="id_div_toSwap2" style="height:300px;">
                <div class="card h-100" v-on:click="openClimateMasterAction(3, 'become_climatemaster')">
                    <div class="number-class mx-auto my-auto text-center">
                        4
                    </div>
                    <!-- If this is already done, show check circle -->
                    <div v-if="climatemaster_steps_completed['become_climatemaster'] == true" class="text-center text-success">
                        <font-awesome-icon icon="check-circle" class="mt-1" style="font-size:50px;"/>                         
                    </div>
                    <h3 class="text-center">ClimateMaster werden</h3>
                </div>
            </div> 
            <div class="if-device-small col-12" style="height:300px;">
                <div class="card  h-100" v-on:click="openClimateMasterAction(5, 'reduce_long_term')">
                    <div class="number-class mx-auto my-auto text-center">
                        6
                    </div>
                    <!-- If this is already done, show check circle -->
                    <div v-if="climatemaster_steps_completed['reduce_long_term'] == true" class="text-center text-success">
                        <font-awesome-icon icon="check-circle" class="mt-1" style="font-size:50px;"/>                         
                    </div>
                    <h3 class="text-center">Langfristige Maßnahmen einleiten</h3>
                </div>
            </div>
        </div>


        <!-- The Awards, if one thing is done -->
        <calculationCompleted id="id_congratulation_calculationCompleted" style="display:none;" @hideCongratulation_calculationCompleted="hideCongratulation_calculationCompleted"/>
        <reduceShortTermCompleted id="id_congratulation_reduceShortTermCompleted" style="display:none;" @hideCongratulation_reduceShortTermCompleted="hideCongratulation_reduceShortTermCompleted"/>
        <customizeCalculationCompleted id="id_congratulation_customizeCalculationCompleted" style="display:none;" @hideCongratulation_customizeCalculationCompleted="hideCongratulation_customizeCalculationCompleted"/>
        <becomeClimatemasterCompleted id="id_congratulation_becomeClimatemasterCompleted" style="display:none;" @hideCongratulation_becomeClimatemasterCompleted="hideCongratulation_becomeClimatemasterCompleted"/>



        <!-- Show the steps content on the end of page -->
        <div class="mt-4 bg-light rounded"  id="id_div_climateMasterSteps_integrated">

            <div class="container pt-2 pb-2 text-center rounded">
                            
                <calculateEmissions v-if="climateMasterActionsOpened[0]" @climatemaster_steps_completed_changed="climatemaster_steps_completed_changed" @open_next_step="openClimateMasterAction(1, 'reduce_short_term')"/>
            
                <reduceShortTerm v-if="climateMasterActionsOpened[1]"  @climatemaster_steps_completed_changed="climatemaster_steps_completed_changed" @open_next_step="openClimateMasterAction(2, 'customize_calculation')"/>

                <customizeCalculation v-if="climateMasterActionsOpened[2]" @climatemaster_steps_completed_changed="climatemaster_steps_completed_changed" @open_next_step="openClimateMasterAction(3, 'become_climatemaster')"/>

                <becomeClimateMaster v-if="climateMasterActionsOpened[3]" @climatemaster_steps_completed_changed="climatemaster_steps_completed_changed" @open_next_step="openClimateMasterAction(4, 'present_progress')"/>

                <presentProgressAndBeRewarded v-if="climateMasterActionsOpened[4]" />

                <reduceLongTerm v-if="climateMasterActionsOpened[5]"/>
                
            </div>  


        </div>
    </div>
</template>
<script>
import calculateEmissions from '~/components/MyClimateMasterActions/calculateEmissions';
import reduceShortTerm from '~/components/MyClimateMasterActions/reduceShortTerm';
import customizeCalculation from '~/components/MyClimateMasterActions/customizeCalculation';
import becomeClimateMaster from '~/components/MyClimateMasterActions/becomeClimateMaster';
import presentProgressAndBeRewarded from '~/components/MyClimateMasterActions/presentProgressAndBeRewarded';
import reduceLongTerm from '~/components/MyClimateMasterActions/reduceLongTerm';

import calculationCompleted from '~/components/MyClimateMasterActions/Awards/calculationCompleted';
import reduceShortTermCompleted from '~/components/MyClimateMasterActions/Awards/reduceShortTermCompleted';
import customizeCalculationCompleted from '~/components/MyClimateMasterActions/Awards/customizeCalculationCompleted';
import becomeClimatemasterCompleted from '~/components/MyClimateMasterActions/Awards/becomeClimatemasterCompleted';


var VueScrollTo = require('vue-scrollto');

export default {
    middleware: 'auth',
    components:{
        calculateEmissions,
        reduceShortTerm,
        customizeCalculation,
        becomeClimateMaster,
        presentProgressAndBeRewarded,
        reduceLongTerm,

        calculationCompleted,
        reduceShortTermCompleted,
        customizeCalculationCompleted,
        becomeClimatemasterCompleted
    },
    data(){
        return{
            climateMasterActionsOpened: [false, false, false, false, false, false],
            climatemaster_steps_completed: {},
        }
    },
    async mounted(){
        
        try {
            //Get the already completed climatemastersteps of this user
            const{data} = await this.$axios.post("climatemaster_steps_completed/getCurrentClimatemaster_steps_completed");
            if(data.state == "error"){
                
            }
            else if(data.state == "success"){
                this.climatemaster_steps_completed = data.data;          
            }
            else{
                
            }
        } catch (e) {
            
        }


    },
    methods:{
        openClimateMasterAction(indexNumber, stepname){
            var temp = [false, false, false, false, false, false]
            //If this step is already done -> don't open
            if(this.climatemaster_steps_completed[stepname] != true){
                temp[indexNumber] = true;

                //if want to open step 2, 3 or 4 -> the step before has to be done!
                if(temp[1]){
                    if(this.climatemaster_steps_completed['calculate']){
                        this.climateMasterActionsOpened = temp;
                        var scrollTo = VueScrollTo.scrollTo("#id_div_climateMasterSteps_integrated"); 
                    }
                }
                else if(temp[2]){
                    if(this.climatemaster_steps_completed['reduce_short_term']){
                        this.climateMasterActionsOpened = temp;
                        var scrollTo = VueScrollTo.scrollTo("#id_div_climateMasterSteps_integrated"); 
                    }
                }
                else if(temp[3]){
                    if(this.climatemaster_steps_completed['customize_calculation']){
                        this.climateMasterActionsOpened = temp;
                        var scrollTo = VueScrollTo.scrollTo("#id_div_climateMasterSteps_integrated"); 
                    }
                }
                // If other not completed step is clicked => just open
                else{
                    this.climateMasterActionsOpened = temp;
                    var scrollTo = VueScrollTo.scrollTo("#id_div_climateMasterSteps_integrated");
                }

            }
        },
        async climatemaster_steps_completed_changed(){
            try {
                //Get the already completed climatemastersteps of this user
                const{data} = await this.$axios.post("climatemaster_steps_completed/getCurrentClimatemaster_steps_completed");
                if(data.state == "error"){
                    
                }
                else if(data.state == "success"){
                    this.climatemaster_steps_completed = data.data;

                    //Show the right congratulation:
                    if(this.climatemaster_steps_completed['calculate'] == true && this.climatemaster_steps_completed['reduce_short_term'] == false){
                        $("#id_congratulation_calculationCompleted").show();
                    }
                    else if(this.climatemaster_steps_completed['reduce_short_term'] == true && this.climatemaster_steps_completed['customize_calculation'] == false){
                        $("#id_congratulation_reduceShortTermCompleted").show();
                    }
                    else if(this.climatemaster_steps_completed['customize_calculation'] == true && this.climatemaster_steps_completed['become_climatemaster'] == false){
                        $("#id_congratulation_customizeCalculationCompleted").show();
                    }
                    else if(this.climatemaster_steps_completed['become_climatemaster']){
                        $("#id_congratulation_becomeClimatemasterCompleted").show();
                    }
                }
                else{
                    
                }
            } catch (e) {
                
            }
        },

        // Methods to hide the congratulations
        hideCongratulation_calculationCompleted(){
            $("#id_congratulation_calculationCompleted").hide();
        },
        hideCongratulation_reduceShortTermCompleted(){
            $("#id_congratulation_reduceShortTermCompleted").hide();
        },
        hideCongratulation_customizeCalculationCompleted(){
            $("#id_congratulation_customizeCalculationCompleted").hide();
        },        
        hideCongratulation_becomeClimatemasterCompleted(){
            $("#id_congratulation_becomeClimatemasterCompleted").hide();
        },
    }
}
</script>
<style>
.number-class{
    font-size:50px;
    border-radius:50%;
    border-style: dashed;
    width:80px;
    height:80px;
}

.if-device-small{
    display: none;
}
@media only screen and (max-width: 600px) {
.if-device-small{
    display: block;
}
.if-device-large{
    display: none;
}
}
</style>