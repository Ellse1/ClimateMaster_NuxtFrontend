<template>
    <div>
        <div id="id_climadviceEdit_background">
            <div class="card bg-light" style="margin-top:100px;">
                <div class="card-body text-center">
                    
                    <h4>Climadvice bearbeiten</h4>

                    <form @submit.prevent="editClimadvice" id="id_form_edit">
                        
                        <input type="hidden" id="id_input_id" name="id" :value="climadviceForEdit.id" />

                        <input type="text" id="id_input_name" class="form-control" disabled name="name" :value="climadviceForEdit.name" placeholder="Name"/>

                        <input type="text" id="id_input_title" class="form-control mt-2"  name="title" :value="climadviceForEdit.title" placeholder="Titel"/>

                        <textarea type="text" id="id_input_shortDescription" class="form-control mt-2" name="shortDescription" :value="climadviceForEdit.shortDescription" placeholder="Kurzbeschreibung" rows="3"/>
                        
                        <input type="text" id="id_input_iconName" class="form-control mt-2"  name="iconName" v-model="climadviceForEdit.iconName" placeholder="iconName"/>
                      
                        <span class="mr-3">Eher einfach?</span>
                        <input type="checkbox" id="id_input_easy" name="easy"  v-model="climadviceForEdit.easy"/>
                        
                        <input type="text" id="id_input_climateMasterArea" class="form-control mt-2"  name="climateMasterArea" v-model="climadviceForEdit.climateMasterArea" placeholder="ClimateMasterArea"/>

                        <div class="row mt-2">
                            <button type="submit" class="btn btn-default border col m-2">speichern</button><br>
                            <button type="button" v-on:click="hideFormEdit" class="btn btn-primary border col m-2">schließen</button>

                        </div>
                        
                    </form>
                
                </div>
                
                <notification :message="error" v-if="error" class="mt-4 text-danger text-center"/>
                <notification :message="success" v-if="success" class="mt-4 text-success text-center"/>

               
            </div>

        </div>
    </div>
</template>
<script>
import notification from '~/components/MainComponents/Notification';
export default {
    props:['climadviceForEdit'],
    components:{
        notification
    },
    data(){
        return{
            error: null,
            success: null
        }
    },
    methods:{
        hideFormEdit(){
            this.error='';
            this.success='';
             $('#id_climadviceEdit').css('display', 'none');
        },
        async editClimadvice(){
            let formData = new FormData();
            formData.append('id', $("#id_input_id").val());
            formData.append('name', $("#id_input_name").val());
            formData.append('title', $("#id_input_title").val());
            formData.append('shortDescription', $("#id_input_shortDescription").val());
            formData.append('iconName', $("#id_input_iconName").val());
            // For The Checkbox
            var checkboxValue = this.climadviceForEdit.easy;

            if(checkboxValue == true){
                formData.append('easy', 1);               
            }else{
                formData.append('easy', 0);     
            }
            formData.append('climateMasterArea', $("#id_input_climateMasterArea").val());

            try{
                const {data} = await this.$axios.post('admin/updateClimadvice_ByClimadviceID',
                formData,
                {
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if(data.state == "error"){
                    this.error = data.message;
                    this.success = null;
                }
                if(data.state == "success"){
                    this.success = data.message;
                    this.error = null;
                    this.$emit('climadviceEdited', data.data);
                }
            }catch(e){
                alert("Error: " + e);
                this.error = e.response.data.message;
            }
        }

    }
}
</script>
<style scoped>
.card{
    box-shadow: 0 0 300px gray;
    max-width: 400px;
    margin:auto;
}
.card:hover{
    box-shadow: 0 0 300px gray;
}
#id_climadviceEdit_background{
    position:fixed;
    left:0px;
    margin:auto;
    top:0px;
    width:100%;
    height:100%;
    background-color:transparent;
}
</style>