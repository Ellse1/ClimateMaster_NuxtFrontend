<template>
    <div class="container">
        <h2 class="mt-5 mb-5">Eine Handlungsmöglichkeit hinzufügen:</h2>

        <Notification :message="error" v-if="error" class="mt-4 text-danger"/>
        <Notification :message="success" v-if="success" class="mt-4 text-success"/>


        <form @submit.prevent="addClimadvice">
            <div class="form-group mt-3">
                <label for="title" class="">Titel</label>
                <input type="text" class="form-control col-md-6" v-model="title" id="title" name="title" placeholder="Titel"/>
            </div>
            <div class="form-group mt-3">
                <label for="shortDescription" class="">Kurzbeschreibung</label>
                <input type="text" class="form-control" v-model="shortDescription" id="shortDescription" name="shortDescription" placeholder="Kurzbeschreibung"/>
            </div>
            <div class="form-group mt-3">
                <label for="detailedDescription">Detailbeschreibung (Langer text der bei Klick angezeigt wird)</label>
                <textarea type="text" class="form-control" v-model="detailedDescription" id="detailedDescription" name="detailedDescription" rows="6">
                    Detailbeschreibung
                </textarea>
            </div>
            <div class="form-group mt-3">
                <label for="climadviceIcon">Vorschlag Icon, welches bei diesem Climadvice angezeigt wird</label>
                <br>
                <input type="file" ref="icon" v-on:change="handleIconUpload()" class="col-md-6"  id="climadviceIcon" name="climadviceIcon"/>
            </div>
            <input type="submit" class="btn btn-default border" value="speichern und anzeigen"/>
        </form>



    </div>
</template>

<script>
import Notification from '~/components/Notification';

export default {
    middleware : 'auth',
    
    
    components: {
        Notification,
    },
    data(){
        return {
            title: '',
            shortDescription: '',
            detailedDescription: '',
            error: null,
            success: null
        }
    },
    
    methods:{
        async addClimadvice(){

            let formData = new FormData();
            formData.append('climadviceIcon', this.climadviceIcon);
            formData.append('title', this.title);
            formData.append('shortDescription', this.shortDescription);
            formData.append('detailedDescription', this.detailedDescription);

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
                }
            }catch(e){
                this.error = e.response.data.message;
            }
        },
        handleIconUpload(){
            this.climadviceIcon = this.$refs.icon.files[0];
        }
    },


}
</script>