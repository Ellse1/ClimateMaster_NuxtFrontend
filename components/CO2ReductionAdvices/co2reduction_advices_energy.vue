<template>
    <div>
         <!-- sub headings -->
        <div class="row mt-2 mb-2">
            <div class="col">
                <button id="id_button_buyGreenElectricity" class="btn btn-default border border-success text-success mt-2" v-on:click="open_content(0)">
                    <font-awesome-icon icon="plug"  style="font-size:20px;"/>     
                </button>
            </div>
            <div class="col">
                <button id="id_button_installPhotovoltaik" class="btn btn-default border border-dark mt-2" v-on:click="open_content(1)">
                    <font-awesome-icon icon="sun"  style="font-size:20px;"/>     
                </button>
            </div>   
            <div class="col">
                <button id="id_button_heating" class="btn btn-default border border-dark mt-2"  v-on:click="open_content(2)">
                    <font-awesome-icon icon="fire"  style="font-size:20px;"/>     
                </button>
            </div>         
            <div class="col">
                <button id="id_button_buildingInsulation" class="btn btn-default border border-dark mt-2" v-on:click="open_content(3)" >
                    <font-awesome-icon icon="home"  style="font-size:20px;"/>     
                </button>
            </div>
            <div class="col">
                <button id="id_button_saveEnergy" class="btn btn-default border border-dark mt-2"  v-on:click="open_content(4)">
                    <font-awesome-icon icon="power-off"  style="font-size:20px;"/>     
                </button>
            </div>
        </div>
        <!-- Buttons to open next tip -->
        <div class="text-center">
            <button class="border border-dark rounded" v-on:click="openLastContent">
                <font-awesome-icon icon="chevron-left" style="font-size:30px;"/>     
            </button>
            <button class="border border-dark rounded" v-on:click="openNextContent">
                <font-awesome-icon icon="chevron-right" style="font-size:30px;"/>     
            </button>
        </div>


        <!-- real Content -->

        <!-- Content: Buy green electricity -->
        <div id="id_div_content_buyGreenElectricity">
            <b>Ökostrom kaufen</b>
            <p> Schütze die Umwelt mit einem Ökostromanbieter. Auch als Mieter oder WG Mitbewohner! </p>
            
            <!-- Button to toggle 'more info' -->
            <a href="#"  type="button" data-toggle="collapse" data-target="#informationCollapse" aria-controls="informationCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    Info umklappen
            </a>
            <!-- more info -->
            <div class="collapse" id="informationCollapse">
                <p>         
                    Durch die Wahl eines Ökostromanbieters kauft man 100% Strom aus klimafreundlichen, erneuerbaren Energien. 
                    Der Strom wird also mit Photovoltaikanlagen, Windkraftanlagen, in Wasserkraftwerken oder mit anderen umweltfreundlichen,
                    sauberen Technologien produziert. Der Strompreis für den Käufer unterscheidet sich dabei nicht merklich von
                    anderen Anbietern. Viele deutsche Stromkunden sind noch beim Grundversorger und haben Ihren Stromanbieter
                    noch nicht selbst gewählt. Für diese gilt: Grüner Strom ist billiger als der Strom, der vom Grundversorger bzw. 
                    Netzbetreiber angeboten wird. Ein Vertragswechsel lohnt sich.
                </p>

            </div>
            
            <!-- Electricity sellsers (Environmetaly friendly electricity) -->
            <div class="row mx-auto mt-2">
                <div class="col-md-4 mx-auto">
                    <div class="col-10 mx-auto">
                        <img class="img-fluid" src="https://www.ews-schoenau.de/export/sites/ews/.resources/EWS_gefBlau_schraeg_oC_rgb.jpg_1676414505.jpg" />
                    <small><a target="_blanc" href="https://www.ews-schoenau.de/">Zur Homepage von EWS</a></small>
                    </div>
                </div>
                <div class="col-md-4 p-2 mx-auto">
                    <div class="col-10 mx-auto">
                        <img class="img-fluid" src="https://upload.wikimedia.org/wikipedia/commons/4/4a/GPE_Logo_2016_rgb_hoch.jpg" />
                        <small><a target="_blanc" href="https://www.greenpeace-energy.de/privatkunden.html">Zur Homepage von Greenpeace Energy</a></small>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Content Buy Green Electricity -->
        <!-- Content: InstallPhotovoltaik -->
        <div id="id_div_content_installPhotovoltaik" style="display:none;">
            <b>Photovoltaikanlage kaufen</b>
            <p>Hast du ungenutzte Dachfläche? 1.020.000 Privathaushalte in Deutschland produzieren mit Photovoltaikmodulen ihren eigenen klimafreundlichen Strom.<br>Auch für Vermieter geeignet!</p>
        
            <!-- Photovoltaik companies -->
            <div class="row mx-auto">
                <div class="col-md-4 mx-auto">
                    <div class="col-10 mx-auto">
                        <img class="img-fluid" src="https://negmbh.de/sites/negmbh.de/files/logo.png" />
                        <p>
                            Photovoltaikanlagen im Schwarzwald-Baar-Kreis<br>
                            <small><a target="_blanc" href="https://negmbh.de/">Zur Homepage von Neue Energien Projekt GmbH</a></small>
                        </p>
                    </div>
                </div>
                <div class="col-md-4 p-2 mx-auto">
                    <div class="col-10 mx-auto">
                        <img class="img-fluid" src="https://d2h1t9243qzgjg.cloudfront.net/uploads/attachment/image/80954/untouched_solaranlage-solar-panele.jpg" />
                        Auf aroundhome.de kannst du <b>unverbindliche Angebote</b> für eine Photovoltaikanlage anfordern.<br>
                        <small><a target="_blanc" href="https://www.aroundhome.de/solaranlage/">Zu aroundhome Photovoltaik</a></small>
                    
                    </div>
                </div>
            </div>

            <p>
                Eine unverbindliche <b>Wirtschaftlichkeitsberechnung</b> für eine mögliche Photovoltaikanlage
                gibt es unter unter <br><a target="_blanc" href="https://www.co2online.de/service/energiesparchecks/solardachcheck/">CO2Online Solardachcheck</a>.
            </p>

        </div>
        <!-- End Content: Install Photovoltaik -->

        <!-- Content: Climatefriendly heating  -->
        <div id="id_div_content_heating" style="display:none;">
            <b>klimafreundlich heizen</b>
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
                            In Bioenergiedörfern bekommt man klimafreundliche <b>Fernwärme</b>.
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
        <!-- End Content: Climatefriendly heating -->

        
        <!-- Content: Building and Insulation -->
        <div id="id_div_content_buildingInsulation" style="display:none;">
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

        

         <!-- Content: Save Energy  -->
        <div id="id_div_content_saveEnergy" style="display:none;">
            <b>Energie sparen</b>
            <div class="row mt-4">
                <div class="col">
                    <font-awesome-icon icon="home" class="" style="font-size:40px;"/>
                    <font-awesome-icon icon="fire" class="" style="font-size:40px;"/><br>
                    <b>75-90%</b><br>
                    Die Heizenergie macht etwa 75-90% des Energiebedars eines Haushaltes aus.*<br>
                </div>
                <div class="col">
                    <font-awesome-icon icon="home" class="" style="font-size:40px;"/>
                    <font-awesome-icon icon="plug" class="" style="font-size:40px;"/><br>
                    <b>10-25%</b><br>
                    Stom macht ca. 10-25% des Energiebedars eines Haushaltes aus.*<br>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    Wirkungsvolle Checks zum kosten senken und Heizenergie sparen findest du unter <br>
                    <a target="_blanc" href="https://www.co2online.de/energie-sparen/heizenergie-sparen/">CO2Online Heizenergie sparen</a>
                </div>
                <div class="col">
                    Wirkungsvolle Checks zum Strom sparen findest du unter <br>
                    <a target="_blanc" href="https://www.co2online.de/energie-sparen/strom-sparen/">CO2Online Stom sparen</a>
                </div>
            </div>
            <small>*Quelle: https://www.co2online.de/energie-sparen/</small>
        </div>
        <!-- End Content: save energy -->

    </div>
