<template>
    <div>
        
    <div class="fixed-top h-100 w-100" style="background-color:rgba(247, 247, 247, 0.3);">
        <div class="col-md-6 mx-auto" id="id_div_1" style="margin-top:100px;">
           
            <div id="id_div_congratulation_1" class="text-center bg-light border border-dark rounded w-100" style="position:absolute;left:0px;">
                <h2>Herzlichen Glückwunsch</h2>
                <h5>Meine Generation bedankt sich bei dir!!!</h5>
                <div style="position:relative;height:150px;">
                    <div id="id_thumbs_up" style="position:absolute;margin-left:40%;">
                        <font-awesome-icon icon="thumbs-up" class="mt-1 mb-2 text-success"/>                         
                    </div>
                </div>
                <br>
                <p>Vielen Dank für deinen groooßen Einsatz bei persönlichem Klimaschutz!!</p>
                <button class="btn btn-success mt-5 mb-3 px-5" v-on:click="nextCongratulation('id_div_congratulation_1', 'id_div_congratulation_2')">weiter</button>
            </div>
            <div id="id_div_congratulation_2" class="text-center bg-light border border-dark rounded w-100" style="position:absolute;display:none;left:0px;">
                <h2>Wir würden gerne werbung auf facebook machen!</h2>
                <h5>Für die Bedankung </h5>
                <div style="position:relative;height:150px;">
                    <!-- <div id="id_thumbs_up" style="position:absolute;margin-left:40%;">
                        <font-awesome-icon icon="thumbs-up" class="mt-1 mb-2 text-success"/>                         
                    </div> -->
                </div>
                <br>
                <p>Geht das?</p>
                <button class="btn btn-success mt-5 mb-3 px-5" v-on:click="nextCongratulation('id_div_congratulation_2', 'id_div_congratulation_3')">weiter</button>
            </div>
            <div id="id_div_congratulation_3" class="text-center bg-light border border-dark rounded w-100" style="position:absolute;left:0px;display:none;">
                <h2>Instagram werbung</h2>
                <h5>Für die Bedankung </h5>
                <div style="position:relative;height:150px;">
                    <!-- <div id="id_thumbs_up" style="position:absolute;margin-left:40%;">
                        <font-awesome-icon icon="thumbs-up" class="mt-1 mb-2 text-success"/>                         
                    </div> -->
                </div>
                <br>
                <p>Geht das?</p>
                <button class="btn btn-success mt-5 mb-3 px-5" v-on:click="hideCongratulation">weiter</button>
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

#id_thumbs_up{
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