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

        <!-- Electricity sellsers (Environmetaly friendly electricity) -->
        <div class="row mx-auto mt-2">
            <div class="col-md-4 mx-auto">
                <div class="col-10 mx-auto">
                    <img class="img-fluid" src="https://www.ews-schoenau.de/export/sites/ews/.resources/EWS_gefBlau_schraeg_oC_rgb.jpg_1676414505.jpg" />
                <small><a target="_blanc" href="https://www.ews-schoenau.de/oekostrom/">Zur Homepage von EWS</a></small>
                </div>
            </div>
            <div class="col-md-4 p-2 mx-auto">
                <div class="col-10 mx-auto">
                    <img class="img-fluid" src="https://upload.wikimedia.org/wikipedia/commons/4/4a/GPE_Logo_2016_rgb_hoch.jpg" />
                    <small><a target="_blanc" href="https://www.greenpeace-energy.de/privatkunden.html">Zur Homepage von Greenpeace Energy</a></small>
                </div>
            </div>
        </div>

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