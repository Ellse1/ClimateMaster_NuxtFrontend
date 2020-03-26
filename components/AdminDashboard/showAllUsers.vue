<template>
    <div>
        <!-- Show all Users -->
        <h4>Angemeldete Benutzer</h4>
        <div id="id_div_loading_animation"></div>
        <div v-for="(user, index) in allUsers" v-bind:key="user.id" class="mt-1">
            <div class="row col-md-8 mx-auto">
                <div class="col-md-1">
                    {{index}}
                </div>
                <div class="col-md-10">
                    {{user.email}}
                </div>
                <div class="col-md-1">
                    <button class="btn btn-success" v-on:click="openWindowToMakeUserClimatemaster(index)">ClimateMaster</button>
                </div>
            </div>
        </div>

        <notification :message="error" v-if="error" class="text-danger mt-2" />
        <notification :message="success" v-if="success" class="text-success mt-2" />

        <!-- Div to show user info and to activate climatemaster -->
        <div v-if="userToMakeClimatemaster" id="id_div_activateUserClimatemaster" class="fixed-top h-100 w-100" style="background-color:rgba(247, 247, 247, 0.3);">
            <div class="container">
                <div class="col-md-8 bg-light mx-auto mt-5 border border-success rounded text-center p-4">
                    <h4>Den User {{userToMakeClimatemaster.firstname}} als ClimateMaster festlegen</h4>
                    <p>
                        Bist du sicher, dass <b>{{userToMakeClimatemaster.firstname}} {{userToMakeClimatemaster.lastname}}</b> mit der Email 
                        <b>{{userToMakeClimatemaster.email}}</b> und dem Benutzernamen <b>{{userToMakeClimatemaster.username}}</b> bezahlt hat und ClimateMaster für das aktuelle Jahr werden darf?<br>
                        Es wir ihm automatisch eine Mail zur Gratulation geschickt.<br>
                        Ausstoß CO2 Equivalent pro Jahr:<br>
                    </p>
                    <h5>{{latestCo2calculationOfUser.total_emissions}}</h5>
                    <p>Preis um Climatemaster zu werden</p>
                    <h5>{{priceForUserToBecomeClimatemaster}} €</h5>

                    <button id="id_button_make_user_climatemaster" class="btn btn-success" v-on:click="makeUserClimatemaster">Ja, die Person hat bezahlt</button>
                    <button class="btn btn-danger" v-on:click="closeWindowToMakeUserClimatemaster">Schließen</button>
                
                    <!-- Notification -->
                    <notification :message="error" v-if="error" class="text-danger mt-2" />
                    <notification :message="success" v-if="success" class="text-success mt-2" />
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import notification from "~/components/MainComponents/Notification";
export default {
    components:{
        notification
    },
    data(){
        return{
            error:null,
            success: null,
            allUsers: null,
            userToMakeClimatemaster:null,
            latestCo2calculationOfUser:null,
            priceForUserToBecomeClimatemaster:null
        }
    },
    async mounted(){
        try {
            const{data} = await this.$axios.post('admin/getAllUsers');

            if(data.state == 'error'){
                this.error = data.message;
                this.success = null;
            }
            else if(data.state == "success"){
                this.error = null;
                this.allUsers = data.data;
            }
            else{
                this.error = "Die User konnten leider nicht geholt werden."
            }

        } catch (e) {
            this.error = "Die User konnten leider nicht geholt werden. " + e.response.data.message;
        }
    },
    methods:{
        async openWindowToMakeUserClimatemaster(index){
            $("#id_div_loading_animation").addClass('loading-animation-green');
            //Get latest calculation of this user
            const{data} = await this.$axios.post('admin/getLastCO2CalculationOfUser_ByUserID',{
                user_id: this.allUsers[index].id
            });

            if(data.state == 'error'){
                this.error = data.message;
                this.success = null;
            }
            else if(data.state == 'success'){
                this.error = null;
                this.latestCo2calculationOfUser = data.data;
                this.priceForUserToBecomeClimatemaster = (data.data.total_emissions * 23).toFixed(2);
                this.userToMakeClimatemaster = this.allUsers[index];
            }
            else{
                this.error = "Es tut uns leid, die letzte Berechnung konnte leider nicht geladen werden."
            }

            $("#id_div_loading_animation").removeClass('loading-animation-green');
        },
        async makeUserClimatemaster(){
            $("#id_button_make_user_climatemaster").addClass('loading-animation');
            try {
                const{data} = await this.$axios.post('admin/setUserClimatemaster_ByUserID', {
                    user_id: this.userToMakeClimatemaster.id
                });

                if(data.state == "error"){
                    this.error = data.message;
                    this.success = null;
                }
                else if (data.state == "success"){
                    this.error = null;
                    this.success = data.message;
                }
                else{
                    this.error = "Der User konnte nicht zum ClimateMaster gemacht werden.";
                }

            } catch (e) {
                this.error = "Der User konnte nicht zum Climatemaster gemacht werden." + e.response.data.message;
            }
            
            $("#id_button_make_user_climatemaster").removeClass('loading-animation');
        },
        closeWindowToMakeUserClimatemaster(){
            this.userToMakeClimatemaster = null;
        }
    }
}
</script>