<template>
    <div class="text-center pb-2">
        <!-- publish profilepicture, co2handprint and statements -->
        <div>
            <button id="id_button_publishProfile" class="btn btn-default border" v-on:click="publishButtonPressed()">
                Mein Profil veröffentlichen
                <font-awesome-icon id="id_publishProfile_checkCircle" icon="check-circle"  style="font-size:20px;display:none;"/>     
            </button>
            <br>
            (
            <small>
            <nuxt-link to="/account/myProfile?page=factsheet">Profilbild</nuxt-link>, 
            <nuxt-link to="/account/myProfile?page=co2handprint">CO2 Handabdruck</nuxt-link> &
            <nuxt-link to="/account/myProfile?page=statements">Statements</nuxt-link> 
            </small>
            )
        </div>
        <br>
        <div class="row mb-4">
            <div class="col mt-1">
                <button id="id_button_publishClimadviceChecks" class="btn btn-default border" v-on:click="publishClimadviceChecksButtonPressed()">Climadvice Checks anzeigen</button>
            </div>
            <div class="col mt-1">
                <button id="id_button_publishPictures" class="btn btn-default border" v-on:click="publishPicturesButtonPressed()">Bilder anzeigen</button>
            </div>
            <div class="col mt-1">
                <button id="id_button_publishSocialMediaNames" class="btn btn-default border" v-on:click="publishSocialMediaNamesButtonPressed()">Social Media Namen anzeigen</button>
            </div>
        </div>

        <nuxt-link :to="'/now/' + this.user.username">Mein Profil ansehen</nuxt-link>

        <!-- Notification -->
        <notification v-if="error" :message="error" class="text-danger mt-2" />
        <notification v-if="success" :message="success" class="text-success mt-2" />


    </div>
</template>
<script>
import notification from '~/components/MainComponents/Notification';

export default {
    components:{
        notification
    },
    data(){
        return{
            error: null,
            success: null,
            publicUserProfile: null,
        }
    },
    async mounted(){
        $("#id_button_publishProfile").addClass('loading-animation-green');
        try {
            const{data} = await this.$axios.post("publicUserProfile/getPublicUserProfile_ByCurrentUser");
            if(data.state == "error"){

            }
            else if(data.state == "success"){
                this.publicUserProfile = data.data;
                //show buttons in green if they are enabled
                if(this.publicUserProfile.public == true){
                    $("#id_button_publishProfile").addClass("btn-success")
                    $("#id_publishProfile_checkCircle").show();
                    if(this.publicUserProfile.public_climadvice_checks == true){
                        $("#id_button_publishClimadviceChecks").addClass("btn-success")
                    }
                    if(this.publicUserProfile.public_social_media_names == true){
                        $("#id_button_publishSocialMediaNames").addClass("btn-success")
                    }
                    if(this.publicUserProfile.public_pictures == true){
                        $("#id_button_publishPictures").addClass("btn-success")
                    }

                    //if one thing is public -> disable button to make all private
                    if(this.publicUserProfile.public_climadvice_checks == true || this.publicUserProfile.public_social_media_names == true || this.publicUserProfile.public_pictures == true){
                        $("#id_button_publishProfile").prop('disabled', true); 
                    }else{
                        $("#id_button_publishProfile").prop('disabled', false); 
                    }


                }
                else{
                 
                }   
            }
            else{

            }
        } catch (error) {
            
        }

        $("#id_button_publishProfile").removeClass('loading-animation-green');

    },
    methods:{
        async changePublicValues(){
            //changes the value of 'public'. In Laravel it check if there is already a publicUserProfile-> if no -> creates one and returns this
            $("#id_button_publishProfile").addClass("loading-animation-green");

            //if one value is public -> make whole profile public
            if(this.publicUserProfile.public_climadvice_checks == true || this.publicUserProfile.public_social_media_names == true || this.publicUserProfile.public_pictures == true ){
                this.publicUserProfile.public = true;
            }
            
            try {
                const{data} = await this.$axios.post('publicUserProfile/changePublic_ByCurrentUser', {
                    public: this.publicUserProfile.public,
                    public_climadvice_checks : this.publicUserProfile.public_climadvice_checks,
                    public_social_media_names : this.publicUserProfile.public_social_media_names,
                    public_pictures: this.publicUserProfile.public_pictures
                });

                if(data.state == 'error'){
                }
                else if(data.state == 'success'){
                    this.publicUserProfile = data.data;
                    this.success = data.message;
                    //show buttons green if the profile is public
                    if(this.publicUserProfile.public == true){
                        $("#id_button_publishProfile").addClass("btn-success")
                        $("#id_publishProfile_checkCircle").show();

                        if(this.publicUserProfile.public_climadvice_checks == true){
                            $("#id_button_publishClimadviceChecks").addClass("btn-success")
                        }
                        else{
                            $("#id_button_publishClimadviceChecks").removeClass("btn-success")
                        }
                        if(this.publicUserProfile.public_social_media_names == true){
                            $("#id_button_publishSocialMediaNames").addClass("btn-success")
                        }
                        else{
                            $("#id_button_publishSocialMediaNames").removeClass("btn-success")
                        }
                        if(this.publicUserProfile.public_pictures == true){
                            $("#id_button_publishPictures").addClass("btn-success")
                        }
                        else{
                            $("#id_button_publishPictures").removeClass("btn-success")
                        }
                        //if one thing is public -> disable button to make all private
                        if(this.publicUserProfile.public_climadvice_checks == true || this.publicUserProfile.public_social_media_names == true || this.publicUserProfile.public_pictures == true){
                            $("#id_button_publishProfile").prop('disabled', true); 
                        }else{
                            $("#id_button_publishProfile").prop('disabled', false); 
                        }
                    }else{
                        $("#id_button_publishProfile").removeClass("btn-success")
                        $("#id_publishProfile_checkCircle").hide();                    
                    }
                }
            } catch (e) {
                
            }
            $("#id_button_publishProfile").removeClass("loading-animation-green");

        },


        publishButtonPressed(){
            this.publicUserProfile.public = !this.publicUserProfile.public; //change value of public
            this.changePublicValues();
        },
        publishClimadviceChecksButtonPressed(){
            this.publicUserProfile.public_climadvice_checks = !this.publicUserProfile.public_climadvice_checks;
            this.changePublicValues();
        },        
        publishPicturesButtonPressed(){
            this.publicUserProfile.public_pictures = !this.publicUserProfile.public_pictures;
            this.changePublicValues();
        },   
        publishSocialMediaNamesButtonPressed(){
            this.publicUserProfile.public_social_media_names = !this.publicUserProfile.public_social_media_names;
            this.changePublicValues();
        }
    }
}
</script>