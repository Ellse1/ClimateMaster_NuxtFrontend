<template>
    <div class="container">
        <div class="container bg-light rounded p-3">
            <h4 class="">Projekt erstellen</h4>

            <form @submit.prevent="saveProject">
                <div class="row">
                    <div class="col-md-6">
                        <label >Projekt Name (Link zu Projekt) ohne Leerzeichen!</label>
                        <input class="form-control" v-model="name" required>
                    </div>
                    <div class="col-md-6">
                        <label >Projekt Titel (Wird mit der Größe H4 angezeigt)</label>
                        <input class="form-control" v-model="title">
                    </div>
                </div>                
                <div class="mt-2">
                    <label >Kurzbeschreibung</label>
                    <textarea rows="2" class="form-control" v-model="short_description" required>
                    </textarea>
                </div>
                <div class="mt-2">
                    <label >Beschreibung (in HTML Format)</label>
                    <textarea rows="20" class="form-control" v-model="description" required>
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
    auth: 'middleware',
    components:{
        notification
    },
    data(){
        return{
            error: null,
            success: null,
            name: null,
            title: null,
            short_description: null,
            description: null,
        }
    },
    methods:{
        async saveProject(){
            $("#id_button_save").addClass("loading-animation");

            try {
                const{data} = await this.$axios.post('project/store', {
                    name: this.name,
                    title: this.title,
                    short_description: this.short_description,
                    description: this.description
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