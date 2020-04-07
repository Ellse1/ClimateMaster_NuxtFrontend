<template>
    <div>

        <!-- Headings -->
        <div  class="w-100 row mx-auto mt-4">
            <!-- Buttons to go to last sektor -->
            <button class="col-md-2 col-6 border border-dark rounded" v-on:click="openLastSektor">
                <font-awesome-icon icon="chevron-left" style="font-size:40px;"/>     
            </button>

            <!-- hide on screens smaler than md -->
            <div class="d-none d-md-block col-md-8">
                <h4 class="sector" >{{sektors[openedSektorIndex].name}}</h4>
                <font-awesome-icon :icon="sektors[openedSektorIndex].iconName" class="" style="font-size:40px;"/> 
            </div>

            <!-- Button to go to next sektor -->
            <button class="col-md-2 col-6 border border-dark rounded" v-on:click="openNextSektor">
                <font-awesome-icon icon="chevron-right" style="font-size:40px;"/>     
            </button>

            <!-- hide on screens larger than sm -->
            <div class="d-md-none mx-auto">
                <h4 class="sector">{{sektors[openedSektorIndex].name}}</h4>
                <font-awesome-icon :icon="sektors[openedSektorIndex].iconName" class="" style="font-size:40px;"/>   
            </div>
        </div>
        <co2reductionAdvicesEnergy v-if="sektors[openedSektorIndex].key == 'Energy'" />
        <co2reductionAdvicesMobility  v-if="sektors[openedSektorIndex].key == 'Mobility'"/>
        <co2reductionAdvicesConsumption  v-if="sektors[openedSektorIndex].key == 'Consumption'"/>
        <co2reductionAdvicesNutrition  v-if="sektors[openedSektorIndex].key == 'Nutrition'"/>
        <co2reductionAdvicesPublicEmissions  v-if="sektors[openedSektorIndex].key == 'PublicEmissions'"/>


    </div>
</template>
<script>
import co2reductionAdvicesEnergy from '~/components/CO2ReductionAdvices/co2reduction_advices_energy';
import co2reductionAdvicesMobility from '~/components/CO2ReductionAdvices/co2reduction_advices_mobility';
import co2reductionAdvicesConsumption from '~/components/CO2ReductionAdvices/co2reduction_advices_consumption';
import co2reductionAdvicesNutrition from '~/components/CO2ReductionAdvices/co2reduction_advices_nutrition';
import co2reductionAdvicesPublicEmissions from '~/components/CO2ReductionAdvices/co2reduction_advices_public_emissions';

export default {
    components:{
        //namesNotEnglish -> name finding automatet
        co2reductionAdvicesEnergy,
        co2reductionAdvicesMobility,
        co2reductionAdvicesConsumption,
        co2reductionAdvicesNutrition,
        co2reductionAdvicesPublicEmissions
    },
    data(){
        return {
            openedSektorIndex : 0,
            sektors : [ {key: "Energy", name: "Energie", iconName: "plug"}, 
                        {key: "Mobility", name: "Mobilität", iconName: "car"}, 
                        {key: "Consumption", name:"Konsum", iconName: "cart-arrow-down"}, 
                        {key: "Nutrition", name: "Ernährung", iconName: "hamburger"},
                        {key: "PublicEmissions", name:  "Öffentliche Emissionen", iconName: "users"}
                    ]
        }
    },
    methods:{
        openNextSektor(){
            if(this.openedSektorIndex <= 3){this.openedSektorIndex = this.openedSektorIndex + 1;}
        },
        openLastSektor(){
            if(this.openedSektorIndex >= 1){this.openedSektorIndex = this.openedSektorIndex -1;}
        }
    }

}
</script>

<style scoped>

.sector{
    /* position: absolute; */
    /* left:10px; */
    animation: EaseIn 1s ease-in 1;
}

@keyframes EaseIn{
    0%{opacity: 0;}
    100%{opacity: 1;}
}
</style>