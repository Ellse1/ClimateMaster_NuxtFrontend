<template>
    <div>
        <div class="border border-dark rounded container">

            <div id="id_div_loading_animation_paid" class="text-success" style="display:none;">Bezahlung wird überprüft...</div>

            <div class="w-100 row">
                <div class="col-1">
                    <font-awesome-icon icon="check-circle" class="mt-1" style="font-size:50px;"/>                         
                </div>
                <div class="col-10">
                    <div class="number-class mx-auto mt-1">
                        4
                    </div>
                </div>
            </div>
            <h4>ClimateMaster werden</h4>
            <div class="container">
                <p>
                    In diesem Schritt kannst du deinen Restausstoß von Treibhausgasen kopensieren
                    und damit klimaneutral und ClimateMaster werden.
                </p>
            
            <div class="row">
                <div id="id_div_co2calculationChart" class="col">
                    <!-- If it is paid -> show also compensation -->
                    <co2calculationChart @saveCO2Calculation="getCO2CalculationFromChildComponent" :props_with_compensation="paid"/>
                </div>


                <!-- the fixed top div to show pay info -->
                <infoToPay id="id_div_info_to_pay" :total_price="price" style="display:none;" />

                <div id="id_div_container_for_payment" class="col-md-3 p-2 border border-success rounded text-center mb-2" v-if="co2calculation != null && paid == false">
                    
                    <h4>Climatemaster werden</h4>
                    <p>Kompensationsmenge: <b>{{co2calculation.total_emissions}}</b> Tonnen</p>
                    <p>Preis pro Tonne: <b>23€</b></p>
                    <p>Preis gesamt: <b>{{price}} €</b> </p>

                    <a class="btn btn-success" target="_blanc" href="https://www.atmosfair.de/de/spenden/">Direktspende an Atmosfair</a>

                    <p>
                        Schicke uns danach einfach die entsprechende Spendenbescheinigung und deinen Benutzernamen ({{user.username}}) an elias.singer@climate-master.com.
                        Wir schicken dir nach einer Überprüfung dann eine Bestätigung und schalten dich als <span class="text-success">Climate</span>Master 2020 frei.
                    </p>
                    
                    <a href="#" onclick="return false;" v-on:click="showInfoToPay">Mehr Info</a>
  

                    <!-- <div id="id_paypal_button_container">

                    </div> -->
                    
                </div>
            </div>

    
            <notification :message="error" v-if="error" class="text-danger mt-2" />
            <notification :message="success" v-if="success" class="text-success mt-2" />

            <!-- Button only if paypal is active -> after payment open next step -->
            <!-- <button id="id_button_open_next_step" class="btn btn-success mb-2 mt-2 mx-auto" v-on:click="openNextStep">Weiter (nach Klimaschutzunterstützung)</button> -->

            
            <!-- Project descriptions -->
            
            <h4 class="mt-4">Projekte, die durch deine Spende ermöglicht werden</h4>
            <p>
                Wir machen mit deiner Spende keine Cent Gewinn, im Gegenteil müssen wir sogar noch die PayPal Gebüren beisteuern (Bei Bezahlungen über PayPal).
                Die Klimaschutzprojekte werden durch die gemeinnützige GmbH (gGmbH) 
                <a target="_blanc" href="https://www.atmosfair.de/">Atmosfair</a>
                 ausgewählt, begleitet und Dokumentiert. Uns, als vom Klimawandel betroffene, ist es egal, ob die
                 Treibhausgase in Deutschland oder in anderen Ländern verhindert werden. Treibhausgase sollen
                 dort eingespart werden, wo mit kleiner Anstrengung möglichst viel CO2 verhindert werden kann.
            </p>
            <div class="row mb-3">
                <div class="col-md-4">
                    <div class="card">
                        <img class="card-img-top" src="https://www.atmosfair.de/wp-content/uploads/merina-dakhar.jpg" alt="Leider kein Bild gefunden.">
                        <div class="card-body">
                            <h5 class="card-title">Senegal: Sauberer Strom aus Photovoltaikanlagen</h5>
                            <a target="_blanc" href="https://www.atmosfair.de/de/klimaschutzprojekte/solarenergie/senegal-sauberer-strom-aus-solaranlagen/">Projektbeschreibung ansehen</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <img class="card-img-top" src="https://www.atmosfair.de/wp-content/uploads/landschaftsaufnahme.jpg" alt="Leider kein Bild gefunden.">
                        <div class="card-body">
                            <h5 class="card-title">Nicaragua: Sauberer Strom aus Windkraft</h5>
                            <a target="_blanc" href="https://www.atmosfair.de/de/klimaschutzprojekte/windkraft/nicaragua/">Projektbeschreibung ansehen</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <img class="card-img-top" src="https://www.atmosfair.de/wp-content/uploads/kep2-015.jpg" alt="Leider kein Bild gefunden.">
                        <div class="card-body">
                            <h5 class="card-title">Nigeria: Effiziente Öfen</h5>
                            <a target="_blanc" href="https://www.atmosfair.de/de/klimaschutzprojekte/energieeffizienz/nigeria/">Projektbeschreibung ansehen</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mt-2">
                    <div class="card">
                        <img class="card-img-top" src="https://www.atmosfair.de/wp-content/uploads/7-kochen-frau-mit-kind_bearbeitet-1.jpg" alt="Leider kein Bild gefunden.">
                        <div class="card-body">
                            <h5 class="card-title">Ruanda: Effiziente Öfen</h5>
                            <a target="_blanc" href="https://www.atmosfair.de/de/klimaschutzprojekte/energieeffizienz/ruanda/">Projektbeschreibung ansehen</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mt-2">
                    <div class="card">
                        <img class="card-img-top" src="https://www.atmosfair.de/wp-content/uploads/esperanza_honduras_reservoiriii-e1500479903724.jpg" alt="Leider kein Bild gefunden.">
                        <div class="card-body">
                            <h5 class="card-title">Honduras: Kleinwasserkraftwerk</h5>
                            <a target="_blanc" href="https://www.atmosfair.de/de/klimaschutzprojekte/wasserkraft/honduras/">Projektbeschreibung ansehen</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mt-2">
                    <div class="card">
                        <img class="card-img-top" src="https://www.atmosfair.de/wp-content/uploads/anlage_ausbau.jpg" alt="Leider kein Bild gefunden.">
                        <div class="card-body">
                            <h5 class="card-title">Energieversorgung des Flüchtlingscamps Mam Rashan im Irak</h5>
                            <a target="_blanc" href="https://www.atmosfair.de/de/klimaschutzprojekte/solarenergie/irak/">Projektbeschreibung ansehen</a>
                        </div>
                    </div>
                </div>
            </div>
            Alle Bilder: &copy; Atmosfair gGmbH

            



            </div>
        </div>
    </div>
