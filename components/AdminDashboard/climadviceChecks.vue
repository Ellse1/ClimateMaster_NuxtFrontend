<template>
    <div>
        <!-- Area to add ClimadviceChecks -->
        <h4>ClimadviceCheck hinzufügen</h4>
        <form @submit.prevent="saveClimadviceCheck">
            <div class="row">
                <div class="col-md-6">
                    <!-- select the climadvice -->
                    <label for="id_select_climadvice">Climadvice</label><br>
                    <select name="climadvice_id" class="form-control" id="id_select_climadvice">
                        <option v-for="climadvice in climadvices" v-bind:key="climadvice.id" :value="climadvice.id">
                            {{climadvice.name + "  (id " + climadvice.id + ")"}}
                        </option>
                    </select>
                </div>
                <!-- action text -->
                <div class="col-md-6">
                    <label for="">Aktion Text</label><br>
                    <input v-model="newClimadviceCheckToSave.action" class="form-control" placeholder="Wir kaufen Ökostrom" required />
                </div>
            </div>

            <div class="row">
                <!-- question text -->
                <div class="col-md-6">
                    <label for="" >Frage</label>
                    <input v-model="newClimadviceCheckToSave.question" class="form-control" placeholder="Wo kauft Ihr Ökostrom?" required />
                </div>
                <!-- question answer proposal text -->
                <div class="col-md-6">
                    <label for="" >Antwort Vorschlag</label>
                    <input v-model="newClimadviceCheckToSave.answer_proposal" class="form-control" placeholder="Greenpeace Energy" required />
                </div>
            </div>


                <div class="col-md-6 mx-auto">
                    <!-- button send text -->
                    <label for="" >Text auf Button zum Abschicken</label>
                    <input v-model="newClimadviceCheckToSave.button_send_text" class="form-control" placeholder="Wir kaufen Ökostrom bei" required />
                </div>

            <button type="submit" id="id_button_save_climadviceCheck" class="btn btn-success mt-2">Speichern</button>

        </form>


        <!-- Area to edit / delete climadviceChecks -->
        <div v-if="climadviceChecks != null && climadviceChecks.length > 0" class="mt-3">
            <h4>ClimadviceChecks bearbeiten</h4>
            <div class="row">
                <div class="col">
                    <b>ClimadviceID</b>
                </div>
                <div class="col">
                    <b>Aktion</b>
                </div>
                <div class="col">
                    <b>Frage</b>
                </div>
                <div class="col">
                    <b>Button Send Text</b>
                </div>
                <div class="col">
                    <b>Bearbeiten</b>
                </div>
            </div>
            <div v-for="climadviceCheck in climadviceChecks" v-bind:key="climadviceCheck.id">
                <div class="row mt-1">
                    <div class="col">
                        {{climadviceCheck.climadvice_id}}
                    </div>
                    <div class="col">
                        {{climadviceCheck.action}}
                    </div>
                    <div class="col">
                        {{climadviceCheck.question}}
                    </div>
                    <div class="col">
                        {{climadviceCheck.button_send_text}}
                    </div>
                    <div class="col">
                        <button class="btn btn-danger" :id="'id_button_delete_' + climadviceCheck.id" v-on:click="deleteClimadviceCheck(climadviceCheck.id)">Löschen</button>
                    </div>
                </div>
            </div>

        </div>





        <!-- To show error / success messages -->
        <notification :message="error" v-if="error" class="text-danger mt-2" />
        <notification :message="success" v-if="success" class="text-success mt-2" />

    </div>
</template>
<script>
import notification from "~/components/MainComponents/Notification";
export default {
    components:{
        notification
    },
    data(){
        return {
            error: null,
            success: null,
            climadvices: null,
            climadviceChecks: null,
            newClimadviceCheckToSave: {
                climadvice_id: null,
                action: null,
                question: null,
                answer_proposal: null,
                button_send_text: null
            }
        }
    },
    async mounted(){
        // Get all Climadvices for the selectList
        try {
            const{data} = await this.$axios.get("climadvice/getAllClimadvices");
            if(data.state == "error"){
                this.error = data.message;
                this.success = null;
            }
            else if(data.state == "success"){
                this.error = null;
                this.climadvices = data.data;
            }
            else{
                this.error = "Die Climadvices konnten leider nicht geholt werden."
            }
        } catch (error) {
            this.error = "Leider konnten die Climadvices nicht geholt werden."
        }


        //get all the climadviceChecks for editing / deleting
        try {
            const{data} = await this.$axios.post("climadviceCheck/getAllClimadviceChecks");
            if(data.state == "error"){
                this.error = data.message;
                this.success = null;
            }
            else if(data.state == "success"){
                this.error = null;
                this.climadviceChecks = data.data;
            }
            else{
                this.error = "Die ClimadviceChecks konnten leider nicht geholt werden."
            }
        } catch (error) {
            this.error = "Leider konnten die ClimadviceChecks nicht geholt werden."
        }



    },
    methods:{
        async saveClimadviceCheck(){
            $("#id_button_save_climadviceCheck").addClass("loading-animation")

            try {
                const{data} = await this.$axios.post("admin/saveClimadviceCheck", {
                    climadvice_id : $("#id_select_climadvice").val(),
                    action: this.newClimadviceCheckToSave.action,
                    question: this.newClimadviceCheckToSave.question,
                    answer_proposal: this.newClimadviceCheckToSave.answer_proposal,
                    button_send_text: this.newClimadviceCheckToSave.button_send_text
                });

                if(data.state == "error"){
                    this.error = data.message;
                    this.success = null;
                }
                else if(data.state == "success"){
                    this.success = data.message;
                    this.error = null;
                    this.climadviceChecks.push(data.data);
                }
                else{
                    this.error = "Der ClimadviceCheck konnte leider nicht gespeichert werden";
                }

            } catch (error) {
                this.error = "Der ClimadviceCheck kann aktuell leider nicht gespeichert werden";
            }

            $("#id_button_save_climadviceCheck").removeClass("loading-animation")
        },
        async deleteClimadviceCheck(climadviceCheckID){

            $("#id_button_delete_" + climadviceCheckID).addClass('loading-animation');

            try {
                const{data} = await this.$axios.post("admin/deleteClimadviceCheck_ByClimadviceCheckID", {
                    climadviceCheckID: climadviceCheckID
                });

                if(data.state == "error"){
                    this.error = data.message;
                    this.success = null;
                }
                else if(data.state == "success"){
                    this.success = data.message;
                    this.error = null;

                    var climadvcieCheckToDelete = this.climadviceChecks.find(x => x.id == climadviceCheckID);
                    this.climadviceChecks.splice(this.climadviceChecks.indexOf(climadvcieCheckToDelete), 1);
                }
                else{
                    this.error = "Der ClimadviceCheck konnte leider nicht gelöscht werden."
                }

            } catch (error) {
                this.error = "Der ClimadviceCheck konnte leider nicht gelöscht werden. Versuchen Sie es später noch einmal." 
            }


            $("#id_button_delete_" + climadviceCheckID).removeClass('loading-animation');

        }
    }
}
</script>