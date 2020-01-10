<template>
    <div>
<!-- 
        <div class="text-center">
            <h4>Blogpost wirklich löschen?</h4>
        </div>

        <!- Error message if no post --
        <div class="text-center">
                <notification :message="error" v-if="error" class="text-danger mt-3"></notification>
                <div id="id_div_loading_animation" class="text-success"></div>
        </div>

        <!- show Content if one post is there--
        <div v-if="success"  class="container">

            <div class="bg-light" id="id_div_postContent">
                <div class="text-center">            
                    <h4 v-html="heading"></h4>

                    <img v-if="imageName" :src="'https://www.climate-master.com:8000/images/BlogPostImages/' + imageName" style="max-width:100%; rounded" class="" alt="not found">
                    
                    <h6 v-html="previewContent"></h6>
                </div>

                <p v-html="postContent"></p>
            </div>

            <!- id and delete button --
            <input v-model="id" type="hidden" />
            <div class="text-center">
               <button id="id_button_delete" class="btn btn-light" v-on:click="destroyPost">Löschen</button>
                <notification :message="success" v-if="success" class="text-success mt-3"></notification>
            </div>

        </div> -->
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

    },
    data(){
        return{
            error: null,
            success: null,
            id: null,
            imageName: null,
            heading: null,
            previewContent: null,
            postContent: null
        }
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
                this.success = data.message;
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
        async destroyPost(){
            $("#id_button_delete").addClass('loading-animation');

            var formData = new FormData;
            formData.append('id', this.id);

            try {
                const{data} = await this.$axios.post('blogPost/destroy', formData);

                if(data.state == 'error'){
                    this.error = data.message;
                    this.success = null;
                }
                if(data.state == 'success'){
                    this.error = false;
                    this.success = data.message;
                }

                $("#id_div_postContent").hide();

            } catch (e) {
                this.error = e.response.data.message;
            }
            
            $("#id_button_delete").removeClass('loading-animation');
            $("#id_button_delete").hide();

        }
    }
}
</script>