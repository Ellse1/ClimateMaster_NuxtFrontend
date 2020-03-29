<template>
    <div>
        <p>
            Durch die Wahl eines Ökostromanbieters kauft man 100% Strom aus klimafreundlichen, erneuerbaren Energien. 
            Der Strom wird also mit Photovoltaikanlagen, Windkraftanlagen, in Wasserkraftwerken oder mit anderen umweltfreundlichen,
            sauberen Technologien produziert. Der Strompreis für den Käufer unterscheidet sich dabei nicht merklich von
            anderen Anbietern. Viele deutsche Stromkunden sind noch beim Grundversorger und haben Ihren Stromanbieter
            noch nicht selbst gewählt. Für diese gilt: Grüner Strom ist billiger als der Strom, der vom Grundversorger bzw. 
            Netzbetreiber angeboten wird. Ein Vertragswechsel lohnt sich.
        </p>


        <slideshowOfCompaniesOfClimadviceName :climadvice_name="'buyGreenElectricity'" />

    </div>
</template>
<script>
import slideshowOfCompaniesOfClimadviceName from '~/components/Company/slideshowOfCompaniesOfClimadviceName';
export default {
    components:{
        slideshowOfCompaniesOfClimadviceName
    }
}
</script>