<template>
    <div>
        
    <div class="fixed-top h-100 w-100" style="background-color:rgba(247, 247, 247, 0.3);">
        <div class="col-md-6 mx-auto" style="margin-top:100px;">
           
           <!-- Congratulation 1 -->
            <div id="id_div_congratulation_4_1" class="text-center bg-light border border-dark rounded w-100" style="position:absolute;left:0px;">
                <h2>Herzlichen Glückwunsch</h2>
                <h5>Meine Generation bedankt sich bei dir!!!</h5>
                <div style="position:relative;height:150px;">
                    <div class="thumbs_up" style="position:absolute;margin-left:40%;">
                        <font-awesome-icon icon="thumbs-up" class="mt-1 mb-2 text-success"/>                         
                    </div>
                </div>
                <br>
                <p>Vielen Dank für deinen groooßen Einsatz bei persönlichem Klimaschutz!!</p>
                <h4>Du bist <span class="text-success">Climate</span>Master 2020</h4>
                <button class="btn btn-success mt-5 mb-3 px-5" v-on:click="nextCongratulation('id_div_congratulation_4_1', 'id_div_congratulation_4_2')">weiter</button>
            </div>

            <!-- Congratulation2 -->
            <div id="id_div_congratulation_4_2" class="text-center bg-light border border-dark rounded w-100 p-2" style="position:absolute;display:none;left:0px;">
                <h2>Präsentiere deinen Fortschritt</h2>
                <p>
                    Es ist wirklich ganz großartig, wie du dich für konsequenten Klimaschutz einsetzt!
                    Hast du Lust deinen Fortschritt zu Präsentieren, damit sich auch Freunde von dir für konsequenten Klimaschutz einsetzen?
                    Im Nächsten Schritt kannst du dir ein ClimateMaster Bild erstellen und dich damit in sozialen Netzwerken als ClimateMaster Präsentieren.
                    Außerdem kannst du dein Profil unter "Mein Profil" veröffentlichen, damit andere Menschen deine Berechnung und deinen Fortschritt sehen können.

                </p>
                <br>
                <p>Kontaktiere uns einfach für Fragen über elias.singer@climate-master.com</p>
                <button class="btn btn-success mt-2 mb-3 px-5" v-on:click="nextCongratulation('id_div_congratulation_4_2', 'id_div_congratulation_4_3')">weiter</button>
            </div>

            <!-- Congratulation 3 -->
            <div id="id_div_congratulation_4_3" class="text-center bg-light border border-dark rounded w-100 p-2" style="position:absolute;left:0px;display:none;">
                <h2>Instagram?</h2>
                <p>
                    Hast du einen Instagram Account? Wir folgen dir mit unserem offiziellen Account (climatemasterandfriends), wenn du dich mit einem ClimateMaster Bild 
                    präsentierst. Verrate uns deinen Account Namen unter "Mein Profil".
                </p>
                <div style="position:relative;height:8px;">
                    <!-- <div id="id_thumbs_up" style="position:absolute;margin-left:40%;">
                        <font-awesome-icon icon="thumbs-up" class="mt-1 mb-2 text-success"/>                         
                    </div> -->
                </div>
                <br>
                <p>Konsequenten Klimaschutz präsentieren</p>
                <button class="btn btn-success mt-2 mb-3 px-5" v-on:click="nextCongratulation('id_div_congratulation_4_3', 'id_div_congratulation_4_4')">weiter</button>
            </div>

            <!-- Congratulation 4 -->
            <div id="id_div_congratulation_4_4" class="text-center bg-light border border-dark rounded w-100 p-2" style="position:absolute;left:0px;display:none;">
                <h2>Dürfen wir dich Präsentieren?</h2>
                <p>
                    Um noch mehr Menschen von konsequenten Klimaschutz zu überzeugen, würden wir dich gerne als Paradebeispiel auf unseren
                    Social Media Kanälen präsentieren. Zum Beispiel wäre ein Bild oder sogar ein Video mit einer kurzen Beschreibung, wie 
                    du dich für konsequenten Klimaschutz einsetzt sehr wirkungsvoll. Hast du Lust andere Leute von Klimaschutz zu überzeugen? 
                    Dann schicke uns eine E-Mail mit dem entsprechendem Material an elias.singer@climate-master.com.
                    <br>Liebe Grüße<br>
                    dein <b>ClimateMaster Team</b>
                </p>
                <br>
                <p>Konsequenten Klimaschutz präsentieren</p>
                <button class="btn btn-success mt-2 mb-3 px-5" v-on:click="hideCongratulation">weiter</button>
            </div>

        </div>
    </div>


    </div>
</template>
<script>
export default {
    methods:{
        hideCongratulation(){
            this.$emit('hideCongratulation_becomeClimatemasterCompleted');
        },
        nextCongratulation(id_div_congratulation_toHideNow, id_div_congratulation_toShowNow){
            $("#"+id_div_congratulation_toHideNow).addClass("congratulationOnClickHide");
            $("#"+id_div_congratulation_toShowNow).show();
            $("#"+id_div_congratulation_toShowNow).addClass("congratulationOnClickShow");
        }
    }
}
</script>
<style scoped>

.thumbs_up{
    font-size:80px;
    animation: scaleUpAndDown 2s ease-in-out infinite, spin 2s ease-in-out infinite
}

.congratulationOnClickShow{
    animation: goLeftAndEaseIn 1s ease-out 1;
}
.congratulationOnClickHide{
    position: absolute;
    right:0px;
    animation: goLeftAndEaseOut 1s ease-out 1;
    opacity: 0;
}

@keyframes scaleUpAndDown {
    0% {font-size:80px;}
    50% {font-size:120px;}
}
@keyframes spin { 
    40% { 
        transform: rotate(20deg);
    } 
}

@keyframes goLeftAndEaseIn{
    0%{left:100%; opacity: 0;}
    100%{left:0%; opacity: 1;}
}
@keyframes goLeftAndEaseOut{
    0%{left:0%; opacity: 1;}
    100%{left:-100%; opacity: 0;}
}

</style>