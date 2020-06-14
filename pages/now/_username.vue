<template>
    <div class="container">
        <div class="container bg-light text-center pb-3">

            <div class="pt-2">
                <!-- icon if no profile_picture -->
                <font-awesome-icon v-if="profile_picture_base64 == null" icon="user-circle" id="id_icon_profile_picture" style="font-size: 200px;"/>
                <div id="id_div_loading" class="rounded mt-2 mb-2 col-md-2 mx-auto"></div>
                <!-- image if profile picture available -->
                <div  id="id_div_profilePicture" style="width:200px;height:200px;border-radius:50%;overflow:hidden;display:none;" class="border bg-dark mx-auto">
                    <img id="id_img_profilePicture" v-on:load="profilePicture_onload">
                </div>

            </div>

            <h4 class="mt-2">{{username}}</h4>

            <!-- If ClimateMaster -->
            <div v-if="climatemaster_state == 'climatemaster'">
                <h1><span class="text-success">Climate</span>Master 2020</h1>
            </div>
            <!-- if ClimateMaster starter -->
            <div v-if="climatemaster_state == 'climatemaster_starter'">
                <h1><span class="text-success">Climate</span>Master Starter 2020</h1>
            </div>

            <!-- information general -->
            <div v-if="public_user_profile != null">
                <div v-if="public_user_profile.information_general != null">
                    <h5>{{public_user_profile.information_general}}</h5>
                  </div>
            </div>


            <!-- co2 calculationChart -->
            <co2calculationChart :username="username" class="mt-5"/>


            <!-- statements -->
            <div class="mt-5">
                <div v-if="public_user_profile != null" class="row">
                    <div v-if="public_user_profile.information_heating_electricity != null" class="col-md-6 mt-4">
                        <font-awesome-icon icon="plug" class="" style="font-size:20px;"/>
                        <h5>Heizung und Strom</h5>
                        {{public_user_profile.information_heating_electricity}}
                    </div>
                    <div v-if="public_user_profile.information_mobility != null" class="col-md-6 mt-4">
                        <font-awesome-icon icon="car" class="" style="font-size:20px;"/>
                        <h5>Mobilität</h5>
                        {{public_user_profile.information_mobility}}
                    </div>
                    <div v-if="public_user_profile.information_consumption != null" class="col-md-6 mt-4">
                        <font-awesome-icon icon="cart-arrow-down" class="" style="font-size:20px;"/>
                        <h5>Konsum</h5>
                        {{public_user_profile.information_consumption}}
                    </div>
                    <div v-if="public_user_profile.information_nutrition != null" class="col-md-6 mt-4">
                        <font-awesome-icon icon="hamburger" class="" style="font-size:20px;"/>
                        <h5>Ernährung</h5>
                        {{public_user_profile.information_nutrition}}
                    </div>
                    <div v-if="public_user_profile.information_public_emissions != null" class="col-md-6 mt-4">
                        <font-awesome-icon icon="users" class="" style="font-size:20px;"/>
                        <h5>Öffentliche Emissionen</h5>
                        {{public_user_profile.information_public_emissions}}
                    </div>
                    <div v-if="public_user_profile.information_compensation != null" class="col-md-6 mt-4">
                        <font-awesome-icon icon="sort-amount-down" class="" style="font-size:20px;"/>
                        <h5>CO2 Kompensation</h5>
                        {{public_user_profile.information_compensation}}
                    </div>
                </div>
            </div>


            <div class="row">

                <!-- ClimadviceUserChecks -->
                <div v-for="climadvice in climadvices_with_climadviceUserChecks" v-bind:key="climadvice.id" class="col-md-4 mx-auto">
                    <div class="card mb-3">
                        <div class="card-body text-center">

                            <h5>{{climadvice.title}}</h5>
                            <p class="card-text">
                                {{climadvice.shortDescription}}
                            </p>
                            <div class="text-center">
                                <font-awesome-icon :icon=climadvice.iconName class="text-success" style="font-size: 100px"/>
                            </div>

                            <div v-for="climadvice_check in climadvice.climadvice_checks" v-bind:key="climadvice_check.id">
                                <div v-for="(climadvice_user_check, index) in climadvice_check.climadvice_user_checks" v-bind:key="climadvice_user_check.id">
                                    <!-- only show the last climadviceUserCheck -->
                                    <div v-if="index == (climadvice_check.climadvice_user_checks.length - 1)" class="m-2 p-2 bg-success rounded border text-white">
                                        {{climadvice_user_check.action_text}}
                                        <font-awesome-icon icon="check-circle" style="font-size:20px;"/>
                                    </div>
                                </div>
                            </div>



                            <!-- <div v-for="(climadviceUserCheck, index) in climadvice.climadvice_user_checks" v-bind:key="climadviceUserCheck.id" > -->
                                
                                <!--show only if there is no climadviceUserCheck for the same climadviceCheck after this one-->
                            <!-- {{climadvice.climadvice_user_checks.find(userCheck => userCheck.climadivce_check_id == 2) == undefined}} -->
                                <!-- <div v-if="climadvice.climadvice_user_checks.find(userCheck => userCheck.climadivce_check_id === climadviceUserCheck.climadvice_check_id) == undefined" class=" text-white">
                                    {{climadviceUserCheck.action_text}}
                                </div> -->
                            <!-- </div> -->

                        </div>
                    </div>



                </div>
            </div>



            <!-- Notification -->
            <notification v-if="error" :message="error" class="text-danger mt-2" />
            <notification v-if="success" :message="success" class="text-success mt-2" />


        </div>
    </div>
