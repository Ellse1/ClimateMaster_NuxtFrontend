<template>
    <div>
        <div class="container">

            <div id="id_div_loading_animation"></div>
            <notification :message="error" v-if="error" class="text-danger mt-2 text-center" />


            <div class="bg-light pb-3 mb-4 text-center" style="min-height:600px;position:relative">
                <!-- Header image -->
                <div style="position:relative;top:0px;left:0px;width:100%;" class="text-center">
                    <label for="id_input_headerImage" id="id_label_headerImage" class="text-center bg-white" style="height:200px;width:100%">
                        <!-- If image Exists -->
                        <div  v-if="header_image_name" class="h-100" style="overflow:hidden;width:100%height:100%;">
                            <img id="id_img_headerImage" class="img-fluid" :src="`https://www.climate-master.com/images/companyImages/headerImages/${header_image_name}`" />
                        </div>
                        <h2 v-if="header_image_name === null"></h2>
                    </label>

                    <!-- Logo -->
                    <div style="position:relative;top:-140px;margin:auto;width:200px;">
                        <div style="position:relative;">       
                            <label class="text-center" id="id_label_logoImage">
                                <div class="border bg-white border-dark mx-auto" style="border-radius:50%;width:200px;height:200px;overflow:hidden;">
                                    <font-awesome-icon v-if="logo_image_name == null" icon="user-circle" class="mx-auto mt-2" style="font-size:160px;"/> 
                                    <img v-if="logo_image_name" :src="`https://www.climate-master.com/images/companyImages/logoImages/${logo_image_name}`" class="h-100" />
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- show company Data -->
                <div class="container text-center" style="margin-top:-140px;">
    
                    <h2 class="col-md-8 mx-auto" >{{name}}</h2>
                    <h5>{{residence}}</h5>
                    
                    <p>
                        {{description}}
                    </p>

                    <!-- Slideshow -->
                    <imageSlideshow :company_id="this.$route.params.id" />


                    
                    <!-- Address -->
                    <div class="text-center pt-5">
                        <h4>Firmenanschrift</h4>
                    </div>
                    <div class="col-md-4 row mx-auto mt-2">
                        
                        <div class="col-6 text-center">
                            <b>{{street}}</b>
                        </div>
                        <div class="col-6 text-center">
                            <b>{{house_number}}</b>
                        </div>
                        
                        <div class="col-6 mt-2 text-center">
                            <b>{{postcode}}</b>
                        </div>
                        <div class="col-6 mt-2 text-center">
                            <b>{{residence}}</b>
                        </div>
                        <div class="col-12 mt-2 text-center">
                            <p>Wir freuen uns auf gemeinsamen Klimaschutz</p>
                            <b>{{email}}</b>
                        </div>
                    </div>
                    <notification :message="error" v-if="error" class="text-danger mt-2 text-center" />
                    <notification :message="success" v-if="success" class="text-success mt-2 text-center" />
                </div>
                
                <!-- link to edit -->
                <div v-if="isCompanyAdmin" class="col-md-3 col-sm-6 mx-auto mt-2">
                        <nuxt-link :to="{name: 'company-editCompany-id', params:{ id:this.id}}" class="btn btn-success">Firmenauftritt bearbeiten</nuxt-link>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import notification from '~/components/MainComponents/Notification';
