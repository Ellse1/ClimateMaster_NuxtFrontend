<template>
    <div class="container">
        <div class="text-center">
            <div id="id_div_loading_animation"></div>
            <!-- error notification -->
            <notification :message="error" v-if="error" class="text-danger mt-3" ></notification>
        </div>

        <div class="text-center mt-3">
            <h2>Blog Post ändern</h2>    
        </div>

        <!--Change image -->
        <div class="col-md-6 text-center">
            <label>Bild</label>
        </div>
        <div class="row">
            <div class="col-md-3 col-sm-6" v-if="imageName">
                <div class="card" style="margin:auto;max-width:300px;">
                    <div class="card-body">
                        <img v-if="imageName" :src="'https://www.climate-master.com:8000/images/BlogPostImages/' + imageName" class="card-img-top" alt="not found">
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-6">
                <div class="text-center mt-3">
                    <label for="id_postImage">Bild ändern</label>
                    <input type="file" class="mt-2" ref="image" id="id_postImage" name="climadviceIcon" v-on:change="handleImageUpload" data-buttonText="Bild auswählen"/>
                </div>
            </div>
        </div>

        <!-- id -->
        <input v-model="id" type="hidden"/>

        <!--heading -->
        <div class="form-group mt-4">
            <label>Überschrift</label>
            <input class="form-control col-md-6" v-model="heading"/> 
        </div>
        <!-- previewContent -->
        <div class="from-group mt-4">
            <label>Kurzmessage für Vorschau</label>
            <textarea class="form-control" rows=3 v-model="previewContent">
                Kurzvorschau
            </textarea>
        </div>
        <!-- postContent -->
        <div class="form-group mt-4">
            <label>Eigentlicher News Content</label>
            <textarea class="form-control" rows=6 v-model="postContent">
                Eigentlicher Content
            </textarea>           
        </div>

        <div class="text-center">
            <button class="btn btn-light  mt-3" id="id_button_save" v-on:click="savePost">
                Änderungen speichern
            </button>
        </div>

        <!-- notification success -->
        <div class="text-center">
            <notification :message="success" v-if="success" class="text-success mt-3" ></notification>
        </div>

    </div>
</template>

<script>
import notification from '~/components/MainComponents/Notification';
export default {
    middleware: 'auth',
    validate ({ params }) {
        // Must be a number
        return /^\d+$/.test(params.id)
    },
    components:{
        notification
    },
    data(){
        return {
            error: null,
            success: null,
            id: null,
            imageName: null,
            heading: null,
            previewContent: null,
            postContent: null,
        };
    },
    async mounted(){
        //get the one post
        $('#id_div_loading_animation').addClass("loading-animation");
        try {
            const{data} = await this.$axios.get('blogPost/getBlogPost', {
                    params: {
                        id: this.$route.params.id
                    }}
                );
            
            if(data.state == 'error'){
                this.error = data.message;
            }
            if(data.state == 'success'){
                this.error = null;
                if(data.data.imageName != null){
                    this.imageName = data.data.imageName;
                }
                this.id = data.data.id;
                this.heading = data.data.heading;
                this.previewContent = data.data.previewContent;
                this.postContent = data.data.postContent;
            }

        } catch (e) {
            this.error = "Es konnte kein BlogPost geladen werden."
        }

        $('#id_div_loading_animation').removeClass("loading-animation");
    },
    methods:{
        async savePost(){
            $("#id_button_save").addClass("loading-animation");

                var formData = new FormData();
                formData.append('postImage', this.postImage);
                formData.append('id', this.id);
                formData.append('heading', this.heading);
                formData.append('previewContent', this.previewContent);
                formData.append('postContent', this.postContent);


            try {

                const{data} = await this.$axios.post("blogPost/update", 
                formData,{
                    headers:{
                        "Content-Type" : "multipart/Form-Data"
                    }
                });

                if(data.state == "error"){
                    this.success = null;
                    this.error = data.message;
                }
                if(data.state == "success"){
                    this.success = data.message;
                    this.error = null;
                }

            } catch (e) {
                this.error = e.response.data.message
                alert('error');
            }

            $("#id_button_save").removeClass("loading-animation");
           
        },
        handleImageUpload(){
            this.postImage = this.$refs.image.files[0];
        },
    }

}
</script>