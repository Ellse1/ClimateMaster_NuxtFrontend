<template>
    <div class="container">

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
import axios from 'axios';
export default {
    components:{

    },
    data(){
        return {
            blogPosts: null
        };
    },
    async asyncData({$axios}){
        var blogPostsData = await $axios.$get('blogPost/index');
        return {blogPosts: blogPostsData.data};
    }
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