<template>
    <div class="container">

        <!-- Error message if no posts -->
        <div class="text-center">
            <notification :message="error" v-if="error" class="text-danger mt-3"></notification>
            <div id="id_div_loading_animation" class="text-success"></div>
            
        </div>

        <div class="row">
            <div class="col-md-4 mt-3" v-for="blogPost in blogPosts" v-bind:key="blogPost.id">
                <div class="card">
                    <img v-if="blogPost.imageName" :src="'https://www.climate-master.com:8000/images/BlogPostImages/' + blogPost.imageName" class="card-img-top" alt="not found">
                    <div class="card-body">
                        <div v-html="blogPost.previewContent"></div>
                    </div>
                    <div class="card-footer">
                        <small>{{blogPost.created_at}}</small>
                    </div>
                </div>
            </div>
        </div>
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
            blogPosts: null,
            error: null,
            success: null
        };
    },
    async mounted(){
        $("#id_div_loading_animation").addClass('loading-animation');
        
        try {
            const{data} = await this.$axios.get('blogPost/index');
            if(data.data == null){
                this.error = "Es konnten keine BlogPosts geladen werden.";                
            }
            else{
                this.blogPosts = data.data;
            }

        } catch (e) {
            this.error = "Es konnten keine BlogPosts geladen werden.";
        }
        
        $("#id_div_loading_animation").removeClass('loading-animation');
    },
    // async asyncData({$axios}){
    //     const{data} = await this.$axios.get('blogPost/index');
    //     return {blogPosts: data};
    // }
}
</script>

<style scoped>

.card{
    cursor: pointer;
}
.card:hover{
    box-shadow: 0 0 10px gray;
}
</style>