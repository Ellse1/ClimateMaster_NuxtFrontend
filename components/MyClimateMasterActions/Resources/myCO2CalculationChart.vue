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
                    <div class="col-2" style="word-wrap: break-word;" v-if="props_with_compensation == true">Kompensierung (Alles!)</div>
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
    props: ['props_co2calculation', 'props_with_compensation'],
    data(){
        return{
            error: null,
            success: null,
            emissions: {},
            total_emissions: 0
        }
    },
    async mounted(){





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

                //It it should show the compensation bar too
                if(this.props_with_compensation == true){
                    emissions_minimized['total_emissions'] = data.data['total_emissions'];
                }

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
        
    },
    beforeUpdate(){
        // If it should show the whole compensation too -> from parent set "props_with_compensation" = true -> rerender here
        if(this.props_with_compensation == true){
            this.emissions['total_emissions'] = this.total_emissions;
        }
    }, 
    updated(){
        // For calculation the factor to draw the diagram
        var biggestEmission = 0.00;
        if(parseFloat(this.emissions['public_emissions']) > biggestEmission){biggestEmission=parseFloat(this.emissions['public_emissions']);}
        if(parseFloat(this.emissions['consumption']) > biggestEmission){biggestEmission=parseFloat(this.emissions['consumption']);}
        if(parseFloat(this.emissions['nutrition']) > biggestEmission){biggestEmission=parseFloat(this.emissions['nutrition']);}
        if(parseFloat(this.emissions['mobility']) > biggestEmission){biggestEmission=parseFloat(this.emissions['mobility']);}
        if(parseFloat(this.emissions['heating_electricity']) > biggestEmission){biggestEmission=parseFloat(this.emissions['heating_electricity']);}
       
        // If it should show the whole compensation too
        if(this.props_with_compensation == true){
            if(parseFloat(this.emissions['total_emissions']) > biggestEmission){biggestEmission=parseFloat(this.emissions['total_emissions']);}
        }
        //The height of the div is 300px -> take 250 of that
        var faktor = 250/biggestEmission; 


        $("#public_emissions").height(this.emissions['public_emissions'] * faktor);
        $("#consumption").height(this.emissions['consumption'] * faktor);
        $("#nutrition").height(this.emissions['nutrition'] * faktor);
        $("#mobility").height(this.emissions['mobility'] * faktor);
        $("#heating_electricity").height(this.emissions['heating_electricity'] * faktor);
        if(this.props_with_compensation == true){
            $("#total_emissions").height(this.emissions['total_emissions'] * faktor);
            $("#total_emissions").addClass("bg-success");
        }
    }
}
</script>