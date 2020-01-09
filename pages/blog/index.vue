<template>
    <div class="container">

        <!-- Error message if no posts -->
        <div class="text-center">
            <notification :message="error" v-if="error" class="text-danger mt-3"></notification>
            <div id="id_div_loading_animation" class="text-success"></div>
        </div>

        <div class="row">
            <div class="col-md-4 mt-3" style="" v-for="blogPost in blogPosts" v-bind:key="blogPost.id">
                <div class="card" style="height:350px">             
                    <div class="card-body" style="max-height:260px;overflow:hidden;">
                        <img v-if="blogPost.imageName" :src="'https://www.climate-master.com:8000/images/BlogPostImages/' + blogPost.imageName" class="card-img-top" alt="not found">
                        <nuxt-link :to="{name: 'blog-showPost-id', params: {id: blogPost.id}}" >
                            <h3 class="card-title text-dark"><b>{{blogPost.heading}}</b></h3>
                        </nuxt-link>
                        <div v-html="blogPost.previewContent"></div>
                    </div>
                    <div class="card-footer" style="min-height:90px;">
                        <small>{{blogPost.created_at}}</small>
                        <!-- link to edit -->
                        <div class="row" v-if="user.role === 'admin'">
                            <div class="col">
                                <nuxt-link :to="{name: 'blog-editPost-id', params: {id: blogPost.id}}" class="btn btn-default border">Bearbeiten</nuxt-link>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

            <!-- Link to add post -->
            <div class="col-md-4 mt-3" v-if="user.role === 'admin'">
                <div class="card">
                    <div class="card-body text-center">
                        <div class="bg-light">
                            <nuxt-link to="blog/addPost">
                                <h1 class="display-1 text-dark">+</h1>
                            </nuxt-link>
                        </div>
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
            if(data.state == 'error'){
                this.error = data.message;                
            }
            if(data.state == 'success'){
                this.error = null;
                this.blogPosts = data.data;
            }

        } catch (e) {
            this.error = "Es konnten keine BlogPosts geladen werden.";
        }
        
        $("#id_div_loading_animation").removeClass('loading-animation');
    }
}
</script>
