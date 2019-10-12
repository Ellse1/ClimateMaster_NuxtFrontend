<template>
    <div class="container">
        <h2 class="mt-5 mb-5">Eine Handlungsmöglichkeit hinzufügen:</h2>

        <Notification :message="error" v-if="error" class="mt-4 text-danger"/>
        <Notification :message="success" v-if="success" class="mt-4 text-success"/>


        <form @submit.prevent="handlungsvorschlagHinzufuegen">
            <div class="form-group mt-3">
                <label for="titel" class="">Titel</label>
                <input type="text" class="form-control col-md-6" v-model="titel" id="titel" name="titel" placeholder="Titel"/>
            </div>
            <div class="form-group mt-3">
                <label for="kurzbeschreibung" class="">Kurzbeschreibung</label>
                <input type="text" class="form-control" v-model="kurzbeschreibung" id="kurzbeschreibung" name="kurzbeschreibung" placeholder="Kurzbeschreibung"/>
            </div>
            <div class="form-group mt-3">
                <label for="detailbeschreibung" class="">Detailbeschreibung (Langer text der bei Klick angezeigt wird)</label>
                <textarea type="text" class="form-control" v-model="detailbeschreibung" id="detailbeschreibung" name="detailbeschreibung" rows="6">
                    Detailbeschreibung
                </textarea>
            </div>
            <div class="form-group mt-3">
                <label for="vorschlagIcon" class="">Vorschlag Icon, welches bei diesem Vorschlag angezeigt wird</label>
                <br>
                <input type="file" ref="icon" v-on:change="handleIconUpload()" class="col-md-6"  id="vorschlagIcon" name="vorschlagIcon"/>
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
        Notification
    },
    data(){
        return {
            titel: '',
            kurzbeschreibung: '',
            detailbeschreibung: '',
            error: null,
            success: null
        }
    },
    
    methods:{
        async handlungsvorschlagHinzufuegen(){

            let formData = new FormData();
            formData.append('vorschlagIcon', this.vorschlagIcon);
            formData.append('titel', this.titel);
            formData.append('kurzbeschreibung', this.kurzbeschreibung);
            formData.append('detailbeschreibung', this.detailbeschreibung);

            try{
                const{data} = await this.$axios.post( 'handlungsvorschlagHinzufuegen',
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
            this.vorschlagIcon = this.$refs.icon.files[0];
        }
    }

}
</script>