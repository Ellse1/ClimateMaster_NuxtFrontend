<template>
    
    

        
    <div class="fixed-top h-100 w-100" style="background-color:rgba(247, 247, 247, 0.3);">
        <div class="col-md-6 mx-auto" style="margin-top:100px;">
           
           <!-- Congratulation1 -->
            <div id="id_div_congratulation_3_1" class="text-center bg-light border border-dark rounded w-100" style="position:absolute;left:0px;">
                <h2>Herzlichen Glückwunsch</h2>
                <h5>Berechnung angepasst!</h5>

                <div style="position:relative;height:150px;">
                    <div class="thumbs_up" style="position:absolute;margin-left:40%;">
                        <font-awesome-icon icon="thumbs-up" class="mt-1 mb-2 text-success"/>                         
                    </div>
                </div>
                <br>
                <p>Vielen Dank für die Anpassung deines CO2 Ausstoßes. Du findest deine aktuellste CO2 Berechnung auch immer unter "Mein Profil".</p>            
                <button class="btn btn-success mt-5 mb-3 px-5" v-on:click="nextCongratulation('id_div_congratulation_3_1', 'id_div_congratulation_3_2')">weiter</button>
            </div>
            <!-- Congratulation2 -->
            <div id="id_div_congratulation_3_2" class="text-center bg-light border border-dark rounded w-100 p-2" style="position:absolute;display:none;left:0px;">
                <div v-if="total_emissions <= 9.00">
                    <h2>Du bist <span class="text-success">Climate</span>Master Starter</h2>
                    Weil du weniger als 9 Tonnen CO2 Äquivalent im Jahr verursachst, 
                    bist du <span class="text-success">Climate</span>Master Starter.
                    Du kannst deine Berechnung veröffentlichen, um Freunden zu zeigen, wie man 2020 klimafreundlich leben kann.
                    Dies ist unter "Mein Profil" möglich.
                </div>
                <div v-else>
                    <h2>Präsentiere deine Berechnung</h2>                    
                    <p>
                        Es ist wirklich ganz großartig, wie du dich für konsequenten Klimaschutz einsetzt!
                        Hast du Lust deine Berechnung zu präsentieren?
                        Unter "Mein Profil" kannst du dein Profil und deine Berechnung veröffentlichen.
                    </p>
                </div>
                <div style="position:relative;height:80px;">
                    <nuxt-link to="/account/myProfile">
                        <font-awesome-icon icon="user-circle" class="text-success" style="font-size:80px;"/><br>                  
                        Mein Profil
                    </nuxt-link>
                </div>
                <br>
                <p>Kontaktiere uns für Fragen einfach über elias@climate-master.com</p>                
                
                <div class="mt-3">
                    <button class="btn btn-success mt-2 mb-3 px-5" v-on:click="hideCongratulation">weiter</button>
                </div>

            </div>

        </div>
    </div>
    
    
    
</template>
<script>    
export default {
    data(){
        return{
            success: null,
            error: null,
            total_emissions: null
        }
    },
    async mounted(){
        try {
            const{data} = await this.$axios.post("co2calculation/getLatestCalculation");

            if(data.state == "error"){
                this.error = data.message;
                this.success = null;
            }
            else if(data.state == "success"){
                this.success = data.message;
                this.error = null;

                this.total_emissions = data.data['total_emissions'];
            }
            else{
                this.error = "Die Daten konnten nicht geholt werden";
            }
        } catch (e) {
            
        }
    },
    methods:{
        hideCongratulation(){
            this.$emit('hideCongratulation_customizeCalculationCompleted');
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