<template>
    <div>
        Durch regionales und saisonales Einkaufen, können besonders viele Treibhausgasemissionen vermieden werden.
        Sowohl die Transportwege als auch der Energieaufwand für lange Lagerung werden dabei eingespart.
        Welche Produkte in welchem Monat regional angebaut werden können findest du hier:

        <div class="text-center col-md-4 mx-auto mt-2">
            <select v-on:change="vegetablesMonthChanged()" class="form-control" id="id_select_vegetableMonth">
                <option v-for="month in vegetableMonths" v-bind:key="month" :value="month.id" :selected="month.id == 5">
                    {{month.key}}
                </option>
            </select>
        </div>


        <div class="row mt-2">
            <div class="col-md-4 p-2 text-left">
                <b>Gemüse</b>


                <ul>
                    <li v-for="vegetable in vegetableMonths[selectedMonth].value" v-bind:key="vegetable">
                        {{vegetable}}
                    </li>
                </ul>
            </div>
            
            <div class="col-md-4 p-2 text-left">
                <b>Obst</b>

                <ul>
                    <li v-for="fruit in fruitMonths[selectedMonth].value" v-bind:key="fruit">
                        {{fruit}}
                    </li>
                </ul>
            </div>

            <div class="col-md-4 p-2 text-left">
                <b>Salate</b>

                <ul>
                    <li v-for="salad in saladMonths[selectedMonth].value" v-bind:key="salad">
                        {{salad}}
                    </li>
                </ul>
            </div>
        </div>

        Den entsprechenden Saisonkalender für Gemüse, Obst und Salate und ein entsprechendes Klimakochbuch gibt es unter <br>
        <a target="_blanc" href="https://www.regional-saisonal.de/saisonkalender">www.regional-saisonal.de/saisonkalender</a>.

    </div>