import imageSlideshow from '~/components/Company/imageSlideshow';
export default {
    validate ({ params }) {
        // Must be a number
        return /^\d+$/.test(params.id)
    },
    components:{
        notification,
        imageSlideshow
    },
    data(){
        return{
            error: null,
            success: null,
            logo_image_name: null,
            header_image_name: null,
            id: null,
            climadvice_name: null,
            name: null,
            description: null,
            street: null,
            house_number: null,
            postcode: null,
            residence: null,
            email: null,
            isCompanyAdmin: false
        };
    },
    async mounted(){
        var company_id;
        // GetCompany
        $('#id_div_loading_animation').addClass("loading-animation");
        try {
            const{data} = await this.$axios.get('company/getCompany_ByCompanyID',{
                params:{
                    id: this.$route.params.id
                }
            });

            if(data.state == 'error'){
                this.error = data.message;
                this.success = null
            }
            else if(data.state == 'success'){
                this.id = data.data.id;
                company_id = data.data.id;
                this.logo_image_name = data.data.logo_image_name;
                this.header_image_name = data.data.header_image_name;
                this.climadvice_name = data.data.climadvice_name;
                this.name = data.data.name;
                this.description = data.data.description;
                this.street = data.data.street;
                this.house_number = data.data.house_number;
                this.postcode = data.data.postcode;
                this.residence = data.data.residence;
                this.email = data.data.email;
            }


        } catch (e) {
            this.error= "Error" + e.response.data.message;   
        }
        $('#id_div_loading_animation').removeClass("loading-animation");


        // Check if is companyAdmin
        if(this.loggedIn){
            try {
                const{data} = await this.$axios.post('user/isCompanyAdmin_ByCurrentUser',{
                        company_id: company_id
                });

                if(data.state == 'error'){}
                else if(data.state == 'success'){
                    if(data.isCompanyAdmin){
                        this.isCompanyAdmin = true;
                    }else{
                        this.isCompanyAdmin = false;
                    }
                }
                else{}
            } catch (e) {
                //Do nothing -> the user does't have to realize that something happend
            }
        }
    },
    methods:{
        async updateCompany(){
            
            $('#id_button_save').addClass("loading-animation");

            let formData = new FormData();
            formData.append('id', this.id)
            formData.append('climadvice_name', this.climadvice_name);
            formData.append('name', this.name);
            formData.append('description', this.description);
            formData.append('street', this.street);
            formData.append('house_number', this.house_number);
            formData.append('postcode', this.postcode);
            formData.append('residence', this.residence);
            formData.append('email', this.email);

            try {
                const{data} = await this.$axios.post("company/updateCompany_ByCompanyID", 
                formData,{
                    headers:{
                        "Content-Type" : "form-data/multipart"
                    }
                });

                if(data.state == 'error'){
                    this.error = data.message;
                    this.success = null;
                }
                else if(data.state == 'success'){
                    this.error = null;
                    this.success = data.message;
                }
                else{
                    this.error = "Die Firma konnte nicht geändert werden. Probieren Sie es später noch einmal.";
                }

            } catch (e) {
                this.error = e.response.data.message;
            }

            $('#id_button_save').removeClass("loading-animation");

        },
        async uploadHeaderImage(){

            this.headerImage = this.$refs.headerImage.files[0];
            let formData = new FormData();
            formData.append('header_image', this.headerImage);
            formData.append('id', this.id); //Company ID

            try {
                const{data} = await this.$axios.post('company/storeHeaderImage_ByCompanyID',
                formData, {
                    headers:{
                        "Content-Type" : "multipart/Form-Data"
                    }
                })

                if(data.state == "error"){
                    this.error = data.message;
                    this.success = null;
                }
                else if(data.state == "success"){
                    this.success = data.message;
                    this.header_image_name = data.data.header_image_name + "?random="+new Date().getTime();;
                    this.error = null;
                }
                else{
                    this.error = "Tut uns leid. Das HeaderImage konnte leider nicht gespeichert werden. Probieren Sie es später noch einmal."
                }

            } catch (e) {
                this.error = e.response.data.message;
            }

        },
        async uploadLogoImage(){
            this.logoImage = this.$refs.logoImage.files[0];
            let formData = new FormData();
            formData.append('logo_image', this.logoImage);
            formData.append('id', this.id); //Company ID

            try {
                const{data} = await this.$axios.post('company/storeLogoImage_ByCompanyID',
                formData, {
                    headers:{
                        "Content-Type" : "multipart/Form-Data"
                    }
                })

                if(data.state == "error"){
                    this.error = data.message;
                    this.success = null;
                }
                else if(data.state == "success"){
                    this.success = data.message;
                    this.logo_image_name = data.data.logo_image_name + "?random="+new Date().getTime();;
                    this.error = null;
                }
                else{
                    this.error = "Tut uns leid. Das LogoImage konnte leider nicht gespeichert werden. Probieren Sie es später noch einmal."
                }

            } catch (e) {
                this.error = e.response.data.message;
            }
        }
    }

}
</script>

<style scoped>
</style>