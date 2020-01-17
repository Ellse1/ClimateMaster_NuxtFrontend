<template>
    <div>
        <div class="container text-center bg-light p-4" style="min-height:300px;">

            <h2 class="mb-5">Mein ClimateMaster</h2>

            <calculateEmissions />
           
            <reduceShortTerm class="mt-4"/>

            <costumizeCalculation class="mt-4" />

            <becomeClimateMaster class="mt-4" />

    	    <presentProgressAndBeRewarded class="mt-4" />

            <reduceLongTerm class="mt-4" />
            
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

export default {
    middleware: 'auth',
    components:{
        calculateEmissions,
        reduceShortTerm,
        costumizeCalculation,
        becomeClimateMaster,
        presentProgressAndBeRewarded,
        reduceLongTerm
    }
}
</script>
<style>
.header-for-action:hover{
    cursor: pointer;
}
</style>