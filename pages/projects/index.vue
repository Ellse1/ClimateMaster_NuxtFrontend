<template>
    <div class="container">
        <div class="container bg-light rounded p-3" style="min-height:600px;">

            <div class="text-center">
                <span id="id_span_loading_animation"></span>
            </div>

            <h4>Projekte</h4>

            <div class="mt-3">
                <div class="border rounded p-3" v-for="project in projects" v-bind:key="project.id">
                    <h4>{{project.title}}</h4>
                    <small>letztes Update: {{project.updated_at}}</small>
                    <p class="mt-2">{{project.short_description}}</p>
                    <nuxt-link :to="'/projects/' + project.name" class="">
                        weiterlesen
                    </nuxt-link>
                    <!-- Link to edit (if admin) -->
                    <div v-if="loggedIn">
                        <nuxt-link :to="'/projects/edit/' + project.id" v-if="user.role == 'admin'">bearbeiten</nuxt-link>
                    </div>
                </div>
            </div>



            <div class="text-center">
            <!-- Notification -->
                <notification v-if="error" :message="error" class="text-danger mt-2"/>
                <notification v-if="success" :message="success" class="text-success mt-2" />
            </div>



            <!-- Link to create new Project -->
            <div v-if="loggedIn" class="mt-3">
                <div>
                    <nuxt-link to="/projects/create" v-if="user.role == 'admin'">Projekt erstellen</nuxt-link>
                </div>
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
            projects: null
        }
    },
    async mounted(){
        $("#id_span_loading_animation").addClass('loading-animation-green');

        try {

            //look if the projects are in store
            var projects_from_store = this.$store.state.projects.list;
            //If projects are already in
            if(projects_from_store.length >= 1){
                this.projects = projects_from_store;
            }
            else{
                //get projects from store
                const{data} = await this.$axios.post('project/getAll');
                if(data.state == "error"){
                    this.error = data.message;
                    this.success = null;
                }
                else if(data.state == 'success'){
                    this.error = null;
                    this.projects = data.data;
                    
                    //store projects in state
                    this.$store.commit('projects/set', this.projects)
                }
                else{
                    this.error = "Die Projekte konnten leider geladen werden.";
                }
            }
        } catch (e) {
            this.error = "Die Projekte konnten leider geladen werden. Bitte versuchen Sie es später noch einmal.";
        }

        $("#id_span_loading_animation").removeClass('loading-animation-green');
    }
}
</script>