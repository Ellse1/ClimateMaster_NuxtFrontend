<template>
    <div class="container">
        <!-- Links to the Plattform descriptions -->
        
        <div class="row text-center p-4">
            <div class="col-md-6 mt-3">
                <div class="container h-100">
                    <nuxt-link to="/platform/aim" class="h-100">
                        <div class="card h-100 cursor-pointer">
                            <div style="">
                                <h4 class="text-dark mt-4">Das Ziel der Plattform</h4>
                            </div>
                            <div class="card-body">
                                <img style="mx-auto;max-height:200px;" class="img-fluid" src="~/static/pictures/forSpecialSites/theplatform/aimOfThePlatform/aim.png"/>
                            </div>
                        </div>
                    </nuxt-link>
                </div>
            </div>
            <div class="col-md-6 mt-3">
                <div class="container h-100">
                    <nuxt-link to="/platform/handprint" class="h-100">
                        <div class="card h-100 cursor-pointer">
                            <div style="">
                                <h4 class="text-dark mt-4">Der <span class="text-success">Climate</span>Master Handabdruck: <br>mehr groß = mehr gut</h4>
                            </div>
                            <div class="card-body">
                                <img style="mx-auto;max-height:200px;" class="img-fluid" src="~/static/pictures/forSpecialSites/theplatform/handprint/handprintCalculationOnlyOne.png"/>
                            </div>
                        </div>
                    </nuxt-link>
                </div>
            </div>
            <div class="col-md-6 mt-3">
                <div class="container h-100">
                    <nuxt-link to="/platform/fairness" class="h-100">
                        <div class="card h-100 cursor-pointer">
                            <div style="">
                                <h4 class="text-dark mt-4">Warum ist <span class="text-success">Climate</span>Master fair?</h4>
                            </div>
                            <div class="card-body">
                                <img style="mx-auto;max-height:200px;" class="img-fluid" src="~/static/pictures/forSpecialSites/theplatform/fair/fair.png"/>
                            </div>
                        </div>
                    </nuxt-link>
                </div>
            </div>
            <div class="col-md-6 mt-3">
                <div class="container h-100">
                    <nuxt-link to="/platform/donations-to-climate-protection" class="h-100">
                        <div class="card h-100 cursor-pointer">
                            <div style="">
                                <h4 class="text-dark mt-4">Was hat eine Spende für Klimaschutz mit Ablasshandel zu tun?</h4>
                            </div>
                            <div class="card-body">
                                <img style="mx-auto;max-height:160px;" class="img-fluid" src="~/static/pictures/forSpecialSites/theplatform/donation/donation-2.png"/>
                            </div>
                        </div>
                    </nuxt-link>
                </div>
            </div>
            <div class="col-md-6 mt-3">
                <div class="container h-100">
                    <nuxt-link to="/platform/become-climatemaster" class="h-100">
                        <div class="card h-100 cursor-pointer">
                            <div style="">
                                <h4 class="text-dark mt-4">Wie werde ich Klimaschutz-Vorreiter, <span class="text-success">Climate</span>Master oder <span class="text-success">Climate</span>Master starter?</h4>
                            </div>
                            <div class="card-body">
                                <img style="mx-auto;max-height:160px;" class="img-fluid" src="~/static/pictures/forSpecialSites/theplatform/becomeClimateMaster/become-climatemaster.png"/>
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
    layout: 'indexLayout'
}
</script>