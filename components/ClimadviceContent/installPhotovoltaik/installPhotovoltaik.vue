<template>
  <div class="text-center">
        <p class="m-3">
            <!-- Mit einer Photovoltaikanlage kannst du deinen eigenen Strom Produzieren und verbrauchen!
            Hier findest du einige Beispiele und Firmen, die dich dabei unterstützen.
         -->
            Eine Photovoltaikanlage erzeugt durch die Umwandlung von Sonnenenergie in elektrische Energie 
            umweltfreundlichen, klimaneutralen und vor allem sehr kostengünstigen Strom. Einmal installiert 
            können Solarmodule 25 Jahre und länger zuverlässig für ihren Betreiber arbeiten. 
            Durch innovative Vernetzung und intelligente Software kann dieser die aktuelle Stromerzeugung 
            in Echtzeit überwachen. Kosteneinsparungen und Gewinne, die mit der Stromerzeugungsanlage entstehen, 
            können transparent überwacht werden.
        </p>
            
        <h5 class="ml-3">Unabhängig bis autark </h5>
        <p class="mx-3">
            Der Produzierte Strom kann selbst verbraucht werden, die Abhängigkeit von aktuell steigenden 
            Strompreisen wird reduziert, große Beträge für Stromrechnungen werden eingespart. 
            Mit einem passenden Stromspeicher kann die am Tag produzierte Energie auch Nachts verwendet werden. 
            Folglich reduziert sich die Stromrechnung noch einmal drastisch. Zusätzlich können die Elemente 
            für die Anlage so gewählt werden, dass die Anlage auch bei Netzausfällen weiterhin Strom zur 
            Verfügung stellt.
        </p>


        <!-- PV Beispielbilder -->
        <div class="container text-center my-3">
            <h2 class="font-weight-light">Beispielbilder</h2>

            <div class="row mx-auto my-auto">
                <div id="id_div_carousel_photovoltaikPictures" class="carousel slide w-100" data-ride="carousel">
                    <div class="carousel-inner w-100" role="listbox">
                        
                        <div class="carousel-item active">
                            <div class="col-md-4">
                                <div class="card card-body h-100">
                                    <img class="img-fluid" src="~/static/pictures/forSpecialSites/installPhotovoltaik/photovoltaik1.jpg">
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="col-md-4">
                                <div class="card card-body h-100">
                                    <img class="img-fluid" src="~/static/pictures/forSpecialSites/installPhotovoltaik/photovoltaik2.jpg">
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="col-md-4">
                                <div class="card card-body h-100">
                                    <img class="img-fluid" src="~/static/pictures/forSpecialSites/installPhotovoltaik/photovoltaik3.jpg">
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="col-md-4">
                                <div class="card card-body h-100">
                                    <img class="img-fluid" src="~/static/pictures/forSpecialSites/installPhotovoltaik/photovoltaik4.jpg">
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="col-md-4">
                                <div class="card card-body h-100">
                                    <img class="img-fluid" src="~/static/pictures/forSpecialSites/installPhotovoltaik/photovoltaik5.jpg">
                                </div>
                            </div>
                        </div>

                    </div>
                    <a class="carousel-control-prev w-auto" href="#id_div_carousel_photovoltaikPictures" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon bg-dark border border-dark rounded-circle" style="width:40px;height:40px;" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next w-auto" href="#id_div_carousel_photovoltaikPictures" role="button" data-slide="next">
                        <span class="carousel-control-next-icon bg-dark border border-dark rounded-circle" style="width:40px;height:40px;" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>
        </div>
      



        <!-- PV Beispielfirmen -->        
        <slideshowOfCompaniesOfClimadviceName :climadvice_name="'installPhotovoltaik'" />

    </div>
</template>

<script>
import slideshowOfCompaniesOfClimadviceName from '~/components/Company/slideshowOfCompaniesOfClimadviceName';
export default {
    components:{
        slideshowOfCompaniesOfClimadviceName
    },
    mounted(){

        $('.carousel .carousel-item').each(function(){
            var minPerSlide = 3;
            var next = $(this).next();
            if (!next.length) {
            next = $(this).siblings(':first');
            }
            next.children(':first-child').clone().appendTo($(this));
            
            for (var i=0;i<minPerSlide;i++) {
                next=next.next();
                if (!next.length) {
                    next = $(this).siblings(':first');
                }
                
                next.children(':first-child').clone().appendTo($(this));
            }
        });
    }
}
</script>

<style scoped>
@media (max-width: 768px) {
    .carousel-inner .carousel-item > div {
        display: none;
    }
    .carousel-inner .carousel-item > div:first-child {
        display: block;
    }
}

.carousel-inner .carousel-item.active,
.carousel-inner .carousel-item-next,
.carousel-inner .carousel-item-prev {
    display: flex;
}

/* display 3 */
@media (min-width: 768px) {
    
    .carousel-inner .carousel-item-right.active,
    .carousel-inner .carousel-item-next {
      transform: translateX(33.333%);
    }
    
    .carousel-inner .carousel-item-left.active, 
    .carousel-inner .carousel-item-prev {
      transform: translateX(-33.333%);
    }
}

.carousel-inner .carousel-item-right,
.carousel-inner .carousel-item-left{ 
  transform: translateX(0);
}
</style>