<template>
    <div class="text-center">
        <h2>Mein Profil veröffentlichen</h2>
        
        <div v-if="publicUserProfile != null">
            <span id="id_span_loading_animation">
                veröffentlichen
            </span>
            <toggle-button :sync="true" v-model="publicUserProfile.public" @change="publicToggleChanged()" />
           
            <p>Veröffentlicht wird dein Profilbild, sowie die hier aufgelisteten Statements, inklusive deiner Berechnung.<br>Öffentliche Profile mit Profilbild und CO2 Berechnung werden bald auf der Startseite präsentiert.</p>

            <!-- Notification -->
            <notification v-if="error" :message="error" class="text-danger mt-2" />
            <notification v-if="success" :message="success" class="text-success mt-2" />

            <hr class="col-md-5 mx-auto">

            <!-- show only if real publicUserProfile is created in DB -> id != null -->
            <div v-if="publicUserProfile.id != null && publicUserProfile.public == true" class="pb-2">
     

                <div class="row col-md-8 mx-auto">
                    <div class="mt-2 col-md-6 mx-auto">
                        <label><b>Dein <span class="text-success">Climate</span>Master Statement</b></label>
                        <textarea class="form-control" v-model="publicUserProfile.information_general" placeholder="Warum willst du ClimateMaster werden? Warum sind dir Umweltschutz und Klimaschutz wichtig? Für wen schützt du den Planeten?"></textarea>
                    </div>
                    <div class="mt-2 col-md-6 mx-auto">
                        <label><b>Kommentar Heizung und Strom</b></label>
                        <textarea class="form-control" v-model="publicUserProfile.information_heating_electricity" placeholder="Heizt du mit Erneuerbaren Energien? Oder hast du einen Ökostromanbieter?"></textarea>
                    </div>
                    <div class="mt-2 col-md-6 mx-auto">
                        <label><b>Kommentar Mobilität</b></label>
                        <textarea class="form-control" v-model="publicUserProfile.information_mobility" placeholder="Welchen Fortschritt hast du bei Mobilität gemacht? Fliegst du besonders wenig? Oder kompensierst du deine Urlaubsreisen?"></textarea>
                    </div>
                    <div class="mt-2 col-md-6 mx-auto">
                        <label><b>Kommentar Konsum</b></label>
                        <textarea class="form-control" v-model="publicUserProfile.information_consumption" placeholder="Wie reduzierst du deinen CO2 Ausstoß bei Konsum? Achtest du auf spezielle Labels? Oder kaufst du häufig gebraucht oder besonders nachhaltig?"></textarea>
                    </div>
                    <div class="mt-2 col-md-6 mx-auto">
                        <label><b>Kommentar Ernährung</b></label>
                        <textarea class="form-control" v-model="publicUserProfile.information_nutrition" placeholder="Besonders wenig Fleisch? Bio oder sogar Demeter? Vegetarisch oder sogar Vegan unterwegs?"></textarea>
                    </div>
                    <div class="mt-2 col-md-6">
                        <label><b>Kommentar Öffentliche Emissionen</b></label>
                        <textarea class="form-control" v-model="publicUserProfile.information_public_emissions" placeholder="Diese Emissionen kannst du nur indirekt beeinflussen. Nimmst du an Fridays For Future Demonstationen teil? Teilst du deine Klimaschutz Fortschritte mit Freunden und bekannten?"></textarea>
                    </div>
                </div>
               

                <button v-on:click="updatePublicProfile" id="id_button_savePublicProfile" class="btn btn-success col-md-4 mt-3">Änderungen am öffentlichen Profil speichern</button>
                <nuxt-link :to="'/now/'+user.username" class="btn btn-success col-md-4 mt-3">Mein Profil ansehen</nuxt-link>
                

                
                <!-- Notification -->
                <notification v-if="error" :message="error" class="text-danger mt-2" />
                <notification v-if="success" :message="success" class="text-success mt-2" />


            </div>
        </div>

    </div>
</template>
<script>
import notification from '~/components/MainComponents/Notification';

export default {
    props: ['profile_picture_base64'],
    components:{
        notification
    },
    data(){
        return {
            error: null,
            success: null,
            publicUserProfile: null,
        }
    },
    async mounted(){
        //Get the public profile
        try {
            const{data} = await this.$axios.post("publicUserProfile/getPublicUserProfile");

            //If current User has publicUserProfile: 
            if(data.state == "success"){
                this.publicUserProfile = data.data;
                //set 0 to false, 1 to true -> for toggle (toggle public)
                this.publicUserProfile.public = !!+this.publicUserProfile.public
            }
            //if current User has no publicUserProfile
            else if(data.state == "error"){
                this.publicUserProfile = {
                    'public' : false
                }
            }
            else{}
        } catch (e) {
            
        }


    },
    beforeUpdate(){
        if(this.profile_picture_base64 != null){
            $("#id_img_profile_picture").attr('src', 'data:image/jfif;base64,'+this.profile_picture_base64);
        }
    },
    methods:{
        async publicToggleChanged(){
            //changes the value of 'public'. In Laravel it check if there is already a publicUserProfile-> if no -> creates one and returns this
            // -> id is not null => show all the input fields
            $("#id_span_loading_animation").addClass("loading-animation-green");

            try {
                const{data} = await this.$axios.post('publicUserProfile/changePublic', {
                    public: this.publicUserProfile.public
                });

                if(data.state == 'error'){
                    this.error = data.message;
                    this.success = null;
                }
                else if(data.state == 'success'){
                    this.publicUserProfile = data.data;
                    this.success = data.message;
                }
            } catch (e) {
                
            }


            $("#id_span_loading_animation").removeClass("loading-animation-green");

        },
        async updatePublicProfile(){
            $("#id_button_savePublicProfile").addClass("loading-animation");

            try {
                const{data} = await this.$axios.post("publicUserProfile/update", {
                    information_general : this.publicUserProfile.information_general,
                    information_heating_electricity : this.publicUserProfile.information_heating_electricity,
                    information_mobility : this.publicUserProfile.information_mobility,
                    information_nutrition : this.publicUserProfile.information_nutrition,
                    information_consumption : this.publicUserProfile.information_consumption,
                    information_public_emissions : this.publicUserProfile.information_public_emissions
                });


                if(data.state == "error"){
                    this.error = data.message;
                }
                else if(data.state == "success"){
                    this.success = data.message;
                    this.error = null;
                }

            } catch (e) {
                
            }



            $("#id_button_savePublicProfile").removeClass("loading-animation");
        }
    }
}
</script>