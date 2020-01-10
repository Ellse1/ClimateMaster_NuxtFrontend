<template>
    <div>
        <!-- Error message if no post
        <div class="text-center">
                <notification :message="error" v-if="error" class="text-danger mt-3"></notification>
                <div id="id_div_loading_animation" class="text-success"></div>
        </div>

        <div v-if="success" class="container bg-light">

            <div class="text-center">            
                <h4 v-html="heading"></h4>

                <img v-if="imageName" :src="'https://www.climate-master.com:8000/images/BlogPostImages/' + imageName" style="max-width:100%; rounded" class="" alt="not found">
                
                <h6 v-html="previewContent"></h6>
            </div>

            <p v-html="postContent"></p>

        </div> -->
    </div>

</template>
<script>
import notification from '~/components/MainComponents/Notification';
export default {
    validate ({ params }) {
        // Must be a number
        return /^\d+$/.test(params.id)
    },
    components:{
        notification
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
}
</script>