</template>
<script>
import co2calculationChart from '~/components/MyClimateMasterActions/Resources/myCO2CalculationChart';
import notification from '~/components/MainComponents/Notification';
import infoToPay from '~/components/MyClimateMasterActions/Resources/pay';
export default {
    components:{
        co2calculationChart,
        notification,
        infoToPay
    },
    data(){
        return {
            error:null,
            success: null,
            paypal_button_rendered: false, //If true -> the button is already rendered -> dont render again
            co2calculation: null,
            price: null,
            total_emission : null,
            paid: false,
        };
    },
    mounted(){
    },
    async updated(){
        let price = this.price;
        let total_emission = this.total_emission;
        //Render the paypal button

        // var thisApp = this;
        // if(this.paypal_button_rendered == false){
        //     paypal.Buttons(
        //     {
        //         createOrder: function(data, actions) {
        //         // This function sets up the details of the transaction, including the amount and line item details.
        //             return actions.order.create({
        //                 purchase_units: [{
        //                     amount: {
        //                         currency_code: 'EUR',
        //                         value: price
        //                         },
        //                     description: 'CO2 Kompensierung: ' + total_emission + ' Tonnen'
        //                 }]
        //             });
        //         },
        //         onApprove: async function(response_data, actions) {
                    
        //             //Show loading animation and approve the payment server side
        //             $("#id_div_loading_animation_paid").show();
        //             $("#id_div_loading_animation_paid").addClass('loading-animation-green');

        //             //VERRY IMPORTANT!!!  Captur the payment : VERRY IMPORTANT!!!!! if not -> not charged!!!
        //             const order = await actions.order.capture();

        //             //Sent to backend -> check payment and save in DB
        //             const{data} = await thisApp.$axios.post("paypal/checkPayment",{
        //                 order_id : response_data.orderID
        //             });

        //             $("#id_div_loading_animation_paid").removeClass('loading-animation-green');
        //            $("#id_div_loading_animation_paid").hide();

        //             if(data.state == 'error'){
        //                 thisApp.error = data.message;
        //                 thisApp.success = null;
        //             }
        //             else if(data.state == 'success'){
        //                 thisApp.success = data.message;
        //                 thisApp.error = null;
        //                 thisApp.paid = true;
        //                 $("#id_div_container_for_payment").hide();
        //                 $("#id_div_co2calculationChart").deleteClass("col-md-9").addClass("col-md-12");
        //             }

        //         },
        //         onError: error => {
        //             console.log(error);
        //         }
        //     }).render('#id_paypal_button_container');
        //     this.paypal_button_rendered = true;
        // }

        //if it is already paid -> set green check and open congratulation
        if(this.paid == true){
            this.$emit('climatemaster_steps_completed_changed');
        }
    },
    methods:{
        getCO2CalculationFromChildComponent(co2calculation){
            this.price = (co2calculation.total_emissions * 23).toFixed(2);
            this.total_emission = co2calculation.total_emissions;
            this.co2calculation = co2calculation;
        },
        openNextStep(){
            if(this.paid == true){
                this.$emit('open_next_step');
            }
        },
        showInfoToPay(){
            $("#id_div_info_to_pay").show();
        }
    }
}
</script>