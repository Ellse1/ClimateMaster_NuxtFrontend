<template>
    <div class="container">
        <div class="container p-3 rounded bg-light" style="min-height:600px;">
            <span class="text-center mx-auto" id="id_span_loading"></span>

            <h4 v-if="project.title != null">
                {{project.title}}
            </h4>

            <div v-html="project.description">

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
            project_name: this.$route.params.name,           
            project: {
                id: null,
                name: null,
                title: null,
                short_description: null,
                description: null
            }
        }
    },
    async mounted(){

        $("#id_span_loading").addClass('loading-animation-green');

        try {
            //look if the projects are in store
            var projects_from_store = this.$store.state.projects.list;

            //If projects are already in
            if(projects_from_store.length >= 1){
                this.project = projects_from_store.find(p => p.name == this.project_name);
            }

            //If not in -> get from backend
            if(this.project.id == null){
                const{data} = await this.$axios.post('project/get_ByName', {
                    name: this.project_name
                });

                if(data.state == 'error'){
                    this.error = data.message;
                    this.success = null;
                }
                else if(data.state == 'success'){
                    this.project = data.data;
                }
                else{
                    this.error = "Das Projekt konnte nicht geladen werden. "
                }
            }
        } catch (error) {
            this.error = "Das Projekt konnte nicht geladen werden. Versuchen Sie es später noch einmal."
        }

        $("#id_span_loading").removeClass('loading-animation-green');

    }
}
</script>