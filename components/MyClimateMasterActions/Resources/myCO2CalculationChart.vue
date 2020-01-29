<template>
    <div>
            <div class="" v-if="success">
                <h4 class="text-center">Deine aktuelle Berechnung</h4>
                <div class="row">
                    <div class="col-2" v-for="(emission, key) in emissions" v-bind:key="key" style="position:relative;height:300px;">
                        <b>{{emission}}</b> Tonnen
                        <nuxt-link :to="{path:'/climadvices',query:{climatemasterarea: key}}" class="h-100 w-100">
                            <!-- Chart bar -->
                            <div :id="key" class="bg-primary card" style="position:absolute;bottom:0px;width:80%;"></div>
                        </nuxt-link>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2" style="word-wrap: break-word;">Öffentliche Emissionen</div>
                    <div class="col-2" style="word-wrap: break-word;">Konsum</div>
                    <div class="col-2" style="word-wrap: break-word;">Ernährung</div>
                    <div class="col-2" style="word-wrap: break-word;">Mobilität</div>
                    <div class="col-2" style="word-wrap: break-word;">Heizung und Strom</div>
                </div>

                <div class="text-center">
                    <b>Gesamtemissionen: {{total_emissions}} Tonnen</b><br>
                    Klicke auf die Balken, um Vorschläge für den jeweiligen Bereich zu bekommen.
                </div>

            </div>

    </div>
</template>
<script>

var VueScrollTo = require('vue-scrollto');

export default {
    props: ['props_co2calculation'],
    data(){
        return{
            error: null,
            success: null,
            emissions: {},
            total_emissions: 0
        }
    },
    async mounted(){
        if(this.props_co2calculation != null){
            var emissions_minimized = {};
            emissions_minimized['public_emissions'] = props_co2calculation['public_emissions'];
            emissions_minimized['consumption'] = props_co2calculation['consumption'];
            emissions_minimized['nutrition'] = props_co2calculation['nutrition'];
            emissions_minimized['mobility'] = props_co2calculation['mobility'];
            emissions_minimized['heating_electricity'] = props_co2calculation['heating_electricity'];
            this.emissions = emissions_minimized;
        }
        else{
            try {
                const{data} = await this.$axios.post("co2calculation/getLatestCalculation");

                if(data.state == "error"){
                    this.error = data.message;
                    this.success = null;
                }
                else if(data.state == "success"){
                    this.success = data.message;
                    this.error = null;

                    var emissions_minimized = {};
                    emissions_minimized['public_emissions'] = data.data['public_emissions'];
                    emissions_minimized['consumption'] = data.data['consumption'];
                    emissions_minimized['nutrition'] = data.data['nutrition'];
                    emissions_minimized['mobility'] = data.data['mobility'];
                    emissions_minimized['heating_electricity'] = data.data['heating_electricity'];
                    this.emissions = emissions_minimized;

                    this.total_emissions = data.data['total_emissions'];

                    //Returns this co2calculation to parent -> if parent needs it, not necessary to get again
                    this.$emit('saveCO2Calculation', data.data);
                }
                else{
                    this.error = "Die Daten konnten nicht geholt werden";
                }
            } catch (e) {
                this.error = "Es konnte keine Berechnung geholt werden. " + e.response.data.message;
            }  
        }
    },    
    updated(){
        // For calculation the factor 
        var biggestEmission = 0;

        if(this.emissions['public_emissions'] > biggestEmission){biggestEmission=this.emissions['public_emissions'];}
        if(this.emissions['consumption'] > biggestEmission){biggestEmission=this.emissions['consumption'];}
        if(this.emissions['nutrition'] > biggestEmission){biggestEmission=this.emissions['nutrition'];}
        if(this.emissions['mobility'] > biggestEmission){biggestEmission=this.emissions['mobility'];}
        if(this.emissions['heating_electricity'] > biggestEmission){biggestEmission=this.emissions['heating_electricity'];}

        //The height of the div is 300px -> take 250 of that
        var faktor = 250/biggestEmission; 


        $("#public_emissions").height(this.emissions['public_emissions'] * faktor);
        $("#consumption").height(this.emissions['consumption'] * faktor);
        $("#nutrition").height(this.emissions['nutrition'] * faktor);
        $("#mobility").height(this.emissions['mobility'] * faktor);
        $("#heating_electricity").height(this.emissions['heating_electricity'] * faktor);

    }
}
</script>