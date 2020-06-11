<template>
    <div>
        <p>
            Das Themenfeld Ernährung ist eine super Chance um deinen Klimaschutz-Handabdruck 
            schnell und effizient zu vergrößern (lese hier nach, warum ein großer Handabdruck 
            (Gegenteil zu Fußabdruck) gut ist). Schon eine kleine Veränderung in deinem Fleischkonsum 
            Verhalten hat eine große Auswirkung auf deinen Handabdruck doch auch Saisonal und Regional 
            einkaufen vergrößert diesen erheblich.
            Und weil das nicht immer so leicht ist, findest du hier praktische Tipps und leckere 
            Klimafreundliche Rezepte.
        </p>



        <!-- sub headings -->
        <div class="row mt-2 mb-2">
            <div class="col">
                <button id="id_button_recipes" class="btn btn-default border border-success text-success mt-2" v-on:click="open_content(0)">
                    <font-awesome-icon icon="pizza-slice"  style="font-size:20px;"/>  <br>
                    Rezepte   
                </button>
            </div>
            <div class="col">
                <button id="id_button_bioSeal" class="btn btn-default border border-dark mt-2" v-on:click="open_content(1)">
                    <font-awesome-icon icon="seedling"  style="font-size:20px;"/>  <br>  
                    Wichtige Qualitätssiegel 
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

        <!-- Content: Recepis -->
        <div id="id_div_content_recipes">
            <!-- sub headings recipes-->
            <div class="row mt-2 mb-2">
                <div class="col">
                    <button id="id_button_recipes_pastaBake" class="btn btn-default border border-success text-success mt-2" v-on:click="open_recipe_content(0)">
                        Nudelauflauf   
                    </button>
                </div>
                <div class="col">
                    <button id="id_button_recipes_bakedPotato" class="btn btn-default border border-dark mt-2" v-on:click="open_recipe_content(1)">
                        Ofenkartoffeln 2erlei
                    </button>
                </div>  
                <div class="col">
                    <button id="id_button_recipes_pencakes" class="btn btn-default border border-dark mt-2" v-on:click="open_recipe_content(2)">
                        Vegane Pfannkuchen   
                    </button>
                </div>
                <div class="col">
                    <button id="id_button_recipes_pastaSalad" class="btn btn-default border border-dark mt-2" v-on:click="open_recipe_content(3)">
                        Nudelsalat
                    </button>
                </div>             
            </div>


            <!-- Content: PastaBake -->
            <div id="id_div_content_recipes_pastaBake">
                <b>Nudelauflauf</b>
                <div>
                    Kochzeit ca. 40 Min<br>
                    Gesamtzeit ca. 60 Min                    
                </div>
                <div class="row">
                    <div class="col-md-4 text-left">
                        Zutaten für 4 Personen: 
                        <ul>
                            <li>120g Blatspinat (oder 100 g TK Spinat)</li>
                            <li>500 g Fusilli</li>
                            <li>Salz </li>
                            <li>1 Zwiebel </li>                    
                            <li> 1 Knoblauchzehe </li>
                            <li>2 EL Margarine </li>
                            <li>2 EL Mehl</li>
                            <li>200 ml Sojamilch</li>
                            <li>250 ml Sojasahne</li>
                        </ul>
                    </div>
                    <div class="col-md-8 text-left">
                        Zubereitung:
                        <ol>
                            <li>Spinat (wenn tiefgekühlt) auftauen lassen. Nudeln in ausreichend Salzwasser bissfest kochen und abgießen.</li>
                            <li>Zwiebel und Knoblauch schälen und in kleine Würfel schneiden, Margarine in einer Pfanne erhitzen und beides glasig braten. Das Mehl dazugeben und mit Sojamilch und -sahne aufgießen. Einige Minuten sämig köcheln und vom Herd nehmen.</li>
                            <li>Räuchertofu in kleine Würfel schneiden und in die Soße geben. Mit Pfeffer, Salz und Muskat würzen. Tomaten waschen.</li>
                            <li>Eine Gratinform mit Margarine einfetten und die Nudeln hinein füllen. Tomaten und ausgedrückten Spinat in der Auflaufform verteilen. Alles mit der Soße übergießen.</li>
                            <li>Ofen auf 180 °C vorheizen und den Auflauf ca. 40 Minuten goldbraun backen.</li>
                        </ol>
                    </div>
                </div>
                Dieses Rezept gibt es auch auf 
                <a target="_blanc" href="https://www.rewe.de/rezepte/veganer-nudelauflauf/">www.rewe.de/rezepte/veganer-nudelauflauf/</a>.
            </div>
            <!-- end pasta bake -->
            <!-- Content: baked Potato -->
            <div id="id_div_content_recipes_bakedPotato" style="display:none;">
                <b>Ofenkartoffeln 2erlei</b>
                <div>
                    Kochzeit ca. 45 Min<br>
                    Gesamtzeit ca. 50 Min                    
                </div>
                <div class="row">
                    <div class="col-md-4 text-left">
                        Zutaten für 4 Personen: 
                        <ul>
                            <li>6m. große Kartoffeln</li>
                            <li>4m. große Süßkartoffel</li>
                            <li>3 Zweige Rosmarin, frisch  </li>
                            <li>1 EL Salz, grobkörnig </li>                    
                            <li>Spritzer Olivenöl  </li>
                            <li>1 TL, gehäuft Rosmarin, getrocknet</li>
                        </ul>
                    </div>
                    <div class="col-md-8 text-left">
                        Zubereitung:
                        <ol>
                            <li>Den Ofen auf 160-180 Grad, am besten mit der Funktion Infrabraten sofern vorhanden oder Heißluft, vorheizen. </li>
                            <li>Eine feuerfeste Form oder ein Blech mit ein paar Spritzern Olivenöl benetzen.</li>
                            <li>Die geschälten, in Spalten geschnittenen Kartoffeln und Süßkartoffeln einfüllen. Die Süßkartoffeln etwas grober schneiden, da sie schneller gar werden als die üblichen Kartoffeln.</li>
                            <li>Mit Olivenöl beträufeln und mit dem grobkörnigen Salz bestreuen. </li>
                            <li>Mit getrocknetem Rosmarin bestreuen und die frischen Rosmarin Zweige darüber legen.</li>
                            <li>Nun die Kartoffeln im Ofen backen.</li>
                            <li>Nach ca. 15 Minuten die Kartoffeln nochmals mit etwas Olivenöl beträufeln. </li>
                            <li>Nach ca. 30 Minuten die Garprobe machen.</li>
                        </ol>
                    </div>
                </div>
                Dieses Rezept gibt es auch auf 
                <a target="_blanc" href="https://www.chefkoch.de/rezepte/2564901401399891/Zweierlei-Ofenkartoffeln.html">www.chefkoch.de/rezepte/2564901401399891/Zweierlei-Ofenkartoffeln.html</a>.
            </div>
            <!-- end baked Potato -->
            <!-- Content: pencakes -->
            <div id="id_div_content_recipes_pencakes" style="display:none;">
                <b>Vegane Pfannkuchen</b>
                <div>
                    Ruhezeit ca. 30 Min<br>
                    Gesamtzeit ca. 50 Min                    
                </div>
                <div class="row">
                    <div class="col-md-4 text-left">
                        Zutaten für 4 Personen: 
                        <ul>
                            <li>400 ml Mandelmilch oder Hafermilch</li>
                            <li>300 g Bio-Vollkorn-Dinkelmehl</li>
                            <li>eine Messerspitze Backpulver</li>
                            <li>200 ml Mineralwasser</li>                    
                            <li>Eine Prise Salz</li>
                            <li>Pflanzenöl zum Braten</li>
                        </ul>
                    </div>
                    <div class="col-md-8 text-left">
                        Zubereitung:
                        <ol>
                            <li>Vermische das Dinkelmehl mit dem Backpulver und dem Salz in einer großen Rührschüssel.</li>
                            <li>Anschließend fügst du die Mandelmilch hinzu und vermischst alles mit einem Schneebesen.</li>
                            <li>Lasse nun den Teig für ca. 30 Minuten ruhen und füge dann das Mineralwasser hinzu und rühre nochmals um. </li>
                            <li>Nun müssen die Pfannekuchen nur noch in einer Pfanne ausgebacken werden.</li>

                        </ol>
                    </div>
                </div>
                Dieses Rezept gibt es auch auf 
                <a target="_blanc" href="https://utopia.de/ratgeber/vegane-pfannkuchen-leckeres-rezept-ohne-milch-und-ei/">www.utopia.de/ratgeber/vegane-pfannkuchen-leckeres-rezept-ohne-milch-und-ei/</a>.
            </div>
            <!-- end pencakes -->
            <!-- Content: pasta salad -->
            <div id="id_div_content_recipes_pastaSalad" style="display:none;">
                <b>Nudelsalat</b>
                <div>
                    Ruhezeit ca. 10 Min<br>
                    Gesamtzeit ca. 20 Min                    
                </div>
                <div class="row">
                    <div class="col-md-4 text-left">
                        Zutaten für 4 Personen: 
                        <ul>
                            <li>400 Gramm Kirschtomate </li>
                            <li>2 Paprikas</li>
                            <li>250 Gramm Salat (z.B. Rucola oder Spinat)</li>
                            <li>4 Stangen Frühlingszwiebel </li>
                            <li>100 Gramm Pinienkerne </li>
                        </ul>
                        Dressing:
                        <ul>
                            <li>EL Olivenöl</li>
                            <li>4 EL Aceto Balsamico</li>
                            <li>2 TL Senf </li>
                            <li>2 Spritzer Zitronensaft</li>
                            <li>2 TL Agavendicksaft</li>
                            <li>Salz, Pfeffer</li>
                        </ul>
                    </div>
                    <div class="col-md-8 text-left">
                        Zubereitung:
                        <ol>
                            <li>Für den veganen Nudelsalat zunächst die Pasta nach Packungsangabe in Salzwasser kochen und vollständig abkühlen lassen. </li>
                            <li>In der Zwischenzeit das Gemüse waschen und klein schneiden. Die Pinienkerne in einer beschichteten Pfanne ohne Fett rösten. </li>
                            <li>Alle Zutaten für das Dressing in einer Schüssel miteinander verrühren. Anschließend die Nudeln mit allen weiteren Zutaten vermengen – fertig ist der vegane Nudelsalat. Er sollte mindestens 10 Minuten ziehen und bis zum Verzehr kalt gestellt werden.</li>
                        </ol>
                    </div>
                </div>
                Dieses Rezept gibt es auch auf 
                <a target="_blanc" href="https://www.brigitte.de/rezepte/veganer-nudelsalat-11766628.html">www.brigitte.de/rezepte/veganer-nudelsalat-11766628.html</a>.
            </div>
            <!-- end Pasta salad -->


        </div>
        <!-- End Content Recepis -->


        <!-- Content:  bio Seals -->
        <div id="id_div_content_bioSeal" style="display:none;">
            <b>Deutsches Bio-Siegel und EU-Bio-Siegel</b>
            <div class="row">
                <div class="col-4 mx-auto">
                    <img class="img-fluid" src="https://www.marktjagd.de/images/logo/badge/bio-siegel-deutschland-large.png?1591349791">
                </div>
                <div class="col-4 mx-auto">
                    <img class="img-fluid" src="https://www.marktjagd.de/images/logo/badge/bio-siegel-eu-large.png?1591349791">
                </div>
            </div>
            <div class="text-center">
                <ul class="">
                    <li>mindestens 95% der verwendeten Zutaten stammen aus ökologischem Anbau</li>
                    <li>keine Gehntechnick</li>
                    <li>artgerechte Tierhaltung</li>
                </ul>
            </div>


            <b>Sigel der Bio-Verbände</b>
            <div class="row">
                <div class="col-4 mx-auto">
                    <img class="img-fluid" src="https://www.marktjagd.de/images/logo/badge/demeter-logo-large.png?1591349791">
                </div>
                <div class="col-4 mx-auto">
                    <img class="img-fluid" src="https://www.marktjagd.de/images/logo/badge/bioland-logo-large.png?1591349791">
                </div>
                <div class="col-4 mx-auto">
                    <img class="img-fluid" src="https://www.marktjagd.de/images/logo/badge/naturland-logo-large.png?1591349791">
                </div>
            </div>
            <ul>
                <li>100% der Zutaten müssen bio sein</li>
                <li>Regionalität</li>
                <li>noch strenger bezüglich Tierhaltung und Düngung</li>
                <li>keine Pestizide oder Kunstdünger</li>
            </ul>


            <b>Fairtrade</b>
            <div class="row">
                <div class="col-4 mx-auto">
                    <img class="img-fluid" src="https://www.marktjagd.de/images/logo/badge/fair-trade-siegel-large.png?1591349791">
                </div>
            </div>
            <ul>
                <li>Fester Mindestpreis, um die nachhaltige Produktion zu sichern</li>
                <li>Einhaltung der Arbeits- und Gesundheitsschutzrichtlinien</li>
                <li>Verbot von Zwangsarbeit, Kinderarbeit und Diskriminierung</li>
            </ul>

            Einen umfangreicheren Siegelvergleich gibt es hier: <a href="https://www.marktjagd.de/news/lebensmittel-siegel" >www.marktjagd.de/news/lebensmittel-siegel</a>
        </div>
        <!-- End Content: Bio Seals -->





    </div>
</template>
<script>
export default {
    data(){
        return{
            openedContentIndex : 0,
            openedRecipeIndex: 0,
            contents : [
                {key: "recipes"},
                {key: "bioSeal"},
            ],
            recipes: [
                {key: "pastaBake"},
                {key: "bakedPotato"},
                {key: "pencakes"},
                {key: "pastaSalad"}
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
            if(this.openedContentIndex <= 0){
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

        },

        open_recipe_content(recipeContentIndexToOpen){
            // Close opened info
            $("#id_button_recipes_" + this.recipes[this.openedRecipeIndex].key).removeClass("border-success text-success").addClass("border-dark text-dark");
            $("#id_div_content_recipes_" + this.recipes[this.openedRecipeIndex].key).hide();
            this.openedRecipeIndex = recipeContentIndexToOpen;
            $("#id_div_content_recipes_" + this.recipes[this.openedRecipeIndex].key).show();
            $("#id_button_recipes_" + this.recipes[this.openedRecipeIndex].key).removeClass("border-dark text-dark").addClass("border-success text-success");
        },
    }
}
</script>