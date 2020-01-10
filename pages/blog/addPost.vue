<template>
    <div class="container">

        <div class="text-center mt-3">
            <h2>Blog News hinzufügen</h2>    
        </div>

        <div class="text-center mt-3">
            <label for="id_postImage">Post Bild</label>
            <input type="file" class="mt-2" ref="image" id="id_postImage" name="climadviceIcon" v-on:change="handleImageUpload" data-buttonText="Bild auswählen"/>
        </div>

        <label>Überschrift</label>
        <input class="form-control col-md-6" v-model="heading"/> 

        <label>Kurzmessage für Vorschau</label>
        <textarea class="form-control" rows=3 v-model="previewContent">
            Kurzvorschau
        </textarea>

        <label>Eigentlicher News Content</label>
        <textarea class="form-control" rows=6 v-model="postContent">
            Eigentlicher Content
        </textarea>


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
export default {
    middleware: 'auth',
    components:{
        notification
    },
    data(){
        return{
            heading: '',
            previewContent: '',
            postContent: '',
            success : null,
            error: null
            
        }

    },
    methods:{
        mounted(){
            this.previewContent = 'Etwas';
            this.postContent = '<p>Etwas anderes</p>'
        },
        async savePost(){

            var formData = new FormData();
            formData.append('postImage', this.postImage);
            formData.append('heading', this.heading);
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