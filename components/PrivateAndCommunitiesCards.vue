<template>
    <div>
        <!-- Private and Communities / Companies -->
        <div class="container" style="max-width:900px;margin-top:100px;">
        <div class="card-deck text-center">        
            <div class="card mb-5" v-scroll-to="{element: '#id_becomeClimateMasterPrivate'}">
                <img src="~/static/IconPrivate.png" alt="Kein Icon gefunden." class="card-img-top"/>
                <div class="card-body text-center">
                    <h3>Privat</h3>
                </div>
                <div id="hoverDiv_private">
                    <div class="row" style="margin-top:10%">
                        <div class="col-4" style="margin-top:120px;">
                            <img src="~/static/IconEnergy.png" alt="Kein Icon gefunden." class="hoverDiv_privat_imageIcon"/>
                            <h4>Energie</h4>
                        </div>
                        <div class="col-4">
                            <img src="~/static/IconMobility.png" alt="Kein Icon gefunden." class="hoverDiv_privat_imageIcon"/>  
                            <h4>Mobilität</h4>
                        </div>
                        <div class="col-4" style="margin-top:140px;">
                            <img src="~/static/IconFood.png" alt="Kein Icon gefunden." class="hoverDiv_privat_imageIcon"/>   
                            <h4>Ernährung</h4>
                        </div>
                    </div>
                    
                    <div id="hoverDiv_private_text" style="position:absolute; left:50%">
                        <h4 style="position: relative; left: -50%">
                            Werde jetzt <span class="text-success">Climate</span>Master.<br>
                            Es gibt Unterstützung!
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


                        <div id="hoverDiv_communities_text" >
                            <h4 style="position: relative; left:-50%;">
                                Beispiele für besonders klimafreundliche Vorbilder folgen...
                            </h4>
                        </div>
                </div>
            </div>
        </div> 
        </div>
    </div>
</template>    

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
    left:50%;
    /* That the whole text fits in */
    min-width: 400px; 
    animation: goUp 2s ease forwards 0s;
}

/* Die 3 Bilder im hoverDiv -> in diesem Div sind die Bilder und die Unterschriften "Energie", Nahrung, Mobilität */
.hoverDiv_privat_imageIcon{
    max-width: 50%;
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
    left:50%;
    /* That the whole text fits in */
    min-width: 400px;
    animation: goUp 2s ease forwards 0s;
}


@keyframes goUp {
  100% {
    bottom: 130px;
  }
}

@media only screen and (max-width: 600px) {
@keyframes goUp {
  100% {
    bottom: 60px;
  }
}
}

</style>