</template>
<script>
import notification from '~/components/MainComponents/Notification';
import co2calculationChart from '~/components/MyClimateMasterActions/Resources/myCO2CalculationChart';
export default {
    scrollToTop: true,
    components:{
        notification,
        co2calculationChart
    },
    data(){
        return{
            error: null,
            success: null,
            public_user_profile: null,
            climatemaster_state: null,
            profile_picture_base64: null,
            username: this.$route.params.username,
            climadvices_with_climadviceUserChecks : null
        };
    },
    async mounted(){
        $("#id_div_loading").addClass("loading-animation-green");

        try {

            //Check if in vuex store is this user already (If i loaded the index page first ->
            //  the users with public Profile, with 1 calculation and Profile pictures are loaded already!

            var publicUserProfiles_from_store =  this.$store.state.publicUserProfilesForList.list;
            var correctPublicUserProfile_was_in_store = false;
            //if there are profiles in store
            if(publicUserProfiles_from_store.length > 0){
                var profilesWithCorrectUsername = [];
                //check every publicUserProfile from Store if it has this username
                publicUserProfiles_from_store.forEach(profile => {
                    if(profile.username == this.username){
                        profilesWithCorrectUsername.push(profile);
                    }
                });
                //if the one was inside
                if(profilesWithCorrectUsername.length > 0){
                    var correctPublicUserProfile = profilesWithCorrectUsername[0];
                    //-> don't get data again from backend
                    correctPublicUserProfile_was_in_store = true;
                    //get the datas from vuex store
                    this.public_user_profile = correctPublicUserProfile.public_user_profile; //get the data from vuex store
                    this.profile_picture_base64 = correctPublicUserProfile.profile_picture_base64;
                    this.climatemaster_state = correctPublicUserProfile.climatemaster_state;
                }
            }

            if(correctPublicUserProfile_was_in_store == false){
                const{data} = await this.$axios.post("user/getDataToShowPublicUserProfile_ByUsername", {
                    username: this.username
                })

                if(data.state == "error"){
                    this.error = data.message;
                    this.success = null;
                }
                else if(data.state == "success"){
                    // this.success = data.message;
                    this.public_user_profile = data.public_user_profile;
                    this.profile_picture_base64 = data.profile_picture_base64;
                    this.climatemaster_state = data.climatemaster_state;
                }
            }

        } catch (e) {
            alert("Das öffentliche Profil konnte nicht, oder nicht vollständig geladen werden.")
        }

        if(this.profile_picture_base64 != null){
                //Give picture to element
                $("#id_img_profilePicture").attr('src', 'data:image/jfif;base64,'+this.profile_picture_base64);

                //Show right element
                $("#id_div_profilePicture").show();
                $("#id_img_profilePicture").show();
                $("#id_icon_profilePicture").hide();
        }



        // Get the climadviceUserChecks of this user
        try {
            const{data} = await this.$axios.post("climadvice/getClimadvices_with_ClimadviceUserChecks_ForPublicProfile_ByUsername", {
                username: this.username
            });

            if(data.state == "error"){}
            else if(data.state == "success"){
                this.climadvices_with_climadviceUserChecks = data.data;
            }
            else{}
        } catch (error) {

        }






        $("#id_div_loading").removeClass("loading-animation-green");


        //add PageLog
        try {
            const{data} = await this.$axios.post('pageLog/addPageLog', {
                page: this.$route.fullPath,
                parameter: this.username
            });
        } catch (e) {}
    },

    methods:{

        profilePicture_onload(){
            // Set the picture exactly to the middle
            $("#id_img_profilePicture").height('auto');
            $("#id_img_profilePicture").width('auto');
            $("#id_img_profilePicture").css('margin-left', 0);
            $("#id_img_profilePicture").css('margin-top', 0);

            var img = document.querySelector("#id_img_profilePicture");
            var image_width = img.clientWidth;
            var image_height =  img.clientHeight;

            //width > height
            //center image -> height:100%;
            if(image_width > image_height){
                var cropDownFactor = 200/image_height;
                $("#id_img_profilePicture").height('100%');
                // $("#id_img_profilePicture").width(image_width);

                var tooMuch = image_width-image_height;
                var marginLeft = ((tooMuch / 2)*(-1))*cropDownFactor;
                $("#id_img_profilePicture").css('margin-left', marginLeft);
            }
            //height > width
            //center image -> widht: 100%
            else if(image_height > image_width){
                var cropDownFactor = 200/image_width;
                $("#id_img_profilePicture").width('100%');
                // $("#id_img_profilePicture").css('height', 'auto');
                var tooMuch = image_height-image_width;
                var marginTop = ((tooMuch / 2)*(-1))*cropDownFactor;
                $("#id_img_profilePicture").css('margin-top', marginTop);
            }
            //height and width equals
            else{
                $("#id_img_profilePicture").width('100%');
            }

            //Scroll to top of the page
            window.scrollTo(0, 0);
        }
    }
}
</script>