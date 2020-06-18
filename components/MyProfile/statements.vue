<template>
    <div class="text-center">


        <!-- Show link to make handprint public  -->
        <div v-if="public_user_profile != null" class="mb-3 text-center">
            <div v-if="public_user_profile.public != true">
                <nuxt-link  style="width:90%;" to="/account/myProfile?page=publish">
                    Profil sichtbar machen
                    <font-awesome-icon icon="check-circle" style="font-size:20px;" />
                </nuxt-link>            
            </div>
        </div>



        <span id="id_span_loading_animation" ></span>

        <div class="row mx-auto" v-if="publicUserProfile != null">
            <div class="mt-2 col-md-12 mx-auto">
                <label><b>Mein <span class="text-success">Climate</span>Master Statement</b></label>
                <textarea class="form-control" rows="4" v-model="publicUserProfile.information_general" placeholder="Warum willst du ClimateMaster werden? Warum sind dir Umweltschutz und Klimaschutz wichtig? Für wen schützt du den Planeten?"></textarea>
            </div>
            <div class="mt-2 col-md-6 mx-auto">
                <label><b>Kommentar Heizung und Strom</b></label>
                <textarea class="form-control" rows="4" v-model="publicUserProfile.information_heating_electricity" placeholder="Heizt du mit Erneuerbaren Energien? Oder hast du einen Ökostromanbieter?"></textarea>
            </div>
            <div class="mt-2 col-md-6 mx-auto">
                <label><b>Kommentar Mobilität</b></label>
                <textarea class="form-control" rows="4" v-model="publicUserProfile.information_mobility" placeholder="Welchen Fortschritt hast du bei Mobilität gemacht? Fliegst du besonders wenig? Oder kompensierst du deine Urlaubsreisen?"></textarea>
            </div>
            <div class="mt-2 col-md-6 mx-auto">
                <label><b>Kommentar Konsum</b></label>
                <textarea class="form-control" rows="4" v-model="publicUserProfile.information_consumption" placeholder="Wie reduzierst du deinen CO2 Ausstoß bei Konsum? Achtest du auf spezielle Labels? Oder kaufst du häufig gebraucht oder besonders nachhaltig?"></textarea>
            </div>
            <div class="mt-2 col-md-6 mx-auto">
                <label><b>Kommentar Ernährung</b></label>
                <textarea class="form-control" rows="4" v-model="publicUserProfile.information_nutrition" placeholder="Besonders wenig Fleisch? Bio oder sogar Demeter? Vegetarisch oder sogar Vegan unterwegs?"></textarea>
            </div>
            <div class="mt-2 col-md-6">
                <label><b>Kommentar Öffentliche Emissionen</b></label>
                <textarea class="form-control" rows="4" v-model="publicUserProfile.information_public_emissions" placeholder="Diese Emissionen kannst du nur indirekt beeinflussen. Nimmst du an Fridays For Future Demonstationen teil? Teilst du deine Klimaschutz Fortschritte mit Freunden und bekannten?"></textarea>
            </div>
            <div class="mt-2 col-md-6">
                <label><b>Kommentar CO2 Kompensation</b></label>
                <textarea class="form-control" rows="4" v-model="publicUserProfile.information_compensation" placeholder="Kompensierst du CO2 Emissionen? Welches Ziel verfolgst du damit? Was hältst du davon?"></textarea>
            </div>
        </div>

        <button v-on:click="updatePublicProfile" id="id_button_savePublicProfile" class="btn btn-success col-md-4 m-3 mx-auto">Änderungen am öffentlichen Profil speichern</button>
        <nuxt-link :to="'/now/'+user.username" class="btn btn-success col-md-4 m-3 mx-auto">Mein Profil ansehen</nuxt-link>
                
        <!-- Notification -->
        <notification v-if="error" :message="error" class="text-danger mt-2" />
        <notification v-if="success" :message="success" class="text-success mt-2" />


    </div>
</template>
<script>
import notification from '~/components/MainComponents/Notification';

export default {
    props: ['public_user_profile'],
    components:{
        notification
    },
    data(){
        return{
            publicUserProfile : null
        }
    },
    async mounted(){
        //Get the public profile
        $("#id_span_loading_animation").addClass('loading-animation-green');

        // check if i can get the public_user_profile from the parent component
        if(this.public_user_profile != null){
            this.publicUserProfile = this.public_user_profile;
        }else{

            try {
                const{data} = await this.$axios.post("publicUserProfile/getPublicUserProfile_ByCurrentUser");

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
        }
        $("#id_span_loading_animation").removeClass('loading-animation-green');

    },
    methods:{
        async updatePublicProfile(){
            $("#id_button_savePublicProfile").addClass("loading-animation");

            try {
                const{data} = await this.$axios.post("publicUserProfile/updatePublicUserProfile_ByCurrentUser", {
                    information_general : this.publicUserProfile.information_general,
                    information_heating_electricity : this.publicUserProfile.information_heating_electricity,
                    information_mobility : this.publicUserProfile.information_mobility,
                    information_nutrition : this.publicUserProfile.information_nutrition,
                    information_consumption : this.publicUserProfile.information_consumption,
                    information_public_emissions : this.publicUserProfile.information_public_emissions,
                    information_compensation : this.publicUserProfile.information_compensation
                });


                if(data.state == "error"){
                    this.error = data.message;
                }
                else if(data.state == "success"){
                    this.success = data.message;
                    this.error = null;
                    this.publicUserProfile = data.data;
                    //Save the new public_user_profile into the store
                    var publicUserProfilesForListFromStore = this.$store.state.publicUserProfilesForList.list;
                    if(publicUserProfilesForListFromStore.length > 0){
                        //Check if this profile is in store
                        var profilesWithCorrectIDs = [];
                        publicUserProfilesForListFromStore.forEach(profile => {
                            if(profile.public_user_profile.id == this.publicUserProfile.id){
                                //remove it -> it has to load it new from server if needed
                                profilesWithCorrectIDs.push(profile);
                            }
                        }); 

                        //remove the old profile -> if i need it, load it new from the server
                        if(profilesWithCorrectIDs.length >= 1){
                            await this.$store.commit('publicUserProfilesForList/remove', profilesWithCorrectIDs[0]);
                        }

                    }
                }

            } catch (e) {
                
            }



            $("#id_button_savePublicProfile").removeClass("loading-animation");
        }
    }
}
</script>