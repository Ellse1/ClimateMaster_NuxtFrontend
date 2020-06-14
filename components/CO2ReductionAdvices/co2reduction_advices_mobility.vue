<template>
    <div>
         <!-- sub headings -->
        <div class="row mt-2 mb-2">
            <div class="col">
                <button id="id_button_buyElectricCar" class="btn btn-default border border-success text-success mt-2" v-on:click="open_content(0)">
                    <font-awesome-icon icon="car"  style="font-size:20px;"/>     
                </button>
            </div>
            <div class="col">
                <button id="id_button_usePublicTransport" class="btn btn-default border border-dark mt-2" v-on:click="open_content(1)">
                    <font-awesome-icon icon="bus"  style="font-size:20px;"/>     
                </button>
            </div>   
            <div class="col">
                <button id="id_button_dontFly" class="btn btn-default border border-dark mt-2"  v-on:click="open_content(2)">
                    <font-awesome-icon icon="train"  style="font-size:20px;"/>     
                </button>
            </div>         
        </div>
        <!-- Buttons to open next tip -->
        <div class="text-center">
            <button class="border border-dark rounded" v-on:click="openLastContent">
                <font-awesome-icon icon="chevron-left" style="font-size:30px;"/>     
            </button>
            <button class="border border-dark rounded" v-on:click="openNextContent">
                <font-awesome-icon icon="chevron-right" style="font-size:30px;"/>     
            </button>
        </div>


        <!-- real Content -->

        <!-- Content: Buy  electric Car -->
        <div id="id_div_content_buyElectricCar">
            <buyElectricCar />
        </div>
        <!-- End Content BuyElectricCar -->
        <!-- Content: usePublicTransport -->
        <div id="id_div_content_usePublicTransport" style="display:none;">
           <usePublicTransport />
        </div>
        <!-- End Content: usePublicTransport -->

        <!-- Content: dontFly  -->
        <div id="id_div_content_dontFly" style="display:none;">
            <dontFly />
        </div>
        <!-- End Content: dontFly -->


    </div>
</template>
<script>
import buyElectricCar from '~/components/ClimadviceContent/buyElectricCar/buyElectricCar';
import usePublicTransport from '~/components/ClimadviceContent/usePublicTransport/usePublicTransport';
import dontFly from '~/components/ClimadviceContent/dontFly/dontFly';

export default {
    components:{
        buyElectricCar,
        usePublicTransport,
        dontFly
    },
    data(){
        return{
            openedContentIndex : 0,
            contents : [
                {key: "buyElectricCar"},
                {key: "usePublicTransport"},
                {key: "dontFly"}
            ]
        };
    },
    methods:{
        open_content(contentIndexToOpen){
            // Close opened info
            $("#id_button_" + this.contents[this.openedContentIndex].key).removeClass("border-success text-success").addClass("border-dark text-dark");
            $("#id_div_content_" + this.contents[this.openedContentIndex].key).hide();
            this.openedContentIndex = contentIndexToOpen;
            $("#id_div_content_" + this.contents[this.openedContentIndex].key).show();
            $("#id_button_" + this.contents[this.openedContentIndex].key).removeClass("border-dark text-dark").addClass("border-success text-success");
        },
        openNextContent(){
            $("#id_div_content_" + this.contents[this.openedContentIndex].key).hide();
            $("#id_button_" + this.contents[this.openedContentIndex].key).removeClass("border-success text-success").addClass("border-dark text-dark");
            if(this.openedContentIndex <= 1){
                this.openedContentIndex = this.openedContentIndex + 1;
            }
            $("#id_div_content_" + this.contents[this.openedContentIndex].key).show();
            $("#id_button_" + this.contents[this.openedContentIndex].key).removeClass("border-dark text-dark").addClass("border-success text-success");

        },
        openLastContent(){
            $("#id_div_content_" + this.contents[this.openedContentIndex].key).hide();
            $("#id_button_" + this.contents[this.openedContentIndex].key).removeClass("border-success text-success").addClass("border-dark text-dark");

            if(this.openedContentIndex >= 1){
                this.openedContentIndex = this.openedContentIndex - 1;
            }
            $("#id_div_content_" + this.contents[this.openedContentIndex].key).show();
            $("#id_button_" + this.contents[this.openedContentIndex].key).removeClass("border-dark text-dark").addClass("border-success text-success");

        }
    }
}
</script>