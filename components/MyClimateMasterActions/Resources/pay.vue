<template>
    <div>
        <div class="fixed-top w-100 h-100" style="background-color:rgba(247, 247, 247, 0.3);">
            <div class="col-md-8 mx-auto bg-light rounded border border-success mt-5 p-3">
                <h4>Mit Spende an Atmosfair Klimaschutzprojekte fördern</h4>
                
                <div class="text-left">
                    Lieber {{user.firstname}}, <br>
                    Sehr cool, dass du ClimateMaster 2020 wirst und damit die Umwelt schützt und eine nachhaltigere Entwicklung
                    förderst. Mit einer Direktspende an die gemeinnützige GmbH Atmosfair, kannst du Klimaschutzprojekte finanziell
                     unterstützen und die von dir ausgestoßene Menge CO2 wieder kompensieren:
                    <br><br>
                    <div>
                        <h6>Direktspende an Atmosfair</h6>
                        <b>{{total_price}}</b> € an die gemeinnützige GmbH (gGmbH) Atmosfair spenden.
                        <p>
                            Die Atmosfair gGmbH begleitet und dokumentiert Klimaschutzprojekte in der ganzen Welt.
                            Uns, als vom Klimawandel betroffene, ist es egal, ob die Treibhausgase
                            in Deutschland oder in anderen Ländern verhindert werden. Treibhausgase sollen
                            dort eingespart werden, wo mit kleiner Anstrengung möglichst viel CO2 verhindert werden kann.
                        </p>
                        <p>
                            Spende den entsprechenden Betrag für deine individuelle CO2 Kompensation und schicke
                            uns einfach den entsprechenden Beleg und deinen Benutzernamen an elias@climate-master.com.
                            Wir schicken dir dann eine Bestätigung und schalten dich als ClimateMaster 2020 frei.
                            <ul class="mt-3">
                                <li><a class="btn btn-success" target="_blanc" href="https://www.atmosfair.de/de/spenden/">Hier spenden</a></li>
                                <li>Betrag: <b>{{total_price}}€</b></li>
                                <li>Danach email an: elias@climate-master.com mit folgendem Inhalt:</li>
                                <ul>
                                    <li>Deinem Benutzernamen: {{user.username}}</li>
                                    <li>Beleg von Atmosfair</li>
                                </ul>
                            </ul>
                            Vielen Dank für deinen herausragenden Einsatz für umweltfreundlichen Klimaschutz!
                        </p>
                    </div>
                    <div>
                        <!-- <h6>2) Spende an uns, wir spenden dann umgehend und ohne Gebüren an Atmosfair</h6>
                        <p>
                            Damit haben wir natürlich mehr Aufwand, dennoch wollen wir Ihnen diese Möglichkeit bieten.
                        </p> -->
                    </div>

                </div>

                <button class="btn btn-danger" v-on:click="closeOptionsToPay">Schließen</button>

            </div>
        </div>
    </div>
</template>
<script>
export default {
    props : ['total_price'],
    methods:{
        closeOptionsToPay(){
            //This div (id_div_options_to_pay)  is defined in becomeClimateMaster.vue
            $("#id_div_info_to_pay").hide();
        }
    }

}
</script>