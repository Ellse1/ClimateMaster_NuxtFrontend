#<template>
    <div class="container">
        <div class="container bg-light text-center pb-3">
            
            <div class="pt-2">
                <!-- icon if no profile_picture -->
                <font-awesome-icon v-if="profile_picture_base64 == null" icon="user-circle" id="id_icon_profile_picture" style="font-size: 200px;"/> 
                <div id="id_div_loading" class="bg-success rounded mt-2 mb-2" style="width:50%;margin:auto;"></div>
                <!-- image if profile picture available -->
                <div  id="id_div_profilePicture" style="width:200px;height:200px;border-radius:50%;overflow:hidden;display:none;" class="border bg-dark mx-auto">
                    <img id="id_img_profilePicture" style="height:100%;">
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
            <div class="mt-4">
                <div v-if="public_user_profile != null">
                    <div v-if="public_user_profile.information_heating_electricity != null">
                        <b>Heizung und Strom</b><br>
                        {{public_user_profile.information_heating_electricity}}
                    </div>
                    <div v-if="public_user_profile.information_mobility != null">
                        <b>Mobilität</b><br>
                        {{public_user_profile.information_mobility}}
                    </div>
                    <div v-if="public_user_profile.information_consumption != null">
                        <b>Konsum</b><br>
                        {{public_user_profile.information_consumption}}
                    </div>
                    <div v-if="public_user_profile.information_nutrition != null">
                        <b>Ernährung</b><br>
                        {{public_user_profile.information_nutrition}}
                    </div>
                    <div v-if="public_user_profile.information_public_emissions != null">
                        <b>Öffentliche Emissionen</b><br>
                        {{public_user_profile.information_public_emissions}}
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
            username: this.$route.params.username
        };
    },
    async mounted(){

        try {
            const{data} = await this.$axios.post("user/getDataToShowPublicUserProfile", {
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
    }
}
</script>