<template>
        <div class="col-md-4">
            <div class="card mb-3">
                <div class="card-body text-center">
                    
                    <div class="bg-light" id="id_plus_addClimadvice" v-on:click="showFormAdd">
                        <h1 class="display-1">+</h1>
                    </div>
                    
                    <form @submit.prevent="addClimadvice" style="display:none" id="id_form_add">
                        
                        <input type="text" class="form-control"  name="name" v-model="name" placeholder="Name"/>

                        <input type="text" class="form-control mt-2"  name="title" v-model="title" placeholder="Titel"/>

                        <textarea type="text" class="form-control mt-2" name="shortDescription" v-model="shortDescription" placeholder="Kurzbeschreibung" rows="3"/>
                        
                        <input type="file" class="mt-2" ref="icon" id="climadviceIcon" name="climadviceIcon" v-on:change="handleIconUpload" data-buttonText="Bild auswählen"/>

                        <div class="row mt-2">
                            <button type="submit" class="btn btn-primary col m-2">speichern</button><br>
                            <button type="button" v-on:click="hideFormAdd" class="btn btn-default border col m-2">abbrechen</button>

                        </div>
                        
                    </form>                   
                    
                    
                    <!-- <h5>Title</h5>
                    <p class="card-text">
                        shortDescription
                    </p>          
                    <div class="text-center">
                        Image
                        <img :src="'http://localhost:8000/images/climadviceIcons/' + climadvice.iconName" class="mx-center" alt="not found"  width="100px"/>                        
                    </div> -->
                </div>
            </div>

            <notification :message="error" v-if="error" class="mt-4 text-danger"/>
            <notification :message="success" v-if="success" class="mt-4 text-success"/>


        </div>
</template>

<script>
import notification from '~/components/Notification';
export default {
    components:{
        notification
    },
    data(){
        return {
            name: '',
            title: '',
            shortDescription: '',
            error: null,
            success: null
        };
    },
    methods: {
        showFormAdd(){
            $('#id_form_add').css("display", "block");
            $('#id_plus_addClimadvice').css("display", "none");
            return;
        },
        hideFormAdd(){
            $('#id_form_add').css("display", "none");
            $('#id_plus_addClimadvice').css("display", "block");
            return;
        },

        handleIconUpload(){
            this.climadviceIcon = this.$refs.icon.files[0];
        },
        async addClimadvice(){

            let formData = new FormData();
            formData.append('climadviceIcon', this.climadviceIcon);
            formData.append('name', this.name);
            formData.append('title', this.title);
            formData.append('shortDescription', this.shortDescription);

            try{
                const{data} = await this.$axios.post( 'climadvice/store',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if(data.state == 'error'){
                    this.error = data.message
                    this.success = null
                }
                if(data.state == 'success'){
                    this.success = data.message
                    this.error = null
                    //hide form add
                    // hideFormAdd();
                    $('#id_form_add').css("display", "none");
                    $('#id_plus_addClimadvice').css("display", "block");
                    //show the new Climadvice:
                    this.$emit('climadviceAdded', data.data)
                }
            }catch(e){
                alert(e.response.data.message);
                this.error = e.response.data.message;
            }
        }
    }
}
</script>