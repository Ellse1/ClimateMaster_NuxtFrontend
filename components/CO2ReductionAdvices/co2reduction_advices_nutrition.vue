<template>
    <div>
         <!-- sub headings -->
        <div class="row mt-2 mb-2">
            <div class="col">
                <button id="id_button_eatVegetarian" class="btn btn-default border border-success text-success mt-2" v-on:click="open_content(0)">
                    <font-awesome-icon icon="car"  style="font-size:20px;"/>     
                </button>
            </div>
            <div class="col">
                <button id="id_button_buyRegionalSeasonal" class="btn btn-default border border-dark mt-2" v-on:click="open_content(1)">
                    <font-awesome-icon icon="bus"  style="font-size:20px;"/>     
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

        <!-- Content: eatVegetarian -->
        <div id="id_div_content_eatVegetarian">
            <eatVegetarian />
        </div>
        <!-- End Content eatVegetarian -->
        <!-- Content: buyRegionalSeasonal -->
        <div id="id_div_content_buyRegionalSeasonal" style="display:none;">
           <buyRegionalSeasonal />
        </div>
        <!-- End Content: buyRegionalSeasonal -->



    </div>
</template>
<script>
import eatVegetarian from '~/components/ClimadviceContent/eatVegetarian/eatVegetarian';
import buyRegionalSeasonal from '~/components/ClimadviceContent/buyRegionalSeasonal/buyRegionalSeasonal';

export default {
    components:{
        eatVegetarian,
        buyRegionalSeasonal,
    },
    data(){
        return{
            openedContentIndex : 0,
            contents : [
                {key: "eatVegetarian"},
                {key: "buyRegionalSeasonal"},
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
            if(this.openedContentIndex <= 0){
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