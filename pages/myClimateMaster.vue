<template>
    <div class="container pb-4">

        <!-- Dieser Teil ist noch im Aufbau -->
        <div class="bg-light border border-success text-center p-3">
            <h4>Noch im Aufbau</h4>
            Hallo {{user.firstname}},<br>
            Diese Seite ist leider noch im Aufbau, deshalb können wir dich noch nicht so umfangreich bei den einzelnen
            Schritten zur persönlichen Klimaneutralität unterstützen, wie wir es gerne würden. 
            Trotzdem kannst du diesen Schritten folgen, um deinen persönlichen Treibhausgasausstoß zu verringern und klimaneutral zu werden.
            Bei weiteren Fragen kannst du dich gerne an uns wenden: elias.singer@online.de. <br>
            <b>Vielen Dank für dein Verständnis und deine Anstrengungen für den Umwelt- und Klimaschutz!</b>
        </div>


        <div class="row">
            <div class="col-md-4 mt-2" style="height:300px;">
                <div class="card h-100" v-on:click="openClimateMasterAction(0)">
                    <div class="number-class mx-auto my-auto text-center">
                        1
                    </div>
                    <h3 class="text-center">CO2 Ausstoß berechnen</h3>
                </div>
            </div>
            <div class="col-md-1 col-sm-6 if-device-large" style="height:150px;border-bottom: 10px dashed green;"></div>
            <div class="if-device-small" id="id_div_center_left" style="width:80%;height:150px;border-right: 10px dashed green;"></div>
            <div class="col-md-3 mt-2" style="height:300px;">
                <div class="card h-100" v-on:click="openClimateMasterAction(1)">
                    <div class="number-class mx-auto my-auto text-center">
                        2
                    </div>
                    <h3 class="text-center">Treibhausgase einfach und effizient vermeiden</h3>
                </div>
            </div>
            <div class="col-md-1 if-device-large" style="height:150px;border-bottom: 10px dashed green;"></div>
            <div class="if-device-small" id="id_div_center_left" style="width:20%;height:150px;border-right: 10px dashed green;"></div>
            <div class="col-md-3 mt-2" style="height:300px;">
                <div class="card h-100" v-on:click="openClimateMasterAction(2)">
                    <div class="number-class mx-auto my-auto text-center">
                        3
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
                <div class="card h-100" v-on:click="openClimateMasterAction(5)">
                    <div class="number-class mx-auto my-auto text-center">
                        6
                    </div>
                    <h3 class="text-center">Langfristige Maßnahmen einleiten</h3>
                </div>
            </div>
            <div class="if-device-small col-12" style="height:300px;">
                <div class="card  h-100" v-on:click="openClimateMasterAction(3)">
                    <div class="number-class mx-auto my-auto text-center">
                        4
                    </div>
                    <h3 class="text-center">ClimateMaster werden</h3>
                </div>
            </div>
            <div class="col-md-1 if-device-large" id="id_div_center_left" style="height:150px;border-bottom: 10px dashed green;"></div>
            <div class="if-device-small" id="id_div_center_left" style="width:50%;height:150px;border-right: 10px dashed green;"></div>
            <div class="col-md-3 mt-2" id="id_div_center" style="height:300px;">
                <div class="card  h-100" v-on:click="openClimateMasterAction(4)">
                    <div class="number-class mx-auto my-auto text-center">
                        5
                    </div>
                    <h3 class="text-center">Fortschritt präsentieren und Mittmenschen begeistern</h3>
                </div>
            </div>
            <div class="col-md-1 if-device-large" id="id_div_center_right" style="height:150px;border-bottom: 10px dashed green;"></div>
            <div class="if-device-small" id="id_div_center_left" style="width:50%;height:150px;border-right: 10px dashed green;"></div>
            <div class="col-md-3 mt-2 if-device-large" id="id_div_toSwap2" style="height:300px;">
                <div class="card h-100" v-on:click="openClimateMasterAction(3)">
                    <div class="number-class mx-auto my-auto text-center">
                        4
                    </div>
                    <h3 class="text-center">ClimateMaster werden</h3>
                </div>
            </div> 
            <div class="if-device-small col-12" style="height:300px;">
                <div class="card  h-100" v-on:click="openClimateMasterAction(5)">
                    <div class="number-class mx-auto my-auto text-center">
                        6
                    </div>
                    <h3 class="text-center">Langfristige Maßnahmen einleiten</h3>
                </div>
            </div>
        </div>

        <div class="mt-4"  id="id_div_climateMasterSteps_integrated">

            <div class="container pt-2 pb-2 text-center rounded">
                            
                <calculateEmissions v-if="climateMasterActionsOpened[0] == true"/>
            
                <reduceShortTerm v-if="climateMasterActionsOpened[1]"/>

                <costumizeCalculation v-if="climateMasterActionsOpened[2]"/>

                <becomeClimateMaster v-if="climateMasterActionsOpened[3]"/>

                <presentProgressAndBeRewarded v-if="climateMasterActionsOpened[4]" />

                <reduceLongTerm v-if="climateMasterActionsOpened[5]"/>
                
            </div>  


        </div>
    </div>
</template>
<script>
import calculateEmissions from '~/components/MyClimateMasterActions/calculateEmissions';
import reduceShortTerm from '~/components/MyClimateMasterActions/reduceShortTerm';
import costumizeCalculation from '~/components/MyClimateMasterActions/costumizeCalculation';
import becomeClimateMaster from '~/components/MyClimateMasterActions/becomeClimateMaster';
import presentProgressAndBeRewarded from '~/components/MyClimateMasterActions/presentProgressAndBeRewarded';
import reduceLongTerm from '~/components/MyClimateMasterActions/reduceLongTerm';

var VueScrollTo = require('vue-scrollto');

export default {
    components:{
        calculateEmissions,
        reduceShortTerm,
        costumizeCalculation,
        becomeClimateMaster,
        presentProgressAndBeRewarded,
        reduceLongTerm
    },
    data(){
        return{
            climateMasterActionsOpened: [false, false, false, false, false, false]
        }
    },
    methods:{
        openClimateMasterAction(indexNumber){
            var temp = [false, false, false, false, false, false]
            temp[indexNumber] = true;
            this.climateMasterActionsOpened = temp;
            // Show now background color light:
            $("#id_div_climateMasterSteps_integrated").addClass("bg-light");
            var scrollTo = VueScrollTo.scrollTo("#id_div_climateMasterSteps_integrated");

        }
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