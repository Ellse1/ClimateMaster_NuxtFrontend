<template>
    <div class="container">
        <div class="container bg-light pt-4" style="min-height:400px;">
            <h2 class="text-center">Mein <span class="text-success">Climate</span>Master Profil</h2>
            <hr class="col-5 mx-auto">

            <div class="row">
                <div class="col-md-3 mt-4">
                    <div class="w-100 rounded">
                        <nuxt-link class="w-100 btn btn-default" to="/account/myProfile?page=factsheet">Steckbrief</nuxt-link>
                        <nuxt-link class="w-100 btn btn-default" to="/account/myProfile?page=co2handprint">CO2 Handabdruck</nuxt-link>
                        <nuxt-link class="w-100 btn btn-default" to="/account/myProfile?page=climadviceChecks">Climadvice Checks</nuxt-link>
                        <nuxt-link class="w-100 btn btn-default" to="/account/myProfile?page=statements">Statements</nuxt-link>
                        <nuxt-link class="w-100 btn btn-default" to="/account/myProfile?page=pictures">Bilder</nuxt-link>
                        <nuxt-link class="w-100 btn btn-default" to="/account/myProfile?page=publish">Öffentlich</nuxt-link>
                    </div>
                </div>

                <hr id="id_line_mobile" class="col-5 mx-auto">


                <div class="col-md-9 mt-4">
                    <!-- Individual myProfile componend -->
                    <component v-bind:is="openedComponent" :public_user_profile="publicUserProfile" @public_user_profile_changed="public_user_profile_changed"/>

                </div>
            </div>

        </div>
    </div>
</template>
<script>
import factsheet from "~/components/MyProfile/factsheet"
import co2handprint from '~/components/MyProfile/co2handprint';
import climadviceChecks from '~/components/MyProfile/climadviceChecks';
import statements from '~/components/MyProfile/statements';
import pictures from '~/components/MyProfile/pictures';
import publish from '~/components/MyProfile/publish';

export default {
    middleware: 'auth',
    components:{
        factsheet,
        co2handprint,
        climadviceChecks,
        statements,
        pictures,
        publish
    },
    data(){
        return {
            openedComponent: 'factsheet',
            publicUserProfile : null
        }
    },
    watch:{
        $route(to, from){
            //if i click a link to this things
            if(to.query.page != undefined){
                // this.showOnlyOneClimadvice(to.query.climadvice);
                this.openedComponent = to.query.page;
            }
        }
    },
    async mounted(){
        if(this.$route.query.page != undefined){
            this.openedComponent = this.$route.query.page;
        }

        //Get public profile
        try {
            const{data} = await this.$axios.post('publicUserProfile/getPublicUserProfile_ByCurrentUser');
            if(data.state == "error"){}
            else if(data.state == "success"){
                this.publicUserProfile = data.data;
            }else{}
        } catch (error) {
            
        }
    },
    methods:{
        public_user_profile_changed(public_user_profile_from_child){
            this.publicUserProfile = public_user_profile_from_child;
        }
    }
}
</script>
<style scoped>
#id_line_mobile{
    display:none;
}
@media only screen and (max-width: 600px) {
    #id_line_mobile{
        display: block;
    }
}
</style>