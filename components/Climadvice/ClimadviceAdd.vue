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
                        
                        <input type="text" class="form-control mt-2"  name="iconName" v-model="iconName" placeholder="iconName"/>

                      
                        <span class="mr-3">Eher einfach?</span>
                        <input type="checkbox" id="id_input_easy" name="easy" value="true" v-model="easy" />
                        

                        <input type="text" class="form-control mt-2"  name="climateMasterArea" v-model="climateMasterArea" placeholder="ClimateMasterArea"/>

                        <div class="row mt-2">
                            <button type="submit" class="btn btn-primary col m-2">speichern</button><br>
                            <button type="button" v-on:click="hideFormAdd" class="btn btn-default border col m-2">abbrechen</button>
                        </div>
                        
                    </form>                   
                    
                    
                    
                </div>
            </div>

            <notification :message="error" v-if="error" class="mt-4 text-danger"/>
            <notification :message="success" v-if="success" class="mt-4 text-success"/>


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
            name: '',
            title: '',
            shortDescription: '',
            iconName: '',
            easy: false,
            climateMasterArea: '',
            error: null,
            success: null
        };
    },
    methods: {
        showFormAdd(){
            this.name = null;
            this.title = null;
            this.shortDescription = null;
            this.iconName = null;
            this.easy = false;
            this.climateMasterArea = null;

            $('#id_form_add').css("display", "block");
            $('#id_plus_addClimadvice').css("display", "none");
            return;
        },
        hideFormAdd(){
            $('#id_form_add').css("display", "none");
            $('#id_plus_addClimadvice').css("display", "block");
            return;
        },
        async addClimadvice(){

            let formData = new FormData();
            formData.append('climadviceIcon', this.climadviceIcon);
            formData.append('name', this.name);
            formData.append('title', this.title);
            formData.append('shortDescription', this.shortDescription);
            formData.append('iconName', this.iconName);
            // For The Checkbox
            var checkboxValue = $("#id_input_easy").is(":checked");
            
            
            if(checkboxValue == true){
                formData.append('easy', 1);               
            }else{
                formData.append('easy', 0);     
            }
            formData.append('climateMasterArea', this.climateMasterArea);

            try{
                const{data} = await this.$axios.post('admin/storeClimadvice',
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