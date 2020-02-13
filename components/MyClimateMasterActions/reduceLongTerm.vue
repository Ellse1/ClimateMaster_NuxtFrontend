<template>
    <div>
        <div class="border border-dark rounded container">
            <div class="w-100 row">
               <div class="col-1">
                    <font-awesome-icon icon="globe" class="mt-1" style="font-size:50px;"/>                         
               </div>
               <div class="col-10">
                   <div class="number-class mx-auto mt-1">
                       6
                   </div>
               </div>
            </div>
            <h4>Langfristige Maßnahmen einleiten</h4>

            <div class="container">
                <p>
                    Es ist wirklich sehr bemerkenswert, wie du dich für konsequenten Klimaschutz einsetzt.
                    Unter "Climadvices" findest du noch einmal die effizientesten Möglichkeiten, Umweltfreundlich
                    zu leben. Kannst in diesem Jahr vielleicht langfristige Klimaschutzmaßnahme einleiten?
                </p>


                <co2calculationChart :props_with_compensation="is_climatemaster" />


                <nuxt-link to="climadvices" class="btn btn-success mt-2 mb-2 px-4">Climadvices</nuxt-link>

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
            is_climatemaster: false
        };
    },
    async mounted(){
        //Check if User is climatemaster -> show compensation too
        try {
            const{data} = await this.$axios.post("climatemaster_steps_completed/getCurrentClimatemaster_steps_completed");

            //If current user didn't do the first step -> has no climatemaster_steps_completed for this year
            if(data.state == "error"){
                $is_climatemaster = false;
            }
            if(data.state == "success"){
                this.is_climatemaster = data.data['become_climateamster'];
            }
        } catch (e) {
            
        }
    }
}
</script>