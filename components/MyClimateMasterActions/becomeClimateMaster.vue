<template>
    <div>
        <div class="border border-dark rounded container">
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
                <div class="col-md-9">
                    <co2calculationChart @saveCO2Calculation="getCO2CalculationFromChildComponent"/>
                </div>
                <div class="col-md-3 border border-success rounded text-center mb-2" v-if="co2calculation != null">
                    <h4>Climatemaster werden</h4>
                    <p>Kompensationsmenge: <b>{{co2calculation.total_emissions}}</b> Tonnen</p>
                    <p>Preis pro Tonne: <b>23€</b></p>
                    <!-- link to pay without roundup -->
                    <button id="id_button_pay_without_roundup" v-on:click="pay(false)" class="btn btn-primary">{{co2calculation.total_emissions}} Tonnen kompensieren</button><br>
                    <small>{{price_small}} €</small><br>

                    <b>Aufrunden:</b>
                    <!-- Link to pay with roundup -->
                    <button id="id_button_pay_with_roundup" v-on:click="pay(true)" class="btn btn-primary">{{total_emission_uprounded}} Tonnen kompensieren</button><br>
                    <small>{{price_uprounded}} €</small>


                    <h4 class="mt-5">Bezahlung per Paypal</h4>
                </div>
            </div>

    






            </div>
        </div>
    </div>
</template>
<script>
import co2calculationChart from '~/components/MyClimateMasterActions/Resources/myCO2CalculationChart';

export default {
    components:{
        co2calculationChart
    },
    data(){
        return {
            co2calculation: null,
            price_small: null,
            total_emission_uprounded : null,
            price_uprounded : null

        };
    },
    mounted(){

    },
    methods:{
        getCO2CalculationFromChildComponent(co2calculation){
            this.price_small = co2calculation.total_emissions * 23;
            this.total_emission_uprounded = Math.ceil(co2calculation.total_emissions)
            this.price_uprounded = this.total_emission_uprounded * 23;
            this.co2calculation = co2calculation;
        },
        pay(roundup){
            if(roundup == false){
                $("#id_button_pay_without_roundup").addClass("loading-animation")
                window.location.href = "https://www.climate-master.com:8000/api/paypal/payment?id=" + this.user.id + "&roundup=0";
            }
            else if(roundup == true){
                $("#id_button_pay_with_roundup").addClass("loading-animation")
                window.location.href = "https://www.climate-master.com:8000/api/paypal/payment?id=" + this.user.id + "&roundup=1";
            }
        }
    }
}
</script>