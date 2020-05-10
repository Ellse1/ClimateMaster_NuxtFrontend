<template>
    <div>

        <p>
            Ein Elektroauto stößt beim Fahren keine Treibhausgasemissionen aus. Wir der Strom zum Laden der 
            Batterie mit erneuerbaren Energien Produziert *, wird auch bei der Treibstoffherstellung kein 
            Treibhausgas emittiert. Ein kleines Elektroauto ist effizienter und benönigt deshalb weniger
            Strom um 100 Kilometer zu fahren. Auch die Produktion des Autos muss mit erneuerbaren Energien 
            bewerkstelligt werden, damit auch hier keine klimaschädlichen Gase emittiert werden. Für das 
            Recycling der Batterien gibt es schon marktreife Technologien (z.B. Duesenfeld GmbH), die das 
            Elektroauto gesamtpaket noch sauberer machen.
        </p>
        <p>
            * 2019 wurde in Deutschland 46% des Stroms erneuerbar produziert.
            <br>
            <small>Quelle: strom-report.de/strom/</small>
        </p>


        <!-- Electric car example pictures -->
        <div class="container text-center my-3">
            <h2 class="font-weight-light">Beispiele</h2>

            <div class="row mx-auto my-auto">
                <div id="id_div_carousel_photovoltaikPictures" class="carousel slide w-100" data-ride="carousel">
                    <div class="carousel-inner w-100" role="listbox">
                        
                        <div class="carousel-item active">
                            <div class="col-md-4">
                                <div class="card card-body h-100">
                                    <img class="img-fluid" src="https://www.cdn.renault.com/content/dam/Renault/DE/personal-cars/zoe/zoe-my-2019/entdecken/renault-zoe.jpg.ximg.l_full_h.smart.jpg">
                                    <div class="card-footer">
                                        Renault Zoe<br>
                                        <small class="text-secondary">Bild: renault.com</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="col-md-4">
                                <div class="card card-body h-100">
                                    <img class="img-fluid" src="https://www.tesla.com/sites/default/files/model3-new/hero/model-3-hero-desktop-v2.jpg">
                                    <div class="card-footer">
                                        Tesla model 3<br>
                                        <small class="text-secondary">Bild: tesla.com</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="col-md-4">
                                <div class="card card-body h-100">
                                    <img class="img-fluid" src="https://i.ebayimg.com/00/s/MTA3NVgxNjAw/z/uToAAOSwX09cn3LC/$_10.JPG">
                                    <div class="card-footer">
                                        BMW i3<br>
                                        <small class="text-secondary">Bild: ebayimg.com</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="col-md-4">
                                <div class="card card-body h-100">
                                    <img class="img-fluid" src="https://ecomento.de/wp-content/uploads/2020/05/Nissan-LEAF-2020-2-1200x689.jpg">
                                    <div class="card-footer">
                                        Nissan leaf<br>
                                        <small class="text-secondary">Bild: ecomento.de</small>
                                    </div>
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
      




        <!-- <slideshowOfCompaniesOfClimadviceName :climadvice_name="'buyElectricCar'" /> -->
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