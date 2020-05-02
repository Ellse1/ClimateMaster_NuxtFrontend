<template>
    <div>
        <!-- Content: Building and Insulation -->
        <div id="id_div_content_buildingInsulation">
            <b>Haus dämmen und isolieren</b>
            <div class="row mt-4">
                <div class="col-md-4 mx-auto mt-2">
                    Altbau<br>Energiebedarf
                    <div class="row">
                        <div class="col-6">
                            Unsaniert<br>
                            <font-awesome-icon icon="home" class="" style="font-size:40px;"/>  <br>
                            100%   
                        </div>
                        <div class="col-6">
                            Saniert<br>
                            <font-awesome-icon icon="home" class="text-success" style="font-size:40px;"/>     <br>
                            -52%
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mx-auto mt-2">
                    Neubau<br>Energiebedarf
                    <div class="row">
                        <div class="col-6">
                            Standard<br>
                            <font-awesome-icon icon="home" class="" style="font-size:40px;"/><br>
                            100%     
                        </div>
                        <div class="col-6">
                            Passivhaus<br>
                            <font-awesome-icon icon="home" class="text-success" style="font-size:40px;"/><br>
                            -75%     
                        </div>
                    </div>
                </div><br>
            </div>
            <small>Quelle: https://www.co2online.de/modernisieren-und-bauen/</small>


            <p class="mt-2">
                Auf CO2Online.de gibt es einen <b>online Modernisierungscheck</b>. Mit diesem kann berechnet werden, ob sich eine 
                Modernisierung des Gebäudebestandes aus wirtschaftlichen Aspekten lohnt. Um Heizkosten zu sparen und das Klima zu schützen, 
                ist es sinnvoll, diesen Check durchzuführen und eine mögliche Sanierung zu prüfen.<br>
                <a href="https://www.co2online.de/modernisieren-und-bauen/">Zum Modernisierungscheck</a>
            </p>
            <p></p>
        </div>
        <!-- End Content: Install Photovoltaik -->


        
        <slideshowOfCompaniesOfClimadviceName :climadvice_name="'houseIsolation'" />
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