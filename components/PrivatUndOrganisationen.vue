<template>
    <div>
        <!-- Private und Organisationen/Firmen -->
        <div class="container" style="max-width:900px;margin-top:100px;">
        <div class="card-deck text-center">        
            <div class="card mb-5" v-scroll-to="{element: '#id_privatClimateMasterWerden'}">
                <img src="~/static/IconEinePerson2.png" alt="Kein Icon gefunden." class="card-img-top"/>
                <div class="card-body text-center mt-5">
                    <h3>Privat</h3>
                </div>
                <div id="hoverDiv">
                    <div class="row" style="margin-top:10%">
                        <div class="col-4" style="margin-top:120px;">
                            <img src="~/static/IconEnergie.png" alt="Kein Icon gefunden." class="hoverDiv_imageIcon"/>
                            <h4>Energie</h4>
                        </div>
                        <div class="col-4">
                            <img src="~/static/IconMobilität.png" alt="Kein Icon gefunden." class="hoverDiv_imageIcon"/>  
                            <h4>Mobilität</h4>
                        </div>
                        <div class="col-4" style="margin-top:140px;">
                            <img src="~/static/IconNahrungsmittel.png" alt="Kein Icon gefunden." class="hoverDiv_imageIcon"/>   
                            <h4>Ernährung</h4>
                        </div>
                    </div>
                    
                    <h4 id="hoverDiv_text">
                        Werde jetzt leicht <span class="text-success">Climate</span>Master. <br>
                        Es gibt Unterstützung!
                    </h4>
                </div>
            </div>
            <div class="card mb-5">
                <img src="~/static/IconMehrerePersonen.png" alt="Kein Icon gefunden." class="card-img-top"/>
                <div class="card-body text-center">
                    <h3>Firmen<br>Schulen<br>Organisationen</h3>
                </div>
                <div id="hoverDiv">
                    <h4 id="">Beispiele für besonders klimafreundliche Vorbilder folgen...</h4>
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

#hoverDiv{
    background-color: white;
    position: absolute;
    top: 0px;
    right: 0px;
    height: 100%;
    opacity: 0;
}
#hoverDiv:hover{
    opacity: 0.8;
}
#hoverDiv:hover #hoverDiv_text{
    position: absolute;
    bottom:0px;
    left:6%;
    animation: goUp 2s ease forwards 0s;
}

/* Die 3 Bilder im hoverDiv -> in diesem Div sind die Bilder und die Unterschriften "Energie", Nahrung, Mobilität */
.hoverDiv_imageIcon{
    max-width: 50%;
}



@keyframes goUp {
  100% {
    bottom: 160px;
  }
}

</style>