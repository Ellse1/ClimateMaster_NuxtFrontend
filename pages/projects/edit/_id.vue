<template>
  <div class="container">
      <div class="container bg-light p-3 rounded">
            <span class="text-center mx-auto" id="id_span_loading"></span>
          

          <h4>Projekt bearbeiten</h4>

            <form @submit.prevent="saveProject" v-if="project.name != null">

                <input type="hidden" v-model="project.id">

                <div class="row">
                    <div class="col-md-6">
                        <label >Projekt Name (Link zu Projekt) ohne Leerzeichen!</label>
                        <input class="form-control" v-model="project.name" required>
                    </div>
                    <div class="col-md-6">
                        <label >Projekt Titel (Wird mit der Größe H4 angezeigt)</label>
                        <input class="form-control" v-model="project.title">
                    </div>
                </div>                
                <div class="mt-2">
                    <label >Kurzbeschreibung</label>
                    <textarea rows="2" class="form-control" v-model="project.short_description" required>
                    </textarea>
                </div>
                <div class="mt-2">
                    <label >Beschreibung (in HTML Format)</label>
                    <textarea rows="20" class="form-control" v-model="project.description" required>
                    </textarea>
                </div>
                <div class="text-center">
                    <button id="id_button_save" type="submit" class=" mx-auto mt-2 btn btn-success">Speichern</button>
                </div>

            </form>
            <div class="text-center">
                <!-- Notification -->
                <notification v-if="error" :message="error" class="text-danger mt-2"/>
                <notification v-if="success" :message="success" class="text-success mt-2" />
            </div>
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
        return{
            error: null,
            success: null,
            project: {
                id: this.$route.params.id,
                name: null,
                title: null,
                short_description: null,
                description: null
            },
        }
    },
    async mounted(){
        $("#id_span_loading").addClass('loading-animation-green');

        try {
            const{data} = await this.$axios.post('project/get_ByID', {
                id: this.project.id
            });

            if(data.state == 'error'){
                this.error = data.message;
                this.success = null;
            }
            else if(data.state == 'success'){
                this.error = null;
                this.project = data.data;
            }
            else{
                this.error = "Das Projekt konnte leider nicht geholt werden.";
            }

        } catch (e) {
            this.error = "Das Projekt konnte leider nicht geholt werden. Versuchen Sie es später noch einmal."
        }


        $("#id_span_loading").removeClass('loading-animation-green');

    },
    methods:{
        async saveProject(){

            $("#id_button_save").addClass("loading-animation");

            try {
                const{data} = await this.$axios.post('project/edit_ByID', {
                    id: this.project.id,
                    name: this.project.name,
                    title: this.project.title,
                    short_description: this.project.short_description,
                    description: this.project.description
                });

                if(data.state == 'error'){
                    this.error = data.message;
                    this.success = null;
                }
                else if(data.state == 'success'){
                    this.success = data.message;
                    this.error = null;
                }
                else{
                    this.error = "Das Projekt konnte leider nicht gespeichert werden.";
                }

            } catch (error) {
                this.error = "Das Projekt konnte leider nicht gespeichert werden. Versuchen Sie es später noch einmal.";
            }


            $("#id_button_save").removeClass("loading-animation");
        }
        
    }
}
</script>

<style>

</style>