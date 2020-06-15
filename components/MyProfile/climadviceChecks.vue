<template>
    <div class="pb-3">

        <span id="id_span_loading"></span>

        <div v-if="climadvices_with_climadviceUserChecks != null" class="text-center">
            <div v-if="climadvices_with_climadviceUserChecks.length <= 0">
                Du hast noch keine ClimadviceChecks abgeschlossen. Hol dir welche unter <br>
                <nuxt-link  to="/climadvices" class="btn btn-success">Climadvices</nuxt-link>
            </div>
        </div>


        <div class="row">
            <!-- ClimadviceUserChecks -->
            <div v-for="(climadvice, index_climadvice) in climadvices_with_climadviceUserChecks" v-bind:key="climadvice.id" class="col-md-4 mx-auto">
                <div class="card mb-3">
                    <div class="card-body text-center">

                        <h5>{{climadvice.title}}</h5>

                        <div class="text-center">
                            <font-awesome-icon :icon=climadvice.iconName class="text-success" style="font-size: 100px"/>
                        </div>

                        <div v-for="(climadvice_check, index_climadvice_check) in climadvice.climadvice_checks" v-bind:key="climadvice_check.id">
                            <div v-for="(climadvice_user_check, index_climadvice_user_check) in climadvice_check.climadvice_user_checks" v-bind:key="climadvice_user_check.id">
                                <!-- only show the last climadviceUserCheck of this climadviceCheck -->
                                <div v-if="index_climadvice_user_check == (climadvice_check.climadvice_user_checks.length - 1)" class="m-2 p-2 bg-success rounded border text-white">
                                    {{climadvice_user_check.action_text}}
                                    <font-awesome-icon icon="check-circle" style="font-size:20px;"/><br>
                                    <button class="btn btn-sm btn-danger" :id="'id_button_delete_' + climadvice_user_check.id" 
                                    v-on:click="deleteClimadviceUserChecks(index_climadvice, index_climadvice_check, index_climadvice_user_check, climadvice_check.id, climadvice_user_check.id)">
                                        löschen
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <!-- Get more ClimadviceUserChecks -->
        <div v-if="climadvices_with_climadviceUserChecks != null" class="text-center">
            <div v-if="climadvices_with_climadviceUserChecks.length >= 1">
                Schließe weitere ClimadviceChecks ab<br>
                <nuxt-link  to="/climadvices" class="btn btn-success">Climadvices</nuxt-link>
            </div>
        </div>
                    
        <div class="text-center">
            <!-- Notification -->
            <notification v-if="error" :message="error" class="text-danger mt-2" />
            <notification v-if="success" :message="success" class="text-success mt-2" />
        </div>            
       
    </div>
</template>
<script>
import notification from '~/components/MainComponents/Notification';
export default {
    components:{
        notification
    },
    data(){
        return {
            success: null,
            error: null,
            climadvices_with_climadviceUserChecks: null
        }
    },
    async mounted(){
        // Get the climadviceUserChecks of this user
        $("#id_span_loading").addClass('loading-animation-green');

        try {
            const{data} = await this.$axios.post("climadvice/getClimadvices_with_ClimadviceUserChecks_ByCurrentUser", {
                username: this.user.username
            });

            if(data.state == "error"){}
            else if(data.state == "success"){
                this.climadvices_with_climadviceUserChecks = data.data;
            }
            else{}
        } catch (error) {

        }
        $("#id_span_loading").removeClass('loading-animation-green');

    },
    methods:{
        async deleteClimadviceUserChecks(index_climadvice, index_climadvice_check, index_climadvice_user_check, climadvice_check_id, climadvice_user_check_id){
            $("#id_button_delete_" + climadvice_user_check_id).addClass('loading-animation');

            try {
                const{data} = await this.$axios.post('climadviceUserCheck/deactivateAllOfClimadviceCheck_ByCurrentUser', {
                    id: climadvice_check_id
                });

                if(data.state == 'error'){
                    this.error = data.message;
                    this.success = null;
                }
                else if(data.state == 'success'){
                    this.success = data.message;
                    this.error = null;
                    
                    // delete the climadviceUserCheck from view
                    // this.climadvices_with_climadviceUserChecks.slice(indexOf(this.climadvices_with_climadviceUserChecks.find(climadvice => climadvice.id == climadvice_id)), 1);
                    this.climadvices_with_climadviceUserChecks[index_climadvice].climadvice_checks.splice(
                        this.climadvices_with_climadviceUserChecks[index_climadvice]
                        .climadvice_checks.indexOf(this.climadvices_with_climadviceUserChecks[index_climadvice].climadvice_checks[index_climadvice_check]),
                        1);
                    
                    
                    // if there is no climadviceUserCheck anymore -> delete this climadvice
                    if(this.climadvices_with_climadviceUserChecks[index_climadvice].climadvice_checks.length == 0){
                        this.climadvices_with_climadviceUserChecks.splice(
                            this.climadvices_with_climadviceUserChecks.indexOf(this.climadvices_with_climadviceUserChecks[index_climadvice]),
                            1
                        );
                    }


                }
                else{
                    this.error = "Der ClimadviceUserCheck konnte leider nicht gelöscht werden.";
                }
            } catch (error) {
                this.error = "Der ClimadviceUserCheck konnte leider nicht gelöscht werden. Versuchen Sie es später noch einmal.";
            }
                        
                        
            $("#id_button_delete_" + climadvice_user_check_id).removeClass('loading-animation');

        }
    }
}
</script>