</template>

<script>
export default {
    data(){
        return{
            openedContentIndex : 0,
            contents : [
                {key: "buyGreenElectricity"},
                {key: "installPhotovoltaik"},
                {key: "heating"},
                {key: "buildingInsulation"},
                {key: "saveEnergy"}
            ]
        };
    },
    methods:{
        open_content(contentIndexToOpen){
            // Close opened info
            $("#id_button_" + this.contents[this.openedContentIndex].key).removeClass("border-success text-success").addClass("border-dark text-dark");
            $("#id_div_content_" + this.contents[this.openedContentIndex].key).hide();
            this.openedContentIndex = contentIndexToOpen;
            $("#id_div_content_" + this.contents[this.openedContentIndex].key).show();
            $("#id_button_" + this.contents[this.openedContentIndex].key).removeClass("border-dark text-dark").addClass("border-success text-success");
        },
        openNextContent(){
            $("#id_div_content_" + this.contents[this.openedContentIndex].key).hide();
            $("#id_button_" + this.contents[this.openedContentIndex].key).removeClass("border-success text-success").addClass("border-dark text-dark");
            if(this.openedContentIndex <= 3){
                this.openedContentIndex = this.openedContentIndex + 1;
            }
            $("#id_div_content_" + this.contents[this.openedContentIndex].key).show();
            $("#id_button_" + this.contents[this.openedContentIndex].key).removeClass("border-dark text-dark").addClass("border-success text-success");

        },
        openLastContent(){
            $("#id_div_content_" + this.contents[this.openedContentIndex].key).hide();
            $("#id_button_" + this.contents[this.openedContentIndex].key).removeClass("border-success text-success").addClass("border-dark text-dark");

            if(this.openedContentIndex >= 1){
                this.openedContentIndex = this.openedContentIndex - 1;
            }
            $("#id_div_content_" + this.contents[this.openedContentIndex].key).show();
            $("#id_button_" + this.contents[this.openedContentIndex].key).removeClass("border-dark text-dark").addClass("border-success text-success");

        }
    }
}
</script>