</template>
<script>
export default {
    data(){
        return{
            selectedMonth : 0,
            vegetableMonths: [
                {id: 0, key: "Januar", value: ["Champignons", "Grünkohl", "Lauch / Porree", "Pastinaken", "Rosenkohl", "Schwarzwurzeln", "Topinambur", "Wirsingkohl"]},
                {id: 1, key: "Februar", value: ["Champignons", "Grünkohl", "Lauch / Porree", "Pastinaken", "Rosenkohl", "Schwarzwurzeln", "Topinambur", "Wirsingkohl"]},
                {id: 2, key: "März", value: ["Champignons", "Lauch / Porree", "Pastinaken", "Rosenkohl", "Spinat", "Topinambur", ]},
                {id: 3, key: "April", value: ["Champignons", "Lauch / Porree", "Spargel", "Spinat"]},
                {id: 4, key: "Mai", value: ["Blumenkohl", "Champignons", "Kohlrabi", "Lauch / Porree", "Lauch / Frühlingszwiebeln", "Mangold", "Radieschen", "Spargel", "Spinat", "Spitzkohl", "Wirsingkohl"]},
                {id: 5, key: "Juni", value: ["Blumenkohl", "Bohnen, dicke", "Brokkoli", "Champignons", "Erbsen", "Fenchel", "Gurke / Salatgurke", "Kartoffeln", "Kohlrabi", "Lauch / Porree", "Lauch / Frühlingszwiebeln", "Mangold", "Möhren / Karrotten", "Radieschen", "Rotkohl", "Spargel", "Spitzkohl", "Weißkohl", "Wirsingkohl", "Zucchini", "Zuckerschoten"]},
                {id: 6, key: "Juli", value: ["Aubergine", "Blumenkohl","Bohnen, grüne", "Bohnen, dicke", "Brokkoli", "Champignons", "Erbsen", "Fenchel", "Gurke / Salatgurke", "Kartoffeln", "Kohlrabi", "Lauch / Porree", "Lauch / Frühlingszwiebeln", "Mangold", "Möhren / Karrotten", "Paprika", "Radieschen", "Rote Bete", "Rotkohl", "Staudensellerie", "Tomaten", "Weißkohl", "Wirsingkohl", "Zucchini", "Zuckerschoten", "Zwiebeln"]},
                {id: 7, key: "August", value: ["Aubergine", "Blumenkohl","Bohnen, grüne", "Bohnen, dicke", "Brokkoli", "Butterrüben", "Champignons", "Erbsen", "Fenchel", "Gurke / Salatgurke", "Kartoffeln", "Kohlrabi", "Kürbis", "Lauch / Porree", "Lauch / Frühlingszwiebeln", "Mais", "Mangold", "Möhren / Karrotten", "Paprika", "Radieschen", "Rote Bete", "Rotkohl", "Staudensellerie", "Tomaten", "Weißkohl", "Wirsingkohl", "Zucchini", "Zuckerschoten", "Zwiebeln"]},
                {id: 8, key: "September", value: ["Aubergine", "Blumenkohl","Bohnen, grüne", "Brokkoli", "Butterrüben", "Champignons", "Fenchel", "Gurke / Salatgurke", "Kartoffeln", "Kohlrabi", "Kürbis", "Lauch / Porree", "Lauch / Frühlingszwiebeln", "Mais", "Mangold", "Möhren / Karrotten", "Paprika", "Pastinaken", "Radieschen", "Rote Bete", "Rotkohl", "Spinat", "Staudensellerie", "Steckrüben", "Tomaten", "Weißkohl", "Wirsingkohl", "Zucchini", "Zwiebeln"]},
                {id: 9, key: "Oktober", value: ["Aubergine", "Blumenkohl","Bohnen, grüne", "Brokkoli", "Butterrüben", "Champignons", "Fenchel", "Gurke / Salatgurke", "Kartoffeln", "Kohlrabi", "Kürbis", "Lauch / Porree", "Lauch / Frühlingszwiebeln", "Mais", "Mangold", "Möhren / Karrotten", "Paprika", "Pastinaken", "Radieschen", "Rosenkohl", "Rote Bete", "Rotkohl", "Schwarzwurzeln", "Spinat", "Staudensellerie", "Steckrüben", "Tomaten", "Topinambur", "Weißkohl", "Wirsingkohl", "Zucchini", "Zwiebeln"]},
                {id: 10, key: "November", value: ["Butterrüben", "Champignons", "Fenchel", "Grünkohl", "Kürbis", "Lauch / Porree", "Pastinaken", "Rosenkohl", "Rote Bete", "Rotkohl", "Schwarzwurzeln", "Spinat", "Steckrüben", "Topinambur", "Weißkohl", "Wirsingkohl"]},
                {id: 11, key: "Dezember", value: ["Butterrüben", "Champignons", "Grünkohl", "Lauch / Porree", "Pastinaken", "Rosenkohl", "Schwarzwurzeln", "Steckrüben", "Topinambur", "Wirsingkohl"]},
            ],
            fruitMonths:[
                {id: 0, key: "Januar", value: []},
                {id: 1, key: "Februar", value: []},
                {id: 2, key: "März", value: []},
                {id: 3, key: "April", value: ["Rhabarber"]},                
                {id: 4, key: "Mai", value: ["Erdbeeren", "Rhabarber"]},
                {id: 5, key: "Juni", value: ["Blaubeeren / Heidelbeeren", "Erdbeeren", "Himbeeren", "Johannisbeeren", "Kirschen", "Rharbarber", "Stachelbeeren"]},
                {id: 6, key: "Juli", value: ["Aprikosen", "Blaubeeren / Heidelbeeren", "Brombeeren", "Erdbeeren", "Himbeeren", "Johannisbeeren", "Kirschen", "Mirabellen", "Pflaumen", "Stachelbeeren", "Zwetschgen"]},
                {id: 7, key: "August", value: ["Äpfel", "Aprikosen", "Birnen", "Blaubeeren / Heidelbeeren", "Brombeeren", "Himbeeren", "Johannisbeeren", "Kirschen", "Mirabellen", "Pflaumen", "Stachelberen", "Wassermelone", "Zwetschgen"]},
                {id: 8, key: "September", value: ["Äpfel", "Birnen", "Blaubeeren / Heidelbeeren", "Brombeeren", "Holunderbeeren / Flieder", "Mirabellen", "Pflaumen", "Quitten", "Wassermelone", "Weintrauben", "Zwetschgen"]},
                {id: 9, key: "Oktober", value: ["Äpfel", "Birnen", "Holunderbeeren / Flieder", "Quitten", "Weintrauben", "Zwetschgen"]},
                {id: 10, key: "November", value: ["Äpfel", "Quitten"]},
                {id: 11, key: "Dezember", value: []},
            ],
            saladMonths:[
                {id: 0, key: "Januar", value: ["Chicoree", "Feldsalat", "Portulak"]},
                {id: 1, key: "Februar", value: ["Chicoree", "Feldsalat", "Portulak"]},
                {id: 2, key: "März", value: ["Chicoree", "Feldsalat", "Portulak"]},
                {id: 3, key: "April", value: ["Chicoree", "Feldsalat", "Portulak", "Rucula"]},                
                {id: 4, key: "Mai", value: ["Batavia", "Eichblattsalat", "Endiviensalat", "Kopfsalat", "Lollo Rosso", "Rucula"]},
                {id: 5, key: "Juni", value: ["Batavia", "Eichblattsalat", "Eisbergsalat", "Endiviensalat", "Kopfsalat", "Lollo Rosso", "Rucula"]},
                {id: 6, key: "Juli", value: ["Batavia", "Eichblattsalat", "Eisbergsalat", "Endiviensalat", "Kopfsalat", "Lollo Rosso", "Portulak", "Rucula"]},
                {id: 7, key: "August", value: ["Batavia", "Eichblattsalat", "Eisbergsalat", "Endiviensalat", "Kopfsalat", "Lollo Rosso", "Portulak", "Radicchio", "Rucula"]},
                {id: 8, key: "September", value: ["Batavia", "Eichblattsalat", "Eisbergsalat", "Endiviensalat", "Kopfsalat", "Lollo Rosso", "Portulak", "Radicchio", "Rucula"]},
                {id: 9, key: "Oktober", value: ["Chicoree", "Eichblattsalat", "Eisbergsalat", "Endiviensalat", "Feldsalat", "Kopfsalat", "Lollo Rosso", "Portulak", "Radicchio"]},
                {id: 10, key: "November", value: ["Chicoree", "Endiviensalat", "Feldsalat", "Portulak", "Radicchio"]},
                {id: 11, key: "Dezember", value: ["Chicoree", "Endiviensalat", "Feldsalat", "Portulak"]},
            ]
        }
    },
    mounted(){
        //Set select list to current month
        var d = new Date();
        var month = d.getMonth();
        this.selectedMonth = month;
    },
    methods:{
        vegetablesMonthChanged(){
            this.selectedMonth = $("#id_select_vegetableMonth").val();
        }
    }
}
</script>