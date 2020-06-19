<template>
    <div>
        <!-- Header and Navigation  -->
        <div class="row bg-light text-center w-100">
            <div class="col-md-2 col-4 text-left">
                <nuxt-link to="/">
                    <img class="img-fluid" style="max-width:50px;" src="~/static/pictures/generalPictures/Logo_bold.png" />
                </nuxt-link>
            </div>
            <div class="col-md-8 col-4 text-center">
                <h2>
                    <b><span class="text-success">Climate</span>
                    Messenger</b>
                </h2>
            </div>
            <div class="col-md-2 col-4 text-right">
                <nuxt-link to="/">
                    <img class="img-fluid" style="max-width:50px;" src="~/static/pictures/generalPictures/Logo_bold.png" />
                </nuxt-link>
            </div>
        </div>

        <!-- Contact Me  -->
        <div class="bg-light rounded mt-5 p-4 col-md-6 mx-auto border border-dark rounded">
            <div class="row mt-4">
                <div class="col-md-3 mt-3">
                    <img class="img-fluid" src="~/static/pictures/forSpecialSites/index/Elias.jpg" />
                </div>
                <div class="col-md-9 mt-3">
                    Ich, Elias Singer berate dich sehr gerne nach bestem Wissen und Gewissen zu Klimaschutzmöglichkeiten
                    rund um das private Leben. Ich orientiere mich dabei an den Handlungsvorschlägen des CO2 Rechners
                    des Umweltbundesamts und deren Wirkung auf die persönliche Klimaschutzbilanz.
                    Über eine Nachricht von dir und gemeinsame Anstrengungen für mehr Klimaschutz im Alltag
                    freue ich mich sehr.
                </div>
            </div>
            <div class="text-center mt-3">
                <!-- <div> -->
                    <font-awesome-icon icon="envelope-open" class="text-success"  style="font-size:30px;"/>     
                    elias.singer@climate-master.com
                <!-- </div>
                <div> -->
                    <font-awesome-icon icon="phone" class="text-success ml-2"  style="font-size:30px;"/>     
                    +49 17643326722 (Auch Whatsapp)
                <!-- </div> -->
            </div>


                  <!-- <div class="mt-5 text-left">
                      <div class="row">
                        <div class="col text-center">
                          <font-awesome-icon icon="envelope-open" class="text-success"  style="font-size:30px;"/>     
                        </div>
                        <div class="col">
                          elias.singer@climate-master.com
                        </div>
                      </div>
                      <div class="row mt-3">
                        <div class="col text-center">
                          <font-awesome-icon icon="phone" class="text-success"  style="font-size:30px;"/>     
                        </div>
                        <div class="col">
                          +49 176 43326722
                        </div>
                      </div>
                      <div class="row mt-3">
                        <div class="col text-center">
                            <font-awesome-icon icon="sms" class="text-success" style="font-size:30px;" />
                        </div>
                        <div class="col">
                            +49 176 43326722 (Auch Whatsapp)
                        </div>
                      </div>
                  </div> -->

          
        </div>

        <div class="fixed-bottom bg-light w-100 p-2">
            <div class="mx-auto" style="width:80%;">
                <input type="text" class="w-100 p-2" id="rounded-input">
            </div>
        </div>

    </div>
</template>
<script>
export default {
    layout: 'messengerLayout'
}
</script>
<style scoped>
#rounded-input
{
    border-style: solid;
    border-width: 1px;
    border-radius: 10px;
}
</style>