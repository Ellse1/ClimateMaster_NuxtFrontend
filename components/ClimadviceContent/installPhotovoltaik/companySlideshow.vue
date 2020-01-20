<template>
    <div>
        <div class="container">

            <h2 class="font-weight-light" v-if="companies.length >= 1">Firmen</h2>

            <div class="row mx-auto my-auto" v-if="companies.length >= 3">
                <div id="id_div_carousel_photovoltaikComanies" class="carousel slide w-100" data-ride="carousel">
                    <div class="carousel-inner w-100" role="listbox">
                        
                        <div v-for="company in companies" v-bind:key="company.id" class="carousel-item companySlideshow">
                            <div class="col-md-4">
                                <nuxt-link :to="{name: 'company-showCompany-id', params: { id:company.id } }">
                                    <div class="card">
                                        <div class="card-body" style="height:200px;overflow:hidden;">
                                            <img class="card-img" :src="`http://localhost:8000/images/companyImages/headerImages/${company.header_image_name}`">
                                            <div class="card-img-overlay text-center">
                                                <div class="mx-auto border" style="width:70px;height:70px;border-radius:50%;overflow:hidden;margin-top:80px;">
                                                    <img class="img-fluid" :src="`http://localhost:8000/images/companyImages/logoImages/${company.logo_image_name}`">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-footer text-center">
                                            <h5 class="text-dark">{{company.name}}</h5>
                                            <small>{{company.residence}}</small>
                                        </div> 
                                    </div>
                                </nuxt-link>
                            </div>
                        </div>

                    </div>
                    <a class="carousel-control-prev w-auto" href="#id_div_carousel_photovoltaikComanies" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon bg-dark border border-dark rounded-circle" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next w-auto" href="#id_div_carousel_photovoltaikComanies" role="button" data-slide="next">
                        <span class="carousel-control-next-icon bg-dark border border-dark rounded-circle" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>
            <div v-else class="row">
                <div v-for="company in companies" v-bind:key="company.id" class="col-md-4">
                    <nuxt-link :to="{name: 'company-showCompany-id', params: { id:company.id } }">
                        <div class="card">
                            <div class="card-body" style="height:200px;overflow:hidden;">
                                <img class="card-img" :src="`http://localhost:8000/images/companyImages/headerImages/${company.header_image_name}`">
                                <div class="card-img-overlay text-center">
                                    <div class="mx-auto border" style="width:70px;height:70px;border-radius:50%;overflow:hidden;margin-top:80px;">
                                        <img class="img-fluid" :src="`http://localhost:8000/images/companyImages/logoImages/${company.logo_image_name}`">
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer text-center">
                                <h5 class="text-dark">{{company.name}}</h5>
                                <small>{{company.residence}}</small>
                            </div> 
                        </div>
                    </nuxt-link>
                </div>
            </div>


        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            error: null,
            success: null,
            companies: []
        }
    },
    async mounted(){
        //Get the companies with climadviceName "installPhotovoltaik"
        try {
            const{data} = await this.$axios.get("company/getCompaniesByClimadviceName",{
                params:{
                    climadvice_name: "installPhotovoltaik"
                }
            });

            if(data.state == 'error'){
                this.error = data.message;
                this.success = null;
            }
            else if(data.state == 'success'){
                this.success = data.message;
                this.error = null;
                this.companies = data.data;
            }
            else{
                this.error = "Es konnten keine Firmen geholt werden.";
            }

        } catch (e) {
            this.error = e.response.data.message;
        }
    }, 
    updated(){
        var firstItem = true;
        $('.carousel .carousel-item').each(function(){
            if($(this).hasClass("companySlideshow")){
                
                var minPerSlide = 3;

                //Set firt item to active
                if(firstItem){
                    $(this).addClass("active");
                    firstItem = false;
                }

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

