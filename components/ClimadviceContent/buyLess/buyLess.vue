<template>
    <div>
        <p class="col-md-10 mt-2 mx-auto">
            Mit deinem Konsumverhalten hast du große Möglichkeiten deinen 
            <nuxt-link to="/platform/handprint" class="text-dark"><u><span class="text-success">Climate</span>Master Handabdruck</u></nuxt-link> 
            zu vergrößern.
            Wie schaffen wir es einen Konsum anzustreben, der Umwelt- und Klimaverträglich ist und zukünftigen Generationen keinen Nachteil verschafft?
            Was brauchen wir wirklich? Wo kommen unsere Produkte her? Wie nachhaltig sind sie? 
            Hier einige Handlungsanregungen für nachhaltigeren Konsum.
        </p>




               <!-- sub headings -->
        <div class="row mt-2 mb-2">
            <div class="col">
                <button id="id_button_clothes" class="btn btn-default border border-success text-success mt-2" v-on:click="open_content(0)">
                    <font-awesome-icon icon="tshirt"  style="font-size:20px;"/>     
                </button>
            </div>
            <div class="col">
                <button id="id_button_atHome" class="btn btn-default border border-dark mt-2" v-on:click="open_content(1)">
                    <font-awesome-icon icon="home"  style="font-size:20px;"/>     
                </button>
            </div>   
            <div class="col">
                <button id="id_button_technic" class="btn btn-default border border-dark mt-2"  v-on:click="open_content(2)">
                    <font-awesome-icon icon="mobile-alt"  style="font-size:20px;"/>     
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

        <!-- Content: Clothes -->
        <div id="id_div_content_clothes">
        
            <p>
                Wieviele Hosen braucht ein Mensch? 
            </p>
            <p>
                Der Used-Look ist in Trend. Den Real-Used-Look gibt’s nur aus zweiter Hand. Zum Beispiel im Kleiderschrank 
                deiner Freunde, auf Flohmärkten oder hier:<br>
                <a href="https://www.kleiderkreisel.de/" target="_blanc">
                    <img class="img-fluid" src="data:image/png;base64,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" />
                    <br>
                    www.kleiderkreisel.de
                </a>
            </p>
            <p>
                Ab und zu soll es aber eben auch was Neues sein. 
                Dann kannst du auf nachhaltige Sigel achten:<br> 
                <a href="https://www.siegelklarheit.de/produktgruppen/textilien/" target="_blanc">www.siegelklarheit.de/produktgruppen/textilien/</a>
            </p>
        </div>
        <!-- End Content Clothes -->


        <!-- Content:  atHome -->
        <div id="id_div_content_atHome" style="display:none;">
            <p>
                Werte deine Möbel auf oder baue sie Dir selbst. Macht Spaß und man entdeckt den Handwerker in 
                sich... Inspiration dazu gibt’s hier:
                <a href="https://www.handmadekultur.de/" target="_blanc">
                    <img class="img-fluid" src="https://www.handmadekultur.de/img/logo_handmade_180x234.png" />
                </a><br>
                <a href="https://www.handmadekultur.de/" target="_blanc">www.handmadekultur.de</a><br>


                Unter in Youtube unter Möbel-Upcycling
            </p>
            <p>
                Wenns mal zu schwierig wird dann machts der Schreiner um die Ecke bestimmt auch gerne mit zertifiziertem Holz. 
                Eine Übersicht von ökologischen Möbellabel gibt’s hier...<br>
                <a href="https://utopia.de/bestenlisten/nachhaltige-moebelhaeuser-bio-oeko-moebel/" target="_blanc">
                    Utopia Möbellabel
                </a>
            </p>
        </div>
        <!-- End Content: atHome -->

        <!-- Content: Technic  -->
        <div id="id_div_content_technic" style="display:none;">
            <p>
                Technikgeräten ein zweites Lebens zu geben macht immer Sinn. Wenn man in den Schubladen von Freunden nichts 
                findet dann geht’s hier lang...
            </p>
            <div class="row col-md-8 mx-auto text-center">
                <div class="col col-md-4 text-center mx-auto">
                    <a href="https://www.ebay-kleinanzeigen.de/" target="_blanc">
                        <img class="img-fluid" src="https://www.ebay-kleinanzeigen.de/static/img/common/logo/logo-ebayk-402x80.hsn0x4ev0qi.png" />
                    </a>
                </div>
                <div class="col  text-center mx-auto">
                    <a href="https://www.rebuy.de/" target="_blanc">
                        <img class="img-fluid" src="https://dyivx00f9izcg.cloudfront.net/images/rebuy-logo.rev-b580a8594596673.svg" />
                    </a>
                </div>
            </div>

        </div>
        <!-- End Content: Technic -->
    </div>
</template>
<script>
export default {
    data(){
        return{
            openedContentIndex : 0,
            contents : [
                {key: "clothes"},
                {key: "atHome"},
                {key: "technic"}
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
            if(this.openedContentIndex <= 1){
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