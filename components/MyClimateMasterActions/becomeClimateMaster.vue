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
                <div id="id_div_container_for_payment" class="col-md-3 p-2 border border-success rounded text-center mb-2" v-if="co2calculation != null && paid == false">
                    
                    <h4>Climatemaster werden</h4>
                    <p>Kompensationsmenge: <b>{{co2calculation.total_emissions}}</b> Tonnen</p>
                    <p>Preis pro Tonne: <b>23€</b></p>
                    <p>Preis gesamt: <b>{{price}} €</b> </p>

                    <div id="id_paypal_button_container">

                    </div>
                    
                    <!-- link to pay without roundup --
                    <button id="id_button_pay_without_roundup" v-on:click="pay(false)" class="btn btn-primary">{{co2calculation.total_emissions}} Tonnen kompensieren</button><br>
                    <small>{{price_small}} €</small><br>

                    <b>Aufrunden:</b>
                    <-- Link to pay with roundup --
                    <button id="id_button_pay_with_roundup" v-on:click="pay(true)" class="btn btn-primary">{{total_emission_uprounded}} Tonnen kompensieren</button><br>
                    <small>{{price_uprounded}} €</small>


                    <h4 class="mt-5">Bezahlung per Paypal</h4> -->
                </div>
            </div>

    
            <notification :message="error" v-if="error" class="text-danger mt-2" />
            <notification :message="success" v-if="success" class="text-success mt-2" />

            <button id="id_button_open_next_step" class="btn btn-success mb-2 mt-2 mx-auto" v-on:click="openNextStep">Weiter</button>


            </div>
        </div>
    </div>
</template>
<script>
import co2calculationChart from '~/components/MyClimateMasterActions/Resources/myCO2CalculationChart';
import notification from '~/components/MainComponents/Notification';
export default {
    components:{
        co2calculationChart,
        notification
    },
    data(){
        return {
            error:null,
            success: null,
            paypal_button_rendered: false, //If true -> the button is already rendered -> dont render again
            co2calculation: null,
            price: null,
            total_emission : null,
            paid: false
        };
    },
    mounted(){
    },
    async updated(){
        let price = this.price;
        let total_emission = this.total_emission;
        //Render the paypal button

        var thisApp = this;
        if(this.paypal_button_rendered == false){
            paypal.Buttons(
            {
                createOrder: function(data, actions) {
                // This function sets up the details of the transaction, including the amount and line item details.
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                currency_code: 'EUR',
                                value: price
                                },
                            description: 'CO2 Kompensierung: ' + total_emission + ' Tonnen'
                        }]
                    });
                },
                onApprove: async function(response_data, actions) {
                    
                    //Show loading animation and approve the payment server side
                    $("#id_div_loading_animation_paid").show();
                    $("#id_div_loading_animation_paid").addClass('loading-animation-green');

                    //VERRY IMPORTANT!!!  Captur the payment : VERRY IMPORTANT!!!!! if not -> not charged!!!
                    const order = await actions.order.capture();

                    //Sent to backend -> check payment and save in DB
                    const{data} = await thisApp.$axios.post("paypal/checkPayment",{
                        order_id : response_data.orderID
                    });

                    $("#id_div_loading_animation_paid").removeClass('loading-animation-green');
                   $("#id_div_loading_animation_paid").hide();

                    if(data.state == 'error'){
                        thisApp.error = data.message;
                        thisApp.success = null;
                    }
                    else if(data.state == 'success'){
                        thisApp.success = data.message;
                        thisApp.error = null;
                        thisApp.paid = true;
                        $("#id_div_container_for_payment").hide();
                        $("#id_div_co2calculationChart").deleteClass("col-md-9").addClass("col-md-12");
                    }

                },
                onError: error => {
                    console.log(error);
                }
            }).render('#id_paypal_button_container');
            this.paypal_button_rendered = true;
        }

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
        }
    }
}
</script>