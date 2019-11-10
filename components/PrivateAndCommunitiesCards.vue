<template>
    <div>
        <!-- Private and Communities / Companies -->
        <div class="container" style="max-width:900px;margin-top:100px;">
            <div class="card-deck text-center">        
                <div class="card mb-5" v-on:click="goToPrivate">
                    <img src="~/static/IconPrivate.png" alt="Kein Icon gefunden." class="card-img-top"/>
                    <div class="card-body text-center">
                        <h3>Privat</h3>
                    </div>
                    <div id="hoverDiv_private">
                        <div class="row" style="margin: 10% 0px 0px 0px;">
                            <div class="col-4" style="margin-top:120px;">
                                <img src="~/static/IconEnergy.png" alt="Kein Icon gefunden." class="hoverDiv_privat_imageIcon"/>
                                <h6>Energie</h6>
                            </div>
                            <div class="col-4">
                                <span>
                                    <img src="~/static/IconMobility.png" style="position:relative;" alt="Kein Icon gefunden." class="hoverDiv_privat_imageIcon" id="id_icon_mobility"/>  
                                </span>
                                <h6>Mobilität</h6>
                            </div>
                            <div class="col-4" style="margin-top:140px;">
                                <img src="~/static/IconFood.png" alt="Kein Icon gefunden." class="hoverDiv_privat_imageIcon"/>   
                                <h6>Ernährung</h6>
                            </div>
                        </div>
                        
                        <div id="hoverDiv_private_text" style="">
                            <h4>
        	                    Jetzt <span class="text-success">Climate</span>Master werden<br>
                                Es lohnt sich
                            </h4>
                        </div>
                        

                    </div>
                </div>

                <div class="card mb-5">
                    <img src="~/static/IconCommunities.png" alt="Kein Icon gefunden." class="card-img-top"/>
                    <div class="card-body text-center">
                        <h3>Firmen<br>Schulen<br>Organisationen</h3>
                    </div>
                    <div id="hoverDiv_communities">

                            <div id="hoverDiv_communities_text" style="margin-top:80%;"> 
                                <h4>
                                    Beispiele für besonders klimafreundliche Vorbilder folgen
                                </h4>                               
                            </div>
                    </div>
                </div>
            </div> 
        </div>
    </div>
</template> 
<script>
var scrollTo = require('vue-scrollto');
export default {
    methods:{
        goToPrivate(){
            $("#id_icon_mobility").addClass("iconMobilityToRotate");
            setTimeout(function(){$("#id_icon_mobility").removeClass("iconMobilityToRotate");}, 2000);
            this.$router.push('/private');
            var scroll = scrollTo.scrollTo('#id_becomeClimateMasterPrivate');
        }
    }
}
</script>
<style scoped>
.card{
    cursor: pointer;
    position: relative;
}
.card:hover{
    box-shadow: 0 0 20px grey;
}

#hoverDiv_private{
    background-color: white;
    position: absolute;
    top: 0px;
    right: 0px;
    height: 100%;
    opacity: 0;
}
#hoverDiv_private:hover{
    opacity: 0.8;
}
#hoverDiv_private:hover #hoverDiv_private_text{
    position: absolute;
    bottom:0px;
    /* That the whole text fits in */
    min-width: 100%;
    animation: goUp 2s ease forwards 0s;
}

/* Die 3 Bilder im hoverDiv -> in diesem Div sind die Bilder und die Unterschriften "Energie", Nahrung, Mobilität */
.hoverDiv_privat_imageIcon{
    max-width: 50%;
}
.iconMobilityToRotate{
    animation:spin 0.5s ease-in-out;
}


#hoverDiv_communities{
    background-color: white;
    position: absolute;
    top: 0px;
    right: 0px;
    height: 100%;
    width:100%;
    opacity: 0;
}
#hoverDiv_communities:hover{
    opacity: 0.8;
}
#hoverDiv_communities:hover #hoverDiv_communities_text{
    position: absolute;
    bottom:0px;
    min-width: 100%;
    animation: goUp 2s ease forwards 0s;
}



@keyframes goUp {100% {bottom: 130px;}}
@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }



@media only screen and (max-width: 600px) {
@keyframes goUp {
  100% {
    bottom: 60px;
  }
}
}

</style>