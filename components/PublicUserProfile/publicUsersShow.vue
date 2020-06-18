<template>
    <div>
        <div class="container mt-5">

            <h2 class="font-weight-light" v-if="climatemaster_profiles.length >= 1">Klimaschutz Vorreiter</h2>

            <div class="row mx-auto my-auto">
                <!-- maby Problem here -->
                <div id="id_div_carousel_climatemaster_profiles" class="row mt-2 w-100">
                        
                        <div v-for="profile in climatemaster_profiles" v-bind:key="profile.id" class="climatemaster_profile_slideshow col">
                            <div class="">
                                <nuxt-link :to="'/now/'+ profile.username">
                                    <div class="">
                                        <div  :id="'id_div_profilePicture_' + profile.id" style="width:200px;height:200px;border-radius:50%;overflow:hidden;" class="border bg-dark mx-auto mt-2">
                                            <img :id="'id_profile_picture_' + profile.id" :src="'data:image/jfif;base64,' + profile.profile_picture_base64" v-on:load="setPictureToMiddle($event)">
                                        </div>
                                        <div class="text-center">
                                            <h5 class="text-dark mx-auto">{{profile.username}}</h5>
                                            <h5 v-if="profile.climatemaster_state == 'climatemaster'" class="text-dark"><span class="text-success">Climate</span>Master</h5>
                                        </div> 
                                    </div>
                                </nuxt-link>
                            </div>
                        </div>


                </div>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            error: null,
            success: null,
            climatemaster_profiles: []
        }
    },
    async mounted(){
        
        try {

            //Check if in store are already the public user profiles
            var public_user_profiles_from_store = this.$store.state.publicUserProfilesForList.list;

            // If climadvices are already in
            if(public_user_profiles_from_store.length >= 1){
                this.climatemaster_profiles = public_user_profiles_from_store;
            }
            // if there are no profiles in store 
            else{
                
                var data = null;

                // -> get the compromised pictrues them from backend
                data = await this.$axios.$post("publicUserProfile/getAllWithCalculationAndProfilePicture", {
                    compress: true
                });

                if(data.state == 'error'){
                    this.error = data.message;
                    this.success = null;
                }
                else if(data.state == 'success'){
                    this.success = data.message;
                    this.error = null;
                    this.climatemaster_profiles = data.data;
                }
                else{
                    this.error = "Es konnten keine öffentliche Profile geholt werden.";
                }


                // -> get the pictrues with good quality them from backend
                data = await this.$axios.$post("publicUserProfile/getAllWithCalculationAndProfilePicture", {
                    compress: false
                });

                if(data.state == 'error'){
                    this.error = data.message;
                    this.success = null;
                }
                else if(data.state == 'success'){
                    this.success = data.message;
                    this.error = null;
                    this.climatemaster_profiles = data.data;

                    //Load this into the vuex store
                    this.$store.commit('publicUserProfilesForList/set', this.climatemaster_profiles)

                }
                else{
                    this.error = "Es konnten keine öffentliche Profile geholt werden.";
                }

            }

        } catch (e) {
            this.error = e.response.data.message;
        }

        
    }, 
    methods:{
        setPictureToMiddle(event){
            var profilePicture_id = event.target.id;

            // Set the picture exactly to the middle
            $("#" + profilePicture_id).height('auto');
            $("#" + profilePicture_id).width('auto');
            $("#" + profilePicture_id).css('margin-left', 0);
            $("#" + profilePicture_id).css('margin-top', 0);

            var img = document.querySelector("#" + profilePicture_id);
            var image_width = img.clientWidth;
            var image_height =  img.clientHeight;

            //width > height
            //center image -> height:100%;
            if(image_width > image_height){
                var cropDownFactor = 200/image_height;
                $("#" + profilePicture_id).height('100%');
                // $("#id_img_profilePicture").width(image_width);

                var tooMuch = image_width-image_height;
                var marginLeft = ((tooMuch / 2)*(-1))*cropDownFactor;
                $("#" + profilePicture_id).css('margin-left', marginLeft);
            }
            //height > width
            //center image -> widht: 100%
            else if(image_height > image_width){
                var cropDownFactor = 200/image_width;
                $("#" + profilePicture_id).width('100%');
                // $("#id_img_profilePicture").css('height', 'auto');
                var tooMuch = image_height-image_width;
                var marginTop = ((tooMuch / 2)*(-1))*cropDownFactor;
                $("#" + profilePicture_id).css('margin-top', marginTop);
            }
            //height and width equals
            else{
                $("#" + profilePicture_id).width('100%');
            }

        }
    }
}
</script>

