<template>
    <div class="container bg-light p-3 rounded p-2 text-center mt-4" style="">
        <!-- <h2>Die <span class="text-success">Climate</span>Master Plattform</h2> -->
        <p>
            Die ClimateMaster Plattform verknüpft deine individuelle CO2 Berechnung mit der Möglichkeit 
            zur sehr wirkungsvollen Reduktion und der anschließenden Kompensation der Resttreibhausgase. 
        </p>
        <!-- Download the pdf concepts  -->
        <div class="">
            <a target="_blanc" href="https://www.climate-master.com:8000/api/file/conceptSummary" class="btn btn-default border mt-2">Konzept Zusammenfassung (PDF)</a>
            <a target="_blanc" href="https://www.climate-master.com:8000/api/file/concept" class="btn btn-default border mt-2">Konzept Langfassung (PDF)</a>
        </div>



        <!-- Calculate and reduce -->
        <div class="w-100 row mt-5">
            <div class="col-1">
                <font-awesome-icon icon="calculator" class="" style="font-size:50px;"/>     
            </div>
            <div class="col-10">
                <h4 class="">Berechnung und CO2 Reduktion:</h4>
            </div>
        </div>
        <p>
            Mit dem CO2 Rechner des Umweltbundesamts kannst du deinen CO2  Ausstoß berechnen und auf 
            die ClimateMaster Plattform übertragen. Nach der Übertragung zeigen wir dir, mit welchen 
            Handlungsmöglichkeiten du am Meisten CO2 verhinderst, individuell passend zu deiner Berechnung. 
            Dies ermöglicht dir fundierte Entscheidungen für deinen persönlichen Klimaschutz. 
        </p>


        <!-- compensate -->
        <div class="w-100 row mt-5">
            <div class="col-1">
                <font-awesome-icon icon="sort-amount-down" class="" style="font-size:50px;"/>     
            </div>
            <div class="col-10">
                <h4 class="">Restkompensation:</h4>
            </div>
        </div>
        <p>
            Anschließend kannst du deinen Restausstoß von Treibhausgasen kompensieren. Es wird eine bestimmte Menge 
            an Geld in Klimaschutzprojekte investiert, es wird genau berechnet, wie viel Geld investiert werden muss, 
            um die entsprechende Menge an Treibhausgasen zu kompensieren. 
            Du verhinderst also mit einer Investition den Ausstoß deiner Treibhausgase an anderer Stelle und wirst
             damit Klimaneutral und ClimateMaster. Kompensiert wird über die gemeinnützige GmbH Atmosfair. 
             Deren Webseite und Projekte findest du  <a target="_blanc" href="https://www.atmosfair.de/de/klimaschutzprojekte/">hier</a>.
        </p>


        <!-- Presentation -->
        <div class="w-100 row mt-5">
            <div class="col-1">
                <font-awesome-icon icon="user-circle" class="" style="font-size:50px;"/>     
            </div>
            <div class="col-10">
                <h4 class="">Präsentation:</h4>
            </div>
        </div>
        <p>
            Die ClimateMaster Plattform ermöglicht es dir, dich, deine Berechnung und deine Klimaschutzfortschritte 
            zu präsentieren. Sei mutig und präsentiere dich als Klimaschützer bzw. ClimateMaster. Das motiviert 
            auch Andere unseren Planeten konsequent zu schützen. Eine Beispielpräsentation eines unserer 
            Teammitglieder findest du unter <nuxt-link to="/perfect/EliasSi">www.climate-master.com/perfect/EliasSi</nuxt-link>.
            <br>Anmerkung: Wenn du deinen CO2 Ausstoß noch nicht kompensiert hast, aber weniger als
             9 Tonnen CO2 Äquivalent pro Jahr verursachst, bist du ClimateMaster Starter. Der deutsche Durchschnitt liegt 
             bei 11,6 Tonnen pro Jahr.
        </p>


        <!-- Example pictures -->
        <div class="w-100 row mt-5">
            <div class="col-1">
                <font-awesome-icon icon="images" class="" style="font-size:50px;"/>     
            </div>
            <div class="col-10">
                <h4 class="">Beispielbilder der Platform</h4>
            </div>
        </div>
        <div class="p-1">
            <img class="border border-dark img-fluid" src="~/static/pictures/forSpecialSites/theplatform/Climatemastersteps.png" alt="Bild konnte nicht gefunden werden." />
            <p>
                Die Einzelschritte um Klimaneutral also ClimateMaster zu werden. Du findes diese Seite nach dem Einloggen unter "Mein Klimaschutz".
            </p>
        </div>
        <div class="p-1">
            <img class="border border-dark img-fluid" src="~/static/pictures/forSpecialSites/theplatform/CO2Analysis.png" alt="Bild konnte nicht gefunden werden." />
            <p>
                Beispiel einer individuellen Treibhausgas Analyse. Dir wird diese Co2Chart nach deiner CO2 Berechnung 
                an verschiedenen Stellen angezeigt.
            </p>
        </div>




    </div>
</template>
<script>
export default {
    layout: 'indexLayout'
}
</script>