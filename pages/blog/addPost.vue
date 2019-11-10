<template>
    <div class="container">

        <div class="text-center mt-3">
            <h2>Blog News hinzufügen</h2>    
        </div>

        <div class="text-center mt-3">
            <label for="id_postImage">Post Bild</label>
            <input type="file" class="mt-2" ref="image" id="id_postImage" name="climadviceIcon" v-on:change="handleImageUpload" data-buttonText="Bild auswählen"/>
        </div>


        <label>Kurzmessage für Vorschau</label>
        <div class="">
            <ckeditor :editor="editor" v-model="previewContent" :config="editorConfig"></ckeditor>
        </div>
        <label for="" class="mt-3">Eigentlicher News Content</label>
        <div class="">
            <ckeditor :editor="editor" v-model="postContent" :config="editorConfig"></ckeditor>
        </div>


        <notification v-if="error" :message="error" class="text-danger" />
        <notification v-if="success" :message="success" class="text-success" />


        <div class="text-center">
            <button class="btn btn-secondary mt-3" v-on:click="savePost">
                save
            </button>
        </div>

    </div>
</template>
<script>
import notification from '~/components/MainComponents/Notification';

let ClassicEditor
let CKEditor

if (process.client) {
    ClassicEditor = require('@ckeditor/ckeditor5-build-classic')
    CKEditor = require('@ckeditor/ckeditor5-vue')
}else{
    CKEditor = { component : {template:'<div></div>'}}
}
export default {
    middleware: 'auth',
    components:{
        ckeditor: CKEditor.component,
        notification
    },
    data(){
        return{
            editor: ClassicEditor,            
            previewContent: '',
            postContent: '',
            editorConfig: {
            
            },
            success : null,
            error: null
            
            }

    },
    methods:{
        async savePost(){

            var formData = new FormData();
            formData.append('postImage', this.postImage);
            formData.append('previewContent', this.previewContent);
            formData.append('postContent', this.postContent);

            try {
                var {data} = await this.$axios.post('blogPost/store', 
                    formData,{
                        headers: {
                            "Content-Type" : "Multipart/form-data"
                        }
                    }
                );

                if(data.state == "error"){
                    this.error = data.message;
                    this.success = null;
                }
                if(data.state == "success"){
                    this.error = null;
                    this.success = data.message;
                    this.$router.push('/blog');
                }
            } catch (e) {
                this.error = e.response.data.message
                this.success = null;
            }
        },
        handleImageUpload(){
            this.postImage = this.$refs.image.files[0];
        },
    }
}
</script>