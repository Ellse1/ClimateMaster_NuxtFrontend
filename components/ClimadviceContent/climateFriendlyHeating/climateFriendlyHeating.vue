<template>
    <div>
        <div id="id_div_content_heating">
            <p>
                Mit Erneuerbaren Energien kann deine Wohnung professionell, effizient und sehr klimafreundlich beheizt werden.
            </p>
            <div class="row mx-auto">
                <div class="col-md-4 mx-auto">
                    <div class="col-10 mx-auto">
                        <img class="img-fluid" src="https://cdn.pixabay.com/photo/2018/11/14/09/01/pellets-3814711_1280.jpg" />
                        <p>
                            In einer modernen <b>Pelletheizung</b> wird der klimafreundliche Energieträger Holz sehr energieeffizient verbrannt.
                        </p>
                    </div>
                </div>
                <div class="col-md-4 mx-auto">
                    <div class="col-10 mx-auto">
                        <img class="img-fluid" src="https://cdn.pixabay.com/photo/2014/07/14/11/59/heat-pumps-393059_1280.jpg" />
                        <p>
                            Eine <b>Elektrowärmepumpe</b> wandelt elektrische Energie sehr effizient in Wärmeenergie um. 
                            Aus Klimaschutzgründen bietet sich hierzu natürlich ein Ökostromanbieter an.
                        </p>
                    </div>
                </div>
                <div class="col-md-4 mx-auto">
                    <div class="col-10 mx-auto">
                        <img class="img-fluid" src="https://cdn.pixabay.com/photo/2018/04/21/11/48/solar-3338296_1280.png" />
                        <p>
                            Die auf dem Dach installierte <b>Solarthermie</b> nutzt Sonnenenergie um damit einen Teil deines Heizenergiebedarfs zu decken.
                        </p>
                    </div>
                </div>
                <div class="col-md-4 mx-auto">
                    <div class="col-10 mx-auto">
                        <img class="img-fluid" src="https://cdn.pixabay.com/photo/2016/10/30/21/51/village-1784455_1280.jpg" />
                        <p>
                            In Bioenergiedörfern bekommt man klimafreundliche <b>Fernwärme bzw. Nahwärme</b>.
                            Dann muss man sich nicht mehr um die eigene, klimafreundliche Wärmeversorgung kümmern.
                        </p>
                    </div>
                </div>
                <div class="col-md-4 mx-auto">
                    <div class="col-10 mx-auto">
                        <img class="img-fluid" src="https://cdn.pixabay.com/photo/2015/01/26/16/24/wood-chips-612825_1280.jpg" />
                        <p>
                            Wie alle Biomassen sind auch <b>Hackschnitzel</b> klimafreundliche Energieträger für Wärmeerzeugungsanlagen. 
                        </p>
                    </div>
                </div>
            </div>
            <p>
                Im Zuge des Klimapakets 2020 wurde ein neues <b>Förderprogramm</b> für klimafreundliche Heizungen
                eingeführt. Beim Einbau einer neuen, klimafreundlichen Heizung können damit bis zu <b>45%</b> der Anschaffungs- und Installationskosten gefördert werden. Der geförderte Betrag 
                muss nicht zurückgezahlt werden.
                Einen gute Erklärung welche Fördermittel für eine neue, klimafreundliche Heizungsanlage beantragt werden können, gibt CO2Online unter<br>
                <a target="_blanc" href="https://www.co2online.de/foerdermittel/bafa-foerderung/">Bafa-Förderung</a>.
            </p>

        </div>

        <slideshowOfCompaniesOfClimadviceName :climadvice_name="'climateFriendlyHeating'" />

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